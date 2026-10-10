import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { studySpinesFor } from '@/lib/collegeStudyMap';
import { useMyCollegeAccess } from '@/hooks/college/useCollegeAccess';

/* ==========================================================================
   MyCollegeIdentityCard — "which college, which cohort, which tutor".

   Every apprentice college surface used to say "My college hub" / "From your
   college" without ever naming the college. The learner knows where they
   study; the point of naming it is that the page then reads as THEIR record
   rather than a generic template — and a tutor demoing the app on a wall
   screen can see the link is real.

   Two shapes:
     full — eyebrow, college name, cohort · course, tutor. Sits under the
            masthead on the hub landing page, before the KPIs.
     line — one row, for the top of every sub-page. Same facts, no eyebrow.

   Reads from `useMyCollegeContext` (module-cached, one RPC per session), so
   mounting it on several cards on one screen costs nothing extra.

   Renders NULL when the learner is not linked. The unlinked story belongs to
   <JoinCollegeCard>; this card never advertises.
   ========================================================================== */

const NO_COHORT = 'No class group yet. Your tutor will add you';

export function MyCollegeIdentityCard({
  variant = 'full',
  to = '/apprentice/college-plan',
  className,
}: {
  variant?: 'full' | 'line';
  /** Where a tap goes. Pass `null` to render it as a static strip. */
  to?: string | null;
  className?: string;
}) {
  const navigate = useNavigate();
  const { loading, learner } = useMyCollegeContext();
  // College pilot access: say who pays for the app (never an upgrade prompt).
  const { data: access } = useMyCollegeAccess();

  if (loading) return <IdentitySkeleton variant={variant} className={className} />;
  if (!learner) return null;

  const courseLine = learner.qualification_title ?? learner.course_name ?? null;
  const cohortLine = [learner.cohort_name ?? NO_COHORT, courseLine].filter(Boolean).join(' · ');
  const onClick = to ? () => navigate(to) : undefined;

  if (variant === 'line') {
    return (
      <Wrap
        onClick={onClick}
        className={cn(
          'flex w-full min-h-11 items-center gap-3 rounded-xl border border-elec-yellow/35 px-3.5 py-2 text-left',
          CARD_SURFACE,
          onClick &&
            'touch-manipulation transition-colors hover:border-elec-yellow/60 active:scale-[0.99] [-webkit-tap-highlight-color:transparent]',
          className
        )}
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12.5px] font-semibold leading-tight text-white">
            {learner.college_name}
          </span>
          <span className="block truncate text-[12px] leading-tight text-white">
            {cohortLine}
            {learner.tutor_name ? ` · Tutor: ${learner.tutor_name}` : ''}
          </span>
        </span>
        {onClick && <ChevronRight className="h-4 w-4 shrink-0 text-white" />}
      </Wrap>
    );
  }

  return (
    <Wrap
      onClick={onClick}
      className={cn(
        onClick
          ? cn(CARD_BASE, CARD_NEUTRAL)
          : cn('rounded-2xl border border-elec-yellow/35', CARD_SURFACE),
        'relative w-full overflow-hidden p-4 sm:p-5',
        className
      )}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="min-w-0 flex-1">
          <span className="block text-[12px] font-medium uppercase tracking-[0.18em] text-white">
            Your college
          </span>
          <span className="mt-1 block text-[16px] font-semibold leading-tight tracking-tight text-white sm:text-[18px]">
            {learner.college_name}
          </span>
          <span className="mt-1.5 block text-[12.5px] leading-snug text-white">{cohortLine}</span>
          {learner.tutor_name && (
            <span className="mt-1 block text-[12px] leading-snug text-white">
              Tutor: {learner.tutor_name}
            </span>
          )}
          {access?.provided_by_college && access.has_access && (
            <span className="mt-1.5 block text-[12px] font-semibold leading-snug text-white">
              Access provided by {access.college_name}
            </span>
          )}
        </span>
        {onClick && <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white" />}
      </span>
    </Wrap>
  );
}

/**
 * One quiet line on a course landing page, for a linked learner whose
 * enrolled qualification maps onto this spine: "Mapped to your Level 3
 * Diploma (2365-03) at Northgate College", with a link to their criteria
 * coverage. Renders nothing for everyone else, so the course pages are
 * unchanged for the 95% of learners who are not college-linked.
 *
 * "Mapped to", not "this is" — the Study Centre teaches the ground the
 * qualification covers; it is not the awarding body's course (and carries no
 * EAL units at all — see collegeStudyMap).
 */
export function MappedToYourQualification({ routeKey }: { routeKey: string }) {
  const { learner } = useMyCollegeContext();
  if (!learner) return null;
  const spines = studySpinesFor(learner.qualification_code, learner.course_level);
  if (!spines.some((s) => s.routeKey === routeKey)) return null;
  const title = learner.qualification_title ?? learner.course_name;
  if (!title) return null;
  return (
    <p className="max-w-3xl text-[12.5px] leading-relaxed text-white">
      Mapped to your {title}
      {learner.qualification_code ? ` (${learner.qualification_code})` : ''} at{' '}
      {learner.college_name}.{' '}
      <Link
        to="/apprentice/college/progress"
        className="inline-flex min-h-11 items-center font-semibold text-elec-yellow touch-manipulation"
      >
        See your criteria coverage →
      </Link>
    </p>
  );
}

/** A button when it goes somewhere, a plain block when it doesn't. */
function Wrap({
  onClick,
  className,
  children,
}: {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}) {
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>
    );
  }
  return <div className={className}>{children}</div>;
}

function IdentitySkeleton({
  variant,
  className,
}: {
  variant: 'full' | 'line';
  className?: string;
}) {
  if (variant === 'line') {
    return (
      <div
        className={cn(
          'min-h-11 animate-pulse rounded-xl border border-white/[0.06] px-3.5 py-2',
          CARD_SURFACE,
          className
        )}
      >
        <div className="h-2.5 w-40 rounded bg-white/[0.06]" />
        <div className="mt-1.5 h-2 w-56 rounded bg-white/[0.04]" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        'animate-pulse rounded-2xl border border-white/[0.06] p-4 sm:p-5',
        CARD_SURFACE,
        className
      )}
    >
      <div className="h-2 w-20 rounded bg-white/[0.05]" />
      <div className="mt-2.5 h-4 w-2/3 rounded bg-white/[0.06]" />
      <div className="mt-2 h-2.5 w-1/2 rounded bg-white/[0.04]" />
    </div>
  );
}
