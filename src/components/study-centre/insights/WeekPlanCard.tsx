/**
 * Your week — the automatic weekly plan (my_week_plan, 10 Oct 2026).
 *
 * Five or six goals chosen on Monday from the learner's weak spots: practise
 * the two weakest topics, finish some course sections, clear what's due,
 * sit a mock, earn some XP. Each ticks itself off from what they actually do;
 * finishing the lot pays 100 XP once. Study Centre only.
 */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SupabaseClient } from '@supabase/supabase-js';
import { ArrowRight, BookOpen, Check, GraduationCap, RotateCcw, Target, Zap } from 'lucide-react';
import { supabase as typedSupabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Hairline, ProgressRing } from '@/components/study-centre/ui/StudyKit';

const supabase = typedSupabase as unknown as SupabaseClient;

interface PlanItem {
  kind: 'practise' | 'study' | 'revise' | 'mock' | 'xp';
  target: number;
  progress: number;
  done: boolean;
  topic?: string;
  pct?: number;
}
interface Plan {
  week_start: string;
  ends_at: string;
  items: PlanItem[];
  completed_at: string | null;
  bonus_xp: number;
}

function describe(it: PlanItem) {
  switch (it.kind) {
    case 'practise':
      return {
        icon: Target,
        title: `Practise ${it.topic}`,
        sub: `${it.target} questions${typeof it.pct === 'number' ? ` · you’re on ${it.pct}%` : ''}`,
        to: `/study-centre/mock-exams/targeted?topic=${encodeURIComponent(it.topic ?? '')}`,
      };
    case 'study':
      return {
        icon: BookOpen,
        title: `Finish ${it.target} course sections`,
        sub: 'Any module',
        to: '/study-centre/my-course',
      };
    case 'revise':
      return {
        icon: RotateCcw,
        title: `Revise ${it.target} wrong answers`,
        sub: 'From your mocks',
        to: '/study-centre/mock-exams/revise',
      };
    case 'mock':
      return {
        icon: GraduationCap,
        title: 'Sit a full mock',
        sub: '20 questions or more',
        to: '/study-centre/mock-exams',
      };
    case 'xp':
    default:
      return {
        icon: Zap,
        title: `Earn ${it.target} XP`,
        sub: 'This week',
        to: '/study-centre/leaderboard',
      };
  }
}

export function WeekPlanCard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plan, setPlan] = useState<Plan | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.rpc('my_week_plan');
    if (data) setPlan(data as Plan);
  }, [user]);

  useEffect(() => {
    void load();
    // Refresh when XP lands elsewhere in the app (a mock, a quiz, a section).
    const again = () => setTimeout(() => void load(), 1500);
    window.addEventListener('elecmate:activity-logged', again);
    window.addEventListener('elecmate:xp-check', again);
    return () => {
      window.removeEventListener('elecmate:activity-logged', again);
      window.removeEventListener('elecmate:xp-check', again);
    };
  }, [load]);

  if (!plan || plan.items.length === 0) return null;

  const done = plan.items.filter((i) => i.done).length;
  const total = plan.items.length;
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(plan.ends_at).getTime() - Date.now()) / 86400000)
  );
  const next = plan.items.find((i) => !i.done);

  return (
    <section className="space-y-3" aria-labelledby="sc-week">
      <div className="flex items-end justify-between gap-3">
        <h2 id="sc-week" className="text-[17px] font-semibold tracking-tight text-white">
          Your week
        </h2>
        <span className="text-[12.5px] font-medium text-white">
          {plan.completed_at
            ? 'Done this week'
            : daysLeft <= 1
              ? 'Ends tonight'
              : `${daysLeft} days left`}
        </span>
      </div>
      <div className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 sm:mx-0 sm:rounded-2xl">
        <Hairline />
        <div className="flex items-center gap-4 px-5 pb-3 pt-5 sm:px-6">
          <ProgressRing
            pct={(done / total) * 100}
            size={64}
            stroke={6}
            colour={plan.completed_at ? '#34d399' : '#FFD000'}
            label={`${done} of ${total} goals done this week`}
          >
            <span className="text-[16px] font-black leading-none tabular-nums text-white">
              {done}/{total}
            </span>
          </ProgressRing>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold leading-snug text-white">
              {plan.completed_at
                ? `Week complete. +${plan.bonus_xp} XP banked.`
                : `${total - done} to go for a ${plan.bonus_xp} XP bonus`}
            </p>
            <p className="mt-0.5 text-[12.5px] text-white">
              Picked on Monday from your weak spots. Ticks itself off as you go.
            </p>
          </div>
        </div>
        <ul className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
          {plan.items.map((it, i) => {
            const d = describe(it);
            const Icon = d.icon;
            const pct = Math.round((it.progress / Math.max(1, it.target)) * 100);
            return (
              <li key={`${it.kind}-${i}`}>
                <button
                  type="button"
                  onClick={() => navigate(d.to)}
                  disabled={it.done}
                  className="flex min-h-[64px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.08] disabled:hover:bg-transparent sm:px-6"
                >
                  <span
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                      it.done
                        ? 'bg-emerald-400 text-black'
                        : 'bg-white/[0.08] text-white ring-1 ring-white/[0.08]'
                    )}
                  >
                    {it.done ? (
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                    ) : (
                      <Icon className="h-4 w-4" aria-hidden />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'block break-words leading-snug text-[14px] font-semibold',
                        it.done ? 'text-emerald-400' : 'text-white'
                      )}
                    >
                      {d.title}
                    </span>
                    {it.done ? (
                      <span className="block text-[12px] text-white">Done</span>
                    ) : (
                      <span className="mt-1 flex items-center gap-2">
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.1]">
                          <span
                            className="block h-full rounded-full bg-elec-yellow"
                            style={{ width: `${Math.max(pct, 3)}%` }}
                          />
                        </span>
                        <span className="shrink-0 text-[12px] font-semibold tabular-nums text-white">
                          {it.progress}/{it.target}
                        </span>
                      </span>
                    )}
                  </span>
                  {!it.done && it === next && (
                    <ArrowRight className="h-4 w-4 shrink-0 text-elec-yellow" aria-hidden />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
