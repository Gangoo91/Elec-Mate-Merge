import { Trash2, AlertTriangle, Zap, Leaf, Recycle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '1.5.1',
      title: 'Waste management and recycling',
      description: 'Proper disposal, segregation and recycling of maintenance waste',
      icon: Trash2,
      href: '/study-centre/apprentice/m-o-e-t-module1-section5-1',
    },
    {
      number: '1.5.2',
      title: 'Hazardous substances (COSHH awareness)',
      description: 'Control of substances hazardous to health in maintenance work',
      icon: AlertTriangle,
      href: '/study-centre/apprentice/m-o-e-t-module1-section5-2',
    },
    {
      number: '1.5.3',
      title: 'Energy efficiency in maintenance',
      description: 'Maintaining and improving system energy efficiency',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module1-section5-3',
    },
    {
      number: '1.5.4',
      title: 'Environmental legislation & local policies',
      description: 'Understanding environmental laws and site-specific policies',
      icon: Leaf,
      href: '/study-centre/apprentice/m-o-e-t-module1-section5-4',
    },
    {
      number: '1.5.5',
      title: 'Sustainable work practices',
      description: 'Implementing sustainable approaches to maintenance operations',
      icon: Recycle,
      href: '/study-centre/apprentice/m-o-e-t-module1-section5-5',
    },
  ];


const MOETModule1Section5 = () => {
  useSEO(
    'Environmental and Sustainability Practices - MOET Module 1',
    'Waste management, COSHH, energy efficiency and environmental legislation'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={5}
      title="Environmental and sustainability practices"
      description="Waste management, COSHH, energy efficiency and environmental legislation."
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

export default MOETModule1Section5;
