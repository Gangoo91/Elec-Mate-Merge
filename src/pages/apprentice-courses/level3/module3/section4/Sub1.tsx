/**
 * Module 3 · Section 4 · Subsection 1 — Magnetic circuits and properties (AC 1.2)
 * Maps to C&G 2365-03 / Unit 302 / LO1 / AC 1.2
 *   AC 1.2 — "describe the properties and principles of transformers" (foundations)
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 5.1
 *
 * Magnetic flux Φ, flux density B, magnetising force H, permeability μ. The B-H curve
 * and saturation. The magnetic circuit analogy with electric circuits.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import { MagneticHysteresis } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Magnetic circuits and properties | Level 3 Module 3.4.1 (AC 1.2) | Elec-Mate';
const DESCRIPTION =
  'Φ, B, H, μ. Saturation, hysteresis, eddy currents. The magnetic-circuit analogy with electric circuits — the foundation for understanding transformer behaviour.';

const checks = [
  {
    id: 'l3-m3-4-1-flux',
    question:
      'A coil produces a total magnetic flux of 0.005 Wb through a core of cross-sectional area 25 cm². Flux density B is:',
    options: ['0.2 T', '2 T', '5 T', '50 T'],
    correctIndex: 1,
    explanation:
      'B = Φ / A. A = 25 cm² = 25 × 10⁻⁴ m² = 0.0025 m². B = 0.005 / 0.0025 = 2 T. Bordering core saturation.',
  },
  {
    id: 'l3-m3-4-1-mmf',
    question:
      'A coil of 500 turns carries 2 A. The magnetomotive force (mmf) is:',
    options: ['250 At', '500 At', '1000 At', '5000 At'],
    correctIndex: 2,
    explanation: 'mmf = N × I = 500 × 2 = 1000 ampere-turns (At).',
  },
  {
    id: 'l3-m3-4-1-mu',
    question:
      'The relative permeability μ_r of a typical transformer steel core is approximately:',
    options: ['1', '100', '5000', '5 000 000'],
    correctIndex: 2,
    explanation:
      'Grain-oriented silicon steel: μ_r ≈ 1000-10 000 below saturation. Air is μ_r = 1. The huge difference is what makes a magnetic core concentrate flux thousands of times more than air.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Magnetic flux Φ is measured in:',
    options: ['Tesla', 'Weber', 'Henry', 'Coulomb'],
    correctAnswer: 1,
    explanation: 'Weber (Wb) is total magnetic flux. Tesla (T) is flux density (Wb/m²).',
  },
  {
    id: 2,
    question: 'Flux density B equals:',
    options: ['Φ × A', 'Φ / A', 'Φ + A', 'Φ × μ'],
    correctAnswer: 1,
    explanation: 'B = Φ / A — total flux divided by the area it passes through.',
  },
  {
    id: 3,
    question: 'The magnetic equivalent of EMF in a magnetic circuit is:',
    options: ['Reluctance', 'Magnetomotive force (mmf)', 'Permeability', 'Flux density'],
    correctAnswer: 1,
    explanation: 'mmf (in ampere-turns) drives flux around a magnetic circuit, just as EMF drives current around an electric circuit.',
  },
  {
    id: 4,
    question: 'The magnetic equivalent of resistance is:',
    options: ['Reluctance (R_m)', 'Permeability', 'Flux', 'Hysteresis'],
    correctAnswer: 0,
    explanation:
      "Reluctance R_m = L / (μ × A). Opposes flux. Magnetic Ohm's Law: Φ = mmf / R_m, or mmf = Φ × R_m.",
  },
  {
    id: 5,
    question: 'Saturation in a transformer core means:',
    options: [
      'The cores are wet',
      'Adding more current produces little extra flux',
      'The core has reached maximum efficiency',
      'No current is flowing',
    ],
    correctAnswer: 1,
    explanation:
      'Above ~1.7 T for grain-oriented silicon steel, all the magnetic domains are aligned and the core can\'t accommodate much more flux. Magnetising current spikes; harmonic content increases.',
  },
  {
    id: 6,
    question: 'Hysteresis loss in an AC magnetic core is caused by:',
    options: [
      'Resistance of the windings',
      'Energy lost reorienting magnetic domains each cycle',
      'Air gap in the core',
      'High-voltage corona',
    ],
    correctAnswer: 1,
    explanation:
      "Domains have to be 'pushed' back and forth each cycle. The area of the B-H loop = energy per cycle. Silicon steel has a narrow loop = low hysteresis loss.",
  },
  {
    id: 7,
    question: 'Eddy currents in a solid iron core can be reduced by:',
    options: [
      'Painting the core',
      'Laminating the core into thin insulated sheets',
      'Increasing the air gap',
      'Reducing the frequency',
    ],
    correctAnswer: 1,
    explanation:
      'Laminations break the eddy-current path into many tiny loops. Each lamination has high resistance to eddies but conducts magnetic flux normally.',
  },
  {
    id: 8,
    question: 'Permeability μ describes:',
    options: [
      "How well a material conducts current",
      'How easily a material allows magnetic flux to pass',
      'The speed of magnetic propagation',
      'The colour of the iron',
    ],
    correctAnswer: 1,
    explanation:
      'High μ = magnetic flux passes easily. Iron has μ_r ≈ 5000; air = 1. That\'s why we use iron cores for transformers and motors.',
  },
];

const faqs = [
  {
    question: "What's the magnetic-circuit analogy with electric circuits?",
    answer:
      "EMF → mmf (ampere-turns). Current → flux (Wb). Resistance → reluctance (R_m). Conductivity → permeability. Even Ohm's Law has an analogue: Φ = mmf / R_m. Treating a magnetic core as a 'circuit' lets you analyse it the same way as an electric one.",
  },
  {
    question: 'What does the B-H curve actually show?',
    answer:
      "B (flux density) on the y-axis, H (magnetising force = N × I / L) on the x-axis. The curve flattens (saturation) when domains are fully aligned. Different materials have different curves: soft iron is steep and easy to magnetise; hard steel is shallow but holds magnetism (used for permanent magnets).",
  },
  {
    question: 'Why are transformer cores laminated?',
    answer:
      "To suppress eddy currents. The alternating flux induces voltages in the core itself, which would drive circulating currents through the iron — wasting energy as heat and possibly burning the core. Laminations (each ~0.3 mm thick, insulated by oxide or varnish) break the eddy-current paths.",
  },
  {
    question: 'How does saturation affect inverter and transformer operation?',
    answer:
      "Above saturation, magnetising current rises dramatically with little extra flux. Inverter outputs go non-sinusoidal because the core can't follow the demand; transformers buzz, run hot and may damage cores. Designers leave 20-30 % margin below saturation flux.",
  },
  {
    question: "What's coercivity and remanence?",
    answer:
      "Remanence = how much flux remains in the core when current is removed (high in permanent magnets, low in soft iron). Coercivity = how much reverse field is needed to bring flux back to zero. Both define the size of the hysteresis loop.",
  },
  {
    question: 'Do air-cored transformers exist?',
    answer:
      "Yes, but only for high-frequency RF and small specialty applications. At 50 Hz mains, air's low permeability means you'd need huge windings to get any useful coupling. Iron's high μ_r is what makes practical mains transformers possible.",
  },
];

export default function Sub1() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 1"
            title="Magnetic circuits and properties"
            description="Φ, B, H, μ. Saturation, hysteresis, eddy currents. The magnetic-circuit analogy that lets you design or fault-find a transformer."
            tone="yellow"
          />

          <TLDR
            points={[
              'Flux Φ (Wb) drives through the core. Flux density B (T) = Φ / A.',
              'Magnetomotive force mmf = N × I (ampere-turns). The "EMF" of magnetic circuits.',
              'Reluctance R_m = L / (μA) opposes flux. Magnetic Ohm: Φ = mmf / R_m.',
              "Permeability μ tells you how easily flux passes. Iron μ_r ≈ 5000; air = 1.",
              'Saturation (~1.7 T silicon steel): adding mmf produces minimal extra flux.',
              'Hysteresis = energy lost re-aligning domains each cycle. Eddy currents suppressed by laminations.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define magnetic flux, flux density, magnetomotive force, magnetising force and permeability.',
              'Apply the magnetic-circuit analogy: Φ = mmf / R_m.',
              'Explain saturation and its effect on transformer behaviour.',
              'Distinguish hysteresis loss and eddy-current loss; explain how each is minimised.',
              'Read a B-H curve and identify saturation, remanence and coercivity.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Magnetic quantities</ContentEyebrow>

          <ConceptBlock
            title="Four quantities define a magnetic circuit"
            plainEnglish="Flux is the total amount of magnetism passing through a surface. Flux density is flux per unit area. Magnetomotive force drives flux around a circuit. Permeability measures how easily a material lets flux through."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Magnetic flux Φ</strong> (weber, Wb) — total flux through a coil.
              </li>
              <li>
                <strong>Flux density B</strong> (tesla, T = Wb/m²) — flux per area. Drives the
                EMF in transformers.
              </li>
              <li>
                <strong>Magnetomotive force mmf</strong> (ampere-turns, At) = N × I — drives flux
                around a magnetic circuit.
              </li>
              <li>
                <strong>Magnetising force H</strong> (At/m) = mmf / mean path length — the
                "stress" applied to the magnetic material.
              </li>
              <li>
                <strong>Permeability μ</strong> (H/m or relative μ_r) — how easily a material
                conducts flux. μ = B / H.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>The magnetic circuit analogy</ContentEyebrow>

          <ConceptBlock
            title="Treat a magnetic core like a wire loop"
            plainEnglish="EMF pushes current through resistance in a wire. mmf pushes flux through reluctance in a core. Same maths."
          >
            <p>
              Magnetic Ohm's Law:
            </p>
            <p>
              <strong>Φ = mmf / R_m</strong>, where R_m = L / (μ × A).
            </p>
            <p>
              For a toroidal core with mean path length L = 0.5 m, area A = 4 cm² = 4 × 10⁻⁴ m²,
              μ_r = 4000 (so μ = 4000 × 4π × 10⁻⁷ = 5.03 × 10⁻³ H/m), driven by N = 1000 turns at
              I = 0.5 A:
              <br />
              mmf = 1000 × 0.5 = 500 At.
              <br />
              R_m = 0.5 / (5.03 × 10⁻³ × 4 × 10⁻⁴) = 0.5 / (2.01 × 10⁻⁶) = 2.49 × 10⁵ At/Wb.
              <br />
              Φ = 500 / 2.49 × 10⁵ = 2.01 × 10⁻³ Wb = 2 mWb.
              <br />
              B = Φ / A = 2 × 10⁻³ / 4 × 10⁻⁴ = 5 T → SATURATED. Designer would either reduce I,
              add turns, increase core area or use a higher-saturation material.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Saturation, hysteresis, eddy currents</ContentEyebrow>

          <ConceptBlock
            title="The B-H curve flattens — saturation"
            plainEnglish="Below saturation, B rises in proportion to H — that is the linear, useful operating range. Above saturation, all the magnetic domains are aligned and B barely rises with extra H."
          >
            <p>
              Practical limits:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Grain-oriented silicon steel (transformer cores): saturation ~1.7-2.0 T.</li>
              <li>Plain iron: ~1.0-1.5 T.</li>
              <li>Ferrite (high frequency): 0.3-0.5 T.</li>
            </ul>
            <p>
              Designers operate at 1.4-1.6 T peak in transformer cores — below saturation, with
              margin for over-voltage events.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Hysteresis — energy lost reorienting domains"
            plainEnglish="The B-H curve does not retrace itself when the current reverses. The enclosed area is energy lost as heat each cycle. Soft magnetic materials (silicon steel) have narrow loops — minimal loss. Hard materials (permanent magnets) have wide loops."
            onSite="Hysteresis loss in a 50 Hz transformer is roughly proportional to frequency × loop area × volume. Total losses (hysteresis + eddy) at full load are typically 0.5-1.5 % of rated kVA. That is why transformers run hot."
          >
            <p>
              <strong>Hysteresis loss P_h ∝ f × B_max^n</strong> (Steinmetz exponent n typically
              1.6-2). Doubling frequency doubles hysteresis loss; doubling peak flux quadruples
              it.
            </p>
          </ConceptBlock>

          <MagneticHysteresis />

          <ConceptBlock
            title="Eddy currents — circulating currents in the core"
            plainEnglish={"The alternating flux induces voltage in the core iron itself. That voltage drives circulating ('eddy') currents in the iron, dissipating energy as heat."}
          >
            <p>
              Suppression: laminate the core into thin (~0.3 mm) sheets, electrically insulated
              by an oxide layer. Each lamination has very high cross-sectional resistance to
              circulating currents but still conducts flux normally.
            </p>
            <p>
              <strong>Eddy loss P_e ∝ f² × B_max² × t²</strong>, where t is lamination
              thickness. Hence the obsession with thin laminations — halve the thickness, eddy
              loss drops by a factor of 4.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50588-1:2017 — Medium power transformers 50 Hz, with highest voltage for equipment not exceeding 36 kV"
            clause="Distribution transformers shall comply with the maximum no-load loss (P_0) and load loss (P_k) values specified for their rated power, applicable to all units sold in the UK and EU under the Ecodesign Regulation 548/2014."
            meaning={
              <>
                Modern UK distribution transformers must meet Tier 2 efficiency under Regulation
                548/2014 (EcoDesign). Hysteresis and eddy losses define no-load loss; winding
                resistance defines load loss. Both are minimised through better steel grades and
                amorphous alloys for premium units.
              </>
            }
            cite="Source: BS EN 50588-1:2017; Ecodesign Regulation 548/2014 (retained UK law)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.11 (Protection against fire)"
            clause="Persons, livestock and property shall be protected against harmful effects of heat or fire which may be generated or propagated in electrical installations. Manufacturers' instructions shall be taken into account in addition to the requirements of BS 7671."
            meaning={
              <>
                Iron and copper losses dissipate as heat in the transformer core and windings.
                Reg 421.11 places the duty on you to size the cooling, the enclosure and the
                clearance to ensure no harmful temperature rise reaches surrounding fabric. A
                drystone-mounted dry-type transformer in a hot riser, or a sealed cabinet with
                no ventilation, breaches this regulation regardless of how clean the design
                calc looks on paper.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 421.11."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.6 (Materials of enclosures)"
            clause="Materials used for the construction of enclosures of electrical equipment shall comply with the resistance to heat and fire requirements in an appropriate product standard. Where no product standard exists, the materials of an enclosure shall withstand the highest temperature likely to be produced by the electrical equipment in normal service."
            meaning={
              <>
                Hysteresis and eddy losses run a transformer core hot — typical insulation class
                F is 155 °C maximum, class H 180 °C. The enclosure, glands and adjacent terminal
                blocks must all sit comfortably below their own temperature limits at full
                rated load. The product-standard cited on the nameplate (BS EN 60076 series for
                most LV transformers) is the link between Reg 421.1.6 and the actual material
                ratings used.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 421.1.6."
          />

          <SectionRule />

          <CommonMistake
            title="Overdriving a transformer above its rated voltage"
            whatHappens={
              <>
                A 230 V/24 V transformer is connected to a 400 V supply 'just to test'. Core
                saturates instantly at the wrong flux density; magnetising current jumps from
                100 mA to multiple amps; primary winding overheats and burns out within seconds.
              </>
            }
            doInstead={
              <>
                Always connect to the rated primary voltage. The flux per turn is set by V/N — go
                above rated V and you saturate. Even a small over-voltage (5-10 %) causes
                significantly more magnetising current and reduces transformer life.
              </>
            }
          />

          <Scenario
            title="Choosing core material for a small isolation transformer"
            situation={
              <>
                You're specifying a 230 V/24 V isolation transformer for a control panel. Core
                material options: standard silicon steel (μ_r ~5000, sat 1.6 T), grain-oriented
                silicon steel (μ_r ~10 000, sat 1.9 T) or amorphous metal alloy (μ_r ~30 000,
                sat 1.5 T). Customer wants premium efficiency.
              </>
            }
            whatToDo={
              <>
                Amorphous alloy gives the lowest no-load loss (~25 % of standard) because of much
                narrower hysteresis loop. Trade-off: lower saturation point, slightly larger
                core, higher cost. For a unit running 24/7 with light load (typical control
                panel), amorphous pays back in energy saving over its life.
                <br />
                Specification: amorphous-core, 100 % copper windings, IP55 enclosure, EN 50588-1
                Tier 2 compliant.
              </>
            }
            whyItMatters={
              <>
                Core material is invisible to the user but defines the no-load loss — which is
                ALWAYS there, even when the load is zero. Choosing the right material can save
                hundreds of kWh per year on a continuously energised transformer.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Apprentice depth — relating the maths to real cores</ContentEyebrow>

          <ConceptBlock
            title="Why audible hum is at twice mains frequency"
            plainEnglish="Magnetostriction makes silicon steel laminations slightly expand and contract as flux rises and falls. Because flux peaks twice per AC cycle (once positive, once negative), the mechanical stretching also peaks twice per cycle. So the hum from a 50 Hz transformer is at 100 Hz."
            onSite="A noisy transformer that is hum-buzzing at 50 Hz (not 100 Hz) usually has a DC offset on the supply or a saturation issue — it is operating asymmetrically. A clean 100 Hz hum is normal. A loud 100 Hz hum getting louder over time means loosening lamination clamps; tighten or replace before the core damages itself."
          >
            <p>What different sounds tell you:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Quiet 100 Hz hum</strong> → healthy, normal operation.</li>
              <li><strong>Loud 100 Hz hum</strong> → loose laminations or undersized core for load.</li>
              <li><strong>50 Hz buzz</strong> → DC offset, asymmetric saturation, possibly a half-wave rectifier load.</li>
              <li><strong>Crackling/popping</strong> → partial discharge in oil or insulation breakdown — take out of service.</li>
              <li><strong>Sudden silence</strong> → primary supply lost; check upstream protection.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Why 50 Hz, not 60 Hz or DC"
            plainEnglish="50 Hz is a compromise between low frequency (which would need huge transformer cores because flux per turn ∝ V/f) and high frequency (which would have heavier eddy and skin-effect losses in long cables). 50 Hz suited European 19th-century alternator design; the US picked 60 Hz independently."
            onSite="The L3 implication: a 50 Hz transformer connected to a 60 Hz supply (e.g. UK kit shipped to USA) operates at LOWER flux density (because V/f drops by 50/60 = 17 %), so it works but is over-engineered. A 60 Hz transformer on a 50 Hz supply runs at HIGHER flux, may saturate, and almost always overheats. Never apply a US 60 Hz transformer to a UK 50 Hz supply without a frequency check."
          >
            <p>
              Flux per turn:
            </p>
            <p>
              <strong>Φ_max = V / (4.44 × f × N)</strong>
            </p>
            <p>
              Halve f and you double Φ_max → instant saturation. This is the same reason
              traction transformers (16.7 Hz on continental rail) are huge compared to a 50 Hz
              transformer of the same power rating.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Air gaps — why DC inductors have them and AC transformers do not"
            plainEnglish="An air gap in a magnetic core dramatically increases reluctance — it dominates the magnetic circuit. For an AC transformer this is bad (you need huge magnetising current), but for a DC choke or inductor it is essential because it prevents core saturation under DC load current."
            onSite="A common L3 fault-find: someone fitted a transformer where a choke was needed (or vice versa). DC chokes ALWAYS have an air gap (visible as a thin non-magnetic insert in the core). Mains transformers do NOT — joints are tight (interleaved E-I or wound C-cores). If you see DC current expected through a transformer winding, you need a choke instead."
          >
            <p>The maths of an air gap:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>R_m_total = R_m_iron + R_m_gap.</li>
              <li>R_m_gap = L_gap / (μ_0 × A) — air permeability is 1, so even a 1 mm gap dwarfs a 500 mm iron path with μ_r = 5000.</li>
              <li>For a typical inductor, gap reluctance is 100-1000× the iron reluctance.</li>
              <li>Energy stored in the inductor is mostly in the air gap (E = ½B²/μ × volume).</li>
            </ul>
            <p>
              That is why bigger inductors have bigger gaps — more energy storage capacity.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Magnetic circuit quantities: Φ (Wb), B (T), mmf (At), H (At/m), μ (H/m), R_m (At/Wb).',
              'Magnetic Ohm: Φ = mmf / R_m. Same algebra as electric circuits.',
              'Saturation ~1.7 T for silicon steel — flux barely rises with extra current.',
              'Hysteresis loss ∝ f × B^n. Narrow loops in soft magnetic materials = low loss.',
              'Eddy currents suppressed by laminations (~0.3 mm); loss ∝ f²B²t².',
              'Transformer core typically operates at 1.4-1.6 T to leave saturation margin.',
              'EcoDesign Regulation 548/2014 mandates Tier 2 efficiency on UK distribution transformers.',
            ]}
          />

          <Quiz title="Magnetic circuits knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 3
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.2 Single-phase transformer principles
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
