import { FileSpreadsheet, Zap, Thermometer, Cpu, Eye, BookOpen } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'Commissioning planning',
    description:
      'CIBSE Code M principles, commissioning management plans, scheduling and resource coordination for building services',
    icon: FileSpreadsheet,
    href: '../h-n-c-module5-section5-1',
  },
  {
    number: '5.2',
    title: 'Electrical commissioning',
    description:
      'Electrical testing procedures, verification requirements, certification and compliance documentation',
    icon: Zap,
    href: '../h-n-c-module5-section5-2',
  },
  {
    number: '5.3',
    title: 'Mechanical commissioning',
    description:
      'CIBSE codes A, W and R, system balancing, flow measurement, pressure testing and performance verification',
    icon: Thermometer,
    href: '../h-n-c-module5-section5-3',
  },
  {
    number: '5.4',
    title: 'BMS commissioning',
    description:
      'Point-to-point verification, functional performance testing, graphics testing and system integration checks',
    icon: Cpu,
    href: '../h-n-c-module5-section5-4',
  },
  {
    number: '5.5',
    title: 'Witness testing',
    description:
      'Client attendance requirements, documentation standards, sign-off procedures and acceptance protocols',
    icon: Eye,
    href: '../h-n-c-module5-section5-5',
  },
  {
    number: '5.6',
    title: 'Handover documentation',
    description:
      'O&M manual requirements, as-built drawings, training delivery and building log book compilation',
    icon: BookOpen,
    href: '../h-n-c-module5-section5-6',
  },
];

const HNCModule5Section5 = () => {
  useSEO(
    'Commissioning and handover - HNC Module 5 Section 5 | Building Services',
    'Master commissioning: CIBSE Code M, electrical and mechanical commissioning, BMS testing, witness testing and O&M documentation for building services.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={5}
      title="Commissioning and handover"
      description="Plan and execute commissioning activities and handover procedures for building services systems."
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

export default HNCModule5Section5;
