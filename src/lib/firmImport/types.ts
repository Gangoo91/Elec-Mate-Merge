/**
 * ELE-2067 — Bring your data across. The normalised record shape every
 * source mapper produces and the import_firm_rows RPC reads. Field names here
 * are the JSON keys the SQL reads (supabase/migrations/20261010228000_*).
 */

export type ImportKind =
  'customers' | 'sites' | 'jobs' | 'quotes' | 'invoices' | 'price_book' | 'staff' | 'assets';

/** The order records go in: people and places first, then the work that points at them. */
export const KIND_ORDER: ImportKind[] = [
  'customers',
  'sites',
  'staff',
  'assets',
  'price_book',
  'jobs',
  'quotes',
  'invoices',
];

export const KIND_LABEL: Record<ImportKind, { one: string; many: string }> = {
  customers: { one: 'customer', many: 'Customers' },
  sites: { one: 'site', many: 'Sites' },
  jobs: { one: 'job', many: 'Jobs' },
  quotes: { one: 'quote', many: 'Quotes' },
  invoices: { one: 'invoice', many: 'Invoices' },
  price_book: { one: 'price book item', many: 'Price book' },
  staff: { one: 'team member', many: 'Staff' },
  assets: { one: 'tool or instrument', many: 'Kit and assets' },
};

export type SourceSystem =
  | 'tradify'
  | 'fergus'
  | 'powered_now'
  | 'simpro'
  | 'servicem8'
  | 'jobber'
  | 'commusoft'
  | 'joblogic'
  | 'generic';

/** A field the mapper can fill. `join` fields accept several columns, joined with ", " (or " " for names). */
export interface FieldDef {
  key: string;
  label: string;
  required?: boolean;
  type?: 'text' | 'money' | 'date' | 'number' | 'status' | 'email' | 'phone';
  join?: 'comma' | 'space';
  hint?: string;
}

const customerLink: FieldDef[] = [
  {
    key: 'customer_ref',
    label: 'Customer ID',
    hint: 'The other system’s customer ID, if the file has one',
  },
  { key: 'customer_name', label: 'Customer name', join: 'space' },
  { key: 'customer_email', label: 'Customer email', type: 'email' },
  { key: 'customer_phone', label: 'Customer phone', type: 'phone' },
  { key: 'customer_postcode', label: 'Customer postcode' },
];

const lineItem: FieldDef[] = [
  { key: 'item_description', label: 'Line description' },
  { key: 'item_quantity', label: 'Line quantity', type: 'number' },
  { key: 'item_unit_price', label: 'Line unit price', type: 'money' },
  { key: 'item_total', label: 'Line total', type: 'money' },
];

