/**
 * ProgressNotesPage
 *
 * Routed page (replaces ProgressNotesSheet) for workers to log daily progress
 * notes against their active jobs. Compose form + a filterable timeline of recent
 * notes with relative timestamps. Same data layer as the sheet — hooks, mutation,
 * handlers and validation are carried over unchanged; only the chrome and UX differ.
 */

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Clock, Loader2, MapPin, Send } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  Dot,
  EmptyState,
  Field,
  ListCard,
  ListCardHeader,
  Pill,
  PrimaryButton,
  SplitLayout,
  StatStrip,
  SuccessCheckmark,
  selectContentClass,
  selectTriggerClass,
  textareaClass,
  type Tone,
} from '@/components/employer/editorial';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { useMyJobs, useProgressNotes } from '@/hooks/useWorkerSelfService';

const statusTone = (status?: string): Tone => {
  const s = (status || '').toLowerCase();
  if (s.includes('progress') || s.includes('active') || s.includes('site')) return 'emerald';
  if (s.includes('hold') || s.includes('pending') || s.includes('schedul')) return 'amber';
  if (s.includes('cancel')) return 'red';
  return 'blue';
};

/** Relative, glanceable timestamp — "Just now", "12m ago", "3h ago", "Yesterday", date. */
const relativeTime = (iso: string): string => {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diffMs = Date.now() - then;
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const absoluteTime = (iso: string): string =>
  new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

const MIN_NOTE_LENGTH = 4;

type TimelineFilter = 'all' | 'today';

export default function ProgressNotesPage() {
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [note, setNote] = useState('');
  const [touched, setTouched] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>('all');

  const { data: jobs, isLoading: jobsLoading } = useMyJobs('active');
  const { recentNotes, isLoading: notesLoading, submitNote, isSubmitting } =
    useProgressNotes(selectedJobId);

  const selectedJob = jobs?.find((j) => j.id === selectedJobId);
  const noNotes = (recentNotes?.length ?? 0) === 0;

  // Glanceable summary derived from the already-fetched notes for this job.
  const lastNote = recentNotes && recentNotes.length > 0 ? recentNotes[0] : undefined;
  const loggedToday = useMemo(() => {
    if (!recentNotes) return 0;
    const today = new Date().toDateString();
    return recentNotes.filter((n) => new Date(n.created_at).toDateString() === today).length;
  }, [recentNotes]);

  // In-page filter over the already-fetched notes — no new queries.
  const filteredNotes = useMemo(() => {
    if (!recentNotes) return [];
    if (timelineFilter === 'today') {
      const today = new Date().toDateString();
      return recentNotes.filter((n) => new Date(n.created_at).toDateString() === today);
    }
    return recentNotes;
  }, [recentNotes, timelineFilter]);

  const trimmed = note.trim();
  const noteTooShort = trimmed.length > 0 && trimmed.length < MIN_NOTE_LENGTH;
  const canSubmit = !!selectedJobId && trimmed.length >= MIN_NOTE_LENGTH && !isSubmitting;

  const handleSubmit = async () => {
    if (!selectedJobId) {
      setTouched(true);
      toast.error('Please select a job');
      return;
    }
    if (trimmed.length < MIN_NOTE_LENGTH) {
      setTouched(true);
      toast.error('Please enter a progress note');
      return;
    }

    try {
      await submitNote({
        jobId: selectedJobId,
        content: trimmed,
      });
      toast.success('Progress note submitted');
      setNote('');
      setTouched(false);
      setJustSubmitted(true);
      window.setTimeout(() => setJustSubmitted(false), 1600);
    } catch {
      toast.error('Failed to submit note');
    }
  };

  const noJobs = !jobsLoading && (jobs?.length ?? 0) === 0;

  return (
    <WorkerToolPage
      eyebrow="Notes"
      title="Progress Notes"
      description="Log today's progress against an active job. Each note is timestamped and sent to your employer."
    >
      <SuccessCheckmark show={justSubmitted} />

      {/* No active jobs at all */}
      {noJobs ? (
        <EmptyState
          title="No active jobs"
          description="You'll be able to log progress once you're assigned to a job."
        />
      ) : (
        <SplitLayout
          ratio="1-1"
          primary={
            /* Compose */
            <section className="space-y-5">
            {/* Job selector */}
            <Field label="Job" required>
              <Select
                value={selectedJobId}
                onValueChange={(v) => {
                  setSelectedJobId(v);
                  setTouched(false);
                  setTimelineFilter('all');
                }}
                disabled={jobsLoading || (jobs?.length ?? 0) === 0}
              >
                <SelectTrigger
                  className={selectTriggerClass}
                  aria-label="Choose a job"
                  aria-invalid={touched && !selectedJobId}
                >
                  <SelectValue
                    placeholder={
                      jobsLoading
                        ? 'Loading your jobs…'
                        : (jobs?.length ?? 0) === 0
                          ? 'No active jobs'
                          : 'Choose a job…'
                    }
                  />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {jobs?.map((job) => (
                    <SelectItem
                      key={job.id}
                      value={job.id}
                      className="text-white focus:bg-white/10 focus:text-white"
                    >
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {touched && !selectedJobId && (
                <p className="text-[11px] text-red-400">Select a job before submitting.</p>
              )}

              {/* Selected job context */}
              {selectedJob && (
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-white truncate">
                      {selectedJob.title}
                    </p>
                    <p className="text-[11.5px] text-white/50 mt-0.5 flex items-center gap-1.5 truncate">
                      {selectedJob.address && <MapPin className="h-3 w-3 shrink-0" />}
                      {[selectedJob.client_name, selectedJob.address]
                        .filter(Boolean)
                        .join(' · ') || 'Assigned job'}
                    </p>
                  </div>
                  {selectedJob.status && (
                    <Pill tone={statusTone(selectedJob.status)} className="shrink-0 capitalize">
                      {selectedJob.status}
                    </Pill>
                  )}
                </div>
              )}
            </Field>

            {/* Glanceable summary for the selected job */}
            {selectedJobId && !notesLoading && (
              <StatStrip
                columns={2}
                stats={[
                  {
                    label: 'Logged today',
                    value: loggedToday,
                    accent: loggedToday > 0,
                  },
                  {
                    label: 'Last note',
                    value: lastNote ? relativeTime(lastNote.created_at) : '—',
                    sub: lastNote ? undefined : 'None yet',
                  },
                ]}
              />
            )}

            {/* Note input */}
            <Field
              label="Progress note"
              hint="Describe work completed, issues encountered and materials used."
            >
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="Describe work completed today, any issues encountered, materials used…"
                aria-label="Progress note"
                aria-invalid={touched && noteTooShort}
                className={`${textareaClass} min-h-[140px]`}
              />
              <div className="flex items-center justify-between">
                <span
                  className={
                    noteTooShort ? 'text-[11px] text-red-400' : 'text-[11px] text-white/50'
                  }
                >
                  {noteTooShort ? 'Add a little more detail.' : 'Timestamped automatically.'}
                </span>
                <span className="text-[11px] text-white/40 tabular-nums">{note.length}</span>
              </div>
            </Field>

            {/* Photo upload — coming soon */}
            <button
              type="button"
              disabled
              aria-label="Add photo (coming soon)"
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-white/[0.03] border border-dashed border-white/[0.12] text-white/60 text-[13px] font-medium disabled:cursor-not-allowed touch-manipulation"
            >
              <Camera className="h-4 w-4" />
              Add photo
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/30">Soon</span>
            </button>

            <PrimaryButton
              fullWidth
              size="lg"
              onClick={handleSubmit}
              disabled={!canSubmit}
              aria-label="Submit progress note"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Submit note
                </>
              )}
            </PrimaryButton>
          </section>
          }
          secondary={
            /* Recent notes timeline */
            selectedJobId ? (
            <ListCard>
              <ListCardHeader
                title="Recent notes"
                meta={
                  !notesLoading && !noNotes ? (
                    <Pill tone="blue">{recentNotes!.length}</Pill>
                  ) : undefined
                }
              />

              {/* Timeline filter — operates on already-fetched notes */}
              {!notesLoading && !noNotes && (
                <div className="px-4 sm:px-5 py-3 border-b border-white/[0.06] flex items-center gap-2">
                  {(['all', 'today'] as TimelineFilter[]).map((f) => {
                    const isActive = timelineFilter === f;
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setTimelineFilter(f)}
                        aria-pressed={isActive}
                        className={`h-9 px-3.5 rounded-full text-[12px] font-medium capitalize touch-manipulation transition-colors ${
                          isActive
                            ? 'bg-white/[0.1] text-white'
                            : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.08]'
                        }`}
                      >
                        {f === 'today' ? `Today (${loggedToday})` : 'All'}
                      </button>
                    );
                  })}
                </div>
              )}

              {notesLoading ? (
                <div className="divide-y divide-white/[0.06]">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="px-4 sm:px-5 py-4 animate-pulse">
                      <div className="h-3 w-4/5 rounded bg-white/[0.06]" />
                      <div className="mt-2 h-3 w-1/2 rounded bg-white/[0.04]" />
                      <div className="mt-3 h-2.5 w-20 rounded bg-white/[0.04]" />
                    </div>
                  ))}
                </div>
              ) : noNotes ? (
                <div className="p-4">
                  <EmptyState
                    title="No notes on this job yet"
                    description="Your first progress note will appear here."
                  />
                </div>
              ) : filteredNotes.length === 0 ? (
                <div className="p-4">
                  <EmptyState
                    title="No notes today"
                    description="Nothing logged on this job today yet."
                  />
                </div>
              ) : (
                <div className="divide-y divide-white/[0.06]">
                  {filteredNotes.map((n) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                      className="flex items-start gap-3 px-4 sm:px-5 py-4"
                    >
                      <Dot tone="blue" className="mt-1.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] leading-relaxed text-white whitespace-pre-wrap break-words">
                          {n.content}
                        </p>
                        <p
                          className="mt-2 flex items-center gap-1.5 text-[11px] text-white/40 tabular-nums"
                          title={absoluteTime(n.created_at)}
                        >
                          <Clock className="h-3 w-3 shrink-0" />
                          {relativeTime(n.created_at)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </ListCard>
            ) : null
          }
        />
      )}
    </WorkerToolPage>
  );
}
