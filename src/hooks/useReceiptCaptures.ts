/**
 * Receipts and supplier bills by photo (ELE-2071).
 *
 * Capture goes through the worker outbox ('receipt'), so a photo taken with no
 * signal waits on the phone and lands once. Reading it is the read-receipt
 * edge function (one AI call per capture). Posting it is post_receipt_capture,
 * only after the person has checked the figures.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { compressImageForUpload } from '@/utils/imageUploadUtils';
import { submitWorkerAction, type OutboxPhoto, type SubmitResult } from '@/lib/workerOutbox';

const rpc = (name: string, args: Record<string, unknown>) =>
  supabase.rpc(name as never, args as never);

export type PostAs = 'expense' | 'po_cost' | 'job_cost';

export interface ReceiptLine {
  description: string;
  quantity: number | null;
  unit_price: number | null;
  net: number | null;
  vat_rate: number | null;
}

export interface ReceiptExtraction {
  kind?: 'receipt' | 'bill';
  supplier?: string | null;
  supplier_vat_number?: string | null;
  date?: string | null;
  invoice_number?: string | null;
  lines?: ReceiptLine[];
  net?: number | null;
  vat?: number | null;
  gross?: number | null;
  category?: string | null;
  confidence?: number | null;
  notes?: string | null;
  totals_agree?: boolean | null;
}

export interface ReceiptCapture {
  id: string;
  source: 'worker' | 'office' | 'email';
  status: 'new' | 'reading' | 'read' | 'failed' | 'posted' | 'discarded';
  captured_at: string;
  created_at: string;
  captured_by_name: string;
  mine: boolean;
  file_path: string;
  file_mime: string | null;
  file_name: string | null;
  job_id: string | null;
  job_title: string | null;
  note: string | null;
  extracted: ReceiptExtraction | null;
  read_error: string | null;
  suggestion: { post_as?: PostAs; order_id?: string; job_id?: string; claim_id?: string };
  duplicate_of: string | null;
  duplicate_reason: string | null;
  posted_as: PostAs | null;
  posted_ref: string | null;
  posted_at: string | null;
  posted_amount: number | null;
}

export interface ReceiptOrder {
  id: string;
  order_number: string | null;
  supplier: string | null;
  total: number | null;
  job_id: string | null;
  job_title: string | null;
}

export interface ReceiptCapturesData {
  money: boolean;
  employee_id: string | null;
  can: PostAs[];
  captures: ReceiptCapture[];
  orders: ReceiptOrder[];
  vat_registered: boolean;
}

export function useReceiptCaptures(firmId: string | null | undefined, scope: 'mine' | 'firm') {
  return useQuery<ReceiptCapturesData>({
    queryKey: ['receipt-captures', firmId, scope],
    enabled: !!firmId,
    staleTime: 20 * 1000,
    queryFn: async () => {
      const { data, error } = await rpc('get_receipt_captures', { p_firm: firmId, p_scope: scope });
      if (error) throw error;
      const d = (data ?? {}) as Partial<ReceiptCapturesData>;
      return {
        money: !!d.money,
        employee_id: d.employee_id ?? null,
        can: d.can ?? [],
        captures: d.captures ?? [],
        orders: d.orders ?? [],
        vat_registered: !!d.vat_registered,
      };
    },
  });
}

async function sha256(file: Blob): Promise<string | null> {
  try {
    const buf = await file.arrayBuffer();
    const digest = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return null;
  }
}

/** A photo (compressed) or a PDF, held for the outbox. 10 MB cap. */
async function holdReceiptFile(file: File): Promise<OutboxPhoto> {
  const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
  const isImage = file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name);
  if (!isPdf && !isImage) throw new Error('Choose a photo or a PDF');
  if (isPdf) {
    if (file.size > 10 * 1024 * 1024) throw new Error('That PDF is over 10 MB');
    return { blob: file, type: 'application/pdf', ext: 'pdf' };
  }
  const small = await compressImageForUpload(file).catch(() => file);
  if (small.size > 10 * 1024 * 1024) throw new Error('That photo is over 10 MB');
  const type = small.type || 'image/jpeg';
  return {
    blob: small,
    type,
    ext: type === 'image/png' ? 'png' : type === 'image/webp' ? 'webp' : 'jpg',
  };
}

