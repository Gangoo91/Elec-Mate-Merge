/**
 * New Team comms message (ELE-1959): to everyone, a job's crew, or chosen
 * people; "Must acknowledge" is a real toggle (not inferred from priority);
 * attach photos or PDFs. Sent through comms_send, which only ever reaches
 * ACTIVE workers of the sender's own firm.
 */
import { useEffect, useMemo, useState } from 'react';
import { Check, Loader2, Paperclip, Search } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { useActiveEmployees } from '@/hooks/useEmployees';
import { useJobOptions, useSendTeamMessage } from '@/hooks/useTeamComms';
import type { CommsAudience, CommsType } from '@/services/teamCommsService';
import { PendingAttachments } from './CommsAttachments';
import { useAttachmentPicker } from './useAttachmentPicker';

const inputCn =
  'h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus-visible:ring-0 touch-manipulation';
const labelCn = 'mb-1 block text-[12px] font-medium text-white';
const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

export function OfficeComposeSheet({
  open,
  onOpenChange,
  firmId,
  onSent,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  firmId: string | null | undefined;
  onSent: (id: string) => void;
}) {
  const { data: employees = [] } = useActiveEmployees();
  const [audience, setAudience] = useState<CommsAudience>('all');
  const { data: jobs = [], isLoading: jobsLoading } = useJobOptions(open && audience === 'job');
  const send = useSendTeamMessage();
  const picker = useAttachmentPicker(firmId);

  const [jobId, setJobId] = useState<string | null>(null);
  const [people, setPeople] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [kind, setKind] = useState<CommsType>('announcement');
  const [mustAck, setMustAck] = useState(false);
  const [ackTouched, setAckTouched] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // A safety alert asks for acknowledgement by default — the office can untick it.
  useEffect(() => {
    if (!ackTouched) setMustAck(kind === 'alert');
  }, [kind, ackTouched]);

  const reset = () => {
    setAudience('all');
    setJobId(null);
    setPeople(new Set());
    setSearch('');
    setKind('announcement');
    setMustAck(false);
    setAckTouched(false);
    setUrgent(false);
    setPinned(false);
    setTitle('');
    setBody('');
  };

  const close = (o: boolean) => {
    if (!o) picker.discardAll();
    onOpenChange(o);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return employees.filter((e) => !q || e.name.toLowerCase().includes(q));
  }, [employees, search]);

  const count =
    audience === 'all'
      ? employees.length
      : audience === 'job'
        ? (jobs.find((j) => j.job_id === jobId)?.crew ?? 0)
        : people.size;

  const canSend =
    count > 0 && title.trim().length > 0 && body.trim().length > 0 && !picker.busy && !send.isPending;

  const submit = () => {
    if (!canSend) return;
    send.mutate(
      {
        title: title.trim(),
        body: body.trim(),
        type: kind,
        priority: urgent ? 'high' : 'normal',
        audience,
        jobId,
        employeeIds: Array.from(people),
        requiresAck: mustAck,
        pinned,
        attachments: picker.ready,
      },
      {
        onSuccess: (id) => {
          toast.success(`Sent to ${count} ${count === 1 ? 'person' : 'people'}`);
          picker.clear();
          reset();
          onOpenChange(false);
          onSent(id);
        },
        onError: (e) => toast.error(e instanceof Error ? e.message : 'Message not sent'),
      }
    );
  };

  const toggle = (id: string) =>
    setPeople((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <FormSheet
      open={open}
      onOpenChange={close}
      eyebrow="Team comms"
      title="New message"
      description="Each message is a thread. The team can reply, and you see who has read and acknowledged it."
      width="wide"
      bodyClassName="grid gap-8 lg:grid-cols-2 lg:gap-12"
      footer={
        <button
          type="button"
          data-help="comms.send"
          onClick={submit}
          disabled={!canSend}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-elec-yellow text-[15px] font-semibold text-black touch-manipulation disabled:bg-white/[0.1] disabled:text-white"
        >
          {send.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {count > 0 ? `Send to ${count} ${count === 1 ? 'person' : 'people'}` : 'Choose who it goes to'}
        </button>
      }
    >
      {/* Who and what */}
      <div className="space-y-6">
        <section>
          <h3 className="mb-2.5 text-[15px] font-semibold text-white">Who is it for?</h3>
          <div className="grid grid-cols-3 gap-2" data-help="comms.audience">
            {(
              [
                ['all', `Everyone (${employees.length})`],
                ['job', 'A job’s crew'],
                ['people', 'Choose people'],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => setAudience(k)}
                className={cn(
                  'h-11 rounded-full border px-2 text-[13px] touch-manipulation',
                  audience === k ? chipOn : chipOff
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {audience === 'job' && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-white/[0.1]">
              {jobsLoading ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </div>
              ) : jobs.length === 0 ? (
                <p className="px-4 py-4 text-[13px] text-white">
                  No jobs have anyone assigned yet. Assign people to a job first, or choose people.
                </p>
              ) : (
                <div className="max-h-64 divide-y divide-white/[0.08] overflow-y-auto">
                  {jobs.map((j) => (
                    <PickRow
                      key={j.job_id}
                      label={j.title}
                      sub={`${j.crew} on the crew${j.status ? ` · ${j.status}` : ''}`}
                      on={jobId === j.job_id}
                      onClick={() => setJobId(j.job_id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {audience === 'people' && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-white/[0.1]">
              <div className="flex items-center gap-2 border-b border-white/[0.08] px-3">
                <Search className="h-4 w-4 shrink-0 text-white" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search the team"
                  className="h-11 w-full bg-transparent text-[16px] text-white placeholder:text-white/40 focus:outline-none"
                />
              </div>
              <div className="max-h-64 divide-y divide-white/[0.08] overflow-y-auto">
                {filtered.map((e) => (
                  <PickRow
                    key={e.id}
                    multi
                    label={e.name}
                    sub={e.user_id ? e.role || 'Team member' : 'Not on the app yet. No notification'}
                    on={people.has(e.id)}
                    onClick={() => toggle(e.id)}
                  />
                ))}
                {filtered.length === 0 && (
                  <p className="px-4 py-4 text-[13px] text-white">Nobody matches.</p>
                )}
              </div>
            </div>
          )}
        </section>

        <section>
          <h3 className="mb-2.5 text-[15px] font-semibold text-white">What kind of message?</h3>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ['announcement', 'Announcement'],
                ['message', 'Job message'],
                ['alert', 'Safety alert'],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={cn(
                  'h-11 rounded-full border px-2 text-[13px] touch-manipulation',
                  kind === k ? chipOn : chipOff
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.1]">
          <ToggleRow
            label="Must acknowledge"
            sub="Each person taps Acknowledge. You see who has, and can chase the rest."
            on={mustAck}
            onClick={() => {
              setAckTouched(true);
              setMustAck((v) => !v);
            }}
          />
          <ToggleRow
            label="Urgent"
            sub="Marked urgent in their list."
            on={urgent}
            onClick={() => setUrgent((v) => !v)}
          />
          <ToggleRow
            label="Pin to the top"
            sub="Stays first in everyone’s list."
            on={pinned}
            onClick={() => setPinned((v) => !v)}
          />
        </section>
      </div>

      {/* The message */}
      <div className="space-y-6">
        <div>
          <label className={labelCn} htmlFor="comms-title">
            Title
          </label>
          <input
            id="comms-title"
            value={title}
            maxLength={200}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Scaffold down at Orchard Close"
            className={inputCn}
          />
        </div>
        <div>
          <label className={labelCn} htmlFor="comms-body">
            Message
          </label>
          <textarea
            id="comms-body"
            value={body}
            maxLength={8000}
            onChange={(e) => setBody(e.target.value)}
            rows={7}
            placeholder="What does the team need to know?"
            className="min-h-[160px] w-full resize-y rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white placeholder:text-white/40 caret-elec-yellow hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none touch-manipulation"
          />
        </div>
        <div>
          <span className={labelCn}>Attachments</span>
          <PendingAttachments items={picker.items} onRemove={picker.remove} />
          <input
            ref={picker.inputRef}
            type="file"
            accept="image/*,application/pdf"
            multiple
            className="hidden"
            onChange={(e) => {
              void picker.addFiles(e.target.files);
              e.target.value = '';
            }}
          />
          <button
            type="button"
            onClick={picker.open}
            disabled={picker.full || !firmId}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-medium text-white touch-manipulation disabled:opacity-40"
          >
            <Paperclip className="h-4 w-4" />
            Add a photo or PDF
          </button>
          <p className="mt-1.5 text-[12px] text-white">
            Up to 6 files, 15 MB each. Only the people on this message can open them.
          </p>
        </div>
      </div>
    </FormSheet>
  );
}

function PickRow({
  label,
  sub,
  on,
  multi,
  onClick,
}: {
  label: string;
  sub?: string;
  on: boolean;
  multi?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className="flex min-h-[52px] w-full items-center gap-3 bg-white/[0.02] px-4 py-2 text-left touch-manipulation hover:bg-white/[0.05]"
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14.5px] font-medium text-white">{label}</span>
        {sub && <span className="block truncate text-[12px] text-white">{sub}</span>}
      </span>
      <span
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center border',
          multi ? 'rounded-md' : 'rounded-full',
          on ? 'border-elec-yellow bg-elec-yellow' : 'border-white/30'
        )}
      >
        {on && <Check className="h-4 w-4 text-black" />}
      </span>
    </button>
  );
}

function ToggleRow({
  label,
  sub,
  on,
  onClick,
}: {
  label: string;
  sub: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className="flex min-h-[60px] w-full items-center gap-3 bg-white/[0.02] px-4 py-2.5 text-left touch-manipulation hover:bg-white/[0.05]"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] font-medium text-white">{label}</span>
        <span className="block text-[12px] leading-snug text-white">{sub}</span>
      </span>
      <span
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-colors',
          on ? 'bg-elec-yellow' : 'bg-white/[0.18]'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform',
            on ? 'translate-x-[22px] bg-black' : 'translate-x-0.5'
          )}
        />
      </span>
    </button>
  );
}
