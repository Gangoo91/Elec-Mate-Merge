/**
 * ELE-2065: the accepted quote → job → invoice chain in the Employer Hub.
 *
 * - linkInvoiceToQuote: after the Hub raises an invoice from a quote, link the
 *   two (the quote drops out of the convert list and shows "Invoiced · INV-…")
 *   and take a PAID deposit off the balance, server-side, exactly as ELE-1760
 *   does in the Electrical Hub (total_paid + settings.depositApplied).
 * - getQuoteDeposit: the source quote's deposit, so the dialog can show the
 *   credit before the invoice is saved (same maths: depositCreditFromQuote).
 * - createJobFromQuote / getWonQuotesWithoutJob: an accepted quote becomes a
 *   firm job only when someone taps it; the To do row lists the ones waiting.
 */
import { supabase } from '@/integrations/supabase/client';
import type { DepositCreditInput } from '@/utils/invoiceDeposit';

// Cast: these RPCs postdate the last types.ts regeneration.
const rpc = (fn: string, args?: Record<string, unknown>) =>
  supabase.rpc(fn as never, args as never) as unknown as Promise<{
    data: unknown;
    error: { message: string } | null;
  }>;

export interface InvoiceQuoteLink {
  quote_id: string;
  invoice_id: string;
  invoice_number: string | null;
  deposit_credited: number;
  total: number;
  total_paid: number;
  balance: number;
}

export async function linkInvoiceToQuote(
  quoteId: string,
  invoiceId: string
): Promise<InvoiceQuoteLink> {
  const { data, error } = await rpc('link_invoice_to_quote', {
    p_quote_id: quoteId,
    p_invoice_id: invoiceId,
  });
  if (error) throw new Error(error.message || 'Could not link the invoice to its quote.');
  return data as InvoiceQuoteLink;
}

export interface QuoteDeposit extends DepositCreditInput {
  converted_invoice_id: string | null;
  converted_invoice_number: string | null;
}

/** The source quote's deposit and conversion stamp, read fresh from its row. */
export async function getQuoteDeposit(quoteId: string): Promise<QuoteDeposit | null> {
  const { data, error } = await supabase
    .from('quotes')
    .select('deposit_paid_at, deposit_amount_pennies, deposit_invoice_id, total_paid, settings')
    .eq('id', quoteId)
    .maybeSingle();
  if (error || !data) return null;
  const row = data as {
    deposit_paid_at: string | null;
    deposit_amount_pennies: number | null;
    deposit_invoice_id: string | null;
    total_paid: number | null;
    settings: { convertedInvoiceId?: string; convertedInvoiceNumber?: string } | null;
  };
  return {
    deposit_paid_at: row.deposit_paid_at,
    deposit_amount_pennies: row.deposit_amount_pennies,
    deposit_invoice_id: row.deposit_invoice_id,
    total_paid: row.total_paid,
    converted_invoice_id: row.settings?.convertedInvoiceId ?? null,
    converted_invoice_number: row.settings?.convertedInvoiceNumber ?? null,
  };
}

export async function createJobFromQuote(
  quoteId: string
): Promise<{ job_id: string; created: boolean }> {
  const { data, error } = await rpc('create_job_from_quote', { p_quote_id: quoteId });
  if (error) throw new Error(error.message || 'Could not make a job from this quote.');
  return data as { job_id: string; created: boolean };
}

export interface WonQuoteWithoutJob {
  id: string;
  quote_number: string | null;
  client: string;
  job_title: string | null;
  accepted_at: string;
}

export async function getWonQuotesWithoutJob(): Promise<WonQuoteWithoutJob[]> {
  const { data, error } = await rpc('get_won_quotes_without_job');
  if (error) throw new Error(error.message);
  return (data ?? []) as WonQuoteWithoutJob[];
}

/**
 * ELE-2065 §3A #11: put a quote on one of the firm's jobs (null takes it off).
 * Its Hub invoice follows unless that invoice is already on another job.
 */
export async function linkQuoteToJob(
  quoteId: string,
  jobId: string | null
): Promise<{ changed: boolean; invoice_moved: boolean }> {
  const { data, error } = await rpc('link_quote_to_job', { p_quote_id: quoteId, p_job_id: jobId });
  if (error) throw new Error(error.message || 'Could not link the quote to that job.');
  return data as { changed: boolean; invoice_moved: boolean };
}

/** ELE-2065 §3A #12: a certificate travelling with an invoice. */
export type CertificateReleaseMode = 'with_invoice' | 'on_payment';

export interface JobReadyCertificate {
  report_uuid: string;
  report_id: string | null;
  label: string;
  reference: string | null;
  has_pdf: boolean;
  client_name: string | null;
  updated_at: string;
}

export interface JobInvoiceCertificateState {
  id: string;
  invoice_number: string | null;
  paid: boolean;
  status: string;
  linked_certificate_id: string | null;
  linked_certificate_label: string | null;
  linked_certificate_reference: string | null;
  mode: CertificateReleaseMode;
  released_at: string | null;
}

export async function getJobInvoiceCertificates(jobId: string): Promise<{
  certificates: JobReadyCertificate[];
  invoices: JobInvoiceCertificateState[];
}> {
  const { data, error } = await rpc('get_job_invoice_certificates', { p_job_id: jobId });
  if (error) throw new Error(error.message);
  const d = (data ?? {}) as {
    certificates?: JobReadyCertificate[];
    invoices?: JobInvoiceCertificateState[];
  };
  return { certificates: d.certificates ?? [], invoices: d.invoices ?? [] };
}

/** Put one of the job's finished certificates on an invoice, or take it off (null). */
export async function setInvoiceCertificate(
  invoiceId: string,
  reportUuid: string | null,
  mode: CertificateReleaseMode = 'with_invoice'
): Promise<{ linked: boolean; mode?: CertificateReleaseMode; has_pdf?: boolean }> {
  const { data, error } = await rpc('set_invoice_certificate', {
    p_invoice_id: invoiceId,
    p_report_uuid: reportUuid,
    p_mode: mode,
  });
  if (error) throw new Error(error.message || 'Could not put the certificate on the invoice.');
  return data as { linked: boolean; mode?: CertificateReleaseMode; has_pdf?: boolean };
}
