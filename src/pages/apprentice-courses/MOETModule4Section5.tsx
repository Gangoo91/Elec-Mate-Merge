import { Eye, Zap, Shield, RotateCcw, TestTube, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.5.1',
    title: 'Insulation resistance testing',
    description: 'Test voltages, minimum values and interpreting insulation resistance results',
    icon: Shield,
    href: '/study-centre/apprentice/m-o-e-t-module4-section5-1',
  },
  {
    number: '4.5.2',
    title: 'Continuity testing',
    description: 'Protective conductor and ring final continuity, and what the readings tell you',
    icon: Zap,
    href: '/study-centre/apprentice/m-o-e-t-module4-section5-2',
  },
  {
    number: '4.5.3',
    title: 'Earth fault loop impedance testing',
    description: 'Measuring Zs, comparing against limits and confirming disconnection times',
    icon: RotateCcw,
    href: '/study-centre/apprentice/m-o-e-t-module4-section5-3',
  },
  {
    number: '4.5.4',
    title: 'Functional testing',
    description: 'Proving equipment and protective devices operate correctly in service',
    icon: Settings,
    href: '/study-centre/apprentice/m-o-e-t-module4-section5-4',
  },
  {
    number: '4.5.5',
    title: 'Test documentation and certification',
    description: 'Recording results and issuing the correct certificate or report',
    icon: TestTube,
    href: '/study-centre/apprentice/m-o-e-t-module4-section5-5',
  },
  {
    number: '4.5.6',
    title: 'Commissioning procedures',
    description: 'Bringing plant into service safely and handing it over with evidence',
    icon: Eye,
    href: '/study-centre/apprentice/m-o-e-t-module4-section5-6',
  },
];

const MOETModule4Section5 = () => {
  useSEO(
    'Section 4.5: Testing and Inspection - MOET Module 4',
    'Insulation resistance, continuity, earth fault loop impedance, functional testing, certification and commissioning'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={5}
      title="Testing and inspection"
      description="Insulation resistance, continuity, earth fault loop impedance, functional testing, certification and commissioning."
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
