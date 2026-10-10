import { AlertTriangle, TrendingUp, Monitor, Zap, Shield, Smartphone } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Alarms',
    icon: AlertTriangle,
    description:
      'Alarms that reach someone who can act, in time, with enough to go on, and the habits that stop them turning into noise.',
  },
  {
    id: 2,
    title: 'Trend logging',
    icon: TrendingUp,
    description:
      'What to record, how often, where the data ends up, and how to read the line on the screen so it tells you what the plant has really been doing.',
  },
  {
    id: 3,
    title: 'Graphics and dashboards',
    icon: Monitor,
    description:
      'Most people meet the BMS through its graphics. How to read them, and how to tell when a graphic is wrong.',
  },
  {
    id: 4,
    title: 'Energy monitoring and reporting',
    icon: Zap,
    description:
      'Meter data is only useful when it leads to a decision. How to turn sub-meter readings into reports and actions that save energy.',
  },
  {
    id: 5,
    title: 'Fire alarm and life safety interfaces',
    icon: Shield,
    description:
      'Who stops the plant when there is a fire, what the BMS is allowed to do about it, and how to wire and test the boundary between the two.',
  },
  {
    id: 6,
    title: 'Remote access and monitoring',
    icon: Smartphone,
    description:
      'Why a BMS is watched from off site, how to let people in without letting everyone in, who actually answers the alarm, and what you install to make it all work.',
  },
];

export default function BMSModule6() {
  useSEO({
    title: 'Module 6: Alarms, data and monitoring | BMS course | Elec-Mate',
    description:
      'Alarms, trend logging, graphics, energy reporting, fire alarm interfaces and secure remote access.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={6}
      title="Alarms, data and monitoring"
      description="Alarms that get acted on, trends that find faults, graphics, energy reporting, fire alarm interfaces and safe remote access."
      tone="yellow"
      sectionsCount={sections.length}
      duration="2 hrs 55 mins"
      prevModuleHref="../bms-module-5"
      prevModuleLabel="Networks and protocols"
      nextModuleHref="../bms-module-7"
      nextModuleLabel="Design, installation, commissioning and handover"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bms-module-6-section-${section.id}`}
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
