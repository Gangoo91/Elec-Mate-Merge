import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface CustomerProperty {
  id: string;
  customerId: string;
  address: string;
  propertyType: 'residential' | 'commercial' | 'industrial';
  notes?: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
  certificateCount?: number;
}

interface PropertyInput {
  address: string;
  propertyType?: 'residential' | 'commercial' | 'industrial';
  notes?: string;
  isPrimary?: boolean;
}

export const useCustomerProperties = (customerId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch properties for a customer
  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ['customer-properties', customerId],
    queryFn: async () => {
      if (!customerId) return [];

      const { data, error } = await supabase
        .from('customer_properties')
        .select(`
          *,
          reports:reports(count)
        `)
        .eq('customer_id', customerId)
        .order('is_primary', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map((p: any) => ({
        id: p.id,
        customerId: p.customer_id,
        address: p.address,
        propertyType: p.property_type || 'residential',
        notes: p.notes,
        isPrimary: p.is_primary || false,
        createdAt: p.created_at,
        updatedAt: p.updated_at,
        certificateCount: p.reports?.[0]?.count || 0,
      }));
    },
    enabled: !!customerId,
  });

  // Add property mutation
  const addPropertyMutation = useMutation({
    mutationFn: async (property: PropertyInput) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // If this is set as primary, unset other primaries first
      if (property.isPrimary) {
        await supabase
          .from('customer_properties')
          .update({ is_primary: false })
          .eq('customer_id', customerId);
      }

      const { data, error } = await supabase
        .from('customer_properties')
        .insert({
          customer_id: customerId,
          user_id: user.id,
          address: property.address,
          property_type: property.propertyType || 'residential',
          notes: property.notes,
          is_primary: property.isPrimary || false,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-properties', customerId] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: 'Property added',
        description: 'The property has been added successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to add property',
        description: error.message || 'Something went wrong.',
        variant: 'destructive',
      });
    },
  });

  // Update property mutation
  const updatePropertyMutation = useMutation({
    mutationFn: async ({ propertyId, updates }: { propertyId: string; updates: Partial<PropertyInput> }) => {
      // If setting as primary, unset other primaries first
      if (updates.isPrimary) {
        await supabase
          .from('customer_properties')
          .update({ is_primary: false })
          .eq('customer_id', customerId)
          .neq('id', propertyId);
      }

      const { error } = await supabase
        .from('customer_properties')
        .update({
          address: updates.address,
          property_type: updates.propertyType,
          notes: updates.notes,
          is_primary: updates.isPrimary,
          updated_at: new Date().toISOString(),
        })
        .eq('id', propertyId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-properties', customerId] });
      toast({
        title: 'Property updated',
        description: 'The property has been updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to update property',
        description: error.message || 'Something went wrong.',
        variant: 'destructive',
      });
    },
  });

  // Delete property mutation
  const deletePropertyMutation = useMutation({
    mutationFn: async (propertyId: string) => {
      const { error } = await supabase
        .from('customer_properties')
        .delete()
        .eq('id', propertyId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-properties', customerId] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: 'Property deleted',
        description: 'The property has been removed.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to delete property',
        description: error.message || 'Something went wrong.',
        variant: 'destructive',
      });
    },
  });

  // Set primary property
  const setPrimaryProperty = useCallback(async (propertyId: string) => {
    await updatePropertyMutation.mutateAsync({
      propertyId,
      updates: { isPrimary: true },
    });
  }, [updatePropertyMutation]);

  return {
    properties,
    isLoading,
    addProperty: addPropertyMutation.mutate,
    updateProperty: updatePropertyMutation.mutate,
    deleteProperty: deletePropertyMutation.mutate,
    setPrimaryProperty,
    isAdding: addPropertyMutation.isPending,
    isUpdating: updatePropertyMutation.isPending,
    isDeleting: deletePropertyMutation.isPending,
    refetch,
  };
};
