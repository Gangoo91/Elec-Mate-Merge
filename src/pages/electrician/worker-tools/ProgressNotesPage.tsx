/**
 * ProgressNotesPage — Worker Tools › Progress notes (ELE-2003).
 *
 * End-of-day update in 30 seconds: pick the job, say or type what's done, add
 * photos, send. Notes land in the job feed the office reads (Progress logs,
 * job sheet) and ring the office bell (notify_progress_note). Each note shows
 * who wrote it — stamped server-side, never typed by the client. A worker can
 * change or delete their own note for 24 hours while still on the job.
 * Apprentices can hand a note to their OTJ log as a draft they finish there.
 */

import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Loader2, Send, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  Field,
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  SplitLayout,
  LoadingState,
} from '@/components/employer/editorial';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { WT_PROGRESS_NOTES_HELP } from '@/components/worker-tools/help/worker-help-2';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import {
  useMyJobs,
  useProgressNotes,
  NOTE_EDIT_WINDOW_MS,
  type ProgressNote,
} from '@/hooks/useWorkerSelfService';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';
import { useAuth } from '@/contexts/AuthContext';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { rpcErrorMessage } from '@/hooks/useWorkerJobSite';
import {
  WorkerPanel,
  SectionTitle,
  Verdict,
  JobChoice,
  Segmented,
  workerTextareaCn,
} from '@/components/worker-tools/WorkerUi';
import { WorkerPhotoPicker, WorkerPhotoStrip } from '@/components/worker-tools/WorkerPhotos';
import { OutboxWaitingList } from '@/components/worker-tools/WorkerOutbox';
import { useWorkerOutbox } from '@/hooks/useWorkerOutbox';
import { queuedToast } from '@/components/worker-tools/outboxToast';
import { DictateButton } from '@/components/worker-tools/DictateButton';
import { SubmitWorkOtjSheet } from '@/components/apprentice-hub/SubmitWorkOtjSheet';

const MIN_NOTE_LENGTH = 4;

const isToday = (iso: string) => new Date(iso).toDateString() === new Date().toDateString();

function stamp(iso: string): string {
  const d = parseISO(iso);
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  if (isToday(iso)) return `Today ${format(d, 'HH:mm')}`;
  return format(d, 'EEE d MMM, HH:mm');
}

