import { Calculator, Wrench, Activity, GitBranch, Magnet, Cpu } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Maths and SI units for electrical work',
    icon: Calculator,
    description:
      'LO1 + LO2 — fractions, percentages, transposition, ratios, SI base/derived units, prefixes and instruments.',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Basic mechanics — force, work, energy and power',
    icon: Wrench,
    description:
      'LO3 — mass vs weight, force and Newton, levers / gears / pulleys, work, KE / PE, mechanical power, efficiency.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Resistance, voltage and current — the basics',
    icon: Activity,
    description:
      'LO4 part 1 — electron theory, conductors / insulators, resistance and resistivity, voltage drop, thermal and chemical effects.',
    href: 'section3',
  },
  {
    id: 4,
    title: 'DC circuits — series, parallel and power',
    icon: GitBranch,
    description:
      "LO4 part 2 — Ohm's law, series and parallel current / voltage, total resistance, power calculations, worked DC circuits.",
    href: 'section4',
  },
  {
    id: 5,
    title: 'Magnetism and electromagnetism',
    icon: Magnet,
    description:
      'LO5 — magnets and poles, flux and flux density, magnetic effect of current, induction and EMF, AC generator, sine waves.',
    href: 'section5',
  },
  {
    id: 6,
    title: 'Electronic components in electrical systems',
    icon: Cpu,
    description:
      'LO6 — resistors, diodes, capacitors, transistors, sensors and on-site electronics (relays, RCD/AFDD, SPDs).',
    href: 'section6',
  },
];

export default function Module2() {
  useSEO({
    title: 'Module 2: Principles of Electrical Science | Level 2 Electrical | Elec-Mate',
    description:
      'Maths and SI units, basic mechanics, resistance and DC circuits, magnetism and on-site electronics — aligned to City & Guilds 2365-02 Unit 202.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={2}
      title="Principles of electrical science"
      description="Maths, SI units, mechanics, resistance and circuits, magnetism and electronics — the science you'll lean on for the rest of your career. Aligned to City & Guilds 2365-02 Unit 202."
      tone="emerald"
      sectionsCount={sections.length}
      prevModuleHref="../module1"
      prevModuleLabel="Health and safety in installation"
      nextModuleHref="../module3"
      nextModuleLabel="Electrical installations technology"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Module 2 is the science engine for the rest of the trade. Every cable size,
            every test result, every nameplate you read for the next forty years sits on
            the six ideas you build here — and we build them in the order they actually
            depend on each other.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Section 1</span> sets the maths and
            units you'll lean on for everything else — fractions, transposition, SI base
            and derived units, prefixes, instruments.{' '}
            <span className="text-white font-medium">Section 2</span> covers the
            mechanical principles that show up wherever you lift, hoist or torque on
            site — force, work, energy and power.{' '}
            <span className="text-white font-medium">Section 3</span> opens a conductor
            up and shows you what's actually happening inside — electrons, resistance,
            voltage drop, heat, chemistry.{' '}
            <span className="text-white font-medium">Section 4</span> takes those
            individual components and combines them into the DC circuits you analyse on
            a meter.{' '}
            <span className="text-white font-medium">Section 5</span> then asks where AC
            comes from in the first place — magnets, induction, sine waves at 50 Hz —
            and{' '}
            <span className="text-white font-medium">Section 6</span> closes the loop
            with the electronic components inside every modern consumer unit.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end of Module 2 you should be able to look at any consumer unit,
            motor nameplate or test sheet and have a model of what's happening behind
            it.
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
