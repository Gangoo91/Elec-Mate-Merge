import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { RefreshCw, MapPin, Calendar } from 'lucide-react';
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

const OPEN_STATUSES: IncidentStatus[] = ['draft', 'submitted', 'under_review'];
const CLOSED_STATUSES: IncidentStatus[] = ['resolved', 'closed'];

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
  });

  const lastIncidentDate = incidents
    .filter((i) => i.incident_type === 'injury')
    .sort(
      (a, b) => new Date(b.date_occurred).getTime() - new Date(a.date_occurred).getTime()
    )[0]?.date_occurred;

  const daysSinceLastIncident = lastIncidentDate
    ? differenceInDays(new Date(), new Date(lastIncidentDate))
    : 365;

  const closedLast30 = incidents.filter((i) => {
    if (!CLOSED_STATUSES.includes(i.status)) return false;
    const updated = i.date_occurred;
    if (!updated) return false;
    return differenceInDays(new Date(), new Date(updated)) <= 30;
  }).length;

  const riddorCount = incidents.filter(
    (i) => i.severity === 'critical' || i.incident_type === 'injury'
  ).length;

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
    });
  };

  const handleStatusChange = async (id: string, status: IncidentStatus) => {
    await updateStatus.mutateAsync({ id, status });
  };

  const openIncidentDetail = (incident: Incident) => {
    setSelectedIncident(incident);
    setShowDetailSheet(true);
  };

  const reporterName = (incident: Incident): string => {
    const anyInc = incident as unknown as Record<string, unknown>;
    return (
      (anyInc.reporter_name as string) ||
      (anyInc.reported_by_name as string) ||
      (anyInc.reporter as string) ||
      'Unknown'
    );
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
          { label: 'RIDDOR', value: riddorCount, tone: 'red' },
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
