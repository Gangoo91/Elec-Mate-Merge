import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Check, ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  useJobChecklist,
  useAddChecklistItem,
  useAddChecklistItems,
  useToggleChecklistItem,
  useDeleteChecklistItem,
  useRenameChecklistItem,
  useSwapChecklistItems,
  type JobChecklistItem,
} from '@/hooks/useJobChecklists';
import { inputClass } from './editorial';

/* ==========================================================================
   JobChecklist — the job's checklist editor (ELE-1960).

   Was built but rendered nowhere, so no checklist item could be created.
   Now on the job sheet: add (Enter keeps the keyboard up; a pasted list adds
   one item per line), tick, rename, move up/down and delete with undo.
   An empty checklist offers the usual stages of an electrical job as
   one-tap starters.
   ========================================================================== */

const STARTERS = [
  'Survey and confirm scope with client',
  'Materials ordered',
  'Safe isolation and lock off',
  'First fix',
  'Second fix',
  'Inspection and testing',
  'Certificate issued',
  'Part P notified',
  'Client handover and walkround',
  'Site left clean and tidy',
];

interface JobChecklistProps {
  jobId: string;
}

export function JobChecklist({ jobId }: JobChecklistProps) {
  const [newItemTitle, setNewItemTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const addInputRef = useRef<HTMLInputElement>(null);

  const { data: items = [], isLoading } = useJobChecklist(jobId);
  const addItem = useAddChecklistItem();
  const addItems = useAddChecklistItems();
  const toggleItem = useToggleChecklistItem();
  const deleteItem = useDeleteChecklistItem();
  const renameItem = useRenameChecklistItem();
  const swapItems = useSwapChecklistItems();

  const completedCount = items.filter((item) => item.is_completed).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleAdd = async () => {
    const title = newItemTitle.trim();
    if (!title) return;
    try {
      await addItem.mutateAsync({ jobId, title });
      setNewItemTitle('');
      // Keep the keyboard up for the next item.
      addInputRef.current?.focus();
    } catch {
      // The hook toasts the failure — keep the typed text so nothing is lost.
    }
  };

  const startEdit = (item: JobChecklistItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
  };

  const saveEdit = async (item: JobChecklistItem) => {
    const t = editTitle.trim();
    setEditingId(null);
    if (!t || t === item.title) return;
    try {
      await renameItem.mutateAsync({ id: item.id, title: t, jobId });
    } catch {
      /* hook toasts */
    }
  };

  const handleDelete = (item: JobChecklistItem) => {
    setEditingId(null);
    deleteItem.mutate(
      { id: item.id, jobId },
      {
        onSuccess: () =>
          toast('Item removed', {
            description: item.title,
            action: {
              label: 'Undo',
              onClick: () => addItem.mutate({ jobId, title: item.title }),
            },
          }),
      }
    );
  };

  const move = (index: number, dir: -1 | 1) => {
    const a = items[index];
    const b = items[index + dir];
    if (!a || !b) return;
    swapItems.mutate({ a, b, jobId });
  };

  return (
    <section aria-label="Checklist" className="-mx-5 sm:mx-0 border-y sm:border sm:rounded-2xl border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">Checklist</h2>
        {totalCount > 0 && (
          <span className="text-[12.5px] text-white tabular-nums">
            {completedCount} of {totalCount} done
          </span>
        )}
      </div>

      {totalCount > 0 && (
        <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              progressPercent === 100 ? 'bg-emerald-400' : 'bg-elec-yellow'
            )}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {isLoading ? (
        <div className="space-y-2">
          <div className="h-11 rounded-lg bg-white/[0.05] animate-pulse" />
          <div className="h-11 rounded-lg bg-white/[0.05] animate-pulse" />
        </div>
      ) : (
        <ul className="divide-y divide-white/[0.06]">
          {items.map((item, index) => {
            const editing = editingId === item.id;
            return (
              <li key={item.id} className="py-1">
                {editing ? (
                  <div className="space-y-2 py-1">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') void saveEdit(item);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      autoFocus
                      aria-label="Item name"
                      className={inputClass}
                    />
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => move(index, -1)}
                        disabled={index === 0 || swapItems.isPending}
                        aria-label="Move up"
                        className="h-11 w-11 rounded-full border border-white/[0.12] bg-white/[0.04] text-white flex items-center justify-center touch-manipulation disabled:opacity-30"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(index, 1)}
                        disabled={index === items.length - 1 || swapItems.isPending}
                        aria-label="Move down"
                        className="h-11 w-11 rounded-full border border-white/[0.12] bg-white/[0.04] text-white flex items-center justify-center touch-manipulation disabled:opacity-30"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        aria-label="Delete item"
                        className="h-11 w-11 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 flex items-center justify-center touch-manipulation"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => void saveEdit(item)}
                        className="ml-auto h-11 px-5 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={item.is_completed}
                      onClick={() =>
                        toggleItem.mutate({ id: item.id, isCompleted: !item.is_completed, jobId })
                      }
                      className="flex min-h-[44px] flex-1 min-w-0 items-center gap-3 text-left touch-manipulation"
                    >
                      <span
                        className={cn(
                          'h-6 w-6 shrink-0 rounded-md border flex items-center justify-center transition-colors',
                          item.is_completed
                            ? 'bg-elec-yellow border-elec-yellow text-black'
                            : 'border-white/[0.3] bg-transparent'
                        )}
                      >
                        {item.is_completed && <Check className="h-4 w-4" strokeWidth={3} />}
                      </span>
                      <span
                        className={cn(
                          'text-[14px] text-white leading-snug',
                          item.is_completed && 'line-through decoration-white/60'
                        )}
                      >
                        {item.title}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      aria-label={`Edit ${item.title}`}
                      className="h-11 w-11 shrink-0 rounded-full text-white flex items-center justify-center touch-manipulation hover:bg-white/[0.06]"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Add */}
      <div className="flex items-end gap-2 pt-1">
        <Input
          ref={addInputRef}
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          onPaste={(e) => {
            const text = e.clipboardData.getData('text');
            // A pasted list (one per line) becomes one item per line.
            const lines = text
              .split(/\r?\n/)
              .map((l) => l.replace(/^\s*[-*•\d.)]+\s*/, '').trim())
              .filter(Boolean);
            if (lines.length > 1) {
              e.preventDefault();
              addItems.mutate({ jobId, titles: lines });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              void handleAdd();
            }
          }}
          placeholder={totalCount ? 'Add another item' : 'Add the first item'}
          aria-label="New checklist item"
          enterKeyHint="done"
          className={cn(inputClass, 'flex-1')}
        />
        <button
          type="button"
          onClick={() => void handleAdd()}
          disabled={!newItemTitle.trim() || addItem.isPending || addItems.isPending}
          className="h-11 shrink-0 px-5 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:bg-white/[0.08] disabled:text-white"
        >
          Add
        </button>
      </div>
      {!isLoading && totalCount === 0 && (
        <div className="pt-1">
          <p className="text-[12.5px] text-white mb-2">Or start from the usual stages:</p>
          <div className="flex flex-wrap gap-2">
            {STARTERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => addItem.mutate({ jobId, title: s })}
                className="min-h-[44px] rounded-full border border-white/[0.12] bg-white/[0.06] px-3.5 text-[12.5px] font-medium text-white touch-manipulation active:scale-[0.98]"
              >
                + {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addItems.mutate({ jobId, titles: STARTERS })}
            disabled={addItems.isPending}
            className="mt-2 h-11 px-4 rounded-full text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            Add all {STARTERS.length}
          </button>
        </div>
      )}
    </section>
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
