import { ArrowLeft, Scale, FileText, Wrench, Shield, ClipboardList, Zap } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    number: "Section 1",
    title: 'Purpose and Legal Requirements',
    description: 'Understanding why inspection and testing is essential, legal obligations under the Electricity at Work Regulations, and duty of care responsibilities.',
    icon: Scale,
    href: 'section1',
  },
  {
    number: "Section 2",
    title: 'BS 7671 Testing Requirements Overview',
    description: 'Comprehensive overview of the testing requirements specified in BS 7671, including initial verification and periodic inspection.',
    icon: FileText,
    href: 'section2',
  },
  {
    number: "Section 3",
    title: 'Test Equipment and Calibration',
    description: 'Essential test instruments, their specifications, calibration requirements, and how to verify equipment accuracy.',
    icon: Wrench,
    href: 'section3',
  },
  {
    number: "Section 4",
    title: 'Safety During Testing',
    description: 'Safe isolation procedures, personal protective equipment, risk assessment, and safe working practices during electrical testing.',
    icon: Shield,
    href: 'section4',
  },
  {
    number: "Section 5",
    title: 'Test Sequence and Documentation',
    description: 'The correct sequence for carrying out tests and how to properly document results on electrical installation certificates.',
    icon: ClipboardList,
    href: 'section5',
  }
];

export default function InspectionTestingModule1() {
  useSEO({
    title: 'Module 1: Introduction to Inspection & Testing | Elec-Mate',
    description: 'Learn the fundamentals of electrical inspection and testing including legal requirements, BS 7671 standards, test equipment, safety procedures, and documentation.'
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
            <Link to="../inspection-testing">
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
              <span>Module 1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Introduction to Inspection & Testing
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto">
              Master the foundational knowledge required for electrical inspection and testing, covering legal requirements, BS 7671 standards, equipment, safety procedures, and documentation practices.
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
