import { ArrowLeft, Layers, Building2, Wrench, ShieldCheck, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    sectionNumber: 1,
    title: "Types of Mobile Access Towers",
    description: "Standard aluminium, GRP/fibreglass, single-width, double-width, stairwell, and folding towers",
    icon: Building2,
    link: "../ipaf-module-2-section-1",
  },
  {
    sectionNumber: 2,
    title: "Components & Terminology",
    description: "Frames, braces, platforms, guardrails, toeboards, stabilisers, outriggers, castors, and base plates",
    icon: Wrench,
    link: "../ipaf-module-2-section-2",
  },
  {
    sectionNumber: 3,
    title: "Stability & Safe Working Loads",
    description: "275kg per platform, wind limits, lateral forces, manufacturer instructions, and the 3:1 ratio myth",
    icon: ShieldCheck,
    link: "../ipaf-module-2-section-3",
  },
  {
    sectionNumber: 4,
    title: "Selecting the Right Tower",
    description: "Matching tower type to task — indoor vs outdoor, height, load, width, and access requirements",
    icon: Target,
    link: "../ipaf-module-2-section-4",
  },
];

export default function IpafModule2() {
  useSEO({
    title: "Module 2: Tower Types & Components | IPAF Mobile Scaffold Training",
    description: "Learn about different mobile access tower types, components, stability principles, safe working loads, and how to select the right tower for the job.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <header className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm px-4 sm:px-8 lg:px-12 pt-6 pb-4">
        <div className="max-w-4xl mx-auto">
          <Link to="../ipaf-course">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground transition-colors p-0 h-auto touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to IPAF Course
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-4 sm:px-8 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/20">
                <Layers className="h-6 w-6 text-elec-yellow" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20">
                MODULE 2
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Tower Types & Components
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Understand the different types of mobile access towers, their components, stability principles, and how to select the right tower for the job
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.sectionNumber}
                to={section.link}
                sectionNumber={section.sectionNumber}
                title={section.title}
                description={section.description}
                icon={section.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
