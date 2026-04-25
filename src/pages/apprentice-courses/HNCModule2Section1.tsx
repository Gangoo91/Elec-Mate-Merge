import { Thermometer, Flame, Sun, Calculator, Link2, Home } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Conduction',
    description: "Fourier's Law, thermal conductivity, material properties, composite walls",
    icon: Thermometer,
    href: '../h-n-c-module2-section1-1',
  },
  {
    number: '1.2',
    title: 'Convection',
    description: 'Natural and forced convection, heat transfer coefficients, surface conditions',
    icon: Flame,
    href: '../h-n-c-module2-section1-2',
  },
  {
    number: '1.3',
    title: 'Radiation',
    description: 'Stefan-Boltzmann law, emissivity, radiative exchange, surface temperatures',
    icon: Sun,
    href: '../h-n-c-module2-section1-3',
  },
  {
    number: '1.4',
    title: 'U-values and thermal resistance',
    description: 'Calculation methods, R-values, Part L requirements',
    icon: Calculator,
    href: '../h-n-c-module2-section1-4',
  },
  {
    number: '1.5',
    title: 'Thermal bridging',
    description: 'Linear and point bridges, psi values, condensation risk',
    icon: Link2,
    href: '../h-n-c-module2-section1-5',
  },
  {
    number: '1.6',
    title: 'Heat loss calculations',
    description: 'Fabric losses, ventilation losses, building heat load',
    icon: Home,
    href: '../h-n-c-module2-section1-6',
  },
];

const HNCModule2Section1 = () => {
  useSEO(
    'Heat transfer principles - HNC Module 2 Section 1 | Building Services Engineering',
    'Master heat transfer fundamentals: conduction, convection, radiation, U-values, thermal bridging and heat loss calculations for building services applications.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={1}
      title="Heat transfer principles"
      description="Understand the fundamental mechanisms of heat transfer and their application to building fabric performance."
      tone="purple"
      subsectionsCount={subsections.length}
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

export default HNCModule2Section1;
