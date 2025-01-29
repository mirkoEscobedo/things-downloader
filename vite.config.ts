import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      manifest: {
        name: "Things-Downloader",
        short_name: "TD",
        description:
          "Download and convert videos from websites like 4chan and youtube",
        theme_color: "#171717",
        background_color: "#171717",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "./src/assets/TD.png", type: "image/png", sizes: "500x500" },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
