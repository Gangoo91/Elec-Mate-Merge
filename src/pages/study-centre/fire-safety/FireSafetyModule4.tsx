import { ArrowLeft, HardHat, DoorOpen, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "The Fire Marshal Role",
    icon: HardHat,
    description:
      "Appointment, responsibilities, authority, relationship with the responsible person, and the difference between fire marshals and fire wardens",
  },
  {
    id: 2,
    title: "Evacuation Procedures",
    icon: DoorOpen,
    description:
      "Simultaneous, phased, progressive horizontal, and defend-in-place strategies, alarm response, sweep procedures",
  },
  {
    id: 3,
    title: "Assembly Points & Roll Call",
    icon: MapPin,
    description:
      "Selecting assembly points, conducting roll calls, accounting for visitors and contractors, reporting to emergency services",
  },
  {
    id: 4,
    title: "Personal Emergency Evacuation Plans",
    icon: Users,
    description:
      "PEEPs for persons with disabilities, buddy systems, refuges, evacuation chairs, communication during evacuation",
  },
];

export default function FireSafetyModule4() {
  useSEO({
    title: "Module 4: Fire Marshal Duties & Evacuation | Fire Safety & Fire Marshal",
    description:
      "Learn about fire marshal roles and responsibilities, evacuation procedures, assembly points, and personal emergency evacuation plans.",
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Fire Marshal Duties & Evacuation
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand the fire marshal role and its responsibilities, learn the different
              evacuation strategies, master assembly point and roll call procedures, and develop
              personal emergency evacuation plans for persons with disabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../fire-safety-module-4-section-${section.id}`}
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
