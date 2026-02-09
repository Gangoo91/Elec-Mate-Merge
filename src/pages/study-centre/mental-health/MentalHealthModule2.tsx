import { ArrowLeft, CloudRain, Cloud, Flame, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Understanding Depression",
    icon: CloudRain,
    description: "Clinical depression vs low mood, types, symptoms (emotional, physical, cognitive, behavioural), risk factors, NICE guidelines",
  },
  {
    id: 2,
    title: "Anxiety Disorders",
    icon: Cloud,
    description: "GAD, panic disorder, social anxiety, phobias, OCD, PTSD, fight-flight-freeze response, physical symptoms",
  },
  {
    id: 3,
    title: "Stress & Burnout",
    icon: Flame,
    description: "HSE stress definition, acute vs chronic stress, the Maslach burnout model, stress in construction, risk assessment",
  },
  {
    id: 4,
    title: "Supporting Someone with Depression or Anxiety",
    icon: HeartHandshake,
    description: "ALGEE in practice, what to say and what not to say, encouraging professional help, GP referral, talking therapies",
  },
];

export default function MentalHealthModule2() {
  useSEO({
    title: "Module 2: Depression, Anxiety & Stress | Mental Health First Aid",
    description: "Recognising depression, anxiety disorders, workplace stress and burnout, and supporting colleagues effectively.",
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
              <span className="text-purple-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">45 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Depression, Anxiety &amp; Stress
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Recognising the most common mental health conditions in the workplace, understanding their impact and learning how to provide effective support
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
