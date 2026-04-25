import { BookOpen, Key, AlertTriangle, Lightbulb } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Navigating Part 2 — how definitions shape application',
    icon: BookOpen,
    description: 'How the Part 2 definitions influence the application of the regulations.',
  },
  {
    id: 2,
    title: 'Key terms: CPC, ADS, SELV, PELV and protective devices',
    icon: Key,
    description: 'Essential terminology for circuit protective conductors, ADS and safety systems.',
  },
  {
    id: 3,
    title: 'New definitions from Amendment 2 and 3 (AFDD, PEI, bidirectional protection)',
    icon: AlertTriangle,
    description: 'Updated terminology including arc fault detection and bidirectional protection.',
  },
  {
    id: 4,
    title: 'Amendment 3 highlights and current requirements',
    icon: Lightbulb,
    description: 'Key Amendment 3 changes focusing on bidirectional protection and renewables.',
  },
];

export default function BS7671Module2() {
  useSEO({
    title: 'Module 2: Definitions & Key Terminology | BS 7671 | Elec-Mate',
    description:
      'Mastering the BS 7671 vocabulary — CPC, ADS, SELV, PELV plus Amendment 2 and 3 additions.',
  });

  return (
    <ModuleShell
      backTo="../bs7671-course"
      backLabel="18th edition (BS 7671)"
      moduleNumber={2}
      title="Definitions and key terminology"
      description="The essential vocabulary that underpins every regulation in BS 7671."
      tone="yellow"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../bs7671-module-1"
      prevModuleLabel="Scope, object and fundamental principles"
      nextModuleHref="../bs7671-module-3"
      nextModuleLabel="General characteristics and selection criteria"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bs7671-module-2-section-${section.id}`}
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
