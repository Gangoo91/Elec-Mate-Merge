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
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { format, parseISO } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useCreateCommunication } from '@/hooks/useCommunications';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  ComplianceRing,
  IconButton,
  EmptyState,
  LoadingBlocks,
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/employer/editorial';
import { useApprenticeProgress } from '@/hooks/useApprenticeProgress';
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

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

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
  const isMobile = useIsMobile();
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

  return (
    <PageFrame>
      <PageHero
        eyebrow="People"
        title="Apprentices"
        description="Live college progress for the apprentices on your books. Off-the-job hours, attendance, end-point assessment and reviews."
        tone="emerald"
        actions={
          <>
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className={isFetching ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
            </IconButton>
            <PageHelpButton
              help={APPRENTICES_HELP}
              blockers={helpBlockers}
              askContext={{ page: 'apprentices' }}
            />
          </>
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
        <EmptyState
          title="Couldn't load apprentice progress"
          description="Something went wrong fetching college records. Try again."
          action="Retry"
          onAction={() => refetch()}
        />
      ) : rows.length === 0 ? (
        unrostered.length === 0 ? (
          <EmptyState
            title="No apprentices linked yet"
            description="When an apprentice on your team is enrolled with a college, their progress will appear here automatically."
          />
        ) : null
      ) : (
        <>
          <StatStrip
            columns={4}
            stats={[
              { value: stats.total, label: 'Apprentices' },
              {
                value: attestations.length,
                label: 'To attest',
                tone: attestations.length > 0 ? 'yellow' : 'emerald',
                accent: attestations.length > 0,
              },
              { value: stats.onTrack, label: 'OTJ on track', tone: 'emerald' },
              {
                value: stats.overdue,
                label: 'Reviews overdue',
                tone: stats.overdue > 0 ? 'red' : 'emerald',
              },
            ]}
          />

          {/* Workplace attestation inbox — what needs the employer TODAY. An
              attestation here is the employer's own authority (workplace), not
              the college's verification and not an IQA sample. */}
          {attestations.length > 0 && (
            <div data-help="apprentices.attest-list">
              <ListCard>
                <ListCardHeader
                  tone="yellow"
                  title="Awaiting your attestation"
                  meta={<Pill tone="yellow">{attestations.length}</Pill>}
                />
                <ListBody>
                  {attestations.map((a) => (
                    <ListRow
                      key={a.entryId}
                      accent="yellow"
                      lead={<Avatar initials={getInitials(a.apprenticeName)} />}
                      title={a.title}
                      subtitle={`${a.apprenticeName} · ${OTJ_ACTIVITY_LABEL[a.activityType] ?? a.activityType} · ${format(parseISO(a.activityDate), 'd MMM')}`}
                      trailing={
                        <span className="text-[13px] font-semibold tabular-nums text-white">
                          {(a.durationMinutes / 60).toFixed(1)}h
                        </span>
                      }
                      onClick={() => setReviewing(a)}
                    />
                  ))}
                </ListBody>
                <div className="px-5 py-3 border-t border-white/[0.06] text-[12px] text-white leading-relaxed">
                  Attesting confirms the apprentice did this work under your supervision. The
                  college verifies separately for the apprenticeship record.
                </div>
              </ListCard>
            </div>
          )}

          <div data-help="apprentices.list">
            <ListCard>
              <ListCardHeader
                title="Your apprentices"
                meta={<Pill tone="blue">{rows.length}</Pill>}
              />
              <ListBody>
                {rows.map((r, i) => {
                  return (
                    <ListRow
                      key={`${r.studentUserId}-${i}`}
                      accent={r.reviewOverdue ? 'red' : r.otjOnTrack ? 'emerald' : 'amber'}
                      lead={<Avatar initials={getInitials(r.name)} />}
                      title={r.name}
                      subtitle={
                        [r.courseName, r.collegeName].filter(Boolean).join(' · ') ||
                        'College apprentice'
                      }
                      trailing={
                        // Mobile shows ONE signal (the worst) + the ring — three
                        // pills crushed the name at 375px; the sheet has the rest
                        <div className="flex items-center gap-2">
                          <span className="hidden sm:flex items-center gap-2">
                            <Pill tone={r.otjOnTrack ? 'emerald' : 'amber'}>
                              {r.otjVerifiedHours + r.otjEmployerAttestedHours}/{r.otjRequiredHours}
                              h OTJ
                            </Pill>
                            {r.epaStatus && <Pill tone={epaTone(r.epaStatus)}>{r.epaStatus}</Pill>}
                          </span>
                          {attestationsByApprentice.get(r.studentUserId) ? (
                            <Pill tone="yellow">
                              {attestationsByApprentice.get(r.studentUserId)} to attest
                            </Pill>
                          ) : r.reviewOverdue ? (
                            <Pill tone="red">Review due</Pill>
                          ) : (
                            <span className="sm:hidden">
                              <Pill tone={r.otjOnTrack ? 'emerald' : 'amber'}>
                                {r.otjOnTrack ? 'On track' : 'Behind'}
                              </Pill>
                            </span>
                          )}
                          <ComplianceRing score={r.progressPercent} size={40} label="Progress" />
                        </div>
                      }
                      onClick={() => setSelected(r)}
                    />
                  );
                })}
              </ListBody>
            </ListCard>
          </div>
        </>
      )}

      {/* ELE-1955: apprentices whose college names this firm, not on the team */}
      {!isLoading && unrostered.length > 0 && (
        <div data-help="apprentices.unrostered">
          <ListCard>
            <ListCardHeader
              tone="blue"
              title="Not on your team yet"
              meta={<Pill tone="blue">{unrostered.length}</Pill>}
            />
            <ListBody>
              {unrostered.map((a) => (
                <ListRow
                  key={a.studentId}
                  accent={a.reviewOverdue ? 'red' : 'blue'}
                  lead={<Avatar initials={getInitials(a.name)} />}
                  title={a.name}
                  subtitle={
                    [a.courseName, a.collegeName].filter(Boolean).join(' · ') ||
                    'College apprentice'
                  }
                  trailing={
                    a.invitedRosterId ? (
                      <Pill tone="blue">Invited</Pill>
                    ) : a.reviewOverdue ? (
                      <Pill tone="red">Review due</Pill>
                    ) : (
                      <Pill tone="emerald">Add</Pill>
                    )
                  }
                  onClick={() => setPendingApprentice(a)}
                />
              ))}
            </ListBody>
            <div className="px-5 py-3 border-t border-white/[0.06] text-[12px] text-white leading-relaxed">
              Their college lists your firm as their employer. Add them to your team to see their
              hours, attendance and reviews here, and to confirm their training hours.
            </div>
          </ListCard>
        </div>
      )}

      <Sheet
        open={!!pendingApprentice}
        onOpenChange={(open) => !open && setPendingApprentice(null)}
      >
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={
            isMobile
              ? 'h-[85vh] p-0 rounded-t-2xl overflow-hidden'
              : 'w-full sm:max-w-2xl p-0 overflow-hidden'
          }
        >
          {pendingApprentice && (
            <SheetShell
              eyebrow={
                [pendingApprentice.courseName, pendingApprentice.collegeName]
                  .filter(Boolean)
                  .join(' · ') || 'College apprentice'
              }
              title={pendingApprentice.name}
              description="Their college lists your firm as their employer. They aren't on your team in Elec-Mate yet."
            >
              <ListCard>
                <ListCardHeader tone="emerald" title="Progress review" />
                <ListBody>
                  <ListRow
                    title={
                      pendingApprentice.reviewDue
                        ? `Due by ${format(parseISO(pendingApprentice.reviewDue), 'd MMM yyyy')}`
                        : 'No due date recorded'
                    }
                    subtitle={
                      pendingApprentice.reviewOverdue
                        ? 'Overdue: a review is needed at least every 3 calendar months'
                        : 'Within the 3-month window'
                    }
                    trailing={
                      pendingApprentice.reviewOverdue ? (
                        <Pill tone="red">Overdue</Pill>
                      ) : (
                        <Pill tone="emerald">Up to date</Pill>
                      )
                    }
                  />
                  {pendingApprentice.lastNudgedAt && (
                    <ListRow
                      title={`Asked ${format(parseISO(pendingApprentice.lastNudgedAt), 'd MMM, HH:mm')}`}
                      subtitle="Last review nudge from your firm"
                    />
                  )}
                </ListBody>
                <div className="px-5 py-4 border-t border-white/[0.06] space-y-2">
                  <button
                    type="button"
                    data-help="apprentices.unrostered-nudge"
                    onClick={() => askUnrostered(pendingApprentice)}
                    disabled={nudgeUnrostered.isPending || !pendingApprentice.hasAccount}
                    className="h-11 w-full rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:bg-white/[0.08] disabled:text-white flex items-center justify-center gap-2"
                  >
                    {nudgeUnrostered.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Ask to arrange review
                  </button>
                  {!pendingApprentice.hasAccount && (
                    <p className="text-[12px] text-white leading-relaxed">
                      {pendingApprentice.name.split(' ')[0]} doesn't have an Elec-Mate account yet,
                      so there's nobody to send it to. Add them to your team and they get an invite.
                    </p>
                  )}
                </div>
              </ListCard>

              {pendingApprentice.invitedRosterId ? (
                <p className="rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-[13px] text-white leading-relaxed">
                  Invite sent to {pendingApprentice.email ?? 'their email'}. They join your team
                  when they accept it, and their progress then shows above.
                </p>
              ) : (
                <SecondaryButton
                  fullWidth
                  data-help="apprentices.unrostered-add"
                  disabled={addingId === pendingApprentice.studentId}
                  onClick={() => addApprentice(pendingApprentice)}
                >
                  {addingId === pendingApprentice.studentId ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden />
                  ) : (
                    <UserPlus className="h-4 w-4 mr-2" aria-hidden />
                  )}
                  Add {pendingApprentice.name.split(' ')[0]} to your team
                </SecondaryButton>
              )}
              <p className="text-[12px] text-white leading-relaxed">
                Adding them sends an invite to the email their college has for them. Their account
                links to your team only when they accept it.
              </p>
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>

      {/* Apprentice detail — the RPC already returns everything an employer
          acts on; the rows were dead ends before this sheet */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={
            isMobile
              ? 'h-[85vh] p-0 rounded-t-2xl overflow-hidden'
              : 'w-full sm:max-w-2xl p-0 overflow-hidden'
          }
        >
          {selected && (
            <SheetShell
              eyebrow={
                [selected.courseName, selected.collegeName].filter(Boolean).join(' · ') ||
                'College apprentice'
              }
              title={selected.name}
            >
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
                return (
                  <div className="flex flex-wrap items-center gap-2">
                    {selected.riskLevel && (
                      <Pill tone={riskTone(selected.riskLevel)}>
                        {/risk/i.test(selected.riskLevel)
                          ? selected.riskLevel
                          : `${selected.riskLevel} risk`}
                      </Pill>
                    )}
                    {programme && (
                      <p className="text-[12.5px] text-white leading-relaxed">{programme}</p>
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
                    tone: selected.otjOnTrack ? 'emerald' : 'amber',
                    sub: selected.otjOnTrack ? 'On track' : 'Behind pro-rata target',
                  },
                  {
                    value: `${selected.attendancePercent}%`,
                    label: 'Attendance',
                    tone: selected.attendancePercent >= 90 ? 'emerald' : 'amber',
                  },
                  {
                    value: `${selected.progressPercent}%`,
                    label: 'Course progress',
                    tone: 'blue',
                  },
                  {
                    value: selected.epaStatus || 'Not started',
                    label: 'EPA status',
                    tone: epaTone(selected.epaStatus),
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
                  <ListCard>
                    <ListCardHeader
                      tone="blue"
                      title="Off-the-job hours"
                      meta={<Pill tone={selected.otjOnTrack ? 'emerald' : 'amber'}>{otjPct}%</Pill>}
                    />
                    <div className="px-5 py-4 space-y-2.5">
                      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            selected.otjOnTrack ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${otjPct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-white tabular-nums">
                          {selected.otjVerifiedHours + selected.otjEmployerAttestedHours}h signed
                          off
                        </span>
                        <span className="text-white tabular-nums">
                          {selected.otjRequiredHours}h required
                        </span>
                      </div>
                      {/* Two authorities, kept apart on purpose */}
                      <div className="grid grid-cols-2 gap-2 text-[12px]">
                        <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                          <p className="text-white tabular-nums font-semibold">
                            {selected.otjVerifiedHours}h
                          </p>
                          <p className="text-white">College verified</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                          <p className="text-white tabular-nums font-semibold">
                            {selected.otjEmployerAttestedHours}h
                          </p>
                          <p className="text-white">Workplace attested</p>
                        </div>
                      </div>
                      {selected.otjPendingAttestationCount > 0 && (
                        <p className="text-[12px] text-elec-yellow tabular-nums">
                          {selected.otjPendingAttestationCount} entr
                          {selected.otjPendingAttestationCount === 1 ? 'y' : 'ies'} waiting for your
                          attestation. See the list above
                        </p>
                      )}
                      {selected.otjTotalHours >
                        selected.otjVerifiedHours + selected.otjEmployerAttestedHours && (
                        <p className="text-[12px] text-amber-300/90 tabular-nums">
                          {selected.otjTotalHours -
                            selected.otjVerifiedHours -
                            selected.otjEmployerAttestedHours}
                          h logged, not yet signed off by anyone
                        </p>
                      )}
                      <p className="text-[12px] text-white leading-relaxed">
                        {otjRemaining > 0
                          ? `${otjRemaining}h of verified off-the-job training still to log. The full requirement must be evidenced before EPA gateway.`
                          : 'Full off-the-job requirement met and verified by the college.'}
                      </p>
                    </div>
                  </ListCard>
                );
              })()}
              {/* End-point assessment — only when the college has recorded a
                  gateway or assessment date (the status already sits in the
                  strip above) */}
              {(selected.epaGatewayDate || selected.epaDate) && (
                <ListCard>
                  <ListCardHeader
                    tone="yellow"
                    title="End-point assessment"
                    meta={
                      selected.epaStatus ? (
                        <Pill tone={epaTone(selected.epaStatus)}>{selected.epaStatus}</Pill>
                      ) : undefined
                    }
                  />
                  <ListBody>
                    {selected.epaGatewayDate && (
                      <ListRow
                        title={format(parseISO(selected.epaGatewayDate), 'd MMM yyyy')}
                        subtitle="Gateway date"
                      />
                    )}
                    {selected.epaDate && (
                      <ListRow
                        title={format(parseISO(selected.epaDate), 'd MMM yyyy')}
                        subtitle="End-point assessment date"
                      />
                    )}
                  </ListBody>
                </ListCard>
              )}
              <ListCard>
                <ListCardHeader tone="emerald" title="Progress reviews" />
                <ListBody>
                  <ListRow
                    title={
                      selected.lastReviewDate
                        ? `Last review ${format(parseISO(selected.lastReviewDate), 'd MMM yyyy')}`
                        : 'No review recorded'
                    }
                    subtitle={
                      selected.reviewOverdue
                        ? 'Overdue: a review is needed at least every 3 calendar months'
                        : 'Within the 3-month window'
                    }
                    trailing={
                      selected.reviewOverdue ? (
                        <Pill tone="red">Overdue</Pill>
                      ) : (
                        <Pill tone="emerald">Up to date</Pill>
                      )
                    }
                  />
                  {selected.nextReviewDate && (
                    <ListRow
                      title={`Next review ${format(parseISO(selected.nextReviewDate), 'd MMM yyyy')}`}
                      subtitle={selected.reviewOverdue ? 'Due by' : 'Booked or due by'}
                    />
                  )}
                  {selected.tutorName && (
                    <ListRow title={selected.tutorName} subtitle="College tutor" />
                  )}
                </ListBody>
                <EmployerReviewAction studentUserId={selected.studentUserId} />
                {selected.reviewOverdue && (
                  <div className="px-5 py-4 border-t border-white/[0.06]">
                    <button
                      onClick={() => sendReviewNudge(selected)}
                      disabled={nudging}
                      className="h-11 w-full rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:bg-white/[0.08] disabled:text-white flex items-center justify-center gap-2"
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
              </ListCard>
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>

      {/* Attestation review — the whole entry, then one of two decisions */}
      <Sheet open={!!reviewing} onOpenChange={(open) => !open && closeReview()}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={
            isMobile
              ? 'h-[85vh] p-0 rounded-t-2xl overflow-hidden'
              : 'w-full sm:max-w-2xl p-0 overflow-hidden'
          }
        >
          {reviewing && (
            <SheetShell eyebrow="Workplace attestation" title={reviewing.title}>
              <ListCard>
                <ListBody>
                  <ListRow
                    lead={<Avatar initials={getInitials(reviewing.apprenticeName)} />}
                    title={reviewing.apprenticeName}
                    subtitle="Apprentice"
                  />
                  <ListRow
                    title={`${(reviewing.durationMinutes / 60).toFixed(1)} hours`}
                    subtitle={`${OTJ_ACTIVITY_LABEL[reviewing.activityType] ?? reviewing.activityType} · ${format(parseISO(reviewing.activityDate), 'EEEE d MMMM yyyy')}`}
                  />
                </ListBody>
              </ListCard>
              {reviewing.description && (
                <ListCard>
                  <ListCardHeader tone="blue" title="What they logged" />
                  <p className="px-5 py-4 text-[13px] text-white leading-relaxed whitespace-pre-wrap">
                    {reviewing.description}
                  </p>
                </ListCard>
              )}
              {reviewing.evidenceUrls.length > 0 && (
                <ListCard>
                  <ListCardHeader
                    tone="emerald"
                    title="Evidence"
                    meta={<Pill tone="emerald">{reviewing.evidenceUrls.length}</Pill>}
                  />
                  <ListBody>
                    {reviewing.evidenceUrls.map((u, i) => (
                      <ListRow
                        key={u}
                        title={`Attachment ${i + 1}`}
                        subtitle={u.replace(/^https?:\/\/[^/]+\//, '').slice(0, 60)}
                        onClick={() => window.open(u, '_blank', 'noopener')}
                      />
                    ))}
                  </ListBody>
                </ListCard>
              )}
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 flex gap-3">
                <GraduationCap className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                <p className="text-[12.5px] text-white leading-relaxed">
                  Attest only if this work happened under your firm's supervision. Your name and the
                  time are recorded on the entry. The college's own verification and any IQA
                  sampling are separate and stay with the college.
                </p>
              </div>
              {sendBackArmed && (
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-white block">
                    What needs changing (the apprentice will see this)
                  </label>
                  <textarea
                    value={sendBackComment}
                    onChange={(e) => setSendBackComment(e.target.value)}
                    autoFocus
                    placeholder="e.g. This was 2 hours, not 4. And it was on the 3rd, not the 4th"
                    className="w-full min-h-[80px] rounded-xl border border-white/[0.14] bg-white/[0.04] px-3 py-2 text-[13px] text-white placeholder:text-white focus:border-elec-yellow focus:outline-none focus:ring-0 caret-elec-yellow touch-manipulation"
                  />
                </div>
              )}
              <div className="flex gap-2 pb-2">
                <SecondaryButton
                  data-help="apprentices.send-back"
                  fullWidth
                  disabled={decide.isPending || (sendBackArmed && !sendBackComment.trim())}
                  onClick={() => handleDecision(reviewing, 'send_back')}
                >
                  <Undo2 className="h-4 w-4 mr-2" />
                  {sendBackArmed ? 'Confirm send back' : 'Send back'}
                </SecondaryButton>
                <PrimaryButton
                  data-help="apprentices.attest"
                  fullWidth
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
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>
    </PageFrame>
  );
}
