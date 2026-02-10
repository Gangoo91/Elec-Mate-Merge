import { ArrowLeft, Wind, Droplets, Volume2, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Air Quality & Dust Control",
    icon: Wind,
    description:
      "Sources of airborne pollution on construction sites, dust suppression methods, monitoring air quality, and legal requirements under the Clean Air Act",
  },
  {
    id: 2,
    title: "Water Pollution Prevention",
    icon: Droplets,
    description:
      "Preventing pollutants from entering watercourses, containment of oils and chemicals, silt management, and incident response for water pollution events",
  },
  {
    id: 3,
    title: "Noise & Vibration Control",
    icon: Volume2,
    description:
      "Understanding noise and vibration impacts on workers and neighbours, Control of Noise at Work Regulations, best practicable means, and Section 61 consents",
  },
  {
    id: 4,
    title: "Land Contamination & Remediation",
    icon: Layers,
    description:
      "Identifying contaminated land, the polluter-pays principle, remediation strategies, and legal responsibilities under Part 2A of the Environmental Protection Act",
  },
];

export default function EnvironmentalSustainabilityModule4() {
  useSEO({
    title: "Module 4: Pollution Prevention | Environmental & Sustainability",
    description:
      "Learn about air quality and dust control, water pollution prevention, noise and vibration management, and land contamination remediation.",
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
              <span className="text-emerald-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Pollution Prevention
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Learn how to control dust and maintain air quality, prevent water pollution from
              construction activities, manage noise and vibration impacts, and understand your
              responsibilities for contaminated land and remediation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../environmental-sustainability-module-4-section-${section.id}`}
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
