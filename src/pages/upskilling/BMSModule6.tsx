import { AlertTriangle, TrendingUp, Monitor, Zap, Shield, Smartphone } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Alarm priorities and escalation logic',
    icon: AlertTriangle,
    description: 'Alarm classification, priorities and escalation procedures.',
  },
  {
    id: 2,
    title: 'Trend logging and historical data collection',
    icon: TrendingUp,
    description: 'Data logging strategies and historical trend analysis.',
  },
  {
    id: 3,
    title: 'BMS dashboards and visualisation platforms',
    icon: Monitor,
    description: 'User interfaces, mimics and data visualisation patterns.',
  },
  {
    id: 4,
    title: 'Event triggers and auto-reporting',
    icon: Zap,
    description: 'Automated reports, triggered events and notification rules.',
  },
  {
    id: 5,
    title: 'Integration with fire panels and emergency shutdowns',
    icon: Shield,
    description: 'Safety system integration and interlocks for life-safety events.',
  },
  {
    id: 6,
    title: 'Remote monitoring and fault alerts',
    icon: Smartphone,
    description: 'Remote access, mobile alerts and out-of-hours notification.',
  },
];

export default function BMSModule6() {
  useSEO({
    title: 'Module 6: Alarms, Monitoring & Data Logging | BMS Course | Elec-Mate',
    description:
      'Alarm management, trend logging, dashboards, event triggers and remote monitoring for building management systems.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={6}
      title="Alarms, monitoring and data logging"
      description="System monitoring, alarm management and historical data analysis."
      tone="yellow"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../bms-module-5"
      prevModuleLabel="Communication protocols: BACnet, Modbus, KNX"
      nextModuleHref="../bms-module-7"
      nextModuleLabel="BMS design, programming and commissioning"
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
