/**
 * DiaryEntrySheet — log (or edit) a day on site.
 *
 * Rebuilt 6 Oct 2026 (site diary audit). The old form was seven boxed
 * sections and about four phone screens; a typed task that hadn't been "+"-
 * added was thrown away; "hours spent (auto-logs OJT)" wrote hours the OTJ hub
 * itself says never count; and units were mixed into skill tags as strings.
 *
 * Now a 30-second core — where, what you did, one thing you learned — and
 * everything else in "Add more" rows that open inline:
 *   photos · supervisor · training time (→ OTJ, signed off by tutor or
 *   supervisor) · units this covers (own column) · question for your tutor
 *   (+ share with my tutor, college-linked learners only) · how was today.
 *
 * Built on FormSheet + fieldStyles (house form language). Drafts autosave per
 * user, keep uploaded photos, and say when one has been restored — but only
 * into the day they were started for, and a site tapped on the Today card
 * always wins over the draft's.
 *
 * Review fixes (6 Oct pm): "One thing you learned" sits right under Where;
 * six task chips then "More"; the date is three 44px chips, not a text link;
 * Save while dictating keeps what was said; signed-off training is shown, not
 * editable; an edit never silently un-shares while the college check loads.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Camera, ChevronDown, ImagePlus, Loader2, Mic, Square, X } from 'lucide-react';
import { sentenceCase } from '@/lib/site-diary/format';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { toLocalISODate, todayLocalISO } from '@/lib/localDate';
import { compressImageForUpload } from '@/utils/imageUploadUtils';
import { EvidenceImage } from '@/components/shared/EvidenceImage';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useHaptic } from '@/hooks/useHaptic';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { useMyEmployerLink } from '@/hooks/useMyEmployerLink';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useQualificationACs } from '@/hooks/qualification/useQualificationACs';
import {
  TRAINING_TYPES,
  formatMinutes,
  removePhotoFiles,
  type NewDiaryEntry,
  type SiteDiaryEntry,
  type TrainingType,
} from '@/hooks/site-diary/useSiteDiaryEntries';
import { MOOD_EMOJI, MOOD_LABEL } from '@/lib/site-diary/mood';
import { storageGetJSONSync, storageRemoveSync, storageSetJSONSync } from '@/utils/storage';

/* ── Constants ──────────────────────────────────────────────────────── */

const MAX_PHOTOS = 5;

/** A lit card per core step — the sheet was one dark block (Andrew, 6 Oct). */
const STEP_CARD =
  'rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5';
const STEP_LABEL = 'mb-3 flex items-center gap-2.5 text-[15px] font-semibold text-white';

/** Solid yellow step number — colour as a solid shape, never a tint. */
function StepNo({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-elec-yellow text-[12px] font-bold text-black"
    >
      {n}
    </span>
  );
}
const DAY_MS = 24 * 60 * 60 * 1000;
/** Per device, per user — only a fallback when no recentTasks are passed in. */
const TASK_CACHE_KEY = 'elec-mate-diary-recent-tasks';
const draftKey = (uid: string) => `elec-mate-diary-draft:${uid}`;
const LEGACY_DRAFT_KEY = 'elec-mate-diary-draft';

/** Common site tasks for a first-time diary, before there's any history. */
const COMMON_TASKS = [
  'First fix',
  'Second fix',
  'Containment',
  'Cable pulling',
  'Terminations',
  'Safe isolation',
  'Testing',
  'Fault finding',
  'Consumer unit',
  'Lighting',
];

const TRAINING_PRESETS = [30, 60, 120];
/** Task chips shown before "More" — ten pushed "learned" below the fold. */
const TASK_CHIPS_SHOWN = 6;

/* ── House chip styles ──────────────────────────────────────────────── */

const chipBase =
  'inline-flex min-h-[44px] items-center rounded-xl border px-3.5 text-[14px] touch-manipulation transition-colors';
const chipOn = 'border-elec-yellow bg-elec-yellow font-semibold text-black';
const chipOff = 'border-white/[0.12] bg-white/[0.06] font-medium text-white';

/* ── Draft ──────────────────────────────────────────────────────────── */

interface DiaryDraft {
  savedAt: number;
  date: string;
  siteName: string;
  tasks: string[];
  taskInput: string;
  whatILearned: string;
  photos: string[];
  supervisor: string;
  trainingMinutes: number | null;
  trainingType: TrainingType | null;
  unitCodes: string[];
  question: string;
  share: boolean;
  mood: number | null;
}

