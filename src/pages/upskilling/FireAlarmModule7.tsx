import { CheckCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Fire safety legislation', icon: CheckCircle, description: 'Regulatory Reform Order 2005 and fire safety duties.' },
  { id: 2, title: 'Building Regulations', icon: CheckCircle, description: 'Approved Document B and compliance routes.' },
  { id: 3, title: 'BS 5839-1 requirements', icon: CheckCircle, description: 'Non-domestic systems and categories.' },
  { id: 4, title: 'BS 5839-6 requirements', icon: CheckCircle, description: 'Domestic systems, grades and LD classifications.' },
];

export default function FireAlarmModule7() {
  useSEO({
    title: 'Module 7: Regulatory Compliance and BS 5839 | Fire Alarm | Elec-Mate',
    description: 'Fire safety legislation, Building Regulations Approved Document B, and BS 5839 parts 1 and 6 requirements.',
  });

  return (
    <ModuleShell
      backTo="../../fire-alarm-course"
      backLabel="Fire alarm systems"
      moduleNumber={7}
      title="Regulatory compliance and BS 5839"
      description="The legal framework, standards and regulations that govern fire alarm systems in the UK."
      tone="red"
      sectionsCount={sections.length}
      duration="2-3 hours"
      prevModuleHref="../module-6"
      prevModuleLabel="Testing, servicing and certification"
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
