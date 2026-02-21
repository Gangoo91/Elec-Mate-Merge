import { ArrowLeft, Mic, Brain, HeartPulse, HardHat, Presentation } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Understanding Confidence',
    icon: Brain,
    description:
      "Bandura's self-efficacy, Clance & Imes imposter syndrome, Carol Dweck growth mindset, confidence-competence loop",
  },
  {
    id: 2,
    title: 'Overcoming Speaking Anxiety',
    icon: HeartPulse,
    description:
      'Glossophobia statistics, CBT cognitive restructuring, exposure ladder, Toastmasters gradual exposure, breathing techniques',
  },
  {
    id: 3,
    title: 'Delivering Effective Toolbox Talks',
    icon: HardHat,
    description:
      'HSE toolbox talk guidance, CDM 2015 Regulation 13, talk structure, documentation, complete templates',
  },
  {
    id: 4,
    title: 'Presentations & Client Conversations',
    icon: Presentation,
    description:
      'Toastmasters speech structure, storytelling for impact, reading the room, handling questions',
  },
];

export default function CCModule3() {
  useSEO({
    title: 'Module 3: Speaking with Confidence | Communication & Confidence',
    description:
      'Understanding confidence, overcoming speaking anxiety, delivering toolbox talks, presentations and client conversations.',
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
              <Link to="../communication-confidence">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Communication &amp; Confidence
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <span className="text-rose-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Speaking with Confidence
            </h1>
            <p className="text-white text-sm sm:text-base">
              Understanding confidence, overcoming speaking anxiety, delivering effective toolbox
              talks, and presenting to clients
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cc-module-3-section-${section.id}`}
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
