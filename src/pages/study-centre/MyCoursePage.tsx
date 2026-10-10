/**
 * Your course — the Study Centre's own modules, how far through each you are,
 * and how your mock questions on its topics have gone (10 Oct 2026).
 *
 * Study Centre only (Andrew: "not encroach on the colleges work"): organised
 * by Study Centre modules, never a qualification's units or criteria.
 *
 *   hero          the course, modules started, mock accuracy, the one next step
 *   modules       each module: sections studied, mock accuracy, its topics
 *                 weakest first, Continue and Practise
 *   other papers  topics from papers outside the course (Inspection & Testing…)
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, ChevronDown, MessageCircle, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, CollegeSectionTitle, chipCn } from '@/components/college/ui/CollegeUi';
import { Hairline, ProgressRing, SC_LIST } from '@/components/study-centre/ui/StudyKit';
import { topicBar } from '@/lib/study-centre/mockInsights';
import { COURSES, useCourseMap, type CourseId, type CourseModule } from '@/hooks/study-centre/useCourseMap';

const HELP: PageHelpContent = {
  id: 'study-my-course',
  title: 'Your course',
  what: 'Every module of your Study Centre course: how much you’ve studied and how your mock questions on its topics have gone.',
  steps: [
    { title: 'See the whole course', body: 'Each module shows the sections you’ve finished and your mock accuracy on its topics.' },
    { title: 'Find the weak modules', body: 'Orange means under 60% right. Open a module to see which topics are dragging it down.' },
    { title: 'Close the gaps', body: 'Continue the module, practise its weakest topic, or ask Dave to explain it.' },
  ],
  legend: [
    { swatch: 'bg-emerald-400', label: '75% or more right' },
    { swatch: 'bg-sky-400', label: '60–74% right' },
    { swatch: 'bg-orange-400', label: 'Under 60% right' },
  ],
};

function tone(pct: number | null) {
  if (pct === null) return 'text-white';
  return pct >= 75 ? 'text-emerald-400' : pct >= 60 ? 'text-sky-300' : 'text-orange-400';
}

export default function MyCoursePage() {
  useSEO('Your course | Study Centre', 'Every module of your course, what you’ve studied and how your mocks have gone.');
  const navigate = useNavigate();
  const map = useCourseMap();
  const [course, setCourse] = useState<CourseId | null>(null);
  const active: CourseId = course ?? map.primary;
  const modules = map.courses[active];
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const started = modules.filter((m) => m.sectionsDone > 0 || m.answered > 0).length;
  const answered = modules.reduce((s, m) => s + m.answered, 0);
  const right = modules.reduce((s, m) => s + m.right, 0);
  const accuracy = answered ? Math.round((right / answered) * 100) : null;

  // The module to work on: weakest mock accuracy, else the first not started.
  const focus = useMemo<CourseModule | null>(() => {
    const scored = modules.filter((m) => m.pct !== null).sort((a, b) => (a.pct ?? 0) - (b.pct ?? 0));
    if (scored[0] && (scored[0].pct ?? 100) < 75) return scored[0];
    return modules.find((m) => m.sectionsDone === 0) ?? null;
  }, [modules]);

  const verdict =
    started === 0
      ? `Start with Module 1. Every section you study and every mock you sit fills this in.`
      : `${started} of ${modules.length} modules started${accuracy !== null ? `, ${accuracy}% right on their mock questions` : ''}.${
          focus ? ` Module ${focus.n}, ${focus.title.toLowerCase()}, is where to put the work next.` : ' Strong across the board.'
        }`;

  return (
    <HubPage ground="landing">
      <HubMasthead section="Study Centre" title="Your course" backTo="/study-centre" />
      <HubBody>
        {/* Hero */}
        <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
          <Hairline />
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-10">
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">Your course</p>
                <PageHelpButton help={HELP} className="-mt-2 lg:hidden" />
              </div>
              <h1 className="mt-1.5 text-[30px] font-bold leading-[1.05] tracking-tight text-white sm:text-[40px]">
                {COURSES[active].label} electrical
              </h1>
              <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white">{map.loading ? 'Working out where you are…' : verdict}</p>
              <div className="mt-4 flex gap-2" role="tablist" aria-label="Course">
                {(['level3', 'level2'] as const).map((c) => (
                  <button key={c} type="button" role="tab" aria-selected={active === c} onClick={() => setCourse(c)} className={chipCn(active === c)}>
                    {COURSES[c].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <ProgressRing pct={(started / modules.length) * 100} label={`${started} of ${modules.length} modules started`}>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Modules</span>
                <span className="text-[24px] font-black leading-none tabular-nums text-white">
                  {started}/{modules.length}
                </span>
                <span className="text-[10.5px] font-semibold text-white">started</span>
              </ProgressRing>
              <PageHelpButton help={HELP} className="hidden lg:inline-flex" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row lg:col-start-1 lg:row-start-2">
              <button
                type="button"
                onClick={() => navigate(focus ? focus.to : COURSES[active].to)}
                className={cn(COLLEGE_BTN_PRIMARY, 'h-12 px-5 text-[14.5px]')}
              >
                {focus ? `Go to Module ${focus.n}` : 'Open the course'}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button type="button" onClick={() => navigate('/study-centre/mock-exams/targeted')} className={cn(COLLEGE_BTN, 'h-12 px-5')}>
                <Target className="h-4 w-4" aria-hidden />
                Weak spots mock
              </button>
            </div>
          </div>
        </section>

        {/* Modules */}
        <section className="space-y-3" aria-labelledby="modules">
          <CollegeSectionTitle id="modules" title="Module by module" sub="Tap a module to see its topics, weakest first." />
          <div className="grid gap-3 lg:grid-cols-2">
            {modules.map((m) => {
              const key = `${active}-${m.n}`;
              const isOpen = open[key] ?? false;
              const weakest = m.topics[0];
              return (
                <div key={key} className={SC_LIST}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen((o) => ({ ...o, [key]: !isOpen }))}
                    className="flex w-full items-start gap-4 px-5 py-4 text-left touch-manipulation hover:bg-white/[0.04] sm:px-6"
                  >
                    <span
                      className={cn(
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[17px] font-black',
                        m.sectionsDone > 0 || m.answered > 0 ? 'bg-elec-yellow text-black' : 'bg-white/[0.08] text-white'
                      )}
                    >
                      {m.n}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold leading-snug text-white">{m.title}</span>
                      <span className="mt-1 flex flex-wrap gap-x-3 text-[12.5px] text-white">
                        <span>
                          {m.sectionsDone} {m.sectionsDone === 1 ? 'section' : 'sections'} studied
                        </span>
                        <span className={cn('font-semibold', tone(m.pct))}>
                          {m.pct === null ? 'No mock questions yet' : `${m.pct}% right on mocks`}
                        </span>
                      </span>
                      {m.pct !== null && (
                        <span className="mt-2 block h-2 overflow-hidden rounded-full bg-white/[0.1]" aria-hidden>
                          <span className={cn('block h-full rounded-full', topicBar(m.pct))} style={{ width: `${Math.max(m.pct, 3)}%` }} />
                        </span>
                      )}
                    </span>
                    <ChevronDown className={cn('mt-1 h-5 w-5 shrink-0 text-white transition-transform', isOpen && 'rotate-180')} aria-hidden />
                  </button>
                  {isOpen && (
                    <div className="space-y-3 px-5 pb-5 pt-1 sm:px-6">
                      {m.topics.length > 0 ? (
                        <ul className="space-y-3">
                          {m.topics.map((t) => (
                            <li key={t.topic}>
                              <div className="flex items-baseline justify-between gap-3">
                                <span className="min-w-0 truncate text-[14px] font-semibold text-white">{t.topic}</span>
                                <span className="shrink-0 text-[13px] font-bold tabular-nums text-white">
                                  {t.right}/{t.answered}
                                </span>
                              </div>
                              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.1]">
                                <div className={cn('h-full rounded-full', topicBar(t.pct))} style={{ width: `${Math.max(t.pct, 3)}%` }} />
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[13px] text-white">No mock questions on this module yet. Sit a Level {active === 'level3' ? '3' : '2'} mock to see how you do.</p>
                      )}
                      <div className="grid gap-2 sm:grid-cols-2">
                        <button type="button" onClick={() => navigate(m.to)} className={cn(COLLEGE_BTN_PRIMARY, 'h-11')}>
                          <BookOpen className="h-4 w-4" aria-hidden />
                          {m.sectionsDone > 0 ? 'Continue the module' : 'Start the module'}
                        </button>
                        {weakest && weakest.pct < 75 ? (
                          <button
                            type="button"
                            onClick={() => navigate(`/study-centre/mock-exams/revise?topic=${encodeURIComponent(weakest.topic)}`)}
                            className={cn(COLLEGE_BTN, 'h-11')}
                          >
                            <Target className="h-4 w-4" aria-hidden />
                            Practise {weakest.topic}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/apprentice/advanced-help?prompt=${encodeURIComponent(
                                  `Give me a quick overview of ${COURSES[active].label} Module ${m.n}, ${m.title}: the key things to know, the common mistakes, and five questions to test myself.`
                                )}`
                              )
                            }
                            className={cn(COLLEGE_BTN, 'h-11')}
                          >
                            <MessageCircle className="h-4 w-4 text-elec-yellow" aria-hidden />
                            Ask Dave about it
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Other papers */}
        {map.otherPapers.length > 0 && (
          <section className="space-y-3" aria-labelledby="other">
            <CollegeSectionTitle id="other" title="Other papers" sub="Mocks and topic tests outside the course, weakest topics first." />
            <div className="grid gap-3 lg:grid-cols-2">
              {map.otherPapers.slice(0, 6).map((p) => (
                <div key={p.paper} className={cn(SC_LIST, 'px-5 py-4 sm:px-6')}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0 truncate text-[15px] font-semibold text-white">{p.paper}</span>
                    <span className={cn('shrink-0 text-[13px] font-bold', tone(p.pct))}>{p.pct === null ? '' : `${p.pct}%`}</span>
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {p.topics.slice(0, 4).map((t) => (
                      <li key={t.topic}>
                        <div className="flex items-baseline justify-between gap-3 text-[13px]">
                          <span className="min-w-0 truncate text-white">{t.topic}</span>
                          <span className="shrink-0 font-bold tabular-nums text-white">{t.pct}%</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.1]">
                          <div className={cn('h-full rounded-full', topicBar(t.pct))} style={{ width: `${Math.max(t.pct, 3)}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </HubBody>
    </HubPage>
  );
}
