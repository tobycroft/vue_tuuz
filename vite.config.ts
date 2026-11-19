import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [
    vue(),
    ui()
  ]
})
