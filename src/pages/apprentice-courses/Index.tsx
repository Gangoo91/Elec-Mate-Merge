import { useMemo } from 'react';

import useSEO from '@/hooks/useSEO';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { completedSectionsForCourse } from '@/lib/courseProgressMatch';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { studySpinesFor } from '@/lib/collegeStudyMap';

import { CatalogueShell } from '@/components/study-centre/course-catalogue';

type Level = 'Essential' | 'Foundation' | 'Intermediate' | 'Advanced';

interface Course {
  id: string;
  title: string;
  description: string;
  level: Level;
  duration: string;
  link: string;
  routeKey: string;
  /** Listed so Welsh learners can see it coming, but not openable yet. */
  inDevelopment?: boolean;
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
    id: 'welsh-level3',
    title: 'Welsh Level 3 Electrotechnical Installation',
    description:
      'The Level 3 taught in Wales — the electrical spine plus the planning, coordination and sector units, with every lesson named to its own unit and criterion.',
    level: 'Intermediate',
    duration: '2 years',
    link: 'welsh-level3',
    routeKey: 'welsh-level3',
    inDevelopment: true,
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
  // Only Elec-Mate admins can open a course still being written.

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

  // A college-linked learner sees the course(s) that cover their enrolled
  // qualification first, marked with the code. Only spines the map vouches
  // for — an unknown code marks nothing rather than guessing.
  const { learner } = useMyCollegeContext();
  const yourRouteKeys = useMemo(() => {
    if (!learner) return new Set<string>();
    return new Set(
      studySpinesFor(learner.qualification_code, learner.course_level).map((s) => s.routeKey)
    );
  }, [learner]);
  const orderedCourses = useMemo(() => {
    if (yourRouteKeys.size === 0) return COURSES;
    return [
      ...COURSES.filter((c) => yourRouteKeys.has(c.routeKey)),
      ...COURSES.filter((c) => !yourRouteKeys.has(c.routeKey)),
    ];
  }, [yourRouteKeys]);

  return (
    <CatalogueShell
      title="Apprentice training"
      description="Level 2 & 3 qualifications, AM2 prep, HNC, MOET and the fundamentals every electrician needs."
      courses={orderedCourses.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        level: c.level,
        duration: c.duration,
        to: c.link,
        done: completedById[c.id] ?? 0,
        tag:
          yourRouteKeys.has(c.routeKey) && learner?.qualification_code
            ? `Your qualification · ${learner.qualification_code}`
            : undefined,
        badge: c.inDevelopment ? 'In review' : undefined,
      }))}
    />
  );
}
