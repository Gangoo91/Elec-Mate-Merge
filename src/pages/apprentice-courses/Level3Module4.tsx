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
            <Link to="../level3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 3
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
            <span>Module 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fault Diagnosis and Rectification
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Advanced fault finding techniques and systematic problem-solving methods for electrical installations
          </p>
        </header>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {learningOutcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Sections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Module Sections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
  );
};

export default Level3Module4;
