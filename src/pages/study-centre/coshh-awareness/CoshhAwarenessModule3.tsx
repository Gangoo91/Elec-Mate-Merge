import { Construction, Zap, Wind, Bug } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Common construction hazards',
    icon: Construction,
    description:
      'Cement, silica dust, wood dust, solvents, adhesives and other hazardous substances found on construction sites.',
  },
  {
    id: 2,
    title: 'Electrical trade hazards',
    icon: Zap,
    description:
      'Cable lubricants, PVC fumes from hot work, soldering flux, cleaning agents, resins and encapsulants.',
  },
  {
    id: 3,
    title: 'Dust & fume control',
    icon: Wind,
    description:
      'Local exhaust ventilation, RPE selection, wet cutting techniques, H-class vacuums and on-tool extraction.',
  },
  {
    id: 4,
    title: 'Biological & environmental hazards',
    icon: Bug,
    description:
      "Weil's disease, legionella, mould, sewage exposure and other biological risks on construction sites.",
  },
];

export default function CoshhAwarenessModule3() {
  useSEO({
    title: 'Module 3: Hazardous Substances on Site | COSHH Awareness | Elec-Mate',
    description:
      'Hazardous substances commonly found on construction sites and in the electrical trade — dust, fumes, chemicals and biological hazards.',
  });

  return (
    <ModuleShell
      backTo="../coshh-awareness-course"
      backLabel="COSHH awareness"
      moduleNumber={3}
      title="Hazardous substances on site"
      description="The real-world hazardous substances you will encounter on construction sites and in the electrical trade — and how to control dust, fumes and biological risks."
      tone="purple"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../coshh-awareness-module-2"
      prevModuleLabel="Legislation & risk assessment"
      nextModuleHref="../coshh-awareness-module-4"
      nextModuleLabel="Control measures & PPE"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../coshh-awareness-module-3-section-${section.id}`}
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
