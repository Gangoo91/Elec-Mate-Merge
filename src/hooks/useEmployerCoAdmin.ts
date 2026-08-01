import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Is this user a co-admin of someone else's company?
 *
 * A co-admin (e.g. an office manager or finance director on the owner's
 * account) gets the Employer Hub without owning the subscription themselves.
 *
 * Lazy-claim, mirroring claim_employee_records(): the owner adds the person by
 * email, and the membership links on their first load. So a "no" answer is
 * retried once via the claim RPC before it is believed — otherwise someone
 * invited before they had an account would stay locked out forever.
 *
 * Casts: these RPCs postdate the last types.ts regeneration.
 */
export const useEmployerCoAdmin = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['employer-co-admin', userId],
    queryFn: async (): Promise<boolean> => {
      const { data, error } = await supabase.rpc('is_employer_co_admin' as never);
      if (!error && data) return true;

      const { data: claimed } = await supabase.rpc('claim_employer_admin_rows' as never);
      if (((claimed as unknown as number) ?? 0) > 0) {
        const { data: after } = await supabase.rpc('is_employer_co_admin' as never);
        return !!after;
      }
      return false;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
