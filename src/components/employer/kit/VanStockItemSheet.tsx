import { useEffect, useMemo, useState } from 'react';
import { ScanBarcode, Search, Check } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { SelectField } from '@/components/forms';
import {
  inputCn,
  labelCn,
  cardCn,
  grid2Cn,
  fieldFullCn,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { useActingFirmId, useFirmMaterialNames, gbp } from '@/hooks/useFirmPriceBook';
import { useSuppliers } from '@/hooks/useFinance';
import { useSaveVanStockItem, useDeleteVanStockItem, type VanStockLine } from '@/hooks/useKit';
import { EquipmentBarcodeScanner } from '@/components/electrician-tools/site-safety/equipment/EquipmentBarcodeScanner';

/* Add a price-book item to a van, or change one already on it: how many are
   on the van, the level that raises a draft order, the level to fill back up
   to, the usual supplier and the barcode on the box. No prices for office
   managers; the owner sees the buy price as a read-only line. */

const fmtQty = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0+$/, '').replace(/\.$/, ''));

export function VanStockItemSheet({
  open,
  onOpenChange,
  vehicleId,
  registration,
  line,
  onVan,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  vehicleId: string;
  registration: string | null;
  /** null = add a new line */
  line: VanStockLine | null;
  /** Names already on this van (lower-case), to stop duplicates. */
  onVan: Set<string>;
}) {
  const { data: firmId } = useActingFirmId();
  const { data: names = [], isLoading: loadingNames } = useFirmMaterialNames(firmId);
  const { data: suppliers = [] } = useSuppliers();
  const save = useSaveVanStockItem();
  const del = useDeleteVanStockItem();

  const [search, setSearch] = useState('');
  const [itemId, setItemId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('each');
  const [qty, setQty] = useState('');
  const [minQty, setMinQty] = useState('');
  const [parQty, setParQty] = useState('');
  const [supplierId, setSupplierId] = useState<string>('');
  const [barcode, setBarcode] = useState('');
  const [scan, setScan] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSearch('');
    setItemId(line?.price_book_item_id ?? null);
    setName(line?.name ?? '');
    setUnit(line?.unit ?? 'each');
    setQty(line ? fmtQty(line.qty) : '');
    setMinQty(line ? fmtQty(line.min_qty) : '');
    setParQty(line?.par_qty != null ? fmtQty(line.par_qty) : '');
    setSupplierId(line?.supplier_id ?? '');
    setBarcode(line?.barcode ?? '');
    setConfirmDelete(false);
  }, [open, line?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const q = search.trim().toLowerCase();
  const matches = useMemo(
    () =>
      q.length < 2
        ? []
        : names
            .filter((n) => n.name.toLowerCase().includes(q))
            .slice(0, 30),
    [names, q]
  );

  const n = (v: string) => (v.trim() === '' ? null : Number(v));
  const qtyN = n(qty) ?? 0;
  const minN = n(minQty) ?? 0;
  const parN = n(parQty);
  const dup = !line && name.trim() !== '' && onVan.has(name.trim().toLowerCase());
  const bad =
    !name.trim() || [qtyN, minN, parN ?? 0].some((x) => !Number.isFinite(x) || x < 0) || (parN != null && parN < minN);

  const submit = async () => {
    if (bad || dup) return;
    try {
      await save.mutateAsync({
        vehicleId,
        id: line?.id ?? null,
        priceBookItemId: itemId,
        name: name.trim(),
        unit: unit.trim() || 'each',
        qty: qtyN,
        minQty: minN,
        parQty: parN,
        supplierId: supplierId || null,
        barcode: barcode.trim() || null,
      });
      onOpenChange(false);
    } catch {
      /* hook toasts */
    }
  };

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        eyebrow={`Van stock · ${registration ?? 'Van'}`}
        title={line ? line.name : 'Add to the van'}
        description={
          line
            ? 'Change what is on the van, when to reorder and who from.'
            : 'Pick from your price book so it matches your quotes and orders.'
        }
        width="wide"
        footer={
          <div className="flex gap-2">
            {line ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="h-12 rounded-xl border border-red-500/30 bg-red-500/10 px-4 text-[14px] font-semibold text-red-300 touch-manipulation"
              >
                Remove
              </button>
            ) : (
              <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonSecondaryCn, 'px-5')}>
                Cancel
              </button>
            )}
            <button
              type="button"
              data-help="stock.save"
              onClick={submit}
              disabled={bad || dup || save.isPending}
              className={cn(buttonPrimaryCn, 'flex-1 px-5')}
            >
              {save.isPending ? 'Saving…' : line ? 'Save' : 'Add to van'}
            </button>
          </div>
        }
      >
        {confirmDelete && line && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-[14px] font-semibold text-white">Take {line.name} off this van?</p>
            <p className="mt-1 text-[13px] text-white">Its history stays on the jobs it was used on.</p>
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={() => setConfirmDelete(false)} className={cn(buttonSecondaryCn, 'flex-1')}>
                Keep it
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await del.mutateAsync(line.id);
                    onOpenChange(false);
                  } catch {
                    /* hook toasts */
                  }
                }}
                className="h-12 flex-1 rounded-xl border border-red-500/30 bg-red-500/15 text-[14px] font-semibold text-red-300 touch-manipulation"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6 lg:space-y-0">
          <section className={cardCn}>
            <h2 className="text-[15px] font-semibold text-white">Item</h2>
            {!line && (
              <div className="space-y-2" data-help="stock.pick">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={loadingNames ? 'Loading your price book…' : 'Search your price book'}
                    aria-label="Search your price book"
                    className={cn(inputCn, 'pl-7')}
                  />
                </div>
                {q.length >= 2 && (
                  <ul className="max-h-64 divide-y divide-white/[0.08] overflow-y-auto rounded-xl border border-white/[0.12]">
                    {matches.length === 0 ? (
                      <li className="p-3 text-[13px] text-white">
                        Not in the price book. Type the name below to add it to this van only.
                      </li>
                    ) : (
                      matches.map((m) => {
                        const on = onVan.has(m.name.trim().toLowerCase());
                        return (
                          <li key={m.item_id}>
                            <button
                              type="button"
                              disabled={on}
                              onClick={() => {
                                setItemId(m.item_id);
                                setName(m.name);
                                setUnit(m.unit || 'each');
                                setSearch('');
                              }}
                              className="flex min-h-11 w-full items-center gap-3 px-3 py-2 text-left touch-manipulation hover:bg-white/[0.05] disabled:opacity-60"
                            >
                              <span className="min-w-0 flex-1 text-[14px] text-white">{m.name}</span>
                              <span className="shrink-0 text-[12px] text-white">{on ? 'On the van' : m.unit}</span>
                            </button>
                          </li>
                        );
                      })
                    )}
                  </ul>
                )}
              </div>
            )}
            <div className={grid2Cn}>
              <div className={fieldFullCn}>
                <label className={labelCn} htmlFor="vs-name">
                  Name
                </label>
                <input
                  id="vs-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setItemId(null);
                  }}
                  maxLength={200}
                  className={inputCn}
                />
                {itemId && (
                  <p className="mt-1 inline-flex items-center gap-1 text-[12px] text-emerald-300">
                    <Check className="h-3.5 w-3.5" aria-hidden /> From your price book
                  </p>
                )}
                {dup && <p className="mt-1 text-[12px] text-red-300">Already on this van. Change its quantity instead.</p>}
              </div>
              <div>
                <label className={labelCn} htmlFor="vs-unit">
                  Unit
                </label>
                <input id="vs-unit" value={unit} onChange={(e) => setUnit(e.target.value)} maxLength={30} className={inputCn} />
              </div>
              <div>
                <label className={labelCn} htmlFor="vs-barcode">
                  Barcode
                </label>
                <div className="flex items-end gap-2">
                  <input
                    id="vs-barcode"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    maxLength={64}
                    inputMode="numeric"
                    className={inputCn}
                  />
                  <button
                    type="button"
                    onClick={() => setScan(true)}
                    aria-label="Scan the barcode"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] text-white touch-manipulation"
                  >
                    <ScanBarcode className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            {line?.money_visible && line.unit_cost != null && (
              <p className="text-[12.5px] text-white">Buy price from the price book: {gbp(line.unit_cost)} per {line.unit}</p>
            )}
          </section>

          <section className={cardCn} data-help="stock.levels">
            <h2 className="text-[15px] font-semibold text-white">On the van and reordering</h2>
            <div className={grid2Cn}>
              <div className={fieldFullCn}>
                <label className={labelCn} htmlFor="vs-qty">
                  How many are on the van now
                </label>
                <input id="vs-qty" type="number" inputMode="decimal" min={0} value={qty} onChange={(e) => setQty(e.target.value)} className={inputCn} />
              </div>
              <div>
                <label className={labelCn} htmlFor="vs-min">
                  Reorder when down to
                </label>
                <input id="vs-min" type="number" inputMode="decimal" min={0} value={minQty} onChange={(e) => setMinQty(e.target.value)} placeholder="0 = never" className={inputCn} />
              </div>
              <div>
                <label className={labelCn} htmlFor="vs-par">
                  Fill back up to
                </label>
                <input id="vs-par" type="number" inputMode="decimal" min={0} value={parQty} onChange={(e) => setParQty(e.target.value)} placeholder={minN > 0 ? `${minN * 2}` : 'Optional'} className={inputCn} />
              </div>
              {parN != null && parN < minN && (
                <p className={cn(fieldFullCn, 'text-[12px] text-red-300')}>Fill up to must be at least the reorder level.</p>
              )}
              <div className={fieldFullCn}>
                <label className={labelCn}>Usual supplier</label>
                <SelectField
                  value={supplierId || '__pb'}
                  onValueChange={(v) => setSupplierId(v === '__pb' ? '' : v)}
                  placeholder="From the price book"
                  options={[
                    { value: '__pb', label: suppliers.length ? 'From the price book' : 'From the price book (add suppliers in Purchase orders)' },
                    ...suppliers.map((s) => ({ value: s.id, label: s.name })),
                  ]}
                />
              </div>
            </div>
            <p className="text-[12.5px] text-white">
              {minN > 0
                ? `When it drops to ${fmtQty(minN)}, a draft order for ${fmtQty(Math.max((parN ?? minN * 2) - minN, 1))} or more is made for you to check in Purchase orders. Nothing is sent to the supplier until you send it.`
                : 'Set a reorder level and a draft order is made for you when it runs low.'}
            </p>
          </section>
        </div>
      </FormSheet>

      <EquipmentBarcodeScanner
        open={scan}
        onClose={() => setScan(false)}
        title="Scan the box"
        description="Point the camera at the barcode on the box"
        onScan={({ text }) => {
          setBarcode(text.trim().slice(0, 64));
          setScan(false);
        }}
      />
    </>
  );
}
