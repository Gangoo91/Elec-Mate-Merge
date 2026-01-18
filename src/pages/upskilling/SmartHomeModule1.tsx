import { ArrowLeft, Home, Lightbulb, Cpu, Cloud, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const SmartHomeModule1 = () => {
  const sections = [
    {
      id: 1,
      title: "What is a Smart Home?",
      icon: Home,
      description: "Understanding the fundamentals of smart home technology"
    },
    {
      id: 2,
      title: "Benefits and Applications (Lighting, HVAC, Security, Accessibility)",
      icon: Lightbulb,
      description: "Exploring smart home applications across different systems"
    },
    {
      id: 3,
      title: "Core Components (Sensors, Actuators, Controllers)",
      icon: Cpu,
      description: "Understanding the essential hardware components"
    },
    {
      id: 4,
      title: "Smart Home Architectures: Local, Cloud, Hybrid",
      icon: Cloud,
      description: "Different architectural approaches and their benefits"
    },
    {
      id: 5,
      title: "System Types: Retrofit vs New Build",
      icon: Building,
      description: "Comparing installation approaches for different property types"
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
            <Link to="/study-centre/upskilling/smart-home-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Smart Home Course
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
            <span className="text-white/60 text-xs">5 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">40 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Introduction to Smart Home Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding the fundamentals of smart home technology and systems
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../smart-home-module-1-section-${section.id}`}
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

export default SmartHomeModule1;
