import { Lightbulb, Wrench, Thermometer, TrendingDown, Flame, Beaker } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import { VideoList } from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';

const subsections = [
  {
    number: '3.1',
    title: 'Electron theory (4.1)',
    description: 'Atomic structure, electron flow, and the basis of electric current.',
    icon: Lightbulb,
    href: '3-1',
  },
  {
    number: '3.2',
    title: 'Conductors and insulators (4.2)',
    description:
      'Common conductor and insulator materials, definitions and on-site applications.',
    icon: Wrench,
    href: '3-2',
  },
  {
    number: '3.3',
    title: 'Resistance and resistivity (4.3)',
    description:
      'R = ρL/A — how length, area, material and temperature change cable resistance.',
    icon: Thermometer,
    href: '3-3',
  },
  {
    number: '3.4',
    title: 'Voltage drop (4.7)',
    description:
      'Calculating voltage drop using Method A (I × R) and Method B (mV/A/m), per BS 7671 Appendix 4.',
    icon: TrendingDown,
    href: '3-4',
  },
  {
    number: '3.5',
    title: 'Thermal effects of current (4.8)',
    description:
      'I²R heating in cables and joints, thermal damage diagnosis, and safe maintenance.',
    icon: Flame,
    href: '3-5',
  },
  {
    number: '3.6',
    title: 'Chemical effects of current — cells, electrolysis, corrosion (4.8)',
    description:
      'Primary and secondary cells, electrolysis basics, and galvanic corrosion at terminations.',
    icon: Beaker,
    href: '3-6',
  },
];

export default function Section3() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={3}
      title="Resistance, voltage and current — the basics"
      description="Electron theory, conductors / insulators, resistance and resistivity, voltage drop, thermal and chemical effects — LO4 part 1 of Unit 202."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section2"
      prevSectionLabel="Basic mechanics — force, work, energy and power"
      nextSectionHref="../section4"
      nextSectionLabel="DC circuits — series, parallel and power"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 1 gave you the units. Section 2 gave you the maths habits. This
            section opens the conductor up and shows you what's actually happening
            inside — the electrons, the resistance, the heat and the corrosion that you
            spend your career managing.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 3.1 starts with electron theory — atomic structure and what current
            actually is. Sub 3.2 sorts materials into conductors and insulators and
            explains why. Sub 3.3 builds resistance and resistivity (R = ρL/A) so you
            understand why a longer, thinner cable resists more. Sub 3.4 turns that
            into voltage drop using BS 7671 Appendix 4 — the Method A and Method B
            calculations you'll do on every job. Sub 3.5 covers thermal effects (I²R
            heating, loose terminations, joint failures). Sub 3.6 finishes with
            chemical effects — cells, electrolysis and the galvanic corrosion that
            kills bonding clamps.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Together, these six Subs explain why a long thin cable drops volts, why a
            loose terminal starts fires, and why a green-and-corroded gas bond fails
            an EICR.
          </p>
        </div>
      }
      belowGrid={
        <VideoList
          title="Extra videos for keen learners"
          videos={[videos.electricity, videos.electricHeating, videos.batteries]}
        />
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
