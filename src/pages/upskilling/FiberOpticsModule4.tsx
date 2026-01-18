import { ArrowLeft, Wrench, Scissors, Settings, Link as LinkIcon, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const FiberOpticsModule4 = () => {
  const sections = [
    {
      id: 1,
      title: "Mechanical vs Fusion Splicing",
      icon: Wrench,
      description: "Comparing splicing methods and applications"
    },
    {
      id: 2,
      title: "Cleaving and Fibre Prep",
      icon: Scissors,
      description: "Fiber preparation and cleaving techniques"
    },
    {
      id: 3,
      title: "Splicing Equipment Overview",
      icon: Settings,
      description: "Tools and equipment for splicing operations"
    },
    {
      id: 4,
      title: "Connectorisation Techniques",
      icon: LinkIcon,
      description: "Field and factory connector installation methods"
    },
    {
      id: 5,
      title: "Inspection Microscopes and Cleaning Tools",
      icon: Eye,
      description: "Quality control and maintenance equipment"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 4</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">5 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">60 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Termination and Splicing Techniques
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Professional splicing and termination methods
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../fiber-optics-module-4-section-${section.id}`}
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

export default FiberOpticsModule4;
