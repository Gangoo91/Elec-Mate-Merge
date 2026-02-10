import { ArrowLeft, Flame, BookOpen, AlertTriangle, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "The Fire Triangle",
    icon: Flame,
    description:
      "The three elements required for combustion: heat, fuel, and oxygen. Remove any one element and the fire cannot sustain itself",
  },
  {
    id: 2,
    title: "Classes of Fire",
    icon: BookOpen,
    description:
      "Six classifications of fire (A through F) based on fuel type, from ordinary combustibles to cooking oils and fats",
  },
  {
    id: 3,
    title: "Fire Behaviour & Development",
    icon: AlertTriangle,
    description:
      "How fires grow through ignition, growth, flashover, full development, and decay phases, including backdraught and flashover risks",
  },
  {
    id: 4,
    title: "How Fires Start in the Workplace",
    icon: Zap,
    description:
      "Common ignition sources in electrical and construction work: hot works, faulty wiring, overloaded circuits, and poor housekeeping",
  },
];

export default function FireSafetyModule1() {
  useSEO({
    title: "Module 1: Understanding Fire | Fire Safety & Fire Marshal",
    description:
      "Learn about the fire triangle, classes of fire, fire behaviour and development, and common causes of workplace fires.",
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
              <Link to="../fire-safety-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Fire Safety
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <span className="text-rose-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Understanding Fire
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Learn the science behind fire, explore the six classes of fire, understand how fires
              develop and spread, and discover the common causes of fires in electrical and
              construction workplaces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../fire-safety-module-1-section-${section.id}`}
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
