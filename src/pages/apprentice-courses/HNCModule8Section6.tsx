import { Layers, Zap, Workflow, PlayCircle, FileCheck, Users } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1',
    title: 'HVAC electrical requirements',
    description:
      'Electrical loads, power supplies, control wiring, cable containment and installation standards',
    icon: Zap,
    href: '../h-n-c-module8-section6-1',
  },
  {
    number: '6.2',
    title: 'Plant room design',
    description:
      'Layout considerations, access requirements, ventilation, lighting and electrical infrastructure',
    icon: Layers,
    href: '../h-n-c-module8-section6-2',
  },
  {
    number: '6.3',
    title: 'Interface coordination',
    description:
      'MEP coordination, clash detection, installation sequencing and design coordination meetings',
    icon: Workflow,
    href: '../h-n-c-module8-section6-3',
  },
  {
    number: '6.4',
    title: 'Commissioning procedures',
    description:
      'CIBSE Code M, witness testing, seasonal commissioning and performance verification',
    icon: PlayCircle,
    href: '../h-n-c-module8-section6-4',
  },
  {
    number: '6.5',
    title: 'Documentation',
    description:
      'O&M manuals, as-built drawings, testing records and building log book requirements',
    icon: FileCheck,
    href: '../h-n-c-module8-section6-5',
  },
  {
    number: '6.6',
    title: 'Handover and training',
    description:
      'Client training, operational handover, defects period and post-occupancy support',
    icon: Users,
    href: '../h-n-c-module8-section6-6',
  },
];

const HNCModule8Section6 = () => {
  useSEO(
    'Services coordination - HNC Module 8 Section 6 | HVAC Systems',
    'Master services coordination: HVAC electrical requirements, plant room design, interface coordination and commissioning procedures for building services.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module8"
      backLabel="Module 8"
      moduleNumber={8}
      sectionNumber={6}
      title="Services coordination"
      description="Coordinate HVAC and electrical services for successful project delivery."
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

export default HNCModule8Section6;
