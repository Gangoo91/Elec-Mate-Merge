import { ArrowLeft, FileText, TrendingUp, MessageSquare, Search, BarChart3, Heart, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

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
  useSEO(
    "Section 5: Safety Management Systems - Level 3 Module 1",
    "Development and implementation of comprehensive safety management systems"
  );

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
            <Link to="../level3-module1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
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
            Safety Management Systems
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Development and implementation of comprehensive safety management systems
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers the development and implementation of safety management systems including
              accident and incident reporting, near-miss reporting, toolbox talks, site inductions,
              safety audits, continuous improvement processes, and emergency planning with first aid provision.
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

export default Level3Module1Section5;
