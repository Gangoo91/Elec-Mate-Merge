import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export type ActivityType = 'note' | 'call' | 'email' | 'certificate' | 'visit' | 'property_added';

export interface CustomerActivity {
  id: string;
  customerId: string;
  activityType: ActivityType;
  title: string;
  description?: string;
  metadata?: {
    reportId?: string;
    propertyId?: string;
    certificateType?: string;
    certificateNumber?: string;
    status?: string;
    [key: string]: any;
  };
  createdAt: string;
}

interface ActivityInput {
  activityType: ActivityType;
  title: string;
  description?: string;
  metadata?: Record<string, any>;
}

interface ActivityFilters {
  activityType?: ActivityType | 'all';
  limit?: number;
  offset?: number;
}

export const useCustomerActivity = (customerId: string, filters?: ActivityFilters) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch activity log for a customer
  const { data: activities = [], isLoading, refetch } = useQuery({
    queryKey: ['customer-activity', customerId, filters],
    queryFn: async () => {
      if (!customerId) return [];

      let query = supabase
        .from('customer_activity_log')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      // Apply type filter
      if (filters?.activityType && filters.activityType !== 'all') {
        query = query.eq('activity_type', filters.activityType);
      }

      // Apply pagination
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }
      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []).map((a: any) => ({
        id: a.id,
        customerId: a.customer_id,
        activityType: a.activity_type as ActivityType,
        title: a.title,
        description: a.description,
        metadata: a.metadata || {},
        createdAt: a.created_at,
      }));
    },
    enabled: !!customerId,
  });

  // Log new activity
  const logActivityMutation = useMutation({
    mutationFn: async (activity: ActivityInput) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('customer_activity_log')
        .insert({
          customer_id: customerId,
          user_id: user.id,
          activity_type: activity.activityType,
          title: activity.title,
          description: activity.description,
          metadata: activity.metadata || {},
        })
        .select()
        .single();

      if (error) throw error;

      // Update customer's last_activity_at
      await supabase
        .from('customers')
        .update({ last_activity_at: new Date().toISOString() })
        .eq('id', customerId);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-activity', customerId] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to log activity',
        description: error.message || 'Something went wrong.',
        variant: 'destructive',
      });
    },
  });

  // Delete activity
  const deleteActivityMutation = useMutation({
    mutationFn: async (activityId: string) => {
      const { error } = await supabase
        .from('customer_activity_log')
        .delete()
        .eq('id', activityId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-activity', customerId] });
      toast({
        title: 'Activity deleted',
        description: 'The activity has been removed from the timeline.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to delete activity',
        description: error.message || 'Something went wrong.',
        variant: 'destructive',
      });
    },
  });

  // Helper functions for common activity types
  const logNote = (title: string, description?: string) => {
    logActivityMutation.mutate({
      activityType: 'note',
      title,
      description,
    });
  };

  const logCall = (description?: string) => {
    logActivityMutation.mutate({
      activityType: 'call',
      title: 'Phone call logged',
      description,
    });
  };

  const logEmail = (description?: string) => {
    logActivityMutation.mutate({
      activityType: 'email',
      title: 'Email sent',
      description,
    });
  };

  const logVisit = (description?: string, propertyId?: string) => {
    logActivityMutation.mutate({
      activityType: 'visit',
      title: 'Site visit',
      description,
      metadata: propertyId ? { propertyId } : undefined,
    });
  };

  return {
    activities,
    isLoading,
    logActivity: logActivityMutation.mutate,
    logNote,
    logCall,
    logEmail,
    logVisit,
    deleteActivity: deleteActivityMutation.mutate,
    isLogging: logActivityMutation.isPending,
    isDeleting: deleteActivityMutation.isPending,
    refetch,
  };
};

// Activity type icons and colors for UI
export const activityTypeConfig: Record<ActivityType, { icon: string; color: string; label: string }> = {
  note: { icon: 'StickyNote', color: 'text-yellow-400', label: 'Note' },
  call: { icon: 'Phone', color: 'text-green-400', label: 'Call' },
  email: { icon: 'Mail', color: 'text-blue-400', label: 'Email' },
  certificate: { icon: 'FileText', color: 'text-purple-400', label: 'Certificate' },
  visit: { icon: 'MapPin', color: 'text-orange-400', label: 'Site Visit' },
  property_added: { icon: 'Home', color: 'text-cyan-400', label: 'Property Added' },
};
