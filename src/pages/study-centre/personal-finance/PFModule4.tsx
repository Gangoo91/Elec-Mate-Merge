import { ArrowLeft, Building2, Building, UserCog, Sunset } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'State Pension Basics',
    icon: Building2,
    description:
      'Full new State Pension amount, qualifying years, NI contributions, checking your forecast, State Pension age',
  },
  {
    id: 2,
    title: 'Workplace Pensions & Auto-Enrolment',
    icon: Building,
    description:
      'Pensions Act 2008, minimum contributions, JIB pension scheme, NEST, opting out, employer duties',
  },
  {
    id: 3,
    title: 'Self-Employed Pension Options',
    icon: UserCog,
    description:
      'The pension gap, SIPPs, stakeholder pensions, how much to save, investment basics, making it happen',
  },
  {
    id: 4,
    title: 'Planning for Retirement',
    icon: Sunset,
    description:
      'How much you need, pension freedoms, career transition planning, three-pot approach, pension calculators',
  },
];

export default function PFModule4() {
  useSEO({
    title: 'Module 4: Pensions & Retirement Planning | Personal Finance & Financial Wellbeing',
    description:
      'State Pension basics, workplace pensions, self-employed pension options, and planning for retirement.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">50 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Pensions &amp; Retirement Planning
            </h1>
            <p className="text-white text-sm sm:text-base">
              The State Pension, workplace and self-employed pension options, and how to plan for a
              comfortable retirement as a tradesperson
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../pf-module-4-section-${section.id}`}
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
