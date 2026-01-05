import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  UserPlus,
  Briefcase,
  GraduationCap,
  ClipboardList,
  UserCheck,
  AlertCircle,
  Search,
  CheckCircle2,
  Clock,
  FileCheck
} from "lucide-react";

const contracts = [
  { id: "1", name: "Employment Contract (Full-time)", category: "Employment", description: "Standard full-time employment agreement", status: "Template" },
  { id: "2", name: "Employment Contract (CIS)", category: "Employment", description: "Self-employed / CIS subcontractor agreement", status: "Template" },
  { id: "3", name: "Apprentice Agreement", category: "Employment", description: "Apprenticeship employment contract", status: "Template" },
  { id: "4", name: "Offer Letter", category: "Employment", description: "Job offer letter template", status: "Template" },
  { id: "5", name: "Job Description - Electrician", category: "Job Descriptions", description: "Standard electrician role description", status: "Template" },
  { id: "6", name: "Job Description - Supervisor", category: "Job Descriptions", description: "Site supervisor role description", status: "Template" },
  { id: "7", name: "Job Description - Apprentice", category: "Job Descriptions", description: "Apprentice role description", status: "Template" },
  { id: "8", name: "Probation Review Template", category: "Performance", description: "Probation period review form", status: "Template" },
  { id: "9", name: "Performance Review / Appraisal", category: "Performance", description: "Annual performance appraisal form", status: "Template" },
  { id: "10", name: "Disciplinary Procedure", category: "Procedures", description: "Formal disciplinary process guide", status: "Template" },
  { id: "11", name: "Grievance Procedure", category: "Procedures", description: "Employee grievance handling process", status: "Template" },
  { id: "12", name: "Termination / Exit Checklist", category: "Procedures", description: "Employee exit process checklist", status: "Template" },
];

const activeContracts = [
  { id: "AC1", employeeName: "James Wilson", type: "Full-time", startDate: "2021-03-15", status: "Active" },
  { id: "AC2", employeeName: "Sarah Mitchell", type: "Full-time", startDate: "2022-06-20", status: "Active" },
  { id: "AC3", employeeName: "David Brown", type: "Apprentice", startDate: "2023-09-01", status: "Active" },
];

export function ContractsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const templateCount = contracts.length;
  const activeCount = activeContracts.length;

  const filteredContracts = contracts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const employmentContracts = filteredContracts.filter(c => c.category === "Employment");
  const jobDescriptions = filteredContracts.filter(c => c.category === "Job Descriptions");
  const performanceContracts = filteredContracts.filter(c => c.category === "Performance");
  const procedureContracts = filteredContracts.filter(c => c.category === "Procedures");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Employment": return FileText;
      case "Job Descriptions": return Briefcase;
      case "Performance": return UserCheck;
      case "Procedures": return ClipboardList;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Contracts & Handbooks"
        description="Employment contracts, job descriptions, and procedures"
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contracts and documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Quick Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{templateCount}</p>
              <p className="text-xs text-muted-foreground">Templates</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">{activeCount}</p>
              <p className="text-xs text-muted-foreground">Active Contracts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Contracts */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          Active Contracts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {activeContracts.map((contract) => (
            <Card key={contract.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserPlus className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{contract.employeeName}</p>
                      <p className="text-xs text-muted-foreground">{contract.type} • Since {contract.startDate}</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    {contract.status}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Employment Templates */}
      {employmentContracts.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
            Employment Contracts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {employmentContracts.map((contract) => {
              const Icon = getCategoryIcon(contract.category);
              return (
                <Card key={contract.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-elec-yellow mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{contract.name}</p>
                        <p className="text-xs text-muted-foreground">{contract.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Job Descriptions */}
      {jobDescriptions.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-info rounded-full"></span>
            Job Descriptions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {jobDescriptions.map((contract) => {
              const Icon = getCategoryIcon(contract.category);
              return (
                <Card key={contract.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-info mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{contract.name}</p>
                        <p className="text-xs text-muted-foreground">{contract.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Performance */}
      {performanceContracts.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-warning rounded-full"></span>
            Performance Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {performanceContracts.map((contract) => {
              const Icon = getCategoryIcon(contract.category);
              return (
                <Card key={contract.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-warning mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{contract.name}</p>
                        <p className="text-xs text-muted-foreground">{contract.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Procedures */}
      {procedureContracts.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-destructive rounded-full"></span>
            Procedures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {procedureContracts.map((contract) => {
              const Icon = getCategoryIcon(contract.category);
              return (
                <Card key={contract.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{contract.name}</p>
                        <p className="text-xs text-muted-foreground">{contract.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
