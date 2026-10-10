/**
 * DiaryEntryDetailSheet — one site diary entry, read top-down.
 *
 * Rebuilt 6 Oct 2026 (site diary audit). What changed and why:
 *  - Training time shows its REAL status from college_otj_entries (sent for
 *    sign-off / signed off by tutor or employer / not accepted / didn't send).
 *    It used to say "OJT hours linked · Tracked" for time the OTJ hub itself
 *    said never counted.
 *  - "Add to portfolio" could create the same evidence twice: the link update's
 *    error was ignored and the button never changed until a reload. It now
 *    checks the update, disables while saving and once linked, and creates
 *    the item as a DRAFT (it was 'completed', which the learner hadn't done).
 *    Criteria are suggested from the units the learner tagged on the entry,
 *    not keyword guesses — and nothing is pre-ticked unless the AI matched it.
 *  - "Open in portfolio" goes to the evidence list (it toasted and dumped you
 *    on the hub home).
 *  - Share with my tutor (college learners): the entry and the question become
 *    visible to their college. Mood is never shown to staff.
 *  - House style: bg-background, white text, sentence case, no caps/icon
 *    section labels, no purple/blue/green/amber decoration; red only for
 *    delete and errors.
 *
 * Review fixes (6 Oct pm): built on FormSheet like the entry sheet (it used a
 * second Sheet copy with a different surface, handle and padding); Edit is in
 * the header; one primary action (portfolio); "More from this site" above
 * Delete, which is last; the photo viewer is its own dialog (it sat outside
 * the sheet's portal, where the modal made it untappable); the criteria
 * picker resets when you move to another entry (it used to claim entry A's
 * criteria on entry B); rejected training shows the reason.
 *
 * UnifiedCaptureSheet wasn't used for the portfolio hand-off: its seed can't
 * carry photos already uploaded with the entry, and it doesn't return the new
 * item's id to link back — the diary would lose the photos and could add the
 * same day twice.
 */

import { sha256OfBlob } from '@/lib/portfolio/contentHash';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { EvidenceImage } from '@/components/shared/EvidenceImage';
import { FormSheet } from '@/components/forms/FormSheet';
import { displaySite, sentenceCase } from '@/lib/site-diary/format';
import { TONE_DOT } from '@/lib/site-diary/statusColour';
import { trainingTone } from './DiaryEntryCard';
import { Check, Loader2, Pencil, X } from 'lucide-react';
import {
  TRAINING_TYPES,
  formatMinutes,
  type SiteDiaryEntry,
} from '@/hooks/site-diary/useSiteDiaryEntries';
import { supabase } from '@/integrations/supabase/client';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useQualificationACs } from '@/hooks/qualification/useQualificationACs';
import { useDiaryEntryAnalysis } from '@/hooks/site-diary/useDiaryEntryAnalysis';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { MOOD_EMOJI, moodLabel } from '@/lib/site-diary/mood';
import { shareAttestLink } from '@/lib/site-diary/attest';
import { rejectedClaimsText, setItemCriteria } from '@/lib/portfolio/claimCriteria';

type OtjStatus = 'pending' | 'verified' | 'rejected' | 'verified_by_employer';

interface SuggestedAC {
  unitCode: string;
  unitTitle: string;
  acCode: string;
  acText: string;
  loText: string;
  selected: boolean;
  /** ELE-1864: the AI matched it. Shown as a suggestion, never pre-ticked. */
  aiConfidence?: number | null;
}

interface DiaryEntryDetailSheetProps {
  entry: SiteDiaryEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (entry: SiteDiaryEntry) => void;
  onDelete: (id: string) => void;
  relatedEntries: SiteDiaryEntry[];
  /** AC refs already evidenced in the portfolio, as "301.2.3". */
  evidencedACs?: Set<string>;
  /** Verification state of this entry's training time (useSiteDiaryEntries().otjStatus[id]). */
  otjStatus?: OtjStatus;
  /** Re-send training time that didn't send (useSiteDiaryEntries().retryTraining). */
  onRetryTraining?: (id: string) => Promise<boolean>;
  /** Reload the list after the sheet changes the entry (portfolio link, sharing). */
  onChanged?: () => void;
  /** Open another entry (from "More from this site"). */
  onOpenEntry?: (entry: SiteDiaryEntry) => void;
  /** Why the training wasn't accepted, when the tutor or employer said. */
  otjRationale?: string;
  /** Who sent it back — only then does the copy name them. */
  otjReturnedBy?: 'tutor' | 'employer';
  /** The linked training record didn't update on the last save. */
  trainingSyncFailed?: boolean;
}

