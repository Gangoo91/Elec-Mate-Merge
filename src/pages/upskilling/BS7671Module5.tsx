import { ArrowLeft, Settings, Cable, Package, Power, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const BS7671Module5 = () => {
  const sections = [
    {
      id: 1,
      title: "Equipment Ratings and Suitability for Purpose",
      icon: Settings,
      description: "Selecting equipment including enhanced consumer units for renewable energy systems"
    },
    {
      id: 2,
      title: "Cable Types, Sizing, Grouping, and Routing",
      icon: Cable,
      description: "Cable selection, current-carrying capacity calculations, and installation methods"
    },
    {
      id: 3,
      title: "Containment Systems and Mechanical Protection",
      icon: Package,
      description: "Cable management systems and protection against mechanical damage"
    },
    {
      id: 4,
      title: "Isolation, Switching, and Emergency Controls",
      icon: Power,
      description: "Requirements for isolation devices, switching arrangements, and emergency stopping"
    },
    {
      id: 5,
      title: "Grid Interaction and Anti-Islanding Protection",
      icon: ShieldCheck,
      description: "Grid interaction safety measures and anti-islanding protection for renewable energy"
    },
    {
      id: 6,
      title: "Environmental Protection (IP Ratings, Fire Resistance)",
      icon: Package,
      description: "Protection against environmental influences and fire safety requirements"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 5</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">65 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Selection & Erection of Equipment
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Equipment selection criteria, installation methods, and protection requirements
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../bs7671-module-5-section-${section.id}`}
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

export default BS7671Module5;
