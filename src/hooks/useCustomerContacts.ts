import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CustomerContact {
  id: string;
  customerId: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  isPrimary: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInput {
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  isPrimary?: boolean;
  notes?: string;
}

export const useCustomerContacts = (customerId: string) => {
  const [contacts, setContacts] = useState<CustomerContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const load = useCallback(async () => {
    if (!customerId) {
      setContacts([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('customer_contacts')
        .select('*')
        .eq('customer_id', customerId)
        .order('is_primary', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) throw error;

      setContacts(
        (data || []).map((c) => ({
          id: c.id,
          customerId: c.customer_id,
          name: c.name,
          role: c.role || undefined,
          email: c.email || undefined,
          phone: c.phone || undefined,
          isPrimary: c.is_primary,
          notes: c.notes || undefined,
          createdAt: c.created_at,
          updatedAt: c.updated_at,
        }))
      );
    } catch {
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    load();
  }, [load]);

  const addContact = async (input: ContactInput) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase.from('customer_contacts').insert({
        customer_id: customerId,
        user_id: user.id,
        name: input.name.trim(),
        role: input.role?.trim() || null,
        email: input.email?.trim() || null,
        phone: input.phone?.trim() || null,
        is_primary: !!input.isPrimary,
        notes: input.notes?.trim() || null,
      });
      if (error) throw error;
      await load();
      toast({ title: 'Contact added', description: input.name });
    } catch (err) {
      toast({
        title: 'Failed to add contact',
        description: err instanceof Error ? err.message : 'Try again.',
        variant: 'destructive',
      });
    }
  };

  const updateContact = async (id: string, input: Partial<ContactInput>) => {
    try {
      const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (input.name !== undefined) payload.name = input.name.trim();
      if (input.role !== undefined) payload.role = input.role?.trim() || null;
      if (input.email !== undefined) payload.email = input.email?.trim() || null;
      if (input.phone !== undefined) payload.phone = input.phone?.trim() || null;
      if (input.isPrimary !== undefined) payload.is_primary = input.isPrimary;
      if (input.notes !== undefined) payload.notes = input.notes?.trim() || null;

      const { error } = await supabase.from('customer_contacts').update(payload).eq('id', id);
      if (error) throw error;
      await load();
    } catch {
      toast({ title: 'Failed to update contact', variant: 'destructive' });
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const { error } = await supabase.from('customer_contacts').delete().eq('id', id);
      if (error) throw error;
      await load();
    } catch {
      toast({ title: 'Failed to delete contact', variant: 'destructive' });
    }
  };

  return { contacts, isLoading, addContact, updateContact, deleteContact, refresh: load };
};
