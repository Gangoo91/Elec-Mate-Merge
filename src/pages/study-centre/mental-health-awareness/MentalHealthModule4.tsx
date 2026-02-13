import { ArrowLeft, Heart, Signpost, RefreshCw, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Mental Health First Aid in Action",
    icon: Heart,
    description:
      "The MHFA action plan, immediate support techniques, and knowing your role and limits",
  },
  {
    id: 2,
    title: "Signposting to Professional Help",
    icon: Signpost,
    description:
      "NHS services, GPs, EAPs, Samaritans, Mates in Mind, and the Lighthouse Club",
  },
  {
    id: 3,
    title: "Supporting Recovery and Return to Work",
    icon: RefreshCw,
    description:
      "Reasonable adjustments, phased returns, ongoing check-ins, and avoiding assumptions",
  },
  {
    id: 4,
    title: "Looking After Yourself as a Supporter",
    icon: Shield,
    description:
      "Compassion fatigue, setting boundaries, recognising your own limits, and self-care",
  },
];

export default function MentalHealthModule4() {
  useSEO({
    title: "Module 4: Supporting Others | Mental Health Awareness",
    description:
      "Mental health first aid, signposting to help, supporting recovery, and looking after yourself.",
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Supporting Others
            </h1>
            <p className="text-white text-sm sm:text-base">
              How to provide immediate support, signpost to professional help,
              support someone's recovery, and protect your own wellbeing
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../mental-health-module-4-section-${section.id}`}
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
