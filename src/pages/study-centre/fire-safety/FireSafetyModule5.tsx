import { ArrowLeft, Flame, Shield, FileText, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Fire Extinguisher Types",
    icon: Flame,
    description:
      "Water, foam, CO\u2082, dry powder, wet chemical \u2014 colour codes, suitable fire classes, operation, and placement requirements",
  },
  {
    id: 2,
    title: "Fire Blankets & Hose Reels",
    icon: Shield,
    description:
      "When to use fire blankets, BS EN 1869, fixed hose reels, maintenance requirements, and limitations",
  },
  {
    id: 3,
    title: "Incident Reporting & Investigation",
    icon: FileText,
    description:
      "RIDDOR requirements for fires, incident investigation, root cause analysis, lessons learned, and record keeping",
  },
  {
    id: 4,
    title: "Post-Incident Procedures",
    icon: ClipboardCheck,
    description:
      "Scene preservation, liaising with fire service and insurers, reinstatement, review of fire risk assessment, and updating emergency plans",
  },
];

export default function FireSafetyModule5() {
  useSEO({
    title: "Module 5: Firefighting Equipment & Incident Response | Fire Safety & Fire Marshal",
    description:
      "Learn about fire extinguisher types and colour codes, fire blankets and hose reels, incident reporting under RIDDOR, and post-incident procedures.",
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Firefighting Equipment & Incident Response
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand the different types of fire extinguishers and their colour codes, learn when
              to use fire blankets and hose reels, and master incident reporting, investigation, and
              post-incident procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../fire-safety-module-5-section-${section.id}`}
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
