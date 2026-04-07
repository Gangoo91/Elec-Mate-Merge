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
  /** Full Tailwind class for the category dot/badge background */
  dotClass: string;
  /** Full Tailwind classes for active pill state */
  pillActiveClass: string;
  /** Full Tailwind classes for filter pill with count */
  filterActiveClass: string;
}

export const INVENTORY_CATEGORIES: InventoryCategoryConfig[] = [
  {
    id: 'cable',
    label: 'Cable',
    icon: 'Cable',
    dotClass: 'bg-blue-500',
    pillActiveClass: 'bg-blue-500/20 text-white border border-blue-500/40',
    filterActiveClass: 'bg-blue-500/20 text-white border border-blue-500/30',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    icon: 'Plug',
    dotClass: 'bg-cyan-500',
    pillActiveClass: 'bg-cyan-500/20 text-white border border-cyan-500/40',
    filterActiveClass: 'bg-cyan-500/20 text-white border border-cyan-500/30',
  },
  {
    id: 'fixings',
    label: 'Fixings',
    icon: 'Wrench',
    dotClass: 'bg-amber-500',
    pillActiveClass: 'bg-amber-500/20 text-white border border-amber-500/40',
    filterActiveClass: 'bg-amber-500/20 text-white border border-amber-500/30',
  },
  {
    id: 'consumer_units',
    label: 'Consumer Units',
    icon: 'LayoutGrid',
    dotClass: 'bg-purple-500',
    pillActiveClass: 'bg-purple-500/20 text-white border border-purple-500/40',
    filterActiveClass: 'bg-purple-500/20 text-white border border-purple-500/30',
  },
  {
    id: 'mcbs_rcds',
    label: 'MCBs/RCDs',
    icon: 'Zap',
    dotClass: 'bg-orange-500',
    pillActiveClass: 'bg-orange-500/20 text-white border border-orange-500/40',
    filterActiveClass: 'bg-orange-500/20 text-white border border-orange-500/30',
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: 'Hammer',
    dotClass: 'bg-emerald-500',
    pillActiveClass: 'bg-emerald-500/20 text-white border border-emerald-500/40',
    filterActiveClass: 'bg-emerald-500/20 text-white border border-emerald-500/30',
  },
  {
    id: 'ppe',
    label: 'PPE',
    icon: 'HardHat',
    dotClass: 'bg-red-500',
    pillActiveClass: 'bg-red-500/20 text-white border border-red-500/40',
    filterActiveClass: 'bg-red-500/20 text-white border border-red-500/30',
  },
  {
    id: 'other',
    label: 'Other',
    icon: 'Package',
    dotClass: 'bg-gray-500',
    pillActiveClass: 'bg-gray-500/20 text-white border border-gray-500/40',
    filterActiveClass: 'bg-gray-500/20 text-white border border-gray-500/30',
  },
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
