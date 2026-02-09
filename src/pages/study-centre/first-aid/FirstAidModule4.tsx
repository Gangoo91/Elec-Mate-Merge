import { ArrowLeft, Thermometer, HeartPulse, Brain, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Heart Attack, Angina & Stroke',
    icon: HeartPulse,
    description:
      'Heart attack recognition and treatment, aspirin administration, angina comparison, FAST stroke test, time-critical treatment',
  },
  {
    id: 2,
    title: 'Seizures, Diabetes & Anaphylaxis',
    icon: Brain,
    description:
      'Tonic-clonic seizure management, status epilepticus, hypoglycaemia, hyperglycaemia, diabetic emergencies, severe allergic reactions',
  },
  {
    id: 3,
    title: 'Electric Shock & Electrical Injuries',
    icon: Zap,
    description:
      'Scene safety for electrical incidents, high vs low voltage response, HSE poster, electrical burns, cardiac monitoring',
  },
  {
    id: 4,
    title: 'Heat Exhaustion, Heat Stroke & Hypothermia',
    icon: Thermometer,
    description:
      'Heat exhaustion treatment, heat stroke emergency response, hypothermia recognition and rewarming, frostbite, site considerations',
  },
];

export default function FirstAidModule4() {
  useSEO({
    title: 'Module 4: Medical Emergencies & Environmental Conditions | First Aid at Work',
    description:
      'Heart attack, stroke, seizures, diabetic emergencies, electric shock, heat illness and hypothermia management for first aiders.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Medical Emergencies &amp; Environmental Conditions
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Responding to cardiac events, neurological emergencies, electrical injuries and
              temperature-related conditions on site
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../first-aid-module-4-section-${section.id}`}
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
