import { ArrowLeft, Scale, FileText, Wrench, Shield, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Purpose and Legal Requirements',
    description: 'Understanding why inspection and testing is essential, legal obligations under the Electricity at Work Regulations, and duty of care responsibilities.',
    icon: Scale,
  },
  {
    id: 2,
    title: 'BS 7671 Testing Requirements Overview',
    description: 'Comprehensive overview of the testing requirements specified in BS 7671, including initial verification and periodic inspection.',
    icon: FileText,
  },
  {
    id: 3,
    title: 'Test Equipment and Calibration',
    description: 'Essential test instruments, their specifications, calibration requirements, and how to verify equipment accuracy.',
    icon: Wrench,
  },
  {
    id: 4,
    title: 'Safety During Testing',
    description: 'Safe isolation procedures, personal protective equipment, risk assessment, and safe working practices during electrical testing.',
    icon: Shield,
  },
  {
    id: 5,
    title: 'Test Sequence and Documentation',
    description: 'The correct sequence for carrying out tests and how to properly document results on electrical installation certificates.',
    icon: ClipboardList,
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 1</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">5 Sections</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Introduction to Inspection & Testing
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Master the foundational knowledge required for electrical inspection and testing
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../inspection-testing-module-1-section-${section.id}`}
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
