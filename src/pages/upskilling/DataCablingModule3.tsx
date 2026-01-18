import { ArrowLeft, Lightbulb, Shield, Cpu, Route, TrendingUp, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const DataCablingModule3 = () => {
  const sections = [
    {
      id: 1,
      title: "Fibre Types: Singlemode vs Multimode",
      icon: Lightbulb,
      description: "Different fibre optic cable types and applications"
    },
    {
      id: 2,
      title: "Connector Types and Polish Grades (LC, SC, ST)",
      icon: Shield,
      description: "Fibre optic connector types and polishing standards"
    },
    {
      id: 3,
      title: "Cleaving, Splicing, and Connectorisation",
      icon: Cpu,
      description: "Fibre preparation and termination techniques"
    },
    {
      id: 4,
      title: "Loss Budgets and OTDR Basics",
      icon: Route,
      description: "Optical loss calculations and testing methods"
    },
    {
      id: 5,
      title: "Bending Radius and Fibre Routing",
      icon: TrendingUp,
      description: "Installation guidelines and physical constraints"
    },
    {
      id: 6,
      title: "Fibre Safety and Cleaning",
      icon: TestTube,
      description: "Safety procedures and maintenance practices"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 3</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">60 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Fibre Optics: Types, Termination, and Testing
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Fibre optic systems, installation, and testing procedures
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../data-cabling-module-3-section-${section.id}`}
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

export default DataCablingModule3;
