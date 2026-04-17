import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // port: 5173, // frontend port
    proxy: {
      "/api": {
        target: "http://localhost:8080", // backend port
        changeOrigin: true,
        secure: false,

      },
    },
  },
})
