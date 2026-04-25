import { BarChart3, Scale, LifeBuoy, FileCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Understanding credit in the UK',
    icon: BarChart3,
    description:
      'Credit reference agencies, what affects your score, self-employed borrowing challenges and building good credit.',
  },
  {
    id: 2,
    title: 'Good debt vs bad debt',
    icon: Scale,
    description:
      'The debt spectrum, asset-building vs consumption debt, van finance options, tool finance and BNPL risks.',
  },
  {
    id: 3,
    title: 'Dealing with existing debt',
    icon: LifeBuoy,
    description:
      'Priority vs non-priority debts, repayment strategies, free debt advice, formal solutions and HMRC Time to Pay.',
  },
  {
    id: 4,
    title: 'Consumer rights & credit',
    icon: FileCheck,
    description:
      'Consumer Credit Act, Section 75, bailiff powers, Financial Ombudsman Service and distance selling rights.',
  },
];

export default function PFModule3() {
  useSEO({
    title:
      'Module 3: Debt management & credit | Personal finance & financial wellbeing | Elec-Mate',
    description:
      'Understanding UK credit, good debt vs bad debt, dealing with existing debt and consumer rights.',
  });

  return (
    <ModuleShell
      backTo="../personal-finance"
      backLabel="Personal finance & financial wellbeing"
      moduleNumber={3}
      title="Debt management & credit"
      description="How credit works in the UK, understanding good and bad debt, strategies for managing existing debt, and knowing your consumer rights."
      tone="purple"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../pf-module-2"
      prevModuleLabel="Budgeting & cash flow"
      nextModuleHref="../pf-module-4"
      nextModuleLabel="Pensions & retirement planning"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pf-module-3-section-${section.id}`}
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
