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

type Level = 'Essential' | 'Foundation' | 'Intermediate' | 'Advanced' | 'Specialist' | 'Expert';

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
 * `LEVEL_TONE` used to map the six levels to six hues — Foundation emerald,
 * Intermediate blue, Advanced purple, Expert red. Deleted 2026-08-28 for the
 * same reason `LEVEL_ACCENT` went from `CourseCard`: they were the only blues
 * and purples in the Study Centre and belonged to no palette. The level is
 * still on every card, in words, as the eyebrow. Nobody was decoding "this
 * card is purple, so it must be Advanced".
 */

const COURSES: Course[] = [
  {
    id: 'bs7671',
    title: '18th Edition Wiring Regulations',
    description: 'BS 7671:2018 wiring regulations and electrical safety requirements.',
    level: 'Essential',
    duration: '6 weeks',
    link: 'bs7671-course',
    routeKey: 'bs7671',
  },
  {
    id: 'inspection-testing',
    title: 'Inspection & testing',
    description: 'Electrical inspection, testing and certification procedures.',
    level: 'Advanced',
    duration: '8 weeks',
    link: 'inspection-testing',
    routeKey: 'inspection-testing',
  },
  {
    id: 'pat',
    title: 'PAT testing certification',
    description: 'Portable appliance testing procedures and certification requirements.',
    level: 'Foundation',
    duration: '4 weeks',
    link: 'pat-testing-course',
    routeKey: 'pat-testing',
  },
  {
    id: 'fire-alarm',
    title: 'Fire alarm systems',
    description: 'Fire detection and alarm system design, installation and commissioning.',
    level: 'Specialist',
    duration: '8 weeks',
    link: 'fire-alarm-course',
    routeKey: 'fire-alarm',
  },
  {
    id: 'emergency-lighting',
    title: 'Emergency lighting systems',
    description: 'Emergency lighting design, testing schedules and BS 5266 compliance.',
    level: 'Intermediate',
    duration: '6 weeks',
    link: 'emergency-lighting-course',
    routeKey: 'emergency-lighting',
  },
  {
    id: 'data-cabling',
    title: 'Data & communications cabling',
    description: 'Structured cabling systems, fiber optics and network infrastructure.',
    level: 'Intermediate',
    duration: '6 weeks',
    link: 'data-cabling-course',
    routeKey: 'data-cabling',
  },
  {
    id: 'renewable-energy',
    title: 'Renewable energy systems',
    description: 'Solar, wind and battery storage installation and maintenance procedures.',
    level: 'Intermediate',
    duration: '12 weeks',
    link: 'renewable-energy-course',
    routeKey: 'renewable-energy',
  },
  {
    id: 'ev-charging',
    title: 'Electric vehicle charging',
    description: 'EV charging infrastructure installation, maintenance and safety protocols.',
    level: 'Specialist',
    duration: '6 weeks',
    link: 'ev-charging-course',
    routeKey: 'ev-charging',
  },
  {
    id: 'smart-home',
    title: 'Smart home technology',
    description: 'Home automation, IoT integration and intelligent building systems.',
    level: 'Intermediate',
    duration: '8 weeks',
    link: 'smart-home-course',
    routeKey: 'smart-home',
  },
  {
    id: 'energy-efficiency',
    title: 'Energy efficiency & management',
    description: 'Power quality analysis, energy auditing and optimisation strategies.',
    level: 'Advanced',
    duration: '10 weeks',
    link: 'energy-efficiency-course',
    routeKey: 'energy-efficiency',
  },
  {
    id: 'bms',
    title: 'Building management systems',
    description: 'HVAC control, lighting management and integrated building automation.',
    level: 'Advanced',
    duration: '12 weeks',
    link: 'bms-course',
    routeKey: 'bms',
  },
  {
    id: 'industrial-electrical',
    title: 'Industrial electrical systems',
    description: 'High voltage systems, motor control and industrial automation.',
    level: 'Expert',
    duration: '14 weeks',
    link: 'industrial-electrical-course',
    routeKey: 'industrial-electrical',
  },
  {
    id: 'instrumentation',
    title: 'Instrumentation',
    description: 'Industrial instrumentation systems, control loops and measurement techniques.',
    level: 'Advanced',
    duration: '10 weeks',
    link: 'instrumentation-course',
    routeKey: 'instrumentation',
  },
  {
    id: 'fiber-optics',
    title: 'Fiber optics technology',
    description: 'Optical fiber installation, fusion splicing and OTDR testing procedures.',
    level: 'Advanced',
    duration: '8 weeks',
    link: 'fiber-optics-course',
    routeKey: 'fiber-optics',
  },
];

export default function UpskillingIndex() {
  const { allProgress } = useCourseProgress();

  useSEO({
    title: 'Professional Upskilling | Study Centre | Elec-Mate',
    description:
      'Specialist CPD courses for qualified electricians — BS 7671, EV charging, solar PV, smart home, fire alarms and more.',
  });

  const completedById = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of COURSES) {
      map[c.id] = completedSectionsForCourse(allProgress, c.routeKey);
    }
    return map;
  }, [allProgress]);

  const totalCompleted = Object.values(completedById).reduce((a, b) => a + b, 0);
  const expertCount = COURSES.filter((c) => c.level === 'Expert' || c.level === 'Advanced').length;

  return (
    <HubPage>
      <HubMasthead section="Study centre" title="Professional upskilling" backTo="/study-centre" />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          BS 7671, EV charging, solar PV, smart home and the specialist tracks that take you from
          qualified to in-demand.
        </p>

        <HubKpiRow>
          <HubKpi
            label="Courses"
            value={String(COURSES.length)}
            context="Specialist tracks"
            accent
          />
          <HubKpi label="Completed" value={String(totalCompleted)} context="Sections done" />
          <HubKpi label="Advanced" value={String(expertCount)} context="Advanced + Expert" />
          <HubKpi label="Tier" value="Pro" context="Subscription" />
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
