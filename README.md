# Campus Canteen

A responsive campus food ordering interface built with React, Vite, React Router, and the Context API. Menu items are loaded from the local `public/menu.json` file; no backend or external API is required.

## Run locally

1. Install Node.js (18 or newer).
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite.

Do not open `index.html` directly from your file manager (`file://`). The menu is served from `public/menu.json` by Vite at `/menu.json`, so the app must be opened at the Vite URL (for example, `http://localhost:5173/`) while `npm run dev` is running.

## Available scripts

- `npm run dev` — start the Vite development server.
- `npm run build` — create a production build in `dist`.
- `npm run preview` — preview the production build locally.

## Project structure

- `public/menu.json` — the locally stored menu data.
- `src/components/` — shared header, footer, menu cards, and cart UI.
- `src/context/CartContext.jsx` — shared cart state and cart actions.
- `src/hooks/useMenuData.js` — menu loading, loading state, and error handling.
- `src/pages/` — menu, item details, and cart routes.

The cart is held in React state for the current session and resets when the page is reloaded.
