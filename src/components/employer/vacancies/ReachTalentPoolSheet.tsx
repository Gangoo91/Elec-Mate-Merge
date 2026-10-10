import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Check, Loader2, Send } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
} from '@/components/employer/editorial';
import {
  panel,
  PlainEmpty,
  StatusPill,
  rowBtnSecondary,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { getEcsCardLabel } from '@/data/uk-electrician-constants';
import { useInviteMatches, useVacancyMatches, type VacancyMatch } from '@/hooks/useVacancyReach';

/* ==========================================================================
   ReachTalentPoolSheet — ELE-1957.

   Opens straight after a vacancy goes live (and from the vacancy sheet):
   "12 available electricians match. Invite them?" Everyone is ticked; one tap
   invites them all. Only people who switched on "Let firms find me" in their
   Elec-ID are ever listed (the server enforces it). Invited people get a push
   and the invite waits at the top of their Job Vacancies page, where they
   apply with their Elec-ID in one tap.
   ========================================================================== */

interface ReachTalentPoolSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vacancy: { id: string; title: string; location?: string | null; status?: string } | null;
  /** True when opened by the publish itself, so the copy can say "Your vacancy is live". */
  justPublished?: boolean;
}

const roleNoun: Record<string, [string, string]> = {
  apprentice: ['apprentice', 'apprentices'],
  labourer: ['person', 'people'],
  electrician: ['electrician', 'electricians'],
};

function rateLabel(m: VacancyMatch) {
  if (!m.rate_amount || m.rate_amount <= 0) return null;
  const amount = Number(m.rate_amount);
  const unit =
    m.rate_type === 'hourly'
      ? '/hr'
      : m.rate_type === 'weekly'
        ? '/week'
        : m.rate_type === 'yearly'
          ? ' a year'
          : '/day';
  return `Asks £${amount.toLocaleString('en-GB', { maximumFractionDigits: 2 })}${unit}`;
}

/** "2.4 miles", "18 miles". District centroids, so never more precise than that. */
function milesLabel(miles: number) {
  if (miles < 1) return 'under a mile';
  const n = miles < 10 ? Math.round(miles * 10) / 10 : Math.round(miles);
  return `${n.toLocaleString('en-GB')} miles`;
}

function distanceLine(m: VacancyMatch) {
  if (m.miles == null) return m.near ? 'near the job' : null;
  const base = `${milesLabel(m.miles)} away`;
  if (m.will_travel === false && m.travel_radius_miles)
    return `${base}, travels ${m.travel_radius_miles}`;
  return base;
}

