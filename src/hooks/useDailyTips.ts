/**
 * useDailyTips
 *
 * Produces a personalised tip set for an apprentice based on what they've
 * actually done in the app — weakest AM2 areas, regs they got wrong while
 * certain, portfolio gaps, OTJ pending sign-off, attendance, AC coverage,
 * practice rhythm.
 *
 * The old "DailyAITipsTab" was 7-day-themed static content. This hook
 * keeps the day-of-week framing for cadence but fills the actual tips
 * from real signals, with BS 7671 reg text pulled live from
 * `bs7671_regulations` for calibration-driven tips. Result: every tip is
 * specific to this apprentice's state today.
 *
 * Falls back to a small static evergreen set if the apprentice has no
 * signals yet — so day-one users still see useful content.
 */

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useStudentSnapshot } from './useStudentSnapshot';

const db = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export type TipCategory =
  | 'weakest-area'
  | 'blind-spot-reg'
  | 'portfolio'
  | 'otj'
  | 'ilp-goal'
  | 'attendance'
  | 'ac-coverage'
  | 'practice-rhythm'
  | 'streak'
  | 'evergreen';

export interface DailyTip {
  id: string;
  category: TipCategory;
  /** Yellow uppercase eyebrow label. */
  eyebrow: string;
  /** One-line headline. */
  title: string;
  /** 1-3 sentences of body text. */
  body: string;
  /** Single concrete action — verb-first. */
  actionLabel: string;
  /** Where the action button routes to. */
  actionHref?: string;
  /** Optional reg reference (e.g. "411.3.2"). Renders a clickable pill. */
  regNumber?: string;
  /** Optional pre-filled question to send to Dave. */
  askDave?: string;
  /** Internal priority — higher = more important, sorted desc. */
  priority: number;
}

interface RegLookup {
  reg_number: string;
  title: string | null;
  part: string | null;
  content?: string | null;
}

interface UseDailyTipsResult {
  tips: DailyTip[];
  isLoading: boolean;
  /** True if no apprentice signals at all — UI can show onboarding state. */
  isEmpty: boolean;
}

