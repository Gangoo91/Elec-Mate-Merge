import { ShieldCheck, User, AlertTriangle, ClipboardCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Collective fall prevention',
    icon: ShieldCheck,
    description:
      'Guard rails, edge protection, safety netting, safety decking, airbags and catch platforms.',
  },
  {
    id: 2,
    title: 'Personal fall protection systems',
    icon: User,
    description:
      'Full body harnesses, lanyards, shock absorbers, inertia reels, anchor points and fall arrest vs restraint.',
  },
  {
    id: 3,
    title: 'Fragile surfaces & roof work',
    icon: AlertTriangle,
    description:
      'Fragile surface definition, common materials, controls, crawling boards, staging and HSG33.',
  },
  {
    id: 4,
    title: 'Harness inspection & equipment checks',
    icon: ClipboardCheck,
    description:
      'Pre-use visual checks, 6-monthly thorough examination, when to discard and correct storage.',
  },
];

export default function WorkingAtHeightModule3() {
  useSEO({
    title: 'Module 3: Fall Protection & Prevention | Working at Height | Elec-Mate',
    description:
      'Collective fall prevention, personal fall protection systems, fragile surfaces and harness inspection for safe working at height.',
  });

  return (
    <ModuleShell
      backTo="../working-at-height-course"
      backLabel="Working at height"
      moduleNumber={3}
      title="Fall protection & prevention"
      description="Collective and personal fall protection, fragile surface hazards and harness inspection for working at height."
      tone="amber"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../working-at-height-module-2"
      prevModuleLabel="Access equipment & selection"
      nextModuleHref="../working-at-height-module-4"
      nextModuleLabel="Safe systems of work"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../working-at-height-module-3-section-${section.id}`}
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
