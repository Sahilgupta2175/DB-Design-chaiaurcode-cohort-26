# Jokes Viewer Application

Small React app. Fetches random jokes from the [FreeAPI](https://freeapi.app) public endpoint and shows them as cards, 5 per page, with Previous / Next pagination.

## Features

- "Fetch Jokes" button loads page 1. Label changes to "Refresh Jokes" once jokes are shown, "Loading..." while fetching.
- Each joke in its own card with an id badge aligned to the first line of text.
- Previous / Next buttons, disabled on first / last page and while fetching.
- "Page X of Y" label centered under the buttons.
- Loading state: shimmer skeleton cards in place of jokes.
- Cards fade in one after another.
- Empty placeholder before first fetch.
- Error message on failed fetch. Buttons re-enable for retry.
- Light and dark mode, follows OS setting (`prefers-color-scheme`).
- Animations off when user prefers reduced motion.
- Responsive: single centered column (max 680px), compact padding under 480px.

## Tech Stack

- React 19
- Vite 8
- ESLint 10 (react-hooks, react-refresh)
- Plain CSS with custom properties (design tokens)
- System font stack (no web fonts)

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
Jokes Viewer Application/
├── index.html
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx                          # React entry
    ├── App.jsx                           # Renders JokesViewerApplication
    └── components/
        ├── JokesViewerApplication.jsx    # Fetch + pagination logic, markup
        └── JokesViewerApplication.css    # Color tokens, cards, buttons, pager, responsive layout
```

## API

```text
GET https://api.freeapi.app/api/v1/public/randomjokes?limit=5&page=<n>
```

Fields used from response (`data.data.*`):

| Field            | Use                                      |
| ---------------- | ---------------------------------------- |
| `data`           | Array of jokes for current page          |
| `data[].id`      | Card key and id badge                    |
| `data[].content` | Joke text                                |
| `totalPages`     | "of Y" label, disables Next on last page |

Page size is the `Limit` constant in [JokesViewerApplication.jsx](src/components/JokesViewerApplication.jsx).

## Theming

All colors are CSS variables at the top of [JokesViewerApplication.css](src/components/JokesViewerApplication.css). `:root` holds light values. `@media (prefers-color-scheme: dark)` overrides them for dark mode.

To change accent color, edit `--accent` and `--accent-2` (gradient on primary button). Keep white text on the gradient readable (contrast 4.5:1 or more).

## Updating This Documentation

README is plain Markdown. Edit this file directly, commit with the code change it describes.

Update README when you:

- Add or remove a feature, then edit **Features**.
- Add a dependency or script in `package.json`, then edit **Tech Stack** / **Scripts**.
- Add, move or rename files, then edit **Project Structure**.
- Change API endpoint, page size or fields read, then edit **API**.
- Change color tokens or fonts, then edit **Theming** / **Tech Stack**.

Preview in VS Code with `Ctrl+Shift+V`. Suggested commit message: `docs: update README <what changed>`.

## Changelog

Add a line per notable change, newest first.

| Date       | Change                                                              |
| ---------- | ------------------------------------------------------------------- |
| 2026-10-17 | Modern card UI, skeleton loading, centered pager, dark mode         |
| 2026-10-17 | README rewritten for project                                        |
