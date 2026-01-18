import { ArrowLeft, MapPin, Car, TreePine, Building, Factory, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const BS7671Module7 = () => {
  const sections = [
    {
      id: 1,
      title: "Locations Requiring Additional Precautions (Bathrooms, Pools)",
      icon: MapPin,
      description: "Special safety requirements for wet and hazardous locations"
    },
    {
      id: 2,
      title: "Electric Vehicle Charging Installations (Part 722)",
      icon: Car,
      description: "Requirements for EV charging point installations and associated electrical systems"
    },
    {
      id: 3,
      title: "Outdoor and Agricultural Installations",
      icon: TreePine,
      description: "Electrical installations in agricultural and horticultural premises"
    },
    {
      id: 4,
      title: "Medical, Commercial, and Industrial Locations",
      icon: Building,
      description: "Specific requirements for healthcare facilities, commercial, and industrial premises"
    },
    {
      id: 5,
      title: "Introduction to Prosumer Electrical Installations (Part 8)",
      icon: Factory,
      description: "New requirements for prosumer electrical installations and energy storage"
    },
    {
      id: 6,
      title: "Amendment 2 Highlights",
      icon: Lightbulb,
      description: "Key changes and updates introduced in the latest amendment"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 7</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">50 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Special Installations & Locations
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Requirements for special locations and installations with unique safety considerations
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../bs7671-module-7-section-${section.id}`}
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

export default BS7671Module7;
