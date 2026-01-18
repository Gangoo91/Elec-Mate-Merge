import { ArrowLeft, Shield, Cable, CheckCircle, TestTube, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const EVChargingModule6 = () => {
  const sections = [
    {
      id: 1,
      title: "Safe Installation: Isolation and Site Prep",
      icon: Shield,
      description: "Safety procedures and site preparation for installation"
    },
    {
      id: 2,
      title: "Cable Termination and Routing",
      icon: Cable,
      description: "Professional cable termination and routing practices"
    },
    {
      id: 3,
      title: "BS 7671 Part 722 Testing Procedure",
      icon: CheckCircle,
      description: "EV charging specific testing requirements and procedures"
    },
    {
      id: 4,
      title: "RCD and Functional Testing (Type A, B, EV-RCDs)",
      icon: TestTube,
      description: "Testing protective devices and EV-specific equipment"
    },
    {
      id: 5,
      title: "Customer Walkthrough and Labelling",
      icon: Users,
      description: "Customer handover procedures and system labelling"
    },
    {
      id: 6,
      title: "Certificate, Test Sheet, and Handover Pack",
      icon: FileText,
      description: "Completing documentation and customer handover"
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
            <Link to="/electrician/upskilling/ev-charging-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to EV Charging Course
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 6</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">60 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Installation, Inspection, and Testing Procedures
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Professional installation and testing practices for EV charging
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../ev-charging-module-6-section-${section.id}`}
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

export default EVChargingModule6;
