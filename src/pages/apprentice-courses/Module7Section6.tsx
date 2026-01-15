import { ArrowLeft, FileText, ClipboardCheck, AlertTriangle, Wrench, TestTube } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Recording Observations and Test Findings Clearly",
    description: "Documenting fault diagnosis findings and test results",
    icon: FileText,
    href: "6-1"
  },
  {
    number: "Subsection 2",
    title: "Reporting Faults to Supervisors or Duty Holders",
    description: "Proper communication of fault conditions and findings",
    icon: ClipboardCheck,
    href: "6-2"
  },
  {
    number: "Subsection 3",
    title: "Temporary Isolation or Making Safe",
    description: "Emergency safety measures for dangerous fault conditions",
    icon: AlertTriangle,
    href: "6-3"
  },
  {
    number: "Subsection 4",
    title: "Rectifying Minor Faults Within Scope (Loose Connections, Miswiring)",
    description: "Simple fault repairs within Level 2 competence",
    icon: Wrench,
    href: "6-4"
  },
  {
    number: "Subsection 5",
    title: "Following Up with Re-Testing or Certification (Awareness)",
    description: "Understanding verification requirements after fault repair",
    icon: TestTube,
    href: "6-5"
  }
];

const Section6 = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Recording, Reporting, and Rectifying Faults
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Documentation and remedial procedures for electrical faults
            </p>
          </header>

          {/* Subsections Grid */}
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
        </div>
      </div>
    </div>
  );
};

export default Section6;
