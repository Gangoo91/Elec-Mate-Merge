import { useState } from "react";
import { Package, Zap, BookOpen, Wrench, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResultsHeroCard, ScrollableChips, ExpandableSection } from "./results";
import { cn } from "@/lib/utils";

interface ComponentIdentificationResultsProps {
  analysisResult: {
    component?: {
      name: string;
      type: string;
      plain_english?: string;
      manufacturer?: string;
      model?: string;
      specifications?: {
        voltage_rating?: string;
        current_rating?: string;
        ip_rating?: string;
        breaking_capacity?: string;
        poles?: string;
        protection_type?: string;
        [key: string]: string | undefined;
      };
      visual_identifiers?: string[];
      age_estimate?: string;
      current_compliance?: string;
      bs7671_requirements?: string[];
      typical_applications?: string[];
      installation_notes?: string;
      replacement_notes?: string;
      common_issues?: string;
      where_found?: string;
      confidence?: number;
    };
    similar_components?: Array<{
      name: string;
      manufacturer?: string;
      notes?: string;
    }>;
    summary?: string;
  };
}

export default function ComponentIdentificationResults({ analysisResult }: ComponentIdentificationResultsProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const component = analysisResult.component;

  if (!component) {
    return (
      <div className="p-6 text-center rounded-xl border border-border/50 bg-card/50">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No component information available</p>
      </div>
    );
  }

  // Fix confidence display
  const rawConfidence = component.confidence || 0;
  const confidence = rawConfidence < 1 ? Math.round(rawConfidence * 100) : Math.round(rawConfidence);

  const confidenceVariant: 'success' | 'warning' | 'danger' =
    confidence >= 90 ? 'success' : confidence >= 70 ? 'warning' : 'danger';

  const confidenceLabel =
    confidence >= 90 ? 'High Confidence' : confidence >= 70 ? 'Moderate' : 'Low Confidence';

  // Build specs array for ScrollableChips
  const specsArray = component.specifications
    ? Object.entries(component.specifications)
        .filter(([_, value]) => value)
        .map(([key, value]) => ({
          label: key.replace(/_/g, ' '),
          value: value as string,
        }))
    : [];

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalChecks = component.visual_identifiers?.length || 0;

  return (
    <div className="space-y-5">
      {/* Hero Section */}
      <ResultsHeroCard
        icon={Package}
        title={component.name}
        subtitle={component.type}
        badge={{ label: `${confidenceLabel}: ${confidence}%`, variant: confidenceVariant }}
        secondaryBadge={component.manufacturer ? { label: component.manufacturer, variant: 'info' } : undefined}
      >
        {component.plain_english && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-elec-yellow">
              <Info className="h-4 w-4" />
              <span className="text-sm font-semibold">What is this?</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
              {component.plain_english}
            </p>
          </div>
        )}
      </ResultsHeroCard>

      {/* Scrollable Specs */}
      {specsArray.length > 0 && (
        <ScrollableChips items={specsArray} />
      )}

      {/* Tabbed Content */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full grid grid-cols-3 h-12 p-1 bg-muted/50 rounded-xl">
          <TabsTrigger
            value="details"
            className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm font-medium"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="bs7671"
            className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm font-medium"
          >
            BS 7671
          </TabsTrigger>
          <TabsTrigger
            value="install"
            className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm font-medium"
          >
            Install
          </TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="mt-4 space-y-4">
          {/* Age & Compliance */}
          {(component.age_estimate || component.current_compliance) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {component.age_estimate && (
                <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                    Estimated Age
                  </p>
                  <p className="text-base font-semibold text-foreground">
                    {component.age_estimate}
                  </p>
                </div>
              )}
              {component.current_compliance && (
                <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                    Compliance Status
                  </p>
                  <p className={cn(
                    "text-base font-semibold",
                    component.current_compliance.toLowerCase().includes('meets') ||
                    component.current_compliance.toLowerCase().includes('compliant')
                      ? 'text-green-400'
                      : 'text-amber-400'
                  )}>
                    {component.current_compliance}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Where Found */}
          {component.where_found && (
            <div className="p-4 rounded-xl bg-card/50 border border-border/30">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Where You'll Find This
              </p>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {component.where_found}
              </p>
            </div>
          )}

          {/* Typical Applications */}
          {component.typical_applications && component.typical_applications.length > 0 && (
            <div className="p-4 rounded-xl bg-card/50 border border-border/30">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Typical Applications
              </p>
              <div className="space-y-2">
                {component.typical_applications.map((app, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/90">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Components */}
          {analysisResult.similar_components && analysisResult.similar_components.length > 0 && (
            <ExpandableSection
              title="Similar Components"
              icon={Package}
              defaultOpen={false}
            >
              <div className="space-y-2">
                {analysisResult.similar_components.map((similar, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-background/50 border border-border/30">
                    <p className="font-medium text-sm text-foreground">{similar.name}</p>
                    {similar.manufacturer && (
                      <p className="text-xs text-muted-foreground">{similar.manufacturer}</p>
                    )}
                    {similar.notes && (
                      <p className="text-xs text-muted-foreground mt-1">{similar.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </ExpandableSection>
          )}
        </TabsContent>

        {/* BS 7671 Tab */}
        <TabsContent value="bs7671" className="mt-4 space-y-4">
          {component.bs7671_requirements && component.bs7671_requirements.length > 0 ? (
            <div className="space-y-3">
              {component.bs7671_requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-elec-yellow/20"
                >
                  <BookOpen className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground leading-relaxed">{req}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center rounded-xl bg-card/50 border border-border/30">
              <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No specific BS 7671 requirements listed</p>
            </div>
          )}
        </TabsContent>

        {/* Installation Tab */}
        <TabsContent value="install" className="mt-4 space-y-4">
          {/* Installation Notes */}
          {component.installation_notes && (
            <div className="p-4 rounded-xl bg-card/50 border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="h-4 w-4 text-elec-yellow" />
                <p className="text-sm font-semibold text-foreground">Installation Notes</p>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {component.installation_notes}
              </p>
            </div>
          )}

          {/* Replacement Notes */}
          {component.replacement_notes && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-amber-400" />
                <p className="text-sm font-semibold text-amber-400">Replacement Information</p>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {component.replacement_notes}
              </p>
            </div>
          )}

          {/* Common Issues */}
          {component.common_issues && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <p className="text-sm font-semibold text-red-400">Known Issues</p>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {component.common_issues}
              </p>
            </div>
          )}

          {!component.installation_notes && !component.replacement_notes && !component.common_issues && (
            <div className="p-6 text-center rounded-xl bg-card/50 border border-border/30">
              <Wrench className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No installation notes available</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Visual Checklist - How to Confirm */}
      {component.visual_identifiers && component.visual_identifiers.length > 0 && (
        <div className="rounded-xl border border-elec-yellow/20 bg-card/50 overflow-hidden">
          <div className="px-4 py-3 bg-elec-yellow/5 border-b border-elec-yellow/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold text-foreground">Confirm This Identification</h3>
              </div>
              {checkedCount > 0 && (
                <Badge variant="outline" className="text-xs">
                  {checkedCount}/{totalChecks}
                </Badge>
              )}
            </div>
          </div>

          <div className="p-4 space-y-2">
            {component.visual_identifiers.map((identifier, idx) => (
              <button
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={cn(
                  "w-full flex items-start gap-3 p-3 rounded-lg text-left",
                  "min-h-[48px] touch-manipulation transition-colors",
                  checkedItems[idx]
                    ? "bg-green-500/10 border border-green-500/30"
                    : "bg-background/50 border border-border/30 hover:bg-accent/30"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                  "border-2 transition-colors",
                  checkedItems[idx]
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-muted-foreground/30"
                )}>
                  {checkedItems[idx] && <CheckCircle2 className="h-4 w-4" />}
                </div>
                <span className={cn(
                  "text-sm leading-relaxed",
                  checkedItems[idx] ? "text-foreground" : "text-foreground/80"
                )}>
                  {identifier}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {analysisResult.summary && (
        <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {analysisResult.summary}
          </p>
        </div>
      )}
    </div>
  );
}
