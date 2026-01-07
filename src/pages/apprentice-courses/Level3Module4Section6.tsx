import { ArrowLeft, Users, Clock, Calculator, Award, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "6.1",
    title: "Communication with Clients/Customers",
    description: "Effective communication skills for explaining faults and remedial work to clients",
    icon: Users,
    href: "../level3-module4-section6-1",
  },
  {
    number: "6.2",
    title: "Working Under Pressure and Meeting Deadlines",
    description: "Managing time effectively and working efficiently under pressure situations",
    icon: Clock,
    href: "../level3-module4-section6-2",
  },
  {
    number: "6.3",
    title: "Costing and Explaining Remedial Work",
    description: "Accurately costing repairs and clearly explaining work requirements to customers",
    icon: Calculator,
    href: "../level3-module4-section6-3",
  },
  {
    number: "6.4",
    title: "Maintaining Professional Standards and Accountability",
    description: "Professional conduct, accountability and maintaining high standards in fault work",
    icon: Award,
    href: "../level3-module4-section6-4",
  },
];

const Level3Module4Section6 = () => {
  useSEO(
    "Section 6: Professional Practice in Fault Work - Level 3 Module 4",
    "Client communication, working under pressure, costing and professional standards"
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Section 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Professional Practice in Fault Work
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Develop professional skills for effective client communication, time management and maintaining high standards
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers professional practice in fault work including client communication,
              working under pressure, costing and explaining remedial work,
              and maintaining professional standards and accountability.
            </p>
          </div>
        </section>

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Subsections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
  );
};

export default Level3Module4Section6;
