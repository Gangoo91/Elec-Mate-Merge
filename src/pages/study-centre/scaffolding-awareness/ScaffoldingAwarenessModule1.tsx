import { ArrowLeft, Construction, Layers, Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "What Is Scaffolding?",
    icon: Construction,
    description:
      "Temporary structures providing access and working platforms for construction, maintenance, and repair at height",
  },
  {
    id: 2,
    title: "Types of Scaffolding",
    icon: Layers,
    description:
      "Independent, putlog, system, mobile towers, cantilever, suspended, and birdcage scaffolds and when each is used",
  },
  {
    id: 3,
    title: "Scaffold Terminology",
    icon: Building2,
    description:
      "Standards, ledgers, transoms, braces, putlogs, guard rails, toe boards, sole boards, base plates, and couplers",
  },
  {
    id: 4,
    title: "Who Does What?",
    icon: Users,
    description:
      "Scaffolders (CISRS), scaffold inspectors, users, designers, and the competent person role",
  },
];

export default function ScaffoldingAwarenessModule1() {
  useSEO({
    title: "Module 1: Introduction to Scaffolding | Scaffolding Awareness",
    description:
      "Learn about scaffolding types, terminology, components, and the roles of scaffolders, inspectors, and competent persons.",
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
              <Link to="../scaffolding-awareness-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Scaffolding Awareness
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3">
              <span className="text-slate-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Introduction to Scaffolding
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand what scaffolding is and why it is essential, explore the different types of
              scaffold used on construction sites, learn the key terminology, and discover the roles
              and responsibilities of everyone involved.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../scaffolding-awareness-module-1-section-${section.id}`}
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
