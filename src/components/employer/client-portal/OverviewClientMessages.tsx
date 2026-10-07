import { useSearchParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useClientMessageInbox } from '@/hooks/useCustomerPortal';

/* ==========================================================================
   Overview: client messages waiting for a reply (ELE-1996). Renders nothing
   until a client has written and nobody has read it, so a quiet morning
   stays quiet. Each row opens the client's record at the message thread.
   ========================================================================== */

const ago = (d: string) => {
  const mins = Math.round((Date.now() - new Date(d).getTime()) / 60_000);
  if (mins < 60) return `${Math.max(1, mins)} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? '' : 's'} ago`;
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

export function OverviewClientMessages() {
  const [, setSearchParams] = useSearchParams();
  const { data: inbox = [] } = useClientMessageInbox();
  const waiting = inbox.filter((t) => t.unread > 0);
  if (waiting.length === 0) return null;

  const open = (customerId: string) =>
    setSearchParams({ section: 'clients', client: customerId, tab: 'messages' });

  return (
    <section>
      <div className="flex items-end justify-between gap-3 mb-3">
        <div className="flex min-w-0 items-baseline gap-2">
          <h2 className="text-[16px] font-semibold tracking-tight text-white">Client messages</h2>
          <span className="text-[13px] text-white">{waiting.length} waiting</span>
        </div>
        <button
          type="button"
          onClick={() => setSearchParams({ section: 'clientportal' })}
          className="h-11 -my-3 flex shrink-0 items-center gap-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
        >
          All
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
        <ul className="divide-y divide-white/[0.07]">
          {waiting.slice(0, 4).map((t) => (
            <li key={t.customer_id}>
              <button
                type="button"
                onClick={() => open(t.customer_id)}
                className="w-full min-h-11 flex items-center gap-3 px-4 py-3.5 sm:px-5 text-left touch-manipulation hover:bg-white/[0.04]"
              >
                <span
                  aria-hidden
                  className="h-9 w-9 shrink-0 rounded-full bg-purple-500 text-white flex items-center justify-center text-[13px] font-bold tabular-nums"
                >
                  {t.unread}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-white truncate">
                    {t.customer_name}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-white truncate">
                    {t.last_message}
                  </span>
                </span>
                <span className="shrink-0 text-[12px] text-white">{ago(t.last_at)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default OverviewClientMessages;
