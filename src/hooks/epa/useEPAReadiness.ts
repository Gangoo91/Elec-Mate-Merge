/**
 * useEPAReadiness
 *
 * Aggregates four data sources to produce an EPA readiness score:
 * 1. Portfolio AC coverage vs total ACs
 * 2. Evidence quality average (from evidence_quality_validations)
 * 3. Mock discussion scores (from epa_mock_sessions)
 * 4. Mock knowledge scores (from quiz_results where assessment_id = 'epa-knowledge-mock')
 *
 * Formula: overall = (portfolio * 0.35) + (quality * 0.25) + (discussion * 0.20) + (knowledge * 0.20)
 */

import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type ReadinessStatus = 'ready' | 'nearly_ready' | 'needs_work' | 'not_ready';

export interface ReadinessComponent {
  label: string;
  score: number;
  weight: number;
  status: ReadinessStatus;
  detail?: string;
}

export interface ReadinessGap {
  area: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
}

export interface EPAReadinessData {
  overallScore: number;
  overallStatus: ReadinessStatus;
  components: {
    portfolio: ReadinessComponent;
    evidenceQuality: ReadinessComponent;
    mockDiscussion: ReadinessComponent;
    mockKnowledge: ReadinessComponent;
  };
  gaps: ReadinessGap[];
  calculatedAt: Date;
}

function getStatus(score: number): ReadinessStatus {
  if (score >= 80) return 'ready';
  if (score >= 65) return 'nearly_ready';
  if (score >= 40) return 'needs_work';
  return 'not_ready';
}

