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

type Level =
  | 'Essential'
  | 'Foundation'
  | 'Intermediate'
  | 'Advanced'
  | 'Specialist'
  | 'Expert';

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
  Specialist: 'orange',
  Expert: 'red',
};

const COURSES: Course[] = [
  { id: 'bs7671', title: '18th Edition Wiring Regulations', description: 'BS 7671:2018 wiring regulations and electrical safety requirements.', level: 'Essential', duration: '6 weeks', link: 'bs7671-course', routeKey: 'bs7671' },
  { id: 'inspection-testing', title: 'Inspection & testing', description: 'Electrical inspection, testing and certification procedures.', level: 'Advanced', duration: '8 weeks', link: 'inspection-testing', routeKey: 'inspection-testing' },
  { id: 'pat', title: 'PAT testing certification', description: 'Portable appliance testing procedures and certification requirements.', level: 'Foundation', duration: '4 weeks', link: 'pat-testing-course', routeKey: 'pat-testing' },
  { id: 'fire-alarm', title: 'Fire alarm systems', description: 'Fire detection and alarm system design, installation and commissioning.', level: 'Specialist', duration: '8 weeks', link: 'fire-alarm-course', routeKey: 'fire-alarm' },
  { id: 'emergency-lighting', title: 'Emergency lighting systems', description: 'Emergency lighting design, testing schedules and BS 5266 compliance.', level: 'Intermediate', duration: '6 weeks', link: 'emergency-lighting-course', routeKey: 'emergency-lighting' },
  { id: 'data-cabling', title: 'Data & communications cabling', description: 'Structured cabling systems, fiber optics and network infrastructure.', level: 'Intermediate', duration: '6 weeks', link: 'data-cabling-course', routeKey: 'data-cabling' },
  { id: 'renewable-energy', title: 'Renewable energy systems', description: 'Solar, wind and battery storage installation and maintenance procedures.', level: 'Intermediate', duration: '12 weeks', link: 'renewable-energy-course', routeKey: 'renewable-energy' },
  { id: 'ev-charging', title: 'Electric vehicle charging', description: 'EV charging infrastructure installation, maintenance and safety protocols.', level: 'Specialist', duration: '6 weeks', link: 'ev-charging-course', routeKey: 'ev-charging' },
  { id: 'smart-home', title: 'Smart home technology', description: 'Home automation, IoT integration and intelligent building systems.', level: 'Intermediate', duration: '8 weeks', link: 'smart-home-course', routeKey: 'smart-home' },
  { id: 'energy-efficiency', title: 'Energy efficiency & management', description: 'Power quality analysis, energy auditing and optimisation strategies.', level: 'Advanced', duration: '10 weeks', link: 'energy-efficiency-course', routeKey: 'energy-efficiency' },
  { id: 'bms', title: 'Building management systems', description: 'HVAC control, lighting management and integrated building automation.', level: 'Advanced', duration: '12 weeks', link: 'bms-course', routeKey: 'bms' },
  { id: 'industrial-electrical', title: 'Industrial electrical systems', description: 'High voltage systems, motor control and industrial automation.', level: 'Expert', duration: '14 weeks', link: 'industrial-electrical-course', routeKey: 'industrial-electrical' },
  { id: 'instrumentation', title: 'Instrumentation', description: 'Industrial instrumentation systems, control loops and measurement techniques.', level: 'Advanced', duration: '10 weeks', link: 'instrumentation-course', routeKey: 'instrumentation' },
  { id: 'fiber-optics', title: 'Fiber optics technology', description: 'Optical fiber installation, fusion splicing and OTDR testing procedures.', level: 'Advanced', duration: '8 weeks', link: 'fiber-optics-course', routeKey: 'fiber-optics' },
];

export default function UpskillingIndex() {
  const navigate = useNavigate();
  const { allProgress } = useCourseProgress();

  useSEO({
    title: 'Professional Upskilling | Study Centre | Elec-Mate',
    description:
      'Specialist CPD courses for qualified electricians — BS 7671, EV charging, solar PV, smart home, fire alarms and more.',
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
  const expertCount = COURSES.filter((c) => c.level === 'Expert' || c.level === 'Advanced').length;

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
            eyebrow="Study centre · Pro"
            title="Professional upskilling"
            description="BS 7671, EV charging, solar PV, smart home and the specialist tracks that take you from qualified to in-demand."
            tone="yellow"
            actions={
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-[11px] font-bold uppercase tracking-wider">
                Pro
              </span>
            }
          />

          <StatStrip
            columns={4}
            stats={[
              { label: 'Courses', value: COURSES.length, sub: 'Specialist tracks' },
              { label: 'Completed', value: totalCompleted, sub: 'Sections done' },
              { label: 'Advanced', value: expertCount, sub: 'Advanced + Expert' },
              { label: 'Tier', value: 'Pro', sub: 'Subscription' },
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
