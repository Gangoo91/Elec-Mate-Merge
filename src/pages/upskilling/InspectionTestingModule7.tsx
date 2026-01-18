import { ArrowLeft, Plug, Zap, RotateCw, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Polarity Testing Methods',
    description: 'Understanding polarity testing techniques and equipment for verifying correct conductor connections',
    icon: Plug,
  },
  {
    id: 2,
    title: 'Single-Phase Polarity Verification',
    description: 'Verifying correct polarity of line, neutral and earth conductors in single-phase installations',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Three-Phase Rotation Testing',
    description: 'Testing phase sequence and rotation direction in three-phase systems',
    icon: RotateCw,
  },
  {
    id: 4,
    title: 'Functional Testing of Switchgear',
    description: 'Verification of switchgear operation including isolators, contactors and control circuits',
    icon: Settings,
  },
  {
    id: 5,
    title: 'Protective Device Operation Verification',
    description: 'Testing and verifying correct operation of protective devices including MCBs, RCDs and fuses',
    icon: Shield,
  },
];

export default function InspectionTestingModule7() {
  useSEO({
    title: 'Module 7: Polarity & Functional Testing | Inspection & Testing',
    description: 'Learn polarity testing methods, single-phase and three-phase verification, switchgear functional testing, and protective device operation verification.',
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 7</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">5 Sections</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Polarity & Functional Testing
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Master polarity verification and functional testing techniques to ensure all electrical equipment operates safely and correctly
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../inspection-testing-module-7-section-${section.id}`}
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
