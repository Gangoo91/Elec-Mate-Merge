import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import useSEO from '@/hooks/useSEO';
import { useCourseProgress } from '@/hooks/useCourseProgress';

import {
  PageFrame,
  PageHero,
  StatStrip,
  HubGrid,
  HubCard,
  Eyebrow,
  type Tone,
} from '@/components/college/primitives';

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

const LEVEL_TONE: Record<Level, Tone> = {
  Essential: 'yellow',
  Foundation: 'emerald',
  Intermediate: 'blue',
  Advanced: 'purple',
};

const COURSES: Course[] = [
  {
    id: 'level2',
    title: 'Level 2 Electrical Installation',
    description: 'Foundation electrical installation skills, safety principles and core wiring techniques.',
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
    description: 'Higher National Certificate in Electrical and Electronic Engineering for Building Services.',
    level: 'Advanced',
    duration: '2 years',
    link: 'hnc',
    routeKey: 'hnc',
  },
  {
    id: 'moet',
    title: 'MOET',
    description: 'Maintenance Operations Engineering Technician — multi-skilled maintenance training.',
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
];

export default function ApprenticeCoursesIndex() {
  const navigate = useNavigate();
  const { allProgress } = useCourseProgress();

  useSEO({
    title: 'Apprentice Courses | Study Centre | Elec-Mate',
    description:
      'Comprehensive electrical apprenticeship courses covering Level 2, Level 3, AM2 preparation, HNC, MOET and Functional Skills.',
  });

  const completedById = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of COURSES) {
      map[c.id] = allProgress.filter(
        (p) => p.completed && (p.course_key === c.routeKey || p.course_key.startsWith(c.routeKey + '/'))
      ).length;
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
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Study centre
          </button>

          <PageHero
            eyebrow="Study centre"
            title="Apprentice training"
            description="Level 2 & 3 qualifications, AM2 prep, HNC, MOET and the fundamentals every electrician needs."
            tone="blue"
          />

          <StatStrip
            columns={4}
            stats={[
              { label: 'Courses', value: COURSES.length, sub: 'Available now' },
              { label: 'Completed', value: totalCompleted, sub: 'Sections done' },
              { label: 'Levels', value: Object.keys(levelCounts).length, sub: 'Foundation → Advanced' },
              { label: 'Pathway', value: dominantLevel, sub: 'Most courses at' },
            ]}
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3 px-0.5">
              <Eyebrow>All courses</Eyebrow>
              <span className="text-[11px] text-white">{COURSES.length} total</span>
            </div>
            <HubGrid columns={2} className="!bg-black gap-[1.5px]">
              {COURSES.map((c, i) => {
                const completed = completedById[c.id] ?? 0;
                return (
                  <HubCard
                    key={c.id}
                    number={String(i + 1).padStart(2, '0')}
                    eyebrow={c.level.toUpperCase()}
                    title={c.title}
                    description={c.description}
                    meta={`${c.duration}${completed > 0 ? ` · ${completed} done` : ''}`}
                    tone={LEVEL_TONE[c.level]}
                    cta={completed > 0 ? 'Continue' : 'Start learning'}
                    size="sm"
                    onClick={() => navigate(c.link)}
                  />
                );
              })}
            </HubGrid>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
