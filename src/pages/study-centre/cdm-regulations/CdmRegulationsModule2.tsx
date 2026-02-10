import { ArrowLeft, Building2, PenTool, HardHat, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "The Client",
    icon: Building2,
    description:
      "The client's duties under CDM 2015 including making suitable arrangements for managing a project, ensuring adequate time and resources, and appointing duty holders",
  },
  {
    id: 2,
    title: "Principal Designer",
    icon: PenTool,
    description:
      "The principal designer's role in planning, managing, and coordinating the pre-construction phase, ensuring designers comply with their duties, and preparing the health and safety file",
  },
  {
    id: 3,
    title: "Principal Contractor",
    icon: HardHat,
    description:
      "The principal contractor's responsibilities for planning, managing, and coordinating the construction phase, producing the construction phase plan, and organising cooperation between contractors",
  },
  {
    id: 4,
    title: "Designers, Contractors & Workers",
    icon: Users,
    description:
      "The duties of designers to eliminate and reduce risk through design, contractors to plan and manage their own work safely, and workers to cooperate and report unsafe conditions",
  },
];

export default function CdmRegulationsModule2() {
  useSEO({
    title: "Module 2: Duty Holders & Their Roles | CDM Regulations Awareness",
    description:
      "Learn about CDM 2015 duty holders including the client, principal designer, principal contractor, designers, contractors, and workers.",
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
              <Link to="../cdm-regulations-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to CDM Regulations
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
              <span className="text-blue-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Duty Holders & Their Roles
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Explore the five key duty holder roles under CDM 2015: the client, principal designer,
              principal contractor, designers and contractors, and workers. Understand who is
              responsible for what and how the roles work together to ensure safe construction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cdm-regulations-module-2-section-${section.id}`}
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
