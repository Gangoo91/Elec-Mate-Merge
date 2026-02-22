import { ArrowLeft, Briefcase, Receipt, TrendingDown, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Income Types for Electricians',
    icon: Briefcase,
    description:
      'PAYE employed, self-employed sole trader, CIS subcontractor, limited company director, JIB grading and pay rates, IR35',
  },
  {
    id: 2,
    title: 'Tax Basics for Tradespeople',
    icon: Receipt,
    description:
      'Self-assessment, Income Tax bands, National Insurance, allowable expenses, capital allowances, Making Tax Digital',
  },
  {
    id: 3,
    title: 'Understanding Your True Take-Home Pay',
    icon: TrendingDown,
    description:
      'The day rate illusion, employed vs self-employed worked examples, hidden costs of self-employment, like-for-like comparison',
  },
  {
    id: 4,
    title: 'Financial Health Check & Money Mindset',
    icon: HeartPulse,
    description:
      'Financial health score, money mindset, common trade financial mistakes, setting your financial baseline',
  },
];

export default function PFModule1() {
  useSEO({
    title: 'Module 1: Understanding Your Money | Personal Finance & Financial Wellbeing',
    description:
      'Income types for electricians, tax basics for tradespeople, your true take-home pay, and a financial health check.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">50 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Understanding Your Money
            </h1>
            <p className="text-white text-sm sm:text-base">
              How electricians earn, how the tax system works, what you actually take home, and how
              to assess your financial health
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
