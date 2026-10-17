# Quotes Listing Application

Small React app. Fetches quotes from the [FreeAPI](https://freeapi.app) public endpoint and shows them as editorial-style cards, 5 per page, with Previous / Next pagination.

## Features

- "Fetch Quotes" button loads page 1. Label changes to "Refresh Quotes" once quotes are shown, "Loading..." while fetching.
- Each quote in its own card: large decorative quote mark, serif quote text, author line, id badge top right.
- Previous / Next buttons, disabled on first / last page and while fetching.
- Buttons always visible. "Page X of Y" label centered under them once quotes load.
- Loading state: shimmer skeleton cards in place of quotes.
- Cards fade in one after another.
- Empty placeholder before first fetch.
- Error message on failed fetch. Buttons re-enable for retry.
- Light and dark mode, follows OS setting (`prefers-color-scheme`).
- Animations off when user prefers reduced motion.
- Responsive: single centered column (max 720px). Under 520px the quote mark moves above the text and padding shrinks.

## Tech Stack

- React 19
- Vite 8
- ESLint 10 (react-hooks, react-refresh)
- Plain CSS with custom properties (design tokens)
- System fonts only: serif stack for headings and quotes, `system-ui` for the rest

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
Quotes Listing Application/
├── index.html
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx                            # React entry
    ├── App.jsx                             # Renders QuotesListingApplication
    └── components/
        ├── QuotesListingApplication.jsx    # Fetch + pagination logic, markup
        └── QuotesListingApplication.css    # Color tokens, cards, buttons, pager, responsive layout
```

## API

```text
GET https://api.freeapi.app/api/v1/public/quotes?page=<n>&limit=5
```

Fields used from response (`data.data.*`):

| Field            | Use                                      |
| ---------------- | ---------------------------------------- |
| `data`           | Array of quotes for current page         |
| `data[].id`      | Card key and id badge                    |
| `data[].content` | Quote text                               |
| `data[].author`  | Author line                              |
| `totalPages`     | "of Y" label, disables Next on last page |

Page size is the `Limit` constant in [QuotesListingApplication.jsx](src/components/QuotesListingApplication.jsx).

## Theming

All colors and fonts are CSS variables at the top of [QuotesListingApplication.css](src/components/QuotesListingApplication.css). `:root` holds light values. `@media (prefers-color-scheme: dark)` overrides them for dark mode.

To change accent color, edit `--accent`, `--accent-hover` and `--accent-soft` in both blocks. Keep white text on `--accent` readable (contrast 4.5:1 or more). Fonts are `--serif` and `--sans`.

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

| Date       | Change                                                         |
| ---------- | -------------------------------------------------------------- |
| 2026-10-17 | Removed accent dash before author name                         |
| 2026-10-17 | Editorial card UI, skeleton loading, centered pager, dark mode |
| 2026-10-17 | README rewritten for project                                   |
