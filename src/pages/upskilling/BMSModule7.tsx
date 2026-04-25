import { FileText, Code, MapPin, Upload, CheckCircle, Users } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Design phase: I/O lists, schematics, network topology',
    icon: FileText,
    description: 'System design documentation, I/O scheduling and network planning.',
  },
  {
    id: 2,
    title: 'Programming methods: function blocks, boolean logic, PID',
    icon: Code,
    description: 'Control programming techniques used across BMS controllers.',
  },
  {
    id: 3,
    title: 'Addressing and device mapping',
    icon: MapPin,
    description: 'Device configuration, network addressing and point mapping.',
  },
  {
    id: 4,
    title: 'Software upload and controller setup',
    icon: Upload,
    description: 'Configuration deployment, firmware management and controller commissioning.',
  },
  {
    id: 5,
    title: 'Pre-functional and functional commissioning',
    icon: CheckCircle,
    description: 'Stage-by-stage testing and verification procedures.',
  },
  {
    id: 6,
    title: 'Client handover and documentation requirements',
    icon: Users,
    description: 'Project completion, training and the as-built handover pack.',
  },
];

export default function BMSModule7() {
  useSEO({
    title: 'Module 7: BMS Design, Programming & Commissioning | BMS Course | Elec-Mate',
    description:
      'Design, programming, controller setup, commissioning and client handover for complete BMS deployments.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={7}
      title="BMS design, programming and commissioning"
      description="Complete system design, programming methods and the commissioning process."
      tone="yellow"
      sectionsCount={sections.length}
      duration="75 mins"
      prevModuleHref="../bms-module-6"
      prevModuleLabel="Alarms, monitoring and data logging"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bms-module-7-section-${section.id}`}
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
