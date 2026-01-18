import { ArrowLeft, Zap, MapPin, Calculator, Building, Layers, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const RenewableEnergyModule2 = () => {
  const sections = [
    {
      id: 1,
      title: "PV Panel Types (Monocrystalline, Poly, Thin Film)",
      icon: Layers,
      description: "Understanding different photovoltaic panel technologies and their characteristics"
    },
    {
      id: 2,
      title: "Site Assessment: Orientation, Shading, and Irradiance",
      icon: MapPin,
      description: "Evaluating site conditions for optimal solar PV system performance"
    },
    {
      id: 3,
      title: "String Design, Voltage Matching & Panel Sizing",
      icon: Calculator,
      description: "Designing solar panel strings and matching system voltages"
    },
    {
      id: 4,
      title: "Mounting Systems and Structural Considerations",
      icon: Building,
      description: "Roof and ground mounting systems with structural analysis"
    },
    {
      id: 5,
      title: "PV System Layouts: DC Side, AC Side, and Isolation",
      icon: Zap,
      description: "Understanding DC and AC system layouts with isolation requirements"
    },
    {
      id: 6,
      title: "Typical Single-Line Diagrams and Component Flow",
      icon: FileText,
      description: "Creating and interpreting solar PV system diagrams"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 2</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">60 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Solar PV System Design and Operation
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Comprehensive guide to designing and operating solar photovoltaic systems
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../renewable-energy-module-2-section-${section.id}`}
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

export default RenewableEnergyModule2;
