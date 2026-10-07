import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn, inputCn, labelCn, selectTriggerCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { useQualifications } from '@/hooks/useCurriculum';
import { OTJ_STANDARDS, getOtjStandard } from '@/data/otjStandards';
import { cn } from '@/lib/utils';

/* ==========================================================================
   CourseCatalogueSheet — ELE-1855 "courses from the catalogue". Tick the
   qualifications the college delivers and they become college_courses in
   one go, each linked to its qualification (so units and criteria come
   with it) and, for an apprenticeship, carrying the standard's off-the-job
   hours from DfE Annex C (src/data/otjStandards.ts). Learners inherit those
   hours on enrolment (tg_set_otj_required_hours).

   Anything here can be changed later in Courses; this is the fast path.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collegeId: string;
  /** The college's awarding bodies: shown first. */
  awardingBodies?: string[] | null;
  /** Qualification ids the college already has a course for. */
  existingQualIds?: string[];
  onAdded?: (n: number) => void;
}

/** A sensible first guess of the apprenticeship standard from the title. */
function guessStandard(title: string, code?: string | null): string {
  const t = title.toLowerCase();
  const c = (code ?? '').toLowerCase();
  if (t.includes('installation and maintenance electrician') || t.includes('installation electrician') || t.includes('maintenance electrician'))
    return 'ST0152';
  // The end-point qualifications for the electrician standards: C&G 5357 /
  // EAL "Electrotechnical Qualification (Installation or Maintenance)" is
  // ST0152; C&G 5393 "Electrotechnical in Dwellings" is ST1017.
  if (c.startsWith('5357') || t.includes('installation or maintenance')) return 'ST0152';
  if (c.startsWith('5393') || t.includes('in dwellings')) return 'ST1017';
  if (t.includes('domestic electrician')) return 'ST1017';
  if (t.includes('product service')) return 'ST0150';
  return 'none';
}

const STANDARD_OPTIONS = [
  { value: 'none', label: 'Not an apprenticeship' },
  ...OTJ_STANDARDS.map((s) => ({ value: s.code, label: `${s.code} ${s.name} (${s.otjHours} h)` })),
];

