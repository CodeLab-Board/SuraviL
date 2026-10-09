# Campus Closet interview exercise

A small React + TypeScript frontend and Express backend application. The starter is **intentionally unfinished**. The page runs locally, but the type check fails and the catalog request returns HTTP 501 until the candidate completes the two tasks.

## Run it

```bash
npm install
npm run dev
```

Open **http://localhost:5173**. The frontend calls the API on port 3001 through Vite's proxy. The terminal immediately shows the intended TypeScript errors and updates as files change. Use Node.js 20 or newer.

## Question 1 · TypeScript schema (~5 minutes)

Open `src/types.ts`. Complete `CatalogItem` with **at least four** missing fields. Use `server/data/items.json` and the existing card UI as guides. Run `npm run check` to verify the types. The starter intentionally produces TypeScript property errors until this is done.

## Question 2 · Backend endpoint (~5 minutes)

Open `server/index.ts`. Complete `GET /api/items?category=...` so it returns:

```json
{ "items": [] }
```

The starter already normalizes the query parameter to a trimmed, lowercase string. An absent or invalid `category` becomes `''`, so it can be checked for a missing category directly.

Include an item when its **category matches the requested category** and its **quantity is greater than zero**. If `category` is missing, blank, or invalid, return HTTP 400 with a JSON `error` message. An unknown but present category should return HTTP 200 with an empty array. The provided JSON file is the data source; no database or authentication is needed.

Use the **Browse items** button to test the endpoint. The category selector includes an unknown category. Tops should return two items, bottoms one, and outerwear one. Sold-out items should not appear.

Test the missing-category case directly:

```bash
curl -i 'http://localhost:3001/api/items'
```

## Useful commands

```bash
npm run check   # expected to fail before Question 1 is complete
npm run build   # succeeds after Question 1 is complete
```

The only intended starter failures are the missing schema fields and the HTTP 501 endpoint. There is no checkout or item-upload implementation in this exercise.
