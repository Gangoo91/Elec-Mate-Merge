import { Flame, Sun, Heart, Eye } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Internal motivation & drive',
    icon: Flame,
    description:
      "Goleman's motivation competencies, Daniel Pink's Drive model, self-determination theory, flow states and Csikszentmihalyi.",
  },
  {
    id: 2,
    title: 'Optimism & resilience',
    icon: Sun,
    description:
      "Seligman's learned optimism, the three Ps, ABCDE model, pessimistic vs optimistic explanatory styles, realistic optimism.",
  },
  {
    id: 3,
    title: 'Understanding empathy',
    icon: Heart,
    description:
      "Goleman's empathy competencies, three types of empathy, empathy vs sympathy, mirror neurons, Brene Brown.",
  },
  {
    id: 4,
    title: 'Reading people & perspective-taking',
    icon: Eye,
    description:
      "Ekman's micro-expressions, body language, active listening, perspective-taking exercises, cultural sensitivity.",
  },
];

export default function EIModule4() {
  useSEO({
    title: 'Module 4: Motivation & Empathy | Emotional Intelligence | Elec-Mate',
    description:
      'Internal drive, optimism and resilience, understanding and practising empathy, reading people and taking different perspectives.',
  });

  return (
    <ModuleShell
      backTo="../emotional-intelligence"
      backLabel="Emotional intelligence"
      moduleNumber={4}
      title="Motivation & empathy"
      description="Internal drive, optimism and resilience, understanding and practising empathy, reading people and taking different perspectives."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../ei-module-3"
      prevModuleLabel="Self-regulation"
      nextModuleHref="../ei-module-5"
      nextModuleLabel="Social skills & applying EI"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ei-module-4-section-${section.id}`}
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
