import { Layout, Cable, Link2, Box, Tag } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '3.3.1',
      title: 'Layout and design of control panels',
      description: 'Control panel design principles, layout and component arrangement',
      icon: Layout,
      href: '/study-centre/apprentice/m-o-e-t-module3-section3-1',
    },
    {
      number: '3.3.2',
      title: 'Cable types and selection',
      description: 'Cable specifications, selection criteria and application guidelines',
      icon: Cable,
      href: '/study-centre/apprentice/m-o-e-t-module3-section3-2',
    },
    {
      number: '3.3.3',
      title: 'Terminations and connectors',
      description: 'Termination techniques, connector types and installation methods',
      icon: Link2,
      href: '/study-centre/apprentice/m-o-e-t-module3-section3-3',
    },
    {
      number: '3.3.4',
      title: 'Trunking, conduits and cable management',
      description: 'Cable containment systems, routing and management practices',
      icon: Box,
      href: '/study-centre/apprentice/m-o-e-t-module3-section3-4',
    },
    {
      number: '3.3.5',
      title: 'Labelling and identification standards',
      description: 'Identification systems, labelling standards and documentation',
      icon: Tag,
      href: '/study-centre/apprentice/m-o-e-t-module3-section3-5',
    },
  ];


const MOETModule3Section3 = () => {
  useSEO(
    'Control Panels and Wiring Systems - MOET Module 3',
    'Panel design, cable selection, terminations, containment and labelling'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={3}
      title="Control panels and wiring systems"
      description="Panel design, cable selection, terminations, containment and labelling."
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

export default MOETModule3Section3;
