import { ArrowLeft, AlertTriangle, TrendingUp, Monitor, Zap, Shield, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const BMSModule6 = () => {
  const sections = [
    {
      id: 1,
      title: "Alarm Priorities and Escalation Logic",
      icon: AlertTriangle,
      description: "Alarm management and escalation procedures"
    },
    {
      id: 2,
      title: "Trend Logging and Historical Data Collection",
      icon: TrendingUp,
      description: "Data logging and historical analysis"
    },
    {
      id: 3,
      title: "BMS Dashboards and Visualisation Platforms",
      icon: Monitor,
      description: "User interfaces and data visualization"
    },
    {
      id: 4,
      title: "Event Triggers and Auto-Reporting",
      icon: Zap,
      description: "Automated reporting and event handling"
    },
    {
      id: 5,
      title: "Integration with Fire Panels, Emergency Shutdowns",
      icon: Shield,
      description: "Safety system integration"
    },
    {
      id: 6,
      title: "Remote Monitoring and Fault Alerts",
      icon: Smartphone,
      description: "Remote access and notification systems"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 6</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">45 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Alarms, Monitoring, and Data Logging
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            System monitoring, alarms, and data management
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../bms-module-6-section-${section.id}`}
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

export default BMSModule6;
