# Frontend AGENTS.md

## Commands

- `npm run dev` - Vite dev server on :5173
- `npm run build` - outputs to `dist/`
- `npm run preview` - preview production build
- Capacitor: `npx cap copy` (sync web assets), `npx cap open android` (open Android Studio)

## Setup

- `npm install` for dependencies
- Capacitor config: `webDir: "dist"`, app ID `com.example.app`

## Architecture

- Ionic vanilla JS (NO React/Vue)
- Pages are custom elements (`class X extends HTMLElement`) in `src/pages/`, registered via `customElements.define()`
- Routing via `<ion-router>` in `index.html`
- Vite config uses `vite-plugin-static-copy` to copy Ionic dist files to build output
- `/ionic.esm.js` marked as external in rollup options

## Gotchas

- No frontend test suite currently configured
- Uses ES modules (`"type": "module"` in package.json)
- Ionic core loaded via dynamic import with `vite-ignore` comment in `src/main.js`

## Mobile

- Run `npm run build` then `npx cap copy` to sync to native projects
