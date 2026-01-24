/**
 * Invoice Scanner Types
 * Types for AI-powered invoice photo scanning and material matching
 */

/**
 * Item extracted from invoice photo by Gemini Vision
 */
export interface ExtractedInvoiceItem {
  description: string;
  quantity: number;
  unit_price: number | null;
  total_price: number | null;
  product_code: string | null;
  category: string;
}

/**
 * Response from parse-invoice-photo edge function
 */
export interface ParseInvoiceResponse {
  success: boolean;
  supplier_name: string | null;
  invoice_number: string | null;
  invoice_date: string | null;
  items: ExtractedInvoiceItem[];
  requestId: string;
  error?: string;
}

/**
 * A matched material from the database
 */
export interface MaterialMatch {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  unit: string;
  defaultPrice: number;
  code?: string;
  score: number; // 0-1 similarity score
  source: 'local' | 'server'; // Where the match came from
}

/**
 * An extracted item with its best material match
 */
export interface ScannedInvoiceItem {
  /** Unique ID for this scanned item */
  id: string;
  /** Original extracted item from AI */
  extracted: ExtractedInvoiceItem;
  /** Best matching material from database */
  match: MaterialMatch | null;
  /** Alternative matches user can select from */
  alternativeMatches: MaterialMatch[];
  /** Whether to include this item when adding to invoice */
  selected: boolean;
  /** User-overridden quantity (defaults to extracted quantity) */
  quantity: number;
  /** User-overridden unit price (defaults to extracted or match price) */
  unitPrice: number;
}

/**
 * State of the invoice scanning process
 */
export type ScannerState =
  | 'idle'           // Initial state
  | 'capturing'      // Camera is active
  | 'uploading'      // Image is being uploaded/converted
  | 'processing'     // AI is extracting items
  | 'matching'       // Finding material matches
  | 'review'         // User reviewing results
  | 'error';         // Error occurred

/**
 * Invoice scanner result after processing
 */
export interface ScanResult {
  /** Whether scan was successful */
  success: boolean;
  /** Supplier name if detected */
  supplierName: string | null;
  /** Invoice number if detected */
  invoiceNumber: string | null;
  /** Invoice date if detected */
  invoiceDate: string | null;
  /** Scanned items with matches */
  items: ScannedInvoiceItem[];
  /** Error message if failed */
  error?: string;
}

/**
 * Options for the invoice scanner hook
 */
export interface InvoiceScannerOptions {
  /** Minimum match score to consider a match valid (0-1) */
  minMatchScore?: number;
  /** Maximum number of alternative matches to show */
  maxAlternatives?: number;
  /** Whether to auto-select high-confidence matches */
  autoSelectThreshold?: number;
}
