import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { QuickStats } from "@/components/employer/QuickStats";
import { HubSkeleton } from "@/components/employer/skeletons";
import { ErrorState } from "@/components/employer/ErrorState";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertTriangle,
  Plus,
  FileWarning,
  ClipboardCheck,
  Search,
  CheckCircle2,
  Shield,
  Calendar,
  MapPin,
  User,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  useIncidents,
  useIncidentStats,
  useCreateIncident,
  useUpdateIncidentStatus,
  type Incident,
  type IncidentType,
  type SeverityLevel,
  type IncidentStatus,
} from "@/hooks/useIncidents";
import { format, differenceInDays } from "date-fns";

const INCIDENT_TYPES: { value: IncidentType; label: string }[] = [
  { value: "near_miss", label: "Near Miss" },
  { value: "unsafe_practice", label: "Unsafe Practice" },
  { value: "faulty_equipment", label: "Faulty Equipment" },
  { value: "injury", label: "Injury" },
  { value: "property_damage", label: "Property Damage" },
  { value: "environmental", label: "Environmental" },
  { value: "security", label: "Security" },
  { value: "other", label: "Other" },
];

const SEVERITY_LEVELS: { value: SeverityLevel; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "bg-success/20 text-success" },
  { value: "medium", label: "Medium", color: "bg-warning/20 text-warning" },
  { value: "high", label: "High", color: "bg-orange-500/20 text-orange-500" },
  { value: "critical", label: "Critical", color: "bg-destructive/20 text-destructive" },
];

