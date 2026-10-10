/**
 * Gap #10: the firm's insurance and accreditations from the one source
 * (get_firm_credentials): the public liability policy and competent person
 * scheme held in Settings, plus every other policy and accreditation on the
 * compliance register.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useActingFirmId } from '@/hooks/useFirmPriceBook';
import type { FirmCredential } from '@/components/employer/compliance/credentials';

export const FIRM_CREDENTIALS_KEY = 'firm-credentials';

export async function fetchFirmCredentials(firmId: string): Promise<FirmCredential[]> {
  const { data, error } = await supabase.rpc(
    'get_firm_credentials' as never,
    { p_firm: firmId } as never
  );
  if (error) throw error;
  return (Array.isArray(data) ? data : []) as unknown as FirmCredential[];
}

/** For the firm this user acts for, or `firmId` when given (Settings passes
 *  the signed-in user's own id). */
export function useFirmCredentials(opts: { firmId?: string | null; enabled?: boolean } = {}) {
  const { data: acting } = useActingFirmId();
  const firm = opts.firmId ?? acting ?? null;
  return useQuery({
    queryKey: [FIRM_CREDENTIALS_KEY, firm],
    enabled: (opts.enabled ?? true) && !!firm,
    staleTime: 60 * 1000,
    queryFn: () => fetchFirmCredentials(firm!),
  });
}
