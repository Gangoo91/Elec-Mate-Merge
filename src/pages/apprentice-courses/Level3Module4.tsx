import { ArrowLeft, Search, Wrench, AlertTriangle, Target, CheckCircle, Users, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    number: "Section 1",
    title: "Principles of Fault Diagnosis",
    description: "Types of faults, symptoms, diagnostic sequence, safety considerations and documentation",
    icon: Search,
    href: "../level3-module4-section1",
  },
  {
    number: "Section 2",
    title: "Diagnostic Tools and Equipment",
    description: "Multimeters, testers, clamp meters, thermal imaging and safe instrument use",
    icon: Wrench,
    href: "../level3-module4-section2",
  },
  {
    number: "Section 3",
    title: "Common Faults in Electrical Systems",
    description: "Ring/radial circuits, lighting, protective devices, earthing and equipment faults",
    icon: AlertTriangle,
    href: "../level3-module4-section3",
  },
  {
    number: "Section 4",
    title: "Systematic Fault-Finding Techniques",
    description: "Visual inspection, testing procedures, polarity checks and functional testing",
    icon: Target,
    href: "../level3-module4-section4",
  },
  {
    number: "Section 5",
    title: "Rectification and Verification",
    description: "Repair methods, BS7671 compliance, recording works and preventative maintenance",
    icon: CheckCircle,
    href: "../level3-module4-section5",
  },
  {
    number: "Section 6",
    title: "Professional Practice in Fault Work",
    description: "Client communication, working under pressure, costing and professional standards",
    icon: Users,
    href: "../level3-module4-section6",
  },
];

const learningOutcomes = [
  "Apply systematic fault diagnosis principles and techniques",
  "Use diagnostic tools and equipment safely and effectively",
  "Identify and diagnose common faults in electrical systems",
  "Apply systematic fault-finding techniques methodically",
  "Rectify faults and verify compliance with BS7671",
  "Maintain professional standards in fault diagnosis work",
];

const Level3Module4 = () => {
  useSEO(
    "Module 4: Fault Diagnosis - Level 3 Electrical Course",
    "Advanced fault finding techniques and systematic problem-solving methods for electrical installations"
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
            <Link to="/study-centre/apprentice/level3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        

        

        

        {/* Sections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Module Sections</h2>
          <div className="grid grid-cols-1 gap-4">
            {sections.map((section, index) => (
              <ModuleCard
                key={index}
                number={section.number}
                title={section.title}
                description={section.description}
                icon={section.icon}
                href={section.href}
              />
            ))}
          </div>
        </section>
        </div>
      </div>
    </div>
  );
};

export default Level3Module4;
