import { ArrowLeft, Wrench, Layers, ArrowUpFromLine, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Tubes, Couplers & Fittings",
    icon: Wrench,
    description:
      "Steel tube specifications, coupler types (right-angle, swivel, putlog, sleeve), fitting methods, and torque requirements",
  },
  {
    id: 2,
    title: "Base Plates, Sole Boards & Foundations",
    icon: Layers,
    description:
      "Load-bearing requirements, sole board sizing, ground conditions, base plate positioning, and adjustable bases",
  },
  {
    id: 3,
    title: "Platforms, Guard Rails & Toe Boards",
    icon: ArrowUpFromLine,
    description:
      "Working platform widths, board types, board clips, guard rail heights (950mm), mid rails, toe boards (150mm), and brick guards",
  },
  {
    id: 4,
    title: "Bracing, Ties & Stability",
    icon: ShieldCheck,
    description:
      "Ledger bracing, plan bracing, facade bracing, tie patterns (box, lip, through), tie spacing, and why ties are critical",
  },
];

export default function ScaffoldingAwarenessModule3() {
  useSEO({
    title: "Module 3: Scaffold Components & Assembly | Scaffolding Awareness",
    description:
      "Learn about scaffold tubes, couplers, base plates, sole boards, platforms, guard rails, toe boards, bracing, and ties.",
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
              <span className="text-slate-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Scaffold Components & Assembly
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Explore the key components used in scaffold construction, from tubes and couplers to
              base plates and sole boards. Understand platform requirements, guard rail heights, toe
              board standards, and how bracing and ties ensure stability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../scaffolding-awareness-module-3-section-${section.id}`}
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
