import { ArrowLeft, BookOpen, CreditCard, ClipboardCheck, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "What Is CSCS?",
    icon: BookOpen,
    description:
      "The Construction Skills Certification Scheme, its purpose, who needs a card, and the different card types available",
  },
  {
    id: 2,
    title: "Card Types & Colour Codes",
    icon: CreditCard,
    description:
      "Green labourer, blue skilled worker, gold advanced craft, black manager, white professionally qualified, and temporary visitor cards",
  },
  {
    id: 3,
    title: "The HS&E Test Format",
    icon: ClipboardCheck,
    description:
      "Test structure, question types, behavioural case studies, touch-screen format, 50 questions in 45 minutes, and pass marks",
  },
  {
    id: 4,
    title: "Booking, Preparation & Study Tips",
    icon: Lightbulb,
    description:
      "How to book at Pearson VUE centres, what to bring on the day, effective study strategies, and revision resources",
  },
];

export default function CscsCardModule1() {
  useSEO({
    title: "Module 1: Introduction to CSCS & the HS&E Test | CSCS Card Preparation",
    description:
      "Learn about the CSCS scheme, card types and colour codes, HS&E test format, and how to book and prepare for the test.",
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
              <Link to="../cscs-card-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to CSCS Card Preparation
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3">
              <span className="text-green-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Introduction to CSCS &amp; the HS&amp;E Test
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Learn about the Construction Skills Certification Scheme, explore the different card
              types and colour codes, understand the HS&amp;E test format, and discover how to book
              and prepare effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cscs-card-module-1-section-${section.id}`}
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
