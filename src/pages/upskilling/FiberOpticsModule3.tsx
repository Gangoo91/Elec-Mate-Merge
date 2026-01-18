import { ArrowLeft, Cable, RotateCcw, Route, Package, Flame, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const FiberOpticsModule3 = () => {
  const sections = [
    {
      id: 1,
      title: "Fibre Cable Types: Indoor, Outdoor, Armoured",
      icon: Cable,
      description: "Cable construction types and environmental considerations"
    },
    {
      id: 2,
      title: "Bend Radius and Handling Precautions",
      icon: RotateCcw,
      description: "Proper handling techniques and bend radius limits"
    },
    {
      id: 3,
      title: "Routing and Containment (Tray, Conduit, Basket)",
      icon: Route,
      description: "Cable routing methods and containment systems"
    },
    {
      id: 4,
      title: "Splice Enclosure Mounting",
      icon: Package,
      description: "Splice closure installation and mounting techniques"
    },
    {
      id: 5,
      title: "Firestop and Penetration Rules",
      icon: Flame,
      description: "Fire safety requirements and building penetrations"
    },
    {
      id: 6,
      title: "Earthing and Segregation",
      icon: Zap,
      description: "Grounding requirements and cable segregation"
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
            <Link to="/electrician/upskilling/fiber-optics-course">
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 3</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">55 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Fibre Optic Cables and Installation
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Cable types, installation methods, and safety requirements
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../fiber-optics-module-3-section-${section.id}`}
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

export default FiberOpticsModule3;
