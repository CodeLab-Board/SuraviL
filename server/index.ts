import express from 'express';
import { readFile } from 'node:fs/promises';
import type { CatalogItem } from '../src/types';

const app = express();
const itemsFile = new URL('./data/items.json', import.meta.url);

// Use this helper in Question 2. No database or persistence is needed.
async function loadItems(): Promise<CatalogItem[]> {
  return JSON.parse(await readFile(itemsFile, 'utf8')) as CatalogItem[];
}

app.get('/api/items', async (req, res) => {
  // Normalize Express's query type so the task stays focused on filtering.
  const category = typeof req.query.category === 'string'
    ? req.query.category.trim().toLowerCase()
    : '';

  // Question 2: validate category, loadItems(), filter, and respond.
  // See README.md for the complete behavior. Replace this 501 response.
  res.status(501).json({ error: 'Category browsing is not implemented yet.' });
});

app.listen(3001, () => {
  console.log('Campus Closet API: http://localhost:3001');
});
