import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AdminUser {
  id: string;
  full_name: string | null;
  email?: string;
  role?: string;
  subscribed?: boolean;
  subscription_tier?: string;
  subscription_end?: string | null;
  stripe_customer_id?: string | null;
  free_access_granted?: boolean;
  free_access_expires_at?: string | null;
  free_access_reason?: string | null;
  created_at: string;
  last_sign_in?: string | null;
}

export const ADMIN_USERS_QUERY_KEY = ['admin-users-base'];

export function useAdminUsersBase() {
  return useQuery({
    queryKey: ADMIN_USERS_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-get-users');
      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }
      return (data?.users || []) as AdminUser[];
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
