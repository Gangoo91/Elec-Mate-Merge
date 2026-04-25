import { CheckCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Routine testing requirements', icon: CheckCircle, description: 'Weekly, monthly, quarterly and annual tests.' },
  { id: 2, title: 'Servicing and maintenance', icon: CheckCircle, description: 'Service visit procedures and parts replacement.' },
  { id: 3, title: 'Fault finding techniques', icon: CheckCircle, description: 'Systematic diagnosis and common faults.' },
  { id: 4, title: 'Record keeping and logbooks', icon: CheckCircle, description: 'Maintenance records and compliance evidence.' },
  { id: 5, title: 'Verification and certification', icon: CheckCircle, description: 'Certificates of compliance and approval.' },
  { id: 6, title: 'Handover and client training', icon: CheckCircle, description: 'User training and documentation packages.' },
];

export default function FireAlarmModule6() {
  useSEO({
    title: 'Module 6: Testing, Servicing and Certification | Fire Alarm | Elec-Mate',
    description: 'Routine testing schedules, servicing, fault finding, record keeping and producing the certification pack.',
  });

  return (
    <ModuleShell
      backTo="../../fire-alarm-course"
      backLabel="Fire alarm systems"
      moduleNumber={6}
      title="Testing, servicing and certification"
      description="Keeping a fire alarm system compliant — from weekly tests to annual servicing and certification."
      tone="red"
      sectionsCount={sections.length}
      duration="3-4 hours"
      prevModuleHref="../module-5"
      prevModuleLabel="Installation and commissioning"
      nextModuleHref="../module-7"
      nextModuleLabel="Regulatory compliance and BS 5839"
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
