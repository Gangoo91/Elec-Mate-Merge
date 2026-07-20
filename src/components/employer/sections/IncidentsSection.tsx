import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RefreshCw, MapPin, Calendar, Briefcase, AlertTriangle, ExternalLink } from 'lucide-react';
import { openExternalUrl } from '@/utils/open-external-url';
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
  SecondaryButton,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';
import { ErrorState } from '@/components/employer/ErrorState';
import {
  useIncidents,
  useIncidentStats,
  useCreateIncident,
  useUpdateIncidentStatus,
  type Incident,
  type IncidentType,
  type SeverityLevel,
  type IncidentStatus,
} from '@/hooks/useIncidents';
import { useJobs } from '@/hooks/useJobs';
import { useEmployees } from '@/hooks/useEmployees';
import { format, differenceInDays, formatDistanceToNow } from 'date-fns';

const INCIDENT_TYPES: { value: IncidentType; label: string }[] = [
  { value: 'near_miss', label: 'Near Miss' },
  { value: 'unsafe_practice', label: 'Unsafe Practice' },
  { value: 'faulty_equipment', label: 'Faulty Equipment' },
  { value: 'injury', label: 'Injury' },
  { value: 'property_damage', label: 'Property Damage' },
  { value: 'environmental', label: 'Environmental' },
  { value: 'security', label: 'Security' },
  { value: 'other', label: 'Other' },
];

const SEVERITY_LEVELS: { value: SeverityLevel; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

const STATUS_OPTIONS: { value: IncidentStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'investigating', label: 'Investigating' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const FILTER_TABS = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'investigating', label: 'Investigating' },
  { value: 'closed', label: 'Closed' },
];

// 'open' is the status worker-submitted safety reports arrive with.
const OPEN_STATUSES: IncidentStatus[] = ['open', 'draft', 'submitted', 'under_review'];
const CLOSED_STATUSES: IncidentStatus[] = ['resolved', 'closed'];

// Honest heuristic only — RIDDOR reportability is a legal judgement the employer
// must make. We flag likely candidates (serious injuries) so the deadline is
// never missed, and point at the official HSE route for the actual F2508.
function isRiddorCandidate(incident: Incident): boolean {
  return (
    incident.incident_type === 'injury' &&
    (incident.severity === 'high' || incident.severity === 'critical')
  );
}

