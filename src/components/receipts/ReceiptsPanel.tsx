/**
 * Receipts and bills by photo (ELE-2071), for Worker Tools › Expenses and the
 * Employer Hub › Expenses.
 *
 * Snap (or pick a PDF) → saved on the phone and sent when there is signal →
 * read by AI → the person checks the figures and posts it as an expense claim,
 * a purchase order bill or a job cost. Nothing is posted without that tap.
 * Possible duplicates are flagged and need "post it anyway".
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Camera, FileText, Loader2, Receipt, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  inputCn,
  labelCn,
  textareaCn,
  chipBase,
  chipOn,
  chipOff,
  buttonPrimaryCn,
  buttonSecondaryCn,
  checkboxCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { BillVsOrder } from '@/components/employer/wholesalers/BillVsOrder';
import { recordBillLineVariances } from '@/hooks/useWholesalers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useOfficeFirmId } from '@/hooks/useFirmPaySettings';
import { PanelTitle, StatusPill } from '@/components/employer/pageParts/PageParts';
import { useWorkerOutbox } from '@/hooks/useWorkerOutbox';
import {
  useReceiptCaptures,
  useCaptureReceipt,
  useReadReceipt,
  usePostReceipt,
  useDiscardReceipt,
  useReceiptFileUrl,
  money,
  type PostAs,
  type ReceiptCapture,
  type ReceiptCapturesData,
} from '@/hooks/useReceiptCaptures';
import {
  useBillsInbox,
  useReadEmailedBill,
  applyEmailedBillPrices,
  senderLabel,
  type EmailedBill,
} from '@/hooks/useBillsInbox';
import { BillsAddressPanel } from '@/components/employer/wholesalers/BillsAddressPanel';

const panelCn =
  '-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-white/[0.04]';

/** The standard sheet footer: Cancel on the left, the one yellow action on the right,
 *  two equal buttons (FormSheet right-aligns and caps the row on desktop). */
const footerRowCn = 'flex w-full items-center gap-2';
const footerBtnCn = 'min-w-0 flex-1 px-5';

const POST_LABEL: Record<PostAs, string> = {
  expense: 'My expense claim',
  po_cost: 'Bill for a purchase order',
  job_cost: 'Cost on a job',
};

const EXPENSE_CATEGORIES = ['Materials', 'Tools', 'Fuel', 'Parking', 'Travel', 'Food', 'Other'];
const JOB_COST_CATEGORIES = [
  { v: 'materials', l: 'Materials' },
  { v: 'equipment', l: 'Equipment' },
  { v: 'other', l: 'Other' },
];

function expenseCategoryFor(c?: string | null) {
  const m: Record<string, string> = {
    materials: 'Materials',
    tools: 'Tools',
    fuel: 'Fuel',
    parking: 'Parking',
    travel: 'Travel',
    food: 'Food',
  };
  return (c && m[c]) || 'Other';
}

