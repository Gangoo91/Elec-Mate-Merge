/**
 * AM2HistoryTab
 *
 * Shows past simulation sessions from am2_mock_sessions.
 * Each card shows session type, score, date, and time spent.
 */

import { useState, useEffect } from 'react';
import { Lock, Gauge, Search, BookOpen, Loader2, RotateCcw } from 'lucide-react';
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

const SESSION_CONFIG: Record<
  string,
  { icon: typeof Lock; label: string; colour: string; border: string; bg: string }
> = {
  safe_isolation: {
    icon: Lock,
    label: 'Safe Isolation',
    colour: 'text-cyan-400',
    border: 'border-l-cyan-500',
    bg: 'bg-elec-gray',
  },
  testing_sequence: {
    icon: Gauge,
    label: 'Testing Sequence',
    colour: 'text-blue-400',
    border: 'border-l-blue-500',
    bg: 'bg-elec-gray',
  },
  fault_diagnosis: {
    icon: Search,
    label: 'Fault Diagnosis',
    colour: 'text-orange-400',
    border: 'border-l-orange-500',
    bg: 'bg-elec-gray',
  },
  knowledge_test: {
    icon: BookOpen,
    label: 'Knowledge Test',
    colour: 'text-purple-400',
    border: 'border-l-purple-500',
    bg: 'bg-elec-gray',
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

      if (!error && data) {
        setSessions(data);
      }
      setIsLoading(false);
    };

    fetchSessions();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 space-y-4">
        <div className="h-14 w-14 rounded-2xl bg-elec-gray border border-white/10 flex items-center justify-center">
          <RotateCcw className="h-7 w-7 text-white" />
        </div>
        <p className="text-sm font-medium text-white text-center">No sessions completed yet</p>
        <p className="text-xs text-white text-center max-w-xs">
          Complete a simulation to see your history here. Start with safe isolation — it's the most
          common AM2 fail point.
        </p>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <button
            onClick={() => onNavigateToTab('safe-isolation')}
            className="w-full h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-medium text-sm touch-manipulation"
          >
            Start Safe Isolation
          </button>
          <button
            onClick={() => onNavigateToTab('testing')}
            className="w-full h-11 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 font-medium text-sm touch-manipulation"
          >
            Start Testing Sequence
          </button>
          <button
            onClick={() => onNavigateToTab('faults')}
            className="w-full h-11 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 font-medium text-sm touch-manipulation"
          >
            Start Fault Finding
          </button>
          <button
            onClick={() => onNavigateToTab('knowledge')}
            className="w-full h-11 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-medium text-sm touch-manipulation"
          >
            Start Knowledge Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-3 animate-fade-in">
      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
        Recent Sessions ({sessions.length})
      </h3>

      <div className="space-y-2">
        {sessions.map((session) => {
          const config = SESSION_CONFIG[session.session_type] || SESSION_CONFIG.safe_isolation;
          const Icon = config.icon;
          const score = session.overall_score ?? 0;
          const scoreColour =
            score >= 70 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400';

          const date = new Date(session.completed_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });

          const time = session.time_spent_seconds
            ? `${Math.floor(session.time_spent_seconds / 60)}m ${session.time_spent_seconds % 60}s`
            : null;

          return (
            <div
              key={session.id}
              className={cn(
                'flex items-center gap-3 p-3.5 rounded-xl border-l-4',
                config.border,
                config.bg
              )}
            >
              <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center shrink-0 bg-white/5')}>
                <Icon className={cn('h-5 w-5', config.colour)} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{config.label}</p>
                <p className="text-xs text-white mt-0.5">
                  {date}
                  {time && ` · ${time}`}
                </p>
              </div>

              <span className={cn('text-lg font-bold', scoreColour)}>{score}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AM2HistoryTab;
