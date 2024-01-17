module.exports = {
  root: true,
  plugins: ["@typescript-eslint", "import", "prettier"],
  extends: [
    "airbnb-typescript/base",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
};