export function ReachTalentPoolSheet({
  open,
  onOpenChange,
  vacancy,
  justPublished,
}: ReachTalentPoolSheetProps) {
  const { data, isLoading, error, refetch } = useVacancyMatches(open ? vacancy?.id : null);
  const invite = useInviteMatches();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState('');

  const invitable = useMemo(
    () => (data?.matches ?? []).filter((m) => !m.invited && !m.applied),
    [data]
  );

  // Everyone not yet invited starts ticked — the point is one tap.
  useEffect(() => {
    if (!open) return;
    setSelected(new Set(invitable.map((m) => m.profile_id)));
  }, [open, invitable]);

  useEffect(() => {
    if (!open) setMessage('');
  }, [open]);

  const [one, many] = roleNoun[data?.role ?? 'electrician'];
  const isLive = (data?.vacancy_status ?? vacancy?.status) === 'Open';
  const count = selected.size;
  const allSelected = invitable.length > 0 && count === invitable.length;

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handleInvite = async () => {
    if (!vacancy || count === 0) return;
    try {
      const r = await invite.mutateAsync({
        vacancyId: vacancy.id,
        profileIds: Array.from(selected),
        message,
      });
      toast({
        title: r.invited === 1 ? '1 person invited' : `${r.invited} people invited`,
        description:
          r.invited > 0
            ? 'They get a notification and can apply with their Elec-ID in one tap. Applications land in Candidates.'
            : 'Everyone you picked had already been invited.',
      });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Invites not sent',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const summary = (() => {
    if (!data || data.error) return null;
    if (data.match_count === 0) return null;
    const parts = [
      `${data.match_count} available ${data.match_count === 1 ? one : many} match this role`,
    ];
    if (data.vacancy_located) {
      parts.push(`${data.within_count} within ${data.radius_miles} miles`);
      const byTown = data.near_count - data.within_count;
      if (byTown > 0 && vacancy?.location) parts.push(`${byTown} more list ${vacancy.location}`);
    } else if (data.near_count > 0 && vacancy?.location) {
      parts.push(`${data.near_count} near ${vacancy.location}`);
    }
    if (data.invited_count > 0) parts.push(`${data.invited_count} already invited`);
    return parts.join(' · ');
  })();

  // Be straight about what the distance is based on.
  const distanceNote = (() => {
    if (!data || data.error || data.match_count === 0) return null;
    if (!data.vacancy_located)
      return 'Add a postcode to the vacancy to see how far away each person is.';
    const unlocated = data.match_count - data.located_count;
    if (unlocated <= 0)
      return `Distances from ${data.vacancy_place ?? 'the job'}, by postcode district.`;
    return `Distances from ${data.vacancy_place ?? 'the job'}, by postcode district. ${unlocated} of ${data.match_count} have not said where they are based yet. They are matched on their area name where they gave one.`;
  })();

  const description = justPublished
    ? 'Your vacancy is live. Invite people from the talent pool so they see it today.'
    : 'Invite people from the talent pool to apply. They apply with their Elec-ID in one tap.';

  let body: ReactNode;
  if (isLoading) {
    body = <LoadingBlocks />;
  } else if (error) {
    body = (
      <PlainEmpty
        text="Could not load the talent pool. Check your signal and try again."
        action="Try again"
        onAction={() => refetch()}
      />
    );
  } else if (data?.error === 'not_employer') {
    body = (
      <PlainEmpty text="The talent pool is part of the Employer plan. Your vacancy is still live on the Elec-Mate job board, where electricians can find it and apply." />
    );
  } else if (!data || data.match_count === 0) {
    body = (
      <PlainEmpty
        text={`No available ${many} match this role yet. ${
          data && data.pool_size > 0
            ? `${data.pool_size} people are in the talent pool, but none fit this role. Your vacancy is still on the job board.`
            : 'Nobody is in the talent pool yet. Your vacancy is still on the job board, and anyone who switches on "Let firms find me" will show here.'
        }`}
      />
    );
  } else {
    body = (
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
        <div className="min-w-0 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-white">{summary}</p>
              {distanceNote && (
                <p className="mt-0.5 text-[12.5px] leading-snug text-white">{distanceNote}</p>
              )}
            </div>
            {invitable.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  setSelected(allSelected ? new Set() : new Set(invitable.map((m) => m.profile_id)))
                }
                className={rowBtnSecondary}
              >
                {allSelected ? 'Clear all' : 'Select all'}
              </button>
            )}
          </div>

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {(data.matches ?? []).map((m) => {
              const done = m.invited || m.applied;
              const isOn = selected.has(m.profile_id);
              const rate = rateLabel(m);
              return (
                <button
                  key={m.profile_id}
                  type="button"
                  disabled={done}
                  onClick={() => toggle(m.profile_id)}
                  aria-pressed={isOn}
                  className={cn(
                    'flex min-h-[72px] w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors touch-manipulation',
                    done
                      ? 'cursor-default border-white/[0.08] bg-white/[0.03]'
                      : isOn
                        ? 'border-elec-yellow bg-white/[0.06]'
                        : 'border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.07]'
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                      done
                        ? 'border-white/20'
                        : isOn
                          ? 'border-elec-yellow bg-elec-yellow'
                          : 'border-white/30'
                    )}
                  >
                    {(isOn || done) && (
                      <Check className={cn('h-3 w-3', done ? 'text-white' : 'text-black')} />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-white">
                      {m.name.charAt(0).toUpperCase() + m.name.slice(1)}
                    </span>
                    <span className="mt-0.5 block truncate text-[13px] text-white">
                      {[
                        m.job_title,
                        m.ecs_card_type ? getEcsCardLabel(m.ecs_card_type) : null,
                        m.is_verified ? 'verified' : null,
                      ]
                        .filter(Boolean)
                        .join(' · ') || 'Elec-ID holder'}
                    </span>
                    <span className="mt-0.5 block truncate text-[12.5px] text-white">
                      {[m.area || 'Area not given', distanceLine(m), rate]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </span>
                  {m.applied ? (
                    <StatusPill tone="green">Applied</StatusPill>
                  ) : m.invited ? (
                    <StatusPill>Invited</StatusPill>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <Field
            label="Message (optional)"
            hint="Goes with the invite. Say what the work is and when it starts."
          >
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
              rows={4}
              placeholder="Steady commercial work in town, start Monday."
              className={textareaClass}
            />
          </Field>
          <div className={cn(panel, 'px-4 py-3 text-[13px] leading-relaxed text-white sm:px-5')}>
            Only people who switched on <span className="font-semibold">Let firms find me</span> in
            their Elec-ID are listed. You see their first name and initial. They get a notification,
            and their application comes to Candidates with their Elec-ID attached.
          </div>
        </div>
      </div>
    );
  }

  const canInvite = isLive && count > 0 && !invite.isPending && !!data && !data.error;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      title={vacancy?.title ? `Invite people to ${vacancy.title}` : 'Invite people'}
      description={
        !isLive && data && !data.error
          ? 'This vacancy is not live. Publish it, then invite people.'
          : description
      }
      footer={
        <div className="flex gap-2">
          <SecondaryButton
            className="h-12 flex-1 rounded-xl sm:min-w-[120px] sm:flex-none"
            onClick={() => onOpenChange(false)}
          >
            {data && data.match_count > 0 ? 'Not now' : 'Close'}
          </SecondaryButton>
          {data && data.match_count > 0 && (
            <PrimaryButton
              className="h-12 flex-1 rounded-xl text-[15px] sm:min-w-[200px] sm:flex-none"
              disabled={!canInvite}
              onClick={handleInvite}
            >
              {invite.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {count === 0 ? 'Pick people to invite' : `Invite ${count}`}
            </PrimaryButton>
          )}
        </div>
      }
    >
      {body}
    </FormSheet>
  );
}
