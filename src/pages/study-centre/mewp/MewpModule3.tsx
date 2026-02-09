import { ArrowLeft, ClipboardCheck, Wrench, Anchor, HardHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Familiarisation & the Pre-Use Inspection',
    icon: ClipboardCheck,
    description:
      'Familiarisation vs training, full pre-use checklist, wheels, hydraulics, controls, safety systems, defect reporting',
  },
  {
    id: 2,
    title: 'Thorough Examination & Maintenance',
    icon: Wrench,
    description:
      'LOLER 6-monthly examination, competent person, examination scope, PUWER routine maintenance, post-event inspections',
  },
  {
    id: 3,
    title: 'Outriggers, Stabilisers & Ground Preparation',
    icon: Anchor,
    description:
      'Full deployment rules, spreader plates, pad sizing, hydraulic holding valves, ground preparation methods and interlocks',
  },
  {
    id: 4,
    title: 'Fall Protection, Harnesses & PPE',
    icon: HardHat,
    description:
      'Work restraint vs fall arrest, harness requirements by machine type, inspection, fitting, anchor points, other PPE',
  },
];

export default function MewpModule3() {
  useSEO({
    title: 'Module 3: Pre-Use Inspections, Setup & Fall Protection | MEWP Operator Training',
    description:
      'MEWP pre-use inspections, thorough examination, outrigger setup, fall protection harnesses and PPE requirements.',
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
              <span className="text-elec-yellow text-xs font-semibold">MODULE 3</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Pre-Use Inspections, Setup &amp; Fall Protection
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              How to inspect a MEWP before use, set up outriggers and stabilisers safely, and select
              and use the correct fall protection equipment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../mewp-module-3-section-${section.id}`}
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