function shortDate(iso?: string | null) {
  if (!iso) return null;
  const d = new Date(`${iso.slice(0, 10)}T12:00:00`);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function ReceiptsPanel({
  firmId,
  mode,
  jobs,
  snapOpen,
  onSnapOpenChange,
  showSnap = true,
  snapJobId = null,
}: {
  firmId: string | null | undefined;
  mode: 'worker' | 'office';
  /** Jobs the person can put a receipt against. */
  jobs: { id: string; title: string }[];
  /** Open the snap sheet from outside (Worker Tools opens it from its "Claim a receipt" tile). */
  snapOpen?: boolean;
  onSnapOpenChange?: (open: boolean) => void;
  /** Show the "Snap a receipt" link in the header. Off when the page has its own entry. */
  showSnap?: boolean;
  /** Gap #3 / #21: opened from a job page, the snap sheet starts with that job picked. */
  snapJobId?: string | null;
}) {
  const scope = mode === 'office' ? 'firm' : 'mine';
  const { data } = useReceiptCaptures(firmId, scope);
  // Gap #7: where each emailed bill came from (owner/admin only)
  const { data: billsInbox } = useBillsInbox(firmId, mode === 'office' && !!data?.money);
  const emailed = useMemo(
    () => new Map((billsInbox?.bills ?? []).map((b) => [b.capture_id, b] as const)),
    [billsInbox]
  );
  const { pending } = useWorkerOutbox();
  const read = useReadReceipt();
  const [ownCaptureOpen, setOwnCaptureOpen] = useState(false);
  const captureOpen = snapOpen ?? ownCaptureOpen;
  const setCaptureOpen = (o: boolean) => {
    if (onSnapOpenChange) onSnapOpenChange(o);
    else setOwnCaptureOpen(o);
  };
  const [openId, setOpenId] = useState<string | null>(null);

  const waiting = pending.filter((o) => o.kind === 'receipt');
  const captures = data?.captures ?? [];
  const toCheck = captures.filter((c) => !['posted', 'discarded'].includes(c.status));
  const posted = captures.filter((c) => c.status === 'posted').slice(0, 5);
  const open = captures.find((c) => c.id === openId) ?? null;

  // Captures that landed while offline get read once, now (the server never reads twice).
  const tried = useRef(new Set<string>());
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
    for (const c of captures) {
      // Emailed bills are read on arrival; a held one waits for the office (gap #7)
      if (
        c.mine &&
        c.source !== 'email' &&
        c.status === 'new' &&
        !c.extracted &&
        !tried.current.has(c.id)
      ) {
        tried.current.add(c.id);
        read.mutate({ captureId: c.id });
      }
    }
  }, [captures, read]);

  const empty = waiting.length === 0 && toCheck.length === 0 && posted.length === 0;
  const sheets = (
    <>
      <CaptureSheet
        open={captureOpen}
        onOpenChange={setCaptureOpen}
        firmId={firmId}
        mode={mode}
        jobs={jobs}
        initialJobId={snapJobId}
      />
      {open && data && (
        <ConfirmSheet
          key={open.id}
          capture={open}
          data={data}
          emailed={emailed.get(open.id) ?? null}
          jobs={jobs}
          mode={mode}
          onClose={() => setOpenId(null)}
        />
      )}
    </>
  );
  // The page has its own entry and there is nothing here yet: no empty panel.
  if (!showSnap && empty) return sheets;

  return (
    <section aria-label="Receipts and bills">
      <PanelTitle
        title="Receipts and bills"
        meta={
          toCheck.length + waiting.length > 0
            ? `${toCheck.length + waiting.length} to check`
            : undefined
        }
        action={showSnap ? 'Snap a receipt' : undefined}
        onAction={showSnap ? () => setCaptureOpen(true) : undefined}
      />

      {empty ? (
        <div className={cn(panelCn, 'px-4 py-4 sm:px-5')}>
          <p className="text-[14px] leading-snug text-white">
            {mode === 'office' && data?.money
              ? 'Snap a receipt or a supplier bill, or forward bills to your bills address. Each is read for you, and you check it before it goes anywhere.'
              : 'Snap a receipt or a supplier bill. It is read for you, and you check it before it goes anywhere.'}
          </p>
        </div>
      ) : (
        <div className={cn(panelCn, 'divide-y divide-white/[0.07]')}>
          {waiting.map((o) => (
            <div key={o.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
              <Receipt className="h-5 w-5 shrink-0 text-white" />
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold text-white">Saved on this phone</p>
                <p className="truncate text-[13px] text-white">
                  Sends when you have signal, then it is read
                </p>
              </div>
              <StatusPill tone="neutral">Waiting</StatusPill>
            </div>
          ))}
          {toCheck.map((c) => (
            <CaptureRow
              key={c.id}
              c={c}
              eb={emailed.get(c.id) ?? null}
              onOpen={() => setOpenId(c.id)}
              reading={read.isPending && read.variables?.captureId === c.id}
            />
          ))}
          {posted.map((c) => (
            <CaptureRow
              key={c.id}
              c={c}
              eb={emailed.get(c.id) ?? null}
              onOpen={() => setOpenId(c.id)}
            />
          ))}
        </div>
      )}

      {sheets}
    </section>
  );
}

