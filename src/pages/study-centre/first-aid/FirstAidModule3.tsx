import { ArrowLeft, Droplets, Scissors, Flame, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Severe Bleeding & Haemorrhage Control',
    icon: Droplets,
    description:
      'Types of bleeding, direct pressure, haemostatic dressings, tourniquet use, catastrophic bleeding C-ABC, amputations',
  },
  {
    id: 2,
    title: 'Wound Management & Infection Prevention',
    icon: Scissors,
    description:
      'Minor wound care, embedded objects, abdominal and chest wounds, scalp wounds, dressing types, cross-contamination prevention',
  },
  {
    id: 3,
    title: 'Burns, Scalds & Electrical Burns',
    icon: Flame,
    description:
      'Burn depth assessment, cooling technique, chemical burns, electrical burns, Rule of Nines, what NOT to do',
  },
  {
    id: 4,
    title: 'Shock & Anaphylaxis',
    icon: Activity,
    description:
      'Shock types and recognition, treatment principles, anaphylaxis, adrenaline auto-injectors, EpiPen and Jext administration',
  },
];

export default function FirstAidModule3() {
  useSEO({
    title: 'Module 3: Bleeding, Burns & Shock | First Aid at Work',
    description:
      'Haemorrhage control, wound management, burns treatment, shock recognition and anaphylaxis management for first aiders.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Bleeding, Burns &amp; Shock
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Managing severe bleeding, wound care, burn treatment, and recognising and treating
              shock including anaphylaxis
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../first-aid-module-3-section-${section.id}`}
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
