# Meals Listing Interface

Small React app. Fetches recipes from the [FreeAPI](https://freeapi.app) public endpoint and shows them in a responsive card grid, 6 per page, with Previous / Next pagination.

## Features

- "Fetch Meals" button loads page 1. Label changes to "Refresh Meals" once meals are shown, "Loading..." while fetching.
- Recipe cards:
  - Meal photo (lazy loaded, zooms slightly on hover)
  - Category chip (top left) and cuisine / area chip (top right) over the image
  - Meal name
  - Tag pills from `strTags`, hidden when a meal has none
  - Instructions, clamped to three lines
  - Collapsible **Ingredients** panel (native `<details>`), closed by default, with ingredient count. Each row shows ingredient name left, measure right.
  - "Watch video" (YouTube) and "Full recipe" (source) links, each shown only when present, open in a new tab
- Link row pinned to card bottom so cards in a row line up.
- Previous / Next buttons, disabled on first / last page and while fetching.
- Buttons always visible. "Page X of Y" label centered under them once meals load.
- Loading state: shimmer skeleton cards in place of meals.
- Cards fade in one after another.
- Empty placeholder before first fetch.
- Error message on failed fetch. Buttons re-enable for retry.
- Light and dark mode, follows OS setting (`prefers-color-scheme`).
- Animations off when user prefers reduced motion.

## Responsive Layout

Grid uses `repeat(auto-fill, minmax(300px, 1fr))`, so columns reflow to fit the screen.

| Screen width  | Columns (approx.) | Notes                              |
| ------------- | ----------------- | ---------------------------------- |
| 1000px and up | 3                 | Content capped at 1200px, centered |
| Tablet        | 2                 |                                    |
| Under 560px   | 1                 | Tighter padding and gaps           |

6 meals per page fills every row on 1, 2 and 3 columns.

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
Meals Listing Interface/
├── index.html
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx                          # React entry
    ├── App.jsx                           # Renders MealListingApplication
    └── components/
        ├── MealListingApplication.jsx    # Fetch + pagination logic, ingredient parsing, card markup
        └── MealListingApplication.css    # Color tokens, grid, cards, ingredients panel, pager, responsive layout
```

## API

```text
GET https://api.freeapi.app/api/v1/public/meals?page=<n>&limit=6
```

Fields used from response (`data.data.*`):

| Field                                          | Use                                      |
| ---------------------------------------------- | ---------------------------------------- |
| `data`                                         | Array of meals for current page          |
| `data[].idMeal`                                | Card key                                 |
| `data[].strMeal`                               | Meal name, image alt text                |
| `data[].strMealThumb`                          | Card image                               |
| `data[].strCategory`                           | Category chip                            |
| `data[].strArea`                               | Cuisine chip                             |
| `data[].strTags`                               | Comma-separated string, split into pills |
| `data[].strInstructions`                       | Instructions text                        |
| `data[].strIngredient1..20`, `strMeasure1..20` | Ingredients list (empty entries skipped) |
| `data[].strYoutube`                            | "Watch video" link                       |
| `data[].strSource`                             | "Full recipe" link                       |
| `totalPages`                                   | "of Y" label, disables Next on last page |

`totalPages` lives at `data.data.totalPages`, not `data.totalPages`. Image and video URLs may come wrapped in Markdown link syntax `(...)`; the component extracts the plain URL. Images are hosted on `themealdb.com`; if it is down, cards show a grey image area.

Page size is the `Limit` constant in [MealListingApplication.jsx](src/components/MealListingApplication.jsx).

## Theming

All colors are CSS variables at the top of [MealListingApplication.css](src/components/MealListingApplication.css). `:root` holds light values. `@media (prefers-color-scheme: dark)` overrides them for dark mode.

- `--accent`, `--accent-hover`, `--accent-soft`: herb green for buttons, links, ingredient count
- `--spice`, `--spice-soft`: saffron for tag pills
- `--danger`: error box

Edit both the light and dark blocks. Keep button text on `--accent` readable (contrast 4.5:1 or more).

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

| Date       | Change                                                                      |
| ---------- | --------------------------------------------------------------------------- |
| 2026-10-17 | Page size 10 to 6                                                           |
| 2026-10-17 | Responsive recipe card grid, ingredients panel, skeleton loading, dark mode |
| 2026-10-17 | Fixed pagination (`totalPages` read from `data.data`)                       |
| 2026-10-17 | README rewritten for project                                                |
