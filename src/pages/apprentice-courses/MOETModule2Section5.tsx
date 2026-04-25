import { Cable, Wrench, Zap, TestTube } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '2.5.1',
      title: 'Conductors and insulation materials',
      description: 'Electrical materials, properties and selection criteria',
      icon: Cable,
      href: '/study-centre/apprentice/m-o-e-t-module2-section5-1',
    },
    {
      number: '2.5.2',
      title: 'Selection and use of hand tools',
      description: 'Hand tool selection, maintenance and safe operation',
      icon: Wrench,
      href: '/study-centre/apprentice/m-o-e-t-module2-section5-2',
    },
    {
      number: '2.5.3',
      title: 'Selection and use of power tools',
      description: 'Power tool selection, safety and maintenance requirements',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module2-section5-3',
    },
    {
      number: '2.5.4',
      title: 'Test equipment (multimeters, clamp meters, megohmmeters)',
      description: 'Electrical test equipment operation and calibration',
      icon: TestTube,
      href: '/study-centre/apprentice/m-o-e-t-module2-section5-4',
    },
  ];


const MOETModule2Section5 = () => {
  useSEO(
    'Materials, Tools and Test Equipment - MOET Module 2',
    'Conductors, insulation, hand tools, power tools and test equipment'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={5}
      title="Materials, tools and test equipment"
      description="Conductors, insulation, hand tools, power tools and test equipment."
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

export default MOETModule2Section5;
