import { Sigma, Triangle, BarChart3, TrendingUp } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.6.1',
    title: 'Transposition and algebraic methods',
    description: 'Rearranging any formula for any subject, indices and engineering notation',
    icon: Sigma,
    href: '/study-centre/apprentice/m-o-e-t-module2-section6-1',
  },
  {
    number: '2.6.2',
    title: 'Trigonometry, areas and volumes',
    description: 'Conduit sets, the impedance and power triangles, and containment fill',
    icon: Triangle,
    href: '/study-centre/apprentice/m-o-e-t-module2-section6-2',
  },
  {
    number: '2.6.3',
    title: 'Statistics for maintenance data',
    description: 'Mean, median and mode, spread, and displaying condition-monitoring data',
    icon: BarChart3,
    href: '/study-centre/apprentice/m-o-e-t-module2-section6-3',
  },
  {
    number: '2.6.4',
    title: 'Rates of change and elementary calculus',
    description: 'Gradients, coefficients, time constants and the P-F interval',
    icon: TrendingUp,
    href: '/study-centre/apprentice/m-o-e-t-module2-section6-4',
  },
];

const MOETModule2Section6 = () => {
  useSEO(
    'Section 2.6: Engineering Mathematics - MOET Module 2',
    'Transposition, trigonometry, areas and volumes, statistics and rates of change for maintenance engineering technicians'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={6}
      title="Engineering mathematics"
      description="The maths a maintenance technician actually uses — rearranging formulae, setting out conduit, reading trend data and working out how long you have."
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

export default MOETModule2Section6;
