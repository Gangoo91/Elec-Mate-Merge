/**
 * XpToastHost — "+150 XP" the moment XP lands, and a level-up moment.
 * (9 Oct 2026, the XP redesign: "make every XP feel good".)
 *
 * XP is decided by the server (award_xp, the mock-exam trigger,
 * log_study_activity), so the app can't know the amount up front. After any
 * study action this reads the learner's newest ledger rows — the exact XP,
 * what earned it, and, when nothing was earned, why — and shows them. Rows
 * already in the ledger when the app opened are never toasted.
 *
 * Woken by 'elecmate:activity-logged' (logActivity) and 'elecmate:xp-check'
 * (mock exam saved). Mount once in the layout.
 *
 * "Your week": after XP lands it asks my_week_plan, which banks the 100 XP
 * bonus the moment the last goal is met — wherever the learner is in the app,
 * not only when they next open the Study Centre front page.
 */
import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { Award, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getLevelForXP } from '@/data/xpConfig';
import { paperName } from '@/hooks/study-centre/useMockHistory';
import { ACHIEVEMENT_DEFINITIONS } from '@/data/achievementDefinitions';

const AWARD_TITLE = new Map(ACHIEVEMENT_DEFINITIONS.map((d) => [d.id, d.title]));
const RARITY_LABEL: Record<string, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

const REASON: Record<string, string> = {
  already_awarded: 'Already earned today. Try a different one for more XP.',
  type_cap: 'You’ve had today’s XP from this kind of activity. Try something else.',
  day_cap: 'You’ve hit today’s 1,500 XP cap. Back tomorrow.',
  daily_cap: 'You’ve hit today’s XP cap. Back tomorrow.',
};

/**
 * Rows whose "no XP" isn't news: more study time on a section already paid
 * today (it still counts towards off-the-job hours), and repeat revision
 * rounds. Telling someone "already earned" while they're still studying nags.
 */
function quietNoXp(r: { activity_type: string; source_id?: string | null }) {
  return r.activity_type === 'study_module' || r.source_id === 'missed-pile';
}

function title(t: string | null): string {
  if (!t) return '';
  if (/\s/.test(t) || !/[-_]/.test(t)) return t;
  return paperName({ exam_name: null, exam_slug: t });
}

