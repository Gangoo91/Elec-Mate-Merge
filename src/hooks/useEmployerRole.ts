import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';

/**
 * The signed-in person's role in the firm they act for (ELE-1831):
 * owner / admin / office (managers) or supervisor / engineer / apprentice /
 * subcontractor (roster). `canSeeMoney` is the server's answer
 * (can_see_firm_money) — screens use it to hide job profit, pay rates and the
 * P&L, but the database enforces it too, so this is presentation only.
 */
export type EmployerRole =
  | 'owner'
  | 'admin'
  | 'office'
  | 'supervisor'
  | 'engineer'
  | 'apprentice'
  | 'subcontractor';

export function useEmployerRole() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['employer-role', user?.id],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<{ role: EmployerRole | null; canSeeMoney: boolean }> => {
      const firm = (await getActingEmployerId(user!.id)) ?? user!.id;
      // Cast: this RPC postdates the last types.ts regeneration.
      const { data, error } = await supabase.rpc('get_my_employer_roles' as never);
      if (error) throw error;
      const rows = (data as unknown as Array<{
        employer_id: string;
        role: EmployerRole | null;
        can_see_money: boolean;
      }>) ?? [];
      const mine = rows.find((r) => r.employer_id === firm);
      return { role: mine?.role ?? null, canSeeMoney: !!mine?.can_see_money };
    },
  });
}
