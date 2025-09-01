
export interface MaterialItem {
  id: number;
  name: string;
  category?: string;
  price: string;
  supplier: string;
  description?: string;
  url?: string;
  inStock?: boolean;
  originalPrice?: string;
  image?: string;
  stockStatus?: 'In Stock' | 'Out of Stock' | 'Low Stock';
  isOnSale?: boolean;
  salePrice?: string;
  highlights?: string[];
  productUrl?: string;
}

export interface PriceComparisonItem {
  id: number;
  name: string;
  category: string;
  price: string;
  numericPrice: number;
  supplier: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  productUrl?: string;
  highlights?: string[];
  image?: string;
}
