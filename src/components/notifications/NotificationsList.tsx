import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationCard, type NotificationCardProps } from './NotificationCard';
import type { Notification } from '@/hooks/useNotifications';
import {
  getDaysUntilDeadline,
  isOpenNotification,
  needsAnswerNotification,
  REPORT_TYPE_LABELS,
} from '@/utils/notificationHelper';
import { cn } from '@/lib/utils';

type CardHandlers = Omit<NotificationCardProps, 'notification'>;

interface NotificationsListProps extends CardHandlers {
  notifications: Notification[];
}

const chipCn =
  'h-9 shrink-0 rounded-full border px-3.5 text-[12.5px] transition-colors touch-manipulation active:scale-[0.98]';
const chipOn = 'border-elec-yellow bg-elec-yellow font-semibold text-black';
const chipOff = 'border-white/[0.12] bg-white/[0.06] font-medium text-white';
const searchCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation [&::-webkit-search-cancel-button]:appearance-none';

/**
 * The list — grouped by what the electrician has to do, not by database
 * status: Needs an answer → Overdue → To submit → Submitted → Not required.
 * Search and type chips only appear once there's enough to need them.
 */
export const NotificationsList = ({ notifications, ...handlers }: NotificationsListProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [showClosed, setShowClosed] = useState(false);

  const types = useMemo(() => {
    const set = new Set(notifications.map((n) => n.reports?.report_type).filter(Boolean) as string[]);
    return Array.from(set);
  }, [notifications]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notifications.filter((n) => {
      if (type !== 'all' && n.reports?.report_type !== type) return false;
      if (!q) return true;
      return [
        n.work_type,
        n.building_control_authority,
        n.reports?.certificate_number,
        n.reports?.client_name,
        n.reports?.installation_address,
      ].some((v) => v?.toLowerCase().includes(q));
    });
  }, [notifications, query, type]);

  const groups = useMemo(() => {
    const byDeadline = (a: Notification, b: Notification) => {
      if (!a.submission_deadline) return 1;
      if (!b.submission_deadline) return -1;
      return getDaysUntilDeadline(a.submission_deadline) - getDaysUntilDeadline(b.submission_deadline);
    };
    const byRecent = (a: Notification, b: Notification) =>
      (b.submitted_at || b.created_at).localeCompare(a.submitted_at || a.created_at);

    const needsAnswer: Notification[] = [];
    const overdue: Notification[] = [];
    const toSubmit: Notification[] = [];
    const submitted: Notification[] = [];
    const closed: Notification[] = [];

    filtered.forEach((n) => {
      if (n.notification_status === 'submitted') return void submitted.push(n);
      if (!isOpenNotification(n)) return void closed.push(n);
      if (needsAnswerNotification(n)) return void needsAnswer.push(n);
      if (n.submission_deadline && getDaysUntilDeadline(n.submission_deadline) < 0) return void overdue.push(n);
      toSubmit.push(n);
    });

    return {
      needsAnswer: needsAnswer.sort(byDeadline),
      overdue: overdue.sort(byDeadline),
      toSubmit: toSubmit.sort(byDeadline),
      submitted: submitted.sort(byRecent),
      closed: closed.sort(byRecent),
    };
  }, [filtered]);

  // ── Empty state ──
  if (notifications.length === 0) {
    return (
      <div className="-mx-4 border-y border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-6 sm:mx-0 sm:rounded-2xl sm:border-x">
        <p className="text-[15px] font-semibold tracking-tight text-white">Nothing to notify</p>
        <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-white">
          When you issue a certificate for notifiable work, it lands here with the 30-day clock running.
        </p>
        <div className="mt-5 space-y-3">
          {[
            ['Answer Part P on the certificate', 'An EIC, EV or solar certificate asks "Notifiable work under Part P?"; a Minor Works ticks Part P on the declaration.'],
            ['Generate it', 'A notification appears here, due 30 days after the work was completed.'],
            ['Submit and mark it done', 'Through your scheme portal or Building Control. Marking it submitted records the route and reference on the certificate.'],
          ].map(([title, desc], i) => (
            <div key={title} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[11px] font-semibold tabular-nums text-white">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-white">{title}</p>
                <p className="text-[12.5px] leading-snug text-white">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => navigate('/electrician/inspection-testing?section=certificates')}
          className="mt-5 inline-flex h-11 items-center rounded-xl bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-transform active:scale-[0.98] touch-manipulation"
        >
          Start a certificate
        </button>
      </div>
    );
  }

  const renderGroup = (title: string, items: Notification[], colour = 'text-white', note?: string) => {
    if (items.length === 0) return null;
    return (
      <section>
        <div className="mb-2.5 flex items-baseline justify-between gap-3 px-0.5">
          <h3 className={cn('text-[13px] font-semibold tracking-tight', colour)}>
            {title}
            <span className="ml-2 text-[11.5px] font-normal tabular-nums text-white">{items.length}</span>
          </h3>
          {note && <p className="hidden text-[12px] text-white sm:block">{note}</p>}
        </div>
        <div className={cn('grid grid-cols-1 gap-3 lg:gap-4', items.length > 1 ? 'lg:grid-cols-2' : 'lg:max-w-[720px]')}>
          {items.map((n) => (
            <NotificationCard key={n.id} notification={n} {...handlers} />
          ))}
        </div>
      </section>
    );
  };

  const showTools = notifications.length > 4;
  const nothingMatches = filtered.length === 0;

  return (
    <div className="space-y-6">
      {showTools && (
        <div className="space-y-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search client, address or certificate number"
            className={searchCn}
            autoComplete="off"
          />
          {types.length > 1 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-0.5 sm:mx-0 sm:px-0 [scrollbar-width:none]">
              <button type="button" onClick={() => setType('all')} className={cn(chipCn, type === 'all' ? chipOn : chipOff)}>
                All
              </button>
              {types.map((t) => (
                <button key={t} type="button" onClick={() => setType(t)} className={cn(chipCn, type === t ? chipOn : chipOff)}>
                  {REPORT_TYPE_LABELS[t] || t}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {nothingMatches ? (
        <div className="py-8 text-center">
          <p className="text-[13px] text-white">Nothing matches.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setType('all');
            }}
            className="mt-2 h-11 px-4 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          {renderGroup('Needs an answer', groups.needsAnswer, 'text-white', 'Older certificates that never said')}
          {renderGroup('Overdue', groups.overdue, 'text-red-300')}
          {renderGroup('To submit', groups.toSubmit)}
          {renderGroup('Submitted', groups.submitted, 'text-emerald-300')}

          {groups.closed.length > 0 && (
            <section>
              <button
                type="button"
                onClick={() => setShowClosed((v) => !v)}
                className="flex h-11 w-full items-center justify-between px-0.5 text-left touch-manipulation"
              >
                <span className="text-[13px] font-semibold tracking-tight text-white">
                  Not required
                  <span className="ml-2 text-[11.5px] font-normal tabular-nums text-white">{groups.closed.length}</span>
                </span>
                <span className="text-[12.5px] font-semibold text-elec-yellow">{showClosed ? 'Hide' : 'Show'}</span>
              </button>
              {showClosed && (
                <div className={cn('mt-2 grid grid-cols-1 gap-3 lg:gap-4', groups.closed.length > 1 ? 'lg:grid-cols-2' : 'lg:max-w-[720px]')}>
                  {groups.closed.map((n) => (
                    <NotificationCard key={n.id} notification={n} {...handlers} />
                  ))}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
};
