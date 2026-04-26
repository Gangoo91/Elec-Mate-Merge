import { Hammer, Drill, ShieldAlert } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '1.1',
    title: 'Hand tools — selection and use (1.1)',
    description:
      "The pliers, strippers, screwdrivers, levels and tape measures that live in every spark's pouch — and which one to reach for when.",
    icon: Hammer,
    href: '1-1',
  },
  {
    number: '1.2',
    title: 'Power tools — selection, use and safety (1.2)',
    description:
      'Drills, SDS, grinders, jigsaws — picking the right one, running it safely and the rules around 110 V on site.',
    icon: Drill,
    href: '1-2',
  },
  {
    number: '1.3',
    title: 'Tool safety checks and maintenance (1.3)',
    description:
      'Pre-use checks, PAT intervals, blade and bit condition — the routine that stops a tool putting you in A&E.',
    icon: ShieldAlert,
    href: '1-3',
  },
];

export default function Section1() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={1}
      title="Tools used to install wiring systems"
      description="Hand tools, power tools and the safety checks that keep them on site — aligned to LO1 of Unit 204."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="../section2"
      nextSectionLabel="Preparing for installation"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 1 is the toolbox — what to carry, what to plug in and what to check
            before either gets near a job. The tools themselves are simple; the
            difference between a tidy spark and a hospital admission is knowing which
            tool fits which task and spotting the one that has gone bad before it bites.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 1.1 walks the hand tools you reach for every shift — pliers, strippers,
            screwdrivers, levels, tape. Sub 1.2 covers the power tools — drills, SDS,
            grinders, jigsaws — and the 110 V site transformer rules that come with
            them. Sub 1.3 closes the section with the safety checks and maintenance
            routine that keep a pouch and a flight case fit for use.
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
