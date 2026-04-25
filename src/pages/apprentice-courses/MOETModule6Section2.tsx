import { CircuitBoard, Minus, Settings, Hash } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '6.2.1',
      title: 'Circuit diagrams and symbols',
      description: 'Standard electrical symbols, circuit representation and schematic conventions',
      icon: CircuitBoard,
      href: '/study-centre/apprentice/m-o-e-t-module6-section2-1',
    },
    {
      number: '6.2.2',
      title: 'Single-line diagrams',
      description: 'Power system representation, SLD conventions and system overviews',
      icon: Minus,
      href: '/study-centre/apprentice/m-o-e-t-module6-section2-2',
    },
    {
      number: '6.2.3',
      title: 'Control circuit wiring diagrams',
      description: 'Control circuit layouts, wiring methods and connection diagrams',
      icon: Settings,
      href: '/study-centre/apprentice/m-o-e-t-module6-section2-3',
    },
    {
      number: '6.2.4',
      title: 'Labelling and numbering standards',
      description: 'Component labelling, wire numbering and identification standards',
      icon: Hash,
      href: '/study-centre/apprentice/m-o-e-t-module6-section2-4',
    },
  ];


const MOETModule6Section2 = () => {
  useSEO(
    'Section 6.2: Electrical Schematics and Wiring Diagrams - MOET Module 6',
    'Circuit diagrams, single-line diagrams, control circuits and labelling standards'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={2}
      title="Electrical schematics and wiring diagrams"
      description="Circuit diagrams, single-line diagrams, control circuits and labelling standards."
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

export default MOETModule6Section2;
