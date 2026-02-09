import { ArrowLeft, Scale, BookOpen, ClipboardCheck, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Control of Asbestos Regulations 2012",
    icon: Scale,
    description: "CAR 2012 overview, three work categories, control limit, key regulations, and HSE enforcement",
  },
  {
    id: 2,
    title: "The Duty to Manage (Regulation 4)",
    icon: BookOpen,
    description: "Dutyholder identification, reasonable steps, asbestos register, management plan, and penalties",
  },
  {
    id: 3,
    title: "Asbestos Surveys",
    icon: ClipboardCheck,
    description: "Management vs Refurbishment & Demolition surveys, HSG264 guidance, surveyor qualifications",
  },
  {
    id: 4,
    title: "The Asbestos Register & Management Plan",
    icon: FileText,
    description: "Material and priority assessments, risk scoring, management options, and review triggers",
  },
];

export default function AsbestosModule2() {
  useSEO({
    title: "Module 2: Legislation & the Duty to Manage | Asbestos Awareness",
    description: "Control of Asbestos Regulations 2012, Regulation 4 duty to manage, survey types, and the asbestos register and management plan.",
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
              <Link to="../asbestos-awareness-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Asbestos Awareness
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3">
              <span className="text-orange-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Legislation & the Duty to Manage
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              The legal framework for managing asbestos in buildings, from CAR 2012 to surveys and the asbestos register
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../asbestos-awareness-module-2-section-${section.id}`}
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
