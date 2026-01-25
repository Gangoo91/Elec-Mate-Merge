// Expense Categories
export type ExpenseCategory =
  | 'fuel'
  | 'tools'
  | 'ppe'
  | 'materials'
  | 'hotels'
  | 'mileage'
  | 'training'
  | 'vehicle'
  | 'insurance'
  | 'subscriptions'
  | 'meals'
  | 'other';

// Category configuration with display info
export interface ExpenseCategoryConfig {
  id: ExpenseCategory;
  label: string;
  icon: string; // Lucide icon name
  colour: string; // Tailwind colour class
  taxDeductible: boolean;
  taxNote?: string; // e.g., "Limited" for meals
}

// All expense categories with their configuration
export const EXPENSE_CATEGORIES: ExpenseCategoryConfig[] = [
  { id: 'fuel', label: 'Fuel', icon: 'Fuel', colour: 'orange-500', taxDeductible: true },
  { id: 'tools', label: 'Tools', icon: 'Wrench', colour: 'amber-500', taxDeductible: true },
  { id: 'ppe', label: 'PPE', icon: 'HardHat', colour: 'red-500', taxDeductible: true },
  { id: 'materials', label: 'Materials', icon: 'Package', colour: 'cyan-500', taxDeductible: true },
  { id: 'hotels', label: 'Hotels', icon: 'Hotel', colour: 'purple-500', taxDeductible: true },
  { id: 'mileage', label: 'Mileage', icon: 'Car', colour: 'green-500', taxDeductible: true },
  { id: 'training', label: 'Training', icon: 'GraduationCap', colour: 'teal-500', taxDeductible: true },
  { id: 'vehicle', label: 'Vehicle', icon: 'Truck', colour: 'slate-500', taxDeductible: true },
  { id: 'insurance', label: 'Insurance', icon: 'Shield', colour: 'indigo-500', taxDeductible: true },
  { id: 'subscriptions', label: 'Subscriptions', icon: 'CreditCard', colour: 'pink-500', taxDeductible: true },
  { id: 'meals', label: 'Meals', icon: 'UtensilsCrossed', colour: 'rose-500', taxDeductible: true, taxNote: 'Limited' },
  { id: 'other', label: 'Other', icon: 'MoreHorizontal', colour: 'gray-500', taxDeductible: true },
];

// Helper function to get category config by id
export function getCategoryConfig(categoryId: ExpenseCategory): ExpenseCategoryConfig {
  return EXPENSE_CATEGORIES.find(c => c.id === categoryId) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
}

// Core expense interface matching database schema
export interface Expense {
  id: string;
  user_id: string;

  // Core data
  category: ExpenseCategory;
  amount: number;
  date: string; // ISO date string (YYYY-MM-DD)
  vendor: string | null;
  description: string | null;

  // Receipt
  receipt_url: string | null;

  // Mileage specific
  mileage_miles: number | null;
  mileage_rate: number; // Default 0.45
  mileage_from: string | null;
  mileage_to: string | null;

  // Tax
  tax_deductible: boolean;
  vat_amount: number | null;

  // AI extraction
  ai_extracted: boolean;

  // Accounting sync
  synced_to_accounting: boolean;

  // Timestamps
  created_at: string;
  updated_at: string;
}

// For creating new expenses (omit auto-generated fields)
export interface CreateExpenseInput {
  category: ExpenseCategory;
  amount: number;
  date: string;
  vendor?: string | null;
  description?: string | null;
  receipt_url?: string | null;
  mileage_miles?: number | null;
  mileage_rate?: number;
  mileage_from?: string | null;
  mileage_to?: string | null;
  tax_deductible?: boolean;
  vat_amount?: number | null;
  ai_extracted?: boolean;
}

// For updating expenses
export interface UpdateExpenseInput extends Partial<CreateExpenseInput> {
  id: string;
}

// AI extraction result from receipt scanning
export interface ExpenseExtractionResult {
  vendor: string | null;
  amount: number | null;
  date: string | null;
  category: ExpenseCategory | null;
  vat_amount: number | null;
  description: string | null;
  confidence: number; // 0-1
  rawText?: string;
}

// Expense statistics
export interface ExpenseStats {
  totalAmount: number;
  totalTaxDeductible: number;
  monthlyAmount: number;
  yearToDateAmount: number;
  byCategory: Record<ExpenseCategory, number>;
  count: number;
}

// Grouped expenses by category
export interface ExpenseGroup {
  category: ExpenseCategory;
  config: ExpenseCategoryConfig;
  expenses: Expense[];
  total: number;
  count: number;
}

// Filter options
export type ExpenseFilterPeriod = 'all' | 'this-month' | 'last-month' | 'this-year' | 'custom';

export interface ExpenseFilters {
  category: ExpenseCategory | 'all';
  period: ExpenseFilterPeriod;
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
}

// Accounting export types
export type AccountingProvider = 'xero' | 'sage' | 'quickbooks' | 'csv';

export interface AccountingExportConfig {
  provider: AccountingProvider;
  dateFormat: string;
  includeTaxCode: boolean;
  categoryMapping: Record<ExpenseCategory, string>;
}

// Default HMRC mileage rate
export const DEFAULT_MILEAGE_RATE = 0.45; // 45p per mile
