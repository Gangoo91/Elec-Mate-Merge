import { useMemo } from 'react';

import useSEO from '@/hooks/useSEO';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { completedSectionsForCourse } from '@/lib/courseProgressMatch';

import {
  HubPage,
  HubBody,
  HubMasthead,
  HubKpi,
  HubKpiRow,
  HubToolGrid,
} from '@/components/hub/HubPrimitives';

type Level = 'Essential' | 'Foundation' | 'Intermediate' | 'Advanced';

interface Course {
  id: string;
  title: string;
  description: string;
  level: Level;
  duration: string;
  link: string;
  routeKey: string;
}

/**
 * `LEVEL_TONE` used to map each level to its own hue. Deleted 2026-08-28 for
 * the same reason `LEVEL_ACCENT` went from `CourseCard`: those blues, purples
 * and emeralds were the only ones in the Study Centre and belonged to no
 * palette. The level is still on every card, in words, as the eyebrow.
 */

const COURSES: Course[] = [
  {
    id: 'level2',
    title: 'Level 2 Electrical Installation',
    description:
      'Foundation electrical installation skills, safety principles and core wiring techniques.',
    level: 'Foundation',
    duration: '2 years',
    link: 'level2',
    routeKey: 'level2',
  },
  {
    id: 'level3',
    title: 'Level 3 Electrical Installation',
    description: 'Advanced installation techniques, design, inspection and testing principles.',
    level: 'Intermediate',
    duration: '2 years',
    link: 'level3',
    routeKey: 'level3',
  },
  {
    id: 'am2',
    title: 'AM2 preparation & guidance',
    description: 'Practical assessment preparation, mock scenarios and exam technique guidance.',
    level: 'Intermediate',
    duration: '1 day',
    link: 'am2',
    routeKey: 'am2',
  },
  {
    id: 'hnc',
    title: 'HNC Electrical Engineering',
    description:
      'Higher National Certificate in Electrical and Electronic Engineering for Building Services.',
    level: 'Advanced',
    duration: '2 years',
    link: 'hnc',
    routeKey: 'hnc',
  },
  {
    id: 'moet',
    title: 'MOET',
    description:
      'Maintenance Operations Engineering Technician — multi-skilled maintenance training.',
    level: 'Intermediate',
    duration: '18 months',
    link: 'moet',
    routeKey: 'moet',
  },
  {
    id: 'functional-skills',
    title: 'Functional skills',
    description: 'Essential maths, English and IT skills required for electrical apprenticeships.',
    level: 'Essential',
    duration: 'Ongoing',
    link: 'functional-skills',
    routeKey: 'functional-skills',
  },
  // Cross-listed from the upskilling track — Level 3 learners typically sit
  // 2382 alongside the diploma and 2391 straight after the AM2, so both
  // belong on the apprentice spine too. Same course content, same progress
  // keys; only the entry point differs.
  {
    id: 'bs7671',
    title: '18th Edition Wiring Regulations',
    description:
      'BS 7671:2018+A4:2026 wiring regulations — the C&G 2382 exam most Level 3 learners sit alongside the diploma.',
    level: 'Essential',
    duration: '6 weeks',
    link: '/study-centre/upskilling/bs7671-course',
    routeKey: 'bs7671',
  },
  {
    id: 'inspection-testing',
    title: 'Inspection & testing (2391)',
    description:
      'Inspection, testing and certification — the natural next step straight after your AM2.',
    level: 'Advanced',
    duration: '8 weeks',
    link: '/study-centre/upskilling/inspection-testing',
    routeKey: 'inspection-testing',
  },
];

export default function ApprenticeCoursesIndex() {
  const { allProgress } = useCourseProgress();

  useSEO({
    title: 'Apprentice Courses | Study Centre | Elec-Mate',
    description:
      'Comprehensive electrical apprenticeship courses covering Level 2, Level 3, AM2 preparation, HNC, MOET and Functional Skills.',
  });

  const completedById = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of COURSES) {
      map[c.id] = completedSectionsForCourse(allProgress, c.routeKey);
    }
    return map;
  }, [allProgress]);

  const totalCompleted = Object.values(completedById).reduce((a, b) => a + b, 0);
  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of COURSES) counts[c.level] = (counts[c.level] || 0) + 1;
    return counts;
  }, []);
  const dominantLevel = Object.entries(levelCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

  return (
    <HubPage>
      <HubMasthead section="Study centre" title="Apprentice training" backTo="/study-centre" />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Level 2 & 3 qualifications, AM2 prep, HNC, MOET and the fundamentals every electrician
          needs.
        </p>

        <HubKpiRow>
          <HubKpi label="Courses" value={String(COURSES.length)} context="Available now" accent />
          <HubKpi label="Completed" value={String(totalCompleted)} context="Sections done" />
          <HubKpi
            label="Levels"
            value={String(Object.keys(levelCounts).length)}
            context="Foundation → Advanced"
          />
          <HubKpi label="Pathway" value={String(dominantLevel)} context="Most courses at" />
        </HubKpiRow>

        <HubToolGrid
          label="All courses"
          columns="three"
          cards={COURSES.map((c) => {
            const completed = completedById[c.id] ?? 0;
            return {
              id: c.id,
              eyebrow: c.level,
              title: c.title,
              description: c.description,
              meta: `${c.duration}${completed > 0 ? ` · ${completed} done` : ''}`,
              to: c.link,
            };
          })}
        />
      </HubBody>
    </HubPage>
  );
}
