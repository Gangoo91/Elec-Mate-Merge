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

export default Level3Module2;
