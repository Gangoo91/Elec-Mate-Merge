import { FileText, Shield, ClipboardCheck, FileCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Key clauses from BS 5266-1 and EN 1838',
    icon: FileText,
    description: 'Essential standards clauses and the regulatory requirements they impose.',
  },
  {
    id: 2,
    title: 'Integration with fire safety regulations',
    icon: Shield,
    description: 'Coordination with fire safety systems and the wider regulations.',
  },
  {
    id: 3,
    title: 'Emergency lighting in risk assessments',
    icon: ClipboardCheck,
    description: 'How emergency lighting feeds into building risk assessments.',
  },
  {
    id: 4,
    title: 'Documentation for audits and fire authorities',
    icon: FileCheck,
    description: 'Compliance documentation expected by auditors and fire authorities.',
  },
];

export default function EmergencyLightingModule6() {
  useSEO({
    title: 'Module 6: Regulatory Compliance & BS 5266 | Emergency Lighting | Elec-Mate',
    description:
      'BS 5266-1, EN 1838, fire safety integration, risk assessments and audit-ready documentation.',
  });

  return (
    <ModuleShell
      backTo="../emergency-lighting-course"
      backLabel="Emergency lighting systems"
      moduleNumber={6}
      title="Regulatory compliance and BS 5266"
      description="Standards compliance and the documentation regulators expect."
      tone="yellow"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../emergency-lighting-module-5"
      prevModuleLabel="Installation, testing and maintenance"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../emergency-lighting-module-6-section-${section.id}`}
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
