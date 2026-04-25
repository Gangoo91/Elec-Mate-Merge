import { FileText, Users, KeyRound, ClipboardCheck, Siren, UserCog } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'Safety policy and organisation',
    description:
      'Policy content requirements, organisational responsibilities and effective communication',
    icon: FileText,
    href: '../h-n-c-module1-section3-1',
  },
  {
    number: '3.2',
    title: 'Safety culture and leadership',
    description:
      'Behavioural safety approaches, visible leadership commitment and workforce engagement',
    icon: Users,
    href: '../h-n-c-module1-section3-2',
  },
  {
    number: '3.3',
    title: 'Permit to work systems',
    description:
      'Permit types, procedures for isolation, hot works permits and confined space entry',
    icon: KeyRound,
    href: '../h-n-c-module1-section3-3',
  },
  {
    number: '3.4',
    title: 'Safety audits and inspections',
    description:
      'Audit types, inspection frequency, reporting requirements and corrective actions',
    icon: ClipboardCheck,
    href: '../h-n-c-module1-section3-4',
  },
  {
    number: '3.5',
    title: 'Emergency procedures',
    description:
      'Emergency planning, response protocols, evacuation procedures, first aid and fire safety',
    icon: Siren,
    href: '../h-n-c-module1-section3-5',
  },
  {
    number: '3.6',
    title: 'Contractor management',
    description:
      'Contractor selection, site induction, monitoring performance and coordination requirements',
    icon: UserCog,
    href: '../h-n-c-module1-section3-6',
  },
];

const HNCModule1Section3 = () => {
  useSEO(
    'Safety management systems - HNC Module 1 Section 3 | Building Services Engineering',
    'Master safety management systems: policy development, safety culture, permit to work, audits, emergency procedures and contractor management.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={3}
      title="Safety management systems"
      description="Understand the components of effective safety management systems in building services organisations."
      tone="purple"
      subsectionsCount={subsections.length}
    >
      {subsections.map((s, i) => (
        <ModuleCard
          key={i}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
};

export default HNCModule1Section3;
