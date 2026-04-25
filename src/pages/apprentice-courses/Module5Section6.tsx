import { MessageSquare, FileText, Lightbulb, MapPin } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Verbal communication: being clear, concise and professional',
    description: 'Effective verbal communication skills for electrical work',
    icon: MessageSquare,
    href: '6-1',
  },
  {
    number: 'Subsection 2',
    title: 'Written instructions and handovers (basic notes, labels)',
    description: 'Creating clear written documentation and handover notes',
    icon: FileText,
    href: '6-2',
  },
  {
    number: 'Subsection 3',
    title: 'Communicating faults, risks and task progress',
    description: 'Reporting problems and progress effectively',
    icon: Lightbulb,
    href: '6-3',
  },
  {
    number: 'Subsection 4',
    title: 'Resolving misunderstandings and asking for clarification',
    description: 'Managing communication problems and seeking clarity',
    icon: MapPin,
    href: '6-4',
  },
];

const Section6 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={6}
      title="Communicating information effectively"
      description="Professional communication skills for electrical work."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section5"
      prevSectionLabel="Working with other trades and site personnel"
      nextSectionHref="../section7"
      nextSectionLabel="Documentation, labelling and record keeping"
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
