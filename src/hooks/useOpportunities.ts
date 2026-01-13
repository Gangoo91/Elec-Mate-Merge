import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Types
export interface TenderOpportunity {
  id: string;
  external_id: string;
  source: string;
  source_url: string;
  title: string;
  description: string | null;
  client_name: string | null;
  client_type: string | null;
  cpv_codes: string[];
  categories: string[];
  sector: string | null;
  value_low: number | null;
  value_high: number | null;
  value_exact: number | null;
  currency: string;
  location_text: string | null;
  postcode: string | null;
  lat: number | null;
  lng: number | null;
  region: string | null;
  published_at: string | null;
  deadline: string | null;
  contract_start: string | null;
  contract_duration: string | null;
  requirements: Record<string, any>;
  framework_required: string | null;
  documents: Array<{ name: string; url: string; type?: string }>;
  scope_of_works: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  relevance_score: number | null;
  ai_summary: string | null;
  estimated_complexity: string | null;
  status: string;
  award_details: Record<string, any> | null;
  fetched_at: string;
  updated_at: string;
  expires_at: string | null;
  // Computed fields from search
  distance_miles?: number | null;
}

export interface TenderSource {
  id: string;
  name: string;
  display_name: string;
  source_type: string;
  sectors: string[];
  regions: string[];
  is_active: boolean;
  last_sync_at: string | null;
  last_sync_count: number;
  error_count: number;
  is_free: boolean;
  website_url: string | null;
  description: string | null;
}

export interface UserTenderPreferences {
  user_id: string;
  base_postcode: string | null;
  base_lat: number | null;
  base_lng: number | null;
  search_radius_miles: number;
  regions: string[];
  min_value: number;
  max_value: number;
  categories: string[];
  sectors: string[];
  accreditations: string[];
  insurance_level: number | null;
  team_capacity: number | null;
  max_contract_value: number | null;
  email_alerts: boolean;
  push_alerts: boolean;
  alert_frequency: string;
}

export interface SearchFilters {
  postcode?: string;
  lat?: number;
  lng?: number;
  radius_miles?: number;
  categories?: string[];
  min_value?: number;
  max_value?: number;
  sector?: string;
  status?: string;
  sort_by?: 'deadline' | 'value' | 'distance' | 'relevance';
  page?: number;
  limit?: number;
}

