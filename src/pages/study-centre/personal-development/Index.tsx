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

const LEVEL_TONE: Record<Level, Tone> = {
  Foundation: 'purple',
  Intermediate: 'indigo',
};

const COURSES: Course[] = [
  { id: 'leadership-on-site', title: 'Leadership on site', description: 'Delegating, decision-making, earning respect and leading teams — based on ILM Level 2 frameworks.', level: 'Intermediate', duration: '6 hours', link: 'leadership-on-site', routeKey: 'leadership-on-site' },
  { id: 'mental-health-awareness', title: 'Mental health awareness', description: 'Recognising signs, starting conversations, supporting others — based on MHFA England and Mates in Mind.', level: 'Foundation', duration: '4 hours', link: 'mental-health-awareness', routeKey: 'mental-health-awareness' },
  { id: 'emotional-intelligence', title: 'Emotional intelligence', description: "Self-awareness, managing reactions, reading people — based on Daniel Goleman's EI framework.", level: 'Foundation', duration: '5 hours', link: 'emotional-intelligence', routeKey: 'emotional-intelligence' },
  { id: 'communication-confidence', title: 'Communication & confidence', description: 'Toolbox talks, client conversations, professional writing — based on Toastmasters Pathways.', level: 'Foundation', duration: '5 hours', link: 'communication-confidence', routeKey: 'communication-confidence' },
  { id: 'mentoring-developing-others', title: 'Mentoring & developing others', description: 'How people learn, giving feedback, supporting apprentices — based on ILM coaching and JIB standards.', level: 'Intermediate', duration: '5 hours', link: 'mentoring-developing-others', routeKey: 'mentoring-developing-others' },
  { id: 'resilience-stress-management', title: 'Resilience & stress management', description: 'Managing pressure, bouncing back, switching off — based on MBSR principles.', level: 'Foundation', duration: '4 hours', link: 'resilience-stress-management', routeKey: 'resilience-stress-management' },
  { id: 'time-management-organisation', title: 'Time management & organisation', description: 'Planning, managing multiple jobs, admin — based on GTD and Eisenhower frameworks.', level: 'Foundation', duration: '4 hours', link: 'time-management-organisation', routeKey: 'time-management-organisation' },
  { id: 'conflict-resolution', title: 'Conflict resolution', description: 'Non-paying clients, site disputes, awkward conversations — based on ACAS conflict resolution.', level: 'Intermediate', duration: '4 hours', link: 'conflict-resolution', routeKey: 'conflict-resolution' },
  { id: 'personal-finance', title: 'Personal finance & wellbeing', description: 'Budgeting, debt, pensions, planning ahead — based on Open University Managing My Money.', level: 'Foundation', duration: '5 hours', link: 'personal-finance', routeKey: 'personal-finance' },
  { id: 'goal-setting-growth', title: 'Goal setting & continuous growth', description: 'Setting goals, building habits, tracking progress — based on FranklinCovey 7 Habits.', level: 'Foundation', duration: '4 hours', link: 'goal-setting-growth', routeKey: 'goal-setting-growth' },
];

export default function PersonalDevelopmentIndex() {
  const navigate = useNavigate();
  const { allProgress } = useCourseProgress();

  useSEO({
    title: 'Personal Development | Study Centre | Elec-Mate',
    description: 'Communication, leadership and professional growth courses for tradespeople.',
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
  const totalHours = COURSES.reduce((acc, c) => {
    const m = c.duration.match(/(\d+)\s*hour/);
    return acc + (m ? parseInt(m[1], 10) : 0);
  }, 0);

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
            title="Personal development"
            description="Leadership, emotional intelligence, resilience and the soft skills that round out a career."
            tone="purple"
          />

          <StatStrip
            columns={4}
            stats={[
              { label: 'Courses', value: COURSES.length, sub: 'Available now' },
              { label: 'Completed', value: totalCompleted, sub: 'Sections done' },
              { label: 'Total time', value: `${totalHours}h`, sub: 'Across all courses' },
              { label: 'Format', value: 'Soft', sub: 'Skills & mindset' },
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
