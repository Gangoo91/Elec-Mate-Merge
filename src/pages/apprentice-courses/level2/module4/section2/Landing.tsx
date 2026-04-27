import { AlertTriangle, HardHat, MoveVertical, Building2, ClipboardCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '2.1',
    title: 'Identifying hazards in the workspace (2.1)',
    description:
      'A structured site walk before tools come out — people, environment, services and fabric. Static RAMS vs the dynamic risk assessment that catches what the paperwork could not.',
    icon: AlertTriangle,
    href: '2-1',
  },
  {
    number: '2.2',
    title: 'PPE for different tasks (2.2)',
    description:
      'Choosing PPE that matches the task — drilling masonry, cable pulling, live testing, working at height, hot work. PPE is the last line in the hierarchy of control, not the first.',
    icon: HardHat,
    href: '2-2',
  },
  {
    number: '2.3',
    title: 'Selecting access equipment (2.3)',
    description:
      'WAHR 2005 hierarchy applied to ladders, podiums, towers and MEWPs. Duration, height, load and competence — and why a ladder is the last-resort option, not the default.',
    icon: MoveVertical,
    href: '2-3',
  },
  {
    number: '2.4',
    title: 'Site-type prep deep dive',
    description:
      'Same wiring system, completely different prep workflow. Domestic, commercial, industrial, construction, healthcare and education — the choreography that comes before the cable comes off the drum.',
    icon: Building2,
    href: '2-4',
  },
  {
    number: '2.5',
    title: 'RAMS, toolbox talks, permit-to-work',
    description:
      'The documentation chain wrapping the work. RAMS sets the strategy, toolbox talks brief the shift, permits authorise the higher-risk activities. Where the apprentice fits in.',
    icon: ClipboardCheck,
    href: '2-5',
  },
];

export default function Section2() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={2}
      title="Preparing for installation"
      description="Hazard spotting, PPE selection, access equipment, site-type prep and the documentation chain — aligned to LO2 of Unit 204."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="Tools used to install wiring systems"
      nextSectionHref="../section3"
      nextSectionLabel="Installing wiring systems and enclosures"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 2 is everything you do before the first cable comes off the drum. The work that
            prevents an accident is the unglamorous five minutes spent walking the area, picking the
            right kit and choosing how you reach the ceiling — not the heroics afterwards.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Subs 2.1 to 2.3 cover the three core ACs from Unit 204 — workspace hazards, PPE
            selection and access equipment. Subs 2.4 and 2.5 are supplementary deep dives — how the
            prep workflow changes between site types (domestic, commercial, industrial,
            construction, healthcare, education), and how the documentation chain (RAMS, toolbox
            talks, permits) wraps around the work.
          </p>
        </div>
      }
    >
      {subsections.map((subsection, index) => (
        <ModuleCard
          key={index}
          number={subsection.number}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          href={subsection.href}
        />
      ))}
    </SectionShell>
  );
}
