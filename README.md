# Daylight Todo List

A small, responsive React todo app with animated task updates, light and dark themes, and browser-local persistence.

## Run locally

Requires Node.js 16. Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Structure

- `src/App.jsx`: App entry component.
- `src/main.jsx`: React DOM mounting and global styles.
- `src/features/todos/`: Todo interface, task components, and todo state hook.
- `src/styles/global.css`: Global styles and light/dark theme tokens.

Tasks and theme preference are saved in the browser's local storage.
