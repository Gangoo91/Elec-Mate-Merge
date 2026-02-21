import { ArrowLeft, Shield, AlertTriangle, Sparkles, Globe, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Difficult Mentoring Situations',
    icon: AlertTriangle,
    description:
      'The reluctant learner, the overconfident learner, repetitive mistakes, personal problems, generational differences',
  },
  {
    id: 2,
    title: 'Maintaining Motivation & Engagement',
    icon: Sparkles,
    description:
      'Self-Determination Theory in practice, growth mindset (Dweck), flow states, recognition, connecting work to goals',
  },
  {
    id: 3,
    title: 'Diversity, Inclusion & Cross-Cultural Mentoring',
    icon: Globe,
    description:
      'Equality Act 2010, unconscious bias, language barriers, neurodiversity, gender in a male-dominated industry',
  },
  {
    id: 4,
    title: 'Your Development as a Mentor',
    icon: TrendingUp,
    description:
      'Reflective practice, seeking feedback, CPD pathways, building a mentoring portfolio, the ripple effect',
  },
];

export default function MDModule5() {
  useSEO({
    title: 'Module 5: Challenging Situations & Professional Growth | Mentoring & Developing Others',
    description:
      'Difficult mentoring situations, maintaining motivation, diversity and inclusion, and your development as a mentor.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../mentoring-developing-others">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
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
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Challenging Situations &amp; Professional Growth
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Handling difficult mentoring scenarios, keeping learners motivated, embracing
              diversity, and developing your own practice as a mentor
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../md-module-5-section-${section.id}`}
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
