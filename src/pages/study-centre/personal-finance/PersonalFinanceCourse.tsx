import {
  PoundSterling,
  Calculator,
  CreditCard,
  Landmark,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding your money',
    description:
      'Income types for electricians, tax basics for tradespeople, your true take-home pay and a financial health check.',
    icon: PoundSterling,
    duration: '50 mins',
    link: '../pf-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Budgeting & cash flow',
    description:
      'Budgeting methods, managing irregular income, business vs personal finances and tools for financial management.',
    icon: Calculator,
    duration: '50 mins',
    link: '../pf-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Debt management & credit',
    description:
      'Understanding UK credit, good debt vs bad debt, dealing with existing debt and consumer rights.',
    icon: CreditCard,
    duration: '50 mins',
    link: '../pf-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Pensions & retirement planning',
    description:
      'State Pension basics, workplace pensions, self-employed pension options and planning for retirement.',
    icon: Landmark,
    duration: '50 mins',
    link: '../pf-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Financial protection & planning ahead',
    description:
      'Building your emergency fund, insurance for tradespeople, tax-efficient saving and your financial action plan.',
    icon: ShieldCheck,
    duration: '50 mins',
    link: '../pf-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../pf-module-6',
    isExam: true,
  },
];

export default function PersonalFinanceCourse() {
  useSEO({
    title: 'Personal finance & financial wellbeing | Personal development | Elec-Mate',
    description:
      'Personal finance for electricians and tradespeople — budgeting, tax, pensions, debt and planning ahead. Based on Open University Managing My Money, MoneyHelper, HMRC and The Pensions Regulator.',
  });

  return (
    <CourseShell
      backTo="/study-centre/personal-development"
      backLabel="Personal development"
      eyebrow="Personal development"
      title="Personal finance & financial wellbeing"
      description="Budgeting, tax, pensions, debt and planning ahead — based on Open University Managing My Money, MoneyHelper, HMRC and The Pensions Regulator."
      tone="purple"
      level="Foundation"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="5h"
    >
      {modules.map((mod, index) => (
        <ModuleCard
          key={mod.moduleNumber}
          to={mod.link}
          moduleNumber={mod.moduleNumber}
          title={mod.title}
          description={mod.description}
          icon={mod.icon}
          duration={mod.duration}
          isExam={mod.isExam}
          index={index}
        />
      ))}
    </CourseShell>
  );
}
