import { ArrowLeft, FlaskConical, AlertTriangle, Volume2, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "COSHH Essentials",
    icon: FlaskConical,
    description:
      "COSHH Regulations 2002, safety data sheets, COSHH assessment, exposure controls, and health surveillance",
  },
  {
    id: 2,
    title: "Asbestos Awareness",
    icon: AlertTriangle,
    description:
      "Asbestos types, where found, health effects, duty to manage, and what to do if you discover suspected asbestos",
  },
  {
    id: 3,
    title: "Noise & Vibration",
    icon: Volume2,
    description:
      "Noise exposure limits, hearing protection, audiometry, hand-arm vibration syndrome, and exposure action values",
  },
  {
    id: 4,
    title: "Environmental Protection",
    icon: Leaf,
    description:
      "Waste management, water pollution prevention, dust and emission controls, and sustainable site practices",
  },
];

export default function CscsCardModule4() {
  useSEO({
    title: "Module 4: Hazardous Substances & Environmental | CSCS Card Preparation",
    description:
      "Learn about COSHH, asbestos awareness, noise and vibration exposure, and environmental protection for the CSCS HS&E test.",
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
              <Link to="../cscs-card-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to CSCS Card Preparation
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3">
              <span className="text-green-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Hazardous Substances &amp; Environmental
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand COSHH essentials, asbestos awareness duties, noise and vibration exposure
              limits, and environmental protection responsibilities on construction sites.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cscs-card-module-4-section-${section.id}`}
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
