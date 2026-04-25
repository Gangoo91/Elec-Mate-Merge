import { Eye, Zap, Shield, RotateCcw, TestTube, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '4.5.1',
      title: 'Visual inspections',
      description: 'Systematic visual inspection procedures and safety checks',
      icon: Eye,
      href: '/study-centre/apprentice/m-o-e-t-module4-section5-1',
    },
    {
      number: '4.5.2',
      title: 'Continuity and polarity testing',
      description: 'Testing electrical continuity and verifying correct polarity',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module4-section5-2',
    },
    {
      number: '4.5.3',
      title: 'Insulation resistance',
      description: 'Measuring and evaluating insulation resistance values',
      icon: Shield,
      href: '/study-centre/apprentice/m-o-e-t-module4-section5-3',
    },
    {
      number: '4.5.4',
      title: 'Earth fault loop impedance',
      description: 'Testing earth fault loop impedance and protective conductor integrity',
      icon: RotateCcw,
      href: '/study-centre/apprentice/m-o-e-t-module4-section5-4',
    },
    {
      number: '4.5.5',
      title: 'RCD testing',
      description: 'Testing residual current devices and protective systems',
      icon: TestTube,
      href: '/study-centre/apprentice/m-o-e-t-module4-section5-5',
    },
    {
      number: '4.5.6',
      title: 'Functional testing of equipment',
      description: 'Operational testing and performance verification procedures',
      icon: Settings,
      href: '/study-centre/apprentice/m-o-e-t-module4-section5-6',
    },
  ];


const MOETModule4Section5 = () => {
  useSEO(
    'Section 4.5: Testing and Inspection - MOET Module 4',
    'Visual inspections, continuity, insulation resistance, earth fault testing and functional testing'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={5}
      title="Testing and inspection"
      description="Visual inspections, continuity, insulation resistance, earth fault testing and functional testing."
      tone="orange"
      subsectionsCount={subsections.length}
    >
      {subsections.map((subsection, index) => (
        <ModuleCard
          key={index}
          number={subsection.number}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          href={subsection.href}
        />
      ))}
    </SectionShell>
  );
};

export default MOETModule4Section5;
