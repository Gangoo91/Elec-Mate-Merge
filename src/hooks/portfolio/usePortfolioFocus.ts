/**
 * usePortfolioFocus
 *
 * Smart "Today's focus" ranking for the apprentice's portfolio dashboard.
 * Picks the top 3 ACs to target NEXT, each with a one-line rationale —
 * not just "first un-evidenced AC linearly" like the old NextAC card.
 *
 * Ranking signals:
 *   • claimed-only          — already claimed but no real backing evidence
 *                             (highest priority — quick win)
 *   • recent activity match — fuzzy keyword overlap between recent diary
 *                             entries / OTJ activity strings and AC text
 *   • foundational weight   — Health & Safety, BS 7671 part-4, environmental
 *                             ACs get a small priority bump (EPA gateway weight)
 *   • position bias         — earlier units / earlier LOs slightly preferred
 *
 * Returns top 3 with rationale. Pure client-side ranking — no edge function
 * needed for v1. Streamed AI-grounded ranking can replace this later.
 */

import { useMemo, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { PortfolioEntry } from '@/types/portfolio';
import type { QualificationACTree } from '@/hooks/qualification/useQualificationACs';
import type { ACSignoffRecord } from '@/hooks/portfolio/useACSignoffs';

export interface FocusAC {
  acRef: string;
  acFullRef: string;
  acText: string;
  unitCode: string;
  unitTitle: string;
  loNumber: number;
  /** 0..1 score for ranking */
  score: number;
  reason: string;
  reasonKind: 'referred' | 'quick-win' | 'recent-match' | 'foundational' | 'next-up';
}

interface RecentActivity {
  text: string;
  source: 'diary' | 'otj';
  date: string;
}

const FOUNDATIONAL_KEYWORDS = [
  'health and safety',
  'health & safety',
  'risk',
  'hazard',
  'safe isolation',
  'permit',
  'first aid',
  'environmental',
  'waste',
];

const HIGH_PRIORITY_UNITS = ['311', 'ELTP01', '312', 'ELTP02']; // H&S + Environmental

const STOP = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has',
  'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
  'their', 'they', 'them', 'this', 'that', 'these', 'those', 'i', 'you', 'we', 'it',
  'as', 'if', 'so', 'not', 'no', 'all', 'any', 'each', 'both', 'most', 'some',
]);

function tokens(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 3 && !STOP.has(t))
  );
}

function overlapScore(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let overlap = 0;
  for (const t of a) if (b.has(t)) overlap++;
  return overlap / Math.min(a.size, b.size);
}

