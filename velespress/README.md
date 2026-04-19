# Veles Press

Independent publishing house website. Built with React + Vite.

## Setup

```bash
npm install
npm run dev
```

## Structure

```
src/
  components/
    VelesPressHero.jsx   # Hero section with animated book carousel
    VelesPressBody.jsx   # Featured release, catalogue, series, about, newsletter, footer
  App.jsx
  main.jsx
public/
  covers/               # Book cover images (JPEG, ~100KB each)
  favicon.svg
```

## Adding a new cover

1. Add the JPEG to `public/covers/`
2. Add the const to `VelesPressBody.jsx`: `const NEW_COVER = "/covers/new-book.jpg";`
3. Add `coverUrl: NEW_COVER` to the relevant entry in the `BOOKS` array

## Deploy

```bash
npm run build
# dist/ folder is ready to deploy to Vercel, Netlify, or GitHub Pages
```
