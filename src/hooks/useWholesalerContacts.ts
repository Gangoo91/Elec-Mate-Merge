import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface WholesalerContact {
  id: string;
  name: string | null;
  email: string;
}

// wholesaler_contacts isn't in the generated Supabase types yet — loosen the
// client for this table only (same pattern as other recently-added tables).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

/**
 * The user's saved wholesaler contacts — used to fire an RFQ at several
 * merchants at once (BCC) from a site visit. CRUD straight through the
 * Supabase client (RLS-scoped to the owner); no edge function.
 */
export function useWholesalerContacts() {
  const [contacts, setContacts] = useState<WholesalerContact[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await db
      .from('wholesaler_contacts')
      .select('id, name, email')
      .order('created_at', { ascending: true });
    setContacts((data as WholesalerContact[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addContact = useCallback(async (email: string, name?: string) => {
    const trimmed = email.trim();
    if (!trimmed) return null;
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return null;
    const { data, error } = await db
      .from('wholesaler_contacts')
      .insert({ user_id: auth.user.id, email: trimmed, name: name?.trim() || null })
      .select('id, name, email')
      .single();
    if (error) return null;
    setContacts((prev) => [...prev, data as WholesalerContact]);
    return data as WholesalerContact;
  }, []);

  const deleteContact = useCallback(async (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    await db.from('wholesaler_contacts').delete().eq('id', id);
  }, []);

  return { contacts, loading, addContact, deleteContact, reload: load };
}
