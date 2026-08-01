/**
 * AdminInboxPanel — the support inbox, rendered inside the Messages sheet.
 *
 * ELE-1415/1417. Opening the Admin tab as an admin previously showed only your
 * own thread with "admin", because the sheet used the customer-side hook. An
 * admin saw the product as a customer and could not read anything users had
 * sent in. This renders the real inbox in that tab: every user conversation,
 * ordered by what needs answering, opening into the shared ChatThread.
 */

import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Archive, ArrowLeft, Inbox, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import ChatThread from './ChatThread';
import {
  useAdminInbox,
  useArchiveConversation,
  sortAdminConversations,
  ADMIN_INBOX_QUERY_KEY,
  type AdminConversation,
} from '@/hooks/useAdminInbox';
import { SwipeableRow } from '@/components/ui/swipeable-row';

function initials(name: string | null | undefined) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function relativeTime(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
}

export function AdminInboxPanel() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const { data: conversations, isLoading } = useAdminInbox();
  const [openPartnerId, setOpenPartnerId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const list = useMemo(() => {
    const all = conversations ?? [];
    const q = search.trim().toLowerCase();
    const filtered = q
      ? all.filter(
          (c) =>
            c.partner?.full_name?.toLowerCase().includes(q) ||
            c.messages.some((m) => m.message?.toLowerCase().includes(q))
        )
      : all;
    return sortAdminConversations(filtered);
  }, [conversations, search]);

  // Derived from live data, never a captured snapshot — see ELE-1416.
  const open: AdminConversation | null =
    conversations?.find((c) => c.partnerId === openPartnerId) ?? null;

  const sendReply = useMutation({
    mutationFn: async ({ recipientId, message }: { recipientId: string; message: string }) => {
      const { error } = await supabase.from('admin_messages').insert({
        sender_id: user?.id,
        recipient_id: recipientId,
        subject: 'Reply',
        message,
        message_type: 'in_app',
      });
      if (error) throw error;
      // Push + email are handled server-side by the notify-message edge
      // function via the admin_messages INSERT trigger — no double-send here.
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ADMIN_INBOX_QUERY_KEY }),
    onError: (e: Error) =>
      toast({ title: 'Could not send', description: e.message, variant: 'destructive' }),
  });

  const markRead = useMutation({
    mutationFn: async (ids: string[]) => {
      if (!ids.length) return;
      await supabase
        .from('admin_messages')
        .update({ read_at: new Date().toISOString() })
        .in('id', ids);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ADMIN_INBOX_QUERY_KEY }),
  });

  const archive = useArchiveConversation();

  // Swipe-to-archive with an undo toast. The row is hidden, not deleted, so an
  // accidental swipe on a phone costs nothing and the support record survives.
  const archiveConversation = (conv: AdminConversation) => {
    const ids = conv.messages.map((m) => m.id);
    const name = conv.partner?.full_name || 'Conversation';
    if (openPartnerId === conv.partnerId) setOpenPartnerId(null);
    archive.mutate(
      { messageIds: ids, archived: true },
      {
        onSuccess: () =>
          toast({
            title: `${name} archived`,
            description: 'Hidden from the inbox. Nothing was deleted.',
            action: (
              <ToastAction
                altText="Undo archive"
                onClick={() => archive.mutate({ messageIds: ids, archived: false })}
              >
                Undo
              </ToastAction>
            ),
          }),
        onError: (e: Error) =>
          toast({ title: 'Could not archive', description: e.message, variant: 'destructive' }),
      }
    );
  };

  const openConversation = (conv: AdminConversation) => {
    setOpenPartnerId(conv.partnerId);
    const unread = conv.messages
      .filter((m) => !!m.recipient?.admin_role && !m.read_at)
      .map((m) => m.id);
    if (unread.length) markRead.mutate(unread);
  };

  // ── Thread view ─────────────────────────────────────────────────────────
  if (open) {
    return (
      <div className="flex flex-col h-full min-h-0">
        <div className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-white/[0.10]">
          <button
            type="button"
            onClick={() => setOpenPartnerId(null)}
            aria-label="Back to inbox"
            className="h-11 w-11 -ml-2 shrink-0 rounded-xl flex items-center justify-center text-white touch-manipulation active:bg-white/[0.06]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="h-10 w-10 shrink-0 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-[13px] font-semibold text-white">
            {initials(open.partner?.full_name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold tracking-tight text-white truncate">
              {open.partner?.full_name || 'Unknown user'}
            </p>
            {open.partner?.role && (
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/60 capitalize">
                {open.partner.role}
              </p>
            )}
          </div>
        </div>

        {/* ELE-1450 — ChatThread's root is `h-full`, which as a flex child here
            claims the whole column *on top of* the header above it, pushing the
            composer past the fold so the last message sits under it. flex-1
            makes it take the remaining space instead. */}
        <ChatThread
          className="flex-1 min-h-0"
          messages={open.messages.map((m) => ({
            id: m.id,
            body: m.message,
            createdAt: m.created_at,
            // Own SIDE, not "me": the inbox is shared by several admins.
            isOwn: m.sender_id !== open.partnerId,
            readAt: m.read_at,
            system: m.message_type === 'system_ack',
            // Attribute a colleague's reply so it does not read as yours.
            authorLabel:
              m.sender_id !== open.partnerId && m.sender_id !== user?.id
                ? (m.sender?.full_name ?? 'Team')
                : undefined,
          }))}
          // mutateAsync so ChatThread can mark the bubble if the send fails.
          onSend={(body) => sendReply.mutateAsync({ recipientId: open.partnerId, message: body })}
          isSending={sendReply.isPending}
          placeholder="Write a reply…"
        />
      </div>
    );
  }

  // ── Inbox list ──────────────────────────────────────────────────────────
  const awaiting = list.filter((c) => c.awaitingReply).length;

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="shrink-0 px-4 pt-3 pb-2 space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/60">
            Support inbox
          </p>
          {awaiting > 0 && (
            <span className="text-[11px] font-semibold text-elec-yellow tabular-nums">
              {awaiting} awaiting reply
            </span>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people or messages"
            autoCapitalize="none"
            autoCorrect="off"
            className="w-full h-11 rounded-xl bg-white/[0.06] border border-white/[0.12] pl-9 pr-3 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
        {isLoading ? (
          <div className="space-y-2 pt-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[72px] rounded-2xl bg-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : list.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <div className="h-14 w-14 rounded-2xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center mb-4">
              <Inbox className="h-6 w-6 text-white/50" />
            </div>
            <p className="text-[15px] font-semibold text-white">
              {search ? 'No matches' : 'Nothing waiting'}
            </p>
            <p className="mt-1 text-[13px] text-white/60 max-w-[240px]">
              {search
                ? 'No conversations match that search.'
                : 'When a user messages support, the conversation appears here.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {list.map((conv) => {
              const needsYou = conv.awaitingReply;
              const preview =
                conv.lastMessage.message.length > 90
                  ? conv.lastMessage.message.slice(0, 87) + '…'
                  : conv.lastMessage.message;
              return (
                <SwipeableRow
                  key={conv.partnerId}
                  className="rounded-2xl"
                  contentClassName="bg-transparent"
                  // Swipe is touch-only; on desktop the hover button below is
                  // the affordance. Wiring both everywhere just adds a gesture
                  // that silently does nothing with a mouse.
                  rightAction={
                    isMobile
                      ? {
                          icon: <Archive className="h-4 w-4" />,
                          label: 'Archive',
                          onClick: () => archiveConversation(conv),
                          variant: 'destructive',
                        }
                      : undefined
                  }
                >
                  {/* role=button rather than a <button>, so the Archive control
                      can be a real button inside it — nesting buttons is invalid
                      HTML and breaks keyboard behaviour. */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => openConversation(conv)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openConversation(conv);
                      }
                    }}
                    className={cn(
                      'group relative w-full text-left flex items-start gap-3 rounded-2xl border p-3.5 cursor-pointer touch-manipulation transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60',
                      needsYou
                        ? 'bg-elec-yellow/[0.07] border-elec-yellow/30'
                        : 'bg-white/[0.04] border-white/[0.10] hover:bg-white/[0.07] active:bg-white/[0.07]'
                    )}
                  >
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-white/[0.07] border border-white/[0.12] flex items-center justify-center text-[12.5px] font-semibold text-white">
                      {initials(conv.partner?.full_name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <p
                          className={cn(
                            'text-[14px] tracking-tight text-white truncate',
                            needsYou || conv.unreadCount > 0 ? 'font-semibold' : 'font-medium'
                          )}
                        >
                          {conv.partner?.full_name || 'Unknown user'}
                        </p>
                        <span className="ml-auto shrink-0 text-[11px] tabular-nums text-white/50">
                          {relativeTime(new Date(conv.lastMessage.created_at))}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[12.5px] leading-snug text-white/75 line-clamp-2">
                        {/* Say who spoke last, or your own reply reads as theirs. */}
                        {!needsYou && conv.hasAdminReply && (
                          <span className="text-white/45">You: </span>
                        )}
                        {preview}
                      </p>
                      {needsYou && (
                        <span className="mt-1.5 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
                          Awaiting reply
                        </span>
                      )}
                    </div>

                    {/* Desktop archive. SwipeableRow is touch-only, so without
                        this there is no way to archive with a mouse. Rendered
                        conditionally rather than hidden by a media-query class:
                        the arbitrary Tailwind variant for pointer:fine did not
                        compile, so the control silently never appeared. */}
                    {!isMobile && (
                    <button
                      type="button"
                      aria-label={`Archive conversation with ${conv.partner?.full_name || 'user'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        archiveConversation(conv);
                      }}
                      className={cn(
                        'absolute right-2 top-2 h-8 w-8 rounded-lg flex items-center justify-center',
                        'opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
                        'bg-white/[0.08] hover:bg-white/[0.14] text-white/70 hover:text-white',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60 transition'
                      )}
                    >
                      <Archive className="h-3.5 w-3.5" />
                    </button>
                    )}
                  </div>
                </SwipeableRow>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminInboxPanel;
