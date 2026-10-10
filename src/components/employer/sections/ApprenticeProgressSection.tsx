import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw, Send, Loader2, Check, Undo2, GraduationCap, UserPlus } from 'lucide-react';
import { getActingEmployerId } from '@/lib/actingEmployer';
import {
  useEmployerOtjAttestations,
  useDecideOtjAttestation,
  OTJ_ACTIVITY_LABEL,
  type PendingOtjAttestation,
} from '@/hooks/useEmployerOtjAttestations';
import FormSheet from '@/components/forms/FormSheet';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import {
  Initials,
  PlainEmpty,
  Row,
  Tag,
  colClass,
  frameClass,
  rowBtnPrimary,
  rowBtnSecondary,
  rowsClass,
  twoColClass,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useCreateCommunication } from '@/hooks/useCommunications';
import {
  PageFrame,
  PageHero,
  StatStrip,
  IconButton,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/employer/editorial';
import { useApprenticeProgress } from '@/hooks/useApprenticeProgress';
import { ApprenticeFundingPanel } from '@/components/employer/payLaw/ApprenticeFundingPanel';
import { EmployerReviewAction } from '@/components/employer/EmployerReviewAction';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { APPRENTICES_HELP } from '@/components/employer/help/people';
import {
  useUnrosteredApprentices,
  useNudgeApprenticeReview,
  UNROSTERED_APPRENTICES_KEY,
  type UnrosteredApprentice,
} from '@/hooks/useUnrosteredApprentices';

/* ==========================================================================
   ApprenticeProgressSection — live view of the apprentices on the employer's
   books, sourced from their college records. Surfaces the signals an employer
   actually acts on: off-the-job hours on track, attendance, EPA stage, and
   whether a progress review is overdue. Read-only; the college owns the data.
   ========================================================================== */

const epaTone = (status: string | null): Tone => {
  const s = (status ?? '').toLowerCase();
  if (s.includes('pass') || s.includes('complete') || s.includes('achiev')) return 'emerald';
  if (s.includes('gateway') || s.includes('ready') || s.includes('booked')) return 'yellow';
  if (s.includes('fail') || s.includes('resit')) return 'red';
  return 'blue';
};

/** Tone for the college's recorded risk rating (RAG or high/medium/low). */
const riskTone = (level: string): Tone => {
  const s = level.toLowerCase();
  if (s.includes('high') || s.includes('red') || s.includes('at risk')) return 'red';
  if (s.includes('med') || s.includes('amber')) return 'amber';
  if (s.includes('low') || s.includes('green') || s.includes('on track')) return 'emerald';
  return 'blue';
};

/** Honest programme-dates fragment — renders only what the college recorded. */
const programmeDates = (start: string | null, end: string | null): string | null => {
  const f = (iso: string) => format(parseISO(iso), 'MMM yyyy');
  if (start && end) return `${f(start)} → ${f(end)}`;
  if (start) return `Started ${f(start)}`;
  if (end) return `Due to complete ${f(end)}`;
  return null;
};

export function ApprenticeProgressSection() {
  const { data, isLoading, isError, refetch, isFetching } = useApprenticeProgress();

  const rows = useMemo(() => data ?? [], [data]);
  // Store the row itself, not an id — the bridge RPC can return the same
  // person twice (linked to two employer_employees rows), so ids don't
  // uniquely identify a row.
  const [selected, setSelected] = useState<(typeof rows)[number] | null>(null);

  // Overdue review → one-tap message to the apprentice through the comms
  // rails (push included). The RPC keys rows by the student's auth uid, so
  // resolve the employer_employees row here — comms recipients FK to it.
  const createCommunication = useCreateCommunication();
  const [nudging, setNudging] = useState(false);
  const sendReviewNudge = async (row: NonNullable<typeof selected>) => {
    setNudging(true);
    try {
      // The RPC now returns the roster row id directly; fall back to a lookup
      // scoped to the ACTING employer (a co-admin's uid is not the company id).
      let empId: string | null = row.employeeId;
      if (!empId) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const actingId = user ? ((await getActingEmployerId(user.id)) ?? user.id) : '';
        const { data: emp } = await supabase
          .from('employer_employees')
          .select('id')
          .eq('user_id', row.studentUserId)
          .eq('employer_id', actingId)
          .maybeSingle();
        empId = emp?.id ?? null;
      }
      if (!empId) {
        toast({
          title: 'Not on your team yet',
          description: `Add ${row.name.split(' ')[0]} to your team to message them here.`,
        });
        return;
      }
      await createCommunication.mutateAsync({
        type: 'message',
        title: 'Progress review due',
        content: `Your apprenticeship progress review is due (at least every 3 months)${
          row.lastReviewDate
            ? `. The last one was on ${format(parseISO(row.lastReviewDate), 'd MMM yyyy')}`
            : ''
        }. Reply with the days that work for you this week and we'll book it in.`,
        priority: 'high',
        target_audience: 'specific',
        target_employee_ids: [empId],
        is_pinned: false,
        expires_at: null,
        sender_id: null,
        attachments: null,
      });
      toast({
        title: 'Review nudge sent',
        description: `${row.name} has been asked to arrange their progress review.`,
      });
    } catch {
      toast({
        title: 'Nudge failed',
        description: 'Message was not sent.',
        variant: 'destructive',
      });
    } finally {
      setNudging(false);
    }
  };

  // ── Apprentices the college links to this firm, not on the team ──────
  // (ELE-1955) The college recorded this firm as their employer, but there is
  // no roster row. The nudge works without one; "Add to your team" makes a
  // roster row with their email and they link it themselves.
  const { data: unrostered = [] } = useUnrosteredApprentices();
  const nudgeUnrostered = useNudgeApprenticeReview();
  const [pendingApprentice, setPendingApprentice] = useState<UnrosteredApprentice | null>(null);
  // Adding an apprentice the college named: done on the server with the real
  // address from the college record, so the firm never sees their email
  // before they join. The apprentice links their account by accepting.
  const queryClient = useQueryClient();
  const [addingId, setAddingId] = useState<string | null>(null);
  const addApprentice = async (a: UnrosteredApprentice) => {
    setAddingId(a.studentId);
    try {
      const { data: rosterId, error } = await supabase.rpc(
        'add_unrostered_apprentice' as never,
        {
          p_student: a.studentId,
        } as never
      );
      if (error)
        throw new Error(
          error.message.includes('no_email')
            ? 'Their college has no email for them, so there is nobody to invite.'
            : 'Could not add them. Try again in a minute.'
        );
      const { error: sendErr } = await supabase.functions.invoke('send-team-welcome', {
        body: { employeeId: rosterId as unknown as string },
      });
      if (sendErr)
        throw new Error(
          'Added to your team, but the invite email did not go. Use Send reminder on Team.'
        );
      toast({
        title: `Invite sent to ${a.name.split(' ')[0]}`,
        description: 'They join your team when they accept it.',
      });
      setPendingApprentice(null);
      queryClient.invalidateQueries({ queryKey: UNROSTERED_APPRENTICES_KEY });
    } catch (e) {
      toast({ title: (e as Error).message, variant: 'destructive' });
    } finally {
      setAddingId(null);
    }
  };
  const askUnrostered = async (a: UnrosteredApprentice) => {
    try {
      const res = await nudgeUnrostered.mutateAsync(a.studentId);
      const first = a.name.split(' ')[0];
      if (res.sent) {
        toast({
          title: 'Review nudge sent',
          description: `${first} has been asked to arrange their progress review.`,
        });
      } else if ((res as { reason?: string }).reason === 'recent') {
        const lastAsked = (res as { last_nudged_at: string }).last_nudged_at;
        toast({
          title: 'Already asked',
          description: `${first} was asked on ${format(parseISO(lastAsked), 'd MMM')}. You can ask again 3 days after that.`,
        });
      } else {
        toast({
          title: `${first} isn't on Elec-Mate yet`,
          description: 'Add them to your team and they get an invite by email.',
        });
      }
    } catch (err) {
      toast({
        title: 'Nudge failed',
        description: err instanceof Error ? err.message : 'Message was not sent.',
        variant: 'destructive',
      });
    }
  };

  // ── Workplace attestation inbox ──────────────────────────────────────
  const { data: attestations = [], isLoading: attestationsLoading } = useEmployerOtjAttestations();
  const decide = useDecideOtjAttestation();
  const [reviewing, setReviewing] = useState<PendingOtjAttestation | null>(null);
  const [sendBackComment, setSendBackComment] = useState('');
  const [sendBackArmed, setSendBackArmed] = useState(false);
  const closeReview = () => {
    setReviewing(null);
    setSendBackComment('');
    setSendBackArmed(false);
  };

  // Deep link from the "X logged N training hours" notification:
  // /employer?section=apprentices&entry=<id> opens that entry's review sheet.
  // If it's no longer pending (already decided), the param is simply dropped.
  const [searchParams, setSearchParams] = useSearchParams();
  const entryParam = searchParams.get('entry');
  useEffect(() => {
    if (!entryParam || attestationsLoading) return;
    const match = attestations.find((a) => a.entryId === entryParam);
    if (match) setReviewing(match);
    const next = new URLSearchParams(searchParams);
    next.delete('entry');
    setSearchParams(next, { replace: true });
  }, [entryParam, attestationsLoading, attestations, searchParams, setSearchParams]);
  const handleDecision = async (entry: PendingOtjAttestation, decision: 'attest' | 'send_back') => {
    if (decision === 'send_back' && !sendBackArmed) {
      setSendBackArmed(true);
      return;
    }
    try {
      await decide.mutateAsync({
        entryId: entry.entryId,
        decision,
        comment: decision === 'send_back' ? sendBackComment : undefined,
      });
      toast({
        title: decision === 'attest' ? 'Hours attested' : 'Sent back to the apprentice',
        description:
          decision === 'attest'
            ? `${entry.apprenticeName}'s ${(entry.durationMinutes / 60).toFixed(1)}h now count as workplace-attested. Their college still verifies separately.`
            : `${entry.apprenticeName} will see your note and can fix and resubmit.`,
      });
      closeReview();
    } catch (err) {
      toast({
        title: 'Could not record that',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };
  const attestationsByApprentice = useMemo(() => {
    const m = new Map<string, number>();
    for (const a of attestations) m.set(a.studentUserId, (m.get(a.studentUserId) ?? 0) + 1);
    return m;
  }, [attestations]);

  const stats = useMemo(() => {
    const total = rows.length;
    const onTrack = rows.filter((r) => r.otjOnTrack).length;
    const overdue = rows.filter((r) => r.reviewOverdue).length;
    const avgAttendance = total
      ? Math.round(rows.reduce((s, r) => s + r.attendancePercent, 0) / total)
      : 0;
    return { total, onTrack, overdue, avgAttendance };
  }, [rows]);

  // Live "Before you start" line for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] =
    !isLoading && !isError && rows.length === 0 && unrostered.length === 0
      ? [
          {
            text: 'No apprentices linked yet. They show here once an apprentice on your team is enrolled with a college.',
          },
        ]
      : [];

  // Where the apprentices stand, in one line.
  const heroLine = (() => {
    if (isLoading) return 'College progress for the apprentices on your books.';
    if (rows.length === 0 && unrostered.length === 0)
      return 'No apprentices linked yet. They show here once a college enrols one of your team.';
    const bits: string[] = [];
    if (attestations.length > 0)
      bits.push(
        `${attestations.length} training ${attestations.length === 1 ? 'entry' : 'entries'} to attest`
      );
    if (stats.overdue > 0)
      bits.push(`${stats.overdue} ${stats.overdue === 1 ? 'review' : 'reviews'} overdue`);
    if (unrostered.length > 0) bits.push(`${unrostered.length} not on your team yet`);
    if (bits.length === 0)
      return `${rows.length} ${rows.length === 1 ? 'apprentice' : 'apprentices'}, all up to date.`;
    const s = bits.join(', ');
    return `${s.charAt(0).toUpperCase()}${s.slice(1)}.`;
  })();

  const boxed = 'overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04]';

  const unrosteredPanel =
    !isLoading && unrostered.length > 0 ? (
      <section data-help="apprentices.unrostered">
        <PanelTitle title="Not on your team yet" meta={unrostered.length} />
        <div className={cn(panel, rowsClass)}>
          {unrostered.map((a) => (
            <Row
              key={a.studentId}
              lead={<Initials name={a.name} />}
              title={a.name}
              detail={
                [a.courseName, a.collegeName].filter(Boolean).join(' · ') || 'College apprentice'
              }
              trailing={
                a.invitedRosterId ? (
                  <Tag tone="neutral">Invited</Tag>
                ) : a.reviewOverdue ? (
                  <Tag tone="red">Review due</Tag>
                ) : (
                  <Tag tone="outline">Add</Tag>
                )
              }
              onClick={() => setPendingApprentice(a)}
            />
          ))}
          <p className="px-4 py-3 text-[13px] leading-relaxed text-white sm:px-5">
            Their college lists your firm as their employer. Add them to your team to see their
            hours, attendance and reviews here, and to confirm their training hours.
          </p>
        </div>
      </section>
    ) : null;

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Apprentices"
        description={heroLine}
        actions={
          <div className="flex items-center gap-2">
            <PageHelpButton
              help={APPRENTICES_HELP}
              blockers={helpBlockers}
              askContext={{ page: 'apprentices' }}
            />
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className={isFetching ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
            </IconButton>
          </div>
        }
      />

      <HowItWorks
        help={APPRENTICES_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'apprentices' }}
      />

      {isLoading || (attestationsLoading && rows.length === 0 && !data) ? (
        <LoadingBlocks />
      ) : isError ? (
        <div className={panel}>
          <PlainEmpty
            bare
            text="College records didn't load. Check your connection and try again."
            action={
              <button type="button" onClick={() => refetch()} className={rowBtnSecondary}>
                Retry
              </button>
            }
          />
        </div>
      ) : rows.length === 0 ? (
        unrostered.length === 0 ? (
          <div className={panel}>
            <PlainEmpty
              bare
              text="When an apprentice on your team is enrolled with a college, their hours, attendance and reviews show here."
            />
          </div>
        ) : (
          unrosteredPanel
        )
      ) : (
        <>
          <StatStrip
            columns={4}
            stats={[
              { value: stats.total, label: 'Apprentices', sub: 'Linked to a college' },
              {
                value: attestations.length,
                label: 'To attest',
                tone: attestations.length > 0 ? 'yellow' : undefined,
                sub: attestations.length > 0 ? 'Training hours waiting' : 'Nothing waiting',
              },
              {
                value: stats.onTrack,
                label: 'OTJ on track',
                sub: `of ${stats.total} on off-the-job hours`,
              },
              {
                value: stats.overdue,
                label: 'Reviews overdue',
                tone: stats.overdue > 0 ? 'red' : undefined,
                sub: stats.overdue > 0 ? 'Every 3 months' : 'All in date',
              },
            ]}
          />

          <div className={twoColClass}>
            <div className={colClass}>
              {/* Workplace attestation inbox — what needs the employer TODAY. An
                  attestation here is the employer's own authority (workplace), not
                  the college's verification and not an IQA sample. */}
              {attestations.length > 0 && (
                <section data-help="apprentices.attest-list">
                  <PanelTitle title="Awaiting your attestation" meta={attestations.length} />
                  <div className={cn(panel, rowsClass)}>
                    {attestations.map((a) => (
                      <Row
                        key={a.entryId}
                        chevron={false}
                        lead={<Initials name={a.apprenticeName} />}
                        title={a.title}
                        detail={`${a.apprenticeName} · ${OTJ_ACTIVITY_LABEL[a.activityType] ?? a.activityType} · ${format(parseISO(a.activityDate), 'd MMM')} · ${(a.durationMinutes / 60).toFixed(1)}h`}
                        trailing={<span className={rowBtnPrimary}>Review</span>}
                        onClick={() => setReviewing(a)}
                      />
                    ))}
                    <p className="px-4 py-3 text-[13px] leading-relaxed text-white sm:px-5">
                      Attesting confirms the apprentice did this work under your supervision. The
                      college verifies separately for the apprenticeship record.
                    </p>
                  </div>
                </section>
              )}

              <section data-help="apprentices.list">
                <PanelTitle title="Your apprentices" meta={rows.length} />
                <div className={cn(panel, rowsClass)}>
                  {rows.map((r, i) => {
                    const toAttest = attestationsByApprentice.get(r.studentUserId);
                    return (
                      <Row
                        key={`${r.studentUserId}-${i}`}
                        lead={<Initials name={r.name} />}
                        title={r.name}
                        detail={
                          [r.courseName, r.collegeName].filter(Boolean).join(' · ') ||
                          'College apprentice'
                        }
                        trailing={
                          <>
                            <span className="hidden text-right md:block">
                              <span className="block text-[14px] font-semibold text-white tabular-nums">
                                {r.otjVerifiedHours + r.otjEmployerAttestedHours}/
                                {r.otjRequiredHours}h
                              </span>
                              <span className="block text-[12px] text-white">Off the job</span>
                            </span>
                            {toAttest ? (
                              <Tag tone="yellow">{toAttest} to attest</Tag>
                            ) : r.reviewOverdue ? (
                              <Tag tone="red">Review due</Tag>
                            ) : r.otjOnTrack ? (
                              <Tag tone="done">On track</Tag>
                            ) : (
                              <Tag tone="outline">Behind</Tag>
                            )}
                          </>
                        }
                        onClick={() => setSelected(r)}
                      />
                    );
                  })}
                </div>
              </section>
            </div>

            <div className={colClass}>
              <section>
                <PanelTitle title="Progress reviews" meta="Every 3 months" />
                <div className={cn(panel, rowsClass)}>
                  {rows.map((r, i) => (
                    <Row
                      key={`rev-${r.studentUserId}-${i}`}
                      title={r.name}
                      detail={
                        r.nextReviewDate
                          ? `${r.reviewOverdue ? 'Was due' : 'Next'} ${format(parseISO(r.nextReviewDate), 'd MMM yyyy')}`
                          : r.lastReviewDate
                            ? `Last ${format(parseISO(r.lastReviewDate), 'd MMM yyyy')}`
                            : 'No review recorded'
                      }
                      trailing={
                        r.reviewOverdue ? (
                          <Tag tone="red">Overdue</Tag>
                        ) : (
                          <Tag tone="done">In date</Tag>
                        )
                      }
                      onClick={() => setSelected(r)}
                    />
                  ))}
                </div>
              </section>
              {unrosteredPanel}
              {/* ELE-2063: funding the firm can claim, and apprentice pay rates */}
              <ApprenticeFundingPanel />
            </div>
          </div>
        </>
      )}
      {!isLoading && !isError && rows.length === 0 && <ApprenticeFundingPanel />}

      <FormSheet
        open={!!pendingApprentice}
        onOpenChange={(open) => !open && setPendingApprentice(null)}
        title={pendingApprentice?.name ?? 'Apprentice'}
        description={
          pendingApprentice
            ? `${
                [pendingApprentice.courseName, pendingApprentice.collegeName]
                  .filter(Boolean)
                  .join(' · ') || 'College apprentice'
              }. Their college lists your firm as their employer. They aren't on your team in Elec-Mate yet.`
            : undefined
        }
        width="wide"
        bodyClassName="grid gap-5 [&>*]:min-w-0 lg:grid-cols-2 lg:gap-8 lg:items-start"
      >
        {pendingApprentice && (
          <>
            <div className="space-y-2">
              <h3 className="text-[15px] font-semibold text-white">Progress review</h3>
              <div className={boxed}>
                <div className={rowsClass}>
                  <Row
                    title={
                      pendingApprentice.reviewDue
                        ? `Due by ${format(parseISO(pendingApprentice.reviewDue), 'd MMM yyyy')}`
                        : 'No due date recorded'
                    }
                    detail={
                      pendingApprentice.reviewOverdue
                        ? 'Overdue: a review is needed at least every 3 calendar months'
                        : 'Within the 3-month window'
                    }
                    trailing={
                      pendingApprentice.reviewOverdue ? (
                        <Tag tone="red">Overdue</Tag>
                      ) : (
                        <Tag tone="done">Up to date</Tag>
                      )
                    }
                  />
                  {pendingApprentice.lastNudgedAt && (
                    <Row
                      title={`Asked ${format(parseISO(pendingApprentice.lastNudgedAt), 'd MMM, HH:mm')}`}
                      detail="Last review nudge from your firm"
                    />
                  )}
                  <div className="space-y-2 px-4 py-3 sm:px-5">
                    <button
                      type="button"
                      data-help="apprentices.unrostered-nudge"
                      onClick={() => askUnrostered(pendingApprentice)}
                      disabled={nudgeUnrostered.isPending || !pendingApprentice.hasAccount}
                      className={cn(rowBtnPrimary, 'w-full sm:w-auto')}
                    >
                      {nudgeUnrostered.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      Ask to arrange review
                    </button>
                    {!pendingApprentice.hasAccount && (
                      <p className="text-[13px] leading-relaxed text-white">
                        {pendingApprentice.name.split(' ')[0]} doesn't have an Elec-Mate account
                        yet, so there's nobody to send it to. Add them to your team and they get an
                        invite.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-[15px] font-semibold text-white">Your team</h3>
              {pendingApprentice.invitedRosterId ? (
                <p className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-[14px] leading-relaxed text-white">
                  Invite sent to {pendingApprentice.email ?? 'their email'}. They join your team
                  when they accept it, and their progress then shows here.
                </p>
              ) : (
                <button
                  type="button"
                  data-help="apprentices.unrostered-add"
                  disabled={addingId === pendingApprentice.studentId}
                  onClick={() => addApprentice(pendingApprentice)}
                  className={cn(rowBtnSecondary, 'w-full sm:w-auto')}
                >
                  {addingId === pendingApprentice.studentId ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <UserPlus className="h-4 w-4" aria-hidden />
                  )}
                  Add {pendingApprentice.name.split(' ')[0]} to your team
                </button>
              )}
              <p className="text-[13px] leading-relaxed text-white">
                Adding them sends an invite to the email their college has for them. Their account
                links to your team only when they accept it.
              </p>
            </div>
          </>
        )}
      </FormSheet>

      {/* Apprentice detail — the RPC already returns everything an employer
          acts on; the rows were dead ends before this sheet */}
      <FormSheet
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
        title={selected?.name ?? 'Apprentice'}
        description={
          selected
            ? [selected.courseName, selected.collegeName].filter(Boolean).join(' · ') ||
              'College apprentice'
            : undefined
        }
        width="wide"
        bodyClassName="grid gap-5 [&>*]:min-w-0 lg:grid-cols-2 lg:gap-8 lg:items-start"
      >
        {selected && (
          <>
            <div className="space-y-5">
              {/* Programme line + college risk rating — rendered only from
                  facts the college has recorded; nothing is invented */}
              {(() => {
                const dates = programmeDates(selected.startDate, selected.expectedEndDate);
                const programme = [
                  [selected.courseLevel, selected.awardingBody].filter(Boolean).join(' · ') || null,
                  dates,
                ]
                  .filter(Boolean)
                  .join(' · ');
                if (!programme && !selected.riskLevel) return null;
                const risk = selected.riskLevel ? riskTone(selected.riskLevel) : null;
                return (
                  <div className="flex flex-wrap items-center gap-2">
                    {selected.riskLevel && (
                      <Tag tone={risk === 'red' ? 'red' : risk === 'emerald' ? 'done' : 'outline'}>
                        {/risk/i.test(selected.riskLevel)
                          ? selected.riskLevel
                          : `${selected.riskLevel} risk`}
                      </Tag>
                    )}
                    {programme && (
                      <p className="text-[13px] leading-relaxed text-white">{programme}</p>
                    )}
                  </div>
                );
              })()}
              <StatStrip
                columns={2}
                stats={[
                  {
                    value: `${selected.otjVerifiedHours + selected.otjEmployerAttestedHours}/${selected.otjRequiredHours}h`,
                    label: 'Off-the-job hours',
                    sub: selected.otjOnTrack ? 'On track' : 'Behind pro-rata target',
                  },
                  {
                    value: `${selected.attendancePercent}%`,
                    label: 'Attendance',
                    tone: selected.attendancePercent < 90 ? 'red' : undefined,
                  },
                  {
                    value: `${selected.progressPercent}%`,
                    label: 'Course progress',
                  },
                  {
                    value: selected.epaStatus || 'Not started',
                    label: 'EPA status',
                    tone: epaTone(selected.epaStatus) === 'red' ? 'red' : undefined,
                  },
                ]}
              />
              {/* Off-the-job hours — verified college-signed hours against the
                  course requirement. The bar shows only what the college has
                  verified; nothing pro-rata is invented client-side. */}
              {(() => {
                const signedOff = selected.otjVerifiedHours + selected.otjEmployerAttestedHours;
                const otjPct =
                  selected.otjRequiredHours > 0
                    ? Math.min(100, Math.round((100 * signedOff) / selected.otjRequiredHours))
                    : 0;
                const otjRemaining = Math.max(0, selected.otjRequiredHours - signedOff);
                return (
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[15px] font-semibold text-white">Off-the-job hours</h3>
                      <span className="text-[13px] font-semibold text-white tabular-nums">
                        {otjPct}%
                      </span>
                    </div>
                    <div className={cn(boxed, 'space-y-3 px-4 py-4')}>
                      <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                        <div
                          className={`h-full rounded-full transition-all ${
                            selected.otjOnTrack ? 'bg-emerald-500' : 'bg-elec-yellow'
                          }`}
                          style={{ width: `${otjPct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[13px] text-white tabular-nums">
                        <span>{signedOff}h signed off</span>
                        <span>{selected.otjRequiredHours}h required</span>
                      </div>
                      {/* Two authorities, kept apart on purpose */}
                      <div className="grid grid-cols-2 gap-2 text-[13px]">
                        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                          <p className="font-semibold text-white tabular-nums">
                            {selected.otjVerifiedHours}h
                          </p>
                          <p className="text-white">College verified</p>
                        </div>
                        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                          <p className="font-semibold text-white tabular-nums">
                            {selected.otjEmployerAttestedHours}h
                          </p>
                          <p className="text-white">Workplace attested</p>
                        </div>
                      </div>
                      {selected.otjPendingAttestationCount > 0 && (
                        <p className="text-[13px] font-medium text-elec-yellow tabular-nums">
                          {selected.otjPendingAttestationCount} entr
                          {selected.otjPendingAttestationCount === 1 ? 'y' : 'ies'} waiting for your
                          attestation, in the list on the page.
                        </p>
                      )}
                      {selected.otjTotalHours > signedOff && (
                        <p className="text-[13px] text-white tabular-nums">
                          {selected.otjTotalHours - signedOff}h logged, not yet signed off by anyone
                        </p>
                      )}
                      <p className="text-[13px] leading-relaxed text-white">
                        {otjRemaining > 0
                          ? `${otjRemaining}h of verified off-the-job training still to log. The full requirement must be evidenced before EPA gateway.`
                          : 'Full off-the-job requirement met and verified by the college.'}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="space-y-5">
              {/* End-point assessment — only when the college has recorded a
                  gateway or assessment date (the status already sits in the
                  strip) */}
              {(selected.epaGatewayDate || selected.epaDate) && (
                <div className="space-y-2">
                  <h3 className="text-[15px] font-semibold text-white">End-point assessment</h3>
                  <div className={boxed}>
                    <div className={rowsClass}>
                      {selected.epaGatewayDate && (
                        <Row
                          title={format(parseISO(selected.epaGatewayDate), 'd MMM yyyy')}
                          detail="Gateway date"
                        />
                      )}
                      {selected.epaDate && (
                        <Row
                          title={format(parseISO(selected.epaDate), 'd MMM yyyy')}
                          detail="End-point assessment date"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-[15px] font-semibold text-white">Progress reviews</h3>
                <div className={boxed}>
                  <div className={rowsClass}>
                    <Row
                      title={
                        selected.lastReviewDate
                          ? `Last review ${format(parseISO(selected.lastReviewDate), 'd MMM yyyy')}`
                          : 'No review recorded'
                      }
                      detail={
                        selected.reviewOverdue
                          ? 'Overdue: a review is needed at least every 3 calendar months'
                          : 'Within the 3-month window'
                      }
                      trailing={
                        selected.reviewOverdue ? (
                          <Tag tone="red">Overdue</Tag>
                        ) : (
                          <Tag tone="done">Up to date</Tag>
                        )
                      }
                    />
                    {selected.nextReviewDate && (
                      <Row
                        title={
                          selected.reviewOverdue
                            ? `Was due ${format(parseISO(selected.nextReviewDate), 'd MMM yyyy')}`
                            : `Next review ${format(parseISO(selected.nextReviewDate), 'd MMM yyyy')}`
                        }
                        detail={
                          selected.reviewOverdue
                            ? 'Past the date, so ask the college to arrange it'
                            : 'Booked or due by'
                        }
                      />
                    )}
                    {selected.tutorName && (
                      <Row title={selected.tutorName} detail="College tutor" />
                    )}
                  </div>
                  <EmployerReviewAction studentUserId={selected.studentUserId} />
                  {selected.reviewOverdue && (
                    <div className="border-t border-white/[0.07] px-4 py-3 sm:px-5">
                      <button
                        onClick={() => sendReviewNudge(selected)}
                        disabled={nudging}
                        className={cn(rowBtnPrimary, 'w-full sm:w-auto')}
                      >
                        {nudging ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                        Ask to arrange review
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </FormSheet>

      {/* Attestation review — the whole entry, then one of two decisions */}
      <FormSheet
        open={!!reviewing}
        onOpenChange={(open) => !open && closeReview()}
        title={reviewing?.title ?? 'Workplace attestation'}
        description={
          reviewing ? `Workplace attestation for ${reviewing.apprenticeName}` : undefined
        }
        width="wide"
        bodyClassName="grid gap-5 [&>*]:min-w-0 lg:grid-cols-2 lg:gap-8 lg:items-start"
        footer={
          reviewing ? (
            <div className="flex gap-2">
              <SecondaryButton
                data-help="apprentices.send-back"
                fullWidth
                size="lg"
                disabled={decide.isPending || (sendBackArmed && !sendBackComment.trim())}
                onClick={() => handleDecision(reviewing, 'send_back')}
              >
                <Undo2 className="h-4 w-4 mr-2" />
                {sendBackArmed ? 'Confirm send back' : 'Send back'}
              </SecondaryButton>
              <PrimaryButton
                data-help="apprentices.attest"
                fullWidth
                size="lg"
                disabled={decide.isPending}
                onClick={() => handleDecision(reviewing, 'attest')}
              >
                {decide.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Attest {(reviewing.durationMinutes / 60).toFixed(1)}h
              </PrimaryButton>
            </div>
          ) : undefined
        }
      >
        {reviewing && (
          <>
            <div className="space-y-5">
              <div className={boxed}>
                <div className={rowsClass}>
                  <Row
                    lead={<Initials name={reviewing.apprenticeName} />}
                    title={reviewing.apprenticeName}
                    detail="Apprentice"
                  />
                  <Row
                    title={`${(reviewing.durationMinutes / 60).toFixed(1)} hours`}
                    detail={`${OTJ_ACTIVITY_LABEL[reviewing.activityType] ?? reviewing.activityType} · ${format(parseISO(reviewing.activityDate), 'EEEE d MMMM yyyy')}`}
                  />
                </div>
              </div>
              {reviewing.description && (
                <div className="space-y-2">
                  <h3 className="text-[15px] font-semibold text-white">What they logged</h3>
                  <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-white">
                    {reviewing.description}
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-5">
              {reviewing.evidenceUrls.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-[15px] font-semibold text-white">
                    Evidence{' '}
                    <span className="text-[13px] font-normal">{reviewing.evidenceUrls.length}</span>
                  </h3>
                  <div className={boxed}>
                    <div className={rowsClass}>
                      {reviewing.evidenceUrls.map((u, i) => (
                        <Row
                          key={u}
                          title={`Attachment ${i + 1}`}
                          detail={u.replace(/^https?:\/\/[^/]+\//, '').slice(0, 60)}
                          onClick={() => window.open(u, '_blank', 'noopener')}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.03] px-4 py-3">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow" />
                <p className="text-[13px] leading-relaxed text-white">
                  Attest only if this work happened under your firm's supervision. Your name and the
                  time are recorded on the entry. The college's own verification and any IQA
                  sampling are separate and stay with the college.
                </p>
              </div>
              {sendBackArmed && (
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium text-white">
                    What needs changing (the apprentice will see this)
                  </label>
                  <textarea
                    value={sendBackComment}
                    onChange={(e) => setSendBackComment(e.target.value)}
                    autoFocus
                    placeholder="e.g. This was 2 hours, not 4. And it was on the 3rd, not the 4th"
                    className="min-h-[80px] w-full resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white caret-elec-yellow placeholder:text-white/35 focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                  />
                </div>
              )}
            </div>
          </>
        )}
      </FormSheet>
    </PageFrame>
  );
}
