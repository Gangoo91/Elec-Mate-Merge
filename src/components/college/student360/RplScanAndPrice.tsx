/**
 * RplScanAndPrice — ELE-2042, 10 Oct 2026.
 *
 * The two records a prior-learning reduction needs beside the hours:
 *   - a skills scan against the standard's knowledge, skills and behaviours
 *     (funding rules 2026/27 para 38.2; 2025/26 33.2; 2024/25 26.2);
 *   - the price reduction: at least half the prior-learning percentage off
 *     the funding band maximum (2026/27 39.3; 2025/26 35.2; 2024/25 28.2).
 * record_rpl_decision refuses a reduction with no scan, or one that leaves
 * fewer than 187 planned hours (86.2 / 81.2) or a practical period under the
 * minimum (8 months, 77 / 73; 12 months for 2024/25 starts, 75).
 * record_rpl_price refuses a price above the most allowed.
 */
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import { chipCn, COLLEGE_BTN, COLLEGE_BTN_PRIMARY } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';

export interface KsbScanRow {
  code: string;
  kind: string;
  title: string;
  level: 'none' | 'partial' | 'full';
  evidence: string;
  hours_credit: number | null;
}

interface Template {
  qualification: { code: string; title: string } | null;
  ksbs: Array<{ code: string; kind: string; title: string }>;
  scan: KsbScanRow[] | null;
  scan_on: string | null;
}

const LEVELS: Array<{ v: KsbScanRow['level']; label: string }> = [
  { v: 'none', label: 'None' },
  { v: 'partial', label: 'Partly' },
  { v: 'full', label: 'Fully' },
];

