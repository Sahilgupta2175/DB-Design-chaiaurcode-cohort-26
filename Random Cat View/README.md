# Random Cat View

Small React app. Fetches a random cat breed from the [FreeAPI](https://freeapi.app) public endpoint and shows its photo, origin, life span, description and temperament in a card.

## Features

- "Fetch Random Cat" button loads a new random breed.
- Two-column card on desktop (photo left, details right), stacked on mobile.
- Origin and life span pills, temperament tags. Each shown only when API returns it.
- Loading state: button disabled with spinner, current photo dims and blurs.
- New photo fades in.
- Empty placeholder before first fetch.
- Error message on failed fetch. Button re-enables for retry.
- Light and dark mode, follows OS setting (`prefers-color-scheme`).
- Animations off when user prefers reduced motion.

## Tech Stack

- React 19
- Vite 8
- ESLint 10 (react-hooks, react-refresh)
- Plain CSS with custom properties (design tokens)
- Google Fonts: Young Serif (headings), Figtree (body)

## Getting Started

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

### Scripts

| Command           | Purpose                        |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start dev server with HMR      |
| `npm run build`   | Production build into `dist/`  |
| `npm run preview` | Serve production build locally |
| `npm run lint`    | Run ESLint                     |

## Project Structure

```text
Random Cat View/
├── index.html                # Google Fonts links, page title
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx              # React entry
    ├── App.jsx               # Renders RandomCat
    ├── App.css
    ├── index.css             # Color tokens (light + dark), page background
    └── components/
        ├── RandomCat.jsx     # Fetch logic, card markup
        └── RandomCat.css     # Card, button, chips, responsive layout
```

## API

```text
GET https://api.freeapi.app/api/v1/public/cats/cat/random
```

Fields used from response (`data.data.*`):

| Field         | Use                                     |
| ------------- | --------------------------------------- |
| `image`       | Cat photo                               |
| `name`        | Breed name, image alt text              |
| `origin`      | Origin pill                             |
| `life_span`   | Life span pill                          |
| `description` | Description paragraph                   |
| `temperament` | Comma-separated string, split into tags |

## Theming

All colors are CSS variables in [src/index.css](src/index.css). `:root` holds light values. `@media (prefers-color-scheme: dark)` overrides them for dark mode.

To change accent color, edit `--accent`, `--accent-hover`, `--accent-soft` and `--accent-ring` in both blocks. Keep text on `--accent` readable (contrast 4.5:1 or more).

## Updating This Documentation

README is plain Markdown. Edit this file directly, commit with the code change it describes.

Update README when you:

- Add or remove a feature, then edit **Features**.
- Add a dependency or script in `package.json`, then edit **Tech Stack** / **Scripts**.
- Add, move or rename files, then edit **Project Structure**.
- Change API endpoint or fields read, then edit **API**.
- Change color tokens or fonts, then edit **Theming** / **Tech Stack**.

Preview in VS Code with `Ctrl+Shift+V`. Suggested commit message: `docs: update README <what changed>`.

## Changelog

Add a line per notable change, newest first.

| Date       | Change                                                          |
| ---------- | --------------------------------------------------------------- |
| 2026-10-15 | Modern card UI redesign, dark mode, loading and error states    |
| 2026-10-15 | README rewritten for project                                    |