function CaptureRow({
  c,
  eb,
  onOpen,
  reading,
}: {
  c: ReceiptCapture;
  eb?: EmailedBill | null;
  onOpen: () => void;
  reading?: boolean;
}) {
  const x = c.extracted;
  const held = eb?.status === 'held' && !x;
  const title =
    x?.supplier ||
    (c.status === 'reading' || reading
      ? 'Reading it…'
      : held
        ? eb?.subject || 'Emailed bill'
        : c.status === 'failed'
          ? 'Could not read it'
          : c.file_name || 'Receipt');
  // "Came by email from <sender>", shortened to "Came by email" when the
  // sender is the supplier in the title, so the date and total still show
  const norm = (v?: string | null) => (v ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const sender = eb ? senderLabel(eb) : '';
  const sameAsTitle =
    !!eb && !!x?.supplier && norm(x.supplier).startsWith(norm(sender).slice(0, 8));
  const detail = [
    eb ? (sameAsTitle ? 'Came by email' : `Came by email from ${sender}`) : null,
    shortDate(x?.date) ?? shortDate(c.captured_at),
    x?.gross != null ? money(x.gross) : null,
    eb?.match?.order_number ?? null,
    c.job_title ?? (eb?.match?.job_title || null),
  ]
    .filter(Boolean)
    .join(' · ');
  const pill =
    c.status === 'posted' ? (
      <StatusPill tone="green">
        {c.posted_as === 'expense'
          ? 'Claimed'
          : c.posted_as === 'po_cost'
            ? 'On the PO'
            : 'On the job'}
      </StatusPill>
    ) : c.duplicate_of ? (
      <StatusPill tone="red">Possible duplicate</StatusPill>
    ) : held ? (
      <StatusPill tone="volt">Held</StatusPill>
    ) : (
      <StatusPill tone="volt">Check</StatusPill>
    );
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation sm:px-5"
    >
      {c.file_mime === 'application/pdf' ? (
        <FileText className="h-5 w-5 shrink-0 text-white" />
      ) : (
        <Receipt className="h-5 w-5 shrink-0 text-white" />
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold text-white">{title}</span>
        <span className="block truncate text-[13px] text-white">
          {detail}
          {c.captured_by_name && !c.mine && !eb ? ` · ${c.captured_by_name}` : ''}
        </span>
      </span>
      {reading ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : pill}
    </button>
  );
}

/* ── Capture ───────────────────────────────────────────────────────────── */

function CaptureSheet({
  open,
  onOpenChange,
  firmId,
  mode,
  jobs,
  initialJobId = null,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  firmId: string | null | undefined;
  mode: 'worker' | 'office';
  jobs: { id: string; title: string }[];
  initialJobId?: string | null;
}) {
  const capture = useCaptureReceipt();
  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState('');
  const [note, setNote] = useState('');
  const preview = useMemo(
    () => (file && file.type.startsWith('image/') ? URL.createObjectURL(file) : null),
    [file]
  );
  useEffect(() => () => (preview ? URL.revokeObjectURL(preview) : undefined), [preview]);
  useEffect(() => {
    if (open) {
      setFile(null);
      setJobId(initialJobId ?? '');
      setNote('');
    }
  }, [open, initialJobId]);

  const save = async () => {
    if (!file || !firmId) return;
    try {
      const r = await capture.mutateAsync({
        firmId,
        file,
        source: mode,
        jobId: jobId || null,
        jobTitle: jobs.find((j) => j.id === jobId)?.title ?? null,
        note: note.trim() || null,
      });
      toast.success(
        r.result === 'queued'
          ? 'Saved on this phone. It sends when you have signal'
          : 'Got it. Reading it now'
      );
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save that');
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Receipts and bills"
      title="Snap a receipt or bill"
      description="A photo or a PDF. It is read for you, and nothing is posted until you check it."
      bodyClassName="lg:grid lg:grid-cols-2 lg:gap-10 space-y-5 lg:space-y-0"
      footer={
        <div className={footerRowCn}>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(buttonSecondaryCn, footerBtnCn)}
          >
            Cancel
          </button>
          <button
            type="button"
            data-testid="receipt-save"
            data-help="wt-expenses.snap-save"
            disabled={!file || capture.isPending}
            onClick={() => void save()}
            className={cn(buttonPrimaryCn, footerBtnCn, 'flex items-center justify-center gap-2')}
          >
            {capture.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Save it'}
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        <label
          data-help="wt-expenses.snap-file"
          className={cn(
            buttonSecondaryCn,
            'flex w-full cursor-pointer items-center justify-center gap-2'
          )}
        >
          <Camera className="h-5 w-5" />
          {file ? 'Choose a different one' : 'Take a photo or choose a file'}
          <input
            type="file"
            accept="image/*,application/pdf"
            className="sr-only"
            data-testid="receipt-file"
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              e.target.value = '';
            }}
          />
        </label>
        {file &&
          (preview ? (
            <img
              src={preview}
              alt=""
              className="max-h-[320px] w-full rounded-xl border border-white/[0.12] object-contain"
            />
          ) : (
            <p className="flex items-center gap-2 rounded-xl border border-white/[0.12] px-4 py-3 text-[14px] text-white">
              <FileText className="h-5 w-5" />
              {file.name}
            </p>
          ))}
      </div>
      <div className="space-y-4">
        {jobs.length > 0 && (
          <div>
            <span className={labelCn}>Job (optional)</span>
            <MobileSelectPicker
              value={jobId}
              onValueChange={setJobId}
              placeholder="Not for a job"
              title="Which job?"
              options={[
                { value: '', label: 'Not for a job' },
                ...jobs.map((j) => ({ value: j.id, label: j.title })),
              ]}
            />
          </div>
        )}
        <div>
          <label className={labelCn} htmlFor="rc-note">
            Note (optional)
          </label>
          <textarea
            id="rc-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={500}
            placeholder="e.g. Glands and clips for the Smith job"
            className={cn(textareaCn, 'min-h-[80px]')}
          />
        </div>
      </div>
    </FormSheet>
  );
}

/* ── Check and post ────────────────────────────────────────────────────── */

function ConfirmSheet({
  capture: c,
  data,
  emailed: eb = null,
  jobs,
  mode,
  onClose,
}: {
  capture: ReceiptCapture;
  data: ReceiptCapturesData;
  /** Gap #7: set when the bill came by email. */
  emailed?: EmailedBill | null;
  jobs: { id: string; title: string }[];
  mode: 'worker' | 'office';
  onClose: () => void;
}) {
  const x = c.extracted ?? {};
  const read = useReadReceipt();
  const readEmailed = useReadEmailedBill();
  const isEmail = c.source === 'email';
  const held = !!eb && eb.status === 'held' && !c.extracted;
  const post = usePostReceipt();
  const qc = useQueryClient();
  const discard = useDiscardReceipt();
  const { data: fileUrl } = useReceiptFileUrl(c.file_path);
  const posted = c.status === 'posted';

  const can = data.can.filter((k) => (k === 'expense' ? c.mine : true));
  const firstChoice: PostAs | null =
    (c.suggestion.post_as && can.includes(c.suggestion.post_as) ? c.suggestion.post_as : null) ??
    (mode === 'worker' && can.includes('expense') ? 'expense' : (can[0] ?? null));

  const [as, setAs] = useState<PostAs | null>(firstChoice);
  const [supplier, setSupplier] = useState(x.supplier ?? '');
  const [date, setDate] = useState(x.date ?? c.captured_at.slice(0, 10));
  const [invoiceNumber, setInvoiceNumber] = useState(x.invoice_number ?? '');
  const [gross, setGross] = useState(x.gross != null ? String(x.gross) : '');
  const [vat, setVat] = useState(x.vat != null ? String(x.vat) : '');
  const [jobId, setJobId] = useState(c.job_id ?? c.suggestion.job_id ?? '');
  const [orderId, setOrderId] = useState(c.suggestion.order_id ?? '');
  const [category, setCategory] = useState(
    mode === 'worker' ? expenseCategoryFor(x.category) : 'materials'
  );
  const [anyway, setAnyway] = useState(false);

  // When the reading arrives, fill in what is still empty.
  useEffect(() => {
    if (!c.extracted) return;
    setSupplier((v) => v || c.extracted?.supplier || '');
    setDate((v) => (v && v !== c.captured_at.slice(0, 10) ? v : c.extracted?.date || v));
    setInvoiceNumber((v) => v || c.extracted?.invoice_number || '');
    setGross((v) => v || (c.extracted?.gross != null ? String(c.extracted.gross) : ''));
    setVat((v) => v || (c.extracted?.vat != null ? String(c.extracted.vat) : ''));
  }, [c.extracted, c.captured_at]);

  const g = Number(gross);
  const v = vat === '' ? 0 : Number(vat);
  const reading = c.status === 'reading' || read.isPending || readEmailed.isPending;
  const readAgain = () =>
    isEmail
      ? readEmailed.mutate(
          { captureId: c.id, force: !!c.extracted },
          { onError: () => toast.error('It could not be read. Fill it in by hand.') }
        )
      : read.mutate({ captureId: c.id, force: !!c.extracted });
  const blocked = !as
    ? 'Nowhere you can post this'
    : !(g > 0)
      ? 'Enter the total'
      : v < 0 || v > g
        ? 'Check the VAT'
        : as === 'po_cost' && !orderId
          ? 'Pick the purchase order'
          : as === 'job_cost' && !jobId
            ? 'Pick the job'
            : c.duplicate_of && !anyway
              ? 'Looks like a duplicate'
              : null;

  const dupBlock = (
    <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3">
      <p className="text-[14px] font-semibold text-white">Possible duplicate</p>
      <p className="mt-0.5 text-[13px] text-white">{c.duplicate_reason}.</p>
      <label className="mt-2 flex min-h-11 items-center gap-3 text-[14px] text-white touch-manipulation">
        <input
          type="checkbox"
          checked={anyway}
          onChange={(e) => setAnyway(e.target.checked)}
          className={checkboxCn}
        />
        It’s a different one, post it anyway
      </label>
    </div>
  );

  const submit = async () => {
    if (!as) return;
    try {
      await post.mutateAsync({
        capture: c,
        as,
        gross: Math.round(g * 100) / 100,
        vat: Math.round(v * 100) / 100,
        supplier: supplier.trim() || null,
        date: date || null,
        invoiceNumber: invoiceNumber.trim() || null,
        jobId: jobId || null,
        orderId: as === 'po_cost' ? orderId || null : null,
        category: as === 'expense' ? category : as === 'job_cost' ? category : null,
        description: supplier.trim()
          ? `${supplier.trim()}${invoiceNumber.trim() ? ` ${invoiceNumber.trim()}` : ''}`
          : null,
        allowDuplicate: anyway,
      });
      if (as === 'po_cost') {
        // ELE-2066: note dearer or unordered lines on the bill. Best effort.
        try {
          await recordBillLineVariances(c.id);
          qc.invalidateQueries({ queryKey: ['supplier-invoices'] });
        } catch {
          /* the bill is posted; the line check can be re-run */
        }
      }
      // Gap #7: an emailed bill's prices go to the price book once it is posted. Best effort.
      let moved = 0;
      if (isEmail) {
        try {
          const r = await applyEmailedBillPrices(c.id);
          moved = r.price_changes ?? 0;
          qc.invalidateQueries({ queryKey: ['bills-inbox'] });
          qc.invalidateQueries({ queryKey: ['firm-price-moves'] });
          qc.invalidateQueries({ queryKey: ['firm-price-book'] });
          qc.invalidateQueries({ queryKey: ['quote-price-moves'] });
          qc.invalidateQueries({ queryKey: ['supplier-connections'] });
        } catch {
          /* the bill is posted; prices can follow on the next bill */
        }
      }
      toast.success(
        (as === 'expense'
          ? 'Claimed. The office approves it'
          : as === 'po_cost'
            ? 'Bill added to the purchase order'
            : 'Cost added to the job') +
          (moved > 0
            ? `. ${moved} price${moved === 1 ? '' : 's'} moved in your price book`
            : '')
      );
      onClose();
    } catch (e) {
      toast.error((e as { message?: string })?.message || 'Could not post that');
    }
  };

  return (
    <FormSheet
      open
      onOpenChange={(o) => !o && onClose()}
      width="wide"
      eyebrow={posted ? 'Posted' : 'Check before it posts'}
      title={x.supplier || (isEmail ? eb?.subject || 'Emailed bill' : 'Receipt')}
      description={
        posted
          ? `Posted as ${POST_LABEL[c.posted_as as PostAs]?.toLowerCase() ?? 'a cost'}, ${money(c.posted_amount)}.`
          : reading
            ? 'Reading it now. You can fill it in by hand if you like.'
            : c.extracted
              ? `Read for you${x.confidence != null && x.confidence < 0.6 ? ', but it was hard to read' : ''}. Check the figures.`
              : held
                ? 'Held because the sender is new to the firm. Read it if you trust it.'
                : c.status === 'failed'
                  ? 'It could not be read. Fill in the figures by hand.'
                  : 'Not read yet.'
      }
      bodyClassName="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10 space-y-5 lg:space-y-0"
      footer={
        posted ? (
          <button type="button" onClick={onClose} className={cn(buttonSecondaryCn, 'w-full')}>
            Close
          </button>
        ) : (
          <div className={footerRowCn}>
            <button
              type="button"
              onClick={() =>
                discard.mutate(c.id, {
                  onSuccess: () => {
                    toast.success('Removed');
                    onClose();
                  },
                  onError: (e) => toast.error((e as Error).message),
                })
              }
              className={cn(buttonSecondaryCn, footerBtnCn, 'flex items-center justify-center gap-2')}
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </button>
            <button
              type="button"
              data-testid="receipt-post"
              disabled={!!blocked || post.isPending}
              onClick={() => void submit()}
              className={cn(buttonPrimaryCn, footerBtnCn, 'flex items-center justify-center gap-2')}
            >
              {post.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                (blocked ?? `Post ${money(g)}`)
              )}
            </button>
          </div>
        )
      }
    >
      <div className="space-y-3">
        {eb && (
          <EmailedFrom
            eb={eb}
            held={held && !posted}
            busy={readEmailed.isPending}
            onRead={(trust) =>
              readEmailed.mutate(
                { captureId: c.id, trust },
                {
                  onSuccess: () =>
                    toast.success(trust ? 'Sender trusted. Read for you' : 'Read for you'),
                  onError: (e) =>
                    toast.error((e as Error).message || 'It could not be read. Fill it in by hand.'),
                }
              )
            }
          />
        )}
        {c.duplicate_of && !posted && <div className="lg:hidden">{dupBlock}</div>}
        {fileUrl ? (
          c.file_mime?.startsWith('text/') ? (
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonSecondaryCn, 'flex w-full items-center justify-center gap-2')}
            >
              <FileText className="h-5 w-5" />
              Open the email
            </a>
          ) : c.file_mime === 'application/pdf' ? (
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonSecondaryCn, 'flex w-full items-center justify-center gap-2')}
            >
              <FileText className="h-5 w-5" />
              Open the PDF
            </a>
          ) : (
            <img
              src={fileUrl}
              alt="The receipt"
              className="max-h-[420px] w-full rounded-xl border border-white/[0.12] object-contain"
            />
          )
        ) : (
          <div className="flex h-40 items-center justify-center rounded-xl border border-white/[0.12]">
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          </div>
        )}
        {!posted && !held && (
          <button
            type="button"
            disabled={reading || (typeof navigator !== 'undefined' && navigator.onLine === false)}
            onClick={readAgain}
            className={cn(buttonSecondaryCn, 'flex w-full items-center justify-center gap-2')}
          >
            {reading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {c.extracted ? 'Read it again' : 'Read it'}
          </button>
        )}
        {(x.lines?.length ?? 0) > 0 && (
          <div className={cn(panelCn, 'divide-y divide-white/[0.07]')}>
            {x.lines!.slice(0, 12).map((l, i) => (
              <div
                key={i}
                className="flex justify-between gap-3 px-4 py-2.5 text-[13.5px] text-white sm:px-5"
              >
                <span className="min-w-0">
                  {l.description}
                  {l.quantity != null && l.quantity !== 1 ? ` × ${l.quantity}` : ''}
                </span>
                <span className="shrink-0 tabular-nums">{money(l.net)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {c.duplicate_of && !posted && <div className="hidden lg:block">{dupBlock}</div>}
        {x.totals_agree === false && (
          <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-[13px] text-white">
            The net, VAT and total on it don’t add up. Check them against the paper.
          </p>
        )}
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-6">
          <div className="col-span-2">
            <label className={labelCn} htmlFor="rc-supplier">
              Supplier
            </label>
            <input
              id="rc-supplier"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              disabled={posted}
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="rc-date">
              Date
            </label>
            <input
              id="rc-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={posted}
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="rc-inv">
              Invoice number
            </label>
            <input
              id="rc-inv"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              disabled={posted}
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="rc-gross">
              Total paid (£)
            </label>
            <input
              id="rc-gross"
              inputMode="decimal"
              value={gross}
              onChange={(e) => setGross(e.target.value.replace(/[^\d.]/g, ''))}
              disabled={posted}
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="rc-vat">
              VAT (£)
            </label>
            <input
              id="rc-vat"
              inputMode="decimal"
              value={vat}
              onChange={(e) => setVat(e.target.value.replace(/[^\d.]/g, ''))}
              disabled={posted}
              className={inputCn}
            />
          </div>
          <p className="col-span-2 text-[13px] text-white">
            Net {money(g > 0 ? Math.round((g - v) * 100) / 100 : null)}
            {x.supplier_vat_number ? ` · Supplier VAT number ${x.supplier_vat_number}` : ''}
          </p>
        </div>

        {!posted && (
          <>
            <div>
              <span className={labelCn}>Where it goes</span>
              {can.length === 0 ? (
                <p className="text-[13.5px] text-white">
                  You are not on the firm’s roster, and only the owner or an admin can post costs.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {can.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setAs(k)}
                      className={cn(chipBase, 'px-4', as === k ? chipOn : chipOff)}
                    >
                      {POST_LABEL[k]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {as === 'po_cost' && (
              <div>
                <span className={labelCn}>Purchase order</span>
                {data.orders.length === 0 ? (
                  <p className="text-[13.5px] text-white">
                    No open purchase orders without a bill.
                  </p>
                ) : (
                  <MobileSelectPicker
                    value={orderId}
                    onValueChange={setOrderId}
                    placeholder="Pick the order"
                    title="Which order is this bill for?"
                    options={data.orders.map((o) => ({
                      value: o.id,
                      label: `${o.order_number ?? 'Order'} · ${o.supplier ?? 'Supplier'}`,
                      description: `${money(o.total)}${o.job_title ? ` · ${o.job_title}` : ''}`,
                    }))}
                  />
                )}
                {eb?.match?.order_id && eb.match.order_id === orderId && (
                  <p className="mt-2 text-[13px] text-white" data-testid="emailed-bill-match">
                    {eb.match.how === 'reference'
                      ? `Matched by the order number on the bill (${eb.order_ref ?? eb.match.order_number})`
                      : eb.match.how === 'supplier_and_total'
                        ? 'Matched by supplier, and the bill agrees with the order'
                        : 'Matched by supplier and the nearest total. Check it is the right order'}
                    {eb.match.job_title ? `. Job: ${eb.match.job_title}` : ''}
                  </p>
                )}
                {orderId && (
                  <div className="mt-4">
                    <BillVsOrder captureId={c.id} orderId={orderId} />
                  </div>
                )}
              </div>
            )}
            {(as === 'expense' || as === 'job_cost') && jobs.length > 0 && (
              <div>
                <span className={labelCn}>{as === 'job_cost' ? 'Job' : 'Job (optional)'}</span>
                <MobileSelectPicker
                  value={jobId}
                  onValueChange={setJobId}
                  placeholder={as === 'job_cost' ? 'Pick the job' : 'Not for a job'}
                  title="Which job?"
                  options={[
                    ...(as === 'expense' ? [{ value: '', label: 'Not for a job' }] : []),
                    ...jobs.map((j) => ({ value: j.id, label: j.title })),
                  ]}
                />
              </div>
            )}
            {as === 'expense' && (
              <div className="flex flex-wrap gap-2">
                {EXPENSE_CATEGORIES.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setCategory(k)}
                    className={cn(chipBase, 'px-4', category === k ? chipOn : chipOff)}
                  >
                    {k}
                  </button>
                ))}
              </div>
            )}
            {as === 'job_cost' && (
              <div className="flex flex-wrap gap-2">
                {JOB_COST_CATEGORIES.map((k) => (
                  <button
                    key={k.v}
                    type="button"
                    onClick={() => setCategory(k.v)}
                    className={cn(chipBase, 'px-4', category === k.v ? chipOn : chipOff)}
                  >
                    {k.l}
                  </button>
                ))}
                {data.vat_registered && (
                  <p className="w-full text-[13px] text-white">
                    Your firm is VAT registered, so the job gets the net cost.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </FormSheet>
  );
}

/** The Employer Hub version: the firm's own jobs, the firm's captures. */
export function OfficeReceiptsPanel() {
  const { data: firmId } = useOfficeFirmId();
  const { data: jobs = [] } = useQuery({
    queryKey: ['receipt-firm-jobs', firmId],
    enabled: !!firmId,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_jobs')
        .select('id, title')
        .eq('user_id', firmId!)
        .is('archived_at', null)
        .or('is_template.is.null,is_template.eq.false')
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return (data ?? []) as { id: string; title: string }[];
    },
  });
  return (
    <>
      <ReceiptsPanel firmId={firmId} mode="office" jobs={jobs} />
      {/* Gap #7: wholesaler invoices by email land in the list above */}
      <BillsAddressPanel />
    </>
  );
}

/** Gap #7: who sent an emailed bill, and the choice for a held one. */
function EmailedFrom({
  eb,
  held,
  busy,
  onRead,
}: {
  eb: EmailedBill;
  held: boolean;
  busy: boolean;
  onRead: (trust: boolean) => void;
}) {
  const when = new Date(eb.received_at).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
  const moved = eb.prices_result?.price_changes ?? 0;
  return (
    <div
      className="rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3"
      data-testid="emailed-from"
    >
      <p className="text-[14px] font-semibold text-white">Came by email from {senderLabel(eb)}</p>
      {eb.from_name && eb.from_address && (
        <p className="mt-0.5 text-[13px] text-white [overflow-wrap:anywhere]">{eb.from_address}</p>
      )}
      <p className="mt-0.5 text-[13px] text-white">Received {when}</p>
      {eb.subject && <p className="mt-0.5 text-[13px] text-white">“{eb.subject}”</p>}
      {eb.prices_applied_at && (
        <p className="mt-2 text-[13px] text-white">
          {eb.prices_result?.account === false
            ? `${(eb.prices_result?.last_paid ?? 0) > 0 ? 'Last paid prices updated. ' : ''}Add this wholesaler under Price book, Wholesalers so its prices reach your price book and show on quotes.`
            : moved > 0
              ? `${moved} price${moved === 1 ? '' : 's'} moved in your price book. Open quotes show the change.`
              : 'Prices checked against your price book. Nothing moved.'}
        </p>
      )}
      {held && (
        <>
          <p className="mt-2 text-[13px] text-white">
            Not read yet: this address is new to the firm. Nothing is posted until you check it.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => onRead(true)}
              data-testid="emailed-trust-read"
              className={cn(buttonSecondaryCn, 'flex flex-1 items-center justify-center gap-2 px-4')}
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Trust and read it'}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => onRead(false)}
              className="h-11 px-3 text-[13.5px] font-semibold text-white touch-manipulation"
            >
              Read this one only
            </button>
          </div>
        </>
      )}
    </div>
  );
}
