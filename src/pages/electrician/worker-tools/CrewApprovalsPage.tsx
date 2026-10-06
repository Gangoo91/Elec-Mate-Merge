/**
 * Worker Tools › Your crew (ELE-1831).
 *
 * For a supervisor: the timesheets, expenses and leave waiting from the people
 * who name them as their workplace supervisor. Approve, or send back with a
 * reason. The server decides who counts as their crew and refuses anything
 * else; the office still sees and can decide everything in the Employer Hub.
 */
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Check, Loader2, Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import {
  useCrewApprovals,
  useDecideCrewRequest,
  type CrewKind,
} from '@/hooks/useCrewApprovals';
import {
  ListCard,
  EmptyState,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
} from '@/components/employer/editorial';

const day = (d?: string | null) => (d ? format(parseISO(d), 'EEE d MMM') : '');
const money = (n: number) => `£${Number(n || 0).toFixed(2)}`;

function RequestCard({
  kind,
  id,
  who,
  title,
  detail,
}: {
  kind: CrewKind;
  id: string;
  who: string;
  title: string;
  detail?: string | null;
}) {
  const decide = useDecideCrewRequest();
  const [sendingBack, setSendingBack] = useState(false);
  const [reason, setReason] = useState('');
  const first = who.split(' ')[0] || who;
  const busy = decide.isPending;

  const run = async (approve: boolean) => {
    try {
      await decide.mutateAsync({ kind, id, approve, reason: approve ? undefined : reason.trim() });
      toast.success(approve ? `Approved for ${first}` : `Sent back to ${first} with your note`);
    } catch (e) {
      toast.error((e as Error).message || 'Not saved');
    }
  };

  return (
    <div className="-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 space-y-3">
      <div>
        <p className="text-[12px] font-medium text-white">{who}</p>
        <p className="mt-1 text-[16px] font-semibold text-white">{title}</p>
        {detail && <p className="mt-1 text-[14px] text-white leading-relaxed">{detail}</p>}
      </div>
      {sendingBack ? (
        <div className="space-y-2">
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder={`What does ${first} need to change?`}
            className={textareaClass}
          />
          <div className="grid grid-cols-2 gap-2">
            <SecondaryButton onClick={() => setSendingBack(false)} disabled={busy}>
              Cancel
            </SecondaryButton>
            <PrimaryButton onClick={() => run(false)} disabled={busy || reason.trim().length < 3}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send back'}
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <SecondaryButton onClick={() => setSendingBack(true)} disabled={busy}>
            <Undo2 className="h-4 w-4 mr-1.5" />
            Send back
          </SecondaryButton>
          <PrimaryButton onClick={() => run(true)} disabled={busy}>
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Check className="h-4 w-4 mr-1.5" />
                Approve
              </>
            )}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
      {children}
    </section>
  );
}

export default function CrewApprovalsPage() {
  const { data, isLoading } = useCrewApprovals();
  const ts = data?.timesheets ?? [];
  const ex = data?.expenses ?? [];
  const lv = data?.leave ?? [];
  const nothing = ts.length + ex.length + lv.length === 0;

  return (
    <WorkerToolPage
      eyebrow="Supervisor"
      title="Your crew"
      description="Timesheets, expenses and leave from the people you supervise. The office sees everything you decide."
    >
      {isLoading ? (
        <LoadingState className="py-10" />
      ) : nothing ? (
        <ListCard>
          <EmptyState
            title={data?.crew_count ? 'Nothing waiting' : 'No crew yet'}
            description={
              data?.crew_count
                ? "When someone you supervise sends a timesheet, expense or leave request, it appears here."
                : 'The office sets who you supervise on each person in Team. Until then, approvals stay with the office.'
            }
          />
        </ListCard>
      ) : (
        <div className="space-y-6">
          {ts.length > 0 && (
            <Group title="Timesheets">
              {ts.map((t) => (
                <RequestCard
                  key={t.id}
                  kind="timesheet"
                  id={t.id}
                  who={t.name}
                  title={`${day(t.date)} · ${t.total_hours ?? 0} hours`}
                  detail={t.notes}
                />
              ))}
            </Group>
          )}
          {ex.length > 0 && (
            <Group title="Expenses">
              {ex.map((e) => (
                <RequestCard
                  key={e.id}
                  kind="expense"
                  id={e.id}
                  who={e.name}
                  title={`${money(e.amount)}${e.category ? ` · ${e.category}` : ''}`}
                  detail={[e.description, e.submitted_date ? `Sent ${day(e.submitted_date)}` : null]
                    .filter(Boolean)
                    .join(' · ')}
                />
              ))}
            </Group>
          )}
          {lv.length > 0 && (
            <Group title="Leave">
              {lv.map((l) => (
                <RequestCard
                  key={l.id}
                  kind="leave"
                  id={l.id}
                  who={l.name}
                  title={`${l.type ?? 'Leave'} · ${day(l.start_date)}${
                    l.end_date && l.end_date !== l.start_date ? ` – ${day(l.end_date)}` : ''
                  }`}
                  detail={[
                    l.half_day ? 'Half day' : l.total_days ? `${l.total_days} days` : null,
                    l.reason,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                />
              ))}
            </Group>
          )}
        </div>
      )}
    </WorkerToolPage>
  );
}
