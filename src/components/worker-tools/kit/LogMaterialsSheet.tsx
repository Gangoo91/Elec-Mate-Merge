import { useEffect, useMemo, useState } from 'react';
import { Minus, Plus, ScanBarcode, Search } from 'lucide-react';
import { toast } from 'sonner';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, cardCn, buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { useMyJobs } from '@/hooks/useWorkerSelfService';
import { useLogMaterialsUsed, type MyVan } from '@/hooks/useKit';
import { EquipmentBarcodeScanner } from '@/components/electrician-tools/site-safety/equipment/EquipmentBarcodeScanner';

/* "Materials used": the sparky picks the job, taps + on what came off the van
   (or scans the box), and sends it. Stock goes down; the office prices it at
   buy price on the server. Names and quantities only, never a price. */

const fmtQty = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0+$/, '').replace(/\.$/, ''));

export function LogMaterialsSheet({
  open,
  onOpenChange,
  van,
  initialJobId,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  van: MyVan | null;
  initialJobId?: string | null;
}) {
  const { data: jobs = [], isLoading: loadingJobs } = useMyJobs('active');
  const log = useLogMaterialsUsed();
  const [jobId, setJobId] = useState<string | null>(null);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [search, setSearch] = useState('');
  const [note, setNote] = useState('');
  const [scan, setScan] = useState(false);

  useEffect(() => {
    if (!open) return;
    setQty({});
    setSearch('');
    setNote('');
    setJobId(initialJobId ?? null);
  }, [open, initialJobId]);

  useEffect(() => {
    if (open && !jobId && jobs.length === 1) setJobId(jobs[0].id);
  }, [open, jobs, jobId]);

  const q = search.trim().toLowerCase();
  const items = useMemo(
    () => (van?.items ?? []).filter((i) => !q || i.name.toLowerCase().includes(q)),
    [van, q]
  );
  const picked = Object.entries(qty).filter(([, n]) => n > 0);
  const count = picked.length;

  if (!van) return null;

  const bump = (id: string, d: number) =>
    setQty((p) => ({ ...p, [id]: Math.max(0, Math.round(((p[id] ?? 0) + d) * 100) / 100) }));

  const submit = async () => {
    if (!jobId || count === 0) return;
    try {
      await log.mutateAsync({
        vehicleId: van.id,
        jobId,
        lines: picked.map(([stock_id, n]) => ({ stock_id, qty: n })),
        note,
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
        eyebrow={`Van ${van.registration ?? ''}`.trim()}
        title="Materials used"
        description="What came off the van onto the job. The stock on the van goes down and the office sees it on the job."
        width="wide"
        footer={
          <div className="flex gap-2">
            <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonSecondaryCn, 'px-5')}>
              Cancel
            </button>
            <button
              type="button"
              data-help="wt-equipment.log-send"
              onClick={submit}
              disabled={!jobId || count === 0 || log.isPending}
              className={cn(buttonPrimaryCn, 'flex-1 px-5')}
            >
              {log.isPending ? 'Logging…' : !jobId ? 'Pick the job first' : count === 0 ? 'Tap + on what you used' : `Log ${count} ${count === 1 ? 'item' : 'items'}`}
            </button>
          </div>
        }
      >
        <div className="space-y-5 lg:grid lg:grid-cols-[22rem_1fr] lg:items-start lg:gap-6 lg:space-y-0">
          <section className={cardCn} data-help="wt-equipment.log-job">
            <h2 className="text-[15px] font-semibold text-white">Which job?</h2>
            {loadingJobs ? (
              <div className="h-14 animate-pulse rounded-xl bg-white/[0.05]" />
            ) : jobs.length === 0 ? (
              <p className="text-[14px] text-white">You are not on any jobs right now, so there is nothing to log against.</p>
            ) : (
              <ul className="space-y-2">
                {jobs.map((j) => (
                  <li key={j.id}>
                    <button
                      type="button"
                      onClick={() => setJobId(j.id)}
                      className={cn(
                        'flex min-h-[52px] w-full flex-col justify-center rounded-xl border px-3 py-2 text-left touch-manipulation',
                        jobId === j.id ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.12] bg-white/[0.06] text-white'
                      )}
                    >
                      <span className="truncate text-[14.5px] font-semibold">{j.title}</span>
                      {(j.client_name || j.address) && (
                        <span className="truncate text-[12px]">{[j.client_name, j.address].filter(Boolean).join(' · ')}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div>
              <label className={labelCn} htmlFor="mu-note">
                Note (optional)
              </label>
              <input id="mu-note" value={note} onChange={(e) => setNote(e.target.value)} maxLength={300} className={inputCn} />
            </div>
          </section>

          <section className={cardCn} data-help="wt-equipment.log-items">
            <div className="flex items-end gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search the van"
                  aria-label="Search the van"
                  className={cn(inputCn, 'pl-7')}
                />
              </div>
              <button
                type="button"
                onClick={() => setScan(true)}
                className="flex h-11 shrink-0 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-[14px] font-medium text-white touch-manipulation"
              >
                <ScanBarcode className="h-5 w-5" aria-hidden /> Scan
              </button>
            </div>
            {van.items.length === 0 ? (
              <p className="text-[14px] text-white">Nothing is stocked on this van yet. Ask the office to set it up.</p>
            ) : items.length === 0 ? (
              <p className="text-[14px] text-white">Nothing on the van matches.</p>
            ) : (
              <ul className="divide-y divide-white/[0.08]">
                {items.map((i) => {
                  const n = qty[i.id] ?? 0;
                  return (
                    <li key={i.id} className="flex min-h-[60px] items-center gap-3 py-2">
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14.5px] font-semibold text-white">{i.name}</span>
                        <span className={cn('block text-[12.5px]', i.low ? 'text-red-300' : 'text-white')}>
                          {fmtQty(i.qty)} {i.unit} on the van{i.low ? ', running low' : ''}
                        </span>
                      </span>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => bump(i.id, -1)}
                          disabled={n <= 0}
                          aria-label={`One less ${i.name}`}
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] text-white touch-manipulation disabled:opacity-40"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          type="number"
                          inputMode="decimal"
                          min={0}
                          value={n === 0 ? '' : String(n)}
                          placeholder="0"
                          onChange={(e) => {
                            const v = Number(e.target.value);
                            setQty((p) => ({ ...p, [i.id]: Number.isFinite(v) && v > 0 ? v : 0 }));
                          }}
                          aria-label={`How many ${i.name}`}
                          className="h-11 w-14 rounded-xl border border-white/[0.12] bg-transparent text-center text-[16px] font-semibold text-white placeholder:text-white/40 focus:border-elec-yellow focus:outline-none touch-manipulation"
                        />
                        <button
                          type="button"
                          onClick={() => bump(i.id, 1)}
                          aria-label={`One more ${i.name}`}
                          className="flex h-11 w-11 items-center justify-center rounded-xl bg-elec-yellow text-black touch-manipulation"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </FormSheet>

      <EquipmentBarcodeScanner
        open={scan}
        onClose={() => setScan(false)}
        title="Scan the box"
        description="Each scan adds one"
        onScan={({ text }) => {
          setScan(false);
          const hit = van.items.find((i) => (i.barcode ?? '').trim() === text.trim());
          if (hit) {
            bump(hit.id, 1);
            toast.success(`Added 1 × ${hit.name}`);
          } else {
            toast.message('That box is not on your van', { description: 'Find it in the list instead.' });
          }
        }}
      />
    </>
  );
}
