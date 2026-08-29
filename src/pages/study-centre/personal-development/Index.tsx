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
    id: 'leadership-on-site',
    title: 'Leadership on site',
    description:
      'Delegating, decision-making, earning respect and leading teams — based on ILM Level 2 frameworks.',
    level: 'Intermediate',
    duration: '6 hours',
    link: 'leadership-on-site',
    routeKey: 'leadership-on-site',
  },
  {
    id: 'mental-health-awareness',
    title: 'Mental health awareness',
    description:
      'Recognising signs, starting conversations, supporting others — based on MHFA England and Mates in Mind.',
    level: 'Foundation',
    duration: '4 hours',
    link: 'mental-health-awareness',
    routeKey: 'mental-health-awareness',
  },
  {
    id: 'emotional-intelligence',
    title: 'Emotional intelligence',
    description:
      "Self-awareness, managing reactions, reading people — based on Daniel Goleman's EI framework.",
    level: 'Foundation',
    duration: '5 hours',
    link: 'emotional-intelligence',
    routeKey: 'emotional-intelligence',
  },
  {
    id: 'communication-confidence',
    title: 'Communication & confidence',
    description:
      'Toolbox talks, client conversations, professional writing — based on Toastmasters Pathways.',
    level: 'Foundation',
    duration: '5 hours',
    link: 'communication-confidence',
    routeKey: 'communication-confidence',
  },
  {
    id: 'mentoring-developing-others',
    title: 'Mentoring & developing others',
    description:
      'How people learn, giving feedback, supporting apprentices — based on ILM coaching and JIB standards.',
    level: 'Intermediate',
    duration: '5 hours',
    link: 'mentoring-developing-others',
    routeKey: 'mentoring-developing-others',
  },
  {
    id: 'resilience-stress-management',
    title: 'Resilience & stress management',
    description: 'Managing pressure, bouncing back, switching off — based on MBSR principles.',
    level: 'Foundation',
    duration: '4 hours',
    link: 'resilience-stress-management',
    routeKey: 'resilience-stress-management',
  },
  {
    id: 'time-management-organisation',
    title: 'Time management & organisation',
    description:
      'Planning, managing multiple jobs, admin — based on GTD and Eisenhower frameworks.',
    level: 'Foundation',
    duration: '4 hours',
    link: 'time-management-organisation',
    routeKey: 'time-management-organisation',
  },
  {
    id: 'conflict-resolution',
    title: 'Conflict resolution',
    description:
      'Non-paying clients, site disputes, awkward conversations — based on ACAS conflict resolution.',
    level: 'Intermediate',
    duration: '4 hours',
    link: 'conflict-resolution',
    routeKey: 'conflict-resolution',
  },
  {
    id: 'personal-finance',
    title: 'Personal finance & wellbeing',
    description:
      'Budgeting, debt, pensions, planning ahead — based on Open University Managing My Money.',
    level: 'Foundation',
    duration: '5 hours',
    link: 'personal-finance',
    routeKey: 'personal-finance',
  },
  {
    id: 'goal-setting-growth',
    title: 'Goal setting & continuous growth',
    description:
      'Setting goals, building habits, tracking progress — based on FranklinCovey 7 Habits.',
    level: 'Foundation',
    duration: '4 hours',
    link: 'goal-setting-growth',
    routeKey: 'goal-setting-growth',
  },
];

export default function PersonalDevelopmentIndex() {
  const { allProgress } = useCourseProgress();

  useSEO({
    title: 'Personal Development | Study Centre | Elec-Mate',
    description: 'Communication, leadership and professional growth courses for tradespeople.',
  });

  const completedById = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of COURSES) {
      map[c.id] = completedSectionsForCourse(allProgress, c.routeKey);
    }
    return map;
  }, [allProgress]);

  const totalCompleted = Object.values(completedById).reduce((a, b) => a + b, 0);
  const totalHours = COURSES.reduce((acc, c) => {
    const m = c.duration.match(/(\d+)\s*hour/);
    return acc + (m ? parseInt(m[1], 10) : 0);
  }, 0);

  return (
    <HubPage>
      <HubMasthead section="Study centre" title="Personal development" backTo="/study-centre" />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Leadership, emotional intelligence, resilience and the soft skills that round out a
          career.
        </p>

        <HubKpiRow>
          <HubKpi label="Courses" value={String(COURSES.length)} context="Available now" accent />
          <HubKpi label="Completed" value={String(totalCompleted)} context="Sections done" />
          <HubKpi label="Total time" value={`${totalHours}h`} context="Across all courses" />
          <HubKpi label="Format" value="Soft" context="Skills & mindset" />
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
