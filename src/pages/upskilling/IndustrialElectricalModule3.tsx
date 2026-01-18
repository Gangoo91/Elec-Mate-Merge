import { ArrowLeft, PanelLeft, Layout, Tag, Thermometer, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const IndustrialElectricalModule3 = () => {
  const sections = [
    {
      id: 1,
      title: "Layout Planning for MCC and Control Panels",
      icon: Layout,
      description: "Motor control centre and panel layout design principles"
    },
    {
      id: 2,
      title: "Component Mounting and DIN Rail Organisation",
      icon: PanelLeft,
      description: "Component arrangement and DIN rail systems"
    },
    {
      id: 3,
      title: "Cable Termination and Ferrule ID",
      icon: Tag,
      description: "Cable termination techniques and identification methods"
    },
    {
      id: 4,
      title: "Panel Cooling and IP Ratings",
      icon: Thermometer,
      description: "Thermal management and ingress protection"
    },
    {
      id: 5,
      title: "Functional Testing and Documentation",
      icon: TestTube,
      description: "Testing procedures and documentation requirements"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 3</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">5 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">60 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Industrial Panel Assembly and Layout
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Panel design, component mounting, and assembly best practices
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../industrial-electrical-module-3-section-${section.id}`}
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

export default IndustrialElectricalModule3;
