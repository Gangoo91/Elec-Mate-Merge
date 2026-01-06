import { ArrowLeft, FileText, TrendingUp, MessageSquare, Search, BarChart3, Heart } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "5.1",
    title: "Accident & incident reporting procedures",
    description: "Formal procedures for documenting and reporting workplace accidents and incidents",
    icon: FileText,
    href: "../level3-module1-section5-1",
  },
  {
    number: "5.2", 
    title: "Near-miss reporting and safety culture",
    description: "Importance of near-miss reporting in developing positive safety culture",
    icon: TrendingUp,
    href: "../level3-module1-section5-2",
  },
  {
    number: "5.3",
    title: "Toolbox talks and site inductions", 
    description: "Delivering effective safety briefings and comprehensive site inductions",
    icon: MessageSquare,
    href: "../level3-module1-section5-3",
  },
  {
    number: "5.4",
    title: "Safety audits and inspections",
    description: "Conducting systematic safety audits and workplace inspections",
    icon: Search,
    href: "../level3-module1-section5-4",
  },
  {
    number: "5.5",
    title: "Monitoring & continual improvement (HSE guidance, ISO 45001 links)",
    description: "Performance monitoring and continuous improvement of safety management systems",
    icon: BarChart3,
    href: "../level3-module1-section5-5",
  },
  {
    number: "5.6", 
    title: "Emergency planning and first aid provision",
    description: "Emergency response planning and workplace first aid requirements",
    icon: Heart,
    href: "../level3-module1-section5-6",
  },
];

const Level3Module1Section5 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 5: Safety Management Systems
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Development and implementation of comprehensive safety management systems
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

export default Level3Module1Section5;