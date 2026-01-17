import { ArrowLeft, Plug, Zap, RotateCw, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    number: 'Section 1',
    title: 'Polarity Testing Methods',
    description: 'Understanding polarity testing techniques and equipment for verifying correct conductor connections',
    icon: Plug,
    href: 'section-1',
  },
  {
    number: 'Section 2',
    title: 'Single-Phase Polarity Verification',
    description: 'Verifying correct polarity of line, neutral and earth conductors in single-phase installations',
    icon: Zap,
    href: 'section-2',
  },
  {
    number: 'Section 3',
    title: 'Three-Phase Rotation Testing',
    description: 'Testing phase sequence and rotation direction in three-phase systems',
    icon: RotateCw,
    href: 'section-3',
  },
  {
    number: 'Section 4',
    title: 'Functional Testing of Switchgear',
    description: 'Verification of switchgear operation including isolators, contactors and control circuits',
    icon: Settings,
    href: 'section-4',
  },
  {
    number: 'Section 5',
    title: 'Protective Device Operation Verification',
    description: 'Testing and verifying correct operation of protective devices including MCBs, RCDs and fuses',
    icon: Shield,
    href: 'section-5',
  },
];

export default function InspectionTestingModule7() {
  useSEO({
    title: 'Module 7: Polarity & Functional Testing | Inspection & Testing',
    description: 'Learn polarity testing methods, single-phase and three-phase verification, switchgear functional testing, and protective device operation verification.',
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
              <span>Module 7</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Polarity & Functional Testing
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto">
              Master polarity verification and functional testing techniques to ensure
              all electrical equipment operates safely and correctly.
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
