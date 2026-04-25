import { FileText, Scale, Briefcase, Calculator, Star, PoundSterling } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'Writing CVs and preparing for interviews',
    description:
      'Creating effective CVs and developing interview skills for electrical industry roles',
    icon: FileText,
    href: '../level3-module7-section5-1',
  },
  {
    number: '5.2',
    title: "Understanding employment law and workers' rights",
    description:
      "Knowledge of employment legislation and understanding workers' rights and protections",
    icon: Scale,
    href: '../level3-module7-section5-2',
  },
  {
    number: '5.3',
    title: 'Setting up as a self-employed electrician (insurance, UTR, HMRC)',
    description: 'Requirements and procedures for establishing a self-employed electrical business',
    icon: Briefcase,
    href: '../level3-module7-section5-3',
  },
  {
    number: '5.4',
    title: 'Quoting, tendering and estimating jobs',
    description: 'Skills for accurate job estimation, competitive quoting and tender preparation',
    icon: Calculator,
    href: '../level3-module7-section5-4',
  },
  {
    number: '5.5',
    title: 'Customer service and building reputation',
    description:
      'Developing excellent customer service skills and building professional reputation',
    icon: Star,
    href: '../level3-module7-section5-5',
  },
  {
    number: '5.6',
    title: 'Financial awareness (tax, bookkeeping, pricing strategies)',
    description:
      'Understanding business finances, tax obligations and effective pricing strategies',
    icon: PoundSterling,
    href: '../level3-module7-section5-6',
  },
];

const Level3Module7Section5 = () => {
  useSEO(
    'Section 5: Employment and Business Awareness - Level 3 Module 7',
    'Employment skills, self-employment options and business development'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={5}
      title="Employment and business awareness"
      description="Employment skills, self-employment options and business development."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module7-section4"
      prevSectionLabel="Continuing professional development"
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

export default Level3Module7Section5;
