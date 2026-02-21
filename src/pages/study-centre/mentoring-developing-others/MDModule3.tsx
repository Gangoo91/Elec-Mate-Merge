import { ArrowLeft, GraduationCap, Building2, FileText, ClipboardList, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The JIB Apprenticeship Framework',
    icon: Building2,
    description:
      'JIB 4-stage structure, ECS grade progression, three-way relationship, AM2 assessment, off-the-job training requirements',
  },
  {
    id: 2,
    title: 'NVQ Evidence & Portfolio Building',
    icon: FileText,
    description:
      'Evidence types, SMART evidence criteria, generating opportunities, common portfolio mistakes, writing witness testimony',
  },
  {
    id: 3,
    title: 'Planning Learning Opportunities on Site',
    icon: ClipboardList,
    description:
      'Identifying opportunities within normal work, matching tasks to NVQ units, training needs analysis, balancing productivity',
  },
  {
    id: 4,
    title: 'Managing Apprentice Wellbeing & Pastoral Care',
    icon: Heart,
    description:
      'Recognising stress and mental health difficulties, pastoral care boundaries, signposting support, dealing with bullying',
  },
];

export default function MDModule3() {
  useSEO({
    title: 'Module 3: Supporting Apprentices | Mentoring & Developing Others',
    description:
      'JIB apprenticeship framework, NVQ evidence and portfolio building, planning learning on site, and managing apprentice wellbeing.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Supporting Apprentices
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Practical guidance for mentoring apprentices through the JIB framework &mdash;
              evidence building, learning planning, and pastoral care on site
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../md-module-3-section-${section.id}`}
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
