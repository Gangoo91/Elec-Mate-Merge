import { Eye, FileText, Shield, Activity, Lock } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Five steps to risk assessment (identify, evaluate, control, record, review)',
    description: 'Systematic approach to conducting comprehensive risk assessments',
    icon: Eye,
    href: '../level3-module1-section2-1',
  },
  {
    number: '2.2',
    title: 'Writing and interpreting method statements (RAMS)',
    description: 'Development and analysis of risk assessment and method statements',
    icon: FileText,
    href: '../level3-module1-section2-2',
  },
  {
    number: '2.3',
    title: 'Hierarchy of controls (eliminate, substitute, engineering, admin, PPE)',
    description: 'Priority order for implementing effective risk control measures',
    icon: Shield,
    href: '../level3-module1-section2-3',
  },
  {
    number: '2.4',
    title: 'Dynamic risk assessments on site',
    description: 'Real-time risk assessment techniques for changing work environments',
    icon: Activity,
    href: '../level3-module1-section2-4',
  },
  {
    number: '2.5',
    title: 'Safe systems of work (PTWs, lock-off/tag-out)',
    description: 'Permit to work systems and secure isolation procedures',
    icon: Lock,
    href: '../level3-module1-section2-5',
  },
];

const Level3Module1Section2 = () => {
  useSEO(
    'Section 2: Risk Assessment and Method Statements - Level 3 Module 1',
    'Advanced risk assessment techniques and comprehensive method statement development'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={2}
      title="Risk assessment and method statements"
      description="Advanced risk assessment techniques and comprehensive method statement development."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module1-section1"
      prevSectionLabel="Legislation and regulations"
      nextSectionHref="../level3-module1-section3"
      nextSectionLabel="Electrical safety in the workplace"
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

export default Level3Module1Section2;
