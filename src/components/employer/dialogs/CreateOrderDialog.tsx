import { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { SelectField } from '@/components/forms';
import {
  inputCn,
  labelCn,
  cardCn,
  grid2Cn,
  fieldFullCn,
  textareaCn,
  chipBase,
  chipOn,
  chipOff,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import {
  useCreateMaterialOrder,
  useNextOrderNumber,
  useSuppliers,
  useQuotes,
} from '@/hooks/useFinance';
import { useJobs } from '@/hooks/useJobs';
import { useAuth } from '@/contexts/AuthContext';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import { useFirmPriceBook, normaliseName, gbp, priceFor, type FirmPriceBookItem } from '@/hooks/useFirmPriceBook';
import { PriceBookPicker, type PickedPriceBookLine } from '@/components/employer/PriceBookPicker';
import { useFirmSupplierCodes } from '@/hooks/useWholesalers';
import type { MaterialOrder, Quote } from '@/services/financeService';

/* ==========================================================================
   Raise a purchase order (ELE-1978) — from a job, with its materials list.

   Opened from a job ("Order materials"), the job's quote fills the lines:
   each material is matched to the firm price book (ELE-1991) for its buy
   price and usual supplier. Lines can also be picked from the price book or
   typed. Totals are recomputed by the database from the lines (po_totals).
   Nothing is sent to the supplier until the person taps "Save & send".
   Owner/admin only — a PO is buy prices.
   ========================================================================== */

interface OrderLine {
  id: string;
  name: string;
  unit: string | null;
  qty: string;
  price: string;
  price_book_item_id: string | null;
  /** True when the price book had no buy price for it. */
  needsPrice: boolean;
  /** Set when the price came from the supplier's own price file (ELE-2066). */
  tradePrice?: boolean;
  /** Typed by hand: a supplier price never overwrites it. */
  priceEdited?: boolean;
}

type DeliveryMode = 'Deliver to site' | 'Collection';

const defaultExpectedDate = (): string => {
  const d = new Date();
  let added = 0;
  while (added < 2) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return d.toISOString().split('T')[0];
};

const isMaterialLine = (li: Record<string, unknown>) =>
  li.type === 'material' || li.category === 'materials' || li.category === 'equipment';

interface CreateOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefillSupplier?: string;
  prefillItem?: string;
  /** Raised from a job: links the PO and fills it from the job's quote. */
  prefillJobId?: string | null;
  /** Called after a PO is created; `send` is true when the person chose "Save & send". */
  onCreated?: (order: MaterialOrder, send: boolean) => void;
}

export function CreateOrderDialog({
  open,
  onOpenChange,
  prefillSupplier,
  prefillItem,
  prefillJobId,
  onCreated,
}: CreateOrderDialogProps) {
  const [supplierId, setSupplierId] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [lines, setLines] = useState<OrderLine[]>([]);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('Deliver to site');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [expectedDate, setExpectedDate] = useState(defaultExpectedDate);
  const [vatRate, setVatRate] = useState(20);
  const [fromQuoteId, setFromQuoteId] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [custom, setCustom] = useState({ name: '', qty: '1', price: '' });
  const prefilledFor = useRef<string | null>(null);

  const { data: orderNumber } = useNextOrderNumber();
  const { data: suppliers = [] } = useSuppliers();
  const { data: priceBook = [] } = useFirmPriceBook();
  // The wholesaler's product code and account price per item (owner/admin, ELE-2066).
  const { data: supplierCodes } = useFirmSupplierCodes(open);
  const { data: jobs = [] } = useJobs();
  const { data: quotes = [] } = useQuotes();
  const createOrderMutation = useCreateMaterialOrder();
  const { user, profile } = useAuth();
  const voiceContext = useOptionalVoiceFormContext();

  const bookByName = useMemo(() => {
    const m = new Map<string, FirmPriceBookItem>();
    for (const i of priceBook) if (!m.has(normaliseName(i.name))) m.set(normaliseName(i.name), i);
    return m;
  }, [priceBook]);

  const lineFromBook = (item: FirmPriceBookItem, qty: number): OrderLine => {
    const p = priceFor(item, 'buy');
    return {
      id: crypto.randomUUID(),
      name: item.name,
      unit: item.unit,
      qty: String(qty),
      price: p != null ? p.toFixed(2) : '',
      price_book_item_id: item.item_id.includes(':') ? null : item.item_id,
      needsPrice: p == null,
    };
  };

  /** The job's quote → PO lines, matched to the price book for buy prices. */
  const buildFromQuote = (quote: Quote) => {
    setFromQuoteId(quote.id);
    const raw = (quote.line_items as Array<Record<string, unknown>>) ?? [];
    const built: OrderLine[] = raw.filter(isMaterialLine).map((li) => {
      const name = String(li.description ?? li.name ?? 'Material').trim();
      const qty = Number(li.quantity) || 1;
      const match = bookByName.get(normaliseName(name));
      if (match) return { ...lineFromBook(match, qty), unit: (li.unit as string) || match.unit };
      return {
        id: crypto.randomUUID(),
        name,
        unit: (li.unit as string) || null,
        qty: String(qty),
        price: '',
        price_book_item_id: null,
        needsPrice: true,
      };
    });
    setLines(built);
    if (quote.job_id) setJobId(quote.job_id);
    // The usual supplier of most of the matched lines.
    if (!supplierId) {
      const counts = new Map<string, number>();
      for (const l of built) {
        const sid = l.price_book_item_id
          ? priceBook.find((p) => p.item_id === l.price_book_item_id)?.supplier_id
          : null;
        if (sid) counts.set(sid, (counts.get(sid) ?? 0) + 1);
      }
      const best = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
      if (best && suppliers.some((s) => s.id === best)) setSupplierId(best);
    }
  };

  const jobQuotes = useMemo(
    () => (jobId ? quotes.filter((q) => q.job_id === jobId) : quotes),
    [quotes, jobId]
  );

  // Prefills each time the sheet opens (it stays mounted between opens).
  useEffect(() => {
    if (!open) {
      prefilledFor.current = null;
      return;
    }
    if (prefillSupplier) setSupplierId(prefillSupplier);
    if (prefillItem) setCustom((c) => (c.name ? c : { ...c, name: prefillItem }));
    if (prefillJobId) setJobId(prefillJobId);
  }, [open, prefillSupplier, prefillItem, prefillJobId]);

  // From a job: fill from its best quote once the quotes and price book are in.
  useEffect(() => {
    if (!open || !prefillJobId || prefilledFor.current === prefillJobId) return;
    if (quotes.length === 0 && priceBook.length === 0) return;
    const mine = quotes.filter((q) => q.job_id === prefillJobId);
    const best =
      mine.find((q) => q.acceptance_status === 'accepted' || q.status === 'Approved') ?? mine[0];
    prefilledFor.current = prefillJobId;
    if (best && lines.length === 0) buildFromQuote(best);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, prefillJobId, quotes, priceBook]);

  // Deliver to site defaults to the job's address.
  useEffect(() => {
    if (deliveryMode !== 'Deliver to site' || !jobId) return;
    const job = jobs.find((j) => j.id === jobId);
    if (job?.location && !deliveryAddress.trim()) setDeliveryAddress(job.location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId, deliveryMode, jobs]);

  const codeFor = (l: OrderLine) =>
    l.price_book_item_id && supplierId
      ? supplierCodes?.get(`${l.price_book_item_id}|${supplierId}`) ?? null
      : null;

  // Lines from the price book take this supplier's own account price when its
  // price file has one.
  useEffect(() => {
    if (!supplierId || !supplierCodes || supplierCodes.size === 0) return;
    setLines((prev) => {
      let changed = false;
      const next = prev.map((l) => {
        const c = l.price_book_item_id ? supplierCodes.get(`${l.price_book_item_id}|${supplierId}`) : null;
        if (l.priceEdited) return l;
        if (!c || !(c.trade_price > 0)) return l.tradePrice ? { ...l, tradePrice: false } : l;
        const price = c.trade_price.toFixed(2);
        if (l.price === price && l.tradePrice) return l;
        changed = true;
        return { ...l, price, tradePrice: true, needsPrice: false };
      });
      return changed ? next : prev;
    });
  }, [supplierId, supplierCodes, lines.length]);

  const n = (v: string) => (Number.isFinite(Number(v)) ? Number(v) : 0);
  const subtotal = lines.reduce((s, l) => s + n(l.qty) * n(l.price), 0);
  const vatAmount = Math.round(subtotal * vatRate) / 100;
  const total = Math.round((subtotal + vatAmount) * 100) / 100;
  const missingPrices = lines.filter((l) => l.price.trim() === '' || n(l.price) === 0).length;
  const selectedSupplier = suppliers.find((s) => s.id === supplierId);
  const activeJobs = jobs.filter((j) => j.status !== 'Completed' && j.status !== 'Cancelled');
  const canSave = !!supplierId && lines.length > 0 && lines.every((l) => n(l.qty) > 0);

  const submitRef = useRef<(send?: boolean) => void>(() => {});

  useEffect(() => {
    if (!open || !voiceContext) return;
    voiceContext.registerForm({
      formId: 'create-order',
      formName: 'Raise Purchase Order',
      fields: [
        { name: 'supplier', label: 'Supplier', type: 'text', required: true },
        { name: 'job', label: 'Linked Job', type: 'text' },
        { name: 'notes', label: 'Notes', type: 'text' },
      ],
      actions: ['add_item'],
      onFillField: (field, value) => {
        const v = String(value).toLowerCase();
        if (field === 'supplier') {
          const sup = suppliers.find((s) => s.name.toLowerCase().includes(v));
          if (sup) setSupplierId(sup.id);
        } else if (field === 'job') {
          const job = activeJobs.find((j) => j.title.toLowerCase().includes(v));
          if (job) setJobId(job.id);
        } else if (field === 'notes') {
          setNotes(String(value));
        }
      },
      onAction: (action, params) => {
        if (action !== 'add_item' || !params) return;
        const name = String(params.name || 'Item');
        const match = bookByName.get(normaliseName(name));
        setLines((prev) => [
          ...prev,
          match
            ? lineFromBook(match, Number(params.qty) || 1)
            : {
                id: crypto.randomUUID(),
                name,
                unit: null,
                qty: String(Number(params.qty) || 1),
                price: params.price ? String(params.price) : '',
                price_book_item_id: null,
                needsPrice: !params.price,
              },
        ]);
      },
      onSubmit: () => submitRef.current(false),
      onCancel: () => {
        resetForm();
        onOpenChange(false);
      },
    });
    return () => voiceContext.unregisterForm('create-order');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, voiceContext, suppliers, activeJobs, bookByName]);

  const addPicked = (picked: PickedPriceBookLine[]) => {
    setLines((prev) => {
      const next = [...prev];
      for (const p of picked) {
        const at = next.findIndex((l) => l.price_book_item_id && l.price_book_item_id === p.item.item_id);
        if (at >= 0) next[at] = { ...next[at], qty: String(n(next[at].qty) + p.qty) };
        else next.push(lineFromBook(p.item, p.qty));
      }
      return next;
    });
  };

  const addCustom = () => {
    if (!custom.name.trim()) return;
    const match = bookByName.get(normaliseName(custom.name));
    setLines((prev) => [
      ...prev,
      match && custom.price.trim() === ''
        ? lineFromBook(match, n(custom.qty) || 1)
        : {
            id: crypto.randomUUID(),
            name: custom.name.trim(),
            unit: match?.unit ?? null,
            qty: String(n(custom.qty) || 1),
            price: custom.price,
            price_book_item_id: match && !match.item_id.includes(':') ? match.item_id : null,
            needsPrice: custom.price.trim() === '',
          },
    ]);
    setCustom({ name: '', qty: '1', price: '' });
  };

  const updateLine = (id: string, patch: Partial<OrderLine>) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  const resetForm = () => {
    setSupplierId('');
    setJobId(null);
    setNotes('');
    setLines([]);
    setCustom({ name: '', qty: '1', price: '' });
    setDeliveryMode('Deliver to site');
    setDeliveryAddress('');
    setExpectedDate(defaultExpectedDate());
    setVatRate(20);
    setFromQuoteId('');
  };

  const handleSubmit = async (send = false) => {
    if (!canSave) return;
    let created: MaterialOrder;
    try {
      created = await createOrderMutation.mutateAsync({
        // A non-numeric fallback never hijacks the PO-YYYY-NNNN sequence.
        order_number:
          orderNumber || `PO-${new Date().getFullYear()}-T${Date.now().toString(36).toUpperCase()}`,
        supplier_id: supplierId,
        job_id: jobId,
        items: lines.map((l) => ({
          name: l.name,
          sku: codeFor(l)?.product_code ?? null,
          unit: l.unit,
          qty: n(l.qty),
          unit_cost: Math.round(n(l.price) * 100) / 100,
          received_qty: 0,
          price_book_item_id: l.price_book_item_id,
        })),
        subtotal,
        vat_rate: vatRate,
        vat_amount: vatAmount,
        total,
        status: 'Draft',
        delivery_mode: deliveryMode,
        delivery_address: deliveryMode === 'Deliver to site' ? deliveryAddress || null : null,
        order_date: new Date().toISOString().split('T')[0],
        expected_date: expectedDate || null,
        delivery_date: null,
        ordered_by: profile?.full_name?.trim() || user?.email || null,
        sent_at: null,
        sent_to_email: null,
        confirmed_at: null,
        pdf_url: null,
        notes: notes || null,
      });
    } catch {
      return; // the hook toasts; keep the sheet open so nothing is lost
    }
    resetForm();
    onOpenChange(false);
    if (created) onCreated?.(created, send);
  };

  useEffect(() => {
    submitRef.current = handleSubmit;
  });

  const jobTitle = jobId ? jobs.find((j) => j.id === jobId)?.title : null;

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        eyebrow="Purchase order"
        title={jobTitle ? `Order materials for ${jobTitle}` : 'Raise a purchase order'}
        description={`${orderNumber || 'Number given when saved'} · Draft. Nothing goes to the supplier until you send it.`}
        width="wide"
        footer={
          <div className="flex gap-2" data-help="procurement.order-save">
            {selectedSupplier?.email ? (
              <>
                <button
                  type="button"
                  onClick={() => handleSubmit(false)}
                  disabled={!canSave || createOrderMutation.isPending}
                  className={cn(buttonSecondaryCn, 'flex-1 px-4')}
                >
                  Save draft
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(true)}
                  disabled={!canSave || createOrderMutation.isPending}
                  className={cn(buttonPrimaryCn, 'flex-[1.6] px-4')}
                >
                  {createOrderMutation.isPending ? 'Saving…' : `Save & send · ${gbp(total)}`}
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonSecondaryCn, 'flex-1 px-4')}>
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(false)}
                  disabled={!canSave || createOrderMutation.isPending}
                  className={cn(buttonPrimaryCn, 'flex-[1.6] px-4')}
                >
                  {createOrderMutation.isPending ? 'Saving…' : `Save draft · ${gbp(total)}`}
                </button>
              </>
            )}
          </div>
        }
      >
        <div className="space-y-5 lg:grid lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-6 lg:space-y-0">
          {/* ── Lines ─────────────────────────────────────────────── */}
          <div className="space-y-5">
            <section className={cardCn}>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[15px] font-semibold text-white">
                  What to order{lines.length ? ` · ${lines.length}` : ''}
                </h2>
                <button
                  type="button"
                  onClick={() => setPickerOpen(true)}
                  className="inline-flex h-11 items-center gap-1.5 text-[14px] font-semibold text-elec-yellow touch-manipulation"
                >
                  <Plus className="h-4 w-4" aria-hidden /> Price book
                </button>
              </div>

              {jobQuotes.length > 0 && (
                <div>
                  <label className={labelCn}>{jobId ? "Fill from this job's quote" : 'Fill from a quote'}</label>
                  <SelectField
                    value={fromQuoteId}
                    onValueChange={(v) => {
                      const q = quotes.find((x) => x.id === v);
                      if (q) buildFromQuote(q);
                    }}
                    options={jobQuotes.slice(0, 50).map((q) => ({
                      value: q.id,
                      label: `${q.quote_number || 'Quote'} · ${q.client}${q.job_title ? ` · ${q.job_title}` : ''}`,
                    }))}
                    placeholder="Pick a quote"
                    title="Fill from a quote"
                  />
                  <p className="mt-1 text-[12px] text-white">
                    Its materials come in at your buy price from the price book.
                  </p>
                </div>
              )}

              {lines.length === 0 ? (
                <p className="py-3 text-[14px] text-white">
                  {jobId && jobQuotes.length === 0
                    ? 'No quote on this job yet. Add lines from the price book or type them below.'
                    : 'Add lines from the price book, a quote, or type them below.'}
                </p>
              ) : (
                <ul className="divide-y divide-white/[0.08]">
                  {lines.map((l) => {
                    const lineTotal = n(l.qty) * n(l.price);
                    const noPrice = l.price.trim() === '' || n(l.price) === 0;
                    return (
                      <li key={l.id} className="py-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[14px] font-medium text-white">{l.name}</p>
                            {noPrice ? (
                              <p className="text-[12px] font-medium text-orange-300">
                                {l.needsPrice ? 'No buy price in the price book. Add one.' : 'Add a price.'}
                              </p>
                            ) : (
                              <p className="text-[12px] text-white">
                                {l.tradePrice && selectedSupplier
                                  ? `Your ${selectedSupplier.name} price`
                                  : l.price_book_item_id
                                    ? 'From the price book'
                                    : 'Typed line'}
                                {codeFor(l) ? ` · Code ${codeFor(l)!.product_code}` : ''}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => setLines((prev) => prev.filter((x) => x.id !== l.id))}
                            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-red-300 touch-manipulation hover:bg-red-500/10"
                            aria-label={`Remove ${l.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-1 grid grid-cols-[1fr_1.3fr_auto] items-end gap-3">
                          <div>
                            <label className={labelCn} htmlFor={`qty-${l.id}`}>
                              Qty{l.unit ? ` (${l.unit})` : ''}
                            </label>
                            <input
                              id={`qty-${l.id}`}
                              inputMode="decimal"
                              value={l.qty}
                              onChange={(e) => /^\d*\.?\d{0,3}$/.test(e.target.value) && updateLine(l.id, { qty: e.target.value })}
                              className={inputCn}
                            />
                          </div>
                          <div>
                            <label className={labelCn} htmlFor={`cost-${l.id}`}>
                              Buy price each (£)
                            </label>
                            <input
                              id={`cost-${l.id}`}
                              inputMode="decimal"
                              value={l.price}
                              placeholder="0.00"
                              onChange={(e) => /^\d*\.?\d{0,2}$/.test(e.target.value) && updateLine(l.id, { price: e.target.value, tradePrice: false, priceEdited: true })}
                              className={inputCn}
                            />
                          </div>
                          <p className="pb-3 text-right text-[15px] font-semibold tabular-nums text-white">{gbp(lineTotal)}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="border-t border-white/[0.1] pt-4">
                <h3 className="text-sm font-semibold text-white">Type a line</h3>
                <div className={cn(grid2Cn, 'mt-2')}>
                  <div className={fieldFullCn}>
                    <label className={labelCn} htmlFor="po-custom-name">
                      Item
                    </label>
                    <input
                      id="po-custom-name"
                      value={custom.name}
                      onChange={(e) => setCustom({ ...custom, name: e.target.value })}
                      placeholder="e.g. 20mm conduit, 3m"
                      className={inputCn}
                      list="po-pricebook-names"
                    />
                    <datalist id="po-pricebook-names">
                      {priceBook.slice(0, 300).map((i) => (
                        <option key={i.item_id} value={i.name} />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <label className={labelCn} htmlFor="po-custom-qty">
                      Qty
                    </label>
                    <input
                      id="po-custom-qty"
                      inputMode="decimal"
                      value={custom.qty}
                      onChange={(e) => /^\d*\.?\d{0,3}$/.test(e.target.value) && setCustom({ ...custom, qty: e.target.value })}
                      className={inputCn}
                    />
                  </div>
                  <div>
                    <label className={labelCn} htmlFor="po-custom-price">
                      Buy price each (£)
                    </label>
                    <input
                      id="po-custom-price"
                      inputMode="decimal"
                      value={custom.price}
                      placeholder="From price book"
                      onChange={(e) => /^\d*\.?\d{0,2}$/.test(e.target.value) && setCustom({ ...custom, price: e.target.value })}
                      className={inputCn}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addCustom}
                  disabled={!custom.name.trim()}
                  className={cn(buttonSecondaryCn, 'mt-3 w-full')}
                >
                  Add line
                </button>
              </div>
            </section>
          </div>

          {/* ── Supplier, job, delivery, totals ───────────────────── */}
          <div className="space-y-5">
            <section className={cardCn}>
              <h2 className="text-[15px] font-semibold text-white">Supplier and job</h2>
              <div>
                <label className={labelCn}>Supplier</label>
                <SelectField
                  value={supplierId}
                  onValueChange={setSupplierId}
                  options={suppliers.map((s) => ({
                    value: s.id,
                    label: s.name,
                    description: [
                      s.account_number ? `Account ${s.account_number}` : null,
                      Number(s.discount_percent) > 0 ? `${Number(s.discount_percent)}% off` : null,
                      s.email ? null : 'no email yet',
                    ]
                      .filter(Boolean)
                      .join(' · ') || undefined,
                  }))}
                  placeholder={suppliers.length ? 'Pick a supplier' : 'Add a supplier first'}
                  title="Supplier"
                  disabled={suppliers.length === 0}
                />
                {selectedSupplier && !selectedSupplier.email && (
                  <p className="mt-1 text-[12px] text-orange-300">
                    No email for {selectedSupplier.name} yet, so this saves as a draft. Add one on the order to send it.
                  </p>
                )}
              </div>
              <div>
                <label className={labelCn}>Job</label>
                <SelectField
                  value={jobId ?? 'none'}
                  onValueChange={(v) => setJobId(v === 'none' ? null : v)}
                  options={[
                    { value: 'none', label: 'Not for a job (stock)' },
                    ...activeJobs.map((j) => ({ value: j.id, label: j.title })),
                  ]}
                  title="Which job is it for?"
                />
                {jobId && (
                  <p className="mt-1 text-[12px] text-white">The cost lands on this job once it is sent.</p>
                )}
              </div>
            </section>

            <section className={cardCn}>
              <h2 className="text-[15px] font-semibold text-white">Delivery</h2>
              <div className="grid grid-cols-2 gap-2">
                {(['Deliver to site', 'Collection'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDeliveryMode(m)}
                    className={cn(chipBase, deliveryMode === m ? chipOn : chipOff)}
                  >
                    {m}
                  </button>
                ))}
              </div>
              {deliveryMode === 'Deliver to site' && (
                <div>
                  <label className={labelCn} htmlFor="po-address">
                    Delivery address
                  </label>
                  <textarea
                    id="po-address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className={cn(textareaCn, 'min-h-[64px]')}
                    placeholder="Where should it go?"
                  />
                </div>
              )}
              <div>
                <label className={labelCn} htmlFor="po-expected">
                  Needed by
                </label>
                <input
                  id="po-expected"
                  type="date"
                  value={expectedDate}
                  onChange={(e) => setExpectedDate(e.target.value)}
                  className={inputCn}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="po-notes">
                  Note to the supplier
                </label>
                <textarea
                  id="po-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={cn(textareaCn, 'min-h-[64px]')}
                  placeholder="Site contact, access, delivery window"
                />
              </div>
            </section>

            <section className={cardCn}>
              <h2 className="text-[15px] font-semibold text-white">Total</h2>
              <div className="flex items-center justify-between text-[14px] text-white">
                <span>Lines</span>
                <span className="tabular-nums">{gbp(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[14px] text-white">
                <span>VAT</span>
                <div className="flex gap-1.5">
                  {[20, 5, 0].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setVatRate(r)}
                      className={cn(chipBase, 'h-11 min-w-[3.25rem] rounded-full px-3 text-[13px]', vatRate === r ? chipOn : chipOff)}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
                <span className="tabular-nums">{gbp(vatAmount)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.1] pt-3">
                <span className="text-[14px] font-semibold text-white">Order total</span>
                <span className="text-[22px] font-semibold tabular-nums text-elec-yellow">{gbp(total)}</span>
              </div>
              {missingPrices > 0 && (
                <p className="text-[12px] text-orange-300">
                  {missingPrices} line{missingPrices === 1 ? ' has' : 's have'} no price, so the total is short.
                </p>
              )}
            </section>
          </div>
        </div>
      </FormSheet>

      <PriceBookPicker open={pickerOpen} onOpenChange={setPickerOpen} mode="buy" onAdd={addPicked} />
    </>
  );
}
