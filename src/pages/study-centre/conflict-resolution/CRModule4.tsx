import { ArrowLeft, Hammer, Building2, Scale, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Disputes with Other Trades',
    icon: Hammer,
    description:
      'Inter-trade conflicts, damaged work, access disputes, CDM 2015 coordination duties, and professional resolution',
  },
  {
    id: 2,
    title: 'Main Contractor & Commercial Conflicts',
    icon: Building2,
    description:
      'Payment disputes, programme changes, contra charges, Construction Act payment terms, and escalation',
  },
  {
    id: 3,
    title: 'The Construction Act & Your Rights',
    icon: Scale,
    description:
      'Housing Grants, Construction and Regeneration Act 1996, adjudication, payment provisions, and suspension rights',
  },
  {
    id: 4,
    title: 'Team Conflicts & Apprentice Management',
    icon: Users,
    description:
      'The SBI feedback model, giving difficult feedback, JIB grievance procedures, and bullying and harassment',
  },
];

export default function CRModule4() {
  useSEO({
    title: 'Module 4: Site & Workplace Conflicts | Conflict Resolution',
    description:
      'Disputes with other trades, main contractor conflicts, the Construction Act, and team management.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Site &amp; Workplace Conflicts
            </h1>
            <p className="text-white text-sm sm:text-base">
              Disputes with other trades, main contractor conflicts, your legal rights under the
              Construction Act, and managing teams and apprentices
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cr-module-4-section-${section.id}`}
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
