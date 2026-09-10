import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * The college 50% scheme catalogue.
 *
 * One code per organisation per tier — £3.50 an apprentice, £9.99 an
 * electrician, both 50% of list. This hook supplies names, prices and tiers
 * from `promo_offers`.
 *
 * 🔴 Two schemes live in that table. Codes ending ELEC50 are mostly the
 * EMPLOYER scheme (Dodd Group, Kane Group, SES Engineering…), not colleges, so
 * they are separated by the name prefix rather than lumped in — an earlier
 * version counted every employer as a college.
 *
 * 🔴 It deliberately does NOT expose `promo_offers.redemptions`. That column is
 * written when a code is created and never updated: every row reads zero while
 * Stripe has a redemption recorded on KENDAL50. Take-up comes from the Stripe
 * promotion codes in `admin-stripe-stats` and is joined on the code.
 */

export interface CollegeCode {
  code: string;
  /** Two schemes share the table — colleges and employers. */
  scheme: 'college' | 'employer' | 'other';
  /** "Barnsley College" — scheme prefix and "(Electrician)" suffix stripped in SQL. */
  org: string;
  price: number;
  /** Derived from the PRICE, not the code suffix: ESSEXELEC50 is a £3.50 code. */
  tier: 'apprentice' | 'electrician';
  is_active: boolean;
  created_at: string;
}

export interface CollegeScheme {
  codes: CollegeCode[];
  colleges: number;
  employers: number;
  apprentice_price: number | null;
  electrician_price: number | null;
  generated_at: string;
}

export function useCollegeScheme() {
  return useQuery<CollegeScheme | null>({
    queryKey: ['admin-college-scheme'],
    staleTime: 10 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_college_scheme' as never);
      if (error) throw error;
      return (data ?? null) as CollegeScheme | null;
    },
  });
}
