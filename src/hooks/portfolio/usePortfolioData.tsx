import { useState, useEffect, useCallback, useRef } from 'react';
import {
  PortfolioEntry,
  PortfolioCategory,
  PortfolioAnalytics,
  PortfolioActivity,
  PortfolioGroup,
  PortfolioFile,
} from '@/types/portfolio';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
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
    competencyLevel: 'foundation',
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
    competencyLevel: 'foundation',
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
    competencyLevel: 'intermediate',
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
    competencyLevel: 'foundation',
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
    competencyLevel: 'intermediate',
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
    competencyLevel: 'advanced',
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
    competencyLevel: 'intermediate',
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
    competencyLevel: 'foundation',
  },
];

// Map a junction-table evidence file row to PortfolioFile
const mapEvidenceFileRow = (row: any): PortfolioFile => ({
  id: row.id,
  name: row.file_name || 'Unknown',
  type: row.file_type || 'unknown',
  size: Number(row.file_size) || 0,
  url: row.public_url,
  uploadDate: row.created_at,
});

// Map database row to PortfolioEntry
// `evidenceFileRows` comes from the junction table join; falls back to legacy storage_urls
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const mapDbToEntry = (
  row: any,
  evidenceFileRows?: any[],
  countersignedIds?: Set<string>,
  categoryNames?: Map<string, string>
): PortfolioEntry => {
  /*
   * 🔴 `portfolio_items.category` is a mixed-type text column. It holds a
   * display name ("Reflection & Learning"), a slug ("site-diary-evidence"),
   * OR a `qualification_categories.id` UUID, depending on which capture path
   * wrote the row.
   *
   * The UUID case fell straight through to `name: row.category`, so the
   * detail sheet rendered "b0ef4374-f154-4557-a9dc-ed7915f2eff3" as a chip
   * beside the status — a raw database id shown to the learner where
   * "Installation Methods" belongs. It affects 4 of the 19 rows in production
   * and every surface that prints a category: the chip, the filters and the
   * evidence pack the assessor reads.
   *
   * Resolve it here rather than at each call site, so one fix covers them all.
   */
  const rawCategory: string = row.category ?? '';
  const resolvedName =
    (UUID_RE.test(rawCategory) ? categoryNames?.get(rawCategory) : undefined) ?? rawCategory;

  const category = defaultCategories.find((c) => c.id === row.category) || {
    id: row.category,
    name: resolvedName,
    description: '',
    icon: 'folder',
    color: 'gray',
    requiredEntries: 0,
    completedEntries: 0,
  };

  // Prefer junction-table rows; fall back to legacy storage_urls JSONB
  const evidenceFiles: PortfolioFile[] = evidenceFileRows
    ? evidenceFileRows.map(mapEvidenceFileRow)
    : (row.storage_urls || []).map((file: any, idx: number) => ({
        id: file.id || `file_${idx}`,
        name: file.name || 'Unknown',
        type: file.type || 'unknown',
        size: file.size || 0,
        url: file.url,
        uploadDate: file.uploadDate || row.created_at,
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
    /*
     * 🔴 This read `is_supervisor_verified` alone.
     *
     * That column is NOT the verification record. The real one is
     * `supervisor_verifications` — the QR flow where a named supervisor
     * countersigns the evidence and `verified_at` is stamped. The column is a
     * loose mirror of it with no trigger keeping the two in step, and RLS
     * gives the learner a blanket own-row UPDATE while giving assessors SELECT
     * only, so the learner is the only party who can set it directly.
     *
     * They already disagree in production: one item carries the flag with no
     * countersignature behind it at all. The grid was therefore badging an
     * item "Verified" on the strength of a boolean the learner controls.
     *
     * Trust the signature, not the flag.
     */
    isVerified: countersignedIds ? countersignedIds.has(row.id) : false,
    metadata:
      row.metadata && typeof row.metadata === 'object' && !Array.isArray(row.metadata)
        ? row.metadata
        : {},
  };
};

// Map PortfolioEntry to database row
const mapEntryToDb = (entry: Omit<PortfolioEntry, 'id' | 'dateCreated'>, userId: string) => {
  // Convert evidenceFiles to storage_urls format
  const storageUrls =
    entry.evidenceFiles?.map((file) => ({
      id: file.id,
      name: file.name,
      type: file.type,
      size: file.size,
      url: file.url,
      uploadDate: file.uploadDate,
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
    metadata: entry.metadata ?? {},
    storage_urls: storageUrls,
    evidence_count: storageUrls.length,
    date_completed: entry.status === 'completed' ? new Date().toISOString() : null,
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
      competencyLevel: 'foundation' as const,
    },
    'safety-compliance': {
      name: 'Safety & Compliance',
      description: 'Health, safety, and regulatory compliance requirements',
      icon: 'shield',
      color: 'green',
      competencyLevel: 'foundation' as const,
    },
    'professional-skills': {
      name: 'Professional Skills',
      description: 'Communication, customer service, and professional development',
      icon: 'users',
      color: 'purple',
      competencyLevel: 'intermediate' as const,
    },
  };

  return (
    groupMap[theme as keyof typeof groupMap] || {
      name: theme,
      description: '',
      icon: 'folder',
      color: 'gray',
      competencyLevel: 'foundation' as const,
    }
  );
};

// Monotonic counter so every subscription gets a unique realtime channel
// name. A fixed name lets the Supabase client reuse a still-registered,
// already-subscribed channel across remounts/HMR — or collide when several
// components mount usePortfolioData at once — and adding `postgres_changes`
// callbacks after `.subscribe()` throws. A fresh name guarantees `.on()` is
// always attached before `.subscribe()`.
let portfolioChannelSeq = 0;

export const usePortfolioData = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { logActivity } = useLearningXP();
  const [entries, setEntries] = useState<PortfolioEntry[]>([]);
  const [categories, setCategories] = useState<PortfolioCategory[]>(defaultCategories);
  const [analytics, setAnalytics] = useState<PortfolioAnalytics | null>(null);
  const [groups, setGroups] = useState<PortfolioGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  /*
   * The realtime handler maps rows too, and it has to map them the SAME way
   * as the initial fetch. Without these, a realtime UPDATE would re-run
   * mapDbToEntry with no lookups and silently strip the Verified badge and
   * re-expose the raw category UUID until the next full reload.
   */
  const countersignedRef = useRef<Set<string>>(new Set());
  const categoryNamesRef = useRef<Map<string, string>>(new Map());

  // Load data from Supabase
  const loadData = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      // Evidence file URLs live on portfolio_items.storage_urls (no junction table).
      const [{ data: rows, error: rowsError }, { data: categoryRows }, { data: verifications }] =
        await Promise.all([
        supabase
          .from('portfolio_items')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        // Category names, for rows whose `category` is a qualification
        // category id rather than a label.
        supabase.from('qualification_categories').select('id, name'),
        // Only rows a supervisor has actually signed — a pending request has
        // portfolio_item_id but no verified_at, and must not read as verified.
        supabase
          .from('supervisor_verifications')
          .select('portfolio_item_id, verified_at')
          .eq('requested_by', user.id)
          .not('verified_at', 'is', null),
      ]);
      if (rowsError) throw rowsError;

      const countersignedIds = new Set<string>(
        ((verifications ?? []) as Array<{ portfolio_item_id: string | null }>)
          .map((v) => v.portfolio_item_id)
          .filter((id): id is string => !!id)
      );

      const categoryNames = new Map<string, string>(
        ((categoryRows ?? []) as Array<{ id: string; name: string | null }>)
          .filter((c) => !!c.name)
          .map((c) => [c.id, c.name as string])
      );

      countersignedRef.current = countersignedIds;
      categoryNamesRef.current = categoryNames;

      const mappedEntries = (rows || []).map((row: any) =>
        mapDbToEntry(row, undefined, countersignedIds, categoryNames)
      );
      setEntries(mappedEntries);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      toast({
        title: 'Error loading portfolio',
        description: 'Failed to load your portfolio data. Please try again.',
        variant: 'destructive',
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
      .channel(`portfolio_changes-${user.id}-${++portfolioChannelSeq}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_items',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newEntry = mapDbToEntry(
              payload.new,
              undefined,
              countersignedRef.current,
              categoryNamesRef.current
            );
            setEntries((prev) => [newEntry, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedEntry = mapDbToEntry(
              payload.new,
              undefined,
              countersignedRef.current,
              categoryNamesRef.current
            );
            setEntries((prev) => prev.map((e) => (e.id === updatedEntry.id ? updatedEntry : e)));
          } else if (payload.eventType === 'DELETE') {
            setEntries((prev) => prev.filter((e) => e.id !== payload.old.id));
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
    const completedEntries = entries.filter((e) => e.status === 'completed').length;
    const totalTimeSpent = entries.reduce((total, entry) => total + entry.timeSpent, 0);
    const validRatings = entries.filter((e) => e.selfAssessment > 0);
    const averageRating =
      validRatings.length > 0
        ? validRatings.reduce((total, entry) => total + entry.selfAssessment, 0) /
          validRatings.length
        : 0;

    const categoriesProgress: { [key: string]: number } = {};
    categories.forEach((category) => {
      const categoryEntries = entries.filter(
        (e) => e.category.id === category.id && e.status === 'completed'
      );
      categoriesProgress[category.id] = Math.min(
        (categoryEntries.length / category.requiredEntries) * 100,
        100
      );
    });

    const skillsDemo = [...new Set(entries.flatMap((entry) => entry.skills))];

    const recentActivity: PortfolioActivity[] = entries.slice(0, 5).map((entry) => ({
      id: `activity_${entry.id}`,
      type:
        entry.status === 'completed'
          ? 'completed'
          : entry.status === 'reviewed'
            ? 'reviewed'
            : 'created',
      entryId: entry.id,
      entryTitle: entry.title,
      date: entry.dateCreated,
    }));

    setAnalytics({
      totalEntries,
      completedEntries,
      totalTimeSpent,
      averageRating,
      categoriesProgress,
      skillsDemo,
      recentActivity,
    });

    // Calculate groups
    const groupThemes = [...new Set(categories.map((cat) => cat.groupTheme).filter(Boolean))];
    const newGroups: PortfolioGroup[] = groupThemes.map((theme) => {
      const themeCategories = categories.filter((cat) => cat.groupTheme === theme);
      const totalRequired = themeCategories.reduce((sum, cat) => sum + cat.requiredEntries, 0);
      const totalCompleted = themeCategories.reduce((sum, cat) => {
        const completedEntries = entries.filter(
          (e) => e.category.id === cat.id && e.status === 'completed'
        ).length;
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
        progressPercentage:
          totalRequired > 0 ? Math.round((totalCompleted / totalRequired) * 100) : 0,
        competencyLevel: groupInfo.competencyLevel,
      };
    });

    setGroups(newGroups);
  }, [entries, categories]);

  const addEntry = async (entryData: Omit<PortfolioEntry, 'id' | 'dateCreated'>) => {
    if (!user?.id) {
      toast({
        title: 'Not authenticated',
        description: 'Please sign in to add portfolio entries.',
        variant: 'destructive',
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

      // Evidence file URLs persist on portfolio_items.storage_urls (see
      // mapEntryToDb) — no separate junction table.

      toast({
        title: 'Portfolio entry added',
        description: 'Your new portfolio entry has been saved successfully.',
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
        title: 'Error saving portfolio',
        description: 'Failed to save your portfolio entry. Please try again.',
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateEntry = async (entryId: string, updates: Partial<PortfolioEntry>) => {
    if (!user?.id) return;

    // Optimistic update
    setEntries((prev) =>
      prev.map((entry) => (entry.id === entryId ? { ...entry, ...updates } : entry))
    );

    try {
      const updateData: any = {};

      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.category !== undefined) updateData.category = updates.category.id;
      if (updates.skills !== undefined) updateData.skills_demonstrated = updates.skills;
      if (updates.reflection !== undefined) updateData.reflection_notes = updates.reflection;
      if (updates.tags !== undefined) updateData.tags = updates.tags;
      if (updates.assessmentCriteria !== undefined)
        updateData.assessment_criteria_met = updates.assessmentCriteria;
      if (updates.learningOutcomes !== undefined)
        updateData.learning_outcomes_met = updates.learningOutcomes;
      if (updates.supervisorFeedback !== undefined)
        updateData.supervisor_feedback = updates.supervisorFeedback;
      if (updates.selfAssessment !== undefined) updateData.self_assessment = updates.selfAssessment;
      if (updates.status !== undefined) {
        updateData.status = updates.status;
        if (updates.status === 'completed') {
          updateData.date_completed = new Date().toISOString();
        }
      }
      if (updates.timeSpent !== undefined) updateData.time_spent = updates.timeSpent;
      if (updates.awardingBodyStandards !== undefined)
        updateData.awarding_body_standards = updates.awardingBodyStandards;
      if (updates.metadata !== undefined) updateData.metadata = updates.metadata;
      if (updates.evidenceFiles !== undefined) {
        updateData.storage_urls = updates.evidenceFiles.map((file) => ({
          id: file.id,
          name: file.name,
          type: file.type,
          size: file.size,
          url: file.url,
          uploadDate: file.uploadDate,
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

      // Evidence file URLs persist on portfolio_items.storage_urls — nothing
      // else to sync.

      toast({
        title: 'Portfolio entry updated',
        description: 'Your changes have been saved successfully.',
      });
    } catch (error) {
      console.error('Error updating entry:', error);
      // Revert optimistic update
      loadData();
      toast({
        title: 'Error updating portfolio',
        description: 'Failed to save your changes. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const deleteEntry = async (entryId: string) => {
    if (!user?.id) return;

    // Get the entry to delete its files from storage
    const entryToDelete = entries.find((e) => e.id === entryId);

    // Optimistic update
    setEntries((prev) => prev.filter((entry) => entry.id !== entryId));

    try {
      // Delete files from storage if any
      if (entryToDelete?.evidenceFiles?.length) {
        const filePaths = entryToDelete.evidenceFiles
          .filter((f) => f.url)
          .map((f) => {
            // Extract path from URL
            const url = f.url!;
            const match = url.match(/portfolio-evidence\/(.+)$/);
            return match ? match[1] : null;
          })
          .filter(Boolean);

        if (filePaths.length > 0) {
          await supabase.storage.from('portfolio-evidence').remove(filePaths as string[]);
        }
      }

      // Junction table rows cascade-delete, but clean up storage first
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', entryId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Portfolio entry deleted',
        description: 'The portfolio entry has been removed.',
      });
    } catch (error) {
      console.error('Error deleting entry:', error);
      // Revert optimistic update
      loadData();
      toast({
        title: 'Error deleting portfolio',
        description: 'Failed to delete the entry. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getEntriesByGroup = (groupId: string) => {
    const groupCategories = categories
      .filter((cat) => cat.groupTheme === groupId)
      .map((cat) => cat.id);
    return entries.filter((entry) => groupCategories.includes(entry.category.id));
  };

  const getEntriesByCompetencyLevel = (level: 'foundation' | 'intermediate' | 'advanced') => {
    const levelCategories = categories
      .filter((cat) => cat.competencyLevel === level)
      .map((cat) => cat.id);
    return entries.filter((entry) => levelCategories.includes(entry.category.id));
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
    getEntriesByCompetencyLevel,
  };
};
