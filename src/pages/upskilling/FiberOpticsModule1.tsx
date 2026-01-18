import { ArrowLeft, BookOpen, TrendingUp, Building, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const FiberOpticsModule1 = () => {
  const sections = [
    {
      id: 1,
      title: "What is Fibre Optic Cabling",
      icon: BookOpen,
      description: "Fundamentals of fiber optic technology"
    },
    {
      id: 2,
      title: "Advantages vs Copper Systems",
      icon: TrendingUp,
      description: "Comparing fiber and copper performance"
    },
    {
      id: 3,
      title: "Fibre Use in Commercial and Industrial Settings",
      icon: Building,
      description: "Applications and deployment scenarios"
    },
    {
      id: 4,
      title: "Health & Safety in Fibre Work",
      icon: ShieldCheck,
      description: "Safety protocols and protective measures"
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
            <Link to="/study-centre/upskilling/fiber-optics-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Fiber Optics Course
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 1</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">4 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">45 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Introduction to Fibre Optics
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Fundamentals of fiber optic technology and applications
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../fiber-optics-module-1-section-${section.id}`}
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

export default FiberOpticsModule1;
