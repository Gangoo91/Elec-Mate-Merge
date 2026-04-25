import { Calculator, Wallet, TrendingUp, FileWarning, Receipt, Scale } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'Estimating methods',
    description:
      'First principles estimating, benchmarking, parametric methods and building services pricing techniques',
    icon: Calculator,
    href: '../h-n-c-module5-section3-1',
  },
  {
    number: '3.2',
    title: 'Budget development',
    description:
      'Cost plans, contingency allowances, risk allowances, preliminaries and overhead calculations for MEP works',
    icon: Wallet,
    href: '../h-n-c-module5-section3-2',
  },
  {
    number: '3.3',
    title: 'Cost control',
    description:
      'Cost monitoring, progress reporting, forecasting techniques, cost value reconciliation and earned value analysis',
    icon: TrendingUp,
    href: '../h-n-c-module5-section3-3',
  },
  {
    number: '3.4',
    title: 'Variations and claims',
    description:
      'Variation valuation methods, entitlement assessment, notice requirements and claims substantiation',
    icon: FileWarning,
    href: '../h-n-c-module5-section3-4',
  },
  {
    number: '3.5',
    title: 'Final account',
    description:
      'Final measurement, account agreement, retention release, defects liability period and financial close-out',
    icon: Receipt,
    href: '../h-n-c-module5-section3-5',
  },
  {
    number: '3.6',
    title: 'Value engineering',
    description:
      'Options analysis, life cycle costing, whole life value assessment and cost-benefit evaluation for building services',
    icon: Scale,
    href: '../h-n-c-module5-section3-6',
  },
];

const HNCModule5Section3 = () => {
  useSEO(
    'Cost management - HNC Module 5 Section 3 | Building Services',
    'Master cost management: estimating methods, budget development, cost control, variations and claims, final accounts and value engineering for building services.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={3}
      title="Cost management"
      description="Apply financial management principles to building services projects from estimate to final account."
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

export default HNCModule5Section3;
