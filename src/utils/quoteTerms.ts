/**
 * The quote terms the client sees — ELE-1149.
 *
 * The electrician picks them in Settings → Quote settings (stored as
 * company_profiles.quote_terms). The PDF builds its list in
 * supabase/functions/generate-pdf-monkey (Deno, so it can't import this); the
 * public quote page builds the SAME list here. `npm run check:quote-terms`
 * fails if the two copies drift, so a client never reads one set of terms on
 * the page and another on the PDF.
 */

export const DEFAULT_TERMS_MAP: Record<string, string> = {
  // Payment Terms
  payment_30: 'Payment due within 30 days of invoice date',
  payment_14: 'Payment due within 14 days of invoice date',
  payment_on_completion: 'Payment due upon completion of works',
  deposit_required: 'A deposit of the specified percentage is required before work commences',
  additional_charges:
    'Additional work not included in this quote will be charged at our standard hourly rate',
  late_payment:
    'Late payments may incur interest charges as per the Late Payment of Commercial Debts Act',
  payment_methods: 'We accept bank transfer, card payments, and cash',
  // Warranty & Guarantee
  warranty_workmanship: 'All workmanship is guaranteed for the warranty period specified',
  warranty_materials: 'Materials are covered by manufacturer warranties where applicable',
  warranty_callback: 'Free callback within warranty period for any defects in our workmanship',
  warranty_exclusions:
    'Warranty excludes damage caused by misuse, third-party interference, or acts of nature',
  // Compliance & Certification
  bs7671_compliance: 'All electrical work complies with BS 7671 (18th Edition) Wiring Regulations',
  part_p_notification: 'Building control notification (Part P) included where required',
  testing_cert:
    'Electrical installation certificate or minor works certificate provided on completion',
  competent_person:
    'All work carried out by qualified electricians registered with a competent person scheme',
  insurance: 'Fully insured for public liability and professional indemnity',
  // Site Access & Safety
  access_required: 'Clear access to work areas must be provided',
  power_isolation:
    'Power may need to be isolated during installation - advance notice will be given',
  site_safety: 'Work area will be left safe and clean at the end of each working day',
  asbestos_disclaimer:
    'This quote excludes work involving asbestos - if discovered, work will stop pending survey',
  parking: 'Suitable parking should be available close to the property',
  working_hours: 'Standard working hours are 8am-5pm Monday to Friday unless otherwise agreed',
  // General Conditions
  price_validity: 'This quotation is valid for the number of days specified from the date of issue',
  cancellation: 'Cancellation within 48 hours of scheduled work may incur charges',
  unforeseen_works: 'Unforeseen works discovered during installation will be quoted separately',
  price_subject: 'Prices are subject to change if scope of work differs from description',
  materials_ownership: 'All materials remain our property until paid for in full',
  variations: 'Any variations to the agreed scope must be confirmed in writing',
};

export function buildTermsList(quoteTermsJson: string | null): string[] {
  if (!quoteTermsJson) {
    // Return sensible defaults if no terms configured
    return [
      DEFAULT_TERMS_MAP['payment_30'],
      DEFAULT_TERMS_MAP['deposit_required'],
      DEFAULT_TERMS_MAP['warranty_workmanship'],
      DEFAULT_TERMS_MAP['bs7671_compliance'],
      DEFAULT_TERMS_MAP['testing_cert'],
      DEFAULT_TERMS_MAP['price_validity'],
    ];
  }

  try {
    const parsed = JSON.parse(quoteTermsJson);
    const terms: string[] = [];

    // Handle new JSON format: { selected: string[], custom: {id: string, label: string}[] }
    if (parsed.selected && Array.isArray(parsed.selected)) {
      for (const termId of parsed.selected) {
        // Check if it's a default term
        if (DEFAULT_TERMS_MAP[termId]) {
          terms.push(DEFAULT_TERMS_MAP[termId]);
        }
        // Check if it's a custom term
        else if (termId.startsWith('custom_') && parsed.custom) {
          const customTerm = parsed.custom.find(
            (t: { id: string; label: string }) => t.id === termId
          );
          if (customTerm?.label) {
            terms.push(customTerm.label);
          }
        }
      }
      return terms.length > 0
        ? terms
        : [
            DEFAULT_TERMS_MAP['payment_30'],
            DEFAULT_TERMS_MAP['warranty_workmanship'],
            DEFAULT_TERMS_MAP['bs7671_compliance'],
          ];
    }

    // Legacy format: plain text (split by newlines)
    if (typeof quoteTermsJson === 'string' && !quoteTermsJson.startsWith('{')) {
      return quoteTermsJson.split('\n').filter((line) => line.trim());
    }

    // Fallback
    return [
      DEFAULT_TERMS_MAP['payment_30'],
      DEFAULT_TERMS_MAP['warranty_workmanship'],
      DEFAULT_TERMS_MAP['bs7671_compliance'],
    ];
  } catch {
    // If parsing fails, treat as legacy plain text
    return quoteTermsJson.split('\n').filter((line) => line.trim());
  }
}
