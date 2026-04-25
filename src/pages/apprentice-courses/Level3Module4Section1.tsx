import { Zap, Eye, Search, Shield, FileText } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Types of faults',
    description:
      'Open circuit, short circuit, earth faults, high resistance and other common fault types',
    icon: Zap,
    href: '../level3-module4-section1-1',
  },
  {
    number: '1.2',
    title: 'Symptoms and fault indicators',
    description: 'Recognising signs of electrical faults and understanding fault indicators',
    icon: Eye,
    href: '../level3-module4-section1-2',
  },
  {
    number: '1.3',
    title: 'Diagnostic sequence and logical problem-solving',
    description: 'Systematic approach to fault diagnosis and logical troubleshooting methods',
    icon: Search,
    href: '../level3-module4-section1-3',
  },
  {
    number: '1.4',
    title: 'Safety considerations before and during fault finding',
    description: 'Safe working practices and risk assessment for fault diagnosis work',
    icon: Shield,
    href: '../level3-module4-section1-4',
  },
  {
    number: '1.5',
    title: 'Documentation of findings',
    description: 'Recording fault diagnosis results and maintaining accurate documentation',
    icon: FileText,
    href: '../level3-module4-section1-5',
  },
];

const Level3Module4Section1 = () => {
  useSEO(
    'Section 1: Principles of Fault Diagnosis - Level 3 Module 4',
    'Types of faults, symptoms, diagnostic sequence, safety considerations and documentation'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={1}
      title="Principles of fault diagnosis"
      description="Types of faults, symptoms, diagnostic sequence, safety considerations and documentation."
      tone="blue"
      subsectionsCount={subsections.length}
      nextSectionHref="../level3-module4-section2"
      nextSectionLabel="Diagnostic tools and equipment"
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

export default Level3Module4Section1;
