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
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
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
import {
  saveDraft,
  loadDraft,
  clearDraft,
  type CaptureDraft,
} from '@/lib/captureDrafts';
import {
  Eyebrow,
  PrimaryAction,
  SecondaryAction,
} from './portfolio/PortfolioPrimitives';

export interface CaptureSeed {
  /** Pre-filled evidence title. */
  title?: string;
  /** ACs to pre-select, in `${unitCode} AC ${acCode}` format. */
  acRefs?: string[];
  /** Evidence checklist shown as an on-site capture brief. */
  brief?: { label: string; type?: string; required?: boolean }[];
  /** Optional scenario text seeded into the description field. */
  context?: string;
}

interface UnifiedCaptureSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
  /** Optional pre-seed from a job idea — pre-fills title + ACs + brief. */
  seed?: CaptureSeed | null;
}

type CaptureStep = 'capture' | 'details';

interface UploadedFile {
  id: string;          // local synthetic id used for keying + SSE correlation
  file: File;
  previewUrl: string;
  storageUrl?: string;
  uploading: boolean;
  analysis?: FileAnalysis;
  /** Upload failure — blocks save, offers re-upload. */
  error?: string;
  /** AI analysis failure — file is safely stored; never re-upload for this. */
  analysisError?: string;
}

const GRADE_TONE: Record<'A' | 'B' | 'C' | 'D', string> = {
  A: 'border-elec-yellow/40 text-elec-yellow bg-elec-yellow/[0.06]',
  B: 'border-elec-yellow/25 text-elec-yellow/85 bg-elec-yellow/[0.04]',
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
const READINESS_META: { k: 'valid' | 'authentic' | 'current' | 'sufficient' | 'reliable'; label: string }[] = [
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

const FIELD_CLS =
  'h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20';

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
const EVIDENCED_STATUSES = new Set(['evidenced', 'assessed', 'confirmed']);

async function buildCoverageMoment(
  userId: string,
  qualificationCode: string | null,
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

    let covered = 0;
    let total = 0;

    const { data: cs } = await supabase
      .from('college_students')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (cs?.id) {
      // College-linked — the server-maintained coverage table is truth.
      const { data: rows, error } = await supabase
        .from('student_ac_coverage')
        .select('ac_code, status')
        .eq('student_id', cs.id as string)
        .eq('unit_code', unit);
      if (error || !rows?.length) return null;
      total = rows.length;
      covered = rows.filter((r) => EVIDENCED_STATUSES.has(r.status as string)).length;
      // The sync trigger may not have flipped the just-claimed ACs yet —
      // count them client-side so the number never reads low.
      for (const ac of claimedAcs) {
        const row = rows.find((r) => r.ac_code === ac);
        if (row && !EVIDENCED_STATUSES.has(row.status as string)) covered += 1;
      }
      covered = Math.min(covered, total);
    } else {
      // Standalone — distinct claimed ACs across the portfolio vs the
      // qualification catalogue for this unit.
      if (!qualificationCode) return null;
      const [reqsRes, itemsRes] = await Promise.all([
        supabase
          .from('qualification_requirements')
          .select('ac_code')
          .eq('qualification_code', qualificationCode)
          .eq('unit_code', unit),
        supabase.from('portfolio_items').select('assessment_criteria_met').eq('user_id', userId),
      ]);
      if (reqsRes.error || itemsRes.error) return null;
      const catalogue = new Set((reqsRes.data ?? []).map((r) => r.ac_code as string));
      if (catalogue.size === 0) return null;
      total = catalogue.size;
      const claimed = new Set<string>();
      for (const item of itemsRes.data ?? []) {
        for (const ref of item.assessment_criteria_met ?? []) {
          const m = AC_REF_RE.exec(ref);
          if (m && m[1] === unit && catalogue.has(m[2])) claimed.add(m[2]);
        }
      }
      // The just-saved row should already be in the read, but include its
      // claims client-side in case the read raced the insert.
      for (const ac of claimedAcs) if (catalogue.has(ac)) claimed.add(ac);
      covered = claimed.size;
    }

    if (total === 0) return null;
    const unitLabel = /^unit\b/i.test(unit) ? unit : `Unit ${unit}`;
    const suffix =
      moreUnits > 0 ? ` + ${moreUnits} more ${moreUnits === 1 ? 'unit' : 'units'}.` : '';
    return `${unitLabel} — ${covered} of ${total} criteria now have evidence.${suffix}`;
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
  const { user } = useAuth();
  const haptic = useHaptic();
  const { addEntry } = usePortfolioData();
  const { qualificationCode } = useStudentQualification();

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

  /* ─── Job-idea seed (capture brief) ───────────────────────────────── */
  const [briefItems, setBriefItems] = useState<
    { label: string; type?: string; required?: boolean }[]
  >([]);
  const [briefACs, setBriefACs] = useState<string[]>([]);
  const seededRef = useRef(false);
  useEffect(() => {
    if (open && seed && !seededRef.current) {
      seededRef.current = true;
      setStep('details');
      if (seed.title) setTitle((t) => t || seed.title!);
      if (seed.acRefs?.length) {
        setSelectedACs((prev) => Array.from(new Set([...prev, ...seed.acRefs!])));
        setBriefACs(seed.acRefs);
      }
      if (seed.brief?.length) setBriefItems(seed.brief);
      if (seed.context) setVoiceText((v) => v || seed.context!);
    }
    if (!open) seededRef.current = false;
  }, [open, seed]);

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
      description === '' &&
      reflectionText === '' &&
      siteRef === '' &&
      role === '' &&
      evidenceType === '' &&
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
            description: 'Your work is still here — save it before closing the app.',
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

  // Seed the editable reflection from the AI draft once, preserving any edits.
  const reflectionSeededRef = useRef(false);
  useEffect(() => {
    if (reflection && !reflectionSeededRef.current) {
      reflectionSeededRef.current = true;
      setReflectionText((prev) => (prev.trim() ? prev : formatReflection(reflection)));
    }
  }, [reflection]);

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
    setBriefItems([]);
    setBriefACs([]);
    readinessAck.current = false;
    setShowReadinessNudge(false);
  };

  /* ─── Upload helper ──────────────────────────────────────────────── */
  const uploadFile = async (file: File): Promise<string | null> => {
    if (!user?.id) return null;
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('portfolio-evidence')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (error) return null;
      const { data: urlData } = supabase.storage
        .from('portfolio-evidence')
        .getPublicUrl(data.path);
      return urlData.publicUrl;
    } catch {
      return null;
    }
  };

  /* ─── File selection ─────────────────────────────────────────────── */
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    // Drop only the oversize files, keep the rest — and say which were dropped.
    const oversize = selected.filter((f) => f.size > 10 * 1024 * 1024);
    const valid = selected.filter((f) => f.size <= 10 * 1024 * 1024);
    if (oversize.length) {
      toast({
        title: oversize.length === 1 ? 'File too large' : `${oversize.length} files too large`,
        description: `Maximum file size is 10MB. Not added: ${oversize
          .map((f) => f.name)
          .join(', ')}`,
        variant: 'destructive',
      });
    }
    if (!valid.length) {
      if (e.target) e.target.value = '';
      return;
    }

    const newFiles: UploadedFile[] = valid.map((f) => ({
      id: `f-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      file: f,
      previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : '',
      uploading: true,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    setStep('details');

    // Reset the input so the same file can be selected again later
    if (e.target) e.target.value = '';

    // Upload each file in parallel; failures are surfaced on the chip — a
    // file without a storageUrl must never be saved (a blob: preview URL
    // dies with the session and would leave the evidence permanently broken).
    const results = await Promise.all(
      newFiles.map(async (uf) => {
        const url = await uploadFile(uf.file);
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
        description: 'Check your signal, then tap Retry on the file.',
        variant: 'destructive',
      });
    }
  };

  /* ─── Upload one file and mark the outcome on its chip ──────────── */
  const uploadAndMark = async (id: string, file: File): Promise<string | null> => {
    const url = await uploadFile(file);
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
      prev.map((f) => (f.id === id ? { ...f, uploading: true, error: undefined } : f))
    );
    const url = await uploadAndMark(id, target.file);
    if (!url) {
      toast({
        title: 'Upload failed again',
        description: 'Still no luck — check your signal or remove the file.',
        variant: 'destructive',
      });
    }
  };

  /* ─── Auto-retry failed uploads when signal returns ──────────────── */
  useEffect(() => {
    if (!open) return;
    const onOnline = () => {
      const failed = filesRef.current.filter((f) => f.error && !f.uploading);
      if (!failed.length) return;
      toast({ title: 'Back online — retrying uploads' });
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
          setFiles((prev) =>
            prev.map((f) => (f.id === fileId ? { ...f, analysis } : f))
          );
          // Auto-select high-confidence ACs — only ones verified against the
          // real qualification, so we never auto-claim a hallucinated AC.
          const auto = analysis.matchedCriteria
            .filter((c) => c.confidence >= 80 && c.grounded !== false)
            .map((c) => `${c.unitCode} AC ${c.acCode}`);
          setSelectedACs((prev) => {
            const next = new Set(prev);
            for (const r of auto) next.add(r);
            return Array.from(next);
          });
          // Auto-fill title from first analysis
          setTitle((t) => t || analysis.suggestedTitle?.slice(0, 100) || '');
        },
        onReflection: (r) => {
          setReflection(r);
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

    // Files must be safely in storage before saving. A blob: preview URL is
    // session-scoped — persisting it would file evidence that can never be
    // opened again.
    if (files.some((f) => f.uploading)) {
      haptic.warning();
      toast({
        title: 'Files still uploading',
        description: 'Give it a second, then save.',
      });
      return;
    }
    const failedFiles = files.filter((f) => !f.storageUrl);
    if (failedFiles.length > 0) {
      haptic.warning();
      toast({
        title: failedFiles.length === 1 ? 'A file failed to upload' : `${failedFiles.length} files failed to upload`,
        description: 'Retry or remove the failed files before saving.',
        variant: 'destructive',
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

    const snap = {
      title,
      description,
      selectedACs: [...selectedACs],
      files: files
        .filter((f) => f.storageUrl)
        .map((f) => ({
          name: f.file.name,
          type: f.file.type,
          url: f.storageUrl!,
        })),
      reflectionText,
      workDate,
      siteRef,
      role,
      evidenceType,
      witnessName,
      witnessRole,
      witnessDate,
      authenticityConfirmed,
    };

    const toastMsg = 'Added to portfolio';

    setIsSaving(true);
    try {
      const evidenceFiles = snap.files.length ? snap.files : [];

      const categoryObj: PortfolioCategory = {
        id: 'practical-skills',
        name: 'Practical Skills',
        description: '',
        icon: 'folder',
        color: 'gray',
        requiredEntries: 0,
        completedEntries: 0,
      };

      const witness =
        snap.witnessName.trim() || snap.witnessRole.trim() || snap.witnessDate
          ? {
              name: snap.witnessName.trim() || undefined,
              role: snap.witnessRole.trim() || undefined,
              date: snap.witnessDate || undefined,
            }
          : undefined;

      await addEntry({
        title: snap.title,
        description: snap.description.trim(),
        category: categoryObj,
        skills: snap.selectedACs,
        reflection: snap.reflectionText.trim(),
        evidenceFiles,
        assessmentCriteria: snap.selectedACs,
        status: 'draft',
        dateCreated: new Date().toISOString(),
        metadata: {
          workDate: snap.workDate || undefined,
          siteRef: snap.siteRef.trim() || undefined,
          role: snap.role.trim() || undefined,
          evidenceType: snap.evidenceType || undefined,
          witness,
          authenticityConfirmed: snap.authenticityConfirmed || undefined,
        },
      });

      // Only now is it actually saved — the offline backup is stale, drop it.
      if (user?.id) clearDraftNow(user.id);
      setPendingDraft(null);
      haptic.success();
      // Coverage moment — when ACs were claimed, say where that unit now
      // stands instead of a flat "saved". Fire-and-forget so a slow query
      // never delays the sheet closing; falls back silently on any failure.
      if (snap.selectedACs.length > 0 && user?.id) {
        const uid = user.id;
        void buildCoverageMoment(uid, qualificationCode, snap.selectedACs).then((moment) => {
          if (moment) {
            toast({ title: 'Added to portfolio ⚡', description: moment });
          } else {
            toast({ title: 'Evidence saved', description: toastMsg });
          }
        });
      } else {
        toast({ title: 'Evidence saved', description: toastMsg });
      }
      resetForm();
      onComplete();
    } catch (error) {
      console.error('Save error:', error);
      haptic.error();
      // Keep the sheet open with the form intact so nothing is lost and the
      // apprentice can retry — never tell them it saved when it didn't.
      toast({
        title: 'Could not save — nothing lost',
        description: "We couldn't save that just now. Check your signal and tap Save again.",
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  /* ─── AC selection helpers ───────────────────────────────────────── */
  const toggleAC = (ref: string) => {
    haptic.light();
    setSelectedACs((prev) =>
      prev.includes(ref) ? prev.filter((r) => r !== ref) : [...prev, ref]
    );
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
  const canAnalyse =
    !streaming && (files.some((f) => f.storageUrl) || voiceText.trim().length > 0);

  /* ─── Render ─────────────────────────────────────────────────────── */
  return (
    <>
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) handleSheetClose();
        onOpenChange(v);
      }}
    >
      <SheetContent
        side="bottom"
        className="h-[92vh] sm:h-[88vh] rounded-t-3xl p-0 bg-[hsl(0_0%_8%)] border-white/[0.06]"
      >
        <div className="w-12 h-1 bg-white/15 rounded-full mx-auto mt-3 mb-2" />
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 sm:px-6 pb-4">
            {/* SheetTitle already renders an <h2> — inner heading must not
                nest another one (validateDOMNesting). */}
            <SheetTitle className="text-left">
              <Eyebrow>Capture · Evidence</Eyebrow>
              <span className="block text-[22px] sm:text-[26px] font-semibold tracking-tight text-white mt-1 leading-none">
                {step === 'capture' ? 'Capture on site' : 'Review &amp; tag'}
              </span>
            </SheetTitle>
            <SheetDescription className="text-left text-[13px] text-white/70 leading-snug">
              {step === 'capture'
                ? 'Snap photos, speak a quick description, AI will suggest the ACs and draft a STAR reflection in seconds.'
                : meta
                  ? `Streaming analysis — ${analysedCount} of ${meta.totalFiles} files ready.`
                  : 'Add a few details and tap Analyse — questions ground in BS 7671.'}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-32">
            {/* Unfinished-entry banner — restoring is always explicit */}
            {pendingDraft && step === 'capture' && (
              <div className="mt-2 rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.05] p-4 space-y-3">
                <div className="space-y-1">
                  <Eyebrow>Unfinished entry</Eyebrow>
                  <p className="text-[13px] text-white/85 leading-snug">
                    From {relativeTime(pendingDraft.savedAt)}
                    {pendingDraft.files.length > 0 &&
                      ` — ${pendingDraft.files.length} ${
                        pendingDraft.files.length === 1 ? 'photo' : 'photos'
                      }`}
                    . Pick up where you left off?
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleDiscardDraft}
                    className="h-11 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)] text-[13px] font-medium text-white/70 hover:bg-white/[0.04] transition-colors touch-manipulation"
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    onClick={handleResumeDraft}
                    className="h-11 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
                  >
                    Resume
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Capture */}
            {step === 'capture' && (
              <div className="space-y-5 py-2">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 p-5 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors touch-manipulation"
                  >
                    <Camera className="h-6 w-6 text-elec-yellow" />
                    <span className="text-[13px] font-medium text-white">Camera</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 p-5 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors touch-manipulation"
                  >
                    <Upload className="h-6 w-6 text-white/85" />
                    <span className="text-[13px] font-medium text-white">Upload files</span>
                  </button>
                </div>

                <button
                  onClick={() => setStep('details')}
                  className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors touch-manipulation"
                >
                  <Mic className="h-4 w-4 text-elec-yellow" />
                  <span className="text-[13px] font-medium text-white">
                    Voice-only — describe a job without files
                  </span>
                </button>

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
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <p className="text-[11px] text-white/55 text-center">
                  Up to 10MB per file · images, video, PDFs, documents
                </p>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 'details' && (
              <div className="space-y-6 py-2">
                {/* Capture brief — seeded from a job idea */}
                {(briefItems.length > 0 || briefACs.length > 0) && (
                  <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.05] p-4 space-y-3">
                    <Eyebrow>Capture brief · from your job idea</Eyebrow>
                    {briefACs.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-[11px] text-white/55">
                          Criteria this covers — tap to remove any
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
                                  'inline-flex items-center px-2 h-7 rounded-full text-[11px] font-mono font-medium border transition-colors touch-manipulation',
                                  on
                                    ? 'border-elec-yellow/50 bg-elec-yellow/[0.10] text-elec-yellow'
                                    : 'border-white/[0.10] bg-white/[0.02] text-white/40 line-through'
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
                        <p className="text-[11px] text-white/55">Evidence to get on site</p>
                        <ul className="space-y-1.5">
                          {briefItems.map((c, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-[12.5px] text-white/85 leading-snug"
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {files.map((f) => (
                        <div
                          key={f.id}
                          className="relative rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden"
                        >
                          {f.previewUrl ? (
                            <div className="aspect-square">
                              <img
                                src={f.previewUrl}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="aspect-square flex items-center justify-center bg-white/[0.04]">
                              <FileCheck className="h-8 w-8 text-white/55" />
                            </div>
                          )}
                          <button
                            onClick={() => removeFile(f.id)}
                            aria-label={`Remove ${f.file.name}`}
                            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white touch-manipulation"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <div className="px-2 py-1.5 space-y-0.5">
                            <p className="text-[11px] text-white truncate" title={f.file.name}>
                              {f.file.name}
                            </p>
                            <div className="flex items-center gap-1.5">
                              {f.uploading && (
                                <span className="text-[10px] text-white/55 flex items-center gap-1">
                                  <Loader2 className="h-2.5 w-2.5 animate-spin" />
                                  Uploading
                                </span>
                              )}
                              {f.analysis && (
                                <span
                                  className={cn(
                                    'text-[10px] font-mono px-1.5 py-0 rounded-md border',
                                    GRADE_TONE[f.analysis.qualityGrade]
                                  )}
                                >
                                  {f.analysis.qualityGrade} · {f.analysis.qualityScore}
                                </span>
                              )}
                              {f.error && (
                                <button
                                  onClick={() => retryUpload(f.id)}
                                  className="text-[10px] text-red-300 underline underline-offset-2 touch-manipulation"
                                  aria-label={`Retry upload of ${f.file.name}`}
                                >
                                  Failed — retry
                                </button>
                              )}
                              {!f.error && f.analysisError && (
                                <span className="text-[10px] text-amber-200/80">
                                  Stored — AI check didn't run
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full text-center py-2 rounded-lg border border-dashed border-white/[0.08] text-[12px] text-white/55 hover:bg-white/[0.04] transition-colors touch-manipulation"
                    >
                      + Add more files
                    </button>
                  </div>
                )}

                {/* Voice transcript */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <Eyebrow>Describe the job</Eyebrow>
                    <span className="text-[11px] text-white/40 font-mono">
                      {voiceText.length} chars
                    </span>
                  </div>
                  <Textarea
                    value={voiceText}
                    onChange={(e) => setVoiceText(e.target.value)}
                    placeholder="Speak or type — what was the job, what did you do, what did you measure, what did you learn?"
                    rows={4}
                    className="touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
                  />
                  {speechSupported && (
                    <button
                      type="button"
                      onClick={isListening ? stopListening : startListening}
                      disabled={streaming}
                      className={cn(
                        'inline-flex items-center gap-2 h-9 px-3 rounded-lg border text-[12px] font-medium transition-colors touch-manipulation',
                        isListening
                          ? 'border-red-500/40 bg-red-500/[0.06] text-red-300'
                          : 'border-white/[0.08] bg-[hsl(0_0%_10%)] text-white/85 hover:bg-white/[0.04]'
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
                {!streaming && analysedCount === 0 && !reflection && (
                  <Button
                    onClick={handleAnalyse}
                    disabled={!canAnalyse || filesUploadingCount > 0}
                    className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 inline-flex items-center justify-center gap-2"
                  >
                    {filesUploadingCount > 0 ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading {filesUploadingCount}{' '}
                        {filesUploadingCount === 1 ? 'file' : 'files'}…
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Analyse with AI
                      </>
                    )}
                  </Button>
                )}

                {/* Streaming progress */}
                {(streaming || meta) && (
                  <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 space-y-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <Eyebrow>
                        {streaming ? 'Analysing · BS 7671 grounded' : 'Analysis complete'}
                      </Eyebrow>
                      <span className="text-[12px] font-mono text-white/85 tabular-nums">
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
                        <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                          Reg sources
                        </span>
                        {/* reg numbers can repeat across files — index the key */}
                        {meta.regNumbers.slice(0, 6).map((r, rIdx) => (
                          <span
                            key={`${r}-${rIdx}`}
                            className="text-[10px] font-mono text-elec-yellow/85 px-1.5 py-0 rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04]"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* STAR reflection — editable, in the apprentice's own words */}
                {(reflection || reflectionText) && (
                  <div className="space-y-2">
                    <Eyebrow>STAR reflection · drafted from your voice</Eyebrow>
                    <Textarea
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      rows={7}
                      className="touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white leading-relaxed placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
                    />
                    <p className="text-[11px] text-white/55 italic">
                      Reword this into your own voice — assessors look for an authentic, first-hand
                      reflection.
                    </p>
                  </div>
                )}

                {/* Aggregated AC matches */}
                {allMatches.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <Eyebrow>Suggested ACs · {allMatches.length}</Eyebrow>
                      <span className="text-[11px] text-white/55">
                        Tap to confirm — high-confidence matches auto-selected.
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
                                selected
                                  ? 'border-elec-yellow/40 bg-elec-yellow/[0.05]'
                                  : 'border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04]'
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
                                  <span className="text-[11px] font-mono text-elec-yellow">
                                    {m.unitCode} {m.acCode}
                                  </span>
                                  <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">
                                    {m.confidence}% match
                                  </span>
                                  {recommended && (
                                    <span className="text-[10px] uppercase tracking-[0.14em] text-elec-yellow">
                                      Recommended
                                    </span>
                                  )}
                                </div>
                                <p className="text-[13px] text-white leading-snug">{m.acText}</p>
                                <p className="text-[11px] text-white/55 leading-snug italic">
                                  {m.reasons[0]}
                                </p>
                                {m.toComplete && (
                                  <p className="text-[11px] text-elec-yellow/85 leading-snug">
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
                              className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
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
                        ? 'This photo is hard to read as evidence — retake it clearer and closer before relying on it.'
                        : 'Part of this evidence is unclear — a sharper or closer photo would strengthen it.'}
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
                          className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
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
                        className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-elec-yellow mt-0.5 flex-shrink-0" />
                        <span>{x}</span>
                      </p>
                    ))}
                  </div>
                )}

                {aiInsights.authenticity.length > 0 && (
                  <div className="rounded-lg border border-orange-400/30 bg-orange-400/[0.05] p-3 space-y-1">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-orange-200/80">
                      An assessor may query
                    </div>
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
                    className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
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
                    className="touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
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
                        <span className="text-[10px] uppercase tracking-[0.14em] text-elec-yellow">
                          Assessor-ready
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">
                          {readiness.score}/5
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {READINESS_META.map(({ k, label }) => {
                        const on = readiness.checks[k];
                        return (
                          <span
                            key={k}
                            className={cn(
                              'inline-flex items-center gap-1 px-2 h-6 rounded-full text-[10px] font-medium border',
                              on
                                ? 'border-elec-yellow/40 bg-elec-yellow/[0.08] text-elec-yellow'
                                : 'border-white/[0.08] text-white/40'
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
                    <p className="text-[11px] text-white/45 leading-relaxed">
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

                  {/* Your role */}
                  <div className="space-y-1.5">
                    <Eyebrow>What you personally did</Eyebrow>
                    <Textarea
                      placeholder="Your own role on this job — what you carried out, not the team's…"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      rows={2}
                      className="touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
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
                            className={cn(
                              'px-3 h-9 rounded-full text-[11.5px] font-medium border transition-colors touch-manipulation',
                              active
                                ? 'border-elec-yellow/50 bg-elec-yellow/[0.08] text-elec-yellow'
                                : 'border-white/[0.08] bg-[hsl(0_0%_10%)] text-white/70 hover:bg-white/[0.04]'
                            )}
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
                    <span className="text-[12px] text-white/85 leading-relaxed">
                      I confirm this is my own work and an accurate record of what I did.
                    </span>
                  </label>
                </div>

                {/* Link to */}
              </div>
            )}
          </div>

          {/* Footer actions */}
          {step === 'details' && (
            <div className="px-4 sm:px-6 py-3 border-t border-white/[0.06] bg-[hsl(0_0%_8%)] pb-20 sm:pb-3">
              <div className="grid grid-cols-2 gap-2">
                <SecondaryAction
                  label="Cancel"
                  onClick={() => {
                    handleSheetClose();
                    onOpenChange(false);
                  }}
                />
                <PrimaryAction
                  label={
                    <>
                      <Check className="h-4 w-4" />
                      Save evidence
                    </>
                  }
                  onClick={handleSave}
                />
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>

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
            <li key={k} className="flex items-start gap-2 text-[13px] text-white/85 leading-snug">
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
