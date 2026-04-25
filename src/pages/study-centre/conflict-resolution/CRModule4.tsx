import { Hammer, Building2, Scale, Users } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Disputes with other trades',
    icon: Hammer,
    description:
      'Inter-trade conflicts, damaged work, access disputes, CDM 2015 coordination duties and professional resolution.',
  },
  {
    id: 2,
    title: 'Main contractor & commercial conflicts',
    icon: Building2,
    description:
      'Payment disputes, programme changes, contra charges, Construction Act payment terms and escalation.',
  },
  {
    id: 3,
    title: 'The Construction Act & your rights',
    icon: Scale,
    description:
      'Housing Grants, Construction and Regeneration Act 1996, adjudication, payment provisions and suspension rights.',
  },
  {
    id: 4,
    title: 'Team conflicts & apprentice management',
    icon: Users,
    description:
      'The SBI feedback model, giving difficult feedback, JIB grievance procedures, and bullying and harassment.',
  },
];

export default function CRModule4() {
  useSEO({
    title: 'Module 4: Site & Workplace Conflicts | Conflict Resolution | Elec-Mate',
    description:
      'Disputes with other trades, main contractor conflicts, the Construction Act and team management.',
  });

  return (
    <ModuleShell
      backTo="../conflict-resolution"
      backLabel="Conflict resolution & difficult conversations"
      moduleNumber={4}
      title="Site & workplace conflicts"
      description="Disputes with other trades, main contractor conflicts, your legal rights under the Construction Act, and managing teams and apprentices."
      tone="red"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../cr-module-3"
      prevModuleLabel="Resolving client disputes"
      nextModuleHref="../cr-module-5"
      nextModuleLabel="Prevention & professional relationships"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cr-module-4-section-${section.id}`}
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
