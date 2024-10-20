// rollup.config.js
const typescript = require("@rollup/plugin-typescript");
const sass = require("rollup-plugin-sass");

module.exports = {
  input: "ts/main.ts",
  output: {
    sourcemap: true,
    dir: "public",
    format: "cjs",
  },
  plugins: [
    typescript({
      sourceMap: true,
      compilerOptions: {
        lib: ["es5", "es6", "dom"],
        target: "es2022",
        verbatimModuleSyntax: false,
      },
    }),
    sass()
  ],
};
