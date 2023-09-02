import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  build: {
    outDir: 'build'
  },
  base: "/",
  resolve: {
    alias: {
      components: '/src/components',
      lib: '/src/lib',
      openapi: '/src/openapi',
      routes: '/src/routes',
      models: '/src/models'
    }
  },
  plugins: [react()],
  server: {
    port: 4001,
    open: '/'
  }
})
