import { ArrowLeft, Settings, Zap, PanelLeft, Cable, PlugZap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const IndustrialElectricalModule1 = () => {
  const sections = [
    {
      id: 1,
      title: "Industrial vs Domestic Electrical Setup",
      icon: Settings,
      description: "Key differences between industrial and domestic systems"
    },
    {
      id: 2,
      title: "HV/LV Separation and Transformer Overview",
      icon: Zap,
      description: "High voltage systems and transformer principles"
    },
    {
      id: 3,
      title: "MCC Panels and Switchgear Intro",
      icon: PanelLeft,
      description: "Motor control centres and switchgear basics"
    },
    {
      id: 4,
      title: "Cabling, Busbar Systems, and Riser Design",
      icon: Cable,
      description: "Power distribution methods and design"
    },
    {
      id: 5,
      title: "Earthing and Bonding Strategies",
      icon: PlugZap,
      description: "Industrial earthing systems and protection"
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
            <Link to="/electrician/upskilling/industrial-electrical-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Industrial Electrical Course
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
            <span className="text-white/60 text-xs">5 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">50 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Overview of Industrial Electrical Distribution
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Fundamentals of industrial electrical systems and distribution
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../industrial-electrical-module-1-section-${section.id}`}
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

export default IndustrialElectricalModule1;
