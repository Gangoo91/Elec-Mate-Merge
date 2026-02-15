import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Trash2, BookOpen, FolderOpen } from "lucide-react";
import {
  useSafetyFormTemplates,
  useDeleteTemplate,
  useIncrementTemplateUsage,
  ModuleType,
  SafetyFormTemplate,
} from "@/hooks/useSafetyFormTemplates";
import type { StandardTemplate } from "@/data/site-safety/near-miss-templates";

type TabKey = "standard" | "mine";

interface LoadTemplateSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleType: ModuleType;
  onLoad: (templateData: Record<string, unknown>) => void;
  standardTemplates?: StandardTemplate[];
}

const MODULE_LABELS: Record<ModuleType, string> = {
  coshh: "COSHH",
  "near-miss": "Near Miss",
  observation: "Observation",
  permit: "Permit",
};

export function LoadTemplateSheet({
  open,
  onOpenChange,
  moduleType,
  onLoad,
  standardTemplates,
}: LoadTemplateSheetProps) {
  const hasStandard = standardTemplates && standardTemplates.length > 0;
  const [activeTab, setActiveTab] = useState<TabKey>(
    hasStandard ? "standard" : "mine",
  );
  const { templates, isLoading } = useSafetyFormTemplates(moduleType);
  const deleteTemplate = useDeleteTemplate();
  const incrementUsage = useIncrementTemplateUsage();

  const handleSelectUser = (template: SafetyFormTemplate) => {
    onLoad(template.template_data);
    incrementUsage.mutate({
      id: template.id,
      moduleType,
      currentCount: template.usage_count,
    });
    onOpenChange(false);
  };

  const handleSelectStandard = (template: StandardTemplate) => {
    onLoad(template.template_data);
    onOpenChange(false);
  };

  const handleDelete = (
    e: React.MouseEvent,
    template: SafetyFormTemplate,
  ) => {
    e.stopPropagation();
    deleteTemplate.mutate({ id: template.id, moduleType });
  };

  const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = hasStandard
    ? [
        { key: "standard", label: "Standard", icon: BookOpen },
        { key: "mine", label: "My Templates", icon: FolderOpen },
      ]
    : [{ key: "mine", label: "My Templates", icon: FolderOpen }];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl p-0 max-h-[70vh]">
        <div className="p-5 pb-3">
          <h3 className="text-base font-semibold text-white">
            Load {MODULE_LABELS[moduleType]} Template
          </h3>
          <p className="text-xs text-white mt-1">
            Select a template to pre-fill the form fields.
          </p>
        </div>

        {/* Tab bar */}
        {tabs.length > 1 && (
          <div className="flex px-5 gap-2 pb-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`h-9 flex-1 flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.97] transition-all ${
                    activeTab === tab.key
                      ? "bg-elec-yellow text-black"
                      : "bg-white/5 text-white border border-white/10"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="overflow-y-auto px-5 pb-5 space-y-2 max-h-[calc(70vh-140px)]">
          {/* ─── Standard Templates ─── */}
          {activeTab === "standard" &&
            hasStandard &&
            standardTemplates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => handleSelectStandard(template)}
                className="w-full text-left p-3 rounded-xl bg-white/[0.03] border border-white/10 touch-manipulation active:scale-[0.98] transition-all"
              >
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-white">
                        {template.name}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[9px] border-elec-yellow/30 text-elec-yellow"
                      >
                        Standard
                      </Badge>
                    </div>
                    <p className="text-xs text-white mt-0.5 line-clamp-2">
                      {template.description}
                    </p>
                    {template.regulation_refs.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {template.regulation_refs.map((ref) => (
                          <span
                            key={ref}
                            className="inline-block text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          >
                            {ref}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}

          {/* ─── My Templates ─── */}
          {activeTab === "mine" && (
            <>
              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </div>
              )}

              {!isLoading && templates.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-8 w-8 mx-auto text-white mb-2" />
                  <p className="text-sm text-white">No templates saved yet</p>
                  <p className="text-xs text-white mt-1">
                    Save a completed form as a template to reuse it later
                  </p>
                </div>
              )}

              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleSelectUser(template)}
                  className="w-full text-left p-3 rounded-xl bg-white/[0.03] border border-white/10 touch-manipulation active:scale-[0.98] transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white truncate">
                          {template.name}
                        </span>
                        {template.version > 1 && (
                          <Badge
                            variant="outline"
                            className="text-[9px] border-purple-500/30 text-purple-400"
                          >
                            v{template.version}
                          </Badge>
                        )}
                      </div>
                      {template.description && (
                        <p className="text-xs text-white mt-0.5 line-clamp-1">
                          {template.description}
                        </p>
                      )}
                      <p className="text-[10px] text-white mt-1">
                        Used {template.usage_count} time
                        {template.usage_count !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:text-red-400 touch-manipulation flex-shrink-0"
                      onClick={(e) => handleDelete(e, template)}
                      disabled={deleteTemplate.isPending}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
