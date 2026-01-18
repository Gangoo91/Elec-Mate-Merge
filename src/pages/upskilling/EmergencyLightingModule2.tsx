import { ArrowLeft, Shield, Eye, Target, Settings, MapPin, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const EmergencyLightingModule2 = () => {
  const sections = [
    {
      id: 1,
      title: "Emergency Escape Lighting",
      icon: Shield,
      description: "Exit route and escape path lighting requirements"
    },
    {
      id: 2,
      title: "Open Area (Anti-Panic) Lighting",
      icon: Eye,
      description: "General area lighting to prevent panic"
    },
    {
      id: 3,
      title: "High-Risk Task Area Lighting",
      icon: Target,
      description: "Specialist lighting for critical operations"
    },
    {
      id: 4,
      title: "Maintained vs Non-Maintained Systems",
      icon: Settings,
      description: "System operation modes and configurations"
    },
    {
      id: 5,
      title: "Signage and Wayfinding Lighting",
      icon: MapPin,
      description: "Directional and informational lighting systems"
    },
    {
      id: 6,
      title: "System Testing and Record Keeping",
      icon: ClipboardCheck,
      description: "Testing schedules, maintenance requirements and compliance documentation"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 2</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">45 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            System Categories and Lighting Types
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding different emergency lighting categories and applications
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../emergency-lighting-module-2-section-${section.id}`}
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

export default EmergencyLightingModule2;
