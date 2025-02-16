import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // This is the important part
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
server: {
port: 8080,
proxy: {
    '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    secure: false,
    credentials: 'include'
    }
}
},
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}']
  }
})