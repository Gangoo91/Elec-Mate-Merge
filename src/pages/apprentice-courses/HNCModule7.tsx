import {
  Zap,
  AlertTriangle,
  Lightbulb,
  SlidersHorizontal,
  BatteryCharging,
  Network,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'LV distribution design',
    icon: Zap,
    description:
      'Switchgear, busbar systems, cable sizing, discrimination studies and power quality for commercial installations.',
  },
  {
    id: 2,
    title: 'Emergency systems',
    icon: AlertTriangle,
    description:
      'Emergency lighting, fire alarms, life safety supplies, standby generators and UPS systems.',
  },
  {
    id: 3,
    title: 'Lighting design calculations',
    icon: Lightbulb,
    description:
      'Lumen method, point-by-point, glare rating, uniformity and CIBSE LG-standard compliance.',
  },
  {
    id: 4,
    title: 'Lighting controls',
    icon: SlidersHorizontal,
    description:
      'DALI systems, occupancy sensing, daylight harvesting, scene setting and smart integration.',
  },
  {
    id: 5,
    title: 'Energy-efficient solutions',
    icon: BatteryCharging,
    description:
      'LED technology, power factor correction, harmonic mitigation, energy metering and demand management.',
  },
  {
    id: 6,
    title: 'System integration',
    icon: Network,
    description:
      'Distribution-board design, protection coordination, earthing systems and commissioning.',
  },
];

export default function HNCModule7() {
  useSEO({
    title: 'Module 7: Power and Lighting Systems | HNC | Elec-Mate',
    description:
      'LV distribution, emergency systems, lighting design and controls, energy-efficient solutions and system integration.',
  });

  return (
    <ModuleShell
      backTo="../hnc"
      backLabel="HNC electrical engineering"
      moduleNumber={7}
      title="Power and lighting systems"
      description="Design and specify commercial power distribution and intelligent lighting from switchgear through to controls."
      tone="purple"
      sectionsCount={sections.length}
      duration="2h"
      prevModuleHref="../h-n-c-module6"
      prevModuleLabel="Sustainability and environmental engineering"
      nextModuleHref="../h-n-c-module8"
      nextModuleLabel="HVAC systems"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../h-n-c-module7-section${section.id}`}
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
