import { useEffect, useMemo, useRef, useState } from 'react';
import { RotateCw, Download, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { useEpaBrief, type EpaBrief } from '@/hooks/useEpaBrief';
import { usePastEpaBriefs, type PastEpaBrief } from '@/hooks/usePastEpaBriefs';
import { useLearnerDocumentDownload } from '@/lib/documents/useLearnerDocumentDownload';

/* ==========================================================================
   EpaBriefSheet — personalised pre-EPA briefing for the learner.
   Auto-generates when opened. Download PDF asks learner-document-pdf for the
   saved brief (college_epa_briefs), rendered server-side (ELE-2017).
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

  // The brief on screen: a past one, the one just drafted, or (if its id did
  // not come back) the newest saved for this learner.
  const pdf = useLearnerDocumentDownload();
  const currentBriefId = (ai.context as { brief_id?: string | null } | null)?.brief_id ?? null;
  const downloadPdf = () => {
    const briefId = viewingPast?.id ?? currentBriefId;
    if (briefId) void pdf.download({ kind: 'epa_brief', briefId });
    else if (collegeStudentId) void pdf.download({ kind: 'epa_brief', studentId: collegeStudentId });
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Pre-EPA brief"
      title={`EPA brief for ${studentName.split(' ')[0]}`}
      description={
        ai.context?.epa_booking_date
          ? `EPA booked for ${formatDate(ai.context.epa_booking_date)}. This brief is personalised to your evidence base and weak areas.`
          : 'Personalised to your evidence base, weak areas and BS 7671 hot zones.'
      }
      footer={
        ai.status === 'done' && ai.brief ? (
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={regenerate}
              className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center gap-1.5')}
            >
              <RotateCw className="h-3.5 w-3.5" />
              Re-draft
            </button>
            <button
              type="button"
              onClick={downloadPdf}
              disabled={pdf.busy}
              className={cn(buttonPrimaryCn, 'inline-flex items-center justify-center gap-1.5')}
            >
              <Download className="h-4 w-4" />
              {pdf.busy ? 'Making the PDF…' : 'Download PDF'}
            </button>
          </div>
        ) : ai.status === 'error' ? (
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
              Cancel
            </button>
            <button
              type="button"
              onClick={regenerate}
              className={cn(buttonPrimaryCn, 'inline-flex items-center justify-center gap-1.5')}
            >
              <RotateCw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(buttonSecondaryCn, 'w-full')}
          >
            Cancel
          </button>
        )
      }
    >
      {ai.status === 'loading' && <LoadingState />}
      {ai.status === 'error' && <ErrorState message={ai.error} />}
      {(ai.status === 'done' && ai.brief) || viewingPast ? (
        <>
          {viewingPast && (
            <ViewingPastBanner pastBrief={viewingPast} onClose={() => setViewingPastId(null)} />
          )}
          {briefToShow && <BriefView brief={briefToShow} />}
        </>
      ) : null}

      {/* Past briefs viewer — surfaces every prior brief from college_epa_briefs */}
      {past.briefs.length > 0 && (ai.status === 'done' || viewingPast) && (
        <PastBriefsList
          briefs={past.briefs}
          activeId={viewingPastId}
          currentId={(ai.context as { brief_id?: string } | null)?.brief_id ?? null}
          onSelect={(id) => setViewingPastId(id)}
          onSelectCurrent={() => setViewingPastId(null)}
        />
      )}
    </FormSheet>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6" aria-live="polite">
      <div>
        <div className="text-[15px] font-semibold text-white">Drafting your brief…</div>
        <p className="mt-1 text-[13px] leading-relaxed text-white">
          Reading your weak units, observations, mock results and BS 7671 hot zones.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-10 gap-y-5 animate-pulse lg:grid-cols-2" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border-t border-white/[0.08] pt-4">
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
    <div className="border-l-2 border-red-500 pl-4">
      <div className="text-[14px] font-semibold text-white">Could not generate the brief</div>
      <p className="mt-1 text-[13px] leading-relaxed text-white">
        {message ?? 'Try again in a moment.'}
      </p>
    </div>
  );
}

