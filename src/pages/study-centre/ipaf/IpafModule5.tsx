import { TriangleAlert, ClipboardCheck, LifeBuoy, Move } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Common hazards & accident causes',
    icon: TriangleAlert,
    description:
      'Falls from height, tower collapse, overturning, electrocution, falling objects and fatigue-related errors.',
  },
  {
    id: 2,
    title: 'Risk assessment for tower use',
    icon: ClipboardCheck,
    description:
      'HSE 5-step process, site-specific factors, hierarchy of control, method statements and dynamic assessment.',
  },
  {
    id: 3,
    title: 'Rescue procedures & emergency planning',
    icon: LifeBuoy,
    description:
      'PASMA rescue hierarchy, written rescue plans, communication methods and suspension trauma awareness.',
  },
  {
    id: 4,
    title: 'Moving & repositioning towers safely',
    icon: Move,
    description:
      'Pre-move checks, wind limits, ground conditions, zero-tolerance rules and post-move verification.',
  },
];

export default function IpafModule5() {
  useSEO({
    title: 'Module 5: Hazards, Risk Assessment & Rescue | IPAF | Elec-Mate',
    description:
      'Common hazards, HSE 5-step risk assessment, rescue procedures, emergency planning and safe tower repositioning.',
  });

  return (
    <ModuleShell
      backTo="../ipaf-course"
      backLabel="IPAF mobile scaffold training"
      moduleNumber={5}
      title="Hazards, risk assessment & rescue"
      description="Common hazards, 5-step risk assessment, rescue procedures and safe tower repositioning for mobile access tower work."
      tone="emerald"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../ipaf-module-4"
      prevModuleLabel="Inspection & maintenance"
      nextModuleHref="../ipaf-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ipaf-module-5-section-${section.id}`}
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
