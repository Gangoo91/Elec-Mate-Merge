import { ArrowLeft, Gauge, MoveVertical, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Pre-Start Checks & Operating Controls',
    icon: Gauge,
    description:
      '11-step pre-start procedure, platform controls, ground controls, auxiliary controls, emergency stops, function checks',
  },
  {
    id: 2,
    title: 'Travelling, Elevating & Platform Loading',
    icon: MoveVertical,
    description:
      'Stowed vs elevated travel, slope travel rules, smooth control inputs, SWL management, even load distribution',
  },
  {
    id: 3,
    title: 'Working Near Structures, Power Lines & Public Areas',
    icon: Zap,
    description:
      'Entrapment prevention, power line safe distances (15m/9m/3m), arcing without contact, public areas, night working',
  },
  {
    id: 4,
    title: 'Exclusion Zones, Traffic Management & Banksman Duties',
    icon: Users,
    description:
      '10m exclusion zone, barrier requirements, banksman role and signals, traffic management, loading and unloading',
  },
];

export default function MewpModule4() {
  useSEO({
    title: 'Module 4: Safe Operating Procedures | MEWP Operator Training',
    description:
      'Safe MEWP operating procedures including controls, travelling, elevating, power line distances, exclusion zones and banksman duties.',
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
              <span className="text-elec-yellow text-xs font-semibold">MODULE 4</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Safe Operating Procedures
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              How to safely operate a MEWP from pre-start checks through to working at height,
              including special situations and the role of the banksman
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../mewp-module-4-section-${section.id}`}
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
