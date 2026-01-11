import { ArrowLeft, ToggleRight, Plug, Zap, RotateCw, Settings, Shield, ChevronRight, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
          <div className="grid grid-cols-2 gap-3">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={section.id} className="h-full block">
                  <Card
                    className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-elec-yellow/30 hover:shadow-lg hover:shadow-elec-yellow/10 active:scale-[0.98] transition-all duration-300 cursor-pointer touch-manipulation h-full min-h-[200px]"
                  >
                    {/* Accent line at top */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />

                    {/* Hover glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl bg-elec-yellow/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                    <CardContent className="relative text-center space-y-3 p-4">
                      {/* Icon with gradient bg */}
                      <div className="flex justify-center">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-white/10">
                          <section.icon className="h-6 w-6 text-elec-yellow" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Section Badge */}
                      <div className="flex justify-center">
                        <Badge
                          variant="secondary"
                          className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 font-bold text-xs px-3 py-1"
                        >
                          Section {index + 1}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors duration-300">
                        {section.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
                        {section.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
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
