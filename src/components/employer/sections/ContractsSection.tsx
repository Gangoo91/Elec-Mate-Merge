import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { QuickStats } from "@/components/employer/QuickStats";
import { ContractViewer } from "@/components/employer/ContractViewer";
import {
  useContracts,
  useEmploymentContractTemplates,
  useAdoptedContractTemplateIds,
  useContractStats,
  useDeleteContract,
  type Contract,
  type EmploymentContractTemplate,
} from "@/hooks/useContracts";
import {
  FileText,
  Briefcase,
  Users,
  FileCheck,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Calendar,
  AlertTriangle,
  RefreshCw,
  Trash2,
} from "lucide-react";

export function ContractsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<EmploymentContractTemplate | null>(null);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  // Fetch data
  const { data: systemTemplates = [], isLoading: templatesLoading } = useEmploymentContractTemplates();
  const { data: userContracts = [], isLoading: contractsLoading, error, refetch } = useContracts();
  const { data: adoptedTemplateIds = [] } = useAdoptedContractTemplateIds();
  const { data: stats } = useContractStats();
  const deleteContract = useDeleteContract();

  const isLoading = templatesLoading || contractsLoading;

  // Filter templates and user contracts
  const filteredTemplates = useMemo(() => {
    return systemTemplates.filter(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [systemTemplates, searchQuery]);

  const filteredUserContracts = useMemo(() => {
    return userContracts.filter(c =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.party_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [userContracts, searchQuery]);

  // Group templates by category
  const employmentTemplates = filteredTemplates.filter(t => t.category === "Employment");
  const subcontractorTemplates = filteredTemplates.filter(t => t.category === "Subcontractor");
  const hrLettersTemplates = filteredTemplates.filter(t => t.category === "HR Letters");

  // Stats
  const totalTemplates = systemTemplates.length;
  const adoptedCount = userContracts.length;
  const expiringSoon = stats?.expiringSoon || 0;

  const handleViewTemplate = (template: EmploymentContractTemplate) => {
    setSelectedTemplate(template);
    setSelectedContract(null);
    setViewerOpen(true);
  };

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setSelectedTemplate(null);
    setViewerOpen(true);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this contract?")) {
      await deleteContract.mutateAsync(id);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Employment":
        return Briefcase;
      case "Subcontractor":
        return Users;
      case "HR Letters":
        return FileCheck;
      default:
        return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Employment":
        return "text-elec-yellow";
      case "Subcontractor":
        return "text-info";
      case "HR Letters":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  const getCategoryBgColor = (category: string) => {
    switch (category) {
      case "Employment":
        return "bg-elec-yellow/10 text-elec-yellow";
      case "Subcontractor":
        return "bg-info/10 text-info";
      case "HR Letters":
        return "bg-success/10 text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
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

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <SectionHeader
          title="Contracts & HR Documents"
          description="Employment contracts, subcontractor agreements, and HR letters"
        />
        <Skeleton className="h-11 w-full" />
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <Skeleton className="h-16 w-24 shrink-0" />
          <Skeleton className="h-16 w-24 shrink-0" />
          <Skeleton className="h-16 w-24 shrink-0" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Contracts & HR Documents"
        description="Employment contracts, subcontractor agreements, and HR letters"
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contracts and templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-11"
        />
      </div>

      {/* Quick Stats */}
      <QuickStats
        stats={[
          {
            icon: FileCheck,
            value: totalTemplates,
            label: "Templates",
            color: "blue",
          },
          {
            icon: CheckCircle2,
            value: adoptedCount,
            label: "My Contracts",
            color: "green",
          },
          ...(expiringSoon > 0 ? [{
            icon: Clock,
            value: expiringSoon,
            label: "Expiring Soon",
            color: "yellow" as const,
            pulse: true,
          }] : []),
        ]}
      />

      {/* My Contracts (User's adopted contracts) */}
      {filteredUserContracts.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
            My Contracts
            <Badge variant="secondary" className="ml-2">
              {filteredUserContracts.length}
            </Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {filteredUserContracts.map((contract) => {
              const CategoryIcon = getCategoryIcon(contract.contract_type || "Employment");
              return (
                <Card
                  key={contract.id}
                  className="hover:bg-muted/50 transition-colors cursor-pointer border-elec-yellow/20"
                  onClick={() => handleViewContract(contract)}
                >
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <CategoryIcon
                          className={`h-5 w-5 ${getCategoryColor(contract.contract_type || "Employment")}`}
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {contract.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {contract.party_name && (
                              <span>{contract.party_name}</span>
                            )}
                            {contract.start_date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(contract.start_date).toLocaleDateString("en-GB")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={
                            contract.status === "Active"
                              ? "bg-success/10 text-success"
                              : contract.status === "Draft"
                              ? "bg-muted"
                              : "bg-warning/10 text-warning"
                          }
                        >
                          {contract.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => handleDelete(contract.id, e)}
                          disabled={deleteContract.isPending}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive touch-manipulation"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Info Banner for New Users */}
      {userContracts.length === 0 && (
        <Card className="border-info/20 bg-info/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-info/10 h-fit">
                <Sparkles className="h-5 w-5 text-info" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  Pre-Written Contracts & HR Documents
                </h3>
                <p className="text-sm text-muted-foreground">
                  Browse the templates below and click <strong>Use This Template</strong> to
                  create your own customised contracts. Templates include employment contracts,
                  subcontractor agreements, and HR letters.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Employment Contracts */}
      {employmentTemplates.length > 0 && (
        <TemplateCategory
          title="Employment Contracts"
          templates={employmentTemplates}
          adoptedIds={adoptedTemplateIds}
          onView={handleViewTemplate}
          colorClass="bg-elec-yellow"
          getCategoryIcon={getCategoryIcon}
          getCategoryColor={getCategoryColor}
          getCategoryBgColor={getCategoryBgColor}
        />
      )}

      {/* Subcontractor Agreements */}
      {subcontractorTemplates.length > 0 && (
        <TemplateCategory
          title="Subcontractor Agreements"
          templates={subcontractorTemplates}
          adoptedIds={adoptedTemplateIds}
          onView={handleViewTemplate}
          colorClass="bg-info"
          getCategoryIcon={getCategoryIcon}
          getCategoryColor={getCategoryColor}
          getCategoryBgColor={getCategoryBgColor}
        />
      )}

      {/* HR Letters & Documents */}
      {hrLettersTemplates.length > 0 && (
        <TemplateCategory
          title="HR Letters & Documents"
          templates={hrLettersTemplates}
          adoptedIds={adoptedTemplateIds}
          onView={handleViewTemplate}
          colorClass="bg-success"
          getCategoryIcon={getCategoryIcon}
          getCategoryColor={getCategoryColor}
          getCategoryBgColor={getCategoryBgColor}
        />
      )}

      {/* Empty State */}
      {filteredTemplates.length === 0 && filteredUserContracts.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">
              No contracts found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search query
            </p>
          </CardContent>
        </Card>
      )}

      {/* Contract Viewer Modal */}
      <ContractViewer
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        template={selectedTemplate}
        userContract={selectedContract}
        isAdopted={
          selectedTemplate
            ? adoptedTemplateIds.includes(selectedTemplate.id)
            : false
        }
      />
    </div>
  );
}

// Helper component for template categories
function TemplateCategory({
  title,
  templates,
  adoptedIds,
  onView,
  colorClass,
  getCategoryIcon,
  getCategoryColor,
  getCategoryBgColor,
}: {
  title: string;
  templates: EmploymentContractTemplate[];
  adoptedIds: string[];
  onView: (template: EmploymentContractTemplate) => void;
  colorClass: string;
  getCategoryIcon: (category: string) => React.ComponentType<{ className?: string }>;
  getCategoryColor: (category: string) => string;
  getCategoryBgColor: (category: string) => string;
}) {
  return (
    <div>
      <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
        <span className={`w-1 h-5 ${colorClass} rounded-full`}></span>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {templates.map((template) => {
          const isAdopted = adoptedIds.includes(template.id);
          const CategoryIcon = getCategoryIcon(template.category);
          return (
            <Card
              key={template.id}
              className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                isAdopted ? "border-success/20 bg-success/5" : ""
              }`}
              onClick={() => onView(template)}
            >
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <CategoryIcon className={`h-5 w-5 ${getCategoryColor(template.category)}`} />
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {template.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {template.summary || `v${template.version}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isAdopted ? (
                      <Badge
                        variant="secondary"
                        className="bg-success/10 text-success"
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Used
                      </Badge>
                    ) : (
                      <Badge variant="outline">View</Badge>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
