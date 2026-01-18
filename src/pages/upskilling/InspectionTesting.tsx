import { ArrowLeft, BookOpen, Shield, Link2, Zap, CircleDot, FileCheck, ToggleRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const TITLE = "Inspection & Testing Course - Electrical Upskilling";
const DESCRIPTION = "Master electrical inspection and testing with our comprehensive BS 7671 compliant course. 8 modules covering safe isolation, continuity, insulation resistance, earth fault loop, RCD testing, and certification.";

const InspectionTesting = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const modules: Array<{
    id: number;
    title: string;
    description: string;
    duration: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }> = [
    {
      id: 1,
      title: "Introduction to Inspection & Testing",
      description: "Purpose, legal requirements, BS 7671 overview, test equipment and safety",
      duration: "45 mins",
      icon: BookOpen,
    },
    {
      id: 2,
      title: "Safe Isolation Procedures",
      description: "Isolation principles, lock-off/tag-out, proving dead, re-energisation",
      duration: "50 mins",
      icon: Shield,
    },
    {
      id: 3,
      title: "Continuity Testing",
      description: "R1+R2, ring final circuits, bonding conductors, measurement techniques",
      duration: "55 mins",
      icon: Link2,
    },
    {
      id: 4,
      title: "Insulation Resistance Testing",
      description: "Test voltages, procedures, SERDs, interpreting results, troubleshooting",
      duration: "55 mins",
      icon: Zap,
    },
    {
      id: 5,
      title: "Earth Fault Loop Impedance",
      description: "Zs and Ze testing, maximum values, PFC calculation, RCD circuits",
      duration: "60 mins",
      icon: CircleDot,
    },
    {
      id: 6,
      title: "RCD Testing",
      description: "RCD types, trip time testing, ramp testing, selective discrimination",
      duration: "45 mins",
      icon: FileCheck,
    },
    {
      id: 7,
      title: "Polarity & Functional Testing",
      description: "Polarity verification, three-phase rotation, switchgear operation",
      duration: "45 mins",
      icon: ToggleRight,
    },
    {
      id: 8,
      title: "Visual Inspection & Documentation",
      description: "Inspection checklists, EICs, PIRs, Minor Works certificates",
      duration: "50 mins",
      icon: Eye,
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
            <Link to="/electrician/upskilling">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Inspection & Testing
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Master electrical inspection and testing procedures to BS 7671
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={`../inspection-testing-module-${module.id}`}
              moduleNumber={module.id}
              title={module.title}
              description={module.description}
              duration={module.duration}
              icon={module.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InspectionTesting;
