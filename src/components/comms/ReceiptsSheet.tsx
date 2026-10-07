/**
 * Who has seen a Team comms message — and chase the rest (ELE-1959).
 * Chasing is rate-limited in the database (comms_chase: once an hour).
 */
import type { ReactNode } from 'react';
import { format, parseISO } from 'date-fns';
import { BellRing, Check, CheckCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { useChase } from '@/hooks/useTeamComms';
import type { CommsRecipient } from '@/services/teamCommsService';
import { chaseLockedUntil, chaseTargets } from './commsUi';

const when = (iso: string | null) => (iso ? format(parseISO(iso), 'EEE d MMM, HH:mm') : '');

export function ReceiptsSheet({
  open,
  onOpenChange,
  communicationId,
  title,
  requiresAck,
  people,
  lastChasedAt,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  communicationId: string;
  title: string;
  requiresAck: boolean;
  people: CommsRecipient[];
  lastChasedAt: string | null;
}) {
  const chase = useChase();
  const targets = chaseTargets(people, requiresAck);
  const locked = chaseLockedUntil(lastChasedAt);

  const done = people.filter((p) => (requiresAck ? p.acknowledged_at : p.read_at));
  const readOnly = requiresAck ? people.filter((p) => p.read_at && !p.acknowledged_at) : [];
  const notYet = people.filter((p) => !p.read_at);

  const doChase = () =>
    chase.mutate(communicationId, {
      onSuccess: (n) =>
        n > 0
          ? toast.success(`Reminder sent to ${n} ${n === 1 ? 'person' : 'people'}`)
          : toast.message('Everyone is up to date. Nobody to chase'),
      onError: (e) => toast.error(e instanceof Error ? e.message : 'Could not chase'),
    });

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={requiresAck ? 'Acknowledgements' : 'Read receipts'}
      title={title}
      description={
        requiresAck
          ? `${done.length} of ${people.length} acknowledged`
          : `${done.length} of ${people.length} read`
      }
      width="lg"
      footer={
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={doChase}
            disabled={chase.isPending || targets.length === 0 || !!locked}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-elec-yellow text-[15px] font-semibold text-black touch-manipulation disabled:bg-white/[0.1] disabled:text-white"
          >
            {chase.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <BellRing className="h-4 w-4" />}
            {targets.length === 0
              ? 'Nobody to chase'
              : `Chase ${targets.length} ${targets.length === 1 ? 'person' : 'people'}`}
          </button>
          <p className="text-center text-[12px] text-white">
            {locked
              ? `Chased at ${format(parseISO(lastChasedAt!), 'HH:mm')} — you can chase again at ${format(locked, 'HH:mm')}.`
              : 'Sends a push and a bell to each of them. Once an hour at most.'}
          </p>
        </div>
      }
    >
      <Group
        label={requiresAck ? 'Acknowledged' : 'Read'}
        tone="green"
        people={done}
        detail={(p) => when(requiresAck ? p.acknowledged_at : p.read_at)}
        icon={<CheckCheck className="h-4 w-4 text-emerald-300" />}
      />
      {requiresAck && (
        <Group
          label="Read, not acknowledged"
          tone="amber"
          people={readOnly}
          detail={(p) => `Read ${when(p.read_at)}`}
          icon={<Check className="h-4 w-4 text-amber-300" />}
        />
      )}
      <Group
        label="Not opened yet"
        tone="neutral"
        people={notYet}
        detail={(p) =>
          (p.status ?? '').toLowerCase() !== 'active'
            ? 'No longer on the team'
            : p.has_app
              ? 'Not opened'
              : 'Not on the app yet. Tell them in person'
        }
      />
    </FormSheet>
  );
}

function Group({
  label,
  tone,
  people,
  detail,
  icon,
}: {
  label: string;
  tone: 'green' | 'amber' | 'neutral';
  people: CommsRecipient[];
  detail: (p: CommsRecipient) => string;
  icon?: ReactNode;
}) {
  if (people.length === 0) return null;
  return (
    <section>
      <h3 className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-white">
        <span
          className={cn(
            'h-2 w-2 rounded-full',
            tone === 'green' && 'bg-emerald-400',
            tone === 'amber' && 'bg-amber-400',
            tone === 'neutral' && 'bg-white/40'
          )}
        />
        {label} · {people.length}
      </h3>
      <div className="divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.1]">
        {people.map((p) => (
          <div key={p.employee_id} className="flex min-h-[52px] items-center gap-3 bg-white/[0.03] px-4 py-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[12px] font-semibold text-white">
              {p.name
                .split(/\s+/)
                .map((s) => s[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14.5px] font-medium text-white">{p.name}</span>
              <span className="block truncate text-[12px] text-white">{detail(p)}</span>
            </span>
            {icon}
          </div>
        ))}
      </div>
    </section>
  );
}
