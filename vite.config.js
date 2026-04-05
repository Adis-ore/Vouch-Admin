import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-router-dom': path.resolve('./src/vendor/react-router-dom.jsx'),
'@supabase/supabase-js': path.resolve('./src/vendor/supabase.js'),
      'react-icons/fi': path.resolve('./src/vendor/react-icons-fi.jsx'),
    },
  },
})