function getInitials(name?: string | null): string {
  if (!name) return 'NA';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function severityTone(severity: SeverityLevel): Tone {
  switch (severity) {
    case 'critical':
      return 'red';
    case 'high':
      return 'orange';
    case 'medium':
      return 'amber';
    case 'low':
      return 'emerald';
  }
}

function statusTone(status: IncidentStatus): Tone {
  switch (status) {
    case 'resolved':
    case 'closed':
      return 'emerald';
    case 'investigating':
    case 'under_review':
      return 'cyan';
    case 'open':
    case 'submitted':
      return 'amber';
    case 'draft':
    default:
      return 'purple';
  }
}

export function IncidentsSection() {
  const { data: incidents = [], isLoading, error, refetch } = useIncidents();
  const { data: stats } = useIncidentStats();
  const { data: jobs = [] } = useJobs();
  const { data: employees = [] } = useEmployees();
  // Reverse link: show which job an incident sits on (incidents carry job_id).
  const jobTitleById = useMemo(() => new Map(jobs.map((j) => [j.id, j.title])), [jobs]);
  // Worker-side reports store employer_employees.id in reported_by.
  const employeeNameById = useMemo(
    () => new Map(employees.map((e) => [e.id, e.name])),
    [employees]
  );
  const createIncident = useCreateIncident();
  const updateStatus = useUpdateIncidentStatus();

  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    incident_type: 'near_miss' as IncidentType,
    title: '',
    description: '',
    location: '',
    date_occurred: new Date().toISOString(),
    severity: 'medium' as SeverityLevel,
    immediate_action_taken: '',
    witnesses: '',
    supervisor_notified: false,
    supervisor_name: '',
    injuries_sustained: '',
    first_aid_given: false,
  });

  const lastIncidentDate = incidents
    .filter((i) => i.incident_type === 'injury')
    .sort(
      (a, b) => new Date(b.date_occurred).getTime() - new Date(a.date_occurred).getTime()
    )[0]?.date_occurred;

  // Honest metric: days since the last logged injury ('—' when none logged).
  const daysSinceLastIncident = lastIncidentDate
    ? differenceInDays(new Date(), new Date(lastIncidentDate))
    : null;

  const closedLast30 = incidents.filter((i) => {
    if (!CLOSED_STATUSES.includes(i.status)) return false;
    // updated_at is the closest thing to a closure timestamp on the row.
    const closedAt = i.updated_at || i.date_occurred;
    if (!closedAt) return false;
    return differenceInDays(new Date(), new Date(closedAt)) <= 30;
  }).length;

  const filteredIncidents = incidents.filter((incident) => {
    const matchesTab =
      filterStatus === 'all' ||
      (filterStatus === 'open' && OPEN_STATUSES.includes(incident.status)) ||
      (filterStatus === 'investigating' &&
        (incident.status === 'investigating' || incident.status === 'under_review')) ||
      (filterStatus === 'closed' && CLOSED_STATUSES.includes(incident.status));
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === '' ||
      incident.title.toLowerCase().includes(q) ||
      incident.description.toLowerCase().includes(q) ||
      incident.location.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const handleCreateIncident = async () => {
    await createIncident.mutateAsync({
      ...formData,
      status: 'draft',
    });
    setShowCreateSheet(false);
    setFormData({
      incident_type: 'near_miss',
      title: '',
      description: '',
      location: '',
      date_occurred: new Date().toISOString(),
      severity: 'medium',
      immediate_action_taken: '',
      witnesses: '',
      supervisor_notified: false,
      supervisor_name: '',
      injuries_sustained: '',
      first_aid_given: false,
    });
  };

  const handleStatusChange = async (id: string, status: IncidentStatus) => {
    await updateStatus.mutateAsync({ id, status });
  };

  const openIncidentDetail = (incident: Incident) => {
    setSelectedIncident(incident);
    setShowDetailSheet(true);
  };

  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  const reporterName = (incident: Incident): string => {
    if (!incident.reported_by) return 'Not recorded';
    // Worker reports carry the employee id; employer reports carry a name.
    const resolved = employeeNameById.get(incident.reported_by);
    if (resolved) return resolved;
    if (UUID_RE.test(incident.reported_by)) return 'Team member';
    return incident.reported_by;
  };

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

  const openCount = stats?.open ?? incidents.filter((i) => OPEN_STATUSES.includes(i.status)).length;
  const nearMissesCount = stats?.nearMisses ?? incidents.filter((i) => i.incident_type === 'near_miss').length;

  return (
    <PageFrame>
      <PageHero
        eyebrow="HR & Safety"
        title="Incidents"
        description="Accidents, near-misses and witness testimonies."
        tone="red"
        actions={
          <>
            <PrimaryButton onClick={() => setShowCreateSheet(true)}>Report incident</PrimaryButton>
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Open', value: openCount, tone: 'red' },
          { label: 'Near misses', value: nearMissesCount, tone: 'orange' },
          {
            label: 'Days since injury',
            value: daysSinceLastIncident ?? '—',
            tone: 'emerald',
          },
          { label: 'Closed 30d', value: closedLast30, tone: 'emerald' },
        ]}
      />

      <FilterBar
        tabs={FILTER_TABS}
        activeTab={filterStatus}
        onTabChange={setFilterStatus}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search incidents…"
      />

      <ListCard>
        <ListCardHeader
          tone="red"
          title="Incidents"
          meta={<Pill tone="red">{filteredIncidents.length}</Pill>}
        />
        {filteredIncidents.length === 0 ? (
          <div className="p-2">
            <EmptyState
              title="No incidents"
              description="Keep it that way."
              action="Report incident"
              onAction={() => setShowCreateSheet(true)}
            />
          </div>
        ) : (
          <ListBody>
            {filteredIncidents.map((incident) => {
              const reporter = reporterName(incident);
              const occurred = new Date(incident.date_occurred);
              const timeAgo = formatDistanceToNow(occurred, { addSuffix: true });
              return (
                <ListRow
                  key={incident.id}
                  accent={incident.severity === 'critical' ? 'red' : undefined}
                  lead={<Avatar initials={getInitials(reporter)} />}
                  title={incident.title}
                  subtitle={`${incident.location} · ${reporter} · ${timeAgo}`}
                  trailing={
                    <>
                      {isRiddorCandidate(incident) && <Pill tone="red">RIDDOR?</Pill>}
                      <Pill tone={severityTone(incident.severity)}>{incident.severity}</Pill>
                      <Pill tone={statusTone(incident.status)}>
                        {incident.status.replace('_', ' ')}
                      </Pill>
                    </>
                  }
                  onClick={() => openIncidentDetail(incident)}
                />
              );
            })}
          </ListBody>
        )}
      </ListCard>

      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-y-auto bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          <SheetHeader>
            <SheetTitle className="text-white">Report incident</SheetTitle>
            <SheetDescription className="text-white">
              Log a safety incident or near-miss.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Incident type</Label>
                <Select
                  value={formData.incident_type}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, incident_type: v as IncidentType }))
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {INCIDENT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Severity</Label>
                <Select
                  value={formData.severity}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, severity: v as SeverityLevel }))
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {SEVERITY_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of incident"
className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Detailed description of what happened…"
                rows={4}
className={textareaClass}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Where did this occur?"
className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Date and time</Label>
              <Input
                type="datetime-local"
                value={formData.date_occurred.slice(0, 16)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    date_occurred: new Date(e.target.value).toISOString(),
                  }))
                }
