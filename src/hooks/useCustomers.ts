import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCustomers([]);
        return;
      }

      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name');

      if (error) throw error;

      setCustomers(data.map(c => ({
        id: c.id,
        name: c.name,
        email: c.email || undefined,
        phone: c.phone || undefined,
        address: c.address || undefined,
        notes: c.notes || undefined,
        createdAt: c.created_at,
        updatedAt: c.updated_at,
      })));
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

  // Save customer
  const saveCustomer = async (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('customers')
        .insert({
          user_id: user.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          notes: customer.notes,
        });

      if (error) throw error;

      toast({
        title: 'Customer saved',
        description: `Customer "${customer.name}" has been added.`,
      });

      await loadCustomers();
    } catch (error: any) {
      console.error('Customer save error:', error);
      const errorMsg = error?.message || error?.code || 'Unknown error';
      toast({
        title: 'Save failed',
        description: errorMsg.includes('unique_user_customer_email')
          ? 'A customer with this email already exists.'
          : `Failed to save customer: ${errorMsg}`,
        variant: 'destructive',
      });
    }
  };

  // Update customer
  const updateCustomer = async (id: string, updates: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      const { error } = await supabase
        .from('customers')
        .update(updates)
        .eq('id', id);

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
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);

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
      ...customers.map(c => [
        c.name,
        c.email || '',
        c.phone || '',
        c.address || '',
        c.notes || ''
      ])
    ]
      .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
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
    updateCustomer,
    deleteCustomer,
    refreshCustomers: loadCustomers,
    exportCustomers,
  };
};
