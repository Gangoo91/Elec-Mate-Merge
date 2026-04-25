import { PieChart, Activity, ArrowLeftRight, Wrench } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Budgeting methods that work',
    icon: PieChart,
    description:
      "The 50/30/20 rule, zero-based budgeting, envelope system and the Tradesperson's Five-Account System.",
  },
  {
    id: 2,
    title: 'Managing irregular income',
    icon: Activity,
    description:
      'Income volatility, baseline month approach, income smoothing, tax provision rules and seasonal planning.',
  },
  {
    id: 3,
    title: 'Business vs personal finances',
    icon: ArrowLeftRight,
    description:
      'Why separation matters, business banking, record-keeping for MTD, invoicing and VAT threshold awareness.',
  },
  {
    id: 4,
    title: 'Tools & systems for financial management',
    icon: Wrench,
    description:
      'Accounting software comparison, banking apps, receipt management, budgeting apps and HMRC digital tools.',
  },
];

export default function PFModule2() {
  useSEO({
    title: 'Module 2: Budgeting & cash flow | Personal finance & financial wellbeing | Elec-Mate',
    description:
      'Budgeting methods, managing irregular income, business vs personal finances and tools for financial management.',
  });

  return (
    <ModuleShell
      backTo="../personal-finance"
      backLabel="Personal finance & financial wellbeing"
      moduleNumber={2}
      title="Budgeting & cash flow"
      description="Practical budgeting methods for tradespeople, managing irregular income, separating business and personal money, and the tools to make it easy."
      tone="purple"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../pf-module-1"
      prevModuleLabel="Understanding your money"
      nextModuleHref="../pf-module-3"
      nextModuleLabel="Debt management & credit"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pf-module-2-section-${section.id}`}
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
