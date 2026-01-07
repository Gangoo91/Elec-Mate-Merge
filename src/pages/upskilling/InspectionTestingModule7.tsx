import { ArrowLeft, ToggleRight, Plug, Zap, RotateCw, Settings, Shield, ChevronRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 'section1',
    title: 'Polarity Testing Methods',
    description: 'Understanding polarity testing techniques and equipment for verifying correct conductor connections',
    icon: Plug,
  },
  {
    id: 'section2',
    title: 'Single-Phase Polarity Verification',
    description: 'Verifying correct polarity of line, neutral and earth conductors in single-phase installations',
    icon: Zap,
  },
  {
    id: 'section3',
    title: 'Three-Phase Rotation Testing',
    description: 'Testing phase sequence and rotation direction in three-phase systems',
    icon: RotateCw,
  },
  {
    id: 'section4',
    title: 'Functional Testing of Switchgear',
    description: 'Verification of switchgear operation including isolators, contactors and control circuits',
    icon: Settings,
  },
  {
    id: 'section5',
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
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style sticky header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/95 border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="../inspection-testing">
            <Button
              variant="ios-ghost"
              size="icon"
              className="h-12 w-12 min-h-[48px] min-w-[48px]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Module 7</p>
            <h1 className="text-lg font-semibold text-white truncate">
              Polarity & Functional Testing
            </h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe">
        {/* Hero section */}
        <section className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-elec-yellow to-amber-500 flex items-center justify-center shadow-lg shadow-elec-yellow/20">
              <ToggleRight className="h-10 w-10 text-black" />
            </div>
          </div>
          <h2 className="text-[34px] font-bold text-center text-white mb-3 leading-tight">
            Polarity & Functional Testing
          </h2>
          <p className="text-center text-gray-400 max-w-md mx-auto">
            Master polarity verification and functional testing techniques to ensure
            all electrical equipment operates safely and correctly.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Target className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm text-gray-400">
              5 sections • Essential safety verification
            </span>
          </div>
        </section>

        {/* Section navigation grid */}
        <section className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4 px-1">
            Module Sections
          </h3>
          <div className="grid gap-3">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Link key={section.id} to={section.id}>
                  <Card
                    variant="ios"
                    interactive
                    className="p-4 min-h-[48px] bg-white/5 border-white/10 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 min-h-[48px] min-w-[48px] rounded-2xl bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-elec-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-elec-yellow">
                            Section {index + 1}
                          </span>
                        </div>
                        <h4 className="font-semibold text-white text-base leading-tight mb-1">
                          {section.title}
                        </h4>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {section.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick start CTA */}
        <section className="mb-8">
          <Card variant="ios" className="p-6 bg-gradient-to-br from-elec-yellow to-amber-500 border-0">
            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-2">
                Ready to Begin?
              </h3>
              <p className="text-black/70 text-sm mb-4">
                Start with understanding polarity testing methods and equipment.
              </p>
              <Link to="section1">
                <Button
                  variant="ios-primary"
                  className="min-h-[48px] bg-black text-elec-yellow hover:bg-black/90"
                >
                  Start Section 1
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
