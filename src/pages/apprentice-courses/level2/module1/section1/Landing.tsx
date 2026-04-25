import { FileText, Gavel, Shield, AlertTriangle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'The Health and Safety at Work Act 1974',
    description:
      'Foundation legislation establishing the general duties of employers and employees.',
    icon: FileText,
    href: '1-1',
  },
  {
    number: 'Subsection 2',
    title: 'The Electricity at Work Regulations 1989',
    description: 'Specific regulations governing electrical work and safety requirements.',
    icon: Shield,
    href: '1-2',
  },
  {
    number: 'Subsection 3',
    title: 'Other key regulations (RIDDOR, PUWER, COSHH)',
    description: 'Additional regulations affecting electrical work environments.',
    icon: Gavel,
    href: '1-3',
  },
  {
    number: 'Subsection 4',
    title: 'The role of regulatory bodies',
    description: 'Understanding HSE, enforcement and compliance responsibilities.',
    icon: AlertTriangle,
    href: '1-4',
  },
];

export default function Section1() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={1}
      title="UK health and safety legislation"
      description="Essential legislation and regulations governing electrical work safety — HASAWA, EAWR and the supporting regs."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="../section2"
      nextSectionLabel="Common electrical hazards"
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
