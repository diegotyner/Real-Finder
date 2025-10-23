import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
  build: {
    rollupOptions: {
      input: {
        // Main application entry point
        main: resolve(__dirname, "index.html"),
        // Explicitly include the legacy site as a second entry point
        legacy: resolve(__dirname, "legacy.html"),
      },
    },
  },
});
