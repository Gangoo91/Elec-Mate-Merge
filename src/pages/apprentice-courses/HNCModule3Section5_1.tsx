/**
 * Module 3 · Section 5 · Subsection 1 — Principles of Electromagnetic Induction
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Faraday, Lenz, motional EMF, transformer EMF, eddy currents — the physics
 *   foundation that underpins every transformer, motor, generator and inductive load
 *   in a BSE installation.
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

const TITLE = 'Principles of Electromagnetic Induction - HNC Module 3 Section 5.1';
const DESCRIPTION =
  "Master electromagnetic induction for building services: Faraday's law, Lenz's law, transformer EMF, inductance, eddy currents and practical applications in generators, motors and transformers.";

const quickCheckQuestions = [
  {
    id: 'faraday-law',
    question: "According to Faraday's law, what determines the magnitude of induced EMF?",
    options: [
      'The rate of change of magnetic flux',
      'The strength of the magnetic field',
      'The resistance of the conductor',
      'The area of the coil',
    ],
    correctIndex: 0,
    explanation:
      "Faraday's law states that the induced EMF is proportional to the rate of change of magnetic flux linkage: e = -N(dΦ/dt). Faster changes produce larger EMFs.",
  },
  {
    id: 'lenz-law',
    question: "Lenz's law states that the induced current will:",
    options: [
      'Always be alternating current',
      'Flow in the same direction as the applied field',
      'Be proportional to the conductor length',
      'Create a field that opposes the change causing it',
    ],
    correctIndex: 3,
    explanation:
      "Lenz's law states that the direction of induced current is such that it opposes the change in flux that caused it. This is why there is a negative sign in e = -N(dΦ/dt).",
  },
  {
    id: 'motional-emf',
    question:
      'A 0.5m conductor moves at 10 m/s through a 0.8T magnetic field. What is the induced EMF?',
    options: [
      '0.4V',
      '40V',
      '8V',
      '4V',
    ],
    correctIndex: 3,
    explanation:
      'Using e = Blv: e = 0.8T × 0.5m × 10m/s = 4V. This is the motional EMF equation for a conductor cutting magnetic field lines.',
  },
  {
    id: 'transformer-emf',
    question:
      'A transformer primary has 500 turns. If the flux changes by 0.02Wb in 0.01s, what is the induced EMF?',
    options: [
      '10V',
      '1000V',
      '500V',
      '100V',
    ],
    correctIndex: 1,
    explanation:
      "Using e = -N(dΦ/dt): e = 500 × (0.02/0.01) = 500 × 2 = 1000V. The negative sign indicates direction per Lenz's law.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the fundamental principle discovered by Faraday?',
    options: [
      'Electric current produces a magnetic field',
      'A changing magnetic field induces an EMF in a conductor',
      'Like poles repel and unlike poles attract',
      'Resistance is proportional to length',
    ],
    correctAnswer: 1,
    explanation:
      'Faraday discovered that a changing magnetic field (or relative motion between a conductor and field) induces an electromotive force (EMF) in the conductor. This is the basis of all generators and transformers.',
  },
  {
    id: 2,
    question:
      'A conductor of length 0.4m moves at 15 m/s perpendicular to a magnetic field of 1.2T. What EMF is induced?',
    options: [
      '12V',
      '4.8V',
      '7.2V',
      '18V',
    ],
    correctAnswer: 2,
    explanation: 'Using motional EMF formula: e = Blv = 1.2 × 0.4 × 15 = 7.2V',
  },
  {
    id: 3,
    question: 'Why does a transformer core use laminations rather than solid iron?',
    options: [
      'To increase magnetic flux',
      'To reduce weight',
      'To improve cooling',
      'To reduce eddy current losses',
    ],
    correctAnswer: 3,
    explanation:
      'Laminations break up the paths for eddy currents, dramatically reducing I²R losses. Solid cores would allow large circulating currents that waste energy as heat.',
  },
  {
    id: 4,
    question: "The negative sign in Faraday's law (e = -N dΦ/dt) represents:",
    options: [
      "Lenz's law - opposition to change",
      'Power loss in the circuit',
      'The phase angle of AC',
      'Magnetic reluctance',
    ],
    correctAnswer: 0,
    explanation:
      "The negative sign represents Lenz's law: the induced EMF acts in a direction to oppose the change in flux that caused it. This is a consequence of energy conservation.",
  },
  {
    id: 5,
    question: 'What is flux linkage?',
    options: [
      'Regulations, science, safety, and scenario-based questions',
      'The total flux through a coil multiplied by number of turns',
      'The transformer star point and supply neutral/combined neutral-earth',
      'Much higher speed (10–25 krpm vs 1500–3000)',
    ],
    correctAnswer: 1,
    explanation:
      'Flux linkage (Λ or NΦ) is the product of magnetic flux and the number of turns it links. It determines the total EMF induced in a multi-turn coil.',
  },
  {
    id: 6,
    question:
      'A 200-turn coil has its flux changed from 0.05Wb to 0.02Wb in 0.1s. What is the average induced EMF?',
    options: [
      '6V',
      '100V',
      '60V',
      '600V',
    ],
    correctAnswer: 2,
    explanation:
      'e = -N(dΦ/dt) = -200 × (0.02 - 0.05)/0.1 = -200 × (-0.03)/0.1 = -200 × (-0.3) = 60V (magnitude)',
  },
  {
    id: 7,
    question: 'Self-inductance is measured in:',
    options: [
      'Ohms',
      'Farads',
      'Webers',
      'Henrys',
    ],
    correctAnswer: 3,
    explanation:
      'Self-inductance is measured in Henrys (H). 1 Henry means that a current change of 1A/s induces an EMF of 1V in the coil.',
  },
  {
    id: 8,
    question:
      'In a building services installation, which equipment relies on electromagnetic induction?',
    options: [
      'Transformers and motors',
      'Socket outlets',
      'LED lighting',
      'Earth electrodes',
    ],
    correctAnswer: 0,
    explanation:
      'Transformers (voltage conversion), motors (mechanical work from electricity), and generators (electricity from mechanical work) all operate on electromagnetic induction principles.',
  },
  {
    id: 9,
    question: 'What happens when a conductor moves parallel to magnetic field lines?',
    options: [
      'Maximum EMF is induced',
      'No EMF is induced',
      'The conductor heats up',
      'The field is strengthened',
    ],
    correctAnswer: 1,
    explanation:
      'EMF is only induced when the conductor cuts across field lines. Moving parallel to the field produces no flux change and therefore no induced EMF.',
  },
  {
    id: 10,
    question: 'Mutual inductance between two coils depends on:',
    options: [
      'Pressure reaches its maximum (stagnation pressure)',
      'How bandwidth decreases with increasing fibre length',
      'The coupling between the coils and their turns',
      'The type of hazard posed by the substance',
    ],
    correctAnswer: 2,
    explanation:
      'Mutual inductance M depends on the number of turns in both coils, the core material (permeability), and how much flux from one coil links with the other (coupling coefficient).',
  },
];

const faqs = [
  {
    question: 'Why is electromagnetic induction important in building services?',
    answer:
      'Electromagnetic induction is the operating principle behind transformers (voltage conversion for distribution, bell transformers, LED drivers), motors (HVAC fans, pumps, lifts), generators (standby power), and induction heating. Understanding these principles is essential for specifying, installing and troubleshooting this equipment.',
  },
  {
    question: 'What is the difference between self-inductance and mutual inductance?',
    answer:
      'Self-inductance is when a changing current in a coil induces an EMF in the same coil (back-EMF). Mutual inductance is when a changing current in one coil induces an EMF in a nearby coil - this is the transformer principle. Both are measured in Henrys.',
  },
  {
    question: 'Why do motors draw high current at start-up?',
    answer:
      'When a motor is stationary, there is no back-EMF to oppose the supply voltage. The current is limited only by the winding resistance, which is low. As the motor accelerates, increasing back-EMF reduces the net voltage and hence the current. This is why motor circuits need higher rated protective devices.',
  },
  {
    question: 'How do eddy currents affect transformer efficiency?',
    answer:
      'Eddy currents are circulating currents induced in the transformer core by the changing magnetic field. They cause I²R heating losses (eddy current losses). Laminating the core with thin, insulated sheets restricts eddy current paths and reduces these losses significantly.',
  },
  {
    question: 'What determines the direction of induced current?',
    answer:
      "Lenz's law determines direction: the induced current flows in a direction that opposes the change causing it. Alternatively, use Fleming's right-hand rule for generators: thumb = motion, first finger = field, second finger = induced current direction.",
  },
  {
    question: 'Why are transformers rated in kVA rather than kW?',
    answer:
      "Transformers must be sized for the apparent power (VA) they carry, regardless of power factor. The core and windings must handle the current associated with the VA rating. The actual useful power (kW) depends on the load's power factor, which the transformer cannot control.",
  },
];

const HNCModule3Section5_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5 · Subsection 1"
            title="Principles of electromagnetic induction"
            description="The fundamental principles behind generators, transformers and motors in building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You apply Faraday&rsquo;s law (e = &minus;N d&Phi;/dt) to derive every transformer EMF and every motor back-EMF on a BSE installation.',
              'You use Lenz&rsquo;s law (the induced current opposes the change that caused it) to predict reactor and inductor behaviour at switching events.',
              'You calculate motional EMF (e = Blv) for generator output and rotating-machine slip-ring analysis.',
              'You design out eddy-current losses with laminated cores, grain-oriented silicon steel and amorphous metal — the basis of every modern distribution transformer specification.',
            ]}
          />

          <RegsCallout
            source="BS EN 60076-1 — Power transformers (general requirements)"
            clause="A power transformer is a static piece of apparatus with two or more windings which, by electromagnetic induction, transforms a system of alternating voltage and current into another system of voltage and current usually of different values and at the same frequency for the purpose of transmitting electrical power."
            meaning={
              <>
                BS EN 60076 is the umbrella standard for the distribution and isolating
                transformers you specify on every BSE project. Faraday&rsquo;s law is
                the physics; BS EN 60076 turns the physics into the loss limits, vector
                groups, insulation classes and overload tolerances you select against.
                Knowing the law lets you read a transformer datasheet critically rather
                than accept the vendor&rsquo;s defaults.
              </>
            }
            cite="Source: BS EN 60076-1 (power transformers); BS EN 60404 (magnetic materials); CIBSE Guide F (Energy efficiency in buildings)"
          />

          <LearningOutcomes
            outcomes={[
              "State and apply Faraday's law of electromagnetic induction",
              "Apply Lenz's law to determine direction of induced EMF",
              "Calculate motional EMF using e = Blv",
              "Calculate transformer EMF using e = -N(dΦ/dt)",
              "Explain self and mutual inductance in practical terms",
              "Describe eddy current effects and mitigation methods",
              "Relate induction principles to building services equipment",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Faraday's law:</strong> e = -N(d&#934;/dt) - EMF from changing flux</li>
              <li><strong>Lenz's law:</strong> Induced current opposes the change</li>
              <li><strong>Motional EMF:</strong> e = Blv for moving conductors</li>
              <li><strong>Inductance:</strong> Opposition to current change (Henrys)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Generators:</strong> Standby power, wind turbines</li>
              <li><strong>Transformers:</strong> Voltage conversion, isolation</li>
              <li><strong>Motors:</strong> HVAC, pumps, lifts, conveyors</li>
              <li><strong>Eddy currents:</strong> Losses, braking, heating</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Faraday's Law of Electromagnetic Induction">
            <p>
              Michael Faraday's 1831 discovery that a changing magnetic field induces an
              electromotive force (EMF) in a conductor revolutionised electrical engineering. This
              principle underlies all generators, transformers and induction motors.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Faraday's Law Statement
              </p>
              <p><strong>e = -N &#215; (d&#934;/dt)</strong></p>

                <p>e = induced EMF (Volts)</p>
                <p>N = number of turns in the coil</p>
                <p>d&#934;/dt = rate of change of magnetic flux (Wb/s)</p>

            

              <p className="text-sm font-medium text-white">Key principles:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>EMF is induced only when flux through the coil is changing</li>
                <li>Greater rate of change produces greater EMF</li>
                <li>More turns means more EMF for the same flux change</li>
                <li>
                  The negative sign represents Lenz's law (opposition to change)
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Methods of Inducing EMF
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Moving conductor</strong> — Conductor cuts field lines — Generators</li>
              <li><strong>Moving magnet</strong> — Field moves relative to coil — Dynamos, sensors</li>
              <li><strong>Varying current</strong> — Electromagnet field changes — Transformers</li>
              <li><strong>Rotating coil</strong> — Coil angle to field varies — AC generators</li>
            </ul>

            <p>
              <strong>Remember:</strong> No change in flux = no induced EMF. Static conditions
              produce no induction regardless of field strength.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Lenz's Law and Direction of Induced EMF">
            <p>
              Lenz's law provides the direction of the induced EMF and current. It states that the
              induced current will flow in a direction that opposes the change in flux that caused
              it.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Lenz's Law Statement</p>
              <p><em>
                "The direction of the induced EMF is such that it opposes the change producing it."
              </em></p>
              <p>
                This is a consequence of energy conservation - energy cannot be created from
                nothing.
              </p>

              <p className="text-sm font-medium text-white">Practical implications:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  If flux increases, induced current creates an opposing field
                </li>
                <li>If flux decreases, induced current tries to maintain it</li>
                <li>Moving a magnet toward a coil induces repelling current</li>
                <li>Moving a magnet away induces attracting current</li>
              </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Fleming's Right-Hand Rule (Generators)
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Thumb:</strong> Motion of conductor
                  </li>
                  <li>
                    <strong>First finger:</strong> Field direction (N to S)
                  </li>
                  <li>
                    <strong>Second finger:</strong> Induced current direction
                  </li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Energy Consideration</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Opposition requires work to overcome</li>
                  <li>Mechanical energy converts to electrical</li>
                  <li>Conservation of energy is maintained</li>
                </ul>

            

            <p>
              <strong>Key insight:</strong> Without Lenz's law, a generator would accelerate itself
              - violating conservation of energy.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Flux Linkage and Rate of Change">
            <p>
              Flux linkage combines the concepts of magnetic flux and coil turns to give the total
              flux linked with a coil. It is the key quantity in determining induced EMF.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Flux Linkage Definition
              </p>
              <p><strong>&#923; = N &#215; &#934;</strong></p>

                <p>&#923; (Lambda, flux linkage) = Weber-turns (Wb-turns)</p>
                <p>N = number of turns</p>
                <p>&#934; = magnetic flux through one turn (Wb)</p>

            

              <p className="text-sm font-medium text-white">Magnetic flux basics:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>&#934; = B &#215; A &#215; cos(&#952;)</strong> - flux through an area
                </li>
                <li>B = magnetic flux density (Tesla)</li>
                <li>A = area perpendicular to field (m&#178;)</li>
                <li>&#952; = angle between field and normal to area</li>
                <li>
                  Maximum flux when field is perpendicular to area (&#952; = 0)
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Faraday's Law Using Flux Linkage
              </p>

                
                  <p><strong>e = -d&#923;/dt</strong></p>
                  <p className="text-white text-xs text-center">
                    EMF equals rate of change of flux linkage
                  </p>

                
                  <p><strong>
                    e = -(&#923;&#8322; - &#923;&#8321;) / t
                  </strong></p>
                  <p className="text-white text-xs text-center">
                    For average EMF over time interval t
                  </p>

              

            <p>
              <strong>Practical note:</strong> Doubling either the turns or the rate of flux change
              doubles the induced EMF.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Motional EMF: e = Blv">
            <p>
              When a conductor moves through a magnetic field, cutting field lines, an EMF is
              induced along its length. This is the basis of all rotating generators.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Motional EMF Equation</p>
              <p><strong>e = B &#215; l &#215; v</strong></p>

                <p>e = induced EMF (Volts)</p>
                <p>B = magnetic flux density (Tesla)</p>
                <p>l = length of conductor in field (metres)</p>
                <p>v = velocity of conductor (m/s)</p>

            

              <p className="text-sm font-medium text-white">Conditions for maximum EMF:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Conductor moves perpendicular to field lines</li>
                <li>Conductor length is perpendicular to both field and motion</li>
                <li>If motion is at angle &#952;: e = Blv &#215; sin(&#952;)</li>
                <li>Parallel motion produces zero EMF</li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Generator Applications</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Diesel generator</strong> — Rotating coil in field — Standby power systems</li>
              <li><strong>Wind turbine</strong> — Rotating magnetic field — Renewable generation</li>
              <li><strong>Vehicle alternator</strong> — Belt-driven rotor — Mobile equipment</li>
              <li><strong>Micro-hydro</strong> — Water-driven turbine — Remote installations</li>
            </ul>

            <p>
              <strong>AC generation:</strong> As a coil rotates, v sin(&#952;) varies sinusoidally,
              producing AC output naturally.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Transformer EMF: e = -N(d&#934;/dt)">
            <p>
              Transformers use electromagnetic induction without any moving parts. An alternating
              current in the primary winding creates a changing magnetic flux that induces an EMF in
              the secondary winding.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Transformer EMF Equations
              </p>

                
                  <p><strong>e&#8321; = -N&#8321; &#215; (d&#934;/dt)</strong></p>
                  <p>Primary EMF</p>

                
                  <p><strong>e&#8322; = -N&#8322; &#215; (d&#934;/dt)</strong></p>
                  <p>Secondary EMF</p>

              
              <p>
                Same flux links both windings, so: e&#8322;/e&#8321; = N&#8322;/N&#8321;
              </p>

              <p className="text-sm font-medium text-white">
                Transformer voltage relationship:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>V&#8322;/V&#8321; = N&#8322;/N&#8321;</strong> - voltage ratio equals
                  turns ratio
                </li>
                <li>
                  Step-up: N&#8322; &gt; N&#8321; gives V&#8322; &gt; V&#8321;
                </li>
                <li>
                  Step-down: N&#8322; &lt; N&#8321; gives V&#8322; &lt; V&#8321;
                </li>
                <li>
                  Ideal transformer: V&#8321;I&#8321; = V&#8322;I&#8322; (power conserved)
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Transformers in Building Services
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Distribution transformer</strong> — 11kV:400V — HV to LV supply</li>
              <li><strong>Bell transformer</strong> — 230V:8V — Door bells, chimes</li>
              <li><strong>Isolating transformer</strong> — 1:1 — Safety isolation</li>
              <li><strong>LED driver</strong> — 230V:12V/24V — Low voltage lighting</li>
              <li><strong>Site transformer (CTE)</strong> — 230V:110V — 55-0-55V for safety</li>
            </ul>

            <p>
              <strong>Important:</strong> Transformers only work with AC. DC produces constant flux
              and therefore no induced EMF.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Self and Mutual Inductance">
            <p>
              Inductance quantifies the ability of a circuit to oppose changes in current.
              Self-inductance relates to a single coil; mutual inductance relates to coupling
              between two coils.
            </p>

              
                <p className="text-sm font-medium text-elec-yellow/80">Self-Inductance (L)</p>
                <p><strong>e = -L &#215; (di/dt)</strong></p>

                  <p>L = self-inductance (Henrys)</p>
                  <p>di/dt = rate of change of current</p>
                  <p>e = back-EMF opposing change</p>

              

                <p className="text-sm font-medium text-elec-yellow/80">
                  Mutual Inductance (M)
                </p>
                <p><strong>
                  e&#8322; = -M &#215; (di&#8321;/dt)
                </strong></p>

                  <p>M = mutual inductance (Henrys)</p>
                  <p>di&#8321;/dt = rate of change in coil 1</p>
                  <p>e&#8322; = EMF induced in coil 2</p>

              

              <p className="text-sm font-medium text-white">Inductance properties:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Unit: Henry (H) - 1H induces 1V when current changes at 1A/s
                </li>
                <li>
                  Increases with: more turns, larger area, magnetic core material
                </li>
                <li>L proportional to N&#178; (doubling turns quadruples L)</li>
                <li>Stored energy: E = 0.5 &#215; L &#215; I&#178;</li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Practical Effects of Inductance
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Motor back-EMF</strong> — Self-inductance of windings — Limits running current</li>
              <li><strong>Inductive reactance</strong> — Opposition to AC — X&#8343; = 2&#960;fL (Ohms)</li>
              <li><strong>Switch arcing</strong> — Stored energy release — Contact wear, EMC issues</li>
              <li><strong>Lagging power factor</strong> — Current lags voltage — Reactive power demand</li>
            </ul>

            <p>
              <strong>Design note:</strong> High mutual inductance with minimal leakage flux is the
              goal for efficient transformers.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Eddy Currents and Their Effects">
            <p>
              Eddy currents are circulating currents induced in conducting materials by changing
              magnetic fields. They can cause unwanted losses or be harnessed for useful
              applications.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Eddy Current Formation</p>
              <p>
                When a changing magnetic field passes through a conductor, EMF is induced throughout
                the material. This drives circulating currents (eddies) that follow closed loops
                within the conductor, generating heat through I&#178;R losses.
              </p>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Unwanted Effects (Losses)
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Transformer core heating</li>
                  <li>Motor and generator core losses</li>
                  <li>Efficiency reduction</li>
                  <li>Overheating of metal enclosures</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Useful Applications</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Induction heating (cooking, furnaces)</li>
                  <li>Electromagnetic braking (trains, rides)</li>
                  <li>Metal detectors</li>
                  <li>Damping in instruments</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Reducing Eddy Current Losses
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Laminated cores</strong> — Thin sheets restrict eddy paths — Transformers, motors</li>
              <li><strong>Silicon steel</strong> — Higher resistivity reduces currents — Power transformers</li>
              <li><strong>Ferrite cores</strong> — Non-conductive magnetic material — High-frequency transformers</li>
              <li><strong>Non-magnetic enclosures</strong> — No field interaction — Switchgear, cable routes</li>
            </ul>

              <p className="text-sm font-medium text-white">Eddy current loss factors:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Losses proportional to frequency squared (f&#178;)</li>
                <li>Losses proportional to flux density squared (B&#178;)</li>
                <li>Losses proportional to lamination thickness squared</li>
                <li>Typical lamination thickness: 0.35mm to 0.5mm for 50Hz</li>
              </ul>

            <p>
              <strong>Practical example:</strong> A solid core transformer would waste 20-30% of
              energy as heat; lamination reduces this to 1-2%.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Building Services: Generators, Motors, Transformers">
            <p>
              Electromagnetic induction principles are applied extensively in building services
              installations. Understanding these principles aids specification, installation and
              fault diagnosis.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Generators in Building Services
              </p>

                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Standby generators:</strong> Essential for hospitals, data centres,
                    high-rise buildings
                  </li>
                  <li>
                    <strong>Operating principle:</strong> Diesel engine rotates field or armature,
                    inducing AC in windings
                  </li>
                  <li>
                    <strong>Output:</strong> Typically 400V three-phase, 50Hz (synchronised to mains
                    frequency)
                  </li>
                  <li>
                    <strong>Sizing:</strong> Must account for motor starting currents (up to 6&#215;
                    running current)
                  </li>
                  <li>
                    <strong>AVR (Automatic Voltage Regulator):</strong> Maintains output voltage by
                    adjusting field current
                  </li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Motors in Building Services
              </p>

                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Induction motors:</strong> Most common type - rotating magnetic field
                    induces rotor current
                  </li>
                  <li>
                    <strong>Applications:</strong> HVAC fans, pumps, compressors, lifts, escalators
                  </li>
                  <li>
                    <strong>Back-EMF:</strong> Generated by rotor motion, reduces net voltage and
                    hence current
                  </li>
                  <li>
                    <strong>Starting current:</strong> 6-8&#215; full load current (no back-EMF when
                    stationary)
                  </li>
                  <li>
                    <strong>VSD control:</strong> Variable Speed Drives control motor speed by
                    varying frequency
                  </li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Transformers in Building Services
              </p>

                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Distribution:</strong> 11kV/400V for large buildings, on-site substation
                  </li>
                  <li>
                    <strong>Isolation:</strong> Medical locations (IT systems), bathrooms, swimming
                    pools
                  </li>
                  <li>
                    <strong>SELV:</strong> 230V/12V or 24V for bathroom lighting, garden lighting
                  </li>
                  <li>
                    <strong>Control:</strong> 230V/24V for BMS, fire alarm, access control
                  </li>
                  <li>
                    <strong>CTE:</strong> 230V/110V (55-0-55V) for construction site tools
                  </li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Key Installation Considerations
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Large motors</strong> — High starting current — Suitably rated MCB/fuses, consider soft-start</li>
              <li><strong>Transformers</strong> — Magnetising inrush — Time-delayed protection, inrush-rated MCB</li>
              <li><strong>Generators</strong> — Voltage regulation — AVR settings, load shedding sequence</li>
              <li><strong>Single-core cables</strong> — Induced EMF in metalwork — Non-ferrous glands, trefoil formation</li>
            </ul>

            <p>
              <strong>BS 7671 note:</strong> Regulation 521.5 requires all conductors of a circuit
              to be contained in the same cable or enclosure to prevent eddy current heating.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
                Example 1: Generator EMF Calculation
              </p>
              <p>
                <strong>Question:</strong> A generator armature has 200 conductors, each 0.3m long,
                rotating at the edge of a 0.15m radius drum at 1500 rpm in a 0.9T field. Calculate
                the average EMF per conductor.
              </p>

                <p>Step 1: Calculate velocity</p>
                <p>
                  v = 2 &#215; &#960; &#215; r &#215; (rpm/60) = 2 &#215; 3.14 &#215; 0.15 &#215;
                  (1500/60)
                </p>
                <p>
                  v = 2 &#215; 3.14 &#215; 0.15 &#215; 25 = <strong>23.6 m/s</strong>
                </p>
                <p>Step 2: Calculate EMF per conductor</p>
                <p>
                  e = Blv = 0.9 &#215; 0.3 &#215; 23.6 = <strong>6.4V</strong>
                </p>
                <p>
                  Total EMF depends on series/parallel conductor arrangement
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 2: Transformer Turns Ratio
              </p>
              <p>
                <strong>Question:</strong> A bell transformer has 1150 turns on the primary and 40
                turns on the secondary. If connected to 230V mains, what is the secondary voltage?
              </p>

                <p>Using transformer equation: V&#8322;/V&#8321; = N&#8322;/N&#8321;</p>
                <p>V&#8322; = V&#8321; &#215; (N&#8322;/N&#8321;)</p>
                <p>V&#8322; = 230 &#215; (40/1150)</p>
                <p>
                  V&#8322; = 230 &#215; 0.0348 = <strong>8V</strong>
                </p>
                <p>Suitable for door bells and chimes</p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 3: Rate of Change of Flux
              </p>
              <p>
                <strong>Question:</strong> A 400-turn coil is in a magnetic field. The flux through
                the coil changes from 0.08Wb to 0.02Wb in 50ms. Calculate the induced EMF.
              </p>

                <p>Change in flux: d&#934; = 0.02 - 0.08 = -0.06Wb</p>
                <p>Time: dt = 50ms = 0.05s</p>
                <p>e = -N &#215; (d&#934;/dt)</p>
                <p>e = -400 &#215; (-0.06/0.05)</p>
                <p>
                  e = -400 &#215; (-1.2) = <strong>480V</strong>
                </p>
                <p>
                  The positive result indicates EMF opposes the decreasing flux
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 4: Self-Inductance Back-EMF
              </p>
              <p>
                <strong>Question:</strong> A relay coil has inductance of 0.5H. When the circuit is
                opened, the current falls from 0.2A to zero in 5ms. What back-EMF is generated?
              </p>

                <p>Using: e = -L &#215; (di/dt)</p>
                <p>di = 0 - 0.2 = -0.2A</p>
                <p>dt = 5ms = 0.005s</p>
                <p>e = -0.5 &#215; (-0.2/0.005)</p>
                <p>
                  e = -0.5 &#215; (-40) = <strong>20V</strong>
                </p>
                <p>
                  This is why relay contacts arc - the back-EMF can be much higher than supply
                </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>e = -N(d&#934;/dt)</strong> - Faraday's law (transformer EMF)
                </li>
                <li>
                  <strong>e = Blv</strong> - Motional EMF
                </li>
                <li>
                  <strong>e = -L(di/dt)</strong> - Self-inductance back-EMF
                </li>
                <li>
                  <strong>V&#8322;/V&#8321; = N&#8322;/N&#8321;</strong> - Transformer voltage ratio
                </li>
                <li>
                  <strong>X&#8343; = 2&#960;fL</strong> - Inductive reactance
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Key Values to Remember
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Motor starting current: <strong>6-8&#215; full load current</strong>
                </li>
                <li>
                  Transformer inrush: <strong>Up to 12&#215; full load current</strong>
                </li>
                <li>
                  UK frequency: <strong>50Hz</strong>
                </li>
                <li>
                  Lamination thickness (50Hz): <strong>0.35-0.5mm</strong>
                </li>
                <li>
                  CTE output: <strong>55-0-55V</strong> (110V between lines)
                </li>
              </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>DC on transformer:</strong> Produces no output, only heating
                </li>
                <li>
                  <strong>Ignoring inrush:</strong> MCBs may nuisance trip on transformer
                  energisation
                </li>
                <li>
                  <strong>Separating single-core cables:</strong> Causes eddy current heating in
                  steel enclosures
                </li>
                <li>
                  <strong>Undersizing for motors:</strong> Must account for starting current, not
                  just running
                </li>
              </ul>
              </>
            }
            doInstead="Apply the formulas with care, verify with measured values where possible, and always cross-check against BS 7671 and equipment manufacturer data."
          />

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">Induction Laws</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Faraday: e = -N(d&#934;/dt)</li>
                  <li>Lenz: Opposes the change causing it</li>
                  <li>Motional: e = Blv (perpendicular)</li>
                  <li>Self-inductance: e = -L(di/dt)</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Building Services</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Generators: Mechanical to electrical</li>
                  <li>Motors: Electrical to mechanical</li>
                  <li>Transformers: Voltage conversion</li>
                  <li>Laminations: Reduce eddy losses</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Investigating transformer humming and excessive no-load loss"
            situation={
              <>
                A site operator reports increased monthly kWh consumption from a 800 kVA
                cast-resin distribution transformer feeding a quiet office building. The
                transformer is audibly louder than at commissioning two years ago. No-load
                loss measurement shows 1.8 kW continuous (commissioning value 1.1 kW).
              </>
            }
            whatToDo={
              <>
                Investigate via three avenues: (a) Check supply voltage. If the DNO is
                running consistently at 245&ndash;253 V (within the 230 V +10 % BS EN 50160
                tolerance), core flux density rises beyond design point and the iron
                saturates — drives both no-load loss and acoustic noise. Specify a tap
                changer adjustment to bring secondary nominal closer to 230 V. (b) Check
                downstream harmonic content — significant 5th/7th distortion increases
                eddy-current loss. (c) Visually / thermally inspect for delaminated core
                stacking or loose tie-bolts.
              </>
            }
            whyItMatters={
              <>
                A 0.7 kW continuous no-load increase is 6132 kWh/year &mdash; ~&pound;1230
                at 20 p/kWh, plus the carbon penalty under any building&rsquo;s ESOS or
                BREEAM-In-Use audit. Transformer no-load loss runs 24/7 regardless of
                downstream load, so detecting and correcting drift is high-leverage on
                BSE energy management.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Faraday&rsquo;s law: e = &minus;N d&Phi;/dt — induced EMF is proportional to rate of change of flux linkage.',
              'Lenz&rsquo;s law: induced current direction opposes the change in flux that caused it &mdash; the source of inductor &ldquo;back-EMF&rdquo; on switching.',
              'Motional EMF: e = Blv — the basis of generator and slip-ring machine analysis.',
              'Transformer EMF: E = 4.44 &times; B &times; A &times; f &times; N — the design equation behind every transformer kVA rating.',
              'Eddy currents: circulating currents in solid metal cores cause I&sup2;R losses — controlled by laminating cores in 0.3&ndash;0.5 mm sheets.',
              'Hysteresis loss: energy lost re-aligning magnetic domains every cycle — controlled by grain-oriented silicon steel.',
              'BS EN 60076 is the umbrella standard for distribution transformers; tier 2 Ecodesign limits cap no-load and load losses.',
              'Modern alternatives: amorphous metal cores (~70 % lower no-load loss than silicon steel) for ultra-low-loss transformers in Part L-driven specifications.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 4
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Transformer theory, losses and efficiency
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section5_1;
