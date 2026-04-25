import { Layers, Wrench, Shield, ClipboardList } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Tower classifications',
    icon: Layers,
    description:
      'Standard, linked, bridge, high clearance, stairway towers and aluminium vs GRP construction.',
  },
  {
    id: 2,
    title: 'Structural components',
    icon: Wrench,
    description:
      'End frames, braces, platforms, castors, base plates, spigots and adjustable legs.',
  },
  {
    id: 3,
    title: 'Safety components',
    icon: Shield,
    description:
      'Guardrails 950 mm, mid-rails 470 mm, toeboards 150 mm, stabilisers and outriggers.',
  },
  {
    id: 4,
    title: 'Tower selection & planning',
    icon: ClipboardList,
    description:
      'Indoor vs outdoor, single vs double width, height limits and environmental factors.',
  },
];

export default function PasmaModule2() {
  useSEO({
    title: 'Module 2: Tower types & components | PASMA towers for users | Elec-Mate',
    description:
      'Tower classifications, structural and safety components and tower selection principles for mobile access tower work.',
  });

  return (
    <ModuleShell
      backTo="../pasma-course"
      backLabel="PASMA towers for users"
      moduleNumber={2}
      title="Tower types & components"
      description="Tower classifications, structural and safety components, and how to select the right tower for the task."
      tone="blue"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../pasma-module-1"
      prevModuleLabel="Legislation & PASMA standards"
      nextModuleHref="../pasma-module-3"
      nextModuleLabel="Assembly methods"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pasma-module-2-section-${section.id}`}
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
