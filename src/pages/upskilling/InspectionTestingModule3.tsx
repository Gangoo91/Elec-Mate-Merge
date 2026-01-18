import { ArrowLeft, Link2, CircleDot, Cable, Gauge, FileCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Protective Conductor Continuity (R1+R2)',
    description: 'Testing the combined resistance of line and circuit protective conductors.',
    icon: CircleDot,
  },
  {
    id: 2,
    title: 'Ring Final Circuit Continuity',
    description: 'Three-step testing method for verifying ring circuit integrity.',
    icon: Cable,
  },
  {
    id: 3,
    title: 'Main Bonding Conductor Testing',
    description: 'Verifying continuity of main protective bonding connections.',
    icon: Link2,
  },
  {
    id: 4,
    title: 'Supplementary Bonding Verification',
    description: 'Testing supplementary equipotential bonding in special locations.',
    icon: Zap,
  },
  {
    id: 5,
    title: 'Low Resistance Measurement Techniques',
    description: 'Accurate methods for measuring very low resistance values.',
    icon: Gauge,
  },
  {
    id: 6,
    title: 'Interpreting Continuity Results',
    description: 'Analysing test results and identifying common faults.',
    icon: FileCheck,
  },
];

export default function InspectionTestingModule3() {
  useSEO({
    title: 'Module 3: Continuity Testing | Inspection & Testing',
    description: 'Learn continuity testing methods including R1+R2, ring final circuits, and bonding conductor verification.',
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 3</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Continuity Testing
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Master the essential techniques for verifying electrical continuity in protective conductors, ring circuits, and bonding connections
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../inspection-testing-module-3-section-${section.id}`}
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
