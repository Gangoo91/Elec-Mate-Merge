import { ArrowLeft, ShieldCheck, Bell, Siren, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Fire Prevention Measures",
    icon: ShieldCheck,
    description:
      "Eliminating ignition sources, safe storage of flammable materials, hot work permits, electrical safety, and good housekeeping",
  },
  {
    id: 2,
    title: "Fire Detection Systems",
    icon: Bell,
    description:
      "Conventional, addressable, and analogue-addressable systems, detector types (smoke, heat, multi-sensor), BS 5839 categories L1-L5 and P1-P2",
  },
  {
    id: 3,
    title: "Fire Alarm Systems",
    icon: Siren,
    description:
      "Manual call points, alarm sounders, visual alarm devices, cause and effect, zoning, and false alarm management",
  },
  {
    id: 4,
    title: "Emergency Lighting",
    icon: Lightbulb,
    description:
      "BS 5266 requirements, maintained vs non-maintained, escape route lighting, open area lighting, testing and maintenance schedules",
  },
];

export default function FireSafetyModule3() {
  useSEO({
    title: "Module 3: Fire Prevention & Detection | Fire Safety & Fire Marshal",
    description:
      "Learn about fire prevention measures, detection systems, fire alarm systems, and emergency lighting requirements.",
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Fire Prevention & Detection
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Explore practical fire prevention measures, understand the types of fire detection and
              alarm systems including BS 5839 categories, and learn emergency lighting requirements
              under BS 5266.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../fire-safety-module-3-section-${section.id}`}
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
