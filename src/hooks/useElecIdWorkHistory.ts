/**
 * Hook for fetching Elec-ID work history (certificate logs)
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { WorkHistoryEntry } from '@/services/certificateLoggingService';

interface UseElecIdWorkHistoryReturn {
  workHistory: WorkHistoryEntry[];
  isLoading: boolean;
  error: string | null;
  hasElecId: boolean;
  totalCertificates: number;
  refetch: () => Promise<void>;
}

export function useElecIdWorkHistory(): UseElecIdWorkHistoryReturn {
  const { user } = useAuth();
  const [workHistory, setWorkHistory] = useState<WorkHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasElecId, setHasElecId] = useState(false);

  const fetchWorkHistory = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // First check if user has Elec-ID profile
      const { data: elecIdProfile, error: profileError } = await supabase
        .from('employer_elec_id_profiles')
        .select('id, activated')
        .eq('employee_id', user.id)
        .maybeSingle();

      if (profileError) {
        throw profileError;
      }

      if (!elecIdProfile || !elecIdProfile.activated) {
        setHasElecId(false);
        setWorkHistory([]);
        setIsLoading(false);
        return;
      }

      setHasElecId(true);

      // Fetch work history entries (certificate logs)
      const { data: history, error: historyError } = await supabase
        .from('elec_id_work_history')
        .select('*')
        .eq('profile_id', elecIdProfile.id)
        .eq('entry_type', 'certificate')
        .order('date_recorded', { ascending: false })
        .limit(50);

      if (historyError) {
        throw historyError;
      }

      setWorkHistory(history || []);
    } catch (err: any) {
      console.error('Error fetching work history:', err);
      setError(err.message || 'Failed to load work history');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchWorkHistory();
  }, [fetchWorkHistory]);

  return {
    workHistory,
    isLoading,
    error,
    hasElecId,
    totalCertificates: workHistory.length,
    refetch: fetchWorkHistory,
  };
}

export default useElecIdWorkHistory;
