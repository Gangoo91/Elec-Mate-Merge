import { ArrowLeft, Building2, Signpost, Sparkles, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Implementing MHFA in the Workplace",
    icon: Building2,
    description: "Creating an MHFA programme, visibility, management buy-in, Thriving at Work core standards, measuring impact",
  },
  {
    id: 2,
    title: "Signposting & Support Services",
    icon: Signpost,
    description: "NHS Talking Therapies, GP pathway, crisis services, Samaritans, CALM, Mates in Mind, Lighthouse Club, EAPs",
  },
  {
    id: 3,
    title: "Building a Mentally Healthy Workplace",
    icon: Sparkles,
    description: "Five Ways to Wellbeing, mental health policies, toolbox talks, promoting openness, reducing presenteeism",
  },
  {
    id: 4,
    title: "Self-Care for the Mental Health First Aider",
    icon: ShieldCheck,
    description: "Compassion fatigue, vicarious trauma, setting boundaries, supervision, personal resilience, reflective practice",
  },
];

export default function MentalHealthModule5() {
  useSEO({
    title: "Module 5: Workplace Implementation & Wellbeing | Mental Health First Aid",
    description: "Implementing MHFA programmes, signposting support services, building healthy workplaces and self-care strategies.",
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
              <span className="text-purple-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Workplace Implementation &amp; Wellbeing
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Putting mental health first aid into practice &mdash; workplace programmes, signposting services, building healthy cultures and looking after yourself
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
