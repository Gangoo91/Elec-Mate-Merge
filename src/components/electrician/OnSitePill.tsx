/**
 * The clock, wherever he is.
 *
 * Once a job is started from the diary the electrician goes to the board
 * scanner, a certificate, a quote — and the only place the running clock was
 * visible was the event sheet he had left. Every "another timer is still
 * running" case started here: he forgot, because nothing reminded him.
 *
 * A small bar above the home indicator on every Electrical Hub page while a
 * session is open. Tap the label for the job; End stops the clock (finished
 * for today — the job stays open). Hidden on the calendar and the time
 * tracker, which show the clock themselves.
 *
 * Ticks once a minute, not once a second: the label is "1h 12m", and a
 * per-second tick would re-render every hub page for the length of a job.
 */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Square } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { formatElapsed, stopSession, type ActiveSession } from '@/lib/eventJobActions';
import { ACTIVE_SESSION_KEY } from '@/components/calendar/useEventJobHub';

const HIDDEN_ON = ['/electrician/business/calendar', '/electrician/time-tracker'];

export default function OnSitePill() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);

  const { data: session } = useQuery({
    queryKey: ACTIVE_SESSION_KEY,
    staleTime: 30_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    queryFn: async (): Promise<ActiveSession | null> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;
      const { data, error } = await supabase
        .from('time_sessions')
        .select('*')
        .eq('user_id', user.id)
        .is('ended_at', null)
        .maybeSingle();
      if (error) throw error;
      return (data as ActiveSession | null) ?? null;
    },
  });

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!session) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, [session]);

  if (!session) return null;
  if (HIDDEN_ON.some((p) => location.pathname.startsWith(p))) return null;

  const elapsed = Math.max(0, Math.floor((now - new Date(session.started_at).getTime()) / 1000));

  const end = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const seconds = await stopSession(session);
      queryClient.invalidateQueries({ queryKey: ACTIVE_SESSION_KEY });
      queryClient.invalidateQueries({ queryKey: ['time-sessions-recent'] });
      queryClient.invalidateQueries({ queryKey: ['event-job-records'] });
      toast({
        title: 'Finished for today',
        description: `${formatElapsed(seconds)} logged${session.label ? ` against ${session.label}` : ''}.`,
      });
    } catch (e) {
      toast({
        title: 'Could not stop the clock',
        description: e instanceof Error ? e.message : 'Try again',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  const openJob = () => {
    navigate(
      session.project_id ? `/electrician/projects/${session.project_id}` : '/electrician/time-tracker'
    );
  };

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4"
      style={{ bottom: 'calc(5.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="pointer-events-auto flex h-14 w-full max-w-sm items-center gap-2 rounded-full border border-elec-yellow/40 bg-black/90 pl-4 pr-1.5 shadow-lg shadow-black/40 backdrop-blur">
        <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-elec-yellow" aria-hidden />
        <button
          type="button"
          onClick={openJob}
          className="flex h-full min-w-0 flex-1 items-center gap-2 text-left touch-manipulation"
        >
          <span className="shrink-0 text-[14px] font-semibold tabular-nums text-white">
            {formatElapsed(elapsed)}
          </span>
          <span className="min-w-0 flex-1 truncate text-[13px] text-white">
            {session.label ?? 'On site'}
          </span>
        </button>
        <button
          type="button"
          onClick={end}
          disabled={busy}
          className="flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation active:scale-[0.97] disabled:opacity-60"
        >
          <Square className="h-3.5 w-3.5" />
          End
        </button>
      </div>
    </div>
  );
}
