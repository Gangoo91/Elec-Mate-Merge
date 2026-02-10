import { ArrowLeft, Globe, Scale, Search, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "What Is Environmental Management?",
    icon: Globe,
    description:
      "The principles of environmental management, how organisations identify and control their environmental impacts, and why it matters on construction sites",
  },
  {
    id: 2,
    title: "Key Environmental Legislation",
    icon: Scale,
    description:
      "The Environmental Protection Act 1990, Environment Act 2021, Clean Air Act, and other key legislation that governs environmental responsibilities on site",
  },
  {
    id: 3,
    title: "Environmental Impact Assessment",
    icon: Search,
    description:
      "How environmental impact assessments are carried out, when they are required, the screening and scoping process, and how findings influence project decisions",
  },
  {
    id: 4,
    title: "Sustainability Principles",
    icon: Lightbulb,
    description:
      "The three pillars of sustainability (environmental, social, economic), circular economy thinking, and how tradespeople contribute to sustainable construction",
  },
];

export default function EnvironmentalSustainabilityModule1() {
  useSEO({
    title: "Module 1: Environmental Awareness | Environmental & Sustainability",
    description:
      "Learn about environmental management principles, key legislation, impact assessments, and sustainability fundamentals.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../environmental-sustainability-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Environmental &amp; Sustainability
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3">
              <span className="text-emerald-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Environmental Awareness
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand the fundamentals of environmental management, explore the key legislation
              governing environmental responsibilities, learn how impact assessments are conducted,
              and discover the core principles of sustainability in construction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../environmental-sustainability-module-1-section-${section.id}`}
                sectionNumber={section.id}
                title={section.title}
                description={section.description}
                icon={section.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