export function CourseCatalogueSheet({ open, onOpenChange, collegeId, awardingBodies, existingQualIds = [], onAdded }: Props) {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data: quals = [], loading } = useQualifications();
  const [picked, setPicked] = useState<Record<string, string>>({}); // qual id → standard code | 'none'
  const [body, setBody] = useState<string>('mine');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setPicked({});
      setSearch('');
      setBody(awardingBodies?.length ? 'mine' : 'all');
    }
  }, [open, awardingBodies]);

  const bodies = useMemo(() => Array.from(new Set(quals.map((q) => q.awarding_body).filter(Boolean))) as string[], [quals]);
  const mine = (awardingBodies ?? []).map((b) => b.toLowerCase());

  const shown = quals.filter((q) => {
    if (existingQualIds.includes(q.id)) return false;
    const ab = (q.awarding_body ?? '').toLowerCase();
    if (body === 'mine' && mine.length && !mine.some((m) => ab.includes(m) || m.includes(ab))) return false;
    if (body !== 'mine' && body !== 'all' && q.awarding_body !== body) return false;
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      if (!`${q.title} ${q.code ?? ''}`.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  const toggle = (id: string, title: string) =>
    setPicked((p) => {
      const n = { ...p };
      if (n[id]) delete n[id];
      else n[id] = guessStandard(title, quals.find((q) => q.id === id)?.code);
      return n;
    });

  const pickedIds = Object.keys(picked);

  const save = async () => {
    if (saving || pickedIds.length === 0) return;
    setSaving(true);
    try {
      const rows = pickedIds.map((id) => {
        const q = quals.find((x) => x.id === id)!;
        const std = getOtjStandard(picked[id]);
        return {
          college_id: collegeId,
          name: q.title,
          code: q.code ?? null,
          level: q.level ?? (std ? `Level ${std.level}` : null),
          awarding_body: q.awarding_body ?? null,
          qualification_id: q.id,
          otj_required_hours: std ? std.otjHours : null,
          status: 'Active',
        };
      });
      const { error } = await supabase.from('college_courses').insert(rows);
      if (error) throw error;
      await qc.invalidateQueries({ queryKey: ['college-courses'] });
      toast({ title: `${rows.length} course${rows.length === 1 ? '' : 's'} added` });
      onAdded?.(rows.length);
      onOpenChange(false);
    } catch (e) {
      toast({ title: 'Courses not added', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
      eyebrow="Courses"
      title="Pick from the catalogue"
      description="Tick the qualifications you deliver. Each becomes a course with its units and criteria. For an apprenticeship, the off-the-job hours come from the standard."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button type="button" onClick={() => void save()} disabled={saving || pickedIds.length === 0} className={buttonPrimaryCn}>
            {saving ? 'Adding…' : pickedIds.length ? `Add ${pickedIds.length} course${pickedIds.length === 1 ? '' : 's'}` : 'Tick a qualification'}
          </button>
        </div>
      }
    >
      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {mine.length > 0 && (
            <button type="button" onClick={() => setBody('mine')} className={chipCn(body === 'mine')}>
              Your awarding bodies
            </button>
          )}
          <button type="button" onClick={() => setBody('all')} className={chipCn(body === 'all')}>
            All
          </button>
          {bodies.map((b) => (
            <button key={b} type="button" onClick={() => setBody(b)} className={chipCn(body === b)}>
              {b}
            </button>
          ))}
        </div>
        <div>
          <label htmlFor="cat-search" className={labelCn}>
            Search
          </label>
          <input id="cat-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Title or code" className={inputCn} />
        </div>
        <ul className="max-h-[460px] divide-y divide-white/[0.06] overflow-y-auto rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]">
          {loading && <li className="px-4 py-6 text-center text-[13px] text-white">Loading the catalogue…</li>}
          {!loading && shown.length === 0 && (
            <li className="px-4 py-6 text-center text-[13px] text-white">
              Nothing matches. Try All, or another search.
            </li>
          )}
          {shown.map((q) => {
            const on = !!picked[q.id];
            return (
              <li key={q.id}>
                <button
                  type="button"
                  onClick={() => toggle(q.id, q.title)}
                  aria-pressed={on}
                  className="flex min-h-[56px] w-full items-start gap-3 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04]"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[12px] font-bold',
                      on ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.3] text-transparent'
                    )}
                  >
                    ✓
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-medium leading-snug text-white">{q.title}</span>
                    <span className="block text-[12px] text-white">
                      {[q.awarding_body, q.level, q.code].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">
          {pickedIds.length ? `${pickedIds.length} ticked` : 'Nothing ticked yet'}
        </h3>
        {pickedIds.length === 0 ? (
          <p className="text-[13px] leading-relaxed text-white">
            Ticked qualifications appear here. For each apprenticeship, check the standard: it sets the off-the-job
            hours every learner on the course needs.
          </p>
        ) : (
          <ul className="space-y-4">
            {pickedIds.map((id) => {
              const q = quals.find((x) => x.id === id);
              if (!q) return null;
              return (
                <li key={id} className="border-t border-white/[0.1] pt-3 first:border-t-0 first:pt-0">
                  <p className="text-[13.5px] font-semibold leading-snug text-white">{q.title}</p>
                  <span className={cn(labelCn, 'mt-2')}>Apprenticeship standard</span>
                  <MobileSelectPicker
                    value={picked[id]}
                    onValueChange={(v) => setPicked((p) => ({ ...p, [id]: v }))}
                    options={STANDARD_OPTIONS}
                    title="Apprenticeship standard"
                    triggerClassName={selectTriggerCn}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </FormSheet>
  );
}
