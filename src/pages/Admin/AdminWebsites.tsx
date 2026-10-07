/**
 * Admin → Websites. Electricians who asked Elec-Mate to build their website
 * (£199 set-up + £39/month, 12-month minimum). Paid through Stripe on a separate
 * kind=website customer; see website-checkout and stripe-subscription-webhook/website.ts.
 *
 * Moving an order to "building" or "live" tells the electrician (DB trigger).
 */
import { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNowStrict, format } from 'date-fns';
import { ExternalLink, Mail, Phone, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  PageHero,
  StatStrip,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  type Tone,
} from '@/components/admin/editorial';

type Status = 'new' | 'contacted' | 'paid' | 'building' | 'live' | 'won' | 'lost' | 'cancelled';
interface Order {
  id: string;
  user_id: string;
  company_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  notes: string | null;
  status: Status;
  origin: 'interest' | 'checkout';
  subscription_status: string | null;
  stripe_subscription_id: string | null;
  paid_at: string | null;
  last_paid_at: string | null;
  commitment_ends_at: string | null;
  site_url: string | null;
  created_at: string;
}

const MONTHLY = 39;
const TABS = [
  { key: 'todo', label: 'To do' },
  { key: 'leads', label: 'Leads' },
  { key: 'live', label: 'Live' },
  { key: 'ended', label: 'Ended' },
] as const;
type TabKey = (typeof TABS)[number]['key'];

const STATUS_LABEL: Record<Status, [string, Tone]> = {
  new: ['New', 'yellow'],
  contacted: ['Contacted', 'blue'],
  paid: ['Paid · not started', 'green'],
  building: ['Building', 'cyan'],
  live: ['Live', 'emerald'],
  won: ['Won', 'emerald'],
  lost: ['Lost', 'red'],
  cancelled: ['Ended', 'red'],
};

const isPaid = (o: Order) => ['paid', 'building', 'live'].includes(o.status);
const failing = (o: Order) => ['past_due', 'unpaid'].includes(o.subscription_status ?? '');

