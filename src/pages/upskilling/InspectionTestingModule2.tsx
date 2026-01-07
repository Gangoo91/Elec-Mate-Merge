import { ArrowLeft, Shield, Lock, Tag, Zap, Power, RotateCw, ChevronRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
          <div className="grid gap-3">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Link key={section.id} to={section.path}>
                  <Card
                    variant="ios"
                    className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors active:scale-[0.98] min-h-[48px]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 min-h-[48px] min-w-[48px] rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                            Section {section.id}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                          {section.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
                          {section.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </Card>
                </Link>
              );
            })}
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
