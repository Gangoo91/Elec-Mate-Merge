/**
 * Module 3 · Section 5 · Subsection 2 — Transformer Theory, Losses and Efficiency
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Turns ratio, copper and iron losses, efficiency curves, voltage regulation,
 *   tier-2 Ecodesign loss limits. The selection arithmetic for every distribution
 *   transformer on a BSE project.
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

const TITLE = 'Transformer Theory, Losses and Efficiency - HNC Module 3 Section 5.2';
const DESCRIPTION =
  'Master transformer operation principles including turns ratio, voltage and current transformation, core and copper losses, efficiency calculations, voltage regulation and building services applications.';

const quickCheckQuestions = [
  {
    id: 'turns-ratio',
    question:
      'A transformer has 1000 primary turns and 100 secondary turns. If the primary voltage is 11kV, what is the secondary voltage?',
    options: [
      '110V',
      '1100V',
      '11000V',
      '110kV',
    ],
    correctIndex: 1,
    explanation:
      'Using V1/V2 = N1/N2: V2 = V1 x (N2/N1) = 11000 x (100/1000) = 1100V. The turns ratio of 10:1 steps down the voltage by a factor of 10.',
  },
  {
    id: 'current-transform',
    question:
      'A step-down transformer reduces voltage from 400V to 230V. If the secondary current is 50A, what is the primary current (assuming ideal transformer)?',
    options: [
      '50A',
      '100A',
      '86.9A',
      '28.8A',
    ],
    correctIndex: 3,
    explanation:
      'For an ideal transformer, V1 x I1 = V2 x I2. Therefore I1 = (V2 x I2) / V1 = (230 x 50) / 400 = 28.75A. When voltage steps down, current steps up proportionally.',
  },
  {
    id: 'core-losses',
    question: 'Which type of transformer loss remains essentially constant regardless of load?',
    options: [
      'Action + Location + Re-test',
      'Tender pricing breakdowns',
      'Core losses (iron losses)',
      'External wall insulation (EWI)',
    ],
    correctIndex: 2,
    explanation:
      'Core losses (hysteresis and eddy current losses) depend on the flux in the core, which is determined by the applied voltage. As voltage remains constant, core losses are constant regardless of load current.',
  },
  {
    id: 'efficiency-calc',
    question: 'A transformer delivers 45kW output with 2kW total losses. What is its efficiency?',
    options: [
      '97.8%',
      '91.5%',
      '95.7%',
      '100%',
    ],
    correctIndex: 2,
    explanation:
      'Efficiency = Pout / (Pout + losses) = 45 / (45 + 2) = 45/47 = 0.957 = 95.7%. This can also be calculated as Pout/Pin = 45/47.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the fundamental principle upon which transformers operate?',
    options: [
      'Electrostatic induction',
      'Electromagnetic induction',
      'Electromechanical conversion',
      'Thermoelectric effect',
    ],
    correctAnswer: 1,
    explanation:
      'Transformers operate on the principle of electromagnetic induction, where a changing magnetic flux in the primary winding induces an EMF in the secondary winding.',
  },
  {
    id: 2,
    question:
      'A transformer has a turns ratio of 20:1 (step-down). If connected to 11kV supply, what is the secondary voltage?',
    options: [
      '1100V',
      '220V',
      '550V',
      '440V',
    ],
    correctAnswer: 2,
    explanation:
      'V2 = V1 / turns ratio = 11000 / 20 = 550V. For a step-down transformer, the secondary voltage equals the primary voltage divided by the turns ratio.',
  },
  {
    id: 3,
    question:
      'In an ideal transformer with turns ratio 2:1, if primary current is 5A, what is the secondary current?',
    options: [
      '5A',
      '2.5A',
      '20A',
      '10A',
    ],
    correctAnswer: 3,
    explanation:
      'Using I1/I2 = N2/N1 (inverse of voltage ratio): I2 = I1 x (N1/N2) = 5 x 2 = 10A. In a step-down transformer, current steps up by the same ratio.',
  },
  {
    id: 4,
    question: 'What causes hysteresis losses in a transformer core?',
    options: [
      'Molecular friction as magnetic domains realign each cycle',
      'Proportional-Integral-Derivative control algorithm',
      'The voltage at which an insulator fails and becomes conductive',
      'Test during non-occupied hours with proper notifications',
    ],
    correctAnswer: 0,
    explanation:
      'Hysteresis losses result from the energy required to continuously reverse the magnetic domains in the core material as the AC flux alternates 50 times per second.',
  },
  {
    id: 5,
    question: 'How are eddy current losses minimised in transformer cores?',
    options: [
      'Flow increases but less than double due to system curve',
      'Using thin laminations insulated from each other',
      'The starter motor and battery bank',
      'False - homemade or modified test equipment must never be used',
    ],
    correctAnswer: 1,
    explanation:
      'Thin laminations (typically 0.35mm-0.5mm) coated with insulating varnish break up the eddy current paths, significantly reducing I squared R losses in the core.',
  },
  {
    id: 6,
    question:
      'A 100kVA transformer has full-load copper losses of 1.5kW and core losses of 1kW. What is its efficiency at full load with 0.8 power factor?',
    options: [
      '96.0%',
      '97.5%',
      '96.9%',
      '98.5%',
    ],
    correctAnswer: 2,
    explanation:
      'Output power = 100 x 0.8 = 80kW. Total losses = 1.5 + 1 = 2.5kW. Efficiency = 80 / (80 + 2.5) = 80/82.5 = 96.97% which rounds to 96.9%',
  },
  {
    id: 7,
    question: 'At what load does a transformer achieve maximum efficiency?',
    options: [
      'Separated Extra-Low Voltage',
      'IP44 minimum or suitable for the location',
      'Fail for non-compliance with specification',
      'When copper losses equal core losses',
    ],
    correctAnswer: 3,
    explanation:
      'Maximum efficiency occurs when variable losses (copper losses) equal fixed losses (core losses). This typically occurs at 50-75% of full load for most transformers.',
  },
  {
    id: 8,
    question:
      'A transformer has no-load voltage of 240V and full-load voltage of 230V at 0.8 pf lagging. What is the voltage regulation?',
    options: [
      '4.3%',
      '5.0%',
      '2.1%',
      '4.2%',
    ],
    correctAnswer: 0,
    explanation:
      'Voltage regulation = (V no-load - V full-load) / V full-load x 100 = (240 - 230) / 230 x 100 = 4.35% which rounds to 4.3%',
  },
  {
    id: 9,
    question: 'What is the typical percentage impedance for a 1000kVA distribution transformer?',
    options: [
      '2-3%',
      '4-6%',
      '8-10%',
      '12-15%',
    ],
    correctAnswer: 1,
    explanation:
      'Distribution transformers typically have 4-6% impedance. Lower impedance allows higher fault currents but better voltage regulation; higher impedance limits fault current but increases voltage drop.',
  },
  {
    id: 10,
    question: 'Why are isolation transformers used in building services applications?',
    options: [
      'The equivalent DC voltage that would produce the same heating effect',
      'To ensure materials arrive when needed and in correct quantities',
      'To provide galvanic isolation between circuits for safety',
      'To establish the Target Emission Rate (TER) as a compliance benchmark',
    ],
    correctAnswer: 2,
    explanation:
      'Isolation transformers provide galvanic separation between primary and secondary circuits, preventing direct electrical connection. This is essential for safety in applications like medical equipment, IT systems and bathrooms.',
  },
];

const faqs = [
  {
    question: 'Why do transformers only work with AC and not DC?',
    answer:
      'Transformers rely on electromagnetic induction, which requires a changing magnetic flux to induce voltage in the secondary winding. DC produces a constant flux with no change, so no EMF is induced. The 50Hz AC supply creates flux that changes 100 times per second (twice per cycle), enabling continuous energy transfer.',
  },
  {
    question: 'What is the difference between core-type and shell-type transformers?',
    answer:
      'In core-type transformers, the windings surround the core limbs; in shell-type, the core surrounds the windings. Core-type is common for high-voltage distribution transformers due to easier insulation. Shell-type provides better mechanical strength and is often used in smaller power transformers.',
  },
  {
    question: 'How does the percentage impedance affect fault current?',
    answer:
      'Fault current is inversely proportional to percentage impedance: I fault = (100 / Z%) x I rated. A 5% impedance transformer will pass 20 times rated current during a short circuit. Higher impedance limits fault current but increases voltage drop under load.',
  },
  {
    question: 'Why is oil used in large distribution transformers?',
    answer:
      'Transformer oil serves two purposes: cooling and insulation. It transfers heat from the windings and core to the tank/radiators for dissipation, whilst providing excellent electrical insulation between windings and between windings and tank. Oil-filled transformers can handle much higher ratings than dry-type.',
  },
  {
    question: 'What causes humming noise in transformers?',
    answer:
      'Transformer hum is caused by magnetostriction - the core laminations physically expand and contract slightly as the magnetic flux alternates. This 100Hz vibration (twice the 50Hz supply frequency) produces the characteristic hum. Loose laminations or mounting can amplify the noise.',
  },
  {
    question: 'When would you choose a dry-type transformer over oil-filled?',
    answer:
      'Dry-type transformers are preferred indoors, in fire-sensitive locations (hospitals, high-rise buildings), and where environmental concerns preclude oil. They are self-extinguishing and require no fire suppression. However, they are limited to around 2.5MVA and are more expensive per kVA than oil-filled units.',
  },
];

const HNCModule3Section5_2 = () => {
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
            eyebrow="Module 3 · Section 5 · Subsection 2"
            title="Transformer theory, losses and efficiency"
            description="Understanding voltage transformation, losses and efficiency calculations for building services distribution systems"
            tone="purple"
          />

          <TLDR
            points={[
              'You apply turns ratio (V&#x2081;/V&#x2082; = N&#x2081;/N&#x2082;) and inverse current ratio (I&#x2081;/I&#x2082; = N&#x2082;/N&#x2081;) on every transformer kVA selection.',
              'You separate iron losses (constant, 24/7) from copper losses (varies with I&sup2;) — peak efficiency is at the load where they balance.',
              'You compare Tier-1 vs Tier-2 Ecodesign loss limits (Reg 548/2014) when selecting distribution transformers on UK new-build — Tier-2 is the 2021+ legal minimum.',
              'You quote voltage regulation (full-load secondary voltage drop %) on the design submission — affects motor starting on small-substation supplies.',
            ]}
          />

          <RegsCallout
            source="Commission Regulation (EU) No 548/2014 (retained as UK law) — Ecodesign requirements for small, medium and large power transformers"
            clause="Distribution transformers placed on the EU/UK market shall comply with the Tier 2 efficiency requirements (1 July 2021 onwards), specifying maximum permissible no-load and load losses for transformer ratings up to 3150 kVA."
            meaning={
              <>
                The retained Ecodesign regulation 548/2014 makes Tier-2 the legal minimum
                for new distribution transformers placed on the UK market since 2021. As
                BSE designer of any new substation you must verify the proposed transformer
                meets Tier-2 limits and document the compliance on the DNO connection /
                Building Control submission. Reusing pre-2021 stock for a new connection
                is not compliant.
              </>
            }
            cite="Source: Commission Regulation (EU) 548/2014 (retained UK law); BS EN 50588-1 (transformer Ecodesign); CIBSE Guide F &mdash; Energy efficiency in buildings"
          />

          <LearningOutcomes
            outcomes={[
              "Apply the ideal transformer equations for voltage and current",
              "Calculate turns ratio for step-up and step-down applications",
              "Distinguish between core losses and copper losses",
              "Calculate transformer efficiency at various load conditions",
              "Determine voltage regulation and its practical implications",
              "Understand transformer ratings, impedance and applications",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Turns ratio:</strong> V1/V2 = N1/N2 (voltage transformation)</li>
              <li><strong>Current:</strong> I1/I2 = N2/N1 (inverse relationship)</li>
              <li><strong>Losses:</strong> Core (constant) + Copper (load-dependent)</li>
              <li><strong>Efficiency:</strong> Output / (Output + Losses) x 100%</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Distribution:</strong> 11kV/400V substations</li>
              <li><strong>Isolation:</strong> IT systems, medical locations</li>
              <li><strong>Efficiency:</strong> Typically 97-99% for modern units</li>
              <li><strong>Ratings:</strong> kVA, impedance, tap positions</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="The Ideal Transformer">
            <p>
              A transformer transfers electrical energy between circuits through electromagnetic
              induction, with no direct electrical connection between primary and secondary
              windings. An ideal transformer has no losses and 100% efficiency.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Fundamental Transformer Equation
              </p>

                <p><strong>
                  V<sub>1</sub> / V<sub>2</sub> = N<sub>1</sub> / N<sub>2</sub>
                </strong></p>
                <p>
                  Primary voltage : Secondary voltage = Primary turns : Secondary turns
                </p>

            

              <p className="text-sm font-medium text-white">
                Key ideal transformer relationships:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Voltage ratio:</strong> V1/V2 = N1/N2 = a (turns ratio)
                </li>
                <li>
                  <strong>Current ratio:</strong> I1/I2 = N2/N1 = 1/a (inverse of voltage ratio)
                </li>
                <li>
                  <strong>Power:</strong> V1 x I1 = V2 x I2 (power in = power out)
                </li>
                <li>
                  <strong>Impedance ratio:</strong> Z1/Z2 = (N1/N2)squared = a squared
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Transformer Types by Voltage Ratio
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Step-down</strong> — N1 &gt; N2 — V2 &lt; V1 — I2 &gt; I1</li>
              <li><strong>Step-up</strong> — N1 &lt; N2 — V2 &gt; V1 — I2 &lt; I1</li>
              <li><strong>Isolation (1:1)</strong> — N1 = N2 — V2 = V1 — I2 = I1</li>
            </ul>

            <p>
              <strong>Remember:</strong> In a step-down transformer, voltage decreases but current
              increases proportionally, maintaining constant power (V x I).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Turns Ratio and Current Transformation">
            <p>
              The turns ratio determines both the voltage and current transformation. Understanding
              this relationship is essential for sizing cables, protection devices and ensuring
              proper load matching.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Current Transformation</p>

                <p><strong>
                  I<sub>1</sub> / I<sub>2</sub> = N<sub>2</sub> / N<sub>1</sub>
                </strong></p>
                <p>
                  Current ratio is the inverse of the turns ratio
                </p>

            

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Step-Down Example (11kV/400V)
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Turns ratio: 11000/400 = 27.5:1</li>
                  <li>Primary current: Lower (HV side)</li>
                  <li>Secondary current: 27.5x higher</li>
                  <li>HV cables: Smaller CSA</li>
                  <li>LV cables: Much larger CSA</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Practical Implications
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>HV transmission: High V, low I = small cables</li>
                  <li>LV distribution: Low V, high I = large cables</li>
                  <li>CT sizing: Based on secondary current</li>
                  <li>Protection settings: Match transformer ratio</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Common Distribution Transformer Ratios
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Grid to distribution</strong> — 33kV — 11kV — 3:1</li>
              <li><strong>Substation (UK)</strong> — 11kV — 400V — 27.5:1</li>
              <li><strong>Building intake</strong> — 400V — 230V — 1.74:1</li>
              <li><strong>Control circuits</strong> — 400V — 110V — 3.64:1</li>
            </ul>

            <p>
              <strong>Design tip:</strong> When sizing cables at the secondary, remember current
              increases by the turns ratio. A 100A HV feeder to a 27.5:1 transformer delivers up to
              2750A on the LV side.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Core Losses (Iron Losses)">
            <p>
              Core losses occur in the magnetic circuit and are present whenever the transformer is
              energised, regardless of load. They consist of hysteresis losses and eddy current
              losses, both of which generate heat and reduce efficiency.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Hysteresis Losses</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Cause:</strong> Energy required to reverse magnetic domains each cycle
                </li>
                <li>
                  <strong>Formula:</strong> Ph = kh x f x Bmax to the power 1.6 x Volume
                </li>
                <li>
                  <strong>Depends on:</strong> Frequency, flux density, core material
                </li>
                <li>
                  <strong>Reduction:</strong> Use grain-oriented silicon steel (low hysteresis)
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Eddy Current Losses</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Cause:</strong> Circulating currents induced in core by changing flux
                </li>
                <li>
                  <strong>Formula:</strong> Pe = ke x f squared x Bmax squared x t squared
                </li>
                <li>
                  <strong>Depends on:</strong> Frequency (squared), lamination thickness (t)
                </li>
                <li>
                  <strong>Reduction:</strong> Thin laminations (0.35-0.5mm) with insulating coating
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Key Characteristics of Core Losses
              </p>

                
                  <p className="text-sm font-medium text-white">Constant Losses</p>
                  <p>
                    Core losses depend on applied voltage (which determines flux), not on load
                    current. A transformer on no-load still experiences full core losses.
                  </p>

                
                  <p className="text-sm font-medium text-white">Measured by No-Load Test</p>
                  <p>
                    Open-circuit test at rated voltage measures core losses directly, as copper
                    losses are negligible with no secondary current flowing.
                  </p>

              

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical Core Loss Values
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>100</strong> — 300-400W — 0.3-0.4%</li>
              <li><strong>500</strong> — 900-1200W — 0.18-0.24%</li>
              <li><strong>1000</strong> — 1500-2000W — 0.15-0.2%</li>
            </ul>

            <p>
              <strong>Design consideration:</strong> Amorphous metal cores can reduce core losses by
              70-80% compared to silicon steel, making them ideal for distribution transformers that
              operate continuously.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Copper Losses (Load Losses)">
            <p>
              Copper losses occur in the transformer windings due to the resistance of the
              conductors. Unlike core losses, copper losses vary with the square of the load
              current, making them the dominant loss component at high loads.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Copper Loss Formula</p>

                <p><strong>
                  P<sub>cu</sub> = I<sub>1</sub> squared R<sub>1</sub> + I<sub>2</sub> squared R
                  <sub>2</sub>
                </strong></p>
                <p>
                  Total copper loss = Primary I squared R loss + Secondary I squared R loss
                </p>

            

              
                <p className="text-sm font-medium text-elec-yellow/80">Characteristics</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    Proportional to I squared (quadruples if current doubles)
                  </li>
                  <li>Zero at no-load</li>
                  <li>Maximum at full load</li>
                  <li>Measured by short-circuit test</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Reduction Methods</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Larger conductor cross-section</li>
                  <li>Shorter winding lengths</li>
                  <li>Better cooling (lower temperature rise)</li>
                  <li>Transposed conductors (reduce eddy effects)</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Load-Dependent Nature of Copper Losses
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>25%</strong> — 0.25 — 6.25%</li>
              <li><strong>50%</strong> — 0.50 — 25%</li>
              <li><strong>75%</strong> — 0.75 — 56.25%</li>
              <li><strong>100%</strong> — 1.00 — 100%</li>
            </ul>

            <p><em>
              <strong>Practical note:</strong> Full-load copper losses are typically 1-2% of
              transformer rating. For a 1000kVA transformer, expect 10-20kW copper loss at full
              load.
            </em></p>
          </ConceptBlock>

          <ConceptBlock title="Efficiency Calculation">
            <p>
              Transformer efficiency represents the ratio of output power to input power. Modern
              distribution transformers achieve efficiencies of 97-99%, but even small percentage
              losses represent significant energy costs over the transformer's lifetime.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Efficiency Formulae</p>

                
                  <p><strong>
                    Efficiency = P<sub>out</sub> / P<sub>in</sub> x 100%
                  </strong></p>

                
                  <p><strong>
                    Efficiency = P<sub>out</sub> / (P<sub>out</sub> + P<sub>core</sub> + P
                    <sub>cu</sub>) x 100%
                  </strong></p>

              

              <p className="text-sm font-medium text-elec-yellow/80">
                Efficiency at Partial Load
              </p>
              <p>
                Since copper losses vary with load squared whilst core losses remain constant,
                efficiency varies with load:
              </p>

                <p>At fraction 'x' of full load:</p>
                <p>
                  P<sub>out</sub> = x x S x cos phi (where S = rated kVA)
                </p>
                <p>
                  P<sub>cu</sub> = x squared x P<sub>cu(FL)</sub>
                </p>
                <p>
                  P<sub>core</sub> = constant
                </p>
                <p>
                  eta = (x x S x cos phi) / (x x S x cos phi + x squared x P<sub>cu(FL)</sub> + P
                  <sub>core</sub>)
                </p>

            

              <p className="text-sm font-medium text-elec-yellow mb-2">
                Maximum Efficiency Condition
              </p>
              <p>
                Maximum efficiency occurs when <strong>copper losses equal core losses</strong>.
                This typically happens at 50-70% of full load for most transformers, making them
                most efficient under normal operating conditions rather than at full rated capacity.
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                All-Day (Energy) Efficiency
              </p>
              <p>
                For transformers that operate at varying loads throughout the day, energy efficiency
                is more relevant:
              </p>

                <p>
                  eta<sub>all-day</sub> = Energy output / Energy input x 100%
                </p>
                <p>= Output kWh / (Output kWh + Loss kWh) x 100%</p>

            

            <p>
              <strong>Energy cost:</strong> A 1000kVA transformer operating 8760 hours/year with 2%
              average losses wastes 175,200 kWh annually - approximately GBP 35,000 at 20p/kWh.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Voltage Regulation">
            <p>
              Voltage regulation describes how much the secondary voltage drops from no-load to
              full-load conditions. It is a critical parameter for distribution transformers,
              affecting the quality of supply to connected loads.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Voltage Regulation Formula
              </p>

                <p><strong>
                  VR = (V<sub>no-load</sub> - V<sub>full-load</sub>) / V<sub>full-load</sub> x 100%
                </strong></p>
                <p>
                  Expressed as a percentage of full-load voltage
                </p>

            

              <p className="text-sm font-medium text-white">
                Factors affecting voltage regulation:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Winding resistance:</strong> Causes IR voltage drop
                </li>
                <li>
                  <strong>Leakage reactance:</strong> Causes IX voltage drop
                </li>
                <li>
                  <strong>Load power factor:</strong> Lagging pf increases regulation, leading pf
                  decreases it
                </li>
                <li>
                  <strong>Load current:</strong> Higher current = more voltage drop
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical Voltage Regulation Values
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Small distribution (&lt;100kVA)</strong> — 2-4% — Lower impedance</li>
              <li><strong>Medium distribution (100-1000kVA)</strong> — 3-5% — Balanced design</li>
              <li><strong>Large power (&gt;1MVA)</strong> — 5-8% — Higher impedance for fault limitation</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Tap Changers</p>
              <p>
                Tap changers adjust the turns ratio to compensate for voltage variations:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Off-load tap changer:</strong> Manual adjustment when de-energised
                  (typical: plus/minus 5% in 2.5% steps)
                </li>
                <li>
                  <strong>On-load tap changer (OLTC):</strong> Automatic adjustment under load
                  (typical: plus/minus 10% in 1.25% steps)
                </li>
                <li>
                  <strong>Building services:</strong> Usually off-load taps set during commissioning
                </li>
              </ul>

            <p>
              <strong>BS 7671 context:</strong> Transformer voltage regulation must be considered as
              part of overall voltage drop calculations - the 5% limit applies from transformer to
              load.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Transformer Ratings and Impedance">
            <p>
              Understanding transformer nameplate ratings and percentage impedance is essential for
              system design, protection coordination and fault level calculations in building
              services installations.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Nameplate Information</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>kVA rating:</strong> Maximum apparent power at rated voltage and frequency
                </li>
                <li>
                  <strong>Voltage ratio:</strong> Primary/secondary voltages (e.g., 11000/400V)
                </li>
                <li>
                  <strong>Frequency:</strong> 50Hz in UK
                </li>
                <li>
                  <strong>Percentage impedance (Z%):</strong> Short-circuit voltage as percentage of
                  rated
                </li>
                <li>
                  <strong>Vector group:</strong> Winding connections and phase displacement (e.g.,
                  Dyn11)
                </li>
                <li>
                  <strong>Cooling method:</strong> ONAN, ONAF, AN, AF, etc.
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Percentage Impedance</p>

                <p><strong>
                  Z% = (V<sub>sc</sub> / V<sub>rated</sub>) x 100%
                </strong></p>
                <p className="text-xs text-white mt-1">
                  Voltage required to circulate rated current with secondary shorted
                </p>

              

                  <p className="text-sm font-medium text-elec-yellow/80">Low Z% (3-4%)</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>+ Better voltage regulation</li>
                    <li>- Higher fault currents</li>
                    <li>Used for: Small distribution</li>
                  </ul>

                
                  <p className="text-sm font-medium text-elec-yellow/80">High Z% (6-8%)</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>+ Lower fault currents</li>
                    <li>- Poorer voltage regulation</li>
                    <li>Used for: Large substations</li>
                  </ul>

              

              <p className="text-sm font-medium text-elec-yellow/80">
                Fault Current Calculation
              </p>

                <p>Short-circuit current at secondary:</p>
                <p>
                  I<sub>sc</sub> = (100 / Z%) x I<sub>rated</sub>
                </p>
                <p>Example: 1000kVA, 400V, Z% = 5%</p>
                <p>
                  I<sub>rated</sub> = 1000000 / (root 3 x 400) = 1443A
                </p>
                <p>
                  I<sub>sc</sub> = (100 / 5) x 1443 = <strong>28,860A (28.9kA)</strong>
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">Common Vector Groups</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Dyn11</strong> — Delta — Star (neutral) — -30 degrees</li>
              <li><strong>Yyn0</strong> — Star — Star (neutral) — 0 degrees</li>
              <li><strong>Dzn0</strong> — Delta — Zigzag (neutral) — 0 degrees</li>
            </ul>

            <p>
              <strong>Building services:</strong> Dyn11 is the most common vector group for
              distribution transformers in the UK, providing a secondary neutral for single-phase
              loads.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Building Services Applications">
            <p>
              Transformers are essential components in building electrical systems, providing
              voltage transformation, galvanic isolation and supply resilience for various
              applications.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Distribution Transformers
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Package substations:</strong> 11kV/400V transformers serving large
                  buildings
                </li>
                <li>
                  <strong>Ratings:</strong> Typically 500kVA-2000kVA for commercial buildings
                </li>
                <li>
                  <strong>Location:</strong> Dedicated transformer room or external compound
                </li>
                <li>
                  <strong>Considerations:</strong> Fire rating, ventilation, access, noise, oil
                  containment
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Isolation Transformers</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>IT systems:</strong> 1:1 ratio transformers for medical locations (Group
                  2)
                </li>
                <li>
                  <strong>Data centres:</strong> Isolation for sensitive electronic equipment
                </li>
                <li>
                  <strong>Control circuits:</strong> 400V/110V for industrial controls
                </li>
                <li>
                  <strong>Purpose:</strong> Galvanic separation, noise filtering, earth fault
                  tolerance
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Building Services Transformer Applications
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Main intake</strong> — 11kV/400V oil-filled — High efficiency, OLTC for voltage control</li>
              <li><strong>Indoor substation</strong> — Dry-type cast resin — Fire safety, no oil, reduced clearances</li>
              <li><strong>Medical IT system</strong> — 1:1 isolation — BS EN 61558-2-15, IMD monitoring</li>
              <li><strong>SELV lighting</strong> — 230V/12V safety — BS EN 61558-2-6, double insulation</li>
              <li><strong>BMS controls</strong> — 400V/24V control — Low power, galvanic isolation</li>
              <li><strong>Site tools</strong> — 230V/110V CTE — Centre-tapped earth, max 55V to earth</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow mb-2">Selection Criteria</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Load assessment:</strong> Calculate maximum demand with diversity
                </li>
                <li>
                  <strong>Location:</strong> Indoor (dry-type) vs outdoor (oil-filled)
                </li>
                <li>
                  <strong>Efficiency:</strong> Consider Tier 2 Ecodesign requirements (2021)
                </li>
                <li>
                  <strong>Impedance:</strong> Balance fault level vs voltage regulation
                </li>
                <li>
                  <strong>Future expansion:</strong> Allow 20-30% spare capacity
                </li>
              </ul>

            <p>
              <strong>Regulation:</strong> EU Ecodesign Regulation 2019/1783 sets minimum efficiency
              requirements for distribution transformers. Tier 2 (from 2021) requires peak
              efficiency of 98.25% for 400kVA units.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
                Example 1: Transformer Sizing
              </p>
              <p>
                <strong>Question:</strong> A commercial building has a maximum demand of 650kW at
                0.85 power factor. What minimum transformer kVA rating is required?
              </p>

                <p>Apparent power S = P / cos phi</p>
                <p>S = 650 / 0.85 = 764.7 kVA</p>
                <p>Standard sizes: 500, 750, 1000, 1250 kVA</p>
                <p>
                  Select: <strong>1000 kVA</strong>
                </p>
                <p className="text-white mt-2">Provides 31% spare capacity for future growth</p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 2: Efficiency Calculation
              </p>
              <p>
                <strong>Question:</strong> A 500kVA transformer has core losses of 1.1kW and
                full-load copper losses of 5.5kW. Calculate efficiency at 75% load with 0.8 power
                factor.
              </p>

                <p>Output power = 0.75 x 500 x 0.8 = 300 kW</p>
                <p>Copper losses at 75% load:</p>
                <p>
                  P<sub>cu</sub> = 0.75 squared x 5.5 = 0.5625 x 5.5 = 3.09 kW
                </p>
                <p>Core losses = 1.1 kW (constant)</p>
                <p>Total losses = 3.09 + 1.1 = 4.19 kW</p>
                <p>Efficiency = 300 / (300 + 4.19) x 100</p>
                <p>
                  eta = <strong>98.62%</strong>
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 3: Fault Level Calculation
              </p>
              <p>
                <strong>Question:</strong> Calculate the prospective fault current at the secondary
                terminals of an 800kVA, 11kV/400V transformer with 5.5% impedance.
              </p>

                <p>Full-load secondary current:</p>
                <p>
                  I<sub>FL</sub> = S / (root 3 x V) = 800000 / (1.732 x 400) = 1155A
                </p>
                <p>Fault current:</p>
                <p>
                  I<sub>sc</sub> = (100 / Z%) x I<sub>FL</sub>
                </p>
                <p>
                  I<sub>sc</sub> = (100 / 5.5) x 1155 = 18.18 x 1155
                </p>
                <p>
                  I<sub>sc</sub> = <strong>21 kA</strong>
                </p>
                <p className="text-white mt-2">
                  Switchgear must be rated at least 21kA fault withstand
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 4: Load for Maximum Efficiency
              </p>
              <p>
                <strong>Question:</strong> A transformer has core losses of 2kW and full-load copper
                losses of 8kW. At what percentage of full load does maximum efficiency occur?
              </p>

                <p>
                  Maximum efficiency when: x squared x P<sub>cu(FL)</sub> = P<sub>core</sub>
                </p>
                <p>x squared x 8 = 2</p>
                <p>x squared = 2/8 = 0.25</p>
                <p>
                  x = root of 0.25 = 0.5 = <strong>50% load</strong>
                </p>
                <p className="text-white mt-2">
                  This transformer is most efficient at half load
                </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulae</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>V1/V2 = N1/N2</strong> - Voltage ratio equals turns ratio
                </li>
                <li>
                  <strong>I1/I2 = N2/N1</strong> - Current ratio is inverse of turns ratio
                </li>
                <li>
                  <strong>eta = Pout / (Pout + Pcore + Pcu)</strong> - Efficiency
                </li>
                <li>
                  <strong>VR = (Vno-load - Vfull-load) / Vfull-load x 100%</strong> - Regulation
                </li>
                <li>
                  <strong>Isc = (100/Z%) x Irated</strong> - Fault current
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Key Values to Remember
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  UK distribution ratio: <strong>11kV/400V = 27.5:1</strong>
                </li>
                <li>
                  Typical impedance: <strong>4-6%</strong> for distribution transformers
                </li>
                <li>
                  Modern efficiency: <strong>97-99%</strong> at rated load
                </li>
                <li>
                  Max efficiency: When <strong>Pcu = Pcore</strong>
                </li>
                <li>
                  Core losses: <strong>Constant</strong> (voltage dependent)
                </li>
                <li>
                  Copper losses: <strong>Vary with I squared</strong> (load dependent)
                </li>
              </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Confusing kW and kVA</strong> - Transformers rated in kVA; include power
                  factor for kW
                </li>
                <li>
                  <strong>Current ratio direction</strong> - Current steps UP in a step-DOWN
                  transformer
                </li>
                <li>
                  <strong>Copper loss at part load</strong> - Varies with I squared, not linearly
                  with load
                </li>
                <li>
                  <strong>Ignoring power factor</strong> - Affects both output power and regulation
                </li>
                <li>
                  <strong>Z% interpretation</strong> - Lower Z% means HIGHER fault current
                </li>
              </ul>
              </>
            }
            doInstead="Apply the formulas with care, verify with measured values where possible, and always cross-check against BS 7671 and equipment manufacturer data."
          />

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">Transformer Equations</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Voltage: V1/V2 = N1/N2 = a</li>
                  <li>Current: I1/I2 = N2/N1 = 1/a</li>
                  <li>Power: V1I1 = V2I2 (ideal)</li>
                  <li>Impedance: Z1/Z2 = a squared</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Losses and Efficiency</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Core: Constant (hysteresis + eddy)</li>
                  <li>Copper: I squared R (load dependent)</li>
                  <li>eta = Pout / (Pout + losses)</li>
                  <li>Max eta when Pcu = Pcore</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Sizing a 1000 kVA distribution transformer for a new office HQ"
            situation={
              <>
                A new office HQ has assessed peak coincident demand of 720 kVA at 0.85 pf.
                The DNO is providing an 11 kV/415 V transformer in a private substation.
                The vendor has tendered three options: 800 kVA Tier-1 surplus stock,
                1000 kVA Tier-2 cast-resin, 1000 kVA Tier-2 amorphous-core.
              </>
            }
            whatToDo={
              <>
                Reject the 800 kVA Tier-1 stock immediately — it is not legally placeable
                on the UK market for a new connection (Reg 548/2014 Tier-2 minimum since
                2021), and it is undersized for the assessed demand with no headroom.
                Choose between 1000 kVA cast-resin and 1000 kVA amorphous-core: amorphous
                core has ~70 % lower no-load loss (perhaps 700 W vs 2000 W continuous)
                but capital uplift of &pound;3k&ndash;&pound;5k. At 24/7 operation the
                payback on amorphous is 3&ndash;4 years on energy alone, plus the BREEAM
                / Part L credit. Specify amorphous and document the lifecycle analysis.
              </>
            }
            whyItMatters={
              <>
                Distribution transformers run 24/7 for 25&ndash;40 years. No-load loss
                accumulates ceaselessly &mdash; an extra 1.3 kW continuous is 11,388
                kWh/year. Specifying the wrong transformer at design stage is the
                single biggest avoidable energy cost on a BSE substation, and the cost
                differential is recoverable inside the building&rsquo;s BREEAM
                certification window.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Ideal transformer: V&#x2081;/V&#x2082; = N&#x2081;/N&#x2082; (turns ratio); I&#x2081;/I&#x2082; = N&#x2082;/N&#x2081; (inverse).',
              'Iron (no-load) losses: hysteresis + eddy currents in core, constant 24/7 — the dominant lifecycle energy waste.',
              'Copper (load) losses: I&sup2;R in windings, scales with load squared.',
              'Peak efficiency: where copper loss = iron loss, typically 40&ndash;60 % rated load — oversizing reduces efficiency.',
              'Voltage regulation: (V&#x2099;&#x2092;&#x2097;&#x2092;&#x2090;&#x1d05; &minus; V&#x1d05;&#x2097;) / V&#x2099;&#x2092;&#x2097;&#x2092;&#x2090;&#x1d05; &times; 100 % &mdash; affects motor starting capability.',
              'Tier-2 Ecodesign loss limits (Reg 548/2014, retained UK law) are the 2021+ minimum for new transformers.',
              'Amorphous-core transformers cut no-load loss by ~70 % vs grain-oriented silicon steel &mdash; payback typically &lt;5 years on continuous duty.',
              'Cast-resin (dry-type) preferred indoors / fire-sensitive areas; oil-filled preferred outdoors / large kVA where bunding is acceptable.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Principles of electromagnetic induction
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Single-phase vs three-phase transformers
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section5_2;
