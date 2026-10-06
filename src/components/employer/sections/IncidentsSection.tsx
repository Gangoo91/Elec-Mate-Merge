import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { differenceInDays, formatDistanceToNow } from 'date-fns';
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
  EmptyState,
  LoadingBlocks,
  IconButton,
  PrimaryButton,
  type Tone,
} from '@/components/employer/editorial';
import { ErrorState } from '@/components/employer/ErrorState';
import { IncidentDetailSheet } from '@/components/employer/incidents/IncidentDetailSheet';
import { IncidentFormSheet } from '@/components/employer/incidents/IncidentFormSheet';
import {
  useIncidents,
  incidentNextStep,
  isIncidentClosed,
  isRiddorReportable,
  overdueActions,
  type Incident,
  type SeverityLevel,
} from '@/hooks/useIncidents';
import { useJobs } from '@/hooks/useJobs';
import { useEmployees } from '@/hooks/useEmployees';

const FILTER_TABS = [
  { value: 'new', label: 'New' },
  { value: 'open', label: 'Open' },
  { value: 'closed', label: 'Closed' },
  { value: 'all', label: 'All' },
];

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function getInitials(name?: string | null): string {
  if (!name) return 'NA';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const SEVERITY_TONE: Record<SeverityLevel, Tone> = {
  critical: 'red',
  high: 'orange',
  medium: 'amber',
  low: 'emerald',
};

export function IncidentsSection() {
  const { data: incidents = [], isLoading, error, refetch } = useIncidents();
  const { data: jobs = [] } = useJobs();
  const { data: employees = [] } = useEmployees();

  const jobTitleById = useMemo(() => new Map(jobs.map((j) => [j.id, j.title])), [jobs]);
  const employeeNameById = useMemo(
    () => new Map(employees.map((e) => [e.id, e.name])),
    [employees]
  );

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Incident | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const newCount = incidents.filter((i) => !i.acknowledged_at && !isIncidentClosed(i)).length;
  const [filter, setFilter] = useState<string>('open');
  // Land on New when there is something nobody has looked at.
  const [filterTouched, setFilterTouched] = useState(false);
  useEffect(() => {
    if (!filterTouched && !isLoading) setFilter(newCount > 0 ? 'new' : 'open');
  }, [newCount, isLoading, filterTouched]);

  // Always render the live row, so saves in the sheet show straight away.
  const selected = useMemo(
    () => incidents.find((i) => i.id === selectedId) ?? null,
    [incidents, selectedId]
  );

  // Deep links: ?incident=<id> (notifications, Overview) and ?new=incident.
  const [searchParams, setSearchParams] = useSearchParams();
  const incidentParam = searchParams.get('incident');
  const newParam = searchParams.get('new');
  useEffect(() => {
    if (isLoading) return;
    if (!incidentParam && newParam !== 'incident') return;
    if (incidentParam && incidents.some((i) => i.id === incidentParam)) {
      setSelectedId(incidentParam);
      setDetailOpen(true);
    }
    if (newParam === 'incident') {
      setEditing(null);
      setFormOpen(true);
    }
    const next = new URLSearchParams(searchParams);
    next.delete('incident');
    next.delete('new');
    setSearchParams(next, { replace: true });
  }, [incidentParam, newParam, isLoading, incidents, searchParams, setSearchParams]);

  const reporterName = (incident: Incident): string => {
    if (!incident.reported_by) return 'Not recorded';
    const resolved = employeeNameById.get(incident.reported_by);
    if (resolved) return resolved;
    if (UUID_RE.test(incident.reported_by)) return 'Team member';
    return incident.reported_by;
  };

  const filtered = incidents.filter((i) => {
    const closed = isIncidentClosed(i);
    const matchesTab =
      filter === 'all' ||
      (filter === 'new' && !i.acknowledged_at && !closed) ||
      (filter === 'open' && !closed) ||
      (filter === 'closed' && closed);
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      i.title.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.location.toLowerCase().includes(q) ||
      (i.injured_person ?? '').toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  if (isLoading) {
    return (
      <PageFrame>
        <LoadingBlocks />
      </PageFrame>
    );
  }

  if (error) {
    return (
      <PageFrame>
        <ErrorState message="Failed to load incidents" onRetry={refetch} />
      </PageFrame>
    );
  }

  const open = incidents.filter((i) => !isIncidentClosed(i));
  const overdueCount = open.reduce((n, i) => n + overdueActions(i).length, 0);
  const riddorDue = open.filter(
    (i) => isRiddorReportable(i.riddor_category) && !i.riddor_reported_at
  ).length;
  const lastInjury = incidents
    .filter((i) => i.incident_type === 'injury')
    .sort((a, b) => new Date(b.date_occurred).getTime() - new Date(a.date_occurred).getTime())[0];
  const daysSinceInjury = lastInjury
    ? differenceInDays(new Date(), new Date(lastInjury.date_occurred))
    : null;

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const emptyCopy: Record<string, { title: string; description: string }> = {
    new: { title: 'Nothing new', description: 'Every report has been seen.' },
    open: { title: 'No open reports', description: 'Nothing waiting on the office.' },
    closed: {
      title: 'Nothing closed yet',
      description: 'Closed reports and what was done stay here.',
    },
    all: { title: 'No incidents', description: 'Reports from site and the office appear here.' },
  };

  return (
    <PageFrame>
      <PageHero
        eyebrow="HR & Safety"
        title="Incidents"
        description="Near misses and incidents from site, what caused them and what changed."
        tone="red"
        actions={
          <>
            <PrimaryButton onClick={openNew}>Report incident</PrimaryButton>
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Not seen', value: newCount, tone: newCount ? 'red' : 'emerald' },
          { label: 'RIDDOR to report', value: riddorDue, tone: riddorDue ? 'red' : 'emerald' },
          {
            label: 'Actions overdue',
            value: overdueCount,
            tone: overdueCount ? 'orange' : 'emerald',
          },
          { label: 'Days since injury', value: daysSinceInjury ?? '—', tone: 'emerald' },
        ]}
      />

      <FilterBar
        tabs={FILTER_TABS.map((t) =>
          t.value === 'new' && newCount ? { ...t, label: `New · ${newCount}` } : t
        )}
        activeTab={filter}
        onTabChange={(v) => {
          setFilterTouched(true);
          setFilter(v);
        }}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search incidents…"
      />

      <ListCard>
        <ListCardHeader
          tone="red"
          title="Reports"
          meta={<Pill tone="red">{filtered.length}</Pill>}
        />
        {filtered.length === 0 ? (
          <div className="p-2">
            <EmptyState
              title={emptyCopy[filter]?.title ?? 'No incidents'}
              description={emptyCopy[filter]?.description ?? ''}
              action="Report incident"
              onAction={openNew}
            />
          </div>
        ) : (
          <ListBody>
            {filtered.map((incident) => {
              const reporter = reporterName(incident);
              const closed = isIncidentClosed(incident);
              const unseen = !incident.acknowledged_at && !closed;
              const next = incidentNextStep(incident);
              const when = formatDistanceToNow(new Date(incident.date_occurred), {
                addSuffix: true,
              });
              return (
                <ListRow
                  key={incident.id}
                  accent={unseen || next.tone === 'red' ? 'red' : undefined}
                  lead={<Avatar initials={getInitials(reporter)} />}
                  title={incident.title}
                  subtitle={
                    closed
                      ? `${incident.location} · ${reporter} · ${when}`
                      : `${next.label} · ${reporter} · ${when}`
                  }
                  trailing={
                    <>
                      {unseen && <Pill tone="red">New</Pill>}
                      <Pill tone={SEVERITY_TONE[incident.severity] ?? 'amber'}>
                        {incident.severity}
                      </Pill>
                      {closed && <Pill tone="emerald">closed</Pill>}
                    </>
                  }
                  onClick={() => {
                    setSelectedId(incident.id);
                    setDetailOpen(true);
                  }}
                />
              );
            })}
          </ListBody>
        )}
      </ListCard>

      <IncidentFormSheet
        open={formOpen}
        onOpenChange={setFormOpen}
        editing={editing}
        employees={employees}
        jobs={jobs}
        onSaved={(saved) => {
          setSelectedId(saved.id);
          setDetailOpen(true);
        }}
      />

      <IncidentDetailSheet
        incident={selected}
        open={detailOpen && !!selected}
        onOpenChange={setDetailOpen}
        onEdit={(i) => {
          setEditing(i);
          setDetailOpen(false);
          setFormOpen(true);
        }}
        employees={employees}
        reporterName={selected ? reporterName(selected) : ''}
        jobTitle={selected?.job_id ? jobTitleById.get(selected.job_id) : null}
      />
    </PageFrame>
  );
}
