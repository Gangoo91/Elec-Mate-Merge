import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tag, Plus, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useJobLabels,
  useJobLabelAssignments,
  useAssignLabel,
  useRemoveLabel,
  useCreateLabel,
} from "@/hooks/useJobLabels";

interface JobLabelPickerProps {
  jobId: string;
  compact?: boolean;
}

const PRESET_COLOURS = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
];

export function JobLabelPicker({ jobId, compact = false }: JobLabelPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");
  const [newLabelColour, setNewLabelColour] = useState(PRESET_COLOURS[0]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { data: labels = [] } = useJobLabels();
  const { data: assignments = [] } = useJobLabelAssignments(jobId);
  const assignLabel = useAssignLabel();
  const removeLabel = useRemoveLabel();
  const createLabel = useCreateLabel();

  const assignedLabelIds = assignments.map((a) => a.label_id);

  const handleToggleLabel = (labelId: string) => {
    if (assignedLabelIds.includes(labelId)) {
      removeLabel.mutate({ jobId, labelId });
    } else {
      assignLabel.mutate({ jobId, labelId });
    }
  };

  const handleCreateLabel = async () => {
    if (!newLabelName.trim()) return;
    
    await createLabel.mutateAsync({ name: newLabelName.trim(), colour: newLabelColour });
    setNewLabelName("");
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-2">
      {/* Assigned Labels Display */}
      <div className="flex flex-wrap gap-1.5">
        {assignments.map((assignment) => (
          <Badge
            key={assignment.label_id}
            variant="secondary"
            className="gap-1 text-xs font-medium text-foreground"
            style={{ backgroundColor: assignment.label.colour }}
          >
            {assignment.label.name}
            {!compact && (
              <button
                onClick={() => removeLabel.mutate({ jobId, labelId: assignment.label_id })}
                className="ml-0.5 hover:opacity-80"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </Badge>
        ))}
        
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-6 px-2 text-xs text-muted-foreground hover:text-foreground",
                compact && "h-5 px-1.5"
              )}
            >
              <Plus className="h-3 w-3 mr-1" />
              {compact ? "" : "Add Label"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2" align="start">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground px-1">Labels</p>
              
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {labels.map((label) => (
                  <button
                    key={label.id}
                    onClick={() => handleToggleLabel(label.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-muted transition-colors",
                      assignedLabelIds.includes(label.id) && "bg-muted"
                    )}
                  >
                    <div
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: label.colour }}
                    />
                    <span className="flex-1 text-left text-foreground">{label.name}</span>
                    {assignedLabelIds.includes(label.id) && (
                      <Check className="h-4 w-4 text-elec-yellow" />
                    )}
                  </button>
                ))}
              </div>

              {showCreateForm ? (
                <div className="space-y-2 pt-2 border-t border-border">
                  <Input
                    placeholder="Label name"
                    value={newLabelName}
                    onChange={(e) => setNewLabelName(e.target.value)}
                    className="h-8 text-sm"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleCreateLabel()}
                  />
                  <div className="flex gap-1">
                    {PRESET_COLOURS.map((colour) => (
                      <button
                        key={colour}
                        onClick={() => setNewLabelColour(colour)}
                        className={cn(
                          "w-6 h-6 rounded-md transition-all",
                          newLabelColour === colour && "ring-2 ring-offset-2 ring-elec-yellow"
                        )}
                        style={{ backgroundColor: colour }}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="h-7 flex-1"
                      onClick={handleCreateLabel}
                      disabled={!newLabelName.trim() || createLabel.isPending}
                    >
                      Create
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7"
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8 text-muted-foreground"
                  onClick={() => setShowCreateForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create new label
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

// Compact display for cards - just shows label strips
export function JobLabelStrips({ 
  labels 
}: { 
  labels: { id: string; name: string; colour: string }[] 
}) {
  if (labels.length === 0) return null;
  
  return (
    <div className="flex gap-1 flex-wrap">
      {labels.slice(0, 3).map((label) => (
        <div
          key={label.id}
          className="h-2 w-10 rounded-full"
          style={{ backgroundColor: label.colour }}
          title={label.name}
        />
      ))}
      {labels.length > 3 && (
        <span className="text-[10px] text-muted-foreground">+{labels.length - 3}</span>
      )}
    </div>
  );
}
