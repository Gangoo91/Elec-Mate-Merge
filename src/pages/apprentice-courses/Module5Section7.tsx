import { Clipboard, FileText, Lightbulb, MapPin, Package } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Importance of accurate records for compliance and safety',
    description: 'Understanding why accurate documentation is essential',
    icon: Clipboard,
    href: '7-1',
  },
  {
    number: 'Subsection 2',
    title: 'Cable and circuit labelling conventions',
    description: 'Standard methods for labelling electrical systems',
    icon: FileText,
    href: '7-2',
  },
  {
    number: 'Subsection 3',
    title: 'Maintaining work logs and handover sheets',
    description: 'Keeping records of work completed and handover information',
    icon: Lightbulb,
    href: '7-3',
  },
  {
    number: 'Subsection 4',
    title: 'Updating as-built drawings (basic awareness)',
    description: 'Understanding the need to update drawings after installation',
    icon: MapPin,
    href: '7-4',
  },
  {
    number: 'Subsection 5',
    title: 'Site documentation storage and access',
    description: 'Managing and accessing site documentation effectively',
    icon: Package,
    href: '7-5',
  },
];

const Module5Section7 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={7}
      title="Documentation, labelling and record keeping"
      description="Maintaining accurate records and documentation."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section6"
      prevSectionLabel="Communicating information effectively"
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

export default Module5Section7;
