import {
  ArrowLeft,
  ClipboardCheck,
  Scale,
  Eye,
  BarChart3,
  MessageSquareWarning,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Principles of Assessment',
    icon: Scale,
    description:
      'VACSR principles, formative vs summative assessment, assessment types, competence-based language, assessment planning',
  },
  {
    id: 2,
    title: 'Observation & Questioning Skills for Assessment',
    icon: Eye,
    description:
      'Structured observation, Bloom\u2019s Taxonomy questioning, recording evidence, assessor bias awareness',
  },
  {
    id: 3,
    title: 'Kirkpatrick\u2019s Four Levels of Training Evaluation',
    icon: BarChart3,
    description:
      'Reaction, Learning, Behaviour, Results — evaluating training effectiveness beyond happy sheets',
  },
  {
    id: 4,
    title: 'Giving Assessment Decisions & Managing Disagreement',
    icon: MessageSquareWarning,
    description:
      'Delivering "not yet competent" constructively, action planning, appeals process, internal quality assurance',
  },
];

export default function MDModule4() {
  useSEO({
    title: 'Module 4: Assessment & Evaluation | Mentoring & Developing Others',
    description:
      'Principles of assessment, observation and questioning skills, Kirkpatrick\u2019s four levels, and giving assessment decisions.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Assessment &amp; Evaluation
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              How to assess learner competence fairly and reliably, evaluate training effectiveness,
              and deliver assessment decisions constructively
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../md-module-4-section-${section.id}`}
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
