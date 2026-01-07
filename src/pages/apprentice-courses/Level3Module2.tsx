import { ArrowLeft, FileText, Zap, Sun, Leaf, Settings, Recycle, CheckCircle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    number: "Section 1",
    title: "Environmental Legislation and Standards",
    description: "Environmental laws, regulations and standards affecting electrical installations",
    icon: FileText,
    href: "../level3-module2-section1",
  },
  {
    number: "Section 2",
    title: "Energy Efficiency in Electrical Installations",
    description: "Techniques and technologies for improving energy efficiency in electrical systems",
    icon: Zap,
    href: "../level3-module2-section2",
  },
  {
    number: "Section 3",
    title: "Renewable Energy Systems",
    description: "Solar, wind and other renewable energy technologies and their applications",
    icon: Sun,
    href: "../level3-module2-section3",
  },
  {
    number: "Section 4",
    title: "Low Carbon Technologies",
    description: "Carbon reduction technologies and their integration in building services",
    icon: Leaf,
    href: "../level3-module2-section4",
  },
  {
    number: "Section 5",
    title: "Integration with Electrical Installations",
    description: "Incorporating environmental technologies into conventional electrical systems",
    icon: Settings,
    href: "../level3-module2-section5",
  },
  {
    number: "Section 6",
    title: "Sustainable Working Practices",
    description: "Environmentally responsible working methods and waste management practices",
    icon: Recycle,
    href: "../level3-module2-section6",
  },
];

const learningOutcomes = [
  "Understand environmental legislation including Building Regulations Part L",
  "Apply energy efficiency principles to electrical installations",
  "Identify and evaluate renewable energy systems for buildings",
  "Understand low carbon technologies and their integration requirements",
  "Design electrical systems that incorporate environmental technologies",
  "Implement sustainable working practices and waste management",
];

const Level3Module2 = () => {
  useSEO(
    "Module 2: Environmental Technology - Level 3 Electrical Course",
    "Energy-efficient systems, renewable technologies and environmental compliance for electrical installations"
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
            <span>Module 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Environmental Technology Systems
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Energy-efficient systems, renewable technologies and environmental compliance
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

export default Level3Module2;
