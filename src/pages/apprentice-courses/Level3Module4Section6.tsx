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
            <Link to="/study-centre/apprentice/level3-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        

        

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

export default Level3Module4Section6;
