import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["_src/js/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        // Loaded by the master template before swift.js
        htmx: "readonly",
        bootstrap: "readonly",
        Alpine: "readonly",
      },
    },
    rules: {
      indent: ["error", 2],
    },
  },
  {
    files: ["build.mjs", "eslint.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
