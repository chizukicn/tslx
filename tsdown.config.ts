import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  format: ["cjs", "esm"],
  entry: "src/index.ts",
  exports: true
});
