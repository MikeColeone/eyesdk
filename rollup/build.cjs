const path = require("path");
const json = require("@rollup/plugin-json");
const { babel } = require("@rollup/plugin-babel");
const resolveFile = function (filePath) {
  return path.join(__dirname, filePath);
};
const plugins = [
  json({
    compact: true,
  }),
  babel({
    extensions: [".js", ".ts"],
    babelHelpers: "bundled",
    presets: [
      [
        "@babel/env",
        {
          targets: {
            browsers: ["> 1%", "last 2 versions", "not ie <= 8"],
          },
        },
      ],
    ],
  }),
];
module.exports = [
  {
    plugins,
    input: resolveFile("../src/webEyeSDK.ts"),
    output: {
      file: resolveFile("../dist/monitor.ts"),
      format: "iife",
      name: "monitor",
      sourcemap: true,
    },
  },
  {
    plugins,
    input: resolveFile("../src/webEyeSDK.ts"),
    output: {
      file: resolveFile("../dist/monitor.esm.ts"),
      format: "esm",
      name: "monitor",
      sourcemap: true,
    },
  },
  {
    plugins,
    input: resolveFile("../src/webEyeSDK.ts"),
    output: {
      file: resolveFile("../dist/monitor.cjs.ts"),
      format: "cjs",
      name: "monitor",
      sourcemap: true,
    },
  },
];
