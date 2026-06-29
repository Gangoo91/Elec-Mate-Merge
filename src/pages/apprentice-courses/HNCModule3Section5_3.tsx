/**
 * Module 3 · Section 5 · Subsection 3 — Single-Phase vs Three-Phase Transformers
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Single-phase, three-phase, vector groups, parallel operation, autotransformers
 *   and isolating transformers — the full transformer-selection toolkit for BSE
 *   distribution and specialist applications.
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

const TITLE = 'Single-Phase vs Three-Phase Transformers - HNC Module 3 Section 5.3';
const DESCRIPTION =
  'Comprehensive comparison of single-phase and three-phase transformers including construction, vector groups, parallel operation, auto-transformers, and building services applications.';

const quickCheckQuestions = [
  {
    id: 'three-phase-advantage',
    question:
      'What is the primary advantage of a three-phase transformer over three single-phase units?',
    options: [
      'Higher voltage output',
      'Smaller size and lower cost',
      'Easier maintenance',
      'Better voltage regulation',
    ],
    correctIndex: 1,
    explanation:
      'A three-phase transformer uses approximately 15% less core material than three equivalent single-phase units, making it smaller, lighter, and more economical for the same kVA rating.',
  },
  {
    id: 'dyn11-meaning',
    question: 'What does the vector group designation Dyn11 indicate?',
    options: [
      'Delta primary, star secondary with neutral, 330° lead',
      'Star primary, delta secondary, 330° phase shift',
      'Star primary, star secondary, zero phase shift',
      'Delta primary, star secondary with neutral, 30° lag',
    ],
    correctIndex: 0,
    explanation:
      "Dyn11 indicates Delta (D) primary, star (y) secondary with neutral (n) brought out. The '11' means the secondary voltage leads the primary by 330° (11 × 30°), equivalent to 30° lag.",
  },
  {
    id: 'parallel-operation',
    question: 'Which is NOT a requirement for parallel operation of transformers?',
    options: [
      'Same vector group',
      'Same percentage impedance',
      'Identical kVA ratings',
      'Same voltage ratio',
    ],
    correctIndex: 2,
    explanation:
      'Transformers of different kVA ratings can be paralleled provided they have the same voltage ratio, vector group, and similar percentage impedance. Different sizes will share load in proportion to their ratings.',
  },
  {
    id: 'auto-transformer',
    question:
      'What is the main advantage of an auto-transformer compared to a double-wound transformer?',
    options: [
      'Smaller size for given VA rating',
      'P = sqrt(3) x V_L x I_L x cos(phi)',
      'Upsize CSA or shorten run',
      'AC, pulsating DC, and smooth DC',
    ],
    correctIndex: 0,
    explanation:
      'Auto-transformers have a single winding serving both primary and secondary, requiring less copper and iron. They are significantly smaller and cheaper for voltage ratios close to 1:1, but provide no electrical isolation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'In a three-phase core-type transformer, how many limbs does the magnetic core typically have?',
    options: [
      'Two limbs',
      'Three limbs',
      'Four limbs',
      'Six limbs',
    ],
    correctAnswer: 1,
    explanation:
      'A three-phase core-type transformer has three limbs, one for each phase. The windings for each phase are wound on their respective limb, and magnetic flux flows through the common yokes.',
  },
  {
    id: 2,
    question: 'What is the phase displacement between primary and secondary in a Yy0 transformer?',
    options: [
      '330°',
      '30°',
      '0°',
      '180°',
    ],
    correctAnswer: 2,
    explanation:
      "The '0' in Yy0 indicates zero phase displacement (0 × 30° = 0°). Both primary and secondary are star-connected with their line voltages in phase.",
  },
  {
    id: 3,
    question: 'Which vector group is most commonly used for distribution transformers in the UK?',
    options: [
      'Dd0',
      'Yy0',
      'Yd1',
      'Dyn11',
    ],
    correctAnswer: 3,
    explanation:
      'Dyn11 is the standard for UK distribution transformers. The delta primary allows third harmonic currents to circulate, while the star secondary provides a neutral for single-phase loads. The 30° phase shift helps with parallel operation.',
  },
  {
    id: 4,
    question: 'What happens if transformers with different vector groups are paralleled?',
    options: [
      'Excessive circulating currents and possible damage',
      'The load shares perfectly between the two units',
      'The combined output voltage doubles',
      'The supply frequency shifts to 100Hz',
    ],
    correctAnswer: 0,
    explanation:
      'Paralleling transformers with different vector groups creates a phase difference between their secondary voltages, causing large circulating currents that can damage windings and trip protective devices.',
  },
  {
    id: 5,
    question:
      'For an auto-transformer with 400V input and 230V output, what percentage of the load current passes through the common winding?',
    options: [
      '57.5%',
      '42.5%',
      '170%',
      '100%',
    ],
    correctAnswer: 1,
    explanation:
      'In an auto-transformer, only the difference between input and output current flows in the series winding. With a 400:230 ratio, the common winding carries (400-230)/400 = 42.5% of the load current, making it smaller than an equivalent two-winding transformer.',
  },
  {
    id: 6,
    question: 'What is the purpose of the Scott connection?',
    options: [
      'To convert three-phase to single-phase',
      'To provide voltage regulation',
      'To convert three-phase to two-phase',
      'To eliminate harmonics',
    ],
    correctAnswer: 2,
    explanation:
      'The Scott connection uses two single-phase transformers to convert a three-phase supply to a two-phase (90° displaced) supply. It was historically used for two-phase motor drives and is still used in some railway electrification systems.',
  },
  {
    id: 7,
    question: 'What is the primary function of a neutral earthing transformer (NET)?',
    options: [
      'To step the supply voltage up for transmission',
      'To correct the power factor of inductive loads',
      'To convert a three-phase supply to single-phase',
      'To provide an earth reference for unearthed systems',
    ],
    correctAnswer: 3,
    explanation:
      'A neutral earthing transformer creates an artificial neutral point for earthing in systems where the supply transformer has no accessible neutral (e.g., delta secondary). This provides earth fault protection capability.',
  },
  {
    id: 8,
    question: 'In a shell-type three-phase transformer, how are the phase windings arranged?',
    options: [
      'Each phase surrounded by its own magnetic circuit',
      'All three phases share a single common limb',
      'The windings are connected only in delta',
      'The phases are wound on the yoke rather than the limbs',
    ],
    correctAnswer: 0,
    explanation:
      'In a shell-type transformer, each phase winding is surrounded by its own portion of the magnetic core (shell), providing better magnetic shielding and mechanical support. This construction is used for high-power transformers.',
  },
  {
    id: 9,
    question:
      'What happens to the neutral current in a Dyn transformer supplying unbalanced single-phase loads?',
    options: [
      'It flows back into the delta primary line conductors',
      'It returns through the neutral conductor',
      'It is blocked entirely by the delta winding',
      'It circulates between the three secondary phases',
    ],
    correctAnswer: 1,
    explanation:
      "The 'n' in Dyn indicates the neutral is brought out from the star secondary. Unbalanced currents return through this neutral. The corresponding zero-sequence currents circulate within the delta primary, preventing upstream flow.",
  },
  {
    id: 10,
    question:
      'For a 500 kVA transformer to be installed in a commercial building basement, which cooling method would typically be specified?',
    options: [
      'ONAN (oil natural, air natural)',
      'OFAF (oil forced, air forced)',
      'AN (air natural) dry-type',
      'ONAF (oil natural, air forced)',
    ],
    correctAnswer: 2,
    explanation:
      'For indoor installation in occupied buildings, dry-type (AN or AF) transformers are preferred due to fire safety. Oil-filled transformers require fire-resistant chambers, bunding, and fire suppression systems, making them less suitable for basements.',
  },
];

const faqs = [
  {
    question: 'When should I specify single-phase transformers instead of a three-phase unit?',
    answer:
      'Consider single-phase units when: (1) The load is predominantly single-phase, (2) Space constraints prevent installing a large three-phase unit, (3) N+1 redundancy is required (easier with individual phases), (4) Transportation limitations exist for large three-phase units, or (5) Future expansion may require different phase loadings.',
  },
  {
    question: 'Why is Dyn11 preferred over Dyn1 for distribution?',
    answer:
      'Both have the same electrical characteristics, but Dyn11 is the UK/European standard whilst Dyn1 is common in the Americas. Using the standard vector group simplifies parallel operation with grid transformers and ensures compatibility with protection schemes designed for that configuration.',
  },
  {
    question: 'Can I parallel a Dyn11 transformer with a Yd11?',
    answer:
      "No. Although both have '11' indicating 330° phase shift, Dyn11 has a star secondary whilst Yd11 has a delta secondary. The voltage ratios between line and phase differ, making direct paralleling impossible. Only transformers with identical vector groups can be paralleled.",
  },
  {
    question: 'What are the fire risks with oil-filled transformers in buildings?',
    answer:
      'Mineral oil is flammable (flash point ~140°C) and presents significant fire risk. Building regulations require: fire-resistant chambers (typically 4-hour rating), oil containment bunding (110% capacity), fire suppression systems, adequate ventilation, and separation from escape routes. Many designers now specify dry-type or ester-filled transformers for internal installation.',
  },
  {
    question: 'How do I select between cast resin and VPI dry-type transformers?',
    answer:
      'Cast resin (encapsulated) transformers offer better moisture and contamination resistance, suitable for harsh environments. VPI (Vacuum Pressure Impregnated) transformers are more economical and easier to repair but require cleaner environments. For standard commercial buildings, either is acceptable; for industrial or high-humidity locations, cast resin is preferred.',
  },
  {
    question: 'What is the typical impedance tolerance for parallel operation?',
    answer:
      'Transformers being paralleled should have impedance values within ±10% of each other. Greater differences cause unequal load sharing proportional to the inverse of impedance - the lower impedance unit takes more than its share of load and may overheat. Identical impedances ensure load shares according to kVA ratings.',
  },
];

const HNCModule3Section5_3 = () => {
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
            eyebrow="Module 3 · Section 5 · Subsection 3"
            title="Single-phase vs three-phase transformers"
            description="Construction types, vector groups, parallel operation, and specialist transformer applications for building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You select three-phase transformers (Dyn11) for any UK distribution duty above ~100 kVA — single-phase is reserved for specialist isolating, control and instrument transformers.',
              'You read vector groups (Dyn11, Yyn0) on every transformer nameplate to verify parallel operation compatibility and understand the 30&deg; phase shift.',
              'You specify autotransformers only where galvanic isolation is not required — never for safety-isolation duty under BS 7671 414.',
              'You apply BS EN 61558 isolating transformers for medical / SELV / FELV duty where independent earth or true galvanic separation is mandated.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.1 (Protective measure: automatic disconnection of supply)"
            clause="The protective measure 'automatic disconnection of supply' shall consist of basic protection by basic insulation of live parts or by barriers or enclosures, and fault protection by protective earthing, protective equipotential bonding and automatic disconnection in case of a fault."
            meaning={
              <>
                Why this matters for transformer selection: an autotransformer&rsquo;s
                primary and secondary share a winding, so a fault on the secondary can
                directly impose primary voltage on the load. BS 7671 411 ADS is therefore
                jeopardised if you specify an autotransformer for safety isolation duty.
                For medical, fountain, marina, SELV/PELV, locations conducting electrical
                situations, and laboratory bench-top isolation, you must specify a true
                isolating transformer to BS EN 61558 with separated windings.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regs 411 + 414 (SELV/PELV) + 710 (medical); BS EN 61558-2-x (transformer safety series); BS EN 60076 (general)"
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Single-phase:</strong> Simple, used for small loads up to ~100 kVA</li>
              <li><strong>Three-phase:</strong> More efficient, compact, standard for distribution</li>
              <li><strong>Vector groups:</strong> Define winding connections and phase shifts</li>
              <li><strong>Dyn11:</strong> UK standard for 11 kV/400V distribution</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Distribution:</strong> 11 kV/400V package substations</li>
              <li><strong>Internal:</strong> Dry-type for fire safety</li>
              <li><strong>Isolation:</strong> IT system supplies for critical loads</li>
              <li><strong>Auto-transformers:</strong> Motor starting, voltage matching</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Single-Phase Transformer Construction">
            <p>
              Single-phase transformers are the simplest form, consisting of primary and secondary
              windings on a common magnetic core. They are widely used for lighting, small power
              supplies, and where single-phase loads predominate.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Core Types</p>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Core Type</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Windings surround the core limbs</li>
                    <li>Simple construction, easy cooling</li>
                    <li>Used for high-voltage transformers</li>
                    <li>Lower mechanical strength</li>
                  </ul>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Shell Type</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Core surrounds the windings</li>
                    <li>Better mechanical protection</li>
                    <li>Preferred for high-current, low-voltage</li>
                    <li>Better short-circuit withstand</li>
                  </ul>

              

              <p className="text-sm font-medium text-elec-yellow/80">
                Single-Phase Transformer Applications
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Domestic supply (rural)</strong> — 16-50 kVA — Pole-mounted, 11 kV/230V</li>
              <li><strong>Control circuits</strong> — 0.1-5 kVA — 400V/110V or 230V/24V</li>
              <li><strong>Isolation transformers</strong> — 0.5-10 kVA — 1:1 ratio for IT systems</li>
              <li><strong>Site tool supplies</strong> — 3-10 kVA — 230V/110V CTE</li>
              <li><strong>Welding supplies</strong> — 5-50 kVA — High current, low voltage secondary</li>
            </ul>

            <p>
              <strong>Design consideration:</strong> Three single-phase transformers can provide
              three-phase supply with individual unit redundancy - if one fails, the remaining two
              can supply reduced load via open-delta connection.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Three-Phase Transformer Types">
            <p>
              Three-phase transformers are the standard choice for commercial and industrial
              distribution. They offer significant advantages in size, weight, and efficiency
              compared to equivalent banks of single-phase units.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Three-Phase Core-Type Construction
              </p>

                <p>
                  The most common construction uses a three-limbed core where each phase winding
                  occupies one limb. The magnetic flux from each phase combines in the common yokes
                  connecting the limbs.
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Centre limb:</strong> Slightly shorter flux path than outer limbs
                  </li>
                  <li>
                    <strong>Yoke:</strong> Connects limbs, carries resultant flux
                  </li>
                  <li>
                    <strong>Balanced load:</strong> Net flux in yoke is zero (fluxes cancel)
                  </li>
                  <li>
                    <strong>Unbalanced load:</strong> Small residual flux in yoke
                  </li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Three-Phase Shell-Type Construction
              </p>

                <p>
                  Each phase has its own magnetic circuit surrounding the windings. This provides
                  independent operation of each phase with better mechanical support and fault
                  containment.
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Five-limbed core:</strong> Three wound limbs plus two return limbs
                  </li>
                  <li>
                    <strong>Independent phases:</strong> Fault in one phase less likely to affect
                    others
                  </li>
                  <li>
                    <strong>Higher cost:</strong> More core material required
                  </li>
                  <li>
                    <strong>Large transformers:</strong> Used for generator step-up transformers
                  </li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Comparison: Three-Phase vs Single-Phase Bank
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Core material</strong> — ~15% less — Baseline</li>
              <li><strong>Copper material</strong> — ~15% less — Baseline</li>
              <li><strong>Floor space</strong> — Smaller footprint — Larger total area</li>
              <li><strong>Cost</strong> — Lower — Higher</li>
              <li><strong>Efficiency</strong> — Higher — Slightly lower</li>
              <li><strong>Redundancy</strong> — Complete failure if faulty — Open-delta operation possible</li>
              <li><strong>Transport</strong> — May exceed limits at large ratings — Easier for very large installations</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Vector Groups">
            <p>
              Vector groups describe the winding connections and the phase displacement between
              primary and secondary voltages. Understanding vector groups is essential for parallel
              operation and protection coordination.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Vector Group Notation (IEC 60076-1)
              </p>

                <p>
                  The notation uses capital letters for HV winding, lowercase for LV winding, and a
                  clock number for phase displacement.
                </p>

                  
                    <p className="text-sm font-medium text-elec-yellow/80">Winding Connections</p>
                    <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                      <li>
                        <strong>D or d:</strong> Delta
                      </li>
                      <li>
                        <strong>Y or y:</strong> Star (wye)
                      </li>
                      <li>
                        <strong>Z or z:</strong> Zigzag
                      </li>
                      <li>
                        <strong>n:</strong> Neutral brought out
                      </li>
                    </ul>

                  
                    <p className="text-sm font-medium text-elec-yellow/80">Clock Number</p>
                    <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                      <li>
                        <strong>0:</strong> 0° displacement
                      </li>
                      <li>
                        <strong>1:</strong> 30° lag
                      </li>
                      <li>
                        <strong>6:</strong> 180° displacement
                      </li>
                      <li>
                        <strong>11:</strong> 330° lead (30° lag)
                      </li>
                    </ul>

                  
                    <p className="text-sm font-medium text-elec-yellow/80">Example: Dyn11</p>
                    <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                      <li>
                        <strong>D:</strong> HV delta
                      </li>
                      <li>
                        <strong>y:</strong> LV star
                      </li>
                      <li>
                        <strong>n:</strong> Neutral available
                      </li>
                      <li>
                        <strong>11:</strong> 330° lead
                      </li>
                    </ul>

                

            

              <p className="text-sm font-medium text-elec-yellow/80">Common Vector Groups</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Dyn11</strong> — 330° (LV leads) — UK distribution standard (11kV/400V)</li>
              <li><strong>Yy0</strong> — 0° — Transmission (problems with 3rd harmonic)</li>
              <li><strong>Dd0</strong> — 0° — Industrial, no neutral required</li>
              <li><strong>Yd1</strong> — 30° (LV lags) — Step-up transformers at generators</li>
              <li><strong>Dy11</strong> — 330° (LV leads) — Step-up from LV generation</li>
              <li><strong>YNd1</strong> — 30° (LV lags) — Transmission with HV neutral</li>
              <li><strong>Dzn0</strong> — 0° — Earthing/grounding transformers</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Why Dyn11 is the UK Standard
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Delta primary:</strong> Allows third harmonic currents to circulate,
                  preventing waveform distortion
                </li>
                <li>
                  <strong>Star secondary:</strong> Provides neutral for single-phase loads (230V
                  from 400V three-phase)
                </li>
                <li>
                  <strong>Neutral available:</strong> Essential for TN-C-S and TN-S earthing systems
                </li>
                <li>
                  <strong>Zero-sequence isolation:</strong> Earth faults on LV do not reflect to HV
                </li>
                <li>
                  <strong>Unbalanced loads:</strong> Can supply unbalanced single-phase loads
                  without problems
                </li>
              </ul>

            <p>
              <strong>Remember:</strong> The clock number indicates where the LV voltage phasor
              points when the HV phasor points to 12 o'clock. Each hour represents 30°.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Parallel Operation Requirements">
            <p>
              Parallel operation of transformers increases capacity and provides redundancy.
              However, strict conditions must be met to prevent circulating currents and ensure
              proper load sharing.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Essential Requirements for Parallel Operation
              </p>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Mandatory Requirements</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>
                      <strong>Same voltage ratio:</strong> ±0.5% tolerance
                    </li>
                    <li>
                      <strong>Same vector group:</strong> Identical phase displacement
                    </li>
                    <li>
                      <strong>Same phase sequence:</strong> R-Y-B matching
                    </li>
                    <li>
                      <strong>Same polarity:</strong> Subtractive or additive
                    </li>
                  </ul>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Desirable Requirements</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>
                      <strong>Similar impedance:</strong> Within ±10%
                    </li>
                    <li>
                      <strong>Similar X/R ratio:</strong> For reactive load sharing
                    </li>
                    <li>
                      <strong>kVA ratio:</strong> Maximum 3:1 between units
                    </li>
                    <li>
                      <strong>Same tap position:</strong> Equal voltage setting
                    </li>
                  </ul>

              

              <p className="text-sm font-medium text-red-400 mb-2">
                Consequences of Incorrect Paralleling
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Different voltage ratios:</strong> Circulating current proportional to
                  voltage difference
                </li>
                <li>
                  <strong>Different vector groups:</strong> Large circulating currents (potentially
                  fault-level)
                </li>
                <li>
                  <strong>Different impedances:</strong> Unequal load sharing - low Z takes more
                  load
                </li>
                <li>
                  <strong>Wrong phase sequence:</strong> Short circuit between phases
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Load Sharing with Different Impedances
              </p>

                <p>
                  When transformers with different impedances are paralleled, they share load
                  inversely proportional to their per-unit impedances:
                </p>

                  <p>S₁ = S_total × (Z₂ / (Z₁ + Z₂))</p>
                  <p>S₂ = S_total × (Z₁ / (Z₁ + Z₂))</p>

                <p>
                  The lower impedance transformer carries more than its proportionate share of load.
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Parallel Operation Checks
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Voltage ratio</strong> — Measure secondary open-circuit — Within ±0.5%</li>
              <li><strong>Phase sequence</strong> — Phase rotation meter — Same sequence (R-Y-B)</li>
              <li><strong>Phase angle</strong> — Voltage across open switch — Zero or very low voltage</li>
              <li><strong>Polarity</strong> — Polarity test or nameplate — Same polarity markings</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Auto-Transformers">
            <p>
              An auto-transformer uses a single winding with tapping points to provide voltage
              transformation. Part of the winding is common to both primary and secondary circuits,
              resulting in smaller size but no electrical isolation.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Operating Principle</p>

                <p>
                  The winding consists of a series section and a common section. For step-down
                  operation, the full winding receives the input voltage, and the output is taken
                  from a tap point.
                </p>

                  
                    <p className="text-sm font-medium text-elec-yellow/80">Advantages</p>
                    <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                      <li>Smaller and lighter</li>
                      <li>Lower cost</li>
                      <li>Higher efficiency</li>
                      <li>Better voltage regulation</li>
                    </ul>

                  
                    <p className="text-sm font-medium text-elec-yellow/80">Disadvantages</p>
                    <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                      <li>No electrical isolation</li>
                      <li>Higher fault current transfer</li>
                      <li>Not suitable for large ratios</li>
                      <li>Safety concerns for personnel</li>
                    </ul>

                

            

              <p className="text-sm font-medium text-elec-yellow/80">Size Advantage Formula</p>

                <p>
                  The kVA rating of an auto-transformer required for a given load is:
                </p>

                  <p>kVA_auto = kVA_load × (1 - V₂/V₁)</p>
                  <p>
                    For 400V to 230V: kVA_auto = kVA_load × (1 - 230/400) = 0.425 × kVA_load
                  </p>

                <p>
                  The auto-transformer need only be rated at 42.5% of the load for a 400V/230V
                  conversion.
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Auto-Transformer Applications
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Motor starting</strong> — 80%, 65%, 50% taps — Reduced voltage starting</li>
              <li><strong>Voltage regulators</strong> — Variable ±10% — Voltage correction (variacs)</li>
              <li><strong>Interconnection</strong> — 400kV/275kV — Grid voltage matching</li>
              <li><strong>Test supplies</strong> — Variable 0-100% — Laboratory voltage adjustment</li>
              <li><strong>Buck-boost</strong> — ±5% to ±15% — Voltage correction for equipment</li>
            </ul>

            <p>
              <strong>Safety note:</strong> Auto-transformers must not be used where isolation is
              required for safety (e.g., SELV circuits) as the primary and secondary share a common
              conductor.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Scott Connection for Two-Phase Conversion">
            <p>
              The Scott connection (or Scott-T connection) converts three-phase supply to two-phase
              (90° displaced) or vice versa. Though two-phase systems are largely obsolete, Scott
              connections remain important for specific applications.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Construction and Operation
              </p>

                <p>
                  Two single-phase transformers are used:
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Main transformer:</strong> Connected across two phases (e.g., R-B)
                  </li>
                  <li>
                    <strong>Teaser transformer:</strong> Primary has 86.6% turns, connected to Y and
                    main transformer centre tap
                  </li>
                  <li>
                    <strong>Output:</strong> Two single-phase supplies 90° apart
                  </li>
                  <li>
                    <strong>Balanced load:</strong> Results in balanced three-phase current
                  </li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">Modern Applications</p>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Railway Electrification</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>25 kV AC railway supply from three-phase grid</li>
                    <li>Adjacent sections fed 90° out of phase</li>
                    <li>Neutral sections at transformer outputs</li>
                    <li>Balanced loading of three-phase supply</li>
                  </ul>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Electric Arc Furnaces</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Historic installations with two-phase furnaces</li>
                    <li>Conversion from three-phase supply</li>
                    <li>Independent control of each phase</li>
                    <li>Now largely replaced by three-phase designs</li>
                  </ul>

              

              <p className="text-sm font-medium text-elec-yellow/80">
                Voltage and Turn Ratios
              </p>

                <p>Main transformer: N₁ turns (full winding)</p>
                <p>Teaser transformer primary: 0.866 × N₁ turns (86.6%)</p>
                <p>
                  For equal secondary voltages, both secondaries have the same turns
                </p>
                <p>
                  The 86.6% factor is √3/2, derived from three-phase geometry
                </p>
          </ConceptBlock>

          <ConceptBlock title="Neutral Earthing Transformers">
            <p>
              Neutral earthing transformers (NETs) create an artificial neutral point for systems
              where no natural neutral exists, enabling earth fault protection on delta-connected or
              unearthed systems.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Types of Neutral Earthing Transformers
              </p>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Zigzag (Zn) Type</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Most common for creating neutral</li>
                    <li>Each limb has two windings in opposition</li>
                    <li>Low zero-sequence impedance</li>
                    <li>Compact and economical</li>
                    <li>No secondary winding needed</li>
                  </ul>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Star-Delta (YNd) Type</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Star primary creates neutral</li>
                    <li>Delta secondary may supply auxiliary loads</li>
                    <li>Higher cost than zigzag</li>
                    <li>Used when auxiliary supply needed</li>
                    <li>More flexible but larger</li>
                  </ul>

              

              <p className="text-sm font-medium text-elec-yellow/80">Applications</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Generator earthing</strong> — Delta-connected generators — Provide earth reference, limit fault current</li>
              <li><strong>Delta secondary</strong> — Dd0 transformer output — Enable earth fault protection</li>
              <li><strong>Industrial systems</strong> — Imported delta supplies — Create TN system from IT supply</li>
              <li><strong>Resistance earthing</strong> — Medium voltage systems — Limit earth fault current to safe level</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Sizing Neutral Earthing Transformers
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Continuous rating:</strong> Based on normal unbalance current (typically
                  small)
                </li>
                <li>
                  <strong>Short-time rating:</strong> Based on earth fault current × fault duration
                </li>
                <li>
                  <strong>Typical specification:</strong> 10 seconds at rated fault current
                </li>
                <li>
                  <strong>Zero-sequence impedance:</strong> Determines fault current magnitude
                </li>
              </ul>
          </ConceptBlock>

          <ConceptBlock title="Building Services: Transformer Selection and Installation">
            <p>
              Transformer selection for building services requires consideration of electrical
              requirements, fire safety, acoustic impact, space constraints, and maintenance access.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Transformer Types for Buildings
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Oil-filled (ONAN)</strong> — Natural oil/air — Fire chamber required — External substations</li>
              <li><strong>Ester-filled</strong> — Natural oil/air — K-class fluid, reduced risk — Indoor with restrictions</li>
              <li><strong>Cast resin (AN)</strong> — Air natural — F1 class - self-extinguishing — Indoor substations</li>
              <li><strong>Cast resin (AF)</strong> — Forced air — F1 class - self-extinguishing — Higher loading in buildings</li>
              <li><strong>VPI dry-type</strong> — Air natural — Good fire performance — Clean indoor environments</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Installation Requirements
              </p>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Space and Access</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Minimum 1m clearance sides/rear</li>
                    <li>2m clearance at front for access</li>
                    <li>Adequate height for lifting/maintenance</li>
                    <li>Transport route for replacement</li>
                    <li>Cable entry/exit provisions</li>
                  </ul>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Ventilation</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Natural ventilation: 0.35 m²/100 kVA losses</li>
                    <li>Inlet low, outlet high (convection)</li>
                    <li>Mechanical ventilation for basements</li>
                    <li>Maximum ambient 40°C (derate above)</li>
                    <li>Consider summer peak temperatures</li>
                  </ul>

              

              <p className="text-sm font-medium text-elec-yellow/80">
                Fire Safety Requirements (Oil-Filled)
              </p>

                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Fire-resistant enclosure:</strong> Typically 4-hour rating
                  </li>
                  <li>
                    <strong>Bunding:</strong> 110% of oil volume containment
                  </li>
                  <li>
                    <strong>Fire suppression:</strong> Automatic system (water mist, FM200, etc.)
                  </li>
                  <li>
                    <strong>Drainage:</strong> To safe collection point
                  </li>
                  <li>
                    <strong>Separation:</strong> 7.5m from buildings without fire wall
                  </li>
                  <li>
                    <strong>Detection:</strong> Smoke/heat detection linked to fire alarm
                  </li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Acoustic Considerations
              </p>

                <p>
                  Transformer noise is predominantly at 100 Hz (twice supply frequency) due to
                  magnetostriction.
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Typical levels:</strong> 55-70 dB(A) depending on size
                  </li>
                  <li>
                    <strong>Low-noise designs:</strong> Available at premium cost
                  </li>
                  <li>
                    <strong>Anti-vibration mounts:</strong> Prevent structure-borne transmission
                  </li>
                  <li>
                    <strong>Acoustic enclosures:</strong> For sensitive locations
                  </li>
                  <li>
                    <strong>Location:</strong> Away from occupied spaces where possible
                  </li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">Selection Checklist</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Rating (kVA)</strong> — Maximum demand + growth allowance (typically 20%)</li>
              <li><strong>Voltage ratio</strong> — 11kV/400V standard, check DNO requirements</li>
              <li><strong>Vector group</strong> — Dyn11 for distribution with neutral</li>
              <li><strong>Impedance</strong> — Typically 4-6% for distribution</li>
              <li><strong>Cooling class</strong> — AN/AF for indoor, ONAN for outdoor</li>
              <li><strong>Losses</strong> — Eco-design Tier 2 minimum (EU 2019/1783)</li>
              <li><strong>Noise level</strong> — Specify maximum dB(A) for location</li>
              <li><strong>Tap range</strong> — ±5% in 2.5% steps typical</li>
            </ul>

            <p>
              <strong>Design tip:</strong> For buildings with critical loads, consider two smaller
              transformers in parallel rather than one large unit - this provides N+1 redundancy
              with 50% capacity maintained on single unit failure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
                Example 1: Parallel Transformer Load Sharing
              </p>
              <p>
                <strong>Question:</strong> Two transformers, 500 kVA (4% impedance) and 300 kVA (5%
                impedance), are paralleled. How do they share a 600 kVA load?
              </p>

                <p>Convert to per-unit impedances on common base (800 kVA):</p>
                <p>Z₁(pu) = 4% × (800/500) = 6.4%</p>
                <p>Z₂(pu) = 5% × (800/300) = 13.3%</p>
                <p>Load sharing (inversely proportional to Z):</p>
                <p>
                  S₁ = 600 × (13.3/(6.4+13.3)) = 600 × 0.675 = <strong>405 kVA</strong>
                </p>
                <p>
                  S₂ = 600 × (6.4/(6.4+13.3)) = 600 × 0.325 = <strong>195 kVA</strong>
                </p>
                <p>The 500 kVA unit takes 405 kVA (81% loading)</p>
                <p className="text-white">The 300 kVA unit takes 195 kVA (65% loading)</p>
                <p className="mt-2 text-green-400">
                  Low impedance unit takes more than proportionate share
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 2: Auto-Transformer Size Calculation
              </p>
              <p>
                <strong>Question:</strong> Calculate the kVA rating of an auto-transformer to supply
                a 100 kVA load at 380V from a 400V supply.
              </p>

                <p>Auto-transformer kVA = Load kVA × (1 - V₂/V₁)</p>
                <p>kVA_auto = 100 × (1 - 380/400)</p>
                <p>kVA_auto = 100 × (1 - 0.95)</p>
                <p>
                  kVA_auto = 100 × 0.05 = <strong>5 kVA</strong>
                </p>
                <p>
                  Only 5% of load kVA required due to small voltage change
                </p>
                <p className="mt-2 text-green-400">
                  Compare to 100 kVA for double-wound transformer
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 3: Substation Ventilation
              </p>
              <p>
                <strong>Question:</strong> A 1000 kVA dry-type transformer has 1.5% no-load losses
                and 5% full-load losses. Calculate ventilation requirements at 75% load.
              </p>

                <p>No-load losses = 1.5% × 1000 = 15 kW (constant)</p>
                <p>Full-load copper losses = 5% × 1000 = 50 kW</p>
                <p>Copper losses at 75% = 50 × 0.75² = 50 × 0.5625 = 28.1 kW</p>
                <p>
                  Total losses = 15 + 28.1 = <strong>43.1 kW</strong>
                </p>
                <p>
                  Natural ventilation area (rule of thumb: 0.35 m² per 100 kW):
                </p>
                <p>
                  Area = 0.35 × (43.1/100) × 2 = <strong>0.30 m²</strong>
                </p>
                <p className="text-white">(×2 for inlet + outlet)</p>
                <p className="mt-2 text-green-400">
                  Provide 0.15 m² low-level inlet + 0.15 m² high-level outlet
                </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Knowledge</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Vector groups:</strong> D = delta, Y = star, n = neutral, number = phase
                  shift (×30°)
                </li>
                <li>
                  <strong>UK distribution:</strong> Dyn11 standard (11kV delta, 400V star with
                  neutral)
                </li>
                <li>
                  <strong>Parallel operation:</strong> Same ratio, same vector group, similar
                  impedance
                </li>
                <li>
                  <strong>Auto-transformer:</strong> Size advantage = (1 - V₂/V₁) × load kVA
                </li>
                <li>
                  <strong>Fire safety:</strong> Dry-type preferred indoors; oil requires fire
                  chamber
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Key Standards</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>IEC 60076:</strong> Power transformer specification series
                </li>
                <li>
                  <strong>BS EN 50588:</strong> Medium power transformers (distribution)
                </li>
                <li>
                  <strong>EU 2019/1783:</strong> Eco-design requirements (Tier 2)
                </li>
                <li>
                  <strong>ENA TS 35-1:</strong> Distribution transformer specification
                </li>
                <li>
                  <strong>BS 7671:</strong> Requirements for transformer installations
                </li>
              </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Paralleling different vector groups:</strong> Will cause catastrophic
                  circulating currents
                </li>
                <li>
                  <strong>Inadequate ventilation:</strong> Leads to overheating and premature
                  failure
                </li>
                <li>
                  <strong>Ignoring acoustic impact:</strong> 100 Hz hum travels through structures
                </li>
                <li>
                  <strong>No access for replacement:</strong> Consider future transformer changes
                </li>
                <li>
                  <strong>Auto-transformer for isolation:</strong> They provide NO electrical
                  isolation
                </li>
              </ul>
              </>
            }
            doInstead="Apply the formulas with care, verify with measured values where possible, and always cross-check against BS 7671 and equipment manufacturer data."
          />

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">Vector Groups</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Dyn11 - UK distribution standard</li>
                  <li>Yy0 - No phase shift, star both sides</li>
                  <li>Dd0 - No phase shift, delta both sides</li>
                  <li>Clock number × 30° = phase displacement</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Parallel Requirements</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Same voltage ratio (±0.5%)</li>
                  <li>Same vector group (mandatory)</li>
                  <li>Similar impedance (±10%)</li>
                  <li>Same phase sequence</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Building Installation</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Dry-type preferred indoors</li>
                  <li>Oil requires fire chamber</li>
                  <li>Ventilation: 0.35 m²/100 kW losses</li>
                  <li>Anti-vibration mounts for noise</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Auto-Transformer</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Size = Load × (1 - V₂/V₁)</li>
                  <li>No electrical isolation</li>
                  <li>Used for small voltage ratios</li>
                  <li>Motor starting, buck-boost</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Operating-theatre IT system &mdash; medical isolating transformer specification"
            situation={
              <>
                A new operating theatre requires an IT (Isolated Terre) earthing system for
                Group 2 medical locations under BS 7671 Section 710. The medical contractor
                proposes a 5 kVA single-phase transformer for the patient circuits with an
                insulation monitor (IMD) to BS EN 61557-8.
              </>
            }
            whatToDo={
              <>
                Specify an isolating transformer to BS EN 61558-2-15 (specifically for
                medical use): single-phase, 230 V/230 V, 5 kVA continuous, with a
                permanently-installed insulation monitoring device to BS EN 61557-8.
                The transformer must be a true two-winding type (not autotransformer),
                with primary and secondary fully galvanically separated, screen between
                primary and secondary earthed via a dedicated medical earth conductor.
                BS 7671 710.512.1.1 mandates the IMD trip on any single insulation fault
                with audible / visual alarm at the operator panel.
              </>
            }
            whyItMatters={
              <>
                Group 2 medical (operating, intensive care, cardiac cath labs) cannot
                tolerate a circuit interruption mid-procedure. The IT system + isolating
                transformer ensures a single first fault does not cause disconnection;
                the IMD alerts staff to act before a second fault. Autotransformer use
                here would be a safety failure with potentially fatal consequence and a
                serious BS 7671 / HTM 06-01 breach.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Three-phase preferred for distribution above ~100 kVA — efficiency, footprint and balance all favour 3-phase.',
              'Vector groups: D=delta, Y=star, n=neutral brought out, number = 30&deg; phase shift in clock notation. UK distribution standard: Dyn11.',
              'Parallel operation requires identical vector group, voltage ratio, %Z and tap position — mismatched parallel = circulating current.',
              'Autotransformers: smaller / cheaper than two-winding for ratios &le; 2:1 but no galvanic isolation — never for safety-isolation duty.',
              'Isolating transformers (BS EN 61558) provide true two-winding separation — mandatory for medical IT systems, SELV/PELV, marina, locations conducting electrical situations.',
              'Three-phase transformer construction: core type (3 limbs) for symmetric 3-phase, shell type for single-phase or asymmetric loading.',
              'Step-down 11 kV/415 V Dyn11 is the workhorse UK distribution transformer in private substations.',
              'BS 7671 411 ADS depends on a known fault loop &mdash; autotransformer common winding compromises this assumption.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Transformer theory, losses and efficiency
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Induction motors (construction, operation, performance)
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section5_3;
