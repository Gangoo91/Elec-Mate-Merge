import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { 
  Copy, 
  Archive, 
  ArrowRight, 
  Tag, 
  CheckSquare, 
  Calendar,
  Users,
  FileText,
  LayoutTemplate
} from "lucide-react";

interface JobCardContextMenuProps {
  children: React.ReactNode;
  stages: Array<{ id: string; label: string }>;
  currentStage: string;
  isTemplate?: boolean;
  onCopy: () => void;
  onArchive: () => void;
  onMove: (stageId: string) => void;
  onOpenLabels: () => void;
  onOpenChecklist: () => void;
  onOpenDetails: () => void;
  onMarkAsTemplate?: () => void;
}

export function JobCardContextMenu({
  children,
  stages,
  currentStage,
  isTemplate,
  onCopy,
  onArchive,
  onMove,
  onOpenLabels,
  onOpenChecklist,
  onOpenDetails,
  onMarkAsTemplate,
}: JobCardContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem onClick={onOpenDetails} className="gap-2">
          <FileText className="h-4 w-4" />
          Open Details
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        <ContextMenuItem onClick={onCopy} className="gap-2">
          <Copy className="h-4 w-4" />
          Copy Card
        </ContextMenuItem>
        
        <ContextMenuSub>
          <ContextMenuSubTrigger className="gap-2">
            <ArrowRight className="h-4 w-4" />
            Move to...
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {stages.map((stage) => (
              <ContextMenuItem
                key={stage.id}
                onClick={() => onMove(stage.id)}
                disabled={stage.id === currentStage}
              >
                {stage.label}
                {stage.id === currentStage && " (current)"}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
        
        <ContextMenuSeparator />
        
        <ContextMenuItem onClick={onOpenLabels} className="gap-2">
          <Tag className="h-4 w-4" />
          Edit Labels
        </ContextMenuItem>
        
        <ContextMenuItem onClick={onOpenChecklist} className="gap-2">
          <CheckSquare className="h-4 w-4" />
          View Checklist
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        {onMarkAsTemplate && (
          <ContextMenuItem onClick={onMarkAsTemplate} className="gap-2">
            <LayoutTemplate className="h-4 w-4" />
            {isTemplate ? "Remove from Templates" : "Save as Template"}
          </ContextMenuItem>
        )}
        
        <ContextMenuItem onClick={onArchive} className="gap-2 text-warning focus:text-warning">
          <Archive className="h-4 w-4" />
          Archive
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
