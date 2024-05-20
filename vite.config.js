import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
 base: "/",
 plugins: [react()],
 preview: {
  port: 8901,
  strictPort: true,
 },
 server: {
  port: 8901,
  strictPort: true,
  host: "localhost",
  // origin: "http://0.0.0.0:8901",
 },
});