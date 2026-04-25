import { Settings, Zap, Activity, Clock, Users } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Dynamic load management (DLM)',
    icon: Settings,
    description: 'Implementing intelligent load management systems on shared supplies.',
  },
  {
    id: 2,
    title: 'EV/PV/battery integration via HEMS',
    icon: Zap,
    description: 'Integrating charging with renewable energy and storage via a HEMS.',
  },
  {
    id: 3,
    title: 'CT clamps, load-sensing and control logic',
    icon: Activity,
    description: 'Monitoring and control technology that enables load management.',
  },
  {
    id: 4,
    title: 'Off-peak charging strategies',
    icon: Clock,
    description: 'Optimising charging times for cost savings and reduced grid impact.',
  },
  {
    id: 5,
    title: 'Multiple unit coordination (flats / shared sites)',
    icon: Users,
    description: 'Managing charging across multi-unit developments and shared supplies.',
  },
];

export default function EVChargingModule5() {
  useSEO({
    title: 'Module 5: Load Management & Diversity | EV Charging | Elec-Mate',
    description:
      'Dynamic load management, EV/PV/battery integration via HEMS, CT clamps, off-peak charging and multi-unit sites.',
  });

  return (
    <ModuleShell
      backTo="../ev-charging-course"
      backLabel="EV charging installation"
      moduleNumber={5}
      title="Load management and diversity in EV systems"
      description="Advanced load management and the integration strategies that keep installations safe."
      tone="green"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../ev-charging-module-4"
      prevModuleLabel="Earthing and protection considerations"
      nextModuleHref="../ev-charging-module-6"
      nextModuleLabel="Installation, inspection and testing procedures"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ev-charging-module-5-section-${section.id}`}
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
