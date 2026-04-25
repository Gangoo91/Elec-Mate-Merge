import { Users, FileText, Lightbulb, MapPin, Package } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Understanding site roles and responsibilities',
    description: 'Knowing who does what on construction sites',
    icon: Users,
    href: '5-1',
  },
  {
    number: 'Subsection 2',
    title: 'Communicating with site supervisors and foremen',
    description: 'Effective communication with site management',
    icon: FileText,
    href: '5-2',
  },
  {
    number: 'Subsection 3',
    title: 'Coordinating with joiners, plumbers, plasterers etc.',
    description: 'Working alongside other construction trades',
    icon: Lightbulb,
    href: '5-3',
  },
  {
    number: 'Subsection 4',
    title: 'Avoiding installation conflicts (e.g. trunking vs pipework)',
    description: 'Preventing clashes between different trade installations',
    icon: MapPin,
    href: '5-4',
  },
  {
    number: 'Subsection 5',
    title: 'Attending briefings, tool box talks and site meetings',
    description: 'Participating in site communication and safety meetings',
    icon: Package,
    href: '5-5',
  },
];

const Section5 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={5}
      title="Working with other trades and site personnel"
      description="Collaboration and coordination with other construction trades."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section4"
      prevSectionLabel="Materials, tools and resource planning"
      nextSectionHref="../section6"
      nextSectionLabel="Communicating information effectively"
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

export default Section5;
