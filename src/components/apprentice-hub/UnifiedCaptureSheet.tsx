/**
 * UnifiedCaptureSheet
 *
 * Voice-first, multi-file, streaming capture for the apprentice portfolio.
 *
 *   • Multi-file upload — capture several photos / docs in one go
 *   • Voice description — speak the job; AI drafts a STAR reflection
 *   • Live streaming AC matching — first match lands in ~1.5 s
 *   • Quality grade A-D per file with concrete strengthen-it tips
 *   • BS 7671 RAG-grounded — questions cite real reg numbers
 *   • Editorial styling — match the rest of the portfolio dashboard
 *
 * ELE-1916: THE capture flow. Every way of adding evidence opens this sheet
 * with a preset (photo, reflection, diary entry, worksheet, test sheet, from
 * a job) and a `source`; nothing else creates portfolio evidence.
 * ELE-1894: Save always goes through the on-phone outbox, so a capture made
 * with no signal is kept (files and all) and sent when signal returns.
 * ELE-1927: the on-site assistant suggests criteria, drafts the reflective
 * account in the learner's words, asks for the test sheet when a board is
 * photographed and names the one job that closes the most gaps. All of it is
 * stored as 'ai_suggested'; nothing is claimed for the learner.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
  inputCn,
  textareaCn,
  selectTriggerCn,
} from '@/components/forms/fieldStyles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import {
  Camera,
  Upload,
  X,
  Sparkles,
  Loader2,
  Check,
  Mic,
  MicOff,
  FileCheck,
  FileCheck2,
  ClipboardList,
  Calculator,
  ScanLine,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEvidenceTypes } from '@/hooks/portfolio/useEvidenceTypes';
import type { EvidenceTypeCode } from '@/types/evidence';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import {
  usePortfolioCaptureStream,
  type FileAnalysis,
  type ReflectionDraft,
  type CaptureMeta,
} from '@/hooks/portfolio/usePortfolioCaptureStream';
import type { PortfolioCategory, EvidenceType } from '@/types/portfolio';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useHaptic } from '@/hooks/useHaptic';
import { saveDraft, loadDraft, clearDraft, type CaptureDraft } from '@/lib/captureDrafts';
import { buildAiUseRecord, type AiRun } from '@/lib/portfolio/aiUseRecord';
import { Eyebrow as PortfolioEyebrow } from './portfolio/PortfolioPrimitives';

/** Field and section labels in this sheet: sentence case, white, readable. */
const Eyebrow = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <PortfolioEyebrow
    className={cn('text-[13px] font-medium normal-case tracking-normal text-white', className)}
  >
    {children}
  </PortfolioEyebrow>
);
import { parseAcRef } from '@/lib/portfolio/acRef';
import { sha256OfBlob } from '@/lib/portfolio/contentHash';
import { notifyPortfolioChanged } from '@/hooks/portfolio/usePortfolio';
import {
  checkCalculation,
  prepareWorkEvidence,
  type CalcCheck,
  type PreparedExtraFile,
  type PreparedWorkEvidence,
  type WorkKind,
} from '@/lib/portfolio/workEvidence';
import { WorkEvidencePicker } from './portfolio2/WorkEvidencePicker';
import { PaperScheduleSheet } from './portfolio2/PaperScheduleSheet';
import {
  VIDEO_MAX_SECONDS,
  uploadWithProgress,
  videoDurationSeconds,
} from '@/lib/storage/uploadWithProgress';
import { PRESETS, type CapturePreset, type CaptureSource } from '@/lib/portfolio/capturePresets';
import {
  enqueueCapture,
  sendOutboxItemNow,
  type OutboxSuggestion,
} from '@/lib/portfolio/captureOutbox';
import { createPortfolioItem } from '@/hooks/portfolio/portfolioWrites';
import { rejectedClaimsText, setItemCriteria } from '@/lib/portfolio/claimCriteria';
import { buildCaptureStamp, getCoarsePlace, type CoarsePlace } from '@/lib/portfolio/captureStamp';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useCaptureAssistant } from '@/hooks/portfolio/useCaptureAssistant';
import { CaptureAssistantPanel } from './portfolio2/CaptureAssistantPanel';
import { CaptureOutboxStrip } from './portfolio2/CaptureOutboxStrip';
import { UsesAi } from '@/components/college/ui/UsesAi';

export interface CaptureSeed {
  /** Pre-filled evidence title. */
  title?: string;
  /** ACs to pre-select, in `${unitCode} AC ${acCode}` format. */
  acRefs?: string[];
  /** Evidence checklist shown as an on-site capture brief. */
  brief?: { label: string; type?: string; required?: boolean }[];
  /** Optional scenario text seeded into the description field. */
  context?: string;
  /** Where the brief came from, shown on its label. Defaults to "from your job idea". */
  briefSource?: string;
  /**
   * ELE-1906: start from the learner's own work (a certificate, its schedule
   * of test results, or a saved calculation). The sheet makes the readable
   * copy and lists suggested criteria for the learner to claim.
   */
  work?: { kind: WorkKind; id: string };
  /** ELE-1906: open the "From your work" picker on that tab straight away. */
  pickWork?: WorkKind;
  /** ELE-1916: how the sheet opens and what it records as the source. */
  preset?: CapturePreset;
  /** ELE-1916: overrides the source written (e.g. 'notebook'). Defaults to the preset. */
  source?: CaptureSource;
  /**
   * Criteria someone else suggested (the notebook, an assistant). Shown as
   * "Suggested", never ticked: saved as ai_suggested unless the learner taps one.
   */
  suggestedAcRefs?: string[];
  /** Pre-filled description and reflective account (e.g. from a logged-hours entry). */
  description?: string;
  reflection?: string;
  /** The day the work was done, YYYY-MM-DD. */
  workDate?: string;
}

interface UnifiedCaptureSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Fired after a save. The id is the new row's when it reached the server, or null when it is queued on the phone. */
  onComplete: (itemId?: string | null) => void;
  /** Optional pre-seed from a job idea — pre-fills title + ACs + brief. */
  seed?: CaptureSeed | null;
}

type CaptureStep = 'capture' | 'details';

interface UploadedFile {
  id: string; // local synthetic id used for keying + SSE correlation
  file: File;
  previewUrl: string;
  storageUrl?: string;
  uploading: boolean;
  /** 0–1 while uploading (large videos take a while on site signal). */
  progress?: number;
  analysis?: FileAnalysis;
  /** Upload failure — offers re-upload; Save still keeps the file on the phone (ELE-1894). */
  error?: string;
  /** Taken with no signal: held on the phone and uploaded when signal returns. */
  queued?: boolean;
  /** AI analysis failure — file is safely stored; never re-upload for this. */
  analysisError?: string;
  /**
   * What KIND of evidence this is — `evidence_types.code`.
   *
   * Inferred on selection, correctable by the learner. Without it an assessor
   * cannot tell a witness statement from a photo of a consumer unit, and
   * `requires_witness` can never be enforced.
   */
  evidenceType?: EvidenceTypeCode;
}

const GRADE_TONE: Record<'A' | 'B' | 'C' | 'D', string> = {
  A: 'border-elec-yellow text-elec-yellow',
  B: 'border-elec-yellow/50 text-elec-yellow',
  C: 'border-orange-400/30 text-orange-200 bg-orange-400/[0.06]',
  D: 'border-red-500/30 text-red-300 bg-red-500/[0.05]',
};

// Evidence types recognised by UK awarding bodies / EPAOs.
const EVIDENCE_TYPES: { v: EvidenceType; label: string }[] = [
  { v: 'observation', label: 'Observation' },
  { v: 'work-product', label: 'Work product' },
  { v: 'witness-testimony', label: 'Witness testimony' },
  { v: 'professional-discussion', label: 'Prof. discussion' },
  { v: 'photo', label: 'Photo' },
  { v: 'reflective-account', label: 'Reflective account' },
];

const todayISO = () => new Date().toISOString().slice(0, 10);

