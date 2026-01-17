import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { QuickStats } from "@/components/employer/QuickStats";
import {
  useTrainingRecords,
  useTrainingStats,
  useCreateTrainingRecord,
  useUpdateTrainingStatus,
  useDeleteTrainingRecord,
  type TrainingRecord,
  type TrainingType,
  type TrainingStatus
} from "@/hooks/useTrainingRecords";
import { useEmployees } from "@/hooks/useEmployees";
import {
  Award,
  GraduationCap,
  Users,
  AlertTriangle,
  Search,
  CheckCircle2,
  Clock,
  Plus,
  Loader2,
  RefreshCw,
  Calendar,
  Trash2
} from "lucide-react";

const statusColors: Record<string, string> = {
  "Pending": "bg-yellow-500/20 text-yellow-400",
  "In Progress": "bg-blue-500/20 text-blue-400",
  "Completed": "bg-green-500/20 text-green-400",
  "Expired": "bg-red-500/20 text-red-400",
  "Failed": "bg-red-500/20 text-red-400",
};

const trainingTypes: TrainingType[] = ["Induction", "Safety", "CPD", "Apprenticeship", "Certification", "Refresher"];

export function TrainingRecordsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewTraining, setShowNewTraining] = useState(false);

  // Form state
  const [trainingName, setTrainingName] = useState("");
  const [trainingType, setTrainingType] = useState<TrainingType>("Safety");
  const [provider, setProvider] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // Hooks
  const { data: trainingRecords, isLoading, error, refetch } = useTrainingRecords();
  const { data: stats } = useTrainingStats();
  const { data: employees } = useEmployees();
  const createTraining = useCreateTrainingRecord();
  const updateStatus = useUpdateTrainingStatus();
  const deleteTraining = useDeleteTrainingRecord();

  // Filter by search
  const filteredRecords = trainingRecords?.filter(record =>
    record.training_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.employee?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.provider?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleCreateTraining = async () => {
    if (!trainingName) return;

    await createTraining.mutateAsync({
      training_name: trainingName,
      training_type: trainingType,
      provider: provider || undefined,
      employee_id: selectedEmployee || undefined,
      start_date: startDate || undefined,
      expiry_date: expiryDate || undefined,
      status: "Pending",
    });

    // Reset form
    setTrainingName("");
    setTrainingType("Safety");
    setProvider("");
    setSelectedEmployee("");
    setStartDate("");
    setExpiryDate("");
    setShowNewTraining(false);
  };

  const handleMarkComplete = async (record: TrainingRecord) => {
    await updateStatus.mutateAsync({
      id: record.id,
      status: "Completed",
    });
  };

  const handleDelete = async (id: string) => {
    await deleteTraining.mutateAsync(id);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">Failed to load training records</p>
        <Button onClick={() => refetch()} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeader
          title="Training Records"
          description="Training matrix, CPD logs, and competence tracking"
        />

        <Sheet open={showNewTraining} onOpenChange={setShowNewTraining}>
          <SheetTrigger asChild>
            <Button className="gap-2 h-11 touch-manipulation">
              <Plus className="h-4 w-4" />
              Add Training
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
            <div className="flex flex-col h-full bg-background">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle>Add Training Record</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="space-y-2">
                  <Label>Training Name *</Label>
                  <Input
                    placeholder="e.g. 18th Edition, Working at Heights..."
                    value={trainingName}
                    onChange={(e) => setTrainingName(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Training Type</Label>
                  <Select value={trainingType} onValueChange={(v) => setTrainingType(v as TrainingType)}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {trainingTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Employee (Optional)</Label>
                  <Select value={selectedEmployee || "all"} onValueChange={(v) => setSelectedEmployee(v === "all" ? "" : v)}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue placeholder="Select employee..." />
                    </SelectTrigger>
                    <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                      <SelectItem value="all">All employees / General</SelectItem>
                      {employees?.map(emp => (
                        <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Provider</Label>
                  <Input
                    placeholder="Training provider name..."
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="h-11 touch-manipulation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="h-11 touch-manipulation"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border bg-background">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewTraining(false)}
                    className="flex-1 h-11 touch-manipulation"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateTraining}
                    disabled={!trainingName || createTraining.isPending}
                    className="flex-1 h-11 touch-manipulation"
                  >
                    {createTraining.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Add Training"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search */}
      <div className="relative">
        {!searchQuery && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        )}
        <Input
          placeholder="Search training..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn("h-11 touch-manipulation", !searchQuery && "pl-9")}
        />
      </div>

      {/* Quick Stats */}
      <QuickStats
        stats={[
          {
            icon: CheckCircle2,
            value: isLoading ? "-" : (stats?.completed || 0),
            label: "Completed",
            color: "green",
          },
          {
            icon: Clock,
            value: isLoading ? "-" : (stats?.inProgress || 0),
            label: "In Progress",
            color: "yellow",
          },
          ...(stats?.pending && stats.pending > 0 ? [{
            icon: AlertTriangle,
            value: stats.pending,
            label: "Pending",
            color: "orange" as const,
            pulse: true,
          }] : []),
          ...(stats?.expiringsSoon && stats.expiringsSoon > 0 ? [{
            icon: Calendar,
            value: stats.expiringsSoon,
            label: "Expiring Soon",
            color: "orange" as const,
            pulse: true,
          }] : []),
        ]}
      />

      {/* Training List */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Training Records
        </h2>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-elec-gray border-border">
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-2 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredRecords.length === 0 ? (
          <Card className="bg-elec-gray border-border">
            <CardContent className="p-8 text-center">
              <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Training Records</h3>
              <p className="text-muted-foreground mb-4">Add your first training record to get started.</p>
              <Button onClick={() => setShowNewTraining(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Training
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredRecords.map((record) => (
              <Card key={record.id} className="bg-elec-gray border-border hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        record.status === "Completed"
                          ? "bg-success/10"
                          : record.status === "In Progress"
                          ? "bg-blue-500/10"
                          : record.status === "Expired"
                          ? "bg-red-500/10"
                          : "bg-yellow-500/10"
                      }`}>
                        <Award className={`h-4 w-4 ${
                          record.status === "Completed"
                            ? "text-success"
                            : record.status === "In Progress"
                            ? "text-blue-400"
                            : record.status === "Expired"
                            ? "text-red-400"
                            : "text-yellow-400"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm md:text-base">
                          {record.training_name}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                          {record.training_type && (
                            <Badge variant="outline" className="text-xs">
                              {record.training_type}
                            </Badge>
                          )}
                          {record.employee?.name && (
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {record.employee.name}
                            </span>
                          )}
                          {record.provider && (
                            <span>Provider: {record.provider}</span>
                          )}
                        </div>
                        {record.expiry_date && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Expires: {new Date(record.expiry_date).toLocaleDateString('en-GB')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={statusColors[record.status] || ""}>
                        {record.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {record.status !== "Completed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkComplete(record)}
                            disabled={updateStatus.isPending}
                            className="h-8 text-xs touch-manipulation"
                          >
                            {updateStatus.isPending ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-3 w-3" />
                            )}
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(record.id)}
                          disabled={deleteTraining.isPending}
                          className="h-8 text-xs text-destructive hover:text-destructive touch-manipulation"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