export function usePortfolioFocus(
  tree: QualificationACTree | null,
  portfolioEntries: PortfolioEntry[] | undefined,
  acEvidenceMap: Map<string, PortfolioEntry[]>,
  /**
   * Assessor / IQA sign-off records from useACSignoffs, keyed by
   * `${unitCode}:${acCode}` and bare `acCode`. Makes the ranking aware of
   * what's already passed and what an assessor has sent back.
   */
  signoffRecords?: Map<string, ACSignoffRecord>
) {
  const { user } = useAuth();
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  // Pull recent diary + OTJ activity as a one-shot signal pool
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
        const [{ data: diary }, { data: otj }] = await Promise.all([
          supabase
            .from('site_diary_entries')
            .select(
              'date, tasks_completed, skills_practised, what_i_learned, issues_or_questions, site_name'
            )
            .eq('user_id', user.id)
            .gte('date', since.slice(0, 10))
            .order('date', { ascending: false })
            .limit(10),
          supabase
            .from('time_entries')
            .select('activity, notes, date')
            .eq('user_id', user.id)
            .gte('date', since.slice(0, 10))
            .order('date', { ascending: false })
            .limit(10),
        ]);

        if (cancelled) return;
        const items: RecentActivity[] = [];
        (
          diary as Array<{
            date: string;
            tasks_completed?: string[];
            skills_practised?: string[];
            what_i_learned?: string | null;
            issues_or_questions?: string | null;
            site_name?: string;
          }> | null
        )?.forEach((d) => {
          const tasks = (d.tasks_completed || []).join(' ');
          const skills = (d.skills_practised || []).join(' ');
          const text = [
            d.site_name,
            tasks,
            skills,
            d.what_i_learned,
            d.issues_or_questions,
          ]
            .filter(Boolean)
            .join(' ')
            .trim();
          if (text) items.push({ text, source: 'diary', date: d.date });
        });
        (otj as Array<{ activity?: string; notes?: string; date: string }> | null)?.forEach(
          (t) => {
            items.push({
              text: `${t.activity || ''} ${t.notes || ''}`.trim(),
              source: 'otj',
              date: t.date,
            });
          }
        );
        setRecentActivity(items.filter((it) => it.text.length > 5));
      } catch {
        if (!cancelled) setRecentActivity([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const focus = useMemo<FocusAC[]>(() => {
    if (!tree?.units?.length) return [];

    // Build pool of unevidenced ACs with claimed-only flag
    const claimedRefs = new Set<string>();
    portfolioEntries?.forEach((entry) => {
      (entry.assessmentCriteria || []).forEach((ref) => claimedRefs.add(ref));
    });

    // Pre-tokenise recent activity once
    const activityTokens = recentActivity.map((a) => ({
      tokens: tokens(a.text),
      source: a.source,
    }));

    const candidates: FocusAC[] = [];

    // Sign-off lookup — tries unit-keyed then bare AC ref, both ref forms.
    const getSig = (
      unitCode: string,
      acRef: string,
      acFullRef: string
    ): ACSignoffRecord | undefined => {
      if (!signoffRecords) return undefined;
      return (
        signoffRecords.get(`${unitCode}:${acRef}`) ||
        signoffRecords.get(`${unitCode}:${acFullRef}`) ||
        signoffRecords.get(acRef) ||
        signoffRecords.get(acFullRef)
      );
    };

    for (const unit of tree.units) {
      const unitImportant = HIGH_PRIORITY_UNITS.some((u) => unit.unitCode.includes(u));
      for (const lo of unit.learningOutcomes) {
        for (const ac of lo.assessmentCriteria) {
          const sig = getSig(unit.unitCode, ac.acRef, ac.acFullRef);
          const isReferred = sig?.status === 'referred';

          // A referred AC is always actionable (assessor sent it back), even
          // though it already has evidence — so never skip it. Everything
          // else that's evidenced / awaiting an assessor / already passed is
          // not where the apprentice should spend effort next.
          if (!isReferred) {
            if (acEvidenceMap.has(ac.acRef) || acEvidenceMap.has(ac.acFullRef)) continue;
            if (
              sig &&
              (sig.status === 'evidenced' ||
                sig.status === 'signed_off' ||
                sig.status === 'iqa_confirmed')
            ) {
              continue;
            }
          }

          const acTok = tokens(ac.acText);
          let bestOverlap = 0;
          let bestSource: 'diary' | 'otj' | null = null;
          for (const at of activityTokens) {
            const o = overlapScore(at.tokens, acTok);
            if (o > bestOverlap) {
              bestOverlap = o;
              bestSource = at.source;
            }
          }

          const isClaimedOnly =
            claimedRefs.has(ac.acRef) || claimedRefs.has(ac.acFullRef);

          const acTextLower = ac.acText.toLowerCase();
          const isFoundational =
            unitImportant ||
            FOUNDATIONAL_KEYWORDS.some((k) => acTextLower.includes(k));

          // Score 0..1 — higher = more priority
          let score = 0;
          let reason = '';
          let reasonKind: FocusAC['reasonKind'] = 'next-up';

          if (isReferred) {
            score = 1;
            reason = sig?.assessorNarrative
              ? `Your assessor sent this back: "${sig.assessorNarrative.slice(0, 90)}${sig.assessorNarrative.length > 90 ? '…' : ''}" — address it and resubmit.`
              : 'Your assessor sent this back for more work — open their feedback and resubmit.';
            reasonKind = 'referred';
          } else if (isClaimedOnly) {
            score = 0.95;
            reason = 'Claimed already — just attach a piece of evidence to lock it in.';
            reasonKind = 'quick-win';
          } else if (bestOverlap > 0.25) {
            score = 0.7 + bestOverlap * 0.25;
            reason =
              bestSource === 'diary'
                ? "You logged a recent site-diary entry that probably covers this — capture the evidence while it's fresh."
                : 'Recent OTJ activity matches this AC — write it up now while the detail is sharp.';
            reasonKind = 'recent-match';
          } else if (isFoundational) {
            score = 0.55;
            reason =
              'Foundational AC — heavy weight on the EPA gateway. Tutors look for these first.';
            reasonKind = 'foundational';
          } else {
            score = 0.3;
            reason = 'Next un-evidenced AC in your unit order — keep momentum.';
            reasonKind = 'next-up';
          }

          candidates.push({
            acRef: ac.acRef,
            acFullRef: ac.acFullRef,
            acText: ac.acText.replace(`${ac.acRef} `, ''),
            unitCode: unit.unitCode,
            unitTitle: unit.unitTitle,
            loNumber: lo.loNumber,
            score,
            reason,
            reasonKind,
          });
        }
      }
    }

    candidates.sort((a, b) => b.score - a.score);
    // Diversify: avoid 3 from the same unit
    const picked: FocusAC[] = [];
    const unitCounts = new Map<string, number>();
    for (const c of candidates) {
      const used = unitCounts.get(c.unitCode) || 0;
      if (used >= 2) continue;
      picked.push(c);
      unitCounts.set(c.unitCode, used + 1);
      if (picked.length >= 3) break;
    }
    return picked;
  }, [tree, portfolioEntries, acEvidenceMap, recentActivity, signoffRecords]);

  return { focus, recentActivityCount: recentActivity.length };
}
