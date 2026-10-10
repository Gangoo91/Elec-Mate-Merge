import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { useEmployerRole } from '@/hooks/useEmployerRole';

/**
 * ELE-2067 — who may do what with Bring your data across. The database
 * enforces all of it (import: can_see_firm_money; export and free-move
 * requests: the owner); this only decides what to show.
 */
export function useFirmImportAccess() {
  const { user } = useAuth();
  const { data: role } = useEmployerRole();
  const { data: firmId } = useQuery({
    queryKey: ['acting-employer-id', user?.id],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => (await getActingEmployerId(user!.id)) ?? user!.id,
  });
  const isOwner = !!user && !!firmId && firmId === user.id;
  return {
    firmId: firmId ?? null,
    isOwner,
    canImport: isOwner || !!role?.canSeeMoney,
    email: user?.email ?? undefined,
  };
}
