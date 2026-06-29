/**
 * Module 3 · Section 6 · Subsection 1 — Electrical Losses (I²R, Eddy Current, Hysteresis)
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Where the energy actually goes &mdash; resistive cable losses, skin and proximity
 *   effect, eddy currents in iron cores, hysteresis in magnetic materials, and the
 *   loss-reduction levers a BSE designer can pull on every project.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Electrical Losses (I²R, Eddy Current, Hysteresis) - HNC Module 3 Section 6.1';
const DESCRIPTION =
  'Master electrical power losses in building services: resistive I²R losses, skin effect, eddy currents, hysteresis in transformers and motors, cable derating, and loss reduction strategies.';

const quickCheckQuestions = [
  {
    id: 'i2r-loss',
    question: 'If current through a cable doubles, how does the I²R power loss change?',
    options: [
      'Quadruples',
      'Stays the same',
      'Doubles',
      'Halves',
    ],
    correctIndex: 0,
    explanation:
      'Power loss P = I²R. If current doubles (2I), power becomes (2I)² × R = 4I²R - it quadruples. This is why cable sizing is critical for high-current circuits.',
  },
  {
    id: 'eddy-current',
    question: 'Why are transformer cores made from laminated steel sheets rather than solid steel?',
    options: [
      'To reduce weight',
      'To improve cooling',
      'To increase magnetic flux',
      'To reduce eddy current losses',
    ],
    correctIndex: 3,
    explanation:
      'Laminations break up the paths for eddy currents, dramatically reducing these losses. The thin insulating layers between laminations increase resistance to circulating currents.',
  },
  {
    id: 'hysteresis-loss',
    question: 'What property of magnetic materials causes hysteresis loss?',
    options: [
      'The electrical resistance of the conducting winding',
      'Eddy currents circulating within the laminations',
      'Magnetic domain resistance to realignment',
      'Skin effect concentrating current near the surface',
    ],
    correctIndex: 2,
    explanation:
      'Hysteresis loss occurs because energy is required to repeatedly realign magnetic domains as the AC field reverses. This energy appears as heat in the core material.',
  },
  {
    id: 'skin-effect',
    question: 'At what frequency does skin effect become significant in copper conductors?',
    options: [
      'At DC only',
      '50 Hz only',
      'Above 1 kHz',
      'Below 10 Hz',
    ],
    correctIndex: 2,
    explanation:
      'Skin effect becomes significant above about 1 kHz. At 50 Hz, it is minimal for typical cable sizes, but at higher frequencies current concentrates near the conductor surface, increasing effective resistance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the formula for resistive power loss in a conductor?',
    options: [
      'P = V/I',
      'P = I²R',
      'P = R/I²',
      'P = V × R',
    ],
    correctAnswer: 1,
    explanation:
      'P = I²R (also known as Joule heating) shows that power loss is proportional to the square of current and the resistance. This is fundamental to understanding cable losses.',
  },
  {
    id: 2,
    question: 'A 100m cable run with resistance 0.5Ω carries 20A. What is the power loss?',
    options: [
      '400W',
      '10W',
      '200W',
      '40W',
    ],
    correctAnswer: 2,
    explanation:
      'Using P = I²R: P = 20² × 0.5 = 400 × 0.5 = 200W. This significant loss highlights the importance of cable sizing for long runs.',
  },
  {
    id: 3,
    question: 'Which type of loss is frequency-dependent and proportional to f²?',
    options: [
      'Hysteresis loss',
      'Resistive loss',
      'Stray loss',
      'Eddy current loss',
    ],
    correctAnswer: 3,
    explanation:
      'Eddy current losses are proportional to frequency squared (Pe ∝ f²). This is why they become increasingly significant at higher frequencies.',
  },
  {
    id: 4,
    question:
      'A distribution transformer has iron losses of 500W and full-load copper losses of 2000W. What are the total losses at full load?',
    options: [
      '2500W',
      '2000W',
      '500W',
      '1500W',
    ],
    correctAnswer: 0,
    explanation:
      'Total losses = iron losses + copper losses = 500W + 2000W = 2500W. Iron losses (hysteresis + eddy current) are constant; copper losses (I²R) vary with load.',
  },
  {
    id: 5,
    question: 'What is the typical skin depth in copper at 50 Hz?',
    options: [
      '3mm',
      '9mm',
      '30mm',
      '0.3mm',
    ],
    correctAnswer: 1,
    explanation:
      'At 50 Hz, skin depth in copper is approximately 9mm. Since most building cables are smaller than 18mm diameter, skin effect is negligible at mains frequency.',
  },
  {
    id: 6,
    question: 'Which material property is most important for reducing hysteresis losses?',
    options: [
      'High electrical conductivity of the core',
      'A wide hysteresis loop with high remanence',
      'Low coercivity (soft magnetic material)',
      'High mechanical hardness of the steel',
    ],
    correctAnswer: 2,
    explanation:
      'Low coercivity (soft magnetic materials like silicon steel) have narrow hysteresis loops, requiring less energy to reverse magnetisation each cycle.',
  },
  {
    id: 7,
    question: 'A motor nameplate shows 90% efficiency at 15kW output. What is the input power?',
    options: [
      '13.5kW',
      '15kW',
      '18kW',
      '16.67kW',
    ],
    correctAnswer: 3,
    explanation:
      'Efficiency = Output/Input, so Input = Output/Efficiency = 15kW/0.90 = 16.67kW. The losses are 16.67 - 15 = 1.67kW.',
  },
  {
    id: 8,
    question: 'Why must cables be derated when grouped together?',
    options: [
      'Because I²R losses cause heat that cannot dissipate',
      'Because grouped cables increase the circuit voltage drop',
      'Because adjacent cables induce harmonics in each other',
      'Because grouping raises the prospective fault current',
    ],
    correctAnswer: 0,
    explanation:
      'Grouped cables cannot dissipate heat as effectively as isolated cables. The I²R losses generate heat; if this cannot escape, temperature rises and insulation may be damaged.',
  },
  {
    id: 9,
    question: 'At what load does a transformer typically operate most efficiently?',
    options: [
      '25% load',
      '50-75% load',
      '100% load',
      'No load',
    ],
    correctAnswer: 1,
    explanation:
      'Transformers are most efficient when copper losses equal iron losses, typically around 50-75% load. At light loads, constant iron losses dominate; at heavy loads, I²R losses dominate.',
  },
  {
    id: 10,
    question:
      'Which IE efficiency class represents the highest motor efficiency under IEC 60034-30-1?',
    options: [
      'IE1 Standard',
      'IE2 High',
      'IE4 Super Premium',
      'IE3 Premium',
    ],
    correctAnswer: 2,
    explanation:
      'IE4 Super Premium is the highest standard efficiency class (IE5 Ultra Premium exists but is not yet widely mandated). Higher IE classes have lower losses and better efficiency.',
  },
];

const faqs = [
  {
    question: 'Why are electrical losses important in building services?',
    answer:
      'Losses represent wasted energy (increased running costs), generate heat (requiring adequate ventilation/cooling and limiting cable capacity), and reduce system efficiency (affecting carbon footprint). BS 7671 voltage drop limits exist partly to control I²R losses. Transformer and motor efficiency directly impacts building energy performance.',
  },
  {
    question: 'What is the difference between copper losses and iron losses?',
    answer:
      'Copper losses (I²R) occur in windings and vary with load current squared - they are zero at no load. Iron losses (hysteresis + eddy current) occur in magnetic cores and are essentially constant whenever the equipment is energised, regardless of load. This distinction is crucial for transformer efficiency at different loading conditions.',
  },
  {
    question: 'How do laminations reduce eddy current losses?',
    answer:
      'Laminations are thin steel sheets (typically 0.35-0.5mm) with insulating coatings between them. Eddy currents are induced in planes perpendicular to the magnetic flux. Laminations break these current paths into smaller loops with higher resistance, dramatically reducing the magnitude of circulating currents and hence power loss (which is proportional to I²).',
  },
  {
    question: 'Why is skin effect not a major concern at 50 Hz?',
    answer:
      'At 50 Hz, skin depth in copper is about 9mm. Most building cables are smaller than this, so current distributes fairly uniformly. However, for very large conductors (>300mm²) or at higher frequencies (variable speed drives, harmonics), skin effect increases effective resistance and must be considered.',
  },
  {
    question: 'How do I calculate cable losses for a circuit?',
    answer:
      'For single-phase: P_loss = 2 × I² × R × L, where R is resistance per metre and L is one-way length (×2 for go and return). For three-phase: P_loss = 3 × I² × R × L. Use the cable resistance from manufacturer data or BS 7671 tables, and remember resistance increases with temperature.',
  },
  {
    question: 'What is the Steinmetz equation for hysteresis loss?',
    answer:
      'Ph = η × B_max^n × f × V, where η is the Steinmetz coefficient (material-dependent), B_max is peak flux density, n is the Steinmetz exponent (typically 1.6-2.0), f is frequency, and V is core volume. This shows hysteresis loss is proportional to frequency and increases rapidly with flux density.',
  },
];

const HNCModule3Section6_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · Subsection 1"
            title="Electrical losses (I²R, eddy current, hysteresis)"
            description="I²R, Eddy Current, and Hysteresis Losses"
            tone="purple"
          />

          <TLDR
            points={[
              'You categorise losses as resistive (I&sup2;R, scales with load squared) and iron (hysteresis + eddy, constant with frequency, independent of load) &mdash; the key distinction for transformer and motor lifecycle costing.',
              'You apply skin effect to large conductors at 50 Hz (negligible below ~150 mm&sup2; copper) and proximity effect on closely-grouped cable runs &mdash; both reduce effective Iz.',
              'You design out hysteresis loss with grain-oriented silicon steel cores; design out eddy currents with thin laminations &mdash; standard distribution-transformer practice.',
              'You evaluate lifecycle copper-vs-iron loss tradeoff on every transformer selection &mdash; oversizing increases iron loss (24/7), undersizing increases copper loss (load-dependent).',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.5 (Conductors)"
            clause="Conductors shall be of sufficient cross-sectional area to comply with the requirements of Section 523 (current-carrying capacity), Chapter 43 (protection against overcurrent) and Section 525 (voltage drop)."
            meaning={
              <>
                BS 7671 132.5 forces conductor sizing against Iz, In and voltage drop —
                all of which are driven by I&sup2;R loss. Choosing a larger cable than the
                minimum for a long submain or constantly-loaded supply lowers I&sup2;R loss
                quadratically over the cable&rsquo;s 25-year life &mdash; one of the
                cheapest energy-efficiency interventions on a BSE design and an explicit
                Part L 2021 design consideration on commercial buildings.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 132.5 + 524.1; CIBSE Guide F &mdash; Energy efficiency in buildings; BS EN 60076 (transformer losses)"
          />

          <LearningOutcomes
            outcomes={[
              "Calculate resistive (I²R) losses in cables and windings",
              "Understand skin effect and proximity effect at high frequencies",
              "Explain eddy current formation and reduction through laminations",
              "Describe hysteresis loss mechanism and material selection",
              "Apply derating factors for cable installations",
              "Evaluate transformer and motor efficiency for building services",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>I²R losses:</strong> Heat in conductors, proportional to current squared</li>
              <li><strong>Eddy currents:</strong> Circulating currents in cores, reduced by
                laminations</li>
              <li><strong>Hysteresis:</strong> Energy lost reversing magnetic domains each cycle</li>
              <li><strong>Total losses:</strong> Copper losses + iron losses = wasted energy as heat</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cable sizing:</strong> Limits based on I²R heating</li>
              <li><strong>Transformer selection:</strong> Iron vs copper loss balance</li>
              <li><strong>Motor efficiency:</strong> IE classes and regulations</li>
              <li><strong>Energy costs:</strong> Losses directly impact running costs</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Resistive Losses (I²R) - Joule Heating">
            <p>
              Resistive or I²R losses occur whenever current flows through any conductor with
              resistance. This is the most fundamental form of electrical loss and is often called
              Joule heating after James Prescott Joule who quantified the effect.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                The Power Loss Equation
              </p>
              <p><strong>
                P<sub>loss</sub> = I² × R
              </strong></p>
              <p>
                Where I = current (A), R = resistance (Ω), P = power loss (W)
              </p>

              <p className="text-sm font-medium text-white">
                Key characteristics of I²R losses:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Proportional to I²:</strong> Doubling current quadruples losses
                </li>
                <li>
                  <strong>Proportional to R:</strong> Lower resistance means lower losses
                </li>
                <li>
                  <strong>Appears as heat:</strong> Energy is dissipated, not stored
                </li>
                <li>
                  <strong>Occurs in all conductors:</strong> Cables, windings, busbars, connections
                </li>
              </ul>

              <p className="text-sm font-medium text-orange-300 mb-2">Critical Understanding</p>
              <p>
                The squared relationship is crucial. A circuit carrying 20A has four times the
                losses of one carrying 10A through the same resistance. This is why high-current
                circuits require proportionally larger cables - not just for current capacity, but
                to reduce losses and heat generation.
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                I²R Loss Calculation for Cables
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Single-phase</strong> — P = 2 × I² × r × L — ×2 for line and neutral</li>
              <li><strong>Three-phase balanced</strong> — P = 3 × I² × r × L — Neutral carries no current</li>
              <li><strong>DC circuit</strong> — P = 2 × I² × r × L — Positive and negative</li>
            </ul>
              <p className="text-xs text-white mt-2">
                Where r = resistance per metre (Ω/m), L = one-way cable length (m)
              </p>

            <p>
              <strong>Remember:</strong> Cable resistance increases with temperature. At 70°C
              operating temperature, copper resistance is approximately 20% higher than at 20°C
              reference temperature.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Skin Effect at High Frequencies">
            <p>
              In AC circuits, current does not distribute uniformly across a conductor's
              cross-section. At higher frequencies, current concentrates near the surface - this is
              the skin effect. It effectively reduces the useful cross-sectional area, increasing
              resistance.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Skin Depth Formula</p>
              <p><strong>δ = √(ρ / (π × f × μ))</strong></p>
              <p>
                Where δ = skin depth (m), ρ = resistivity, f = frequency, μ = permeability
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Skin Depth in Copper at Various Frequencies
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>50 Hz</strong> — 9.4 mm — Mains frequency - minimal effect</li>
              <li><strong>1 kHz</strong> — 2.1 mm — Harmonic frequencies</li>
              <li><strong>10 kHz</strong> — 0.66 mm — VSD switching frequencies</li>
              <li><strong>100 kHz</strong> — 0.21 mm — SMPS, high-frequency inverters</li>
            </ul>

              
                <p className="text-sm font-medium text-white">When Skin Effect Matters</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Large conductors (&gt;300mm² at 50 Hz)</li>
                  <li>Harmonic-rich supplies (VSD motor cables)</li>
                  <li>High-frequency circuits (SMPS, RF)</li>
                  <li>Busbar systems at higher frequencies</li>
                </ul>

              
                <p className="text-sm font-medium text-white">Mitigation Techniques</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Use multiple smaller conductors in parallel</li>
                  <li>Litz wire (stranded, individually insulated)</li>
                  <li>Hollow conductors for very high currents</li>
                  <li>Flat busbars instead of round conductors</li>
                </ul>

            

              <p className="text-sm font-medium text-blue-300 mb-2">Proximity Effect</p>
              <p>
                Related to skin effect, proximity effect occurs when conductors carrying AC are
                close together. The magnetic field from one conductor distorts current distribution
                in adjacent conductors, further increasing effective resistance. This is significant
                in transformer windings and parallel cables.
              </p>

            <p>
              <strong>Practical note:</strong> At 50 Hz, skin effect is negligible for cables up to
              about 150mm². For larger conductors or harmonic-rich environments, consult
              manufacturer AC resistance data.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Eddy Current Losses in Magnetic Cores">
            <p>
              When a changing magnetic flux passes through a conducting material, it induces
              circulating currents within that material - these are eddy currents. Named because
              they flow in closed loops like eddies in water, they cause I²R heating in the core
              material.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Eddy Current Loss Formula
              </p>
              <p><strong>
                P<sub>e</sub> = K<sub>e</sub> × B<sub>max</sub>² × f² × t² × V
              </strong></p>
              <p>
                Where K<sub>e</sub> = constant, B<sub>max</sub> = peak flux, f = frequency, t =
                lamination thickness, V = volume
              </p>

              <p className="text-sm font-medium text-white">
                Key characteristics of eddy current losses:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Proportional to f²:</strong> Losses increase rapidly with frequency
                </li>
                <li>
                  <strong>Proportional to t²:</strong> Thinner laminations dramatically reduce
                  losses
                </li>
                <li>
                  <strong>Induced by changing flux:</strong> Faraday's law of electromagnetic
                  induction
                </li>
                <li>
                  <strong>Flow perpendicular to flux:</strong> In planes at right angles to magnetic
                  field
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Lamination Strategy</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Power transformers (50 Hz)</strong> — 0.35-0.5 mm — Grain-oriented silicon steel</li>
              <li><strong>Distribution transformers</strong> — 0.27-0.35 mm — Cold-rolled silicon steel</li>
              <li><strong>Motor cores</strong> — 0.35-0.65 mm — Non-oriented silicon steel</li>
              <li><strong>High-frequency (&gt;400 Hz)</strong> — 0.1-0.2 mm or ferrite — Thin steel or ferrite cores</li>
            </ul>

              <p className="text-sm font-medium text-green-300 mb-2">How Laminations Work</p>
              <p>
                Laminations break the core into thin sheets with insulating coatings between them.
                This creates high resistance paths perpendicular to the flux direction, where eddy
                currents would otherwise flow.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Each lamination acts as an independent thin conductor</li>
                <li>Eddy current paths are confined to individual laminations</li>
                <li>Smaller current loops = higher resistance = lower losses</li>
                <li>
                  Halving lamination thickness reduces losses by factor of 4 (t² relationship)
                </li>
              </ul>

            <p>
              <strong>Alternative cores:</strong> For frequencies above a few kHz, ferrite cores
              (ceramic magnetic materials with very high resistivity) are used instead of laminated
              steel, as they have inherently low eddy current losses.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Hysteresis Losses in Magnetic Materials">
            <p>
              Hysteresis loss occurs because energy is required to repeatedly magnetise and
              demagnetise magnetic core materials. In AC circuits, the magnetic field reverses every
              half-cycle, and each reversal requires energy to realign the magnetic domains within
              the material.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Steinmetz Equation for Hysteresis Loss
              </p>
              <p><strong>
                P<sub>h</sub> = η × B<sub>max</sub>
                <sup>n</sup> × f × V
              </strong></p>
              <p>
                Where η = Steinmetz coefficient, n ≈ 1.6-2.0 (Steinmetz exponent), f = frequency, V
                = volume
              </p>

              <p className="text-sm font-medium text-white">
                Understanding the B-H Hysteresis Loop:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Area of loop:</strong> Energy lost per cycle per unit volume
                </li>
                <li>
                  <strong>
                    Coercivity (H<sub>c</sub>):
                  </strong>{' '}
                  Field needed to demagnetise - lower is better
                </li>
                <li>
                  <strong>
                    Remanence (B<sub>r</sub>):
                  </strong>{' '}
                  Flux remaining when H = 0
                </li>
                <li>
                  <strong>Soft magnetic materials:</strong> Narrow loops, low losses
                </li>
                <li>
                  <strong>Hard magnetic materials:</strong> Wide loops, permanent magnets
                </li>
              </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Soft Magnetic Materials
                </p>
                <p className="text-xs text-white mb-2">Used in transformer and motor cores</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Silicon steel (3-4% Si)</li>
                  <li>Amorphous metals (metallic glass)</li>
                  <li>Nanocrystalline alloys</li>
                  <li>Ferrites (for high frequency)</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Hard Magnetic Materials
                </p>
                <p className="text-xs text-white mb-2">Used for permanent magnets</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Neodymium (NdFeB)</li>
                  <li>Samarium cobalt (SmCo)</li>
                  <li>Alnico alloys</li>
                  <li>Ferrite magnets (ceramic)</li>
                </ul>

            

              <p className="text-sm font-medium text-purple-300 mb-2">
                Why Silicon is Added to Steel
              </p>
              <p>
                Adding 3-4% silicon to steel increases its electrical resistivity (reducing eddy
                currents) and narrows the hysteresis loop (reducing hysteresis losses). However,
                silicon also makes the steel more brittle and harder to work. Grain-oriented silicon
                steel has even lower losses when the flux is aligned with the grain direction.
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Comparing Core Materials
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Standard silicon steel</strong> — 2.5-4.0 — Motors, small transformers</li>
              <li><strong>Grain-oriented (GOES)</strong> — 0.8-1.2 — Power transformers</li>
              <li><strong>Hi-B grade GOES</strong> — 0.7-0.9 — High-efficiency transformers</li>
              <li><strong>Amorphous metal</strong> — 0.2-0.3 — Premium efficiency transformers</li>
            </ul>

            <p>
              <strong>Key distinction:</strong> Hysteresis loss is proportional to f (linear), while
              eddy current loss is proportional to f² (quadratic). At 50 Hz, they are often
              comparable; at higher frequencies, eddy current losses dominate unless special
              materials are used.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Stray Losses in Electrical Machines">
            <p>
              Stray losses are additional losses that occur in electrical machines beyond the
              calculated I²R and core losses. They are difficult to measure directly and are
              typically determined by subtracting known losses from total losses measured during
              testing.
            </p>

              <p className="text-sm font-medium text-white">Sources of stray losses:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Leakage flux:</strong> Flux that doesn't follow the intended magnetic path
                </li>
                <li>
                  <strong>Harmonic losses:</strong> Non-sinusoidal flux causing additional core
                  heating
                </li>
                <li>
                  <strong>Slot leakage:</strong> Flux crossing slots in motor/generator cores
                </li>
                <li>
                  <strong>End-winding losses:</strong> Eddy currents in structural parts near
                  windings
                </li>
                <li>
                  <strong>Bearing friction:</strong> Mechanical losses (often grouped separately)
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical Loss Breakdown in Induction Motors
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Stator I²R</strong> — 25-40% — Load (current squared)</li>
              <li><strong>Rotor I²R</strong> — 15-25% — Load (slip, current)</li>
              <li><strong>Core losses</strong> — 15-25% — Constant (voltage dependent)</li>
              <li><strong>Friction & windage</strong> — 5-15% — Speed</li>
              <li><strong>Stray load losses</strong> — 10-15% — Load (approximately I²)</li>
            </ul>

            <p>
              <strong>Design impact:</strong> Stray losses can be reduced through better magnetic
              circuit design, higher quality laminations, improved slot geometry, and careful
              attention to manufacturing tolerances. Premium efficiency motors achieve their ratings
              partly through reduced stray losses.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Cable Losses and Derating">
            <p>
              Cable current ratings in BS 7671 are based on limiting conductor temperature to
              protect insulation. The temperature rise is caused by I²R losses in the conductor.
              When cables cannot dissipate heat effectively, they must be derated.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Derating Factors (BS 7671 Correction Factors)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ambient temperature</strong> — C<sub>a</sub> — 0.71 - 1.0</li>
              <li><strong>Grouping</strong> — C<sub>g</sub> — 0.40 - 1.0</li>
              <li><strong>Thermal insulation</strong> — C<sub>i</sub> — 0.5 - 1.0</li>
              <li><strong>Soil thermal resistivity</strong> — C<sub>s</sub> — 0.85 - 1.0</li>
            </ul>
              <p className="text-xs text-white mt-2">
                Effective capacity I<sub>z</sub> = I<sub>t</sub> × C<sub>a</sub> × C<sub>g</sub> × C
                <sub>i</sub> × ...
              </p>

              <p className="text-sm font-medium text-orange-300 mb-2">
                Why Grouping Reduces Capacity
              </p>
              <p>
                Each cable generates I²R heat. When cables are grouped together (in trunking,
                conduit, or trays), they share the surrounding air space. The heat from one cable
                warms adjacent cables, reducing their ability to dissipate their own heat. The
                grouping factor compensates for this mutual heating.
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Cable Loss Calculation Example
              </p>

                <p className="text-sm font-mono text-white mb-2">
                  <strong>Problem:</strong> Calculate power loss in a 50m single-phase circuit using
                  4mm² cable carrying 25A
                </p>
                <p className="text-sm font-mono text-white">
                  Cable resistance at 70°C: r = 4.61 × 1.2 = 5.53 mΩ/m
                </p>
                <p className="text-sm font-mono text-white">
                  Total resistance: R = 2 × 50m × 5.53 mΩ/m = 0.553Ω
                </p>
                <p className="text-sm font-mono text-white">
                  Power loss: P = I²R = 25² × 0.553 = <strong>346W</strong>
                </p>
                <p className="text-xs text-white mt-2">
                  This heat must be dissipated; if it cannot be, the cable will overheat.
                </p>

            

              
                <p className="text-sm font-medium text-white">
                  Factors Affecting Cable Losses
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Conductor material (copper vs aluminium)</li>
                  <li>Cross-sectional area (larger = lower R)</li>
                  <li>Operating temperature</li>
                  <li>Cable length</li>
                  <li>Load current (squared effect)</li>
                </ul>

              
                <p className="text-sm font-medium text-white">Reducing Cable Losses</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Use larger cable cross-section</li>
                  <li>Minimise cable lengths</li>
                  <li>Use copper instead of aluminium</li>
                  <li>Improve ventilation</li>
                  <li>Consider higher voltage distribution</li>
                </ul>

            

            <p>
              <strong>Economic consideration:</strong> Using larger cables costs more initially but
              reduces ongoing energy losses. For heavily loaded circuits, the payback period can be
              surprisingly short.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Reducing Losses Through Design">
            <p>
              Minimising electrical losses is essential for energy efficiency, reducing running
              costs, and meeting increasingly stringent building regulations. Loss reduction
              strategies must be considered at the design stage.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Strategies for Reducing I²R Losses
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Increase conductor size:</strong> Halving resistance halves losses (but
                  cost increases)
                </li>
                <li>
                  <strong>Reduce current:</strong> Use higher voltage distribution where practical
                </li>
                <li>
                  <strong>Shorten cable runs:</strong> Locate distribution boards near load centres
                </li>
                <li>
                  <strong>Improve power factor:</strong> Reduces current for same real power
                </li>
                <li>
                  <strong>Balance loads:</strong> Reduce neutral current in three-phase systems
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Strategies for Reducing Core Losses
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Better materials:</strong> Grain-oriented steel, amorphous metals
                </li>
                <li>
                  <strong>Thinner laminations:</strong> Reduce eddy current paths
                </li>
                <li>
                  <strong>Lower flux density:</strong> Larger cores with more material
                </li>
                <li>
                  <strong>Quality manufacturing:</strong> Avoid damage to lamination insulation
                </li>
                <li>
                  <strong>Appropriate sizing:</strong> Avoid operating transformers at extreme loads
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Life Cycle Cost Analysis
              </p>
              <p>
                Higher-efficiency equipment typically costs more to purchase but less to operate.
                The total cost of ownership includes both capital and running costs.
              </p>

                <p className="text-sm font-mono text-white mb-2">
                  <strong>Example:</strong> Comparing two 100kVA transformers over 20 years
                </p>
                <p className="text-sm font-mono text-white">
                  Standard: Purchase £3,000, losses 2.5kW, annual cost £2,628 @ £0.12/kWh
                </p>
                <p className="text-sm font-mono text-white">
                  Premium: Purchase £4,500, losses 1.5kW, annual cost £1,577 @ £0.12/kWh
                </p>
                <p className="text-sm font-mono text-white mt-2">
                  20-year saving: (£2,628 - £1,577) × 20 - £1,500 = <strong>£19,520</strong>
                </p>

            

              
                <p className="text-sm font-medium text-green-300 mb-2">Design Stage Actions</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Specify high-efficiency transformers (Ecodesign)</li>
                  <li>Select IE3/IE4 motors</li>
                  <li>Optimise distribution voltage levels</li>
                  <li>Plan efficient cable routes</li>
                  <li>Consider power factor correction</li>
                </ul>

              
                <p className="text-sm font-medium text-blue-300 mb-2">Operational Actions</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>De-energise lightly loaded transformers</li>
                  <li>Maintain power factor correction</li>
                  <li>Balance three-phase loads</li>
                  <li>Monitor and trend losses</li>
                  <li>Replace inefficient equipment</li>
                </ul>
          </ConceptBlock>

          <ConceptBlock title="Building Services: Cable Sizing, Transformer Losses, Motor Efficiency">
            <h3 className="text-lg font-medium text-white mb-3">
                Cable Sizing for Loss Minimisation
              </h3>
              <p>
                BS 7671 sets minimum cable sizes based on current capacity and voltage drop limits.
                However, economic cable sizing considers the cost of losses over the cable's
                lifetime.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>20A continuous</strong> — 2.5mm² — 4mm² — ~40%</li>
              <li><strong>32A continuous</strong> — 4mm² — 6mm² — ~35%</li>
              <li><strong>63A continuous</strong> — 16mm² — 25mm² — ~35%</li>
            </ul>

              <h3 className="text-lg font-medium text-white mb-3">
                Transformer Losses and Efficiency
              </h3>
              <p>
                Distribution transformers in buildings operate continuously. Their efficiency
                significantly impacts energy costs. The EU Ecodesign Directive sets minimum
                efficiency requirements.
              </p>

                <p className="text-sm font-medium text-elec-yellow/80">
                  Transformer Loss Categories
                </p>

                  
                    <p className="text-sm font-medium text-white">No-Load (Iron) Losses</p>
                    <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                      <li>Present whenever energised</li>
                      <li>Hysteresis + eddy current in core</li>
                      <li>Constant regardless of load</li>
                      <li>Typically 0.2-0.5% of rating</li>
                    </ul>

                  
                    <p className="text-sm font-medium text-white">Load (Copper) Losses</p>
                    <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                      <li>I²R losses in windings</li>
                      <li>Proportional to load squared</li>
                      <li>Zero at no load</li>
                      <li>Typically 1-2% at full load</li>
                    </ul>

                

                <p className="text-sm font-medium text-elec-yellow/80">
                  Ecodesign Tier 2 Requirements (from July 2021)
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>100</strong> — 70 — 1,250</li>
              <li><strong>250</strong> — 140 — 2,350</li>
              <li><strong>630</strong> — 270 — 4,600</li>
              <li><strong>1000</strong> — 380 — 6,500</li>
            </ul>
                <p className="text-xs text-white mt-2">
                  Values for oil-immersed three-phase transformers
                </p>

            

              <h3 className="text-lg font-medium text-white mb-3">Motor Efficiency Classes</h3>
              <p>
                Motors are the largest single electrical load in most commercial buildings (HVAC,
                pumps, lifts). IEC 60034-30-1 defines efficiency classes, with EU regulations
                mandating minimum standards.
              </p>

                <p className="text-sm font-medium text-elec-yellow/80">
                  IE Efficiency Classes (IEC 60034-30-1)
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>IE1</strong> — Standard — 87.0%</li>
              <li><strong>IE2</strong> — High — 89.1%</li>
              <li><strong>IE3</strong> — Premium — 90.7%</li>
              <li><strong>IE4</strong> — Super Premium — 92.0%</li>
              <li><strong>IE5</strong> — Ultra Premium — 93.5%</li>
            </ul>

                <p className="text-sm font-medium text-green-300 mb-2">
                  EU Ecodesign Motor Requirements
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>From July 2021: Motors 0.75-1000kW must meet IE3 minimum</li>
                  <li>From July 2023: Motors 75-200kW must meet IE4 minimum</li>
                  <li>
                    VSD-driven motors can be IE2 if drive + motor meets system efficiency
                  </li>
                  <li>
                    Some applications (hazardous areas, high altitude) have exemptions
                  </li>
                </ul>

            

              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Building Services Loss Reduction Checklist
              </h3>

                
                  <p className="text-xs font-medium text-white mb-1">Design Stage</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Specify IE3/IE4 motors for all HVAC</li>
                    <li>Use VSDs for variable-load fans/pumps</li>
                    <li>Select Ecodesign-compliant transformers</li>
                    <li>Consider economic cable sizing</li>
                    <li>Install power factor correction</li>
                  </ul>

                
                  <p className="text-xs font-medium text-white mb-1">Operation Stage</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Monitor power quality and PF</li>
                    <li>Replace failing motors with higher IE class</li>
                    <li>Maintain PF correction capacitors</li>
                    <li>Balance three-phase loads</li>
                    <li>Review transformer loading annually</li>
                  </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
                Example 1: Cable Loss Calculation
              </p>
              <p>
                <strong>Question:</strong> A 75m single-phase circuit uses 6mm² cable and carries
                28A. Calculate the power loss and its cost over 8760 hours (one year) at £0.15/kWh.
              </p>

                <p>Cable resistance at 70°C: r = 3.08 × 1.2 = 3.70 mΩ/m</p>
                <p>Total resistance: R = 2 × 75m × 3.70 mΩ/m = 0.555Ω</p>
                <p>
                  Power loss: P = I²R = 28² × 0.555 = <strong>435W</strong>
                </p>
                <p>Annual energy: E = 0.435kW × 8760h = 3,811 kWh</p>
                <p>
                  Annual cost: 3,811 × £0.15 = <strong>£571.65</strong>
                </p>
                <p>
                  → Upgrading to 10mm² would reduce losses by ~45%
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 2: Transformer Efficiency
              </p>
              <p>
                <strong>Question:</strong> A 400kVA transformer has iron losses of 600W and copper
                losses of 4500W at full load. Calculate the efficiency at full load and at 50% load.
              </p>

                <p>
                  <strong>At full load:</strong>
                </p>
                <p>Output = 400kVA × 1.0 (assume pf=1) = 400kW</p>
                <p>Total losses = 600W + 4500W = 5100W = 5.1kW</p>
                <p>
                  Efficiency = 400 / (400 + 5.1) × 100 = <strong>98.7%</strong>
                </p>
                <p>
                  <strong>At 50% load:</strong>
                </p>
                <p>Output = 200kW</p>
                <p>Copper losses at 50% = 4500 × 0.5² = 1125W</p>
                <p>Total losses = 600 + 1125 = 1725W = 1.725kW</p>
                <p>
                  Efficiency = 200 / (200 + 1.725) × 100 = <strong>99.1%</strong>
                </p>
                <p className="mt-2 text-green-400">
                  ✓ Maximum efficiency occurs when iron losses ≈ copper losses
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 3: Motor Efficiency Comparison
              </p>
              <p>
                <strong>Question:</strong> An 11kW AHU motor runs 6000 hours/year. Compare annual
                running costs between IE2 (89.4%) and IE4 (92.6%) motors at £0.15/kWh.
              </p>

                <p>
                  <strong>IE2 motor:</strong>
                </p>
                <p>Input power = 11 / 0.894 = 12.30kW</p>
                <p>Annual energy = 12.30 × 6000 = 73,826 kWh</p>
                <p>
                  Annual cost = 73,826 × £0.15 = <strong>£11,074</strong>
                </p>
                <p>
                  <strong>IE4 motor:</strong>
                </p>
                <p>Input power = 11 / 0.926 = 11.88kW</p>
                <p>Annual energy = 11.88 × 6000 = 71,274 kWh</p>
                <p>
                  Annual cost = 71,274 × £0.15 = <strong>£10,691</strong>
                </p>
                <p>
                  Annual saving = £11,074 - £10,691 = <strong>£383/year</strong>
                </p>
                <p className="text-white">→ Premium for IE4 typically recovered in 2-3 years</p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 4: Core Loss Analysis
              </p>
              <p>
                <strong>Question:</strong> A transformer core has total iron losses of 800W at 50Hz.
                If hysteresis losses are 60% of total, calculate the losses at 60Hz (same flux
                density).
              </p>

                <p>At 50Hz:</p>
                <p>Hysteresis loss Ph = 0.6 × 800 = 480W (∝ f)</p>
                <p>Eddy current loss Pe = 0.4 × 800 = 320W (∝ f²)</p>
                <p>At 60Hz:</p>
                <p>New Ph = 480 × (60/50) = 480 × 1.2 = 576W</p>
                <p>New Pe = 320 × (60/50)² = 320 × 1.44 = 461W</p>
                <p>
                  Total at 60Hz = 576 + 461 = <strong>1037W</strong>
                </p>
                <p className="text-white">
                  → 30% increase in losses from 20% frequency increase
                </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>P = I²R</strong> — Resistive power loss (Joule heating)
                </li>
                <li>
                  <strong>
                    P<sub>e</sub> ∝ f² × t²
                  </strong>{' '}
                  — Eddy current loss (frequency and lamination squared)
                </li>
                <li>
                  <strong>
                    P<sub>h</sub> ∝ f × B<sup>n</sup>
                  </strong>{' '}
                  — Hysteresis loss (Steinmetz equation)
                </li>
                <li>
                  <strong>δ = √(ρ/πfμ)</strong> — Skin depth
                </li>
                <li>
                  <strong>
                    η = P<sub>out</sub>/(P<sub>out</sub> + losses)
                  </strong>{' '}
                  — Efficiency
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Key Values to Remember
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Skin depth in copper at 50 Hz: <strong>≈9 mm</strong>
                </li>
                <li>
                  Copper resistance temperature coefficient: <strong>+0.4%/°C</strong>
                </li>
                <li>
                  Resistance increase at 70°C vs 20°C: <strong>×1.2</strong>
                </li>
                <li>
                  Typical transformer efficiency: <strong>97-99%</strong>
                </li>
                <li>
                  IE3 motor efficiency (typical): <strong>90-95%</strong>
                </li>
              </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Forgetting squared relationships</strong> — I²R and f² for eddy currents
                </li>
                <li>
                  <strong>Using cold resistance</strong> — Cable resistance at operating temperature
                  is higher
                </li>
                <li>
                  <strong>Ignoring iron losses at light load</strong> — They are constant and
                  dominate efficiency
                </li>
                <li>
                  <strong>Not considering derating</strong> — Grouped cables cannot dissipate heat
                  effectively
                </li>
                <li>
                  <strong>Overlooking power factor</strong> — Poor PF increases current and I²R
                  losses
                </li>
              </ul>
              </>
            }
            doInstead="Apply the formulas with care, verify with measured values where possible, and always cross-check against BS 7671 and equipment manufacturer data."
          />

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">Loss Types</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>I²R (Joule) - Conductors, windings</li>
                  <li>Eddy current - Magnetic cores (∝ f²)</li>
                  <li>Hysteresis - Magnetic cores (∝ f)</li>
                  <li>Stray - Leakage flux, harmonics</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Loss Reduction</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Larger conductors - Lower R</li>
                  <li>Laminations - Reduced eddy currents</li>
                  <li>Silicon steel - Lower hysteresis</li>
                  <li>Higher voltage - Lower current</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="200 m main supply cable &mdash; sizing for lifecycle losses"
            situation={
              <>
                A new commercial building has a 200 m main supply cable from the DNO
                substation to the LV switchroom carrying 400 A continuous. Standard cable
                size from the load calc is 240 mm&sup2; copper SWA (Iz adequate). The
                design engineer evaluates upsizing to 300 mm&sup2; or 400 mm&sup2; on
                lifecycle-cost grounds.
              </>
            }
            whatToDo={
              <>
                Calculate I&sup2;R loss for each option. R per phase per metre approx:
                240 mm&sup2; = 0.0754 m&Omega;/m; 300 mm&sup2; = 0.0601 m&Omega;/m;
                400 mm&sup2; = 0.0470 m&Omega;/m. Loss per metre at 400 A 3-phase =
                3 &times; 400&sup2; &times; R. Annual loss (8000 hours operation) =
                240 mm&sup2; ~58 MWh; 300 mm&sup2; ~46 MWh; 400 mm&sup2; ~36 MWh.
                Lifecycle saving 240&rarr;400 = ~22 MWh/year &asymp; &pound;4400/year at
                20 p/kWh &mdash; payback typically 4&ndash;6 years on the cable cost
                differential. Specify 400 mm&sup2; and document the analysis.
              </>
            }
            whyItMatters={
              <>
                Long main-supply cables are huge lifetime energy sinks because they run
                continuously. The HNC engineer who runs the lifecycle analysis converts
                a 4&ndash;6 year payback into 20 years of cumulative saving and feeds
                that into the building&rsquo;s SAP / SBEM evidence. Building Regs Part L
                2021 explicitly expects this analysis on commercial supplies.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'I&sup2;R loss scales with load squared &mdash; doubling current quadruples the loss.',
              'Iron losses (hysteresis + eddy) are constant 24/7 &mdash; independent of load, dominant in lightly-loaded transformers.',
              'Skin effect: AC current concentrates near conductor surface; significant on large conductors at high frequency, negligible below ~150 mm&sup2; copper at 50 Hz.',
              'Proximity effect: parallel current-carrying conductors push current to outer surfaces &mdash; reduces effective Iz on closely-grouped cables.',
              'Hysteresis loss controlled by material: grain-oriented silicon steel for transformers, amorphous metal for ultra-low-loss.',
              'Eddy current loss controlled by lamination thickness: 0.3&ndash;0.5 mm sheets standard, thinner for higher frequency.',
              'Cable upsize on long mains is one of the cheapest energy-efficiency interventions on a BSE design.',
              'BS 7671 Reg 132.5 + Part L 2021 expect lifecycle-loss analysis on commercial supplies, not just minimum-Iz sizing.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 5
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section6-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Efficiency calculations for equipment and systems
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section6_1;
