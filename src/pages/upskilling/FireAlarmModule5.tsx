import { CheckCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Pre-installation planning', icon: CheckCircle, description: 'Site surveys, coordination and logistics.' },
  { id: 2, title: 'Control panel installation', icon: CheckCircle, description: 'Panel positioning and terminations.' },
  { id: 3, title: 'Device installation', icon: CheckCircle, description: 'Detector mounting and MCP positioning.' },
  { id: 4, title: 'Wiring and terminations', icon: CheckCircle, description: 'Cable installation and testing.' },
  { id: 5, title: 'Commissioning procedures', icon: CheckCircle, description: 'System setup and device testing.' },
  { id: 6, title: 'Handover and documentation', icon: CheckCircle, description: 'Client training and O&M manuals.' },
];

export default function FireAlarmModule5() {
  useSEO({
    title: 'Module 5: Installation and Commissioning | Fire Alarm | Elec-Mate',
    description: 'Installation procedures from planning and panel mounting through to commissioning, handover and documentation.',
  });

  return (
    <ModuleShell
      backTo="../../fire-alarm-course"
      backLabel="Fire alarm systems"
      moduleNumber={5}
      title="Installation and commissioning"
      description="From the first site survey through wiring and commissioning to the final handover pack."
      tone="red"
      sectionsCount={sections.length}
      duration="3-4 hours"
      prevModuleHref="../module-4"
      prevModuleLabel="Power supply, backup and cabling"
      nextModuleHref="../module-6"
      nextModuleLabel="Testing, servicing and certification"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`section-${section.id}`}
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
