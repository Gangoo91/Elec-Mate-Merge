/**
 * ELE-1994: public tenders that fit what the firm bids for, newest first,
 * with "Start bid" one tap away. Without criteria it asks for them once.
 *
 * Drawn the Overview way (8 Oct): a 16px panel title above one panel of
 * divided rows, each with a 15px title, one detail line and one action.
 */
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { panel, PanelTitle, StatusPill } from '@/components/employer/pageParts/PageParts';
import {
  regionLabel,
  sourceLabel,
  type TenderMatch,
  type TenderMatches,
} from '@/hooks/useTenderMatches';

const gbp = (n: number) =>
  n >= 1_000_000
    ? `£${(n / 1_000_000).toFixed(1)}m`
    : n >= 1000
      ? `£${Math.round(n / 1000)}k`
      : `£${Math.round(n)}`;

const closes = (d: string | null): { text: string; soon: boolean } => {
  if (!d) return { text: 'No closing date given', soon: false };
  const days = Math.ceil((new Date(d).getTime() - Date.now()) / 86_400_000);
  const date = new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  return days <= 7
    ? { text: `Closes ${date} (${days <= 0 ? 'today' : `${days} days`})`, soon: true }
    : { text: `Closes ${date}`, soon: false };
};

// Judged server-side on when the feed first carried it (sources re-stamp
// published_at on every sync, which made the same tenders "new" for ever)
const isNew = (m: TenderMatch) => !!m.is_new && !m.tracked;

const quietBtn =
  'h-11 shrink-0 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation hover:bg-white/[0.1]';

interface Props {
  data: TenderMatches | undefined;
  isLoading: boolean;
  error?: unknown;
  startingId: string | null;
  onStart: (m: TenderMatch) => void;
  onEditCriteria: () => void;
  onDiscover: () => void;
  onShowAll: () => void;
}

export function TenderMatchesCard({
  data,
  isLoading,
  error,
  startingId,
  onStart,
  onEditCriteria,
  onDiscover,
  onShowAll,
}: Props) {
  if (isLoading) {
    return (
      <section>
        <PanelTitle title="Matches for you" />
        <div
          className={cn(panel, 'flex items-center gap-2 px-4 py-4 text-[14px] text-white sm:px-5')}
        >
          <Loader2 className="h-4 w-4 animate-spin" /> Finding tenders that fit
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <PanelTitle title="Matches for you" />
        <div className={cn(panel, 'px-4 py-4 sm:px-5')}>
          <p className="text-[15px] font-semibold text-white">Couldn't load your matches</p>
          <p className="mt-0.5 text-[13px] text-white">
            Check your connection, then refresh the page.
          </p>
        </div>
      </section>
    );
  }

  if (!data?.has_criteria) {
    return (
      <section>
        <PanelTitle title="Matches for you" />
        <div className={cn(panel, 'px-4 py-4 sm:px-5 sm:py-5')}>
          <p className="text-[15px] font-semibold text-white">Tell us what you bid for</p>
          <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-white">
            Where you work, the kind of work and the contract size. New public tenders that fit then
            show up here, on Overview and in a Monday round-up, so nobody has to go looking.
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onEditCriteria}
              className="h-11 flex-1 rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation sm:flex-none"
            >
              Set what we bid for
            </button>
            <button
              type="button"
              onClick={onDiscover}
              className={cn(quietBtn, 'flex-1 sm:flex-none')}
            >
              Browse all
            </button>
          </div>
        </div>
      </section>
    );
  }

  const items = data.items ?? [];
  const meta = [`${data.total} open`, data.new_this_week > 0 ? `${data.new_this_week} new` : null]
    .filter(Boolean)
    .join(', ');

  return (
    <section>
      <PanelTitle title="Matches for you" meta={meta} action="Change" onAction={onEditCriteria} />
      <div className={cn(panel, 'overflow-hidden')}>
        {items.length === 0 ? (
          <div className="flex flex-col items-start gap-3 px-4 py-4 sm:px-5">
            <p className="text-[14px] leading-snug text-white">
              Nothing open that fits right now. New tenders are checked every morning. Widen the
              distance or regions to see more.
            </p>
            <button type="button" onClick={onEditCriteria} className={quietBtn}>
              Change what we bid for
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.07]">
            {items.map((m) => {
              // Some sources append "Estimated value …" to the place name
              const place = (m.location_text || '').replace(/\s*Estimated value.*$/i, '').trim();
              // A bare NUTS code ("UKJ4") means nothing to a person; use the region
              const where =
                (place && !/^UK[A-Z0-9]{1,4}$/.test(place) ? place : null) || regionLabel(m.region);
              // Under £100 is a placeholder in the notice, not a contract value
              // (office managers get no value at all from the server)
              const value =
                data.can_see_money !== false && m.value && Number(m.value) >= 100
                  ? gbp(Number(m.value))
                  : null;
              const detail = [
                m.client_name,
                where,
                m.miles != null ? `${m.miles} mi` : null,
                sourceLabel(m.source),
              ]
                .filter(Boolean)
                .join(' · ');
              const c = closes(m.deadline);
              return (
                <li key={m.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                  <div className="min-w-0 flex-1">
                    {/* A tender title is the whole story: two lines, never cut to one */}
                    <p
                      className="line-clamp-2 text-[15px] font-semibold leading-snug text-white"
                      title={m.title}
                    >
                      {m.title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-[13px] text-white">{detail}</p>
                    <p className="mt-0.5 text-[12.5px] font-medium">
                      <span className={c.soon ? 'text-elec-yellow' : 'text-white'}>{c.text}</span>
                      {value && <span className="text-white"> · {value}</span>}
                      {isNew(m) && <span className="text-emerald-400"> · New this week</span>}
                    </p>
                  </div>
                  {m.tracked ? (
                    <StatusPill>In your pipeline</StatusPill>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onStart(m)}
                      disabled={startingId === m.id}
                      className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation disabled:opacity-60"
                    >
                      {startingId === m.id && <Loader2 className="h-4 w-4 animate-spin" />}
                      Start bid
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {data.total > items.length && items.length < 100 && (
          <button
            type="button"
            onClick={onShowAll}
            className="h-12 w-full border-t border-white/[0.07] text-[14px] font-semibold text-elec-yellow touch-manipulation"
          >
            {data.total > 100 ? 'Show the top 100' : `Show all ${data.total}`}
          </button>
        )}
      </div>
    </section>
  );
}
