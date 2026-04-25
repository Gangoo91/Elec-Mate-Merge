import { Award, FileText, ClipboardList, Monitor, Scale } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'Electrical installation certificate (EIC)',
    description: 'Understanding and completing electrical installation certificates',
    icon: Award,
    href: '../level3-module5-section5-1',
  },
  {
    number: '5.2',
    title: 'Minor electrical installation works certificate',
    description: 'When and how to use minor electrical installation works certificates',
    icon: FileText,
    href: '../level3-module5-section5-2',
  },
  {
    number: '5.3',
    title: 'Schedule of inspections and test results',
    description: 'Completing schedules of inspections and test results accurately',
    icon: ClipboardList,
    href: '../level3-module5-section5-3',
  },
  {
    number: '5.4',
    title: 'Electronic vs paper certification systems',
    description: 'Understanding different certification systems and their requirements',
    icon: Monitor,
    href: '../level3-module5-section5-4',
  },
  {
    number: '5.5',
    title: 'Legal responsibilities and record keeping',
    description: 'Legal obligations for certification and proper record keeping requirements',
    icon: Scale,
    href: '../level3-module5-section5-5',
  },
];

const Level3Module5Section5 = () => {
  useSEO(
    'Section 5: Certification and Reporting - Level 3 Module 5',
    'Certification requirements, documentation and legal responsibilities for electrical work'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={5}
      title="Certification and reporting"
      description="Certification requirements, documentation and legal responsibilities for electrical work."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module5-section4"
      prevSectionLabel="Commissioning of installations"
      nextSectionHref="../level3-module5-section6"
      nextSectionLabel="Faults found during testing"
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

export default Level3Module5Section5;
