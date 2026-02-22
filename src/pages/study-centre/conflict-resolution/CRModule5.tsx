import { ArrowLeft, FileText, ShieldCheck, Handshake, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Contracts, Terms & Written Agreements',
    icon: FileText,
    description:
      'Quote vs estimate, essential T&Cs for electricians, variation procedures, and digital signing',
  },
  {
    id: 2,
    title: 'De-escalation Techniques',
    icon: ShieldCheck,
    description:
      'Verbal Judo (George Thompson), the amygdala hijack, staying calm, and the 24-hour rule',
  },
  {
    id: 3,
    title: 'Building Professional Relationships',
    icon: Handshake,
    description:
      'The trust equation, credibility and reliability, networking, and the reciprocity principle',
  },
  {
    id: 4,
    title: 'Your Conflict Resolution Action Plan',
    icon: ClipboardCheck,
    description:
      'Self-assessment, your communication toolkit, prevention checklist, and quick wins you can implement this week',
  },
];

export default function CRModule5() {
  useSEO({
    title: 'Module 5: Prevention & Professional Relationships | Conflict Resolution',
    description:
      'Contracts and written agreements, de-escalation techniques, building relationships, and your action plan.',
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
              <Link to="../conflict-resolution">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Conflict Resolution
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
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Prevention &amp; Professional Relationships
            </h1>
            <p className="text-white text-sm sm:text-base">
              Preventing conflict through clear agreements, de-escalating tense situations, building
              strong professional relationships, and creating your personal action plan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cr-module-5-section-${section.id}`}
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
