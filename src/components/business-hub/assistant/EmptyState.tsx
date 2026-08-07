import { RecentChatRow } from './RecentChatRow';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import type { RecentChat } from './types';

export function EmptyState({
  onPick,
  recentChats,
  recentChatsLoading,
  onResume,
  onRename,
  onDelete,
}: {
  onPick: (text: string) => void;
  recentChats: RecentChat[];
  recentChatsLoading: boolean;
  onResume: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="py-6 px-1">
      {recentChatsLoading && recentChats.length === 0 && (
        <div className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white mb-2">
            Recent chats
          </p>
          <div className="space-y-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn('animate-pulse rounded-xl border border-white/[0.18] px-3 py-2.5', CARD_SURFACE)}
              >
                <div className="mb-2 h-3 w-3/5 rounded bg-white/[0.18]" />
                <div className="h-2 w-16 rounded bg-white/[0.12]" />
              </div>
            ))}
          </div>
        </div>
      )}
      {recentChats.length > 0 && (
        <div className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white mb-2">
            Recent chats
          </p>
          <div className="space-y-1">
            {recentChats.map((c, i) => (
              <RecentChatRow
                key={c.id}
                chat={c}
                emphasis={i === 0}
                onResume={() => onResume(c.id)}
                onRename={(t) => onRename(c.id, t)}
                onDelete={() => onDelete(c.id)}
              />
            ))}
          </div>
        </div>
      )}
      {/* The "Ready when you are / What's the plan? / Voice or text, I propose,
          you approve" block that stood here was three lines of Mate
          introducing itself, every single time the sheet opened, between the
          user and the thing they came to use. The starters below say what it
          can do far better than a tagline does. */}
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
        Start with
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
        {STARTERS.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => onPick(s.prompt)}
            className={cn('group min-h-[76px] rounded-xl border border-white/[0.18] px-3 py-3 text-left transition-[background-image,background-color,border-color,transform] duration-150 touch-manipulation active:scale-[0.97] hover:border-elec-yellow/50 hover:from-white/[0.19] sm:px-3.5 sm:py-3.5', CARD_SURFACE)}
          >
            <p className="text-[13px] sm:text-[13.5px] font-semibold text-white leading-snug">
              {s.label}
            </p>
            <p className="mt-1 text-[11px] sm:text-[11.5px] text-white leading-snug">
              {s.outcome}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

const STARTERS: Array<{ label: string; outcome: string; prompt: string }> = [
  {
    label: 'Brief me on today',
    outcome: "What's pressing, what first",
    prompt:
      "Brief me on today — what's most pressing across my projects, tasks and customers, and what should I do first?",
  },
  {
    label: 'Plan my day',
    outcome: 'Routed, ordered, ready',
    prompt: 'Plan my day — group jobs by time and location, suggest the order.',
  },
  {
    label: 'Set up a new job',
    outcome: 'Customer + project + tasks',
    prompt:
      "I've got a new job — walk me through setting it up: customer, project, and the task list.",
  },
  {
    label: 'Ask the regs',
    outcome: 'BS 7671 answer, cited',
    prompt: 'What does BS 7671 say about RCD protection for sockets in domestic kitchens?',
  },
];
