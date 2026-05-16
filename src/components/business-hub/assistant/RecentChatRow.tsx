import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Pencil, Trash2 } from 'lucide-react';
import type { RecentChat } from './types';
import { timeAgo } from './helpers';

export function RecentChatRow({
  chat,
  emphasis,
  onResume,
  onRename,
  onDelete,
}: {
  chat: RecentChat;
  emphasis: boolean;
  onResume: () => void;
  onRename: (newTitle: string) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const ago = timeAgo(chat.lastMessageAt);

  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-xl px-3 py-2.5 transition-colors',
        emphasis
          ? 'bg-elec-yellow/[0.06] border border-elec-yellow/20 hover:border-elec-yellow/35'
          : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05]'
      )}
    >
      <button
        type="button"
        onClick={editing ? undefined : onResume}
        className="flex-1 min-w-0 text-left touch-manipulation"
      >
        {editing ? (
          <input
            autoFocus
            type="text"
            defaultValue={chat.title || ''}
            onBlur={(e) => {
              const v = e.currentTarget.value.trim();
              if (v && v !== chat.title) onRename(v);
              setEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const v = (e.currentTarget as HTMLInputElement).value.trim();
                if (v && v !== chat.title) onRename(v);
                setEditing(false);
              } else if (e.key === 'Escape') {
                setEditing(false);
              }
            }}
            className="w-full bg-white/[0.06] border border-white/[0.12] rounded-md px-2 py-0.5 text-[13px] text-white focus:outline-none focus:ring-2 focus:ring-elec-yellow/40"
          />
        ) : (
          <p
            className={cn(
              'text-[13px] font-semibold leading-snug truncate',
              emphasis ? 'text-white' : 'text-white/85'
            )}
          >
            {chat.title || 'Untitled chat'}
          </p>
        )}
        <p className="text-[10px] text-white/40 mt-0.5">{ago}</p>
      </button>
      {!editing && (
        <div className="flex items-center gap-0.5 opacity-40 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="h-7 w-7 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] touch-manipulation"
            aria-label="Rename"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          {confirmingDelete ? (
            <button
              type="button"
              onClick={() => {
                onDelete();
                setConfirmingDelete(false);
              }}
              className="h-7 px-2 rounded-md text-[10px] font-bold uppercase tracking-wider bg-red-500/90 text-white touch-manipulation"
            >
              Sure?
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              onBlur={() => setConfirmingDelete(false)}
              className="h-7 w-7 rounded-md flex items-center justify-center text-white/40 hover:text-red-300 hover:bg-red-500/10 touch-manipulation"
              aria-label="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
