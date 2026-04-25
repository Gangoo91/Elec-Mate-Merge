import { Cloud, Thermometer, Droplets, Sun, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Understanding external influences (BS 7671 overview)',
    description: 'Introduction to external influences in electrical installations',
    icon: Cloud,
    href: '5-1',
  },
  {
    number: 'Subsection 2',
    title: 'IP ratings and water/dust protection',
    description: 'Ingress protection ratings and their applications',
    icon: Thermometer,
    href: '5-2',
  },
  {
    number: 'Subsection 3',
    title: 'UV, temperature and mechanical damage risks',
    description: 'Environmental factors that can damage electrical installations',
    icon: Droplets,
    href: '5-3',
  },
  {
    number: 'Subsection 4',
    title: 'Selecting materials for corrosive or damp areas',
    description: 'Choosing appropriate materials for harsh environments',
    icon: Sun,
    href: '5-4',
  },
  {
    number: 'Subsection 5',
    title: 'Working in special locations (bathrooms, outdoors — basic awareness)',
    description: 'Basic considerations for special location installations',
    icon: Shield,
    href: '5-5',
  },
];

const Section5 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={5}
      title="Environmental considerations and external influences"
      description="Environmental factors affecting electrical installations and protective measures."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section4"
      prevSectionLabel="Installation methods and techniques"
      nextSectionHref="../section6"
      nextSectionLabel="Installation standards and best practice"
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
