import { cn } from "@/lib/utils";
import { FileText, Wrench, CheckCircle, BookOpen } from "lucide-react";

interface SectionNavigationTabsProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const SectionNavigationTabs = ({ onNavigate, activeSection }: SectionNavigationTabsProps) => {
  const sections = [
    { id: 'steps', label: 'Steps', icon: FileText },
    { id: 'materials', label: 'Materials', icon: Wrench },
    { id: 'testing', label: 'Testing', icon: CheckCircle },
    { id: 'compliance', label: 'Compliance', icon: BookOpen }
  ];

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/40 -mx-4 px-4 sm:-mx-6 sm:px-6">
      <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all shrink-0 min-h-[44px]",
                "border-2 font-medium text-sm active:scale-95",
                isActive 
                  ? "bg-elec-yellow/20 border-elec-yellow text-elec-yellow" 
                  : "bg-muted/50 border-border/50 text-muted-foreground hover:border-elec-yellow/50 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {section.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};