import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default [
  // CommonJS
  {
    input: "src/index.ts",
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
      nodeResolve({
        extensions: [".ts"],
      }),
      typescript(),
    ],
    output: [{ file: pkg.main, format: "cjs" }],
  },
  // ES
  {
    input: "src/index.ts",
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
      nodeResolve({
        extensions: [".ts"],
      }),
      typescript(),
    ],
    output: [{ file: pkg.module, format: "es" }],
  },
];
