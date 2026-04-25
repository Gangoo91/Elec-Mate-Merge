import { Lightbulb, Sun, Lock, Blinds, Zap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Integration with DALI, 1–10V and smart lighting',
    icon: Lightbulb,
    description: 'Lighting protocols, addressing and integration methods.',
  },
  {
    id: 2,
    title: 'Daylight harvesting and PIR logic',
    icon: Sun,
    description: 'Automated lighting control using daylight sensors and occupancy.',
  },
  {
    id: 3,
    title: 'Access control basics and door relays',
    icon: Lock,
    description: 'Security integration, door release relays and credentials.',
  },
  {
    id: 4,
    title: 'Shading, blinds and façade automation',
    icon: Blinds,
    description: 'Automated shading and façade systems for solar gain control.',
  },
  {
    id: 5,
    title: 'Combined energy saving scenarios (HVAC + lighting)',
    icon: Zap,
    description: 'Integrated optimisation across HVAC, lighting and shading.',
  },
];

export default function BMSModule4() {
  useSEO({
    title: 'Module 4: Lighting, Access & Environmental Control | BMS Course | Elec-Mate',
    description:
      'Integrated lighting, access control, shading and combined energy saving strategies for modern BMS deployments.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={4}
      title="Lighting, access and environmental control"
      description="Integrated lighting, security and environmental subsystems within the BMS."
      tone="yellow"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../bms-module-3"
      prevModuleLabel="HVAC integration and scheduling logic"
      nextModuleHref="../bms-module-5"
      nextModuleLabel="Communication protocols: BACnet, Modbus, KNX"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bms-module-4-section-${section.id}`}
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
