import { useEffect, useMemo, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Wand2, RotateCw, Printer, Heart, AlertTriangle, BookOpen, Sparkles, Target, ListChecks, History, ChevronDown } from 'lucide-react';
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
      <SheetContent
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
    <div className="space-y-4">
      <div className="relative rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow to-transparent opacity-80"
          style={{ animation: 'shimmer 1.4s ease-in-out infinite' }}
        />
        <style>{`@keyframes shimmer { 0%,100% { transform: translateX(-30%); opacity: 0.4 } 50% { transform: translateX(30%); opacity: 1 } }`}</style>
        <div className="px-5 py-5 flex items-center gap-3">
          <Wand2 className="h-5 w-5 text-elec-yellow" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
              Drafting your brief
            </div>
            <div className="mt-0.5 text-[12px] text-white/85">
              Reading your weak units, observations, mocks, and BS 7671 hot zones…
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3 animate-pulse">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-white/[0.04] bg-[hsl(0_0%_12%)] px-5 py-4">
            <div className="h-2.5 w-1/3 rounded bg-white/[0.06]" />
            <div className="mt-2 h-2 w-3/4 rounded bg-white/[0.04]" />
            <div className="mt-1.5 h-2 w-2/3 rounded bg-white/[0.04]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string | null }) {
  return (
    <div className="rounded-2xl border border-red-500/[0.2] bg-[hsl(0_0%_12%)] px-5 py-4 flex items-center gap-3">
      <div className="p-2 rounded-xl bg-red-500/15 flex-shrink-0">
        <AlertTriangle className="h-5 w-5 text-red-300" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-300">
          Could not generate brief
        </div>
        <p className="mt-1 text-[12.5px] text-white/85 leading-relaxed">
          {message ?? 'Try again in a moment.'}
        </p>
      </div>
    </div>
  );
}

