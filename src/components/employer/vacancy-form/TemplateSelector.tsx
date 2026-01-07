import { useState, useEffect } from "react";
import {
  FileText,
  ChevronDown,
  Briefcase,
  GraduationCap,
  Users,
  Loader2,
  Trash2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  getVacancyTemplates,
  deleteVacancyTemplate,
  type VacancyTemplate,
} from "@/services/vacancyService";
import { toast } from "@/hooks/use-toast";
import type { VacancyFormData } from "./schema";

interface TemplateSelectorProps {
  onSelect: (template: Partial<VacancyFormData>) => void;
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<VacancyTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      const data = await getVacancyTemplates();
      setTemplates(data);
    } catch (error) {
      console.error("Error loading templates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (template: VacancyTemplate) => {
    // Convert template to form data
    const formData: Partial<VacancyFormData> = {
      title: template.title,
      type: template.type as VacancyFormData["type"],
      location: template.location || "",
      workArrangement:
        (template.work_arrangement as VacancyFormData["workArrangement"]) ||
        "On-site",
      salaryMin: template.salary_min || undefined,
      salaryMax: template.salary_max || undefined,
      salaryPeriod:
        (template.salary_period as VacancyFormData["salaryPeriod"]) || "year",
      benefits: template.benefits || [],
      requirements: template.requirements || [],
      experienceLevel:
        (template.experience_level as VacancyFormData["experienceLevel"]) ||
        "Mid",
      description: template.description || "",
      niceToHave: template.nice_to_have || [],
      schedule: template.schedule || "",
    };

    onSelect(formData);
    setIsOpen(false);

    toast({
      title: "Template loaded",
      description: `"${template.name}" template applied. Customize it for your listing.`,
    });
  };

  const handleDelete = async (e: React.MouseEvent, template: VacancyTemplate) => {
    e.stopPropagation();

    if (template.is_system_template) {
      toast({
        title: "Cannot delete",
        description: "System templates cannot be deleted",
        variant: "destructive",
      });
      return;
    }

    const success = await deleteVacancyTemplate(template.id);
    if (success) {
      setTemplates((prev) => prev.filter((t) => t.id !== template.id));
      toast({
        title: "Template deleted",
        description: `"${template.name}" has been removed`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive",
      });
    }
  };

  const getTemplateIcon = (template: VacancyTemplate) => {
    if (template.type === "Apprenticeship") {
      return <GraduationCap className="h-4 w-4" />;
    }
    if (
      template.title.toLowerCase().includes("manager") ||
      template.title.toLowerCase().includes("supervisor")
    ) {
      return <Users className="h-4 w-4" />;
    }
    return <Briefcase className="h-4 w-4" />;
  };

  const systemTemplates = templates.filter((t) => t.is_system_template);
  const userTemplates = templates.filter((t) => !t.is_system_template);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 text-white/70 border-white/20 hover:bg-white/10",
            "hover:text-white"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          Use Template
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 bg-elec-gray border-white/10"
      >
        <DropdownMenuLabel className="text-white/60 text-xs font-normal">
          Start from a template
        </DropdownMenuLabel>

        {/* System Templates */}
        {systemTemplates.length > 0 && (
          <>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuLabel className="text-white/40 text-xs">
              <Sparkles className="h-3 w-3 inline mr-1" />
              Pre-built Templates
            </DropdownMenuLabel>
            {systemTemplates.map((template) => (
              <DropdownMenuItem
                key={template.id}
                onClick={() => handleSelect(template)}
                className={cn(
                  "cursor-pointer py-3",
                  "text-white/80 hover:text-white hover:bg-white/10",
                  "focus:text-white focus:bg-white/10"
                )}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="p-1.5 rounded-lg bg-elec-yellow/10 text-elec-yellow">
                    {getTemplateIcon(template)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{template.name}</p>
                    <p className="text-xs text-white/50 mt-0.5">
                      {template.type} • {template.experience_level || "Any"} level
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </>
        )}

        {/* User Templates */}
        {userTemplates.length > 0 && (
          <>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuLabel className="text-white/40 text-xs">
              Your Templates
            </DropdownMenuLabel>
            {userTemplates.map((template) => (
              <DropdownMenuItem
                key={template.id}
                onClick={() => handleSelect(template)}
                className={cn(
                  "cursor-pointer py-3 group",
                  "text-white/80 hover:text-white hover:bg-white/10",
                  "focus:text-white focus:bg-white/10"
                )}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="p-1.5 rounded-lg bg-white/10 text-white/60">
                    {getTemplateIcon(template)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{template.name}</p>
                    <p className="text-xs text-white/50 mt-0.5">
                      {template.type}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, template)}
                    className={cn(
                      "p-1.5 rounded-lg opacity-0 group-hover:opacity-100",
                      "text-white/40 hover:text-red-400 hover:bg-red-500/10",
                      "transition-opacity"
                    )}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </DropdownMenuItem>
            ))}
          </>
        )}

        {templates.length === 0 && !isLoading && (
          <div className="p-4 text-center text-white/50 text-sm">
            No templates available
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
