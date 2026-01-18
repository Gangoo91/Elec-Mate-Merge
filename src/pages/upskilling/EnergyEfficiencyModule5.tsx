import { ArrowLeft, Gauge, BarChart, AlertTriangle, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const EnergyEfficiencyModule5 = () => {
  const sections = [
    {
      id: 1,
      title: "Sub-Metering Installation Strategy",
      icon: Gauge,
      description: "Strategic placement and installation of sub-meters"
    },
    {
      id: 2,
      title: "Energy Dashboards and Cloud Portals",
      icon: BarChart,
      description: "Creating and managing energy monitoring dashboards"
    },
    {
      id: 3,
      title: "Fault Alerts and Event Logging",
      icon: AlertTriangle,
      description: "Setting up automated alerts and event tracking"
    },
    {
      id: 4,
      title: "Remote Control and Load Shedding",
      icon: Settings,
      description: "Implementing remote control and demand management"
    },
    {
      id: 5,
      title: "Cybersecurity in Energy Systems",
      icon: Shield,
      description: "Securing energy monitoring and control systems"
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
            <Link to="/study-centre/upskilling/energy-efficiency-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Energy Efficiency Course
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 5</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">5 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">55 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Monitoring, Analytics, and Smart Metering
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Advanced monitoring systems and data analytics for energy management
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../energy-efficiency-module-5-section-${section.id}`}
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

export default EnergyEfficiencyModule5;
