import { ArrowLeft, Battery, Zap, Settings, Cable, TrendingUp, Power } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const RenewableEnergyModule4 = () => {
  const sections = [
    {
      id: 1,
      title: "Types of Batteries (Li-Ion, Lead-Acid, LFP, Flow)",
      icon: Battery,
      description: "Identify key battery types and compare their performance characteristics"
    },
    {
      id: 2,
      title: "Battery Sizing, Depth of Discharge, and Lifespan",
      icon: TrendingUp,
      description: "Calculate storage capacity requirements and understand performance metrics"
    },
    {
      id: 3,
      title: "Battery Management Systems (BMS)",
      icon: Settings,
      description: "Understand BMS functions and safety protection mechanisms"
    },
    {
      id: 4,
      title: "Energy Management Strategies",
      icon: Zap,
      description: "Learn load management and demand-side response techniques"
    },
    {
      id: 5,
      title: "Grid Integration and Inverter Systems",
      icon: Cable,
      description: "Explore grid-tie capabilities and power conversion systems"
    },
    {
      id: 6,
      title: "Economics and Business Models",
      icon: Power,
      description: "Analyse costs, payback periods, and revenue streams"
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
            <Link to="/electrician/upskilling/renewable-energy-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Renewable Energy Course
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 4</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">50 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Battery Storage and Energy Management
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding battery storage systems and energy management strategies
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../renewable-energy-module-4-section-${section.id}`}
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

export default RenewableEnergyModule4;
