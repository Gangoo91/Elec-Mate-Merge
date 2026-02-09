import { ArrowLeft, HeartPulse, Zap, RotateCcw, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Cardiac Arrest & CPR',
    icon: HeartPulse,
    description:
      'Chain of survival, recognising cardiac arrest, adult CPR 30:2 ratio, compression rate and depth, compression-only CPR, agonal breathing',
  },
  {
    id: 2,
    title: 'Using an Automated External Defibrillator (AED)',
    icon: Zap,
    description:
      'How AEDs work, pad placement, shockable vs non-shockable rhythms, special circumstances, public access defibrillators',
  },
  {
    id: 3,
    title: 'Unconsciousness & the Recovery Position',
    icon: RotateCcw,
    description:
      'Causes of unconsciousness, AVPU scale, recovery position technique, monitoring, fainting and vasovagal syncope',
  },
  {
    id: 4,
    title: 'Choking Management',
    icon: AlertTriangle,
    description:
      'Recognising choking, mild vs severe obstruction, back blows, abdominal thrusts, unconscious choking and post-choking review',
  },
];

export default function FirstAidModule2() {
  useSEO({
    title: 'Module 2: Life-Threatening Emergencies — CPR, AED & Choking | First Aid at Work',
    description:
      'CPR technique, AED usage, recovery position and choking management for first aiders in the workplace.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">45 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Life-Threatening Emergencies &mdash; CPR, AED &amp; Choking
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              The skills to manage the most critical emergencies: cardiac arrest, unconsciousness
              and airway obstruction
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../first-aid-module-2-section-${section.id}`}
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
