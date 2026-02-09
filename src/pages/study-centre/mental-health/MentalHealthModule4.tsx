import { ArrowLeft, Eye, UtensilsCrossed, Heart, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Psychosis & Schizophrenia",
    icon: Eye,
    description: "Hallucinations, delusions, disordered thinking, first episode psychosis, drug-induced psychosis, how to support safely",
  },
  {
    id: 2,
    title: "Eating Disorders",
    icon: UtensilsCrossed,
    description: "Anorexia, bulimia, binge eating disorder, OSFED, male prevalence, physical risks, workplace recognition, BEAT helpline",
  },
  {
    id: 3,
    title: "Personality Disorders & Complex Needs",
    icon: Heart,
    description: "BPD/EUPD, emotional dysregulation, trauma-informed approach, validation, consistency, boundaries, specialist support",
  },
  {
    id: 4,
    title: "Trauma, PTSD & Adverse Experiences",
    icon: ShieldAlert,
    description: "Trauma types, PTSD symptoms, complex PTSD, trauma in construction, trauma-informed approach, EMDR and trauma-focused CBT",
  },
];

export default function MentalHealthModule4() {
  useSEO({
    title: "Module 4: Psychosis, Eating Disorders & Complex Needs | Mental Health First Aid",
    description: "Understanding psychosis, eating disorders, personality disorders, trauma and PTSD in workplace settings.",
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
              <span className="text-purple-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Psychosis, Eating Disorders &amp; Complex Needs
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understanding less common but serious mental health conditions, trauma responses and how to provide appropriate support
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
