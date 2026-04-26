import { AlertTriangle, HardHat, Ladder } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '2.1',
    title: 'Identifying hazards in the workspace (2.1)',
    description:
      'The walk-round before any tool comes out — slips, trips, live services, dust, working at height, other trades on top of you.',
    icon: AlertTriangle,
    href: '2-1',
  },
  {
    number: '2.2',
    title: 'Selecting PPE for tasks (2.2)',
    description:
      'Hi-vis, helmet, eye protection, gloves, arc-rated kit — choosing the level that matches the actual task.',
    icon: HardHat,
    href: '2-2',
  },
  {
    number: '2.3',
    title: 'Selecting access equipment (2.3)',
    description:
      'Steps, podiums, towers, MEWPs — Work at Height Regulations 2005 and the LACES test for picking the right one.',
    icon: Ladder,
    href: '2-3',
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
      description="Hazard spotting, PPE selection and access equipment — aligned to LO2 of Unit 204."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="Tools used to install wiring systems"
      nextSectionHref="../section3"
      nextSectionLabel="Installing wiring systems and enclosures"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 2 is everything you do before the first cable comes off the drum.
            The work that prevents an accident is the unglamorous five minutes spent
            walking the area, picking the right kit and choosing how you reach the
            ceiling — not the heroics afterwards.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 2.1 covers spotting hazards in the workspace before you start. Sub 2.2
            walks PPE selection — what the task actually demands rather than what is
            kicking around the van. Sub 2.3 is access equipment, with the Work at
            Height Regulations 2005 and the LACES test giving you a defensible reason
            for the kit you pick.
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