const SECTION = 'border-t border-white/[0.1] pt-4';
const LABEL = 'text-[12px] font-medium text-white';
const CHIP =
  'inline-flex min-h-[32px] items-center rounded-lg border border-white/[0.14] bg-white/[0.06] px-3 py-1 text-[13px] text-white';
const BTN_SECONDARY =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.18] px-4 text-[14px] font-semibold text-white touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-50';
const BTN_PRIMARY =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-50';

/** The page's evidenced set has been built with and without a trailing colon
 *  ("113.1.1:" vs "113.1.1") — accept either so the label is right. */
function isEvidenced(set: Set<string> | undefined, unit: string, ac: string): boolean {
  if (!set) return false;
  const k = `${unit}.${ac}`;
  return set.has(k) || set.has(`${k}:`);
}

export function DiaryEntryDetailSheet({
  entry,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  relatedEntries,
  evidencedACs,
  otjStatus,
  onRetryTraining,
  onChanged,
  onOpenEntry,
  otjRationale,
  otjReturnedBy,
  trainingSyncFailed = false,
}: DiaryEntryDetailSheetProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  const { qualificationCode } = useStudentQualification();
  const { tree } = useQualificationACs(open ? qualificationCode : null);
  const unitTitle = useMemo(() => {
    const m = new Map<string, string>();
    for (const u of tree.units) m.set(u.unitCode, u.unitTitle);
    return m;
  }, [tree.units]);

  const {
    analysis: entryAnalysis,
    isLoading: analysisLoading,
    error: analysisError,
    refresh: refreshAnalysis,
  } = useDiaryEntryAnalysis(open ? (entry?.id ?? null) : null, entry, qualificationCode);

  // College link — sharing with a tutor only means something with a college.
  const [collegeLinked, setCollegeLinked] = useState(false);
  useEffect(() => {
    if (!open || !uid) return;
    let cancelled = false;
    void (async () => {
      const { data, error } = await supabase
        .from('college_students')
        .select('id')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })
        .limit(1);
      if (!cancelled && !error) setCollegeLinked(!!data?.length);
    })();
    return () => {
      cancelled = true;
    };
  }, [open, uid]);

  // Local mirrors so the sheet reflects a change at once, before the list reloads.
  const [linkedPortfolioId, setLinkedPortfolioId] = useState<string | null>(null);
  const [shared, setShared] = useState(false);
  const [savingShare, setSavingShare] = useState(false);
  useEffect(() => {
    setLinkedPortfolioId(entry?.linked_portfolio_id ?? null);
    setShared(!!entry?.share_with_tutor);
    setConfirmDelete(false);
  }, [entry?.id, entry?.linked_portfolio_id, entry?.share_with_tutor]);

  // Portfolio creation
  const [showPortfolioPicker, setShowPortfolioPicker] = useState(false);
  const [suggestedACs, setSuggestedACs] = useState<SuggestedAC[]>([]);
  const [isSearchingACs, setIsSearchingACs] = useState(false);
  const [isCreatingPortfolio, setIsCreatingPortfolio] = useState(false);
  // Moving to another entry ("More from this site") starts clean: the picker
  // used to carry entry A's criteria onto entry B's portfolio item.
  const entryIdRef = useRef<string | null>(null);
  useEffect(() => {
    entryIdRef.current = entry?.id ?? null;
    setShowPortfolioPicker(false);
    setSuggestedACs([]);
    setIsSearchingACs(false);
    setLightboxPhoto(null);
  }, [entry?.id]);

  if (!entry) return null;

  const entryDay = new Date(entry.date + 'T00:00:00');
  // "Saturday 28 February 2026" — en-GB puts a comma after the weekday.
  const formattedDate = `${entryDay.toLocaleDateString('en-GB', {
    weekday: 'long',
  })} ${entryDay.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  const units = entry.unit_codes ?? [];
  const minutes = entry.training_minutes ?? 0;
  const trainingLabel = TRAINING_TYPES.find((t) => t.id === entry.training_type)?.label;

  /* ─── Training time ──────────────────────────────────────────────── */
  const trainingStatus: { text: string; tone: 'ok' | 'wait' | 'bad' } | null = !minutes
    ? null
    : !entry.linked_otj_entry_id || trainingSyncFailed
      ? {
          text: entry.linked_otj_entry_id ? 'Your last change didn’t send' : 'Didn’t send',
          tone: 'bad',
        }
      : otjStatus === 'verified'
        ? { text: 'Signed off by your tutor', tone: 'ok' }
        : otjStatus === 'verified_by_employer'
          ? { text: 'Signed off by your employer', tone: 'ok' }
          : otjStatus === 'rejected'
            ? {
                text: `${
                  otjReturnedBy === 'tutor'
                    ? 'Sent back by your tutor'
                    : otjReturnedBy === 'employer'
                      ? 'Sent back by your employer'
                      : 'Sent back'
                }${
                  otjRationale
                    ? // The reason usually ends in its own full stop — don't add a second.
                      `: “${otjRationale.trim()}”${/[.!?]$/.test(otjRationale.trim()) ? '' : '.'}`
                    : '.'
                } Edit the entry to fix it and it goes again${otjRationale ? '' : ', or ask why'}.`,
                tone: 'bad',
              }
            : { text: 'Waiting for sign-off', tone: 'wait' };

  const retry = async () => {
    if (!onRetryTraining) return;
    setRetrying(true);
    try {
      const ok = await onRetryTraining(entry.id);
      if (ok) onChanged?.();
    } finally {
      setRetrying(false);
    }
  };

  const askSupervisor = () => {
    if (entry.linked_otj_entry_id)
      void shareAttestLink(entry.linked_otj_entry_id, minutes, entry.site_name);
  };

  /* ─── Share with tutor ───────────────────────────────────────────── */
  const toggleShare = async () => {
    if (!uid || savingShare) return;
    const next = !shared;
    setShared(next);
    setSavingShare(true);
    const { error } = await supabase
      .from('site_diary_entries')
      // share_with_tutor is newer than the generated types.
      .update({ share_with_tutor: next } as never)
      .eq('id', entry.id)
      .eq('user_id', uid);
    setSavingShare(false);
    if (error) {
      setShared(!next);
      toast.error('Couldn’t change sharing — try again');
      return;
    }
    toast.success(next ? 'Shared with your college' : 'No longer shared');
    onChanged?.();
  };

  /* ─── Delete ─────────────────────────────────────────────────────── */
  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(entry.id);
      setConfirmDelete(false);
    } else setConfirmDelete(true);
  };

  /* ─── Portfolio ──────────────────────────────────────────────────── */
  const aiPicks = (s: { unitCode: string; acCode: string }) =>
    !!entryAnalysis?.matchedCriteria?.some(
      (mc) => mc.confidence >= 60 && mc.unitCode === s.unitCode && mc.acCode === s.acCode
    );

  const handleAddToPortfolio = async () => {
    if (linkedPortfolioId) return;
    if (!qualificationCode) {
      await createPortfolioItem([]);
      return;
    }
    setShowPortfolioPicker(true);
    setIsSearchingACs(true);
    const forEntry = entry.id;
    try {
      let suggestions: SuggestedAC[] = [];
      if (units.length) {
        // The units the learner said this day covered: their criteria, exactly.
        const { data, error } = await supabase
          .from('qualification_requirements')
          .select('unit_code, unit_title, lo_text, ac_code, ac_text')
          .eq('qualification_code', qualificationCode)
          .in('unit_code', units)
          .order('unit_code', { ascending: true })
          .order('ac_code', { ascending: true });
        if (error) throw error;
        suggestions = (
          (data ?? []) as Array<{
            unit_code: string;
            unit_title: string | null;
            lo_text: string | null;
            ac_code: string;
            ac_text: string | null;
          }>
        ).map((r) => ({
          unitCode: r.unit_code,
          unitTitle: r.unit_title ?? '',
          acCode: r.ac_code,
          acText: (r.ac_text ?? '').replace(/^\s*[\d.]+\s*/, ''),
          loText: r.lo_text ?? '',
          selected: false,
        }));
      } else {
        // No units tagged: fall back to the words in the entry.
        const STOPWORDS = new Set(
          'the and was were with for had has have that this from they them you your our their been but not all any are its out got did due how why who what when some more than then into onto over under about after before today'.split(
            ' '
          )
        );
        const keywords = Array.from(
          new Set(
            [...entry.tasks_completed, ...entry.skills_practised, entry.what_i_learned || '']
              .join(' ')
              .toLowerCase()
              .split(/[^a-z0-9]+/)
              .filter((w) => w.length >= 3 && !STOPWORDS.has(w))
          )
        ).slice(0, 15);
        const { data, error } = await supabase.rpc('search_qualification_requirements', {
          p_keywords: keywords,
          p_qualification_code: qualificationCode,
          p_limit: 10,
        });
        if (error) throw error;
        for (const req of (data ?? []) as Array<{
          unit_code: string;
          unit_title: string;
          learning_outcome: string;
          assessment_criteria: string[] | null;
        }>) {
          for (const ac of req.assessment_criteria ?? []) {
            const m = ac.match(/^\s*([\d.]+)\s*[:\-–]?\s*(.*)$/);
            suggestions.push({
              unitCode: req.unit_code,
              unitTitle: req.unit_title,
              acCode: m?.[1] ?? ac,
              acText: m?.[2] ?? ac,
              loText: req.learning_outcome,
              selected: false,
            });
          }
        }
      }
      // ELE-1864: nothing is pre-ticked. Ticking claims you met it; an AI
      // match is marked as a suggestion and saved as one if left unticked.
      for (const s of suggestions) {
        s.selected = false;
        s.aiConfidence = aiPicks(s)
          ? Math.round(
              entryAnalysis?.matchedCriteria?.find(
                (mc) => mc.unitCode === s.unitCode && mc.acCode === s.acCode
              )?.confidence ?? 60
            )
          : null;
      }
      // A slow search for the previous entry must not land on this one.
      if (entryIdRef.current !== forEntry) return;
      setSuggestedACs(suggestions.slice(0, 30));
    } catch (err) {
      console.error('[DiaryEntry] AC search error:', err);
      if (entryIdRef.current === forEntry) setSuggestedACs([]);
    } finally {
      if (entryIdRef.current === forEntry) setIsSearchingACs(false);
    }
  };

  const toggleAC = (idx: number) =>
    setSuggestedACs((prev) =>
      prev.map((ac, i) => (i === idx ? { ...ac, selected: !ac.selected } : ac))
    );

  const createPortfolioItem = async (acs: SuggestedAC[]) => {
    if (!user || isCreatingPortfolio || linkedPortfolioId) return;
    setIsCreatingPortfolio(true);
    try {
      const dateLabel = new Date(entry.date + 'T00:00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      const description = [
        `**Site:** ${entry.site_name}`,
        entry.supervisor ? `**Supervisor:** ${entry.supervisor}` : '',
        entry.tasks_completed.length ? `**Tasks:** ${entry.tasks_completed.join(', ')}` : '',
        entry.what_i_learned ? `**What I learned:** ${entry.what_i_learned}` : '',
      ]
        .filter(Boolean)
        .join('\n\n');
      const chosen = acs.filter((a) => a.selected);
      // "113 AC 1.1: text" — the format the AC-coverage trigger reads.
      const acsMet = chosen.map((a) => `${a.unitCode} AC ${a.acCode}: ${a.acText}`.trim());
      const losMet = Array.from(
        new Set(chosen.filter((a) => a.loText).map((a) => `${a.unitCode}: ${a.loText}`))
      );

      // ELE-1865: fingerprint each photo as the capture sheet does, so the
      // evidence hash binds the photo itself and not just its address. A photo
      // that cannot be read is filed without one rather than blocking the save.
      const photoHashes = await Promise.all(
        (entry.photos ?? []).map(async (url) => {
          try {
            const res = await fetch(url);
            return res.ok ? await sha256OfBlob(await res.blob()) : null;
          } catch {
            return null;
          }
        })
      );

      const { data: newItem, error } = await supabase
        .from('portfolio_items')
        .insert({
          user_id: user.id,
          title: `Site diary: ${entry.site_name} — ${dateLabel}`,
          description,
          category: 'site-diary-evidence',
          skills_demonstrated: entry.skills_practised,
          reflection_notes: entry.what_i_learned || '',
          assessment_criteria_met: acsMet,
          learning_outcomes_met: losMet,
          storage_urls: entry.photos?.length
            ? entry.photos.map((url, i) => ({
                id: `diary-photo-${i}`,
                name: `Site photo ${i + 1}`,
                type: 'image/jpeg',
                size: 0,
                url,
                uploadDate: entry.created_at,
                ...(photoHashes[i] ? { sha256: photoHashes[i] } : {}),
              }))
            : [],
          // A draft the learner finishes and submits from their portfolio —
          // the same status new evidence from the capture sheet starts with.
          status: 'draft',
          date_completed: new Date(entry.date + 'T12:00:00').toISOString(),
          evidence_count: (entry.photos?.length || 0) + 1,
          tags: ['site-diary', entry.site_name.toLowerCase().replace(/\s+/g, '-')],
          supervisor_feedback: entry.supervisor ? `Supervised by: ${entry.supervisor}` : null,
        })
        .select('id')
        .single();
      if (error) throw error;

      const newId = (newItem as { id: string }).id;
      // ELE-1864: typed criteria. Ticked = learner claims (also typed by the
      // trigger from the strings); AI matches left unticked stay suggestions.
      const aiLeft = acs.filter((a) => !a.selected && a.aiConfidence);
      let criteriaWarning: string | null = null;
      let refused = 0;
      if (aiLeft.length || chosen.length) {
        // The claims are also typed by the trigger from the strings above, so
        // a failure here loses hints, never claims. A claim refused as not in
        // the learner's qualification is told to them.
        const crit = await setItemCriteria(
          newId,
          chosen.map((a) => ({ unit_code: a.unitCode, ac_code: a.acCode })),
          aiLeft.length
            ? aiLeft.map((a) => ({
                unit_code: a.unitCode,
                ac_code: a.acCode,
                confidence: a.aiConfidence,
                reason: 'Matched from this diary day',
              }))
            : null
        );
        refused = crit.rejected.length;
        if (refused) criteriaWarning = rejectedClaimsText(crit.rejected, crit.qualification);
        if (crit.error) console.warn('[site-diary] criteria not saved', crit.error);
      }
      const { error: linkErr } = await supabase
        .from('site_diary_entries')
        .update({ linked_portfolio_id: newId })
        .eq('id', entry.id)
        .eq('user_id', user.id);
      if (linkErr) {
        // Leave nothing half-done: without the link the button would offer
        // to add the same day again.
        await supabase.from('portfolio_items').delete().eq('id', newId);
        throw linkErr;
      }

      setLinkedPortfolioId(newId);
      setShowPortfolioPicker(false);
      setSuggestedACs([]);
      onChanged?.();
      toast.success('Added to your portfolio as a draft', {
        description:
          chosen.length - refused > 0
            ? `${chosen.length - refused} ${chosen.length - refused === 1 ? 'criterion' : 'criteria'} claimed. Finish and submit it from your portfolio.`
            : 'Finish and submit it from your portfolio.',
      });
      if (criteriaWarning)
        toast.error('Some criteria not claimed', { description: criteriaWarning });
    } catch (err) {
      console.error('[DiaryEntry] Portfolio create error:', err);
      toast.error('Couldn’t add it to your portfolio — try again');
    } finally {
      setIsCreatingPortfolio(false);
    }
  };

  const openPortfolio = () => {
    onOpenChange(false);
    // ELE-1892: straight to this evidence on the one portfolio home.
    navigate(linkedPortfolioId ? `/apprentice/hub?item=${linkedPortfolioId}` : '/apprentice/hub');
  };

  const selectedCount = suggestedACs.filter((a) => a.selected).length;

  return (
    <FormSheet
      width="wide"
      bodyClassName="space-y-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-start lg:gap-10 lg:space-y-0"
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setConfirmDelete(false);
      }}
      title={displaySite(entry.site_name)}
      description={
        <>
          {formattedDate}
          {entry.supervisor ? ` · Supervised by ${displaySite(entry.supervisor)}` : ''}
        </>
      }
      headerTrailing={
        <button
          type="button"
          onClick={() => onEdit(entry)}
          // mr-10: clear of the sheet's own close button in the corner.
          className="mr-10 inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.18] px-3.5 text-[14px] font-semibold text-white touch-manipulation"
        >
          <Pencil className="h-4 w-4" aria-hidden />
          Edit
        </button>
      }
    >
      {/* The day itself, on a lit card — the sheet was one dark block. */}
      <div className="min-w-0 space-y-5 rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5">
        {/* What I learned — the line that matters most */}
        {entry.what_i_learned && (
          <div className="space-y-2">
            <p className={LABEL}>What I learned</p>
            <p className="border-l-2 border-elec-yellow pl-3 text-[16px] leading-relaxed text-white">
              {entry.what_i_learned}
            </p>
          </div>
        )}

        {/* What I did */}
        {entry.tasks_completed.length > 0 && (
          <div className="space-y-2">
            <p className={LABEL}>What I did</p>
            <div className="flex flex-wrap gap-2">
              {entry.tasks_completed.map((task) => (
                <span key={task} className={CHIP}>
                  {sentenceCase(task)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Photos */}
        {entry.photos?.length > 0 && (
          <div className="space-y-2">
            <p className={LABEL}>Photos · {entry.photos.length}</p>
            {/* Desktop has the room: bigger, landscape tiles — one photo gets half the column. */}
            <div
              className={cn(
                'grid grid-cols-3 gap-2 lg:gap-3',
                entry.photos.length === 1 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
              )}
            >
              {entry.photos.map((url, i) => (
                <button
                  key={url}
                  type="button"
                  aria-label={`Open photo ${i + 1}`}
                  onClick={() => setLightboxPhoto(url)}
                  className="relative aspect-square overflow-hidden rounded-lg border border-white/[0.12] bg-white/[0.06] touch-manipulation active:opacity-80 lg:aspect-[4/3] lg:rounded-xl"
                >
                  {/* Under the photo: what shows if the file can't be loaded
                          (old diary photos whose file has gone) — never a blank box. */}
                  <span className="absolute inset-0 flex items-center justify-center p-2 text-center text-[12px] text-white">
                    Photo no longer available
                  </span>
                  <EvidenceImage
                    src={url}
                    alt={`Photo ${i + 1}`}
                    className="relative h-full w-full object-cover"
                    loading="lazy"
                    fallback={<span className="sr-only">Photo no longer available</span>}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Units */}
        {units.length > 0 && (
          <div className="space-y-2">
            <p className={LABEL}>Units this covered</p>
            <ul className="space-y-1.5">
              {units.map((u) => (
                <li key={u} className="text-[14px] leading-snug text-white">
                  <span className="font-semibold">{u}</span>
                  {unitTitle.get(u) ? ` · ${unitTitle.get(u)}` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills (the general tags) */}
        {entry.skills_practised.length > 0 && (
          <div className="space-y-2">
            <p className={LABEL}>Skills</p>
            <div className="flex flex-wrap gap-2">
              {entry.skills_practised.map((s) => (
                <span key={s} className={CHIP}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Desktop: where the day has gone, in a side panel. Its first section
          drops the rule that separates it from the photos on a phone. */}
      <div className="min-w-0 space-y-5 lg:rounded-2xl lg:border lg:border-white/[0.14] lg:bg-gradient-to-b lg:from-white/[0.08] lg:to-white/[0.04] lg:p-5 lg:[&>*:first-child]:border-t-0 lg:[&>*:first-child]:pt-0">
        {/* Training time — with its honest status */}
        {trainingStatus && (
          <div className={cn(SECTION, 'space-y-2')}>
            <p className={LABEL}>Training time</p>
            <p className="flex items-center gap-2 text-[15px] font-semibold text-white">
              <span
                aria-hidden
                className={cn(
                  'h-2.5 w-2.5 shrink-0 rounded-full',
                  TONE_DOT[trainingTone(otjStatus)]
                )}
              />
              {formatMinutes(minutes)}
              {trainingLabel ? ` · ${trainingLabel}` : ''}
            </p>
            <p
              className={cn(
                'text-[13px] leading-snug',
                // Something to fix, not an error: bold, not red.
                trainingStatus.tone === 'bad' ? 'font-semibold text-white' : 'text-white'
              )}
            >
              {trainingStatus.tone === 'ok' && (
                <Check className="mr-1 inline h-3.5 w-3.5 align-[-2px]" />
              )}
              {trainingStatus.text}
              {trainingStatus.tone === 'wait' &&
                (collegeLinked
                  ? ' — your tutor checks it, or your supervisor can confirm it.'
                  : ' — ask your supervisor to confirm it.')}
            </p>
            {(!entry.linked_otj_entry_id || trainingSyncFailed) && onRetryTraining && (
              <button type="button" onClick={retry} disabled={retrying} className={BTN_SECONDARY}>
                {retrying ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Try again
              </button>
            )}
            {entry.linked_otj_entry_id && otjStatus === 'pending' && (
              <button type="button" onClick={askSupervisor} className={BTN_SECONDARY}>
                Ask my supervisor to confirm
              </button>
            )}
          </div>
        )}

        {/* Question for my tutor + sharing */}
        {(entry.issues_or_questions || collegeLinked) && (
          <div className={cn(SECTION, 'space-y-2')}>
            {entry.issues_or_questions && (
              <>
                <p className={LABEL}>Question for my tutor</p>
                <p className="text-[14px] leading-relaxed text-white">
                  {entry.issues_or_questions}
                </p>
              </>
            )}
            {collegeLinked && (
              <button
                type="button"
                role="switch"
                aria-checked={shared}
                onClick={toggleShare}
                disabled={savingShare}
                className="flex min-h-[52px] w-full items-center gap-3 rounded-xl border border-white/[0.14] px-4 py-2.5 text-left touch-manipulation disabled:opacity-60"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-white">
                    Share with my college
                  </span>
                  <span className="block text-[12.5px] leading-snug text-white">
                    Your college’s staff can see this entry
                    {entry.issues_or_questions ? ' and your question' : ''}, never how the day felt.
                    {entry.issues_or_questions
                      ? ' Your tutor gets a heads-up about the question.'
                      : ''}
                  </span>
                </span>
                <span
                  className={cn(
                    'relative h-7 w-12 shrink-0 rounded-full transition-colors',
                    shared ? 'bg-elec-yellow' : 'bg-white/[0.18]'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-1 h-5 w-5 rounded-full bg-black transition-all',
                      shared ? 'left-6' : 'left-1'
                    )}
                  />
                </span>
              </button>
            )}
          </div>
        )}

        {/* How the day felt — private */}
        {entry.mood_rating ? (
          <p className="text-[13px] text-white">
            How the day felt: <span className="text-base">{MOOD_EMOJI[entry.mood_rating]}</span>{' '}
            {moodLabel(entry.mood_rating)}
            <span className="block text-[12px]">Only you can see this.</span>
          </p>
        ) : null}

        {/* Portfolio */}
        <div className={cn(SECTION, 'space-y-3')}>
          <p className={LABEL}>Portfolio</p>
          {linkedPortfolioId ? (
            <>
              <p className="text-[14px] text-white">
                <Check className="mr-1 inline h-4 w-4 align-[-3px] text-elec-yellow" />
                In your portfolio
              </p>
              <button type="button" onClick={openPortfolio} className={BTN_SECONDARY}>
                Open my evidence
              </button>
            </>
          ) : !showPortfolioPicker ? (
            <>
              <p className="text-[13px] leading-snug text-white">
                {entry.photos?.length && entry.what_i_learned
                  ? 'It has a photo and what you learned, so it can go in your portfolio. The evidence check below says how strong it is.'
                  : 'Add this day to your portfolio as a draft, then finish it there.'}
              </p>
              <button
                type="button"
                onClick={handleAddToPortfolio}
                disabled={isCreatingPortfolio}
                className={BTN_PRIMARY}
              >
                {isCreatingPortfolio ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Add to my portfolio
              </button>
            </>
          ) : (
            <div className="space-y-3 rounded-xl border border-white/[0.14] p-4">
              <div>
                <p className="text-[15px] font-semibold text-white">Which criteria did you meet?</p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-white">
                  {units.length
                    ? 'From the units you tagged on this entry. Tick only what you actually did — ticking claims it.'
                    : entryAnalysis
                      ? 'Ticked ones matched your entry with reasonable confidence. Check each before you claim it.'
                      : 'Matched on the words in your entry — nothing has checked them. Tick only what you actually did.'}
                </p>
              </div>
              <div className="max-h-64 space-y-1.5 overflow-y-auto overscroll-contain">
                {isSearchingACs ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                  </div>
                ) : suggestedACs.length === 0 ? (
                  <p className="py-4 text-center text-[13px] text-white">
                    No matching criteria found. You can still add it without claiming any.
                  </p>
                ) : (
                  suggestedACs.map((ac, idx) => (
                    <button
                      key={`${ac.unitCode}-${ac.acCode}-${idx}`}
                      type="button"
                      role="checkbox"
                      aria-checked={ac.selected}
                      onClick={() => toggleAC(idx)}
                      className={cn(
                        'flex min-h-[48px] w-full items-start gap-3 rounded-lg border px-3 py-2 text-left touch-manipulation',
                        ac.selected ? 'border-elec-yellow' : 'border-white/[0.12]'
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border',
                          ac.selected ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.35]'
                        )}
                      >
                        {ac.selected && <Check className="h-3 w-3 text-black" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12px] font-semibold text-white">
                          Unit {ac.unitCode} · AC {ac.acCode}
                          {isEvidenced(evidencedACs, ac.unitCode, ac.acCode)
                            ? ' · already evidenced'
                            : ''}
                          {ac.aiConfidence ? ` · AI suggests (${ac.aiConfidence}%)` : ''}
                        </span>
                        <span className="block text-[13px] leading-snug text-white">
                          {ac.acText}
                        </span>
                      </span>
                    </button>
                  ))
                )}
              </div>
              {!units.length && !entryAnalysis && (
                <button
                  type="button"
                  onClick={() => refreshAnalysis()}
                  disabled={analysisLoading}
                  className={BTN_SECONDARY}
                >
                  {analysisLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Check these against my entry
                </button>
              )}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPortfolioPicker(false);
                    setSuggestedACs([]);
                  }}
                  className={BTN_SECONDARY}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => createPortfolioItem(suggestedACs)}
                  disabled={isCreatingPortfolio || isSearchingACs}
                  className={BTN_PRIMARY}
                >
                  {isCreatingPortfolio ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : selectedCount === 0 ? (
                    'Add without claiming'
                  ) : (
                    `Add and claim ${selectedCount}`
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* AI evidence check — on demand */}
        {!linkedPortfolioId && !showPortfolioPicker && (
          <div className={cn(SECTION, 'space-y-3')}>
            <p className={LABEL}>Evidence check</p>
            {analysisLoading ? (
              <p className="flex items-center gap-2 text-[13px] text-white">
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking this entry against your qualification…
              </p>
            ) : entryAnalysis ? (
              <div className="space-y-3">
                <p className="text-[14px] text-white">
                  <span className="font-semibold">
                    {entryAnalysis.evidenceStrength === 'strong'
                      ? 'Strong evidence'
                      : entryAnalysis.evidenceStrength === 'moderate'
                        ? 'Reasonable evidence'
                        : 'Weak evidence so far'}
                  </span>{' '}
                  — {entryAnalysis.whyGoodEvidence}
                </p>
                {entryAnalysis.matchedCriteria.length > 0 && (
                  <ul className="space-y-2">
                    {entryAnalysis.matchedCriteria.slice(0, 5).map((mc, idx) => (
                      <li
                        key={`${mc.unitCode}-${mc.acCode}-${idx}`}
                        className="rounded-lg border border-white/[0.12] px-3 py-2"
                      >
                        <p className="text-[12px] font-semibold text-white">
                          Unit {mc.unitCode} · AC {mc.acCode} · {mc.confidence}% match
                          {isEvidenced(evidencedACs, mc.unitCode, mc.acCode)
                            ? ' · already evidenced'
                            : ''}
                        </p>
                        <p className="mt-0.5 text-[13px] leading-snug text-white">{mc.acText}</p>
                        <p className="mt-0.5 text-[12px] leading-snug text-white">{mc.reason}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {entryAnalysis.qualityTips.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-[12px] font-medium text-white">To make it stronger</p>
                    <ul className="list-disc space-y-1 pl-5">
                      {entryAnalysis.qualityTips.map((tip, idx) => (
                        <li key={idx} className="text-[13px] leading-snug text-white">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button type="button" onClick={refreshAnalysis} className={BTN_SECONDARY}>
                  Check again
                </button>
              </div>
            ) : (
              <>
                {analysisError && (
                  <p className="text-[13px] text-red-400">The check didn’t finish — try again.</p>
                )}
                <button type="button" onClick={refreshAnalysis} className={BTN_SECONDARY}>
                  Check how this works as evidence
                </button>
              </>
            )}
          </div>
        )}

        {/* More from this site */}
        {relatedEntries.length > 0 && (
          <div className={cn(SECTION, 'space-y-2')}>
            <p className={LABEL}>More from {entry.site_name}</p>
            <ul className="space-y-1.5">
              {relatedEntries.map((re) => {
                const reDate = new Date(re.date + 'T00:00:00').toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                });
                const row = (
                  <>
                    <span className="w-14 shrink-0 text-[13px] font-semibold text-white">
                      {reDate}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13px] text-white">
                      {re.what_i_learned ||
                        re.tasks_completed.slice(0, 2).map(sentenceCase).join(', ') ||
                        'No tasks logged'}
                    </span>
                  </>
                );
                return (
                  <li key={re.id}>
                    {onOpenEntry ? (
                      <button
                        type="button"
                        onClick={() => onOpenEntry(re)}
                        className="flex min-h-[44px] w-full items-center gap-3 rounded-lg border border-white/[0.1] px-3 text-left touch-manipulation"
                      >
                        {row}
                      </button>
                    ) : (
                      <div className="flex min-h-[44px] items-center gap-3 rounded-lg border border-white/[0.1] px-3">
                        {row}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {/* Delete — last */}
        <div className={cn(SECTION, 'space-y-2')}>
          {confirmDelete ? (
            <div className="space-y-2 rounded-xl border border-red-500/60 p-4">
              <p className="text-[14px] font-semibold text-white">Delete this entry?</p>
              <p className="text-[12.5px] leading-snug text-white">
                {minutes && otjStatus === 'pending'
                  ? 'Its training time hasn’t been signed off yet, so that goes too. '
                  : ''}
                This can’t be undone.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className={BTN_SECONDARY}
                >
                  Keep it
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-red-600 px-4 text-[14px] font-semibold text-white touch-manipulation"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.18] px-4 text-[14px] font-semibold text-red-400 touch-manipulation"
            >
              Delete this entry
            </button>
          )}
        </div>
      </div>
      {/* Photo viewer — its own dialog, layered over the sheet. */}
      <DialogPrimitive.Root
        open={!!lightboxPhoto}
        onOpenChange={(v) => !v && setLightboxPhoto(null)}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[200] bg-black/90" />
          <DialogPrimitive.Content
            className="pointer-events-auto fixed inset-0 z-[201] flex items-center justify-center p-4 focus:outline-none"
            onClick={() => setLightboxPhoto(null)}
          >
            <DialogPrimitive.Title className="sr-only">Photo</DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Full size photo from this diary entry
            </DialogPrimitive.Description>
            <DialogPrimitive.Close
              aria-label="Close photo"
              className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white touch-manipulation"
              style={{ top: 'max(1rem, env(safe-area-inset-top))' }}
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
            {lightboxPhoto && (
              <EvidenceImage
                src={lightboxPhoto}
                alt="Full size photo"
                className="max-h-[85vh] max-w-full rounded-lg object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </FormSheet>
  );
}
