import { ArrowLeft, Wine, Scissors, AlertTriangle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Substance Misuse & Addiction",
    icon: Wine,
    description: "Alcohol and drug misuse, substance use in construction, signs at work, dual diagnosis, approaching someone",
  },
  {
    id: 2,
    title: "Self-Harm",
    icon: Scissors,
    description: "Understanding self-harm, types and prevalence, how to respond, first aid for injuries, long-term support pathways",
  },
  {
    id: 3,
    title: "Suicide Awareness & Prevention",
    icon: AlertTriangle,
    description: "UK statistics, construction industry rates, risk factors, warning signs, safe messaging, means restriction",
  },
  {
    id: 4,
    title: "Suicide First Aid & Crisis Response",
    icon: Phone,
    description: "Asking about suicide directly, the TASC model, safety planning, calling 999, helplines, post-crisis support",
  },
];

export default function MentalHealthModule3() {
  useSEO({
    title: "Module 3: Substance Misuse, Self-Harm & Suicide | Mental Health First Aid",
    description: "Substance misuse and addiction, self-harm awareness, suicide prevention, crisis intervention and support pathways.",
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
              <span className="text-purple-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Substance Misuse, Self-Harm &amp; Suicide
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Recognising substance misuse, understanding self-harm, suicide awareness and prevention, and crisis intervention skills
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../mental-health-module-3-section-${section.id}`}
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
