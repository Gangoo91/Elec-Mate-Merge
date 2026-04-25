import { CircleDollarSign, Expand, ShieldAlert, ClipboardList } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Non-paying clients',
    icon: CircleDollarSign,
    description:
      'Prevention, staged chasing, Late Payment Act 1998, Pre-Action Protocol and Small Claims Court.',
  },
  {
    id: 2,
    title: 'Scope creep & variation conversations',
    icon: Expand,
    description:
      'The "while you\'re here" syndrome, variation orders, having the conversation, and Consumer Rights Act 2015.',
  },
  {
    id: 3,
    title: 'Complaint handling & service recovery',
    icon: ShieldAlert,
    description:
      'The service recovery paradox, the HEARD framework, legitimate vs unreasonable complaints, and remedies.',
  },
  {
    id: 4,
    title: 'Managing client expectations',
    icon: ClipboardList,
    description:
      'Setting expectations at quoting, the customer journey, communication frequency and professional boundaries.',
  },
];

export default function CRModule3() {
  useSEO({
    title: 'Module 3: Resolving Client Disputes | Conflict Resolution | Elec-Mate',
    description:
      'Non-paying clients, scope creep conversations, complaint handling and managing client expectations.',
  });

  return (
    <ModuleShell
      backTo="../conflict-resolution"
      backLabel="Conflict resolution & difficult conversations"
      moduleNumber={3}
      title="Resolving client disputes"
      description="Practical strategies for non-paying clients, scope creep, complaint handling and managing expectations — with UK legal rights and frameworks."
      tone="red"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../cr-module-2"
      prevModuleLabel="Communication for difficult conversations"
      nextModuleHref="../cr-module-4"
      nextModuleLabel="Site & workplace conflicts"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cr-module-3-section-${section.id}`}
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
