import { ArrowLeft, TreePine, Search, Award, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Protected Species & Habitats",
    icon: TreePine,
    description:
      "UK protected species (bats, great crested newts, badgers), the Wildlife and Countryside Act 1981, and your legal obligations when working near habitats",
  },
  {
    id: 2,
    title: "Ecological Surveys & Assessments",
    icon: Search,
    description:
      "When ecological surveys are required, types of survey (Phase 1 habitat, protected species), seasonal constraints, and working with ecologists",
  },
  {
    id: 3,
    title: "BREEAM & Green Building Standards",
    icon: Award,
    description:
      "How BREEAM certification works, the rating categories, how electrical installations contribute to credits, and other green building standards",
  },
  {
    id: 4,
    title: "Environmental Management Systems",
    icon: Settings,
    description:
      "ISO 14001 framework, plan-do-check-act cycle, environmental policy development, auditing, and continuous improvement in environmental performance",
  },
];

export default function EnvironmentalSustainabilityModule5() {
  useSEO({
    title: "Module 5: Biodiversity & Best Practice | Environmental & Sustainability",
    description:
      "Learn about protected species and habitats, ecological surveys, BREEAM green building standards, and environmental management systems.",
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
              <span className="text-emerald-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Biodiversity &amp; Best Practice
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand your legal obligations around protected species and habitats, learn when
              ecological surveys are needed, explore BREEAM and green building standards, and
              discover how environmental management systems drive continuous improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../environmental-sustainability-module-5-section-${section.id}`}
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
