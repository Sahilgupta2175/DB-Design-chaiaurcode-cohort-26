# Random User UI

Small React app. Fetches random user profiles from the [FreeAPI](https://freeapi.app) public endpoint and shows them as cards with pagination.

## Features

- "Load Random User" button fetches first page (10 users).
- User card: avatar, full name, email, city and country.
- Previous / Next pagination with page counter.
- Loading and error status messages.

## Tech Stack

- React 19
- Vite 8
- ESLint 10 (react-hooks, react-refresh)
- Plain CSS

## Getting Started

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
Random User UI/
├── index.html
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx                  # React entry
    ├── App.jsx                   # Renders RandomUser
    ├── App.css
    ├── index.css                 # Global styles
    └── components/
        ├── RandomUsers.jsx       # Fetch logic, cards, pagination
        └── RandomUsers.css
```

## API

```
GET https://api.freeapi.app/api/v1/public/randomusers?page={page}&limit={limit}
```

Fields used from response (`data.data.*`):

| Field | Use |
|-------|-----|
| `data` | Array of users |
| `totalPages` | Pagination limit |
| `login.uuid` | React key |
| `picture.large` | Avatar |
| `name.title/first/last` | Display name |
| `email` | Email line |
| `location.city/country` | Location tag |

Page size set by `LIMIT` constant in [RandomUsers.jsx](src/components/RandomUsers.jsx).

## Updating This Documentation

README is plain Markdown. Edit this file directly, commit with the code change it describes.

Update README when you:

- Add or remove a feature, then edit **Features**.
- Add a dependency or script in `package.json`, then edit **Tech Stack** / **Scripts**.
- Add, move or rename files, then edit **Project Structure**.
- Change API endpoint, params or fields read, then edit **API**.
- Change `LIMIT` or other config, then edit the matching section.

Tips:

- Keep commands copy-paste runnable.
- Keep tables and tree in sync with code.
- Preview in VS Code: `Ctrl+Shift+V`.
- Suggested commit message: `docs: update README <what changed>`.

## Changelog

Add a line per notable change, newest first.

| Date | Change |
|------|--------|
| 2026-10-15 | README rewritten for project, added docs-update guide |
