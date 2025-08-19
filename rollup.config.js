import resolve from "@rollup/plugin-node-resolve";
import eslint from "@rollup/plugin-eslint";
import scss from "rollup-plugin-scss";
import stylelint from "rollup-plugin-stylelint";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import copy from "rollup-plugin-copy";
const isProd = process.env.NODE_ENV === "production";
const srcPath = "_src/";
const distPath = "Files/Templates/Designs/Swift-v2/Assets/";

console.log("Building for " + (isProd ? "production" : "development"));

export default [
  //Scripts
  {
    input: srcPath + "js/swift.js",
    plugins: [
      resolve(),
      isProd &&
        (await import("@rollup/plugin-terser")).default({
          mangle: true,
          sourceMap: true,
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        }),
      eslint({
        fix: true,
        include: srcPath + ["js/**"],
        exclude: ["node_modules/**", distPath + "**"],
        throwOnError: true,
        throwOnWarning: true,
      }),
      copy({
        targets: [
          { src: "node_modules/swiffy-slider/dist/", dest: distPath + "lib/" },
          { src: "node_modules/htmx.org/dist/", dest: distPath + "lib/" },
          { src: "node_modules/bootstrap/dist/", dest: distPath + "lib/" },
          { src: "node_modules/flatpickr/dist/", dest: distPath + "lib/" },
          { src: "node_modules/alpinejs/dist/", dest: distPath + "lib/" },
        ],
        copyOnce: true,
        flatten: false,
      }),
    ],
    output: [
      {
        file: distPath + "js/" + "swift.js",
        format: "umd",
        name: "swift",
      },
      {
        file: distPath + "js/" + "swift.esm.js",
        format: "es",
        name: "swift",
      },
    ],
  },
  //Styles
  {
    input: srcPath + "scss/swift.js",
    plugins: [
      resolve(),
      stylelint.default({
        include: srcPath + ["scss/**.scss"],
        failOnError: true,
        report: true,
      }),
      scss({
        watch: srcPath + "scss",
        outputStyle: isProd ? "compressed" : "expanded",
        sourceMap: isProd ? true : false,
        includePaths: ["node_modules"],
        fileName: "swift.css",
        processor: () => postcss([autoprefixer()]),
      }),
    ],
    output: {
      file: distPath + "css/" + "swift.css",
    },
  },
];
