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

type Level = 'Foundation' | 'Intermediate';

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
    id: 'ipaf',
    title: 'IPAF mobile scaffold training',
    description: 'Safe assembly, use and inspection of mobile access towers on site.',
    level: 'Foundation',
    duration: 'Half day',
    link: 'ipaf-course',
    routeKey: 'ipaf',
  },
  {
    id: 'pasma',
    title: 'PASMA towers for users',
    description:
      'PASMA-certified training for mobile access tower assembly, inspection and safe use.',
    level: 'Foundation',
    duration: 'Half day',
    link: 'pasma-course',
    routeKey: 'pasma',
  },
  {
    id: 'mewp',
    title: 'MEWP operator training',
    description: 'Mobile elevating work platform operation, safety checks and best practice.',
    level: 'Intermediate',
    duration: '3.5 hours',
    link: 'mewp-course',
    routeKey: 'mewp',
  },
  {
    id: 'first-aid',
    title: 'First aid at work',
    description: 'Workplace first aid procedures, CPR and emergency response training.',
    level: 'Intermediate',
    duration: '3 days',
    link: 'first-aid-course',
    routeKey: 'first-aid',
  },
  {
    id: 'mental-health',
    title: 'Mental health first aid',
    description: 'Recognising and supporting mental health issues in the workplace.',
    level: 'Intermediate',
    duration: '2 days',
    link: 'mental-health-course',
    routeKey: 'mental-health',
  },
  {
    id: 'asbestos',
    title: 'Asbestos awareness',
    description: 'Identifying asbestos-containing materials and safe working procedures.',
    level: 'Foundation',
    duration: 'Half day',
    link: 'asbestos-awareness-course',
    routeKey: 'asbestos',
  },
  {
    id: 'working-at-height',
    title: 'Working at height',
    description: 'Risk assessment, fall prevention and safe practices for working at height.',
    level: 'Foundation',
    duration: 'Half day',
    link: 'working-at-height-course',
    routeKey: 'working-at-height',
  },
  {
    id: 'manual-handling',
    title: 'Manual handling',
    description: 'Safe lifting techniques, risk assessment and injury prevention on site.',
    level: 'Foundation',
    duration: 'Half day',
    link: 'manual-handling-course',
    routeKey: 'manual-handling',
  },
  {
    id: 'coshh',
    title: 'COSHH awareness',
    description: 'Control of substances hazardous to health — identification and safe handling.',
    level: 'Foundation',
    duration: 'Half day',
    link: 'coshh-awareness-course',
    routeKey: 'coshh-awareness',
  },
  {
    id: 'confined-spaces',
    title: 'Confined spaces awareness',
    description: 'Hazard identification and safe entry procedures for confined spaces.',
    level: 'Intermediate',
    duration: '1 day',
    link: 'confined-spaces-course',
    routeKey: 'confined-spaces',
  },
  {
    id: 'fire-safety',
    title: 'Fire safety & fire marshal',
    description: 'Fire prevention, evacuation procedures and fire marshal responsibilities.',
    level: 'Foundation',
    duration: 'Half day',
    link: 'fire-safety-course',
    routeKey: 'fire-safety',
  },
  {
    id: 'cscs-card',
    title: 'CSCS card preparation',
    description: 'Health, safety and environment test preparation for CSCS card applications.',
    level: 'Foundation',
    duration: '1 day',
    link: 'cscs-card-course',
    routeKey: 'cscs-card',
  },
  {
    id: 'scaffolding',
    title: 'Scaffolding awareness',
    description: 'Scaffold safety, inspection requirements and hazard awareness on site.',
    level: 'Foundation',
    duration: 'Half day',
    link: 'scaffolding-awareness-course',
    routeKey: 'scaffolding-awareness',
  },
  {
    id: 'environmental',
    title: 'Environmental & sustainability',
    description: 'Waste management, energy efficiency and sustainable working practices.',
    level: 'Foundation',
    duration: '1 day',
    link: 'environmental-sustainability-course',
    routeKey: 'environmental-sustainability',
  },
  {
    id: 'cdm',
    title: 'CDM regulations awareness',
    description: 'Construction Design and Management regulations, roles and responsibilities.',
    level: 'Intermediate',
    duration: '1 day',
    link: 'cdm-regulations-course',
    routeKey: 'cdm-regulations',
  },
];

export default function GeneralUpskillingIndex() {
  const { allProgress } = useCourseProgress();

  useSEO({
    title: 'General Upskilling | Study Centre | Elec-Mate',
    description:
      'Cross-industry training for tradespeople — safety, health and professional development courses.',
  });

  const completedById = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of COURSES) {
      map[c.id] = completedSectionsForCourse(allProgress, c.routeKey);
    }
    return map;
  }, [allProgress]);

  const totalCompleted = Object.values(completedById).reduce((a, b) => a + b, 0);
  const halfDayCount = COURSES.filter((c) => c.duration.toLowerCase().includes('half')).length;

  return (
    <HubPage>
      <HubMasthead section="Study centre" title="General upskilling" backTo="/study-centre" />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Cross-industry safety and site essentials — IPAF, first aid, working at height, COSHH and
          the cards every site asks for.
        </p>

        <HubKpiRow>
          <HubKpi label="Courses" value={String(COURSES.length)} context="Available now" accent />
          <HubKpi label="Completed" value={String(totalCompleted)} context="Sections done" />
          <HubKpi label="Quick wins" value={String(halfDayCount)} context="Half-day courses" />
          <HubKpi label="Coverage" value="Site" context="Cross-industry" />
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
