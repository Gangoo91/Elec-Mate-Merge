import { ArrowLeft, BookOpen, Brain, RotateCcw, Layers, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Adult Learning Theory',
    icon: Brain,
    description:
      'Knowles\u2019 six principles of andragogy, pedagogy vs andragogy, Bloom\u2019s Taxonomy mapped to construction training',
  },
  {
    id: 2,
    title: 'Kolb\u2019s Experiential Learning Cycle',
    icon: RotateCcw,
    description:
      'Concrete experience, reflective observation, abstract conceptualisation, active experimentation and Honey & Mumford styles',
  },
  {
    id: 3,
    title: 'Scaffolding & the Zone of Proximal Development',
    icon: Layers,
    description:
      'Vygotsky\u2019s ZPD, Wood, Bruner & Ross scaffolding, Situational Leadership mapped to learner readiness',
  },
  {
    id: 4,
    title: 'Motivation & Barriers to Learning',
    icon: Flame,
    description:
      'Intrinsic vs extrinsic motivation, Self-Determination Theory, common barriers in construction, legal duty to train',
  },
];

export default function MDModule1() {
  useSEO({
    title: 'Module 1: How People Learn | Mentoring & Developing Others',
    description:
      'Adult learning theory, Kolb\u2019s experiential learning cycle, scaffolding, the zone of proximal development, motivation and barriers to learning.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">How People Learn</h1>
            <p className="text-white/60 text-sm sm:text-base">
              Foundational learning theory for mentors &mdash; understanding how adults learn, the
              role of experience, scaffolding, and what motivates or blocks learning on site
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../md-module-1-section-${section.id}`}
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
