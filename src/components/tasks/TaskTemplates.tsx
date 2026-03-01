import { Drawer } from 'vaul';
import {
  X,
  Zap,
  Phone,
  ShoppingCart,
  FileCheck,
  ClipboardCheck,
  Wrench,
  Calendar,
  AlertTriangle,
  Receipt,
  Users,
} from 'lucide-react';
import type { SaveTaskInput, TaskPriority } from '@/hooks/useSparkTasks';
import { cn } from '@/lib/utils';

interface TaskTemplatesProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (input: SaveTaskInput) => Promise<string | null>;
}

interface Template {
  title: string;
  details?: string;
  priority: TaskPriority;
  icon: React.ElementType;
  colour: string;
  tags: string[];
  /** Hours from now for due date — undefined = no due date */
  dueHours?: number;
}

const TEMPLATES: { category: string; items: Template[] }[] = [
  {
    category: 'Follow-ups',
    items: [
      {
        title: 'Chase customer re: quote',
        details: 'Follow up on outstanding quote.',
        priority: 'normal',
        icon: Phone,
        colour: 'bg-blue-500/20 text-blue-400',
        tags: ['follow-up'],
        dueHours: 24,
      },
      {
        title: 'Chase payment for invoice',
        details: 'Send reminder for unpaid invoice.',
        priority: 'high',
        icon: Receipt,
        colour: 'bg-red-500/20 text-red-400',
        tags: ['payment', 'follow-up'],
        dueHours: 24,
      },
      {
        title: 'Call customer re: callback',
        details: 'Return customer call.',
        priority: 'high',
        icon: Users,
        colour: 'bg-orange-500/20 text-orange-400',
        tags: ['callback'],
        dueHours: 4,
      },
    ],
  },
  {
    category: 'Job Prep',
    items: [
      {
        title: 'Order materials for job',
        details: 'Check materials list and place order with supplier.',
        priority: 'normal',
        icon: ShoppingCart,
        colour: 'bg-emerald-500/20 text-emerald-400',
        tags: ['materials'],
        dueHours: 48,
      },
      {
        title: 'Book EICR inspection',
        details: 'Schedule inspection date with customer.',
        priority: 'normal',
        icon: Calendar,
        colour: 'bg-purple-500/20 text-purple-400',
        tags: ['EICR', 'booking'],
      },
      {
        title: 'Prep tools for tomorrow',
        details: 'Check van stock and charge batteries.',
        priority: 'low',
        icon: Wrench,
        colour: 'bg-amber-500/20 text-amber-400',
        tags: ['prep'],
        dueHours: 12,
      },
    ],
  },
  {
    category: 'Compliance',
    items: [
      {
        title: 'Submit cert to scheme',
        details: 'Upload completed certificate to Part P scheme.',
        priority: 'high',
        icon: FileCheck,
        colour: 'bg-green-500/20 text-green-400',
        tags: ['compliance', 'cert'],
        dueHours: 72,
      },
      {
        title: 'Complete job paperwork',
        details: 'Minor works cert / EIC / EICR to finish.',
        priority: 'normal',
        icon: ClipboardCheck,
        colour: 'bg-cyan-500/20 text-cyan-400',
        tags: ['paperwork'],
        dueHours: 24,
      },
      {
        title: 'Report safety issue',
        details: 'Log and report dangerous installation found on site.',
        priority: 'urgent',
        icon: AlertTriangle,
        colour: 'bg-red-500/20 text-red-400',
        tags: ['safety', 'urgent'],
        dueHours: 2,
      },
    ],
  },
];

export function TaskTemplates({ isOpen, onClose, onSelect }: TaskTemplatesProps) {
  async function handleSelect(template: Template) {
    const dueAt = template.dueHours
      ? new Date(Date.now() + template.dueHours * 3600000).toISOString()
      : undefined;

    await onSelect({
      title: template.title,
      details: template.details,
      priority: template.priority,
      tags: template.tags,
      dueAt,
    });
    onClose();
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl bg-background max-h-[80vh] outline-none">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Zap className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Task Templates</h2>
                <p className="text-[12px] text-white">Tap to create instantly</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 touch-manipulation"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Template list */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {TEMPLATES.map((category) => (
              <div key={category.category} className="space-y-2">
                <h3 className="text-[13px] font-bold text-white uppercase tracking-wider">
                  {category.category}
                </h3>
                <div className="space-y-1.5">
                  {category.items.map((template) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={template.title}
                        type="button"
                        onClick={() => handleSelect(template)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] active:bg-white/[0.06] touch-manipulation transition-colors text-left"
                      >
                        <div
                          className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                            template.colour
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-semibold text-white truncate">
                            {template.title}
                          </p>
                          {template.details && (
                            <p className="text-[12px] text-white line-clamp-1">
                              {template.details}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          {template.priority !== 'normal' && (
                            <span
                              className={cn(
                                'text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full',
                                template.priority === 'urgent' && 'bg-red-500/20 text-red-400',
                                template.priority === 'high' && 'bg-orange-500/20 text-orange-400',
                                template.priority === 'low' && 'bg-white/10 text-white'
                              )}
                            >
                              {template.priority}
                            </span>
                          )}
                          {template.dueHours && (
                            <span className="text-[10px] text-white">
                              Due{' '}
                              {template.dueHours < 24
                                ? `${template.dueHours}h`
                                : `${Math.round(template.dueHours / 24)}d`}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