const STATUS_OPTIONS: { value: IncidentStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under Review" },
  { value: "investigating", label: "Investigating" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

export function IncidentsSection() {
  const { data: incidents = [], isLoading, error, refetch } = useIncidents();
  const { data: stats } = useIncidentStats();
  const createIncident = useCreateIncident();
  const updateStatus = useUpdateIncidentStatus();

  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    incident_type: "near_miss" as IncidentType,
    title: "",
    description: "",
    location: "",
    date_occurred: new Date().toISOString(),
    severity: "medium" as SeverityLevel,
    immediate_action_taken: "",
    witnesses: "",
    supervisor_notified: false,
    supervisor_name: "",
  });

  // Calculate days since last incident
  const lastIncidentDate = incidents
    .filter(i => i.incident_type === "injury")
    .sort((a, b) => new Date(b.date_occurred).getTime() - new Date(a.date_occurred).getTime())[0]?.date_occurred;

  const daysSinceLastIncident = lastIncidentDate
    ? differenceInDays(new Date(), new Date(lastIncidentDate))
    : 365; // Show 365 if no incidents

  // Filter incidents
  const filteredIncidents = incidents.filter(incident => {
    const matchesStatus = filterStatus === "all" || incident.status === filterStatus;
    const matchesSearch = searchQuery === "" ||
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateIncident = async () => {
    await createIncident.mutateAsync({
      ...formData,
      status: "draft",
    });
    setShowCreateSheet(false);
    setFormData({
      incident_type: "near_miss",
      title: "",
      description: "",
      location: "",
      date_occurred: new Date().toISOString(),
      severity: "medium",
      immediate_action_taken: "",
      witnesses: "",
      supervisor_notified: false,
      supervisor_name: "",
    });
  };

  const handleStatusChange = async (id: string, status: IncidentStatus) => {
    await updateStatus.mutateAsync({ id, status });
  };

  const openIncidentDetail = (incident: Incident) => {
    setSelectedIncident(incident);
    setShowDetailSheet(true);
  };

  const getTypeColor = (type: IncidentType) => {
    switch (type) {
      case "near_miss": return "bg-warning/10 text-warning";
      case "injury": return "bg-destructive/10 text-destructive";
      case "faulty_equipment": return "bg-orange-500/10 text-orange-500";
      case "property_damage": return "bg-purple-500/10 text-purple-500";
      default: return "bg-info/10 text-info";
    }
  };

  const getStatusColor = (status: IncidentStatus) => {
    switch (status) {
      case "resolved":
      case "closed": return "bg-success/10 text-success";
      case "investigating":
      case "under_review": return "bg-info/10 text-info";
      case "submitted": return "bg-warning/10 text-warning";
      default: return "bg-muted/50 text-muted-foreground";
    }
  };

  if (isLoading) {
    return <HubSkeleton statCount={4} cardCount={4} />;
  }

  if (error) {
    return <ErrorState message="Failed to load incidents" onRetry={refetch} />;
  }

  return (
    <div className="space-y-4 md:space-y-6 pb-6">
      {/* Quick Stats */}
      <QuickStats
        stats={[
          ...(stats?.open ? [{
            icon: AlertTriangle,
            value: stats.open,
            label: "Open",
            color: "orange" as const,
            pulse: true,
          }] : []),
          {
            icon: Shield,
            value: daysSinceLastIncident,
            label: "Days Safe",
            color: "green",
          },
          {
            icon: FileWarning,
            value: stats?.nearMisses || 0,
            label: "Near Misses",
            color: "blue",
          },
          {
            icon: CheckCircle2,
            value: stats?.resolved || 0,
            label: "Resolved",
            color: "purple",
          },
        ]}
      />

      {/* Quick Actions */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-warning rounded-full"></span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <FeatureTile
            icon={Plus}
            title="Report Incident"
            description="Log a new incident"
            onClick={() => setShowCreateSheet(true)}
            compact
          />
          <FeatureTile
            icon={FileWarning}
            title="Near Miss"
            description="Report near miss"
            onClick={() => {
              setFormData(prev => ({ ...prev, incident_type: "near_miss" }));
              setShowCreateSheet(true);
            }}
            compact
          />
          <FeatureTile
            icon={ClipboardCheck}
            title="RIDDOR"
            description="RIDDOR assessment"
            onClick={() => {
              setFormData(prev => ({ ...prev, incident_type: "injury", severity: "critical" }));
              setShowCreateSheet(true);
            }}
            compact
          />
          <FeatureTile
            icon={Search}
            title="View All"
            description={`${incidents.length} incidents`}
            onClick={() => setFilterStatus("all")}
            compact
          />
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search incidents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-11"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px] h-11">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {STATUS_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Incidents List */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-info rounded-full"></span>
          {filterStatus === "all" ? "All Incidents" : `${STATUS_OPTIONS.find(s => s.value === filterStatus)?.label} Incidents`}
          <Badge variant="secondary" className="ml-auto">{filteredIncidents.length}</Badge>
        </h2>

        {filteredIncidents.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 text-success/40 mx-auto mb-4" />
              <p className="text-muted-foreground">No incidents found</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowCreateSheet(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Report First Incident
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {filteredIncidents.map((incident) => (
              <Card
                key={incident.id}
                className="hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => openIncidentDetail(incident)}
              >
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`p-2 rounded-lg shrink-0 ${getTypeColor(incident.incident_type)}`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm md:text-base truncate">
                          {incident.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {INCIDENT_TYPES.find(t => t.value === incident.incident_type)?.label} • {incident.location}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(incident.date_occurred), "dd MMM yyyy")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className={`text-xs ${SEVERITY_LEVELS.find(s => s.value === incident.severity)?.color}`}>
                        {incident.severity}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(incident.status)}`}>
                        {incident.status.replace("_", " ")}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Incident Sheet */}
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Report Incident</SheetTitle>
            <SheetDescription>
              Log a safety incident or near miss
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Incident Type</Label>
                <Select
                  value={formData.incident_type}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, incident_type: v as IncidentType }))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INCIDENT_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Severity</Label>
                <Select
                  value={formData.severity}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, severity: v as SeverityLevel }))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SEVERITY_LEVELS.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of incident"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of what happened..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Where did this occur?"
                  className="pl-9 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date & Time</Label>
              <Input
                type="datetime-local"
                value={formData.date_occurred.slice(0, 16)}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  date_occurred: new Date(e.target.value).toISOString()
                }))}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label>Immediate Action Taken</Label>
              <Textarea
                value={formData.immediate_action_taken}
                onChange={(e) => setFormData(prev => ({ ...prev, immediate_action_taken: e.target.value }))}
                placeholder="What action was taken immediately?"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Witnesses</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData.witnesses}
                  onChange={(e) => setFormData(prev => ({ ...prev, witnesses: e.target.value }))}
                  placeholder="Names of any witnesses"
                  className="pl-9 h-11"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCreateSheet(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-warning hover:bg-warning/90 text-black"
                onClick={handleCreateIncident}
                disabled={!formData.title || !formData.description || !formData.location || createIncident.isPending}
              >
                {createIncident.isPending ? "Saving..." : "Report Incident"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Incident Detail Sheet */}
      <Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
        <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
          {selectedIncident && (
            <>
              <SheetHeader>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(selectedIncident.incident_type)}`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <SheetTitle>{selectedIncident.title}</SheetTitle>
                    <SheetDescription>
                      {INCIDENT_TYPES.find(t => t.value === selectedIncident.incident_type)?.label}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                <div className="flex gap-2">
                  <Badge className={SEVERITY_LEVELS.find(s => s.value === selectedIncident.severity)?.color}>
                    {selectedIncident.severity} severity
                  </Badge>
                  <Badge className={getStatusColor(selectedIncident.status)}>
                    {selectedIncident.status.replace("_", " ")}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Description</Label>
                    <p className="mt-1">{selectedIncident.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Location</Label>
                      <p className="mt-1 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {selectedIncident.location}
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Date Occurred</Label>
                      <p className="mt-1 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(selectedIncident.date_occurred), "dd MMM yyyy HH:mm")}
                      </p>
                    </div>
                  </div>

                  {selectedIncident.immediate_action_taken && (
                    <div>
                      <Label className="text-muted-foreground">Immediate Action Taken</Label>
                      <p className="mt-1">{selectedIncident.immediate_action_taken}</p>
                    </div>
                  )}

                  {selectedIncident.witnesses && (
                    <div>
                      <Label className="text-muted-foreground">Witnesses</Label>
                      <p className="mt-1">{selectedIncident.witnesses}</p>
                    </div>
                  )}
                </div>

                {/* Status Actions */}
                <div className="border-t pt-4">
                  <Label className="text-muted-foreground mb-2 block">Update Status</Label>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.filter(s => s.value !== selectedIncident.status).map(option => (
                      <Button
                        key={option.value}
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(selectedIncident.id, option.value)}
                        disabled={updateStatus.isPending}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
