/**
 * Incidents (ELE-1945, ELE-2031): every near miss, incident and injury on the
 * firm's jobs. One list from the single incident model (Site Safety's
 * near-miss register and accident book), plus any reports older builds wrote
 * to employer_incidents. Laid out like the Overview: hero with one live line,
 * one figure strip, the work queue left and what needs doing right.
 */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, RefreshCw } from 'lucide-react';
import { differenceInDays, format, formatDistanceToNow } from 'date-fns';
import { PageFrame, PageHero, LoadingBlocks, EmptyState } from '@/components/employer/editorial';
import {
  frameClass,
  HeroActions,
  HeroPrimary,
  ToolButton,
  FigureStrip,
  TwoColumn,
  Segments,
  SearchField,
  FilterRow,
  RowList,
  Row,
  Initials,
  StatusPill,
  PanelHead,
  panelShellClass,
  Rows,
  KeyValue,
  PlainEmpty,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { INCIDENTS_HELP } from '@/components/employer/help/incidents';
import { IncidentDetailSheet } from '@/components/employer/incidents/IncidentDetailSheet';
import { IncidentFormSheet } from '@/components/employer/incidents/IncidentFormSheet';
import {
  useIncidents,
  incidentNextStep,
  isIncidentClosed,
  isRiddorReportable,
  overdueActions,
  riddorDeadline,
  INCIDENT_TYPE_LABEL,
  type Incident,
} from '@/hooks/useIncidents';
import { useJobs } from '@/hooks/useJobs';
import { useEmployees } from '@/hooks/useEmployees';

type Tab = 'new' | 'open' | 'closed' | 'all';

const reporterOf = (i: Incident) => i.reporter_name?.trim() || 'Not recorded';

export function IncidentsSection() {
  const { data: incidents = [], isLoading, error, refetch, isFetching } = useIncidents();
  const { data: jobs = [] } = useJobs();
  const { data: employees = [] } = useEmployees();
  const [searchParams, setSearchParams] = useSearchParams();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Incident | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [search, setSearch] = useState('');

  const newCount = incidents.filter((i) => !i.acknowledged_at && !isIncidentClosed(i)).length;
  const [tab, setTab] = useState<Tab>('open');
  // Land on New when there is something nobody has looked at.
  const [tabTouched, setTabTouched] = useState(false);
  useEffect(() => {
    if (!tabTouched && !isLoading) setTab(newCount > 0 ? 'new' : 'open');
  }, [newCount, isLoading, tabTouched]);

  // Always render the live row, so saves in the sheet show straight away.
  const selected = useMemo(
    () => incidents.find((i) => i.id === selectedId) ?? null,
    [incidents, selectedId]
  );

  // Deep links: ?incident=<id> (bell, push, email, Overview) and ?new=incident.
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

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openTool = (tool: 'near-miss' | 'accident-book') => {
    const next = new URLSearchParams(searchParams);
    next.set('section', 'site-safety');
    next.set('tool', tool);
    setSearchParams(next);
  };

  const open = incidents.filter((i) => !isIncidentClosed(i));
  const riddorOwed = open
    .filter((i) => isRiddorReportable(i.riddor_category) && !i.riddor_reported_at)
    .sort(
      (a, b) =>
        (riddorDeadline(a)?.getTime() ?? Infinity) - (riddorDeadline(b)?.getTime() ?? Infinity)
    );
  const riddorUndecided = open.filter((i) => i.incident_type === 'injury' && !i.riddor_category);
  const overdue = open.flatMap((i) => overdueActions(i).map((a) => ({ incident: i, action: a })));
  const lastInjury = incidents
    .filter((i) => i.incident_type === 'injury')
    .sort((a, b) => new Date(b.date_occurred).getTime() - new Date(a.date_occurred).getTime())[0];
  const daysSinceInjury = lastInjury
    ? differenceInDays(new Date(), new Date(lastInjury.date_occurred))
    : null;

  const liveLine = (() => {
    const todo: string[] = [];
    if (newCount) todo.push(`${plural(newCount, 'report')} not seen yet`);
    if (riddorOwed.length) todo.push(`${riddorOwed.length} RIDDOR to report`);
    if (overdue.length) todo.push(`${plural(overdue.length, 'action')} overdue`);
    if (todo.length) return `${todo.join(', ')}.`;
    if (open.length) return `${plural(open.length, 'report')} open. Nothing overdue.`;
    return 'Nothing open. Reports from site and the office appear here.';
  })();

  const filtered = incidents.filter((i) => {
    const closed = isIncidentClosed(i);
    const inTab =
      tab === 'all' ||
      (tab === 'new' && !i.acknowledged_at && !closed) ||
      (tab === 'open' && !closed) ||
      (tab === 'closed' && closed);
    const q = search.trim().toLowerCase();
    const hit =
      !q ||
      [i.title, i.description, i.location, i.injured_person, i.job_title, i.reporter_name]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    return inTab && hit;
  });

  const heroActions = (
    <HeroActions>
      <HeroPrimary data-help="incidents.report" onClick={openNew} icon={<Plus className="h-4 w-4" />}>
        Report incident
      </HeroPrimary>
      <ToolButton
        label="Refresh"
        onClick={() => refetch()}
        icon={<RefreshCw className={isFetching ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />}
      />
      <PageHelpButton help={INCIDENTS_HELP} askContext={{ page: 'incidents', tab }} />
    </HeroActions>
  );
  const hero = <PageHero title="Incidents" description={liveLine} actions={heroActions} />;

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        {hero}
        <LoadingBlocks />
      </PageFrame>
    );
  }
  if (error) {
    return (
      <PageFrame className={frameClass}>
        {hero}
        <EmptyState
          title="Incidents did not load"
          description={(error as Error).message}
          action="Try again"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  const emptyText: Record<Tab, string> = {
    new: 'Nothing new. Every report has been seen.',
    open: 'No open reports. Nothing is waiting on the office.',
    closed: 'Nothing closed yet. Closed reports and what was done stay here.',
    all: 'No incidents yet. Reports from your team on site and from the office appear here.',
  };

  const main = (
    <>
      <FilterRow>
        <div data-help="incidents.tabs">
          <Segments<Tab>
            items={[
              { value: 'new', label: 'New', count: newCount },
              { value: 'open', label: 'Open', count: open.length },
              { value: 'closed', label: 'Closed' },
              { value: 'all', label: 'All' },
            ]}
            value={tab}
            onChange={(v) => {
              setTabTouched(true);
              setTab(v);
            }}
          />
        </div>
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Search reports, jobs, people"
          className="lg:w-72"
        />
      </FilterRow>

      {filtered.length === 0 ? (
        <PlainEmpty
          text={search.trim() ? 'Nothing matches that search.' : emptyText[tab]}
          action={tab === 'all' && !search.trim() ? 'Report incident' : undefined}
          onAction={openNew}
        />
      ) : (
        <div data-help="incidents.list">
          <RowList>
            {filtered.map((incident) => {
              const reporter = reporterOf(incident);
              const closed = isIncidentClosed(incident);
              const unseen = !incident.acknowledged_at && !closed;
              const next = incidentNextStep(incident);
              const when = formatDistanceToNow(new Date(incident.date_occurred), {
                addSuffix: true,
              });
              const kind = INCIDENT_TYPE_LABEL[incident.incident_type] ?? 'Report';
              const serious = incident.severity === 'high' || incident.severity === 'critical';
              return (
                <Row
                  key={incident.id}
                  lead={<Initials name={reporter} />}
                  title={incident.title}
                  detail={`${kind} · ${reporter} · ${when}`}
                  meta={
                    closed ? undefined : (
                      <span className={next.tone === 'red' ? 'text-red-400' : undefined}>
                        {next.label}
                      </span>
                    )
                  }
                  status={
                    unseen ? (
                      <StatusPill tone="red">New</StatusPill>
                    ) : closed ? (
                      <StatusPill tone="green">Closed</StatusPill>
                    ) : (
                      <StatusPill tone={serious ? 'red' : 'neutral'}>
                        {incident.severity === 'critical'
                          ? 'Critical'
                          : incident.severity === 'high'
                            ? 'High'
                            : incident.severity === 'medium'
                              ? 'Medium'
                              : 'Low'}
                      </StatusPill>
                    )
                  }
                  onClick={() => {
                    setSelectedId(incident.id);
                    setDetailOpen(true);
                  }}
                />
              );
            })}
          </RowList>
        </div>
      )}
    </>
  );

  const side = (
    <>
      <div className={panelShellClass}>
        <PanelHead title="Needs doing" />
        {riddorOwed.length === 0 && riddorUndecided.length === 0 && overdue.length === 0 ? (
          <p className="px-4 py-4 text-[14px] text-white sm:px-5">
            No RIDDOR reports owed and no actions overdue.
          </p>
        ) : (
          <Rows>
            {riddorUndecided.map((i) => (
              <Row
                key={`u-${i.id}`}
                title="Decide on RIDDOR"
                detail={i.title}
                status={<StatusPill tone="red">Injury</StatusPill>}
                onClick={() => {
                  setSelectedId(i.id);
                  setDetailOpen(true);
                }}
              />
            ))}
            {riddorOwed.map((i) => {
              const due = riddorDeadline(i);
              return (
                <Row
                  key={`r-${i.id}`}
                  title="Report to the HSE"
                  detail={i.title}
                  status={
                    <StatusPill tone="red">
                      {due ? `By ${format(due, 'd MMM')}` : 'On diagnosis'}
                    </StatusPill>
                  }
                  onClick={() => {
                    setSelectedId(i.id);
                    setDetailOpen(true);
                  }}
                />
              );
            })}
            {overdue.slice(0, 6).map(({ incident, action }) => (
              <Row
                key={`a-${incident.id}-${action.id}`}
                title={action.action}
                detail={`${action.owner_name || 'No owner'} · ${incident.title}`}
                status={
                  <StatusPill tone="red">
                    {action.due_date ? `Due ${format(new Date(action.due_date), 'd MMM')}` : 'Overdue'}
                  </StatusPill>
                }
                onClick={() => {
                  setSelectedId(incident.id);
                  setDetailOpen(true);
                }}
              />
            ))}
          </Rows>
        )}
      </div>

      <div className={panelShellClass}>
        <PanelHead title="The records" />
        <Rows>
          <KeyValue
            label="Days since an injury"
            value={daysSinceInjury ?? 'None logged'}
          />
          <Row
            title="Near-miss register"
            detail="Near misses on the firm’s jobs, in Site Safety"
            onClick={() => openTool('near-miss')}
          />
          <Row
            title="Accident book"
            detail="Injuries, RIDDOR deadlines and investigations"
            onClick={() => openTool('accident-book')}
          />
        </Rows>
      </div>
    </>
  );

  return (
    <PageFrame className={frameClass}>
      {hero}
      <HowItWorks help={INCIDENTS_HELP} askContext={{ page: 'incidents', tab }} />

      <FigureStrip
        figures={[
          { label: 'Not seen', value: newCount, tone: newCount ? 'red' : undefined },
          {
            label: 'RIDDOR to report',
            value: riddorOwed.length,
            tone: riddorOwed.length ? 'red' : undefined,
          },
          {
            label: 'Actions overdue',
            value: overdue.length,
            tone: overdue.length ? 'red' : undefined,
          },
          { label: 'Open', value: open.length, tone: open.length ? 'volt' : undefined },
        ]}
      />

      <TwoColumn main={main} side={side} />

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
        reporterName={selected ? reporterOf(selected) : ''}
        jobTitle={selected?.job_title ?? null}
      />
    </PageFrame>
  );
}
