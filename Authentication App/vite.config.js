import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy: {
      // FreeAPI replies with Access-Control-Allow-Origin: *, which browsers reject
      // when credentials are included. Proxy makes calls same-origin.
      "/api": {
        target: "https://api.freeapi.app",
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
      },
    },
  },
});
