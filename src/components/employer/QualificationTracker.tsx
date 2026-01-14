import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Award,
  Search,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  Shield,
  Trash2,
  FileText,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useEmployeeQualifications,
  useCreateQualification,
  useDeleteQualification,
  useSyncEcsFromElecId,
  type EmployeeQualification,
  type QualificationType,
} from "@/hooks/useEmployeeQualifications";
import { useEmployees } from "@/hooks/useEmployees";
import { format, differenceInDays, parseISO } from "date-fns";

const QUALIFICATION_TYPES: { value: QualificationType; label: string }[] = [
  { value: "ecs_card", label: "ECS Card" },
  { value: "18th_edition", label: "18th Edition" },
  { value: "2391", label: "2391 Inspection & Testing" },
  { value: "2394", label: "2394 Initial Verification" },
  { value: "2395", label: "2395 Periodic Inspection" },
  { value: "nvq_l3", label: "NVQ Level 3" },
  { value: "cscs", label: "CSCS Card" },
  { value: "cpcs", label: "CPCS Card" },
  { value: "first_aid", label: "First Aid" },
  { value: "ipaf", label: "IPAF" },
  { value: "pasma", label: "PASMA" },
  { value: "asbestos", label: "Asbestos Awareness" },
  { value: "confined_space", label: "Confined Space" },
  { value: "driving_licence", label: "Driving Licence" },
  { value: "other", label: "Other" },
];

