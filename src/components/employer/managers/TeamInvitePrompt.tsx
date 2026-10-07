/**
 * "Acme Electrical added you to their team" — Join / Not me.
 *
 * Joining a firm's roster gives that firm the worker's timesheets, OTJ inbox
 * and (for apprentices) college progress, and starts a paid seat. Anyone can
 * type an email onto their roster, so a roster row only links when the person
 * themselves taps Join (6 Oct). Opening the firm's invite link and creating
 * the account there is the other way in, and is already explicit.
 */
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { PrimaryButton, SecondaryButton } from '@/components/employer/editorial';

interface TeamInvite {
  employee_id: string;
  company_name: string;
  role: string | null;
  team_role: string | null;
}

export function TeamInvitePrompt() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [dismissed, setDismissed] = useState<string | null>(null);

  // Cast: these RPCs postdate the last types.ts regeneration.
  const { data: invites = [] } = useQuery({
    queryKey: ['team-invites', user?.id],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<TeamInvite[]> => {
      const { data, error } = await supabase.rpc('get_my_team_invites' as never);
      if (error) return [];
      return (data as unknown as TeamInvite[]) ?? [];
    },
  });

  const invite = invites.find((i) => i.employee_id !== dismissed);

  const respond = useMutation({
    mutationFn: async (accept: boolean) => {
      const { error } = await supabase.rpc(
        'respond_team_invite' as never,
        { p_employee_id: invite!.employee_id, p_accept: accept } as never
      );
      if (error) throw new Error(error.message);
      return accept;
    },
    onSuccess: (joined) => {
      queryClient.invalidateQueries({ queryKey: ['team-invites'] });
      if (joined) {
        toast.success(`You've joined ${invite!.company_name}`);
        // Seat, roster link and Worker Tools all hang off the new membership;
        // a fresh load picks every one of them up.
        window.location.assign('/electrician/worker-tools');
      } else {
        toast.success("Thanks. We've told them it isn't you");
      }
    },
    onError: (e: Error) => toast.error(e.message || 'Something went wrong'),
  });

  if (!invite) return null;
  const firm = invite.company_name;
  const as = invite.team_role || invite.role;

  return (
    <Sheet open onOpenChange={(open) => !open && setDismissed(invite.employee_id)}>
      <SheetContent side="bottom" className="p-0 rounded-t-2xl overflow-hidden">
        <div className="bg-background px-5 pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-4">
          <div>
            <SheetTitle className="text-[18px] font-semibold text-white">
              {firm} added you to their team
            </SheetTitle>
            <SheetDescription className="mt-2 text-[14px] text-white leading-relaxed">
              {as ? `They've added you as ${as}. ` : ''}Join to see your jobs, clock in and send
              timesheets, leave and expenses in Worker Tools. {firm} will see the work you log for
              them and, if you're an apprentice, your training hours.
            </SheetDescription>
            <p className="mt-2 text-[13px] text-white leading-relaxed">
              Only join if you work for {firm}. Nothing is shared until you do.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <SecondaryButton onClick={() => respond.mutate(false)} disabled={respond.isPending}>
              Not me
            </SecondaryButton>
            <PrimaryButton onClick={() => respond.mutate(true)} disabled={respond.isPending}>
              {respond.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Join'}
            </PrimaryButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
