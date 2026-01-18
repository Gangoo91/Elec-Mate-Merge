import { ArrowLeft, Shield, Zap, Clock, CircuitBoard, Gauge, Flame, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const BS7671Module4 = () => {
  const sections = [
    {
      id: 1,
      title: "Electric Shock Protection Methods (SELV, PELV, ADS, etc.)",
      icon: Shield,
      description: "Safety systems and methods for preventing electric shock in installations"
    },
    {
      id: 2,
      title: "Overcurrent Protection and Protective Device Selection",
      icon: Zap,
      description: "Choosing and applying appropriate overcurrent protective devices"
    },
    {
      id: 3,
      title: "Disconnection Times and Fault Path Integrity",
      icon: Clock,
      description: "Understanding fault clearance requirements and protective conductor integrity"
    },
    {
      id: 4,
      title: "Residual Current Devices (RCDs) – Use and Placement",
      icon: CircuitBoard,
      description: "Application and positioning of RCDs including bidirectional protection requirements"
    },
    {
      id: 5,
      title: "Surge Protection Devices (SPDs) – When and Why",
      icon: Gauge,
      description: "Understanding surge protection requirements and device selection criteria"
    },
    {
      id: 6,
      title: "Arc Fault Detection Devices (AFDDs) – New Requirements",
      icon: Flame,
      description: "Latest requirements for arc fault detection including bidirectional systems"
    },
    {
      id: 7,
      title: "Bidirectional Protection Systems (Amendment 3)",
      icon: TrendingUp,
      description: "Comprehensive bidirectional protection requirements for renewable energy systems"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 4</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">7 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">60 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Protection for Safety
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Comprehensive safety protection methods and protective device requirements
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../bs7671-module-4-section-${section.id}`}
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

export default BS7671Module4;
