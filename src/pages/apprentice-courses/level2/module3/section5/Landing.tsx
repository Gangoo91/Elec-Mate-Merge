import { Factory, Network, Plug, Building, Handshake } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import { VideoList } from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';

const subsections = [
  {
    number: '5.1',
    title: 'Generation methods (5.1)',
    description:
      'Thermal (coal/gas/biomass), nuclear, wind, solar and hydro — how each one turns a primary source into AC.',
    icon: Factory,
    href: '5-1',
  },
  {
    number: '5.2',
    title: 'Transmission voltages (5.2)',
    description:
      'The National Grid at 400 kV, 275 kV and 132 kV — why such high voltages and how the transformers step it up.',
    icon: Network,
    href: '5-2',
  },
  {
    number: '5.3',
    title: 'Distribution voltages (5.3)',
    description:
      'Stepping down from 33 kV through 11 kV to 400 V three-phase and 230 V single-phase at the consumer cut-out.',
    icon: Plug,
    href: '5-3',
  },
  {
    number: '5.4',
    title: 'UK distribution network components (5.4)',
    description:
      'National Grid, primary and secondary substations, the DNO cut-out and the MET inside the consumer’s premises.',
    icon: Building,
    href: '5-4',
  },
  {
    number: '5.5',
    title: 'From generation to your CU (5.1–5.4)',
    description:
      'LO5 synthesis — the full chain end-to-end from a power station through the National Grid, primary and secondary substations, service cable, cut-out and meter to the customer MET.',
    icon: Network,
    href: '5-5',
  },
  {
    number: '5.6',
    title: 'DNO boundary and customer interface (5.4)',
    description:
      'Where DNO ends and customer begins — the cut-out seal, the MOP role, smart meter integration, and what an electrician can and cannot legally touch on the supply side.',
    icon: Handshake,
    href: '5-6',
  },
];

export default function Section5() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={5}
      title="How electricity is supplied"
      description="Generation, transmission, distribution and the cut-out — the full journey from power station to consumer unit, end-to-end. Aligned to LO5 of Unit 203."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section4"
      prevSectionLabel="Earthing systems and ADS"
      nextSectionHref="../section6"
      nextSectionLabel="Micro-renewable energy"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 5 zooms out from the cut-out and follows the supply back to the
            power station. It's the section that explains why a 230 V single-phase
            spur in a kitchen sits at the bottom of a chain that started at 400 kV
            three-phase forty miles away.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 5.1 covers the generation methods — thermal, nuclear, wind, solar,
            hydro — and what each one is and isn’t good at. Sub 5.2 covers the
            transmission voltages (400 kV / 275 kV / 132 kV) and why the National
            Grid uses them. Sub 5.3 covers the distribution side — 33 kV through
            11 kV to the 400 V / 230 V LV network. Sub 5.4 closes with the
            components — generators, transformers, substations, DNO cut-out, MET
            — and how they string together.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end you'll be able to draw the supply chain on a serviette and
            explain it to a customer asking "where does my electricity actually
            come from?".
          </p>
        </div>
      }
      belowGrid={
        <VideoList
          title="Go deeper — generation, transmission and distribution"
          videos={[
            videos.acGenerator,
            videos.alternators,
            videos.transformerStepUpDown,
            videos.transformers,
            videos.threePhaseTransformers,
            videos.threePhase,
            videos.singlePhase,
          ]}
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
