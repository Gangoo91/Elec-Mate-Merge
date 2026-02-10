/**
 * useEPAReadiness
 *
 * Aggregates five data sources to produce an EPA readiness score:
 * 1. Portfolio AC coverage vs total ACs
 * 2. KSB completion %
 * 3. Evidence quality average (from evidence_quality_validations)
 * 4. Mock discussion scores (from epa_mock_sessions)
 * 5. Mock knowledge scores (from quiz_results where assessment_id = 'epa-knowledge-mock')
 *
 * Formula: overall = (portfolio * 0.30) + (ksb * 0.20) + (quality * 0.20) + (discussion * 0.15) + (knowledge * 0.15)
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
    ksb: ReadinessComponent;
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

      // 2. KSB completion
      let ksbScore = 0;
      let ksbDetail = 'No progress data';
      try {
        if (qualificationId) {
          const { data: ksbSummary } = await supabase
            .from('apprentice_ksb_summary')
            .select('*')
            .eq('user_id', user.id)
            .eq('qualification_id', qualificationId);

          if (ksbSummary?.length) {
            const totalKSBs = ksbSummary.reduce(
              (sum: number, s: { total_ksbs?: number }) =>
                sum + (s.total_ksbs || 0),
              0
            );
            const completedKSBs = ksbSummary.reduce(
              (sum: number, s: { completed_ksbs?: number }) =>
                sum + (s.completed_ksbs || 0),
              0
            );
            if (totalKSBs > 0) {
              ksbScore = Math.round((completedKSBs / totalKSBs) * 100);
              ksbDetail = `${completedKSBs}/${totalKSBs} KSBs complete`;
            }
          }
        }
      } catch {
        /* non-critical */
      }

      // 3. Evidence quality average
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

      // 4. Mock discussion scores
      let discussionScore = 0;
      let discussionDetail = 'No mock discussions';
      try {
        const { data: sessions } = await supabase
          .from('epa_mock_sessions')
          .select('overall_score')
          .eq('user_id', user.id)
          .eq('session_type', 'professional_discussion')
          .eq('status', 'completed')
          .order('completed_at', { ascending: false })
          .limit(5);

        if (sessions?.length) {
          discussionScore = Math.round(
            sessions.reduce(
              (sum: number, s: { overall_score: number }) =>
                sum + s.overall_score,
              0
            ) / sessions.length
          );
          discussionDetail = `Avg ${discussionScore}/100 from ${sessions.length} sessions`;
        }
      } catch {
        /* non-critical — table may not exist yet */
      }

      // 5. Mock knowledge quiz scores
      let knowledgeScore = 0;
      let knowledgeDetail = 'No mock tests';
      try {
        const { data: quizResults } = await supabase
          .from('quiz_results')
          .select('score')
          .eq('user_id', user.id)
          .eq('assessment_id', 'epa-knowledge-mock')
          .order('created_at', { ascending: false })
          .limit(5);

        if (quizResults?.length) {
          knowledgeScore = Math.round(
            quizResults.reduce(
              (sum: number, r: { score: number }) => sum + r.score,
              0
            ) / quizResults.length
          );
          knowledgeDetail = `Avg ${knowledgeScore}% from ${quizResults.length} tests`;
        }
      } catch {
        /* non-critical */
      }

      // Calculate overall
      const overallScore = Math.round(
        portfolioScore * 0.3 +
          ksbScore * 0.2 +
          qualityScore * 0.2 +
          discussionScore * 0.15 +
          knowledgeScore * 0.15
      );

      // Build gaps
      const gaps: ReadinessGap[] = [];

      if (portfolioScore < 70) {
        gaps.push({
          area: 'Portfolio Coverage',
          description: `Only ${portfolioDetail}`,
          priority: portfolioScore < 40 ? 'high' : 'medium',
          action: 'Add more evidence to cover missing assessment criteria',
        });
      }
      if (ksbScore < 70) {
        gaps.push({
          area: 'KSB Progress',
          description: `${ksbDetail}`,
          priority: ksbScore < 40 ? 'high' : 'medium',
          action: 'Update your KSB tracker with evidence and completion status',
        });
      }
      if (qualityScore < 70 && qualityScore > 0) {
        gaps.push({
          area: 'Evidence Quality',
          description: `${qualityDetail}`,
          priority: qualityScore < 40 ? 'high' : 'medium',
          action: 'Improve evidence quality based on AI validation feedback',
        });
      }
      if (qualityScore === 0) {
        gaps.push({
          area: 'Evidence Quality',
          description: 'No evidence has been validated yet',
          priority: 'medium',
          action: 'Run the AI Evidence Validator on your portfolio entries',
        });
      }
      if (discussionScore < 60 && discussionScore > 0) {
        gaps.push({
          area: 'Professional Discussion',
          description: `${discussionDetail}`,
          priority: 'medium',
          action: 'Practise more mock professional discussions',
        });
      }
      if (discussionScore === 0) {
        gaps.push({
          area: 'Professional Discussion',
          description: 'No mock discussions attempted',
          priority: 'low',
          action: 'Start a mock professional discussion to practise',
        });
      }
      if (knowledgeScore < 60 && knowledgeScore > 0) {
        gaps.push({
          area: 'Knowledge Test',
          description: `${knowledgeDetail}`,
          priority: 'medium',
          action: 'Take more mock knowledge tests to improve your score',
        });
      }
      if (knowledgeScore === 0) {
        gaps.push({
          area: 'Knowledge Test',
          description: 'No mock tests attempted',
          priority: 'low',
          action: 'Take an EPA mock knowledge test',
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
            weight: 0.3,
            status: getStatus(portfolioScore),
            detail: portfolioDetail,
          },
          ksb: {
            label: 'Learning Progress',
            score: ksbScore,
            weight: 0.2,
            status: getStatus(ksbScore),
            detail: ksbDetail,
          },
          evidenceQuality: {
            label: 'Evidence Quality',
            score: qualityScore,
            weight: 0.2,
            status: getStatus(qualityScore),
            detail: qualityDetail,
          },
          mockDiscussion: {
            label: 'Mock Discussion',
            score: discussionScore,
            weight: 0.15,
            status: getStatus(discussionScore),
            detail: discussionDetail,
          },
          mockKnowledge: {
            label: 'Mock Knowledge',
            score: knowledgeScore,
            weight: 0.15,
            status: getStatus(knowledgeScore),
            detail: knowledgeDetail,
          },
        },
        gaps,
        calculatedAt: new Date(),
      };

      setData(result);

      // Save snapshot (non-critical)
      try {
        await supabase.from('epa_readiness_snapshots').insert({
          user_id: user.id,
          qualification_code: qualificationCode,
          overall_score: overallScore,
          overall_status: result.overallStatus,
          portfolio_coverage_pct: portfolioScore,
          ksb_completion_pct: ksbScore,
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
      } catch {
        /* table may not exist yet */
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
  }, [user, qualificationCode, qualificationId]);

  // Auto-calculate on mount
  useEffect(() => {
    if (user && qualificationCode) {
      calculate();
    }
  }, [user, qualificationCode, qualificationId, calculate]);

  return {
    data,
    isLoading,
    error,
    recalculate: calculate,
  };
}

export default useEPAReadiness;
