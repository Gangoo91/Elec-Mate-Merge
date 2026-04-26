import { Scale, AlertTriangle, FileCheck, Shield, Power, Phone } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'UK health and safety legislation',
    icon: Scale,
    description: 'Key health and safety laws and regulations governing electrical work.',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Common electrical hazards',
    icon: AlertTriangle,
    description: 'Identifying typical electrical risks and dangers in the workplace.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Risk assessment and method statements',
    icon: FileCheck,
    description: 'Planning and documenting safe working procedures for electrical installations.',
    href: 'section3',
  },
  {
    id: 4,
    title: 'PPE and safe working practices',
    icon: Shield,
    description: 'Selection, use and maintenance of protective equipment and safe working methods.',
    href: 'section4',
  },
  {
    id: 5,
    title: 'Safe isolation procedures',
    icon: Power,
    description: 'Step-by-step procedures for safely isolating electrical circuits before work.',
    href: 'section5',
  },
  {
    id: 6,
    title: 'Accidents, reporting and emergency response',
    icon: Phone,
    description: 'Procedures for dealing with electrical accidents and emergency situations.',
    href: 'section6',
  },
];

export default function Module1() {
  useSEO({
    title: 'Module 1: Health and Safety | Level 2 Electrical | Elec-Mate',
    description:
      'Health and safety legislation, hazards, RAMS, PPE, safe isolation and emergency response for electrical apprentices.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={1}
      title="Health and safety in installation"
      description="Essential health and safety legislation, hazards, risk assessment, PPE, safe isolation and emergency procedures."
      tone="emerald"
      sectionsCount={sections.length}
      nextModuleHref="../module2"
      nextModuleLabel="Principles of electrical science"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Module 1 is the foundation under everything else you’ll learn. Before
            you sink a back box, terminate a single core or pick up a meter, the
            trade has decided you have to know how to keep yourself, your mate
            and the customer alive — and how to recognise when you’re about to
            stop doing that. Around 30 sparks a year die at work in the UK and
            the regs you’ll meet here are written in the lessons paid for by
            those names.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Section 1</span> covers the
            UK legal floor — HASAWA, EAWR and the supporting regs that shape
            every job.{' '}
            <span className="text-white font-medium">Section 2</span> walks
            through the hazards themselves — shock, burns, faults, fire, falls,
            confined spaces, manual handling.{' '}
            <span className="text-white font-medium">Section 3</span> turns
            those hazards into paperwork that controls them — risk assessments,
            method statements, hierarchy of control, RAMS on site.{' '}
            <span className="text-white font-medium">Section 4</span> covers
            PPE, GS38 test gear and the daily safe-working habits that make the
            regs into a working day.{' '}
            <span className="text-white font-medium">Section 5</span> is the
            single most important habit on the tools — safe isolation, prove–
            test–prove, lock-off, and where it goes wrong.{' '}
            <span className="text-white font-medium">Section 6</span> closes
            with what to do when something does go wrong — first response,
            first aid, RIDDOR, fire and the wider workplace emergencies.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end of Module 1 you’ll be able to identify a hazard, write a
            RAMS to control it, isolate live equipment safely, and respond when
            something goes wrong — the four moves that keep you, your mate and
            your customer alive on every job for the rest of your career.
          </p>
        </div>
      }
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={section.href}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
