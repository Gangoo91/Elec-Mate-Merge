/**
 * useSiteDiaryEntries
 *
 * CRUD hook for site diary entries. Uses Supabase with
 * localStorage fallback for offline resilience.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useLearningXP } from '@/hooks/useLearningXP';

export interface SiteDiaryEntry {
  id: string;
  user_id: string;
  date: string;
  site_name: string;
  supervisor: string | null;
  tasks_completed: string[];
  skills_practised: string[];
  what_i_learned: string | null;
  issues_or_questions: string | null;
  mood_rating: number | null;
  photos: string[];
  linked_portfolio_id: string | null;
  created_at: string;
  updated_at: string;
}

export type NewDiaryEntry = Omit<SiteDiaryEntry, 'id' | 'user_id' | 'created_at' | 'updated_at'>;

const STORAGE_KEY = 'elec-mate-site-diary';

export function useSiteDiaryEntries() {
  const { user } = useAuth();
  const { logActivity } = useLearningXP();
  const [entries, setEntries] = useState<SiteDiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load entries
  const loadEntries = useCallback(async () => {
    setIsLoading(true);
    try {
      if (user) {
        const { data, error } = await supabase
          .from('site_diary_entries')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setEntries(data as SiteDiaryEntry[]);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } else {
          // Try local fallback
          const local = localStorage.getItem(STORAGE_KEY);
          if (local) setEntries(JSON.parse(local));
        }
      } else {
        const local = localStorage.getItem(STORAGE_KEY);
        if (local) setEntries(JSON.parse(local));
      }
    } catch {
      // Fallback to localStorage
      const local = localStorage.getItem(STORAGE_KEY);
      if (local) setEntries(JSON.parse(local));
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  // Create entry
  const createEntry = useCallback(async (entry: NewDiaryEntry) => {
    if (!user) {
      toast.error('Please sign in to save diary entries');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('site_diary_entries')
        .insert({
          ...entry,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      const newEntry = data as SiteDiaryEntry;
      setEntries(prev => [newEntry, ...prev]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...entries]));
      toast.success('Diary entry saved');

      // Log XP for diary entry
      logActivity({
        activityType: 'site_diary_entry',
        sourceId: newEntry.id,
        sourceTitle: `Site Diary: ${newEntry.site_name}`,
        metadata: {
          siteName: newEntry.site_name,
          tasksCompleted: newEntry.tasks_completed?.length ?? 0,
          skillsPractised: newEntry.skills_practised?.length ?? 0,
        },
      });

      return newEntry;
    } catch (err) {
      console.error('Failed to save diary entry:', err);
      toast.error('Failed to save. Please try again.');
      return null;
    }
  }, [user, entries]);

  // Update entry
  const updateEntry = useCallback(async (id: string, updates: Partial<NewDiaryEntry>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('site_diary_entries')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const updated = data as SiteDiaryEntry;
      setEntries(prev => prev.map(e => e.id === id ? updated : e));
      toast.success('Entry updated');
      return updated;
    } catch {
      toast.error('Failed to update entry');
      return null;
    }
  }, [user]);

  // Delete entry
  const deleteEntry = useCallback(async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('site_diary_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setEntries(prev => prev.filter(e => e.id !== id));
      toast.success('Entry deleted');
      return true;
    } catch {
      toast.error('Failed to delete entry');
      return false;
    }
  }, [user]);

  // Get recent sites for quick-select
  const recentSites = Array.from(
    new Set(entries.map(e => e.site_name).filter(Boolean))
  ).slice(0, 5);

  return {
    entries,
    isLoading,
    createEntry,
    updateEntry,
    deleteEntry,
    recentSites,
    refresh: loadEntries,
  };
}
