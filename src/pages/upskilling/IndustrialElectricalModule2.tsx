import { ArrowLeft, Cog, CircuitBoard, Zap, AlertTriangle, RotateCcw, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const IndustrialElectricalModule2 = () => {
  const sections = [
    {
      id: 1,
      title: "Motor Types (DOL, Star-Delta, Soft Start, VSD)",
      icon: Cog,
      description: "Different motor starting methods and variable speed drives"
    },
    {
      id: 2,
      title: "Control Circuit Diagrams and Contactors",
      icon: CircuitBoard,
      description: "Control circuit design and contactor operation"
    },
    {
      id: 3,
      title: "Thermal Overloads and Fuses",
      icon: Zap,
      description: "Motor protection devices and sizing"
    },
    {
      id: 4,
      title: "Emergency Stop and Interlock Logic",
      icon: AlertTriangle,
      description: "Safety systems and interlock circuits"
    },
    {
      id: 5,
      title: "Forward/Reverse Control Wiring",
      icon: RotateCcw,
      description: "Bidirectional motor control circuits"
    },
    {
      id: 6,
      title: "Motor Commissioning and Load Testing",
      icon: TestTube,
      description: "Testing and commissioning procedures"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 2</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">65 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Motors, Starters, and Control Gear
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Motor control systems, protection, and starting methods
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../industrial-electrical-module-2-section-${section.id}`}
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

export default IndustrialElectricalModule2;
