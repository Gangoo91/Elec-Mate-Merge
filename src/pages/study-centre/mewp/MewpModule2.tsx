import { ArrowLeft, Search, AlertTriangle, Settings, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Risk Assessment Process & Documentation',
    icon: Search,
    description:
      'Five-step risk assessment, site surveys, recording findings, method statements and safe systems of work',
  },
  {
    id: 2,
    title: 'The Six Key Hazards',
    icon: AlertTriangle,
    description:
      'Falls, electrocution, overturn, entrapment, collision and machine failure — causes, statistics and prevention',
  },
  {
    id: 3,
    title: 'Machine Selection & Safe Systems of Work',
    icon: Settings,
    description:
      'HSE GEIS6 selection criteria, SWL considerations, method statement components, SSOW documentation',
  },
  {
    id: 4,
    title: 'Ground Conditions, Slopes & Weather Limits',
    icon: Cloud,
    description:
      'Bearing capacity, sub-surface hazards, slope limits, wind speed 12.5 m/s maximum, anemometers, spreader pads',
  },
];

export default function MewpModule2() {
  useSEO({
    title: 'Module 2: Risk Assessment, Planning & Selection | MEWP Operator Training',
    description:
      'Risk assessment for MEWP work, the six key hazards, machine selection criteria, ground conditions and weather limits.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../mewp-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to MEWP Course
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
              <span className="text-elec-yellow text-xs font-semibold">MODULE 2</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Risk Assessment, Planning &amp; Machine Selection
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              How to assess risks, identify hazards, select the right MEWP for the job, and account
              for ground conditions and weather
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../mewp-module-2-section-${section.id}`}
                sectionNumber={section.id}
                title={section.title}
                description={section.description}
                icon={section.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
