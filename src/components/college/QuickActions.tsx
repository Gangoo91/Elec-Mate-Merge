import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Plus,
  GraduationCap,
  ClipboardCheck,
  FileText,
  Calendar,
  MessageSquare,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CollegeSection } from "@/pages/college/CollegeDashboard";

interface QuickActionsProps {
  onNavigate: (section: CollegeSection) => void;
  onAction?: (action: string) => void;
}

export function QuickActions({ onNavigate, onAction }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      id: "grade",
      label: "Record Grade",
      icon: ClipboardCheck,
      color: "bg-success hover:bg-success/90",
      section: "grading" as CollegeSection,
    },
    {
      id: "attendance",
      label: "Take Attendance",
      icon: Calendar,
      color: "bg-info hover:bg-info/90",
      section: "attendance" as CollegeSection,
    },
    {
      id: "evidence",
      label: "Review Evidence",
      icon: FileText,
      color: "bg-warning hover:bg-warning/90",
      section: "portfolio" as CollegeSection,
    },
    {
      id: "comment",
      label: "Add Comment",
      icon: MessageSquare,
      color: "bg-purple-500 hover:bg-purple-500/90",
      action: "comment",
    },
    {
      id: "student",
      label: "Add Student",
      icon: GraduationCap,
      color: "bg-elec-yellow hover:bg-elec-yellow/90 text-black",
      section: "students" as CollegeSection,
    },
  ];

  const handleAction = (action: typeof actions[0]) => {
    if (action.section) {
      onNavigate(action.section);
    } else if (action.action && onAction) {
      onAction(action.action);
    }
    setIsOpen(false);
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-center gap-3">
        {/* Action buttons */}
        <div
          className={cn(
            "flex flex-col-reverse gap-2 transition-all duration-300 origin-bottom",
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          {actions.map((action, index) => (
            <Tooltip key={action.id}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full shadow-lg transition-all duration-200",
                    action.color
                  )}
                  style={{
                    transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                    transform: isOpen ? "translateY(0)" : "translateY(10px)",
                  }}
                  onClick={() => handleAction(action)}
                >
                  <action.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="font-medium">
                {action.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Main FAB button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className={cn(
                "h-14 w-14 rounded-full shadow-xl transition-all duration-300",
                isOpen
                  ? "bg-muted-foreground hover:bg-muted-foreground/90 rotate-45"
                  : "bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Zap className="h-6 w-6" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="font-medium">
            {isOpen ? "Close" : "Quick Actions"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
