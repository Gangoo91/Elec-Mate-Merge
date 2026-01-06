import { ArrowLeft, Award, FileText, ClipboardList, Monitor, Scale } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "5.1",
    title: "Electrical Installation Certificate (EIC)",
    description: "Understanding and completing Electrical Installation Certificates",
    icon: Award,
    href: "../level3-module5-section5-5-1",
  },
  {
    number: "5.2", 
    title: "Minor Electrical Installation Works Certificate",
    description: "When and how to use Minor Electrical Installation Works Certificates",
    icon: FileText,
    href: "../level3-module5-section5-5-2",
  },
  {
    number: "5.3",
    title: "Schedule of Inspections and Test Results",
    description: "Completing schedules of inspections and test results accurately",
    icon: ClipboardList,
    href: "../level3-module5-section5-5-3",
  },
  {
    number: "5.4",
    title: "Electronic vs Paper Certification Systems",
    description: "Understanding different certification systems and their requirements",
    icon: Monitor,
    href: "../level3-module5-section5-5-4",
  },
  {
    number: "5.5",
    title: "Legal Responsibilities and Record Keeping",
    description: "Legal obligations for certification and proper record keeping requirements",
    icon: Scale,
    href: "../level3-module5-section5-5-5",
  },
];

const Level3Module5Section5 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 5 - Certification and Reporting
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Certification requirements, documentation and legal responsibilities for electrical work
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  );
};

export default Level3Module5Section5;