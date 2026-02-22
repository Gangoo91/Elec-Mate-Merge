import { ArrowLeft, PiggyBank, ShieldAlert, Percent, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Building Your Emergency Fund',
    icon: PiggyBank,
    description:
      'MoneyHelper recommendations, employed vs self-employed targets, where to save, how to start, and when to use it',
  },
  {
    id: 2,
    title: 'Insurance for Tradespeople',
    icon: ShieldAlert,
    description:
      'Public liability, professional indemnity, tools cover, van insurance, income protection, and life insurance',
  },
  {
    id: 3,
    title: 'Tax-Efficient Saving',
    icon: Percent,
    description:
      'ISAs, Lifetime ISA, Help to Save, Stocks & Shares ISA, Premium Bonds, and the tax-efficient hierarchy',
  },
  {
    id: 4,
    title: 'Financial Goals & Your Action Plan',
    icon: Target,
    description:
      'SMART financial goals, short/medium/long-term planning, your personal financial action plan, and annual review',
  },
];

export default function PFModule5() {
  useSEO({
    title:
      'Module 5: Financial Protection & Planning Ahead | Personal Finance & Financial Wellbeing',
    description:
      'Building your emergency fund, insurance for tradespeople, tax-efficient saving, and your financial action plan.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../personal-finance">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Personal Finance
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <span className="text-rose-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">50 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Financial Protection &amp; Planning Ahead
            </h1>
            <p className="text-white text-sm sm:text-base">
              Building a safety net, protecting your income and assets, saving tax-efficiently, and
              creating your personal financial action plan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