function getStatusBadge(status: string, expiryDate?: string) {
  const isExpired = status === "expired";
  const isExpiring = status === "expiring";

  let daysText = "";
  if (expiryDate) {
    const days = differenceInDays(parseISO(expiryDate), new Date());
    if (days < 0) {
      daysText = `${Math.abs(days)}d overdue`;
    } else if (days <= 30) {
      daysText = `${days}d left`;
    }
  }

  if (isExpired) {
    return (
      <Badge variant="destructive" className="gap-1">
        <AlertTriangle className="h-3 w-3" />
        Expired {daysText && `(${daysText})`}
      </Badge>
    );
  }

  if (isExpiring) {
    return (
      <Badge variant="outline" className="gap-1 border-amber-500/50 text-amber-400">
        <Clock className="h-3 w-3" />
        Expiring {daysText && `(${daysText})`}
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="gap-1 border-green-500/50 text-green-400">
      <CheckCircle2 className="h-3 w-3" />
      Valid
    </Badge>
  );
}

export function QualificationTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [addSheetOpen, setAddSheetOpen] = useState(false);

  // Form state
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [qualType, setQualType] = useState<QualificationType>("18th_edition");
  const [qualName, setQualName] = useState("");
  const [issuingBody, setIssuingBody] = useState("");
  const [certNumber, setCertNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const { data: qualifications = [], isLoading } = useEmployeeQualifications();
  const { data: employees = [] } = useEmployees();
  const createQualification = useCreateQualification();
  const deleteQualification = useDeleteQualification();
  const syncEcs = useSyncEcsFromElecId();

  // Filter qualifications
  const filteredQualifications = useMemo(() => {
    return qualifications.filter((q) => {
      // Search filter
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        const matchesName = q.qualification_name.toLowerCase().includes(search);
        const matchesEmployee = q.employee?.name?.toLowerCase().includes(search);
        if (!matchesName && !matchesEmployee) return false;
      }

      // Type filter
      if (filterType !== "all" && q.qualification_type !== filterType) {
        return false;
      }

      // Status filter
      if (filterStatus !== "all" && q.status !== filterStatus) {
        return false;
      }

      return true;
    });
  }, [qualifications, searchQuery, filterType, filterStatus]);

  // Group by employee
  const groupedByEmployee = useMemo(() => {
    const groups: Record<string, EmployeeQualification[]> = {};
    filteredQualifications.forEach((q) => {
      const employeeName = q.employee?.name || "Unknown";
      if (!groups[employeeName]) {
        groups[employeeName] = [];
      }
      groups[employeeName].push(q);
    });
    return groups;
  }, [filteredQualifications]);

  const handleAddQualification = async () => {
    if (!selectedEmployee || !qualType) return;

    await createQualification.mutateAsync({
      employee_id: selectedEmployee,
      qualification_type: qualType,
      qualification_name: qualName || QUALIFICATION_TYPES.find(t => t.value === qualType)?.label || qualType,
      issuing_body: issuingBody || undefined,
      certificate_number: certNumber || undefined,
      issue_date: issueDate || undefined,
      expiry_date: expiryDate || undefined,
    });

    // Reset form
    setSelectedEmployee("");
    setQualType("18th_edition");
    setQualName("");
    setIssuingBody("");
    setCertNumber("");
    setIssueDate("");
    setExpiryDate("");
    setAddSheetOpen(false);
  };

  const handleSyncEcs = async (employeeId: string) => {
    await syncEcs.mutateAsync(employeeId);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-11 flex-1" />
          <Skeleton className="h-11 w-32" />
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search qualifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-11"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-40 h-11">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {QUALIFICATION_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-32 h-11">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expiring">Expiring</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => setAddSheetOpen(true)}
          className="h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Qualifications List */}
      {Object.keys(groupedByEmployee).length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">
              No qualifications found
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery || filterType !== "all" || filterStatus !== "all"
                ? "Try adjusting your filters"
                : "Add employee qualifications to track certifications and expiry dates"}
            </p>
            <Button
              onClick={() => setAddSheetOpen(true)}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Qualification
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedByEmployee).map(([employeeName, quals]) => (
            <Card key={employeeName}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Award className="h-4 w-4 text-blue-400" />
                    </div>
                    <h3 className="font-medium text-foreground">{employeeName}</h3>
                    <Badge variant="secondary">{quals.length}</Badge>
                  </div>
                  {quals[0]?.employee_id && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSyncEcs(quals[0].employee_id)}
                      disabled={syncEcs.isPending}
                      className="text-xs"
                    >
                      <RefreshCw className={cn("h-3 w-3 mr-1", syncEcs.isPending && "animate-spin")} />
                      Sync ECS
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  {quals.map((qual) => (
                    <div
                      key={qual.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">
                            {qual.qualification_name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {qual.certificate_number && (
                              <span>#{qual.certificate_number}</span>
                            )}
                            {qual.expiry_date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Expires {format(parseISO(qual.expiry_date), "dd/MM/yyyy")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(qual.status, qual.expiry_date)}
                        {qual.file_url && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => window.open(qual.file_url, "_blank")}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteQualification.mutate(qual.id)}
                          disabled={deleteQualification.isPending}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Qualification Sheet */}
      <Sheet open={addSheetOpen} onOpenChange={setAddSheetOpen}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-elec-yellow" />
              Add Qualification
            </SheetTitle>
          </SheetHeader>

          <div className="py-4 space-y-4 overflow-y-auto max-h-[calc(85vh-140px)]">
            <div className="space-y-2">
              <Label>Employee *</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Qualification Type *</Label>
              <Select value={qualType} onValueChange={(v) => setQualType(v as QualificationType)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {QUALIFICATION_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Qualification Name</Label>
              <Input
                value={qualName}
                onChange={(e) => setQualName(e.target.value)}
                placeholder="e.g., 18th Edition Wiring Regulations"
                className="h-11"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Issuing Body</Label>
                <Input
                  value={issuingBody}
                  onChange={(e) => setIssuingBody(e.target.value)}
                  placeholder="e.g., City & Guilds"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Certificate Number</Label>
                <Input
                  value={certNumber}
                  onChange={(e) => setCertNumber(e.target.value)}
                  placeholder="e.g., 123456"
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="h-11"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setAddSheetOpen(false)}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddQualification}
                disabled={!selectedEmployee || createQualification.isPending}
                className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                {createQualification.isPending ? "Adding..." : "Add Qualification"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
