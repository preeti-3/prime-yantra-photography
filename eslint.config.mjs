import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals, ...nextTs,
  globalIgnores([".next/**", "dist/**", ".sanity/**", "next-env.d.ts", ".npm-cache/**", ".playwright/**", "test-results/**", "playwright-report/**"]),
]);
