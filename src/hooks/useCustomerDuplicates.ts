import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DuplicateMatch {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  certificateCount: number;
  lastActivityAt: string | null;
  // Why it matched
  matchOn: ('email' | 'phone')[];
}

// Normalise a UK phone to last-10-digits for fuzzy matching.
const normalisePhone = (raw: string | null | undefined): string | null => {
  if (!raw) return null;
  const cleaned = raw.replace(/[^\d]/g, '').replace(/^44/, '0');
  return cleaned.length >= 9 ? cleaned.slice(-10) : null;
};

export const useCustomerDuplicates = (
  customerId: string,
  email?: string,
  phone?: string
) => {
  const [matches, setMatches] = useState<DuplicateMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      if (!customerId || (!email && !phone)) {
        setMatches([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const targetPhone = normalisePhone(phone);
        const targetEmail = email?.trim().toLowerCase() || null;

        // Pull other customers for the current user; we filter in-memory because
        // phone normalisation isn't index-friendly without a stored generated column.
        const { data, error } = await supabase
          .from('customers')
          .select('id, name, email, phone, address, certificate_count, last_activity_at')
          .neq('id', customerId)
          .limit(500);

        if (error) throw error;

        const found: DuplicateMatch[] = [];
        for (const row of data || []) {
          const matchOn: ('email' | 'phone')[] = [];
          if (targetEmail && row.email && row.email.trim().toLowerCase() === targetEmail) {
            matchOn.push('email');
          }
          const rowPhone = normalisePhone(row.phone);
          if (targetPhone && rowPhone && rowPhone === targetPhone) {
            matchOn.push('phone');
          }
          if (matchOn.length > 0) {
            found.push({
              id: row.id,
              name: row.name,
              email: row.email,
              phone: row.phone,
              address: row.address,
              certificateCount: row.certificate_count || 0,
              lastActivityAt: row.last_activity_at,
              matchOn,
            });
          }
        }
        setMatches(found);
      } catch {
        setMatches([]);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [customerId, email, phone]);

  return { matches, isLoading };
};
