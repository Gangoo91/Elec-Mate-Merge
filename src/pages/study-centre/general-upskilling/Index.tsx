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
  Foundation: 'emerald',
  Intermediate: 'blue',
};

const COURSES: Course[] = [
  { id: 'ipaf', title: 'IPAF mobile scaffold training', description: 'Safe assembly, use and inspection of mobile access towers on site.', level: 'Foundation', duration: 'Half day', link: 'ipaf-course', routeKey: 'ipaf' },
  { id: 'pasma', title: 'PASMA towers for users', description: 'PASMA-certified training for mobile access tower assembly, inspection and safe use.', level: 'Foundation', duration: 'Half day', link: 'pasma-course', routeKey: 'pasma' },
  { id: 'mewp', title: 'MEWP operator training', description: 'Mobile elevating work platform operation, safety checks and best practice.', level: 'Intermediate', duration: '3.5 hours', link: 'mewp-course', routeKey: 'mewp' },
  { id: 'first-aid', title: 'First aid at work', description: 'Workplace first aid procedures, CPR and emergency response training.', level: 'Intermediate', duration: '3 days', link: 'first-aid-course', routeKey: 'first-aid' },
  { id: 'mental-health', title: 'Mental health first aid', description: 'Recognising and supporting mental health issues in the workplace.', level: 'Intermediate', duration: '2 days', link: 'mental-health-course', routeKey: 'mental-health' },
  { id: 'asbestos', title: 'Asbestos awareness', description: 'Identifying asbestos-containing materials and safe working procedures.', level: 'Foundation', duration: 'Half day', link: 'asbestos-awareness-course', routeKey: 'asbestos' },
  { id: 'working-at-height', title: 'Working at height', description: 'Risk assessment, fall prevention and safe practices for working at height.', level: 'Foundation', duration: 'Half day', link: 'working-at-height-course', routeKey: 'working-at-height' },
  { id: 'manual-handling', title: 'Manual handling', description: 'Safe lifting techniques, risk assessment and injury prevention on site.', level: 'Foundation', duration: 'Half day', link: 'manual-handling-course', routeKey: 'manual-handling' },
  { id: 'coshh', title: 'COSHH awareness', description: 'Control of substances hazardous to health — identification and safe handling.', level: 'Foundation', duration: 'Half day', link: 'coshh-awareness-course', routeKey: 'coshh-awareness' },
  { id: 'confined-spaces', title: 'Confined spaces awareness', description: 'Hazard identification and safe entry procedures for confined spaces.', level: 'Intermediate', duration: '1 day', link: 'confined-spaces-course', routeKey: 'confined-spaces' },
  { id: 'fire-safety', title: 'Fire safety & fire marshal', description: 'Fire prevention, evacuation procedures and fire marshal responsibilities.', level: 'Foundation', duration: 'Half day', link: 'fire-safety-course', routeKey: 'fire-safety' },
  { id: 'cscs-card', title: 'CSCS card preparation', description: 'Health, safety and environment test preparation for CSCS card applications.', level: 'Foundation', duration: '1 day', link: 'cscs-card-course', routeKey: 'cscs-card' },
  { id: 'scaffolding', title: 'Scaffolding awareness', description: 'Scaffold safety, inspection requirements and hazard awareness on site.', level: 'Foundation', duration: 'Half day', link: 'scaffolding-awareness-course', routeKey: 'scaffolding-awareness' },
  { id: 'environmental', title: 'Environmental & sustainability', description: 'Waste management, energy efficiency and sustainable working practices.', level: 'Foundation', duration: '1 day', link: 'environmental-sustainability-course', routeKey: 'environmental-sustainability' },
  { id: 'cdm', title: 'CDM regulations awareness', description: 'Construction Design and Management regulations, roles and responsibilities.', level: 'Intermediate', duration: '1 day', link: 'cdm-regulations-course', routeKey: 'cdm-regulations' },
];

export default function GeneralUpskillingIndex() {
  const navigate = useNavigate();
  const { allProgress } = useCourseProgress();

  useSEO({
    title: 'General Upskilling | Study Centre | Elec-Mate',
    description: 'Cross-industry training for tradespeople — safety, health and professional development courses.',
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
  const halfDayCount = COURSES.filter((c) => c.duration.toLowerCase().includes('half')).length;

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
            title="General upskilling"
            description="Cross-industry safety and site essentials — IPAF, first aid, working at height, COSHH and the cards every site asks for."
            tone="emerald"
          />

          <StatStrip
            columns={4}
            stats={[
              { label: 'Courses', value: COURSES.length, sub: 'Available now' },
              { label: 'Completed', value: totalCompleted, sub: 'Sections done' },
              { label: 'Quick wins', value: halfDayCount, sub: 'Half-day courses' },
              { label: 'Coverage', value: 'Site', sub: 'Cross-industry' },
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
