import { ArrowLeft, BarChart3, Scale, LifeBuoy, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Understanding Credit in the UK',
    icon: BarChart3,
    description:
      'Credit reference agencies, what affects your score, self-employed borrowing challenges, building good credit',
  },
  {
    id: 2,
    title: 'Good Debt vs Bad Debt',
    icon: Scale,
    description:
      'The debt spectrum, asset-building vs consumption debt, van finance options, tool finance and BNPL risks',
  },
  {
    id: 3,
    title: 'Dealing with Existing Debt',
    icon: LifeBuoy,
    description:
      'Priority vs non-priority debts, repayment strategies, free debt advice, formal solutions, HMRC Time to Pay',
  },
  {
    id: 4,
    title: 'Consumer Rights & Credit',
    icon: FileCheck,
    description:
      'Consumer Credit Act, Section 75, bailiff powers, Financial Ombudsman Service, distance selling rights',
  },
];

export default function PFModule3() {
  useSEO({
    title: 'Module 3: Debt Management & Credit | Personal Finance & Financial Wellbeing',
    description:
      'Understanding UK credit, good debt vs bad debt, dealing with existing debt, and consumer rights.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">50 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Debt Management &amp; Credit
            </h1>
            <p className="text-white text-sm sm:text-base">
              How credit works in the UK, understanding good and bad debt, strategies for managing
              existing debt, and knowing your consumer rights
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
