import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useActingFirmId } from '@/hooks/useFirmPriceBook';

/**
 * The firm's own quote defaults (ELE-1990), from the owner's company profile —
 * the same switches the Electrical Hub applies to a new quote (ELE-1083):
 * VAT registered (else a VAT number on file), reverse charge, CIS, validity
 * and the charge-out rate. Co-admins read the owner's profile under RLS
 * ("Firm managers read company profile"). Charge-out rate only; no costs.
 */
export interface FirmQuoteDefaults {
  vatRegistered: boolean;
  reverseCharge: boolean;
  cisEnabled: boolean;
  validityDays: number;
  hourlyRate: number | null;
}

export function useFirmQuoteDefaults() {
  const { data: firmId } = useActingFirmId();
  return useQuery({
    queryKey: ['firm-quote-defaults', firmId],
    enabled: !!firmId,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<FirmQuoteDefaults> => {
      const { data, error } = await supabase
        .from('company_profiles')
        .select(
          'vat_number, default_vat_registered, default_reverse_charge, default_cis_enabled, quote_validity_days, hourly_rate'
        )
        .eq('user_id', firmId!)
        .maybeSingle();
      if (error) throw error;
      const r = (data ?? {}) as {
        vat_number?: string | null;
        default_vat_registered?: boolean | null;
        default_reverse_charge?: boolean | null;
        default_cis_enabled?: boolean | null;
        quote_validity_days?: number | null;
        hourly_rate?: number | null;
      };
      return {
        vatRegistered: r.default_vat_registered ?? !!(r.vat_number && String(r.vat_number).trim()),
        reverseCharge: !!r.default_reverse_charge,
        cisEnabled: !!r.default_cis_enabled,
        validityDays: Number(r.quote_validity_days) || 30,
        hourlyRate: Number(r.hourly_rate) > 0 ? Number(r.hourly_rate) : null,
      };
    },
  });
}
