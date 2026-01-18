import { ArrowLeft, BookOpen, Key, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const BS7671Module2 = () => {
  const sections = [
    {
      id: 1,
      title: "Navigating Part 2 – How Definitions Shape Application",
      icon: BookOpen,
      description: "Understanding how definitions in Part 2 influence the application of regulations"
    },
    {
      id: 2,
      title: "Key Terms: CPC, ADS, SELV, PELV, Protective Devices",
      icon: Key,
      description: "Essential terminology for circuit protective conductors, automatic disconnection, and safety systems"
    },
    {
      id: 3,
      title: "New Definitions from Amendment 2 & 3 (AFDD, PEI, Bidirectional Protection)",
      icon: AlertTriangle,
      description: "Updated terminology from Amendment 2 and Amendment 3's bidirectional protection requirements"
    },
    {
      id: 4,
      title: "Amendment 3 Highlights & Current Requirements",
      icon: Lightbulb,
      description: "Key changes in Amendment 3 focusing on bidirectional protection and renewable energy safety"
    }
  ];

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
            <Link to="/study-centre/upskilling/bs7671-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to BS7671 Course
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
            <span className="text-white/60 text-xs">4 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">50 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Definitions & Key Terminology
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Mastering the essential vocabulary and definitions that underpin BS 7671
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../bs7671-module-2-section-${section.id}`}
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
};

export default BS7671Module2;
