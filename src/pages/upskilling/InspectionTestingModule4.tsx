import { ArrowLeft, Zap, Gauge, TestTube, Cpu, FileCheck, Wrench } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    number: "Section 1",
    title: 'Principles of Insulation Testing',
    description: 'Understanding insulation resistance fundamentals and why testing is essential for electrical safety.',
    icon: Gauge,
    href: 'section1',
  },
  {
    number: "Section 2",
    title: 'Test Voltages and Applications',
    description: 'Selecting appropriate test voltages for different circuit types and voltage ratings.',
    icon: Zap,
    href: 'section2',
  },
  {
    number: "Section 3",
    title: 'Testing Procedure (Phase-Phase, Phase-Earth)',
    description: 'Step-by-step procedures for conducting insulation resistance tests between conductors.',
    icon: TestTube,
    href: 'section3',
  },
  {
    number: "Section 4",
    title: 'Testing Sensitive Equipment (SERDs)',
    description: 'Protecting surge protective devices and sensitive electronics during insulation testing.',
    icon: Cpu,
    href: 'section4',
  },
  {
    number: "Section 5",
    title: 'Interpreting Results and Minimum Values',
    description: 'Understanding acceptable insulation resistance values and BS 7671 requirements.',
    icon: FileCheck,
    href: 'section5',
  },
  {
    number: "Section 6",
    title: 'Troubleshooting Low Insulation',
    description: 'Diagnosing and locating insulation faults using systematic testing techniques.',
    icon: Wrench,
    href: 'section6',
  },
];

export default function InspectionTestingModule4() {
  useSEO({
    title: 'Module 4: Insulation Resistance Testing | Inspection & Testing',
    description: 'Master insulation resistance testing procedures including test voltages, phase-phase and phase-earth testing, SERDs, interpreting results, and troubleshooting low insulation.',
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
              <span>Module 4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Insulation Resistance Testing
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto">
              Learn to perform insulation resistance tests correctly, interpret results, and troubleshoot faults to BS 7671 standards.
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
