import { Power, Wrench, ClipboardCheck, Lock, AlertTriangle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Why Safe Isolation is Essential',
    description: 'Understanding the critical importance of proper electrical isolation',
    icon: Power,
    href: '5-1',
  },
  {
    number: 'Subsection 2',
    title: 'Equipment Required for Isolation',
    description: 'Tools and devices needed for safe electrical isolation procedures',
    icon: Wrench,
    href: '5-2',
  },
  {
    number: 'Subsection 3',
    title: 'The Safe Isolation Process – Step by Step',
    description: 'Detailed procedure for safely isolating electrical circuits',
    icon: ClipboardCheck,
    href: '5-3',
  },
  {
    number: 'Subsection 4',
    title: 'Lockout/Tagout and Permit-to-Work Systems',
    description: 'Systems to prevent unauthorised re-energisation of circuits',
    icon: Lock,
    href: '5-4',
  },
  {
    number: 'Subsection 5',
    title: 'Common Mistakes and How to Avoid Them',
    description: 'Learning from typical errors in isolation procedures',
    icon: AlertTriangle,
    href: '5-5',
  },
];

export default function Section5() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={5}
      title="Safe isolation procedures"
      description="Step-by-step procedures for safely isolating electrical circuits before work."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section4"
      prevSectionLabel="PPE and safe working practices"
      nextSectionHref="../section6"
      nextSectionLabel="Health and safety incidents"
    >
      {subsections.map((subsection, index) => (
        <ModuleCard
          key={index}
          number={subsection.number}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          href={subsection.href}
        />
      ))}
    </SectionShell>
  );
}
