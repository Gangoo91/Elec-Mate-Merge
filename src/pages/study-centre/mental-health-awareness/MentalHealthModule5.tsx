import { ArrowLeft, TrendingUp, Users, FileText, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "The Business Case for Mental Health",
    icon: TrendingUp,
    description:
      "Productivity, absenteeism, retention, and the financial case for investing in mental health at work",
  },
  {
    id: 2,
    title: "Creating a Culture of Openness",
    icon: Users,
    description:
      "Leadership buy-in, mental health champions, normalising conversations, and challenging toxic masculinity on site",
  },
  {
    id: 3,
    title: "Policies and Risk Assessment",
    icon: FileText,
    description:
      "Mental health policies, stress risk assessments, HSE management standards, and legal duties",
  },
  {
    id: 4,
    title: "Industry Initiatives and Resources",
    icon: Landmark,
    description:
      "Mates in Mind, Lighthouse Club, MHFA England, Building Mental Health, and how to get involved",
  },
];

export default function MentalHealthModule5() {
  useSEO({
    title: "Module 5: Building a Mentally Healthy Workplace | Mental Health Awareness",
    description:
      "Business case, culture change, policies, and industry initiatives.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../mental-health-awareness">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Mental Health Awareness
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 5
              </span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Building a Mentally Healthy Workplace
            </h1>
            <p className="text-white text-sm sm:text-base">
              The business case for mental health, creating a culture of
              openness, policies and risk assessment, and industry initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../mental-health-module-5-section-${section.id}`}
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
