import { ArrowLeft, MessageCircle, Radio, Palette, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What Is Communication?',
    icon: MessageCircle,
    description:
      'Shannon-Weaver model, ILM Level 2 definition, Eric Berne Transactional Analysis, one-way vs two-way communication',
  },
  {
    id: 2,
    title: 'Verbal, Nonverbal & Written Channels',
    icon: Radio,
    description:
      'Mehrabian 7-38-55 (correctly contextualised), Egan SOLER model, paralinguistics, choosing the right channel',
  },
  {
    id: 3,
    title: 'Communication Styles',
    icon: Palette,
    description:
      'Passive to aggressive continuum, Thomas Gordon I-messages, Transactional Analysis, CITB behavioural competencies',
  },
  {
    id: 4,
    title: 'Communication Barriers & How to Overcome Them',
    icon: ShieldAlert,
    description:
      'ILM Level 2 barrier framework, Shannon-Weaver noise, HSE guidance, CDM 2015, multilingual teams',
  },
];

export default function CCModule1() {
  useSEO({
    title: 'Module 1: Understanding Communication | Communication & Confidence',
    description:
      'What communication is, verbal/nonverbal/written channels, communication styles and overcoming barriers in construction.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Understanding Communication
            </h1>
            <p className="text-white text-sm sm:text-base">
              What communication is, verbal/nonverbal/written channels, communication styles and how
              to overcome barriers in construction
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cc-module-1-section-${section.id}`}
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
