import { ArrowLeft, Activity, BookOpen, HardHat, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What Is Mental Health?',
    icon: Activity,
    description:
      'The mental health continuum, mental health vs mental illness, and why everyone has mental health',
  },
  {
    id: 2,
    title: 'Common Mental Health Conditions',
    icon: BookOpen,
    description:
      'Depression, anxiety, PTSD, and substance misuse — what they look like and how they affect work',
  },
  {
    id: 3,
    title: 'Risk Factors in Construction',
    icon: HardHat,
    description:
      'Long hours, job insecurity, physical demands, and why construction has the highest suicide rate of any industry',
  },
  {
    id: 4,
    title: 'Breaking the Stigma',
    icon: Megaphone,
    description:
      "Why tradespeople don't talk, masculinity and mental health, and how to change the culture on site",
  },
];

export default function MentalHealthModule1() {
  useSEO({
    title: 'Module 1: Understanding Mental Health | Mental Health Awareness',
    description:
      'What mental health means, common conditions, risk factors in construction, and breaking the stigma.',
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
              <Link to="../mental-health-awareness">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Mental Health Awareness
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
              <span className="text-white text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Understanding Mental Health
            </h1>
            <p className="text-white text-sm sm:text-base">
              What mental health really means, common conditions in the trades, risk factors unique
              to construction, and breaking down the stigma
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../mental-health-module-1-section-${section.id}`}
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
