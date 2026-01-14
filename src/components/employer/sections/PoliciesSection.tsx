import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuickStats } from "@/components/employer/QuickStats";
import { Skeleton } from "@/components/ui/skeleton";
import { PolicyViewer } from "@/components/employer/PolicyViewer";
import {
  usePolicyTemplates,
  useUserPolicies,
  useAdoptedTemplateIds,
  type PolicyTemplate,
  type UserPolicy,
} from "@/hooks/usePolicies";
import {
  BookOpen,
  Shield,
  Users,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Scale,
} from "lucide-react";

export function PoliciesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<PolicyTemplate | null>(null);
  const [selectedUserPolicy, setSelectedUserPolicy] = useState<UserPolicy | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  // Fetch data
  const { data: templates = [], isLoading: templatesLoading } = usePolicyTemplates();
  const { data: userPolicies = [], isLoading: userPoliciesLoading } = useUserPolicies();
  const { data: adoptedTemplateIds = [] } = useAdoptedTemplateIds();

  const isLoading = templatesLoading || userPoliciesLoading;

  // Filter templates and user policies
  const filteredTemplates = useMemo(() => {
    return templates.filter(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [templates, searchQuery]);

  const filteredUserPolicies = useMemo(() => {
    return userPolicies.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [userPolicies, searchQuery]);

  // Group templates by category
  const safetyTemplates = filteredTemplates.filter(t => t.category === "Safety");
  const hrTemplates = filteredTemplates.filter(t => t.category === "HR");
  const legalTemplates = filteredTemplates.filter(t => t.category === "Legal");

  // Stats
  const totalTemplates = templates.length;
  const adoptedCount = userPolicies.length;
  const reviewDue = userPolicies.filter(p =>
    p.status === "Review Due" ||
    (p.review_date && new Date(p.review_date) <= new Date())
  ).length;

  const handleViewTemplate = (template: PolicyTemplate) => {
    setSelectedTemplate(template);
    setSelectedUserPolicy(null);
    setViewerOpen(true);
  };

  const handleViewUserPolicy = (policy: UserPolicy) => {
    setSelectedUserPolicy(policy);
    setSelectedTemplate(null);
    setViewerOpen(true);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Safety":
        return Shield;
      case "HR":
        return Users;
      case "Legal":
        return Scale;
      default:
        return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Safety":
        return "text-success";
      case "HR":
        return "text-elec-yellow";
      case "Legal":
        return "text-info";
      default:
        return "text-muted-foreground";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <SectionHeader
          title="Policies & Procedures"
          description="Company policies, pre-written and editable"
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
          className="pl-9 h-11"
        />
      </div>

      {/* Quick Stats */}
      <QuickStats
        stats={[
          {
            icon: BookOpen,
            value: totalTemplates,
            label: "Available",
            color: "blue",
          },
          {
            icon: CheckCircle2,
            value: adoptedCount,
            label: "Adopted",
            color: "green",
          },
          ...(reviewDue > 0 ? [{
            icon: Clock,
            value: reviewDue,
            label: "Review Due",
            color: "yellow" as const,
            pulse: true,
          }] : []),
        ]}
      />

      {/* My Policies (User's adopted policies) */}
      {filteredUserPolicies.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
            My Policies
            <Badge variant="secondary" className="ml-2">
              {filteredUserPolicies.length}
            </Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {filteredUserPolicies.map((policy) => {
              const CategoryIcon = getCategoryIcon(
                policy.template?.category || "Other"
              );
              return (
                <Card
                  key={policy.id}
                  className="hover:bg-muted/50 transition-colors cursor-pointer border-elec-yellow/20"
                  onClick={() => handleViewUserPolicy(policy)}
                >
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <CategoryIcon
                          className={`h-5 w-5 ${getCategoryColor(
                            policy.template?.category || "Other"
                          )}`}
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {policy.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {policy.company_name || "No company set"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={
                            policy.status === "Active"
                              ? "bg-success/10 text-success"
                              : policy.status === "Review Due"
                              ? "bg-warning/10 text-warning"
                              : "bg-muted"
                          }
                        >
                          {policy.status}
                        </Badge>
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
      {userPolicies.length === 0 && (
        <Card className="border-info/20 bg-info/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-info/10 h-fit">
                <Sparkles className="h-5 w-5 text-info" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  Pre-Written Policies
                </h3>
                <p className="text-sm text-muted-foreground">
                  Browse the templates below and click <strong>Adopt</strong> to
                  add them to your company policies. You can customise them with
                  your company name.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Safety Policy Templates */}
      {safetyTemplates.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-success rounded-full"></span>
            Safety Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {safetyTemplates.map((template) => {
              const isAdopted = adoptedTemplateIds.includes(template.id);
              return (
                <Card
                  key={template.id}
                  className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                    isAdopted ? "border-success/20 bg-success/5" : ""
                  }`}
                  onClick={() => handleViewTemplate(template)}
                >
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <Shield className="h-5 w-5 text-success" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {template.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            v{template.version}
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
                            Adopted
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
      )}

      {/* HR Policy Templates */}
      {hrTemplates.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
            HR Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {hrTemplates.map((template) => {
              const isAdopted = adoptedTemplateIds.includes(template.id);
              return (
                <Card
                  key={template.id}
                  className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                    isAdopted ? "border-success/20 bg-success/5" : ""
                  }`}
                  onClick={() => handleViewTemplate(template)}
                >
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <Users className="h-5 w-5 text-elec-yellow" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {template.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            v{template.version}
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
                            Adopted
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
      )}

      {/* Legal Policy Templates */}
      {legalTemplates.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-info rounded-full"></span>
            Legal & Compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {legalTemplates.map((template) => {
              const isAdopted = adoptedTemplateIds.includes(template.id);
              return (
                <Card
                  key={template.id}
                  className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                    isAdopted ? "border-success/20 bg-success/5" : ""
                  }`}
                  onClick={() => handleViewTemplate(template)}
                >
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <Scale className="h-5 w-5 text-info" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {template.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            v{template.version}
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
                            Adopted
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
      )}

      {/* Empty State */}
      {filteredTemplates.length === 0 && filteredUserPolicies.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">
              No policies found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search query
            </p>
          </CardContent>
        </Card>
      )}

      {/* Policy Viewer Modal */}
      <PolicyViewer
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        template={selectedTemplate}
        userPolicy={selectedUserPolicy}
        isAdopted={
          selectedTemplate
            ? adoptedTemplateIds.includes(selectedTemplate.id)
            : false
        }
      />
    </div>
  );
}