export default function ProgressNotesPage() {
  const [searchParams] = useSearchParams();
  const [selectedJobId, setSelectedJobId] = useState<string>(searchParams.get('job') ?? '');
  const [note, setNote] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [pickerKey, setPickerKey] = useState(0);
  const [show, setShow] = useState<'all' | 'today'>('all');
  const [editing, setEditing] = useState<ProgressNote | null>(null);
  const [otjFrom, setOtjFrom] = useState<ProgressNote | null>(null);

  const { data: jobs = [], isLoading: jobsLoading } = useMyJobs('active');
  const { data: me } = useMyEmployeeRecord();
  const { user } = useAuth();
  const uid = user?.id;
  // Same rule as employer_access_role(): 'Apprentice', not 'Apprentice Co-ordinator'.
  const teamRole = (
    (me as { team_role?: string | null } | null | undefined)?.team_role ?? ''
  ).trim();
  const isApprentice = teamRole.toLowerCase() === 'apprentice';

  // One job → just use it.
  const jobId = selectedJobId || (jobs.length === 1 ? jobs[0].id : '');
  const selectedJob = jobs.find((j) => j.id === jobId);

  const {
    recentNotes = [],
    isLoading: notesLoading,
    sendNote,
    deleteNote,
  } = useProgressNotes(jobId || undefined);
  const [heldPhotos, setHeldPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { pending: outboxPending } = useWorkerOutbox();
  const waitingHere = outboxPending.some((o) => o.kind === 'progress_note' && o.jobId === jobId);

  // Live: a colleague or the office adding a note on this job.
  useRealtimeInvalidate(
    'worker-progress-notes',
    [{ table: 'employer_job_comments', filter: `job_id=eq.${jobId}` }],
    [['progress-notes', jobId]],
    Boolean(jobId)
  );

  const todayCount = useMemo(
    () => recentNotes.filter((n) => isToday(n.created_at)).length,
    [recentNotes]
  );
  const mineToday = useMemo(
    () =>
      recentNotes.filter((n) => isToday(n.created_at) && !!uid && n.author_user_id === uid).length,
    [recentNotes, uid]
  );
  const shown = show === 'today' ? recentNotes.filter((n) => isToday(n.created_at)) : recentNotes;

  const trimmed = note.trim();
  const canSubmit = !!jobId && trimmed.length >= MIN_NOTE_LENGTH && !isSubmitting && !uploading;

  const handleSubmit = async () => {
    if (!jobId) return toast.error('Pick the job first');
    if (trimmed.length < MIN_NOTE_LENGTH) return toast.error('Add a few words about what’s done');
    setIsSubmitting(true);
    try {
      // ELE-1828: through the outbox, so a note (and its photos) works with no signal.
      const result = await sendNote({
        jobId,
        jobTitle: selectedJob?.title,
        content: trimmed,
        paths: photos,
        heldFiles: heldPhotos,
      });
      if (result === 'sent') toast.success('Sent to the office');
      else queuedToast('Note saved');
      setNote('');
      setPhotos([]);
      setHeldPhotos([]);
      setPickerKey((k) => k + 1);
    } catch (e) {
      toast.error(rpcErrorMessage(e, 'Couldn’t send the note. Try again'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const noJobs = !jobsLoading && jobs.length === 0;
  // Live "Before you start": a note needs a job to go on.
  const helpBlockers: HelpBlocker[] = noJobs
    ? [{ text: 'You are not on any jobs yet. You can log progress once the office puts you on one.' }]
    : [];

  const headline = !selectedJob
    ? jobs.length > 1
      ? 'Which job is this for?'
      : 'Log today’s progress'
    : mineToday > 0
      ? `You’ve logged ${mineToday} ${mineToday === 1 ? 'note' : 'notes'} today`
      : 'Nothing from you on this job today';

  const compose = (
    <div className="space-y-5">
      {jobs.length > 1 && (
        <div data-help="wt-notes.job">
          <SectionTitle title="Job" />
          <JobChoice jobs={jobs} value={jobId} onChange={setSelectedJobId} loading={jobsLoading} />
        </div>
      )}

      <WorkerPanel className="space-y-4 p-4 sm:p-5">
        <Field label="What’s done, what’s next, anything in the way">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. First fix done upstairs. Kitchen waiting on the plasterer. Need 2 more 32A RCBOs."
            aria-label="Progress note"
            data-help="wt-notes.text"
            className={cn(workerTextareaCn, 'min-h-[132px]')}
            maxLength={4000}
          />
        </Field>
        <div className="grid grid-cols-1 gap-2" data-help="wt-notes.extras">
          <DictateButton
            className="w-full"
            onText={(t) => setNote((n) => (n ? `${n.trimEnd()} ${t}` : t))}
          />
          {jobId ? (
            <WorkerPhotoPicker
              key={`${jobId}-${pickerKey}`}
              jobId={jobId}
              onChange={setPhotos}
              onBusyChange={setUploading}
              onHeldChange={setHeldPhotos}
            />
          ) : null}
        </div>
        <PrimaryButton
          data-help="wt-notes.send"
          fullWidth
          size="lg"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="h-12 rounded-xl text-[15px]"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : uploading ? (
            'Photos uploading…'
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Send to the office
            </>
          )}
        </PrimaryButton>
        <p className="text-[12.5px] text-white">
          Timestamped with your name. You can change it for 24 hours.
        </p>
      </WorkerPanel>
    </div>
  );

  const timeline = jobId ? (
    <div>
      <SectionTitle
        title="On this job"
        right={
          recentNotes.length > 0 ? (
            <div className="w-[190px]">
              <Segmented<'all' | 'today'>
                value={show}
                onChange={setShow}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'today', label: 'Today', count: todayCount },
                ]}
              />
            </div>
          ) : undefined
        }
      />
      {/* ELE-1828: notes still on the phone, waiting for signal */}
      <OutboxWaitingList kinds={['progress_note']} jobId={jobId} className="mb-3" />
      {notesLoading ? (
        <LoadingState className="py-10" />
      ) : shown.length === 0 && waitingHere ? null : shown.length === 0 ? (
        <WorkerPanel className="px-4 py-4 sm:px-5">
          <p className="text-[13.5px] text-white">
            {recentNotes.length === 0
              ? 'No notes on this job yet. Whoever is here next will see what you write.'
              : 'Nothing logged today yet.'}
          </p>
        </WorkerPanel>
      ) : (
        <WorkerPanel className="divide-y divide-white/[0.07]">
          <div data-help="wt-notes.timeline" className="divide-y divide-white/[0.07]">
          {shown.map((n) => (
            <NoteRow
              key={n.id}
              note={n}
              mine={!!uid && n.author_user_id === uid}
              isApprentice={isApprentice}
              onEdit={() => setEditing(n)}
              onDelete={async () => {
                try {
                  await deleteNote(n.id);
                  toast.success('Note deleted');
                } catch (e) {
                  toast.error(rpcErrorMessage(e, 'Couldn’t delete it'));
                }
              }}
              onOtj={() => setOtjFrom(n)}
            />
          ))}
          </div>
        </WorkerPanel>
      )}
    </div>
  ) : null;

  return (
    <WorkerToolPage
      eyebrow="Notes"
      title="Progress Notes"
      actions={<PageHelpButton help={WT_PROGRESS_NOTES_HELP} blockers={helpBlockers} />}
    >
      <HowItWorks help={WT_PROGRESS_NOTES_HELP} blockers={helpBlockers} />
      {noJobs ? (
        <WorkerPanel className="px-4 py-5 sm:px-5">
          <p className="text-[15px] font-semibold text-white">No jobs on your list</p>
          <p className="mt-1 text-[13px] text-white">
            You can log progress once the office puts you on a job.
          </p>
        </WorkerPanel>
      ) : (
        <>
          <Verdict
            headline={headline}
            detail={
              selectedJob
                ? [selectedJob.title, selectedJob.address].filter(Boolean).join(' · ')
                : 'The office sees it straight away, with your name and the time.'
            }
          />
          <SplitLayout ratio="1-1" primary={compose} secondary={timeline} />
        </>
      )}

      <EditNoteSheet note={editing} jobId={jobId} onClose={() => setEditing(null)} />

      {isApprentice && (
        <SubmitWorkOtjSheet
          open={!!otjFrom}
          onOpenChange={(o) => !o && setOtjFrom(null)}
          prefill={
            otjFrom
              ? {
                  title: selectedJob ? `On site: ${selectedJob.title}` : 'On site',
                  description: otjFrom.content,
                }
              : undefined
          }
          onSubmitted={() => {
            setOtjFrom(null);
            toast.success('Sent to your OTJ log for sign-off');
          }}
        />
      )}
    </WorkerToolPage>
  );
}

function NoteRow({
  note,
  mine,
  isApprentice,
  onEdit,
  onDelete,
  onOtj,
}: {
  note: ProgressNote;
  mine: boolean;
  isApprentice: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onOtj: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const editable = mine && Date.now() - new Date(note.created_at).getTime() < NOTE_EDIT_WINDOW_MS;
  const who = mine
    ? 'You'
    : note.author_name || (note.author_employee_id ? 'Team member' : 'The office');
  return (
    <div className="px-4 py-3.5 sm:px-5">
      <p className="flex flex-wrap items-baseline gap-x-2 text-[13px]">
        <span className="font-semibold text-white">{who}</span>
        <span className="text-white" title={format(parseISO(note.created_at), 'd MMM yyyy, HH:mm')}>
          {stamp(note.created_at)}
          {note.edited_at && ' · edited'}
        </span>
      </p>
      <p className="mt-1 text-[14.5px] leading-relaxed text-white whitespace-pre-wrap break-words">
        {note.content}
      </p>
      {note.photos.length > 0 && (
        <WorkerPhotoStrip
          bucket="visual-uploads"
          paths={note.photos}
          columns={4}
          className="mt-2.5"
        />
      )}
      {(editable || (mine && isApprentice)) && (
        <div className="mt-2.5 flex flex-wrap gap-2">
          {editable && (
            <>
              <button
                type="button"
                onClick={onEdit}
                className="h-11 rounded-xl border border-white/[0.18] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation"
              >
                Change
              </button>
              <button
                type="button"
                onClick={() => (confirming ? onDelete() : setConfirming(true))}
                onBlur={() => setConfirming(false)}
                className={cn(
                  'h-11 rounded-xl px-4 text-[14px] font-semibold touch-manipulation',
                  confirming
                    ? 'bg-red-500 text-white'
                    : 'border border-white/[0.18] bg-white/[0.06] text-white'
                )}
              >
                {confirming ? 'Tap again to delete' : 'Delete'}
              </button>
            </>
          )}
          {mine && isApprentice && (
            <button
              type="button"
              onClick={onOtj}
              className="flex h-11 items-center gap-2 rounded-xl border border-white/[0.18] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation"
            >
              <GraduationCap className="h-4 w-4 text-elec-yellow" />
              Use as OTJ evidence
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function EditNoteSheet({
  note,
  jobId,
  onClose,
}: {
  note: ProgressNote | null;
  jobId: string;
  onClose: () => void;
}) {
  return (
    <Sheet open={!!note} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-0">
        <SheetTitle className="sr-only">Change your note</SheetTitle>
        <SheetDescription className="sr-only">Edit the words or photos</SheetDescription>
        {note && <EditNoteBody key={note.id} note={note} jobId={jobId} onClose={onClose} />}
      </SheetContent>
    </Sheet>
  );
}

function EditNoteBody({
  note,
  jobId,
  onClose,
}: {
  note: ProgressNote;
  jobId: string;
  onClose: () => void;
}) {
  const { updateNote, isUpdating } = useProgressNotes(jobId);
  const [text, setText] = useState(note.content);
  const [photos, setPhotos] = useState<string[]>(note.photos);
  const [uploading, setUploading] = useState(false);
  const save = async () => {
    if (text.trim().length < MIN_NOTE_LENGTH) return toast.error('Add a few words');
    try {
      await updateNote({ id: note.id, content: text.trim(), photos });
      toast.success('Note updated');
      onClose();
    } catch (e) {
      toast.error(rpcErrorMessage(e, 'Couldn’t save the change'));
    }
  };
  return (
    <SheetShell
      eyebrow="Progress note"
      title="Change your note"
      description={`Written ${format(parseISO(note.created_at), 'EEE d MMM, HH:mm')}. The office sees it marked as edited.`}
      footer={
        <>
          <SecondaryButton size="lg" onClick={onClose} className="px-5">
            Cancel
          </SecondaryButton>
          <PrimaryButton size="lg" fullWidth onClick={save} disabled={isUpdating || uploading}>
            {isUpdating ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : uploading ? (
              'Photos uploading…'
            ) : (
              'Save'
            )}
          </PrimaryButton>
        </>
      }
    >
      <Field label="Note">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={cn(workerTextareaCn, 'min-h-[140px]')}
          maxLength={4000}
        />
      </Field>
      <DictateButton
        className="w-full"
        onText={(t) => setText((n) => (n ? `${n.trimEnd()} ${t}` : t))}
      />
      <Field label="Photos">
        <WorkerPhotoPicker
          jobId={jobId}
          initialPaths={note.photos}
          onChange={setPhotos}
          onBusyChange={setUploading}
        />
      </Field>
    </SheetShell>
  );
}
