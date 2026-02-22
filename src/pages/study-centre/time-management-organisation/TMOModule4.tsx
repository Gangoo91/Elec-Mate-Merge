import { ArrowLeft, FileCheck, Smartphone, Wrench, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Paperwork, Certificates & Compliance',
    icon: FileCheck,
    description:
      'EICRs, EICs, MWCs, Part P notifications, filing systems, templates, and the do-it-at-the-job principle',
  },
  {
    id: 2,
    title: 'Digital Tools & Systems',
    icon: Smartphone,
    description:
      'Calendar mastery, invoicing, job tracking, cloud storage, automation, and avoiding the one-tool trap',
  },
  {
    id: 3,
    title: 'Van, Tool & Material Organisation',
    icon: Wrench,
    description:
      'Systematic tool storage, stock management, material pre-ordering, van maintenance, and the 5S methodology',
  },
  {
    id: 4,
    title: 'Financial Admin & CIS',
    icon: Receipt,
    description:
      'CIS deductions, invoicing promptly, payment chasing systems, tax record keeping, and bookkeeping routines',
  },
];

export default function TMOModule4() {
  useSEO({
    title: 'Module 4: Organisation & Admin | Time Management & Organisation',
    description:
      'Paperwork and certificates, digital tools, van organisation, and financial admin including CIS.',
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
              <Link to="../time-management-organisation">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Time Management &amp; Organisation
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
              Organisation &amp; Admin
            </h1>
            <p className="text-white text-sm sm:text-base">
              Systems for paperwork, digital tools that actually save time, van organisation that
              eliminates wasted minutes, and financial admin that keeps you solvent
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../tmo-module-4-section-${section.id}`}
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
