// rollup.config.js
const typescript = require('@rollup/plugin-typescript')

module.exports = {
  input: 'ts/main.ts',
  output: {
    dir: 'public',
    format: 'cjs'
  },
  plugins: [typescript({ compilerOptions: {lib: ["es5", "es6", "dom"], target: "es5"}})]
};