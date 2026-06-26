import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow, Pill, PrimaryButton, textareaClass } from '@/components/employer/editorial';
import { useEmployerClientMessages } from '@/hooks/useEmployerClientMessages';

/* ==========================================================================
   ClientMessagesPanel — the employer's side of a client-portal conversation.
   Shows the thread (client + employer messages), lets the owner reply, and
   marks the client's messages read on open. Lives in the portal detail sheet.
   ========================================================================== */

export function ClientMessagesPanel({ token, jobId }: { token: string; jobId?: string | null }) {
  const { messages, unread, reply, markRead } = useEmployerClientMessages(token, jobId);
  const [body, setBody] = useState('');

  // Clear the unread flag once the employer is looking at the thread.
  useEffect(() => {
    if (unread > 0 && !markRead.isPending) markRead.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unread]);

  const send = async () => {
    if (!body.trim()) return;
    await reply.mutateAsync(body.trim());
    setBody('');
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Eyebrow>Client messages</Eyebrow>
        {unread > 0 && <Pill tone="purple">{unread} new</Pill>}
      </div>

      {messages.length === 0 ? (
        <p className="text-sm text-white/50">
          No messages yet — your client can message you from their portal link.
        </p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                'rounded-lg px-3 py-2 text-sm',
                m.sender_type === 'employer'
                  ? 'bg-elec-yellow/10 ml-6 text-white'
                  : 'bg-white/[0.04] mr-6 text-white/90'
              )}
            >
              <p className="whitespace-pre-wrap">{m.message}</p>
              <p className="text-[10px] text-white/40 mt-1">
                {m.sender_type === 'employer' ? 'You' : 'Client'} ·{' '}
                {new Date(m.created_at).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                })}
              </p>
            </div>
          ))}
        </div>
      )}

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Reply to your client…"
        rows={2}
        className={textareaClass}
      />
      <PrimaryButton onClick={send} disabled={!body.trim() || reply.isPending}>
        {reply.isPending ? 'Sending…' : 'Reply'}
      </PrimaryButton>
    </div>
  );
}

export default ClientMessagesPanel;
