import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type AgentType = 'circuit-designer' | 'cost-engineer' | 'health-safety' | 'installer' | 'maintenance';

export interface SavedAgentResult {
  id: string;
  agentType: AgentType;
  title: string;
  completedAt: string;
  outputData: any;
  inputData: any;
}

export interface UseSavedAgentResultsReturn {
  results: SavedAgentResult[];
  counts: Record<AgentType, number>;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const AGENT_LABELS: Record<AgentType, string> = {
  'circuit-designer': 'Circuit Designer',
  'cost-engineer': 'Cost Engineer',
  'health-safety': 'Health & Safety',
  'installer': 'Installation',
  'maintenance': 'Maintenance',
};

export { AGENT_LABELS };

export function useSavedAgentResults(): UseSavedAgentResultsReturn {
  const { user } = useAuth();
  const [results, setResults] = useState<SavedAgentResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllResults = useCallback(async () => {
    if (!user?.id) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch from all 5 tables in parallel
      const [
        circuitDesignRes,
        costEngineerRes,
        healthSafetyRes,
        installationRes,
        maintenanceRes,
      ] = await Promise.all([
        // Circuit Design Jobs
        supabase
          .from('circuit_design_jobs')
          .select('id, completed_at, design_data, job_inputs')
          .eq('status', 'complete')
          .order('completed_at', { ascending: false })
          .limit(20),

        // Cost Engineer Jobs
        supabase
          .from('cost_engineer_jobs')
          .select('id, completed_at, output_data, query')
          .eq('status', 'complete')
          .order('completed_at', { ascending: false })
          .limit(20),

        // Health & Safety Jobs
        supabase
          .from('health_safety_jobs')
          .select('id, completed_at, output_data, query')
          .eq('status', 'complete')
          .order('completed_at', { ascending: false })
          .limit(20),

        // Installation Method Jobs
        supabase
          .from('installation_method_jobs')
          .select('id, completed_at, method_data, query, project_details')
          .eq('status', 'complete')
          .order('completed_at', { ascending: false })
          .limit(20),

        // Maintenance Method Jobs
        supabase
          .from('maintenance_method_jobs')
          .select('id, completed_at, method_data, query, equipment_details')
          .eq('status', 'complete')
          .order('completed_at', { ascending: false })
          .limit(20),
      ]);

      // Transform and combine results
      const allResults: SavedAgentResult[] = [];

      // Circuit Design results
      if (circuitDesignRes.data) {
        circuitDesignRes.data.forEach((job) => {
          const jobInputs = job.job_inputs as Record<string, any> | null;
          allResults.push({
            id: job.id,
            agentType: 'circuit-designer',
            title: jobInputs?.projectName || 'Circuit Design',
            completedAt: job.completed_at || '',
            outputData: job.design_data,
            inputData: job.job_inputs,
          });
        });
      }

      // Cost Engineer results
      if (costEngineerRes.data) {
        costEngineerRes.data.forEach((job) => {
          allResults.push({
            id: job.id,
            agentType: 'cost-engineer',
            title: truncateTitle(job.query) || 'Cost Estimate',
            completedAt: job.completed_at || '',
            outputData: job.output_data,
            inputData: { query: job.query },
          });
        });
      }

      // Health & Safety results
      if (healthSafetyRes.data) {
        healthSafetyRes.data.forEach((job) => {
          allResults.push({
            id: job.id,
            agentType: 'health-safety',
            title: truncateTitle(job.query) || 'RAMS Document',
            completedAt: job.completed_at || '',
            outputData: job.output_data,
            inputData: { query: job.query },
          });
        });
      }

      // Installation Method results
      if (installationRes.data) {
        installationRes.data.forEach((job) => {
          allResults.push({
            id: job.id,
            agentType: 'installer',
            title: truncateTitle(job.query) || 'Method Statement',
            completedAt: job.completed_at || '',
            outputData: job.method_data,
            inputData: { query: job.query, project_details: job.project_details },
          });
        });
      }

      // Maintenance Method results
      if (maintenanceRes.data) {
        maintenanceRes.data.forEach((job) => {
          allResults.push({
            id: job.id,
            agentType: 'maintenance',
            title: truncateTitle(job.query) || 'Maintenance Guide',
            completedAt: job.completed_at || '',
            outputData: job.method_data,
            inputData: { query: job.query, equipment_details: job.equipment_details },
          });
        });
      }

      // Sort all results by completed date
      allResults.sort((a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );

      setResults(allResults);
    } catch (err: any) {
      console.error('Error fetching saved agent results:', err);
      setError(err.message || 'Failed to fetch saved results');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAllResults();
  }, [fetchAllResults]);

  // Calculate counts per agent type
  const counts = results.reduce(
    (acc, result) => {
      acc[result.agentType] = (acc[result.agentType] || 0) + 1;
      return acc;
    },
    {} as Record<AgentType, number>
  );

  // Ensure all agent types have a count (even if 0)
  const allCounts: Record<AgentType, number> = {
    'circuit-designer': counts['circuit-designer'] || 0,
    'cost-engineer': counts['cost-engineer'] || 0,
    'health-safety': counts['health-safety'] || 0,
    'installer': counts['installer'] || 0,
    'maintenance': counts['maintenance'] || 0,
  };

  return {
    results,
    counts: allCounts,
    totalCount: results.length,
    isLoading,
    error,
    refetch: fetchAllResults,
  };
}

// Helper to truncate long query strings for titles
function truncateTitle(query: string, maxLength: number = 50): string {
  if (!query) return '';
  // Get first line or sentence
  const firstLine = query.split('\n')[0].trim();
  if (firstLine.length <= maxLength) return firstLine;
  return firstLine.substring(0, maxLength - 3) + '...';
}
