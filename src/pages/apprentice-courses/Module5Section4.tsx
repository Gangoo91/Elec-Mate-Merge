import { Package, FileText, Lightbulb, MapPin, Users } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Estimating materials from drawings or site walkthroughs',
    description: 'Calculating material requirements from plans and site visits',
    icon: Package,
    href: '4-1',
  },
  {
    number: 'Subsection 2',
    title: 'Ordering materials and managing deliveries',
    description: 'Procurement and delivery coordination for electrical materials',
    icon: FileText,
    href: '4-2',
  },
  {
    number: 'Subsection 3',
    title: 'Tool selection and availability',
    description: 'Choosing and ensuring availability of required tools',
    icon: Lightbulb,
    href: '4-3',
  },
  {
    number: 'Subsection 4',
    title: 'Managing wastage and shortages',
    description: 'Controlling material waste and dealing with shortages',
    icon: MapPin,
    href: '4-4',
  },
  {
    number: 'Subsection 5',
    title: 'Coordinating equipment with team requirements',
    description: 'Managing equipment needs across the installation team',
    icon: Users,
    href: '4-5',
  },
];

const Section4 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={4}
      title="Materials, tools and resource planning"
      description="Planning and managing resources for electrical installations."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section3"
      prevSectionLabel="Planning installation work on site"
      nextSectionHref="../section5"
      nextSectionLabel="Working with other trades and site personnel"
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

export default Section4;
