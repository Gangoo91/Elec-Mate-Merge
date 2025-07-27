import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PortfolioEntry, PortfolioCategory, PortfolioAnalytics, PortfolioActivity } from '@/types/portfolio';

// Cache keys
const CACHE_KEYS = {
  portfolio: 'ultra-fast-portfolio',
  qualifications: 'ultra-fast-qualifications',
  categories: 'ultra-fast-categories',
  analytics: 'ultra-fast-analytics',
  lastSync: 'portfolio-last-sync'
};

// Phase 1: Immediate Response with cached data
const getCachedData = <T,>(key: string, defaultValue: T): T => {
  try {
    const cached = sessionStorage.getItem(key);
    return cached ? JSON.parse(cached) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setCachedData = <T,>(key: string, data: T): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to cache data:', error);
  }
};

// Phase 2: Optimized parallel data loading
const loadAllPortfolioData = async (userId: string) => {
  const [portfolioResponse, qualificationsResponse, categoriesResponse, complianceResponse] = await Promise.all([
    supabase
      .from('portfolio_items')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }),
    
    supabase
      .from('qualification_compliance')
      .select(`
        *,
        qualification_categories (
          id,
          name,
          description,
          icon,
          color,
          required_entries,
          learning_outcomes,
          assessment_criteria
        )
      `)
      .eq('user_id', userId),
    
    supabase
      .from('qualification_categories')
      .select('*'),
    
    supabase
      .from('qualification_compliance')
      .select('*')
      .eq('user_id', userId)
  ]);

  if (portfolioResponse.error) throw portfolioResponse.error;
  if (qualificationsResponse.error) throw qualificationsResponse.error;
  if (categoriesResponse.error) throw categoriesResponse.error;
  if (complianceResponse.error) throw complianceResponse.error;

  return {
    portfolio: portfolioResponse.data || [],
    qualifications: qualificationsResponse.data || [],
    categories: categoriesResponse.data || [],
    compliance: complianceResponse.data || []
  };
};

// Phase 3: Pre-calculated analytics
const calculateAnalytics = (entries: PortfolioEntry[], categories: PortfolioCategory[]): PortfolioAnalytics => {
  const totalEntries = entries.length;
  const completedEntries = entries.filter(e => e.status === 'completed').length;
  const totalTimeSpent = entries.reduce((total, entry) => total + entry.timeSpent, 0);
  const averageRating = entries.length > 0 
    ? entries.reduce((total, entry) => total + entry.selfAssessment, 0) / entries.length 
    : 0;

  const categoriesProgress: { [key: string]: number } = {};
  categories.forEach(category => {
    const categoryEntries = entries.filter(e => e.category.id === category.id && e.status === 'completed');
    categoriesProgress[category.id] = Math.min((categoryEntries.length / category.requiredEntries) * 100, 100);
  });

  const skillsDemo = [...new Set(entries.flatMap(entry => entry.skills))];

  const recentActivity: PortfolioActivity[] = entries
    .slice(-5)
    .map(entry => ({
      id: `activity_${entry.id}`,
      type: 'created',
      entryId: entry.id,
      entryTitle: entry.title,
      date: entry.dateCreated
    }));

  return {
    totalEntries,
    completedEntries,
    totalTimeSpent,
    averageRating,
    categoriesProgress,
    skillsDemo,
    recentActivity
  };
};

