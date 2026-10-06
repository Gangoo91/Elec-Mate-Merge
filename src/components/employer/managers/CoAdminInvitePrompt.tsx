/**
 * "Acme Electrical asked you to be a manager" — Accept / Decline.
 *
 * Being added as a manager (employer_admins) moves this person's Employer Hub
 * work into the inviting firm and lifts their subscription gate, so it never
 * switches on by itself (6 Oct review). The claim only links the invite to
 * their account; this sheet is the one place it becomes active.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { clearActingEmployerCache } from '@/lib/actingEmployer';
import { PrimaryButton, SecondaryButton } from '@/components/employer/editorial';

interface Invite {
  invite_id: string;
  company_name: string;
  invited_by_name: string | null;
  job_title: string | null;
  access_role?: 'admin' | 'office';
}

export function CoAdminInvitePrompt() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState<string | null>(null);

  // Casts: these RPCs postdate the last types.ts regeneration.
  const { data: invites = [] } = useQuery({
    queryKey: ['co-admin-invites', user?.id],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<Invite[]> => {
      await supabase.rpc('claim_employer_admin_rows' as never);
      const { data, error } = await supabase.rpc('get_my_co_admin_invites' as never);
      if (error) return [];
      return (data as unknown as Invite[]) ?? [];
    },
  });

  const invite = invites.find((i) => i.invite_id !== dismissed);

  const respond = useMutation({
    mutationFn: async (accept: boolean) => {
      const { error } = await supabase.rpc(
        'respond_co_admin_invite' as never,
        { p_invite_id: invite!.invite_id, p_accept: accept } as never
      );
      if (error) throw error;
      return accept;
    },
    onSuccess: (accepted) => {
      clearActingEmployerCache();
      queryClient.invalidateQueries({ queryKey: ['co-admin-invites'] });
      queryClient.invalidateQueries({ queryKey: ['employer-co-admin'] });
      if (accepted) {
        toast.success(`You now manage ${invite!.company_name}'s Employer Hub`);
        navigate('/employer');
      } else {
        toast.success('Invite declined');
      }
    },
    onError: (e: Error) => toast.error(e.message || 'Something went wrong'),
  });

  if (!invite) return null;
  const firm = invite.company_name;

  return (
    <Sheet open onOpenChange={(open) => !open && setDismissed(invite.invite_id)}>
      <SheetContent side="bottom" className="p-0 rounded-t-2xl overflow-hidden">
        <div className="bg-background px-5 pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-4">
          <div>
            <SheetTitle className="text-[18px] font-semibold text-white">
              {firm} asked you to be a manager
            </SheetTitle>
            <SheetDescription className="mt-2 text-[14px] text-white leading-relaxed">
              {invite.invited_by_name ? `${invite.invited_by_name} added you` : 'You were added'}
              {invite.job_title ? ` as ${invite.job_title}` : ''}. Managers run {firm}'s Employer
              Hub: jobs, team, quotes, invoices and safety
              {invite.access_role === 'admin'
                ? ', including money and certificate sign-off'
                : ", without job profit, pay rates or certificate sign-off"}
              . Anything you then add in the Employer Hub belongs to {firm}.
            </SheetDescription>
            <p className="mt-2 text-[13px] text-white leading-relaxed">
              Only accept if you work for {firm}. Nothing changes until you do.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <SecondaryButton onClick={() => respond.mutate(false)} disabled={respond.isPending}>
              Decline
            </SecondaryButton>
            <PrimaryButton onClick={() => respond.mutate(true)} disabled={respond.isPending}>
              {respond.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Accept'}
            </PrimaryButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
