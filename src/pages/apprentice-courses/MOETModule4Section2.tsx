import { Eye, Thermometer, Zap, TestTube, DropletIcon, TrendingUp } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '4.2.1',
      title: 'Visual and sensory inspection',
      description: 'Systematic visual inspection techniques and sensory monitoring methods',
      icon: Eye,
      href: '/study-centre/apprentice/m-o-e-t-module4-section2-1',
    },
    {
      number: '4.2.2',
      title: 'Thermal imaging',
      description:
        'Infrared thermography principles, equipment and interpretation of thermal images',
      icon: Thermometer,
      href: '/study-centre/apprentice/m-o-e-t-module4-section2-2',
    },
    {
      number: '4.2.3',
      title: 'Vibration analysis',
      description: 'Vibration monitoring techniques, measurement methods and fault identification',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module4-section2-3',
    },
    {
      number: '4.2.4',
      title: 'Insulation resistance testing',
      description: 'Insulation testing methods, equipment and interpretation of results',
      icon: TestTube,
      href: '/study-centre/apprentice/m-o-e-t-module4-section2-4',
    },
    {
      number: '4.2.5',
      title: 'Oil and fluid analysis (where relevant)',
      description: 'Analysis of lubricating oils and hydraulic fluids for condition monitoring',
      icon: DropletIcon,
      href: '/study-centre/apprentice/m-o-e-t-module4-section2-5',
    },
    {
      number: '4.2.6',
      title: 'Trend analysis and predictive maintenance',
      description: 'Data analysis techniques and predictive maintenance strategies',
      icon: TrendingUp,
      href: '/study-centre/apprentice/m-o-e-t-module4-section2-6',
    },
  ];


const MOETModule4Section2 = () => {
  useSEO(
    'Section 4.2: Condition Monitoring Techniques - MOET Module 4',
    'Visual inspection, thermal imaging, vibration analysis, insulation testing and predictive maintenance'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={2}
      title="Condition monitoring techniques"
      description="Visual inspection, thermal imaging, vibration analysis, insulation testing and predictive maintenance."
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

export default MOETModule4Section2;
