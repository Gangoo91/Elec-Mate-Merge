import { ArrowLeft, Zap, Gauge, TestTube, Cpu, FileCheck, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Principles of Insulation Testing',
    description: 'Understanding insulation resistance fundamentals and why testing is essential for electrical safety.',
    icon: Gauge,
  },
  {
    id: 2,
    title: 'Test Voltages and Applications',
    description: 'Selecting appropriate test voltages for different circuit types and voltage ratings.',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Testing Procedure (Phase-Phase, Phase-Earth)',
    description: 'Step-by-step procedures for conducting insulation resistance tests between conductors.',
    icon: TestTube,
  },
  {
    id: 4,
    title: 'Testing Sensitive Equipment (SERDs)',
    description: 'Protecting surge protective devices and sensitive electronics during insulation testing.',
    icon: Cpu,
  },
  {
    id: 5,
    title: 'Interpreting Results and Minimum Values',
    description: 'Understanding acceptable insulation resistance values and BS 7671 requirements.',
    icon: FileCheck,
  },
  {
    id: 6,
    title: 'Troubleshooting Low Insulation',
    description: 'Diagnosing and locating insulation faults using systematic testing techniques.',
    icon: Wrench,
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
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/inspection-testing">
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 4</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Insulation Resistance Testing
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Learn to perform insulation resistance tests correctly, interpret results, and troubleshoot faults to BS 7671 standards
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../inspection-testing-module-4-section-${section.id}`}
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
