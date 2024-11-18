import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      dayjs: 'dayjs/esm', // Specify the ESM entry point
    },
  }
})
