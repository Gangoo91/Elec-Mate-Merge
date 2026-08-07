import { useState } from 'react';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
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
      // Brightness to the shared card recipe: a /[0.18] border over a
      // /[0.12]→/[0.06] gradient. These rows sat at /[0.03] over /[0.06] and
      // were effectively invisible on a phone in daylight.
      //
      // The most-recent row marks itself with a VOLT BORDER, not a volt wash.
      // `bg-elec-yellow/[0.06]` goes muddy brown on this ground — every
      // translucent volt does, which is why that row read as olive.
      className={cn(
        'group flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-colors',
        CARD_SURFACE,
        emphasis
          ? 'border-elec-yellow/50 hover:border-elec-yellow'
          : 'border-white/[0.18] hover:border-elec-yellow/40 hover:from-white/[0.16]'
      )}
    >
      <button
        type="button"
        onClick={editing ? undefined : onResume}
        className="min-h-11 flex-1 min-w-0 text-left touch-manipulation"
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
            className="h-11 w-full rounded-lg border border-white/[0.18] bg-white/[0.08] px-2.5 text-[16px] text-white focus:border-elec-yellow focus:outline-none focus:ring-0"
          />
        ) : (
          <p className="truncate text-[13px] font-semibold leading-snug text-white">
            {chat.title || 'Untitled chat'}
          </p>
        )}
        <p className="mt-0.5 text-[11px] text-white">{ago}</p>
      </button>
      {!editing && (
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/[0.10] touch-manipulation"
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
              className="h-11 rounded-lg bg-red-500/90 px-3 text-[11px] font-bold uppercase tracking-wider text-white touch-manipulation"
            >
              Sure?
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              onBlur={() => setConfirmingDelete(false)}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-red-500/15 hover:text-red-300 touch-manipulation"
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
