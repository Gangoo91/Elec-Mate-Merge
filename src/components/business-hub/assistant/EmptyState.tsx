import { RecentChatRow } from './RecentChatRow';
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
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40 mb-2">
            Recent chats
          </p>
          <div className="space-y-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-xl bg-white/[0.02] border border-white/[0.04] px-3 py-2.5 animate-pulse"
              >
                <div className="h-3 bg-white/[0.08] rounded w-3/5 mb-2" />
                <div className="h-2 bg-white/[0.05] rounded w-16" />
              </div>
            ))}
          </div>
        </div>
      )}
      {recentChats.length > 0 && (
        <div className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40 mb-2">
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
      <div className="mb-5 sm:mb-6">
        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-elec-yellow mb-2.5">
          Ready when you are
        </p>
        <h3 className="text-[22px] sm:text-[26px] font-semibold leading-[1.1] tracking-tight">
          <span className="text-white">What's the</span>{' '}
          <span className="text-elec-yellow">plan?</span>
        </h3>
        <p className="text-[13px] sm:text-[13.5px] text-white/55 mt-2 max-w-[440px] leading-relaxed">
          Voice or text. I propose, you approve, it saves.
        </p>
      </div>

      {/* Starter cards — 2×2 mobile, 4-up desktop. Same pattern as the Business Hub landing. */}
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 mb-3">
        Start with
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
        {STARTERS.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => onPick(s.prompt)}
            className="group text-left rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.18] transition-colors px-3 sm:px-3.5 py-3 sm:py-3.5 touch-manipulation active:scale-[0.98] min-h-[72px]"
          >
            <p className="text-[13px] sm:text-[13.5px] font-semibold text-white leading-snug">
              {s.label}
            </p>
            <p className="mt-1 text-[11px] sm:text-[11.5px] text-white/45 leading-snug">
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
