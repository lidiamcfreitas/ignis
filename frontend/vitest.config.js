import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import path from 'path';

export default defineConfig({
plugins: [
    vue(),
    vuetify(),
],
test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    deps: {
    inline: ['vuetify']
    },
    css: true,
},
resolve: {
    alias: {
    '@': path.resolve(__dirname, './src')
    }
}
});
