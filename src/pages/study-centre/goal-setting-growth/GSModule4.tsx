import { ArrowLeft, BarChart3, BookOpen, GraduationCap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Measuring Progress &amp; Celebrating Wins',
    icon: BarChart3,
    description:
      'Lead vs lag measures, key metrics for electricians, tracking methods, psychology of progress, celebrating milestones, avoiding comparison trap, handling plateaus',
  },
  {
    id: 2,
    title: 'Reflective Practice &amp; Learning from Experience',
    icon: BookOpen,
    description:
      'Kolb Experiential Learning Cycle, Schon reflection-in/on-action, Gibbs Reflective Cycle, daily debrief, learning from mistakes, professional development journal',
  },
  {
    id: 3,
    title: 'CPD &amp; Continuous Professional Development',
    icon: GraduationCap,
    description:
      'BS 7671 amendments, ECS card renewal CPD, IET professional registration, NICEIC/NAPIT assessments, types of CPD, CITB training grants, building a CPD plan',
  },
  {
    id: 4,
    title: 'Accountability &amp; Support Systems',
    icon: Users,
    description:
      'The accountability effect, types of accountability, finding accountability in trades, role of mentoring, personal board of advisers, support for self-employed',
  },
];

export default function GSModule4() {
  useSEO({
    title: 'Module 4: Tracking Progress &amp; Continuous Improvement | Goal-Setting &amp; Growth',
    description:
      'Measuring progress and celebrating wins, reflective practice and learning from experience, CPD and continuous professional development, accountability and support systems.',
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
              <Link to="../goal-setting-growth">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Goal-Setting &amp; Growth
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
              <span className="text-white text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Tracking Progress &amp; Continuous Improvement
            </h1>
            <p className="text-white text-sm sm:text-base">
              How to measure progress effectively, learn from experience, maintain continuous
              professional development, and build accountability systems that keep you moving
              forward
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../gs-module-4-section-${section.id}`}
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
