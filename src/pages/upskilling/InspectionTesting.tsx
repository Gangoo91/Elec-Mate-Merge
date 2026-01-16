import { ArrowLeft, BookOpen, Shield, Link2, Zap, CircleDot, FileCheck, ToggleRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const TITLE = "Inspection & Testing Course - Electrical Upskilling";
const DESCRIPTION = "Master electrical inspection and testing with our comprehensive BS 7671 compliant course. 8 modules covering safe isolation, continuity, insulation resistance, earth fault loop, RCD testing, and certification.";

const InspectionTesting = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const modules = [
    {
      number: "Module 1",
      title: "Introduction to Inspection & Testing",
      description: "Purpose, legal requirements, BS 7671 overview, test equipment and safety",
      icon: BookOpen,
      href: "module-1",
    },
    {
      number: "Module 2",
      title: "Safe Isolation Procedures",
      description: "Isolation principles, lock-off/tag-out, proving dead, re-energisation",
      icon: Shield,
      href: "module-2",
    },
    {
      number: "Module 3",
      title: "Continuity Testing",
      description: "R1+R2, ring final circuits, bonding conductors, measurement techniques",
      icon: Link2,
      href: "module-3",
    },
    {
      number: "Module 4",
      title: "Insulation Resistance Testing",
      description: "Test voltages, procedures, SERDs, interpreting results, troubleshooting",
      icon: Zap,
      href: "module-4",
    },
    {
      number: "Module 5",
      title: "Earth Fault Loop Impedance",
      description: "Zs and Ze testing, maximum values, PFC calculation, RCD circuits",
      icon: CircleDot,
      href: "module-5",
    },
    {
      number: "Module 6",
      title: "RCD Testing",
      description: "RCD types, trip time testing, ramp testing, selective discrimination",
      icon: FileCheck,
      href: "module-6",
    },
    {
      number: "Module 7",
      title: "Polarity & Functional Testing",
      description: "Polarity verification, three-phase rotation, switchgear operation",
      icon: ToggleRight,
      href: "module-7",
    },
    {
      number: "Module 8",
      title: "Visual Inspection & Documentation",
      description: "Inspection checklists, EICs, PIRs, Minor Works certificates",
      icon: Eye,
      href: "module-8",
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Upskilling
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <Zap className="h-4 w-4" />
              <span>Inspection & Testing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Inspection & Testing Course
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto">
              Master electrical inspection and testing procedures to BS 7671. From safe isolation to certification documentation.
            </p>
          </header>

          {/* Modules Grid */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-6">Course Modules</h2>
            <div className="grid grid-cols-1 gap-4">
              {modules.map((module, index) => (
                <ModuleCard
                  key={index}
                  number={module.number}
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                  href={module.href}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InspectionTesting;
