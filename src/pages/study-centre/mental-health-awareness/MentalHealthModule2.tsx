import { ArrowLeft, User, Users, Flame, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Signs and Symptoms in Yourself",
    icon: User,
    description:
      "Self-awareness, mood changes, physical symptoms, and recognising when you're not okay",
  },
  {
    id: 2,
    title: "Spotting Changes in Others",
    icon: Users,
    description:
      "Behavioural changes, withdrawal, performance drops, and what to look for on site",
  },
  {
    id: 3,
    title: "Stress, Anxiety and Burnout",
    icon: Flame,
    description:
      "The difference between stress and burnout, the stages of burnout, and early warning signs",
  },
  {
    id: 4,
    title: "Crisis Awareness and Suicide Prevention",
    icon: AlertTriangle,
    description:
      "Warning signs, risk factors, construction suicide statistics, and what to do if someone is in crisis",
  },
];

export default function MentalHealthModule2() {
  useSEO({
    title: "Module 2: Recognising the Signs | Mental Health Awareness",
    description:
      "Signs and symptoms in yourself and others, stress vs burnout, and crisis awareness.",
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Recognising the Signs
            </h1>
            <p className="text-white text-sm sm:text-base">
              Signs in yourself and others, the difference between stress and
              burnout, and how to recognise when someone is in crisis
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../mental-health-module-2-section-${section.id}`}
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
