import { ArrowLeft, Wrench, Target, HelpCircle, MessageSquare, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The GROW Model & Coaching Conversations',
    icon: Target,
    description:
      'Goal, Reality, Options, Will/Way Forward — structured coaching, mentoring vs coaching vs teaching, ILM competencies',
  },
  {
    id: 2,
    title: 'Questioning Techniques & Active Listening',
    icon: HelpCircle,
    description:
      'Open vs closed questions, Socratic questioning, funnel technique, Covey\u2019s listening levels, RASA framework',
  },
  {
    id: 3,
    title: 'Giving Effective Feedback',
    icon: MessageSquare,
    description:
      'Pendleton\u2019s Rules, SBI Model, Johari Window, feedback timing, praise in public and correct in private',
  },
  {
    id: 4,
    title: 'Building Trust & the Mentoring Relationship',
    icon: Handshake,
    description:
      'Relationship lifecycle, psychological safety (Edmondson), confidentiality, mentoring agreements, role modelling',
  },
];

export default function MDModule2() {
  useSEO({
    title: 'Module 2: The Mentor\u2019s Toolkit | Mentoring & Developing Others',
    description:
      'The GROW model, questioning techniques, giving effective feedback, building trust and the mentoring relationship.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              The Mentor&rsquo;s Toolkit
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Practical tools and techniques for effective mentoring &mdash; coaching conversations,
              questioning, feedback, and building trust on site
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../md-module-2-section-${section.id}`}
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
