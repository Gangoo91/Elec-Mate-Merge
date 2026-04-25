import { Briefcase, Receipt, TrendingDown, HeartPulse } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Income types for electricians',
    icon: Briefcase,
    description:
      'PAYE employed, self-employed sole trader, CIS subcontractor, limited company director, JIB grading and pay rates, IR35.',
  },
  {
    id: 2,
    title: 'Tax basics for tradespeople',
    icon: Receipt,
    description:
      'Self-assessment, Income Tax bands, National Insurance, allowable expenses, capital allowances and Making Tax Digital.',
  },
  {
    id: 3,
    title: 'Understanding your true take-home pay',
    icon: TrendingDown,
    description:
      'The day rate illusion, employed vs self-employed worked examples, hidden costs of self-employment and like-for-like comparison.',
  },
  {
    id: 4,
    title: 'Financial health check & money mindset',
    icon: HeartPulse,
    description:
      'Financial health score, money mindset, common trade financial mistakes and setting your financial baseline.',
  },
];

export default function PFModule1() {
  useSEO({
    title:
      'Module 1: Understanding your money | Personal finance & financial wellbeing | Elec-Mate',
    description:
      'Income types for electricians, tax basics for tradespeople, your true take-home pay and a financial health check.',
  });

  return (
    <ModuleShell
      backTo="../personal-finance"
      backLabel="Personal finance & financial wellbeing"
      moduleNumber={1}
      title="Understanding your money"
      description="How electricians earn, how the tax system works, what you actually take home and how to assess your financial health."
      tone="purple"
      sectionsCount={sections.length}
      duration="50 mins"
      nextModuleHref="../pf-module-2"
      nextModuleLabel="Budgeting & cash flow"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pf-module-1-section-${section.id}`}
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
