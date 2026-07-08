export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  category: 'labour' | 'materials' | 'equipment' | 'manual';
  subcategory?: string;
  workerType?: string;
  hours?: number;
  hourlyRate?: number;
  materialCode?: string;
  equipmentCode?: string;
  /** Link to a `personal_inventory` stock item. Stamped when the line is added
   *  from a stock-linked picker; used to decrement stock when the invoice is
   *  raised. Free-typed lines stay unlinked and never move stock. (ELE-1014) */
  inventoryItemId?: string;
  notes?: string;
  // ELE-888 — per-item adjustment. Signed percent: +10 = 10% markup, -20 = 20% off.
  itemAdjustmentPercent?: number;
  itemAdjustmentLabel?: string;
}

export interface WorkerType {
  id: string;
  name: string;
  category: string;
  defaultHourlyRate: number;
  description: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  unit: string;
  defaultPrice: number;
  supplier?: string;
  code?: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  description: string;
}

export interface QuoteClient {
  name: string;
  email?: string;
  phone?: string;
  address: string;
  postcode: string;
  customerId?: string;
}

export interface JobDetails {
  title: string;
  description: string;
  location?: string;
  estimatedDuration?: string;
  customDuration?: string;
  workStartDate?: string;
  /** "To be decided" — quoting/estimating before a start date is committed. */
  workStartTbd?: boolean;
  specialRequirements?: string;
}

export interface QuoteSettings {
  labourRate: number;
  overheadPercentage: number;
  profitMargin: number;
  vatRate: number;
  vatRegistered: boolean;
  showMaterialsBreakdown?: boolean;
  discountEnabled?: boolean;
  discountType?: 'percentage' | 'fixed';
  discountValue?: number;
  discountLabel?: string;
  // ELE-891 — per-category adjustment (e.g. -20 on labour for "mates rate").
  // Applied AFTER per-item adjustments, BEFORE the global discount.
  categoryAdjustments?: {
    labour?: number;
    materials?: number;
    equipment?: number;
  };
  // ELE-975 — render a customer signature box on the quote PDF. Defaults
  // off (opt-in). When the quote has been accepted, the captured signature
  // image is rendered; otherwise blank signature/date lines.
  showSignatureBox?: boolean;
  // Customer-facing presentation toggle. When true, per-category markups
  // (categoryAdjustments) are absorbed into the displayed unit/line totals
  // on the public quote view and PDF, and the explicit "X markup (+Y%)"
  // line is hidden. Internal views (QuoteDetailView, settings) still show
  // the breakdown so the electrician can see their margin. Opt-in;
  // default false preserves existing behaviour.
  hideMarkupFromCustomer?: boolean;
  // Construction invoicing (CIS + VAT reverse charge). All opt-in; default
  // off so existing quotes/invoices are unaffected.
  // CIS: withheld from the labour element only (ex-VAT). 20% verified, 30% unverified.
  cisEnabled?: boolean;
  cisRate?: number;
  // VAT domestic reverse charge (DRC): charge £0 VAT, customer accounts to HMRC.
  reverseCharge?: boolean;
  // ELE-1081 — document type. true = Estimate (ball-park, may vary), shown
  // with an ESTIMATE title + disclaimer on the PDF. false/undefined = Quote.
  isEstimate?: boolean;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  client: QuoteClient;
  jobDetails?: JobDetails;
  items: QuoteItem[];
  settings: QuoteSettings;
  subtotal: number;
  overhead: number;
  profit: number;
  discountAmount: number;
  vatAmount: number;
  total: number;
  status: 'draft' | 'sent' | 'pending' | 'approved' | 'rejected' | 'superseded';
  tags?: QuoteTag[];
  // ELE-956 — Quote versioning + variations
  user_id?: string;
  client_id?: string;
  parent_quote_id?: string | null;
  version_number?: number;
  supersedes_id?: string | null;
  variation_reason?: string | null;
  variation_type?: 'renegotiation' | 'change_order' | 'addition' | 'deletion' | 'correction' | null;
  is_active_version?: boolean;
  lastReminderSentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  expiryDate: Date;
  notes?: string;
  // Email tracking fields
  first_sent_at?: Date;
  reminder_count?: number;
  auto_followup_enabled?: boolean;
  expiry_notification_sent?: boolean;
  email_opened_at?: Date;
  email_open_count?: number;
  acceptance_status?: 'pending' | 'accepted' | 'rejected';
  acceptance_method?: 'in_app_signature' | 'docusign';
  accepted_at?: Date;
  accepted_by_name?: string;
  accepted_by_email?: string;
  accepted_ip?: string;
  accepted_user_agent?: string;
  signature_url?: string;
  docusign_envelope_id?: string;
  docusign_status?: string;
  public_token?: string;
  invoice_raised?: boolean;
  invoice_number?: string;
  invoice_date?: Date;
  invoice_due_date?: Date;
  invoice_status?: 'draft' | 'sent' | 'paid' | 'overdue';
  invoice_sent_at?: Date;
  invoice_paid_at?: Date;
  invoice_payment_method?: string;
  invoice_payment_reference?: string;
  /** Amount paid so far (e.g. a Xero deposit / partial payment). */
  total_paid?: number;
  partial_payments?: Array<{ amount: number; date?: string; method?: string; reference?: string }>;
  work_completion_date?: Date;
  invoice_notes?: string;
  additional_invoice_items?: QuoteItem[];
  pdf_document_id?: string;
  pdf_url?: string;
  pdf_generated_at?: Date;
  pdf_version?: number;
  // Source site visit (when created from a site-visit scope)
  site_visit_id?: string;
  // Linked certificate fields (when created from EICR/EIC/Minor Works)
  linked_certificate_id?: string;
  linked_certificate_type?: 'EICR' | 'EIC' | 'Minor Works';
  linked_certificate_reference?: string;
  linked_certificate_pdf_url?: string;
  // Project linking
  project_id?: string;
  // CRM linking — customers.id this quote/invoice belongs to
  customer_id?: string | null;
  // External accounting sync fields
  external_invoice_id?: string;
  external_invoice_provider?: string;
  external_invoice_url?: string;
  external_invoice_synced_at?: Date;
}

export type QuoteTag =
  | 'awaiting_payment'
  | 'job_not_complete'
  | 'on_hold'
  | 'disputed'
  | 'work_done';

export interface JobTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  items: Omit<QuoteItem, 'id' | 'totalPrice'>[];
  estimatedHours: number;
}
