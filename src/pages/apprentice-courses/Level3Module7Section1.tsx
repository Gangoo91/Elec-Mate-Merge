import { Briefcase, Users, Award, GraduationCap, TrendingUp } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Roles within the electrical industry',
    description:
      'Understanding different roles: installer, tester, designer, inspector and their responsibilities',
    icon: Briefcase,
    href: '../level3-module7-section1-1',
  },
  {
    number: '1.2',
    title: 'Self-employment vs employment routes',
    description: 'Comparing employed and self-employed career paths in the electrical industry',
    icon: Users,
    href: '../level3-module7-section1-2',
  },
  {
    number: '1.3',
    title: 'Trade bodies and registration (NICEIC, NAPIT, ECA, JIB)',
    description: 'Understanding professional trade bodies and registration requirements',
    icon: Award,
    href: '../level3-module7-section1-3',
  },
  {
    number: '1.4',
    title: 'Apprenticeships, NVQs and AM2 assessment',
    description:
      'Overview of training routes including apprenticeships, NVQs and assessment methods',
    icon: GraduationCap,
    href: '../level3-module7-section1-4',
  },
  {
    number: '1.5',
    title: 'Progression into higher qualifications (HNC, degree routes)',
    description: 'Pathways to advanced qualifications and career progression opportunities',
    icon: TrendingUp,
    href: '../level3-module7-section1-5',
  },
];

const Level3Module7Section1 = () => {
  useSEO(
    'Section 1: The Electrical Industry and Career Pathways - Level 3 Module 7',
    'Understanding industry roles, career progression routes and professional pathways'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={1}
      title="The electrical industry and career pathways"
      description="Industry roles, career progression routes and professional pathways."
      tone="blue"
      subsectionsCount={subsections.length}
      nextSectionHref="../level3-module7-section2"
      nextSectionLabel="Professional standards and responsibilities"
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

export default Level3Module7Section1;
