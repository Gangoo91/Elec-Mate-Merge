import { ArrowLeft, Handshake, Scale, Shield, Sparkles, MessageSquareWarning } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Principled Negotiation',
    icon: Scale,
    description:
      'Fisher, Ury & Patton "Getting to Yes", 4 principles, BATNA framework, construction price negotiations',
  },
  {
    id: 2,
    title: 'Assertive Communication & The DESC Model',
    icon: Shield,
    description:
      'Bower & Bower DESC model, assertive rights, broken record technique, fogging, saying no professionally',
  },
  {
    id: 3,
    title: 'Influence & Persuasion',
    icon: Sparkles,
    description:
      "Cialdini's 6 principles, building credibility, framing and anchoring, ethical influence in construction",
  },
  {
    id: 4,
    title: 'Handling Difficult Conversations',
    icon: MessageSquareWarning,
    description:
      'Preparation framework, de-escalation, delivering bad news, Thomas Gordon I-messages, the money conversation',
  },
];

export default function CCModule5() {
  useSEO({
    title:
      'Module 5: Negotiation, Persuasion & Difficult Conversations | Communication & Confidence',
    description:
      'Principled negotiation, the DESC model, influence and persuasion, and handling difficult conversations in construction.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Negotiation, Persuasion &amp; Difficult Conversations
            </h1>
            <p className="text-white text-sm sm:text-base">
              Principled negotiation, assertive communication, ethical influence and handling
              difficult conversations in construction
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cc-module-5-section-${section.id}`}
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
