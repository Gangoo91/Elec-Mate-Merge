// Inventory Categories — UK electrician consumables & equipment
export type InventoryCategory =
  | 'cable'
  | 'accessories'
  | 'fixings'
  | 'consumer_units'
  | 'mcbs_rcds'
  | 'tools'
  | 'ppe'
  | 'other';

export type InventoryLocation = 'van' | 'garage' | 'site' | 'wholesaler' | 'other';

export type InventoryUnit =
  | 'each'
  | 'metres'
  | 'rolls'
  | 'boxes'
  | 'packs'
  | 'pairs'
  | 'sets'
  | 'litres'
  | 'kg';

// Category configuration with display info
export interface InventoryCategoryConfig {
  id: InventoryCategory;
  label: string;
  icon: string; // Lucide icon name
  colour: string; // Tailwind colour class
}

export const INVENTORY_CATEGORIES: InventoryCategoryConfig[] = [
  { id: 'cable', label: 'Cable', icon: 'Cable', colour: 'blue-500' },
  { id: 'accessories', label: 'Accessories', icon: 'Plug', colour: 'cyan-500' },
  { id: 'fixings', label: 'Fixings', icon: 'Wrench', colour: 'amber-500' },
  { id: 'consumer_units', label: 'Consumer Units', icon: 'LayoutGrid', colour: 'purple-500' },
  { id: 'mcbs_rcds', label: 'MCBs/RCDs', icon: 'Zap', colour: 'orange-500' },
  { id: 'tools', label: 'Tools', icon: 'Hammer', colour: 'emerald-500' },
  { id: 'ppe', label: 'PPE', icon: 'HardHat', colour: 'red-500' },
  { id: 'other', label: 'Other', icon: 'Package', colour: 'gray-500' },
];

export const INVENTORY_LOCATIONS: { id: InventoryLocation; label: string; icon: string }[] = [
  { id: 'van', label: 'Van', icon: 'Truck' },
  { id: 'garage', label: 'Garage', icon: 'Warehouse' },
  { id: 'site', label: 'Site', icon: 'HardHat' },
  { id: 'wholesaler', label: 'Wholesaler', icon: 'Store' },
  { id: 'other', label: 'Other', icon: 'MapPin' },
];

export const INVENTORY_UNITS: { id: InventoryUnit; label: string; pluralLabel: string }[] = [
  { id: 'each', label: 'each', pluralLabel: 'each' },
  { id: 'metres', label: 'metre', pluralLabel: 'metres' },
  { id: 'rolls', label: 'roll', pluralLabel: 'rolls' },
  { id: 'boxes', label: 'box', pluralLabel: 'boxes' },
  { id: 'packs', label: 'pack', pluralLabel: 'packs' },
  { id: 'pairs', label: 'pair', pluralLabel: 'pairs' },
  { id: 'sets', label: 'set', pluralLabel: 'sets' },
  { id: 'litres', label: 'litre', pluralLabel: 'litres' },
  { id: 'kg', label: 'kg', pluralLabel: 'kg' },
];

// Decimal-friendly units get 0.5 step; count-based units get 1 step
export const UNIT_STEP: Record<InventoryUnit, number> = {
  each: 1,
  metres: 0.5,
  rolls: 1,
  boxes: 1,
  packs: 1,
  pairs: 1,
  sets: 1,
  litres: 0.5,
  kg: 0.5,
};

export interface InventoryItem {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  category: InventoryCategory;
  quantity: number;
  unit: InventoryUnit;
  location: InventoryLocation;
  low_stock_threshold: number | null;
  unit_cost: number | null;
  supplier: string | null;
  barcode: string | null;
  photo_url: string | null;
  notes: string | null;
  last_used_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateInventoryInput {
  name: string;
  description?: string | null;
  category: InventoryCategory;
  quantity: number;
  unit?: InventoryUnit;
  location: InventoryLocation;
  low_stock_threshold?: number | null;
  unit_cost?: number | null;
  supplier?: string | null;
  barcode?: string | null;
  notes?: string | null;
}

export interface UpdateInventoryInput extends Partial<CreateInventoryInput> {
  id: string;
}

export interface InventoryStats {
  totalItems: number;
  totalValue: number;
  lowStockCount: number;
  byCategory: Partial<Record<InventoryCategory, number>>;
  byLocation: Partial<Record<InventoryLocation, number>>;
}

export interface InventoryFilters {
  category: InventoryCategory | 'all';
  location: InventoryLocation | 'all';
  lowStockOnly: boolean;
  searchQuery: string;
}

export function getCategoryConfig(categoryId: InventoryCategory): InventoryCategoryConfig {
  return (
    INVENTORY_CATEGORIES.find((c) => c.id === categoryId) ||
    INVENTORY_CATEGORIES[INVENTORY_CATEGORIES.length - 1]
  );
}

export function getLocationConfig(locationId: InventoryLocation) {
  return (
    INVENTORY_LOCATIONS.find((l) => l.id === locationId) ||
    INVENTORY_LOCATIONS[INVENTORY_LOCATIONS.length - 1]
  );
}

export function formatQuantity(quantity: number, unit: InventoryUnit): string {
  const unitConfig = INVENTORY_UNITS.find((u) => u.id === unit);
  if (!unitConfig) return `${quantity}`;
  const label = quantity === 1 ? unitConfig.label : unitConfig.pluralLabel;
  return `${quantity} ${label}`;
}
