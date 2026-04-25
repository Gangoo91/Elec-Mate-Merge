import { Users, Clock, Calculator, Award } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1',
    title: 'Communication with clients/customers',
    description:
      'Effective communication skills for explaining faults and remedial work to clients',
    icon: Users,
    href: '../level3-module4-section6-1',
  },
  {
    number: '6.2',
    title: 'Working under pressure and meeting deadlines',
    description: 'Managing time effectively and working efficiently under pressure situations',
    icon: Clock,
    href: '../level3-module4-section6-2',
  },
  {
    number: '6.3',
    title: 'Costing and explaining remedial work',
    description: 'Accurately costing repairs and clearly explaining work requirements to customers',
    icon: Calculator,
    href: '../level3-module4-section6-3',
  },
  {
    number: '6.4',
    title: 'Maintaining professional standards and accountability',
    description:
      'Professional conduct, accountability and maintaining high standards in fault work',
    icon: Award,
    href: '../level3-module4-section6-4',
  },
];

const Level3Module4Section6 = () => {
  useSEO(
    'Section 6: Professional Practice in Fault Work - Level 3 Module 4',
    'Client communication, working under pressure, costing and professional standards'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={6}
      title="Professional practice in fault work"
      description="Client communication, working under pressure, costing and professional standards."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module4-section5"
      prevSectionLabel="Rectification and verification"
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

export default Level3Module4Section6;
