/**
 * PortfolioStartHere
 * ────────────────────────────────────────────────────────────────────────
 * The "Start here" side of My Work.
 *
 * NOT called PortfolioGettingStarted: `ApprenticeRoutes` already binds that name
 * to the toolbox guide page (`toolbox/portfolio-guide/GettingStartedPage`), and
 * two unrelated components sharing a name is how the wrong one gets imported.
 *
 * ELE-1728. Cole Humphreys, redoing his NVQ 3: "i've choose my qualification on
 * the app, but it doesn't seem straight forward on what i've got to do for my
 * portfolio." He went into the portfolio and got lost — the screen showed an
 * empty grid and a button, and nothing about the course he was being marked
 * against or how any of it fits together.
 *
 * He is one of many: 92 learners have chosen a qualification and 7 have ever
 * added an item.
 *
 * WHAT THIS IS NOT
 * It does not explain what a portfolio is. Anyone redoing an NVQ knows that,
 * and being told would be worse than being told nothing. It explains what to do
 * HERE — how evidence, criteria and progress connect in this app — and it shows
 * the course being marked against, which is the thing that drives everything
 * else and was invisible from this screen.
 *
 * 🔴 THE COURSE IS NOT ALWAYS THE LEARNER'S TO CHANGE.
 * A college can enrol a student, and enrolment is authoritative over a
 * self-selection (see `useStudentQualification`). Where a college has enrolled
 * them, this says so and the button reads "View course" — the selector the hub
 * opens is passed `lockedToCode`, so the sheet itself allows viewing and not
 * swapping. The button is still shown, deliberately: a learner whose own
 * selection has diverged needs a way to put it right, and hiding it would leave
 * them told their tagging does not count with nowhere to go.
 *
 * 3 of the 9 college-enrolled learners are currently diverged — one has the
 * legacy 2357 NVQ selected against a college course of 5357, a single digit
 * apart — so the warning below is doing real work, not guarding a theory.
 */

