import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import envCompatible from "vite-plugin-env-compatible";
// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), envCompatible()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
