import { ArrowLeft, Award, FileText, ClipboardList, Monitor, Scale, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "5.1",
    title: "Electrical Installation Certificate (EIC)",
    description: "Understanding and completing Electrical Installation Certificates",
    icon: Award,
    href: "../level3-module5-section5-1",
  },
  {
    number: "5.2",
    title: "Minor Electrical Installation Works Certificate",
    description: "When and how to use Minor Electrical Installation Works Certificates",
    icon: FileText,
    href: "../level3-module5-section5-2",
  },
  {
    number: "5.3",
    title: "Schedule of Inspections and Test Results",
    description: "Completing schedules of inspections and test results accurately",
    icon: ClipboardList,
    href: "../level3-module5-section5-3",
  },
  {
    number: "5.4",
    title: "Electronic vs Paper Certification Systems",
    description: "Understanding different certification systems and their requirements",
    icon: Monitor,
    href: "../level3-module5-section5-4",
  },
  {
    number: "5.5",
    title: "Legal Responsibilities and Record Keeping",
    description: "Legal obligations for certification and proper record keeping requirements",
    icon: Scale,
    href: "../level3-module5-section5-5",
  },
];

const Level3Module5Section5 = () => {
  useSEO(
    "Section 5: Certification and Reporting - Level 3 Module 5",
    "Certification requirements, documentation and legal responsibilities for electrical work"
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
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
            <span>Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Certification and Reporting
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Certification requirements, documentation and legal responsibilities for electrical work
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers certification and reporting including EICs,
              Minor Works Certificates, schedules of inspection and test results,
              certification systems, and legal responsibilities.
            </p>
          </div>
        </section>

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Subsections</h2>
          <div className="grid grid-cols-1 gap-4">
            {subsections.map((subsection, index) => (
              <ModuleCard
                key={index}
                number={subsection.number}
                title={subsection.title}
                description={subsection.description}
                icon={subsection.icon}
                href={subsection.href}
              />
            ))}
          </div>
        </section>
        </div>
      </div>
    </div>
  );
};

export default Level3Module5Section5;
