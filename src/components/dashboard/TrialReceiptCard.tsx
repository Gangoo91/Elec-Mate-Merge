import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, FileCheck, GraduationCap, ReceiptText, Target } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

/**
 * The trial "receipt" — shows trialists what they've already made with the
 * app, in their own numbers. Loss aversion converts better than feature
 * lists: "look what you'd be giving up" beats "look what we have".
 * When they haven't made anything yet, it flips to an activation nudge
 * instead (get one real job through = the single best predictor of keeping
 * the subscription).
 */

type ReceiptStats =
  | { kind: 'work'; certs: number; quotes: number; quotedTotal: number; invoices: number }
  | { kind: 'study'; quizzes: number; questions: number; bestScore: number };

const PRICE_BY_ROLE: Record<string, string> = {
  apprentice: '£6.99',
  electrician: '£19.99',
};

const TrialReceiptCard = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<ReceiptStats | null>(null);
  const [loaded, setLoaded] = useState(false);

  const isActiveTrial =
    !!profile?.is_trial && !!profile?.trial_end && new Date(profile.trial_end) > new Date();

  useEffect(() => {
    if (!user?.id || !isActiveTrial) return;
    let cancelled = false;

    const load = async () => {
      try {
        if (profile?.role === 'apprentice') {
          const { data } = await supabase
            .from('quiz_results')
            .select('total_questions, score')
            .eq('user_id', user.id);
          if (cancelled) return;
          const rows = data ?? [];
          setStats({
            kind: 'study',
            quizzes: rows.length,
            questions: rows.reduce((sum, r) => sum + (r.total_questions ?? 0), 0),
            bestScore: rows.reduce((best, r) => Math.max(best, r.score ?? 0), 0),
          });
        } else {
          const [certsRes, quotesRes, invoicesRes] = await Promise.all([
            supabase
              .from('reports')
              .select('id', { count: 'exact', head: true })
              .eq('user_id', user.id),
            supabase.from('quotes').select('total').eq('user_id', user.id),
            supabase
              .from('invoices')
              .select('id', { count: 'exact', head: true })
              .eq('user_id', user.id),
          ]);
          if (cancelled) return;
          const quoteRows = quotesRes.data ?? [];
          setStats({
            kind: 'work',
            certs: certsRes.count ?? 0,
            quotes: quoteRows.length,
            quotedTotal: quoteRows.reduce((sum, q) => sum + (Number(q.total) || 0), 0),
            invoices: invoicesRes.count ?? 0,
          });
        }
      } catch {
        // Receipt is a nice-to-have — never block the dashboard on it
      } finally {
        if (!cancelled) setLoaded(true);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [user?.id, isActiveTrial, profile?.role]);

  if (!isActiveTrial || !loaded || !stats) return null;

  const trialEnd = new Date(profile!.trial_end!).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  });
  const price = PRICE_BY_ROLE[profile?.role ?? 'electrician'] ?? PRICE_BY_ROLE.electrician;

  const hasActivity =
    stats.kind === 'work'
      ? stats.certs + stats.quotes + stats.invoices > 0
      : stats.quizzes > 0;

  // Rough but honest: a cert typed up by hand is ~45 min, a quote ~20, an invoice ~10
  const minutesSaved =
    stats.kind === 'work' ? stats.certs * 45 + stats.quotes * 20 + stats.invoices * 10 : 0;
  const hoursSaved = Math.round((minutesSaved / 60) * 10) / 10;

  const tiles =
    stats.kind === 'work'
      ? [
          { icon: FileCheck, value: String(stats.certs), label: stats.certs === 1 ? 'cert' : 'certs' },
          {
            icon: ReceiptText,
            value: `£${Math.round(stats.quotedTotal).toLocaleString('en-GB')}`,
            label: 'quoted',
          },
          { icon: Clock, value: `~${hoursSaved}h`, label: 'saved' },
        ]
      : [
          { icon: GraduationCap, value: String(stats.quizzes), label: stats.quizzes === 1 ? 'quiz' : 'quizzes' },
          { icon: Target, value: String(stats.questions), label: 'questions' },
          { icon: FileCheck, value: `${stats.bestScore}%`, label: 'best score' },
        ];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/[0.06] via-amber-500/[0.02] to-transparent p-5 sm:p-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/70 to-elec-yellow/0 opacity-80" />

      {hasActivity ? (
        <>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow-400">
            Your trial so far
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {tiles.map((tile) => (
              <div
                key={tile.label}
                className="rounded-xl border border-white/[0.08] bg-black/30 px-3 py-3 text-center"
              >
                <tile.icon className="mx-auto h-4 w-4 text-yellow-400" />
                <p className="mt-1.5 text-[20px] font-bold leading-none text-white tabular-nums">
                  {tile.value}
                </p>
                <p className="mt-1 text-[11px] text-white/60">{tile.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12.5px] leading-[1.6] text-white/70">
            All of it stays with you. Your trial ends on {trialEnd} — keep everything for {price}
            /month, or cancel before then and pay nothing.
          </p>
        </>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow-400">
              Free until {trialEnd}
            </p>
            <h2 className="mt-2 text-[1.15rem] font-bold leading-[1.25] tracking-[-0.02em] text-white">
              {profile?.role === 'apprentice'
                ? 'Sit one mock exam this week — see where you stand.'
                : 'Put one real job through it this week.'}
            </h2>
            <p className="mt-1.5 text-[13px] leading-[1.55] text-white/65">
              {profile?.role === 'apprentice'
                ? 'Ten minutes, real exam questions, instant score.'
                : 'One cert or quote is all it takes to see the time it saves.'}
            </p>
          </div>
          <Link
            to={
              profile?.role === 'apprentice'
                ? '/study-centre/apprentice'
                : '/electrician/inspection-testing/new'
            }
            className="inline-flex h-11 flex-shrink-0 touch-manipulation items-center justify-center gap-2 rounded-2xl bg-yellow-500 px-5 text-[14px] font-semibold text-black transition-colors hover:bg-yellow-400"
          >
            {profile?.role === 'apprentice' ? 'Start a mock exam' : 'Start a cert'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
};

export default TrialReceiptCard;
