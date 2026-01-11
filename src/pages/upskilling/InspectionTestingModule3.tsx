import { ArrowLeft, Link2, CircleDot, Cable, Gauge, Activity, FileCheck, ChevronRight, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 'section1',
    title: 'Protective Conductor Continuity (R1+R2)',
    description: 'Testing the combined resistance of line and circuit protective conductors',
    icon: CircleDot,
  },
  {
    id: 'section2',
    title: 'Ring Final Circuit Continuity',
    description: 'Three-step testing method for verifying ring circuit integrity',
    icon: Cable,
  },
  {
    id: 'section3',
    title: 'Main Bonding Conductor Testing',
    description: 'Verifying continuity of main protective bonding connections',
    icon: Link2,
  },
  {
    id: 'section4',
    title: 'Supplementary Bonding Verification',
    description: 'Testing supplementary equipotential bonding in special locations',
    icon: Target,
  },
  {
    id: 'section5',
    title: 'Low Resistance Measurement Techniques',
    description: 'Accurate methods for measuring very low resistance values',
    icon: Gauge,
  },
  {
    id: 'section6',
    title: 'Interpreting Continuity Results',
    description: 'Analysing test results and identifying common faults',
    icon: FileCheck,
  },
];

export default function InspectionTestingModule3() {
  useSEO({
    title: 'Module 3: Continuity Testing | Inspection & Testing',
    description: 'Learn continuity testing methods including R1+R2, ring final circuits, and bonding conductor verification.',
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* iOS-style sticky header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50">
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
            <p className="text-xs text-gray-500 dark:text-gray-400">Module 3</p>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              Continuity Testing
            </h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe">
        {/* Hero section */}
        <section className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Link2 className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-3">
            Continuity Testing
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Master the essential techniques for verifying electrical continuity in protective conductors,
            ring circuits, and bonding connections.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              6 sections • Practical focus
            </span>
          </div>
        </section>

        {/* Section navigation grid */}
        <section className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4 px-1">
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
          <Card variant="ios" className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 border-0">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to Begin?
              </h3>
              <p className="text-green-100 text-sm mb-4">
                Start with protective conductor continuity testing fundamentals.
              </p>
              <Link to="section1">
                <Button
                  variant="ios-primary"
                  className="min-h-[48px] bg-white text-green-600 hover:bg-green-50"
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
