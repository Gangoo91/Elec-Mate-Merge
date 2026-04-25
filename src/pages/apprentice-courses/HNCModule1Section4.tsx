import { Shield, GraduationCap, Users, Scale, BookOpen } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Duty of care and accountability',
    description:
      'Legal duties, negligence principles, corporate responsibility and personal accountability',
    icon: Shield,
    href: '../h-n-c-module1-section4-1',
  },
  {
    number: '4.2',
    title: 'Competence and training',
    description:
      'Competency frameworks, training needs analysis, verification methods and record keeping',
    icon: GraduationCap,
    href: '../h-n-c-module1-section4-2',
  },
  {
    number: '4.3',
    title: 'Safety representatives',
    description:
      'Roles and responsibilities, legal rights, consultation requirements and safety committees',
    icon: Users,
    href: '../h-n-c-module1-section4-3',
  },
  {
    number: '4.4',
    title: 'Ethical responsibilities',
    description:
      'Professional ethics, whistleblowing procedures, conflicts of interest and integrity',
    icon: Scale,
    href: '../h-n-c-module1-section4-4',
  },
  {
    number: '4.5',
    title: 'Continuous professional development',
    description: 'Health and safety CPD, professional qualifications, keeping knowledge current',
    icon: BookOpen,
    href: '../h-n-c-module1-section4-5',
  },
];

const HNCModule1Section4 = () => {
  useSEO(
    'Professional responsibilities - HNC Module 1 Section 4 | Building Services Engineering',
    'Master professional responsibilities: duty of care, competence frameworks, safety representatives, ethical responsibilities and CPD requirements.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={4}
      title="Professional responsibilities"
      description="Understand the professional and ethical responsibilities of building services engineers regarding health and safety."
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

export default HNCModule1Section4;
