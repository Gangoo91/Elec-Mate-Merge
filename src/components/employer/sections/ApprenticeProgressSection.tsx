import { useMemo, useState } from 'react';
import { RefreshCw, Send, Loader2 } from 'lucide-react';
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
  type Tone,
} from '@/components/employer/editorial';
import { useApprenticeProgress } from '@/hooks/useApprenticeProgress';

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
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: emp } = await supabase
        .from('employer_employees')
        .select('id')
        .eq('user_id', row.studentUserId)
        .eq('employer_id', user?.id ?? '')
        .maybeSingle();
      if (!emp) {
        toast({
          title: 'Not linked to your roster',
          description: "This apprentice isn't linked to a team member yet, so they can't be messaged.",
          variant: 'destructive',
        });
        return;
      }
      await createCommunication.mutateAsync({
        type: 'message',
        title: 'Progress review due',
        content: `Your 12-weekly apprenticeship progress review is due${
          row.lastReviewDate
            ? ` — the last one was on ${format(parseISO(row.lastReviewDate), 'd MMM yyyy')}`
            : ''
        }. Reply with the days that work for you this week and we'll book it in.`,
        priority: 'high',
        target_audience: 'specific',
        target_employee_ids: [emp.id],
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
      toast({ title: 'Nudge failed', description: 'Message was not sent.', variant: 'destructive' });
    } finally {
      setNudging(false);
    }
  };

  const stats = useMemo(() => {
    const total = rows.length;
    const onTrack = rows.filter((r) => r.otjOnTrack).length;
    const overdue = rows.filter((r) => r.reviewOverdue).length;
    const avgAttendance = total
      ? Math.round(rows.reduce((s, r) => s + r.attendancePercent, 0) / total)
      : 0;
    return { total, onTrack, overdue, avgAttendance };
  }, [rows]);

  return (
    <PageFrame>
      <PageHero
        eyebrow="People"
        title="Apprentices"
        description="Live college progress for the apprentices on your books — off-the-job hours, attendance, end-point assessment and reviews."
        tone="emerald"
        actions={
          <IconButton onClick={() => refetch()} aria-label="Refresh">
            <RefreshCw className={isFetching ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
          </IconButton>
        }
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : isError ? (
        <EmptyState
          title="Couldn't load apprentice progress"
          description="Something went wrong fetching college records. Try again."
          action="Retry"
          onAction={() => refetch()}
        />
      ) : rows.length === 0 ? (
        <EmptyState
          title="No apprentices linked yet"
          description="When an apprentice on your team is enrolled with a college, their progress will appear here automatically."
        />
      ) : (
        <>
          <StatStrip
            columns={4}
            stats={[
              { value: stats.total, label: 'Apprentices' },
              { value: stats.onTrack, label: 'OTJ on track', tone: 'emerald' },
              {
                value: stats.overdue,
                label: 'Reviews overdue',
                tone: stats.overdue > 0 ? 'red' : 'emerald',
              },
              { value: `${stats.avgAttendance}%`, label: 'Avg attendance' },
            ]}
          />

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
                            {r.otjVerifiedHours}/{r.otjRequiredHours}h OTJ
                          </Pill>
                          {r.epaStatus && <Pill tone={epaTone(r.epaStatus)}>{r.epaStatus}</Pill>}
                        </span>
                        {r.reviewOverdue ? (
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
        </>
      )}

      {/* Apprentice detail — the RPC already returns everything an employer
          acts on; the rows were dead ends before this sheet */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={
            isMobile
              ? 'h-[80vh] p-0 rounded-t-2xl overflow-hidden'
              : 'w-full sm:max-w-md p-0 overflow-hidden'
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
                  [selected.courseLevel, selected.awardingBody].filter(Boolean).join(' · ') ||
                    null,
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
                      <p className="text-[12.5px] text-white/60 leading-relaxed">{programme}</p>
                    )}
                  </div>
                );
              })()}
              <StatStrip
                columns={2}
                stats={[
                  {
                    value: `${selected.otjVerifiedHours}/${selected.otjRequiredHours}h`,
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
                const otjPct =
                  selected.otjRequiredHours > 0
                    ? Math.min(
                        100,
                        Math.round((100 * selected.otjVerifiedHours) / selected.otjRequiredHours)
                      )
                    : 0;
                const otjRemaining = Math.max(
                  0,
                  selected.otjRequiredHours - selected.otjVerifiedHours
                );
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
                        <span className="text-white/60 tabular-nums">
                          {selected.otjVerifiedHours}h verified
                        </span>
                        <span className="text-white/60 tabular-nums">
                          {selected.otjRequiredHours}h required
                        </span>
                      </div>
                      {selected.otjTotalHours > selected.otjVerifiedHours && (
                        <p className="text-[12px] text-amber-300/90 tabular-nums">
                          {selected.otjTotalHours - selected.otjVerifiedHours}h logged awaiting
                          verification
                        </p>
                      )}
                      <p className="text-[12px] text-white/50 leading-relaxed">
                        {otjRemaining > 0
                          ? `${otjRemaining}h of verified off-the-job training still to log — the full requirement must be evidenced before EPA gateway.`
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
                        ? 'Overdue — 12-weekly reviews are an apprenticeship funding requirement'
                        : 'Next review inside the 12-week window'
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
                      subtitle="Scheduled by the college"
                    />
                  )}
                  {selected.tutorName && (
                    <ListRow title={selected.tutorName} subtitle="College tutor" />
                  )}
                </ListBody>
                {selected.reviewOverdue && (
                  <div className="px-5 py-4 border-t border-white/[0.06]">
                    <button
                      onClick={() => sendReviewNudge(selected)}
                      disabled={nudging}
                      className="h-11 w-full rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
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
    </PageFrame>
  );
}
