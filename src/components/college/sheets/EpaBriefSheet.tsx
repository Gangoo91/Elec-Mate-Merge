import { useEffect, useMemo, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { RotateCw, Printer, AlertTriangle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';
import { useEpaBrief, type EpaBrief } from '@/hooks/useEpaBrief';
import { usePastEpaBriefs, type PastEpaBrief } from '@/hooks/usePastEpaBriefs';

/* ==========================================================================
   EpaBriefSheet — personalised pre-EPA briefing for the learner.
   Auto-generates when opened. Print-friendly layout.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collegeStudentId: string | null;
  studentName: string;
}

export function EpaBriefSheet({ open, onOpenChange, collegeStudentId, studentName }: Props) {
  const ai = useEpaBrief();
  const past = usePastEpaBriefs(open ? collegeStudentId : null);
  const autoStartedRef = useRef(false);
  const [viewingPastId, setViewingPastId] = useState<string | null>(null);

  useEffect(() => {
    if (open && !autoStartedRef.current && collegeStudentId) {
      autoStartedRef.current = true;
      void ai.generate(collegeStudentId);
    }
    if (!open) {
      autoStartedRef.current = false;
      ai.reset();
      setViewingPastId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, collegeStudentId]);

  // After a fresh brief generates, refresh the past list so it includes the new one
  useEffect(() => {
    if (ai.status === 'done') {
      void past.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ai.status]);

  const regenerate = () => {
    if (!collegeStudentId) return;
    setViewingPastId(null);
    ai.reset();
    autoStartedRef.current = true;
    void ai.generate(collegeStudentId);
  };

  const viewingPast = useMemo<PastEpaBrief | null>(() => {
    if (!viewingPastId) return null;
    return past.briefs.find((b) => b.id === viewingPastId) ?? null;
  }, [viewingPastId, past.briefs]);

  const briefToShow = viewingPast?.brief ?? ai.brief;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton
        side="bottom"
        className="h-[94vh] sm:max-w-3xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="Pre-EPA brief"
          title={`Your brief — ${studentName.split(' ')[0]}`}
          description={
            ai.context?.epa_booking_date
              ? `EPA booked for ${formatDate(ai.context.epa_booking_date)}. This brief is personalised to your evidence base and weak areas.`
              : 'Personalised to your evidence base, weak areas, and BS 7671 hot zones.'
          }
          footer={
            ai.status === 'done' && ai.brief ? (
              <>
                <SecondaryButton onClick={regenerate} fullWidth>
                  <RotateCw className="h-3.5 w-3.5 mr-1.5" />
                  Re-draft
                </SecondaryButton>
                <PrimaryButton onClick={() => window.print()} fullWidth>
                  <Printer className="h-3.5 w-3.5 mr-1.5" />
                  Print
                </PrimaryButton>
              </>
            ) : ai.status === 'error' ? (
              <>
                <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                  Cancel
                </SecondaryButton>
                <PrimaryButton onClick={regenerate} fullWidth>
                  <RotateCw className="h-3.5 w-3.5 mr-1.5" />
                  Retry
                </PrimaryButton>
              </>
            ) : (
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Cancel
              </SecondaryButton>
            )
          }
        >
          {ai.status === 'loading' && <LoadingState />}
          {ai.status === 'error' && <ErrorState message={ai.error} />}
          {(ai.status === 'done' && ai.brief) || viewingPast ? (
            <>
              {viewingPast && (
                <ViewingPastBanner
                  pastBrief={viewingPast}
                  onClose={() => setViewingPastId(null)}
                />
              )}
              {briefToShow && <BriefView brief={briefToShow} />}
            </>
          ) : null}

          {/* Past briefs viewer — surfaces every prior brief from college_epa_briefs */}
          {past.briefs.length > 0 && (ai.status === 'done' || viewingPast) && (
            <PastBriefsList
              briefs={past.briefs}
              activeId={viewingPastId}
              currentId={ai.context?.brief_id ?? null}
              onSelect={(id) => setViewingPastId(id)}
              onSelectCurrent={() => setViewingPastId(null)}
            />
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6 px-1">
      <div>
        <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
          Drafting your brief
        </div>
        <p className="mt-2 text-[13px] text-white leading-relaxed">
          Reading your weak units, observations, mock results, and BS 7671 hot zones…
        </p>
      </div>
      <div className="space-y-4 animate-pulse">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-2.5 w-1/3 rounded bg-white/[0.08]" />
            <div className="mt-2.5 h-2 w-3/4 rounded bg-white/[0.06]" />
            <div className="mt-1.5 h-2 w-2/3 rounded bg-white/[0.06]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string | null }) {
  return (
    <div className="px-1">
      <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-red-300">
        Could not generate brief
      </div>
      <p className="mt-2 text-[13px] text-white leading-relaxed">
        {message ?? 'Try again in a moment.'}
      </p>
    </div>
  );
}

function BriefView({ brief }: { brief: EpaBrief }) {
  return (
    <div className="space-y-7 px-1">
      {/* Intro — typographic, no decorative card */}
      <p className="text-[14px] sm:text-[15px] text-white leading-relaxed border-l-2 border-elec-yellow pl-4">
        {brief.intro}
      </p>

      {/* Viva topics */}
      <Section label="Five likely viva topics">
        <ol className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {brief.likely_viva_topics.map((t, i) => (
            <li key={i} className="py-4 flex items-baseline gap-3">
              <span className="text-[11px] text-white/55 tabular-nums font-mono w-6 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="text-[13.5px] sm:text-[14px] font-semibold text-white leading-snug">
                  {t.topic}
                </h4>
                <p className="mt-1.5 text-[12.5px] text-white leading-relaxed">
                  <span className="text-white/55">Why this for you. </span>
                  {t.why}
                </p>
                <p className="mt-1 text-[12.5px] text-elec-yellow leading-relaxed">
                  <span className="text-elec-yellow/65">Prep. </span>
                  {t.prep}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* BS 7671 hot zones — editorial citation list */}
      <Section label="BS 7671 hot zones">
        <ul className="space-y-3">
          {brief.bs7671_hot_zones.map((z, i) => (
            <li key={i} className="border-l-2 border-blue-400/40 pl-3 break-words">
              <div className="text-[11px] font-semibold tracking-[0.04em] text-blue-200 break-all">
                {z.ref}
              </div>
              <p className="mt-1 text-[12.5px] text-white leading-relaxed">
                {z.what_to_remember}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Weak ACs */}
      <Section label="ACs to revise hardest">
        <ol className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {brief.weak_ac_revision.map((a, i) => (
            <li key={i} className="py-3.5">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-[10.5px] font-semibold tracking-[0.06em] uppercase text-amber-300">
                  {a.unit_code}
                </span>
                <span className="text-[13px] sm:text-[13.5px] font-medium text-white leading-snug">
                  {a.focus}
                </span>
              </div>
              {a.exemplar && (
                <p className="mt-1.5 text-[12px] text-white leading-relaxed">
                  <span className="text-white/55">Picture this. </span>
                  {a.exemplar}
                </p>
              )}
            </li>
          ))}
        </ol>
      </Section>

      {/* Common pitfalls */}
      <Section label="Watch out for">
        <ul className="space-y-2 text-[12.5px] text-white leading-relaxed">
          {brief.common_pitfalls.map((p, i) => (
            <li key={i} className="pl-4 relative">
              <span
                aria-hidden
                className="absolute left-0 top-[9px] h-1 w-1 rounded-full bg-orange-400"
              />
              {p}
            </li>
          ))}
        </ul>
      </Section>

      {/* Day of */}
      <Section label="On the day">
        <ul className="space-y-2 text-[12.5px] text-white leading-relaxed">
          {brief.day_of_advice.map((d, i) => (
            <li key={i} className="pl-4 relative">
              <span
                aria-hidden
                className="absolute left-0 top-[9px] h-1 w-1 rounded-full bg-emerald-400"
              />
              {d}
            </li>
          ))}
        </ul>
      </Section>

      {/* Confidence message — left-rule editorial closer */}
      <p className="text-[14px] sm:text-[15px] text-white leading-relaxed font-medium border-l-2 border-elec-yellow pl-4">
        {brief.confidence_message}
      </p>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.22em] text-white/65 mb-3">
        {label}
      </h3>
      {children}
    </section>
  );
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ────────────────────────────────────────────────────────
   Past briefs viewer — reads college_epa_briefs so a tutor
   or learner can revisit prior briefs and compare progression.
   ──────────────────────────────────────────────────────── */

function ViewingPastBanner({
  pastBrief,
  onClose,
}: {
  pastBrief: PastEpaBrief;
  onClose: () => void;
}) {
  return (
    <div className="px-1 -mt-1 mb-2 flex items-baseline justify-between gap-3 border-l-2 border-blue-400 pl-3">
      <p className="text-[12.5px] text-white leading-snug">
        <span className="text-blue-300 font-medium">Viewing past brief — </span>
        Generated {formatDate(pastBrief.created_at)} for {pastBrief.generated_for}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="text-[11.5px] font-medium text-elec-yellow hover:text-elec-yellow/80 touch-manipulation flex-shrink-0"
      >
        Back to current
      </button>
    </div>
  );
}

function PastBriefsList({
  briefs,
  activeId,
  currentId,
  onSelect,
  onSelectCurrent,
}: {
  briefs: PastEpaBrief[];
  activeId: string | null;
  currentId: string | null;
  onSelect: (id: string) => void;
  onSelectCurrent: () => void;
}) {
  const [open, setOpen] = useState(false);
  const list = briefs.filter((b) => b.id !== currentId);
  if (list.length === 0) return null;
  return (
    <section className="mt-8 px-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-baseline justify-between gap-3 py-2 touch-manipulation"
      >
        <h3 className="text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.22em] text-white/65">
          Past briefs · {list.length}
        </h3>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-white/55 transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06] mt-2">
          {activeId && (
            <li className="py-3">
              <button
                type="button"
                onClick={onSelectCurrent}
                className="text-[11.5px] font-medium text-elec-yellow hover:text-elec-yellow/80 touch-manipulation"
              >
                ← Back to the current brief
              </button>
            </li>
          )}
          {list.map((b) => (
            <li key={b.id} className="py-3.5">
              <button
                type="button"
                onClick={() => onSelect(b.id)}
                className={cn(
                  'w-full text-left touch-manipulation',
                  activeId === b.id && 'opacity-80'
                )}
              >
                <p className="text-[10.5px] tabular-nums text-white/65">
                  {formatDate(b.created_at)}
                  <Sep />
                  <span className="capitalize">{b.generated_for}</span>
                  {b.facets_used > 0 && (
                    <>
                      <Sep />
                      <span>{b.facets_used} BS 7671 cite{b.facets_used === 1 ? '' : 's'}</span>
                    </>
                  )}
                </p>
                <p className="mt-1 text-[12.5px] text-white leading-relaxed line-clamp-2">
                  {b.brief.intro}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Sep() {
  return <span className="mx-1.5 text-white/25">·</span>;
}