/* ── Props ──────────────────────────────────────────────────────────── */

interface DiaryEntrySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (entry: NewDiaryEntry) => Promise<unknown>;
  recentSites: string[];
  existingEntry?: SiteDiaryEntry | null;
  /** Pre-fill the date when creating from the calendar. */
  initialDate?: string | null;
  /** The apprentice's qualification units (code + title). If not passed, the
   *  sheet loads them itself. */
  qualificationUnits?: { unitCode: string; unitTitle: string }[];
  /**
   * Dates that already have an entry — a warning, not a constraint: two sites
   * in a day is real; an accidental second write-up of a day isn't.
   */
  datesWithEntries?: string[];
  /** The apprentice's own recent tasks (newest first), for one-tap chips. */
  recentTasks?: string[];
  /** Pre-fill the site (the Today card's recent-site chips). */
  initialSite?: string | null;
  /** The entry's training was signed off — shown, not editable. */
  trainingLocked?: boolean;
}

/* ── Small pieces ───────────────────────────────────────────────────── */

function MoreRow({
  label,
  summary,
  open,
  onToggle,
  children,
}: {
  label: string;
  summary?: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-white/[0.08]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex min-h-[52px] w-full items-center justify-between gap-3 py-2 text-left touch-manipulation"
      >
        <span className="text-[15px] font-medium text-white">{label}</span>
        <span className="flex min-w-0 items-center gap-2">
          {summary ? <span className="truncate text-[13px] text-white">{summary}</span> : null}
          <ChevronDown
            className={cn('h-4 w-4 shrink-0 text-white transition-transform', open && 'rotate-180')}
          />
        </span>
      </button>
      {open ? <div className="space-y-3 pb-4">{children}</div> : null}
    </div>
  );
}

function shortDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function longDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

/* ── Sheet ──────────────────────────────────────────────────────────── */

