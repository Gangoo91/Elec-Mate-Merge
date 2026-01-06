import { ArrowLeft, MessageCircle, FileText, Users, AlertTriangle, Presentation } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "3.1",
    title: "Effective Communication with Clients and Colleagues",
    description: "Developing clear and professional communication skills for workplace interactions",
    icon: MessageCircle,
    href: "../level3-module7-section3-3-1",
  },
  {
    number: "3.2", 
    title: "Technical Reporting and Documentation Skills",
    description: "Creating clear technical reports and maintaining professional documentation",
    icon: FileText,
    href: "../level3-module7-section3-3-2",
  },
  {
    number: "3.3",
    title: "Working with Other Trades and Coordination on Site",
    description: "Collaborative working practices and effective coordination with other trades",
    icon: Users,
    href: "../level3-module7-section3-3-3",
  },
  {
    number: "3.4",
    title: "Conflict Resolution and Problem-solving",
    description: "Techniques for resolving conflicts and solving problems in the workplace",
    icon: AlertTriangle,
    href: "../level3-module7-section3-3-4",
  },
  {
    number: "3.5",
    title: "Presentation of Technical Information",
    description: "Skills for presenting technical information clearly to different audiences",
    icon: Presentation,
    href: "../level3-module7-section3-3-5",
  },
];

const Level3Module7Section3 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 3 - Communication and Teamworking
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Effective communication skills and collaborative working practices
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

export default Level3Module7Section3;