export const useUltraFastPortfolio = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Phase 1: Immediate state with cached data
  const [instantData, setInstantData] = useState(() => ({
    entries: getCachedData<PortfolioEntry[]>(`${CACHE_KEYS.portfolio}-entries`, []),
    categories: getCachedData<PortfolioCategory[]>(`${CACHE_KEYS.portfolio}-categories`, []),
    analytics: getCachedData<PortfolioAnalytics | null>(`${CACHE_KEYS.portfolio}-analytics`, null),
    hasData: getCachedData<boolean>(`${CACHE_KEYS.portfolio}-has-data`, false)
  }));

  // Get current user
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Phase 2: Parallel data loading with React Query
  const { data: portfolioData, isLoading, error } = useQuery({
    queryKey: ['ultra-fast-portfolio', user?.id],
    queryFn: () => loadAllPortfolioData(user!.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2, // 2 minutes cache
    refetchOnWindowFocus: false,
  });

  // Cache data when it arrives
  useEffect(() => {
    if (portfolioData) {
      setCachedData(`${CACHE_KEYS.portfolio}-raw`, portfolioData);
      setCachedData(CACHE_KEYS.lastSync, Date.now());
    }
  }, [portfolioData]);

  // Phase 3: Memoized processing of portfolio data
  const processedData = useMemo(() => {
    if (!portfolioData && !instantData.hasData) {
      return {
        entries: [],
        categories: [],
        analytics: null,
        hasQualificationSelected: false
      };
    }

    const data = portfolioData || getCachedData(`${CACHE_KEYS.portfolio}-raw`, null);
    if (!data) {
      return {
        entries: instantData.entries,
        categories: instantData.categories,
        analytics: instantData.analytics,
        hasQualificationSelected: instantData.hasData
      };
    }

    // Transform database entries to local format
    const entries: PortfolioEntry[] = data.portfolio.map(item => {
      const category = data.categories.find(c => c.id === item.qualification_category_id);
      return {
        id: item.id,
        title: item.title,
        description: item.description || '',
        category: category ? {
          id: category.id,
          name: category.name,
          description: category.description || '',
          icon: category.icon || 'folder',
          color: category.color || 'blue',
          requiredEntries: category.required_entries,
          completedEntries: 0
        } : {
          id: 'general',
          name: 'General',
          description: 'General portfolio entries',
          icon: 'folder',
          color: 'gray',
          requiredEntries: 1,
          completedEntries: 0
        },
        skills: item.skills_demonstrated || [],
        reflection: item.reflection_notes || '',
        dateCreated: item.created_at,
        dateCompleted: item.updated_at,
        evidenceFiles: [],
        tags: [],
        assessmentCriteria: item.assessment_criteria_met || [],
        learningOutcomes: item.learning_outcomes_met || [],
        supervisorFeedback: item.supervisor_feedback || '',
        selfAssessment: 3,
        status: item.grade ? 'completed' : 'draft',
        timeSpent: 60,
        awardingBodyStandards: []
      };
    });

    // Transform categories
    const categories: PortfolioCategory[] = data.categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description || '',
      icon: cat.icon || 'folder',
      color: cat.color || 'blue',
      requiredEntries: cat.required_entries,
      completedEntries: entries.filter(e => 
        e.category.id === cat.id && e.status === 'completed'
      ).length
    }));

    // Calculate analytics
    const analytics = calculateAnalytics(entries, categories);

    // Cache processed data
    setCachedData(`${CACHE_KEYS.portfolio}-entries`, entries);
    setCachedData(`${CACHE_KEYS.portfolio}-categories`, categories);
    setCachedData(`${CACHE_KEYS.portfolio}-analytics`, analytics);
    setCachedData(`${CACHE_KEYS.portfolio}-has-data`, true);

    return {
      entries,
      categories,
      analytics,
      hasQualificationSelected: data.qualifications.length > 0
    };
  }, [portfolioData, instantData]);

  // Phase 4: Optimistic mutations
  const addEntryMutation = useMutation({
    mutationFn: async (entryData: Omit<PortfolioEntry, 'id' | 'dateCreated'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('portfolio_items')
        .insert({
          user_id: user.id,
          title: entryData.title,
          description: entryData.description,
          category: entryData.category.name,
          qualification_category_id: entryData.category.id,
          skills_demonstrated: entryData.skills,
          reflection_notes: entryData.reflection,
          assessment_criteria_met: entryData.assessmentCriteria,
          learning_outcomes_met: entryData.learningOutcomes,
          supervisor_feedback: entryData.supervisorFeedback,
          grade: entryData.status === 'completed' ? 'Pass' : null
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onMutate: async (entryData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['ultra-fast-portfolio', user?.id] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(['ultra-fast-portfolio', user?.id]);

      // Optimistically update the UI
      const newEntry: PortfolioEntry = {
        ...entryData,
        id: `temp_${Date.now()}`,
        dateCreated: new Date().toISOString(),
      };

      // Update instant data for immediate UI response
      setInstantData(prev => ({
        ...prev,
        entries: [newEntry, ...prev.entries],
      }));

      return { previousData };
    },
    onError: (err, entryData, context) => {
      // Roll back optimistic update
      if (context?.previousData) {
        queryClient.setQueryData(['ultra-fast-portfolio', user?.id], context.previousData);
      }
      toast({
        title: "Error adding entry",
        description: "Failed to add portfolio entry.",
        variant: "destructive"
      });
    },
    onSuccess: () => {
      toast({
        title: "Portfolio entry added",
        description: "Your new portfolio entry has been saved successfully."
      });
    },
    onSettled: () => {
      // Refetch to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ['ultra-fast-portfolio', user?.id] });
    },
  });

  const updateEntryMutation = useMutation({
    mutationFn: async ({ entryId, updates }: { entryId: string; updates: Partial<PortfolioEntry> }) => {
      if (!user) throw new Error('User not authenticated');

      const updateData: any = {};
      if (updates.title) updateData.title = updates.title;
      if (updates.description) updateData.description = updates.description;
      if (updates.category) {
        updateData.category = updates.category.name;
        updateData.qualification_category_id = updates.category.id;
      }
      if (updates.skills) updateData.skills_demonstrated = updates.skills;
      if (updates.reflection) updateData.reflection_notes = updates.reflection;
      if (updates.assessmentCriteria) updateData.assessment_criteria_met = updates.assessmentCriteria;
      if (updates.learningOutcomes) updateData.learning_outcomes_met = updates.learningOutcomes;
      if (updates.supervisorFeedback) updateData.supervisor_feedback = updates.supervisorFeedback;
      if (updates.status) updateData.grade = updates.status === 'completed' ? 'Pass' : null;

      const { error } = await supabase
        .from('portfolio_items')
        .update(updateData)
        .eq('id', entryId)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Portfolio entry updated",
        description: "Your changes have been saved successfully."
      });
      queryClient.invalidateQueries({ queryKey: ['ultra-fast-portfolio', user?.id] });
    },
    onError: () => {
      toast({
        title: "Error updating entry",
        description: "Failed to update portfolio entry.",
        variant: "destructive"
      });
    },
  });

  const deleteEntryMutation = useMutation({
    mutationFn: async (entryId: string) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', entryId)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Portfolio entry deleted",
        description: "The portfolio entry has been removed."
      });
      queryClient.invalidateQueries({ queryKey: ['ultra-fast-portfolio', user?.id] });
    },
    onError: () => {
      toast({
        title: "Error deleting entry",
        description: "Failed to delete portfolio entry.",
        variant: "destructive"
      });
    },
  });

  // Phase 5: Background refresh
  useEffect(() => {
    const interval = setInterval(() => {
      if (user?.id) {
        queryClient.refetchQueries({ 
          queryKey: ['ultra-fast-portfolio', user.id],
          type: 'active'
        });
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [user?.id, queryClient]);

  return {
    entries: processedData.entries,
    categories: processedData.categories,
    analytics: processedData.analytics,
    isLoading: isLoading && !instantData.hasData, // Only show loading if no cached data
    error,
    hasQualificationSelected: processedData.hasQualificationSelected,
    addEntry: addEntryMutation.mutateAsync,
    updateEntry: (entryId: string, updates: Partial<PortfolioEntry>) => 
      updateEntryMutation.mutateAsync({ entryId, updates }),
    deleteEntry: deleteEntryMutation.mutateAsync,
    isAddingEntry: addEntryMutation.isPending,
    isUpdatingEntry: updateEntryMutation.isPending,
    isDeletingEntry: deleteEntryMutation.isPending,
    refresh: () => queryClient.invalidateQueries({ queryKey: ['ultra-fast-portfolio', user?.id] })
  };
};