import { ArrowLeft, Shield, Lock, Tag, Zap, Power, RotateCw } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    number: "Section 1",
    title: 'Principles of Safe Isolation',
    description: 'Understand the fundamental principles and importance of safe isolation in electrical work.',
    icon: Shield,
    href: 'section1',
  },
  {
    number: "Section 2",
    title: 'Isolation Equipment and PPE',
    description: 'Learn about the essential equipment and personal protective equipment required for safe isolation.',
    icon: Lock,
    href: 'section2',
  },
  {
    number: "Section 3",
    title: 'Lock-Off/Tag-Out Procedures',
    description: 'Master the lock-off and tag-out procedures to ensure circuits remain isolated during work.',
    icon: Tag,
    href: 'section3',
  },
  {
    number: "Section 4",
    title: 'Proving Dead Techniques',
    description: 'Learn the correct methods for proving that circuits are dead before commencing work.',
    icon: Zap,
    href: 'section4',
  },
  {
    number: "Section 5",
    title: 'Working on Isolated Systems',
    description: 'Best practices and safety considerations when working on isolated electrical systems.',
    icon: Power,
    href: 'section5',
  },
  {
    number: "Section 6",
    title: 'Re-energisation Procedures',
    description: 'Safe procedures for re-energising circuits after work has been completed.',
    icon: RotateCw,
    href: 'section6',
  },
];

export default function InspectionTestingModule2() {
  useSEO({
    title: 'Module 2: Safe Isolation Procedures | Inspection & Testing',
    description: 'Learn safe isolation procedures including lock-off/tag-out, proving dead techniques, and re-energisation procedures.',
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
              <span>Module 2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Safe Isolation Procedures
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto">
              Master the critical procedures for safely isolating electrical circuits before carrying out any work.
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
