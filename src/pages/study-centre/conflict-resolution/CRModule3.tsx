import { ArrowLeft, CircleDollarSign, Expand, ShieldAlert, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Non-Paying Clients',
    icon: CircleDollarSign,
    description:
      'Prevention, staged chasing, Late Payment Act 1998, Pre-Action Protocol, and Small Claims Court',
  },
  {
    id: 2,
    title: 'Scope Creep & Variation Conversations',
    icon: Expand,
    description:
      'The "while you\'re here" syndrome, variation orders, having the conversation, and Consumer Rights Act 2015',
  },
  {
    id: 3,
    title: 'Complaint Handling & Service Recovery',
    icon: ShieldAlert,
    description:
      'The service recovery paradox, the HEARD framework, legitimate vs unreasonable complaints, and remedies',
  },
  {
    id: 4,
    title: 'Managing Client Expectations',
    icon: ClipboardList,
    description:
      'Setting expectations at quoting, the customer journey, communication frequency, and professional boundaries',
  },
];

export default function CRModule3() {
  useSEO({
    title: 'Module 3: Resolving Client Disputes | Conflict Resolution',
    description:
      'Non-paying clients, scope creep conversations, complaint handling, and managing client expectations.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Resolving Client Disputes
            </h1>
            <p className="text-white text-sm sm:text-base">
              Practical strategies for non-paying clients, scope creep, complaint handling, and
              managing expectations &mdash; with UK legal rights and frameworks
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cr-module-3-section-${section.id}`}
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
