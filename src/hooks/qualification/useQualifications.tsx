import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Qualification, QualificationCategory, UserQualificationSelection, QualificationCompliance } from '@/types/qualification';

export const useQualifications = () => {
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [categories, setCategories] = useState<QualificationCategory[]>([]);
  const [userSelection, setUserSelection] = useState<UserQualificationSelection | null>(null);
  const [compliance, setCompliance] = useState<QualificationCompliance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQualifications = async () => {
    try {
      const { data, error } = await supabase
        .from('qualifications')
        .select('*')
        .eq('requires_portfolio', true)
        .order('awarding_body', { ascending: true })
        .order('level', { ascending: true });

      if (error) throw error;
      setQualifications(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load qualifications');
    }
  };

  const loadAllQualificationCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('qualification_categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    }
  };

  const loadUserSelection = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_qualification_selections')
        .select(`
          *,
          qualification:qualifications(*)
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setUserSelection(data);

      if (data) {
        await loadQualificationCategories(data.qualification_id);
        await loadCompliance(data.qualification_id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user selection');
    }
  };

  const loadQualificationCategories = async (qualificationId: string) => {
    try {
      const { data, error } = await supabase
        .from('qualification_categories')
        .select('*')
        .eq('qualification_id', qualificationId)
        .order('name', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    }
  };

  const loadCompliance = async (qualificationId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('qualification_compliance')
        .select(`
          *,
          category:qualification_categories(*)
        `)
        .eq('user_id', user.id)
        .eq('qualification_id', qualificationId);

      if (error) throw error;
      setCompliance(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load compliance');
    }
  };

  const selectQualification = async (qualificationId: string, targetDate?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Deactivate previous selections
      await supabase
        .from('user_qualification_selections')
        .update({ is_active: false })
        .eq('user_id', user.id);

      // Create new selection
      const { data, error } = await supabase
        .from('user_qualification_selections')
        .insert({
          user_id: user.id,
          qualification_id: qualificationId,
          target_completion_date: targetDate,
          is_active: true
        })
        .select(`
          *,
          qualification:qualifications(*)
        `)
        .single();

      if (error) throw error;
      setUserSelection(data);

      // Initialize compliance tracking
      await initializeCompliance(qualificationId);
      
      await loadQualificationCategories(qualificationId);
      await loadCompliance(qualificationId);

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to select qualification');
      throw err;
    }
  };

  const initializeCompliance = async (qualificationId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get categories for this qualification
      const { data: categories, error: categoriesError } = await supabase
        .from('qualification_categories')
        .select('*')
        .eq('qualification_id', qualificationId);

      if (categoriesError) throw categoriesError;

      // Create compliance records for each category
      const complianceRecords = categories.map(category => ({
        user_id: user.id,
        qualification_id: qualificationId,
        category_id: category.id,
        required_entries: category.required_entries,
        completed_entries: 0,
        compliance_percentage: 0
      }));

      const { error } = await supabase
        .from('qualification_compliance')
        .insert(complianceRecords);

      if (error) throw error;
    } catch (err) {
      console.error('Failed to initialize compliance:', err);
    }
  };

  const updateCompliance = async (categoryId: string, completedEntries: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const complianceRecord = compliance.find(c => c.category_id === categoryId);
      if (!complianceRecord) return;

      const percentage = Math.round((completedEntries / complianceRecord.required_entries) * 100);

      const { error } = await supabase
        .from('qualification_compliance')
        .update({
          completed_entries: completedEntries,
          compliance_percentage: percentage,
          last_updated: new Date().toISOString()
        })
        .eq('id', complianceRecord.id);

      if (error) throw error;

      // Reload compliance data
      if (userSelection) {
        await loadCompliance(userSelection.qualification_id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update compliance');
    }
  };

  const clearQualificationSelection = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Deactivate all current selections
      const { error } = await supabase
        .from('user_qualification_selections')
        .update({ is_active: false })
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;

      // Clear local state
      setUserSelection(null);
      setCategories([]);
      setCompliance([]);

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear qualification selection');
      return false;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        loadQualifications(),
        loadAllQualificationCategories(),
        loadUserSelection()
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  const awardingBodies = qualifications.reduce((acc, qual) => {
    if (!acc[qual.awarding_body]) {
      acc[qual.awarding_body] = [];
    }
    acc[qual.awarding_body].push(qual);
    return acc;
  }, {} as Record<string, Qualification[]>);

  // Sort qualifications within each awarding body by level (Level 2 before Level 3)
  Object.keys(awardingBodies).forEach(awardingBody => {
    awardingBodies[awardingBody].sort((a, b) => {
      const levelA = parseInt(a.level);
      const levelB = parseInt(b.level);
      return levelA - levelB;
    });
  });

  return {
    qualifications,
    categories,
    userSelection,
    compliance,
    awardingBodies,
    loading,
    error,
    selectQualification,
    clearQualificationSelection,
    updateCompliance,
    refreshData: loadUserSelection
  };
};