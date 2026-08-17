import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type CustomerStatus = 'lead' | 'active' | 'inactive';

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  // ELE-1515 — captured from Google Places when the address is chosen from the
  // dropdown. All optional: a hand-typed address remains perfectly valid, so
  // anything reading these must cope with them being absent.
  postcode?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  tags?: string[];
  status?: CustomerStatus;
  companyName?: string;
  createdAt: string;
  updatedAt: string;
  // CRM stats
  certificateCount?: number;
  propertyCount?: number;
  lastActivityAt?: string;
  // ELE-1555 — the electrician's own RAG flag. Separate from the payment
  // reliability computed off invoice history, and takes precedence over it.
  riskRating?: 'green' | 'amber' | 'red';
  riskReason?: string;
  riskUpdatedAt?: string;
  // ELE-1554 — set when this client opted out of THIS electrician's campaigns.
  campaignOptedOutAt?: string;
}

/**
 * Turn a `customers` row into a Customer.
 *
 * This file used to inline the same mapping in four places — loadCustomers,
 * getCustomer, and the fetch and refetch inside useCustomer — and they had
 * already drifted: only loadCustomers mapped `tags`, `status` and
 * `companyName`, so a customer opened on the detail page arrived with no
 * status and no company while the same customer in the list had both. Adding
 * postcode and coordinates to four copies would have made that worse, so
 * there is now one.
 */
type CustomerRow = Record<string, unknown>;

const mapCustomerRow = (row: CustomerRow): Customer => {
  const c = row as {
    id: string;
    name: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    postcode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    notes?: string | null;
    tags?: string[] | null;
    status?: string | null;
    company_name?: string | null;
    created_at: string;
    updated_at: string;
    certificate_count?: number | null;
    property_count?: number | null;
    last_activity_at?: string | null;
    risk_rating?: string | null;
    risk_reason?: string | null;
    risk_updated_at?: string | null;
    campaign_opted_out_at?: string | null;
  };

  return {
    id: c.id,
    name: c.name,
    email: c.email || undefined,
    phone: c.phone || undefined,
    address: c.address || undefined,
    postcode: c.postcode || undefined,
    // `?? undefined` rather than `|| undefined` — a legitimate 0 coordinate
    // would be falsy, and Number.isFinite in the navigate helper is what
    // decides whether a pair is usable.
    latitude: c.latitude ?? undefined,
    longitude: c.longitude ?? undefined,
    notes: c.notes || undefined,
    tags: c.tags || [],
    status: (c.status as CustomerStatus) || 'active',
    companyName: c.company_name || undefined,
    createdAt: c.created_at,
    updatedAt: c.updated_at,
    certificateCount: c.certificate_count || 0,
    propertyCount: c.property_count || 0,
    lastActivityAt: c.last_activity_at || undefined,
    riskRating: (c.risk_rating as Customer['riskRating']) || undefined,
    riskReason: c.risk_reason || undefined,
    riskUpdatedAt: c.risk_updated_at || undefined,
    campaignOptedOutAt: c.campaign_opted_out_at || undefined,
  };
};

