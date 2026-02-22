import { ArrowLeft, Ear, Heart, MessageSquare, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Active Listening & Empathy',
    icon: Ear,
    description:
      'The listening ladder, empathic listening, reflective techniques, body language, and validation without agreement',
  },
  {
    id: 2,
    title: 'Nonviolent Communication',
    icon: Heart,
    description:
      "Marshall Rosenberg's NVC framework: observations, feelings, needs, and requests — applied to trade disputes",
  },
  {
    id: 3,
    title: 'The Crucial Conversations Framework',
    icon: MessageSquare,
    description:
      'Patterson et al.: creating safety, mutual purpose, the STATE model, contrasting, and moving to action',
  },
  {
    id: 4,
    title: 'Assertiveness vs Aggression',
    icon: Scale,
    description:
      'The assertiveness spectrum, the Positive No, broken record technique, and I-statements vs You-statements',
  },
];

export default function CRModule2() {
  useSEO({
    title: 'Module 2: Communication for Difficult Conversations | Conflict Resolution',
    description:
      'Active listening, Nonviolent Communication, the Crucial Conversations framework, and assertiveness techniques.',
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
              <Link to="../conflict-resolution">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Conflict Resolution
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
              <span className="text-white text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Communication for Difficult Conversations
            </h1>
            <p className="text-white text-sm sm:text-base">
              Active listening, expressing yourself without blame, structured dialogue frameworks,
              and the difference between being assertive and being aggressive
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cr-module-2-section-${section.id}`}
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
