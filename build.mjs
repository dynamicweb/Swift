// Swift frontend build: bundles the JS, compiles the SCSS and copies the vendor libraries into Assets/.
//   node build.mjs           production build (minified, with source maps)
//   node build.mjs --watch   development build that rebuilds on changes, with live reload
import { cpSync, mkdirSync, rmSync, watch, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import * as esbuild from "esbuild";
import * as sass from "sass";
import { transform as transformCss, browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";

const isWatch = process.argv.includes("--watch");
const isProd = !isWatch;
const srcPath = "_src/";
const templatesPath = "Files/Templates/";
const distPath = "Files/Templates/Designs/Swift-v2/Assets/";

console.log(`Building for ${isProd ? "production" : "development"}`);

// Vendor libraries: copy each package's dist folder as-is, since templates (and partner customizations) reference files in them.
const vendorPackages = ["alpinejs", "bootstrap", "flatpickr", "htmx.org", "swiffy-slider"];

function copyVendor() {
  for (const pkg of vendorPackages) {
    const dest = `${distPath}lib/${pkg}/dist`;
    rmSync(dest, { recursive: true, force: true });
    cpSync(`node_modules/${pkg}/dist`, dest, { recursive: true });
  }
}

// Live reload (watch mode only): a small event-stream server the dev build of swift.js connects to.
// SCSS changes swap swift.css in place; JS and Razor template changes reload the page.
const liveReloadPort = Number(process.env.SWIFT_LIVERELOAD_PORT) || 35729;
const liveReloadClients = new Set();

function notify(type) {
  for (const client of liveReloadClients) client.write(`data: ${type}\n\n`);
}

function startLiveReload() {
  createServer((request, response) => {
    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    });
    response.write(": connected\n\n");
    liveReloadClients.add(response);
    request.on("close", () => liveReloadClients.delete(response));
  })
    .on("error", (error) => console.warn(`Live reload is off: ${error.message}`))
    .listen(liveReloadPort, () => console.log(`Live reload on http://localhost:${liveReloadPort}`));

  let pending;
  watch(templatesPath, { recursive: true }, (event, filename) => {
    if (!filename?.endsWith(".cshtml")) return;
    clearTimeout(pending);
    pending = setTimeout(() => notify("reload"), 100);
  });
}

// Prepended to swift.js in watch mode only. Gives up quietly when no dev build is running.
const liveReloadClient = `(() => {
  let connected = false;
  const source = new EventSource("http://localhost:${liveReloadPort}");
  source.onopen = () => { connected = true; };
  source.onerror = () => { if (!connected) source.close(); };
  source.onmessage = ({ data }) => {
    if (data !== "css") return location.reload();
    document.querySelectorAll('link[rel="stylesheet"][href*="/Assets/css/swift.css"]').forEach((link) => {
      const next = link.cloneNode();
      const url = new URL(link.href);
      url.searchParams.set("livereload", Date.now());
      next.href = url.href;
      next.onload = () => link.remove();
      next.onerror = () => next.remove();
      link.after(next);
    });
  };
})();`;

const reloadOnJsBuild = {
  name: "live-reload",
  setup(build) {
    build.onEnd((result) => {
      if (!result.errors.length) notify("reload");
    });
  },
};

// Scripts
const jsOptions = {
  entryPoints: [`${srcPath}js/swift.js`],
  outfile: `${distPath}js/swift.js`,
  bundle: true,
  format: "iife", // swift.js assigns window.swift itself
  target: "es2020",
  minify: isProd,
  drop: isProd ? ["console"] : [],
  legalComments: "none",
  sourcemap: true,
  logLevel: "info",
  banner: isWatch ? { js: liveReloadClient } : {},
  plugins: isWatch ? [reloadOnJsBuild] : [],
};

// Styles
const cssTargets = browserslistToTargets(browserslist());

function buildCss() {
  const started = performance.now();
  const outFile = `${distPath}css/swift.css`;
  try {
    const compiled = sass.compile(`${srcPath}scss/swift.scss`, {
      loadPaths: ["node_modules"],
      sourceMap: true,
      sourceMapIncludeSources: true,
      quietDeps: true, // deprecation noise from Bootstrap's own SCSS
      silenceDeprecations: ["import", "global-builtin"], // Swift's own @import / global functions, until the move to @use
    });
    const result = transformCss({
      filename: "swift.css",
      code: Buffer.from(compiled.css),
      inputSourceMap: JSON.stringify(compiled.sourceMap),
      sourceMap: true,
      minify: isProd,
      targets: cssTargets,
    });
    mkdirSync(`${distPath}css`, { recursive: true });
    writeFileSync(outFile, `${result.code}\n/*# sourceMappingURL=swift.css.map */\n`);
    writeFileSync(`${outFile}.map`, result.map);
    console.log(`  ${outFile}  ${(result.code.length / 1024).toFixed(1)}kb  (${Math.round(performance.now() - started)}ms)`);
    notify("css");
  } catch (error) {
    console.error(error.formatted ?? error.message ?? error);
    if (!isWatch) process.exit(1);
  }
}

copyVendor();
buildCss();

if (isWatch) {
  startLiveReload();
  const context = await esbuild.context(jsOptions);
  await context.watch();
  let pending;
  watch(`${srcPath}scss`, { recursive: true }, () => {
    clearTimeout(pending);
    pending = setTimeout(buildCss, 50);
  });
  console.log("Watching for changes...");
} else {
  await esbuild.build(jsOptions);
}
