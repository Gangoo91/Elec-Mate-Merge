import { FileText, Award, ClipboardCheck, Users } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Why certification is required (BS 7671 compliance)',
    description: 'Understanding the legal requirement for electrical certification',
    icon: FileText,
    href: '7-1',
  },
  {
    number: 'Subsection 2',
    title: 'Awareness of electrical installation certificates (EICs)',
    description: 'Introduction to electrical installation certificates',
    icon: Award,
    href: '7-2',
  },
  {
    number: 'Subsection 3',
    title: 'Minor works certificates (awareness level)',
    description: 'Understanding minor works certification requirements',
    icon: ClipboardCheck,
    href: '7-3',
  },
  {
    number: 'Subsection 4',
    title: 'Who can sign off work and what Level 2 can do legally',
    description: 'Legal responsibilities and limitations for Level 2 electricians',
    icon: Users,
    href: '7-4',
  },
];

const Section7 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={7}
      title="Introduction to certification and documentation"
      description="Understanding electrical certification requirements and documentation."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section6"
      prevSectionLabel="Recording test results and defect identification"
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

export default Section7;