function BriefView({ brief }: { brief: EpaBrief }) {
  return (
    <div className="space-y-7">
      <p className="max-w-3xl border-l-2 border-elec-yellow pl-4 text-[14px] leading-relaxed text-white sm:text-[15px]">
        {brief.intro}
      </p>

      <div className="grid grid-cols-1 items-start gap-x-10 gap-y-7 lg:grid-cols-2">
        <div className="space-y-7">
          {/* Revision topics (stored as likely_viva_topics; there is no viva in this EPA) */}
          <Section label="Five topics to revise for the AM2S">
            <ol className="divide-y divide-white/[0.06]">
              {brief.likely_viva_topics.map((t, i) => (
                <li key={i} className="flex items-baseline gap-3 py-4">
                  <span className="w-6 flex-shrink-0 font-mono text-[12px] tabular-nums text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[14px] font-semibold leading-snug text-white">{t.topic}</h4>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white">
                      <span className="font-semibold">Why this for you. </span>
                      {t.why}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-white">
                      <span className="font-semibold text-elec-yellow">Prep. </span>
                      {t.prep}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section label="ACs to revise hardest">
            <ol className="divide-y divide-white/[0.06]">
              {brief.weak_ac_revision.map((a, i) => (
                <li key={i} className="py-3.5">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-[12px] font-semibold tabular-nums text-white">
                      {a.unit_code}
                    </span>
                    <span className="text-[13.5px] font-medium leading-snug text-white">
                      {a.focus}
                    </span>
                  </div>
                  {a.exemplar && (
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white">
                      <span className="font-semibold">Picture this. </span>
                      {a.exemplar}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </Section>
        </div>

        <div className="space-y-7">
          <Section label="BS 7671 hot zones">
            <ul className="divide-y divide-white/[0.06]">
              {brief.bs7671_hot_zones.map((z, i) => (
                <li key={i} className="break-words py-3">
                  <div className="break-all text-[13px] font-semibold text-white">{z.ref}</div>
                  <p className="mt-1 text-[13px] leading-relaxed text-white">{z.what_to_remember}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Watch out for">
            <ul className="space-y-2 text-[13px] leading-relaxed text-white">
              {brief.common_pitfalls.map((p, i) => (
                <li key={i} className="relative pl-4">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[9px] h-1 w-1 rounded-full bg-orange-300"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </Section>

          <Section label="On the day">
            <ul className="space-y-2 text-[13px] leading-relaxed text-white">
              {brief.day_of_advice.map((d, i) => (
                <li key={i} className="relative pl-4">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[9px] h-1 w-1 rounded-full bg-emerald-400"
                  />
                  {d}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>

      <p className="max-w-3xl border-l-2 border-elec-yellow pl-4 text-[14px] font-medium leading-relaxed text-white sm:text-[15px]">
        {brief.confidence_message}
      </p>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-white/[0.08] pt-4">
      <h3 className="mb-1 text-[15px] font-semibold text-white">{label}</h3>
      {children}
    </section>
  );
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
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
    <div className="flex items-center justify-between gap-3 border-l-2 border-white/40 pl-3">
      <p className="text-[13px] leading-snug text-white">
        <span className="font-semibold">Viewing a past brief. </span>
        Generated {formatDate(pastBrief.created_at)} for {pastBrief.generated_for}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="inline-flex h-11 flex-shrink-0 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
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
    <section className="border-t border-white/[0.08] pt-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-11 w-full items-center justify-between gap-3 touch-manipulation"
      >
        <h3 className="text-[15px] font-semibold text-white">Past briefs · {list.length}</h3>
        <ChevronDown
          className={cn('h-4 w-4 text-white transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <ul className="mt-1 divide-y divide-white/[0.06]">
          {activeId && (
            <li className="py-3">
              <button
                type="button"
                onClick={onSelectCurrent}
                className="inline-flex h-11 items-center text-[13px] font-semibold text-elec-yellow touch-manipulation"
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
                  activeId === b.id && 'border-l-2 border-elec-yellow pl-3'
                )}
              >
                <p className="text-[12px] tabular-nums text-white">
                  {formatDate(b.created_at)}
                  <Sep />
                  <span className="capitalize">{b.generated_for}</span>
                  {b.facets_used > 0 && (
                    <>
                      <Sep />
                      <span>
                        {b.facets_used} BS 7671 cite{b.facets_used === 1 ? '' : 's'}
                      </span>
                    </>
                  )}
                </p>
                <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-white">
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
  return <span className="mx-1.5 text-white">·</span>;
}
