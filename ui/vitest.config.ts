import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import path from "path";
import { fileURLToPath, URL } from "url";
import type { Plugin } from "vite";
import { configDefaults, defineConfig } from "vitest/config";
import { sharedPlugins } from "./src/vite/config-builder";

export default defineConfig({
  plugins: [
    sharedPlugins,
    VueI18nPlugin({
      include: [path.resolve(__dirname, "./src/locales/*.yaml")],
    }) as Plugin,
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@console": fileURLToPath(new URL("./console-src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    include: ["**/*.spec.ts"],
    root: fileURLToPath(new URL("./", import.meta.url)),
    exclude: [
      ...configDefaults.exclude,
      "./packages/**",
      "node_modules",
      "dist",
      ".idea",
      ".git",
      ".cache",
    ],
    reporters: "html",
    outputFile: "build/test-result/index.html",
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
});
