import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  // CRM stats
  certificateCount?: number;
  propertyCount?: number;
  lastActivityAt?: string;
}

export type SortField = 'name' | 'email' | 'createdAt' | 'lastActivityAt' | 'certificateCount' | 'propertyCount';
export type SortDirection = 'asc' | 'desc';

interface UseCustomersOptions {
  pageSize?: number;
  sortField?: SortField;
  sortDirection?: SortDirection;
  searchTerm?: string;
}

export const useCustomers = (options?: UseCustomersOptions) => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = options?.pageSize || 50;
  const sortField = options?.sortField || 'name';
  const sortDirection = options?.sortDirection || 'asc';
  const searchTerm = options?.searchTerm || '';

  // Load customers with stats
  const loadCustomers = useCallback(async (page: number = 1) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCustomers([]);
        setTotalCount(0);
        return;
      }

      // Build the query with stats
      let query = supabase
        .from('customers')
        .select('*', { count: 'exact' });

      // Apply search filter
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`);
      }

      // Apply sorting
      const sortColumn = sortField === 'lastActivityAt' ? 'last_activity_at' :
                         sortField === 'certificateCount' ? 'certificate_count' :
                         sortField === 'propertyCount' ? 'property_count' :
                         sortField === 'createdAt' ? 'created_at' :
                         sortField;

      query = query.order(sortColumn, { ascending: sortDirection === 'asc', nullsFirst: false });

      // Apply pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      setTotalCount(count || 0);
      setCurrentPage(page);
      setCustomers((data || []).map(c => ({
        id: c.id,
        name: c.name,
        email: c.email || undefined,
        phone: c.phone || undefined,
        address: c.address || undefined,
        notes: c.notes || undefined,
        createdAt: c.created_at,
        updatedAt: c.updated_at,
        certificateCount: c.certificate_count || 0,
        propertyCount: c.property_count || 0,
        lastActivityAt: c.last_activity_at || undefined,
      })));
    } catch (error) {
      console.error('Failed to load customers:', error);
    } finally {
      setIsLoading(false);
    }
  }, [pageSize, sortField, sortDirection, searchTerm]);

  // Load on mount and when options change
  useEffect(() => {
    loadCustomers(1);
  }, [loadCustomers]);

  // Get single customer by ID
  const getCustomer = useCallback(async (id: string): Promise<Customer | null> => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        email: data.email || undefined,
        phone: data.phone || undefined,
        address: data.address || undefined,
        notes: data.notes || undefined,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        certificateCount: data.certificate_count || 0,
        propertyCount: data.property_count || 0,
        lastActivityAt: data.last_activity_at || undefined,
      };
    } catch (error) {
      console.error('Failed to get customer:', error);
      return null;
    }
  }, []);

  // Save customer
  const saveCustomer = async (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'certificateCount' | 'propertyCount' | 'lastActivityAt'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('customers')
        .insert({
          user_id: user.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          notes: customer.notes,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Customer saved',
        description: `Customer "${customer.name}" has been added.`,
      });

      await loadCustomers(currentPage);
      return data.id;
    } catch (error) {
      toast({
        title: 'Save failed',
        description: 'Failed to save customer.',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Update customer
  const updateCustomer = async (id: string, updates: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'certificateCount' | 'propertyCount' | 'lastActivityAt'>>) => {
    try {
      const { error } = await supabase
        .from('customers')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Customer updated',
        description: 'Customer details have been updated.',
      });

      await loadCustomers(currentPage);
      return true;
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Failed to update customer.',
        variant: 'destructive',
      });
      return false;
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

      await loadCustomers(currentPage);
      return true;
    } catch (error) {
      toast({
        title: 'Delete failed',
        description: 'Failed to delete customer.',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Export customers to CSV
  const exportCustomers = useCallback(async () => {
    try {
      // Fetch all customers for export (no pagination)
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name');

      if (error) throw error;

      const csvContent = [
        ['Name', 'Email', 'Phone', 'Address', 'Notes', 'Certificates', 'Properties', 'Last Activity'],
        ...(data || []).map(c => [
          c.name,
          c.email || '',
          c.phone || '',
          c.address || '',
          c.notes || '',
          (c.certificate_count || 0).toString(),
          (c.property_count || 0).toString(),
          c.last_activity_at ? new Date(c.last_activity_at).toLocaleDateString('en-GB') : ''
        ])
      ]
        .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
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
        description: `Exported ${data?.length || 0} customers to CSV.`,
      });
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'Failed to export customers.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Pagination helpers
  const totalPages = Math.ceil(totalCount / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      loadCustomers(page);
    }
  }, [loadCustomers, totalPages]);

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      loadCustomers(currentPage + 1);
    }
  }, [hasNextPage, currentPage, loadCustomers]);

  const prevPage = useCallback(() => {
    if (hasPrevPage) {
      loadCustomers(currentPage - 1);
    }
  }, [hasPrevPage, currentPage, loadCustomers]);

  return {
    customers,
    isLoading,
    totalCount,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
    getCustomer,
    saveCustomer,
    updateCustomer,
    deleteCustomer,
    refreshCustomers: () => loadCustomers(currentPage),
    exportCustomers,
  };
};

// Separate hook for fetching a single customer (useful for detail page)
export const useCustomer = (customerId: string) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!customerId) {
        setCustomer(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('id', customerId)
          .single();

        if (error) throw error;

        setCustomer({
          id: data.id,
          name: data.name,
          email: data.email || undefined,
          phone: data.phone || undefined,
          address: data.address || undefined,
          notes: data.notes || undefined,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          certificateCount: data.certificate_count || 0,
          propertyCount: data.property_count || 0,
          lastActivityAt: data.last_activity_at || undefined,
        });
      } catch (error) {
        console.error('Failed to fetch customer:', error);
        setCustomer(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const refetch = useCallback(async () => {
    if (!customerId) return;

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', customerId)
      .single();

    if (!error && data) {
      setCustomer({
        id: data.id,
        name: data.name,
        email: data.email || undefined,
        phone: data.phone || undefined,
        address: data.address || undefined,
        notes: data.notes || undefined,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        certificateCount: data.certificate_count || 0,
        propertyCount: data.property_count || 0,
        lastActivityAt: data.last_activity_at || undefined,
      });
    }
  }, [customerId]);

  return { customer, isLoading, refetch };
};
