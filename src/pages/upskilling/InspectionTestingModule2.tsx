import { ArrowLeft, Shield, Lock, Tag, Zap, Power, RotateCw, ChevronRight, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Principles of Safe Isolation',
    description: 'Understand the fundamental principles and importance of safe isolation in electrical work.',
    icon: Shield,
    path: 'section1',
  },
  {
    id: 2,
    title: 'Isolation Equipment and PPE',
    description: 'Learn about the essential equipment and personal protective equipment required for safe isolation.',
    icon: Lock,
    path: 'section2',
  },
  {
    id: 3,
    title: 'Lock-Off/Tag-Out Procedures',
    description: 'Master the lock-off and tag-out procedures to ensure circuits remain isolated during work.',
    icon: Tag,
    path: 'section3',
  },
  {
    id: 4,
    title: 'Proving Dead Techniques',
    description: 'Learn the correct methods for proving that circuits are dead before commencing work.',
    icon: Zap,
    path: 'section4',
  },
  {
    id: 5,
    title: 'Working on Isolated Systems',
    description: 'Best practices and safety considerations when working on isolated electrical systems.',
    icon: Power,
    path: 'section5',
  },
  {
    id: 6,
    title: 'Re-energisation Procedures',
    description: 'Safe procedures for re-energising circuits after work has been completed.',
    icon: RotateCw,
    path: 'section6',
  },
];

export default function InspectionTestingModule2() {
  useSEO({
    title: 'Module 2: Safe Isolation Procedures | Inspection & Testing',
    description: 'Learn safe isolation procedures including lock-off/tag-out, proving dead techniques, and re-energisation procedures.',
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
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">Inspection & Testing</p>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Module 2</h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe">
        {/* Hero section */}
        <section className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-3">
            Safe Isolation Procedures
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Master the critical procedures for safely isolating electrical circuits before carrying out any work.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Target className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">6 Sections</span>
          </div>
        </section>

        {/* iOS card grid for section navigation */}
        <section className="space-y-3">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide px-1">
            Sections
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={section.path} className="h-full block">
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
                          Section {section.id}
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

        {/* Start learning CTA */}
        <section className="mt-8">
          <Link to="section1">
            <Button
              variant="ios-primary"
              className="w-full h-14 min-h-[48px] text-lg font-semibold"
            >
              Start Learning
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
