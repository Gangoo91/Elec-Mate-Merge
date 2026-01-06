import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { Input } from "@/components/ui/input";
import { QuickStats, QuickStat } from "@/components/employer/QuickStats";
import {
  BookOpen,
  Shield,
  Zap,
  HardHat,
  User,
  Car,
  Users,
  FileText,
  Search,
  CheckCircle2,
  Clock
} from "lucide-react";

const policies = [
  { id: "1", name: "Health & Safety Policy", category: "Safety", lastUpdated: "2024-02-01", status: "Current" },
  { id: "2", name: "Electrical Safety Policy", category: "Safety", lastUpdated: "2024-01-15", status: "Current" },
  { id: "3", name: "Safe Isolation Policy", category: "Safety", lastUpdated: "2024-01-15", status: "Current" },
  { id: "4", name: "PPE Policy", category: "Safety", lastUpdated: "2024-01-10", status: "Current" },
  { id: "5", name: "Lone Working Policy", category: "Safety", lastUpdated: "2023-12-01", status: "Review Due" },
  { id: "6", name: "Working at Height Policy", category: "Safety", lastUpdated: "2024-01-20", status: "Current" },
  { id: "7", name: "Manual Handling Policy", category: "Safety", lastUpdated: "2024-01-05", status: "Current" },
  { id: "8", name: "Alcohol & Drugs Policy", category: "HR", lastUpdated: "2023-11-15", status: "Review Due" },
  { id: "9", name: "Equality & Diversity Policy", category: "HR", lastUpdated: "2024-02-01", status: "Current" },
  { id: "10", name: "Anti-Harassment Policy", category: "HR", lastUpdated: "2024-02-01", status: "Current" },
  { id: "11", name: "Data Protection / GDPR Policy", category: "Legal", lastUpdated: "2024-01-01", status: "Current" },
  { id: "12", name: "Social Media Policy", category: "HR", lastUpdated: "2023-10-01", status: "Review Due" },
  { id: "13", name: "Vehicle Use Policy", category: "Operations", lastUpdated: "2024-01-15", status: "Current" },
];

export function PoliciesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const currentPolicies = policies.filter(p => p.status === "Current").length;
  const reviewDue = policies.filter(p => p.status === "Review Due").length;
  const totalPolicies = policies.length;

  const filteredPolicies = policies.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const safetyPolicies = filteredPolicies.filter(p => p.category === "Safety");
  const hrPolicies = filteredPolicies.filter(p => p.category === "HR");
  const otherPolicies = filteredPolicies.filter(p => !["Safety", "HR"].includes(p.category));

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Policies & Procedures"
        description="Company policies, pre-written and editable"
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search policies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Quick Stats */}
      <QuickStats
        stats={[
          {
            icon: CheckCircle2,
            value: currentPolicies,
            label: "Current",
            color: "green",
          },
          ...(reviewDue > 0 ? [{
            icon: Clock,
            value: reviewDue,
            label: "Review Due",
            color: "yellow" as const,
            pulse: true,
          }] : []),
          {
            icon: BookOpen,
            value: totalPolicies,
            label: "Total",
            color: "blue",
          },
        ]}
      />

      {/* Safety Policies */}
      {safetyPolicies.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-success rounded-full"></span>
            Safety Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {safetyPolicies.map((policy) => (
              <Card key={policy.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{policy.name}</p>
                        <p className="text-xs text-muted-foreground">Updated {policy.lastUpdated}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      policy.status === "Current" 
                        ? "bg-success/10 text-success" 
                        : "bg-warning/10 text-warning"
                    }`}>
                      {policy.status}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* HR Policies */}
      {hrPolicies.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
            HR Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {hrPolicies.map((policy) => (
              <Card key={policy.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-elec-yellow" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{policy.name}</p>
                        <p className="text-xs text-muted-foreground">Updated {policy.lastUpdated}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      policy.status === "Current" 
                        ? "bg-success/10 text-success" 
                        : "bg-warning/10 text-warning"
                    }`}>
                      {policy.status}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Other Policies */}
      {otherPolicies.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-info rounded-full"></span>
            Other Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {otherPolicies.map((policy) => (
              <Card key={policy.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-info" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{policy.name}</p>
                        <p className="text-xs text-muted-foreground">Updated {policy.lastUpdated}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      policy.status === "Current" 
                        ? "bg-success/10 text-success" 
                        : "bg-warning/10 text-warning"
                    }`}>
                      {policy.status}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
