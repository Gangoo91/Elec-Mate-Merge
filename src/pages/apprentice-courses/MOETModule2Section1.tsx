import { Zap, Calculator, BarChart3, Ruler, FileText } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '2.1.1',
      title: 'Voltage, current, resistance, power',
      description: 'Understanding fundamental electrical quantities and relationships',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module2-section1-1',
    },
    {
      number: '2.1.2',
      title: "Ohm's Law and Watt's Law",
      description: 'Application of fundamental electrical laws and calculations',
      icon: Calculator,
      href: '/study-centre/apprentice/m-o-e-t-module2-section1-2',
    },
    {
      number: '2.1.3',
      title: 'Energy and efficiency',
      description: 'Energy calculations and efficiency considerations in electrical systems',
      icon: BarChart3,
      href: '/study-centre/apprentice/m-o-e-t-module2-section1-3',
    },
    {
      number: '2.1.4',
      title: 'Units and measurement',
      description: 'Electrical units, prefixes and measurement principles',
      icon: Ruler,
      href: '/study-centre/apprentice/m-o-e-t-module2-section1-4',
    },
    {
      number: '2.1.5',
      title: 'Electrical symbols and conventions',
      description: 'Standard electrical symbols and schematic conventions',
      icon: FileText,
      href: '/study-centre/apprentice/m-o-e-t-module2-section1-5',
    },
  ];


const MOETModule2Section1 = () => {
  useSEO(
    'Electrical Fundamentals - MOET Module 2',
    "Voltage, current, resistance, power, Ohm's and Watt's laws, units and symbols"
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={1}
      title="Electrical fundamentals"
      description="Voltage, current, resistance, power, Ohm's and Watt's laws, units and symbols."
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

export default MOETModule2Section1;
