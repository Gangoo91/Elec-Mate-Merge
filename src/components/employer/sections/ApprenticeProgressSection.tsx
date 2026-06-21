import { useMemo } from 'react';
import { GraduationCap, RefreshCw } from 'lucide-react';
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

export function ApprenticeProgressSection() {
  const { data, isLoading, isError, refetch, isFetching } = useApprenticeProgress();

  const rows = useMemo(() => data ?? [], [data]);

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
              {rows.map((r) => {
                const otjPct = r.otjRequiredHours
                  ? Math.round((r.otjVerifiedHours / r.otjRequiredHours) * 100)
                  : 0;
                return (
                  <ListRow
                    key={r.studentUserId}
                    accent={r.reviewOverdue ? 'red' : r.otjOnTrack ? 'emerald' : 'amber'}
                    lead={<Avatar initials={getInitials(r.name)} />}
                    title={r.name}
                    subtitle={
                      [r.courseName, r.collegeName].filter(Boolean).join(' · ') ||
                      'College apprentice'
                    }
                    trailing={
                      <div className="flex items-center gap-2">
                        <Pill tone={r.otjOnTrack ? 'emerald' : 'amber'}>
                          {r.otjVerifiedHours}/{r.otjRequiredHours}h OTJ
                        </Pill>
                        {r.epaStatus && <Pill tone={epaTone(r.epaStatus)}>{r.epaStatus}</Pill>}
                        {r.reviewOverdue && <Pill tone="red">Review due</Pill>}
                        <ComplianceRing score={r.progressPercent} size={40} label="Progress" />
                      </div>
                    }
                  />
                );
              })}
            </ListBody>
          </ListCard>
        </>
      )}
    </PageFrame>
  );
}
