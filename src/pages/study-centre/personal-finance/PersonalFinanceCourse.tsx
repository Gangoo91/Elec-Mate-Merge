import {
  ArrowLeft,
  Wallet,
  PoundSterling,
  Calculator,
  CreditCard,
  Landmark,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  FileText,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModuleCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding Your Money',
    description:
      'Income types for electricians, tax basics for tradespeople, your true take-home pay, and a financial health check',
    icon: PoundSterling,
    duration: '50 mins',
    link: '../pf-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Budgeting & Cash Flow',
    description:
      'Budgeting methods, managing irregular income, business vs personal finances, and tools for financial management',
    icon: Calculator,
    duration: '50 mins',
    link: '../pf-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Debt Management & Credit',
    description:
      'Understanding UK credit, good debt vs bad debt, dealing with existing debt, and consumer rights',
    icon: CreditCard,
    duration: '50 mins',
    link: '../pf-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Pensions & Retirement Planning',
    description:
      'State Pension basics, workplace pensions, self-employed pension options, and planning for retirement',
    icon: Landmark,
    duration: '50 mins',
    link: '../pf-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Financial Protection & Planning Ahead',
    description:
      'Building your emergency fund, insurance for tradespeople, tax-efficient saving, and your financial action plan',
    icon: ShieldCheck,
    duration: '50 mins',
    link: '../pf-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock Exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../pf-module-6',
    isExam: true,
  },
];

export default function PersonalFinanceCourse() {
  useSEO({
    title: 'Personal Finance & Financial Wellbeing | Personal Development',
    description:
      'Complete personal finance course for electricians and tradespeople. Based on Open University Managing My Money, MoneyHelper, HMRC, and The Pensions Regulator.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <header className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm px-4 sm:px-8 lg:px-12 pt-6 pb-4">
        <div className="max-w-5xl mx-auto">
          <Link to="/study-centre/personal-development">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground transition-colors p-0 h-auto touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Personal Development
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-4 sm:px-8 lg:px-12 pb-12">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Course Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-400/5 to-transparent border border-rose-500/15 p-5 sm:p-8">
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/20">
                  <Wallet className="h-6 w-6 text-rose-400" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Foundation
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                Personal Finance &amp; Financial Wellbeing
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-white mt-1 max-w-2xl">
                Budgeting, tax, pensions, debt &amp; planning ahead &mdash; based on Open University
                Managing My Money, MoneyHelper, HMRC, and The Pensions Regulator
              </p>
            </div>
          </div>

          {/* Course Stats Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground">6</p>
                <p className="text-[10px] sm:text-xs text-white">Modules</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
              <div className="p-2 rounded-lg bg-rose-500/10">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-rose-400" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground">200+</p>
                <p className="text-[10px] sm:text-xs text-white">Pages</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
              <div className="p-2 rounded-lg bg-rose-500/10">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-rose-400" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground">5h</p>
                <p className="text-[10px] sm:text-xs text-white">Total</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
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
          </div>
        </div>
      </main>
    </div>
  );
}
