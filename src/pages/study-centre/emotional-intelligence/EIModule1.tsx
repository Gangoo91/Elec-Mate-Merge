import { ArrowLeft, Smile, Microscope, HardHat, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What Is Emotional Intelligence?',
    icon: Smile,
    description:
      "Salovey & Mayer's academic definition, Goleman's popularised framework, EI vs IQ, the four-branch model, TalentSmart research",
  },
  {
    id: 2,
    title: 'The Science Behind Emotions',
    icon: Microscope,
    description:
      "Neurological basis, Ekman's six universal emotions, amygdala hijack, fight-flight-freeze, emotional contagion, cognitive triangle",
  },
  {
    id: 3,
    title: 'Why EI Matters in Construction',
    icon: HardHat,
    description:
      'EI and safety, CITB behavioural competencies, HSE Management Standards, cost of low EI, Mates in Mind',
  },
  {
    id: 4,
    title: "Goleman's Five Domains Overview",
    icon: Layers,
    description:
      'Self-awareness, self-regulation, motivation, empathy, social skills — the 25 competencies and why they build sequentially',
  },
];

export default function EIModule1() {
  useSEO({
    title: 'Module 1: Understanding Emotional Intelligence | Emotional Intelligence',
    description:
      "What emotional intelligence is, the science behind emotions, why EI matters in construction, and an overview of Goleman's five domains.",
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
              <Link to="../emotional-intelligence">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Emotional Intelligence
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <span className="text-rose-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Understanding Emotional Intelligence
            </h1>
            <p className="text-white text-sm sm:text-base">
              What emotional intelligence is, the science behind emotions, why EI matters in
              construction, and an overview of Goleman&rsquo;s five domains
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../ei-module-1-section-${section.id}`}
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
