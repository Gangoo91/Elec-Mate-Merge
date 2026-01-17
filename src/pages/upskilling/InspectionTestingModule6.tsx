import { ArrowLeft, FileCheck, Clock, TrendingUp, ToggleLeft, Layers, Zap } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    number: 'Section 1',
    title: 'RCD Types and Applications',
    description: 'Understanding different RCD types (AC, A, F, B) and their appropriate applications in electrical installations',
    icon: FileCheck,
    href: 'section-1',
  },
  {
    number: 'Section 2',
    title: 'Trip Time Testing (x1, x5, x0.5)',
    description: 'Testing RCD trip times at different multiples of rated residual current to verify correct operation',
    icon: Clock,
    href: 'section-2',
  },
  {
    number: 'Section 3',
    title: 'Ramp Testing',
    description: 'Using ramp testing to determine the actual trip current of an RCD and verify sensitivity',
    icon: TrendingUp,
    href: 'section-3',
  },
  {
    number: 'Section 4',
    title: 'RCD Test Button vs Instrument Testing',
    description: 'Understanding the difference between user test buttons and proper instrument testing requirements',
    icon: ToggleLeft,
    href: 'section-4',
  },
  {
    number: 'Section 5',
    title: 'Discriminating and Selective RCDs',
    description: 'Time-delayed and selective RCDs for discrimination in installations with multiple RCD protection levels',
    icon: Layers,
    href: 'section-5',
  },
];

export default function InspectionTestingModule6() {
  useSEO({
    title: 'Module 6: RCD Testing | Inspection & Testing',
    description: 'Learn RCD testing including trip time testing, ramp testing, and understanding discriminating RCDs for BS 7671 compliance.',
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/inspection-testing">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <Zap className="h-4 w-4" />
              <span>Module 6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              RCD Testing
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto">
              Master comprehensive RCD testing procedures including trip time verification,
              ramp testing, and understanding selective protection coordination.
            </p>
          </header>

          {/* Sections Grid */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-6">Module Sections</h2>
            <div className="grid grid-cols-1 gap-4">
              {sections.map((section, index) => (
                <ModuleCard
                  key={index}
                  number={section.number}
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  href={section.href}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
