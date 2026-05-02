/**
 * Module 2 · Section 4 · Subsection 5 — Noise Control Methods
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Source-path-receiver hierarchy, mass law, duct silencers, acoustic enclosures
 *   and vibration isolation — the design toolkit that turns a noisy plant room
 *   into a compliant building.
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

const TITLE = 'Noise Control Methods - HNC Module 2 Section 4.5';
const DESCRIPTION =
  'Understanding noise control at source, path, and receiver including attenuation, barriers, acoustic enclosures, and silencers for building services.';

const quickCheckQuestions = [
  {
    id: 'control-hierarchy',
    question: 'Which is the most effective approach in the noise control hierarchy?',
    options: [
      'Hearing protection for occupants',
      'Sound barriers in the transmission path',
      'Reduction at source',
      'Absorption in the receiving room',
    ],
    correctIndex: 2,
    explanation:
      'Source control is most effective because it eliminates the problem at origin. Path control and receiver protection are secondary measures when source control is insufficient or impractical.',
  },
  {
    id: 'mass-law',
    question:
      'According to the mass law, doubling the surface mass of a partition increases its sound reduction by approximately:',
    options: ['3 dB', '6 dB', '10 dB', '20 dB'],
    correctIndex: 1,
    explanation:
      'The mass law predicts approximately 6 dB increase in transmission loss for each doubling of surface mass. Heavy constructions provide better sound insulation than light ones.',
  },
  {
    id: 'silencer-type',
    question: 'Which type of silencer is most commonly used in HVAC ductwork?',
    options: [
      'Reactive silencer',
      'Absorptive silencer',
      'Active noise control',
      'Barrier silencer',
    ],
    correctIndex: 1,
    explanation:
      'Absorptive (dissipative) silencers using mineral wool or similar materials are standard in HVAC ductwork. They provide broadband attenuation and acceptable pressure drop.',
  },
  {
    id: 'vibration-isolation',
    question: 'What is the purpose of anti-vibration mounts beneath rotating machinery?',
    options: [
      'To reduce airborne noise directly',
      'To prevent structure-borne noise transmission',
      'To improve machine efficiency',
      'To meet electrical safety requirements',
    ],
    correctIndex: 1,
    explanation:
      'Anti-vibration mounts isolate machinery vibration from the building structure, preventing structure-borne sound transmission which can radiate as noise in distant rooms.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What are the three locations where noise can be controlled?',
    options: [
      'Input, process, output',
      'Source, path, receiver',
      'Generation, transmission, absorption',
      'Plant, duct, room',
    ],
    correctAnswer: 1,
    explanation:
      'The noise control hierarchy addresses: Source (where noise is generated), Path (how it travels), and Receiver (where it is heard). Source control is preferred but all three may be needed.',
  },
  {
    id: 2,
    question: 'Which source control measure would reduce fan noise most effectively?',
    options: [
      'Installing a silencer downstream',
      'Selecting a fan operating at its best efficiency point',
      'Adding absorption to the plant room',
      'Increasing duct velocity',
    ],
    correctAnswer: 1,
    explanation:
      'Fans are quietest when operating at their best efficiency point (BEP). Oversized or undersized fans running away from BEP generate significantly more noise. Good selection is the primary noise control.',
  },
  {
    id: 3,
    question: "What is 'breakout noise' in ductwork?",
    options: [
      'Noise escaping through duct joints',
      'Noise radiating through duct walls into surrounding spaces',
      'Noise generated at duct fittings',
      'Noise at air terminals',
    ],
    correctAnswer: 1,
    explanation:
      'Breakout noise occurs when sound inside the duct radiates through the duct walls into adjacent spaces. It is significant with thin-walled ducts near noise-sensitive areas.',
  },
  {
    id: 4,
    question:
      'A sound barrier must break the line of sight between source and receiver. What additional reduction comes from increasing barrier height?',
    options: [
      'Unlimited - taller is always better',
      'Diminishing returns - each doubling gives less benefit',
      'None - only line of sight matters',
      'Linear - each metre gives equal benefit',
    ],
    correctAnswer: 1,
    explanation:
      'Barrier attenuation follows diminishing returns. The first break of line of sight gives the most benefit (typically 5-10 dB). Additional height gives smaller improvements due to diffraction effects.',
  },
  {
    id: 5,
    question:
      'What is the main advantage of a double-leaf partition over a single-leaf of the same total mass?',
    options: [
      'Lower cost',
      'Higher sound reduction at most frequencies',
      'Better fire resistance',
      'Easier installation',
    ],
    correctAnswer: 1,
    explanation:
      'Double-leaf (cavity) constructions outperform single-leaf of equal mass because the air cavity provides additional decoupling. Adding absorption in the cavity improves performance further.',
  },
  {
    id: 6,
    question: 'An absorptive silencer achieves attenuation primarily by:',
    options: [
      'Reflecting sound back to source',
      'Converting sound energy to heat in porous material',
      'Creating destructive interference',
      'Increasing duct velocity',
    ],
    correctAnswer: 1,
    explanation:
      'Absorptive silencers contain porous materials (mineral wool, acoustic foam) that convert sound energy to heat through friction as sound waves pass through. This provides broadband attenuation.',
  },
  {
    id: 7,
    question: "What is the 'coincidence dip' in partition sound insulation?",
    options: [
      'A frequency where insulation improves',
      'A frequency where insulation drops due to panel resonance',
      'The lowest audible frequency blocked',
      'The point where mass law fails',
    ],
    correctAnswer: 1,
    explanation:
      'The coincidence dip occurs when sound wavelength in air matches bending waves in the panel, causing increased transmission. It typically occurs in the 1-4 kHz range depending on panel properties.',
  },
  {
    id: 8,
    question: 'Which of these is an example of path control in building services?',
    options: [
      'Selecting quieter equipment',
      'Providing hearing protection',
      'Installing flexible connections to ductwork',
      'Sound masking in open plan offices',
    ],
    correctAnswer: 2,
    explanation:
      'Flexible connections (canvas, rubber) prevent vibration transmission along ductwork - a path control measure. Quieter equipment is source control; PPE and masking are receiver-based.',
  },
  {
    id: 9,
    question: 'Why are acoustic enclosures typically lined internally with absorptive material?',
    options: [
      'For thermal insulation',
      'To prevent build-up of reverberant sound inside',
      'For fire protection',
      'To reduce weight',
    ],
    correctAnswer: 1,
    explanation:
      'Internal absorption prevents sound reflecting repeatedly inside the enclosure, which would increase levels and cause more breakout. Without absorption, enclosure performance is significantly reduced.',
  },
  {
    id: 10,
    question:
      'What type of silencer would you specify for a domestic boiler flue with pulsating combustion noise?',
    options: [
      'Absorptive silencer',
      'Reactive silencer',
      'Active noise control',
      'No silencer needed',
    ],
    correctAnswer: 1,
    explanation:
      'Reactive silencers (expansion chambers, resonators) are effective for low frequency pulsating noise from combustion equipment. They work by creating acoustic impedance mismatches rather than absorption.',
  },
  {
    id: 11,
    question: 'What is crosstalk in building acoustics?',
    options: [
      'Speech interference from adjacent rooms',
      'Sound transmission through shared ductwork between rooms',
      'Noise from telecommunications equipment',
      'Reverberation between parallel walls',
    ],
    correctAnswer: 1,
    explanation:
      "Crosstalk occurs when sound travels between rooms through shared ductwork, acting as an acoustic 'short circuit' bypassing partition insulation. It requires attenuators or duct routing solutions.",
  },
  {
    id: 12,
    question: 'What is regenerated noise in ductwork systems?',
    options: [
      'Noise from the fan',
      'Noise generated at fittings, dampers, and terminals',
      'Breakout noise',
      'Structure-borne noise',
    ],
    correctAnswer: 1,
    explanation:
      'Regenerated noise is created at ductwork components (bends, dampers, grilles) by turbulence as air flows through. High velocities cause excessive regenerated noise - limiting velocity is essential.',
  },
];

const faqs = [
  {
    question: 'How do I decide between source, path, and receiver control?',
    answer:
      'Follow the hierarchy: source control first (quieter equipment, better installation), then path control (barriers, enclosures, isolation), then receiver protection (hearing protection, exposure limits). Source control is most effective and sustainable. Path control can be expensive but necessary for existing installations. Receiver-only solutions are last resort and often require ongoing management.',
  },
  {
    question: 'When should I use an acoustic enclosure versus a silencer?',
    answer:
      'Acoustic enclosures suit stationary equipment radiating noise in all directions (compressors, pumps, generators). Silencers suit noise travelling through ducts or pipes (fan noise in ductwork, engine exhausts). Often both are needed - an enclosure around a fan plus a silencer in the connected ductwork. Consider access requirements, ventilation, and heat dissipation for enclosures.',
  },
  {
    question: 'How much attenuation can I expect from a typical HVAC silencer?',
    answer:
      'Standard rectangular absorptive silencers typically provide 10-25 dB attenuation depending on length, splitter configuration, and frequency. Longer silencers and more splitters give more attenuation but increase pressure drop. Manufacturers provide insertion loss data at octave band frequencies. Low frequency attenuation requires longer silencers or reactive designs.',
  },
  {
    question: 'What causes flanking transmission and how do I prevent it?',
    answer:
      'Flanking occurs when sound bypasses a partition through connected structures - walls, floors, ceilings, services. Prevention includes: structural breaks at partition edges, proper sealing of service penetrations, avoiding rigid connections between spaces, and ensuring the partition SRI exceeds flanking paths. Flanking limits achievable isolation regardless of partition performance.',
  },
  {
    question: 'How effective are noise barriers outdoors?',
    answer:
      'Barriers breaking line of sight typically provide 5-10 dB reduction for point sources. Additional height gives diminishing returns. Barriers are most effective for high frequencies; low frequencies diffract over the top. Practical limitations include: distance from source to barrier, receiver distance, ground reflections, and barrier length (sound goes around ends too).',
  },
  {
    question: 'What velocity limits should I observe to control regenerated noise?',
    answer:
      'CIBSE guidelines for background noise-sensitive areas: main ducts 5-7.5 m/s, branches 3-5 m/s, near grilles 2-3 m/s. Higher velocities are acceptable in less sensitive areas or plant rooms. Regenerated noise increases roughly with v⁵ to v⁶, so small velocity reductions give significant noise reductions. Always check grille Nc ratings against room criteria.',
  },
];

const HNCModule2Section4_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 5"
            title="Noise Control Methods"
            description="Source, path, and receiver control strategies for building services acoustic design."
            tone="purple"
          />

          <TLDR
            points={[
              'You apply the source-path-receiver hierarchy: cheaper to control noise at source than to attenuate at the receiver.',
              'You spec attenuator type by frequency: absorptive splitters for broadband AHU noise, reactive silencers for low-frequency fan tones, lined plenums for compact runs.',
              'You apply the mass law (≈6 dB per doubling of partition mass per m²) to plant-room wall and ceiling design.',
              'You isolate rotating plant on AVMs (anti-vibration mounts) sized for ≥ 95% efficiency at the lowest forcing frequency.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document E (Resistance to the passage of sound)"
            clause="Reasonable provision shall be made to protect against the passage of sound: (a) within a dwelling-house etc; (b) between dwelling-houses or other buildings; and (c) between rooms intended for residential purposes — including airborne and impact sound."
            meaning={
              <>
                Approved Document E sets the legal floor for sound insulation between
                dwellings and rooms for residential purposes — directly relevant when
                building services plant adjoins residential walls or floors. The HNC
                engineer evidences compliance via partition mass-law calculations and
                pre-completion sound testing where required.
              </>
            }
            cite="Source: Building Regulations 2010, Approved Document E — gov.uk; CIBSE Guide B4 — Noise and Vibration Control; BS 8233 — Guidance on sound insulation and noise reduction for buildings."
          />

          <LearningOutcomes
            outcomes={[
              'Explain the source-path-receiver noise control hierarchy',
              'Describe source control measures for building services plant',
              'Apply the mass law to partition design',
              'Specify silencer types for ductwork applications',
              'Understand acoustic enclosure design principles',
              'Prevent structure-borne noise transmission',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Source Control — Reducing Noise at Origin"
            plainEnglish="Cheapest dB you'll ever buy is the one that never got created. Quieter plant, better selection, lower velocity — sort it at source first."
          >
            <p>
              Source control is the most effective and cost-efficient approach to noise management.
              By selecting quieter equipment and ensuring optimal operating conditions, noise
              problems can often be eliminated before they arise.
            </p>
            <p>
              <strong>Source Control Strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fans:</strong> Select for BEP operation, specify low noise options, avoid
                oversizing
              </li>
              <li>
                <strong>Pumps:</strong> Match duty point, avoid cavitation, seal type selection
              </li>
              <li>
                <strong>Compressors:</strong> Scroll vs reciprocating type, variable speed
                operation
              </li>
              <li>
                <strong>Chillers:</strong> Specification of Lw limits, acoustic packages, location
              </li>
              <li>
                <strong>Ductwork:</strong> Low velocities, gradual transitions, avoid sharp bends
              </li>
            </ul>
            <p>
              <strong>Equipment Selection:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Request Lw data at duty point</li>
              <li>Compare octave band spectra</li>
              <li>Specify maximum noise limits</li>
              <li>Consider acoustic options/packages</li>
              <li>Avoid operation away from BEP</li>
            </ul>
            <p>
              <strong>System Design:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Locate plant away from sensitive spaces</li>
              <li>Size ducts for low velocity</li>
              <li>Use radius bends not mitred</li>
              <li>Allow straight duct before silencers</li>
              <li>Separate supplies to adjacent rooms</li>
            </ul>
            <p>
              <strong>Key principle:</strong> Every dB reduced at source is worth 10 dB of path
              treatment. Always address source control before specifying acoustic treatments.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Path Control — Barriers and Enclosures"
            plainEnglish="Mass law: heavier wall = more dB. Double leaf with absorption beats single leaf at the same weight. Outdoor barriers: 5-10 dB and diminishing returns."
          >
            <p>
              When source control alone is insufficient, path control measures reduce noise during
              transmission from source to receiver. This includes physical barriers, acoustic
              enclosures, and treatments to the transmission path itself.
            </p>
            <p>
              <strong>The Mass Law:</strong> R ≈ 20 log₁₀(f × m) - 48 dB. R = sound reduction
              index, f = frequency (Hz), m = surface mass (kg/m²). Doubling mass or frequency
              increases R by approximately 6 dB.
            </p>
            <p>
              <strong>Barrier and Enclosure Performance:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>12.5mm plasterboard (single):</strong> 10 kg/m², typical Rw 28 dB
              </li>
              <li>
                <strong>Double plasterboard on studs:</strong> 20 kg/m², typical Rw 35-45 dB
              </li>
              <li>
                <strong>100mm blockwork (plastered):</strong> 150 kg/m², typical Rw 45 dB
              </li>
              <li>
                <strong>215mm brick (plastered):</strong> 400 kg/m², typical Rw 50 dB
              </li>
              <li>
                <strong>Steel acoustic enclosure (lined):</strong> 20-50 kg/m², typical Rw 25-40 dB
              </li>
            </ul>
            <p>
              <strong>Enclosure Design Principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heavy, airtight construction</li>
              <li>Internal absorption (prevent build-up)</li>
              <li>Vibration isolation from equipment</li>
              <li>Ventilation with attenuated openings</li>
              <li>Access for maintenance</li>
            </ul>
            <p>
              <strong>Barrier Limitations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Must break line of sight</li>
              <li>Low frequency diffraction limits effect</li>
              <li>Sound goes around ends too</li>
              <li>Diminishing returns with height</li>
              <li>Typically 5-15 dB maximum</li>
            </ul>
            <p>
              <strong>Double-leaf construction:</strong> A cavity partition with absorption
              outperforms a single-leaf of equal total mass by 10-15 dB at mid-high frequencies.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Silencers and Attenuators"
            plainEnglish="Sound goes through ductwork like water through a hose — silencers slow it down. Absorptive for HVAC, reactive for combustion, both for industrial."
          >
            <p>
              Silencers (attenuators) reduce noise travelling through ductwork and pipework. They
              are essential for preventing plant noise from reaching occupied spaces through the
              ventilation system.
            </p>
            <p>
              <strong>Silencer Types:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Absorptive (dissipative):</strong> Sound energy converted to heat, used for
                HVAC ductwork, broadband and mid-high frequency effective
              </li>
              <li>
                <strong>Reactive:</strong> Impedance mismatch reflects sound, used for exhausts and
                combustion, low frequency tuned
              </li>
              <li>
                <strong>Combination:</strong> Both absorption and reaction, used for industrial and
                high performance applications, wide frequency range
              </li>
              <li>
                <strong>Active:</strong> Anti-phase sound cancellation, used for specific low
                frequency problems, low frequency tonal
              </li>
            </ul>
            <p>
              <strong>Absorptive Silencer Performance Factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Length:</strong> Longer = more attenuation (but more pressure drop)
              </li>
              <li>
                <strong>Splitters:</strong> More splitters = more attenuation (narrower airways)
              </li>
              <li>
                <strong>Material:</strong> Thicker absorption = better low frequency performance
              </li>
              <li>
                <strong>Facing:</strong> Perforated metal protects material, slight HF loss
              </li>
              <li>
                <strong>Velocity:</strong> Self-noise increases with velocity (limit ~10 m/s)
              </li>
            </ul>
            <p>
              <strong>Typical Silencer Attenuation (Rectangular, 900mm) — Insertion Loss (dB):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>125 Hz: 8 dB</li>
              <li>250 Hz: 15 dB</li>
              <li>500 Hz: 22 dB</li>
              <li>1k Hz: 28 dB</li>
              <li>2k Hz: 25 dB</li>
              <li>4k Hz: 18 dB</li>
            </ul>
            <p>
              Values are indicative — always use manufacturer's data for specific products.
            </p>
            <p>
              <strong>Selection tip:</strong> Match silencer to noise spectrum. Standard absorptive
              silencers are weak at low frequencies — specify longer silencers or reactive sections
              for low frequency problems.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Vibration Isolation and Structure-Borne Sound"
            plainEnglish="One rigid pipe to a plant skid kills your isolation. Springs, flex connections, no rigid bridges — that's the rule."
          >
            <p>
              Structure-borne sound occurs when vibration from machinery is transmitted through
              building structure and re-radiated as airborne noise in distant rooms. Vibration
              isolation at the source prevents this transmission path.
            </p>
            <p>
              <strong>Vibration Isolation Elements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rubber pads:</strong> Light equipment, low isolation, natural frequency
                15-30 Hz
              </li>
              <li>
                <strong>Neoprene mounts:</strong> FCUs and small pumps, natural frequency 10-20 Hz
              </li>
              <li>
                <strong>Steel springs:</strong> AHUs, chillers, large pumps, natural frequency 3-8
                Hz
              </li>
              <li>
                <strong>Air springs:</strong> Precision equipment, very low frequency, natural
                frequency 1-3 Hz
              </li>
              <li>
                <strong>Inertia bases:</strong> Add mass and lower resonance, natural frequency
                variable
              </li>
            </ul>
            <p>
              <strong>Isolation Efficiency:</strong> Isolation begins when forcing frequency exceeds
              √2 × natural frequency of the mount system. Effectiveness increases with frequency
              ratio.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>f/fn = 2 → 65% isolation</li>
              <li>f/fn = 3 → 88% isolation</li>
              <li>f/fn = 5 → 96% isolation</li>
            </ul>
            <p>
              <strong>Connection Breaks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Flexible duct connections (canvas/rubber)</li>
              <li>Flexible pipe connectors</li>
              <li>Flexible electrical conduit/cable</li>
              <li>Resilient pipe hangers</li>
              <li>Isolated supports for connected duct</li>
            </ul>
            <p>
              <strong>Installation Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Level and even loading on mounts</li>
              <li>No rigid bridges (pipes, conduit)</li>
              <li>Sufficient static deflection</li>
              <li>Restraints for seismic/movement</li>
              <li>Maintenance access without removal</li>
            </ul>
            <p>
              <strong>Critical point:</strong> A single rigid connection (unbypassed pipe, taut
              cable) can completely short-circuit vibration isolation. All connections must be
              flexible.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Sizing a silencer, predicting a heavier wall's improvement, and picking a spring mount for a pump."
          >
            <p>
              <strong>Example 1: Silencer Selection.</strong> A fan produces 85 dB(A) at the
              discharge. The target at the nearest grille is 40 dB(A). Natural duct attenuation is
              12 dB. What silencer insertion loss is required?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Required total attenuation = 85 - 40 = <strong>45 dB</strong>
              </li>
              <li>Natural duct attenuation = 12 dB</li>
              <li>
                Silencer requirement = 45 - 12 = <strong>33 dB</strong>
              </li>
              <li>This suggests a 1.2-1.5m silencer with splitters, or two silencers in series.</li>
              <li>Note: Check at each octave band, not just overall dB(A).</li>
            </ul>
            <p>
              <strong>Example 2: Mass Law Application.</strong> A 100mm blockwork wall (150 kg/m²)
              provides Rw 45 dB. Estimate the performance if replaced with 215mm brick (400 kg/m²).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mass ratio = 400 / 150 = 2.67</li>
              <li>
                Increase = 20 log(2.67) = 20 × 0.43 = <strong>8.5 dB</strong>
              </li>
              <li>
                Estimated Rw = 45 + 8.5 = <strong>53.5 dB</strong>
              </li>
              <li>Actual performance may differ due to coincidence effects and workmanship.</li>
            </ul>
            <p>
              <strong>Example 3: Vibration Isolation.</strong> A pump runs at 1450 rpm. What
              isolator natural frequency is needed for 90% isolation?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Forcing frequency = 1450 / 60 = <strong>24.2 Hz</strong>
              </li>
              <li>For 90% isolation, need f/fn ≈ 3.3</li>
              <li>
                Required fn = 24.2 / 3.3 = <strong>7.3 Hz</strong>
              </li>
              <li>This requires steel spring mounts (rubber/neoprene too stiff).</li>
              <li>
                Spring deflection needed: δ = 25/fn² = 25/53 ={' '}
                <strong>~0.5mm static deflection</strong>
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The hierarchy, the CIBSE velocity limits, and the gotchas that wreck a good design."
          >
            <p>
              <strong>Noise Control Hierarchy:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Source:</strong> Quieter equipment, optimal operation
              </li>
              <li>
                <strong>2. Path:</strong> Distance, barriers, enclosures, silencers
              </li>
              <li>
                <strong>3. Receiver:</strong> Room treatment, PPE, time limits
              </li>
            </ul>
            <p>
              <strong>CIBSE Duct Velocity Limits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main ducts:</strong> 5-7.5 m/s
              </li>
              <li>
                <strong>Branch ducts:</strong> 3-5 m/s
              </li>
              <li>
                <strong>Near terminals:</strong> 2-3 m/s
              </li>
              <li>
                <strong>Through silencers:</strong> ≤10 m/s (check self-noise)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Rigid bridges:</strong> One unbypassed pipe ruins vibration isolation
                </li>
                <li>
                  <strong>Gaps in enclosures:</strong> Even small gaps destroy performance
                </li>
                <li>
                  <strong>Crosstalk:</strong> Forgetting shared ductwork between rooms
                </li>
                <li>
                  <strong>Velocity:</strong> Regenerated noise from high duct velocity
                </li>
              </ul>
            }
            doInstead="Inspect every connection to vibrating plant — pipes, conduit, taut cables — and put a flex section in each. Seal acoustic enclosures airtight, route ductwork to avoid crosstalk between adjacent rooms, and design ducts to CIBSE velocities."
          />

          <SectionRule />

          <Scenario
            title="Designing duct attenuation for an AHU above a meeting room"
            situation={
              <>
                A 6,000 l/s mixed-air AHU is located in a roof-level plant room directly
                above a 12-person meeting room with a CIBSE NR 30 design target. The fan
                produces 78 dB(A) inlet SWL, peaking at 250 Hz. The supply ductwork is
                rectangular 800 × 400 mm, 12 m run before the first diffuser.
              </>
            }
            whatToDo={
              <>
                Calculate untreated breakout: free-field, plenum, diffuser. Compare against
                NR 30 (≈ 35 dB(A)). Specify a 1.2 m absorptive splitter silencer sized
                for ≥ 18 dB(A) insertion loss at 250 Hz, and a lined plenum for the final
                3 m. Verify pressure drop is within fan curve allowance. Add a 10 mm acoustic
                lining to the duct break-in length. Coordinate with structural engineer for
                AVM mounts at ≥ 98% isolation efficiency at the fan&rsquo;s shaft speed.
              </>
            }
            whyItMatters={
              <>
                A meeting room over-target by 5 dB(A) is unusable for video conferences and
                is a defect liability item. Retrofitting splitter silencers in a finished
                ceiling void is brutally disruptive and expensive — the design-stage
                attenuator schedule is the cheapest acoustic protection the project will
                ever buy.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Source-path-receiver hierarchy: control at source first (low-noise plant), then in the path (silencers, partitions), then at the receiver (absorption).',
              'Mass law: sound reduction R ≈ 20 log(m·f) − 47 — doubling mass per m² gains ≈ 6 dB.',
              'Absorptive duct silencers: broadband, mid/high frequency dominant.',
              'Reactive (chamber) silencers: low-frequency fan tones, narrow band.',
              'AVM (anti-vibration mount) selection: aim for ≥ 95% isolation efficiency at the lowest forcing frequency.',
              'Acoustic enclosures: 4 sides + roof + base, internally lined, sealed at all penetrations.',
              'Approved Document E sets minimum partition performance for residential adjacency.',
              'CIBSE Guide B4 is the UK design code of practice for HVAC noise and vibration control.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Sound Fundamentals
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Building Acoustics and Compliance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section4_5;
