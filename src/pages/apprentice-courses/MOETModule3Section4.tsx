import { Lightbulb, AlertTriangle, Plug, Zap } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '3.4.1',
      title: 'General lighting circuits',
      description: 'Lighting circuit design, installation and control methods',
      icon: Lightbulb,
      href: '/study-centre/apprentice/m-o-e-t-module3-section4-1',
    },
    {
      number: '3.4.2',
      title: 'Emergency lighting systems',
      description: 'Emergency lighting requirements, testing and maintenance',
      icon: AlertTriangle,
      href: '/study-centre/apprentice/m-o-e-t-module3-section4-2',
    },
    {
      number: '3.4.3',
      title: 'Socket outlet and small power circuits',
      description: 'Power outlet installation, ring and radial circuits',
      icon: Plug,
      href: '/study-centre/apprentice/m-o-e-t-module3-section4-3',
    },
    {
      number: '3.4.4',
      title: 'Energy-efficient lighting technologies',
      description: 'LED technology, controls and energy efficiency measures',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module3-section4-4',
    },
  ];


const MOETModule3Section4 = () => {
  useSEO(
    'Lighting and Power Installations - MOET Module 3',
    'General lighting, emergency systems, socket circuits and energy efficiency'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={4}
      title="Lighting and power installations"
      description="General lighting, emergency systems, socket circuits and energy efficiency."
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

export default MOETModule3Section4;
