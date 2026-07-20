import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarClock,
  Mail,
  Phone,
  FolderPlus,
  Loader2,
  ShieldCheck,
  Search,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { toast } from '@/hooks/use-toast';
import { PANEL } from '@/components/electrician/shared/surfaces';
import { cn } from '@/lib/utils';

interface Renewal {
  id: string;
  report_type: string;
  client_name: string | null;
  customer_id: string | null;
  installation_address: string | null;
  due: string;
  contacted: boolean;
  customer_email?: string | null;
  customer_phone?: string | null;
}

const typeLabel = (t: string) =>
  t
    .replace(/-/g, ' ')
    .replace(/\b(eicr|eic|ev|pat)\b/gi, (m) => m.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase());

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/**
 * Renewal book (S8b): repeat work from your own certs. Completed certs with a
 * recommended next-inspection date, grouped by urgency — call, email, or drop
 * a job in the pipeline from each row; mark contacted so the list stays workable.
 */
const RenewalsBookPage = () => {
  const navigate = useNavigate();
  const { createProject } = useSparkProjects('all');
  const [renewals, setRenewals] = useState<Renewal[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [showContacted, setShowContacted] = useState(false);

  const load = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('reports')
        .select(
          'id, report_type, client_name, customer_id, installation_address, next_inspection_due, expiry_date, expiry_reminder_sent, customers(email, phone)'
        )
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .or('next_inspection_due.not.is.null,expiry_date.not.is.null')
        .order('next_inspection_due', { ascending: true, nullsFirst: false });
      if (error) throw error;
      const horizon = Date.now() + 365 * 86400000;
      const mapped: Renewal[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const r of (data || []) as any[]) {
        const due = r.next_inspection_due || r.expiry_date;
        if (!due) continue;
        if (new Date(due).getTime() > horizon) continue;
        mapped.push({
          id: r.id,
          report_type: r.report_type,
          client_name: r.client_name,
          customer_id: r.customer_id,
          installation_address: r.installation_address,
          due,
          contacted: !!r.expiry_reminder_sent,
          customer_email: r.customers?.email || null,
          customer_phone: r.customers?.phone || null,
        });
      }
      mapped.sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime());
      setRenewals(mapped);
    } catch (err) {
      console.error('Failed to load renewals:', err);
      toast({ title: 'Could not load renewals', description: 'Check your connection and pull to retry.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const daysUntil = (d: string) => Math.ceil((new Date(d).getTime() - Date.now()) / 86400000);

  const setContacted = async (r: Renewal, value: boolean) => {
    setRenewals((prev) => prev.map((x) => (x.id === r.id ? { ...x, contacted: value } : x)));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('reports')
      .update({ expiry_reminder_sent: value })
      .eq('id', r.id);
    if (error) {
      setRenewals((prev) =>
        prev.map((x) => (x.id === r.id ? { ...x, contacted: r.contacted } : x))
      );
      toast({ title: 'Could not update', variant: 'destructive' });
    }
  };

  const emailBody = (r: Renewal) => {
    const who = r.client_name ? ` ${r.client_name.split(' ')[0]}` : '';
    const site = r.installation_address ? ` at ${r.installation_address}` : '';
    return [
      `Hi${who},`,
      '',
      `The ${typeLabel(r.report_type)} we carried out${site} is due for re-inspection on ${fmtDate(r.due)}.`,
      '',
      `Keeping it current keeps the installation compliant and safe. I have availability over the next few weeks — reply here or give me a call and we'll get a date booked in.`,
      '',
      'Thanks,',
    ].join('\n');
  };

  const draftEmail = (r: Renewal) => {
    const subject = `${typeLabel(r.report_type)} due for renewal${
      r.installation_address ? ` — ${r.installation_address}` : ''
    }`;
    const to = r.customer_email ? encodeURIComponent(r.customer_email) : '';
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody(r))}`;
    // Drafting counts as contact — but only when there was an address to send to
    if (r.customer_email && !r.contacted) setContacted(r, true);
  };

  const emailAll = (items: Renewal[]) => {
    const withEmail = items.filter((r) => r.customer_email).slice(0, 50); // mailto URL limit (audit P2)
    if (withEmail.length === 0) {
      toast({ title: 'No customer emails on these certs' });
      return;
    }
    const bcc = withEmail.map((r) => r.customer_email).join(',');
    const subject = 'Your electrical inspection is due for renewal';
    const body = [
      'Hi,',
      '',
      'Our records show the electrical inspection we carried out for you is coming up for renewal.',
      '',
      "Keeping it current keeps your installation compliant and safe. Reply to this email or give me a call and we'll get a date booked in.",
      '',
      'Thanks,',
    ].join('\n');
    window.location.href = `mailto:?bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    withEmail.forEach((r) => {
      if (!r.contacted) setContacted(r, true);
    });
  };

  const createRenewalJob = async (r: Renewal) => {
    if (busyId) return;
    setBusyId(r.id);
    try {
      const created = await createProject({
        title: `${typeLabel(r.report_type)} renewal${r.client_name ? ` — ${r.client_name}` : ''}`,
        projectType: r.report_type.toLowerCase().includes('eicr') ? 'eicr' : 'maintenance',
        customerId: r.customer_id || undefined,
        location: r.installation_address || undefined,
        dueDate: r.due.slice(0, 10),
      });
      if (created) {
        toast({ title: 'Renewal job created', description: 'It’s in your pipeline.' });
        navigate(`/electrician/projects/${created.id}`);
      }
    } finally {
      setBusyId(null);
    }
  };

  // Type chips from what's actually in the book
  const typeChips = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of renewals) counts.set(r.report_type, (counts.get(r.report_type) || 0) + 1);
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [renewals]);

  const visible = useMemo(() => {
    let list = renewals;
    if (!showContacted) list = list.filter((r) => !r.contacted);
    if (typeFilter !== 'all') list = list.filter((r) => r.report_type === typeFilter);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (r) =>
          (r.client_name || '').toLowerCase().includes(q) ||
          (r.installation_address || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [renewals, typeFilter, search, showContacted]);

  const overdue = visible.filter((r) => daysUntil(r.due) < 0);
  const soon = visible.filter((r) => daysUntil(r.due) >= 0 && daysUntil(r.due) <= 60);
  const later = visible.filter((r) => daysUntil(r.due) > 60);
  const contactedCount = renewals.filter((r) => r.contacted).length;

  const section = (label: string, num: string, items: Renewal[], tone: string) =>
    items.length > 0 && (
      <div className="space-y-2.5">
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
            {num}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/65">
            · {label}
          </span>
          <span className="text-[10px] text-white/40 tabular-nums">{items.length}</span>
          {items.some((r) => r.customer_email) && (
            <button
              type="button"
              onClick={() => emailAll(items)}
              className="ml-auto text-[11px] font-semibold text-elec-yellow/90 touch-manipulation py-1 px-1.5 -mr-1.5 rounded-md active:bg-elec-yellow/[0.08]"
            >
              Email all
            </button>
          )}
        </div>
        <div className={cn(PANEL, 'overflow-hidden divide-y divide-white/[0.06]')}>
          {items.map((r) => {
            const days = daysUntil(r.due);
            return (
              <div key={r.id} className={cn('px-3.5 sm:px-5 py-3', r.contacted && 'opacity-60')}>
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-semibold text-white truncate">
                      {r.client_name || 'Customer'}
                      <span className="font-normal text-white/45"> · {typeLabel(r.report_type)}</span>
                      {r.contacted && (
                        <span className="ml-1.5 inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                          <Check className="h-3 w-3" /> contacted
                        </span>
                      )}
                    </p>
                    <p className="text-[12px] text-white/50 truncate">
                      {r.installation_address || 'No address on cert'}
                    </p>
                    <p className={cn('text-[12px] mt-0.5 tabular-nums', tone)}>
                      {days < 0
                        ? `${Math.abs(days)} days overdue — was due ${fmtDate(r.due)}`
                        : `Due ${fmtDate(r.due)} · ${days} days`}
                    </p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {r.customer_phone && (
                      <a
                        href={`tel:${r.customer_phone.replace(/\s+/g, '')}`}
                        aria-label="Call customer"
                        onClick={() => !r.contacted && setContacted(r, true)}
                        className="h-11 w-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/75 touch-manipulation active:scale-[0.96]"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => draftEmail(r)}
                      aria-label="Draft renewal email"
                      className="h-11 w-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/75 touch-manipulation active:scale-[0.96]"
                    >
                      <Mail className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => createRenewalJob(r)}
                      disabled={busyId === r.id}
                      aria-label="Create renewal job"
                      className="h-11 w-11 rounded-xl bg-elec-yellow/[0.10] border border-elec-yellow/[0.25] flex items-center justify-center text-elec-yellow touch-manipulation active:scale-[0.96] disabled:opacity-50"
                    >
                      {busyId === r.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <FolderPlus className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {/* contacted toggle — small, out of the way */}
                <button
                  type="button"
                  onClick={() => setContacted(r, !r.contacted)}
                  className="mt-1 text-[11px] text-white/40 touch-manipulation py-1 pr-2 active:text-white/70"
                >
                  {r.contacted ? 'Mark as not contacted' : 'Mark contacted'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24 min-h-screen">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 lg:px-6 py-2 flex items-center gap-2 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/electrician/business')}
            className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-white leading-tight">Renewal book</h1>
            <p className="text-[11px] text-white/60 leading-tight">
              Repeat work from your own certs
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6 pt-4 space-y-5">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        ) : renewals.length === 0 ? (
          <div className="flex flex-col items-center py-14 text-center max-w-[420px] mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
              <CalendarClock className="h-6 w-6 text-white/55" />
            </div>
            <h2 className="text-[17px] font-semibold text-white mb-1.5">No renewals on the radar</h2>
            <p className="text-[13.5px] text-white/55 leading-relaxed">
              When you set a recommended next-inspection date on a cert, the renewal lands here
              automatically — your future work, booked from your past work.
            </p>
          </div>
        ) : (
          <>
            <div className={cn(PANEL, 'flex items-center gap-3 px-4 py-3 sm:px-5')}>
              <span className="h-9 w-9 rounded-xl bg-elec-yellow/[0.10] border border-elec-yellow/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4 w-4 text-elec-yellow" />
              </span>
              <p className="text-[12.5px] text-white/70 leading-snug">
                <span className="font-semibold text-white">
                  {renewals.length} renewal{renewals.length === 1 ? '' : 's'}
                </span>{' '}
                due within a year — each one is repeat work your certs already earned.
              </p>
            </div>

            {/* Type chips + contacted toggle */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
              <button
                type="button"
                onClick={() => setTypeFilter('all')}
                className={cn(
                  'flex-shrink-0 h-10 px-3.5 rounded-full border text-[12px] font-medium touch-manipulation',
                  typeFilter === 'all'
                    ? 'bg-elec-yellow/[0.12] border-elec-yellow/[0.35] text-elec-yellow'
                    : 'bg-white/[0.04] border-white/[0.08] text-white/70'
                )}
              >
                All <span className="tabular-nums opacity-70">{renewals.length}</span>
              </button>
              {typeChips.map(([t, n]) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeFilter(typeFilter === t ? 'all' : t)}
                  className={cn(
                    'flex-shrink-0 h-10 px-3.5 rounded-full border text-[12px] font-medium touch-manipulation',
                    typeFilter === t
                      ? 'bg-elec-yellow/[0.12] border-elec-yellow/[0.35] text-elec-yellow'
                      : 'bg-white/[0.04] border-white/[0.08] text-white/70'
                  )}
                >
                  {typeLabel(t)} <span className="tabular-nums opacity-70">{n}</span>
                </button>
              ))}
              {contactedCount > 0 && (
                <button
                  type="button"
                  onClick={() => setShowContacted((v) => !v)}
                  className={cn(
                    'flex-shrink-0 h-10 px-3.5 rounded-full border text-[12px] font-medium touch-manipulation inline-flex items-center gap-1',
                    showContacted
                      ? 'bg-emerald-500/[0.10] border-emerald-500/[0.3] text-emerald-300'
                      : 'bg-white/[0.04] border-white/[0.08] text-white/70'
                  )}
                >
                  <Check className="h-3.5 w-3.5" />
                  Contacted <span className="tabular-nums opacity-70">{contactedCount}</span>
                </button>
              )}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customers or addresses…"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[14px] text-white placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/50 focus:ring-1 focus:ring-elec-yellow/30 touch-manipulation"
              />
            </div>

            {visible.length === 0 ? (
              <p className="text-center text-[13px] text-white/50 py-8">
                Nothing matches — clear the filters to see everything.
              </p>
            ) : (
              <>
                {section('Overdue', '01', overdue, 'text-red-300')}
                {section('Next 60 days', '02', soon, 'text-amber-300')}
                {section('Later this year', '03', later, 'text-white/45')}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RenewalsBookPage;
