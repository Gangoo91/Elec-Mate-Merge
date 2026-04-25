import { CircuitBoard, Lightbulb, Shield, Zap, Thermometer, AlertTriangle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'Ring and radial circuit faults',
    description: 'Common faults in ring final and radial circuits and their diagnosis',
    icon: CircuitBoard,
    href: '../level3-module4-section3-1',
  },
  {
    number: '3.2',
    title: 'Lighting circuit faults',
    description: 'Fault finding in lighting circuits including switching and control problems',
    icon: Lightbulb,
    href: '../level3-module4-section3-2',
  },
  {
    number: '3.3',
    title: 'Protective device tripping',
    description: 'MCBs, RCDs, RCBOs tripping faults and protective device malfunctions',
    icon: Shield,
    href: '../level3-module4-section3-3',
  },
  {
    number: '3.4',
    title: 'Earthing and bonding issues',
    description: 'Earth continuity problems, bonding failures and earthing system faults',
    icon: Zap,
    href: '../level3-module4-section3-4',
  },
  {
    number: '3.5',
    title: 'Appliance and equipment faults',
    description: 'Fault diagnosis in electrical appliances and fixed equipment',
    icon: AlertTriangle,
    href: '../level3-module4-section3-5',
  },
  {
    number: '3.6',
    title: 'Overheating and insulation breakdown',
    description: 'Thermal faults, insulation failures and degradation problems',
    icon: Thermometer,
    href: '../level3-module4-section3-6',
  },
];

const Level3Module4Section3 = () => {
  useSEO(
    'Section 3: Common Faults in Electrical Systems - Level 3 Module 4',
    'Ring/radial circuits, lighting, protective devices, earthing and equipment faults'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={3}
      title="Common faults in electrical systems"
      description="Ring and radial circuits, lighting, protective devices, earthing and equipment faults."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module4-section2"
      prevSectionLabel="Diagnostic tools and equipment"
      nextSectionHref="../level3-module4-section4"
      nextSectionLabel="Systematic fault-finding techniques"
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

export default Level3Module4Section3;
