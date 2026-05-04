import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  useMyCollegeActivity,
  type CollegeActivityItem,
  type CollegeActivityKind,
} from '@/hooks/useMyCollegeActivity';

/* ==========================================================================
   MyActivityFeedCard — apprentice-side feed of recent college-side activity
   on this learner's record (tutor comments, assessor verdicts, IQA verdicts,
   new goals, observations). Editorial: kind-coloured small caps eyebrow per
   row, white headline, optional preview, relative time.
   ========================================================================== */

const KIND_LABEL: Record<CollegeActivityKind, string> = {
  tutor_comment: 'Tutor comment',
  assessor_verdict: 'Assessor verdict',
  iqa_verdict: 'IQA verdict',
  new_goal: 'New ILP goal',
  tutor_goal_comment: 'Goal comment',
  observation: 'Observation logged',
};

const KIND_TONE: Record<CollegeActivityKind, string> = {
  tutor_comment: 'text-white/85',
  assessor_verdict: 'text-white/85',
  iqa_verdict: 'text-white/85',
  new_goal: 'text-white/85',
  tutor_goal_comment: 'text-white/85',
  observation: 'text-white/85',
};

function fmtRel(iso: string): string {
  const t = new Date(iso).getTime();
  const mins = Math.round((Date.now() - t) / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.round(days / 7)}w ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function MyActivityFeedCard() {
  const { items, unread_count, loading } = useMyCollegeActivity();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  if (loading) return <Skeleton />;

  const visible = expanded ? items.slice(0, 20) : items.slice(0, 5);

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
        <div className="px-4 sm:px-5 py-4 sm:py-5">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-cyan-300/85">
            Recent activity
          </div>
          <p className="mt-3 text-[12.5px] text-white/85 leading-snug">
            Nothing from your college team in the last 30 days. As they comment, sign things off,
            and log observations, it'll appear here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-cyan-300/85">
            Recent activity
          </div>
          {unread_count > 0 && (
            <span className="text-[10.5px] tabular-nums text-white/85">
              {unread_count} {unread_count === 1 ? 'item needs' : 'items need'} action
            </span>
          )}
        </div>
        <ul className="mt-3 -mx-1 divide-y divide-white/[0.05]">
          {visible.map((item) => (
            <ActivityRow key={item.id} item={item} onClick={() => handleNavigate(item, navigate)} />
          ))}
        </ul>
        {items.length > 5 && (
          <button
            type="button"
            onClick={() => setExpanded((x) => !x)}
            className="mt-2 px-1 text-[11.5px] font-medium text-white/85 hover:text-white/85 transition-colors touch-manipulation"
          >
            {expanded ? 'Show less' : `Show ${Math.min(15, items.length - 5)} more`}
          </button>
        )}
      </div>
    </section>
  );
}

function handleNavigate(item: CollegeActivityItem, navigate: ReturnType<typeof useNavigate>) {
  if (item.target.type === 'submission') {
    navigate('/apprentice/portfolio-hub?section=tutor');
  } else if (item.target.type === 'goal') {
    navigate('/apprentice/college-plan#plan');
  } else if (item.target.type === 'observation') {
    // Observations don't yet have a deep-link target on apprentice side — drop the user on the
    // college-plan ILP section so they at least see related context.
    navigate('/apprentice/college-plan#plan');
  }
}

function ActivityRow({ item, onClick }: { item: CollegeActivityItem; onClick: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="w-full px-1 py-2.5 flex items-baseline justify-between gap-3 text-left hover:bg-white/[0.02] transition-colors touch-manipulation"
      >
        <div className="min-w-0 flex-1">
          <div
            className={cn('text-[10.5px] font-medium uppercase tracking-[0.16em]',
              KIND_TONE[item.kind]
            )}
          >
            {KIND_LABEL[item.kind]}
          </div>
          <div className="mt-0.5 text-[13px] font-medium text-white leading-snug truncate">
            {item.title}
          </div>
          {item.preview && (
            <div className="mt-1 text-[11.5px] text-white/85 leading-snug line-clamp-2">
              {item.preview}
            </div>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-2">
          {item.is_unread && (
            <span className="h-1.5 w-1.5 rounded-full bg-white/[0.02]" aria-label="unread" />
          )}
          <span className="text-[10.5px] text-white/95 tabular-nums whitespace-nowrap">
            {fmtRel(item.occurred_at)}
          </span>
        </div>
      </button>
    </li>
  );
}

function Skeleton() {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-3">
        <div className="h-3 w-28 rounded-full bg-white/[0.05]" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-2.5 w-20 rounded-full bg-white/[0.05]" />
            <div className="h-3.5 w-3/4 rounded-md bg-white/[0.05]" />
          </div>
        ))}
      </div>
    </section>
  );
}
