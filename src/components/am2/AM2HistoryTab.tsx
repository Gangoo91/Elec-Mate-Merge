/**
 * AM2HistoryTab — editorial session history.
 *
 * Past simulation sessions from am2_mock_sessions, redesigned to match
 * the apprentice hub language: editorial eyebrow, yellow accents on
 * interactive elements, semantic per-mode colour on rows (blue/orange/
 * yellow/purple by mode). Mobile-first single column; desktop the rows
 * stay narrow inside a max-w-3xl reading column rather than stretching
 * edge-to-edge.
 */

import { useState, useEffect } from 'react';
import { Lock, Gauge, Search, BookOpen, Loader2, RotateCcw, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const db = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

interface SessionRecord {
  id: string;
  session_type: string;
  overall_score: number | null;
  time_spent_seconds: number | null;
  completed_at: string;
}

interface SessionConfig {
  icon: typeof Lock;
  label: string;
  accent: string;
  pill: string;
  tab: string;
}

const SESSION_CONFIG: Record<string, SessionConfig> = {
  safe_isolation: {
    icon: Lock,
    label: 'Safe isolation',
    accent: 'border-l-elec-yellow/70',
    pill: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30',
    tab: 'safe-isolation',
  },
  testing_sequence: {
    icon: Gauge,
    label: 'Testing sequence',
    accent: 'border-l-blue-400/70',
    pill: 'bg-blue-500/10 text-blue-300 border-blue-400/30',
    tab: 'testing',
  },
  fault_diagnosis: {
    icon: Search,
    label: 'Fault diagnosis',
    accent: 'border-l-orange-400/70',
    pill: 'bg-orange-500/10 text-orange-300 border-orange-400/30',
    tab: 'faults',
  },
  knowledge_test: {
    icon: BookOpen,
    label: 'Knowledge test',
    accent: 'border-l-purple-400/70',
    pill: 'bg-purple-500/10 text-purple-300 border-purple-400/30',
    tab: 'knowledge',
  },
};

interface AM2HistoryTabProps {
  onNavigateToTab: (tab: string) => void;
}

export function AM2HistoryTab({ onNavigateToTab }: AM2HistoryTabProps) {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchSessions = async () => {
      setIsLoading(true);
      const { data, error } = await db
        .from('am2_mock_sessions')
        .select('id, session_type, overall_score, time_spent_seconds, completed_at')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .limit(30);
      if (!error && data) setSessions(data);
      setIsLoading(false);
    };
    fetchSessions();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-16">
        <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
        <span className="text-[12.5px] text-white/70">Loading your sessions…</span>
      </div>
    );
  }

  if (sessions.length === 0) {
    const starters: Array<{ tab: string; label: string; cfg: SessionConfig }> = [
      { tab: 'safe-isolation', label: 'Start safe isolation', cfg: SESSION_CONFIG.safe_isolation },
      { tab: 'testing', label: 'Start testing sequence', cfg: SESSION_CONFIG.testing_sequence },
      { tab: 'faults', label: 'Start fault finding', cfg: SESSION_CONFIG.fault_diagnosis },
      { tab: 'knowledge', label: 'Start knowledge test', cfg: SESSION_CONFIG.knowledge_test },
    ];
    return (
      <div className="mx-auto max-w-md px-4 py-12 sm:py-16 text-center space-y-5">
        <div className="h-14 w-14 mx-auto rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
          <RotateCcw className="h-7 w-7 text-elec-yellow" />
        </div>
        <div className="space-y-1.5">
          <p className="text-base font-semibold text-white">No sessions completed yet</p>
          <p className="text-[12.5px] text-white/65 max-w-xs mx-auto leading-relaxed">
            Complete a simulation to see your history here. Start with safe isolation — it's the
            most common AM2 fail point.
          </p>
        </div>
        <div className="flex flex-col gap-2 max-w-xs mx-auto">
          {starters.map((s) => (
            <button
              key={s.tab}
              type="button"
              onClick={() => onNavigateToTab(s.tab)}
              className={cn(
                'w-full h-11 rounded-xl border text-[12.5px] font-semibold touch-manipulation inline-flex items-center justify-between px-4 transition-colors',
                s.cfg.pill,
                'hover:brightness-125'
              )}
            >
              <span>{s.label}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-5 space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
          Sessions · last {sessions.length}
        </div>
        <span className="text-[10.5px] tabular-nums text-white/45">
          Verified, most recent first
        </span>
      </div>

      <ul className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden divide-y divide-white/[0.04]">
        {sessions.map((session) => {
          const config = SESSION_CONFIG[session.session_type] || SESSION_CONFIG.safe_isolation;
          const Icon = config.icon;
          const score = session.overall_score ?? 0;
          const scoreTone =
            score >= 70 ? 'text-emerald-300' : score >= 50 ? 'text-amber-300' : 'text-red-300';
          const date = new Date(session.completed_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });
          const time = session.time_spent_seconds
            ? `${Math.floor(session.time_spent_seconds / 60)}m ${session.time_spent_seconds % 60}s`
            : null;

          return (
            <li key={session.id}>
              <button
                type="button"
                onClick={() => onNavigateToTab(config.tab)}
                className={cn(
                  'w-full text-left flex items-center gap-3 px-4 sm:px-5 py-3.5 border-l-2 hover:bg-white/[0.02] transition-colors touch-manipulation',
                  config.accent
                )}
                title={`Re-take ${config.label}`}
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 bg-white/[0.04] border border-white/[0.06]">
                  <Icon className="h-4 w-4 text-white/75" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-semibold text-white">{config.label}</div>
                  <div className="mt-0.5 text-[11px] text-white/55 tabular-nums">
                    {date}
                    {time && (
                      <>
                        <span className="mx-1.5 text-white/25">·</span>
                        {time}
                      </>
                    )}
                  </div>
                </div>
                <span className={cn('text-lg font-semibold tabular-nums', scoreTone)}>
                  {score}%
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AM2HistoryTab;
