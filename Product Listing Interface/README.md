# Product Listing Interface

Small React app. Fetches products from the [FreeAPI](https://freeapi.app) public endpoint and shows them in a responsive card grid, 8 per page, with Previous / Next pagination.

## Features

- "Fetch Products" button loads page 1. Label changes to "Refresh Products" once products are shown, "Loading..." while fetching.
- Product cards:
  - Thumbnail image (lazy loaded, zooms slightly on hover)
  - Category chip and discount badge (`-13%`) over the image
  - Brand, title (one line), description (clamped to two lines)
  - Price, with original pre-discount price struck through
  - Star rating badge
  - Stock line, red "Only N left" when stock is under 20
- Price row pinned to card bottom so cards in a row line up.
- Previous / Next buttons, disabled on first / last page and while fetching.
- Buttons always visible. "Page X of Y" label centered under them once products load.
- Loading state: shimmer skeleton cards in place of products.
- Cards fade in one after another.
- Empty placeholder before first fetch.
- Error message on failed fetch. Buttons re-enable for retry.
- Light and dark mode, follows OS setting (`prefers-color-scheme`).
- Animations off when user prefers reduced motion.

## Responsive Layout

Grid uses `repeat(auto-fill, minmax(240px, 1fr))`, so columns reflow to fit the screen.

| Screen width  | Columns (approx.) | Notes                                            |
| ------------- | ----------------- | ------------------------------------------------ |
| 1200px and up | 4                 | Content capped at 1200px, centered               |
| Tablet        | 2 to 3            |                                                  |
| Under 560px   | 2                 | 160px min card, description and old price hidden |

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
Product Listing Interface/
├── index.html
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx                             # React entry
    ├── App.jsx                              # Renders ProductListingApplication
    └── components/
        ├── ProductListingApplication.jsx    # Fetch + pagination logic, card markup
        └── ProductListingApplication.css    # Color tokens, grid, cards, pager, responsive layout
```

## API

```text
GET https://api.freeapi.app/api/v1/public/randomproducts?page=<n>&limit=8
```

Fields used from response (`data.data.*`):

| Field                       | Use                                         |
| --------------------------- | ------------------------------------------- |
| `data`                      | Array of products for current page          |
| `data[].id`                 | Card key                                    |
| `data[].title`              | Card title, image alt text                  |
| `data[].thumbnail`          | Card image                                  |
| `data[].category`           | Category chip                               |
| `data[].brand`              | Brand line                                  |
| `data[].description`        | Description                                 |
| `data[].price`              | Current price                               |
| `data[].discountPercentage` | Discount badge, struck-through old price    |
| `data[].rating`             | Rating badge (one decimal)                  |
| `data[].stock`              | Stock line                                  |
| `totalPages`                | "of Y" label, disables Next on last page    |

Product name field is `title`, not `name`. Images are hosted on `cdn.dummyjson.com`; if it is down, cards show a grey image area.

Page size is the `Limit` constant in [ProductListingApplication.jsx](src/components/ProductListingApplication.jsx). Update the subtitle text there too when you change it.

## Theming

All colors are CSS variables at the top of [ProductListingApplication.css](src/components/ProductListingApplication.css). `:root` holds light values. `@media (prefers-color-scheme: dark)` overrides them for dark mode.

To change accent color, edit `--accent`, `--accent-hover` and `--accent-soft` in both blocks. Keep button text on `--accent` readable (contrast 4.5:1 or more). Sale red is `--sale`, star color is `--star`.

## Updating This Documentation

README is plain Markdown. Edit this file directly, commit with the code change it describes.

Update README when you:

- Add or remove a feature, then edit **Features**.
- Change grid breakpoints or card sizes, then edit **Responsive Layout**.
- Add a dependency or script in `package.json`, then edit **Tech Stack** / **Scripts**.
- Add, move or rename files, then edit **Project Structure**.
- Change API endpoint, page size or fields read, then edit **API**.
- Change color tokens or fonts, then edit **Theming** / **Tech Stack**.

Preview in VS Code with `Ctrl+Shift+V`. Suggested commit message: `docs: update README <what changed>`.

## Changelog

Add a line per notable change, newest first.

| Date       | Change                                                               |
| ---------- | -------------------------------------------------------------------- |
| 2026-10-17 | Page size 10 to 8                                                    |
| 2026-10-17 | Responsive card grid UI, skeleton loading, centered pager, dark mode |
| 2026-10-17 | Fixed blank product names (API field is `title`, not `name`)         |
| 2026-10-17 | README rewritten for project                                         |
