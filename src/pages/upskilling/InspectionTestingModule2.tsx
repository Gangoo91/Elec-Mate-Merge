import { ArrowLeft, Shield, Lock, Tag, Zap, Power, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Principles of Safe Isolation',
    description: 'Understand the fundamental principles and importance of safe isolation in electrical work.',
    icon: Shield,
  },
  {
    id: 2,
    title: 'Isolation Equipment and PPE',
    description: 'Learn about the essential equipment and personal protective equipment required for safe isolation.',
    icon: Lock,
  },
  {
    id: 3,
    title: 'Lock-Off/Tag-Out Procedures',
    description: 'Master the lock-off and tag-out procedures to ensure circuits remain isolated during work.',
    icon: Tag,
  },
  {
    id: 4,
    title: 'Proving Dead Techniques',
    description: 'Learn the correct methods for proving that circuits are dead before commencing work.',
    icon: Zap,
  },
  {
    id: 5,
    title: 'Working on Isolated Systems',
    description: 'Best practices and safety considerations when working on isolated electrical systems.',
    icon: Power,
  },
  {
    id: 6,
    title: 'Re-energisation Procedures',
    description: 'Safe procedures for re-energising circuits after work has been completed.',
    icon: RotateCw,
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 2</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Safe Isolation Procedures
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Master the critical procedures for safely isolating electrical circuits before carrying out any work
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../inspection-testing-module-2-section-${section.id}`}
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
