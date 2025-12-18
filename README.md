<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1A1e0nKPF19DQn8Sfpr9lP43QR8wfxfhd

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create a `.env.local` file in the root directory and set your Gemini API key:
   ```
   VITE_API_KEY=your_gemini_api_key_here
   ```
3. Run the app:
   `npm run dev`

## Deploy

### Deploy to Vercel
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable in Vercel dashboard:
   - `VITE_API_KEY`: Your Gemini API key
   - `VITE_BASE_PATH`: `/` (optional, auto-detected)
4. Deploy! The base path will automatically be set to `/` for Vercel.

### Deploy to GitHub Pages
1. Push your code to GitHub
2. Go to Settings > Pages
3. Set source to GitHub Actions
4. The default base path is `/COFFEE1/` (your repo name)
5. If your repo has a different name, set `VITE_BASE_PATH` in GitHub Actions secrets:
   - `VITE_BASE_PATH`: `/your-repo-name/`
6. Add `VITE_API_KEY` to GitHub Secrets for build

**Note:** The app automatically detects Vercel environment and uses root path (`/`). For GitHub Pages, it defaults to `/COFFEE1/` but can be customized via `VITE_BASE_PATH` environment variable.
