import { FileText, Zap, ClipboardList, Users } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Reading and producing technical drawings', icon: FileText, description: 'Engineering conventions, electrical schematics, mechanical drawings and revision control.' },
  { id: 2, title: 'Electrical schematics and wiring diagrams', icon: Zap, description: 'Circuit diagrams, single-line diagrams, control circuits and labelling standards.' },
  { id: 3, title: 'Maintenance records and reporting', icon: ClipboardList, description: 'Work recording, fault reports, digital reporting and maintenance management systems.' },
  { id: 4, title: 'Handovers and stakeholder communication', icon: Users, description: 'Shift handovers, stakeholder communication, professional behaviour and teamwork.' },
];

export default function MOETModule6() {
  useSEO({
    title: 'Module 6: Technical Documentation and Communication | MOET | Elec-Mate',
    description: 'Technical drawings, electrical schematics, maintenance records and stakeholder communication for maintenance engineers.',
  });

  return (
    <ModuleShell
      backTo="../moet"
      backLabel="MOET"
      moduleNumber={6}
      title="Technical documentation and communication"
      description="Technical drawings, electrical schematics, maintenance records and clear communication with stakeholders."
      tone="orange"
      sectionsCount={sections.length}
      duration="3h"
      prevModuleHref="../m-o-e-t-module5"
      prevModuleLabel="Control, automation and instrumentation"
      nextModuleHref="../m-o-e-t-module7"
      nextModuleLabel="End point assessment preparation"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../m-o-e-t-module6-section${section.id}`}
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
