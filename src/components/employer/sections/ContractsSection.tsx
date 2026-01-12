import { useState } from "react";
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
  useContracts,
  useContractTemplates,
  useContractStats,
  useCreateContract,
  useDeleteContract,
  type Contract,
  type ContractType,
  type ContractCategory
} from "@/hooks/useContracts";
import { useEmployees } from "@/hooks/useEmployees";
import {
  FileText,
  UserPlus,
  Briefcase,
  ClipboardList,
  UserCheck,
  Search,
  CheckCircle2,
  FileCheck,
  Plus,
  Loader2,
  RefreshCw,
  AlertTriangle,
  Trash2,
  Calendar
} from "lucide-react";

const statusColors: Record<string, string> = {
  "Draft": "bg-gray-500/20 text-gray-400",
  "Active": "bg-green-500/20 text-green-400",
  "Expired": "bg-red-500/20 text-red-400",
  "Terminated": "bg-red-500/20 text-red-400",
  "Template": "bg-blue-500/20 text-blue-400",
};

const contractTypes: ContractType[] = ["Employment", "Subcontractor", "Client", "Supplier", "Apprentice"];
const categories: ContractCategory[] = ["Employment", "Job Descriptions", "Performance", "Procedures", "Templates"];

const getCategoryIcon = (category: string | undefined) => {
  switch (category) {
    case "Employment": return FileText;
    case "Job Descriptions": return Briefcase;
    case "Performance": return UserCheck;
    case "Procedures": return ClipboardList;
    default: return FileText;
  }
};

const getCategoryColor = (category: string | undefined) => {
  switch (category) {
    case "Employment": return "text-elec-yellow";
    case "Job Descriptions": return "text-info";
    case "Performance": return "text-warning";
    case "Procedures": return "text-destructive";
    default: return "text-muted-foreground";
  }
};