import { BookOpen, Camera, GraduationCap, Tag, TrendingUp, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { useStudentQualification } from '@/hooks/useStudentQualification';

interface PortfolioStartHereProps {
  /** Opens the qualification selector — the hub owns that sheet. */
  onChooseCourse?: () => void;
  /** Opens the capture sheet, the same one the evidence grid uses. */
  onCapture?: () => void;
}

const STEPS = [
  {
    icon: Camera,
    title: 'Capture the work as you do it',
    body: 'A photo of the job, your test results, a note about what you did. Easiest at the time — much harder to reconstruct in Year 3.',
  },
  {
    icon: Tag,
    title: 'Tag it to the criteria it proves',
    body: 'Pick the assessment criteria the work covers, so it counts towards your units instead of sitting in a folder. The entry is scored against VACSR as you build it — valid, authentic, current, sufficient, reliable — and tells you which one is short.',
  },
  {
    icon: TrendingUp,
    title: 'Watch the units fill in',
    body: 'Your course requirements show each criterion as evidenced, partial or not started — so you can see what is left instead of guessing.',
  },
  {
    icon: BookOpen,
    title: 'Hand it over when you need to',
    body: 'Export or share the portfolio for your tutor, your assessor or the EPA gateway.',
  },
];

export function PortfolioStartHere({ onChooseCourse, onCapture }: PortfolioStartHereProps) {
  const navigate = useNavigate();
  const {
    qualificationName,
    qualificationCode,
    collegeCourseCode,
    divergesFromCollege,
    source,
    isLoading,
  } = useStudentQualification();
  // Enrolment is authoritative, so a college course is shown, never offered.
  const setByCollege = source === 'college' || Boolean(collegeCourseCode);
  const hasCourse = Boolean(qualificationCode);

  return (
    <div className="space-y-4">
      {/* ── The course everything is marked against ───────────────────── */}
      <section className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
        <div className="flex items-start gap-3">
          <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-elec-yellow" />
          <div className="min-w-0 flex-1">
            <h2 className="text-[15px] font-semibold tracking-tight text-white">Your course</h2>

            {isLoading && <p className="mt-1 text-[13px] text-white">Checking your course…</p>}

            {!isLoading && hasCourse && (
              <>
                <p className="mt-1 text-[14px] font-medium text-white">
                  {qualificationName || qualificationCode}
                </p>
                <p className="mt-0.5 text-[12px] text-white">
                  {setByCollege ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Lock className="h-3 w-3 text-elec-yellow" />
                      Set by your college — everything is marked against this
                    </span>
                  ) : (
                    'Everything in your portfolio is marked against this course.'
                  )}
                </p>
              </>
            )}

            {!isLoading && !hasCourse && (
              <p className="mt-1 text-[13px] text-white">
                Choose your course first — it decides which criteria your evidence counts towards.
              </p>
            )}

            {/*
              The one case where a learner can be quietly wasting their time:
              they picked a course themselves, their college enrolled them on a
              different one, and enrolment is what they are marked against. Said
              here because this is the screen where they decide what to tag.
            */}
            {!isLoading && divergesFromCollege && collegeCourseCode && (
              <p className="mt-2 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-[12px] text-orange-300">
                Your college enrolled you on <strong>{collegeCourseCode}</strong>, and that is what
                you are marked against. Anything you tag against a different course will not count
                towards it.
              </p>
            )}
          </div>
        </div>

        {/*
          Always offered, even when a college set the course — the selector the
          hub opens is passed `lockedToCode`, so a college-enrolled learner can
          only VIEW theirs, never swap it. Hiding the button instead would trap
          a learner whose own selection has diverged: they would be told their
          tagging does not count, with no way to put it right.
        */}
        {!isLoading && onChooseCourse && (
          <button
            type="button"
            onClick={onChooseCourse}
            className={cn(
              'mt-3 h-11 w-full touch-manipulation rounded-xl text-[14px] font-semibold',
              hasCourse
                ? 'border border-white/[0.12] bg-white/[0.06] text-white'
                : 'bg-elec-yellow text-black'
            )}
          >
            {/* Mirrors the sheet's own wording, which already distinguishes
                these two cases. */}
            {setByCollege ? 'View course' : hasCourse ? 'Change course' : 'Choose your course'}
          </button>
        )}
      </section>

      {/* ── How it works here ─────────────────────────────────────────── */}
      <section className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">
          How your portfolio works here
        </h2>
        <p className="mb-3 mt-1 text-[12px] text-white">
          You know what a portfolio is. This is how this one works — the app does the mapping, the
          VACSR check and the counting.
        </p>

        <ol className="space-y-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-elec-yellow/[0.14] text-[12px] font-bold text-elec-yellow">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <step.icon className="h-3.5 w-3.5 shrink-0 text-elec-yellow" />
                  <span className="text-[14px] font-semibold text-white">{step.title}</span>
                </span>
                <span className="mt-0.5 block text-[12.5px] leading-relaxed text-white">
                  {step.body}
                </span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          {onCapture && (
            <button
              type="button"
              onClick={onCapture}
              disabled={!hasCourse}
              className="h-11 flex-1 touch-manipulation rounded-xl bg-elec-yellow text-[14px] font-semibold text-black disabled:bg-white/[0.08] disabled:text-white"
            >
              {hasCourse ? 'Add your first evidence' : 'Choose a course first'}
            </button>
          )}
          {/* The long-form guide already exists in the toolbox and nothing
              linked to it from here, which is how a learner ended up with no
              way to find out how any of this worked. */}
          <button
            type="button"
            onClick={() => navigate('/apprentice/toolbox/portfolio-building')}
            className="h-11 flex-1 touch-manipulation rounded-xl border border-white/[0.12] bg-white/[0.06] text-[14px] font-semibold text-white"
          >
            Read the full guide
          </button>
        </div>
      </section>
    </div>
  );
}

export default PortfolioStartHere;
