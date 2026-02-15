/**
 * Smart Procurement Engine Types
 * Multi-supplier price comparison and optimised basket calculation
 */

export interface ParsedMaterialItem {
  name: string;
  quantity: number;
  unit: string;
  original_text?: string;
}

export interface SupplierMatch {
  product_id: string;
  supplier_id: string;
  supplier_name: string;
  supplier_slug: string;
  product_name: string;
  brand: string | null;
  sku: string | null;
  current_price: number;
  regular_price: number | null;
  is_on_sale: boolean;
  discount_percentage: number | null;
  stock_status: string;
  product_url: string;
  image_url: string | null;
  delivery: SupplierDelivery;
  is_recommended: boolean;
}

export interface SupplierDelivery {
  click_collect: string;
  standard: string;
  next_day: string;
}

export interface ComparisonItem {
  name: string;
  quantity: number;
  unit: string;
  original_text?: string;
  matches: SupplierMatch[];
  best_price: number | null;
  best_supplier: string | null;
}

export interface SupplierSummary {
  supplier_id: string;
  supplier_name: string;
  supplier_slug: string;
  item_count: number;
  total: number;
  delivery: SupplierDelivery;
}

export interface OptimisedBasket {
  total: number;
  single_supplier_total: number;
  single_supplier_name: string;
  savings: number;
  savings_percentage: number;
  supplier_split: SupplierSummary[];
}

export interface ComparisonResult {
  items: ComparisonItem[];
  optimised_basket: OptimisedBasket;
  suppliers: SupplierSummary[];
}

export type ProcurementStep =
  | 'idle'
  | 'parsing_photo'
  | 'parsing_text'
  | 'comparing_prices'
  | 'done'
  | 'error';

export interface ProcurementState {
  step: ProcurementStep;
  error: string | null;
  parsedItems: ParsedMaterialItem[];
  comparison: ComparisonResult | null;
}
