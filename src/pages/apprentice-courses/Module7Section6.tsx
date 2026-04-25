import { FileText, ClipboardCheck, AlertTriangle, Wrench, TestTube } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Recording observations and test findings clearly',
    description: 'Documenting fault diagnosis findings and test results',
    icon: FileText,
    href: '6-1',
  },
  {
    number: 'Subsection 2',
    title: 'Reporting faults to supervisors or duty holders',
    description: 'Proper communication of fault conditions and findings',
    icon: ClipboardCheck,
    href: '6-2',
  },
  {
    number: 'Subsection 3',
    title: 'Temporary isolation or making safe',
    description: 'Emergency safety measures for dangerous fault conditions',
    icon: AlertTriangle,
    href: '6-3',
  },
  {
    number: 'Subsection 4',
    title: 'Rectifying minor faults within scope (loose connections, miswiring)',
    description: 'Simple fault repairs within Level 2 competence',
    icon: Wrench,
    href: '6-4',
  },
  {
    number: 'Subsection 5',
    title: 'Following up with re-testing or certification (awareness)',
    description: 'Understanding verification requirements after fault repair',
    icon: TestTube,
    href: '6-5',
  },
];

const Section6 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={6}
      title="Recording, reporting and rectifying faults"
      description="Documentation and remedial procedures for electrical faults."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section5"
      prevSectionLabel="Using tools and equipment safely when fault-finding"
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

export default Section6;
