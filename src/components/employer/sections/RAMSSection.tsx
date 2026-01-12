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
  FileText,
  Sparkles,
  FolderOpen,
  Plus,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  ChevronRight,
  MapPin,
  Calendar,
  User,
  AlertTriangle,
  Download,
  Copy,
} from "lucide-react";
import {
  useRAMSDocuments,
  useRAMSDocumentStats,
  useCreateRAMSDocument,
  useUpdateRAMSStatus,
  useDeleteRAMSDocument,
  type RAMSDocument,
  type RAMSStatus,
} from "@/hooks/useRAMSDocuments";
import { format } from "date-fns";
import type { Section } from "@/pages/employer/EmployerDashboard";

interface RAMSSectionProps {
  onNavigate?: (section: Section) => void;
}

const STATUS_OPTIONS: { value: RAMSStatus; label: string; color: string }[] = [
  { value: "draft", label: "Draft", color: "bg-muted/50 text-muted-foreground" },
  { value: "submitted", label: "Submitted", color: "bg-warning/20 text-warning" },
  { value: "approved", label: "Approved", color: "bg-success/20 text-success" },
  { value: "rejected", label: "Rejected", color: "bg-destructive/20 text-destructive" },
];

export function RAMSSection({ onNavigate }: RAMSSectionProps) {
  const { data: ramsDocuments = [], isLoading, error, refetch } = useRAMSDocuments();
  const { data: stats } = useRAMSDocumentStats();
  const createRAMS = useCreateRAMSDocument();
  const updateStatus = useUpdateRAMSStatus();
  const deleteRAMS = useDeleteRAMSDocument();

  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const [selectedRAMS, setSelectedRAMS] = useState<RAMSDocument | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    project_name: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    assessor: "",
    contractor: "",
    supervisor: "",
    activities: [] as string[],
    risks: [] as { id: string; hazard: string; risk_level: "low" | "medium" | "high"; control_measures: string[]; residual_risk: "low" | "medium" | "high" }[],
    required_ppe: [] as string[],
    job_scale: "",
  });
  const [activityInput, setActivityInput] = useState("");

  // Filter documents
  const filteredDocuments = ramsDocuments.filter(doc => {
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
    const matchesSearch = searchQuery === "" ||
      doc.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.assessor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateRAMS = async () => {
    await createRAMS.mutateAsync({
      ...formData,
      status: "draft",
    });
    setShowCreateSheet(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      project_name: "",
      location: "",
      date: new Date().toISOString().split("T")[0],
      assessor: "",
      contractor: "",
      supervisor: "",
      activities: [],
      risks: [],
      required_ppe: [],
      job_scale: "",
    });
    setActivityInput("");
  };

  const handleStatusChange = async (id: string, status: RAMSStatus) => {
    await updateStatus.mutateAsync({ id, status });
  };

  const openRAMSDetail = (doc: RAMSDocument) => {
    setSelectedRAMS(doc);
    setShowDetailSheet(true);
  };

  const addActivity = () => {
    if (activityInput.trim()) {
      setFormData(prev => ({
        ...prev,
        activities: [...prev.activities, activityInput.trim()]
      }));
      setActivityInput("");
    }
  };

  const removeActivity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const getStatusColor = (status: RAMSStatus) => {
    return STATUS_OPTIONS.find(s => s.value === status)?.color || "bg-muted/50 text-muted-foreground";
  };

  if (isLoading) {
    return <HubSkeleton statCount={3} cardCount={4} />;
  }

  if (error) {
    return <ErrorState message="Failed to load RAMS documents" onRetry={refetch} />;
  }

  return (
    <div className="space-y-4 md:space-y-6 pb-6">
      {/* Quick Stats */}
      <QuickStats
        stats={[
          {
            icon: CheckCircle2,
            value: stats?.approved || 0,
            label: "Approved",
            color: "green",
          },
          ...(stats?.submitted ? [{
            icon: Clock,
            value: stats.submitted,
            label: "Pending",
            color: "yellow" as const,
            pulse: true,
          }] : []),
          {
            icon: FileText,
            value: stats?.total || 0,
            label: "Total RAMS",
            color: "blue",
          },
        ]}
      />

      {/* AI RAMS - Navigate to SmartDocs */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          AI-Powered
        </h2>
        <Card className="border-elec-yellow/30 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-elec-yellow/20">
                <Sparkles className="h-6 w-6 text-elec-yellow" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">AI RAMS Generator</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Generate comprehensive risk assessments with AI. Describe your job and get a complete RAMS document in seconds.
                </p>
                <Button
                  className="w-full md:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                  onClick={() => onNavigate?.("airams")}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate with AI
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          Manage RAMS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <FeatureTile
            icon={Plus}
            title="Create New"
            description="Start from blank"
            onClick={() => setShowCreateSheet(true)}
            compact
          />
          <FeatureTile
            icon={FolderOpen}
            title="All RAMS"
            description={`${ramsDocuments.length} documents`}
            onClick={() => setFilterStatus("all")}
            compact
          />
          <FeatureTile
            icon={Clock}
            title="Pending"
            description={`${stats?.submitted || 0} awaiting`}
            onClick={() => setFilterStatus("submitted")}
            badge={stats?.submitted ? `${stats.submitted}` : undefined}
            badgeVariant="warning"
            compact
          />
          <FeatureTile
            icon={CheckCircle2}
            title="Approved"
            description={`${stats?.approved || 0} active`}
            onClick={() => setFilterStatus("approved")}
            compact
          />
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search RAMS..."
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

      {/* RAMS List */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-info rounded-full"></span>
          {filterStatus === "all" ? "All RAMS Documents" : `${STATUS_OPTIONS.find(s => s.value === filterStatus)?.label} RAMS`}
          <Badge variant="secondary" className="ml-auto">{filteredDocuments.length}</Badge>
        </h2>

        {filteredDocuments.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">No RAMS documents found</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowCreateSheet(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First RAMS
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {filteredDocuments.map((doc) => (
              <Card
                key={doc.id}
                className="hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => openRAMSDetail(doc)}
              >
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-elec-yellow/10 shrink-0">
                        <FileText className="h-4 w-4 text-elec-yellow" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm md:text-base truncate">
                          {doc.project_name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {doc.location} • v{doc.version}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(doc.updated_at), "dd MMM yyyy")}
                          <span className="mx-1">•</span>
                          <User className="h-3 w-3" />
                          {doc.assessor}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className={`text-xs ${getStatusColor(doc.status as RAMSStatus)}`}>
                        {doc.status}
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

      {/* Create RAMS Sheet */}
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create RAMS Document</SheetTitle>
            <SheetDescription>
              Create a new risk assessment and method statement
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input
                value={formData.project_name}
                onChange={(e) => setFormData(prev => ({ ...prev, project_name: e.target.value }))}
                placeholder="e.g., Office Rewire - ABC Corp"
                className="h-11"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Site address"
                    className="pl-9 h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Assessment Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Assessor</Label>
                <Input
                  value={formData.assessor}
                  onChange={(e) => setFormData(prev => ({ ...prev, assessor: e.target.value }))}
                  placeholder="Your name"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Job Scale</Label>
                <Select
                  value={formData.job_scale}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, job_scale: v }))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select scale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (1-2 days)</SelectItem>
                    <SelectItem value="medium">Medium (3-5 days)</SelectItem>
                    <SelectItem value="large">Large (1-2 weeks)</SelectItem>
                    <SelectItem value="major">Major (2+ weeks)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Contractor (Optional)</Label>
                <Input
                  value={formData.contractor}
                  onChange={(e) => setFormData(prev => ({ ...prev, contractor: e.target.value }))}
                  placeholder="Main contractor"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Supervisor (Optional)</Label>
                <Input
                  value={formData.supervisor}
                  onChange={(e) => setFormData(prev => ({ ...prev, supervisor: e.target.value }))}
                  placeholder="Site supervisor"
                  className="h-11"
                />
              </div>
            </div>

            {/* Activities */}
            <div className="space-y-2">
              <Label>Work Activities</Label>
              <div className="flex gap-2">
                <Input
                  value={activityInput}
                  onChange={(e) => setActivityInput(e.target.value)}
                  placeholder="Add activity"
                  className="h-11"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addActivity())}
                />
                <Button type="button" onClick={addActivity} variant="outline" className="h-11">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.activities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.activities.map((activity, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive/20"
                      onClick={() => removeActivity(index)}
                    >
                      {activity} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowCreateSheet(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                onClick={handleCreateRAMS}
                disabled={!formData.project_name || !formData.location || !formData.assessor || createRAMS.isPending}
              >
                {createRAMS.isPending ? "Creating..." : "Create RAMS"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* RAMS Detail Sheet */}
      <Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
        <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
          {selectedRAMS && (
            <>
              <SheetHeader>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-elec-yellow/10">
                    <FileText className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <SheetTitle>{selectedRAMS.project_name}</SheetTitle>
                    <SheetDescription>
                      Version {selectedRAMS.version} • {selectedRAMS.assessor}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                <div className="flex gap-2">
                  <Badge className={getStatusColor(selectedRAMS.status as RAMSStatus)}>
                    {selectedRAMS.status}
                  </Badge>
                  {selectedRAMS.job_scale && (
                    <Badge variant="outline">{selectedRAMS.job_scale} job</Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Location</Label>
                    <p className="mt-1 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {selectedRAMS.location}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Assessment Date</Label>
                    <p className="mt-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {selectedRAMS.date}
                    </p>
                  </div>
                </div>

                {selectedRAMS.contractor && (
                  <div>
                    <Label className="text-muted-foreground">Contractor</Label>
                    <p className="mt-1">{selectedRAMS.contractor}</p>
                  </div>
                )}

                {selectedRAMS.activities && selectedRAMS.activities.length > 0 && (
                  <div>
                    <Label className="text-muted-foreground">Work Activities</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedRAMS.activities.map((activity, index) => (
                        <Badge key={index} variant="secondary">{activity}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRAMS.risks && selectedRAMS.risks.length > 0 && (
                  <div>
                    <Label className="text-muted-foreground">Risk Assessment ({selectedRAMS.risks.length} hazards)</Label>
                    <div className="mt-2 space-y-2">
                      {selectedRAMS.risks.slice(0, 3).map((risk, index) => (
                        <div key={index} className="p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{risk.hazard}</span>
                            <Badge className={
                              risk.risk_level === "high" ? "bg-destructive/20 text-destructive" :
                              risk.risk_level === "medium" ? "bg-warning/20 text-warning" :
                              "bg-success/20 text-success"
                            }>
                              {risk.risk_level}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {selectedRAMS.risks.length > 3 && (
                        <p className="text-sm text-muted-foreground">
                          + {selectedRAMS.risks.length - 3} more hazards
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {selectedRAMS.required_ppe && selectedRAMS.required_ppe.length > 0 && (
                  <div>
                    <Label className="text-muted-foreground">Required PPE</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedRAMS.required_ppe.map((ppe, index) => (
                        <Badge key={index} variant="outline">{ppe}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  {selectedRAMS.pdf_url && (
                    <Button variant="outline" className="flex-1" asChild>
                      <a href={selectedRAMS.pdf_url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>

                {/* Status Actions */}
                <div className="border-t pt-4">
                  <Label className="text-muted-foreground mb-2 block">Update Status</Label>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.filter(s => s.value !== selectedRAMS.status).map(option => (
                      <Button
                        key={option.value}
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(selectedRAMS.id, option.value)}
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