export function ContractsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewContract, setShowNewContract] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [contractType, setContractType] = useState<ContractType>("Employment");
  const [category, setCategory] = useState<ContractCategory>("Employment");
  const [partyName, setPartyName] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [isTemplate, setIsTemplate] = useState(false);

  // Hooks
  const { data: contracts, isLoading: contractsLoading, error, refetch } = useContracts();
  const { data: templates, isLoading: templatesLoading } = useContractTemplates();
  const { data: stats } = useContractStats();
  const { data: employees } = useEmployees();
  const createContract = useCreateContract();
  const deleteContract = useDeleteContract();

  const isLoading = contractsLoading || templatesLoading;

  // Filter
  const filteredContracts = contracts?.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.party_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredTemplates = templates?.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Group templates by category
  const employmentTemplates = filteredTemplates.filter(t => t.category === "Employment");
  const jobDescTemplates = filteredTemplates.filter(t => t.category === "Job Descriptions");
  const performanceTemplates = filteredTemplates.filter(t => t.category === "Performance");
  const procedureTemplates = filteredTemplates.filter(t => t.category === "Procedures");

  const handleCreateContract = async () => {
    if (!title) return;

    await createContract.mutateAsync({
      title,
      contract_type: contractType,
      category,
      party_name: partyName || undefined,
      employee_id: selectedEmployee || undefined,
      start_date: startDate || undefined,
      description: description || undefined,
      status: isTemplate ? "Template" : "Active",
      is_template: isTemplate,
    });

    // Reset form
    setTitle("");
    setContractType("Employment");
    setCategory("Employment");
    setPartyName("");
    setSelectedEmployee("");
    setStartDate("");
    setDescription("");
    setIsTemplate(false);
    setShowNewContract(false);
  };

  const handleDelete = async (id: string) => {
    await deleteContract.mutateAsync(id);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">Failed to load contracts</p>
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
          title="Contracts & Handbooks"
          description="Employment contracts, job descriptions, and procedures"
        />

        <Sheet open={showNewContract} onOpenChange={setShowNewContract}>
          <SheetTrigger asChild>
            <Button className="gap-2 h-11 touch-manipulation">
              <Plus className="h-4 w-4" />
              Add Contract
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
            <div className="flex flex-col h-full bg-background">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle>Add Contract</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    placeholder="Contract or template title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isTemplate"
                    checked={isTemplate}
                    onChange={(e) => setIsTemplate(e.target.checked)}
                    className="h-5 w-5 rounded border-border"
                  />
                  <Label htmlFor="isTemplate">Save as template</Label>
                </div>

                <div className="space-y-2">
                  <Label>Contract Type</Label>
                  <Select value={contractType} onValueChange={(v) => setContractType(v as ContractType)}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {contractTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={(v) => setCategory(v as ContractCategory)}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {!isTemplate && (
                  <>
                    <div className="space-y-2">
                      <Label>Employee (Optional)</Label>
                      <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue placeholder="Link to employee..." />
                        </SelectTrigger>
                        <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                          <SelectItem value="">None</SelectItem>
                          {employees?.map(emp => (
                            <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Party Name</Label>
                      <Input
                        placeholder="Employee/client name..."
                        value={partyName}
                        onChange={(e) => setPartyName(e.target.value)}
                        className="h-11 touch-manipulation"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="h-11 touch-manipulation"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="Brief description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-border bg-background">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewContract(false)}
                    className="flex-1 h-11 touch-manipulation"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateContract}
                    disabled={!title || createContract.isPending}
                    className="flex-1 h-11 touch-manipulation"
                  >
                    {createContract.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      isTemplate ? "Save Template" : "Add Contract"
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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contracts and templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-11 touch-manipulation"
        />
      </div>

      {/* Quick Stats */}
      <QuickStats
        stats={[
          {
            icon: FileCheck,
            value: isLoading ? "-" : (stats?.templates || 0),
            label: "Templates",
            color: "yellow",
          },
          {
            icon: CheckCircle2,
            value: isLoading ? "-" : (stats?.active || 0),
            label: "Active Contracts",
            color: "green",
          },
          ...(stats?.expiringSoon && stats.expiringSoon > 0
            ? [{
                icon: AlertTriangle,
                value: stats.expiringSoon,
                label: "Expiring Soon",
                color: "orange" as const,
                pulse: true,
              }]
            : []),
        ]}
      />

      {/* Active Contracts */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          Active Contracts
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-elec-gray border-border">
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredContracts.length === 0 ? (
          <Card className="bg-elec-gray border-border">
            <CardContent className="p-6 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No active contracts yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {filteredContracts.map((contract) => (
              <Card key={contract.id} className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <UserPlus className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {contract.party_name || contract.employee?.name || contract.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{contract.contract_type}</span>
                          {contract.start_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Since {new Date(contract.start_date).toLocaleDateString('en-GB')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[contract.status] || ""}>
                        {contract.status}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(contract.id)}
                        disabled={deleteContract.isPending}
                        className="h-8 text-xs text-destructive hover:text-destructive touch-manipulation"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Templates by Category */}
      {employmentTemplates.length > 0 && (
        <TemplateSection
          title="Employment Contracts"
          templates={employmentTemplates}
          onDelete={handleDelete}
          isDeleting={deleteContract.isPending}
          colorClass="bg-elec-yellow"
        />
      )}

      {jobDescTemplates.length > 0 && (
        <TemplateSection
          title="Job Descriptions"
          templates={jobDescTemplates}
          onDelete={handleDelete}
          isDeleting={deleteContract.isPending}
          colorClass="bg-info"
        />
      )}

      {performanceTemplates.length > 0 && (
        <TemplateSection
          title="Performance Management"
          templates={performanceTemplates}
          onDelete={handleDelete}
          isDeleting={deleteContract.isPending}
          colorClass="bg-warning"
        />
      )}

      {procedureTemplates.length > 0 && (
        <TemplateSection
          title="Procedures"
          templates={procedureTemplates}
          onDelete={handleDelete}
          isDeleting={deleteContract.isPending}
          colorClass="bg-destructive"
        />
      )}

      {/* Empty state for templates */}
      {!isLoading && filteredTemplates.length === 0 && (
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-8 text-center">
            <FileCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Templates</h3>
            <p className="text-muted-foreground mb-4">Create templates for common contracts and documents.</p>
            <Button onClick={() => { setIsTemplate(true); setShowNewContract(true); }} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Template
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Helper component for template sections
function TemplateSection({
  title,
  templates,
  onDelete,
  isDeleting,
  colorClass
}: {
  title: string;
  templates: Contract[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
  colorClass: string;
}) {
  return (
    <div>
      <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
        <span className={`w-1 h-5 ${colorClass} rounded-full`}></span>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {templates.map((template) => {
          const Icon = getCategoryIcon(template.category);
          const iconColor = getCategoryColor(template.category);
          return (
            <Card key={template.id} className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon className={`h-5 w-5 ${iconColor} mt-0.5`} />
                    <div>
                      <p className="font-medium text-foreground text-sm">{template.title}</p>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(template.id)}
                    disabled={isDeleting}
                    className="h-8 text-xs text-destructive hover:text-destructive touch-manipulation"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
