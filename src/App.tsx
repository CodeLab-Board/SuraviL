import { useState } from 'react';
import type { CatalogItem, CatalogResponse } from './types';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function App() {
  const [category, setCategory] = useState('tops');
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [searchedCategory, setSearchedCategory] = useState('');

  async function browse() {
    setStatus('loading');
    setError('');
    setItems([]);
    setSearchedCategory(category);
    try {
      const response = await fetch(`/api/items?category=${encodeURIComponent(category)}`);
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Unable to load the catalog.');
      setItems((body as CatalogResponse).items);
      setStatus('success');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to load the catalog.');
      setStatus('error');
    }
  }

  return (
    <main>
      <header><span className="eyebrow">STUDENT MARKETPLACE</span><h1>Campus Closet</h1>
        <p>Find a new favorite from another student’s wardrobe.</p></header>
      <section className="search" aria-label="Browse catalog">
        <label htmlFor="category">Clothing category</label>
        <div className="controls">
          <select id="category" value={category} disabled={status === 'loading'} onChange={e => setCategory(e.target.value)}>
            <option value="tops">Tops</option><option value="bottoms">Bottoms</option>
            <option value="outerwear">Outerwear</option><option value="accessories">Accessories (unknown category)</option>
          </select>
          <button disabled={status === 'loading'} onClick={browse}>{status === 'loading' ? 'Loading…' : 'Browse items'}</button>
        </div>
        <p className="hint">Available listings only. Sold-out items stay off the shelf.</p>
      </section>
      <section aria-label="Catalog results" aria-live="polite" aria-busy={status === 'loading'}>
        {status === 'idle' && <p className="message">Choose a category, then browse to see what’s available.</p>}
        {status === 'loading' && <p className="message">Finding clothes for you…</p>}
        {status === 'error' && <p className="message error" role="alert">{error} Try browsing again after completing Question 2.</p>}
        {status === 'success' && <>
          <h2>{items.length} {items.length === 1 ? 'item' : 'items'} available in {searchedCategory}</h2>
          {items.length === 0 && <p className="message">No available items in this category. Try another category.</p>}
          <div className="grid">{items.map(item => <article key={item.id}>
            <span className="badge">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p>
            <dl><div><dt>Price</dt><dd>{money.format(item.price)}</dd></div>
              <div><dt>Size</dt><dd>{item.size}</dd></div><div><dt>Available</dt><dd>{item.quantity}</dd></div>
            </dl>
          </article>)}</div>
        </>}
      </section>
      <footer>Local catalog demo</footer>
    </main>
  );
}
