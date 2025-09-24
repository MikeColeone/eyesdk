module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true, // SDK 在浏览器里跑
    es2021: true,
  },
  rules: {
    // 基础质量
    "no-console": ["warn", { allow: ["warn", "error"] }], // 允许 warn/error，不允许随便 console.log
    "no-debugger": "error",
    "no-unused-vars": "off", // 用 TS 版本替代
    "@typescript-eslint/no-unused-vars": ["warn"],

    // 类型安全
    "@typescript-eslint/explicit-function-return-type": "off", // SDK 通常需要灵活，必要时可关
    "@typescript-eslint/no-explicit-any": "warn",

    "import/order": [
      "warn",
      {
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling"],
          "index",
        ],
        "newlines-between": "always",
      },
    ],

    // prettier 保持风格统一
    "prettier/prettier": "warn",
  },
  ignorePatterns: [
    "dist", // 打包产物
    "node_modules",
  ],
};
