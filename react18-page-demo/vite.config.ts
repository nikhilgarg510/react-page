import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Use the built lib-es for proper module resolution
      '@react-page/editor': path.resolve(__dirname, '../packages/editor/lib-es'),
      '@react-page/plugins-slate': path.resolve(__dirname, '../packages/plugins/content/slate/lib-es'),
      // Alias for CSS imports to use lib directory
      '@react-page/editor/lib/index.css': path.resolve(__dirname, '../packages/editor/lib/index.css'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    exclude: ['@react-page/editor', '@react-page/plugins-slate', 'react-dnd', 'react-dnd-html5-backend'],
    include: [
      'slate',
      'slate-react',
      'lodash',
      'lodash.debounce',
      'lodash.throttle',
      'lodash.flatten',
      'lodash.isempty',
      'lodash.isobject',
      'lodash.clonedeep',
      'lodash.omit',
      'lodash.xor',
    ],
    esbuildOptions: {
      mainFields: ['module', 'main'],
    },
  },
  server: {
    fs: {
      strict: false,
    },
  },
})
