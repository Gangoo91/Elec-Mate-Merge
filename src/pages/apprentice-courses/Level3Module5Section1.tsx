import { FileCheck, BookOpen, List, Shield, FileText } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Purpose of inspection and testing',
    description: 'Initial verification vs periodic inspection and their respective purposes',
    icon: FileCheck,
    href: '../level3-module5-section1-1',
  },
  {
    number: '1.2',
    title: 'BS 7671 requirements and Part 6',
    description:
      'Understanding the regulatory requirements for inspection and testing under BS 7671',
    icon: BookOpen,
    href: '../level3-module5-section1-2',
  },
  {
    number: '1.3',
    title: 'Sequence of inspection and testing (GN3 guidance)',
    description:
      'Following the correct sequence for inspection and testing as outlined in Guidance Note 3',
    icon: List,
    href: '../level3-module5-section1-3',
  },
  {
    number: '1.4',
    title: 'Safety precautions and risk assessment before testing',
    description: 'Essential safety procedures and risk assessments required before testing begins',
    icon: Shield,
    href: '../level3-module5-section1-4',
  },
  {
    number: '1.5',
    title: 'Documentation and certification requirements',
    description:
      'Understanding the documentation and certification requirements for inspection and testing',
    icon: FileText,
    href: '../level3-module5-section1-5',
  },
];

const Level3Module5Section1 = () => {
  useSEO(
    'Section 1: Principles of Inspection and Testing - Level 3 Module 5',
    'Understanding the fundamental principles, requirements and procedures for electrical inspection and testing'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={1}
      title="Principles of inspection and testing"
      description="Fundamental principles, requirements and procedures for electrical inspection and testing."
      tone="blue"
      subsectionsCount={subsections.length}
      nextSectionHref="../level3-module5-section2"
      nextSectionLabel="Inspection procedures"
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

export default Level3Module5Section1;
