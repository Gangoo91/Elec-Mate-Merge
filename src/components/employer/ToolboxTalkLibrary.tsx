import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Search,
  Zap,
  ArrowUp,
  Shield,
  Wrench,
  Heart,
  Home,
  Building2,
  Calendar,
  Clock,
  AlertTriangle,
  ChevronRight,
  FileText,
  Play,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useToolboxTalkTemplates,
  useToolboxTalkCategories,
  getCategoryLabel,
  getCategoryColour,
  getRiskLevelColour,
  type ToolboxTalkTemplate,
  type ToolboxTalkCategory,
} from "@/hooks/useToolboxTalkTemplates";

interface ToolboxTalkLibraryProps {
  onSelectTemplate?: (template: ToolboxTalkTemplate) => void;
}

const CATEGORY_ICONS: Record<ToolboxTalkCategory, typeof Zap> = {
  electrical_safety: Zap,
  working_at_height: ArrowUp,
  general_safety: Shield,
  tools_equipment: Wrench,
  health_environment: Heart,
  domestic: Home,
  commercial: Building2,
  seasonal: Calendar,
};

export function ToolboxTalkLibrary({ onSelectTemplate }: ToolboxTalkLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ToolboxTalkCategory | "all">("all");
  const [previewTemplate, setPreviewTemplate] = useState<ToolboxTalkTemplate | null>(null);

  const { data: templates = [], isLoading: templatesLoading } = useToolboxTalkTemplates();
  const { data: categories = [], isLoading: categoriesLoading } = useToolboxTalkCategories();

  const isLoading = templatesLoading || categoriesLoading;

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      // Category filter
      if (selectedCategory !== "all" && template.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const search = searchQuery.toLowerCase();
        const matchesName = template.name.toLowerCase().includes(search);
        const matchesSummary = template.summary?.toLowerCase().includes(search);
        if (!matchesName && !matchesSummary) return false;
      }

      return true;
    });
  }, [templates, selectedCategory, searchQuery]);

  // Group templates by category
  const groupedTemplates = useMemo(() => {
    if (selectedCategory !== "all") {
      return { [selectedCategory]: filteredTemplates };
    }

    const groups: Partial<Record<ToolboxTalkCategory, ToolboxTalkTemplate[]>> = {};
    filteredTemplates.forEach((template) => {
      if (!groups[template.category]) {
        groups[template.category] = [];
      }
      groups[template.category]!.push(template);
    });
    return groups;
  }, [filteredTemplates, selectedCategory]);

  const handleUseTemplate = (template: ToolboxTalkTemplate) => {
    setPreviewTemplate(null);
    onSelectTemplate?.(template);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-11 w-full" />
        <div className="flex gap-2 overflow-x-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-32 shrink-0" />
          ))}
        </div>
        <div className="grid gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        {!searchQuery && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        )}
        <Input
          placeholder="Search toolbox talks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn("h-11", !searchQuery && "pl-9")}
        />
      </div>

      {/* Category Tabs */}
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "shrink-0",
              selectedCategory === "all" && "bg-elec-yellow text-black hover:bg-elec-yellow/90"
            )}
          >
            All ({templates.length})
          </Button>
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.category];
            return (
              <Button
                key={cat.category}
                variant={selectedCategory === cat.category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.category)}
                className={cn(
                  "shrink-0 gap-1.5",
                  selectedCategory === cat.category && "bg-elec-yellow text-black hover:bg-elec-yellow/90"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label} ({cat.count})
              </Button>
            );
          })}
        </div>
      </ScrollArea>

      {/* Templates List */}
      {filteredTemplates.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">
              No templates found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or category filter
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => {
            const Icon = CATEGORY_ICONS[category as ToolboxTalkCategory];
            return (
              <div key={category}>
                {selectedCategory === "all" && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className={cn("p-1.5 rounded-lg", `bg-${category === "electrical_safety" ? "yellow" : "blue"}-500/10`)}>
                      <Icon className={cn("h-4 w-4", getCategoryColour(category as ToolboxTalkCategory))} />
                    </div>
                    <h3 className="font-medium text-foreground">
                      {getCategoryLabel(category as ToolboxTalkCategory)}
                    </h3>
                    <Badge variant="secondary">{categoryTemplates?.length}</Badge>
                  </div>
                )}
                <div className="grid gap-2">
                  {categoryTemplates?.map((template) => (
                    <Card
                      key={template.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setPreviewTemplate(template)}
                    >
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm text-foreground truncate">
                              {template.name}
                            </p>
                            {template.summary && (
                              <p className="text-xs text-muted-foreground truncate mt-0.5">
                                {template.summary}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                variant="outline"
                                className={cn("text-xs", getRiskLevelColour(template.risk_level))}
                              >
                                {template.risk_level === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                                {template.risk_level.charAt(0).toUpperCase() + template.risk_level.slice(1)} Risk
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {template.duration_minutes} min
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Template Preview Sheet */}
      <Sheet open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0">
          {previewTemplate && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <SheetHeader className="p-4 pb-3 border-b border-border shrink-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      previewTemplate.risk_level === "high" ? "bg-red-500/10" :
                      previewTemplate.risk_level === "medium" ? "bg-amber-500/10" :
                      "bg-green-500/10"
                    )}>
                      {(() => {
                        const Icon = CATEGORY_ICONS[previewTemplate.category];
                        return <Icon className={cn("h-5 w-5", getCategoryColour(previewTemplate.category))} />;
                      })()}
                    </div>
                    <div>
                      <SheetTitle className="text-left">{previewTemplate.name}</SheetTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {getCategoryLabel(previewTemplate.category)}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={cn("text-xs", getRiskLevelColour(previewTemplate.risk_level))}
                        >
                          {previewTemplate.risk_level.charAt(0).toUpperCase() + previewTemplate.risk_level.slice(1)} Risk
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {previewTemplate.duration_minutes} min
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPreviewTemplate(null)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </SheetHeader>

              {/* Content */}
              <ScrollArea className="flex-1 p-4">
                <div
                  className="prose prose-sm prose-invert max-w-none [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-3 [&_h3]:mb-2 [&_p]:mb-2 [&_ul]:mb-3 [&_li]:mb-1 [&_table]:w-full [&_td]:py-1 [&_td]:px-2 [&_th]:py-1 [&_th]:px-2 [&_th]:text-left [&_th]:font-medium [&_tr]:border-b [&_tr]:border-border/50"
                  dangerouslySetInnerHTML={{ __html: previewTemplate.content }}
                />

                {/* Discussion Points */}
                {previewTemplate.discussion_points && previewTemplate.discussion_points.length > 0 && (
                  <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-400" />
                      Discussion Points
                    </h4>
                    <ul className="space-y-1.5">
                      {previewTemplate.discussion_points.map((point, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-blue-400 shrink-0">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Hazards */}
                {previewTemplate.key_hazards && previewTemplate.key_hazards.length > 0 && (
                  <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      Key Hazards
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {previewTemplate.key_hazards.map((hazard, i) => (
                        <Badge key={i} variant="outline" className="border-red-500/30 text-red-300">
                          {hazard}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Legal References */}
                {previewTemplate.legal_references && previewTemplate.legal_references.length > 0 && (
                  <div className="mt-4 p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium text-foreground mb-2">Legal References</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {previewTemplate.legal_references.map((ref, i) => (
                        <li key={i}>• {ref}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </ScrollArea>

              {/* Footer */}
              <div className="p-4 border-t border-border shrink-0">
                <Button
                  onClick={() => handleUseTemplate(previewTemplate)}
                  className="w-full h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Use This Template
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