// Coarse, human relative time for the draft banner — "25 min ago".
function relativeTime(ts: number): string {
  const mins = Math.max(0, Math.round((Date.now() - ts) / 60000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} ${hrs === 1 ? 'hour' : 'hours'} ago`;
  const days = Math.round(hrs / 24);
  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
}

// Turn the AI STAR draft into editable prose the apprentice owns and can reword.
function formatReflection(r: ReflectionDraft): string {
  return [
    `Situation: ${r.situation}`,
    `Task: ${r.task}`,
    `Action: ${r.action}`,
    `Result: ${r.result}`,
    `Learning: ${r.learning}`,
  ].join('\n\n');
}

// VACSR readiness chips, in order.
const READINESS_META: {
  k: 'valid' | 'authentic' | 'current' | 'sufficient' | 'reliable';
  label: string;
}[] = [
  { k: 'valid', label: 'Valid' },
  { k: 'authentic', label: 'Authentic' },
  { k: 'current', label: 'Current' },
  { k: 'sufficient', label: 'Sufficient' },
  { k: 'reliable', label: 'Reliable' },
];

// Plain-language fix for each unmet VACSR check — shown in the save nudge.
const READINESS_FIX: Record<string, string> = {
  valid: 'Tag at least one assessment criterion',
  authentic: 'Confirm it’s your own work (or add a witness)',
  current: 'Add the date you did the work',
  sufficient: 'Add your role and a short description',
  reliable: 'Attach a file and pick an evidence type',
};

// Fields are the house underline (`components/forms/fieldStyles`), not a
// local boxed dialect: 16px so iOS doesn't zoom on focus, no ring.
const FIELD_CLS = inputCn;
const AREA_CLS = cn(textareaCn, 'w-full');

/* ─── Coverage moment ──────────────────────────────────────────────────
   After a save that claimed ≥1 AC, work out where the claimed unit now
   stands so the toast can say "Unit 304 — 5 of 17 criteria now have
   evidence." rather than a flat "saved".

   College-linked learners read the server-maintained student_ac_coverage
   (a trigger on portfolio_items keeps it in sync — the just-claimed ACs
   are counted client-side in case that flip hasn't landed yet).
   Standalone learners fall back to distinct claimed ACs across
   portfolio_items vs the qualification_requirements catalogue.

   Returns the toast description, or null on any failure so the caller
   silently keeps the original toast. */

const AC_REF_RE = /^(.+?)\s+AC\s+(.+)$/;

async function buildCoverageMoment(
  userId: string,
  _qualificationCode: string | null,
  claimedRefs: string[]
): Promise<string | null> {
  try {
    // Group claimed refs by unit, preserving claim order.
    const byUnit = new Map<string, Set<string>>();
    for (const ref of claimedRefs) {
      const m = AC_REF_RE.exec(ref);
      if (!m) continue;
      const set = byUnit.get(m[1]) ?? new Set<string>();
      set.add(m[2]);
      byUnit.set(m[1], set);
    }
    const first = byUnit.entries().next();
    if (first.done) return null;
    const [unit, claimedAcs] = first.value;
    const moreUnits = byUnit.size - 1;

    // ELE-1917: the one criterion state. A criterion "has evidence" when it is
    // claimed, with the assessor or passed; sent back or AI-only does not count.
    const { data: rows, error } = await supabase.rpc(
      'get_portfolio_ac_state' as never,
      {
        p_user_id: userId,
      } as never
    );
    if (error) return null;
    const unitRows = (
      (rows ?? []) as unknown as { unit_code: string; ac_code: string; state: string }[]
    ).filter((r) => r.unit_code === unit);
    const total = unitRows.length;
    const HAS = new Set(['claimed', 'submitted', 'passed', 'iqa_confirmed']);
    let covered = unitRows.filter((r) => HAS.has(r.state)).length;
    // The criteria sync may not have run for the row just saved; count its
    // claims so the number never reads low.
    for (const ac of claimedAcs) {
      const row = unitRows.find((r) => r.ac_code === ac);
      if (row && !HAS.has(row.state)) covered += 1;
    }
    covered = Math.min(covered, total);

    if (total === 0) return null;
    const unitLabel = /^unit\b/i.test(unit) ? unit : `Unit ${unit}`;
    const suffix =
      moreUnits > 0 ? ` + ${moreUnits} more ${moreUnits === 1 ? 'unit' : 'units'}.` : '';
    return `${unitLabel}: ${covered} of ${total} criteria now have evidence.${suffix}`;
  } catch {
    return null;
  }
}

export function UnifiedCaptureSheet({
  open,
  onOpenChange,
  onComplete,
  seed,
}: UnifiedCaptureSheetProps) {
  const { toast } = useToast();
  // Per-type MIME allowlist, per-type size caps, and the type guesser.
  const { types: evidenceTypes, acceptAttr, maxBytesFor, inferCode } = useEvidenceTypes();
  const { user, profile } = useAuth();
  const haptic = useHaptic();
  const { logActivity } = useLearningXP();
  const { qualificationCode } = useStudentQualification();
  const assistant = useCaptureAssistant();
  // ELE-1916: the preset this capture opened with (photo when nothing says otherwise).
  const preset: CapturePreset = seed?.preset ?? 'photo';
  const presetCfg = PRESETS[preset];
  // Network state, so the sheet can say "no signal, it will sync" instead of failing.
  const [online, setOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine !== false
  );
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  /* ─── Form state ─────────────────────────────────────────────────── */
  const [step, setStep] = useState<CaptureStep>('capture');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  /* ─── Assessor-ready capture fields (all optional) ───────────────── */
  const [workDate, setWorkDate] = useState(todayISO);
  const [siteRef, setSiteRef] = useState('');
  const [role, setRole] = useState('');
  const [evidenceType, setEvidenceType] = useState<EvidenceType | ''>('');
  const [witnessName, setWitnessName] = useState('');
  const [witnessRole, setWitnessRole] = useState('');
  const [witnessDate, setWitnessDate] = useState('');
  const [authenticityConfirmed, setAuthenticityConfirmed] = useState(false);
  /*
   * Rough place: off unless the learner switches it on, which raises the
   * platform's own location prompt. Only the nearest town and a 0.1 degree
   * position are kept (captureStamp.ts). The switch is remembered on this
   * device only.
   */
  const [placeOn, setPlaceOn] = useState(false);
  const [place, setPlace] = useState<CoarsePlace | null>(null);
  const [locating, setLocating] = useState(false);
  const locatePlace = useCallback(async () => {
    setLocating(true);
    const p = await getCoarsePlace();
    setLocating(false);
    setPlace(p);
    if (!p) {
      setPlaceOn(false);
      try {
        window.localStorage.removeItem('portfolio.capturePlace');
      } catch {
        /* storage unavailable */
      }
    }
    return p;
  }, []);
  const togglePlace = async (on: boolean) => {
    setPlaceOn(on);
    try {
      if (on) window.localStorage.setItem('portfolio.capturePlace', '1');
      else window.localStorage.removeItem('portfolio.capturePlace');
    } catch {
      /* storage unavailable: the switch just is not remembered */
    }
    if (!on) {
      setPlace(null);
      return;
    }
    const p = await locatePlace();
    if (!p) {
      toast({
        title: 'Location not added',
        description: 'Your phone did not share it. The evidence saves without a place.',
      });
    }
  };
  // Ready to stamp: a learner who switched it on before gets it again (the
  // platform only asks once), anyone else starts with it off.
  useEffect(() => {
    if (!open) return;
    let remembered = false;
    try {
      remembered = window.localStorage.getItem('portfolio.capturePlace') === '1';
    } catch {
      remembered = false;
    }
    if (remembered) {
      setPlaceOn(true);
      void locatePlace();
    }
  }, [open, locatePlace]);
  // Editable STAR reflection — seeded from the AI draft, owned by the apprentice.
  const [reflectionText, setReflectionText] = useState('');

  /* ─── Voice transcript ────────────────────────────────────────────── */
  const {
    isSupported: speechSupported,
    isListening,
    transcript: speechTranscript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText({ continuous: true });
  const [voiceText, setVoiceText] = useState('');

  // Append finalised speech transcript to the voice field
  const prevTranscriptRef = useRef('');
  useEffect(() => {
    if (speechTranscript && speechTranscript !== prevTranscriptRef.current) {
      const newText = speechTranscript.slice(prevTranscriptRef.current.length);
      if (newText) {
        setVoiceText((prev) => prev + (prev && !prev.endsWith(' ') ? ' ' : '') + newText.trim());
      }
      prevTranscriptRef.current = speechTranscript;
    }
  }, [speechTranscript]);

  /* ─── Streaming state ────────────────────────────────────────────── */
  const { start: startStream, running: streaming } = usePortfolioCaptureStream();
  const [meta, setMeta] = useState<CaptureMeta | null>(null);
  const [reflection, setReflection] = useState<ReflectionDraft | null>(null);

  /* ─── AC selection ────────────────────────────────────────────────── */
  const [selectedACs, setSelectedACs] = useState<string[]>([]);

  /* ─── From your work (ELE-1906) ───────────────────────────────────── */
  const [workPicker, setWorkPicker] = useState<{ open: boolean; kind: WorkKind }>({
    open: false,
    kind: 'certificate',
  });
  const [work, setWork] = useState<PreparedWorkEvidence | null>(null);
  const [paperOpen, setPaperOpen] = useState(false);
  // Automatic BS 7671 check of a calculation: 'checking' while it runs.
  const [calcCheck, setCalcCheck] = useState<CalcCheck | 'checking' | null>(null);
  const [workLoading, setWorkLoading] = useState(false);
  const [workError, setWorkError] = useState<string | null>(null);

  /* ─── Job-idea seed (capture brief) ───────────────────────────────── */
  const [briefItems, setBriefItems] = useState<
    { label: string; type?: string; required?: boolean }[]
  >([]);
  const [briefACs, setBriefACs] = useState<string[]>([]);
  // Criteria suggested by whoever opened the sheet (the notebook): never claimed.
  const [seedSuggested, setSeedSuggested] = useState<string[]>([]);
  const seededRef = useRef(false);
  useEffect(() => {
    if (open && seed && !seededRef.current) {
      seededRef.current = true;
      const opens = seed.pickWork ? 'pick' : seed.preset ? PRESETS[seed.preset].opens : 'details';
      if (seed.pickWork) setWorkPicker({ open: true, kind: seed.pickWork });
      else if (opens === 'test_results') setWorkPicker({ open: true, kind: 'test_results' });
      else if (opens === 'details') setStep('details');
      else if (opens === 'camera') requestAnimationFrame(() => cameraInputRef.current?.click());
      if (seed.preset && PRESETS[seed.preset].evidenceType)
        setEvidenceType((e) => e || PRESETS[seed.preset!].evidenceType!);
      if (seed.suggestedAcRefs?.length) setSeedSuggested(seed.suggestedAcRefs);
      if (seed.description) setDescription((d) => d || seed.description!);
      if (seed.reflection) setReflectionText((r) => r || seed.reflection!);
      if (seed.workDate) setWorkDate(seed.workDate);
      if (seed.title) setTitle((t) => t || seed.title!);
      if (seed.acRefs?.length) {
        setSelectedACs((prev) => Array.from(new Set([...prev, ...seed.acRefs!])));
        setBriefACs(seed.acRefs);
      }
      if (seed.brief?.length) setBriefItems(seed.brief);
      if (seed.context) setVoiceText((v) => v || seed.context!);
      if (seed.work && user?.id) {
        const { kind, id } = seed.work;
        setWorkLoading(true);
        setWorkError(null);
        prepareWorkEvidence(kind, id, {
          userId: user.id,
          name: (profile?.full_name as string | undefined) ?? '',
        })
          .then((p) => applyWork(p))
          .catch((e) =>
            setWorkError(e instanceof Error ? e.message : 'Could not use that piece of work.')
          )
          .finally(() => setWorkLoading(false));
      }
    }
    if (!open) seededRef.current = false;
    // applyWork reads only setters and refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, seed, user?.id]);

  /* ─── Save state — pessimistic so we never claim "saved" before the
        write confirms (apprentices capture on flaky site signal). ──────── */
  const [isSaving, setIsSaving] = useState(false);

  /* ─── Offline draft survival (IndexedDB) ──────────────────────────
        Signal drops mid-capture, the app gets killed in the background,
        uploads fail and the apprentice gives up — the entry must survive.
        Content debounce-saves to IDB while the sheet is open; reopening
        offers Resume/Discard. Cleared ONLY on a successful save or an
        explicit discard — never on mere sheet close. ──────────────────── */
  const [pendingDraft, setPendingDraft] = useState<CaptureDraft | null>(null);
  const [draftSavedAt, setDraftSavedAt] = useState<number | null>(null);
  const draftCheckedRef = useRef(false);
  // Warn once per mount if the backup can't be written (IDB missing/quota).
  const draftWarnedRef = useRef(false);
  // Monotonic guard against a stale debounce-save resurrecting a draft after
  // it's been deliberately cleared (saveDraft + clearDraft use separate IDB
  // connections, so completion order isn't guaranteed). Bumped on every
  // clear; a debounce save landing after a bump re-clears.
  const draftEpochRef = useRef(0);
  const clearDraftNow = (uid: string) => {
    draftEpochRef.current += 1;
    void clearDraft(uid);
  };

  // Latest files, readable from stable listeners/timers without stale closures.
  const filesRef = useRef<UploadedFile[]>(files);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const draftHasContent =
    files.length > 0 ||
    title.trim().length > 0 ||
    description.trim().length > 0 ||
    voiceText.trim().length > 0;

  // A seeded sheet has content the moment it opens (title/ACs/context from
  // the job idea), so draftHasContent alone would persist that untouched
  // scaffold within 2s — silently overwriting any REAL unfinished draft in
  // IDB (one draft per user). Only persist a seeded session once the
  // apprentice has actually added something of their own.
  const seededUntouched = (): boolean => {
    if (!seededRef.current || !seed) return false;
    return (
      files.length === 0 &&
      title === (seed.title ?? '') &&
      voiceText === (seed.context ?? '') &&
      description === (seed.description ?? '') &&
      reflectionText === (seed.reflection ?? '') &&
      siteRef === '' &&
      role === '' &&
      (evidenceType === '' ||
        evidenceType === (seed.preset ? PRESETS[seed.preset].evidenceType : undefined)) &&
      witnessName === '' &&
      witnessRole === '' &&
      witnessDate === '' &&
      !authenticityConfirmed &&
      JSON.stringify(selectedACs) === JSON.stringify(seed.acRefs ?? [])
    );
  };
  // Plain boolean so the debounce effect can depend on it directly.
  const seededScaffoldOnly = seededUntouched();

  // Snapshot the live capture as a draft record. Raw File blobs go into
  // IDB (structured-cloneable) — never blob: URLs, which die with the
  // session. storageUrl is kept so restore doesn't re-upload.
  const draftSnapshot = (): CaptureDraft => ({
    fields: {
      title,
      description,
      voiceText,
      reflectionText,
      selectedACs,
      workDate,
      siteRef,
      role,
      evidenceType,
      witnessName,
      witnessRole,
      witnessDate,
      authenticityConfirmed,
      // ELE-2048: the AI runs survive a restored draft, so its AI use is still recorded.
      aiRuns: aiRunsRef.current,
    },
    files: files.map((f) => ({
      name: f.file.name,
      type: f.file.type,
      blob: f.file,
      storageUrl: f.storageUrl,
    })),
    savedAt: Date.now(),
  });
  const draftSnapshotRef = useRef(draftSnapshot);
  useEffect(() => {
    draftSnapshotRef.current = draftSnapshot;
  });

  // On open (and not seeded — a seed is a deliberate fresh capture brief),
  // look for a leftover draft and offer it. Never auto-restore silently.
  useEffect(() => {
    if (!open) {
      draftCheckedRef.current = false;
      setPendingDraft(null);
      return;
    }
    if (draftCheckedRef.current || !user?.id) return;
    draftCheckedRef.current = true;
    if (seed) return;
    void loadDraft(user.id).then((d) => {
      if (!d) return;
      const f = d.fields;
      const hasContent =
        d.files.length > 0 ||
        [f.title, f.description, f.voiceText].some(
          (v) => typeof v === 'string' && v.trim().length > 0
        );
      if (hasContent) setPendingDraft(d);
    });
  }, [open, user?.id, seed]);

  // Debounced persistence — ~2s after the last change while the sheet has
  // content. Paused during save (success clears the draft instead).
  useEffect(() => {
    if (!open || !user?.id || isSaving || !draftHasContent || seededScaffoldOnly) return;
    const uid = user.id;
    const timer = window.setTimeout(() => {
      const epoch = draftEpochRef.current;
      void saveDraft(uid, draftSnapshotRef.current()).then((ok) => {
        if (ok) setDraftSavedAt(Date.now());
        // A clear/discard/save happened while this write was in flight —
        // its delete may have lost the IDB race, so re-clear.
        if (ok && draftEpochRef.current !== epoch) {
          void clearDraft(uid);
          return;
        }
        if (!ok && !draftWarnedRef.current) {
          draftWarnedRef.current = true;
          toast({
            title: "Couldn't save a backup of this entry",
            description: 'Your work is still here. Save it before closing the app.',
          });
        }
      });
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [
    open,
    user?.id,
    isSaving,
    draftHasContent,
    seededScaffoldOnly,
    files,
    title,
    description,
    voiceText,
    reflectionText,
    selectedACs,
    workDate,
    siteRef,
    role,
    evidenceType,
    witnessName,
    witnessRole,
    witnessDate,
    authenticityConfirmed,
    toast,
  ]);

  /* ─── Assessor-ready save nudge (soft — never blocks) ─────────────── */
  const [showReadinessNudge, setShowReadinessNudge] = useState(false);
  const readinessAck = useRef(false);

  /* ─── Refs ────────────────────────────────────────────────────────── */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  /* ─── Aggregated AC matches across files ─────────────────────────── */
  const allMatches = useMemo(() => {
    const map = new Map<
      string,
      {
        unitCode: string;
        acCode: string;
        acText: string;
        confidence: number;
        reasons: string[];
        fromFiles: string[];
        grounded: boolean;
        toComplete?: string;
      }
    >();
    for (const f of files) {
      if (!f.analysis) continue;
      for (const m of f.analysis.matchedCriteria) {
        const key = `${m.unitCode} AC ${m.acCode}`;
        const existing = map.get(key);
        if (existing) {
          existing.confidence = Math.max(existing.confidence, m.confidence);
          existing.reasons.push(m.reason);
          existing.fromFiles.push(f.id);
          if (m.toComplete && !existing.toComplete) existing.toComplete = m.toComplete;
        } else {
          map.set(key, {
            unitCode: m.unitCode,
            acCode: m.acCode,
            acText: m.acText,
            confidence: m.confidence,
            reasons: [m.reason],
            fromFiles: [f.id],
            grounded: m.grounded !== false,
            toComplete: m.toComplete,
          });
        }
      }
    }
    return Array.from(map.values()).sort((a, b) => b.confidence - a.confidence);
  }, [files]);

  // Aggregate the new vision-grounded insights across all files.
  const aiInsights = useMemo(() => {
    const missing = new Set<string>();
    const authenticity = new Set<string>();
    const vacsrFixes = new Set<string>();
    const rank: Record<string, number> = { clear: 0, partial: 1, unusable: 2 };
    let worstQuality: 'clear' | 'partial' | 'unusable' | null = null;
    for (const f of files) {
      const a = f.analysis;
      if (!a) continue;
      (a.missingFromPhoto || []).forEach((x) => x && missing.add(x));
      (a.authenticityFlags || []).forEach((x) => x && authenticity.add(x));
      if (a.vacsr?.fix && a.vacsr.weakest !== 'none') vacsrFixes.add(a.vacsr.fix);
      if (a.imageQuality && (worstQuality === null || rank[a.imageQuality] > rank[worstQuality])) {
        worstQuality = a.imageQuality;
      }
    }
    return {
      missing: Array.from(missing).slice(0, 5),
      authenticity: Array.from(authenticity).slice(0, 4),
      vacsrFixes: Array.from(vacsrFixes).slice(0, 3),
      worstQuality,
    };
  }, [files]);

  // ELE-1927: the AI's reflective account is a DRAFT the learner chooses to use
  // (CaptureAssistantPanel), never written into their reflection on its own.
  const reflectionSeededRef = useRef(false);
  // ELE-2048: every AI run on this capture (what was sent, what came back),
  // so the saved evidence records the AI use.
  const aiRunsRef = useRef<{ star?: AiRun; assist?: AiRun }>({});
  useEffect(() => {
    const r = assistant.result;
    const run = aiRunsRef.current.assist;
    if (!r || !run) return;
    aiRunsRef.current.assist = {
      ...run,
      model: r.model,
      output: {
        reflection: r.reflection,
        criteria: r.criteria.map((c) => `${c.unit_code} AC ${c.ac_code}`),
      },
    };
  }, [assistant.result]);

  /* ─── On-site assistant (ELE-1927) ─────────────────────────────────── */
  const hasTestSheet =
    work?.kind === 'test_results' ||
    files.some(
      (f) =>
        (f.evidenceType as string | undefined) === 'test_result' ||
        /schedule|test.?result|test.?sheet|eicr|eic\b/i.test(f.file.name)
    );
  const runAssistant = () => {
    const fs = filesRef.current;
    const input = {
      transcript: voiceText.trim() || undefined,
      title: title.trim() || undefined,
      description: description.trim() || undefined,
      files: fs.map((f) => ({
        type: f.file.type,
        evidenceType: f.evidenceType,
        description: f.analysis?.detectedContent?.description,
        elements: f.analysis?.detectedContent?.electricalElements,
        workType: f.analysis?.detectedContent?.workType,
      })),
      matched: fs.flatMap((f) =>
        (f.analysis?.matchedCriteria ?? []).map((m) => ({
          unit_code: m.unitCode,
          ac_code: m.acCode,
        }))
      ),
      hasTestSheet,
    };
    aiRunsRef.current.assist = {
      tool: 'capture_assistant',
      fn: 'capture-assistant',
      at: new Date().toISOString(),
      prompt: input as unknown as Record<string, unknown>,
    };
    void assistant.run(input);
  };
  // Run it once the photo reader finishes (streaming goes true -> false).
  const wasStreamingRef = useRef(false);
  useEffect(() => {
    if (wasStreamingRef.current && !streaming && open) runAssistant();
    wasStreamingRef.current = streaming;
    // runAssistant reads the latest files through filesRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streaming, open]);
  // A STAR draft from the photo reader is the fallback when the assistant has none.
  const starDraft = reflection ? formatReflection(reflection) : '';
  const assistView = assistant.result
    ? {
        ...assistant.result,
        reflection: assistant.result.reflection || starDraft,
        // Don't repeat criteria the photo reader already listed below.
        criteria: assistant.result.criteria.filter(
          (c) => !allMatches.some((m) => m.unitCode === c.unit_code && m.acCode === c.ac_code)
        ),
      }
    : null;

  // Live VACSR readiness — lights up as the apprentice strengthens the entry.
  const readiness = useMemo(() => {
    const checks = {
      valid: selectedACs.length > 0,
      authentic: authenticityConfirmed || witnessName.trim().length > 0,
      current: workDate.trim().length > 0,
      sufficient:
        role.trim().length > 0 &&
        (description.trim().length > 0 || reflectionText.trim().length > 0),
      reliable: files.length > 0 && evidenceType !== '',
    };
    const score = Object.values(checks).filter(Boolean).length;
    return { checks, score, total: 5, ready: score === 5 };
  }, [
    selectedACs,
    authenticityConfirmed,
    witnessName,
    workDate,
    role,
    description,
    reflectionText,
    files,
    evidenceType,
  ]);

  /* ─── Reset ───────────────────────────────────────────────────────── */
  const resetForm = () => {
    setStep('capture');
    setDraftSavedAt(null);
    // Release blob: preview URLs — they otherwise live until page unload.
    for (const f of filesRef.current) {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    }
    setFiles([]);
    setTitle('');
    setDescription('');
    setVoiceText('');
    resetTranscript();
    prevTranscriptRef.current = '';
    setMeta(null);
    setReflection(null);
    setSelectedACs([]);
    setWorkDate(todayISO());
    setSiteRef('');
    setRole('');
    setEvidenceType('');
    setWitnessName('');
    setWitnessRole('');
    setWitnessDate('');
    setAuthenticityConfirmed(false);
    setReflectionText('');
    reflectionSeededRef.current = false;
    aiRunsRef.current = {};
    setBriefItems([]);
    setBriefACs([]);
    setSeedSuggested([]);
    assistant.reset();
    setWork(null);
    setCalcCheck(null);
    setWorkError(null);
    setWorkLoading(false);
    readinessAck.current = false;
    setShowReadinessNudge(false);
  };

  /* ─── Upload helper ──────────────────────────────────────────────── */
  // ELE-1865: SHA-256 of each file's bytes, started alongside the upload and
  // read back at save. Keyed on the File object so a retry reuses it.
  const fileHashes = useRef(new WeakMap<File, Promise<string | null>>());
  const hashOf = (file: File) => {
    let h = fileHashes.current.get(file);
    if (!h) {
      h = sha256OfBlob(file);
      fileHashes.current.set(file, h);
    }
    return h;
  };

  /**
   * ELE-1906: put a prepared piece of work into the capture. The file is
   * already in evidence storage (with its fingerprint); the criteria are
   * shown as suggestions and nothing is ticked for the learner.
   */
  const addPreparedFile = (f: PreparedExtraFile) => {
    const file = new File([f.blob], f.name, { type: f.type });
    fileHashes.current.set(file, Promise.resolve(f.sha256));
    setFiles((prev) => [
      ...prev,
      {
        id: `f-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(file) : '',
        storageUrl: f.url,
        uploading: false,
        evidenceType: f.evidenceType,
      },
    ]);
  };

  const applyWork = (p: PreparedWorkEvidence) => {
    addPreparedFile({ ...p.file, blob: p.blob });
    for (const extra of p.extraFiles ?? []) addPreparedFile(extra);
    setWork(p);
    // A calculation gets an automatic check against our BS 7671 data. It
    // informs the assessor (attached as a short PDF) and decides nothing.
    if (p.kind === 'calculation' && user?.id) {
      setCalcCheck('checking');
      void checkCalculation(p.sourceId, p.title, user.id)
        .then((c) => {
          setCalcCheck(c);
          if (c?.file) addPreparedFile(c.file);
        })
        .catch(() => setCalcCheck(null));
    } else {
      setCalcCheck(null);
    }
    setTitle((t) => t || p.title.slice(0, 100));
    setDescription((d) => d || p.summary);
    if (p.workDate) setWorkDate(p.workDate);
    if (p.siteRef) setSiteRef((r) => r || p.siteRef);
    setEvidenceType((e) => e || 'work-product');
    setStep('details');
  };

  const uploadFile = async (file: File, localId?: string): Promise<string | null> => {
    if (!user?.id) return null;
    void hashOf(file);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
      // XHR upload so a long video shows how far it has got.
      const data = await uploadWithProgress('portfolio-evidence', fileName, file, {
        contentType: file.type || undefined,
        onProgress: localId
          ? (frac) =>
              setFiles((prev) => prev.map((f) => (f.id === localId ? { ...f, progress: frac } : f)))
          : undefined,
      });
      const { data: urlData } = supabase.storage.from('portfolio-evidence').getPublicUrl(data.path);
      return urlData.publicUrl;
    } catch (err) {
      const msg = (err as Error)?.message ?? '';
      if (/too big/i.test(msg)) {
        toast({ title: `${file.name} is too big`, description: msg, variant: 'destructive' });
      }
      return null;
    }
  };

  /* ─── File selection ─────────────────────────────────────────────── */
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    /*
     * Size is checked PER EVIDENCE TYPE, not against one hard-coded 10MB.
     *
     * `evidence_types` allows video 50MB and documents 10MB. This code capped
     * everything at 10MB, so video — a defined, assessable evidence type —
     * could not be uploaded at all: a 30-second clip of a termination is
     * 15–40MB. The cap now comes from the largest type that would accept the
     * file, so an mp4 gets 50MB and a PDF gets 10MB.
     */
    // Videos: 2 minutes at most (no in-app compression; the 100 MB bucket
    // limit is about 2 minutes of 1080p from a phone).
    const tooLong: File[] = [];
    for (const f of selected) {
      if (!f.type.startsWith('video/')) continue;
      const secs = await videoDurationSeconds(f);
      if (secs != null && secs > VIDEO_MAX_SECONDS + 1) tooLong.push(f);
    }
    if (tooLong.length) {
      toast({
        title:
          tooLong.length === 1 ? 'Video over 2 minutes' : `${tooLong.length} videos over 2 minutes`,
        description: 'Trim to 2 minutes or less, or film it as two clips.',
        variant: 'destructive',
      });
    }
    const sized = selected.filter((f) => !tooLong.includes(f));
    const oversize = sized.filter((f) => f.size > maxBytesFor(f));
    const valid = sized.filter((f) => f.size <= maxBytesFor(f));
    if (oversize.length) {
      const limits = oversize
        .map((f) => `${f.name} (max ${Math.round(maxBytesFor(f) / 1024 / 1024)}MB)`)
        .join(', ');
      toast({
        title: oversize.length === 1 ? 'File too large' : `${oversize.length} files too large`,
        description: `Not added: ${limits}`,
        variant: 'destructive',
      });
    }
    if (!valid.length) {
      if (e.target) e.target.value = '';
      return;
    }

    // ELE-1894: with no signal the file stays on the phone (held in the outbox
    // on Save) and uploads when signal returns. Nothing is tried and failed.
    const noSignal = typeof navigator !== 'undefined' && navigator.onLine === false;
    const newFiles: UploadedFile[] = valid.map((f) => ({
      id: `f-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      file: f,
      previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : '',
      uploading: !noSignal,
      queued: noSignal,
      // Guessed from MIME and filename, corrected by the learner on the tile.
      // An assessor needs to know a witness statement from a snapshot.
      evidenceType: inferCode(f),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    setStep('details');

    // Reset the input so the same file can be selected again later
    if (e.target) e.target.value = '';
    if (noSignal) {
      for (const f of newFiles) void hashOf(f.file);
      return;
    }

    // Upload each file in parallel; failures are surfaced on the chip — a
    // file without a storageUrl must never be saved (a blob: preview URL
    // dies with the session and would leave the evidence permanently broken).
    const results = await Promise.all(
      newFiles.map(async (uf) => {
        const url = await uploadFile(uf.file, uf.id);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uf.id
              ? {
                  ...f,
                  storageUrl: url || undefined,
                  uploading: false,
                  error: url ? undefined : 'Upload failed',
                }
              : f
          )
        );
        return url;
      })
    );

    const failedCount = results.filter((u) => !u).length;
    if (failedCount > 0) {
      haptic.warning();
      toast({
        title: failedCount === 1 ? 'Upload failed' : `${failedCount} uploads failed`,
        description:
          'Nothing is lost. Save now and it sends when your signal is better, or tap Retry.',
        variant: 'destructive',
      });
    }
  };

  /* ─── Upload one file and mark the outcome on its chip ──────────── */
  const uploadAndMark = async (id: string, file: File): Promise<string | null> => {
    const url = await uploadFile(file, id);
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              storageUrl: url || undefined,
              uploading: false,
              error: url ? undefined : 'Upload failed',
            }
          : f
      )
    );
    return url;
  };

  /* ─── Retry a failed upload ──────────────────────────────────────── */
  // Reads via filesRef so it's safe to call from the 'online' listener
  // (which would otherwise close over a stale files array).
  const retryUpload = async (id: string) => {
    const target = filesRef.current.find((f) => f.id === id);
    if (!target || target.uploading) return;
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, uploading: true, progress: 0, error: undefined, queued: false } : f
      )
    );
    const url = await uploadAndMark(id, target.file);
    if (!url) {
      toast({
        title: 'Upload failed again',
        description:
          'Still no luck. Check your signal, or just save: the file is kept on this phone.',
        variant: 'destructive',
      });
    }
  };

  /* ─── Auto-retry failed uploads when signal returns ──────────────── */
  useEffect(() => {
    if (!open) return;
    const onOnline = () => {
      const failed = filesRef.current.filter((f) => (f.error || f.queued) && !f.uploading);
      if (!failed.length) return;
      toast({ title: 'Signal back. Uploading your files.' });
      for (const f of failed) void retryUpload(f.id);
    };
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
    // retryUpload is recreated per render but reads live state via refs —
    // resubscribing on every change would add nothing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* ─── Draft restore / discard (explicit — never silent) ──────────── */
  const handleResumeDraft = () => {
    const d = pendingDraft;
    if (!d) return;
    haptic.light();
    setPendingDraft(null);

    // Spread defensively — a draft from an older/newer app version may
    // miss fields or carry unknown ones; unknowns are simply ignored.
    const f = d.fields;
    const str = (v: unknown): string => (typeof v === 'string' ? v : '');
    setTitle(str(f.title));
    setDescription(str(f.description));
    setVoiceText(str(f.voiceText));
    setReflectionText(str(f.reflectionText));
    setSelectedACs(
      Array.isArray(f.selectedACs)
        ? f.selectedACs.filter((x): x is string => typeof x === 'string')
        : []
    );
    setWorkDate(str(f.workDate) || todayISO());
    setSiteRef(str(f.siteRef));
    setRole(str(f.role));
    const et = str(f.evidenceType);
    setEvidenceType(EVIDENCE_TYPES.some((t) => t.v === et) ? (et as EvidenceType) : '');
    setWitnessName(str(f.witnessName));
    setWitnessRole(str(f.witnessRole));
    setWitnessDate(str(f.witnessDate));
    setAuthenticityConfirmed(f.authenticityConfirmed === true);
    aiRunsRef.current =
      f.aiRuns && typeof f.aiRuns === 'object'
        ? (f.aiRuns as { star?: AiRun; assist?: AiRun })
        : {};

    // Rebuild real File objects from the stored blobs — last session's
    // blob: preview URLs are dead, so regenerate them fresh. Files that
    // already reached storage keep their storageUrl (no re-upload); the
    // rest queue for upload now.
    const restored: UploadedFile[] = d.files.map((df) => {
      const file = new File([df.blob], df.name, { type: df.type });
      return {
        id: `f-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
        storageUrl: df.storageUrl,
        uploading: !df.storageUrl,
      };
    });
    // Restore REPLACES the file list — release any previews it displaces.
    for (const f of filesRef.current) {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    }
    setFiles(restored);
    setStep('details');
    for (const uf of restored) {
      if (!uf.storageUrl) void uploadAndMark(uf.id, uf.file);
    }
  };

  const handleDiscardDraft = () => {
    haptic.light();
    setPendingDraft(null);
    if (user?.id) clearDraftNow(user.id);
  };

  /* ─── Close (NOT discard) — flush the draft, then reset local state.
        IDB keeps the backup until a successful save or explicit discard. */
  const handleSheetClose = () => {
    if (user?.id && draftHasContent && !seededUntouched()) {
      void saveDraft(user.id, draftSnapshot());
    }
    resetForm();
  };

  /* ─── Run streaming analysis ─────────────────────────────────────── */
  const handleAnalyse = async () => {
    if (!qualificationCode) {
      toast({
        title: 'Set your qualification first',
        description: 'AI grounds suggestions in your course ACs.',
        variant: 'destructive',
      });
      return;
    }
    const filesForStream = files
      .filter((f) => f.storageUrl)
      .map((f) => ({ id: f.id, url: f.storageUrl!, type: f.file.type }));
    if (!filesForStream.length && !voiceText.trim()) {
      toast({
        title: 'Nothing to analyse',
        description: 'Upload a file or speak a description first.',
        variant: 'destructive',
      });
      return;
    }

    haptic.light();
    setMeta(null);
    setReflection(null);
    // ELE-2048: what the reflective-account drafter is given; its output is added as it arrives.
    const starRun: AiRun = {
      tool: 'voice_to_star',
      fn: 'portfolio-capture-stream',
      model: 'gpt-5.4-mini-2026-03-17',
      at: new Date().toISOString(),
      prompt: {
        qualification: qualificationCode,
        transcript: voiceText.trim() || undefined,
        context: description.trim() || undefined,
        files: filesForStream.map((f) => ({ type: f.type })),
      },
      output: {},
    };
    aiRunsRef.current.star = starRun;

    await startStream(
      {
        qualificationCode,
        files: filesForStream,
        transcript: voiceText.trim() || undefined,
        context: description.trim() || undefined,
      },
      {
        onMeta: (m) => setMeta(m),
        onFileResult: (fileId, analysis) => {
          setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, analysis } : f)));
          // ELE-1864: nothing is auto-claimed. AI matches stay suggestions
          // (saved as source='ai_suggested') until the learner taps one.
          // Auto-fill title from first analysis
          setTitle((t) => t || analysis.suggestedTitle?.slice(0, 100) || '');
          if (analysis.suggestedTitle && starRun.output) {
            const titles = (starRun.output.titles as string[] | undefined) ?? [];
            starRun.output.titles = [...titles, analysis.suggestedTitle.slice(0, 100)];
          }
        },
        onReflection: (r) => {
          setReflection(r);
          if (starRun.output) starRun.output.reflection = r;
          setTitle((t) => t || r.suggestedTitle?.slice(0, 100) || '');
          // Pull description from the action+result if empty
          setDescription((d) => d || `${r.action}\n\n${r.result}`.slice(0, 500));
          // Note: we deliberately do NOT auto-claim the reflection's suggested
          // ACs. AC claims come only from the per-photo matches shown in the
          // suggested-AC list, so an apprentice can always see and untoggle
          // every criterion they're claiming.
        },

        onError: (msg, fileId) => {
          // Analysis failing is NOT an upload failure — the file is already
          // safely in storage. Setting `error` here used to show
          // "Failed — retry", whose retry re-uploaded a duplicate object.
          if (fileId) {
            setFiles((prev) =>
              prev.map((f) => (f.id === fileId ? { ...f, analysisError: msg } : f))
            );
          }
        },
      }
    );
  };

  /* ─── Save ──────────────────────────────────────────────────────── */
  /*
   * ELE-1894: every save goes through the on-phone outbox. The item and the
   * raw file blobs are stored first (no signal needed), then sent straight
   * away when there is signal. If sending fails, or there is no signal, the
   * capture stays queued and the learner sees it waiting; nothing is lost.
   * ELE-1916: the row is created by createPortfolioItem with this preset's
   * category, status draft and the capture source.
   */
  const handleSave = async () => {
    if (isSaving) return;
    if (!title.trim()) {
      haptic.warning();
      toast({
        title: 'Title required',
        description: 'Please enter a title for this evidence.',
        variant: 'destructive',
      });
      return;
    }
    if (!user?.id) {
      toast({ title: 'Sign in to save evidence', variant: 'destructive' });
      return;
    }

    // With signal, let an upload in progress finish (its progress is shown).
    // Without signal there is nothing to wait for: the outbox keeps the file.
    if (online && files.some((f) => f.uploading)) {
      haptic.warning();
      toast({
        title: 'Files still uploading',
        description: 'Give it a second, then save.',
      });
      return;
    }

    // Soft assessor-ready nudge — shown once. Never blocks; "Save anyway"
    // sets the ack and re-enters this function.
    if (!readiness.ready && !readinessAck.current) {
      haptic.light();
      setShowReadinessNudge(true);
      return;
    }

    setIsSaving(true);
    try {
      const itemId = crypto.randomUUID();
      const hashes = await Promise.all(files.map((f) => hashOf(f.file)));
      // When (the photo's own time, else now) and, if allowed, roughly where.
      const capture = await buildCaptureStamp(
        files.map((f) => f.file),
        placeOn ? place : null
      );
      const claimed = selectedACs
        .map(parseAcRef)
        .filter((x): x is { unit_code: string; ac_code: string } => !!x);
      const isClaimed = (u: string, a: string) =>
        claimed.some((c) => c.unit_code === u && c.ac_code === a);

      // Everything the learner did not tick is kept as a suggestion only.
      const suggestedMap = new Map<string, OutboxSuggestion>();
      for (const m of allMatches) {
        if (!m.grounded || isClaimed(m.unitCode, m.acCode)) continue;
        suggestedMap.set(`${m.unitCode}|${m.acCode}`, {
          unit_code: m.unitCode,
          ac_code: m.acCode,
          confidence: Math.round(m.confidence),
          reason: m.reasons[0] ?? null,
        });
      }
      for (const c of assistant.result?.criteria ?? []) {
        if (isClaimed(c.unit_code, c.ac_code)) continue;
        const k = `${c.unit_code}|${c.ac_code}`;
        if (!suggestedMap.has(k))
          suggestedMap.set(k, {
            unit_code: c.unit_code,
            ac_code: c.ac_code,
            reason: c.reason || null,
          });
      }
      for (const ref of seedSuggested) {
        const r = parseAcRef(ref);
        if (!r || isClaimed(r.unit_code, r.ac_code)) continue;
        const k = `${r.unit_code}|${r.ac_code}`;
        if (!suggestedMap.has(k))
          suggestedMap.set(k, {
            ...r,
            reason: seed?.briefSource ? `Suggested ${seed.briefSource}` : 'Suggested',
          });
      }

      const witness =
        witnessName.trim() || witnessRole.trim() || witnessDate
          ? {
              name: witnessName.trim() || undefined,
              role: witnessRole.trim() || undefined,
              date: witnessDate || undefined,
            }
          : undefined;

      const presetKey: CapturePreset =
        seed?.preset ?? (work?.kind === 'test_results' ? 'test_sheet' : 'photo');
      const source: CaptureSource = seed?.source ?? (work ? 'work' : presetKey);
      const category: PortfolioCategory = {
        id: PRESETS[presetKey].category.id,
        name: PRESETS[presetKey].category.name,
        description: '',
        icon: 'folder',
        color: 'gray',
        requiredEntries: 0,
        completedEntries: 0,
      };
      const a = assistant.result;
      const savedDescription = (description.trim() ? description : voiceText).trim();
      // ELE-2048: what the AI wrote that is still in the evidence, and what it was given.
      const runs = aiRunsRef.current;
      const starOut = (runs.star?.output ?? {}) as {
        reflection?: ReflectionDraft;
        titles?: string[];
      };
      const aiRunList: AiRun[] = [];
      if (runs.star && (starOut.reflection || starOut.titles?.length)) aiRunList.push(runs.star);
      const assistOut = (runs.assist?.output ?? null) as {
        reflection?: string;
        criteria?: string[];
      } | null;
      if (runs.assist && assistOut) aiRunList.push(runs.assist);
      const aiFromCriteria = new Set([
        ...allMatches.map((m) => `${m.unitCode} AC ${m.acCode}`),
        ...(assistOut?.criteria ?? []),
      ]);
      const aiUse = buildAiUseRecord({
        runs: aiRunList,
        candidates: [
          ...(starOut.titles ?? []).map((t) => ({
            field: 'title' as const,
            from: 'photo_reader' as const,
            text: t,
          })),
          ...(starOut.reflection
            ? [
                {
                  field: 'title' as const,
                  from: 'voice_to_star' as const,
                  text: starOut.reflection.suggestedTitle ?? '',
                },
                {
                  field: 'description' as const,
                  from: 'voice_to_star' as const,
                  text: `${starOut.reflection.action}\n\n${starOut.reflection.result}`.slice(
                    0,
                    500
                  ),
                },
                {
                  field: 'reflection' as const,
                  from: 'voice_to_star' as const,
                  text: formatReflection(starOut.reflection),
                },
              ]
            : []),
          ...(assistOut?.reflection
            ? [
                {
                  field: 'reflection' as const,
                  from: 'capture_assistant' as const,
                  text: assistOut.reflection,
                },
              ]
            : []),
        ],
        final: {
          title: title.trim(),
          description: savedDescription,
          reflection: reflectionText.trim(),
        },
        criteriaFromAi: selectedACs.filter((ref) => aiFromCriteria.has(ref)),
      });
      const entry = {
        title: title.trim(),
        // "Describe the job" is the field most learners type into; keep it
        // when the description is empty.
        description: savedDescription,
        category,
        skills: [...selectedACs],
        reflection: reflectionText.trim(),
        assessmentCriteria: [...selectedACs],
        status: 'draft' as const,
        tags: [],
        learningOutcomes: [],
        selfAssessment: 0, // 1–5 rating; 0 = not self-rated at capture
        timeSpent: 0,
        awardingBodyStandards: [],
        metadata: {
          workDate: workDate || undefined,
          siteRef: siteRef.trim() || undefined,
          role: role.trim() || undefined,
          evidenceType: evidenceType || undefined,
          witness,
          authenticityConfirmed: authenticityConfirmed || undefined,
          // ELE-2048: moved to portfolio_items.ai_use / ai_assisted by the database.
          ...(aiUse ? { ai_use: aiUse } : {}),
          // ELE-1927: what the assistant suggested, labelled as such. Advice
          // only: no claim, no coverage, nothing an assessor relies on.
          ...(a
            ? {
                assistant: {
                  source: 'ai_suggested',
                  model: a.model,
                  at: new Date().toISOString(),
                  reflectionDraftUsed:
                    !!a.reflection && reflectionText.trim() === a.reflection.trim(),
                  testSheetAsked: a.testSheet.needed,
                  nextJob: a.nextJob
                    ? {
                        title: a.nextJob.title,
                        covers: a.nextJob.covers.map((c) => `${c.unit_code} AC ${c.ac_code}`),
                      }
                    : null,
                },
              }
            : {}),
        },
      };

      const queued = await enqueueCapture({
        id: itemId,
        uid: user!.id,
        entry: entry as never,
        source,
        dateCompleted: undefined,
        capture,
        claimed,
        suggested: Array.from(suggestedMap.values()),
        files: files.map((f, i) => ({
          localId: f.id,
          name: f.file.name,
          type: f.file.type,
          size: f.file.size,
          blob: f.file,
          storageUrl: f.storageUrl,
          sha256: hashes[i],
          evidenceType: f.evidenceType ?? 'photo',
        })),
      });

      let savedId: string | null = null;
      let waiting = false;
      let criteriaWarning: string | undefined;
      if (queued) {
        const res = await sendOutboxItemNow(user!.id, itemId);
        if (res.ok) {
          savedId = res.item.id;
          criteriaWarning = res.item.criteriaWarning;
        } else waiting = true;
      } else {
        // No IndexedDB on this device (private browsing): save directly, which
        // needs every file already in storage.
        if (files.some((f) => !f.storageUrl)) {
          throw new Error('A file has not uploaded and this device cannot keep it offline.');
        }
        const res = await createPortfolioItem(
          user!.id,
          {
            ...entry,
            evidenceFiles: files.map((f, i) => ({
              id: f.id,
              name: f.file.name,
              type: f.file.type,
              size: f.file.size,
              url: f.storageUrl!,
              uploadDate: new Date().toISOString(),
              ...(hashes[i] ? { sha256: hashes[i]! } : {}),
              evidenceType: f.evidenceType ?? 'photo',
            })),
          } as never,
          { id: itemId, source, capture }
        );
        if (!res.ok) throw new Error(res.error);
        if (claimed.length || suggestedMap.size) {
          const crit = await setItemCriteria(itemId, claimed, Array.from(suggestedMap.values()));
          if (crit.rejected.length) {
            criteriaWarning = rejectedClaimsText(crit.rejected, crit.qualification);
          }
        }
        savedId = itemId;
      }

      // It is safe now (on the server, or held in the outbox): drop the draft.
      if (user?.id) clearDraftNow(user.id);
      setPendingDraft(null);
      haptic.success();
      if (criteriaWarning) {
        toast({
          title: 'Some criteria not claimed',
          description: criteriaWarning,
          variant: 'destructive',
        });
      }

      if (waiting) {
        toast({
          title: 'Saved on this phone',
          description: online
            ? "Couldn't send just now. It is waiting to sync and sends by itself."
            : 'No signal. It is waiting to sync and sends when you have signal.',
        });
      } else if (savedId) {
        notifyPortfolioChanged();
        logActivity({
          activityType: 'portfolio_evidence',
          sourceId: savedId,
          sourceTitle: `Portfolio: ${entry.title}`,
          metadata: { category: category.id, status: 'draft', source },
        });
        if (selectedACs.length > 0 && user?.id) {
          const uid = user.id;
          const refs = [...selectedACs];
          void buildCoverageMoment(uid, qualificationCode, refs).then((moment) => {
            toast(
              moment
                ? { title: 'Added to portfolio', description: moment }
                : { title: 'Evidence saved', description: 'Added to portfolio' }
            );
          });
        } else {
          toast({ title: 'Evidence saved', description: 'Added to portfolio' });
        }
      }
      resetForm();
      onComplete(savedId);
    } catch (error) {
      console.error('Save error:', error);
      haptic.error();
      // Keep the sheet open with the form intact so nothing is lost.
      toast({
        title: 'Could not save, nothing lost',
        description:
          error instanceof Error && error.message
            ? error.message
            : "We couldn't save that just now. Tap Save again.",
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  /* ─── AC selection helpers ───────────────────────────────────────── */
  const toggleAC = (ref: string) => {
    haptic.light();
    setSelectedACs((prev) => (prev.includes(ref) ? prev.filter((r) => r !== ref) : [...prev, ref]));
  };

  const removeFile = (id: string) => {
    haptic.light();
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  };

  const filesUploadingCount = files.filter((f) => f.uploading).length;
  const analysedCount = files.filter((f) => f.analysis).length;
  const canAnalyse = !streaming && (files.some((f) => f.storageUrl) || voiceText.trim().length > 0);

  /* ─── Render ─────────────────────────────────────────────────────── */
  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={(v) => {
          if (!v) handleSheetClose();
          onOpenChange(v);
        }}
        width="wide"
        eyebrow={`Capture · ${presetCfg.label}`}
        title={
          step === 'capture' || (seed?.preset && files.length === 0)
            ? presetCfg.title
            : 'Review and tag'
        }
        description={
          step === 'capture'
            ? seed?.preset
              ? presetCfg.description
              : 'Take photos and describe the job. We suggest the criteria and draft your reflective account.'
            : !online
              ? 'No signal. Save now and it syncs when you have signal.'
              : seed?.preset && files.length === 0 && !meta
                ? presetCfg.description
                : meta
                  ? `Reading your files: ${analysedCount} of ${meta.totalFiles} ready.`
                  : 'Add a few details, then tap Read it and suggest criteria.'
        }
        headerTrailing={
          draftSavedAt && draftHasContent ? (
            <span className="mr-8 text-[12.5px] font-medium tabular-nums text-green-400">
              Draft saved
            </span>
          ) : undefined
        }
        bodyClassName="space-y-0"
        footer={
          step === 'details' ? (
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setStep('capture')}
                className={buttonSecondaryCn}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSave}
                className={cn(buttonPrimaryCn, 'inline-flex items-center justify-center gap-2')}
              >
                <Check className="h-4 w-4" />
                Save evidence
              </button>
            </div>
          ) : undefined
        }
      >
        {/* ELE-1894: what is waiting to sync, and whether there is signal */}
        <CaptureOutboxStrip className="mb-3" />
        {!online && (
          <p
            role="status"
            data-testid="capture-offline"
            className="mb-3 rounded-xl border border-white/[0.14] px-3.5 py-3 text-[13px] leading-snug text-white"
          >
            <span className="font-semibold">No signal.</span> Keep capturing. Photos and notes are
            kept on this phone and sync by themselves when you are back in signal.
          </p>
        )}

        {/* Unfinished-entry banner — restoring is always explicit */}
        {pendingDraft && step === 'capture' && (
          <div
            className={cn(
              'mt-2 space-y-3 rounded-2xl border border-elec-yellow/35 p-4',
              CARD_SURFACE
            )}
          >
            <div className="space-y-1">
              <Eyebrow>Unfinished entry</Eyebrow>
              <p className="text-[13px] text-white leading-snug">
                From {relativeTime(pendingDraft.savedAt)}
                {pendingDraft.files.length > 0 &&
                  `, ${pendingDraft.files.length} ${
                    pendingDraft.files.length === 1 ? 'photo' : 'photos'
                  }`}
                . Pick up where you left off?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDiscardDraft}
                className={cn(buttonSecondaryCn, 'h-11 text-[13px]')}
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleResumeDraft}
                className={cn(buttonPrimaryCn, 'h-11 text-[13px]')}
              >
                Resume
              </button>
            </div>
          </div>
        )}

        {/* File inputs live outside the steps so "Add more files" and the
            assistant's "Add test results" work from the details step too. */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptAttr}
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Step 1: Capture */}
        {step === 'capture' && (
          <div className="space-y-5 py-2">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-[14px] font-semibold transition-colors touch-manipulation border-elec-yellow bg-elec-yellow text-black hover:opacity-90"
              >
                <Camera className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                Camera
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-[14px] font-semibold transition-colors touch-manipulation border-white/[0.14] bg-white/[0.04] text-white hover:border-white/[0.3] active:bg-white/[0.08]"
              >
                <Upload className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                Upload files
              </button>
            </div>

            <button
              onClick={() => setStep('details')}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-[14px] font-semibold transition-colors touch-manipulation border-white/[0.14] bg-white/[0.04] text-white hover:border-white/[0.3] active:bg-white/[0.08]"
            >
              <Mic className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden />
              Voice only: describe a job without files
            </button>

            {/* ELE-1906: the learner's own electrical work, in one tap */}
            <div className="space-y-2.5">
              <div>
                <Eyebrow>From your work</Eyebrow>
                <p className="mt-1 text-[12.5px] leading-snug text-white">
                  Use a certificate, test results or a calculation you did in Elec-Mate, or a photo
                  of a paper schedule. We make a readable copy and suggest the criteria it could
                  cover.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {(
                  [
                    { kind: 'certificate', label: 'Certificate', icon: FileCheck2 },
                    { kind: 'test_results', label: 'Test results', icon: ClipboardList },
                    { kind: 'calculation', label: 'Calculation', icon: Calculator },
                    { kind: 'paper', label: 'Paper schedule', icon: ScanLine },
                  ] as const
                ).map((o) => (
                  <button
                    key={o.kind}
                    type="button"
                    onClick={() =>
                      o.kind === 'paper'
                        ? setPaperOpen(true)
                        : setWorkPicker({ open: true, kind: o.kind })
                    }
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-[14px] font-semibold transition-colors touch-manipulation border-white/[0.14] bg-white/[0.04] text-white hover:border-white/[0.3] active:bg-white/[0.08]"
                  >
                    <o.icon className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden />
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[12px] text-white text-center">
              Photos and documents up to 10MB · video up to 2 minutes · we work out what kind of
              evidence each file is
            </p>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 'details' && (
          <div className="space-y-6 py-2">
            {/* ELE-1906: from the learner's own work */}
            {(workLoading || workError) && !work && (
              <div
                className={cn(
                  'flex items-center gap-3 rounded-2xl border p-4',
                  workError ? 'border-orange-500/30 bg-orange-500/10' : 'border-elec-yellow/35',
                  !workError && CARD_SURFACE
                )}
              >
                {workError ? (
                  <p className="text-[13px] text-orange-300">{workError}</p>
                ) : (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                    <p className="text-[13px] text-white">
                      Making a readable copy and matching it to your course…
                    </p>
                  </>
                )}
              </div>
            )}
            {work && (
              <div
                className={cn(
                  'space-y-3 rounded-2xl border border-elec-yellow/35 p-4',
                  CARD_SURFACE
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Eyebrow>
                      From your work ·{' '}
                      {work.kind === 'calculation'
                        ? 'calculation'
                        : work.kind === 'test_results'
                          ? 'test results'
                          : 'certificate'}
                    </Eyebrow>
                    <p className="mt-1 text-[13px] leading-snug text-white">
                      {work.kind === 'calculation'
                        ? 'The calculation PDF is attached.'
                        : work.fromPaper
                          ? 'A PDF of the readings you checked is attached, with your photo of the paper schedule.'
                          : work.extraFiles?.length
                            ? 'A PDF summary with every test result is attached, and the full issued certificate, which shows the client’s name and address.'
                            : 'A PDF summary with every test result is attached. Client names and full addresses are left out.'}{' '}
                      Tick only the criteria this work really shows. They are saved as your claim
                      and your assessor decides.
                    </p>
                  </div>
                  {work.suggestions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        haptic.light();
                        const refs = work.suggestions.map((m) => `${m.unitCode} AC ${m.acCode}`);
                        const allOn = refs.every((r) => selectedACs.includes(r));
                        setSelectedACs((prev) =>
                          allOn
                            ? prev.filter((r) => !refs.includes(r))
                            : Array.from(new Set([...prev, ...refs]))
                        );
                      }}
                      className={cn(chipBase, chipOff, 'inline-flex shrink-0 items-center px-3.5')}
                    >
                      {work.suggestions.every((m) =>
                        selectedACs.includes(`${m.unitCode} AC ${m.acCode}`)
                      )
                        ? 'Untick all'
                        : `Claim all ${work.suggestions.length}`}
                    </button>
                  )}
                </div>
                {work.kind === 'calculation' && calcCheck && (
                  <div className="rounded-xl border border-white/[0.12] px-3.5 py-3">
                    {calcCheck === 'checking' ? (
                      <p className="flex items-center gap-2 text-[12.5px] text-white">
                        <Loader2
                          className="h-3.5 w-3.5 animate-spin text-elec-yellow"
                          aria-hidden
                        />
                        Checking against BS 7671 for your assessor
                      </p>
                    ) : (
                      <>
                        <p className="text-[12.5px] font-semibold text-white">
                          {calcCheck.verdict === 'query'
                            ? 'BS 7671 check: one thing to look at'
                            : calcCheck.verdict === 'consistent'
                              ? 'BS 7671 check'
                              : 'BS 7671 check: not checked'}
                        </p>
                        <p className="mt-1 text-[12.5px] leading-snug text-white">
                          {calcCheck.note}
                        </p>
                        {calcCheck.file && (
                          <p className="mt-1 text-[12.5px] text-white">
                            Attached for your assessor as a short PDF.
                          </p>
                        )}
                      </>
                    )}
                  </div>
                )}
                {work.suggestions.length === 0 ? (
                  <p className="text-[12.5px] leading-snug text-white">
                    {qualificationCode
                      ? 'Nothing on your course matched closely enough to suggest. Tag the criteria yourself from the evidence once it is saved.'
                      : 'Choose your course first and we can suggest the criteria this covers. You can still save it now.'}
                  </p>
                ) : (
                  <ul className="grid gap-1.5 lg:grid-cols-2">
                    {work.suggestions.map((m) => {
                      const ref = `${m.unitCode} AC ${m.acCode}`;
                      const selected = selectedACs.includes(ref);
                      return (
                        <li key={ref}>
                          <button
                            type="button"
                            aria-pressed={selected}
                            onClick={() => toggleAC(ref)}
                            className={cn(
                              'flex h-full w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors touch-manipulation',
                              CARD_SURFACE,
                              selected ? 'border-elec-yellow' : 'border-white/[0.12]'
                            )}
                          >
                            <span
                              className={cn(
                                'mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-2',
                                selected
                                  ? 'border-elec-yellow bg-elec-yellow'
                                  : 'border-white/40 bg-transparent'
                              )}
                            />
                            <span className="min-w-0 flex-1 space-y-0.5">
                              <span className="flex flex-wrap items-baseline gap-2">
                                <span className="font-mono text-[12px] text-elec-yellow">
                                  {m.unitCode} AC {m.acCode}
                                </span>
                                <span className="text-[13px] text-white">
                                  {selected
                                    ? 'Claimed by you'
                                    : m.practical
                                      ? 'Shows you doing it'
                                      : 'Related knowledge'}
                                </span>
                              </span>
                              <span
                                className="block text-[13px] leading-snug text-white line-clamp-4"
                                title={m.acText}
                              >
                                {m.acText}
                              </span>
                              {m.reason && (
                                <span className="block text-[12.5px] leading-snug text-white">
                                  {m.reason}
                                </span>
                              )}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
            {/* Capture brief — seeded from a job idea */}
            {(briefItems.length > 0 || briefACs.length > 0) && (
              <div
                className={cn(
                  'space-y-3 rounded-2xl border border-elec-yellow/35 p-4',
                  CARD_SURFACE
                )}
              >
                <Eyebrow>Capture brief · {seed?.briefSource ?? 'from your job idea'}</Eyebrow>
                {briefACs.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-[12px] text-white">
                      Criteria this covers. Tap to remove any
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {briefACs.map((ref, refIdx) => {
                        const on = selectedACs.includes(ref);
                        return (
                          <button
                            key={`${ref}-${refIdx}`}
                            type="button"
                            onClick={() => toggleAC(ref)}
                            className={cn(
                              chipBase,
                              'inline-flex items-center px-3 font-mono text-[12px]',
                              on ? chipOn : cn(chipOff, 'line-through')
                            )}
                          >
                            {ref.replace(' AC ', ' ')}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {briefItems.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-[12px] text-white">Evidence to get on site</p>
                    <ul className="space-y-1.5">
                      {briefItems.map((c, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[12.5px] text-white leading-snug"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-1.5 shrink-0" />
                          <span>
                            {c.label}
                            {c.required && <span className="text-rose-300"> · required</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* File grid */}
            {files.length > 0 && (
              <div className="space-y-2">
                <Eyebrow>Files · {files.length}</Eyebrow>
                {/*
                      Fixed-height previews, not aspect-square.
                      A square tile in a 3-column grid is ~620px tall on a
                      full-width desktop sheet — so a PDF, which has no
                      thumbnail to show, rendered as 620px of black with one
                      small icon floating in the middle of it. A preview only
                      needs to be big enough to recognise.
                    */}
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                  {files.map((f) => (
                    <div
                      key={f.id}
                      className={cn(
                        'relative overflow-hidden rounded-xl border border-elec-yellow/35',
                        CARD_SURFACE
                      )}
                    >
                      {f.previewUrl ? (
                        <div className="h-28 sm:h-32">
                          <img src={f.previewUrl} alt="" className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-28 flex-col items-center justify-center gap-1.5 bg-white/[0.03] sm:h-32">
                          <FileCheck className="h-7 w-7 text-white" />
                          {/* Say what it is — the icon alone doesn't. */}
                          <span className="text-[13px] font-medium text-white">
                            {(f.file.name.split('.').pop() || 'file').slice(0, 4)}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => removeFile(f.id)}
                        aria-label={`Remove ${f.file.name}`}
                        className="absolute right-1.5 top-1.5 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-white transition-colors touch-manipulation hover:bg-black/85"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      {/*
                            What KIND of evidence this is.
                            Guessed from the MIME type and the filename, but the
                            learner has the last word — an assessor reading the
                            portfolio needs to know a witness statement from a
                            photo of a board, and `requires_witness` cannot be
                            enforced on an untyped file.
                          */}
                      <div className="border-t border-white/[0.10] px-2 py-1.5">
                        <label className="sr-only" htmlFor={`evtype-${f.id}`}>
                          Evidence type for {f.file.name}
                        </label>
                        <select
                          id={`evtype-${f.id}`}
                          value={f.evidenceType ?? 'photo'}
                          onChange={(e) =>
                            setFiles((prev) =>
                              prev.map((x) =>
                                x.id === f.id
                                  ? { ...x, evidenceType: e.target.value as EvidenceTypeCode }
                                  : x
                              )
                            )
                          }
                          className={cn(selectTriggerCn, 'w-full [color-scheme:dark]')}
                        >
                          {(evidenceTypes.length > 0
                            ? evidenceTypes
                            : [{ code: 'photo', name: 'Photograph' }]
                          ).map((t) => (
                            <option key={t.code} value={t.code}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="px-2 py-1.5 space-y-0.5">
                        <p className="text-[12px] text-white truncate" title={f.file.name}>
                          {f.file.name}
                        </p>
                        <div className="flex items-center gap-1.5">
                          {f.uploading && (
                            <span className="text-[12px] text-white flex items-center gap-1">
                              <Loader2 className="h-2.5 w-2.5 animate-spin" />
                              Uploading
                              {typeof f.progress === 'number' && (
                                <span className="tabular-nums">
                                  {Math.round(f.progress * 100)}%
                                </span>
                              )}
                            </span>
                          )}
                          {f.analysis && (
                            <span
                              className={cn(
                                'text-[12px] font-mono px-1.5 py-0 rounded-md border',
                                GRADE_TONE[f.analysis.qualityGrade]
                              )}
                            >
                              {f.analysis.qualityGrade} · {f.analysis.qualityScore}
                            </span>
                          )}
                          {f.error && (
                            <button
                              onClick={() => retryUpload(f.id)}
                              className="text-[12px] text-red-300 underline underline-offset-2 touch-manipulation"
                              aria-label={`Retry upload of ${f.file.name}`}
                            >
                              Not sent, retry
                            </button>
                          )}
                          {f.queued && !f.uploading && (
                            <span className="text-[12px] font-medium text-white">
                              On this phone
                            </span>
                          )}
                          {!f.error && f.analysisError && (
                            <span className="text-[12px] text-amber-200/80">
                              Stored. AI check didn't run
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full text-center py-2 rounded-lg border border-dashed border-white/[0.08] text-[12px] text-white hover:bg-white/[0.04] transition-colors touch-manipulation"
                >
                  + Add more files
                </button>
              </div>
            )}

            {/* Voice transcript */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between gap-3">
                <Eyebrow>Describe the job</Eyebrow>
                <span className="text-[12px] text-white font-mono">{voiceText.length} chars</span>
              </div>
              <Textarea
                value={voiceText}
                onChange={(e) => setVoiceText(e.target.value)}
                placeholder="Speak or type: what was the job, what did you do, what did you measure, what did you learn?"
                rows={4}
                className={AREA_CLS}
              />
              {speechSupported && (
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  disabled={streaming}
                  className={cn(
                    chipBase,
                    'inline-flex items-center gap-2 px-3.5',
                    isListening ? 'border-red-500/40 bg-red-500/[0.06] text-red-300' : chipOff
                  )}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-3.5 w-3.5" />
                      Stop listening
                    </>
                  ) : (
                    <>
                      <Mic className="h-3.5 w-3.5" />
                      Tap to speak
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Analyse trigger / progress */}
            {!online && !streaming && analysedCount === 0 && !reflection && (
              <p className="text-[13px] leading-snug text-white">
                Suggestions need signal. Save now and ask for them later from the evidence, or wait
                until you are back in signal.
              </p>
            )}
            {online && !streaming && analysedCount === 0 && !reflection && (
              <Button
                onClick={handleAnalyse}
                disabled={!canAnalyse || filesUploadingCount > 0}
                className={cn(
                  buttonPrimaryCn,
                  'inline-flex w-full items-center justify-center gap-2'
                )}
              >
                {filesUploadingCount > 0 ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading {filesUploadingCount} {filesUploadingCount === 1 ? 'file' : 'files'}…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Read it and suggest criteria
                    <UsesAi
                      className={
                        canAnalyse && filesUploadingCount === 0
                          ? 'border-black/30 text-black [&_svg]:text-black'
                          : undefined
                      }
                    />
                  </>
                )}
              </Button>
            )}

            {/* Streaming progress */}
            {(streaming || meta) && (
              <div
                className={cn(
                  'space-y-3 rounded-2xl border border-elec-yellow/35 p-4',
                  CARD_SURFACE
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <Eyebrow>
                    {streaming ? 'Analysing · BS 7671 grounded' : 'Analysis complete'}
                  </Eyebrow>
                  <span className="text-[12px] font-mono text-white tabular-nums">
                    {analysedCount} / {meta?.totalFiles || files.length} files
                    {meta?.hasTranscript ? ` · ${reflection ? '✓' : '·'} reflection` : ''}
                  </span>
                </div>
                <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-elec-yellow transition-all duration-300"
                    style={{
                      width: `${
                        meta && meta.totalTasks > 0
                          ? ((analysedCount + (reflection ? 1 : 0)) / meta.totalTasks) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                {meta && meta.regNumbers.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[13px] text-white">Reg sources</span>
                    {/* reg numbers can repeat across files — index the key */}
                    {meta.regNumbers.slice(0, 6).map((r, rIdx) => (
                      <span
                        key={`${r}-${rIdx}`}
                        className="rounded-md border border-elec-yellow/50 px-1.5 py-0 font-mono text-[12px] text-elec-yellow"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ELE-1927: the on-site assistant. Suggestions only, marked as AI. */}
            <CaptureAssistantPanel
              assist={assistView}
              loading={assistant.loading}
              error={assistant.error}
              selected={selectedACs}
              onToggle={toggleAC}
              reflectionText={reflectionText}
              onUseReflection={(t) => {
                haptic.light();
                setReflectionText(t);
              }}
              onAddTestSheet={() => setWorkPicker({ open: true, kind: 'test_results' })}
              onRetry={runAssistant}
            />

            {/* Suggested by whoever opened the sheet (the notebook): never ticked for the learner */}
            {seedSuggested.length > 0 && (
              <div className="space-y-2" data-testid="seed-suggested">
                <Eyebrow>Suggested criteria · {seed?.briefSource ?? 'suggested'}</Eyebrow>
                <p className="text-[12px] text-white">
                  Suggested only. Tap the ones this evidence really shows to claim them.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {seedSuggested.map((ref) => {
                    const r = parseAcRef(ref);
                    const key = r ? `${r.unit_code} AC ${r.ac_code}` : ref;
                    const on = selectedACs.includes(key);
                    return (
                      <button
                        key={ref}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleAC(key)}
                        className={cn(
                          'inline-flex h-11 items-center gap-1.5 rounded-xl border px-3 font-mono text-[12px] text-white touch-manipulation',
                          on ? 'border-elec-yellow' : 'border-white/[0.18]'
                        )}
                      >
                        {on && <Check className="h-3.5 w-3.5 text-elec-yellow" aria-hidden />}
                        {key}
                        <span className="font-sans text-[13px]">
                          {on ? 'Claimed' : 'Suggested'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reflective account: always the learner's own text */}
            <div className="space-y-2">
              <Eyebrow>
                Your reflective account{preset === 'reflection' ? '' : ' (optional)'}
              </Eyebrow>
              <Textarea
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                rows={preset === 'reflection' || preset === 'diary_entry' ? 8 : 5}
                placeholder="What the job was, what you did yourself, what you checked, what you learned."
                className={AREA_CLS}
                data-testid="capture-reflection"
              />
              <p className="text-[12px] text-white">
                In your own words. Assessors look for a first-hand account.
              </p>
            </div>

            {/* Aggregated AC matches */}
            {allMatches.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <Eyebrow>Suggested criteria · {allMatches.length}</Eyebrow>
                    <UsesAi />
                  </span>
                  <span className="text-[12px] text-white">
                    Suggestions only. Tap the ones this evidence really shows to claim them.
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {/* same AC can be matched by two files — index the key */}
                  {allMatches.map((m, i) => {
                    const ref = `${m.unitCode} AC ${m.acCode}`;
                    const selected = selectedACs.includes(ref);
                    const recommended = m.confidence >= 80;
                    return (
                      <li key={`${ref}-${i}`}>
                        <button
                          type="button"
                          onClick={() => toggleAC(ref)}
                          className={cn(
                            'w-full flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-colors touch-manipulation',
                            CARD_SURFACE,
                            selected ? 'border-elec-yellow' : 'border-elec-yellow/35'
                          )}
                        >
                          <span
                            className={cn(
                              'h-3.5 w-3.5 rounded-full border-2 flex-shrink-0 mt-0.5',
                              selected
                                ? 'bg-elec-yellow border-elec-yellow'
                                : 'bg-transparent border-white/40'
                            )}
                          />
                          <div className="flex-1 min-w-0 space-y-0.5">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="text-[12px] font-mono text-elec-yellow">
                                {m.unitCode} {m.acCode}
                              </span>
                              <span className="text-[13px] text-white">{m.confidence}% match</span>
                              <span
                                className={cn(
                                  'text-[13px]',
                                  selected ? 'text-elec-yellow' : 'text-white'
                                )}
                              >
                                {selected
                                  ? 'Claimed by you'
                                  : recommended
                                    ? 'Strong match'
                                    : 'Suggested'}
                              </span>
                            </div>
                            <p className="text-[13px] text-white leading-snug">{m.acText}</p>
                            <p className="text-[12px] text-white leading-snug italic">
                              {m.reasons[0]}
                            </p>
                            {m.toComplete && (
                              <p className="text-[12px] text-elec-yellow/85 leading-snug">
                                To complete: {m.toComplete}
                              </p>
                            )}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Quality tips per file */}
            {files.some((f) => f.analysis?.qualityTips?.length) && (
              <div className="space-y-2">
                <Eyebrow>Strengthen this evidence</Eyebrow>
                <ul className="space-y-1.5">
                  {files
                    .filter((f) => f.analysis?.qualityTips?.length)
                    .flatMap((f) =>
                      (f.analysis!.qualityTips || []).map((tip, i) => (
                        <li
                          key={`${f.id}-tip-${i}`}
                          className="flex items-start gap-2 text-[13px] text-white leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))
                    )}
                </ul>
              </div>
            )}

            {/* Vision-grounded insights — image quality, what's missing,
                    the single grade-lifting fix, and authenticity flags. */}
            {aiInsights.worstQuality && aiInsights.worstQuality !== 'clear' && (
              <div
                className={cn(
                  'flex items-start gap-2 rounded-lg border p-3 text-[12.5px] leading-relaxed',
                  aiInsights.worstQuality === 'unusable'
                    ? 'border-red-500/30 bg-red-500/[0.05] text-red-200'
                    : 'border-orange-400/30 bg-orange-400/[0.05] text-orange-200'
                )}
              >
                <Camera className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  {aiInsights.worstQuality === 'unusable'
                    ? 'This photo is hard to read as evidence. Retake it clearer and closer before relying on it.'
                    : 'Part of this evidence is unclear. A sharper or closer photo would strengthen it.'}
                </span>
              </div>
            )}

            {aiInsights.missing.length > 0 && (
              <div className="space-y-2">
                <Eyebrow>What an assessor will look for</Eyebrow>
                <ul className="space-y-1.5">
                  {aiInsights.missing.map((x, i) => (
                    <li
                      key={`missing-${i}`}
                      className="flex items-start gap-2 text-[13px] text-white leading-relaxed"
                    >
                      <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {aiInsights.vacsrFixes.length > 0 && (
              <div className="space-y-1.5">
                <Eyebrow>One change that lifts the grade</Eyebrow>
                {aiInsights.vacsrFixes.map((x, i) => (
                  <p
                    key={`vacsr-${i}`}
                    className="flex items-start gap-2 text-[13px] text-white leading-relaxed"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>{x}</span>
                  </p>
                ))}
              </div>
            )}

            {aiInsights.authenticity.length > 0 && (
              <div className="rounded-lg border border-orange-400/30 bg-orange-400/[0.05] p-3 space-y-1">
                <div className="text-[13px] text-orange-200/80">An assessor may query</div>
                {aiInsights.authenticity.map((x, i) => (
                  <p key={`auth-${i}`} className="text-[12.5px] text-orange-100/90 leading-relaxed">
                    {x}
                  </p>
                ))}
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <Eyebrow>Title</Eyebrow>
              <Input
                placeholder="What is this evidence?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={FIELD_CLS}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Eyebrow>Description (optional)</Eyebrow>
              <Textarea
                placeholder="Anything extra you want to add about this entry…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={AREA_CLS}
              />
            </div>

            {/* Make this assessor-ready — optional fields that pass VACSR */}
            <div
              id="capture-assessor-ready"
              className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 space-y-4 scroll-mt-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Eyebrow>Make this assessor-ready</Eyebrow>
                  {readiness.ready ? (
                    <span className="text-[13px] text-elec-yellow">Assessor-ready</span>
                  ) : (
                    <span className="text-[13px] text-white">{readiness.score}/5</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {READINESS_META.map(({ k, label }) => {
                    const on = readiness.checks[k];
                    return (
                      <span
                        key={k}
                        className={cn(
                          'inline-flex items-center gap-1 px-2 h-6 rounded-full text-[12px] font-medium border',
                          on
                            ? 'border-elec-yellow text-elec-yellow'
                            : 'border-white/[0.12] text-white'
                        )}
                      >
                        <span
                          className={cn(
                            'h-1.5 w-1.5 rounded-full',
                            on ? 'bg-elec-yellow' : 'bg-white/20'
                          )}
                        />
                        {label}
                      </span>
                    );
                  })}
                </div>
                <p className="text-[12px] text-white leading-relaxed">
                  Optional — but each one helps your portfolio pass first time.
                </p>
              </div>

              {/* Date of work + site reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Eyebrow>Date of work</Eyebrow>
                  <Input
                    type="date"
                    value={workDate}
                    onChange={(e) => setWorkDate(e.target.value)}
                    className={FIELD_CLS}
                  />
                </div>
                <div className="space-y-1.5">
                  <Eyebrow>Site / job reference</Eyebrow>
                  <Input
                    placeholder="e.g. 14 Mill Lane rewire"
                    value={siteRef}
                    onChange={(e) => setSiteRef(e.target.value)}
                    className={FIELD_CLS}
                  />
                </div>
              </div>

              {/* Rough place: optional, off unless allowed */}
              <div className="space-y-1">
                <label className="flex min-h-[44px] cursor-pointer items-center gap-2.5 touch-manipulation">
                  <Checkbox
                    checked={placeOn}
                    onCheckedChange={(v) => void togglePlace(v === true)}
                    aria-describedby="capture-place-help"
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <span className="text-[13px] font-medium text-white">
                    Add the nearest town
                    {placeOn && (locating || place) ? (
                      <span className="font-normal">
                        {' '}
                        ·{' '}
                        {locating
                          ? 'finding it…'
                          : place?.place
                            ? `near ${place.place}`
                            : 'area recorded'}
                      </span>
                    ) : null}
                  </span>
                </label>
                <p id="capture-place-help" className="text-[12px] leading-relaxed text-white">
                  Optional. Your phone asks first. Only the town is kept, never the exact spot.
                </p>
              </div>

              {/* Your role */}
              <div className="space-y-1.5">
                <Eyebrow>What you personally did</Eyebrow>
                <Textarea
                  placeholder="Your own role on this job — what you carried out, not the team's…"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  rows={2}
                  className={AREA_CLS}
                />
              </div>

              {/* Evidence type */}
              <div className="space-y-1.5">
                <Eyebrow>Type of evidence</Eyebrow>
                <div className="flex flex-wrap gap-1.5">
                  {EVIDENCE_TYPES.map((opt) => {
                    const active = evidenceType === opt.v;
                    return (
                      <button
                        key={opt.v}
                        type="button"
                        onClick={() => setEvidenceType(active ? '' : opt.v)}
                        className={cn(chipBase, 'px-3.5', active ? chipOn : chipOff)}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Witness / supervisor */}
              <div className="space-y-1.5">
                <Eyebrow>Witness / supervisor (who saw the work)</Eyebrow>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2">
                  <Input
                    placeholder="Name"
                    value={witnessName}
                    onChange={(e) => setWitnessName(e.target.value)}
                    className={FIELD_CLS}
                  />
                  <Input
                    placeholder="Role (e.g. supervisor)"
                    value={witnessRole}
                    onChange={(e) => setWitnessRole(e.target.value)}
                    className={FIELD_CLS}
                  />
                  <Input
                    type="date"
                    value={witnessDate}
                    onChange={(e) => setWitnessDate(e.target.value)}
                    className={cn(FIELD_CLS, 'sm:w-[150px]')}
                  />
                </div>
              </div>

              {/* Authenticity declaration */}
              <label className="flex items-start gap-2.5 cursor-pointer touch-manipulation">
                <Checkbox
                  checked={authenticityConfirmed}
                  onCheckedChange={(v) => setAuthenticityConfirmed(v === true)}
                  className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <span className="text-[12px] text-white leading-relaxed">
                  I confirm this is my own work and an accurate record of what I did.
                </span>
              </label>
            </div>

            {/* Link to */}
          </div>
        )}
      </FormSheet>

      <WorkEvidencePicker
        open={workPicker.open}
        initialKind={workPicker.kind}
        onOpenChange={(o) => setWorkPicker((w) => ({ ...w, open: o }))}
        onPrepared={(p) => {
          setWorkPicker((w) => ({ ...w, open: false }));
          applyWork(p);
        }}
        onPhotograph={() => {
          setWorkPicker((w) => ({ ...w, open: false }));
          requestAnimationFrame(() => cameraInputRef.current?.click());
        }}
        onPaperSchedule={() => {
          setWorkPicker((w) => ({ ...w, open: false }));
          setPaperOpen(true);
        }}
      />

      <PaperScheduleSheet
        open={paperOpen}
        onOpenChange={setPaperOpen}
        onPrepared={(p) => {
          setPaperOpen(false);
          applyWork(p);
        }}
      />

      {/* Soft assessor-ready nudge — encourages, never blocks */}
      <AlertDialog open={showReadinessNudge} onOpenChange={setShowReadinessNudge}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Make it assessor-ready?</AlertDialogTitle>
            <AlertDialogDescription>
              This is {readiness.score}/5 on assessor checks. Adding these takes about 10 seconds
              and stops it being referred back:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <ul className="space-y-1.5 py-1">
            {READINESS_META.filter(({ k }) => !readiness.checks[k]).map(({ k, label }) => (
              <li key={k} className="flex items-start gap-2 text-[13px] text-white leading-snug">
                <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-1.5 shrink-0" />
                <span>{READINESS_FIX[k] ?? label}</span>
              </li>
            ))}
          </ul>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                readinessAck.current = true;
                setShowReadinessNudge(false);
                void handleSave();
              }}
            >
              Save anyway
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowReadinessNudge(false);
                requestAnimationFrame(() =>
                  document
                    .getElementById('capture-assessor-ready')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                );
              }}
            >
              Add details
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default UnifiedCaptureSheet;
