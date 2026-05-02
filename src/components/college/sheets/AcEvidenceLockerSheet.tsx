import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import type { AcCellRow, EvidenceTypeCode } from '@/hooks/useAcMatrix';
import { JobIdeasPanel } from '@/components/college/assessor/JobIdeasPanel';

/* ==========================================================================
   AcEvidenceLockerSheet — the per-AC evidence drawer.

   For one AC × one apprentice, surfaces every piece of evidence linked to
   it (portfolio items, observations, OTJ entries, quiz attempts), plus the
   AC's evidence requirement, plus an assessor sign-off block with
   narrative + verdict.

   Three jobs:
     1. Show the evidence picture (assessor sees what they have to judge from)
     2. Capture the assessor's narrative + judgement (the prose + tick)
     3. Surface the IQA verdict if sampled (read-only here; IQA edits in
        the existing IQA workflow)

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

const TYPE_TONE: Partial<Record<EvidenceTypeCode, string>> = {
  observation: 'border-elec-yellow/30 bg-elec-yellow/[0.08] text-elec-yellow',
  photo: 'border-blue-500/30 bg-blue-500/[0.08] text-blue-300',
  video: 'border-rose-500/30 bg-rose-500/[0.08] text-rose-300',
  witness: 'border-purple-500/30 bg-purple-500/[0.08] text-purple-300',
  document: 'border-white/[0.16] bg-white/[0.04] text-white',
  test_result: 'border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300',
  work_log: 'border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-300',
  reflection: 'border-amber-500/30 bg-amber-500/[0.08] text-amber-300',
  otj: 'border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300',
  quiz: 'border-purple-500/30 bg-purple-500/[0.08] text-purple-300',
};

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
  const { toast } = useToast();
  const [pieces, setPieces] = useState<EvidencePiece[]>([]);
  const [loading, setLoading] = useState(false);
  const [narrative, setNarrative] = useState('');
  const [narrativeDirty, setNarrativeDirty] = useState(false);
  const [signOffStatus, setSignOffStatus] = useState<
    'not_started' | 'in_progress' | 'evidenced' | 'assessed' | 'confirmed'
  >('not_started');
  const [signoffRow, setSignoffRow] = useState<{
    id?: string;
    assessor_narrative?: string | null;
    assessor_verdict?: 'not_yet' | 'passed' | 'referred' | null;
    assessor_signed_at?: string | null;
    assessor_name_snapshot?: string | null;
    iqa_verdict?: 'confirmed' | 'returned' | 'not_sampled' | null;
    iqa_sampled_at?: string | null;
    iqa_name_snapshot?: string | null;
    iqa_feedback?: string | null;
  } | null>(null);
  const [saving, setSaving] = useState(false);
  const [savingNarrative, setSavingNarrative] = useState(false);
  const [drafting, setDrafting] = useState(false);
  const [draftMeta, setDraftMeta] = useState<
    | { verdict: string; confidence: string; evidence_count: number }
    | null
  >(null);

  const channelId = useId();

  // Hydrate from coverage row + persisted ac_signoffs when the sheet opens.
  useEffect(() => {
    if (open && cell) {
      setSignOffStatus(cell.status);
      setNarrative('');
      setNarrativeDirty(false);
      setSignoffRow(null);
      void loadPieces();
      void loadSignoff();
    }
    if (!open) {
      setPieces([]);
      setNarrative('');
      setNarrativeDirty(false);
      setSignoffRow(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, cell?.unit_code, cell?.ac_code]);

  // Realtime: when ac_signoffs changes (e.g. IQA fans out a verdict from the
  // sampling page), refresh the locker without requiring close+reopen. Don't
  // clobber unsaved narrative drafts — only re-pull the signoff row.
  useEffect(() => {
    if (!open || !cell) return;
    const ch = supabase
      .channel(`ac_locker:${studentId}:${cell.unit_code}:${cell.ac_code}:${channelId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ac_signoffs',
          filter: `student_id=eq.${studentId}`,
        },
        () => {
          // Only refresh signoff (covers IQA writes). Don't replace narrative
          // if assessor has unsaved edits in the textarea.
          if (!narrativeDirty) void loadSignoff();
        }
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(ch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, cell?.unit_code, cell?.ac_code, studentId, channelId, narrativeDirty]);

  const loadPieces = useCallback(async () => {
    if (!cell) return;
    setLoading(true);
    try {
      const out: EvidencePiece[] = [];

      // Portfolio items where assessment_criteria_met includes this AC code.
      // Postgrest array contains: cs.{ac_code}
      if (studentUserId) {
        const { data: pRows } = await supabase
          .from('portfolio_items')
          .select(
            'id, title, description, category, file_type, file_url, storage_urls, created_at'
          )
          .eq('user_id', studentUserId)
          .contains('assessment_criteria_met', [cell.ac_code]);
        for (const p of (pRows ?? []) as Array<{
          id: string;
          title: string;
          description: string | null;
          category: string;
          file_type: string | null;
          file_url: string | null;
          storage_urls: unknown;
          created_at: string | null;
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
            href: `/college/students/${studentId}#portfolio`,
            preview_url: preview_url ?? p.file_url ?? null,
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
          href: `/college/students/${studentId}#observations`,
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

  const loadSignoff = useCallback(async () => {
    if (!cell) return;
    const { data } = await supabase
      .from('ac_signoffs')
      .select(
        'id, assessor_narrative, assessor_verdict, assessor_signed_at, assessor_name_snapshot, iqa_verdict, iqa_sampled_at, iqa_name_snapshot, iqa_feedback'
      )
      .eq('student_id', studentId)
      .eq('qualification_code', cell.qualification_code)
      .eq('unit_code', cell.unit_code)
      .eq('ac_code', cell.ac_code)
      .maybeSingle();
    if (data) {
      setSignoffRow(data);
      setNarrative(data.assessor_narrative ?? '');
      setNarrativeDirty(false);
    }
  }, [cell, studentId]);

  const refresh = useCallback(() => {
    void loadPieces();
    void loadSignoff();
  }, [loadPieces, loadSignoff]);

  const handleDraftAi = useCallback(async () => {
    if (!cell) return;
    setDrafting(true);
    setDraftMeta(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke('ai-draft-judgement', {
        body: {
          student_id: studentId,
          qualification_code: cell.qualification_code,
          unit_code: cell.unit_code,
          ac_code: cell.ac_code,
        },
      });
      if (fnErr) throw new Error(fnErr.message);
      const out = (data ?? {}) as {
        narrative?: string;
        verdict?: string;
        confidence?: string;
        evidence_count?: number;
      };
      if (out.narrative) {
        setNarrative(out.narrative);
        setNarrativeDirty(true);
        setDraftMeta({
          verdict: out.verdict ?? 'not_yet',
          confidence: out.confidence ?? 'medium',
          evidence_count: out.evidence_count ?? 0,
        });
        toast({
          title: 'AI draft inserted',
          description: 'Review, edit, then click Save narrative to commit.',
        });
      }
    } catch (e) {
      toast({
        title: 'Could not draft narrative',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setDrafting(false);
    }
  }, [cell, studentId, toast]);

  const handleSaveNarrative = useCallback(async () => {
    if (!cell) return;
    setSavingNarrative(true);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes?.user?.id;
      // Upsert (student × qual × unit × ac is unique)
      const { data: staffRow } = userId
        ? await supabase
            .from('college_staff')
            .select('name')
            .eq('user_id', userId)
            .is('archived_at', null)
            .maybeSingle()
        : { data: null };
      const assessorName =
        (staffRow as { name?: string } | null)?.name ?? null;
      const { error } = await supabase.from('ac_signoffs').upsert(
        {
          student_id: studentId,
          qualification_code: cell.qualification_code,
          unit_code: cell.unit_code,
          ac_code: cell.ac_code,
          assessor_narrative: narrative.trim() || null,
          assessor_signed_at: new Date().toISOString(),
          assessor_signed_by: userId ?? null,
          assessor_name_snapshot: assessorName,
        },
        {
          onConflict: 'student_id,qualification_code,unit_code,ac_code',
        }
      );
      if (error) throw error;
      setNarrativeDirty(false);
      toast({ title: 'Narrative saved' });
      await loadSignoff();
      onChanged?.();
    } catch (e) {
      toast({
        title: 'Could not save narrative',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSavingNarrative(false);
    }
  }, [cell, studentId, narrative, loadSignoff, onChanged, toast]);

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

  const handleSaveStatus = async (
    next: 'not_started' | 'in_progress' | 'evidenced' | 'assessed' | 'confirmed'
  ) => {
    if (!cell) return;
    setSaving(true);
    try {
      // Only update the status — last_evidence_at should reflect actual
      // evidence additions, not status changes (otherwise flipping status
      // backwards would falsely "freshen" the timestamp).
      const { error } = await supabase
        .from('student_ac_coverage')
        .update({ status: next })
        .eq('student_id', studentId)
        .eq('qualification_code', cell.qualification_code)
        .eq('unit_code', cell.unit_code)
        .eq('ac_code', cell.ac_code);
      if (error) throw error;
      setSignOffStatus(next);
      toast({
        title: 'Status updated',
        description: `${cell.ac_code} is now ${next.replace('_', ' ')}`,
      });
      onChanged?.();
    } catch (e) {
      toast({
        title: 'Could not update status',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (!cell) return null;

  const totalEvidence = pieces.length;
  const requirement = cell.requirement;
  const meets = cell.meets_requirement;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[560px] p-0 bg-[hsl(0_0%_8%)] border-white/[0.06]"
      >
        <SheetTitle className="sr-only">Evidence locker for {cell.ac_code}</SheetTitle>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-elec-yellow">
                Evidence locker
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={refresh}
                  disabled={loading}
                  className="text-[12px] font-medium text-white/65 hover:text-white touch-manipulation disabled:opacity-50"
                  title="Re-load evidence + sign-off"
                >
                  {loading ? 'Refreshing…' : 'Refresh'}
                </button>
                <button
                  onClick={() => onOpenChange(false)}
                  className="text-[12px] font-medium text-white/65 hover:text-white touch-manipulation"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-3 flex-wrap">
              <span className="font-mono text-[20px] font-semibold text-elec-yellow tabular-nums">
                {cell.ac_code}
              </span>
              <span className="text-[12px] text-white">
                {cell.unit_code} · {studentName}
              </span>
            </div>
            <p className="mt-2 text-[14px] text-white leading-snug">{cell.ac_text}</p>
          </div>

          {/* Body — scrollable */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {/* Requirement panel */}
            <div
              className={cn(
                'rounded-xl border px-4 py-3.5',
                meets
                  ? 'border-emerald-500/25 bg-emerald-500/[0.04]'
                  : requirement?.is_mandatory
                    ? 'border-rose-500/25 bg-rose-500/[0.04]'
                    : 'border-white/[0.10] bg-white/[0.02]'
              )}
            >
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
                  {requirement
                    ? `Requirement · ${requirement.is_mandatory ? 'mandatory' : 'stretch'}`
                    : 'Evidence'}
                </div>
                <div
                  className={cn(
                    'text-[11.5px] font-semibold tabular-nums',
                    meets ? 'text-emerald-300' : requirement?.is_mandatory ? 'text-rose-300' : 'text-white'
                  )}
                >
                  {meets ? 'Requirement met' : requirement?.is_mandatory ? 'Gap' : 'No requirement set'}
                </div>
              </div>
              {requirement && (
                <>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {requirement.required_codes.map((rc) => {
                      const have = (cell.by_type[rc] ?? 0) > 0;
                      return (
                        <span
                          key={rc}
                          className={cn(
                            'inline-flex items-center gap-1 h-6 px-2 rounded-md border text-[10.5px] font-semibold',
                            have
                              ? 'border-emerald-500/30 bg-emerald-500/[0.10] text-emerald-200'
                              : 'border-rose-500/30 bg-rose-500/[0.06] text-rose-200'
                          )}
                        >
                          <span className={cn('h-1 w-1 rounded-full', have ? 'bg-emerald-400' : 'bg-rose-400')} />
                          {TYPE_LABEL[rc] ?? rc} {have ? '✓' : '–'}
                        </span>
                      );
                    })}
                    <span className="text-[10.5px] text-white tabular-nums px-2 self-center">
                      Min {requirement.quantity_required} · Have {totalEvidence}
                    </span>
                  </div>
                  {requirement.guidance && (
                    <p className="mt-2 text-[11.5px] text-white leading-relaxed">
                      {requirement.guidance}
                    </p>
                  )}
                </>
              )}
              {!requirement && (
                <p className="mt-2 text-[11.5px] text-white">
                  No evidence-type rule set for this AC. Any combination of evidence will count.
                </p>
              )}
            </div>

            {/* Status block */}
            <div>
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white mb-2">
                Sign-off status
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {(
                  [
                    { v: 'not_started', label: 'Not started', tone: 'border-white/[0.10] text-white' },
                    {
                      v: 'in_progress',
                      label: 'In progress',
                      tone: 'border-blue-500/30 text-blue-300',
                    },
                    {
                      v: 'evidenced',
                      label: 'Evidenced',
                      tone: 'border-amber-500/30 text-amber-300',
                    },
                    {
                      v: 'assessed',
                      label: 'Assessed',
                      tone: 'border-emerald-500/30 text-emerald-300',
                    },
                    {
                      v: 'confirmed',
                      label: 'IQA confirmed',
                      tone: 'border-elec-yellow/30 text-elec-yellow',
                    },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.v}
                    type="button"
                    onClick={() => void handleSaveStatus(s.v)}
                    disabled={saving}
                    className={cn(
                      'h-9 px-2 rounded-lg border text-[11px] font-semibold transition-colors touch-manipulation',
                      signOffStatus === s.v
                        ? cn('bg-white/[0.06]', s.tone)
                        : 'border-white/[0.06] text-white hover:border-white/[0.20] bg-transparent'
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[10.5px] text-white leading-snug">
                Set the AC's status. "Assessed" is the assessor's judgement. "IQA confirmed" should
                only be flipped after IQA sampling.
              </p>
            </div>

            {/* Assessor narrative — persisted to ac_signoffs */}
            <div>
              <div className="flex items-baseline justify-between gap-2 mb-2 flex-wrap">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
                  Assessor narrative
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => void handleDraftAi()}
                    disabled={drafting}
                    className={cn(
                      'h-7 px-2.5 rounded-md border text-[10.5px] font-semibold uppercase tracking-[0.06em] transition-colors touch-manipulation',
                      drafting
                        ? 'border-white/[0.06] text-white/45'
                        : 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow hover:bg-elec-yellow/[0.10]'
                    )}
                    title="AI drafts a narrative from the evidence in this locker. You review and save."
                  >
                    {drafting ? 'Drafting…' : 'AI draft'}
                  </button>
                  {signoffRow?.assessor_signed_at && (
                    <div className="text-[10.5px] text-white/65 italic">
                      {signoffRow.assessor_name_snapshot ?? 'Signed'} ·{' '}
                      {new Date(signoffRow.assessor_signed_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  )}
                </div>
              </div>
              {draftMeta && (
                <div className="mb-2 text-[10.5px] text-white/65 italic">
                  AI suggests verdict <strong className="text-white">{draftMeta.verdict.replace('_', ' ')}</strong>{' '}
                  ({draftMeta.confidence} confidence, {draftMeta.evidence_count} evidence pieces).
                </div>
              )}
              <textarea
                value={narrative}
                onChange={(e) => {
                  setNarrative(e.target.value);
                  setNarrativeDirty(true);
                }}
                placeholder="The prose that backs up your judgement — why you're confident this AC is met, what evidence you weighted most, any concerns. This is what an IQA reads first."
                rows={4}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.10] text-[13px] text-white placeholder:text-white/40 leading-relaxed focus:outline-none focus:border-elec-yellow/50 touch-manipulation resize-y"
              />
              <div className="mt-2 flex items-center justify-between gap-2 flex-wrap">
                <p className="text-[10.5px] text-white/55 italic">
                  Saving stamps "signed by you, today" — appears in IQA sampling.
                </p>
                <button
                  type="button"
                  onClick={() => void handleSaveNarrative()}
                  disabled={!narrativeDirty || savingNarrative}
                  className={cn(
                    'h-9 px-3.5 rounded-lg text-[11.5px] font-semibold transition-colors touch-manipulation',
                    narrativeDirty && !savingNarrative
                      ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                      : 'bg-white/[0.06] text-white/45 cursor-not-allowed'
                  )}
                >
                  {savingNarrative ? 'Saving…' : 'Save narrative'}
                </button>
              </div>
            </div>

            {/* IQA verdict block — read-only here. Set in IQA sampling
                workflow. */}
            {signoffRow?.iqa_verdict && signoffRow.iqa_verdict !== 'not_sampled' && (
              <div
                className={cn(
                  'rounded-xl border px-4 py-3.5',
                  signoffRow.iqa_verdict === 'confirmed'
                    ? 'border-elec-yellow/30 bg-elec-yellow/[0.06]'
                    : 'border-rose-500/30 bg-rose-500/[0.06]'
                )}
              >
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
                    IQA verdict
                  </div>
                  <span
                    className={cn(
                      'text-[10.5px] font-semibold tabular-nums',
                      signoffRow.iqa_verdict === 'confirmed'
                        ? 'text-elec-yellow'
                        : 'text-rose-300'
                    )}
                  >
                    {signoffRow.iqa_verdict.toUpperCase()}
                  </span>
                </div>
                {signoffRow.iqa_feedback && (
                  <p className="mt-2 text-[12.5px] text-white leading-relaxed">
                    {signoffRow.iqa_feedback}
                  </p>
                )}
                {(signoffRow.iqa_name_snapshot || signoffRow.iqa_sampled_at) && (
                  <div className="mt-2 text-[10.5px] text-white/65 italic">
                    {signoffRow.iqa_name_snapshot ?? 'IQA'}
                    {signoffRow.iqa_sampled_at &&
                      ` · ${new Date(signoffRow.iqa_sampled_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}`}
                  </div>
                )}
              </div>
            )}

            {/* Job ideas — only when there's a real gap. AI on-demand. */}
            {!cell.meets_requirement && (
              <JobIdeasPanel
                studentId={studentId}
                acCodesFocus={[cell.ac_code]}
                title="Try this on a job"
                variant="inline"
              />
            )}

            {/* Evidence list */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
                  Evidence ({totalEvidence})
                </div>
                {loading && (
                  <span className="text-[10.5px] text-white">Loading…</span>
                )}
              </div>
              {!loading && totalEvidence === 0 && (
                <div className="rounded-lg border border-dashed border-white/[0.10] px-4 py-8 text-center">
                  <div className="text-[12.5px] font-medium text-white">No evidence yet</div>
                  <p className="mt-1 text-[11px] text-white max-w-xs mx-auto">
                    Add evidence by recording an observation, having the apprentice upload a portfolio
                    item with this AC tagged, or logging an OTJ entry that references {cell.ac_code}.
                  </p>
                </div>
              )}
              {grouped.map(([type, list]) => (
                <div key={type} className="mb-4 last:mb-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={cn(
                        'inline-flex items-center h-5 px-2 rounded-md border text-[10px] font-semibold uppercase tracking-[0.06em]',
                        TYPE_TONE[type] ?? 'border-white/[0.16] bg-white/[0.04] text-white'
                      )}
                    >
                      {TYPE_LABEL[type] ?? type}
                    </span>
                    <span className="text-[10.5px] text-white tabular-nums">
                      {list.length}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {list.map((piece) => (
                      <li key={piece.id}>
                        <a
                          href={piece.href ?? '#'}
                          onClick={(e) => {
                            if (!piece.href) e.preventDefault();
                          }}
                          className="block bg-[hsl(0_0%_10%)] border border-white/[0.06] hover:border-white/[0.14] rounded-lg px-3.5 py-2.5 transition-colors touch-manipulation"
                        >
                          <div className="text-[12.5px] font-medium text-white truncate">
                            {piece.title}
                          </div>
                          {piece.description && (
                            <div className="mt-0.5 text-[11.5px] text-white line-clamp-2 leading-snug">
                              {piece.description}
                            </div>
                          )}
                          <div className="mt-1 flex items-center gap-2 text-[10.5px] text-white">
                            {piece.recorded_by && <span>{piece.recorded_by}</span>}
                            {piece.recorded_by && piece.occurred_at && (
                              <span className="text-white/30">·</span>
                            )}
                            {piece.occurred_at && (
                              <span className="tabular-nums">
                                {new Date(piece.occurred_at).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </span>
                            )}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