export function XpToastHost() {
  const { user } = useAuth();
  const since = useRef<string | null>(null);
  const level = useRef<number | null>(null);
  const busy = useRef(false);
  const again = useRef(false);

  // Baseline: the newest row and the current level when the app opens.
  useEffect(() => {
    since.current = null;
    level.current = null;
    if (!user) return;
    void supabase
      .from('learning_activity_log' as any)
      .select('created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        since.current = ((data as any[]) ?? [])[0]?.created_at ?? new Date(0).toISOString();
      });
    void supabase.rpc('get_my_xp' as any).then(({ data }) => {
      const total = Number((data as any)?.total_xp ?? 0);
      level.current = getLevelForXP(total).level;
    });
  }, [user]);

  const check = useCallback(async () => {
    if (!user || !since.current) return;
    // A check already running: run once more when it finishes, so an award
    // that lands mid-check is never dropped.
    if (busy.current) {
      again.current = true;
      return;
    }
    busy.current = true;
    try {
      const { data } = await supabase
        .from('learning_activity_log' as any)
        .select('activity_type, source_id, source_title, xp_earned, created_at, metadata')
        .eq('user_id', user.id)
        .gt('created_at', since.current)
        .order('created_at', { ascending: true })
        .limit(100);
      const rows = (data as any[]) ?? [];
      if (!rows.length) return;
      since.current = rows[rows.length - 1].created_at;

      const earned = rows.filter((r) => r.xp_earned > 0);
      const total = earned.reduce((s, r) => s + r.xp_earned, 0);
      // Awards get their own moment; everything else is the usual "+XP".
      const awards = earned.filter((r) => r.activity_type === 'achievement');
      const study = earned.filter((r) => r.activity_type !== 'achievement');
      const studyXp = study.reduce((s, r) => s + r.xp_earned, 0);
      if (studyXp > 0) {
        const what = study.length === 1 ? title(study[0].source_title) : `${study.length} things`;
        toast.custom(
          () => (
            <div className="flex w-[340px] max-w-[92vw] items-center gap-3 rounded-2xl border border-elec-yellow bg-[#1c1c1c] px-4 py-3 shadow-2xl">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-elec-yellow">
                <Zap className="h-5 w-5 fill-black text-black" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[18px] font-black tabular-nums leading-none text-white">
                  +{studyXp} XP
                </span>
                {what && (
                  <span className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-white">
                    {what}
                  </span>
                )}
              </span>
            </div>
          ),
          { duration: 3200 }
        );
      }
      // Each award, a beat after the XP: name, rarity and what it paid.
      awards.slice(0, 2).forEach((r, i) => {
        const rarity = String(r.metadata?.rarity ?? '');
        setTimeout(
          () =>
            toast.custom(
              () => (
                <div className="flex w-[340px] max-w-[92vw] items-center gap-3 rounded-2xl border border-elec-yellow bg-[#1c1c1c] px-4 py-3 shadow-2xl">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-elec-yellow">
                    <Award className="h-5 w-5 text-black" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-semibold text-white">
                      Award unlocked{RARITY_LABEL[rarity] ? ` · ${RARITY_LABEL[rarity]}` : ''}
                    </span>
                    <span className="mt-0.5 block text-[17px] font-bold leading-tight text-white">
                      {AWARD_TITLE.get(r.source_id) ?? title(r.source_title)}
                    </span>
                  </span>
                  <span className="shrink-0 text-[15px] font-black tabular-nums text-elec-yellow">
                    +{r.xp_earned}
                  </span>
                </div>
              ),
              { duration: 4500 }
            ),
          studyXp > 0 ? 700 * (i + 1) : 700 * i
        );
      });
      if (awards.length > 2) {
        const more = awards.slice(2);
        setTimeout(
          () =>
            toast(
              `${more.length} more awards unlocked · +${more.reduce((s, r) => s + r.xp_earned, 0)} XP`,
              { duration: 4500 }
            ),
          2100
        );
      }
      if (awards.some((r) => ['rare', 'epic', 'legendary'].includes(String(r.metadata?.rarity)))) {
        void confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#FFD000', '#ffffff', '#34d399'],
          disableForReducedMotion: true,
        });
      }
      if (total === 0) {
        const reason = rows
          .filter((r) => !quietNoXp(r))
          .map((r) => REASON[r.metadata?.xp_reason])
          .find(Boolean);
        if (reason) toast(reason, { duration: 3500 });
      }

      // The whole week done?
      if (earned.some((r) => r.activity_type === 'weekly_plan')) {
        void confetti({
          particleCount: 120,
          spread: 75,
          origin: { y: 0.7 },
          colors: ['#FFD000', '#ffffff', '#34d399'],
          disableForReducedMotion: true,
        });
      } else if (total > 0) {
        const { data: plan } = await supabase.rpc('my_week_plan' as any);
        const completedAt = (plan as any)?.completed_at as string | null | undefined;
        // Completed by this call: its bonus row is in the ledger now — show it.
        if (completedAt && Date.now() - new Date(completedAt).getTime() < 15000)
          again.current = true;
      }

      // Level up?
      const { data: xp } = await supabase.rpc('get_my_xp' as any);
      const lvl = getLevelForXP(Number((xp as any)?.total_xp ?? 0));
      if (level.current !== null && lvl.level > level.current) {
        void confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#FFD000', '#ffffff', '#34d399'],
          disableForReducedMotion: true,
        });
        toast.custom(
          () => (
            <div className="w-[340px] max-w-[92vw] rounded-2xl border border-elec-yellow bg-elec-yellow px-5 py-4 text-black shadow-2xl">
              <p className="text-[13px] font-bold">Level up</p>
              <p className="mt-1 text-[22px] font-black leading-tight">Level {lvl.level}</p>
              <p className="text-[14px] font-semibold">{lvl.title}</p>
            </div>
          ),
          { duration: 5000 }
        );
      }
      level.current = lvl.level;
    } finally {
      busy.current = false;
      if (again.current) {
        again.current = false;
        setTimeout(() => void check(), 300);
      }
    }
  }, [user]);

  useEffect(() => {
    const run = () => setTimeout(() => void check(), 900);
    window.addEventListener('elecmate:activity-logged', run);
    window.addEventListener('elecmate:xp-check', run);
    return () => {
      window.removeEventListener('elecmate:activity-logged', run);
      window.removeEventListener('elecmate:xp-check', run);
    };
  }, [check]);

  return null;
}

export default XpToastHost;
