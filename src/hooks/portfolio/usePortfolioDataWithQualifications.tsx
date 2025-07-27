import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { PortfolioEntry, PortfolioCategory, PortfolioAnalytics, PortfolioActivity } from '@/types/portfolio';

export const usePortfolioDataWithQualifications = () => {
  const { toast } = useToast();
  const { categories: qualificationCategories, userSelection, updateCompliance, loading: qualLoading } = useQualifications();
  const [entries, setEntries] = useState<PortfolioEntry[]>([]);
  const [analytics, setAnalytics] = useState<PortfolioAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize categories to prevent infinite re-renders
  const categories: PortfolioCategory[] = useMemo(() => 
    qualificationCategories.map(qc => ({
      id: qc.id,
      name: qc.name,
      description: qc.description || '',
      icon: qc.icon || 'folder',
      color: qc.color || 'blue',
      requiredEntries: qc.required_entries,
      completedEntries: entries.filter(e => 
        e.category.id === qc.id && e.status === 'completed'
      ).length
    })), [qualificationCategories, entries]);

  const loadEntries = useCallback(async () => {
    if (!userSelection) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Convert database entries to local format
      const portfolioEntries: PortfolioEntry[] = data.map(item => {
        const category = qualificationCategories.find(c => c.id === item.qualification_category_id);
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
          selfAssessment: 3, // Default rating
          status: item.grade ? 'completed' : 'draft',
          timeSpent: 60, // Default time
          awardingBodyStandards: []
        };
      });

      setEntries(portfolioEntries);
    } catch (error) {
      console.error('Error loading portfolio entries:', error);
      toast({
        title: "Error loading portfolio",
        description: "Failed to load your portfolio entries.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [userSelection, qualificationCategories, toast]);

  // Memoize analytics calculation
  const updateAnalytics = useCallback(() => {
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

    const newAnalytics: PortfolioAnalytics = {
      totalEntries,
      completedEntries,
      totalTimeSpent,
      averageRating,
      categoriesProgress,
      skillsDemo,
      recentActivity
    };

    setAnalytics(newAnalytics);
  }, [entries, categories]);

  // Debounced compliance update
  const updateComplianceTracking = useCallback(async () => {
    if (!userSelection || categories.length === 0) return;

    try {
      for (const category of categories) {
        const completedEntries = entries.filter(e => 
          e.category.id === category.id && e.status === 'completed'
        ).length;

        await updateCompliance(category.id, completedEntries);
      }
    } catch (error) {
      console.error('Error updating compliance:', error);
    }
  }, [userSelection, categories, entries, updateCompliance]);

  // Load entries when qualification changes
  useEffect(() => {
    if (!qualLoading) {
      loadEntries();
    }
  }, [qualLoading, loadEntries]);

  // Update analytics and compliance when entries change
  useEffect(() => {
    if (entries.length >= 0 && categories.length > 0) {
      updateAnalytics();
      updateComplianceTracking();
    }
  }, [entries.length, categories.length, updateAnalytics, updateComplianceTracking]);

  const addEntry = async (entryData: Omit<PortfolioEntry, 'id' | 'dateCreated'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
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

      await loadEntries(); // Reload to get updated data
      
      toast({
        title: "Portfolio entry added",
        description: "Your new portfolio entry has been saved successfully."
      });

      return data.id;
    } catch (error) {
      console.error('Error adding entry:', error);
      toast({
        title: "Error adding entry",
        description: "Failed to add portfolio entry.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateEntry = async (entryId: string, updates: Partial<PortfolioEntry>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
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

      await loadEntries(); // Reload to get updated data
      
      toast({
        title: "Portfolio entry updated",
        description: "Your changes have been saved successfully."
      });
    } catch (error) {
      console.error('Error updating entry:', error);
      toast({
        title: "Error updating entry",
        description: "Failed to update portfolio entry.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteEntry = async (entryId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', entryId)
        .eq('user_id', user.id);

      if (error) throw error;

      await loadEntries(); // Reload to get updated data
      
      toast({
        title: "Portfolio entry deleted",
        description: "The portfolio entry has been removed."
      });
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast({
        title: "Error deleting entry",
        description: "Failed to delete portfolio entry.",
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    entries,
    categories,
    analytics,
    isLoading: isLoading || qualLoading,
    addEntry,
    updateEntry,
    deleteEntry,
    loadData: loadEntries,
    hasQualificationSelected: !!userSelection
  };
};