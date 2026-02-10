import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const ADMIN_USERS_QUERY_KEY = ["admin-users-base"];

export function useAdminUsersBase() {
  return useQuery({
    queryKey: ADMIN_USERS_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("admin-get-users");
      if (error) {
        console.error("Edge function error:", error);
        throw error;
      }
      return (data?.users || []) as any[];
    },
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
