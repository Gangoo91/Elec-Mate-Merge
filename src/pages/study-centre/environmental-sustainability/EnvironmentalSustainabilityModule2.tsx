import { ArrowLeft, Recycle, FileText, AlertTriangle, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "The Waste Hierarchy",
    icon: Recycle,
    description:
      "The five steps of the waste hierarchy \u2014 prevention, reuse, recycling, recovery, and disposal \u2014 and how to apply them on construction sites",
  },
  {
    id: 2,
    title: "Duty of Care & Waste Transfer Notes",
    icon: FileText,
    description:
      "Your legal duty of care for waste, how to complete waste transfer notes correctly, and the consequences of failing to comply",
  },
  {
    id: 3,
    title: "Hazardous vs Non-Hazardous Waste",
    icon: AlertTriangle,
    description:
      "How to identify and classify hazardous waste, segregation requirements, consignment notes, and safe handling procedures",
  },
  {
    id: 4,
    title: "Site Waste Management Plans",
    icon: ClipboardList,
    description:
      "How to create and maintain a site waste management plan, setting waste reduction targets, and recording waste movements",
  },
];

export default function EnvironmentalSustainabilityModule2() {
  useSEO({
    title: "Module 2: Waste Management | Environmental & Sustainability",
    description:
      "Learn about the waste hierarchy, duty of care, hazardous waste classification, and site waste management plans.",
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
              <span className="text-emerald-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Waste Management
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand the waste hierarchy and how to apply it on site, learn your legal duty of
              care for waste, distinguish between hazardous and non-hazardous waste, and master
              site waste management planning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../environmental-sustainability-module-2-section-${section.id}`}
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
