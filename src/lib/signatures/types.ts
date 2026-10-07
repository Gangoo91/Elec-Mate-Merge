/**
 * ELE-1993 — what a client signs.
 *
 * Every signature request carries a frozen copy of a real document
 * (`signature_requests.document_snapshot`), built server-side by
 * `_sig_snapshot()` when the office sends it. The public page, the office
 * register and the signed-copy PDF all render from this one shape, so what
 * the client saw is exactly what the office downloads.
 */

export type SignableType = 'Quote' | 'Invoice' | 'Variation' | 'Handover' | 'Certificate' | 'Contract';

export interface SnapshotLine {
  description?: string | null;
  quantity?: number | null;
  unit?: string | null;
}

export interface QuoteSnapshot {
  kind: 'quote' | 'invoice';
  number?: string | null;
  is_estimate?: boolean;
  client?: string | null;
  address?: string | null;
  title?: string | null;
  description?: string | null;
  line_items?: SnapshotLine[];
  subtotal?: number | null;
  vat_rate?: number | null;
  reverse_charge?: boolean;
  vat_amount?: number | null;
  total?: number | null;
  deposit?: number | null;
  valid_until?: string | null;
  due_date?: string | null;
  /** company_profiles.quote_terms JSON — resolve with buildTermsList. */
  terms?: string | null;
  pdf_url?: string | null;
}

export interface VariationSnapshot {
  kind: 'variation';
  reference?: string;
  job_title?: string | null;
  client?: string | null;
  address?: string | null;
  description?: string | null;
  notes?: string | null;
  agreed_before?: number | null;
  change?: number | null;
  new_total?: number | null;
}

export interface HandoverSnapshot {
  kind: 'handover';
  job_title?: string | null;
  client?: string | null;
  address?: string | null;
  description?: string | null;
  started?: string | null;
  completed?: string | null;
  checklist?: Array<{ title: string; done: boolean }>;
  outstanding?: Array<{ title: string; type?: string | null }>;
  certificates?: Array<{ id: string; type: string; number?: string | null; date?: string | null }>;
  /** report id -> public PDF link (not part of the signed hash). */
  links?: Record<string, string>;
}

export interface CertificateSnapshot {
  kind: 'certificate';
  type?: string | null;
  report_type?: string | null;
  number?: string | null;
  client?: string | null;
  address?: string | null;
  date?: string | null;
  inspector?: string | null;
  next_due?: string | null;
  outcome?: string | null;
  version?: number | null;
  pdf_url?: string | null;
}

export interface ContractSnapshot {
  kind: 'contract';
  title?: string | null;
  party_name?: string | null;
  content?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  value?: number | null;
}

export type DocumentSnapshot =
  | QuoteSnapshot
  | VariationSnapshot
  | HandoverSnapshot
  | CertificateSnapshot
  | ContractSnapshot;

/** What get_signing_document(p_token) returns (public, token-keyed). */
export interface SigningPayload {
  error?: 'not_found' | 'revoked';
  id: string;
  document_type: SignableType | string | null;
  document_title: string;
  document: DocumentSnapshot | null;
  document_hash: string | null;
  statement: string | null;
  signer_name: string;
  message: string | null;
  expires_at: string | null;
  created_at: string;
  status: string;
  block_reason: 'signed' | 'declined' | 'revoked' | 'expired' | 'changed' | null;
  can_sign: boolean;
  upload_key: string | null;
  signed_at: string | null;
  signed_name: string | null;
  signed_document_hash: string | null;
  signature_method: 'drawn' | 'typed' | 'paper' | null;
  declined_at: string | null;
  company: {
    name: string;
    logo_url?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
  };
  /** A request made before ELE-1993 (no document). */
  legacy: boolean;
}

export const SIGNABLE_LABEL: Record<SignableType, string> = {
  Quote: 'Quote',
  Invoice: 'Invoice',
  Variation: 'Variation',
  Handover: 'Handover',
  Certificate: 'Certificate',
  Contract: 'Contract',
};

export const SIGNABLE_HELP: Record<SignableType, string> = {
  Quote: 'The client accepts the work and price on a quote.',
  Variation: 'The client agrees extra work and the change in price before you do it.',
  Handover: 'The client confirms the job is finished and they have the certificates.',
  Certificate: 'The client confirms they received and read a certificate.',
  Contract: 'The other party agrees to a contract.',
  Invoice: 'The client confirms they received an invoice and agree the amount.',
};

export const gbp = (v?: number | string | null) =>
  `£${Number(v || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const signedGbp = (v?: number | string | null) => {
  const n = Number(v || 0);
  return `${n < 0 ? '−' : '+'}${gbp(Math.abs(n))}`;
};

export const ukDate = (iso?: string | null, withTime = false) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  });
};

/** Only links we host are shown to a client (PDFMonkey links expire within the hour). */
export const isStablePdfLink = (url?: string | null): url is string =>
  !!url && /^https:\/\/[a-z0-9]+\.supabase\.co\/storage\/v1\/object\/public\//.test(url);
