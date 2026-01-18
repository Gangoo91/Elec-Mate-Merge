import { ArrowLeft, FileText, Code, MapPin, Upload, CheckCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const BMSModule7 = () => {
  const sections = [
    {
      id: 1,
      title: "Design Phase: IO Lists, Schematics, Network Topology",
      icon: FileText,
      description: "System design documentation and planning"
    },
    {
      id: 2,
      title: "Programming Methods: Function Blocks, Boolean Logic, PID",
      icon: Code,
      description: "Control programming techniques"
    },
    {
      id: 3,
      title: "Addressing and Device Mapping",
      icon: MapPin,
      description: "Device configuration and network addressing"
    },
    {
      id: 4,
      title: "Software Upload and Controller Setup",
      icon: Upload,
      description: "System configuration and deployment"
    },
    {
      id: 5,
      title: "Pre-Functional and Functional Commissioning",
      icon: CheckCircle,
      description: "Testing and commissioning procedures"
    },
    {
      id: 6,
      title: "Client Handover and Documentation Requirements",
      icon: Users,
      description: "Project completion and handover"
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
            <Link to="/study-centre/upskilling/bms-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to BMS Course
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
            <span className="text-white/60 text-xs">75 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            BMS Design, Programming, and Commissioning
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Complete system design, programming, and commissioning
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../bms-module-7-section-${section.id}`}
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

export default BMSModule7;
