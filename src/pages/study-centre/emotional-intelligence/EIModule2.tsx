import { Heart, Zap, Search, Sparkles } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Understanding your emotions',
    icon: Heart,
    description:
      "Goleman's self-awareness competencies, Lisa Feldman Barrett's emotional granularity, Plutchik's wheel, physical signals of emotions.",
  },
  {
    id: 2,
    title: 'Recognising emotional triggers',
    icon: Zap,
    description:
      'Stimulus-thought-emotion-behaviour chain, common workplace triggers, Albert Ellis ABC model, event vs interpretation.',
  },
  {
    id: 3,
    title: 'Strengths, weaknesses & blind spots',
    icon: Search,
    description:
      "Johari Window, SBI feedback model, Dunning-Kruger effect, Carol Dweck's growth mindset.",
  },
  {
    id: 4,
    title: 'Building self-awareness habits',
    icon: Sparkles,
    description:
      "Daily emotional check-ins, body scanning, Gibbs' Reflective Cycle, three-minute breathing space, Viktor Frankl.",
  },
];

export default function EIModule2() {
  useSEO({
    title: 'Module 2: Self-Awareness | Emotional Intelligence | Elec-Mate',
    description:
      'Understanding your emotions, recognising triggers, identifying strengths and blind spots, and building self-awareness as a daily habit.',
  });

  return (
    <ModuleShell
      backTo="../emotional-intelligence"
      backLabel="Emotional intelligence"
      moduleNumber={2}
      title="Self-awareness"
      description="Understanding your emotions, recognising triggers, identifying strengths and blind spots, and building self-awareness as a daily habit."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../ei-module-1"
      prevModuleLabel="Understanding emotional intelligence"
      nextModuleHref="../ei-module-3"
      nextModuleLabel="Self-regulation"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ei-module-2-section-${section.id}`}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
