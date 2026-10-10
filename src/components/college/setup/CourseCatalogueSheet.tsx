import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn, inputCn, labelCn, selectTriggerCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { useQualifications } from '@/hooks/useCurriculum';
import {
  NATION_TERMS,
  UK_NATIONS,
  getProgramme,
  hoursSummary,
  programmesFor,
  type UkNation,
} from '@/data/ukNationFrameworks';
import { cn } from '@/lib/utils';

/* ==========================================================================
   CourseCatalogueSheet — ELE-1855 "courses from the catalogue". Tick the
   qualifications the college delivers and they become college_courses in
   one go, each linked to its qualification (so units and criteria come
   with it) and, for an apprenticeship, carrying the standard's off-the-job
   hours from DfE Annex C (src/data/otjStandards.ts). Learners inherit those
   hours on enrolment (tg_set_otj_required_hours).

   Anything here can be changed later in Courses; this is the fast path.

   10 Oct 2026 (ELE-1976): all four UK nations. The college picks where it
   delivers (colleges.nation); the programme list, its label and the hours
   model follow that nation (src/data/ukNationFrameworks.ts): an English
   standard, a Welsh framework, a Scottish Modern Apprenticeship or an NI
   framework. Structure only; units and criteria still come from the
   qualification.
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

/** A sensible first guess of the programme from the title, in the college's nation. */
function guessProgramme(nation: UkNation, title: string, code?: string | null): string {
  if (nation !== 'england') {
    const t = title.toLowerCase();
    const electrical = t.includes('electrotechnical') || t.includes('electrical installation') || t.includes('electrician');
    return electrical ? (programmesFor(nation)[0]?.code ?? 'none') : 'none';
  }
  return guessStandard(title, code);
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

function programmeOptions(nation: UkNation) {
  return [
    { value: 'none', label: 'Not an apprenticeship' },
    ...programmesFor(nation).map((p) => ({
      value: p.code,
      label:
        p.kind === 'standard'
          ? `${p.code} ${p.title} (${p.offJobHours} h)`
          : `${p.kind === 'framework' && /^FR/.test(p.code) ? `${p.code} ` : ''}${p.title} (${hoursSummary(p)})`,
    })),
  ];
}

export function CourseCatalogueSheet({ open, onOpenChange, collegeId, awardingBodies, existingQualIds = [], onAdded }: Props) {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data: quals = [], loading } = useQualifications();
  const [picked, setPicked] = useState<Record<string, string>>({}); // qual id → standard code | 'none'
  const [body, setBody] = useState<string>('mine');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [nation, setNation] = useState<UkNation>('england');
  const [savedNation, setSavedNation] = useState<UkNation | null>(null);
  const terms = NATION_TERMS[nation];

  useEffect(() => {
    if (open) {
      setPicked({});
      setSearch('');
      setBody(awardingBodies?.length ? 'mine' : 'all');
      void supabase
        .from('colleges')
        .select('nation' as never)
        .eq('id', collegeId)
        .maybeSingle()
        .then(({ data }) => {
          const n = ((data as unknown as { nation: UkNation | null } | null)?.nation ?? null) as UkNation | null;
          setSavedNation(n);
          setNation(n ?? 'england');
        });
    }
  }, [open, awardingBodies, collegeId]);

  const changeNation = (n: UkNation) => {
    setNation(n);
    // Re-guess every ticked qualification for the new nation's programmes.
    setPicked((p) =>
      Object.fromEntries(
        Object.keys(p).map((id) => {
          const q = quals.find((x) => x.id === id);
          return [id, q ? guessProgramme(n, q.title, q.code) : 'none'];
        })
      )
    );
  };

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
      else n[id] = guessProgramme(nation, title, quals.find((q) => q.id === id)?.code);
      return n;
    });

  const pickedIds = Object.keys(picked);

  const save = async () => {
    if (saving || pickedIds.length === 0) return;
    setSaving(true);
    try {
      // Remember the nation for the college (admins only; others keep the choice for this list).
      if (nation !== (savedNation ?? 'england') || savedNation === null) {
        const { error: nErr } = await supabase.rpc('set_college_nation' as never, { p_college: collegeId, p_nation: nation } as never);
        if (!nErr) setSavedNation(nation);
      }
      const rows = pickedIds.map((id) => {
        const q = quals.find((x) => x.id === id)!;
        const prog = getProgramme(picked[id]);
        return {
          college_id: collegeId,
          name: q.title,
          code: q.code ?? null,
          level: q.level ?? prog?.level ?? null,
          awarding_body: q.awarding_body ?? null,
          qualification_id: q.id,
          otj_required_hours: prog?.offJobHours ?? null,
          status: 'Active',
          nation,
          programme_kind: prog?.kind ?? null,
          programme_code: prog?.code ?? null,
          hours_model: prog?.hoursModel ?? null,
          on_job_hours_required: prog?.onJobHours ?? null,
          end_assessment: prog?.endAssessment ?? null,
        };
      });
      const { error } = await supabase.from('college_courses').insert(rows as never);
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
      description={`Tick the qualifications you deliver. Each becomes a course with its units and criteria. For an apprenticeship, pick the ${terms.programme}. ${terms.hoursLine}`}
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
        <div>
          <span className={labelCn}>Where you deliver</span>
          <div className="flex flex-wrap gap-2" data-testid="catalogue-nation">
            {UK_NATIONS.map((n) => (
              <button key={n} type="button" onClick={() => changeNation(n)} className={chipCn(nation === n)} aria-pressed={nation === n}>
                {NATION_TERMS[n].name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[12.5px] leading-snug text-white" data-testid="catalogue-nation-line">
            {terms.name}: {terms.programme} set by {terms.body}; end assessment {terms.endAssessment}. {terms.hoursLine}
          </p>
        </div>
        <h3 className="text-[15px] font-semibold tracking-tight text-white">
          {pickedIds.length ? `${pickedIds.length} ticked` : 'Nothing ticked yet'}
        </h3>
        {pickedIds.length === 0 ? (
          <p className="text-[13px] leading-relaxed text-white">
            Ticked qualifications appear here. For each apprenticeship, check the {terms.programme}: it sets how
            training time is counted for every learner on the course.
          </p>
        ) : (
          <ul className="space-y-4">
            {pickedIds.map((id) => {
              const q = quals.find((x) => x.id === id);
              if (!q) return null;
              return (
                <li key={id} className="border-t border-white/[0.1] pt-3 first:border-t-0 first:pt-0">
                  <p className="text-[13.5px] font-semibold leading-snug text-white">{q.title}</p>
                  <span className={cn(labelCn, 'mt-2')}>{terms.programmePicker}</span>
                  <MobileSelectPicker
                    value={picked[id]}
                    onValueChange={(v) => setPicked((p) => ({ ...p, [id]: v }))}
                    options={programmeOptions(nation)}
                    title={terms.programmePicker}
                    triggerClassName={selectTriggerCn}
                  />
                  {(() => {
                    const prog = getProgramme(picked[id]);
                    if (!prog) return null;
                    return (
                      <p className="mt-1.5 text-[12px] leading-snug text-white">
                        {hoursSummary(prog)}; end assessment {prog.endAssessment}.
                        {prog.check ? ` ${prog.check}` : ''}
                      </p>
                    );
                  })()}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </FormSheet>
  );
}
