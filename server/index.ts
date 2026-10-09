import express from 'express';
import { readFile } from 'node:fs/promises';
import { CatalogItem } from '../src/types';

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

  if (!category) {
    res.status(400).json({ error: 'A category is required.' });
    return;
  }

  const items = await loadItems();
  const matchingItems = items.filter(
    item => item.category.trim().toLowerCase() === category && item.quantity > 0,
  );
  res.json({ items: matchingItems });
});

app.listen(3001, () => {
  console.log('Campus Closet API: http://localhost:3001');
});