function BriefView({ brief }: { brief: EpaBrief }) {
  return (
    <div className="space-y-4">
      {/* Intro */}
      <div className="rounded-2xl border border-elec-yellow/[0.18] bg-elec-yellow/[0.04] px-5 py-4 flex items-start gap-3">
        <Heart className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
        <p className="text-[13px] text-white/90 leading-relaxed">{brief.intro}</p>
      </div>

      {/* Viva topics */}
      <Section icon={<Sparkles className="h-3.5 w-3.5 text-purple-300" />} label="5 likely viva topics">
        <ol className="space-y-2.5">
          {brief.likely_viva_topics.map((t, i) => (
            <li key={i} className="rounded-xl bg-[hsl(0_0%_14%)] border border-white/[0.04] px-4 py-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] text-white/45 tabular-nums">{i + 1}.</span>
                <h4 className="text-[13.5px] font-semibold text-white leading-tight">{t.topic}</h4>
              </div>
              <p className="mt-1.5 text-[11.5px] text-white/65 leading-snug">
                <span className="text-white/45">Why this for you:</span> {t.why}
              </p>
              <p className="mt-1 text-[11.5px] text-elec-yellow/85 leading-snug">
                <span className="text-elec-yellow/55">Prep:</span> {t.prep}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* BS 7671 hot zones */}
      <Section icon={<BookOpen className="h-3.5 w-3.5 text-blue-300" />} label="BS 7671 hot zones">
        <ul className="space-y-2">
          {brief.bs7671_hot_zones.map((z, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-blue-500/[0.12] border border-blue-500/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-blue-200 flex-shrink-0">
                {z.ref}
              </span>
              <p className="text-[12px] text-white/85 leading-snug">{z.what_to_remember}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Weak ACs */}
      <Section icon={<ListChecks className="h-3.5 w-3.5 text-amber-300" />} label="Weak ACs to revise">
        <ul className="space-y-2.5">
          {brief.weak_ac_revision.map((a, i) => (
            <li key={i} className="rounded-xl bg-[hsl(0_0%_14%)] border border-white/[0.04] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-amber-500/[0.10] border border-amber-500/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-amber-200">
                  {a.unit_code}
                </span>
                <span className="text-[12.5px] text-white">{a.focus}</span>
              </div>
              {a.exemplar && (
                <p className="mt-1.5 text-[11.5px] text-white/65 leading-snug">
                  <span className="text-white/45">Picture:</span> {a.exemplar}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {/* Common pitfalls */}
      <Section icon={<AlertTriangle className="h-3.5 w-3.5 text-orange-300" />} label="Watch out for">
        <ul className="space-y-1.5">
          {brief.common_pitfalls.map((p, i) => (
            <li key={i} className="text-[12px] text-white/85 leading-snug pl-3 relative">
              <span aria-hidden className="absolute left-0 top-[7px] inline-block h-1 w-1 rounded-full bg-orange-400/85" />
              {p}
            </li>
          ))}
        </ul>
      </Section>

      {/* Day of */}
      <Section icon={<Target className="h-3.5 w-3.5 text-emerald-300" />} label="On the day">
        <ul className="space-y-1.5">
          {brief.day_of_advice.map((d, i) => (
            <li key={i} className="text-[12px] text-white/85 leading-snug pl-3 relative">
              <span aria-hidden className="absolute left-0 top-[7px] inline-block h-1 w-1 rounded-full bg-emerald-400/85" />
              {d}
            </li>
          ))}
        </ul>
      </Section>

      {/* Confidence message */}
      <div className="rounded-2xl border border-elec-yellow/[0.30] bg-elec-yellow/[0.06] px-5 py-4">
        <p className="text-[13px] text-white leading-relaxed font-medium">{brief.confidence_message}</p>
      </div>
    </div>
  );
}

function Section({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-3">
        {icon}
        {label}
      </div>
      {children}
    </div>
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
    <div className="rounded-2xl border border-blue-500/[0.20] bg-blue-500/[0.05] px-5 py-3 flex items-center gap-3">
      <History className="h-4 w-4 text-blue-300 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200">
          Viewing past brief
        </div>
        <div className="mt-0.5 text-[12px] text-white/85">
          Generated {formatDate(pastBrief.created_at)} for {pastBrief.generated_for}
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-[11.5px] font-medium text-white/85 hover:text-white touch-manipulation"
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
  // Filter out the brief the user is currently viewing as "current" (just generated)
  const list = briefs.filter((b) => b.id !== currentId);
  if (list.length === 0) return null;
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-5 py-3 flex items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors touch-manipulation"
      >
        <div className="flex items-center gap-2">
          <History className="h-3.5 w-3.5 text-white/55" />
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Past briefs
          </div>
          <span className="text-[10.5px] text-white/45 tabular-nums">
            {list.length}
          </span>
        </div>
        <ChevronDown className={cn('h-4 w-4 text-white/55 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <ul className="divide-y divide-white/[0.04] border-t border-white/[0.04]">
          {activeId && (
            <li>
              <button
                type="button"
                onClick={onSelectCurrent}
                className="w-full px-5 py-3 text-left hover:bg-white/[0.02] flex items-center gap-2 touch-manipulation"
              >
                <span className="text-[11.5px] text-elec-yellow font-medium">← Back to the current brief</span>
              </button>
            </li>
          )}
          {list.map((b) => (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => onSelect(b.id)}
                className={cn(
                  'w-full px-5 py-3 text-left hover:bg-white/[0.02] transition-colors touch-manipulation',
                  activeId === b.id && 'bg-blue-500/[0.04]'
                )}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12.5px] text-white">
                    {formatDate(b.created_at)}
                  </span>
                  <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.10] text-[9px] font-semibold tracking-[0.06em] uppercase text-white/55">
                    {b.generated_for}
                  </span>
                  {b.facets_used > 0 && (
                    <span className="text-[10.5px] text-white/45 tabular-nums">
                      {b.facets_used} BS 7671 cite{b.facets_used === 1 ? '' : 's'}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11.5px] text-white/65 leading-snug line-clamp-2">
                  {b.brief.intro}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
