import { ArrowLeft, Brain, Users, Briefcase, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Mental Health Awareness & the Spectrum",
    icon: Brain,
    description: "Mental health vs mental illness, the continuum model, prevalence, impact on work, myths and stigma in construction",
  },
  {
    id: 2,
    title: "The Mental Health First Aider's Role",
    icon: Users,
    description: "MHFA England framework, ALGEE action plan, boundaries, confidentiality, duty of care vs duty to refer",
  },
  {
    id: 3,
    title: "Workplace Mental Health Framework",
    icon: Briefcase,
    description: "HSE Management Standards, Health & Safety at Work Act 1974, Equality Act 2010, reasonable adjustments, risk assessments",
  },
  {
    id: 4,
    title: "Communication Skills & Active Listening",
    icon: MessageCircle,
    description: "Non-judgemental listening, open questions, reflective techniques, body language, cultural sensitivity",
  },
];

export default function MentalHealthModule1() {
  useSEO({
    title: "Module 1: Understanding Mental Health & the MHFA Role | Mental Health First Aid",
    description: "Mental health awareness, the MHFA role, workplace framework, communication skills and active listening.",
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
              <Link to="../mental-health-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Mental Health Course
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3">
              <span className="text-purple-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Understanding Mental Health &amp; the MHFA Role
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Mental health awareness, the role and responsibilities of a Mental Health First Aider, workplace legislation and communication skills
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../mental-health-module-1-section-${section.id}`}
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
