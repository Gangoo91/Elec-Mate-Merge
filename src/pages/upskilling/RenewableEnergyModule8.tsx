import { Award, Building, FileText, AlertTriangle, BookOpen } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'MCS requirements and certification pathways', icon: Award, description: 'Microgeneration Certification Scheme requirements and process.' },
  { id: 2, title: 'Building Regulations (Part L, Part P, structural)', icon: Building, description: 'Building Regulations compliance for renewable installations.' },
  { id: 3, title: 'DNO application processes (G98, G99)', icon: FileText, description: 'Distribution Network Operator application procedures.' },
  { id: 4, title: 'Fire safety, AC/DC isolation and labelling standards', icon: AlertTriangle, description: 'Fire safety requirements and isolation/labelling standards.' },
  { id: 5, title: 'Handover documentation and operation manuals', icon: BookOpen, description: 'Required documentation and operational guidance.' },
];

export default function RenewableEnergyModule8() {
  useSEO({
    title: 'Module 8: Regulations, Planning and Compliance | Renewable Energy | Elec-Mate',
    description: 'MCS, Building Regulations, DNO applications (G98/G99), fire safety, isolation labelling and handover documentation.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={8}
      title="Regulations, planning and compliance"
      description="The regulatory framework around renewables — MCS, Building Regs, DNO process and the handover pack."
      tone="cyan"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../renewable-energy-module-7"
      prevModuleLabel="Installation, maintenance and troubleshooting"
      nextModuleHref="../renewable-energy-module-9"
      nextModuleLabel="Incentives, payback and financial modelling"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-8-section-${section.id}`}
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
