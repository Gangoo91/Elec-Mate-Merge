import { ArrowLeft, Zap, CloudRain, Droplets, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Energy Use on Construction Sites",
    icon: Zap,
    description:
      "Common energy sources on site, how to monitor and measure energy consumption, and practical steps to reduce energy waste",
  },
  {
    id: 2,
    title: "Reducing Your Carbon Footprint",
    icon: CloudRain,
    description:
      "Understanding carbon emissions from construction activities, Scope 1, 2, and 3 emissions, and strategies for carbon reduction on site",
  },
  {
    id: 3,
    title: "Water Conservation",
    icon: Droplets,
    description:
      "Why water is a precious resource on construction sites, practical water-saving techniques, rainwater harvesting, and preventing water waste",
  },
  {
    id: 4,
    title: "Sustainable Materials & Procurement",
    icon: Package,
    description:
      "Choosing materials with lower environmental impact, responsible sourcing, embodied carbon, and the role of supply chain sustainability",
  },
];

export default function EnvironmentalSustainabilityModule3() {
  useSEO({
    title: "Module 3: Energy & Resource Efficiency | Environmental & Sustainability",
    description:
      "Learn about energy use on construction sites, carbon reduction, water conservation, and sustainable materials procurement.",
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
              <span className="text-emerald-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Energy &amp; Resource Efficiency
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Explore how energy is used on construction sites, learn strategies to reduce your
              carbon footprint, discover practical water conservation techniques, and understand
              how to choose sustainable materials and procurement methods.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../environmental-sustainability-module-3-section-${section.id}`}
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