export function useEPAReadiness(qualificationCode?: string, qualificationId?: string | null) {
  const { user } = useAuth();
  const [data, setData] = useState<EPAReadinessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(async () => {
    if (!user || !qualificationCode) return null;

    setIsLoading(true);
    setError(null);

    try {
      // 1. Portfolio AC coverage
      let portfolioScore = 0;
      let portfolioDetail = '0 ACs evidenced';
      try {
        const [{ data: allACs }, { data: portfolioItems }] = await Promise.all([
          supabase.rpc('get_qualification_acs', {
            p_qualification_code: qualificationCode,
          }),
          supabase
            .from('portfolio_items')
            .select('assessment_criteria_met')
            .eq('user_id', user.id),
        ]);

        const totalACs = allACs?.length || 0;
        const evidencedACs = new Set<string>();
        portfolioItems?.forEach((item: { assessment_criteria_met: string[] | null }) => {
          item.assessment_criteria_met?.forEach((ac: string) => evidencedACs.add(ac));
        });

        if (totalACs > 0) {
          portfolioScore = Math.round((evidencedACs.size / totalACs) * 100);
          portfolioDetail = `${evidencedACs.size}/${totalACs} ACs evidenced`;
        }
      } catch {
        /* non-critical */
      }

      // 2. Evidence quality average
      let qualityScore = 0;
      let qualityDetail = 'No validations yet';
      try {
        const { data: validations } = await supabase
          .from('evidence_quality_validations')
          .select('overall_score')
          .eq('user_id', user.id)
          .eq('qualification_code', qualificationCode)
          .order('created_at', { ascending: false })
          .limit(20);

        if (validations?.length) {
          qualityScore = Math.round(
            validations.reduce(
              (sum: number, v: { overall_score: number }) =>
                sum + v.overall_score,
              0
            ) / validations.length
          );
          qualityDetail = `Avg ${qualityScore}/100 from ${validations.length} validations`;
        }
      } catch {
        /* non-critical — table may not exist yet */
      }

      // 3. Mock discussion scores
      let discussionScore = 0;
      let discussionDetail = 'No mock discussions';
      let discussionCount = 0;
      let weakestSubscore = '';
      try {
        const { data: sessions } = await supabase
          .from('epa_mock_sessions')
          .select('overall_score, component_scores')
          .eq('user_id', user.id)
          .eq('session_type', 'professional_discussion')
          .eq('status', 'completed')
          .order('completed_at', { ascending: false })
          .limit(5);

        if (sessions?.length) {
          discussionCount = sessions.length;
          discussionScore = Math.round(
            sessions.reduce(
              (sum: number, s: { overall_score: number }) =>
                sum + s.overall_score,
              0
            ) / sessions.length
          );
          discussionDetail = `Avg ${discussionScore}/100 from ${sessions.length} sessions`;

          // Find weakest subscore across sessions for targeted advice
          const subscoreLabels: Record<string, string> = {
            technicalKnowledge: 'technical knowledge',
            practicalApplication: 'practical application',
            communication: 'communication',
            reflection: 'reflection',
            problemSolving: 'problem solving',
          };
          const subscoreAvgs: Record<string, number> = {};
          sessions.forEach((s: { component_scores: Record<string, number> | null }) => {
            if (s.component_scores && typeof s.component_scores === 'object') {
              Object.entries(s.component_scores).forEach(([key, val]) => {
                if (typeof val === 'number') {
                  subscoreAvgs[key] = (subscoreAvgs[key] || 0) + val;
                }
              });
            }
          });
          let lowestKey = '';
          let lowestVal = 101;
          Object.entries(subscoreAvgs).forEach(([key, total]) => {
            const avg = total / sessions.length;
            if (avg < lowestVal) {
              lowestVal = avg;
              lowestKey = key;
            }
          });
          if (lowestKey && subscoreLabels[lowestKey]) {
            weakestSubscore = subscoreLabels[lowestKey];
          }
        }
      } catch {
        /* non-critical */
      }

      // 4. Mock knowledge quiz scores
      let knowledgeScore = 0;
      let knowledgeDetail = 'No mock tests';
      let knowledgeCount = 0;
      let weakestCategory = '';
      try {
        const { data: quizResults } = await supabase
          .from('quiz_results')
          .select('score, category_breakdown')
          .eq('user_id', user.id)
          .eq('assessment_id', 'epa-knowledge-mock')
          .order('created_at', { ascending: false })
          .limit(5);

        if (quizResults?.length) {
          knowledgeCount = quizResults.length;
          knowledgeScore = Math.round(
            quizResults.reduce(
              (sum: number, r: { score: number }) => sum + r.score,
              0
            ) / quizResults.length
          );
          knowledgeDetail = `Avg ${knowledgeScore}% from ${quizResults.length} tests`;

          // Find weakest category from most recent test for targeted advice
          const latest = quizResults[0] as {
            category_breakdown: Record<string, { correct: number; total: number }> | null;
          };
          if (latest.category_breakdown && typeof latest.category_breakdown === 'object') {
            let worstPct = 101;
            Object.entries(latest.category_breakdown).forEach(([cat, data]) => {
              if (data && typeof data === 'object' && 'total' in data && (data as { total: number }).total > 0) {
                const pct = ((data as { correct: number; total: number }).correct / (data as { total: number }).total) * 100;
                if (pct < worstPct) {
                  worstPct = pct;
                  weakestCategory = cat;
                }
              }
            });
          }
        }
      } catch {
        /* non-critical */
      }

      // Calculate overall
      const overallScore = Math.round(
        portfolioScore * 0.35 +
          qualityScore * 0.25 +
          discussionScore * 0.2 +
          knowledgeScore * 0.2
      );

      // Build gaps
      const gaps: ReadinessGap[] = [];

      if (portfolioScore < 70) {
        const needed = portfolioScore < 40
          ? 'You need significant evidence — try adding 2-3 portfolio entries per week covering different assessment criteria'
          : 'You\'re getting close — review which ACs are missing and target those with your next evidence uploads';
        gaps.push({
          area: 'Portfolio Coverage',
          description: `${portfolioDetail} — your portfolio needs to evidence at least 70% of assessment criteria to pass the gateway`,
          priority: portfolioScore < 40 ? 'high' : 'medium',
          action: needed,
        });
      }
      if (qualityScore < 70 && qualityScore > 0) {
        gaps.push({
          area: 'Evidence Quality',
          description: `${qualityDetail} — assessors expect clear, specific evidence that directly maps to criteria`,
          priority: qualityScore < 40 ? 'high' : 'medium',
          action: qualityScore < 40
            ? 'Your evidence needs more detail — include specific examples, measurements, and outcomes for each entry'
            : 'Focus on adding reflection and technical reasoning to your evidence to push quality above 70%',
        });
      }
      if (qualityScore === 0) {
        gaps.push({
          area: 'Evidence Quality',
          description: 'No evidence has been validated yet — you won\'t know if your evidence meets the standard until it\'s checked',
          priority: 'medium',
          action: 'Run the AI Evidence Validator on your portfolio entries to get feedback before your assessor sees them',
        });
      }
      if (discussionScore < 60 && discussionScore > 0) {
        const subscoreAdvice = weakestSubscore
          ? ` — focus on improving your ${weakestSubscore} as that\'s your weakest area`
          : '';
        gaps.push({
          area: 'Professional Discussion',
          description: `${discussionCount} session${discussionCount !== 1 ? 's' : ''} averaging ${discussionScore}/100${subscoreAdvice}`,
          priority: 'medium',
          action: weakestSubscore
            ? `Practise structuring your answers around ${weakestSubscore} — use the STAR method (Situation, Task, Action, Result) and include specific technical details`
            : 'Take another mock discussion and focus on giving longer, more detailed answers with real examples from your work',
        });
      }
      if (discussionScore === 0) {
        gaps.push({
          area: 'Professional Discussion',
          description: 'No mock discussions attempted — the professional discussion is a major EPA component worth practising',
          priority: 'low',
          action: 'Start a mock discussion to see the kind of questions you\'ll face — the AI will score you against real grade descriptors',
        });
      }
      if (knowledgeScore < 60 && knowledgeScore > 0) {
        const catAdvice = weakestCategory
          ? ` — your weakest area is "${weakestCategory}"`
          : '';
        gaps.push({
          area: 'Knowledge Test',
          description: `${knowledgeCount} test${knowledgeCount !== 1 ? 's' : ''} averaging ${knowledgeScore}%${catAdvice}`,
          priority: 'medium',
          action: weakestCategory
            ? `Revise "${weakestCategory}" using your study materials, then take another mock test to check your improvement`
            : 'Take another mock knowledge test and review the explanations for any questions you get wrong',
        });
      }
      if (knowledgeScore === 0) {
        gaps.push({
          area: 'Knowledge Test',
          description: 'No mock tests attempted — the knowledge test covers technical theory you\'ll need for your EPA',
          priority: 'low',
          action: 'Take a mock knowledge test to identify which technical areas need revision before your real assessment',
        });
      }

      gaps.sort((a, b) => {
        const p = { high: 0, medium: 1, low: 2 };
        return p[a.priority] - p[b.priority];
      });

      const result: EPAReadinessData = {
        overallScore,
        overallStatus: getStatus(overallScore),
        components: {
          portfolio: {
            label: 'Portfolio Coverage',
            score: portfolioScore,
            weight: 0.35,
            status: getStatus(portfolioScore),
            detail: portfolioDetail,
          },
          evidenceQuality: {
            label: 'Evidence Quality',
            score: qualityScore,
            weight: 0.25,
            status: getStatus(qualityScore),
            detail: qualityDetail,
          },
          mockDiscussion: {
            label: 'Mock Discussion',
            score: discussionScore,
            weight: 0.2,
            status: getStatus(discussionScore),
            detail: discussionDetail,
          },
          mockKnowledge: {
            label: 'Mock Knowledge',
            score: knowledgeScore,
            weight: 0.2,
            status: getStatus(knowledgeScore),
            detail: knowledgeDetail,
          },
        },
        gaps,
        calculatedAt: new Date(),
      };

      setData(result);

      // Save snapshot
      try {
        const { error: snapError } = await supabase
          .from('epa_readiness_snapshots')
          .insert({
            user_id: user.id,
            qualification_code: qualificationCode,
            overall_score: overallScore,
            overall_status: result.overallStatus,
            portfolio_coverage_pct: portfolioScore,
            ksb_completion_pct: 0,
            evidence_quality_avg: qualityScore,
            mock_discussion_avg: discussionScore,
            mock_knowledge_avg: knowledgeScore,
            component_details: result.components as unknown as Record<
              string,
              unknown
            >,
            gaps: gaps as unknown as Record<string, unknown>[],
            calculated_at: new Date().toISOString(),
          });
        if (snapError) {
          console.error('Failed to save readiness snapshot:', snapError);
        }
      } catch (err) {
        console.error('Error saving readiness snapshot:', err);
      }

      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to calculate readiness';
      console.error('EPA readiness error:', err);
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user, qualificationCode]);

  // Auto-calculate on mount
  useEffect(() => {
    if (user && qualificationCode) {
      calculate();
    }
  }, [user, qualificationCode, calculate]);

  return {
    data,
    isLoading,
    error,
    recalculate: calculate,
  };
}

export default useEPAReadiness;
