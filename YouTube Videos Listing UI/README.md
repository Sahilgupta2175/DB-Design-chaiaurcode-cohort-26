# YouTube Videos Listing UI

Small React app. Fetches YouTube videos from the [FreeAPI](https://freeapi.app) public endpoint and shows them in a responsive card grid, 10 per page, with Previous / Next pagination. Clicking a card opens the video on YouTube.

## Features

- "Fetch Videos" button loads page 1. Label changes to "Refresh Videos" once videos are shown, "Loading..." while fetching.
- Video cards (whole card is one link, opens in a new tab):
  - 16:9 thumbnail (lazy loaded, zooms slightly on hover)
  - Duration badge bottom right (`19:35`, `1:17:17`)
  - Play button overlay on hover / keyboard focus
  - Channel avatar (first letter of channel name)
  - Title clamped to two lines
  - Channel name
  - Compact view count and publish date (`17K views • Jul 19, 2023`)
  - Likes and comments (`👍 1.1K  💬 51`)
- Likes / comments row pinned to card bottom so cards in a row line up.
- Previous / Next buttons, disabled on first / last page and while fetching.
- Buttons always visible. "Page X of Y" label centered under them once videos load.
- Loading state: shimmer skeleton cards in place of videos.
- Cards fade in one after another.
- Empty placeholder before first fetch.
- Error message on failed fetch. Buttons re-enable for retry.
- Light and dark mode, follows OS setting (`prefers-color-scheme`).
- Animations off when user prefers reduced motion.

## Responsive Layout

Grid uses `repeat(auto-fill, minmax(280px, 1fr))`, so columns reflow to fit the screen.

| Screen width  | Columns (approx.) | Notes                              |
| ------------- | ----------------- | ---------------------------------- |
| 1280px and up | 4                 | Content capped at 1280px, centered |
| Laptop        | 3                 |                                    |
| Tablet        | 2                 |                                    |
| Under 560px   | 1                 | Tighter padding and gaps           |

## Tech Stack

- React 19
- Vite 8
- ESLint 10 (react-hooks, react-refresh)
- Plain CSS with custom properties (design tokens)
- System font stack (no web fonts)
- `Intl.NumberFormat` (compact notation) for counts, no extra libraries

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
YouTube Videos Listing UI/
├── index.html
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx                        # React entry
    ├── App.jsx                         # Renders YoutubeVideosListing
    └── components/
        ├── YoutubeVideosListing.jsx    # Fetch + pagination logic, duration formatting, card markup
        └── YoutubeVideosListing.css    # Color tokens, grid, cards, pager, responsive layout
```

## API

```text
GET https://api.freeapi.app/api/v1/public/youtube/videos?page=<n>&limit=10
```

Each entry in `data.data.data` wraps the actual video in an `items` object. Fields used (paths relative to `items`):

| Field                     | Use                                         |
| ------------------------- | ------------------------------------------- |
| `id`                      | Card key, YouTube watch link                |
| `snippet.title`           | Card title                                  |
| `snippet.channelTitle`    | Channel name, avatar letter                 |
| `snippet.publishedAt`     | Publish date                                |
| `snippet.thumbnails.high` | Thumbnail (falls back to `medium`)          |
| `contentDetails.duration` | ISO 8601 (`PT19M35S`), shown as `19:35`     |
| `statistics.viewCount`    | View count (compact)                        |
| `statistics.likeCount`    | Likes (compact)                             |
| `statistics.commentCount` | Comments (compact)                          |

`totalPages` (at `data.data.totalPages`) drives the "of Y" label and disables Next on the last page.

`high` thumbnails are 4:3 with black bars; the 16:9 frame with `object-fit: cover` crops them off.

Page size is the `Limit` constant in [YoutubeVideosListing.jsx](src/components/YoutubeVideosListing.jsx).

## Theming

All colors are CSS variables at the top of [YoutubeVideosListing.css](src/components/YoutubeVideosListing.css). `:root` holds light values. `@media (prefers-color-scheme: dark)` overrides them for dark mode.

To change accent color, edit `--accent`, `--accent-hover` and `--accent-soft` in both blocks. Keep button text on `--accent` readable (contrast 4.5:1 or more).

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

| Date       | Change                                                                   |
| ---------- | ------------------------------------------------------------------------ |
| 2026-10-17 | Responsive video card grid, duration badge, skeleton loading, dark mode  |
| 2026-10-17 | Fixed blank cards (video data read from `items`)                         |
| 2026-10-17 | README rewritten for project                                             |
