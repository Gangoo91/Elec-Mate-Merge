import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Plus, Trash2, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useJobChecklist,
  useAddChecklistItem,
  useToggleChecklistItem,
  useDeleteChecklistItem,
} from '@/hooks/useJobChecklists';
import {
  FormCard,
  PrimaryButton,
  SecondaryButton,
  IconButton,
  inputClass,
  checkboxClass,
} from './editorial';

interface JobChecklistProps {
  jobId: string;
}

export function JobChecklist({ jobId }: JobChecklistProps) {
  const [newItemTitle, setNewItemTitle] = useState('');
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
    setNewItemTitle('');
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
      <FormCard>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-white/[0.06] rounded w-1/3" />
          <div className="h-8 bg-white/[0.06] rounded" />
          <div className="h-8 bg-white/[0.06] rounded" />
        </div>
      </FormCard>
    );
  }

  return (
    <FormCard eyebrow="Checklist">
      {/* Header with Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-white" />
          <span className="text-sm font-medium text-white">Checklist</span>
        </div>
        {totalCount > 0 && (
          <span className="text-xs text-white">
            {completedCount}/{totalCount}
          </span>
        )}
      </div>

      {totalCount > 0 && <Progress value={progressPercent} className="h-1.5" />}

      {/* Checklist Items */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'flex items-center gap-3 p-2 rounded-md hover:bg-white/[0.04] group transition-colors',
              item.is_completed && 'opacity-60'
            )}
          >
            <Checkbox
              checked={item.is_completed}
              onCheckedChange={() => handleToggle(item.id, item.is_completed)}
              className={checkboxClass}
            />
            <span
              className={cn(
                'flex-1 text-sm text-white',
                item.is_completed && 'line-through'
              )}
            >
              {item.title}
            </span>
            <IconButton
              onClick={() => handleDelete(item.id)}
              aria-label="Delete item"
              className="h-8 w-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </IconButton>
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
            className={inputClass}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddItem();
              if (e.key === 'Escape') setIsAddingItem(false);
            }}
          />
          <PrimaryButton
            onClick={handleAddItem}
            disabled={!newItemTitle.trim() || addItem.isPending}
          >
            Add
          </PrimaryButton>
          <SecondaryButton
            onClick={() => {
              setIsAddingItem(false);
              setNewItemTitle('');
            }}
          >
            Cancel
          </SecondaryButton>
        </div>
      ) : (
        <button
          className="w-full justify-start h-10 flex items-center gap-2 text-sm text-white hover:bg-white/[0.04] rounded-lg px-3 transition-colors touch-manipulation"
          onClick={() => setIsAddingItem(true)}
        >
          <Plus className="h-4 w-4" />
          Add item
        </button>
      )}
    </FormCard>
  );
}

// Compact progress indicator for cards
export function JobChecklistProgress({ completed, total }: { completed: number; total: number }) {
  if (total === 0) return null;

  const percent = (completed / total) * 100;

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            percent === 100 ? 'bg-green-400' : 'bg-elec-yellow'
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-[10px] text-white whitespace-nowrap">
        {completed}/{total}
      </span>
    </div>
  );
}
