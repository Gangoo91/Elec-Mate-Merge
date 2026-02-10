
import { useState, useEffect, useCallback } from "react";
import { PortfolioEntry, PortfolioCategory, PortfolioAnalytics, PortfolioActivity, PortfolioGroup, PortfolioFile } from "@/types/portfolio";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLearningXP } from '@/hooks/useLearningXP';

const defaultCategories: PortfolioCategory[] = [
  {
    id: 'practical-skills',
    name: 'Practical Skills',
    description: 'Hands-on electrical work and installations',
    icon: 'wrench',
    color: 'blue',
    requiredEntries: 8,
    completedEntries: 0,
    groupTheme: 'core-technical',
    competencyLevel: 'foundation'
  },
  {
    id: 'health-safety',
    name: 'Health & Safety',
    description: 'Safety procedures and risk assessments',
    icon: 'shield',
    color: 'green',
    requiredEntries: 5,
    completedEntries: 0,
    groupTheme: 'safety-compliance',
    competencyLevel: 'foundation'
  },
  {
    id: 'testing-inspection',
    name: 'Testing & Inspection',
    description: 'Electrical testing and certification work',
    icon: 'search',
    color: 'yellow',
    requiredEntries: 6,
    completedEntries: 0,
    groupTheme: 'core-technical',
    competencyLevel: 'intermediate'
  },
  {
    id: 'customer-service',
    name: 'Customer Service',
    description: 'Client interactions and communication',
    icon: 'users',
    color: 'purple',
    requiredEntries: 4,
    completedEntries: 0,
    groupTheme: 'professional-skills',
    competencyLevel: 'foundation'
  },
  {
    id: 'professional-development',
    name: 'Professional Development',
    description: 'Learning and skill enhancement activities',
    icon: 'graduation-cap',
    color: 'orange',
    requiredEntries: 3,
    completedEntries: 0,
    groupTheme: 'professional-skills',
    competencyLevel: 'intermediate'
  },
  {
    id: 'advanced-installations',
    name: 'Advanced Installations',
    description: 'Complex electrical systems and installations',
    icon: 'settings',
    color: 'red',
    requiredEntries: 4,
    completedEntries: 0,
    groupTheme: 'core-technical',
    competencyLevel: 'advanced'
  },
  {
    id: 'regulatory-compliance',
    name: 'Regulatory Compliance',
    description: 'BS7671 and industry standards compliance',
    icon: 'clipboard-check',
    color: 'emerald',
    requiredEntries: 3,
    completedEntries: 0,
    groupTheme: 'safety-compliance',
    competencyLevel: 'intermediate'
  },
  {
    id: 'site-diary-evidence',
    name: 'Site Diary Evidence',
    description: 'Portfolio evidence captured from site diary entries',
    icon: 'notebook-pen',
    color: 'cyan',
    requiredEntries: 0,
    completedEntries: 0,
    groupTheme: 'professional-skills',
    competencyLevel: 'foundation'
  }
];

// Map database row to PortfolioEntry
const mapDbToEntry = (row: any): PortfolioEntry => {
  const category = defaultCategories.find(c => c.id === row.category) || {
    id: row.category,
    name: row.category,
    description: '',
    icon: 'folder',
    color: 'gray',
    requiredEntries: 0,
    completedEntries: 0
  };

  // Parse storage_urls to PortfolioFile array
  const evidenceFiles: PortfolioFile[] = (row.storage_urls || []).map((file: any, idx: number) => ({
    id: file.id || `file_${idx}`,
    name: file.name || 'Unknown',
    type: file.type || 'unknown',
    size: file.size || 0,
    url: file.url,
    uploadDate: file.uploadDate || row.created_at
  }));

  return {
    id: row.id,
    title: row.title,
    description: row.description || '',
    category,
    skills: row.skills_demonstrated || [],
    reflection: row.reflection_notes || '',
    dateCreated: row.created_at,
    dateCompleted: row.date_completed,
    evidenceFiles,
    tags: row.tags || [],
    assessmentCriteria: row.assessment_criteria_met || [],
    learningOutcomes: row.learning_outcomes_met || [],
    supervisorFeedback: row.supervisor_feedback,
    selfAssessment: row.self_assessment || 3,
    status: row.status || 'draft',
    timeSpent: row.time_spent || 0,
    awardingBodyStandards: row.awarding_body_standards || [],
    isVerified: row.is_supervisor_verified || false,
  };
};

// Map PortfolioEntry to database row
const mapEntryToDb = (entry: Omit<PortfolioEntry, 'id' | 'dateCreated'>, userId: string) => {
  // Convert evidenceFiles to storage_urls format
  const storageUrls = entry.evidenceFiles?.map(file => ({
    id: file.id,
    name: file.name,
    type: file.type,
    size: file.size,
    url: file.url,
    uploadDate: file.uploadDate
  })) || [];

  return {
    user_id: userId,
    title: entry.title,
    description: entry.description,
    category: entry.category.id,
    skills_demonstrated: entry.skills,
    reflection_notes: entry.reflection,
    tags: entry.tags,
    assessment_criteria_met: entry.assessmentCriteria,
    learning_outcomes_met: entry.learningOutcomes,
    supervisor_feedback: entry.supervisorFeedback,
    self_assessment: entry.selfAssessment,
    status: entry.status,
    time_spent: entry.timeSpent,
    awarding_body_standards: entry.awardingBodyStandards,
    storage_urls: storageUrls,
    evidence_count: storageUrls.length,
    date_completed: entry.status === 'completed' ? new Date().toISOString() : null
  };
};

