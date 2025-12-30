import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  // Determine base path for GitHub Pages deployment
  // Default to /GERRY01/ for GitHub Pages, or use VITE_BASE_PATH if set
  const basePath = env.VITE_BASE_PATH || '/GERRY01/';

  return {
    base: basePath,
    plugins: [react()],
    define: {
      // This "polyfills" process.env.API_KEY so it works in the browser
      'process.env': {
        API_KEY: env.VITE_API_KEY
      }
    }
  }
})