import { ArrowLeft, Scale, Shield, BookOpen, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: "The First Aider's Role & Legal Framework",
    icon: Scale,
    description:
      'Health & Safety (First-Aid) Regulations 1981, L74 Approved Code of Practice, FAW vs EFAW, certificate validity, employer duties',
  },
  {
    id: 2,
    title: 'Scene Safety & the Primary Survey',
    icon: Shield,
    description:
      'Scene safety (DANGER), DR ABC / ABCDE assessment, airway management, checking breathing, calling 999/112, consent and capacity',
  },
  {
    id: 3,
    title: 'Record Keeping, RIDDOR & the Accident Book',
    icon: BookOpen,
    description:
      'Accident Book BI510, RIDDOR 2013 categories, first aid records vs RIDDOR, GDPR considerations, digital systems',
  },
  {
    id: 4,
    title: 'First Aid Kits, Equipment & Workplace Planning',
    icon: FileText,
    description:
      'BS 8599-1:2019 kit contents, high-risk additions, AED provision, first aid room requirements, signage and needs assessment',
  },
];

export default function FirstAidModule1() {
  useSEO({
    title: "Module 1: The First Aider's Role, Legislation & Assessment | First Aid at Work",
    description:
      "UK first aid legislation, the first aider's role, scene safety assessment, RIDDOR reporting, accident books and first aid equipment requirements.",
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
              <Link to="../first-aid-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to First Aid Course
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
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              The First Aider&apos;s Role, Legislation &amp; Assessment
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              UK first aid legislation, the role and responsibilities of the first aider, scene
              assessment, record keeping and first aid equipment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../first-aid-module-1-section-${section.id}`}
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