export interface SearchResult {
  opportunities: TenderOpportunity[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  search_location: {
    postcode: string;
    lat: number;
    lng: number;
    region: string;
  } | null;
  stats: {
    total: number;
    live: number;
    coming_soon: number;
    avg_value: number;
    by_sector: Record<string, number>;
    by_complexity: Record<string, number>;
  };
}

// Search opportunities by location
export function useSearchOpportunities(filters: SearchFilters, enabled = true) {
  return useQuery({
    queryKey: ['opportunities', 'search', filters],
    queryFn: async (): Promise<SearchResult> => {
      const { data, error } = await supabase.functions.invoke('search-opportunities', {
        body: filters,
      });

      if (error) throw error;
      return data as SearchResult;
    },
    enabled: enabled && !!filters.postcode,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get all opportunities (no location filter)
export function useOpportunities(filters?: Partial<SearchFilters>) {
  return useQuery({
    queryKey: ['opportunities', 'all', filters],
    queryFn: async (): Promise<TenderOpportunity[]> => {
      let query = supabase
        .from('tender_opportunities')
        .select('*')
        .eq('status', filters?.status || 'live')
        .order('deadline', { ascending: true });

      if (filters?.categories?.length) {
        query = query.overlaps('categories', filters.categories);
      }

      if (filters?.sector) {
        query = query.eq('sector', filters.sector);
      }

      if (filters?.min_value) {
        query = query.gte('value_low', filters.min_value);
      }

      if (filters?.max_value) {
        query = query.lte('value_high', filters.max_value);
      }

      const { data, error } = await query.limit(filters?.limit || 50);

      if (error) throw error;
      return (data || []) as TenderOpportunity[];
    },
  });
}

// Get single opportunity by ID
export function useOpportunity(id: string | undefined) {
  return useQuery({
    queryKey: ['opportunities', id],
    queryFn: async (): Promise<TenderOpportunity | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('tender_opportunities')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as TenderOpportunity;
    },
    enabled: !!id,
  });
}

// Get tender sources
export function useTenderSources() {
  return useQuery({
    queryKey: ['tender-sources'],
    queryFn: async (): Promise<TenderSource[]> => {
      const { data, error } = await supabase
        .from('tender_sources')
        .select('*')
        .order('display_name');

      if (error) throw error;
      return (data || []) as TenderSource[];
    },
  });
}

// Get user preferences
export function useUserTenderPreferences() {
  return useQuery({
    queryKey: ['user-tender-preferences'],
    queryFn: async (): Promise<UserTenderPreferences | null> => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return null;

      const { data, error } = await supabase
        .from('user_tender_preferences')
        .select('*')
        .eq('user_id', userData.user.id)
        .maybeSingle();

      if (error) throw error;
      return data as UserTenderPreferences | null;
    },
  });
}

// Update user preferences
export function useUpdateTenderPreferences() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (preferences: Partial<UserTenderPreferences>) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_tender_preferences')
        .upsert({
          user_id: userData.user.id,
          ...preferences,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-tender-preferences'] });
      toast({
        title: "Preferences Updated",
        description: "Your tender search preferences have been saved.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Save opportunity (bookmark)
export function useSaveOpportunity() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ opportunityId, notes }: { opportunityId: string; notes?: string }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('saved_opportunities')
        .insert({
          user_id: userData.user.id,
          opportunity_id: opportunityId,
          notes,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-opportunities'] });
      toast({
        title: "Opportunity Saved",
        description: "Added to your saved opportunities.",
      });
    },
    onError: (error: Error) => {
      if (error.message.includes('duplicate')) {
        toast({
          title: "Already Saved",
          description: "This opportunity is already in your saved list.",
        });
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });
}

// Remove saved opportunity
export function useRemoveSavedOpportunity() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (opportunityId: string) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('saved_opportunities')
        .delete()
        .eq('user_id', userData.user.id)
        .eq('opportunity_id', opportunityId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-opportunities'] });
      toast({
        title: "Removed",
        description: "Opportunity removed from saved list.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Get saved opportunities
export function useSavedOpportunities() {
  return useQuery({
    queryKey: ['saved-opportunities'],
    queryFn: async (): Promise<(TenderOpportunity & { saved_at: string; notes: string | null })[]> => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return [];

      const { data, error } = await supabase
        .from('saved_opportunities')
        .select(`
          created_at,
          notes,
          opportunity:tender_opportunities(*)
        `)
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map((item: any) => ({
        ...item.opportunity,
        saved_at: item.created_at,
        notes: item.notes,
      }));
    },
  });
}

// Sync opportunities from a source
export function useSyncOpportunities() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (sourceName: string) => {
      const { data, error } = await supabase.functions.invoke(`sync-${sourceName}`, {});

      if (error) throw error;
      return data;
    },
    onSuccess: (data, sourceName) => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['tender-sources'] });
      toast({
        title: "Sync Complete",
        description: `Fetched ${data?.inserted || 0} new opportunities from ${sourceName}.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Sync Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Create tender application from opportunity
export function useCreateTenderApplication() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      opportunityId,
      tenderId,
      bidDetails,
    }: {
      opportunityId: string;
      tenderId?: string;
      bidDetails?: {
        bid_price?: number;
        bid_breakdown?: Record<string, any>;
        programme_weeks?: number;
        team_size?: number;
        start_date?: string;
        method_statement?: string;
      };
    }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('tender_applications')
        .insert({
          user_id: userData.user.id,
          opportunity_id: opportunityId,
          tender_id: tenderId,
          status: 'draft',
          ...bidDetails,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tender-applications'] });
      toast({
        title: "Application Created",
        description: "Your tender application has been started.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Get user's tender applications
export function useTenderApplications() {
  return useQuery({
    queryKey: ['tender-applications'],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return [];

      const { data, error } = await supabase
        .from('tender_applications')
        .select(`
          *,
          opportunity:tender_opportunities(*),
          tender:tenders(*)
        `)
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
}

// Helper: Format value for display
export function formatOpportunityValue(opp: TenderOpportunity): string {
  if (opp.value_exact) {
    return `£${opp.value_exact.toLocaleString()}`;
  }
  if (opp.value_low && opp.value_high) {
    return `£${opp.value_low.toLocaleString()} - £${opp.value_high.toLocaleString()}`;
  }
  if (opp.value_low) {
    return `From £${opp.value_low.toLocaleString()}`;
  }
  if (opp.value_high) {
    return `Up to £${opp.value_high.toLocaleString()}`;
  }
  return 'Value not specified';
}

// Helper: Format deadline for display
export function formatDeadline(deadline: string | null): { text: string; urgent: boolean } {
  if (!deadline) {
    return { text: 'No deadline', urgent: false };
  }

  const now = new Date();
  const deadlineDate = new Date(deadline);
  const daysUntil = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil < 0) {
    return { text: 'Expired', urgent: true };
  }
  if (daysUntil === 0) {
    return { text: 'Due today', urgent: true };
  }
  if (daysUntil === 1) {
    return { text: '1 day left', urgent: true };
  }
  if (daysUntil <= 7) {
    return { text: `${daysUntil} days left`, urgent: true };
  }
  if (daysUntil <= 14) {
    return { text: `${daysUntil} days left`, urgent: false };
  }

  return { text: deadlineDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }), urgent: false };
}

// Helper: Get category badge color
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    electrical: 'bg-yellow-500/20 text-yellow-400',
    fire_alarm: 'bg-red-500/20 text-red-400',
    emergency_lighting: 'bg-orange-500/20 text-orange-400',
    testing: 'bg-blue-500/20 text-blue-400',
    rewire: 'bg-purple-500/20 text-purple-400',
    consumer_units: 'bg-green-500/20 text-green-400',
    ev_charging: 'bg-emerald-500/20 text-emerald-400',
    data_cabling: 'bg-cyan-500/20 text-cyan-400',
  };

  return colors[category] || 'bg-gray-500/20 text-gray-400';
}

// Helper: Get sector display name
export function getSectorDisplayName(sector: string | null): string {
  const names: Record<string, string> = {
    public: 'Public Sector',
    housing: 'Housing',
    healthcare: 'NHS / Healthcare',
    education: 'Education',
    local_authority: 'Local Council',
    private: 'Private Sector',
  };

  return names[sector || ''] || sector || 'Other';
}

// Helper: Get complexity badge
export function getComplexityBadge(complexity: string | null): { text: string; color: string } {
  switch (complexity) {
    case 'simple':
      return { text: 'Simple', color: 'bg-green-500/20 text-green-400' };
    case 'standard':
      return { text: 'Standard', color: 'bg-blue-500/20 text-blue-400' };
    case 'complex':
      return { text: 'Complex', color: 'bg-orange-500/20 text-orange-400' };
    default:
      return { text: 'Standard', color: 'bg-blue-500/20 text-blue-400' };
  }
}
