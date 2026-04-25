import { Heart, UserCheck, AlertTriangle, Scale, Users, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1',
    title: 'Duty of care (legal and moral)',
    description: 'Understanding legal and moral obligations to protect others in the workplace',
    icon: Heart,
    href: '../level3-module1-section6-1',
  },
  {
    number: '6.2',
    title: 'Accountability for safe working practices',
    description: 'Personal and professional accountability for maintaining safe working practices',
    icon: UserCheck,
    href: '../level3-module1-section6-2',
  },
  {
    number: '6.3',
    title: 'Disciplinary actions for non-compliance',
    description: 'Consequences and disciplinary procedures for safety non-compliance',
    icon: AlertTriangle,
    href: '../level3-module1-section6-3',
  },
  {
    number: '6.4',
    title: 'Ethical responsibilities in protecting others',
    description: 'Ethical obligations and moral responsibilities in workplace safety',
    icon: Scale,
    href: '../level3-module1-section6-4',
  },
  {
    number: '6.5',
    title: 'Role of safety representatives and trade unions',
    description: 'Functions and responsibilities of safety representatives and union involvement',
    icon: Users,
    href: '../level3-module1-section6-5',
  },
  {
    number: '6.6',
    title: 'CPD (continuing professional development) in health and safety',
    description: 'Ongoing professional development requirements in health and safety practices',
    icon: GraduationCap,
    href: '../level3-module1-section6-6',
  },
];

const Level3Module1Section6 = () => {
  useSEO(
    'Section 6: Professional Responsibilities - Level 3 Module 1',
    'Ethical obligations, professional standards and duty of care in electrical work'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={6}
      title="Professional responsibilities"
      description="Ethical obligations, professional standards and duty of care in electrical work."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module1-section5"
      prevSectionLabel="Safety management systems"
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

export default Level3Module1Section6;
