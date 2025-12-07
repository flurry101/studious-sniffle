# Neon Studio

This project uses Vite + React and mounts the existing `App.jsx` at the repository root. Tailwind is included via CDN for quick testing.

Quick start:

```bash
# 1) Install dependencies
npm install

# 2) Run dev server
npm run dev
```

Open http://localhost:5173 in your browser.

Notes:
- `App.jsx` lives at the repository root. The entrypoint is `src/main.jsx` which imports `../App.jsx`.
- For full Tailwind workflow (build-time classes, custom config), install Tailwind locally and configure it instead of using the CDN.
