import { Scale, Zap, HardHat, Beaker, Wrench, Building } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Health and Safety at Work Act 1974',
    description:
      'Duties of employers, employees, self-employed, enforcement and the role of the HSE',
    icon: Scale,
    href: '../h-n-c-module1-section1-1',
  },
  {
    number: '1.2',
    title: 'Electricity at Work Regulations 1989',
    description:
      'Duties, competence requirements, safe systems, equipment standards and work activities',
    icon: Zap,
    href: '../h-n-c-module1-section1-2',
  },
  {
    number: '1.3',
    title: 'CDM Regulations 2015',
    description:
      'Duty holders, principal designer, principal contractor responsibilities and F10 notification',
    icon: HardHat,
    href: '../h-n-c-module1-section1-3',
  },
  {
    number: '1.4',
    title: 'COSHH and hazardous substances',
    description:
      'Assessment, control measures, monitoring requirements and health surveillance procedures',
    icon: Beaker,
    href: '../h-n-c-module1-section1-4',
  },
  {
    number: '1.5',
    title: 'PUWER and work equipment',
    description:
      'Selection, maintenance, training requirements and inspection regimes for work equipment',
    icon: Wrench,
    href: '../h-n-c-module1-section1-5',
  },
  {
    number: '1.6',
    title: 'Environmental and building regulations',
    description:
      'Environmental legislation, Part P requirements, building control procedures and compliance',
    icon: Building,
    href: '../h-n-c-module1-section1-6',
  },
];

const HNCModule1Section1 = () => {
  useSEO(
    'Legislation and standards - HNC Module 1 Section 1 | Building Services Engineering',
    'Master UK health and safety legislation for building services: HASAWA 1974, EAWR 1989, CDM 2015, COSHH, PUWER, and environmental regulations.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={1}
      title="Legislation and standards"
      description="Understand the legal framework governing health, safety and welfare in the building services engineering industry."
      tone="purple"
      subsectionsCount={subsections.length}
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

export default HNCModule1Section1;
