/**
 * Performance Monitoring Hook
 * Tracks RAG quality, response times, and cache effectiveness
 */

import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PerformanceMetrics {
  queryText: string;
  agentName: string;
  ragTimeMs?: number;
  aiTimeMs?: number;
  totalTimeMs: number;
  cacheHit?: boolean;
  regulationCount?: number;
  qualityScore?: number;
  metadata?: any;
}

export const usePerformanceMonitoring = () => {
  
  const logPerformance = useCallback(async (metrics: PerformanceMetrics) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Generate query hash for grouping
      const queryHash = await generateQueryHash(metrics.queryText);

      const analyticsData = {
        query_hash: queryHash,
        query_text: metrics.queryText,
        agent_name: metrics.agentName,
        rag_time_ms: metrics.ragTimeMs || null,
        ai_time_ms: metrics.aiTimeMs || null,
        total_time_ms: metrics.totalTimeMs,
        cache_hit: metrics.cacheHit || false,
        regulation_count: metrics.regulationCount || 0,
        quality_score: metrics.qualityScore || null,
        user_id: user?.id || null,
        metadata: metrics.metadata || {}
      };

      const { error } = await supabase
        .from('performance_analytics')
        .insert([analyticsData]);

      if (error) {
        console.warn('Failed to log performance metrics:', error);
      } else {
        console.log(`📊 Performance logged: ${metrics.agentName} - ${metrics.totalTimeMs}ms`);
      }
    } catch (error) {
      console.error('Performance logging error:', error);
    }
  }, []);

  const getAgentPerformance = useCallback(async (
    agentName: string,
    limit = 100
  ) => {
    try {
      const { data, error } = await supabase
        .from('performance_analytics')
        .select('*')
        .eq('agent_name', agentName)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) throw error;

      // Calculate averages
      const metrics = {
        avgTotalTime: 0,
        avgRagTime: 0,
        avgAiTime: 0,
        cacheHitRate: 0,
        avgRegulationCount: 0,
        avgQualityScore: 0,
        totalRequests: data?.length || 0
      };

      if (data && data.length > 0) {
        metrics.avgTotalTime = Math.round(
          data.reduce((sum, m) => sum + (m.total_time_ms || 0), 0) / data.length
        );
        
        const ragTimes = data.filter(m => m.rag_time_ms);
        if (ragTimes.length > 0) {
          metrics.avgRagTime = Math.round(
            ragTimes.reduce((sum, m) => sum + (m.rag_time_ms || 0), 0) / ragTimes.length
          );
        }

        const aiTimes = data.filter(m => m.ai_time_ms);
        if (aiTimes.length > 0) {
          metrics.avgAiTime = Math.round(
            aiTimes.reduce((sum, m) => sum + (m.ai_time_ms || 0), 0) / aiTimes.length
          );
        }

        const cacheHits = data.filter(m => m.cache_hit).length;
        metrics.cacheHitRate = Math.round((cacheHits / data.length) * 100);

        metrics.avgRegulationCount = Math.round(
          data.reduce((sum, m) => sum + (m.regulation_count || 0), 0) / data.length
        );

        const qualityScores = data.filter(m => m.quality_score);
        if (qualityScores.length > 0) {
          metrics.avgQualityScore = Number((
            qualityScores.reduce((sum, m) => sum + (m.quality_score || 0), 0) / qualityScores.length
          ).toFixed(2));
        }
      }

      return metrics;
    } catch (error) {
      console.error('Failed to get agent performance:', error);
      return null;
    }
  }, []);

  const getSlowQueries = useCallback(async (
    thresholdMs = 5000,
    limit = 20
  ) => {
    try {
      const { data, error } = await supabase
        .from('performance_analytics')
        .select('query_text, agent_name, total_time_ms, timestamp')
        .gte('total_time_ms', thresholdMs)
        .order('total_time_ms', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to get slow queries:', error);
      return [];
    }
  }, []);

  return {
    logPerformance,
    getAgentPerformance,
    getSlowQueries
  };
};

// Helper: Generate query hash for grouping similar queries
async function generateQueryHash(queryText: string): Promise<string> {
  // Simple hash based on normalized query
  const normalized = queryText.toLowerCase().trim();
  
  // Use Web Crypto API for hashing
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex.substring(0, 16); // Use first 16 chars
}
