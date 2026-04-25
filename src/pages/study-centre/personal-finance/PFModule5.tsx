import { PiggyBank, ShieldAlert, Percent, Target } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Building your emergency fund',
    icon: PiggyBank,
    description:
      'MoneyHelper recommendations, employed vs self-employed targets, where to save, how to start and when to use it.',
  },
  {
    id: 2,
    title: 'Insurance for tradespeople',
    icon: ShieldAlert,
    description:
      'Public liability, professional indemnity, tools cover, van insurance, income protection and life insurance.',
  },
  {
    id: 3,
    title: 'Tax-efficient saving',
    icon: Percent,
    description:
      'ISAs, Lifetime ISA, Help to Save, Stocks & Shares ISA, Premium Bonds and the tax-efficient hierarchy.',
  },
  {
    id: 4,
    title: 'Financial goals & your action plan',
    icon: Target,
    description:
      'SMART financial goals, short/medium/long-term planning, your personal financial action plan and annual review.',
  },
];

export default function PFModule5() {
  useSEO({
    title:
      'Module 5: Financial protection & planning ahead | Personal finance & financial wellbeing | Elec-Mate',
    description:
      'Building your emergency fund, insurance for tradespeople, tax-efficient saving and your financial action plan.',
  });

  return (
    <ModuleShell
      backTo="../personal-finance"
      backLabel="Personal finance & financial wellbeing"
      moduleNumber={5}
      title="Financial protection & planning ahead"
      description="Building a safety net, protecting your income and assets, saving tax-efficiently and creating your personal financial action plan."
      tone="purple"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../pf-module-4"
      prevModuleLabel="Pensions & retirement planning"
      nextModuleHref="../pf-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pf-module-5-section-${section.id}`}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
