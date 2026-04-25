import {
  FileText,
  ClipboardCheck,
  Shield,
  AlertTriangle,
  Settings,
  UserCheck,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Legislation and regulations',
    description: 'Key legislation, regulations and standards governing electrical work and building services.',
    icon: FileText,
  },
  {
    id: 2,
    title: 'Risk assessment and method statements',
    description: 'Advanced risk assessment techniques and comprehensive method statement development.',
    icon: ClipboardCheck,
  },
  {
    id: 3,
    title: 'Electrical safety in the workplace',
    description: 'Workplace electrical safety protocols, procedures and emergency response.',
    icon: Shield,
  },
  {
    id: 4,
    title: 'Hazard identification and control',
    description: 'Systematic hazard identification, evaluation and implementation of control measures.',
    icon: AlertTriangle,
  },
  {
    id: 5,
    title: 'Safety management systems',
    description: 'Development and implementation of comprehensive safety management systems.',
    icon: Settings,
  },
  {
    id: 6,
    title: 'Professional responsibilities',
    description: 'Ethical obligations, professional standards and duty of care in electrical work.',
    icon: UserCheck,
  },
];

export default function Level3Module1() {
  useSEO({
    title: 'Module 1: Health and Safety | Level 3 Electrical Installation | Elec-Mate',
    description:
      'Health and safety legislation, risk assessment, workplace electrical safety, hazard control and professional responsibilities for Level 3 electrical work.',
  });

  return (
    <ModuleShell
      backTo="../level3"
      backLabel="Level 3 electrical installation"
      moduleNumber={1}
      title="Health and safety in building services engineering"
      description="Legislation, risk assessment, electrical safety, hazard control, safety management systems and professional responsibilities."
      tone="blue"
      sectionsCount={sections.length}
      duration="60 mins"
      nextModuleHref="../level3-module2"
      nextModuleLabel="Environmental technology systems"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../level3-module1-section${section.id}`}
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
