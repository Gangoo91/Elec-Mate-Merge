import { ArrowLeft, FileCheck, Clock, TrendingUp, ToggleLeft, Layers, ChevronRight, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 'section1',
    title: 'RCD Types and Applications',
    description: 'Understanding different RCD types (AC, A, F, B) and their appropriate applications in electrical installations',
    icon: FileCheck,
  },
  {
    id: 'section2',
    title: 'Trip Time Testing (×1, ×5, ×0.5)',
    description: 'Testing RCD trip times at different multiples of rated residual current to verify correct operation',
    icon: Clock,
  },
  {
    id: 'section3',
    title: 'Ramp Testing',
    description: 'Using ramp testing to determine the actual trip current of an RCD and verify sensitivity',
    icon: TrendingUp,
  },
  {
    id: 'section4',
    title: 'RCD Test Button vs Instrument Testing',
    description: 'Understanding the difference between user test buttons and proper instrument testing requirements',
    icon: ToggleLeft,
  },
  {
    id: 'section5',
    title: 'Discriminating and Selective RCDs',
    description: 'Time-delayed and selective RCDs for discrimination in installations with multiple RCD protection levels',
    icon: Layers,
  },
];

export default function InspectionTestingModule6() {
  useSEO({
    title: 'Module 6: RCD Testing | Inspection & Testing',
    description: 'Learn RCD testing including trip time testing, ramp testing, and understanding discriminating RCDs for BS 7671 compliance.',
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style sticky header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/95 border-b border-gray-800/50">
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
            <p className="text-xs text-gray-400">Module 6</p>
            <h1 className="text-lg font-semibold text-white truncate">
              RCD Testing
            </h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe">
        {/* Hero section */}
        <section className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-elec-yellow to-amber-500 flex items-center justify-center shadow-lg">
              <FileCheck className="h-10 w-10 text-black" />
            </div>
          </div>
          <h2 className="text-[34px] font-bold text-center text-white mb-3 leading-tight">
            RCD Testing
          </h2>
          <p className="text-center text-gray-400 max-w-md mx-auto">
            Master comprehensive RCD testing procedures including trip time verification,
            ramp testing, and understanding selective protection coordination.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Target className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm text-gray-400">
              5 sections • Essential protection testing
            </span>
          </div>
        </section>

        {/* Section navigation grid */}
        <section className="mb-8">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4 px-1">
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
                Start with understanding RCD types and their appropriate applications.
              </p>
              <Link to="section1">
                <Button
                  variant="ios-primary"
                  className="min-h-[48px] bg-black text-elec-yellow hover:bg-gray-900"
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
