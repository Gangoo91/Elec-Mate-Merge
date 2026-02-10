import { ArrowLeft, BookOpen, Clock, FileText, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "What Are the CDM Regulations?",
    icon: BookOpen,
    description:
      "An overview of the Construction (Design and Management) Regulations 2015 and their purpose in improving health and safety outcomes across all construction projects",
  },
  {
    id: 2,
    title: "History & Evolution",
    icon: Clock,
    description:
      "How CDM regulations have evolved from CDM 1994 through CDM 2007 to the current 2015 version, and the key changes at each stage",
  },
  {
    id: 3,
    title: "Key Definitions & Scope",
    icon: FileText,
    description:
      "Essential terminology including construction work, structure, contractor, designer, and domestic client, plus what falls within the scope of CDM 2015",
  },
  {
    id: 4,
    title: "When CDM Applies",
    icon: CheckCircle,
    description:
      "Understanding which projects CDM applies to, the thresholds for notification to the HSE, and the distinction between domestic and commercial projects",
  },
];

export default function CdmRegulationsModule1() {
  useSEO({
    title: "Module 1: Introduction to CDM 2015 | CDM Regulations Awareness",
    description:
      "Learn what the CDM Regulations are, their history and evolution, key definitions and scope, and when CDM applies to construction projects.",
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
              <span className="text-blue-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Introduction to CDM 2015
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand what the Construction (Design and Management) Regulations 2015 are, how
              they evolved from earlier legislation, the key definitions and scope of the
              regulations, and when CDM applies to your projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cdm-regulations-module-1-section-${section.id}`}
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
