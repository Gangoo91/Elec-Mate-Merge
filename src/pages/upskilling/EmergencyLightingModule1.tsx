import { ArrowLeft, BookOpen, Scale, MapPin, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const EmergencyLightingModule1 = () => {
  const sections = [
    {
      id: 1,
      title: "Purpose and Legal Framework",
      icon: Scale,
      description: "Legal requirements and regulatory framework"
    },
    {
      id: 2,
      title: "Locations Where Emergency Lighting is Required",
      icon: MapPin,
      description: "Building types and mandatory installation areas"
    },
    {
      id: 3,
      title: "Types of Emergency Lighting Systems",
      icon: BookOpen,
      description: "System categories and configuration options"
    },
    {
      id: 4,
      title: "Overview of BS 5266 and Related Standards",
      icon: FileCheck,
      description: "Key standards and compliance requirements"
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
            <Link to="/electrician/upskilling/emergency-lighting-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Emergency Lighting Course
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
            <span className="text-white/60 text-xs">4 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">40 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Introduction to Emergency Lighting
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Purpose, legal framework, and system fundamentals
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../emergency-lighting-module-1-section-${section.id}`}
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

export default EmergencyLightingModule1;
