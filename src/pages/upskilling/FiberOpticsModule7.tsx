import { ArrowLeft, AlertTriangle, Droplets, Wrench, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const FiberOpticsModule7 = () => {
  const sections = [
    {
      id: 1,
      title: "Common Fibre Faults and Symptoms",
      icon: AlertTriangle,
      description: "Identifying typical fiber optic issues"
    },
    {
      id: 2,
      title: "End-Face Contamination and Cleaning",
      icon: Droplets,
      description: "Connector cleaning and maintenance procedures"
    },
    {
      id: 3,
      title: "Troubleshooting Tools and OTDR Use",
      icon: Wrench,
      description: "Diagnostic equipment and fault location techniques"
    },
    {
      id: 4,
      title: "Fibre Record-Keeping",
      icon: FileText,
      description: "Documentation and maintenance records"
    },
    {
      id: 5,
      title: "Upgrade Planning and Network Expansion",
      icon: TrendingUp,
      description: "Future-proofing and capacity planning"
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
            <Link to="/study-centre/upskilling/fiber-optics-course">
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 7</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">5 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">55 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Fault Finding, Maintenance, and Upgrades
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Troubleshooting, maintenance, and network expansion strategies
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../fiber-optics-module-7-section-${section.id}`}
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

export default FiberOpticsModule7;