export type SortField =
  | 'name'
  | 'email'
  | 'createdAt'
  | 'lastActivityAt'
  | 'certificateCount'
  | 'propertyCount';
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
  const loadCustomers = useCallback(
    async (page: number = 1) => {
      try {
        setIsLoading(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setCustomers([]);
          setTotalCount(0);
          return;
        }

        // Build the query with stats
        let query = supabase.from('customers').select('*', { count: 'exact' });

        // Apply search filter
        if (searchTerm) {
          query = query.or(
            `name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`
          );
        }

        // Apply sorting
        const sortColumn =
          sortField === 'lastActivityAt'
            ? 'last_activity_at'
            : sortField === 'certificateCount'
              ? 'certificate_count'
              : sortField === 'propertyCount'
                ? 'property_count'
                : sortField === 'createdAt'
                  ? 'created_at'
                  : sortField;

        query = query.order(sortColumn, { ascending: sortDirection === 'asc', nullsFirst: false });

        // Apply pagination
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) throw error;

        setTotalCount(count || 0);
        setCurrentPage(page);
        setCustomers((data || []).map(mapCustomerRow));
      } catch (error) {
        console.error('Failed to load customers:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize, sortField, sortDirection, searchTerm]
  );

  // Load on mount and when options change
  useEffect(() => {
    loadCustomers(1);
  }, [loadCustomers]);

  // Get single customer by ID
  const getCustomer = useCallback(async (id: string): Promise<Customer | null> => {
    try {
      const { data, error } = await supabase.from('customers').select('*').eq('id', id).single();

      if (error) throw error;

      return mapCustomerRow(data);
    } catch (error) {
      console.error('Failed to get customer:', error);
      return null;
    }
  }, []);

  // Save customer
  const saveCustomer = async (
    customer: Omit<
      Customer,
      'id' | 'createdAt' | 'updatedAt' | 'certificateCount' | 'propertyCount' | 'lastActivityAt'
    >
  ) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const normalisedEmail = customer.email?.trim().toLowerCase() || null;

      // Check for existing customer with same email
      if (normalisedEmail) {
        const { data: existing } = await supabase
          .from('customers')
          .select('id, name')
          .eq('user_id', user.id)
          .eq('email', normalisedEmail)
          .maybeSingle();

        if (existing) {
          toast({
            title: 'Customer already exists',
            description: `A customer with this email already exists: "${existing.name}".`,
            variant: 'destructive',
          });
          return null;
        }
      }

      // Check for existing customer with same name (when no email)
      if (!normalisedEmail && customer.name) {
        const { data: existingByName } = await supabase
          .from('customers')
          .select('id, name')
          .eq('user_id', user.id)
          .ilike('name', customer.name.trim())
          .maybeSingle();

        if (existingByName) {
          toast({
            title: 'Customer already exists',
            description: `A customer with this name already exists: "${existingByName.name}".`,
            variant: 'destructive',
          });
          return null;
        }
      }

      const { data, error } = await supabase
        .from('customers')
        .insert({
          user_id: user.id,
          name: customer.name,
          email: normalisedEmail,
          phone: customer.phone,
          address: customer.address,
          // ELE-1515 — null rather than undefined so a cleared address also
          // clears the geocode, instead of leaving coordinates pointing at the
          // property the customer used to be at.
          postcode: customer.postcode || null,
          latitude: customer.latitude ?? null,
          longitude: customer.longitude ?? null,
          notes: customer.notes,
          tags: customer.tags || [],
          status: customer.status || 'active',
          company_name: customer.companyName?.trim() || null,
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
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.message?.includes('unique')
          ? 'A customer with this email already exists.'
          : 'Failed to save customer. Please try again.';
      toast({
        title: 'Save failed',
        description: message,
        variant: 'destructive',
      });
      return null;
    }
  };

  // Update customer
  const updateCustomer = async (
    id: string,
    updates: Partial<
      Omit<
        Customer,
        'id' | 'createdAt' | 'updatedAt' | 'certificateCount' | 'propertyCount' | 'lastActivityAt'
      >
    >
  ) => {
    try {
      // companyName is camelCase in the app but company_name in the DB —
      // strip it from the spread and remap. Same for the ELE-1555 risk fields
      // and the ELE-1554 opt-out: left in the spread they reach Postgres as
      // unknown columns and fail the whole update.
      const { companyName, riskRating, riskReason, riskUpdatedAt, campaignOptedOutAt, ...rest } =
        updates;

      // ELE-1515 — clearing a geocode has to send null, not undefined.
      // supabase-js serialises the update as JSON and JSON.stringify drops
      // undefined keys entirely, so `{ latitude: undefined }` is not "set this
      // to nothing", it is "don't touch this column". Coordinates for the
      // customer's old address would have survived a change of address and
      // sent the electrician to the wrong property.
      //
      // Keyed off presence, not value: a caller that never mentions postcode
      // still leaves it alone.
      const geoNulls: Record<string, string | number | null> = {};
      for (const key of ['postcode', 'latitude', 'longitude'] as const) {
        if (key in updates) geoNulls[key] = updates[key] ?? null;
      }

      const normalisedUpdates = {
        ...rest,
        ...geoNulls,
        ...(updates.email !== undefined
          ? { email: updates.email?.trim().toLowerCase() || null }
          : {}),
        ...(companyName !== undefined ? { company_name: companyName?.trim() || null } : {}),
        // Presence-keyed, like the geocode nulls above: clearing a flag has to
        // send null, and a caller that never mentions it must leave it alone.
        ...(riskRating !== undefined ? { risk_rating: riskRating ?? null } : {}),
        ...(riskReason !== undefined ? { risk_reason: riskReason?.trim() || null } : {}),
        ...(riskUpdatedAt !== undefined ? { risk_updated_at: riskUpdatedAt ?? null } : {}),
        ...(campaignOptedOutAt !== undefined
          ? { campaign_opted_out_at: campaignOptedOutAt ?? null }
          : {}),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('customers')
        .update(normalisedUpdates)
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
      const { error } = await supabase.from('customers').delete().eq('id', id);

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
  const exportCustomers = useCallback(async (selectedIds?: string[]) => {
    try {
      // Fetch all customers for export (no pagination). If selectedIds passed,
      // filter to that subset.
      let query = supabase.from('customers').select('*').order('name');
      if (selectedIds && selectedIds.length > 0) {
        query = query.in('id', selectedIds);
      }
      const { data, error } = await query;

      if (error) throw error;

      // Spreadsheets coerce bare digit strings to numbers, dropping the
      // leading 0 (and any +44). Normalise to national format with a space —
      // "07506 026934" — which every spreadsheet keeps as text.
      const formatPhone = (phone?: string | null): string => {
        if (!phone) return '';
        const digits = phone.replace(/[^\d]/g, '');
        let national = digits;
        if (digits.startsWith('44') && digits.length >= 11) national = '0' + digits.slice(2);
        else if (!digits.startsWith('0') && digits.length === 10) national = '0' + digits;
        if (national.length === 11) return `${national.slice(0, 5)} ${national.slice(5)}`;
        return phone;
      };

      const formatDate = (d?: string | null) =>
        d ? new Date(d).toLocaleDateString('en-GB') : '';

      const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

      const csvContent =
        '\ufeff' + // UTF-8 BOM so Excel renders £ and accented names correctly
        [
          [
            'Name',
            'Company',
            'Email',
            'Phone',
            'Address',
            'Status',
            'Tags',
            'Notes',
            'Certificates',
            'Properties',
            'Last activity',
            'Added',
          ],
          ...(data || []).map((c) => {
            const row = c as typeof c & {
              company_name?: string;
              status?: string;
              tags?: string[];
            };
            return [
              row.name,
              row.company_name || '',
              row.email || '',
              formatPhone(row.phone),
              row.address || '',
              capitalise(row.status || 'active'),
              (row.tags || []).join('; '),
              row.notes || '',
              (row.certificate_count || 0).toString(),
              (row.property_count || 0).toString(),
              formatDate(row.last_activity_at),
              formatDate(row.created_at),
            ];
          }),
        ]
          .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
          .join('\r\n');

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

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        loadCustomers(page);
      }
    },
    [loadCustomers, totalPages]
  );

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
    mergeCustomers: async (sourceId: string, targetId: string) => {
      try {
        const { data, error } = await supabase.rpc('merge_customers', {
          source_id: sourceId,
          target_id: targetId,
        });
        if (error) throw error;
        toast({
          title: 'Customers merged',
          description: `Reassigned ${(data as { reassigned?: number })?.reassigned ?? 0} related records.`,
        });
        await loadCustomers(currentPage);
        return true;
      } catch (err) {
        toast({
          title: 'Merge failed',
          description: err instanceof Error ? err.message : 'Try again.',
          variant: 'destructive',
        });
        return false;
      }
    },
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

        setCustomer(mapCustomerRow(data));
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
      setCustomer(mapCustomerRow(data));
    }
  }, [customerId]);

  return { customer, isLoading, refetch };
};
