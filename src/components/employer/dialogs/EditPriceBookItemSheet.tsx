import { useEffect, useMemo, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { FormSheet } from '@/components/forms/FormSheet';
import { SelectField } from '@/components/forms';
import {
  inputCn,
  labelCn,
  cardCn,
  grid2Cn,
  fieldFullCn,
  infoPanelCn,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import {
  useSaveFirmPriceBookItem,
  useDeleteFirmPriceBookItem,
  gbp,
  daysSince,
  type FirmPriceBookItem,
} from '@/hooks/useFirmPriceBook';
import type { Supplier } from '@/services/financeService';

/* ==========================================================================
   Add or edit one item in the firm price book (ELE-1991). The same record
   the owner sees in their Electrical Hub price book.

   Owner/admin: buy price, markup and sell price (any two give the third),
   supplier, and the last price actually paid from matched supplier
   invoices. Office manager: name, unit, category, supplier and SELL price
   only — buy price and markup are never sent to them and never written.
   ========================================================================== */

const UNITS = ['each', 'm', 'roll', 'box', 'pack', 'pair', 'length', 'hour', 'day', 'job'];

const decimal = (v: string) => v === '' || /^\d*\.?\d{0,4}$/.test(v);
const toNum = (v: string) => (v.trim() === '' ? null : Number(v));
const fix2 = (n: number) => (Math.round(n * 100) / 100).toFixed(2);

interface Props {
  /** null = a new item. */
  item: FirmPriceBookItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moneyVisible: boolean;
  defaultMarkup: number;
  suppliers: Supplier[];
  categories: string[];
}

export function EditPriceBookItemSheet({
  item,
  open,
  onOpenChange,
  moneyVisible,
  defaultMarkup,
  suppliers,
  categories,
}: Props) {
  const save = useSaveFirmPriceBookItem();
  const remove = useDeleteFirmPriceBookItem();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [name, setName] = useState('');
  const [unit, setUnit] = useState('each');
  const [category, setCategory] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [supplierText, setSupplierText] = useState('');
  const [buy, setBuy] = useState('');
  const [markup, setMarkup] = useState('');
  const [sell, setSell] = useState('');

  useEffect(() => {
    if (!open) return;
    setName(item?.name ?? '');
    setUnit(item?.unit ?? 'each');
    setCategory(item?.category && item.category !== 'General' ? item.category : '');
    setSupplierId(item?.supplier_id ?? '');
    setSupplierText(item?.supplier ?? '');
    setBuy(item?.buy_price != null ? fix2(item.buy_price) : '');
    setMarkup(
      item?.markup_percent != null
        ? String(item.markup_percent)
        : item
          ? ''
          : String(defaultMarkup)
    );
    setSell(item?.sell_price != null ? fix2(item.sell_price) : '');
  }, [open, item, defaultMarkup]);

  // Any two of buy / markup / sell give the third.
  const onBuy = (v: string) => {
    if (!decimal(v)) return;
    setBuy(v);
    const b = toNum(v);
    // No markup of its own yet: start from the firm's default.
    let m = toNum(markup);
    if (m == null && b != null && b > 0) {
      m = defaultMarkup;
      setMarkup(String(defaultMarkup));
    }
    if (b != null && b > 0 && m != null) setSell(fix2(b * (1 + m / 100)));
  };
  const onMarkup = (v: string) => {
    if (!decimal(v)) return;
    setMarkup(v);
    const b = toNum(buy);
    const m = toNum(v);
    if (b != null && b > 0 && m != null) setSell(fix2(b * (1 + m / 100)));
  };
  const onSell = (v: string) => {
    if (!decimal(v)) return;
    setSell(v);
    const b = toNum(buy);
    const s = toNum(v);
    if (moneyVisible && b != null && b > 0 && s != null) {
      setMarkup(String(Math.round(((s - b) / b) * 1000) / 10));
    }
  };

  const supplierOptions = useMemo(
    () => [
      { value: '__none', label: 'No supplier' },
      ...suppliers.map((s) => ({ value: s.id, label: s.name })),
    ],
    [suppliers]
  );
  const categoryOptions = useMemo(
    () => [
      { value: '__auto', label: 'Work it out from the name' },
      ...Array.from(new Set(categories.filter((c) => c && c !== 'General'))).map((c) => ({ value: c, label: c })),
    ],
    [categories]
  );

  const sellNum = toNum(sell);
  const buyNum = toNum(buy);
  const lastPaid = item?.last_paid_price ?? null;
  const paidMore = moneyVisible && lastPaid != null && buyNum != null && lastPaid > buyNum * 1.02;
  const stale = daysSince(item?.price_updated_at);
  const valid = name.trim().length > 0 && (sellNum == null || sellNum >= 0) && (buyNum == null || buyNum >= 0);

  const onSave = async () => {
    const chosen = suppliers.find((s) => s.id === supplierId);
    try {
      await save.mutateAsync({
        item_id: item?.item_id && !item.item_id.includes(':') ? item.item_id : null,
        name: name.trim(),
        unit,
        category: category || null,
        sell: sellNum,
        buy: moneyVisible ? buyNum : null,
        markup: moneyVisible ? toNum(markup) : null,
        supplier: chosen?.name ?? (supplierText.trim() || null),
        supplier_id: chosen?.id ?? null,
      });
      onOpenChange(false);
    } catch {
      /* hook toasts */
    }
  };

  const editable = !item || !item.item_id.includes(':');

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        eyebrow="Price book"
        title={item ? item.name : 'Add an item'}
        description={
          item
            ? `In the "${item.list_name}" list, shared with the Electrical Hub price book.`
            : 'Added to the owner\'s "Price Book" list, shared with the Electrical Hub.'
        }
        width="wide"
        footer={
          <div className="flex gap-2">
            {item && editable ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                disabled={remove.isPending}
                className="h-12 rounded-xl border border-red-500/30 bg-red-500/10 px-4 text-[14px] font-semibold text-red-300 touch-manipulation"
              >
                Remove
              </button>
            ) : (
              <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonSecondaryCn, 'px-4')}>
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={onSave}
              disabled={!valid || save.isPending || !editable}
              className={cn(buttonPrimaryCn, 'flex-1 px-4')}
            >
              {save.isPending ? 'Saving…' : item ? 'Save changes' : 'Add to price book'}
            </button>
          </div>
        }
      >
        {!editable && (
          <div className={infoPanelCn}>
            <p className="text-[13px] text-white">
              This line was saved without an id in an old Electrical Hub list. Open it in the
              Electrical Hub price book to edit it.
            </p>
          </div>
        )}

        <div className="space-y-5 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          <section className={cardCn}>
            <h2 className="text-[15px] font-semibold text-white">The item</h2>
            <div className={grid2Cn}>
              <div className={fieldFullCn}>
                <label className={labelCn} htmlFor="pb-name">
                  Name
                </label>
                <input
                  id="pb-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 2.5mm² twin and earth, 100m"
                  className={inputCn}
                  maxLength={300}
                />
              </div>
              <div>
                <label className={labelCn}>Unit</label>
                <SelectField
                  value={unit}
                  onValueChange={setUnit}
                  options={(UNITS.includes(unit) ? UNITS : [unit, ...UNITS]).map((u) => ({ value: u, label: u }))}
                  title="Sold by the…"
                />
              </div>
              <div>
                <label className={labelCn}>Category</label>
                <SelectField
                  value={category || '__auto'}
                  onValueChange={(v) => setCategory(v === '__auto' ? '' : v)}
                  options={categoryOptions}
                  title="Category"
                />
              </div>
              <div className={fieldFullCn}>
                <label className={labelCn}>Usual supplier</label>
                {suppliers.length > 0 ? (
                  <SelectField
                    value={supplierId || '__none'}
                    onValueChange={(v) => setSupplierId(v === '__none' ? '' : v)}
                    options={supplierOptions}
                    title="Usual supplier"
                  />
                ) : (
                  <input
                    value={supplierText}
                    onChange={(e) => setSupplierText(e.target.value)}
                    placeholder="e.g. CEF"
                    className={inputCn}
                  />
                )}
                {!supplierId && supplierText && suppliers.length > 0 && (
                  <p className="mt-1 text-[12px] text-white">Saved as “{supplierText}”. Pick a supplier to link it.</p>
                )}
              </div>
            </div>
            {item?.labour_hours != null && item.labour_hours > 0 && (
              <p className="text-[13px] text-white">
                Labour allowance {item.labour_hours} h per {item.unit} (set in the Electrical Hub price book).
              </p>
            )}
          </section>

          <section className={cardCn}>
            <h2 className="text-[15px] font-semibold text-white">Prices</h2>
            <div className={grid2Cn}>
              {moneyVisible && (
                <>
                  <div>
                    <label className={labelCn} htmlFor="pb-buy">
                      Buy price (£)
                    </label>
                    <input id="pb-buy" inputMode="decimal" value={buy} onChange={(e) => onBuy(e.target.value)} placeholder="0.00" className={inputCn} />
                  </div>
                  <div>
                    <label className={labelCn} htmlFor="pb-markup">
                      Markup (%)
                    </label>
                    <input id="pb-markup" inputMode="decimal" value={markup} onChange={(e) => onMarkup(e.target.value)} placeholder={String(defaultMarkup)} className={inputCn} />
                  </div>
                </>
              )}
              <div className={fieldFullCn}>
                <label className={labelCn} htmlFor="pb-sell">
                  Sell price (£) — what quotes use
                </label>
                <input id="pb-sell" inputMode="decimal" value={sell} onChange={(e) => onSell(e.target.value)} placeholder="0.00" className={inputCn} />
              </div>
            </div>

            {moneyVisible && lastPaid != null && (
              <div
                className={cn(
                  'rounded-xl border px-3.5 py-3',
                  paidMore ? 'border-orange-500/30 bg-orange-500/10' : 'border-white/[0.12] bg-white/[0.05]'
                )}
              >
                <p className={cn('text-[13px]', paidMore ? 'text-orange-300' : 'text-white')}>
                  Last paid {gbp(lastPaid)}
                  {item?.last_paid_supplier ? ` to ${item.last_paid_supplier}` : ''}
                  {item?.last_paid_at
                    ? ` on ${new Date(item.last_paid_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                    : ''}
                  {paidMore ? '. More than your buy price.' : '.'}
                </p>
                {paidMore && (
                  <button
                    type="button"
                    onClick={() => onBuy(fix2(lastPaid))}
                    className="mt-2 h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                  >
                    Use {gbp(lastPaid)} as the buy price
                  </button>
                )}
              </div>
            )}

            {item && stale != null && stale > 60 && (
              <p className="text-[13px] text-orange-300">
                Price last changed {stale} days ago. Check it before the next quote.
              </p>
            )}
            {!moneyVisible && (
              <p className="text-[12px] text-white">
                Buy prices and markup are kept to the owner and admins.
              </p>
            )}
          </section>
        </div>
      </FormSheet>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent className="border border-white/[0.1] bg-[hsl(0_0%_8%)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Remove {item?.name}?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              It comes out of the firm price book and the owner's Electrical Hub price book.
              Quotes and orders that already use it keep their lines.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation border-white/[0.12] bg-white/[0.06] text-white">
              Keep it
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!item) return;
                try {
                  await remove.mutateAsync(item.item_id);
                  onOpenChange(false);
                } catch {
                  /* hook toasts */
                }
              }}
              className="h-11 touch-manipulation border border-red-500/30 bg-red-500/15 text-red-300 hover:bg-red-500/25"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
