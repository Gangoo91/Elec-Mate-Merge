import { ShieldAlert, Trash2, HeartPulse, Users } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Accidental disturbance procedures', icon: ShieldAlert, description: 'STOP, SEAL, SIGN, SUMMON — the 4-S emergency response, immediate actions and incident recording.' },
  { id: 2, title: 'Decontamination & waste disposal', icon: Trash2, description: 'Personal and area decontamination, double-bagging, consignment notes and licensed waste carriers.' },
  { id: 3, title: 'Health surveillance & medical monitoring', icon: HeartPulse, description: 'Medical examinations, lung function tests, screening schedules, record keeping and compensation.' },
  { id: 4, title: 'Roles, responsibilities & your legal duties', icon: Users, description: 'Employer, employee, dutyholder and HSE responsibilities, enforcement and whistleblowing rights.' },
];

export default function AsbestosModule5() {
  useSEO({
    title: 'Module 5: Emergency Procedures & Responsibilities | Asbestos Awareness | Elec-Mate',
    description:
      'Accidental disturbance response, decontamination, waste disposal, health surveillance and legal responsibilities for asbestos work.',
  });

  return (
    <ModuleShell
      backTo="../asbestos-awareness-course"
      backLabel="Asbestos awareness"
      moduleNumber={5}
      title="Emergency procedures & responsibilities"
      description="What to do if asbestos is disturbed, how to decontaminate, health monitoring and your legal duties."
      tone="orange"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../asbestos-awareness-module-4"
      prevModuleLabel="Safe working practices & PPE"
      nextModuleHref="../asbestos-awareness-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../asbestos-awareness-module-5-section-${section.id}`}
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
