import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { trackUserEvent } from '@/hooks/useActivityTracking';

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const useCustomers = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load customers with React Query for better caching
  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setCustomers([]);
        return;
      }

      const { data, error } = await supabase.from('customers').select('*').order('name');

      if (error) throw error;

      setCustomers(
        data.map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email || undefined,
          phone: c.phone || undefined,
          address: c.address || undefined,
          notes: c.notes || undefined,
          createdAt: c.created_at,
          updatedAt: c.updated_at,
        }))
      );
    } catch (error) {
      console.error('Failed to load customers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use query hook with caching
  useEffect(() => {
    loadCustomers();
  }, []);

  // Save customer (checks for duplicates first)
  const saveCustomer = async (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Check for existing customer with same email (if email provided)
      if (customer.email) {
        const { data: existing } = await supabase
          .from('customers')
          .select('id, name')
          .eq('user_id', user.id)
          .eq('email', customer.email.trim().toLowerCase())
          .maybeSingle();

        if (existing) {
          toast({
            title: 'Customer already exists',
            description: `A customer with this email already exists: "${existing.name}". You can find them in your customer list.`,
            variant: 'destructive',
          });
          return;
        }
      }

      // Check for existing customer with same name (if no email but name matches)
      if (!customer.email && customer.name) {
        const { data: existingByName } = await supabase
          .from('customers')
          .select('id, name')
          .eq('user_id', user.id)
          .ilike('name', customer.name.trim())
          .maybeSingle();

        if (existingByName) {
          toast({
            title: 'Customer already exists',
            description: `A customer with this name already exists: "${existingByName.name}". You can find them in your customer list.`,
            variant: 'destructive',
          });
          return;
        }
      }

      const { error } = await supabase.from('customers').insert({
        user_id: user.id,
        name: customer.name,
        email: customer.email?.trim().toLowerCase() || null,
        phone: customer.phone,
        address: customer.address,
        notes: customer.notes,
      });

      if (error) throw error;

      void trackUserEvent(user.id, 'feature_use', { eventName: 'customer_added' });

      toast({
        title: 'Customer saved',
        description: `Customer "${customer.name}" has been added.`,
      });

      await loadCustomers();
    } catch (error: unknown) {
      console.error('Customer save error:', error);
      // Narrowed rather than `any`. Postgres surfaces a unique violation as
      // code 23505; older paths only ever set a message, so both are checked.
      const failure = error as { code?: string; message?: string } | null;
      // Handle duplicate constraint error (fallback if check above missed it)
      if (failure?.code === '23505' || failure?.message?.includes('unique')) {
        toast({
          title: 'Customer already exists',
          description: 'A customer with this email already exists in your account.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Save failed',
          description: `Failed to save customer: ${failure?.message || 'Unknown error'}`,
          variant: 'destructive',
        });
      }
    }
  };

  /**
   * Find someone already on the books, or put them on it — and hand back the
   * row either way.
   *
   * `saveCustomer` is the Customers page's function: it refuses a duplicate,
   * says so in a toast, and returns nothing. Booking someone in wants the
   * opposite behaviour on all three counts. If Mrs Hargreaves rang last March
   * the right answer is to attach that record, not to refuse the booking, and
   * the caller needs the id to write onto the event.
   *
   * Matched on phone first, which is what `public-booking` keys on server-side
   * (see its customer upsert) — two records for the same person, one made at
   * the door and one made through the booking link, is exactly the mess that
   * matching differently in two places produces. Email, then an exact name, are
   * the fallbacks for a customer with no number.
   *
   * Throws rather than toasting: the caller is mid-save and has to decide
   * whether the booking still goes ahead.
   */
  const createOrFindCustomer = async (input: {
    name: string;
    phone?: string;
    email?: string;
    address?: string;
  }): Promise<Customer> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('You are signed out — sign in and try again.');

    const name = input.name.trim();
    const phone = input.phone?.trim() || null;
    const email = input.email?.trim().toLowerCase() || null;
    const address = input.address?.trim() || null;
    if (!name) throw new Error('A customer needs a name.');

    /*
     * `limit(1)` then take the head, NOT `.maybeSingle()`.
     *
     * `customers` has no unique constraint on phone, email or name, and there
     * are duplicates on the live table — `maybeSingle()` raises PGRST116 the
     * moment a lookup matches two rows, which would have thrown out of here and
     * killed the booking mid-save for exactly the customers who ring most
     * often. Oldest first, so the record with the history on it wins.
     */
    const findBy = async (column: 'phone' | 'email', value: string) =>
      (
        await supabase
          .from('customers')
          .select('*')
          .eq('user_id', user.id)
          .eq(column, value)
          .order('created_at', { ascending: true })
          .limit(1)
      ).data?.[0] ?? null;

    let row = phone ? await findBy('phone', phone) : null;
    if (!row && email) row = await findBy('email', email);
    if (!row && !phone && !email) {
      row =
        (
          await supabase
            .from('customers')
            .select('*')
            .eq('user_id', user.id)
            .ilike('name', name)
            .order('created_at', { ascending: true })
            .limit(1)
        ).data?.[0] ?? null;
    }

    if (row) {
      /*
       * Fill in the blanks on a record we already had, but never overwrite.
       *
       * Someone booking in over the phone gives whatever is to hand, and that
       * is often less than what is on file — an address typed as "Elm St" must
       * not replace the full one already stored.
       */
      const patch: { email?: string; phone?: string; address?: string } = {};
      if (email && !row.email) patch.email = email;
      if (phone && !row.phone) patch.phone = phone;
      if (address && !row.address) patch.address = address;
      if (Object.keys(patch).length > 0) {
        await supabase.from('customers').update(patch).eq('id', row.id);
        Object.assign(row, patch);
      }
    } else {
      const { data, error } = await supabase
        .from('customers')
        .insert({ user_id: user.id, name, phone, email, address })
        .select('*')
        .single();
      if (error) throw new Error(`Could not save the customer: ${error.message}`);
      row = data;
      void trackUserEvent(user.id, 'feature_use', { eventName: 'customer_added' });
    }

    await loadCustomers();

    return {
      id: row.id,
      name: row.name,
      email: row.email || undefined,
      phone: row.phone || undefined,
      address: row.address || undefined,
      notes: row.notes || undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  };

  // Update customer
  const updateCustomer = async (
    id: string,
    updates: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>
  ) => {
    try {
      const { error } = await supabase.from('customers').update(updates).eq('id', id);

      if (error) throw error;

      toast({
        title: 'Customer updated',
        description: 'Customer details have been updated.',
      });

      await loadCustomers();
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Failed to update customer.',
        variant: 'destructive',
      });
    }
  };

  // Delete customer
  const deleteCustomer = async (id: string) => {
    try {
      const { error } = await supabase.from('customers').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Customer deleted',
        description: 'Customer has been removed.',
      });

      await loadCustomers();
    } catch (error) {
      toast({
        title: 'Delete failed',
        description: 'Failed to delete customer.',
        variant: 'destructive',
      });
    }
  };

  // Export customers to CSV
  const exportCustomers = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Address', 'Notes'],
      ...customers.map((c) => [
        c.name,
        c.email || '',
        c.phone || '',
        c.address || '',
        c.notes || '',
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Export successful',
      description: `Exported ${customers.length} customers to CSV.`,
    });
  };

  return {
    customers,
    isLoading,
    saveCustomer,
    createOrFindCustomer,
    updateCustomer,
    deleteCustomer,
    refreshCustomers: loadCustomers,
    exportCustomers,
  };
};