export default function AdminWebsites() {
  const qc = useQueryClient();
  const [tab, setTab] = useState<TabKey>('todo');
  const [liveUrl, setLiveUrl] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const {
    data: orders = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-website-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('website_build_requests' as never)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);
      if (error) throw error;
      // Opened the payment page and never paid or asked: not an order
      return ((data ?? []) as unknown as Order[]).filter(
        (o) => !(o.origin === 'checkout' && o.status === 'new')
      );
    },
  });

  const groups = useMemo(
    () => ({
      // Money taken but no site yet, a failed payment, or someone waiting for a call
      todo: orders.filter(
        (o) => o.status === 'paid' || o.status === 'building' || (o.status === 'live' && failing(o))
      ),
      leads: orders.filter((o) => o.status === 'new' || o.status === 'contacted'),
      live: orders.filter((o) => o.status === 'live'),
      ended: orders.filter((o) => ['cancelled', 'lost', 'won'].includes(o.status)),
    }),
    [orders]
  );

  const activeSubs = orders.filter((o) => isPaid(o) && !failing(o)).length;
  const stats = [
    {
      label: 'Paying',
      value: activeSubs,
      sub: `£${activeSubs * MONTHLY}/month`,
      tone: 'green' as Tone,
    },
    {
      label: 'To build',
      value: groups.todo.filter((o) => o.status !== 'live').length,
      tone: 'yellow' as Tone,
    },
    { label: 'Live', value: groups.live.length, tone: 'emerald' as Tone },
    { label: 'Leads', value: groups.leads.length, sub: 'asked, not paid', tone: 'blue' as Tone },
  ];

  const setStatus = async (o: Order, status: Status, site_url?: string) => {
    setSaving(o.id);
    const { error } = await supabase
      .from('website_build_requests' as never)
      .update({ status, ...(site_url ? { site_url } : {}) } as never)
      .eq('id', o.id);
    setSaving(null);
    if (error) {
      toast({ title: 'Could not update', description: error.message, variant: 'destructive' });
      return;
    }
    toast({
      title: status === 'live' ? 'Marked live' : status === 'building' ? 'Building' : 'Updated',
      description:
        status === 'live' || status === 'building'
          ? `${o.company_name ?? 'They'} got a notification.`
          : undefined,
    });
    qc.invalidateQueries({ queryKey: ['admin-website-orders'] });
  };

  const list = groups[tab];

  return (
    <PageFrame>
      <PageHero
        eyebrow="Websites"
        title="Website builds"
        description="£199 set-up + £39 a month, 12-month minimum. Paid through Stripe."
        tone="yellow"
        actions={
          <IconButton onClick={() => refetch()} aria-label="Refresh">
            <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
          </IconButton>
        }
      />
      <StatStrip stats={stats} columns={4} />

      <div className="mt-6 flex gap-1 overflow-x-auto rounded-xl border border-white/[0.1] bg-white/[0.03] p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              'h-10 flex-1 whitespace-nowrap rounded-lg px-3 text-[13px] font-semibold touch-manipulation',
              tab === t.key ? 'bg-elec-yellow text-black' : 'text-white'
            )}
          >
            {t.label} <span className="tabular-nums">{groups[t.key].length}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {isLoading ? (
          <LoadingBlocks />
        ) : list.length === 0 ? (
          <EmptyState
            title={tab === 'todo' ? 'Nothing to build' : 'Nothing here yet'}
            description="Orders come from Connect enquiries when an electrician has no website."
          />
        ) : (
          list.map((o) => {
            const [label, tone] = STATUS_LABEL[o.status];
            return (
              <div
                key={o.id}
                className="rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold text-white">
                      {o.company_name ?? o.contact_email ?? 'No business name'}
                    </p>
                    <p className="text-[12.5px] text-white">
                      {o.paid_at
                        ? `Paid ${format(new Date(o.paid_at), 'd MMM yyyy')}`
                        : `Asked ${formatDistanceToNowStrict(new Date(o.created_at), { addSuffix: true })}`}
                      {o.commitment_ends_at &&
                        ` · minimum term to ${format(new Date(o.commitment_ends_at), 'd MMM yyyy')}`}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Pill tone={tone}>{label}</Pill>
                    {failing(o) && <Pill tone="red">Payment failing</Pill>}
                  </div>
                </div>

                {o.notes && (
                  <p className="mt-3 whitespace-pre-wrap rounded-xl bg-black/20 p-3 text-[13px] text-white">
                    {o.notes}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {o.contact_email && (
                    <a
                      href={`mailto:${o.contact_email}?subject=${encodeURIComponent('Your Elec-Mate website')}`}
                      className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/[0.12] px-3 text-[13px] font-medium text-white touch-manipulation"
                    >
                      <Mail className="h-4 w-4" /> {o.contact_email}
                    </a>
                  )}
                  {o.contact_phone && (
                    <a
                      href={`tel:${o.contact_phone.replace(/\s+/g, '')}`}
                      className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/[0.12] px-3 text-[13px] font-medium text-white touch-manipulation"
                    >
                      <Phone className="h-4 w-4" /> {o.contact_phone}
                    </a>
                  )}
                  {o.stripe_subscription_id && (
                    <a
                      href={`https://dashboard.stripe.com/subscriptions/${o.stripe_subscription_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/[0.12] px-3 text-[13px] font-medium text-white touch-manipulation"
                    >
                      <ExternalLink className="h-4 w-4" /> Stripe
                    </a>
                  )}
                  {o.site_url && (
                    <a
                      href={o.site_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-emerald-500/40 px-3 text-[13px] font-medium text-emerald-300 touch-manipulation"
                    >
                      <ExternalLink className="h-4 w-4" /> {o.site_url.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>

                {/* Next step */}
                <div className="mt-3 border-t border-white/[0.08] pt-3">
                  {o.status === 'new' && (
                    <button
                      type="button"
                      disabled={saving === o.id}
                      onClick={() => setStatus(o, 'contacted')}
                      className="h-10 rounded-lg bg-white/[0.08] px-4 text-[13px] font-semibold text-white touch-manipulation"
                    >
                      I've contacted them
                    </button>
                  )}
                  {o.status === 'contacted' && (
                    <p className="text-[12.5px] text-white">
                      Waiting for them to pay from Connect enquiries ("Get my website").{' '}
                      <button
                        type="button"
                        onClick={() => setStatus(o, 'lost')}
                        className="font-semibold underline touch-manipulation"
                      >
                        Mark as lost
                      </button>
                    </p>
                  )}
                  {o.status === 'paid' && (
                    <button
                      type="button"
                      disabled={saving === o.id}
                      onClick={() => setStatus(o, 'building')}
                      className="h-10 rounded-lg bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation"
                    >
                      Start building
                    </button>
                  )}
                  {(o.status === 'building' || o.status === 'paid') && (
                    <form
                      className="mt-2 flex flex-wrap gap-2"
                      onSubmit={(ev) => {
                        ev.preventDefault();
                        const url = (liveUrl[o.id] ?? '').trim();
                        if (!/^https:\/\/\S+\.\S+/.test(url)) {
                          toast({ title: 'Add the full address, starting https://' });
                          return;
                        }
                        setStatus(o, 'live', url);
                      }}
                    >
                      <input
                        value={liveUrl[o.id] ?? ''}
                        onChange={(ev) => setLiveUrl((m) => ({ ...m, [o.id]: ev.target.value }))}
                        placeholder="https://their-site.co.uk"
                        inputMode="url"
                        className="h-10 min-w-0 flex-1 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white placeholder:text-white/40 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0"
                      />
                      <button
                        type="submit"
                        disabled={saving === o.id}
                        className="h-10 rounded-lg bg-emerald-500 px-4 text-[13px] font-semibold text-black touch-manipulation"
                      >
                        Mark live
                      </button>
                    </form>
                  )}
                  {o.status === 'live' && (
                    <p className="text-[12.5px] text-white">
                      {o.last_paid_at
                        ? `Last paid ${format(new Date(o.last_paid_at), 'd MMM yyyy')}.`
                        : 'Live.'}{' '}
                      Cancelling or refunds: do it in Stripe; this page updates itself.
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </PageFrame>
  );
}
