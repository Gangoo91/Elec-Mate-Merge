import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useJobChecklist,
  useAddChecklistItem,
  useToggleChecklistItem,
  useDeleteChecklistItem,
} from "@/hooks/useJobChecklists";

interface JobChecklistProps {
  jobId: string;
}

export function JobChecklist({ jobId }: JobChecklistProps) {
  const [newItemTitle, setNewItemTitle] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

  const { data: items = [], isLoading } = useJobChecklist(jobId);
  const addItem = useAddChecklistItem();
  const toggleItem = useToggleChecklistItem();
  const deleteItem = useDeleteChecklistItem();

  const completedCount = items.filter((item) => item.is_completed).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleAddItem = async () => {
    if (!newItemTitle.trim()) return;
    
    await addItem.mutateAsync({ jobId, title: newItemTitle.trim() });
    setNewItemTitle("");
    setIsAddingItem(false);
  };

  const handleToggle = (id: string, currentState: boolean) => {
    toggleItem.mutate({ id, isCompleted: !currentState, jobId });
  };

  const handleDelete = (id: string) => {
    deleteItem.mutate({ id, jobId });
  };

  if (isLoading) {
    return (
      <Card className="bg-elec-gray/50">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-8 bg-muted rounded" />
            <div className="h-8 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray/50">
      <CardContent className="p-4 space-y-4">
        {/* Header with Progress */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Checklist</span>
          </div>
          {totalCount > 0 && (
            <span className="text-xs text-muted-foreground">
              {completedCount}/{totalCount}
            </span>
          )}
        </div>

        {totalCount > 0 && (
          <Progress value={progressPercent} className="h-1.5" />
        )}

        {/* Checklist Items */}
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 group transition-colors",
                item.is_completed && "opacity-60"
              )}
            >
              <Checkbox
                checked={item.is_completed}
                onCheckedChange={() => handleToggle(item.id, item.is_completed)}
                className="h-5 w-5"
              />
              <span
                className={cn(
                  "flex-1 text-sm text-foreground",
                  item.is_completed && "line-through text-muted-foreground"
                )}
              >
                {item.title}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add Item Form */}
        {isAddingItem ? (
          <div className="flex gap-2">
            <Input
              placeholder="Add item..."
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              className="h-9 flex-1"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddItem();
                if (e.key === "Escape") setIsAddingItem(false);
              }}
            />
            <Button
              size="sm"
              className="h-9"
              onClick={handleAddItem}
              disabled={!newItemTitle.trim() || addItem.isPending}
            >
              Add
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-9"
              onClick={() => {
                setIsAddingItem(false);
                setNewItemTitle("");
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start h-9 text-muted-foreground hover:text-foreground"
            onClick={() => setIsAddingItem(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add item
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Compact progress indicator for cards
export function JobChecklistProgress({ 
  completed, 
  total 
}: { 
  completed: number; 
  total: number;
}) {
  if (total === 0) return null;
  
  const percent = (completed / total) * 100;
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            percent === 100 ? "bg-success" : "bg-elec-yellow"
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
        {completed}/{total}
      </span>
    </div>
  );
}
