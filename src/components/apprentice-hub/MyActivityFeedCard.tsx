import { LC_FRAME, lcChip } from '@/components/apprentice-hub/college-hub/learnerUi';
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
  new_goal: 'New learning plan goal',
  tutor_goal_comment: 'Goal comment',
  observation: 'Observation logged',
  quiz_result: 'Quiz result',
};

const KIND_TONE: Record<CollegeActivityKind, string> = {
  tutor_comment: 'text-white',
  assessor_verdict: 'text-white',
  iqa_verdict: 'text-white',
  new_goal: 'text-white',
  tutor_goal_comment: 'text-white',
  observation: 'text-white',
  quiz_result: 'text-white',
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
      <section className={LC_FRAME}>
        <div className="px-4 sm:px-5 py-4 sm:py-5">
          <div className="text-[15px] font-semibold tracking-tight text-white">Recent activity</div>
          <p className="mt-3 text-[12.5px] text-white leading-snug">
            Nothing from your college team in the last 30 days. As they comment, sign things off,
            log observations and mark your quizzes, it'll appear here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={LC_FRAME}>
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[15px] font-semibold tracking-tight text-white">Recent activity</div>
          {unread_count > 0 && (
            <span className={lcChip('action')}>
              {unread_count} {unread_count === 1 ? 'needs' : 'need'} you
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
            className="mt-2 px-1 text-[12px] font-medium text-white hover:text-white transition-colors touch-manipulation"
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
    // Submissions live in the portfolio workspace — the hub's Work tab.
    // (`?section=tutor` was a dead query: the hub reads `?tab=`.)
    navigate('/apprentice/hub?tab=work');
  } else if (item.target.type === 'goal') {
    navigate('/apprentice/college/plan');
  } else if (item.target.type === 'observation') {
    // Observations don't yet have a deep-link target on apprentice side — drop the user on the
    // ILP section so they at least see related context. (`/college-plan#plan` pointed at an
    // anchor that no longer exists on the hub landing page.)
    navigate('/apprentice/college/plan');
  } else if (item.target.type === 'quiz') {
    navigate(`/apprentice/college/quiz/${item.target.id}`);
  }
}

function ActivityRow({ item, onClick }: { item: CollegeActivityItem; onClick: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="flex min-h-[56px] w-full items-baseline justify-between gap-3 px-1 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07]"
      >
        <div className="min-w-0 flex-1">
          <div className={cn('text-[13px] font-medium', KIND_TONE[item.kind])}>
            {KIND_LABEL[item.kind]}
          </div>
          <div className="mt-0.5 text-[14px] font-semibold text-white leading-snug line-clamp-2">
            {item.title}
          </div>
          {item.preview && (
            <div className="mt-1 text-[12px] text-white leading-snug line-clamp-2">
              {item.preview}
            </div>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-2">
          {item.is_unread && (
            <span className="h-1.5 w-1.5 rounded-full bg-white/[0.02]" aria-label="unread" />
          )}
          <span className="text-[12px] text-white tabular-nums whitespace-nowrap">
            {fmtRel(item.occurred_at)}
          </span>
        </div>
      </button>
    </li>
  );
}

function Skeleton() {
  return (
    <section className={LC_FRAME}>
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
