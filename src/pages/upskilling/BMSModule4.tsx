import { Lightbulb, Sun, Lock, Blinds, Zap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Lighting control',
    icon: Lightbulb,
    description:
      'How lighting is switched and dimmed in commercial buildings, how a DALI bus is wired and organised, and what the lighting system can tell the BMS.',
  },
  {
    id: 2,
    title: 'Daylight and presence detection',
    icon: Sun,
    description:
      'The presence and daylight sensors that decide how lighting behaves, and how to fit and set them up so they answer correctly.',
  },
  {
    id: 3,
    title: 'Access control interfaces',
    icon: Lock,
    description:
      'What the BMS sees of the doors, how it gets that information, and why it is kept well away from releasing them.',
  },
  {
    id: 4,
    title: 'Blinds and shading',
    icon: Blinds,
    description:
      'Why buildings move their blinds, how the motors are wired and interlocked, how the BMS talks to them, and what keeps them safe in the wind.',
  },
  {
    id: 5,
    title: 'Metering and sub-metering',
    icon: Zap,
    description:
      'Why a building is split into metered end uses, what the regulations ask for, and how the meters you fit get their readings into the BMS accurately.',
  },
];

export default function BMSModule4() {
  useSEO({
    title: 'Module 4: Lighting, access, blinds and metering | BMS course | Elec-Mate',
    description:
      'Lighting control and DALI, daylight and presence detection, access and shading interfaces, and sub-metering.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={4}
      title="Lighting, access, blinds and metering"
      description="Lighting control and DALI, daylight and presence detection, access and shading interfaces, and the metering Approved Document L expects."
      tone="yellow"
      sectionsCount={sections.length}
      duration="2 hrs 30 mins"
      prevModuleHref="../bms-module-3"
      prevModuleLabel="Controlling heating, ventilation and air conditioning"
      nextModuleHref="../bms-module-5"
      nextModuleLabel="Networks and protocols"
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
