import { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import type { SparkTask, SaveTaskInput, TaskPriority } from '@/hooks/useSparkTasks';
import { cn } from '@/lib/utils';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (input: SaveTaskInput) => Promise<string | null>;
  onUpdate?: (id: string, input: Partial<SaveTaskInput>) => Promise<void>;
  editTask?: SparkTask | null;
  projectId?: string;
}

interface CustomerOption {
  id: string;
  name: string;
}

// No customer selected sentinel — empty string, not "none"
const NO_CUSTOMER = '';

function getQuickPickDates() {
  const now = new Date();

  const today = new Date(now);
  today.setHours(17, 0, 0, 0);
  if (today <= now) today.setDate(today.getDate() + 1);

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);

  const nextMonday = new Date(now);
  const day = nextMonday.getDay();
  const daysToMonday = day === 0 ? 1 : 8 - day;
  nextMonday.setDate(nextMonday.getDate() + daysToMonday);
  nextMonday.setHours(9, 0, 0, 0);

  return [
    { label: 'Today', sublabel: '5pm', date: today },
    { label: 'Tomorrow', sublabel: '9am', date: tomorrow },
    { label: 'Next Week', sublabel: 'Mon 9am', date: nextMonday },
  ];
}

function toLocalDatetimeValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d}T${h}:${min}`;
}

export function TaskForm({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  editTask,
  projectId,
}: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [dueAt, setDueAt] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('normal');
  const [customerId, setCustomerId] = useState(NO_CUSTOMER);
  const [location, setLocation] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [saving, setSaving] = useState(false);
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const quickPicks = getQuickPickDates();

  // Load customers for select
  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('customers')
        .select('id, name')
        .eq('user_id', user.id)
        .order('name');
      setCustomers((data || []).map((c) => ({ id: c.id, name: c.name })));
    })();
  }, [isOpen]);

  // Populate form when editing
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDetails(editTask.details || '');
      setDueAt(editTask.dueAt ? editTask.dueAt.slice(0, 16) : '');
      setPriority(editTask.priority);
      setCustomerId(editTask.customerId || NO_CUSTOMER);
      setLocation(editTask.location || '');
      setTagsStr(editTask.tags.join(', '));
      setShowCustomPicker(!!editTask.dueAt);
    } else {
      resetForm();
    }
  }, [editTask, isOpen]);

  function resetForm() {
    setTitle('');
    setDetails('');
    setDueAt('');
    setPriority('normal');
    setCustomerId(NO_CUSTOMER);
    setLocation('');
    setTagsStr('');
    setShowCustomPicker(false);
  }

  function handleQuickPick(date: Date) {
    setDueAt(toLocalDatetimeValue(date));
    setShowCustomPicker(false);
  }

  function clearDueDate() {
    setDueAt('');
    setShowCustomPicker(false);
  }

  // Resolve customer ID: empty string → undefined (no FK violation)
  function resolveCustomerId(): string | undefined {
    if (!customerId || customerId === NO_CUSTOMER) return undefined;
    return customerId;
  }

  async function handleSubmit() {
    if (!title.trim()) return;
    setSaving(true);

    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (editTask && onUpdate) {
        await onUpdate(editTask.id, {
          title: title.trim(),
          details: details.trim() || undefined,
          priority,
          dueAt: dueAt ? new Date(dueAt).toISOString() : undefined,
          customerId: resolveCustomerId(),
          location: location.trim() || undefined,
          tags,
        });
      } else {
        await onSave({
          title: title.trim(),
          details: details.trim() || undefined,
          priority,
          dueAt: dueAt ? new Date(dueAt).toISOString() : undefined,
          customerId: resolveCustomerId(),
          location: location.trim() || undefined,
          tags,
          projectId,
        });
      }
      resetForm();
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl bg-background max-h-[85dvh] outline-none">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pb-3 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">{editTask ? 'Edit Task' : 'New Task'}</h2>
            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 touch-manipulation"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Form body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {/* Title */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-white">Title *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Chase Mrs Smith re: quote"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                autoFocus={false}
              />
            </div>

            {/* Details */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-white">Details</Label>
              <Textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Any notes or context..."
                className="touch-manipulation text-base min-h-[72px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
              />
            </div>

            {/* Due date — Quick picks + optional custom */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Due date</Label>

              {/* Quick pick buttons */}
              <div className="flex gap-2">
                {quickPicks.map((qp) => {
                  const isSelected = dueAt === toLocalDatetimeValue(qp.date);
                  return (
                    <button
                      key={qp.label}
                      type="button"
                      onClick={() => handleQuickPick(qp.date)}
                      className={cn(
                        'flex-1 flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl text-center touch-manipulation transition-colors',
                        isSelected
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/[0.06] text-white active:bg-white/10'
                      )}
                    >
                      <span className="text-[13px] font-bold">{qp.label}</span>
                      <span
                        className={cn('text-[11px]', isSelected ? 'text-black/70' : 'text-white')}
                      >
                        {qp.sublabel}
                      </span>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    setShowCustomPicker(true);
                    if (!dueAt) {
                      // Default to tomorrow 9am for custom
                      setDueAt(toLocalDatetimeValue(quickPicks[1].date));
                    }
                  }}
                  className={cn(
                    'flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-xl touch-manipulation transition-colors',
                    showCustomPicker &&
                      !quickPicks.some((qp) => dueAt === toLocalDatetimeValue(qp.date))
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.06] text-white active:bg-white/10'
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  <span className="text-[11px] font-medium">Custom</span>
                </button>
              </div>

              {/* Custom datetime picker (shown when Custom tapped or editing existing) */}
              {(showCustomPicker ||
                (dueAt && !quickPicks.some((qp) => dueAt === toLocalDatetimeValue(qp.date)))) && (
                <Input
                  type="datetime-local"
                  value={dueAt}
                  onChange={(e) => setDueAt(e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              )}

              {/* Clear due date */}
              {dueAt && (
                <button
                  type="button"
                  onClick={clearDueDate}
                  className="text-[12px] text-white underline touch-manipulation"
                >
                  Remove due date
                </button>
              )}
            </div>

            {/* Priority */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-white">Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
                <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-white">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Customer — fixed: uses empty string for "none", not "none" literal */}
            {customers.length > 0 && (
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-white">Customer</Label>
                <Select
                  value={customerId || '_none'}
                  onValueChange={(v) => setCustomerId(v === '_none' ? NO_CUSTOMER : v)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-white max-h-60">
                    <SelectItem value="_none">None</SelectItem>
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Location */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-white">Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. 42 High Street, Manchester"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-white">Tags</Label>
              <Input
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="e.g. follow-up, EV, rewire"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
              <p className="text-[11px] text-white">Separate with commas</p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-white/10 safe-area-bottom">
            <Button
              onClick={handleSubmit}
              disabled={!title.trim() || saving}
              className="w-full h-12 text-base font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-300 hover:to-amber-400 rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              {saving ? 'Saving...' : editTask ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
