import { ArrowLeft, PieChart, Activity, ArrowLeftRight, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Budgeting Methods That Work',
    icon: PieChart,
    description:
      "The 50/30/20 rule, zero-based budgeting, envelope system, and the Tradesperson's Five-Account System",
  },
  {
    id: 2,
    title: 'Managing Irregular Income',
    icon: Activity,
    description:
      'Income volatility, baseline month approach, income smoothing, tax provision rules, and seasonal planning',
  },
  {
    id: 3,
    title: 'Business vs Personal Finances',
    icon: ArrowLeftRight,
    description:
      'Why separation matters, business banking, record-keeping for MTD, invoicing, and VAT threshold awareness',
  },
  {
    id: 4,
    title: 'Tools & Systems for Financial Management',
    icon: Wrench,
    description:
      'Accounting software comparison, banking apps, receipt management, budgeting apps, and HMRC digital tools',
  },
];

export default function PFModule2() {
  useSEO({
    title: 'Module 2: Budgeting & Cash Flow | Personal Finance & Financial Wellbeing',
    description:
      'Budgeting methods, managing irregular income, business vs personal finances, and tools for financial management.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">50 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Budgeting &amp; Cash Flow
            </h1>
            <p className="text-white text-sm sm:text-base">
              Practical budgeting methods for tradespeople, managing irregular income, separating
              business and personal money, and the tools to make it easy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
