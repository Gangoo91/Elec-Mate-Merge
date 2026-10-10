import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigationType } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/* ==========================================================================
   CollegeAreaNav — the College Hub's areas, one tap from every college page
   (Andrew, 10 Oct 2026: "design it nicer and make it easier to get around").

   Before this the hub had no navigation: every area sat in an "Everything
   else" directory at the bottom of the home page, 4,000px down on a phone.

   A row of plain text tabs under the masthead, the current area underlined.
   On a phone the same row scrolls sideways and keeps the current area in
   view. Real links, so Back, new tabs and deep links all work.
   ========================================================================== */

interface Area {
  label: string;
  to: string;
  paths?: RegExp;
  sections?: string[];
}

const AREAS: Area[] = [
  { label: 'Home', to: '/college', sections: ['overview'] },
  {
    label: 'Inbox',
    to: '/college/inbox',
    paths: /^\/college\/(inbox|today)/,
    sections: ['workqueue'],
  },
  {
    label: 'Learners',
    to: '/college?section=peoplehub',
    paths: /^\/college\/(students|onboarding)/,
    sections: [
      'peoplehub',
      'students',
      'cohorts',
      'tutors',
      'supportstaff',
      'student360',
      'ilpmanagement',
      'progresstracking',
      'epatracking',
      'safeguardingqueue',
      'employerportal',
    ],
  },
  {
    label: 'Marking',
    to: '/college/marking',
    paths: /^\/(college\/(marking|iqa|epa)|assessor)/,
    sections: ['assessmenthub', 'grading', 'portfolio', 'iqaworkflow', 'assessmentcalendar'],
  },
  { label: 'Hours', to: '/college/otj', paths: /^\/college\/otj/, sections: ['otjtraining'] },
  { label: 'Reviews', to: '/college/reviews', paths: /^\/college\/reviews/ },
  {
    label: 'Teaching',
    to: '/college?section=curriculumhub',
    paths: /^\/college\/(quizzes|lessons|ai-notebook)/,
    sections: [
      'curriculumhub',
      'lessonplans',
      'teachingresources',
      'coursesetup',
      'courses',
      'schemesofwork',
      'tutornotebook',
      'timetable',
      'attendance',
      'resourceshub',
      'documentlibrary',
      'aiilpgenerator',
    ],
  },
  {
    label: 'Quality',
    to: '/college/compliance',
    paths: /^\/college\/(compliance|evidence-pack)/,
    sections: [
      'qualityhub',
      'compliancedocs',
      'auditlog',
      'iqaotjaudit',
      'tutorobs',
      'qualitydashboard',
    ],
  },
  {
    label: 'Reports',
    to: '/college/reports',
    paths: /^\/college\/(reports|value|compare)/,
    sections: ['resourceanalytics', 'tutorworkload'],
  },
  {
    label: 'Settings',
    to: '/college?section=collegesettings',
    paths: /^\/college\/(settings|trust|help)/,
    sections: ['collegesettings', 'ltisettings', 'batchoperations'],
  },
];

function activeArea(pathname: string, search: string): string | null {
  const section =
    new URLSearchParams(search).get('section') ?? (pathname === '/college' ? 'overview' : null);
  for (const a of AREAS) {
    if (a.paths?.test(pathname)) return a.label;
    if (pathname === '/college' && section && a.sections?.includes(section)) return a.label;
  }
  return null;
}

/** The page shown before this one (module-wide, so a remount keeps it). */
let lastKey: string | null = null;

export function CollegeAreaNav() {
  const { pathname, search, key: locationKey } = useLocation();
  const current = activeArea(pathname, search);
  const railRef = useRef<HTMLDivElement>(null);

  // Keep the current area in view on a phone, where the row scrolls.
  useEffect(() => {
    const rail = railRef.current;
    const el = rail?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!rail || !el) return;
    const left = el.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2;
    rail.scrollTo({ left: Math.max(0, left), behavior: 'auto' });
  }, [current]);

  // Phones: the row slides away while scrolling down the page and comes back
  // on any scroll up or near the top (Andrew, 10 Oct), giving the screen back
  // its 44px. Desktop keeps it fixed. Small jitters (under 8px) are ignored.
  const isPhone = useMediaQuery('(max-width: 639px)');
  /**
   * Arrived by Back/Forward: ScrollToTop is restoring the old position. The
   * router also calls the very first page of a visit 'POP', which is not a
   * restore: it only counts when we came here from a different page.
   */
  const restoring = useNavigationType() === 'POP' && lastKey !== null && lastKey !== locationKey;
  const [tucked, setTucked] = useState(false);
  useEffect(() => {
    // A new page (or a desktop width) starts with the row showing.
    setTucked(false);
    if (!isPhone) return;
    let last = window.scrollY;
    let raf = 0;
    let state = false;
    // Folding the row shortens the page by its height and the browser moves
    // the scroll to match. Ignore that self-made movement for a moment, or the
    // row would flick open and shut.
    // Arriving by Back, also hold still while ScrollToTop restores the old
    // position: folding the row mid-restore moved the page hundreds of
    // pixels from where it was left.
    let quietUntil = restoring ? performance.now() + 2000 : 0;
    const set = (v: boolean) => {
      if (v === state) return;
      state = v;
      quietUntil = performance.now() + 350;
      setTucked(v);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (performance.now() < quietUntil) {
          last = y;
          return;
        }
        const dy = y - last;
        if (y < 80) set(false);
        else if (dy > 8) set(true);
        else if (dy < -8) set(false);
        if (Math.abs(dy) > 8 || y < 80) last = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isPhone, pathname, search, restoring]);
  useEffect(() => {
    lastKey = locationKey;
  }, [locationKey]);

  return (
    <nav
      aria-label="College Hub"
      className={cn(
        '-mx-4 overflow-hidden transition-[max-height,opacity] duration-200 ease-out motion-reduce:transition-none lg:-mx-2',
        tucked ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
      )}
      // Hidden rows are out of the tab order and the accessibility tree.
      // (React 18 has no `inert` prop type; the DOM attribute works.)
      {...((tucked ? { inert: '' } : {}) as Record<string, string>)}
    >
      <div
        ref={railRef}
        className="flex overflow-x-auto overscroll-x-contain px-2 [scrollbar-width:none] lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {AREAS.map((a) => {
          const on = a.label === current;
          return (
            <Link
              key={a.label}
              to={a.to}
              aria-current={on ? 'page' : undefined}
              className={cn(
                'relative flex h-11 shrink-0 items-center whitespace-nowrap px-3 text-[13.5px] transition-colors touch-manipulation',
                on ? 'font-semibold text-white' : 'font-medium text-white hover:text-elec-yellow'
              )}
            >
              {a.label}
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-3 bottom-0 h-[2px] rounded-full',
                  on ? 'bg-elec-yellow' : 'bg-transparent'
                )}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
