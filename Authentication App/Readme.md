# Authentication App

A small frontend that implements a full authentication flow against the [FreeAPI](https://freeapi.app) Users module. Built with vanilla JavaScript, Tailwind CSS and Vite.

## Features

- Register a new account (username, email, password, role)
- Log in with username and password
- Cookie-based session, restored automatically on page refresh
- Profile card showing the current user (username, role, email, ID, email verified, joined date, avatar)
- Log out and clear the session
- Success and error messages that auto-hide
- Loading states: session check on page load, plus a spinner and disabled state on each button during requests

## Tech Stack

- HTML, vanilla JavaScript (ES modules)
- [Tailwind CSS](https://tailwindcss.com) v4 via `@tailwindcss/vite`
- [Vite](https://vite.dev) for dev server and build

## API Endpoints Used

Base URL: `https://api.freeapi.app/api/v1/users`

| Action | Method | Path |
| --- | --- | --- |
| Register | POST | `/register` |
| Login | POST | `/login` |
| Logout | POST | `/logout` |
| Current user | GET | `/current-user` |

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Project Structure

```text
.
├── index.html                      # All UI: forms, profile card, message box
├── vite.config.js                  # Tailwind plugin + dev proxy to FreeAPI
└── src
    ├── main.js                     # Entry: tab listeners, session check on load
    ├── style.css                   # Tailwind import
    ├── controller
    │   ├── login.controller.js     # Login form submit
    │   ├── register.controller.js  # Register form submit
    │   ├── logout.controller.js    # Logout button click
    │   └── user.controller.js      # loadCurrentUser(): fetch and render profile
    └── utils
        ├── api.helper.js           # apiRequest(): fetch wrapper
        └── ui.helper.js            # showMessage, setLoading, showTab, renderUI, fillProfile
```

## How It Works

1. **Page load:** `main.js` shows a "Checking session..." spinner and calls `GET /current-user`. If it succeeds, the profile is shown. Otherwise the login form is shown.
2. **Register:** validates input, calls `POST /register`, then switches to the login tab. Registration does not log you in.
3. **Login:** calls `POST /login`. The server sets auth cookies. The app then calls `GET /current-user` and renders the profile.
4. **Logout:** calls `POST /logout`, which clears the cookies, then shows the login form.

All requests go through `apiRequest()` in `api.helper.js`. It sends `credentials: "include"` so the browser stores and sends the auth cookies, and it throws an `Error` with the server's message on any non-2xx response.

## Why the Dev Proxy?

FreeAPI responds with `Access-Control-Allow-Origin: *`. Browsers reject that wildcard when a request uses `credentials: "include"`, so calling the API directly from `localhost` fails with a CORS error.

`vite.config.js` proxies `/api` to `https://api.freeapi.app`, so the browser sees same-origin requests and the cookies are stored against `localhost`. The app's `BASE_URL` is therefore the relative path `/api/v1/users`.

**Limitation:** the proxy only runs under `npm run dev` and `npm run preview` is not guaranteed to use it. For a deployed build you need an equivalent rewrite on your host (for example a Vercel or Netlify rewrite from `/api/*` to `https://api.freeapi.app/api/*`), or a different auth approach.

## Notes

- Passwords are sent as typed (not trimmed). Username and email are trimmed.
- Client-side validation is minimal: required fields and a 6-character password minimum on register.
- The `role` field is user-selectable (`USER` or `ADMIN`) because this is a practice API. Do not copy that into a real application.
