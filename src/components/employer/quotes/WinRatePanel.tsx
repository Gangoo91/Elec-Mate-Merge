import { useState } from 'react';
import FormSheet from '@/components/forms/FormSheet';
import {
  panel,
  PanelTitle,
  Rows,
  Row,
  KeyValue,
  Segments,
  PlainEmpty,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { useQuoteWinRate, winPct, type WinRateGroup } from '@/hooks/useQuotesThatWin';
import { decidedCount, WIN_RATE_DEFINITION } from '@/utils/winRate';

/* ELE-2073 win rate: quotes sent and won, by job type, month and person, with
   the average value. Owner and admins only: get_firm_quote_win_rate refuses
   everyone else, and then this panel renders nothing. */

const money = (n: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(n || 0);

const monthLabel = (key: string) => {
  const d = new Date(`${key}-15T12:00:00`);
  return Number.isNaN(d.getTime())
    ? key
    : d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
};

function groupDetail(g: WinRateGroup) {
  return [
    `${g.won} won of ${g.sent} sent`,
    g.lost ? `${g.lost} declined` : null,
    g.expired ? `${g.expired} expired` : null,
    g.open ? `${g.open} waiting` : null,
    g.sent ? `average ${money(g.avg_value)}` : null,
  ]
    .filter(Boolean)
    .join(' · ');
}

export function WinRatePanel() {
  const { data, error } = useQuoteWinRate(12);
  const [open, setOpen] = useState(false);
  const [by, setBy] = useState<'type' | 'month' | 'person'>('type');
  if (error || !data) return null;
  const all = data.all;
  const topTypes = data.by_type.slice(0, 3);
  const groups =
    by === 'type' ? data.by_type : by === 'month' ? [...data.by_month].reverse() : data.by_person;

  return (
    <section>
      <PanelTitle
        title="Win rate"
        meta={all && decidedCount(all) ? `${winPct(all)}% over 12 months` : undefined}
        action={all ? 'Breakdown' : undefined}
        onAction={() => setOpen(true)}
      />
      <div className={cn(panel, 'overflow-hidden')}>
        {all && all.sent > 0 ? (
          <Rows>
            <KeyValue label="Quotes won" value={`${all.won} of ${all.sent} sent`} />
            <KeyValue label="Average quote" value={money(all.avg_value)} />
            {topTypes.map((g) => (
              <KeyValue
                key={g.key}
                label={g.key}
                value={decidedCount(g) ? `${winPct(g)}% of ${decidedCount(g)} decided` : 'None decided'}
              />
            ))}
          </Rows>
        ) : (
          <PlainEmpty bare text="Once you have sent a few quotes, how many you win shows here." />
        )}
      </div>

      <FormSheet
        open={open}
        onOpenChange={setOpen}
        width="wide"
        eyebrow="Quotes"
        title="Win rate"
        description={
          all
            ? `${all.won} of ${all.sent} quotes won since ${new Date(`${data.from}T12:00:00`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}, ${money(all.won_value)} of ${money(all.sent_value)} quoted. Won means the customer accepted it or you marked it approved. ${WIN_RATE_DEFINITION}`
            : undefined
        }
        subheader={
          <div className="pb-3">
            <Segments
              items={[
                { value: 'type', label: 'Job type' },
                { value: 'month', label: 'Month' },
                { value: 'person', label: 'Who quoted' },
              ]}
              value={by}
              onChange={setBy}
              className="sm:w-fit"
            />
          </div>
        }
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-start lg:gap-8">
          {all && all.sent > 0 && (
            <div className={cn(panel, 'overflow-hidden')}>
              <Rows>
                <KeyValue
                  label="Win rate"
                  value={decidedCount(all) ? `${winPct(all)}% of ${decidedCount(all)} decided` : 'None decided yet'}
                />
                <KeyValue label="Quotes won" value={`${all.won} of ${all.sent} sent`} />
                <KeyValue label="Declined" value={String(all.lost)} />
                <KeyValue label="Expired" value={String(all.expired)} />
                <KeyValue label="Still waiting" value={String(all.open)} />
                <KeyValue label="Average quote" value={money(all.avg_value)} />
                <KeyValue label="Average job won" value={money(all.avg_won_value)} />
                <KeyValue label="Won" value={money(all.won_value)} tone="green" />
              </Rows>
            </div>
          )}
          <div className="min-w-0 space-y-3">
            <div className={cn(panel, 'overflow-hidden')}>
              {groups.length ? (
                <Rows>
                  {groups.map((g) => (
                    <Row
                      key={g.key}
                      title={by === 'month' ? monthLabel(g.key) : g.key}
                      detail={groupDetail(g)}
                      wrapDetail
                      amount={decidedCount(g) ? `${winPct(g)}%` : '—'}
                      status={
                        <span className="text-[12.5px] text-white">{money(g.won_value)} won</span>
                      }
                    />
                  ))}
                </Rows>
              ) : (
                <PlainEmpty bare text="No quotes sent in the last 12 months." />
              )}
            </div>
            {by === 'person' && (
              <p className="text-[13px] text-white">
                "Not recorded" is quotes made before the app kept who raised them.
              </p>
            )}
          </div>
        </div>
      </FormSheet>
    </section>
  );
}
