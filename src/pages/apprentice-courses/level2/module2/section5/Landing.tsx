import { Magnet, Compass, Radio, Activity, RotateCw, Waves } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import { VideoList } from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';

const subsections = [
  {
    number: '5.1',
    title: 'Magnets, poles, attraction and repulsion (5.1)',
    description:
      'Magnetic poles, field direction, attraction and repulsion, ferromagnetic materials.',
    icon: Magnet,
    href: '5-1',
  },
  {
    number: '5.2',
    title: 'Magnetic flux and flux density (5.2)',
    description:
      'Defining flux Φ in webers, flux density B = Φ/A in tesla, and what they mean on site.',
    icon: Compass,
    href: '5-2',
  },
  {
    number: '5.3',
    title: 'Magnetic effect of current — fields, solenoids (5.3)',
    description:
      'Field around a conductor, right-hand grip rule, solenoids, relays and contactors.',
    icon: Radio,
    href: '5-3',
  },
  {
    number: '5.4',
    title: 'Electromagnetic induction and EMF (5.3)',
    description:
      "Faraday's law, Lenz's law, induced EMF, and the link to transformers and motors.",
    icon: Activity,
    href: '5-4',
  },
  {
    number: '5.5',
    title: 'Single-loop AC generator (5.4)',
    description: 'A rotating coil between magnets, and how a sinusoidal EMF is produced.',
    icon: RotateCw,
    href: '5-5',
  },
  {
    number: '5.6',
    title: 'Sine waves — peak, RMS, frequency (5.5)',
    description:
      'Peak, RMS, period, frequency, true-RMS measurement and motor synchronous speed.',
    icon: Waves,
    href: '5-6',
  },
];

export default function Section5() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={5}
      title="Magnetism and electromagnetism"
      description="Magnets, flux, the magnetic effect of current, electromagnetic induction, AC generation, and sine wave fundamentals — LO5 of Unit 202."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section4"
      prevSectionLabel="DC circuits — series, parallel and power"
      nextSectionHref="../section6"
      nextSectionLabel="Electronic components in electrical systems"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Everything you've done so far has been DC — clean, steady, predictable.
            The supply at the wall is AC, and to understand AC you need to understand
            the magnetism that creates it. This section takes you from a fridge
            magnet to the 50 Hz sine wave at every socket in the country.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 5.1 starts with magnets, poles, attraction and repulsion. Sub 5.2
            puts numbers on the field — flux Φ in webers, flux density B in tesla.
            Sub 5.3 shows that current itself produces a magnetic field (the
            right-hand grip rule, solenoids, relays, contactors). Sub 5.4 reverses
            the trick — Faraday and Lenz's laws of electromagnetic induction, where
            a changing field produces an EMF. Sub 5.5 spins a single coil between
            magnets to show exactly how a sinusoidal EMF appears. Sub 5.6 then
            breaks that sine wave down into peak, RMS, period and frequency.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By Sub 5.6 you'll see why your meter reads 230 V even though the peak
            voltage is 325 V, and why three-phase exists at all.
          </p>
        </div>
      }
      belowGrid={
        <div className="pt-4">
          <VideoList
            title="Go deeper — extra videos on AC, three-phase and motors"
            videos={[
              videos.acVsDc,
              videos.singlePhase,
              videos.threePhase,
              videos.threePhaseCalcs,
              videos.alternators,
              videos.threePhaseTransformers,
            ]}
          />
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
