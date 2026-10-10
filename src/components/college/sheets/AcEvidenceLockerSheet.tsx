import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { AcDecisionSheet } from '@/components/assessment/AcDecisionSheet';
import {
  usePortfolioAcState,
  aiProvenanceLine,
  STATE_CHIP,
  STATE_LABEL,
  type AcState,
} from '@/hooks/portfolio/usePortfolioAcState';
import type { AcCellRow, EvidenceTypeCode } from '@/hooks/useAcMatrix';
import { captureLine } from '@/lib/portfolio/captureStamp';
import { JobIdeasPanel } from '@/components/college/assessor/JobIdeasPanel';

/* ==========================================================================
   AcEvidenceLockerSheet — the per-AC evidence drawer.

   For one AC × one apprentice, surfaces every piece of evidence linked to
   it (portfolio items, observations, OTJ entries, quiz attempts), plus the
   AC's evidence requirement, plus the current decision on it.

   Three jobs:
     1. Show the evidence picture (assessor sees what they have to judge from)
     2. Show the current decision and open the one decision sheet
        (AcDecisionSheet → record_ac_decisions, ELE-1867). The old status
        chips and narrative box wrote student_ac_coverage / ac_signoffs with
        no verdict; both are gone. ac_signoffs is now a server-side mirror of
        the current decision. "Draft the narrative" (ai-draft-judgement) is
        offered inside the decision sheet as an AI draft (ELE-1926).
     3. Surface the IQA verdict if sampled (read-only here)

   Bottom sheet, wide on desktop: the evidence on the left, the judgement
   on the right.

   ELE-942 / [Assessor pack 1].
   ========================================================================== */

const TYPE_LABEL: Partial<Record<EvidenceTypeCode, string>> = {
  observation: 'Observation',
  photo: 'Photo',
  video: 'Video',
  witness: 'Witness statement',
  document: 'Document',
  test_result: 'Test result',
  work_log: 'Work log',
  reflection: 'Reflective account',
  otj: 'OTJ log',
  quiz: 'Quiz attempt',
  certificate: 'Certificate',
  drawing: 'Drawing',
  calculation: 'Calculation',
};

const fmtDay = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

interface EvidencePiece {
  id: string;
  type: EvidenceTypeCode;
  title: string;
  description: string | null;
  occurred_at: string | null;
  recorded_by: string | null;
  href: string | null;
  /** Optional preview metadata — for portfolio, public URL of first file. */
  preview_url: string | null;
  /** "Taken 7 Oct 2026, 09:12 · near Coventry" when the item carries a capture stamp. */
  capture?: string | null;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cell: AcCellRow | null;
  studentId: string;
  studentUserId: string | null;
  studentName: string;
  onChanged?: () => void;
}

