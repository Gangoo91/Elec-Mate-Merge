import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

const PORTFOLIO_AI_PROMPT =
  "Help me write up a piece of work for my portfolio. I'll describe the job and you draft the entry against the right ACs.";

/* ==========================================================================
   MyPortfolioSummaryCard — apprentice-side digest of portfolio state visible
   from inside the college hub. Counts only — the deep workspace is at
   /apprentice/portfolio-hub. Each row is a jump into a specific section.

   Counts come from portfolio_submissions (the canonical IQA/sign-off
   workflow) plus portfolio_comments for unread tutor feedback.
   ========================================================================== */

interface SubmissionRow {
  id: string;
  status: string;
  iqa_outcome: string | null;
  action_required: string | null;
  last_feedback_at: string | null;
  updated_at: string | null;
}

interface ItemRow {
  id: string;
  is_supervisor_verified: boolean;
}

const ACTION_STATUSES = new Set([
  'feedback_given',
  'rejected',
  'returned',
  'in_review',
  'under_review',
]);

const APPROVED_STATUSES = new Set(['approved', 'signed_off', 'iqa_verified']);

export function MyPortfolioSummaryCard() {
  const [items, setItems] = useState<ItemRow[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [unreadComments, setUnreadComments] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAll = useCallback(async () => {
    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) {
      setLoading(false);
      return;
    }

    const [itemsRes, subsRes, commentsRes] = await Promise.all([
      supabase.from('portfolio_items').select('id, is_supervisor_verified').eq('user_id', uid),
      supabase
        .from('portfolio_submissions')
        .select('id, status, iqa_outcome, action_required, last_feedback_at, updated_at')
        .eq('user_id', uid)
        .order('updated_at', { ascending: false })
        .limit(50),
      // portfolio_comments has no `read_at` — the canonical "needs my
      // attention" pair is requires_action=true + is_resolved=false, scoped
      // to the apprentice via action_owner (the assignee).
      supabase
        .from('portfolio_comments')
        .select('id, created_at, requires_action, is_resolved, action_owner')
        .eq('action_owner', uid)
        .eq('requires_action', true)
        .eq('is_resolved', false)
        .limit(50),
    ]);

    setItems((itemsRes.data ?? []) as ItemRow[]);
    setSubmissions((subsRes.data ?? []) as SubmissionRow[]);
    setUnreadComments((commentsRes.data ?? []).length);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Realtime — tutor sign-off / comment / IQA flip should update the card
  // without a refresh.
  useEffect(() => {
    let chan: ReturnType<typeof supabase.channel> | null = null;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      if (!uid) return;
      chan = supabase
        .channel(`my_portfolio_summary:${uid}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'portfolio_submissions',
            filter: `user_id=eq.${uid}`,
          },
          () => fetchAll()
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'portfolio_comments',
            filter: `user_id=eq.${uid}`,
          },
          () => fetchAll()
        )
        .subscribe();
    })();
    return () => {
      if (chan) supabase.removeChannel(chan);
    };
  }, [fetchAll]);

  const stats = useMemo(() => {
    let actioning = 0;
    let approved = 0;
    let drafts = 0;
    for (const s of submissions) {
      if (s.status === 'draft') drafts += 1;
      else if (ACTION_STATUSES.has(s.status) || s.action_required) actioning += 1;
      else if (APPROVED_STATUSES.has(s.status)) approved += 1;
    }
    const totalItems = items.length;
    const verifiedItems = items.filter((i) => i.is_supervisor_verified).length;
    return { actioning, approved, drafts, totalItems, verifiedItems };
  }, [items, submissions]);

  if (loading) return <Skeleton />;

  const empty = stats.totalItems === 0 && submissions.length === 0;

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-blue-300/85">
            Portfolio
          </div>
          {unreadComments > 0 && (
            <span className="text-[10.5px] tabular-nums text-white/85">
              {unreadComments} new tutor {unreadComments === 1 ? 'comment' : 'comments'}
            </span>
          )}
        </div>

        {empty ? (
          <>
            <p className="mt-3 text-[12.5px] text-white/90 leading-snug">
              Your portfolio is empty. Start adding evidence — photos, reflections, OTJ — and your
              tutor sees it instantly.
            </p>
            <button
              type="button"
              onClick={() => navigate('/apprentice/portfolio-hub')}
              className="mt-4 w-full h-11 rounded-lg bg-white/[0.02] text-white text-[13px] font-semibold hover:bg-white/[0.02] transition-colors touch-manipulation"
            >
              Open portfolio
            </button>
          </>
        ) : (
          <>
            <div className="mt-3 grid grid-cols-3 gap-3 sm:gap-5">
              <Stat value={stats.totalItems.toString()} label="Items" tone="text-white" />
              <Stat
                value={stats.actioning.toString()}
                label="Action needed"
                tone={stats.actioning > 0 ? 'text-white/85' : 'text-white/85'}
              />
              <Stat
                value={stats.approved.toString()}
                label="Approved"
                tone={stats.approved > 0 ? 'text-white/85' : 'text-white/85'}
              />
            </div>

            <p className="mt-3 text-[11.5px] sm:text-[12px] text-white/85 leading-snug">
              {stats.actioning > 0 || unreadComments > 0
                ? `Your tutor's left feedback. Respond to keep your portfolio moving toward sign-off.`
                : 'Add evidence as you go — photos and reflections strengthen your IQA verification rate.'}
            </p>

            {stats.actioning > 0 || unreadComments > 0 ? (
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => navigate('/apprentice/portfolio-hub?section=tutor')}
                  className="w-full h-11 rounded-lg bg-white/[0.02] text-white text-[13px] font-semibold hover:bg-white/[0.02] transition-colors touch-manipulation"
                >
                  Respond to tutor →
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/apprentice/portfolio-hub?section=evidence')}
                    className="h-11 rounded-lg border border-white/[0.10] bg-white/[0.02] text-[12.5px] font-medium text-white/85 hover:text-white hover:border-white/[0.22] transition-colors touch-manipulation"
                  >
                    Add evidence
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/apprentice/college-ai?prompt=${encodeURIComponent(PORTFOLIO_AI_PROMPT)}`
                      )
                    }
                    className="inline-flex items-center justify-center gap-1.5 h-11 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/85 text-[12.5px] font-semibold hover:bg-white/[0.02] transition-colors touch-manipulation"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Draft with AI
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/apprentice/portfolio-hub?section=evidence')}
                  className="h-11 rounded-lg bg-white/[0.02] text-white text-[13px] font-semibold hover:bg-white/[0.02] transition-colors touch-manipulation"
                >
                  Add evidence
                </button>
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/apprentice/college-ai?prompt=${encodeURIComponent(PORTFOLIO_AI_PROMPT)}`
                    )
                  }
                  className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/85 text-[13px] font-semibold hover:bg-white/[0.02] transition-colors touch-manipulation"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Draft with AI
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Stat({ value, label, tone }: { value: string; label: string; tone: string }) {
  return (
    <div>
      <div
        className={cn('text-[20px] sm:text-[24px] font-semibold tabular-nums leading-none', tone)}
      >
        {value}
      </div>
      <div className="mt-1 text-[10.5px] uppercase tracking-[0.14em] text-white/95">{label}</div>
    </div>
  );
}

function Skeleton() {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4">
        <div className="h-3 w-24 rounded-full bg-white/[0.05]" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-6 w-12 rounded-md bg-white/[0.05]" />
              <div className="h-3 w-14 rounded-full bg-white/[0.04]" />
            </div>
          ))}
        </div>
        <div className="h-11 rounded-lg bg-white/[0.04]" />
      </div>
    </section>
  );
}
