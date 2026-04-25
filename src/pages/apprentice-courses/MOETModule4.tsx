import { Calendar, Activity, Search, Wrench, TestTube, FileX, Settings } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Planned preventive maintenance (PPM)', icon: Calendar, description: 'PPM principles, scheduling, records, lubrication and inspection routines.' },
  { id: 2, title: 'Condition monitoring techniques', icon: Activity, description: 'Visual inspection, thermal imaging, vibration analysis and predictive maintenance.' },
  { id: 3, title: 'Fault finding and diagnostics', icon: Search, description: 'Systematic diagnostics, test instruments, motor faults and control circuits.' },
  { id: 4, title: 'Repair and replacement procedures', icon: Wrench, description: 'Safe isolation, component replacement, cable jointing and recommissioning.' },
  { id: 5, title: 'Testing and inspection', icon: TestTube, description: 'Visual inspections, continuity, insulation resistance and functional testing.' },
  { id: 6, title: 'Root cause analysis', icon: FileX, description: 'Identifying underlying failures, 5 Whys, fishbone diagrams and corrective actions.' },
  { id: 7, title: 'Reliability-centred maintenance', icon: Settings, description: 'RCM principles, balancing maintenance types and criticality analysis.' },
];

export default function MOETModule4() {
  useSEO({
    title: 'Module 4: Maintenance Techniques and Fault Diagnosis | MOET | Elec-Mate',
    description: 'PPM, condition monitoring, fault diagnostics, repairs, testing, root cause analysis and reliability-centred maintenance.',
  });

  return (
    <ModuleShell
      backTo="../moet"
      backLabel="MOET"
      moduleNumber={4}
      title="Maintenance techniques and fault diagnosis"
      description="Systematic maintenance approaches, fault-finding techniques and diagnostic procedures for engineering systems."
      tone="orange"
      sectionsCount={sections.length}
      duration="5h"
      prevModuleHref="../m-o-e-t-module3"
      prevModuleLabel="Electrical plant, equipment and systems"
      nextModuleHref="../m-o-e-t-module5"
      nextModuleLabel="Control, automation and instrumentation"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../m-o-e-t-module4-section${section.id}`}
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
