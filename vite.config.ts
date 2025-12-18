import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  // Determine base path based on environment
  // Priority: VITE_BASE_PATH env variable > auto-detect Vercel > default '/GERRY3/' for GitHub Pages
  // For Vercel: automatically uses '/' (or set VITE_BASE_PATH=/ in Vercel dashboard)
  // For GitHub Pages: set VITE_BASE_PATH=/GERRY3/ in GitHub Actions or use default
  let basePath = '/GERRY3/'; // Default for GitHub Pages
  
  if (env.VITE_BASE_PATH) {
    // Explicit override from env variable
    basePath = env.VITE_BASE_PATH;
  } else if (process.env.VERCEL || process.env.VERCEL_ENV || process.env.CI) {
    // Auto-detect Vercel or CI environment (usually means root path)
    // Note: Vercel sets VERCEL=1 automatically
    basePath = '/';
  }

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