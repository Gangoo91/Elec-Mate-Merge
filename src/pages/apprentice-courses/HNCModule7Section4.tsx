import { Radio, Users, Sun, Palette, Smartphone, Network } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'DALI systems',
    description:
      'Digital Addressable Lighting Interface, addressing, grouping, gateways and system architecture',
    icon: Radio,
    href: '../h-n-c-module7-section4-1',
  },
  {
    number: '4.2',
    title: 'Occupancy sensing',
    description:
      'PIR, microwave and ultrasonic sensors, placement, sensitivity and hold-off times',
    icon: Users,
    href: '../h-n-c-module7-section4-2',
  },
  {
    number: '4.3',
    title: 'Daylight harvesting',
    description:
      'Photocell types, closed-loop control, sensor placement and integration with artificial lighting',
    icon: Sun,
    href: '../h-n-c-module7-section4-3',
  },
  {
    number: '4.4',
    title: 'Scene setting',
    description:
      'Scene controllers, preset configurations, tunable white, colour changing and circadian lighting',
    icon: Palette,
    href: '../h-n-c-module7-section4-4',
  },
  {
    number: '4.5',
    title: 'Smart lighting',
    description:
      'IoT integration, wireless protocols, app control, data analytics and predictive maintenance',
    icon: Smartphone,
    href: '../h-n-c-module7-section4-5',
  },
  {
    number: '4.6',
    title: 'BMS integration',
    description:
      'Lighting control interfaces, protocols, scheduling, energy monitoring and system optimisation',
    icon: Network,
    href: '../h-n-c-module7-section4-6',
  },
];

const HNCModule7Section4 = () => {
  useSEO(
    'Lighting controls - HNC Module 7 Section 4 | Lighting Systems',
    'Master lighting controls: DALI systems, occupancy sensing, daylight harvesting, scene setting and smart lighting integration for energy-efficient buildings.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={4}
      title="Lighting controls"
      description="Design intelligent lighting control systems for energy efficiency and occupant comfort."
      tone="purple"
      subsectionsCount={subsections.length}
    >
      {subsections.map((s, i) => (
        <ModuleCard
          key={i}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
};

export default HNCModule7Section4;
