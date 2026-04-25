import { Ear, Heart, MessageSquare, Scale } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Active listening & empathy',
    icon: Ear,
    description:
      'The listening ladder, empathic listening, reflective techniques, body language and validation without agreement.',
  },
  {
    id: 2,
    title: 'Nonviolent communication',
    icon: Heart,
    description:
      "Marshall Rosenberg's NVC framework: observations, feelings, needs and requests — applied to trade disputes.",
  },
  {
    id: 3,
    title: 'The Crucial Conversations framework',
    icon: MessageSquare,
    description:
      'Patterson et al.: creating safety, mutual purpose, the STATE model, contrasting and moving to action.',
  },
  {
    id: 4,
    title: 'Assertiveness vs aggression',
    icon: Scale,
    description:
      'The assertiveness spectrum, the Positive No, broken record technique, and I-statements vs you-statements.',
  },
];

export default function CRModule2() {
  useSEO({
    title: 'Module 2: Communication for Difficult Conversations | Conflict Resolution | Elec-Mate',
    description:
      'Active listening, Nonviolent Communication, the Crucial Conversations framework and assertiveness techniques.',
  });

  return (
    <ModuleShell
      backTo="../conflict-resolution"
      backLabel="Conflict resolution & difficult conversations"
      moduleNumber={2}
      title="Communication for difficult conversations"
      description="Active listening, expressing yourself without blame, structured dialogue frameworks, and the difference between being assertive and being aggressive."
      tone="red"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../cr-module-1"
      prevModuleLabel="Understanding conflict"
      nextModuleHref="../cr-module-3"
      nextModuleLabel="Resolving client disputes"
    >
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
    </ModuleShell>
  );
}
