import { ArrowLeft, MessageCircle, FileText, Users, AlertTriangle, Presentation, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "3.1",
    title: "Effective Communication with Clients and Colleagues",
    description: "Developing clear and professional communication skills for workplace interactions",
    icon: MessageCircle,
    href: "../level3-module7-section3-1",
  },
  {
    number: "3.2",
    title: "Technical Reporting and Documentation Skills",
    description: "Creating clear technical reports and maintaining professional documentation",
    icon: FileText,
    href: "../level3-module7-section3-2",
  },
  {
    number: "3.3",
    title: "Working with Other Trades and Coordination on Site",
    description: "Collaborative working practices and effective coordination with other trades",
    icon: Users,
    href: "../level3-module7-section3-3",
  },
  {
    number: "3.4",
    title: "Conflict Resolution and Problem-solving",
    description: "Techniques for resolving conflicts and solving problems in the workplace",
    icon: AlertTriangle,
    href: "../level3-module7-section3-4",
  },
  {
    number: "3.5",
    title: "Presentation of Technical Information",
    description: "Skills for presenting technical information clearly to different audiences",
    icon: Presentation,
    href: "../level3-module7-section3-5",
  },
];

const Level3Module7Section3 = () => {
  useSEO(
    "Section 3: Communication and Teamworking - Level 3 Module 7",
    "Effective communication skills and collaborative working practices"
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
            <Link to="/study-centre/apprentice/level3-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
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

export default Level3Module7Section3;
