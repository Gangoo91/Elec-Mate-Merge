import { useState, useMemo } from 'react';
import { RefreshCw, Users, MapPin } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import { useEmployees } from '@/hooks/useEmployees';
import { cn } from '@/lib/utils';
import { ViewJobSheet } from '@/components/employer/sheets/ViewJobSheet';
import { Job } from '@/services/jobService';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  Eyebrow,
  Dot,
  IconButton,
  EmptyState,
  LoadingBlocks,
  AlertRow,
  SecondaryButton,
  type Tone,
} from '@/components/employer/editorial';

type RangeKey = 'week' | 'month' | 'quarter';

const RANGE_DAYS: Record<RangeKey, number> = {
  week: 7,
  month: 28,
  quarter: 84,
};

const stageBarColor: Record<string, string> = {
  'In Progress': 'bg-elec-yellow',
  Scheduled: 'bg-cyan-400',
  Testing: 'bg-purple-400',
  Confirmed: 'bg-emerald-400',
};

const stageTone: Record<string, Tone> = {
  'In Progress': 'yellow',
  Scheduled: 'cyan',
  Testing: 'purple',
  Confirmed: 'emerald',
};

export function JobTimelineSection() {
  const [range, setRange] = useState<RangeKey>('week');
  const [periodOffset, setPeriodOffset] = useState(0);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data: jobs = [], isLoading: jobsLoading, refetch } = useJobs();
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();

  const rangeDays = RANGE_DAYS[range];

  const periodDays = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay() + 1 + periodOffset * rangeDays);
    return Array.from({ length: rangeDays }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [periodOffset, rangeDays]);

  const activeJobs = jobs
    .filter((j) => j.status === 'Active' || j.status === 'Pending')
    .map((job) => ({
      ...job,
      stage: job.status === 'Active' ? 'In Progress' : 'Scheduled',
      assignedWorkers: job.workers_count || 0,
      startDate: job.start_date || new Date().toISOString(),
      endDate:
        job.end_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }));

  const formatRangeDate = (date: Date) =>
    date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  const formatValue = (value: number | null) => {
    if (!value) return null;
    if (value >= 1000) return `£${Math.round(value / 1000)}k`;
    return `£${value}`;
  };

  const getJobPosition = (job: (typeof activeJobs)[0]) => {
    const startDate = new Date(job.startDate);
    const endDate = new Date(job.endDate);
    const periodStart = periodDays[0];
    const periodEnd = periodDays[periodDays.length - 1];

    if (endDate < periodStart || startDate > periodEnd) return null;

    const clampedStart = startDate < periodStart ? periodStart : startDate;
    const clampedEnd = endDate > periodEnd ? periodEnd : endDate;

    const startDay = Math.floor(
      (clampedStart.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24)
    );
    const duration =
      Math.ceil(
        (clampedEnd.getTime() - clampedStart.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;

    return { startDay, duration };
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getTodayIndex = () => periodDays.findIndex((day) => isToday(day));

  const jobsThisPeriod = activeJobs.filter((job) => getJobPosition(job) !== null);

  const onScheduleCount = jobsThisPeriod.filter((j) => (j.progress ?? 0) >= 50).length;
  const slippingCount = jobsThisPeriod.length - onScheduleCount;

  const detectClashes = () => {
    const clashes: Array<{
      employee: (typeof employees)[0];
      jobs: typeof activeJobs;
      date: Date;
    }> = [];

    if (activeJobs.length >= 2 && employees.length > 0) {
      const todayIdx = getTodayIndex();
      if (todayIdx >= 0 && todayIdx < 5) {
        const overlappingJobs = jobsThisPeriod.filter((job) => {
          const pos = getJobPosition(job);
          return (
            pos && todayIdx >= pos.startDay && todayIdx < pos.startDay + pos.duration
          );
        });

        if (overlappingJobs.length >= 2 && employees[0]) {
          clashes.push({
            employee: employees[0],
            jobs: overlappingJobs.slice(0, 2),
            date: periodDays[todayIdx],
          });
        }
      }
    }

    return clashes;
  };

  const clashes = detectClashes();

  const handleJobClick = (job: (typeof activeJobs)[0]) => {
    const fullJob = jobs.find((j) => j.id === job.id);
    if (fullJob) {
      setSelectedJob(fullJob);
      setSheetOpen(true);
    }
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  const formatDateRangeLabel = (start: Date, end: Date) =>
    `${formatRangeDate(start)} → ${formatRangeDate(end)}`;

  if (jobsLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Operations"
          title="Timeline"
          description="Gantt view for every job — milestones and dependencies."
          tone="indigo"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="Operations"
        title="Timeline"
        description="Gantt view for every job — milestones and dependencies."
        tone="indigo"
        actions={
          <IconButton onClick={() => refetch()} aria-label="Refresh timeline">
            <RefreshCw className="h-4 w-4" />
          </IconButton>
        }
      />

      <StatStrip
        columns={3}
        stats={[
          { label: 'Jobs shown', value: jobsThisPeriod.length },
          { label: 'On schedule', value: onScheduleCount, tone: 'emerald' },
          { label: 'Slipping', value: slippingCount, tone: 'orange' },
        ]}
      />

      <FilterBar
        tabs={[
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
          { value: 'quarter', label: 'Quarter' },
        ]}
        activeTab={range}
        onTabChange={(v) => {
          setRange(v as RangeKey);
          setPeriodOffset(0);
        }}
        actions={
          <div className="flex items-center gap-2">
            <SecondaryButton onClick={() => setPeriodOffset((p) => p - 1)}>
              ← Prev
            </SecondaryButton>
            <SecondaryButton onClick={() => setPeriodOffset(0)}>
              Today
            </SecondaryButton>
            <SecondaryButton onClick={() => setPeriodOffset((p) => p + 1)}>
              Next →
            </SecondaryButton>
          </div>
        }
      />

      <ListCard>
        <ListCardHeader
          tone="yellow"
          title="Gantt"
          meta={
            <Pill tone="yellow">
              {formatDateRangeLabel(periodDays[0], periodDays[periodDays.length - 1])}
            </Pill>
          }
        />
        {jobsThisPeriod.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title="No jobs in this period"
              description="Switch range or step to a different period to see scheduled work."
            />
          </div>
        ) : (
          <div className="p-4 sm:p-6 overflow-x-auto">
            <div
              className="relative min-w-[640px] rounded-xl border border-white/[0.06] overflow-hidden"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: `${100 / rangeDays}% 56px`,
              }}
            >
              <div
                className="grid border-b border-white/[0.06] bg-[hsl(0_0%_10%)]"
                style={{ gridTemplateColumns: `repeat(${rangeDays}, minmax(0, 1fr))` }}
              >
                {periodDays.map((day, i) => (
                  <div
                    key={i}
                    className={cn(
                      'px-2 py-2 text-center border-l border-white/[0.06] first:border-l-0',
                      isToday(day) && 'bg-elec-yellow/10'
                    )}
                  >
                    <div
                      className={cn(
                        'text-[10px] font-semibold uppercase tracking-[0.14em]',
                        isToday(day) ? 'text-elec-yellow' : 'text-white'
                      )}
                    >
                      {day.toLocaleDateString('en-GB', { weekday: 'short' }).charAt(0)}
                    </div>
                    <div
                      className={cn(
                        'mt-0.5 text-[11px] tabular-nums',
                        isToday(day) ? 'text-elec-yellow' : 'text-white'
                      )}
                    >
                      {day.getDate()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="divide-y divide-white/[0.06]">
                {jobsThisPeriod.map((job) => {
                  const position = getJobPosition(job);
                  if (!position) return null;
                  return (
                    <div
                      key={job.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleJobClick(job)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleJobClick(job);
                        }
                      }}
                      className="relative h-14 cursor-pointer touch-manipulation hover:bg-white/[0.03] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60"
                    >
                      <div
                        className="absolute top-2 bottom-2 rounded-md flex items-center px-3 shadow-sm"
                        style={{
                          left: `${(position.startDay / rangeDays) * 100}%`,
                          width: `${(position.duration / rangeDays) * 100}%`,
                          minWidth: '64px',
                        }}
                      >
                        <div
                          className={cn(
                            'absolute inset-0 rounded-md',
                            stageBarColor[job.stage] || 'bg-elec-yellow'
                          )}
                        />
                        <div className="relative z-10 flex items-center justify-between w-full gap-2">
                          <span className="text-[11px] font-semibold text-black truncate">
                            {job.title}
                          </span>
                          <span className="text-[11px] font-semibold text-black tabular-nums shrink-0">
                            {job.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              {Object.keys(stageTone).map((stage) => (
                <div key={stage} className="flex items-center gap-1.5">
                  <Dot tone={stageTone[stage]} />
                  <span className="text-[11px] text-white">{stage}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </ListCard>

      <ListCard>
        <ListCardHeader
          tone="indigo"
          title="Jobs"
          meta={<Pill tone="indigo">{activeJobs.length}</Pill>}
        />
        {activeJobs.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title="No active jobs"
              description="Once jobs are created they will appear here with start and end dates."
            />
          </div>
        ) : (
          <ListBody>
            {activeJobs.map((job) => {
              const startDate = new Date(job.startDate);
              const endDate = new Date(job.endDate);
              const tone = stageTone[job.stage] ?? 'yellow';
              return (
                <ListRow
                  key={job.id}
                  accent={tone}
                  lead={<Avatar initials={getInitials(job.title || 'JB')} />}
                  title={job.title}
                  subtitle={
                    <span className="flex items-center gap-2">
                      <span>{formatDateRangeLabel(startDate, endDate)}</span>
                      <span className="text-white">·</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{job.location}</span>
                      </span>
                      <span className="text-white">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span className="tabular-nums">{job.assignedWorkers}</span>
                      </span>
                    </span>
                  }
                  trailing={
                    <>
                      {formatValue(job.value) && (
                        <Pill tone="emerald">{formatValue(job.value)}</Pill>
                      )}
                      <Pill tone={tone}>{job.stage}</Pill>
                    </>
                  }
                  onClick={() => handleJobClick(job)}
                />
              );
            })}
          </ListBody>
        )}
      </ListCard>

      {clashes.length > 0 && (
        <div className="space-y-3">
          <Eyebrow>Conflicts</Eyebrow>
          {clashes.map((clash, idx) => (
            <AlertRow
              key={idx}
              tone="red"
              title={`${clash.employee.name} — double booked`}
              subtitle={`Assigned to "${clash.jobs[0]?.title}" and "${clash.jobs[1]?.title}" on ${clash.date.toLocaleDateString(
                'en-GB',
                { day: 'numeric', month: 'long' }
              )}`}
              trailing={<Pill tone="red">Clash</Pill>}
            />
          ))}
        </div>
      )}

      {!employeesLoading && employees.length > 0 && (
        <ListCard>
          <ListCardHeader
            tone="cyan"
            title="Workers on rota"
            meta={<Pill tone="cyan">{employees.filter((e) => e.status === 'Active').length}</Pill>}
          />
          <ListBody>
            {employees
              .filter((e) => e.status === 'Active')
              .slice(0, 9)
              .map((employee) => {
                const idx = employees.findIndex((e) => e.id === employee.id);
                const hasClash = clashes.some((c) => c.employee.id === employee.id);
                const onSite = idx < 3 && jobsThisPeriod.length > 0;
                const statusTone: Tone = hasClash
                  ? 'red'
                  : onSite
                    ? 'emerald'
                    : 'cyan';
                const statusLabel = hasClash
                  ? 'Clash'
                  : onSite
                    ? 'On site'
                    : 'Available';
                return (
                  <ListRow
                    key={employee.id}
                    lead={<Avatar initials={employee.avatar_initials} online={onSite} />}
                    title={employee.name}
                    subtitle={employee.team_role}
                    trailing={<Pill tone={statusTone}>{statusLabel}</Pill>}
                  />
                );
              })}
          </ListBody>
        </ListCard>
      )}

      <ViewJobSheet job={selectedJob} open={sheetOpen} onOpenChange={setSheetOpen} />
    </PageFrame>
  );
}