className={inputClass}
              />
            </div>

            {formData.incident_type === 'injury' && (
              <div className="space-y-4 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                <div className="space-y-2">
                  <Label className="text-white">Injuries sustained</Label>
                  <Textarea
                    value={formData.injuries_sustained}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        injuries_sustained: e.target.value,
                      }))
                    }
                    placeholder="Who was injured and what the injury is — needed if this becomes RIDDOR-reportable"
                    rows={2}
                    className={textareaClass}
                  />
                </div>
                <label className="flex items-center gap-3 min-h-[44px] touch-manipulation cursor-pointer">
                  <Checkbox
                    checked={formData.first_aid_given}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, first_aid_given: checked === true }))
                    }
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <span className="text-sm text-white">First aid given</span>
                </label>
                {(formData.severity === 'high' || formData.severity === 'critical') && (
                  <p className="text-xs text-red-300 flex items-start gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    Serious injuries may be RIDDOR-reportable. Check the criteria after
                    saving — deadlines are short.
                  </p>
                )}
              </div>
            )}

            <label className="flex items-center gap-3 min-h-[44px] touch-manipulation cursor-pointer">
              <Checkbox
                checked={formData.supervisor_notified}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, supervisor_notified: checked === true }))
                }
                className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
              />
              <span className="text-sm text-white">Supervisor notified</span>
            </label>
            {formData.supervisor_notified && (
              <div className="space-y-2">
                <Label className="text-white">Supervisor name</Label>
                <Input
                  value={formData.supervisor_name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, supervisor_name: e.target.value }))
                  }
                  placeholder="Who was notified?"
                  className={inputClass}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-white">Immediate action taken</Label>
              <Textarea
                value={formData.immediate_action_taken}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    immediate_action_taken: e.target.value,
                  }))
                }
                placeholder="What action was taken immediately?"
                rows={2}
className={textareaClass}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Witnesses</Label>
              <Input
                value={formData.witnesses}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, witnesses: e.target.value }))
                }
                placeholder="Names of any witnesses"
