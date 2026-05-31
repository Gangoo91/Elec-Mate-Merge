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
  Camera,
  Upload,
  X,
  Sparkles,
  Loader2,
  Check,
  Mic,
  MicOff,
  Briefcase,
  Clock,
  CheckSquare,
  Square,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
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
  Eyebrow,
  PrimaryAction,
  SecondaryAction,
} from './portfolio/PortfolioPrimitives';

interface UnifiedCaptureSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

type LinkTo = 'portfolio' | 'ojt' | 'both';
type CaptureStep = 'capture' | 'details';

interface UploadedFile {
  id: string;          // local synthetic id used for keying + SSE correlation
  file: File;
  previewUrl: string;
  storageUrl?: string;
  uploading: boolean;
  analysis?: FileAnalysis;
  error?: string;
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

const FIELD_CLS =
  'h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20';

export function UnifiedCaptureSheet({ open, onOpenChange, onComplete }: UnifiedCaptureSheetProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const haptic = useHaptic();
  const { addEntry } = usePortfolioData();
  const { addTimeEntry } = useTimeEntries();
  const { qualificationCode } = useStudentQualification();

  /* ─── Form state ─────────────────────────────────────────────────── */
  const [step, setStep] = useState<CaptureStep>('capture');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [linkTo, setLinkTo] = useState<LinkTo>('portfolio');
  const [ojtDuration, setOjtDuration] = useState('');

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

  /* ─── Save state — pessimistic so we never claim "saved" before the
        write confirms (apprentices capture on flaky site signal). ──────── */
  const [isSaving, setIsSaving] = useState(false);

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
    setFiles([]);
    setTitle('');
    setDescription('');
    setLinkTo('portfolio');
    setOjtDuration('');
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

    const oversize = selected.find((f) => f.size > 10 * 1024 * 1024);
    if (oversize) {
      toast({
        title: 'File too large',
        description: 'Maximum file size is 10MB',
        variant: 'destructive',
      });
      return;
    }

    const newFiles: UploadedFile[] = selected.map((f) => ({
      id: `f-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      file: f,
      previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : '',
      uploading: true,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    setStep('details');

    // Reset the input so the same file can be selected again later
    if (e.target) e.target.value = '';

    // Upload each file in parallel
    await Promise.all(
      newFiles.map(async (uf) => {
        const url = await uploadFile(uf.file);
        setFiles((prev) =>
          prev.map((f) => (f.id === uf.id ? { ...f, storageUrl: url || undefined, uploading: false } : f))
        );
      })
    );
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
          if (fileId) {
            setFiles((prev) =>
              prev.map((f) => (f.id === fileId ? { ...f, error: msg } : f))
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

    const snap = {
      title,
      description,
      linkTo,
      ojtDuration,
      selectedACs: [...selectedACs],
      files: files.map((f) => ({
        name: f.file.name,
        type: f.file.type,
        url: f.storageUrl || f.previewUrl,
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

    const toastMsg =
      snap.linkTo === 'both'
        ? 'Added to portfolio and logged as training time'
        : snap.linkTo === 'ojt'
          ? 'Logged as training time'
          : 'Added to portfolio';

    setIsSaving(true);
    try {
      const evidenceFiles = snap.files.length ? snap.files : [];

      if (snap.linkTo === 'portfolio' || snap.linkTo === 'both') {
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
      }

      if ((snap.linkTo === 'ojt' || snap.linkTo === 'both') && snap.ojtDuration) {
        await addTimeEntry({
          date: new Date().toISOString().split('T')[0],
          duration: parseFloat(snap.ojtDuration) * 60,
          activity: snap.title,
          notes: snap.description,
        });
      }

      // Only now is it actually saved.
      haptic.success();
      toast({ title: 'Evidence saved', description: toastMsg });
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
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) resetForm();
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
            <SheetTitle className="text-left">
              <Eyebrow>Capture · Evidence</Eyebrow>
              <h2 className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-white mt-1 leading-none">
                {step === 'capture' ? 'Capture on site' : 'Review &amp; tag'}
              </h2>
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
                                <span className="text-[10px] text-red-300">Error</span>
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
                        {meta.regNumbers.slice(0, 6).map((r) => (
                          <span
                            key={r}
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
                      {allMatches.map((m) => {
                        const ref = `${m.unitCode} AC ${m.acCode}`;
                        const selected = selectedACs.includes(ref);
                        const recommended = m.confidence >= 80;
                        return (
                          <li key={ref}>
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
                              {selected ? (
                                <CheckSquare className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                              ) : (
                                <Square className="h-4 w-4 text-white/40 flex-shrink-0 mt-0.5" />
                              )}
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
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Eyebrow>Make this assessor-ready</Eyebrow>
                      {readiness.ready ? (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-elec-yellow">
                          <ShieldCheck className="h-3.5 w-3.5" /> Assessor-ready
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
                            {on ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                            )}
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
                <div className="space-y-2">
                  <Eyebrow>Link to</Eyebrow>
                  <div className="grid grid-cols-3 gap-1.5">
                    {([
                      { v: 'portfolio', label: 'Portfolio', icon: Briefcase },
                      { v: 'ojt', label: 'OJT hours', icon: Clock },
                      { v: 'both', label: 'Both', icon: Check },
                    ] as const).map((opt) => {
                      const active = linkTo === opt.v;
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.v}
                          onClick={() => setLinkTo(opt.v)}
                          className={cn(
                            'flex flex-col items-center gap-1 p-3 rounded-lg border transition-colors touch-manipulation min-h-[60px]',
                            active
                              ? 'border-elec-yellow bg-elec-yellow/[0.06]'
                              : 'border-white/[0.08] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04]'
                          )}
                        >
                          <Icon
                            className={cn('h-4 w-4', active ? 'text-elec-yellow' : 'text-white/55')}
                          />
                          <span
                            className={cn(
                              'text-[11.5px] font-medium',
                              active ? 'text-elec-yellow' : 'text-white/85'
                            )}
                          >
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* OJT duration */}
                {(linkTo === 'ojt' || linkTo === 'both') && (
                  <div className="space-y-2">
                    <Eyebrow>Time spent (hours)</Eyebrow>
                    <Input
                      type="number"
                      step="0.5"
                      min="0.5"
                      placeholder="e.g. 2.5"
                      value={ojtDuration}
                      onChange={(e) => setOjtDuration(e.target.value)}
                      className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
                    />
                  </div>
                )}
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
                    resetForm();
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
  );
}

export default UnifiedCaptureSheet;
