import { ArrowLeft, Wrench, CheckCircle, Wifi, Shield, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const SmartHomeModule7 = () => {
  const sections = [
    {
      id: 1,
      title: "Device Wiring, Power Supplies, and Containment",
      icon: Wrench,
      description: "Proper installation practices and electrical requirements"
    },
    {
      id: 2,
      title: "Commissioning and Device Pairing",
      icon: CheckCircle,
      description: "System commissioning procedures and device setup"
    },
    {
      id: 3,
      title: "Wi-Fi and RF Signal Verification",
      icon: Wifi,
      description: "Testing and optimising wireless communication"
    },
    {
      id: 4,
      title: "Electrical Safety and Isolation (BS 7671 Alignment)",
      icon: Shield,
      description: "Safety procedures aligned with UK electrical regulations"
    },
    {
      id: 5,
      title: "Customer Handover and App Training",
      icon: Users,
      description: "Training customers on system operation and mobile apps"
    },
    {
      id: 6,
      title: "Documentation, Warranty, and Aftercare",
      icon: FileText,
      description: "Completing installation records and ongoing support"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 7</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">50 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Installation, Testing, and Safety Requirements
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Professional installation practices and safety compliance
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../smart-home-module-7-section-${section.id}`}
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

export default SmartHomeModule7;
