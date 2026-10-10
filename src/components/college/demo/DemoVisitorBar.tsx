import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  endMyDemoVisit,
  getMyDemoVisit,
  isDemoVisitorEmail,
  type MyDemoVisit,
} from '@/lib/demoTry';

/**
 * The "Demo learner" label for a "Try it on your phone" visitor (ELE-1854).
 *
 * Renders nothing for everyone else. For a visitor: a slim bar pinned to the
 * screen (above the tab bar) saying this is a demo, the time left, and an End button.
 * When the two hours are up (or End is tapped) the visit ends, the phone is
 * signed out and the visitor lands on the thank-you page.
 */
export function DemoVisitorBar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const email = user?.email ?? null;
  const visitor = isDemoVisitorEmail(email);
  const [visit, setVisit] = useState<MyDemoVisit | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!visitor) {
      setVisit(null);
      return;
    }
    let cancelled = false;
    void getMyDemoVisit().then((v) => {
      if (!cancelled) setVisit(v);
    });
    const id = window.setInterval(() => setNow(Date.now()), 15_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [visitor, user?.id]);

  const endsAt = visit ? new Date(visit.session_ends_at).getTime() : null;
  const over = visit ? visit.ended || (endsAt !== null && endsAt <= now) : false;

  useEffect(() => {
    if (!visitor || !over) return;
    void endMyDemoVisit().then(() => navigate('/try', { replace: true }));
  }, [visitor, over, navigate]);

  if (!visitor) return null;

  const mins = endsAt ? Math.max(0, Math.ceil((endsAt - now) / 60_000)) : null;
  const left =
    mins === null
      ? ''
      : mins >= 60
        ? `${Math.floor(mins / 60)}h ${mins % 60}m left`
        : `${mins}m left`;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+92px)] z-[70] flex justify-center px-3 lg:bottom-6"
      data-testid="demo-visitor-bar"
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-elec-yellow bg-[hsl(0_0%_8%)] py-1 pl-4 pr-1 shadow-lg">
        <span className="text-[12px] font-semibold text-white">
          Demo learner{left ? <span className="font-medium"> · {left}</span> : null}
        </span>
        <button
          type="button"
          onClick={() => void endMyDemoVisit().then(() => navigate('/try', { replace: true }))}
          className="h-11 rounded-full bg-elec-yellow px-4 text-[12.5px] font-semibold text-black touch-manipulation"
        >
          End demo
        </button>
      </div>
    </div>
  );
}

export default DemoVisitorBar;
