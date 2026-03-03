export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        // ES2022 globals
        Promise: "readonly",
        Set: "readonly",
        Map: "readonly",
        Symbol: "readonly",
      },
    },
    rules: {
      "indent": ["error", 2],
      "no-unused-vars": "warn",
    },
  },
];
