import { ArrowLeft, Users, Clock, Calculator, Award } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "6.1",
    title: "Communication with Clients/Customers",
    description: "Effective communication skills for explaining faults and remedial work to clients",
    icon: Users,
    href: "../level3-module4-section6-6-1",
  },
  {
    number: "6.2", 
    title: "Working Under Pressure and Meeting Deadlines",
    description: "Managing time effectively and working efficiently under pressure situations",
    icon: Clock,
    href: "../level3-module4-section6-6-2",
  },
  {
    number: "6.3",
    title: "Costing and Explaining Remedial Work",
    description: "Accurately costing repairs and clearly explaining work requirements to customers",
    icon: Calculator,
    href: "../level3-module4-section6-6-3",
  },
  {
    number: "6.4",
    title: "Maintaining Professional Standards and Accountability",
    description: "Professional conduct, accountability and maintaining high standards in fault work",
    icon: Award,
    href: "../level3-module4-section6-6-4",
  },
];

const Level3Module4Section6 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 6 - Professional Practice in Fault Work
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Develop professional skills for effective client communication, time management and maintaining high standards
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

export default Level3Module4Section6;