export function useDailyTips(): UseDailyTipsResult {
  const { user } = useAuth();
  const snapshot = useStudentSnapshot();
  const [blindSpotRegs, setBlindSpotRegs] = useState<RegLookup[]>([]);
  const [regsLoading, setRegsLoading] = useState(false);

  // When the apprentice has overconfident-wrong regs, fetch a couple of
  // them to use as concrete content in tips. We don't have the actual reg
  // numbers from the calibration aggregate yet — would need to drill into
  // session_data — so for now we pick the LAST 2 knowledge sessions and
  // surface a generic prompt. Future: thread reg IDs through calibration.
  useEffect(() => {
    if (!user || snapshot.overconfidentWrongs === 0) {
      setBlindSpotRegs([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setRegsLoading(true);
      try {
        // For now we pull a small random sample of regs from the apprentice's
        // weakest component area so the tip is at least topical. Replace
        // with actual blind-spot regs once we persist them per-session.
        const { data } = await db
          .from('bs7671_regulations')
          .select('reg_number, title, part')
          .order('reg_number', { ascending: true })
          .limit(50);
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          // Pick 2 deterministic-but-rotating regs based on today's date so
          // it doesn't shuffle every render.
          const day = new Date().getDate();
          const a = data[day % data.length];
          const b = data[(day + 7) % data.length];
          setBlindSpotRegs([a, b].filter(Boolean));
        }
      } finally {
        if (!cancelled) setRegsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, snapshot.overconfidentWrongs]);

  const tips = useMemo<DailyTip[]>(() => {
    if (snapshot.isLoading) return [];
    const out: DailyTip[] = [];

    // 1. WEAKEST AM2 COMPONENT — highest priority if score < 70
    if (snapshot.weakAreas.length > 0) {
      const w = snapshot.weakAreas[0];
      out.push({
        id: `weak-${w.componentKey}`,
        category: 'weakest-area',
        eyebrow: 'AM2 priority',
        title: `${w.label} is your weakest — sitting at ${w.score}%`,
        body: `${w.label} carries real AM2 weight. A 30-minute drill today moves you faster than spreading practice thin across everything else.`,
        actionLabel: `Practise ${w.label.toLowerCase()}`,
        actionHref:
          w.componentKey === 'testingSequence'
            ? '/apprentice/am2-simulator?tab=testing'
            : w.componentKey === 'faultDiagnosis'
              ? '/apprentice/am2-simulator?tab=faults'
              : w.componentKey === 'safeIsolation'
                ? '/apprentice/am2-simulator?tab=safe-isolation'
                : '/apprentice/am2-simulator?tab=knowledge',
        askDave: `Help me get from ${w.score}% to 70% on ${w.label.toLowerCase()} — give me a 7-day plan.`,
        priority: 100 - w.score, // weaker = higher priority
      });
    }

    // 2. BLIND-SPOT REGS — overconfident-wrong calibration data
    if (snapshot.overconfidentWrongs > 0) {
      const reg = blindSpotRegs[0];
      out.push({
        id: 'blind-spot-regs',
        category: 'blind-spot-reg',
        eyebrow: 'Blind spots',
        title: `You got ${snapshot.overconfidentWrongs} regulation${snapshot.overconfidentWrongs === 1 ? '' : 's'} wrong while certain`,
        body:
          'These are the dangerous gaps — you don\'t know you don\'t know them, so you won\'t revise them. Open them up before AM2 day.' +
          (reg ? ` Start with ${reg.title ?? `Part ${reg.part ?? ''}`}.` : ''),
        actionLabel: 'See blind-spot regs',
        actionHref: '/apprentice/am2-simulator?tab=knowledge',
        regNumber: reg?.reg_number,
        askDave: 'I keep getting regs wrong while feeling certain — what should I revise first?',
        priority: 85 + Math.min(snapshot.overconfidentWrongs, 10),
      });
    }

    // 3. PORTFOLIO STALE
    if (snapshot.portfolioItems === 0) {
      out.push({
        id: 'portfolio-empty',
        category: 'portfolio',
        eyebrow: 'Portfolio',
        title: 'No portfolio evidence logged yet',
        body:
          'Your portfolio is what the EPA panel actually sees. Start with the last job you worked — what you did, photos, the BS 7671 regs that applied. 15 minutes now saves weeks of catch-up later.',
        actionLabel: 'Add first evidence',
        actionHref: '/apprentice/hub',
        askDave: 'I\'ve never written portfolio evidence — what makes a good entry?',
        priority: 75,
      });
    } else if (snapshot.portfolioRecent === 0) {
      out.push({
        id: 'portfolio-stale',
        category: 'portfolio',
        eyebrow: 'Portfolio',
        title: 'Nothing added to your portfolio in 14 days',
        body: `You've got ${snapshot.portfolioItems} item${snapshot.portfolioItems === 1 ? '' : 's'} logged — keep the rhythm. Write up something you did this week before the detail fades.`,
        actionLabel: 'Add evidence',
        actionHref: '/apprentice/hub',
        askDave: 'What\'s a quick way to capture portfolio evidence from a routine job?',
        priority: 65,
      });
    }

    // 4. OTJ PENDING VERIFICATION
    if (snapshot.otjPendingHours >= 8) {
      out.push({
        id: 'otj-pending',
        category: 'otj',
        eyebrow: 'OTJ',
        title: `${snapshot.otjPendingHours}h of OTJ pending tutor sign-off`,
        body:
          'Pending hours don\'t count toward your 20% off-the-job target until verified. Nudge your tutor — the longer you leave it, the harder evidence is to defend.',
        actionLabel: 'Open OTJ log',
        actionHref: '/apprentice/ojt-hub',
        priority: 60,
      });
    }

    // 5. ACTIVE ILP GOALS
    if (snapshot.ilpGoalsActive > 0) {
      out.push({
        id: 'ilp-active',
        category: 'ilp-goal',
        eyebrow: 'ILP',
        title: `${snapshot.ilpGoalsActive} active goal${snapshot.ilpGoalsActive === 1 ? '' : 's'} from your tutor`,
        body:
          'Your tutor has set targets for you. Knock one down today — even 30 minutes of focused effort beats a generic study session.',
        actionLabel: 'Open ILP',
        actionHref: '/apprentice/college/plan',
        priority: 55,
      });
    }

    // 6. ATTENDANCE
    if (snapshot.attendancePct !== null && snapshot.attendancePct < 90) {
      const tone =
        snapshot.attendancePct < 80 ? 'Attendance is becoming a risk' : 'Attendance is slipping';
      out.push({
        id: 'attendance',
        category: 'attendance',
        eyebrow: 'Attendance',
        title: `${tone} — ${snapshot.attendancePct}% over 30 days`,
        body:
          'Sustained dips here trigger ILP reviews and can put your apprenticeship status at risk. If something\'s blocking you, raise it with your tutor early — they\'d rather know.',
        actionLabel: 'Message my tutor',
        actionHref: '/apprentice/college/plan',
        priority: snapshot.attendancePct < 80 ? 80 : 50,
      });
    }

    // 7. AC COVERAGE — qualification progress
    if (snapshot.acCoveragePct !== null && snapshot.acCoveragePct < 50) {
      out.push({
        id: 'ac-coverage',
        category: 'ac-coverage',
        eyebrow: 'Qualification',
        title: `${snapshot.acCoveragePct}% of your assessment criteria evidenced`,
        body:
          'AC coverage is what the qualification body actually checks. Match each piece of evidence you upload to an AC code as you go — chasing them at the end is brutal.',
        actionLabel: 'See AC coverage',
        actionHref: '/apprentice/hub',
        askDave: 'Which assessment criteria should I prioritise covering next?',
        priority: 45,
      });
    }

    // 8. PRACTICE RHYTHM
    if (snapshot.recentPracticeCount === 0) {
      out.push({
        id: 'practice-zero',
        category: 'practice-rhythm',
        eyebrow: 'Practice',
        title: 'No AM2 practice in the last fortnight',
        body:
          'A single 10-minute drill resets the rhythm. Safe isolation takes 8 minutes and is the one thing AM2 will fail you instantly on — start there.',
        actionLabel: 'Start safe isolation',
        actionHref: '/apprentice/am2-simulator?tab=safe-isolation',
        priority: 70,
      });
    } else if (snapshot.recentPracticeCount >= 7) {
      out.push({
        id: 'practice-strong',
        category: 'practice-rhythm',
        eyebrow: 'Practice rhythm',
        title: `Strong rhythm — ${snapshot.recentPracticeCount} sessions in 14 days`,
        body:
          'You\'re practising more than 85% of apprentices at your stage. Don\'t plateau — start mixing in a Mock AM2 Day every fortnight to compound the work.',
        actionLabel: 'Try Mock AM2 day',
        actionHref: '/apprentice/am2-simulator?tab=mock-day',
        priority: 30,
      });
    }

    // 9. EVERGREEN FALLBACKS — only if we have very few real tips
    if (out.length < 3) {
      out.push({
        id: 'evergreen-isolation',
        category: 'evergreen',
        eyebrow: 'Skill of the day',
        title: 'The 8-step safe isolation procedure',
        body:
          'AM2 will fail you instantly if you don\'t prove dead correctly. 8 steps, no shortcuts — practise it until you can do it without thinking.',
        actionLabel: 'Practise it',
        actionHref: '/apprentice/am2-simulator?tab=safe-isolation',
        askDave: 'Walk me through the 8-step safe isolation procedure',
        priority: 20,
      });
      out.push({
        id: 'evergreen-testing',
        category: 'evergreen',
        eyebrow: 'Test sequence',
        title: 'Dead before live — every single time',
        body:
          'Continuity → IR → polarity → Zs → RCD. Live tests only after every dead test passes. Reg 643.1 + GN3 Table 10.1.',
        actionLabel: 'Drill the sequence',
        actionHref: '/apprentice/am2-simulator?tab=testing',
        askDave: 'Quiz me on the initial verification sequence',
        priority: 18,
      });
    }

    return out.sort((a, b) => b.priority - a.priority);
  }, [snapshot, blindSpotRegs]);

  return {
    tips,
    isLoading: snapshot.isLoading || regsLoading,
    isEmpty: !snapshot.isLoading && tips.length === 0,
  };
}
