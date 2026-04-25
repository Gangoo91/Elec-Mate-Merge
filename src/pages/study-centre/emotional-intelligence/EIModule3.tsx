import { ShieldCheck, Timer, RefreshCw, Handshake } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Managing your reactions',
    icon: ShieldCheck,
    description:
      "Goleman's self-regulation competencies, James Gross emotional regulation framework, suppression vs regulation, the 90-second rule, box breathing.",
  },
  {
    id: 2,
    title: 'Impulse control & thinking before acting',
    icon: Timer,
    description:
      "Mischel's marshmallow experiment, STOP technique, 10-10-10 rule, cognitive reappraisal, digital impulse control.",
  },
  {
    id: 3,
    title: 'Adaptability & handling change',
    icon: RefreshCw,
    description:
      'Kubler-Ross Change Curve, psychological flexibility, growth mindset applied to change, focus on controllables.',
  },
  {
    id: 4,
    title: 'Accountability & trustworthiness',
    icon: Handshake,
    description:
      'The Trust Equation, ownership vs blame, consistency between words and actions, Brene Brown on vulnerability.',
  },
];

export default function EIModule3() {
  useSEO({
    title: 'Module 3: Self-Regulation | Emotional Intelligence | Elec-Mate',
    description:
      'Managing your reactions, controlling impulses, adapting to change, and building accountability and trustworthiness.',
  });

  return (
    <ModuleShell
      backTo="../emotional-intelligence"
      backLabel="Emotional intelligence"
      moduleNumber={3}
      title="Self-regulation"
      description="Managing your reactions, controlling impulses, adapting to change, and building accountability and trustworthiness."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../ei-module-2"
      prevModuleLabel="Self-awareness"
      nextModuleHref="../ei-module-4"
      nextModuleLabel="Motivation & empathy"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ei-module-3-section-${section.id}`}
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
