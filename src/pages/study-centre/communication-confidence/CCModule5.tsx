import { Scale, Shield, Sparkles, MessageSquareWarning } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Principled negotiation',
    icon: Scale,
    description:
      'Fisher, Ury & Patton "Getting to Yes", four principles, BATNA framework, construction price negotiations.',
  },
  {
    id: 2,
    title: 'Assertive communication & the DESC model',
    icon: Shield,
    description:
      'Bower & Bower DESC model, assertive rights, broken record technique, fogging, saying no professionally.',
  },
  {
    id: 3,
    title: 'Influence & persuasion',
    icon: Sparkles,
    description:
      "Cialdini's six principles, building credibility, framing and anchoring, ethical influence in construction.",
  },
  {
    id: 4,
    title: 'Handling difficult conversations',
    icon: MessageSquareWarning,
    description:
      'Preparation framework, de-escalation, delivering bad news, Thomas Gordon I-messages, the money conversation.',
  },
];

export default function CCModule5() {
  useSEO({
    title:
      'Module 5: Negotiation, persuasion & difficult conversations | Communication & confidence | Elec-Mate',
    description:
      'Principled negotiation, the DESC model, influence and persuasion, and handling difficult conversations in construction.',
  });

  return (
    <ModuleShell
      backTo="../communication-confidence"
      backLabel="Communication & confidence"
      moduleNumber={5}
      title="Negotiation, persuasion & difficult conversations"
      description="Principled negotiation, assertive communication, ethical influence and handling difficult conversations in construction."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../cc-module-4"
      prevModuleLabel="Professional writing & digital communication"
      nextModuleHref="../cc-module-6"
      nextModuleLabel="Mock exam"
    >
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
    </ModuleShell>
  );
}
