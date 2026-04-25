import { Zap, Cog, Settings, Lightbulb, Battery, Leaf } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Switchgear and distribution systems', icon: Zap, description: 'LV/HV switchgear, distribution boards, busbars, isolation and protection coordination.' },
  { id: 2, title: 'Motors, drives and starters', icon: Cog, description: 'Motor operation, DOL and star-delta starters, VSDs and motor maintenance.' },
  { id: 3, title: 'Control panels and wiring systems', icon: Settings, description: 'Panel design, cable selection, terminations, containment and labelling.' },
  { id: 4, title: 'Lighting and power installations', icon: Lightbulb, description: 'General lighting, emergency systems, socket circuits and energy efficiency.' },
  { id: 5, title: 'Auxiliary systems — UPS, batteries, emergency supplies', icon: Battery, description: 'UPS systems, battery technologies, generators and critical-load management.' },
  { id: 6, title: 'Emerging technologies — renewables and smart systems', icon: Leaf, description: 'Solar PV, renewables, energy storage, smart grids and EV charging.' },
];

export default function MOETModule3() {
  useSEO({
    title: 'Module 3: Electrical Plant, Equipment and Systems | MOET | Elec-Mate',
    description: 'Switchgear, motors and drives, control panels, lighting, auxiliary systems and emerging technologies for maintenance engineers.',
  });

  return (
    <ModuleShell
      backTo="../moet"
      backLabel="MOET"
      moduleNumber={3}
      title="Electrical plant, equipment and systems"
      description="The plant, equipment and systems a maintenance engineer is responsible for keeping running."
      tone="orange"
      sectionsCount={sections.length}
      duration="4h"
      prevModuleHref="../m-o-e-t-module2"
      prevModuleLabel="Engineering principles and electrical theory"
      nextModuleHref="../m-o-e-t-module4"
      nextModuleLabel="Maintenance techniques and fault diagnosis"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../m-o-e-t-module3-section${section.id}`}
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
