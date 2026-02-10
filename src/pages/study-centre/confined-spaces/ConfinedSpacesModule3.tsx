import { ArrowLeft, Wind, AlertTriangle, Activity, Fan } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Atmospheric Hazards",
    icon: Wind,
    description:
      "Oxygen depletion below 19.5%, oxygen enrichment above 23.5%, toxic gases including hydrogen sulphide, carbon monoxide, carbon dioxide and sulphur dioxide, and flammable gases such as methane and LPG",
  },
  {
    id: 2,
    title: "Non-Atmospheric Hazards",
    icon: AlertTriangle,
    description:
      "Engulfment and drowning, entrapment by converging walls or machinery, fire and explosion risks, electricity, extreme temperatures, noise, manual handling, and biological hazards",
  },
  {
    id: 3,
    title: "Gas Detection & Monitoring",
    icon: Activity,
    description:
      "Four-gas monitors and their sensors, bump testing and calibration procedures, continuous versus pre-entry monitoring strategies, and understanding alarm set points",
  },
  {
    id: 4,
    title: "Ventilation in Confined Spaces",
    icon: Fan,
    description:
      "Natural versus forced ventilation, positive and negative pressure configurations, air change rate calculations, ductwork placement, and monitoring the atmosphere during ventilation",
  },
];

export default function ConfinedSpacesModule3() {
  useSEO({
    title: "Module 3: Hazards & Atmospheric Monitoring | Confined Spaces Awareness",
    description:
      "Identify atmospheric and non-atmospheric hazards in confined spaces, learn gas detection techniques, and understand ventilation requirements.",
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
              <Link to="../confined-spaces-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Confined Spaces
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3">
              <span className="text-cyan-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Hazards & Atmospheric Monitoring
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Explore every hazard category found in confined spaces, from toxic and flammable
              atmospheres to physical dangers. Learn how four-gas monitors work and how to ventilate
              a space safely before and during entry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../confined-spaces-module-3-section-${section.id}`}
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
