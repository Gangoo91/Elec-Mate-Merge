import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { cardCn } from '@/components/shared/surfaceStyles';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  preferenceLabel,
  type StartDateRequest,
} from '@/hooks/useStartDateRequests';

const dayLabel = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

/** How long they have been waiting — the bit that makes this urgent. */
function waitingFor(iso: string | null): string | null {
  if (!iso) return null;
  const hours = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000);
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? 'yesterday' : `${days} days ago`;
}

/**
 * Clients waiting to hear whether their start date is accepted.
 *
 * Shown on the Booking page and the Calendar as well as Quotes, because it is
 * a diary question as much as a sales one — someone asking to start on the
 * 19th is asking about the 19th, and looking at the diary is when you would
 * think to answer.
 *
 * Confirming happens on the quote, so every row goes there rather than
 * duplicating the write path in three places.
 */
const StartDateRequestsCard = ({
  requests,
  isLoading,
  /** Hide entirely when there is nothing outstanding — this is an exception,
      not a permanent section. */
  hideWhenEmpty = true,
}: {
  requests: StartDateRequest[];
  isLoading?: boolean;
  hideWhenEmpty?: boolean;
}) => {
  const navigate = useNavigate();

  if (hideWhenEmpty && !isLoading && requests.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">
          Start dates to confirm
        </h2>
        {requests.length > 0 && (
          <span className="text-[13px] font-semibold text-elec-yellow tabular-nums">
            {requests.length} waiting
          </span>
        )}
      </div>

      <div className={cn(cardCn, 'divide-y divide-white/[0.08] overflow-hidden p-0')}>
        {isLoading && (
          <p className="px-4 py-6 text-center text-[13px] text-white">Checking…</p>
        )}

        {!isLoading && requests.length === 0 && (
          <p className="px-4 py-6 text-center text-[13px] text-white">
            Nobody is waiting on a start date.
          </p>
        )}

        {!isLoading &&
          requests.map((r) => {
            const waited = waitingFor(r.requested_at);
            return (
              <div key={r.id} className="px-4 py-3.5 sm:px-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="min-w-0 flex-1 truncate text-[15px] font-semibold tracking-tight text-white">
                    {r.client_name}
                  </p>
                  <p className="shrink-0 text-[13px] font-semibold text-elec-yellow tabular-nums">
                    {dayLabel(r.requested_start_date)}
                  </p>
                </div>

                <p className="mt-0.5 truncate text-[12px] text-white">
                  Wants {preferenceLabel(r.requested_time_preference)}
                  {r.quote_number ? ` · ${r.quote_number}` : ''}
                  {waited ? ` · asked ${waited}` : ''}
                </p>

                {r.client_address && (
                  <p className="mt-0.5 truncate text-[12px] text-white">{r.client_address}</p>
                )}

                <div className="mt-2 flex flex-wrap gap-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/electrician/quotes')}
                    className="min-h-11 text-[13px] font-semibold text-elec-yellow transition-opacity hover:opacity-80 touch-manipulation"
                  >
                    Confirm
                  </button>
                  {r.client_phone && (
                    <button
                      type="button"
                      onClick={() =>
                        openExternalUrl(`tel:${r.client_phone!.replace(/[^\d+]/g, '')}`)
                      }
                      className="min-h-11 text-[13px] font-semibold text-elec-yellow transition-opacity hover:opacity-80 touch-manipulation"
                    >
                      Ring them
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default StartDateRequestsCard;
