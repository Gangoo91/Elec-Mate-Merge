/**
 * useAM2Readiness
 *
 * Calculates AM2 practical readiness score from simulation results.
 * Weighted scoring model matching real AM2 assessment weighting.
 *
 * Persistence: Supabase `am2_scores` table with localStorage offline fallback.
 * On load → try Supabase first, fall back to localStorage if offline.
 * On save → write to both Supabase and localStorage simultaneously.
 *
 * Scoring breakdown:
 *   Testing Sequence   25%
 *   Installation Design 20%
 *   Practical Understanding 20%
 *   Fault Diagnosis    20%
 *   Safe Isolation     10%
 *   Knowledge          5%
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@/contexts/AuthContext';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

// Untyped client for am2_scores — table not yet in generated Database type.
// Replace with the typed `supabase` import after regenerating types.
const db = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export type AM2ReadinessStatus = 'ready' | 'nearly_ready' | 'needs_work' | 'not_ready';

export interface AM2Component {
  key: string;
  label: string;
  score: number;
  weight: number;
  status: AM2ReadinessStatus;
  detail: string;
  attempts: number;
}

export interface AM2Gap {
  area: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AM2ReadinessData {
  overallScore: number;
  overallStatus: AM2ReadinessStatus;
  riskLevel: 'high' | 'moderate' | 'low';
  components: Record<string, AM2Component>;
  gaps: AM2Gap[];
  calculatedAt: Date;
  totalAttempts: number;
}

type ScoreMap = Record<string, { score: number; attempts: number }>;

function getStatus(score: number): AM2ReadinessStatus {
  if (score >= 70) return 'ready';
  if (score >= 50) return 'nearly_ready';
  if (score >= 30) return 'needs_work';
  return 'not_ready';
}

function getRiskLevel(score: number): 'high' | 'moderate' | 'low' {
  if (score < 50) return 'high';
  if (score < 70) return 'moderate';
  return 'low';
}

const COMPONENT_WEIGHTS: Record<string, { weight: number; label: string }> = {
  testingSequence: { weight: 0.25, label: 'Testing Sequence' },
  installationDesign: { weight: 0.2, label: 'Installation Design' },
  practicalUnderstanding: { weight: 0.2, label: 'Practical Understanding' },
  faultDiagnosis: { weight: 0.2, label: 'Fault Diagnosis' },
  safeIsolation: { weight: 0.1, label: 'Safe Isolation' },
  knowledgeAssessment: { weight: 0.05, label: 'Knowledge' },
};

const STORAGE_KEY = (userId: string) => `am2-scores-${userId}`;

/** Read scores from localStorage */
function readLocalScores(userId: string): ScoreMap {
  try {
    const stored = localStorage.getItem(STORAGE_KEY(userId));
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/** Write scores to localStorage */
function writeLocalScores(userId: string, scores: ScoreMap) {
  localStorage.setItem(STORAGE_KEY(userId), JSON.stringify(scores));
}

/** Fetch scores from Supabase am2_scores table */
async function fetchSupabaseScores(userId: string): Promise<ScoreMap | null> {
  const { data, error } = await db
    .from('am2_scores')
    .select('component_key, score, attempts')
    .eq('user_id', userId);

  if (error || !data) return null;

  const scores: ScoreMap = {};
  for (const row of data) {
    scores[row.component_key] = {
      score: row.score,
      attempts: row.attempts,
    };
  }
  return scores;
}

/** Upsert a single component score in Supabase */
async function upsertSupabaseScore(
  userId: string,
  componentKey: string,
  score: number,
  attempts: number
): Promise<boolean> {
  const { error } = await db.from('am2_scores').upsert(
    {
      user_id: userId,
      component_key: componentKey,
      score,
      attempts,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,component_key' }
  );

  return !error;
}

export function useAM2Readiness() {
  const { user } = useAuth();
  const [data, setData] = useState<AM2ReadinessData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const syncedRef = useRef(false);

  const calculate = useCallback(async (): Promise<AM2ReadinessData | null> => {
    if (!user) return null;

    try {
      let scores: ScoreMap;

      // Try Supabase first, fall back to localStorage
      const remoteScores = await fetchSupabaseScores(user.id);
      if (remoteScores) {
        scores = remoteScores;
        // Keep localStorage in sync as cache
        writeLocalScores(user.id, scores);

        // On first load, merge any localStorage-only scores up to Supabase
        if (!syncedRef.current) {
          syncedRef.current = true;
          const localScores = readLocalScores(user.id);
          for (const [key, local] of Object.entries(localScores)) {
            const remote = remoteScores[key];
            if (!remote || local.score > remote.score || local.attempts > remote.attempts) {
              const merged = {
                score: Math.max(local.score, remote?.score ?? 0),
                attempts: Math.max(local.attempts, remote?.attempts ?? 0),
              };
              scores[key] = merged;
              upsertSupabaseScore(user.id, key, merged.score, merged.attempts);
            }
          }
          writeLocalScores(user.id, scores);
        }
      } else {
        // Offline — use localStorage
        scores = readLocalScores(user.id);
      }

      // Build component map
      const components: Record<string, AM2Component> = {};
      let totalAttempts = 0;

      for (const [key, config] of Object.entries(COMPONENT_WEIGHTS)) {
        const s = scores[key] || { score: 0, attempts: 0 };
        totalAttempts += s.attempts;

        components[key] = {
          key,
          label: config.label,
          score: s.score,
          weight: config.weight,
          status: getStatus(s.score),
          detail:
            s.attempts > 0 ? `${s.attempts} attempt${s.attempts === 1 ? '' : 's'}` : 'Not started',
          attempts: s.attempts,
        };
      }

      // Weighted overall score
      const overallScore = Math.round(
        Object.entries(components).reduce((sum, [, comp]) => sum + comp.score * comp.weight, 0)
      );

      // Generate gaps
      const gaps: AM2Gap[] = [];
      for (const [, comp] of Object.entries(components)) {
        if (comp.score < 70) {
          const priority: AM2Gap['priority'] =
            comp.score < 30 ? 'high' : comp.score < 50 ? 'medium' : 'low';

          const actions: Record<string, string> = {
            safeIsolation: 'Practise the 8-step safe isolation sequence until 100% correct',
            installationDesign: 'Run through cable selection and protective device scenarios',
            testingSequence: 'Complete testing sequence simulations in the correct order',
            faultDiagnosis: 'Work through fault-finding scenarios on each circuit type',
            practicalUnderstanding: 'Review installation task walkthroughs and containment rules',
            knowledgeAssessment: 'Take the 30-question knowledge quiz and review weak topics',
          };

          gaps.push({
            area: comp.label,
            description:
              comp.attempts === 0
                ? `You haven't attempted any ${comp.label.toLowerCase()} simulations yet`
                : `Your ${comp.label.toLowerCase()} score is ${comp.score}% — below the 70% threshold`,
            action: actions[comp.key] || 'Complete more practice simulations',
            priority,
          });
        }
      }

      // Sort gaps: high first, then medium, then low
      gaps.sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      });

      const result: AM2ReadinessData = {
        overallScore,
        overallStatus: getStatus(overallScore),
        riskLevel: getRiskLevel(overallScore),
        components,
        gaps,
        calculatedAt: new Date(),
        totalAttempts,
      };

      setData(result);
      setError(null);
      return result;
    } catch (err) {
      setError('Failed to calculate AM2 readiness');
      return null;
    }
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
    calculate().finally(() => setIsLoading(false));
  }, [calculate]);

  // Save a component score — writes to both Supabase and localStorage
  const saveScore = useCallback(
    async (componentKey: string, score: number) => {
      if (!user) return;

      const scores = readLocalScores(user.id);
      const existing = scores[componentKey] || { score: 0, attempts: 0 };

      // Keep best score, increment attempts
      const updated = {
        score: Math.max(existing.score, score),
        attempts: existing.attempts + 1,
      };

      scores[componentKey] = updated;

      // Write localStorage immediately (fast, always works)
      writeLocalScores(user.id, scores);

      // Write Supabase in background (async, may fail offline)
      upsertSupabaseScore(user.id, componentKey, updated.score, updated.attempts);

      // Recalculate
      calculate();
    },
    [user, calculate]
  );

  return { data, isLoading, error, recalculate: calculate, saveScore };
}

export default useAM2Readiness;