// Helper to get group info by theme
const getGroupInfo = (theme: string) => {
  const groupMap = {
    'core-technical': {
      name: 'Core Technical Skills',
      description: 'Fundamental electrical installations and technical competencies',
      icon: 'zap',
      color: 'blue',
      competencyLevel: 'foundation' as const
    },
    'safety-compliance': {
      name: 'Safety & Compliance',
      description: 'Health, safety, and regulatory compliance requirements',
      icon: 'shield',
      color: 'green',
      competencyLevel: 'foundation' as const
    },
    'professional-skills': {
      name: 'Professional Skills',
      description: 'Communication, customer service, and professional development',
      icon: 'users',
      color: 'purple',
      competencyLevel: 'intermediate' as const
    }
  };

  return groupMap[theme as keyof typeof groupMap] || {
    name: theme,
    description: '',
    icon: 'folder',
    color: 'gray',
    competencyLevel: 'foundation' as const
  };
};

export const usePortfolioData = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { logActivity } = useLearningXP();
  const [entries, setEntries] = useState<PortfolioEntry[]>([]);
  const [categories, setCategories] = useState<PortfolioCategory[]>(defaultCategories);
  const [analytics, setAnalytics] = useState<PortfolioAnalytics | null>(null);
  const [groups, setGroups] = useState<PortfolioGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from Supabase
  const loadData = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedEntries = (data || []).map(mapDbToEntry);
      setEntries(mappedEntries);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      toast({
        title: "Error loading portfolio",
        description: "Failed to load your portfolio data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, toast]);

  // Load data on mount and when user changes
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Set up real-time subscription
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('portfolio_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_items',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newEntry = mapDbToEntry(payload.new);
            setEntries(prev => [newEntry, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedEntry = mapDbToEntry(payload.new);
            setEntries(prev => prev.map(e => e.id === updatedEntry.id ? updatedEntry : e));
          } else if (payload.eventType === 'DELETE') {
            setEntries(prev => prev.filter(e => e.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  // Update analytics and groups when entries change
  useEffect(() => {
    // Calculate analytics
    const totalEntries = entries.length;
    const completedEntries = entries.filter(e => e.status === 'completed').length;
    const totalTimeSpent = entries.reduce((total, entry) => total + entry.timeSpent, 0);
    const validRatings = entries.filter(e => e.selfAssessment > 0);
    const averageRating = validRatings.length > 0
      ? validRatings.reduce((total, entry) => total + entry.selfAssessment, 0) / validRatings.length
      : 0;

    const categoriesProgress: { [key: string]: number } = {};
    categories.forEach(category => {
      const categoryEntries = entries.filter(e => e.category.id === category.id && e.status === 'completed');
      categoriesProgress[category.id] = Math.min((categoryEntries.length / category.requiredEntries) * 100, 100);
    });

    const skillsDemo = [...new Set(entries.flatMap(entry => entry.skills))];

    const recentActivity: PortfolioActivity[] = entries
      .slice(0, 5)
      .map(entry => ({
        id: `activity_${entry.id}`,
        type: entry.status === 'completed' ? 'completed' :
              entry.status === 'reviewed' ? 'reviewed' : 'created',
        entryId: entry.id,
        entryTitle: entry.title,
        date: entry.dateCreated
      }));

    setAnalytics({
      totalEntries,
      completedEntries,
      totalTimeSpent,
      averageRating,
      categoriesProgress,
      skillsDemo,
      recentActivity
    });

    // Calculate groups
    const groupThemes = [...new Set(categories.map(cat => cat.groupTheme).filter(Boolean))];
    const newGroups: PortfolioGroup[] = groupThemes.map(theme => {
      const themeCategories = categories.filter(cat => cat.groupTheme === theme);
      const totalRequired = themeCategories.reduce((sum, cat) => sum + cat.requiredEntries, 0);
      const totalCompleted = themeCategories.reduce((sum, cat) => {
        const completedEntries = entries.filter(e => e.category.id === cat.id && e.status === 'completed').length;
        return sum + completedEntries;
      }, 0);

      const groupInfo = getGroupInfo(theme!);

      return {
        id: theme!,
        name: groupInfo.name,
        description: groupInfo.description,
        icon: groupInfo.icon,
        color: groupInfo.color,
        categories: themeCategories,
        totalRequired,
        totalCompleted,
        progressPercentage: totalRequired > 0 ? Math.round((totalCompleted / totalRequired) * 100) : 0,
        competencyLevel: groupInfo.competencyLevel
      };
    });

    setGroups(newGroups);
  }, [entries, categories]);

  const addEntry = async (entryData: Omit<PortfolioEntry, 'id' | 'dateCreated'>) => {
    if (!user?.id) {
      toast({
        title: "Not authenticated",
        description: "Please sign in to add portfolio entries.",
        variant: "destructive"
      });
      return null;
    }

    try {
      const dbData = mapEntryToDb(entryData, user.id);

      const { data, error } = await supabase
        .from('portfolio_items')
        .insert(dbData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Portfolio entry added",
        description: "Your new portfolio entry has been saved successfully."
      });

      // Log XP for portfolio evidence
      logActivity({
        activityType: 'portfolio_evidence',
        sourceId: data.id,
        sourceTitle: `Portfolio: ${entryData.title}`,
        metadata: {
          category: entryData.category.id,
          status: entryData.status,
        },
      });

      return data.id;
    } catch (error) {
      console.error('Error adding entry:', error);
      toast({
        title: "Error saving portfolio",
        description: "Failed to save your portfolio entry. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateEntry = async (entryId: string, updates: Partial<PortfolioEntry>) => {
    if (!user?.id) return;

    // Optimistic update
    setEntries(prev => prev.map(entry =>
      entry.id === entryId ? { ...entry, ...updates } : entry
    ));

    try {
      const updateData: any = {};

      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.category !== undefined) updateData.category = updates.category.id;
      if (updates.skills !== undefined) updateData.skills_demonstrated = updates.skills;
      if (updates.reflection !== undefined) updateData.reflection_notes = updates.reflection;
      if (updates.tags !== undefined) updateData.tags = updates.tags;
      if (updates.assessmentCriteria !== undefined) updateData.assessment_criteria_met = updates.assessmentCriteria;
      if (updates.learningOutcomes !== undefined) updateData.learning_outcomes_met = updates.learningOutcomes;
      if (updates.supervisorFeedback !== undefined) updateData.supervisor_feedback = updates.supervisorFeedback;
      if (updates.selfAssessment !== undefined) updateData.self_assessment = updates.selfAssessment;
      if (updates.status !== undefined) {
        updateData.status = updates.status;
        if (updates.status === 'completed') {
          updateData.date_completed = new Date().toISOString();
        }
      }
      if (updates.timeSpent !== undefined) updateData.time_spent = updates.timeSpent;
      if (updates.awardingBodyStandards !== undefined) updateData.awarding_body_standards = updates.awardingBodyStandards;
      if (updates.evidenceFiles !== undefined) {
        updateData.storage_urls = updates.evidenceFiles.map(file => ({
          id: file.id,
          name: file.name,
          type: file.type,
          size: file.size,
          url: file.url,
          uploadDate: file.uploadDate
        }));
        updateData.evidence_count = updates.evidenceFiles.length;
      }

      updateData.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from('portfolio_items')
        .update(updateData)
        .eq('id', entryId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Portfolio entry updated",
        description: "Your changes have been saved successfully."
      });
    } catch (error) {
      console.error('Error updating entry:', error);
      // Revert optimistic update
      loadData();
      toast({
        title: "Error updating portfolio",
        description: "Failed to save your changes. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteEntry = async (entryId: string) => {
    if (!user?.id) return;

    // Get the entry to delete its files from storage
    const entryToDelete = entries.find(e => e.id === entryId);

    // Optimistic update
    setEntries(prev => prev.filter(entry => entry.id !== entryId));

    try {
      // Delete files from storage if any
      if (entryToDelete?.evidenceFiles?.length) {
        const filePaths = entryToDelete.evidenceFiles
          .filter(f => f.url)
          .map(f => {
            // Extract path from URL
            const url = f.url!;
            const match = url.match(/portfolio-evidence\/(.+)$/);
            return match ? match[1] : null;
          })
          .filter(Boolean);

        if (filePaths.length > 0) {
          await supabase.storage
            .from('portfolio-evidence')
            .remove(filePaths as string[]);
        }
      }

      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', entryId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Portfolio entry deleted",
        description: "The portfolio entry has been removed."
      });
    } catch (error) {
      console.error('Error deleting entry:', error);
      // Revert optimistic update
      loadData();
      toast({
        title: "Error deleting portfolio",
        description: "Failed to delete the entry. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getEntriesByGroup = (groupId: string) => {
    const groupCategories = categories.filter(cat => cat.groupTheme === groupId).map(cat => cat.id);
    return entries.filter(entry => groupCategories.includes(entry.category.id));
  };

  const getEntriesByCompetencyLevel = (level: 'foundation' | 'intermediate' | 'advanced') => {
    const levelCategories = categories.filter(cat => cat.competencyLevel === level).map(cat => cat.id);
    return entries.filter(entry => levelCategories.includes(entry.category.id));
  };

  return {
    entries,
    categories,
    groups,
    analytics,
    isLoading,
    addEntry,
    updateEntry,
    deleteEntry,
    loadData,
    getEntriesByGroup,
    getEntriesByCompetencyLevel
  };
};