export const KIND_FIELDS: Record<ImportKind, FieldDef[]> = {
  customers: [
    { key: 'ref', label: 'Customer ID' },
    { key: 'name', label: 'Name', required: true, join: 'space' },
    { key: 'company_name', label: 'Company' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Phone', type: 'phone' },
    { key: 'mobile', label: 'Mobile', type: 'phone' },
    { key: 'address', label: 'Address', join: 'comma' },
    { key: 'postcode', label: 'Postcode' },
    { key: 'notes', label: 'Notes', join: 'comma' },
  ],
  sites: [
    { key: 'ref', label: 'Site ID' },
    ...customerLink,
    { key: 'site_name', label: 'Site name' },
    { key: 'address', label: 'Address', required: true, join: 'comma' },
    { key: 'postcode', label: 'Postcode' },
    { key: 'property_type', label: 'Property type' },
    { key: 'notes', label: 'Notes', join: 'comma' },
  ],
  jobs: [
    { key: 'ref', label: 'Job ID or number' },
    { key: 'job_number', label: 'Job number' },
    { key: 'title', label: 'Job title', required: true },
    { key: 'description', label: 'Description', join: 'comma' },
    ...customerLink,
    { key: 'address', label: 'Job address', join: 'comma' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'start_date', label: 'Start date', type: 'date' },
    { key: 'end_date', label: 'End or due date', type: 'date' },
    { key: 'completed_date', label: 'Completed date', type: 'date' },
    { key: 'value', label: 'Value (£)', type: 'money' },
    { key: 'site_contact_name', label: 'Site contact' },
    { key: 'site_contact_phone', label: 'Site contact phone', type: 'phone' },
    { key: 'job_type', label: 'Job type' },
  ],
  quotes: [
    { key: 'number', label: 'Quote number' },
    { key: 'ref', label: 'Quote ID' },
    ...customerLink,
    { key: 'customer_address', label: 'Customer address', join: 'comma' },
    { key: 'description', label: 'Title or description' },
    { key: 'date', label: 'Quote date', type: 'date' },
    { key: 'expiry_date', label: 'Valid until', type: 'date' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'subtotal', label: 'Subtotal (ex VAT)', type: 'money' },
    { key: 'vat', label: 'VAT', type: 'money' },
    { key: 'total', label: 'Total', type: 'money' },
    { key: 'job_ref', label: 'Job number it belongs to' },
    { key: 'notes', label: 'Notes' },
    ...lineItem,
  ],
  invoices: [
    { key: 'number', label: 'Invoice number', required: true },
    { key: 'ref', label: 'Invoice ID' },
    ...customerLink,
    { key: 'customer_address', label: 'Customer address', join: 'comma' },
    { key: 'description', label: 'Title or description' },
    { key: 'date', label: 'Invoice date', type: 'date' },
    { key: 'due_date', label: 'Due date', type: 'date' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'subtotal', label: 'Subtotal (ex VAT)', type: 'money' },
    { key: 'vat', label: 'VAT', type: 'money' },
    { key: 'total', label: 'Total', type: 'money' },
    { key: 'amount_paid', label: 'Amount paid', type: 'money' },
    { key: 'amount_due', label: 'Amount due', type: 'money' },
    { key: 'paid_date', label: 'Paid date', type: 'date' },
    { key: 'job_ref', label: 'Job number it belongs to' },
    { key: 'notes', label: 'Notes' },
    ...lineItem,
  ],
  price_book: [
    { key: 'code', label: 'Item code' },
    { key: 'name', label: 'Item name', required: true },
    { key: 'unit', label: 'Unit' },
    { key: 'buy', label: 'Buy price', type: 'money' },
    { key: 'sell', label: 'Sell price', type: 'money' },
    { key: 'markup', label: 'Markup %', type: 'number' },
    { key: 'category', label: 'Category' },
    { key: 'supplier', label: 'Supplier' },
  ],
  staff: [
    { key: 'ref', label: 'Staff ID' },
    { key: 'name', label: 'Name', required: true, join: 'space' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Phone', type: 'phone' },
    { key: 'role', label: 'Role or position' },
    { key: 'hourly_rate', label: 'Hourly rate (£)', type: 'money' },
    { key: 'start_date', label: 'Start date', type: 'date' },
  ],
  assets: [
    { key: 'ref', label: 'Asset ID' },
    { key: 'name', label: 'Name', required: true },
    { key: 'category', label: 'Category or type' },
    { key: 'serial_number', label: 'Serial number' },
    { key: 'tool_number', label: 'Asset or tool number' },
    { key: 'purchase_date', label: 'Bought on', type: 'date' },
    { key: 'purchase_price', label: 'Cost (£)', type: 'money' },
    { key: 'pat_due', label: 'PAT due', type: 'date' },
    { key: 'calibration_due', label: 'Calibration due', type: 'date' },
    { key: 'notes', label: 'Notes', join: 'comma' },
  ],
};

/** field key → the column header(s) it reads. */
export type ColumnMap = Record<string, string[]>;

export interface ParsedFile {
  id: string;
  name: string;
  size: number;
  headers: string[];
  rows: Record<string, unknown>[];
}

export interface MappedFile {
  file: ParsedFile;
  kind: ImportKind | null;
  map: ColumnMap;
  /** How sure the detector was (0–1), so the wizard can ask when it is unsure. */
  confidence: number;
}

/** One record ready for import_firm_rows. */
export type NormalRow = Record<string, unknown>;

export interface ChunkResult {
  kind: ImportKind;
  created: number;
  matched: number;
  skipped: number;
  new_customers: number;
  results: {
    i: number;
    id?: string;
    action: 'created' | 'matched' | 'skipped';
    reason?: string;
    /** The key of the new customer this row made, if it made one. */
    nc?: string;
  }[];
}

export interface KindSummary {
  kind: ImportKind;
  total: number;
  created: number;
  matched: number;
  skipped: number;
  newCustomers: number;
  /** A few reasons, for the preview. */
  notes: { row: number; action: 'matched' | 'skipped'; reason: string }[];
}
