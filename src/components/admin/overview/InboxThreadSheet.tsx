/**
 * Reply without leaving the overview.
 *
 * The "waiting on you" queue is only useful if it can be cleared from where
 * it is seen. Tapping a message opens the whole conversation in a bottom
 * sheet, marks it read, and takes a reply. Same table, same insert shape as
 * the Messages page, so a reply here is indistinguishable from one sent there.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminInbox, ADMIN_INBOX_QUERY_KEY } from '@/hooks/useAdminInbox';
import { useHaptic } from '@/hooks/useHaptic';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { getInitials } from '@/utils/adminUtils';
import { RoundAvatar } from './primitives';

const when = (iso: string) => {
  const d = new Date(iso);
  const today = new Date().toDateString() === d.toDateString();
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return today
    ? `Today, ${time}`
    : `${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}, ${time}`;
};

export default function InboxThreadSheet({
  partner,
  open,
  onOpenChange,
}: {
  partner: { id: string; name: string } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const { data: conversations } = useAdminInbox(open);
  const [draft, setDraft] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const conversation = useMemo(
    () => conversations?.find((c) => c.partnerId === partner?.id) ?? null,
    [conversations, partner?.id]
  );
  const messages = useMemo(
    () =>
      [...(conversation?.messages ?? [])].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ),
    [conversation]
  );

  // Opening the thread is reading it.
  useEffect(() => {
    if (!open || !conversation) return;
    const unread = conversation.messages
      .filter((m) => !m.read_at && m.sender_id === partner?.id)
      .map((m) => m.id);
    if (unread.length === 0) return;
    supabase
      .from('admin_messages')
      .update({ read_at: new Date().toISOString() })
      .in('id', unread)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ADMIN_INBOX_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: ['admin-support-inbox'] });
        queryClient.invalidateQueries({ queryKey: ['admin-pending-counts'] });
      });
  }, [open, conversation, partner?.id, queryClient]);

  useEffect(() => {
    if (open) setTimeout(() => bottomRef.current?.scrollIntoView({ block: 'end' }), 50);
  }, [open, messages.length]);

  const send = useMutation({
    mutationFn: async (message: string) => {
      if (!partner) throw new Error('No recipient');
      const { error } = await supabase.from('admin_messages').insert({
        sender_id: user?.id,
        recipient_id: partner.id,
        subject: 'Reply',
        message,
        message_type: 'in_app',
      });
      if (error) throw error;
    },
    onSuccess: () => {
      haptic.success();
      setDraft('');
      queryClient.invalidateQueries({ queryKey: ADMIN_INBOX_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['admin-support-inbox'] });
    },
    onError: (e: Error) => {
      haptic.error();
      toast({ title: 'Failed to send', description: e.message, variant: 'destructive' });
    },
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex h-full flex-col bg-background">
          <SheetHeader className="border-b border-white/[0.1] px-4 py-3 text-left">
            <div className="flex items-center gap-3">
              <RoundAvatar initials={getInitials(partner?.name ?? null)} />
              <div className="min-w-0">
                <SheetTitle className="truncate text-[15px] font-semibold text-white">
                  {partner?.name ?? 'Conversation'}
                </SheetTitle>
                <div className="text-[12px] text-white">
                  {messages.length} {messages.length === 1 ? 'message' : 'messages'}
                </div>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="py-10 text-center text-[13px] text-white">Loading the thread…</div>
            )}
            {messages.map((m) => {
              const mine = m.sender_id !== partner?.id;
              return (
                <div key={m.id} className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-5 text-white',
                      mine
                        ? 'rounded-br-md bg-elec-yellow/[0.16]'
                        : 'rounded-bl-md bg-white/[0.08]'
                    )}
                  >
                    {m.subject && m.subject !== 'Reply' && m.subject !== 'Support Request' && (
                      <div className="mb-1 text-[12px] font-semibold">{m.subject}</div>
                    )}
                    <div className="whitespace-pre-wrap break-words">{m.message}</div>
                    <div className="mt-1 text-[11px] text-white">{when(m.created_at)}</div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <form
            className="border-t border-white/[0.1] px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3"
            onSubmit={(e) => {
              e.preventDefault();
              const text = draft.trim();
              if (text && !send.isPending) send.mutate(text);
            }}
          >
            <div className="flex items-end gap-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    const text = draft.trim();
                    if (text && !send.isPending) send.mutate(text);
                  }
                }}
                placeholder={`Reply to ${partner?.name?.split(' ')[0] ?? 'them'}…`}
                rows={2}
                className="input-underline min-h-11 flex-1 resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white caret-elec-yellow placeholder:text-white/25 focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 touch-manipulation"
              />
              <button
                type="submit"
                disabled={!draft.trim() || send.isPending}
                className="h-11 shrink-0 touch-manipulation rounded-lg bg-elec-yellow px-4 text-[14px] font-semibold text-black transition-opacity disabled:opacity-50"
              >
                {send.isPending ? 'Sending…' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
