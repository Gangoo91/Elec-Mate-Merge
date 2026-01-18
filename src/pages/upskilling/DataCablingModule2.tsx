import { ArrowLeft, Cable, Shield, BarChart, Plug, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const DataCablingModule2 = () => {
  const sections = [
    {
      id: 1,
      title: "Twisted Pair Basics and Categories",
      icon: Cable,
      description: "Understanding twisted pair cable construction and categories"
    },
    {
      id: 2,
      title: "UTP, FTP, and STP Explained",
      icon: Shield,
      description: "Different cable shielding types and applications"
    },
    {
      id: 3,
      title: "Performance Ratings and Bandwidth Limits",
      icon: BarChart,
      description: "Cable performance specifications and limitations"
    },
    {
      id: 4,
      title: "Connectors and Patch Panel Config",
      icon: Plug,
      description: "Connector types and patch panel configuration"
    },
    {
      id: 5,
      title: "PoE (Power over Ethernet) Use and Limitations",
      icon: Zap,
      description: "Power over Ethernet capabilities and constraints"
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Data Cabling Course
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
            <span className="text-white/60 text-xs">5 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">50 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Copper Cabling Standards (Cat5e, Cat6, etc.)
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Copper cable types, standards, and performance characteristics
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../data-cabling-module-2-section-${section.id}`}
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

export default DataCablingModule2;
