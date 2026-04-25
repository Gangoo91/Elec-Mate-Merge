import { FileText, ShieldCheck, Handshake, ClipboardCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Contracts, terms & written agreements',
    icon: FileText,
    description:
      'Quote vs estimate, essential T&Cs for electricians, variation procedures and digital signing.',
  },
  {
    id: 2,
    title: 'De-escalation techniques',
    icon: ShieldCheck,
    description:
      'Verbal Judo (George Thompson), the amygdala hijack, staying calm and the 24-hour rule.',
  },
  {
    id: 3,
    title: 'Building professional relationships',
    icon: Handshake,
    description:
      'The trust equation, credibility and reliability, networking and the reciprocity principle.',
  },
  {
    id: 4,
    title: 'Your conflict resolution action plan',
    icon: ClipboardCheck,
    description:
      'Self-assessment, your communication toolkit, prevention checklist and quick wins you can implement this week.',
  },
];

export default function CRModule5() {
  useSEO({
    title: 'Module 5: Prevention & Professional Relationships | Conflict Resolution | Elec-Mate',
    description:
      'Contracts and written agreements, de-escalation techniques, building relationships and your action plan.',
  });

  return (
    <ModuleShell
      backTo="../conflict-resolution"
      backLabel="Conflict resolution & difficult conversations"
      moduleNumber={5}
      title="Prevention & professional relationships"
      description="Preventing conflict through clear agreements, de-escalating tense situations, building strong professional relationships, and creating your personal action plan."
      tone="red"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../cr-module-4"
      prevModuleLabel="Site & workplace conflicts"
      nextModuleHref="../cr-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cr-module-5-section-${section.id}`}
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
