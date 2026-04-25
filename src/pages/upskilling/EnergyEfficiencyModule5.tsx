import { Gauge, BarChart, AlertTriangle, Settings, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Sub-metering installation strategy',
    icon: Gauge,
    description: 'Strategic placement and installation of sub-meters across a site.',
  },
  {
    id: 2,
    title: 'Energy dashboards and cloud portals',
    icon: BarChart,
    description: 'Creating and managing energy monitoring dashboards.',
  },
  {
    id: 3,
    title: 'Fault alerts and event logging',
    icon: AlertTriangle,
    description: 'Setting up automated alerts and event tracking on energy systems.',
  },
  {
    id: 4,
    title: 'Remote control and load shedding',
    icon: Settings,
    description: 'Implementing remote control and demand management strategies.',
  },
  {
    id: 5,
    title: 'Cybersecurity in energy systems',
    icon: Shield,
    description: 'Securing energy monitoring and control systems against attack.',
  },
];

export default function EnergyEfficiencyModule5() {
  useSEO({
    title: 'Module 5: Monitoring, Analytics & Smart Metering | Energy Efficiency | Elec-Mate',
    description:
      'Sub-metering, energy dashboards, fault alerts, remote load shedding and cybersecurity considerations.',
  });

  return (
    <ModuleShell
      backTo="../energy-efficiency-course"
      backLabel="Energy efficiency and management"
      moduleNumber={5}
      title="Monitoring, analytics and smart metering"
      description="Advanced monitoring systems and analytics for ongoing energy management."
      tone="yellow"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../energy-efficiency-module-4"
      prevModuleLabel="Reducing demand and improving efficiency"
      nextModuleHref="../energy-efficiency-module-6"
      nextModuleLabel="Regulations, carbon compliance and ROI"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../energy-efficiency-module-5-section-${section.id}`}
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
