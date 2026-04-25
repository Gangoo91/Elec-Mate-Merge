import { Server, LayoutGrid, GitBranch, Battery, Activity, Gauge } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'LV switchgear selection',
    description:
      'Switchboards, form separation, IP ratings, fault ratings and type-tested assemblies',
    icon: Server,
    href: '../h-n-c-module4-section5-1',
  },
  {
    number: '5.2',
    title: 'Distribution board design',
    description:
      'Ways, diversity allowances, labelling requirements and accessibility considerations',
    icon: LayoutGrid,
    href: '../h-n-c-module4-section5-2',
  },
  {
    number: '5.3',
    title: 'Busbar systems',
    description: 'Rising mains, busbar trunking, tap-off units and high-current distribution',
    icon: GitBranch,
    href: '../h-n-c-module4-section5-3',
  },
  {
    number: '5.4',
    title: 'UPS and standby power',
    description:
      'UPS types, sizing calculations, generator coordination and critical load support',
    icon: Battery,
    href: '../h-n-c-module4-section5-4',
  },
  {
    number: '5.5',
    title: 'Power quality',
    description:
      'Voltage regulation, transient protection, earthing systems and EMC considerations',
    icon: Activity,
    href: '../h-n-c-module4-section5-5',
  },
  {
    number: '5.6',
    title: 'Metering and monitoring',
    description: 'Sub-metering strategies, energy management systems and BMS integration',
    icon: Gauge,
    href: '../h-n-c-module4-section5-6',
  },
];

const HNCModule4Section5 = () => {
  useSEO(
    'Power distribution design - HNC Module 4 Section 5 | Building Services Design',
    'Master power distribution design: LV switchgear, distribution boards, busbar systems, UPS, standby power, power quality and metering.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={5}
      title="Power distribution design"
      description="Design robust power distribution systems that provide reliable, high-quality electrical supplies throughout buildings."
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

export default HNCModule4Section5;
