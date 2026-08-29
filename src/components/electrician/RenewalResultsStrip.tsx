/**
 * The proof strip — what the renewal automation actually did in the last 30
 * days. Electricians leave automations on when they can SEE them working;
 * a switch with no feedback gets switched off "just in case".
 *
 * Sent = reminder emails (certificate tiers + contract visit reminders).
 * Opened = tracked via the email-open pixel (cert reminders carry it).
 * Booked = customers who booked themselves from a reminder.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PANEL } from '@/components/electrician/shared/surfaces';
import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';

interface Results {
  sent: number;
  opened: number | null;
  booked: number;
}

export function RenewalResultsStrip() {
  const { data } = useQuery({
    queryKey: ['renewal-results-30d'],
    queryFn: async (): Promise<Results | null> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;
      const since = new Date(Date.now() - 30 * 86_400_000).toISOString();

      const [ledgerRes, visitsRes, opensRes] = await Promise.all([
        supabase
          .from('certificate_expiry_reminders')
          .select(
            'client_email_30_day_sent_at, client_email_14_day_sent_at, client_email_7_day_sent_at, reminder_status, updated_at'
          )
          .eq('user_id', user.id),
        supabase
          .from('maintenance_contract_visits')
          .select('email_sent_at, booked_at')
          .eq('user_id', user.id),
        supabase
          .from('email_opens')
          .select('id', { count: 'exact', head: true })
          .eq('owner_user_id', user.id)
          .eq('entity_type', 'cert_expiry')
          .gte('first_opened_at', since),
      ]);

      let sent = 0;
      let booked = 0;
      for (const r of ledgerRes.data || []) {
        for (const stamp of [
          r.client_email_30_day_sent_at,
          r.client_email_14_day_sent_at,
          r.client_email_7_day_sent_at,
        ]) {
          if (stamp && stamp >= since) sent += 1;
        }
        if (r.reminder_status === 'booked' && r.updated_at && r.updated_at >= since) booked += 1;
      }
      for (const v of visitsRes.data || []) {
        if (v.email_sent_at && v.email_sent_at >= since) sent += 1;
        if (v.booked_at && v.booked_at >= since) booked += 1;
      }

      // Opens are best-effort — an RLS wall here must not sink the strip.
      const opened = opensRes.error ? null : (opensRes.count ?? 0);

      return { sent, opened, booked };
    },
  });

  // Nothing sent yet = nothing to prove. The strip earns its place only
  // once the automation has actually done something.
  if (!data || data.sent === 0) return null;

  return (
    <div className={cn(PANEL, 'flex items-center gap-3 px-4 py-3 sm:px-5')}>
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.10]">
        <Activity className="h-4 w-4 text-elec-yellow" />
      </span>
      <p className="text-[12.5px] leading-snug text-white">
        <span className="font-semibold text-white">Last 30 days:</span>{' '}
        <span className="font-semibold tabular-nums text-elec-yellow">{data.sent}</span> reminder
        {data.sent === 1 ? '' : 's'} sent
        {data.opened !== null && data.opened > 0 && (
          <>
            {' · '}
            <span className="font-semibold tabular-nums text-elec-yellow">{data.opened}</span>{' '}
            opened
          </>
        )}
        {' · '}
        <span className="font-semibold tabular-nums text-emerald-300">{data.booked}</span> booked
        themselves
      </p>
    </div>
  );
}
