import { ArrowLeft, Bone, Brain, FlaskConical, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Fractures, Dislocations & Soft Tissue Injuries',
    icon: Bone,
    description:
      'Open vs closed fractures, recognition, immobilisation, slings, splinting, sprains and strains, when to call 999',
  },
  {
    id: 2,
    title: 'Head Injuries, Spinal Injuries & Eye Injuries',
    icon: Brain,
    description:
      'Head injury red flags, concussion, spinal immobilisation, cervical collar use, eye foreign objects, chemical splash management',
  },
  {
    id: 3,
    title: 'Poisoning, COSHH & Hazardous Substances',
    icon: FlaskConical,
    description:
      'COSHH Regulations 2002, Safety Data Sheets, ingestion/inhalation/skin contact, carbon monoxide, site-specific hazards for electricians',
  },
  {
    id: 4,
    title: 'Mental Health Crises, Communication & First Aider Wellbeing',
    icon: Users,
    description:
      'Mental health emergencies on site, communication skills, barriers to seeking help, critical incident stress, self-care and debriefing',
  },
];

export default function FirstAidModule5() {
  useSEO({
    title: 'Module 5: Injuries, Specific Conditions & Workplace Protocol | First Aid at Work',
    description:
      'Fractures, head and spinal injuries, poisoning, COSHH, mental health crises and first aider wellbeing for workplace first aiders.',
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
              <span className="text-rose-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Injuries, Specific Conditions &amp; Workplace Protocol
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Managing musculoskeletal injuries, head and spinal trauma, hazardous substances, and
              supporting mental health on site
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../first-aid-module-5-section-${section.id}`}
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