export function useCaptureReceipt() {
  const qc = useQueryClient();
  const read = useReadReceipt();
  return useMutation({
    networkMode: 'always',
    mutationFn: async (i: {
      firmId: string;
      file: File;
      source: 'worker' | 'office';
      jobId?: string | null;
      jobTitle?: string | null;
      note?: string | null;
    }): Promise<{ result: SubmitResult; id: string }> => {
      const [hash, held] = await Promise.all([sha256(i.file), holdReceiptFile(i.file)]);
      const { result, op } = await submitWorkerAction(
        {
          kind: 'receipt',
          label: `Receipt · ${i.file.name.slice(0, 40) || 'photo'}`,
          detail: i.jobTitle ?? null,
          jobId: i.jobId ?? null,
          photos: [held],
          payload: {
            firmId: i.firmId,
            source: i.source,
            jobId: i.jobId ?? null,
            note: i.note ?? null,
            hash,
            fileName: i.file.name || null,
          },
        },
        15_000
      );
      return { result, id: op.id };
    },
    onSuccess: (r) => {
      qc.invalidateQueries({ queryKey: ['receipt-captures'] });
      // Landed: read it straight away (one AI call; the server never reads twice).
      if (r.result === 'sent') read.mutate({ captureId: r.id });
    },
  });
}

export function useReadReceipt() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ captureId, force }: { captureId: string; force?: boolean }) => {
      const { data, error } = await supabase.functions.invoke('read-receipt', {
        body: { capture_id: captureId, force: !!force },
      });
      if (error) throw error;
      return data as { ok?: boolean; extracted?: ReceiptExtraction; error?: string };
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['receipt-captures'] }),
  });
}

export interface PostReceiptInput {
  capture: ReceiptCapture;
  as: PostAs;
  gross: number;
  vat: number;
  supplier: string | null;
  date: string | null;
  invoiceNumber: string | null;
  jobId: string | null;
  orderId: string | null;
  category: string | null;
  description: string | null;
  allowDuplicate: boolean;
}

export function usePostReceipt() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (i: PostReceiptInput) => {
      const receiptUrl = supabase.storage.from('expense-receipts').getPublicUrl(i.capture.file_path)
        .data.publicUrl;
      const { data, error } = await rpc('post_receipt_capture', {
        p_id: i.capture.id,
        p_as: i.as,
        p_gross: i.gross,
        p_vat: i.vat,
        p_supplier: i.supplier,
        p_date: i.date,
        p_job: i.jobId,
        p_order: i.orderId,
        p_category: i.category,
        p_description: i.description,
        p_receipt_url: i.as === 'expense' ? receiptUrl : null,
        p_invoice_number: i.invoiceNumber,
        p_allow_duplicate: i.allowDuplicate,
      });
      if (error) throw error;
      return data as { posted_as: PostAs; posted_ref: string; already: boolean };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['receipt-captures'] });
      qc.invalidateQueries({ queryKey: ['expense_claims'] });
      qc.invalidateQueries({ queryKey: ['my_expense_claims'] });
      qc.invalidateQueries({ queryKey: ['job-cost-entries'] });
      qc.invalidateQueries({ queryKey: ['supplier-invoices'] });
    },
  });
}

export function useDiscardReceipt() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await rpc('discard_receipt_capture', { p_id: id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['receipt-captures'] }),
  });
}

/** A short-lived link to look at the captured file. */
export function useReceiptFileUrl(path: string | null | undefined) {
  return useQuery({
    queryKey: ['receipt-file', path],
    enabled: !!path,
    staleTime: 8 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from('expense-receipts')
        .createSignedUrl(path!, 600);
      if (error) throw error;
      return data.signedUrl;
    },
  });
}

export const money = (n: number | null | undefined) =>
  n == null
    ? '–'
    : `£${Number(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
