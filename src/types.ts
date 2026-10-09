// Question 1: complete this interface using server/data/items.json and App.tsx.
export interface CatalogItem {
  name: string;
  description: string;
  sellerId: string;
}

export interface CatalogResponse {
  items: CatalogItem[];
}