className={inputClass}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <SecondaryButton onClick={() => setShowCreateSheet(false)} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleCreateIncident}
                disabled={
                  !formData.title ||
                  !formData.description ||
                  !formData.location ||
                  createIncident.isPending
                }
                fullWidth
              >
                {createIncident.isPending ? 'Saving…' : 'Report incident'}
              </PrimaryButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-y-auto bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          {selectedIncident && (
            <>
              <SheetHeader>
                <SheetTitle className="text-white">{selectedIncident.title}</SheetTitle>
                <SheetDescription className="text-white">
                  {INCIDENT_TYPES.find((t) => t.value === selectedIncident.incident_type)?.label}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                <StatStrip
                  columns={2}
                  stats={[
                    {
                      label: 'Severity',
                      value: selectedIncident.severity,
                      tone: severityTone(selectedIncident.severity),
                    },
                    {
                      label: 'Status',
                      value: selectedIncident.status.replace('_', ' '),
                      tone: statusTone(selectedIncident.status),
                    },
                  ]}
                />

                {selectedIncident.incident_type === 'injury' && (
                  <div
                    className={
                      isRiddorCandidate(selectedIncident)
                        ? 'p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-3'
                        : 'p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-3'
                    }
                  >
                    <p className="text-sm font-semibold text-white flex items-center gap-2">
                      <AlertTriangle
                        className={
                          isRiddorCandidate(selectedIncident)
                            ? 'h-4 w-4 text-red-400'
                            : 'h-4 w-4 text-amber-400'
                        }
                      />
                      {isRiddorCandidate(selectedIncident)
                        ? 'Likely RIDDOR-reportable — check now'
                        : 'Injury — check RIDDOR criteria'}
                    </p>
                    {selectedIncident.injuries_sustained && (
                      <p className="text-xs text-white/80 leading-relaxed">
                        <span className="font-semibold text-white">Injuries: </span>
                        {selectedIncident.injuries_sustained}
                      </p>
                    )}
                    {selectedIncident.first_aid_given && (
                      <p className="text-xs text-white/80">First aid was given at the scene.</p>
                    )}
                    <ul className="text-xs text-white/80 space-y-1 list-disc pl-4">
                      <li>Deaths and specified injuries: report without delay, F2508 within 10 days</li>
                      <li>Over-7-day incapacitation: report within 15 days of the incident</li>
                      <li>Keep a record of over-3-day injuries even if not reportable</li>
                    </ul>
                    <SecondaryButton
                      fullWidth
                      onClick={() => openExternalUrl('https://www.hse.gov.uk/riddor/report.htm')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Report to HSE (RIDDOR)
                    </SecondaryButton>
                  </div>
                )}

                <ListCard>
                  <ListCardHeader title="Description" />
                  <div className="px-5 sm:px-6 py-4">
                    <p className="text-[13px] text-white leading-relaxed whitespace-pre-wrap">
                      {selectedIncident.description}
                    </p>
                  </div>
                </ListCard>

                <ListCard>
                  <ListCardHeader title="Details" />
                  <ListBody>
                    <ListRow
                      lead={<MapPin className="h-4 w-4 text-white" />}
                      title="Location"
                      subtitle={selectedIncident.location}
                    />
                    {selectedIncident.job_id && jobTitleById.get(selectedIncident.job_id) && (
                      <ListRow
                        lead={<Briefcase className="h-4 w-4 text-white" />}
                        title="On job"
                        subtitle={jobTitleById.get(selectedIncident.job_id) ?? ''}
                      />
                    )}
                    <ListRow
                      lead={<Calendar className="h-4 w-4 text-white" />}
                      title="Date occurred"
                      subtitle={format(
                        new Date(selectedIncident.date_occurred),
                        'dd MMM yyyy HH:mm'
                      )}
                    />
                    <ListRow
                      lead={<Avatar initials={getInitials(reporterName(selectedIncident))} />}
                      title="Reporter"
                      subtitle={reporterName(selectedIncident)}
                    />
                    {selectedIncident.supervisor_notified && (
                      <ListRow
                        lead={<AlertTriangle className="h-4 w-4 text-white" />}
                        title="Supervisor notified"
                        subtitle={selectedIncident.supervisor_name || 'Yes'}
                      />
                    )}
                  </ListBody>
                </ListCard>

                {selectedIncident.immediate_action_taken && (
                  <ListCard>
                    <ListCardHeader title="Immediate action taken" />
                    <div className="px-5 sm:px-6 py-4">
                      <p className="text-[13px] text-white leading-relaxed whitespace-pre-wrap">
                        {selectedIncident.immediate_action_taken}
                      </p>
                    </div>
                  </ListCard>
                )}

                {selectedIncident.witnesses && (
                  <ListCard>
                    <ListCardHeader title="Witness testimony" />
                    <div className="px-5 sm:px-6 py-4">
                      <p className="text-[13px] text-white leading-relaxed whitespace-pre-wrap">
                        {selectedIncident.witnesses}
                      </p>
                    </div>
                  </ListCard>
                )}

                <ListCard>
                  <ListCardHeader title="Update status" />
                  <div className="px-5 sm:px-6 py-4 flex flex-wrap gap-2">
                    {STATUS_OPTIONS.filter((s) => s.value !== selectedIncident.status).map(
                      (option) => (
                        <SecondaryButton
                          key={option.value}
                          onClick={() =>
                            handleStatusChange(selectedIncident.id, option.value)
                          }
                          disabled={updateStatus.isPending}
                        >
                          {option.label}
                        </SecondaryButton>
                      )
                    )}
                  </div>
                </ListCard>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </PageFrame>
  );
}