export function KsbScanSheet({
  open,
  onOpenChange,
  studentId,
  first,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  studentId: string;
  first: string;
  onSaved: (msg: string) => void;
}) {
  const [tpl, setTpl] = useState<Template | null>(null);
  const [rows, setRows] = useState<KsbScanRow[]>([]);
  const [date, setDate] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setErr(null);
    void supabase
      .rpc('get_ksb_scan_template' as never, { p_student: studentId } as never)
      .then(({ data, error }) => {
        if (error) {
          setErr(error.message);
          return;
        }
        const t = data as unknown as Template;
        setTpl(t);
        const prev = new Map((t.scan ?? []).map((r) => [r.code, r]));
        const base: KsbScanRow[] = t.ksbs.length
          ? t.ksbs.map(
              (k) => prev.get(k.code) ?? { ...k, level: 'none', evidence: '', hours_credit: null }
            )
          : (t.scan ?? []);
        setRows(
          base.length
            ? base
            : [
                {
                  code: 'K1',
                  kind: 'K',
                  title: '',
                  level: 'none',
                  evidence: '',
                  hours_credit: null,
                },
              ]
        );
        setDate(t.scan_on ?? new Date().toISOString().slice(0, 10));
      });
  }, [open, studentId]);

  const credited = useMemo(
    () =>
      rows.filter((r) => r.level !== 'none').reduce((a, r) => a + (Number(r.hours_credit) || 0), 0),
    [rows]
  );
  const withPrior = rows.filter((r) => r.level !== 'none').length;
  const setRow = (i: number, p: Partial<KsbScanRow>) =>
    setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...p } : r)));

  const save = async () => {
    setBusy(true);
    setErr(null);
    const { data, error } = await supabase.rpc(
      'save_ksb_skills_scan' as never,
      { p_student: studentId, p_scan: rows, p_assessed_on: date } as never
    );
    setBusy(false);
    if (error) {
      setErr(error.message);
      return;
    }
    const r = data as unknown as { suggested_hours: number; with_prior_learning: number };
    onSaved(
      r.with_prior_learning > 0
        ? `${r.with_prior_learning} with prior learning, ${Math.round(r.suggested_hours)} hours of credit suggested.`
        : 'No prior learning found against the standard.'
    );
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Prior learning"
      title={`Skills scan for ${first}`}
      description={`Rate what ${first} can already do against each knowledge, skill and behaviour${
        tpl?.qualification ? ` (${tpl.qualification.code})` : ''
      }. Any prior learning needs the evidence you saw.`}
      footer={
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[12.5px] text-white">
            {withPrior} with prior learning · {Math.round(credited)} hours of credit
          </p>
          <div className="flex gap-2">
            <button type="button" className={COLLEGE_BTN} onClick={() => onOpenChange(false)}>
              Cancel
            </button>
            <button
              type="button"
              className={COLLEGE_BTN_PRIMARY}
              disabled={busy || !date || rows.length === 0}
              onClick={() => void save()}
              data-testid="ksb-save"
            >
              {busy ? 'Saving…' : 'Save the scan'}
            </button>
          </div>
        </div>
      }
    >
      <label className="block max-w-xs">
        <span className={labelCn}>Date of the scan</span>
        <input
          type="date"
          className={inputCn}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      {!tpl?.ksbs.length && tpl && (
        <p className="text-[13px] text-white">
          No knowledge, skills and behaviours are linked to this course&apos;s qualification yet, so
          add rows by code.
        </p>
      )}
      <ul className="divide-y divide-white/[0.06]" data-testid="ksb-rows">
        {rows.map((r, i) => (
          <li
            key={`${r.code}-${i}`}
            className="grid grid-cols-1 gap-3 py-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start"
          >
            <div className="min-w-0">
              {tpl?.ksbs.length ? (
                <p className="text-[13.5px] leading-snug text-white">
                  <span className="font-semibold">{r.code}</span> {r.title}
                </p>
              ) : (
                <div className="grid grid-cols-[6rem_1fr] gap-3">
                  <input
                    className={inputCn}
                    value={r.code}
                    onChange={(e) => setRow(i, { code: e.target.value })}
                    aria-label="Code"
                  />
                  <input
                    className={inputCn}
                    value={r.title}
                    onChange={(e) => setRow(i, { title: e.target.value })}
                    aria-label="Title"
                  />
                </div>
              )}
              {r.level !== 'none' && (
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_8rem]">
                  <input
                    className={inputCn}
                    value={r.evidence}
                    onChange={(e) => setRow(i, { evidence: e.target.value })}
                    placeholder="Evidence seen, e.g. Level 2 Diploma unit 201 certificate"
                    data-testid={`ksb-${i}-evidence`}
                  />
                  <input
                    type="number"
                    min={0}
                    className={inputCn}
                    value={r.hours_credit ?? ''}
                    onChange={(e) =>
                      setRow(i, { hours_credit: e.target.value ? Number(e.target.value) : null })
                    }
                    placeholder="Hours"
                    aria-label="Hours of credit"
                    data-testid={`ksb-${i}-hours`}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l.v}
                  type="button"
                  className={chipCn(r.level === l.v)}
                  onClick={() => setRow(i, { level: l.v })}
                  data-testid={`ksb-${i}-${l.v}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {!tpl?.ksbs.length && (
        <button
          type="button"
          className={COLLEGE_BTN}
          onClick={() =>
            setRows((rs) => [
              ...rs,
              { code: '', kind: '', title: '', level: 'none', evidence: '', hours_credit: null },
            ])
          }
        >
          Add a row
        </button>
      )}
      {err && <p className="text-[12.5px] font-medium text-orange-300">{err}</p>}
    </FormSheet>
  );
}

export function RplPriceSheet({
  open,
  onOpenChange,
  studentId,
  first,
  hoursReduced,
  baseHours,
  current,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  studentId: string;
  first: string;
  hoursReduced: number;
  baseHours: number | null;
  current: { funding_band_max: number | null; agreed_price: number | null };
  onSaved: (msg: string) => void;
}) {
  const [band, setBand] = useState('');
  const [price, setPrice] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    if (!open) return;
    setBand(current.funding_band_max != null ? String(current.funding_band_max) : '');
    setPrice(current.agreed_price != null ? String(current.agreed_price) : '');
    setErr(null);
  }, [open, current.funding_band_max, current.agreed_price]);

  const pct = baseHours && baseHours > 0 ? (hoursReduced / baseHours) * 100 : 0;
  const bandN = Number(band) || 0;
  const minCut = bandN * (pct / 100) * 0.5;
  const maxPrice = bandN - minCut;
  const gbp = (n: number) => `£${n.toLocaleString('en-GB', { maximumFractionDigits: 2 })}`;

  const save = async () => {
    setBusy(true);
    setErr(null);
    const { data, error } = await supabase.rpc(
      'record_rpl_price' as never,
      { p_student: studentId, p_funding_band_max: bandN, p_agreed_price: Number(price) } as never
    );
    setBusy(false);
    if (error) {
      setErr(error.message);
      return;
    }
    const r = data as unknown as { max_price: number; agreed_price: number };
    onSaved(`Price ${gbp(r.agreed_price)} recorded (most allowed ${gbp(r.max_price)}).`);
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Prior learning"
      title={`Price reduction for ${first}`}
      description="Hours taken off for prior learning must come off the price too: at least half the prior-learning percentage off the funding band maximum."
      footer={
        <div className="flex justify-end gap-2">
          <button type="button" className={COLLEGE_BTN} onClick={() => onOpenChange(false)}>
            Cancel
          </button>
          <button
            type="button"
            className={COLLEGE_BTN_PRIMARY}
            disabled={busy || bandN <= 0 || !price.trim()}
            onClick={() => void save()}
            data-testid="rpl-price-save"
          >
            {busy ? 'Saving…' : 'Record the price'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <label className="block">
            <span className={labelCn}>Funding band maximum for the standard (£)</span>
            <input
              type="number"
              min={0}
              className={inputCn}
              value={band}
              onChange={(e) => setBand(e.target.value)}
              data-testid="rpl-band"
            />
          </label>
          <label className="block">
            <span className={labelCn}>
              Total price agreed with the employer (£), TNP1 plus TNP2
            </span>
            <input
              type="number"
              min={0}
              className={inputCn}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              data-testid="rpl-price"
            />
          </label>
        </div>
        <div className={cn('space-y-2 text-[13px] text-white')} data-testid="rpl-price-workings">
          <p>
            Prior learning: {Math.round(hoursReduced)} of {Math.round(baseHours ?? 0)} planned hours
            = <span className="font-semibold">{pct.toFixed(2)}%</span>
          </p>
          {bandN > 0 && (
            <>
              <p>
                Price must come down by at least {gbp(minCut)} (half of {pct.toFixed(2)}% of{' '}
                {gbp(bandN)}).
              </p>
              <p className="font-semibold">Most that can be agreed: {gbp(maxPrice)}</p>
            </>
          )}
          <p>Split the final price between TNP1 (training) and TNP2 (assessment) on the ILR.</p>
          {err && <p className="font-medium text-orange-300">{err}</p>}
        </div>
      </div>
    </FormSheet>
  );
}
