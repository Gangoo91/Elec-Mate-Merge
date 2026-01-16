import { ArrowLeft, Link2, CircleDot, Cable, Gauge, FileCheck, Zap } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    number: "Section 1",
    title: 'Protective Conductor Continuity (R1+R2)',
    description: 'Testing the combined resistance of line and circuit protective conductors.',
    icon: CircleDot,
    href: 'section-1',
  },
  {
    number: "Section 2",
    title: 'Ring Final Circuit Continuity',
    description: 'Three-step testing method for verifying ring circuit integrity.',
    icon: Cable,
    href: 'section-2',
  },
  {
    number: "Section 3",
    title: 'Main Bonding Conductor Testing',
    description: 'Verifying continuity of main protective bonding connections.',
    icon: Link2,
    href: 'section-3',
  },
  {
    number: "Section 4",
    title: 'Supplementary Bonding Verification',
    description: 'Testing supplementary equipotential bonding in special locations.',
    icon: Zap,
    href: 'section-4',
  },
  {
    number: "Section 5",
    title: 'Low Resistance Measurement Techniques',
    description: 'Accurate methods for measuring very low resistance values.',
    icon: Gauge,
    href: 'section-5',
  },
  {
    number: "Section 6",
    title: 'Interpreting Continuity Results',
    description: 'Analysing test results and identifying common faults.',
    icon: FileCheck,
    href: 'section-6',
  },
];

export default function InspectionTestingModule3() {
  useSEO({
    title: 'Module 3: Continuity Testing | Inspection & Testing',
    description: 'Learn continuity testing methods including R1+R2, ring final circuits, and bonding conductor verification.',
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
              <span>Module 3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Continuity Testing
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto">
              Master the essential techniques for verifying electrical continuity in protective conductors, ring circuits, and bonding connections.
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
