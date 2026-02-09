import { ArrowLeft, Scale, BookOpen, Shield, CableCar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Work at Height Legislation & the Hierarchy of Control',
    icon: Scale,
    description:
      'HSWA 1974, WAHR 2005, the three-step hierarchy, employer and employee duties, enforcement and penalties',
  },
  {
    id: 2,
    title: 'LOLER 1998, PUWER 1998 & Employer Duties',
    icon: BookOpen,
    description:
      'Thorough examination requirements, maintenance duties, CDM 2015, Management of H&S at Work Regs 1999',
  },
  {
    id: 3,
    title: 'MEWP Types, Groups & IPAF Categories',
    icon: CableCar,
    description:
      'Group A vs Group B, categories 1A, 1B, 3A, 3B, PAV, scissor lifts, boom lifts, spider lifts and vehicle-mounted platforms',
  },
  {
    id: 4,
    title: 'Power Sources, Competence & the PAL Card',
    icon: Shield,
    description:
      'Electric, diesel, hybrid power, IPAF training structure, PAL card, PAL+, familiarisation, operator fitness',
  },
];

export default function MewpModule1() {
  useSEO({
    title: 'Module 1: Introduction, Legislation & MEWP Types | MEWP Operator Training',
    description:
      'UK work at height legislation, LOLER, PUWER, MEWP types and classifications, IPAF categories and operator competence requirements.',
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
              <Link to="../mewp-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to MEWP Course
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
              <span className="text-elec-yellow text-xs font-semibold">MODULE 1</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Introduction, Legislation &amp; MEWP Types
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              UK legislation governing work at height, the MEWP regulatory framework, machine types
              and classifications, and operator competence requirements
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../mewp-module-1-section-${section.id}`}
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
