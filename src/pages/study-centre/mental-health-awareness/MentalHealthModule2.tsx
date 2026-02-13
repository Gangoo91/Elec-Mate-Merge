import { ArrowLeft, Eye, Gauge, CloudRain, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Warning Signs and Symptoms",
    icon: Eye,
    description:
      "Behavioural, emotional, physical, and cognitive changes to look out for in yourself and others",
  },
  {
    id: 2,
    title: "Understanding Stress",
    icon: Gauge,
    description:
      "The stress response, acute vs chronic stress, workplace triggers, and when stress becomes harmful",
  },
  {
    id: 3,
    title: "Depression and Anxiety",
    icon: CloudRain,
    description:
      "How depression and anxiety present, the difference between feeling down and clinical conditions, and risk factors",
  },
  {
    id: 4,
    title: "Crisis and Suicidal Thoughts",
    icon: AlertTriangle,
    description:
      "Recognising someone in crisis, understanding suicidal ideation, and knowing when to act immediately",
  },
];

export default function MentalHealthModule2() {
  useSEO({
    title: "Module 2: Recognising the Signs | Mental Health Awareness",
    description:
      "Warning signs, stress, depression, anxiety, and crisis situations.",
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
                MODULE 2
              </span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Recognising the Signs
            </h1>
            <p className="text-white text-sm sm:text-base">
              Warning signs and symptoms, understanding stress, depression and
              anxiety, and recognising crisis situations
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