export function DiaryEntrySheet({
  open,
  onOpenChange,
  onSave,
  recentSites,
  existingEntry,
  initialDate,
  initialSite,
  qualificationUnits,
  datesWithEntries = [],
  recentTasks,
  trainingLocked = false,
}: DiaryEntrySheetProps) {
  const isEditing = !!existingEntry;
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const haptic = useHaptic();
  const today = todayLocalISO();

  // Core
  const [date, setDate] = useState(initialDate || today);
  const [changingDate, setChangingDate] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [whatILearned, setWhatILearned] = useState('');
  // Add more
  const [photos, setPhotos] = useState<string[]>([]);
  const [supervisor, setSupervisor] = useState('');
  const [trainingMinutes, setTrainingMinutes] = useState<number | null>(null);
  const [customMinutes, setCustomMinutes] = useState('');
  const [trainingType, setTrainingType] = useState<TrainingType | null>(null);
  const [unitCodes, setUnitCodes] = useState<string[]>([]);
  const [question, setQuestion] = useState('');
  const [share, setShare] = useState(false);
  const [mood, setMood] = useState<number | null>(null);
  // UI
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  /** null until known — an edit must not un-share while this loads. */
  const [collegeLinked, setCollegeLinked] = useState<boolean | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  /** Skill tags an older entry carried — kept, not shown (no generic tags now). */
  const keptSkills = useRef<string[]>([]);

  /* ── Data the sheet needs ── */

  const { data: employerLink } = useMyEmployerLink(open);
  const supervisors = (employerLink?.supervisors ?? []).filter((s) => s.name);

  // Units: from the page if it passed them, else loaded here.
  const { qualificationCode } = useStudentQualification();
  const { tree } = useQualificationACs(
    open && !qualificationUnits ? (qualificationCode ?? null) : null
  );
  const units = useMemo(
    () =>
      qualificationUnits ??
      tree.units.map((u) => ({ unitCode: u.unitCode, unitTitle: u.unitTitle })),
    [qualificationUnits, tree.units]
  );

  // Is this learner on a college programme? (Only then can a tutor see it.)
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

  /* ── Voice for "what you learned" ── */

  const speech = useSpeechToText({ continuous: true });
  const startVoice = () => {
    speech.resetTranscript();
    speech.startListening();
  };
  const stopVoice = () => {
    speech.stopListening();
    const said = `${speech.transcript} ${speech.interimTranscript}`.trim();
    if (said) setWhatILearned((w) => (w.trim() ? `${w.trim()} ${said}` : said));
    speech.resetTranscript();
  };
  useEffect(() => {
    if (!open && speech.isListening) speech.stopListening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* ── Fill the form on open: an edit, a draft, or blank ── */

  useEffect(() => {
    if (!open) return;
    setOpenRow(null);
    setChangingDate(false);
    setShowAllTasks(false);
    setTaskInput('');
    setDraftRestored(false);
    try {
      storageRemoveSync(LEGACY_DRAFT_KEY);
    } catch {
      /* storage blocked */
    }

    if (existingEntry) {
      const known = new Set(units.map((u) => u.unitCode));
      // Older entries stored units in skills_practised as "301: Title".
      const legacyUnits = existingEntry.skills_practised
        .map((s) => s.match(/^(\S+):/)?.[1])
        .filter((c): c is string => !!c && known.has(c));
      keptSkills.current = existingEntry.skills_practised.filter(
        (s) => !legacyUnits.includes(s.match(/^(\S+):/)?.[1] ?? '\u0000')
      );
      setDate(existingEntry.date);
      setSiteName(existingEntry.site_name);
      setTasks(existingEntry.tasks_completed ?? []);
      setWhatILearned(existingEntry.what_i_learned ?? '');
      setPhotos(existingEntry.photos ?? []);
      setSupervisor(existingEntry.supervisor ?? '');
      setTrainingMinutes(existingEntry.training_minutes ?? null);
      setCustomMinutes('');
      setTrainingType(existingEntry.training_type ?? null);
      setUnitCodes(Array.from(new Set([...(existingEntry.unit_codes ?? []), ...legacyUnits])));
      setQuestion(existingEntry.issues_or_questions ?? '');
      setShare(!!existingEntry.share_with_tutor);
      setMood(existingEntry.mood_rating);
      return;
    }

    keptSkills.current = [];
    const target = initialDate || todayLocalISO();
    const stored = uid ? storageGetJSONSync<DiaryDraft | null>(draftKey(uid), null) : null;
    // A draft finishes the entry you just started — not last week's.
    const fresh = stored && Date.now() - stored.savedAt < DAY_MS ? stored : null;
    if (!fresh && stored && uid) storageRemoveSync(draftKey(uid));
    // …and only for the day it was started for: tapping a gap on Tuesday used
    // to move today's half-written entry onto Tuesday.
    const draft = fresh && (fresh.date || todayLocalISO()) === target ? fresh : null;
    if (draft) {
      setDate(target);
      // The site tapped on the Today card wins over the draft's.
      setSiteName(initialSite ?? draft.siteName);
      setTasks(draft.tasks);
      setTaskInput(draft.taskInput);
      setWhatILearned(draft.whatILearned);
      setPhotos(draft.photos);
      setSupervisor(draft.supervisor);
      setTrainingMinutes(draft.trainingMinutes);
      setCustomMinutes('');
      setTrainingType(draft.trainingType);
      setUnitCodes(draft.unitCodes);
      setQuestion(draft.question);
      setShare(draft.share);
      setMood(draft.mood);
      setDraftRestored(true);
      return;
    }
    setDate(target);
    setSiteName(initialSite ?? '');
    setTasks([]);
    setWhatILearned('');
    setPhotos([]);
    setSupervisor('');
    setTrainingMinutes(null);
    setCustomMinutes('');
    setTrainingType(null);
    setUnitCodes([]);
    setQuestion('');
    setShare(false);
    setMood(null);
    // `units` deliberately not a dependency: the form fills once per open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, existingEntry, initialDate, initialSite, uid]);

  /* ── Autosave the draft (new entries only) ── */

  useEffect(() => {
    if (!open || existingEntry || !uid) return;
    const hasContent =
      siteName.trim() ||
      tasks.length ||
      taskInput.trim() ||
      whatILearned.trim() ||
      photos.length ||
      supervisor.trim() ||
      trainingMinutes ||
      unitCodes.length ||
      question.trim() ||
      mood !== null;
    if (!hasContent) return;
    const t = setTimeout(() => {
      storageSetJSONSync<DiaryDraft>(draftKey(uid), {
        savedAt: Date.now(),
        date,
        siteName,
        tasks,
        taskInput,
        whatILearned,
        photos,
        supervisor,
        trainingMinutes,
        trainingType,
        unitCodes,
        question,
        share,
        mood,
      });
    }, 400);
    return () => clearTimeout(t);
  }, [
    open,
    existingEntry,
    uid,
    date,
    siteName,
    tasks,
    taskInput,
    whatILearned,
    photos,
    supervisor,
    trainingMinutes,
    trainingType,
    unitCodes,
    question,
    share,
    mood,
  ]);

  const discardDraft = () => {
    if (uid) storageRemoveSync(draftKey(uid));
    // The draft's photos were uploaded for an entry that now won't exist.
    if (photos.length) void removePhotoFiles(photos);
    setDraftRestored(false);
    setSiteName('');
    setTasks([]);
    setTaskInput('');
    setWhatILearned('');
    setPhotos([]);
    setSupervisor('');
    setTrainingMinutes(null);
    setTrainingType(null);
    setUnitCodes([]);
    setQuestion('');
    setShare(false);
    setMood(null);
    setDate(initialDate || todayLocalISO());
  };

  /* ── Tasks ── */

  const taskChips = useMemo(() => {
    const own = recentTasks ?? storageGetJSONSync<string[]>(TASK_CACHE_KEY, []);
    const seen = new Set<string>();
    const out: string[] = [];
    for (const t of [...own, ...COMMON_TASKS]) {
      const key = t.trim().toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      out.push(t.trim());
      if (out.length === 12) break;
    }
    return out;
  }, [recentTasks]);

  const toggleTask = (t: string) =>
    setTasks((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const addTypedTask = useCallback(() => {
    const t = taskInput.trim();
    if (!t) return;
    setTasks((cur) => (cur.some((x) => x.toLowerCase() === t.toLowerCase()) ? cur : [...cur, t]));
    setTaskInput('');
  }, [taskInput]);

  /* ── Photos (same upload path as before) ── */

  const handlePhotoUpload = useCallback(
    async (file: File) => {
      if (photos.length >= MAX_PHOTOS) {
        toast.error(`Up to ${MAX_PHOTOS} photos an entry`);
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('That isn’t an image');
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        toast.error('Images must be under 20 MB');
        return;
      }
      setIsUploading(true);
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();
        if (!authUser) throw new Error('Sign in to add photos');
        // Compress + convert (iPhone HEIC → JPEG) before upload: faster on a
        // weak site signal, far smaller storage, consistent type.
        const compressed = await compressImageForUpload(file);
        const ext = compressed.type === 'image/png' ? 'png' : 'jpg';
        const fileName = `${authUser.id}/diary/${Date.now()}.${ext}`;
        const { data, error } = await supabase.storage
          .from('portfolio-evidence')
          .upload(fileName, compressed, {
            cacheControl: '3600',
            upsert: false,
            contentType: compressed.type || 'image/jpeg',
          });
        if (error) throw error;
        const {
          data: { publicUrl },
        } = supabase.storage.from('portfolio-evidence').getPublicUrl(data.path);
        setPhotos((prev) => [...prev, publicUrl]);
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(error instanceof Error ? error.message : 'Couldn’t add the photo');
      } finally {
        setIsUploading(false);
      }
    },
    [photos.length]
  );

  const removePhoto = (index: number) => {
    const url = photos[index];
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    // A photo uploaded in THIS sitting isn't saved anywhere yet — remove the
    // file now. One already on the saved entry is cleaned up by the hook on
    // save (only once nothing else uses it).
    if (url && !(existingEntry?.photos ?? []).includes(url)) void removePhotoFiles([url]);
  };

  /* ── Save ── */

  const canSave = !!siteName.trim() && !isSaving && !isUploading;
  const saveHint = !siteName.trim()
    ? 'Add where you were to save'
    : isUploading
      ? 'Waiting for the photo to finish'
      : null;

  const handleSave = async () => {
    if (!canSave) return;
    setIsSaving(true);
    // A typed task that wasn't "+"-added is kept, not thrown away.
    const typed = taskInput.trim();
    const allTasks =
      typed && !tasks.some((x) => x.toLowerCase() === typed.toLowerCase())
        ? [...tasks, typed]
        : tasks;
    const minutes = trainingMinutes && trainingMinutes > 0 ? Math.round(trainingMinutes) : null;
    // Saving mid-dictation: keep what was said (it only merged on Stop).
    let learned = whatILearned;
    if (speech.isListening) {
      speech.stopListening();
      const said = `${speech.transcript} ${speech.interimTranscript}`.trim();
      if (said) learned = learned.trim() ? `${learned.trim()} ${said}` : said;
      speech.resetTranscript();
      setWhatILearned(learned);
    }
    const sup = supervisor.trim() || null;
    const entry: NewDiaryEntry = {
      date,
      site_name: siteName.trim(),
      supervisor: sup,
      // The account id belongs to the name it was picked with.
      supervisor_user_id:
        existingEntry && (existingEntry.supervisor ?? null) === sup
          ? (existingEntry.supervisor_user_id ?? null)
          : null,
      tasks_completed: allTasks,
      skills_practised: keptSkills.current,
      unit_codes: unitCodes,
      what_i_learned: learned.trim() || null,
      issues_or_questions: question.trim() || null,
      mood_rating: mood,
      photos,
      linked_portfolio_id: existingEntry?.linked_portfolio_id ?? null,
      training_minutes: minutes,
      training_type: minutes ? (trainingType ?? 'practical') : null,
      share_with_tutor:
        collegeLinked === null
          ? (existingEntry?.share_with_tutor ?? false)
          : collegeLinked && share,
      job_id: existingEntry?.job_id ?? null,
    };
    // createEntry/updateEntry return null on failure (and toast), so a dropped
    // signal keeps the sheet open with everything still here.
    const saved = await onSave(entry);
    setIsSaving(false);
    if (saved) {
      haptic.success();
      // Remember the apprentice's own tasks for next time (fallback list).
      const cached = storageGetJSONSync<string[]>(TASK_CACHE_KEY, []);
      storageSetJSONSync(
        TASK_CACHE_KEY,
        Array.from(new Set([...allTasks, ...cached])).slice(0, 20)
      );
      if (!existingEntry && uid) storageRemoveSync(draftKey(uid));
      onOpenChange(false);
    }
  };

  /* ── Summaries for the closed rows ── */

  const trainingSummary = trainingLocked
    ? `${formatMinutes(trainingMinutes ?? 0)} · signed off`
    : trainingMinutes
      ? `${formatMinutes(trainingMinutes)} · ${
          TRAINING_TYPES.find((t) => t.id === (trainingType ?? 'practical'))?.label ?? ''
        }`
      : 'None';
  const unitsSummary = unitCodes.length ? unitCodes.join(', ') : undefined;
  const duplicateDay = !isEditing && datesWithEntries.includes(date);
  const allTaskChips = Array.from(new Set([...tasks, ...taskChips]));
  const visibleTasks = showAllTasks
    ? allTaskChips
    : allTaskChips.filter((t, i) => i < TASK_CHIPS_SHOWN || tasks.includes(t));
  const hiddenTaskCount = allTaskChips.length - visibleTasks.length;
  const yesterday = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return toLocalISODate(d);
  })();
  const toggleRow = (id: string) => setOpenRow((cur) => (cur === id ? null : id));

  return (
    <FormSheet
      width="wide"
      bodyClassName="space-y-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-start lg:gap-10 lg:space-y-0"
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? 'Edit entry' : date === today ? 'Log today' : 'Log a day'}
      description={longDate(date)}
      footer={
        <div className="space-y-2">
          {saveHint ? <p className="text-center text-[12.5px] text-white">{saveHint}</p> : null}
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="h-12 w-full rounded-xl bg-elec-yellow text-[16px] font-bold text-black touch-manipulation disabled:bg-white/[0.12] disabled:text-white"
          >
            {isSaving ? 'Saving…' : isEditing ? 'Save changes' : 'Save entry'}
          </button>
        </div>
      }
    >
      <div className="min-w-0 space-y-5">
        {draftRestored ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.14] px-3.5 py-1.5">
            <span className="text-[13px] text-white">Picked up where you left off</span>
            <button
              type="button"
              onClick={discardDraft}
              className="h-9 rounded-lg border border-white/[0.22] px-3 text-[13px] font-semibold text-white touch-manipulation"
            >
              Start again
            </button>
          </div>
        ) : null}

        {/* Date — three chips, not a tiny text link */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Which day">
          {[
            { id: 'today', label: 'Today', value: today },
            { id: 'yesterday', label: 'Yesterday', value: yesterday },
          ].map((d) => {
            const on = !changingDate && date === d.value;
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setChangingDate(false);
                  setDate(d.value);
                }}
                className={cn(chipBase, on ? chipOn : chipOff)}
              >
                {d.label}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={changingDate || (date !== today && date !== yesterday)}
            onClick={() => setChangingDate((v) => !v)}
            className={cn(
              chipBase,
              changingDate || (date !== today && date !== yesterday) ? chipOn : chipOff
            )}
          >
            {date !== today && date !== yesterday ? shortDate(date) : 'Pick a day'}
          </button>
        </div>
        {changingDate ? (
          <div>
            <label htmlFor="diary-date" className={labelCn}>
              Date
            </label>
            <input
              id="diary-date"
              type="date"
              value={date}
              max={today}
              onChange={(e) => {
                const v = e.target.value;
                if (v && v <= today) setDate(v);
              }}
              className={inputCn}
            />
          </div>
        ) : null}
        {duplicateDay ? (
          <p className="text-[13px] text-white">
            You’ve already logged {date === today ? 'today' : 'this day'}. Save another only if you
            were on a second site.
          </p>
        ) : null}

        {/* Where */}
        <div className={STEP_CARD}>
          <label htmlFor="diary-site" className={STEP_LABEL}>
            <StepNo n={1} />
            Where were you?
          </label>
          {recentSites.length > 0 ? (
            <div className="mb-2 flex flex-wrap gap-2">
              {recentSites.map((s) => {
                const on = siteName.trim().toLowerCase() === s.toLowerCase();
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSiteName(on ? '' : s)}
                    className={cn(chipBase, on ? chipOn : chipOff)}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          ) : null}
          <input
            id="diary-site"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder={recentSites.length ? 'Or type a site or job' : 'Site or job name'}
            className={inputCn}
            autoComplete="off"
          />
        </div>

        {/* One thing you learned */}
        <div className={STEP_CARD}>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="diary-learned" className={STEP_LABEL}>
              <StepNo n={2} />
              One thing you learned
            </label>
            {speech.isSupported ? (
              <button
                type="button"
                onClick={speech.isListening ? stopVoice : startVoice}
                className={cn(
                  'mb-1 inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border px-3 text-[13px] font-semibold touch-manipulation',
                  speech.isListening
                    ? 'border-elec-yellow bg-elec-yellow text-black'
                    : 'border-white/[0.18] text-white'
                )}
              >
                {speech.isListening ? (
                  <>
                    <Square className="h-3.5 w-3.5" /> Stop
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" /> Speak
                  </>
                )}
              </button>
            ) : null}
          </div>
          <textarea
            id="diary-learned"
            value={
              speech.isListening
                ? `${whatILearned}${whatILearned ? ' ' : ''}${speech.transcript} ${speech.interimTranscript}`.trimEnd()
                : whatILearned
            }
            onChange={(e) => !speech.isListening && setWhatILearned(e.target.value)}
            readOnly={speech.isListening}
            placeholder="e.g. How to make off an SWA gland properly"
            rows={3}
            className={textareaCn}
          />
        </div>

        {/* What did you do */}
        <div className={STEP_CARD}>
          <p id="diary-tasks-label" className={STEP_LABEL}>
            <StepNo n={3} />
            What did you do?
          </p>
          <div
            className="mb-2 flex flex-wrap gap-2"
            role="group"
            aria-labelledby="diary-tasks-label"
          >
            {visibleTasks.map((t) => {
              const on = tasks.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleTask(t)}
                  className={cn(chipBase, on ? chipOn : chipOff)}
                >
                  {sentenceCase(t)}
                </button>
              );
            })}
            {hiddenTaskCount > 0 ? (
              <button
                type="button"
                onClick={() => setShowAllTasks(true)}
                className={cn(chipBase, 'border-white/[0.22] font-semibold text-white')}
              >
                More ({hiddenTaskCount})
              </button>
            ) : null}
          </div>
          <input
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTypedTask();
              }
            }}
            onBlur={addTypedTask}
            placeholder="Add something else you did"
            aria-label="Add a task"
            className={inputCn}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="min-w-0 space-y-5 rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5">
        {/* Photos — in the core form, not under "Add more": a photo is what
          turns a diary day into portfolio evidence. */}
        <div>
          <p id="diary-photos-label" className={labelCn}>
            Photos <span className="font-normal">· the job, the board, your work</span>
          </p>
          <div className="grid grid-cols-4 gap-2" role="group" aria-labelledby="diary-photos-label">
            {photos.map((url, i) => (
              <div
                key={url}
                className="relative aspect-square overflow-hidden rounded-xl bg-white/[0.06]"
              >
                <EvidenceImage
                  src={url}
                  alt={`Photo ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  aria-label={`Remove photo ${i + 1}`}
                  className="absolute right-0 top-0 flex h-11 w-11 items-start justify-end p-1.5 touch-manipulation"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/75">
                    <X className="h-3.5 w-3.5 text-white" />
                  </span>
                </button>
              </div>
            ))}
            {photos.length < MAX_PHOTOS && (
              <>
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/[0.35] text-[12px] font-semibold text-white touch-manipulation hover:border-elec-yellow disabled:opacity-60"
                >
                  {isUploading ? (
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  ) : (
                    <Camera className="h-5 w-5" aria-hidden />
                  )}
                  {isUploading ? 'Adding…' : 'Camera'}
                </button>
                {photos.length < MAX_PHOTOS - 1 && (
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/[0.35] text-[12px] font-semibold text-white touch-manipulation hover:border-elec-yellow disabled:opacity-60"
                  >
                    <ImagePlus className="h-5 w-5" aria-hidden />
                    Library
                  </button>
                )}
              </>
            )}
          </div>
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handlePhotoUpload(f);
              e.target.value = '';
            }}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={async (e) => {
              const files = Array.from(e.target.files ?? []).slice(
                0,
                Math.max(0, MAX_PHOTOS - photos.length)
              );
              e.target.value = '';
              for (const f of files) await handlePhotoUpload(f);
            }}
          />
        </div>

        {/* Add more */}
        <div>
          <p className="mb-1 text-[15px] font-semibold text-white">Add more</p>

          <MoreRow
            label="Supervisor"
            summary={supervisor.trim() || undefined}
            open={openRow === 'supervisor'}
            onToggle={() => toggleRow('supervisor')}
          >
            {supervisors.length ? (
              <div className="flex flex-wrap gap-2">
                {supervisors.map((s) => {
                  const on = supervisor.trim().toLowerCase() === s.name.toLowerCase();
                  return (
                    <button
                      key={s.name}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setSupervisor(on ? '' : s.name)}
                      className={cn(chipBase, on ? chipOn : chipOff)}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            ) : null}
            <input
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              placeholder={supervisors.length ? 'Or type a name' : 'Who you worked with'}
              aria-label="Supervisor"
              className={inputCn}
              autoComplete="off"
            />
          </MoreRow>

          <MoreRow
            label="Training time today"
            summary={trainingSummary}
            open={openRow === 'training'}
            onToggle={() => toggleRow('training')}
          >
            {trainingLocked ? (
              <p className="text-[13px] leading-snug text-white">
                {formatMinutes(trainingMinutes ?? 0)} signed off by your tutor or employer. It can’t
                be changed from the diary now.
              </p>
            ) : (
              <>
                <p className="text-[13px] leading-snug text-white">
                  Time you were taught, shadowed or trained — not your normal work.{' '}
                  {collegeLinked
                    ? 'It goes to your tutor to sign off.'
                    : 'After you save, ask your supervisor to confirm it.'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRAINING_PRESETS.map((m) => {
                    const on = trainingMinutes === m && !customMinutes;
                    return (
                      <button
                        key={m}
                        type="button"
                        aria-pressed={on}
                        onClick={() => {
                          setCustomMinutes('');
                          setTrainingMinutes(on ? null : m);
                          if (!on && !trainingType) setTrainingType('practical');
                        }}
                        className={cn(chipBase, on ? chipOn : chipOff)}
                      >
                        {formatMinutes(m)}
                      </button>
                    );
                  })}
                </div>
                <div>
                  <label htmlFor="diary-minutes" className={labelCn}>
                    Or minutes
                  </label>
                  <input
                    id="diary-minutes"
                    inputMode="numeric"
                    value={
                      customMinutes ||
                      (trainingMinutes && !TRAINING_PRESETS.includes(trainingMinutes)
                        ? String(trainingMinutes)
                        : '')
                    }
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^\d]/g, '').slice(0, 4);
                      const n = Math.min(Number(v), 1440);
                      // Show what's stored: 9999 typed is saved as a full day.
                      setCustomMinutes(n > 0 ? String(n) : '');
                      setTrainingMinutes(n > 0 ? n : null);
                      if (n > 0 && !trainingType) setTrainingType('practical');
                    }}
                    placeholder="e.g. 45"
                    className={inputCn}
                  />
                </div>
                {trainingMinutes ? (
                  <div>
                    <p className={labelCn}>What kind of training?</p>
                    <div className="flex flex-wrap gap-2">
                      {TRAINING_TYPES.map((t) => {
                        const on = (trainingType ?? 'practical') === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            aria-pressed={on}
                            title={t.hint}
                            onClick={() => setTrainingType(t.id)}
                            className={cn(chipBase, on ? chipOn : chipOff)}
                          >
                            {t.label}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-2 text-[12.5px] text-white">
                      {TRAINING_TYPES.find((t) => t.id === (trainingType ?? 'practical'))?.hint}
                    </p>
                  </div>
                ) : null}
              </>
            )}
          </MoreRow>

          {units.length ? (
            <MoreRow
              label="Units this covers"
              summary={unitsSummary}
              open={openRow === 'units'}
              onToggle={() => toggleRow('units')}
            >
              <div className="flex flex-wrap gap-2">
                {units.map((u) => {
                  const on = unitCodes.includes(u.unitCode);
                  const title =
                    u.unitTitle.length > 34 ? `${u.unitTitle.slice(0, 32)}…` : u.unitTitle;
                  return (
                    <button
                      key={u.unitCode}
                      type="button"
                      aria-pressed={on}
                      title={u.unitTitle}
                      onClick={() =>
                        setUnitCodes((cur) =>
                          on ? cur.filter((c) => c !== u.unitCode) : [...cur, u.unitCode]
                        )
                      }
                      className={cn(chipBase, 'text-left', on ? chipOn : chipOff)}
                    >
                      <span className="font-semibold">{u.unitCode}</span>
                      <span className="ml-1.5">{title}</span>
                    </button>
                  );
                })}
              </div>
            </MoreRow>
          ) : null}

          <MoreRow
            label="Question for your tutor"
            summary={question.trim() ? (share && collegeLinked ? 'Shared' : 'Private') : undefined}
            open={openRow === 'question'}
            onToggle={() => toggleRow('question')}
          >
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Anything you weren’t sure about, or want to ask"
              aria-label="Question for your tutor"
              rows={3}
              className={textareaCn}
            />
            {collegeLinked === null ? null : collegeLinked ? (
              <button
                type="button"
                role="switch"
                aria-checked={share}
                onClick={() => setShare((v) => !v)}
                className="flex min-h-[48px] w-full items-center justify-between gap-3 rounded-xl border border-white/[0.14] px-3.5 py-2 text-left touch-manipulation"
              >
                <span>
                  <span className="block text-[14px] font-medium text-white">
                    Share this entry with my college
                  </span>
                  <span className="block text-[12.5px] text-white">
                    Your college’s staff can see the entry and your question, never how the day
                    felt. Your tutor gets a heads-up about the question.
                  </span>
                </span>
                <span
                  className={cn(
                    'relative h-7 w-12 shrink-0 rounded-full transition-colors',
                    share ? 'bg-elec-yellow' : 'bg-white/[0.18]'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-1 h-5 w-5 rounded-full bg-black transition-all',
                      share ? 'left-6' : 'left-1'
                    )}
                  />
                </span>
              </button>
            ) : (
              <p className="text-[12.5px] text-white">
                Kept in your diary. If your college uses Elec-Mate, you can share entries with them
                once you’re linked to it.
              </p>
            )}
          </MoreRow>

          <MoreRow
            label="How was today?"
            summary={mood ? `${MOOD_EMOJI[mood]} ${MOOD_LABEL[mood]}` : undefined}
            open={openRow === 'mood'}
            onToggle={() => toggleRow('mood')}
          >
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((m) => {
                const on = mood === m;
                return (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={on}
                    aria-label={MOOD_LABEL[m]}
                    onClick={() => setMood(on ? null : m)}
                    className={cn(
                      'flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-xl border px-1 touch-manipulation',
                      on
                        ? 'border-elec-yellow bg-elec-yellow text-black'
                        : 'border-white/[0.12] text-white'
                    )}
                  >
                    <span className="text-[22px] leading-none">{MOOD_EMOJI[m]}</span>
                    <span className="text-[11.5px] font-medium leading-tight">{MOOD_LABEL[m]}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[12.5px] text-white">Just for you — never shared.</p>
          </MoreRow>
        </div>
      </div>
    </FormSheet>
  );
}

export default DiaryEntrySheet;
