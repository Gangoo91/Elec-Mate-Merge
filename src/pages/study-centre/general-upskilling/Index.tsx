import React from 'react';
import {
  ArrowLeft,
  TowerControl,
  CableCar,
  Heart,
  Brain,
  AlertTriangle,
  ArrowUpFromLine,
  PackageOpen,
  FlaskConical,
  DoorOpen,
  Flame,
  BadgeCheck,
  Construction,
  Leaf,
  ClipboardCheck,
  HardHat,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CourseCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

type CourseLevel = 'Foundation' | 'Intermediate';

interface Course {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  level: CourseLevel;
  duration: string;
  link: string;
  comingSoon?: boolean;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'IPAF Mobile Scaffold Training',
    description: 'Safe assembly, use, and inspection of mobile access towers on site',
    icon: TowerControl,
    level: 'Foundation',
    duration: 'Half day',
    link: 'ipaf-course',
  },
  {
    id: 2,
    title: 'PASMA Towers for Users',
    description:
      'PASMA-certified training for mobile access tower assembly, inspection, and safe use',
    icon: HardHat,
    level: 'Foundation',
    duration: 'Half day',
    link: 'pasma-course',
  },
  {
    id: 3,
    title: 'MEWP Operator Training',
    description: 'Mobile elevating work platform operation, safety checks, and best practice',
    icon: CableCar,
    level: 'Intermediate',
    duration: '3.5 hours',
    link: 'mewp-course',
  },
  {
    id: 4,
    title: 'First Aid at Work',
    description: 'Workplace first aid procedures, CPR, and emergency response training',
    icon: Heart,
    level: 'Intermediate',
    duration: '3 days',
    link: 'first-aid-course',
  },
  {
    id: 5,
    title: 'Mental Health First Aid',
    description: 'Recognising and supporting mental health issues in the workplace',
    icon: Brain,
    level: 'Intermediate',
    duration: '2 days',
    link: 'mental-health-course',
  },
  {
    id: 6,
    title: 'Asbestos Awareness',
    description: 'Identifying asbestos-containing materials and safe working procedures',
    icon: AlertTriangle,
    level: 'Foundation',
    duration: 'Half day',
    link: 'asbestos-awareness-course',
  },
  {
    id: 7,
    title: 'Working at Height',
    description: 'Risk assessment, fall prevention, and safe practices for working at height',
    icon: ArrowUpFromLine,
    level: 'Foundation',
    duration: 'Half day',
    link: 'working-at-height-course',
  },
  {
    id: 8,
    title: 'Manual Handling',
    description: 'Safe lifting techniques, risk assessment, and injury prevention on site',
    icon: PackageOpen,
    level: 'Foundation',
    duration: 'Half day',
    link: 'manual-handling-course',
  },
  {
    id: 9,
    title: 'COSHH Awareness',
    description: 'Control of substances hazardous to health — identification and safe handling',
    icon: FlaskConical,
    level: 'Foundation',
    duration: 'Half day',
    link: 'coshh-awareness-course',
  },
  {
    id: 10,
    title: 'Confined Spaces Awareness',
    description: 'Hazard identification and safe entry procedures for confined spaces',
    icon: DoorOpen,
    level: 'Intermediate',
    duration: '1 day',
    link: 'confined-spaces-course',
  },
  {
    id: 11,
    title: 'Fire Safety & Fire Marshal',
    description: 'Fire prevention, evacuation procedures, and fire marshal responsibilities',
    icon: Flame,
    level: 'Foundation',
    duration: 'Half day',
    link: 'fire-safety-course',
  },
  {
    id: 12,
    title: 'CSCS Card Preparation',
    description: 'Health, safety, and environment test preparation for CSCS card applications',
    icon: BadgeCheck,
    level: 'Foundation',
    duration: '1 day',
    link: 'cscs-card-course',
  },
  {
    id: 13,
    title: 'Scaffolding Awareness',
    description: 'Scaffold safety, inspection requirements, and hazard awareness on site',
    icon: Construction,
    level: 'Foundation',
    duration: 'Half day',
    link: 'scaffolding-awareness-course',
  },
  {
    id: 14,
    title: 'Environmental & Sustainability',
    description: 'Waste management, energy efficiency, and sustainable working practices',
    icon: Leaf,
    level: 'Foundation',
    duration: '1 day',
    link: 'environmental-sustainability-course',
  },
  {
    id: 15,
    title: 'CDM Regulations Awareness',
    description: 'Construction Design and Management regulations, roles, and responsibilities',
    icon: ClipboardCheck,
    level: 'Intermediate',
    duration: '1 day',
    link: 'cdm-regulations-course',
  },
];

const activeCourses = courses.filter((c) => !c.comingSoon);
const comingSoonCourses = courses.filter((c) => c.comingSoon);

export default function GeneralUpskillingIndex() {
  useSEO({
    title: 'General Upskilling | Study Centre',
    description:
      'Cross-industry training for tradespeople — safety, health, and professional development courses.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a] min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3">
          <Link to="/study-centre">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground transition-colors p-0 h-auto touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Study Centre
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-4 sm:px-8 lg:px-12 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="py-8 sm:py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/10 border border-elec-yellow/20">
                    <GraduationCap className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-elec-yellow/30 to-transparent" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
                  General Upskilling
                </h1>
                <p className="text-base sm:text-lg text-white/50 leading-relaxed">
                  Cross-industry safety and professional development courses for tradespeople. Build
                  on your core skills with recognised certifications.
                </p>
              </div>

              {/* Stats pills - desktop only */}
              <div className="hidden lg:flex items-center gap-3 pb-1">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm text-white/70">
                    <span className="font-semibold text-white">{activeCourses.length}</span>{' '}
                    available
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <span className="text-sm text-white/70">
                    <span className="font-semibold text-white">{comingSoonCourses.length}</span>{' '}
                    coming soon
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Available Now Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <h2 className="text-lg sm:text-xl font-semibold text-white">Available Now</h2>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {activeCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  to={course.link}
                  title={course.title}
                  description={course.description}
                  icon={course.icon}
                  level={course.level}
                  duration={course.duration}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* Coming Soon Section */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <h2 className="text-lg sm:text-xl font-semibold text-white/40">Coming Soon</h2>
              <div className="h-px flex-1 bg-white/[0.04]" />
              <span className="text-xs text-white/25 uppercase tracking-wider font-medium hidden sm:block">
                {comingSoonCourses.length} courses
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
              {comingSoonCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  to={course.link}
                  title={course.title}
                  description={course.description}
                  icon={course.icon}
                  level={course.level}
                  duration={course.duration}
                  index={index}
                  comingSoon
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
