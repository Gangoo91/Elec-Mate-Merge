import { FileText, PenTool, Table, Calculator, AlertTriangle, Database } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1',
    title: 'NBS specifications',
    description:
      'Clause structure, performance vs prescriptive specifications and coordination with drawings',
    icon: FileText,
    href: '../h-n-c-module4-section6-1',
  },
  {
    number: '6.2',
    title: 'Electrical drawings',
    description: 'Single line diagrams, schematics, layout drawings and CAD standards',
    icon: PenTool,
    href: '../h-n-c-module4-section6-2',
  },
  {
    number: '6.3',
    title: 'Schedules and data sheets',
    description:
      'Equipment schedules, cable schedules, luminaire schedules and data sheet requirements',
    icon: Table,
    href: '../h-n-c-module4-section6-3',
  },
  {
    number: '6.4',
    title: 'Design calculations',
    description: 'Calculation reports, verification methods and design approval processes',
    icon: Calculator,
    href: '../h-n-c-module4-section6-4',
  },
  {
    number: '6.5',
    title: 'CDM design risk register',
    description:
      'Designer duties, hazard identification, residual risk communication and design decisions',
    icon: AlertTriangle,
    href: '../h-n-c-module4-section6-5',
  },
  {
    number: '6.6',
    title: 'BIM and digital delivery',
    description:
      'Level of Development (LOD), COBie data, digital handover and information management',
    icon: Database,
    href: '../h-n-c-module4-section6-6',
  },
];

const HNCModule4Section6 = () => {
  useSEO(
    'Specification and documentation - HNC Module 4 Section 6 | Building Services Design',
    'Master electrical documentation: NBS specifications, drawings, schedules, design calculations, CDM risk registers and BIM digital delivery.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={6}
      title="Specification and documentation"
      description="Produce comprehensive specifications and documentation that effectively communicate design intent and support project delivery."
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

export default HNCModule4Section6;