export function AcEvidenceLockerSheet({
  open,
  onOpenChange,
  cell,
  studentId,
  studentUserId,
  studentName,
  onChanged,
}: Props) {
  const [pieces, setPieces] = useState<EvidencePiece[]>([]);
  const [loading, setLoading] = useState(false);
  const [deciding, setDeciding] = useState(false);

  useEffect(() => {
    if (open && cell) void loadPieces();
    if (!open) {
      setPieces([]);
      setDeciding(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, cell?.unit_code, cell?.ac_code]);

  const loadPieces = useCallback(async () => {
    if (!cell) return;
    setLoading(true);
    try {
      const out: EvidencePiece[] = [];

      // Portfolio items where assessment_criteria_met includes this AC code.
      // Postgrest array contains: cs.{ac_code}
      if (studentUserId) {
        // Typed claims (portfolio_item_criteria, ELE-1864) plus the older
        // free-text tick list, so nothing filed either way is missed.
        const { data: typed } = await supabase
          .from('portfolio_item_criteria' as never)
          .select('portfolio_item_id')
          .eq('learner_id', studentUserId)
          .eq('unit_code', cell.unit_code)
          .eq('ac_code', cell.ac_code)
          .neq('source', 'ai_suggested');
        const typedIds = ((typed ?? []) as Array<{ portfolio_item_id: string }>).map(
          (t) => t.portfolio_item_id
        );
        const base = supabase
          .from('portfolio_items')
          .select(
            'id, title, description, category, file_type, file_url, storage_urls, created_at, captured_at, captured_at_source, capture_place, capture_lat, capture_lng'
          )
          .eq('user_id', studentUserId);
        const { data: pRows } = typedIds.length
          ? await base.or(
              `id.in.(${typedIds.join(',')}),assessment_criteria_met.cs.{${cell.ac_code}}`
            )
          : await base.contains('assessment_criteria_met', [cell.ac_code]);
        // `as unknown`: the generated types predate the capture-stamp columns.
        for (const p of (pRows ?? []) as unknown as Array<{
          id: string;
          title: string;
          description: string | null;
          category: string;
          file_type: string | null;
          file_url: string | null;
          storage_urls: unknown;
          created_at: string | null;
          captured_at?: string | null;
          captured_at_source?: string | null;
          capture_place?: string | null;
          capture_lat?: number | string | null;
          capture_lng?: number | string | null;
        }>) {
          const cat = (p.category ?? '').toLowerCase();
          const known: EvidenceTypeCode[] = [
            'photo',
            'document',
            'certificate',
            'test_result',
            'witness',
            'reflection',
            'work_log',
            'video',
            'drawing',
            'calculation',
          ];
          let type: EvidenceTypeCode = 'document';
          if ((known as string[]).includes(cat)) type = cat as EvidenceTypeCode;
          else {
            const ft = (p.file_type ?? '').toLowerCase();
            if (ft.startsWith('image/')) type = 'photo';
            else if (ft.startsWith('video/')) type = 'video';
            else if (ft.includes('pdf')) type = 'document';
          }
          let preview_url: string | null = null;
          if (Array.isArray(p.storage_urls) && p.storage_urls.length > 0) {
            const first = p.storage_urls[0] as { url?: string };
            preview_url = first?.url ?? null;
          }
          out.push({
            id: `portfolio:${p.id}`,
            type,
            title: p.title,
            description: p.description,
            occurred_at: p.created_at,
            recorded_by: studentName,
            href: `/college?section=student360&studentId=${studentId}#portfolio`,
            preview_url: preview_url ?? p.file_url ?? null,
            capture: p.captured_at
              ? captureLine({
                  at: p.captured_at,
                  source: p.captured_at_source === 'photo' ? 'photo' : 'device',
                  place: p.capture_place ?? null,
                  lat: p.capture_lat == null ? null : Number(p.capture_lat),
                  lng: p.capture_lng == null ? null : Number(p.capture_lng),
                })
              : null,
          });
        }
      }

      // Observations linked to this AC
      const { data: obsRows } = await supabase
        .from('college_observations')
        .select(
          'id, activity_title, activity_summary, observed_at, assessor_name_snapshot, acs_evidenced'
        )
        .eq('college_student_id', studentId)
        .contains('acs_evidenced', [cell.ac_code]);
      for (const o of (obsRows ?? []) as Array<{
        id: string;
        activity_title: string;
        activity_summary: string | null;
        observed_at: string;
        assessor_name_snapshot: string | null;
      }>) {
        out.push({
          id: `observation:${o.id}`,
          type: 'observation',
          title: o.activity_title,
          description: o.activity_summary,
          occurred_at: o.observed_at,
          recorded_by: o.assessor_name_snapshot,
          href: `/college?section=student360&studentId=${studentId}#observations`,
          preview_url: null,
        });
      }

      // NB: college_otj_entries doesn't link to specific ACs (only unit_codes),
      // so we don't include OTJ logs in the locker. They show up on the OTJ
      // section of Student 360 separately.

      // Sort newest first
      out.sort((a, b) => {
        const at = a.occurred_at ? new Date(a.occurred_at).getTime() : 0;
        const bt = b.occurred_at ? new Date(b.occurred_at).getTime() : 0;
        return bt - at;
      });
      setPieces(out);
    } finally {
      setLoading(false);
    }
  }, [cell, studentId, studentUserId, studentName]);

  // Group evidence pieces by type for the locker display.
  const grouped = useMemo(() => {
    const m = new Map<EvidenceTypeCode, EvidencePiece[]>();
    for (const p of pieces) {
      const arr = m.get(p.type) ?? [];
      arr.push(p);
      m.set(p.type, arr);
    }
    // Sort keys by display order
    return Array.from(m.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [pieces]);

  if (!cell) return null;

  const totalEvidence = pieces.length;
  const requirement = cell.requirement;
  const meets = cell.meets_requirement;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
      eyebrow={`Evidence locker · ${studentName}`}
      title={
        <>
          <span className="font-mono tabular-nums text-elec-yellow">{cell.ac_code}</span>
          <span className="ml-2 text-[14px] font-medium sm:text-[15px]">Unit {cell.unit_code}</span>
        </>
      }
      description={cell.ac_text}
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Close
          </button>
          <button
            type="button"
            onClick={() => setDeciding(true)}
            disabled={!studentUserId}
            className={buttonPrimaryCn}
          >
            Record decision
          </button>
        </div>
      }
    >
      {/* ── Left: what the judgement rests on ── */}
      <div className="space-y-7">
        <Section
          title={
            requirement
              ? `Requirement (${requirement.is_mandatory ? 'mandatory' : 'stretch'})`
              : 'Requirement'
          }
          aside={
            <span
              className={cn(
                'text-[12.5px] font-semibold',
                meets
                  ? 'text-emerald-300'
                  : requirement?.is_mandatory
                    ? 'text-orange-300'
                    : 'text-white'
              )}
            >
              {meets ? 'Met' : requirement?.is_mandatory ? 'Gap' : 'No requirement set'}
            </span>
          }
        >
          {requirement ? (
            <>
              <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                {requirement.required_codes.map((rc) => {
                  const n = cell.by_type[rc] ?? 0;
                  return (
                    <li
                      key={rc}
                      className="flex items-center justify-between gap-3 px-4 py-2.5 text-[13.5px] text-white"
                    >
                      <span>{TYPE_LABEL[rc] ?? rc}</span>
                      <span
                        className={cn(
                          'font-semibold tabular-nums',
                          n > 0 ? 'text-emerald-300' : 'text-orange-300'
                        )}
                      >
                        {n > 0 ? `${n} filed` : 'Missing'}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="text-[13px] tabular-nums text-white">
                At least {requirement.quantity_required} piece
                {requirement.quantity_required === 1 ? '' : 's'} needed · {totalEvidence} linked
              </p>
              {requirement.guidance && (
                <p className="text-[13px] leading-relaxed text-white">{requirement.guidance}</p>
              )}
            </>
          ) : (
            <p className="text-[13px] leading-relaxed text-white">
              No evidence-type rule is set for this AC. Any combination of evidence counts.
            </p>
          )}
        </Section>

        <Section
          title={`Evidence (${totalEvidence})`}
          aside={
            <button
              type="button"
              onClick={() => void loadPieces()}
              disabled={loading}
              className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-white touch-manipulation hover:text-elec-yellow disabled:opacity-50"
              title="Re-load evidence"
            >
              {loading ? 'Loading…' : 'Refresh'}
            </button>
          }
        >
          {!loading && totalEvidence === 0 && (
            <div className="rounded-2xl border border-dashed border-white/[0.14] px-5 py-8 text-center">
              <p className="text-[14px] font-semibold text-white">No evidence yet</p>
              <p className="mx-auto mt-1 max-w-sm text-[13px] leading-relaxed text-white">
                Record an observation, ask the apprentice to upload a portfolio item tagged{' '}
                {cell.ac_code}, or log an OTJ entry that references it.
              </p>
            </div>
          )}
          {grouped.map(([type, list]) => (
            <div key={type} className="space-y-2">
              <h4 className="text-[13px] font-semibold text-white">
                {TYPE_LABEL[type] ?? type}{' '}
                <span className="font-normal tabular-nums">· {list.length}</span>
              </h4>
              <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]">
                {list.map((piece) => (
                  <li key={piece.id}>
                    <a
                      href={piece.href ?? '#'}
                      onClick={(e) => {
                        if (!piece.href) e.preventDefault();
                      }}
                      className="block px-4 py-3 transition-colors touch-manipulation hover:bg-white/[0.04]"
                    >
                      <div className="truncate text-[14px] font-medium text-white">
                        {piece.title}
                      </div>
                      {piece.description && (
                        <div className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-white">
                          {piece.description}
                        </div>
                      )}
                      {(piece.recorded_by || piece.occurred_at) && (
                        <div className="mt-1 text-[12px] tabular-nums text-white">
                          {[piece.recorded_by, piece.occurred_at ? fmtDay(piece.occurred_at) : null]
                            .filter(Boolean)
                            .join(' · ')}
                        </div>
                      )}
                      {piece.capture && (
                        <div className="mt-0.5 text-[12px] tabular-nums text-white">
                          {piece.capture}
                        </div>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      </div>

      {/* ── Right: the judgement ── */}
      <div className="space-y-7 border-t border-white/[0.1] pt-5 lg:border-t-0 lg:pt-0">
        {studentUserId ? (
          <LockerDecision
            learnerId={studentUserId}
            studentId={studentId}
            studentName={studentName}
            qualificationCode={cell.qualification_code}
            unitCode={cell.unit_code}
            acCode={cell.ac_code}
            deciding={deciding}
            onDecidingChange={setDeciding}
            onRecorded={() => onChanged?.()}
          />
        ) : (
          <Section top title="Decision">
            <p className={hintCn}>
              {studentName.split(' ')[0] || 'This learner'} has not joined yet, so there is nothing
              to decide on.
            </p>
          </Section>
        )}

        {/* Job ideas — only when there's a real gap. AI on-demand. */}
        {!cell.meets_requirement && (
          <div className="border-t border-white/[0.1] pt-4">
            <JobIdeasPanel
              studentId={studentId}
              acCodesFocus={[cell.ac_code]}
              title="Try this on a job"
              variant="inline"
            />
          </div>
        )}
      </div>
    </FormSheet>
  );
}

const hintCn = 'text-[12px] leading-relaxed text-white';

/** The current decision on this criterion, and the one way to record a new one. */
function LockerDecision({
  learnerId,
  studentId,
  studentName,
  qualificationCode,
  unitCode,
  acCode,
  deciding,
  onDecidingChange,
  onRecorded,
}: {
  learnerId: string;
  studentId: string;
  studentName: string;
  qualificationCode: string;
  unitCode: string;
  acCode: string;
  deciding: boolean;
  onDecidingChange: (v: boolean) => void;
  onRecorded: () => void;
}) {
  const { rows, loading, recordDecisions } = usePortfolioAcState(learnerId);
  const row = useMemo(
    () => rows.find((r) => r.unit_code === unitCode && r.ac_code === acCode) ?? null,
    [rows, unitCode, acCode]
  );
  const provenance = row
    ? aiProvenanceLine(
        row.decision_feedback_source,
        row.assessor_name,
        row.decision_feedback_confirmed_at ?? row.decided_at
      )
    : null;

  // The evidence locker's per-criterion draft (ai-draft-judgement), offered in the sheet.
  const draftWithAi = useCallback(async () => {
    const { data, error } = await supabase.functions.invoke('ai-draft-judgement', {
      body: {
        student_id: studentId,
        qualification_code: qualificationCode,
        unit_code: unitCode,
        ac_code: acCode,
      },
    });
    if (error) throw new Error(error.message);
    const out = (data ?? {}) as { narrative?: string; verdict?: string };
    return out.narrative ? { text: out.narrative, verdict: out.verdict ?? null } : null;
  }, [studentId, qualificationCode, unitCode, acCode]);

  return (
    <>
      <Section
        top
        title="Decision"
        aside={
          row ? (
            <span
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-[12px] font-semibold',
                STATE_CHIP[row.state as AcState]
              )}
            >
              {STATE_LABEL[row.state as AcState]}
            </span>
          ) : null
        }
      >
        {loading ? (
          <div className="h-16 animate-pulse rounded-xl bg-white/[0.04]" />
        ) : !row ? (
          <p className={hintCn}>
            This criterion is not on {studentName.split(' ')[0] || 'the learner'}'s qualification.
          </p>
        ) : row.decision_id ? (
          <div className="space-y-2">
            <p className="text-[13px] text-white">
              {row.assessor_name ?? 'Assessor'}
              {row.decided_at ? ` · ${fmtDay(row.decided_at)}` : ''}
            </p>
            {row.decision_feedback && (
              <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-white">
                {row.decision_feedback}
              </p>
            )}
            {provenance && <p className={hintCn}>{provenance}</p>}
            {row.iqa_verdict && (
              <p
                className={cn(
                  'text-[12.5px] font-semibold',
                  row.iqa_verdict === 'confirmed' ? 'text-emerald-300' : 'text-orange-300'
                )}
              >
                IQA {row.iqa_verdict === 'confirmed' ? 'confirmed' : 'not confirmed'}
                {row.iqa_feedback ? `: ${row.iqa_feedback}` : ''}
              </p>
            )}
          </div>
        ) : (
          <p className={hintCn}>
            No decision yet. Record passed, needs more or not yet; the learner sees it straight
            away.
          </p>
        )}
        <button
          type="button"
          onClick={() => onDecidingChange(true)}
          disabled={!row}
          className="inline-flex h-11 items-center rounded-xl border border-white/[0.2] px-4 text-[13px] font-semibold text-white touch-manipulation disabled:opacity-50"
        >
          {row?.decision_id ? 'Record a new decision' : 'Record decision'}
        </button>
      </Section>
      {row && (
        <AcDecisionSheet
          open={deciding}
          onOpenChange={onDecidingChange}
          learnerId={learnerId}
          learnerName={studentName}
          rows={[row]}
          record={recordDecisions}
          draftWithAi={draftWithAi}
          onRecorded={onRecorded}
        />
      )}
    </>
  );
}

/** A plain section: white heading over a hairline. */
function Section({
  title,
  aside,
  top,
  children,
}: {
  title: string;
  aside?: ReactNode;
  top?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        'space-y-4 border-t border-white/[0.1] pt-4 first:border-t-0 first:pt-0',
        top && 'lg:border-t-0 lg:pt-0'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
        {aside}
      </div>
      {children}
    </section>
  );
}
