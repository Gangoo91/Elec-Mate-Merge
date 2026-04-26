import { Zap, AlertTriangle, Flame, MapPin, Users } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Electric Shock and Burns',
    description: 'Understanding electrical injuries and their prevention',
    icon: Zap,
    href: '2-1',
  },
  {
    number: 'Subsection 2',
    title: 'Overloads, Short Circuits and Arcing',
    description: 'Electrical faults that can cause injury and damage',
    icon: AlertTriangle,
    href: '2-2',
  },
  {
    number: 'Subsection 3',
    title: 'Fire Hazards and Explosive Environments',
    description: 'Fire risks and working in potentially explosive atmospheres',
    icon: Flame,
    href: '2-3',
  },
  {
    number: 'Subsection 4',
    title: 'Working at Height and Confined Spaces',
    description: 'Special considerations for elevated and restricted work areas',
    icon: MapPin,
    href: '2-4',
  },
  {
    number: 'Subsection 5',
    title: 'Slip, Trip and Manual Handling Risks',
    description: 'Common workplace hazards affecting electrical workers',
    icon: Users,
    href: '2-5',
  },
];

export default function Section2() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={2}
      title="Common electrical hazards"
      description="Identification and understanding of typical electrical risks and dangers."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="UK health and safety legislation"
      nextSectionHref="../section3"
      nextSectionLabel="Risk assessment and method statements"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 1 told you the regs exist. Section 2 walks through the
            hazards those regs are written to control — the actual things on a
            UK building site that hurt people. Every Sub here is a hazard you
            will meet within your first six months on the tools, told plainly,
            with the numbers behind why the protective devices in BS 7671 are
            sized the way they are.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Sub 1</span> covers electric
            shock and burns — what current actually does to a body, the
            thresholds (1 mA, 30 mA, 50 mA) and the reason 30 mA RCDs exist.{' '}
            <span className="text-white font-medium">Sub 2</span> covers
            overloads, short circuits and arcing — the three failure modes that
            turn a healthy circuit into a fire and the protective devices that
            should clear them.{' '}
            <span className="text-white font-medium">Sub 3</span> opens up fire
            and explosive atmospheres — Chapter 42, DSEAR, hazardous-area
            zoning.{' '}
            <span className="text-white font-medium">Sub 4</span> covers working
            at height and confined spaces — still the biggest single killers on
            UK sites.{' '}
            <span className="text-white font-medium">Sub 5</span> closes with
            slips, trips and manual handling — the unglamorous injuries that
            quietly write off more spark careers than shock ever does.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end of Section 2 you’ll be able to walk onto a site, name
            the hazards in front of you, and explain in regs language why each
            one matters — the prerequisite for the risk assessments and method
            statements you’ll write in Section 3.
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
