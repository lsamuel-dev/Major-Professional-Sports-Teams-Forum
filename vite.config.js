import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // This must match your GitHub repository name exactly
  base: '/Major-Professional-Sports-Teams-Forum/', 
  plugins: [react()],
})