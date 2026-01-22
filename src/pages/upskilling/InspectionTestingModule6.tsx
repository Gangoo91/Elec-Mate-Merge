import { ArrowLeft, FileCheck, Clock, TrendingUp, ToggleLeft, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'RCD Types and Applications',
    description: 'Understanding different RCD types (AC, A, F, B) and their appropriate applications in electrical installations',
    icon: FileCheck,
  },
  {
    id: 2,
    title: 'Trip Time Testing (x1, x5, x0.5)',
    description: 'Testing RCD trip times at different multiples of rated residual current to verify correct operation',
    icon: Clock,
  },
  {
    id: 3,
    title: 'Ramp Testing',
    description: 'Using ramp testing to determine the actual trip current of an RCD and verify sensitivity',
    icon: TrendingUp,
  },
  {
    id: 4,
    title: 'RCD Test Button vs Instrument Testing',
    description: 'Understanding the difference between user test buttons and proper instrument testing requirements',
    icon: ToggleLeft,
  },
  {
    id: 5,
    title: 'Discriminating and Selective RCDs',
    description: 'Time-delayed and selective RCDs for discrimination in installations with multiple RCD protection levels',
    icon: Layers,
  },
];

export default function InspectionTestingModule6() {
  useSEO({
    title: 'Module 6: RCD Testing | Inspection & Testing',
    description: 'Learn RCD testing including trip time testing, ramp testing, and understanding discriminating RCDs for BS 7671 compliance.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/inspection-testing">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Inspection & Testing
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 6</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">5 Sections</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            RCD Testing
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Master comprehensive RCD testing procedures including trip time verification, ramp testing, and understanding selective protection coordination
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../inspection-testing/module-6/section-${section.id}`}
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
  );
}
