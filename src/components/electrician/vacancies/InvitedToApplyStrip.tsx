import { useState } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { toast } from '@/hooks/use-toast';
import {
  useApplyToVacancy,
  useMyInvitations,
  useRespondToInvitation,
} from '@/hooks/useInternalVacancies';
import { getUserCVs } from '@/services/elecIdService';

/* ==========================================================================
   InvitedToApplyStrip — ELE-1957, the electrician's side.

   A firm invited this person from the talent pool (they opted in with "Let
   firms find me"). The invite waits here at the top of Job Vacancies:
   Apply with Elec-ID sends the application in one tap (their Elec-ID is
   attached automatically, plus their main CV if they have one), and the
   firm's Candidates tab rings. "Not for me" declines politely.
   Renders nothing when there are no open invites.
   ========================================================================== */

interface InvitationRow {
  id: string;
  vacancy_id: string;
  message: string | null;
  status: string;
  sent_at: string;
  expires_at: string | null;
  vacancy?: {
    id: string;
    title: string;
    location: string | null;
    type: string | null;
    employer?: { company_name?: string };
  } | null;
}

export function InvitedToApplyStrip({ className }: { className?: string }) {
  const { data: invitations = [] } = useMyInvitations();
  const apply = useApplyToVacancy();
  const respond = useRespondToInvitation();
  const [busy, setBusy] = useState<string | null>(null);

  const rows = (invitations as InvitationRow[]).filter(
    (i) => i.vacancy && (!i.expires_at || new Date(i.expires_at).getTime() > Date.now())
  );
  if (rows.length === 0) return null;

  const handleApply = async (inv: InvitationRow) => {
    setBusy(inv.id);
    try {
      let cvUrl: string | undefined;
      try {
        const cvs = await getUserCVs();
        cvUrl = (cvs.find((c) => c.is_primary) ?? cvs[0])?.pdf_url || undefined;
      } catch {
        // No CV is fine — the Elec-ID is the application
      }
      await apply.mutateAsync({ vacancyId: inv.vacancy_id, cvUrl });
      toast({
        title: 'Application sent',
        description: `${inv.vacancy?.employer?.company_name || 'The firm'} has your Elec-ID${cvUrl ? ' and CV' : ''}. You will hear back here.`,
      });
    } catch (e) {
      toast({
        title: 'Not sent',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  const handleDecline = async (inv: InvitationRow) => {
    setBusy(inv.id);
    try {
      await respond.mutateAsync({ invitationId: inv.id, response: 'declined' });
      toast({ title: 'Invite declined', description: 'The firm will not chase you for this one.' });
    } catch {
      toast({
        title: 'Could not update',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className={cn('space-y-3', className)} aria-label="Invited to apply">
      <div className="flex items-baseline justify-between gap-3 px-2 sm:px-0">
        <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
          Invited to apply
        </h2>
        <span className="text-[12px] font-medium text-white tabular-nums">
          {rows.length} {rows.length === 1 ? 'firm' : 'firms'}
        </span>
      </div>
      <div className={cn('grid gap-3', rows.length > 1 && 'md:grid-cols-2')}>
        {rows.map((inv) => {
          const firm = inv.vacancy?.employer?.company_name || 'A local firm';
          const isBusy = busy === inv.id;
          // One invite on a wide screen: one row, actions on the right, so
          // it neither stretches the Apply button nor leaves half the row empty.
          const wide = rows.length === 1;
          return (
            <div
              key={inv.id}
              className={cn(
                'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5',
                wide && 'md:flex md:items-center md:justify-between md:gap-8',
                CARD_SURFACE
              )}
            >
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
                  {firm} is hiring
                </p>
                <p className="mt-1.5 text-[16px] font-semibold leading-snug text-white">
                  {inv.vacancy?.title}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] text-white">
                  {inv.vacancy?.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {inv.vacancy.location}
                    </span>
                  )}
                  {inv.vacancy?.type && <span>· {inv.vacancy.type}</span>}
                </p>
                {inv.message && (
                  <p className="mt-3 border-l-2 border-elec-yellow/60 pl-3 text-[13px] leading-relaxed text-white">
                    {inv.message}
                  </p>
                )}
              </div>
              <div className={cn('mt-4 flex gap-2', wide && 'md:mt-0 md:shrink-0')}>
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleApply(inv)}
                  className="inline-flex h-11 flex-1 md:flex-none md:min-w-[190px] items-center justify-center rounded-full bg-elec-yellow px-4 text-[13.5px] font-semibold text-black touch-manipulation active:scale-[0.98] disabled:opacity-60"
                >
                  {isBusy && apply.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Apply with Elec-ID
                </button>
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleDecline(inv)}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] px-4 text-[13px] font-medium text-white touch-manipulation disabled:opacity-60"
                >
                  Not for me
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
