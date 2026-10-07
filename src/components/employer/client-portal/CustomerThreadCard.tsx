import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  ListCard,
  ListCardHeader,
  Pill,
  PrimaryButton,
  LoadingBlocks,
  textareaClass,
} from '@/components/employer/editorial';
import {
  useCustomerMessages,
  useCustomerPortal,
  useMarkCustomerMessagesRead,
  useReplyToCustomer,
} from '@/hooks/useCustomerPortal';

/* ==========================================================================
   CustomerThreadCard: the firm's side of the conversation with one client.
   Lives on the client record, so messages are reachable whether or not a
   portal link was ever shared. Replies show on the client's portal.
   ========================================================================== */

const stamp = (d: string) =>
  new Date(d).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

export function CustomerThreadCard({
  customerId,
  customerName,
  autoFocus,
}: {
  customerId: string;
  customerName: string;
  autoFocus?: boolean;
}) {
  const { data: messages = [], isLoading } = useCustomerMessages(customerId);
  const { data: portal } = useCustomerPortal(customerId);
  const reply = useReplyToCustomer(customerId);
  const markRead = useMarkCustomerMessagesRead(customerId);
  const [body, setBody] = useState('');
  const threadRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const unread = messages.filter((m) => m.sender_type === 'client' && !m.read_at).length;

  // Opening the client record with the thread on screen counts as reading it.
  useEffect(() => {
    if (unread > 0 && !markRead.isPending) markRead.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unread]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [messages.length]);

  useEffect(() => {
    if (autoFocus) cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [autoFocus]);

  const send = async () => {
    const text = body.trim();
    if (!text) return;
    try {
      await reply.mutateAsync(text);
      setBody('');
    } catch (e) {
      // Keep the draft; say why it did not go.
      toast({
        title: "Message didn't send",
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const live = !!portal?.link?.usable;

  return (
    <div ref={cardRef} className="scroll-mt-4">
      <ListCard>
        <ListCardHeader
          tone="purple"
          title="Messages"
          meta={
            unread > 0 ? (
              <Pill tone="purple">{unread} new</Pill>
            ) : messages.length > 0 ? (
              <Pill tone="cyan">{messages.length}</Pill>
            ) : undefined
          }
        />
        <div className="p-4 sm:p-5 space-y-3">
          {isLoading ? (
            <LoadingBlocks />
          ) : messages.length === 0 ? (
            <p className="text-[13px] leading-relaxed text-white">
              No messages yet. {customerName} can message you from their portal page, and anything
              you write here shows there.
            </p>
          ) : (
            <div
              ref={threadRef}
              className="space-y-2 max-h-80 overflow-y-auto overscroll-contain pr-1"
            >
              {messages.map((m) => {
                const mine = m.sender_type === 'employer';
                return (
                  <div key={m.id} className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
                    <div
                      className={cn(
                        'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[14px] text-white',
                        mine
                          ? 'bg-[hsl(0_0%_20%)] rounded-br-md'
                          : 'bg-[hsl(0_0%_15%)] border border-white/[0.08] rounded-bl-md'
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words leading-relaxed">{m.message}</p>
                      <p className="mt-1 text-[11px] text-white">
                        {mine ? m.sender_name || 'Office' : customerName} · {stamp(m.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!live && (
            <p className="text-[12px] text-white">
              {portal?.link
                ? 'Their portal link is paused or expired, so they will see replies once it is back on.'
                : 'They will see your replies when you share their portal link.'}
            </p>
          )}

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`Write to ${customerName}…`}
            rows={3}
            maxLength={4000}
            className={textareaClass}
          />
          <PrimaryButton onClick={send} disabled={!body.trim() || reply.isPending} fullWidth>
            {reply.isPending ? 'Sending…' : 'Send'}
          </PrimaryButton>
        </div>
      </ListCard>
    </div>
  );
}

export default CustomerThreadCard;
