import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  FileCheck,
  ClipboardCheck,
  KeyRound,
  Users,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Download
} from "lucide-react";

const complianceDocuments = [
  { id: "1", name: "RAMS Acknowledgement Record", category: "Safety", signed: 12, required: 12, status: "Complete" },
  { id: "2", name: "Briefing Sign-off Sheet", category: "Safety", signed: 5, required: 6, status: "Pending" },
  { id: "3", name: "Permit to Work - Hot Works", category: "Permits", signed: 1, required: 1, status: "Complete" },
  { id: "4", name: "Site Induction Record", category: "Induction", signed: 6, required: 6, status: "Complete" },
  { id: "5", name: "Method Statement Acceptance", category: "Safety", signed: 8, required: 10, status: "Pending" },
];

const complianceTemplates = [
  { id: "1", name: "RAMS Acknowledgement", description: "Worker sign-off for RAMS", icon: FileCheck },
  { id: "2", name: "Briefing Sign-off", description: "Attendance record sheet", icon: ClipboardCheck },
  { id: "3", name: "Permit to Work", description: "Work permit template", icon: KeyRound },
  { id: "4", name: "Site Induction Record", description: "New site induction sign-off", icon: Users },
  { id: "5", name: "Method Statement Acceptance", description: "MS acknowledgement form", icon: FileText },
  { id: "6", name: "Client Compliance Checklist", description: "Client-specific requirements", icon: Shield },
];

export function ComplianceSection() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const completeDocuments = complianceDocuments.filter(d => d.status === "Complete").length;
  const pendingDocuments = complianceDocuments.filter(d => d.status === "Pending").length;
  const totalSigned = complianceDocuments.reduce((sum, d) => sum + d.signed, 0);
  const totalRequired = complianceDocuments.reduce((sum, d) => sum + d.required, 0);
  const complianceScore = Math.round((totalSigned / totalRequired) * 100);

  const filteredDocuments = complianceDocuments.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Compliance Evidence"
        description="Sign-offs, permits, and compliance documentation"
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search compliance documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Quick Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">{complianceScore}%</p>
              <p className="text-xs text-muted-foreground">Compliance</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{totalSigned}</p>
              <p className="text-xs text-muted-foreground">Signed</p>
            </div>
          </CardContent>
        </Card>
        {pendingDocuments > 0 && (
          <Card className="bg-warning/10 border-warning/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">{pendingDocuments}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Templates & Forms
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {complianceTemplates.map((template) => (
            <FeatureTile
              key={template.id}
              icon={template.icon}
              title={template.name}
              description={template.description}
              onClick={() => {}}
              compact
            />
          ))}
        </div>
      </div>

      {/* Active Documents */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-success rounded-full"></span>
            Active Documents
          </h2>
          <button className="text-xs text-elec-yellow hover:underline flex items-center gap-1">
            <Download className="h-3 w-3" />
            Export Pack
          </button>
        </div>
        <div className="space-y-2">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className={`hover:bg-muted/50 transition-colors cursor-pointer ${
              doc.status === "Pending" ? "border-l-4 border-l-warning" : ""
            }`}>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      doc.status === "Complete" 
                        ? "bg-success/10" 
                        : "bg-warning/10"
                    }`}>
                      <FileCheck className={`h-4 w-4 ${
                        doc.status === "Complete" 
                          ? "text-success" 
                          : "text-warning"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm md:text-base">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.category}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {doc.signed}/{doc.required} signatures collected
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ${
                    doc.status === "Complete" 
                      ? "bg-success/10 text-success" 
                      : "bg-warning/10 text-warning"
                  }`}>
                    {doc.status === "Complete" ? "Complete" : `${doc.required - doc.signed} pending`}
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      doc.status === "Complete" 
                        ? "bg-success" 
                        : "bg-warning"
                    }`}
                    style={{ width: `${(doc.signed / doc.required) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-info rounded-full"></span>
          Evidence Packs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <Download className="h-5 w-5 text-info" />
              <div>
                <p className="font-medium text-foreground text-sm">Export All Evidence</p>
                <p className="text-xs text-muted-foreground">Download complete compliance pack</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <FileText className="h-5 w-5 text-info" />
              <div>
                <p className="font-medium text-foreground text-sm">Generate Audit Report</p>
                <p className="text-xs text-muted-foreground">Create compliance summary</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
