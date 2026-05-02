/**
 * Module 4 · Section 3 · Subsection 6 — Arc Fault Detection
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Arc Fault Detection Devices (AFDDs) to BS EN 62606, series vs parallel arc faults,
 *   BS 7671 Regulation 421.1.7 recommendations for sleeping accommodation / combustible
 *   construction / valuable contents, combined AFDD + MCB / RCBO devices and limitations.
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

const TITLE = 'Arc Fault Detection - HNC Module 4 Section 3.6';
const DESCRIPTION =
  'Master arc fault detection devices (AFDDs) for building services: BS EN 62606 requirements, applications, BS 7671 recommendations, installation guidelines, and practical limitations.';

const quickCheckQuestions = [
  {
    id: 'afdd-purpose',
    question: 'What is the primary purpose of an AFDD?',
    options: [
      'Overload protection',
      'Short-circuit protection',
      'Detection of dangerous arcing faults',
      'Earth fault protection',
    ],
    correctIndex: 2,
    explanation:
      'AFDDs detect dangerous arcing faults that may not be detected by MCBs, RCDs, or other conventional protection. These arcing faults can generate sufficient heat to cause fires whilst drawing currents below device trip thresholds.',
  },
  {
    id: 'afdd-standard',
    question: 'Which British Standard covers AFDDs?',
    options: ['BS EN 60898', 'BS EN 61008', 'BS EN 62606', 'BS 7671'],
    correctIndex: 2,
    explanation:
      'BS EN 62606 specifies requirements for Arc Fault Detection Devices. It defines test methods, performance requirements, and marking for AFDDs used in AC circuits up to 240V and 63A.',
  },
  {
    id: 'afdd-arc-types',
    question: 'What types of arcing can AFDDs detect?',
    options: [
      'Series arcs only',
      'Parallel arcs only',
      'Both series and parallel arcs',
      'Earth fault arcs only',
    ],
    correctIndex: 2,
    explanation:
      'AFDDs detect both series arcs (within a single conductor, e.g., damaged cable) and parallel arcs (between conductors, e.g., L-N or L-E). Both types can cause fires if undetected.',
  },
  {
    id: 'bs7671-recommendation',
    question: 'According to BS 7671, where are AFDDs particularly recommended?',
    options: [
      'Industrial installations only',
      'Premises with sleeping accommodation',
      'Outdoor circuits only',
      'Three-phase supplies only',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Regulation 421.1.7 recommends AFDDs particularly for locations with sleeping accommodation, locations with combustible construction materials, and locations where valuable or irreplaceable goods are stored.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is a series arc fault?',
    options: [
      'An arc between line and neutral conductors',
      'An arc within a single conductor due to damage or poor connection',
      'An arc between line and earth',
      'An arc across multiple circuits',
    ],
    correctAnswer: 1,
    explanation:
      'A series arc occurs within a single conductor, typically due to damaged insulation, broken strands, or loose connections. Current flows through the arc as part of the normal circuit, making it difficult to detect with conventional protection.',
  },
  {
    id: 2,
    question: "Why can't MCBs reliably detect series arc faults?",
    options: [
      "They don't measure voltage",
      'The arc current may be less than the MCB rating',
      'MCBs only detect DC faults',
      'Series arcs only occur in three-phase systems',
    ],
    correctAnswer: 1,
    explanation:
      'Series arcs are in the load current path, so arc current is limited by the load. A 5A load with a series arc still draws approximately 5A - well below MCB trip thresholds. The arc can generate temperatures over 3000°C whilst current remains normal.',
  },
  {
    id: 3,
    question: 'How do AFDDs distinguish dangerous arcs from normal arcing (e.g., motor brushes)?',
    options: [
      'By measuring temperature',
      'By analysing high-frequency characteristics of the arc signature',
      'By current magnitude only',
      'They cannot distinguish - they trip on all arcs',
    ],
    correctAnswer: 1,
    explanation:
      'AFDDs analyse the high-frequency noise patterns superimposed on the AC waveform. Dangerous arcs have characteristic irregular, broadband noise signatures that differ from the regular, predictable arcing in motor brushes or switch contacts.',
  },
  {
    id: 4,
    question: 'What is the typical frequency range analysed by AFDDs for arc detection?',
    options: ['50-60 Hz only', '1-10 kHz', '10 kHz to several MHz', 'Above 100 MHz'],
    correctAnswer: 2,
    explanation:
      'AFDDs typically analyse frequencies from about 10 kHz to several MHz. Arc faults produce broadband noise across this range with characteristic patterns that sophisticated algorithms can identify.',
  },
  {
    id: 5,
    question: 'According to BS 7671 Regulation 421.1.7, in which locations are AFDDs recommended?',
    options: [
      'All domestic installations',
      'AC final circuits in buildings with sleeping accommodation, combustible construction, or irreplaceable goods',
      'Only industrial motor circuits',
      'Three-phase circuits only',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Regulation 421.1.7 recommends AFDD consideration for: premises with sleeping accommodation (HMOs, hotels); locations with combustible construction materials (timber frame); locations with valuable or irreplaceable goods (museums, heritage).',
  },
  {
    id: 6,
    question: 'What is the maximum rated current for AFDDs to BS EN 62606?',
    options: ['16A', '32A', '40A', '63A'],
    correctAnswer: 3,
    explanation:
      'BS EN 62606 covers AFDDs for AC circuits with rated voltage up to 240V and rated current up to 63A. This covers most single-phase final circuits in building services.',
  },
  {
    id: 7,
    question: 'Can AFDDs provide protection for circuits already protected by MCBs and RCDs?',
    options: [
      'No, they must be used alone',
      'Yes, they complement MCBs and RCDs as additional protection',
      'Only with MCBs, not RCDs',
      'Only in TT systems',
    ],
    correctAnswer: 1,
    explanation:
      'AFDDs provide complementary protection alongside MCBs and RCDs. Each protects against different hazards: MCBs for overcurrent, RCDs for earth faults, and AFDDs for arcing faults. Combined devices (AFDD+MCB or AFDD+RCBO) are available.',
  },
  {
    id: 8,
    question: 'Which of these is NOT a typical cause of unwanted AFDD tripping?',
    options: [
      'Universal motors (vacuum cleaners, power tools)',
      'LED dimmer switches',
      'Purely resistive loads like heaters',
      'Some types of electronic equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Purely resistive loads produce clean, sinusoidal current draw without high-frequency components. Motors with brushes, dimmers with phase-cut switching, and some electronic equipment can produce signatures that early AFDDs may misidentify.',
  },
  {
    id: 9,
    question: 'Where should an AFDD be installed in a circuit?',
    options: [
      'At the load end of the circuit',
      'At the origin of the circuit (distribution board)',
      'At any accessible point',
      'Only at the consumer unit main switch',
    ],
    correctAnswer: 1,
    explanation:
      'AFDDs are installed at the origin of the circuit, typically at the distribution board. They protect the entire circuit from that point to the loads. Combined AFDD/MCB or AFDD/RCBO devices fit in standard consumer unit ways.',
  },
  {
    id: 10,
    question: 'What testing is required for AFDDs during periodic inspection?',
    options: [
      'No testing required',
      'Only visual inspection',
      'Operation of the test button',
      'Injection testing with special equipment',
    ],
    correctAnswer: 2,
    explanation:
      "BS 7671 requires operation of the AFDD test button during inspection and testing to verify the device's self-test function operates correctly. Specialised arc fault injection testing is not typically required for routine verification.",
  },
];

const faqs = [
  {
    question: 'Are AFDDs mandatory in the UK?',
    answer:
      "No, AFDDs are not mandatory in BS 7671. Regulation 421.1.7 uses 'recommendation' language, not requirements. However, designers should consider AFDDs where fire risk is elevated: sleeping accommodation, timber-frame buildings, heritage properties, and locations with valuable or irreplaceable contents. Some insurance requirements or client specifications may make them effectively mandatory for certain projects.",
  },
  {
    question: 'Can AFDDs cause nuisance tripping?',
    answer:
      "Early generation AFDDs could experience nuisance tripping with certain loads like vacuum cleaners, power tools, and some LED dimmers. Modern devices use sophisticated algorithms that significantly reduce false trips. However, it's important to select quality devices from reputable manufacturers and consider the connected loads. If nuisance tripping occurs, investigate the cause - it may indicate genuine wiring issues.",
  },
  {
    question: 'Do AFDDs replace the need for RCDs?',
    answer:
      'No. AFDDs and RCDs protect against different hazards and should be used together where both risks exist. RCDs detect earth fault currents for shock protection. AFDDs detect arcing for fire protection. Neither can fully replace the other. Combined AFDD/RCBO devices provide all three functions: overcurrent, earth fault, and arc fault protection in one unit.',
  },
  {
    question: 'How do parallel and series arc faults differ?',
    answer:
      "Series arcs occur within a single conductor (e.g., a damaged cable with broken strands or a loose terminal). Current is limited by the load, so conventional protection won't operate. Parallel arcs occur between conductors (L-N or L-E), potentially drawing high currents that may eventually trip conventional protection - but the delay could allow fire ignition. AFDDs detect both types before fire conditions develop.",
  },
  {
    question: 'What should I consider when specifying AFDDs for a project?',
    answer:
      'Consider: 1) Risk assessment - is fire risk elevated (sleeping, combustible construction, valuable goods)? 2) Load compatibility - check AFDD compatibility with connected equipment; 3) Combined devices - AFDD/MCB or AFDD/RCBO for space efficiency; 4) Client requirements - some insurers or specifications require them; 5) Cost-benefit - balance protection benefits against additional cost; 6) Future maintenance - ensure test button accessible.',
  },
  {
    question: 'Are there different types or classes of AFDD?',
    answer:
      'BS EN 62606 defines AFDDs that detect both series and parallel arcs. Some devices focus primarily on one type. Combined units (AFDD+MCB, AFDD+RCBO) are common, providing multiple protection functions. When selecting, verify the device is BS EN 62606 compliant and suitable for the specific application. Check manufacturer compatibility lists for sensitive loads.',
  },
];

const HNCModule4Section3_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 6"
            title="Arc Fault Detection"
            description="AFDDs for fire prevention — technology, applications, and BS 7671 recommendations."
            tone="purple"
          />

          <TLDR
            points={[
              'AFDDs (Arc Fault Detection Devices) detect the high-frequency signature of arcing faults — series (broken conductor) or parallel (insulation breakdown) — that MCBs and RCDs miss.',
              'Arcing faults are a leading electrical fire cause: BEAMA estimates 50–60% of UK electrical fires originate from undetected arcing.',
              'BS 7671 Reg 421.1.7 (introduced in A4:2026) RECOMMENDS the installation of AFDDs in AC final circuits — recommendation, not mandatory.',
              'Combined AFDD + MCB + RCD modules are the practical specification — single 18&nbsp;mm wide unit replaces an RCBO at slightly higher cost.',
              'Best-fit applications: HMOs, care homes, schools, listed buildings, wooden-clad construction, hospitality bedrooms — anywhere a fire would be catastrophic.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 421.1.7 (Arc fault detection devices)"
            clause="Regulation 421.1.7 of BS 7671:2018+A4:2026 has been introduced recommending the installation of arc fault detection devices (AFDDs). The regulation text explicitly recommends installation of AFDDs as a measure within Part 4 — Protection for Safety, Chapter 42. The text uses 'recommending the installation' — advisory rather than mandatory phrasing; it does not use 'shall' or other mandatory wording."
            meaning={
              <>
                Reg 421.1.7 was introduced in BS 7671:2018+A4:2026 and explicitly RECOMMENDS
                AFDD installation in AC final circuits to mitigate fire risk from arc faults.
                The wording is advisory (&lsquo;recommending&rsquo;) — NOT mandatory. Designers
                must still consider AFDDs as part of the risk-based design process and document
                the decision either way. For high-fire-risk premises (HMOs, care homes, schools,
                wooden buildings, listed properties) installing AFDDs is the defendable
                engineering position; omitting them needs a written justification in the design
                file.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 421.1.7; BS EN 62606 (AFDD product standard); BEAMA AFDD guidance."
          />

          <LearningOutcomes
            outcomes={[
              'Explain the purpose and operating principle of AFDDs',
              'Differentiate between series and parallel arc faults',
              'Apply BS 7671 recommendations for AFDD installation',
              'Identify appropriate applications for AFDDs in building services',
              'Understand AFDD limitations and potential nuisance tripping',
              'Specify combined AFDD devices for circuit protection',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Arc Fault Fundamentals">
            <p>
              Arc faults occur when electrical current flows through an unintended path via
              ionised air. The arc generates extreme heat (3000-6000°C) that can ignite nearby
              materials, causing electrical fires.
            </p>
            <p>
              <strong>Types of arc faults (type / description / detection challenge):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Series arc</strong> — arc within a single conductor (damaged cable, loose
                terminal) — current limited by load, MCBs won't detect
              </li>
              <li>
                <strong>Parallel arc (L-N)</strong> — arc between line and neutral (damaged
                insulation) — may trip MCB eventually but delay allows ignition
              </li>
              <li>
                <strong>Parallel arc (L-E)</strong> — arc between line and earth (insulation
                failure) — RCD should detect but arc may be intermittent
              </li>
            </ul>
            <p>
              <strong>Common causes — installation faults:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Loose terminal connections</li>
              <li>Damaged cable during installation</li>
              <li>Incorrectly tightened connections</li>
              <li>Cable pinched by fixings</li>
            </ul>
            <p>
              <strong>Common causes — aging / damage:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Insulation degradation over time</li>
              <li>Rodent damage to cables</li>
              <li>Physical damage (DIY, nails)</li>
              <li>Thermal degradation from overloading</li>
            </ul>
            <p>
              <strong>Why conventional protection fails:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MCBs:</strong> series arc current is limited by load (e.g., 5A for a lamp)
                — well below trip threshold
              </li>
              <li>
                <strong>RCDs:</strong> only detect earth leakage — series and L-N arcs don't
                involve earth
              </li>
              <li>
                <strong>Time delay:</strong> even detectable faults may take seconds to trip —
                enough time for ignition
              </li>
              <li>
                <strong>Arc impedance:</strong> arc itself adds impedance, further reducing fault
                current
              </li>
            </ul>
            <p>
              <strong>Fire statistics:</strong> Approximately 50% of electrical fires in dwellings
              are attributed to arcing faults in fixed wiring.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="AFDD Technology and Operation">
            <p>
              AFDDs use sophisticated electronic monitoring and algorithms to analyse the current
              waveform for characteristic arc signatures whilst distinguishing dangerous arcs from
              normal switching or motor operation.
            </p>
            <p>
              <strong>Detection principle:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Current monitoring:</strong> high-bandwidth current sensor captures
                waveform including HF components
              </li>
              <li>
                <strong>Signal processing:</strong> microprocessor analyses frequency spectrum
                (typically 10kHz - several MHz)
              </li>
              <li>
                <strong>Pattern recognition:</strong> algorithms identify characteristic arc
                signatures (irregular, broadband noise)
              </li>
              <li>
                <strong>Discrimination:</strong> filters distinguish dangerous arcs from normal
                switching, motor brushes, etc.
              </li>
              <li>
                <strong>Trip decision:</strong> if arc pattern persists, AFDD disconnects the
                circuit
              </li>
            </ul>
            <p>
              <strong>BS EN 62606 requirements (parameter / requirement):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rated voltage — up to 240V AC</li>
              <li>Rated current — up to 63A</li>
              <li>Arc detection — series and parallel arcs</li>
              <li>Response time — typically &lt;1 second for test arcs</li>
              <li>Test function — integral test button required</li>
              <li>Indicator — visual indication of trip cause</li>
            </ul>
            <p>
              <strong>AFDD device types:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>AFDD only:</strong> arc detection, requires separate OCPD
              </li>
              <li>
                <strong>AFDD + MCB:</strong> combined arc and overcurrent
              </li>
              <li>
                <strong>AFDD + RCBO:</strong> arc, overcurrent, and earth fault
              </li>
              <li>
                <strong>Modular AFDD:</strong> mounts alongside existing MCB
              </li>
            </ul>
            <p>
              <strong>Typical module width:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>AFDD only: 1-2 modules</li>
              <li>AFDD + MCB: 2 modules</li>
              <li>AFDD + RCBO: 2-3 modules</li>
              <li>Consider board capacity in design</li>
            </ul>
            <p>
              <strong>Selection tip:</strong> Combined AFDD/RCBO devices provide comprehensive
              protection (arc, overcurrent, earth fault) in minimal space.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="BS 7671 Recommendations">
            <p>
              BS 7671 Regulation 421.1.7 recommends consideration of AFDDs for specific
              applications where fire risk is elevated. This is advisory, not mandatory, but
              represents best practice.
            </p>
            <p>
              <strong>Regulation 421.1.7 recommendations:</strong> "Arc Fault Detection Devices
              (AFDDs) conforming to BS EN 62606 are recommended in AC final circuits..."
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sleeping accommodation:</strong> HMOs, hotels, care homes, student
                accommodation
              </li>
              <li>
                <strong>Combustible construction:</strong> timber-frame buildings, thatched roofs
              </li>
              <li>
                <strong>Fire propagation risk:</strong> high-rise residential, locations with
                difficult evacuation
              </li>
              <li>
                <strong>Valuable contents:</strong> museums, archives, heritage buildings, data
                centres
              </li>
              <li>
                <strong>Premises with risk:</strong> where fire could cause serious harm or damage
              </li>
            </ul>
            <p>
              <strong>Recommended applications in building services (building type / risk factor / AFDD recommendation):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HMO — sleeping, shared facilities — strongly recommended</li>
              <li>Hotel/B&amp;B — sleeping, unfamiliar occupants — strongly recommended</li>
              <li>Care home — sleeping, vulnerable occupants — strongly recommended</li>
              <li>Timber-frame house — combustible construction — recommended</li>
              <li>Listed building — irreplaceable structure — recommended</li>
              <li>Standard office — no elevated risk factors — consider on risk assessment</li>
            </ul>
            <p>
              <strong>Cost-benefit considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Additional cost:</strong> AFDDs cost more than standard MCBs/RCBOs
              </li>
              <li>
                <strong>Board space:</strong> combined devices minimise space impact
              </li>
              <li>
                <strong>Insurance:</strong> some insurers offer premium reductions
              </li>
              <li>
                <strong>Liability:</strong> demonstrates duty of care in design
              </li>
              <li>
                <strong>Life safety:</strong> fire prevention in sleeping accommodation
              </li>
            </ul>
            <p>
              <strong>Designer note:</strong> Document risk assessment and AFDD consideration in
              the electrical design. If AFDDs are not used, record the reasoning.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Installation, Testing, and Limitations">
            <p>
              Successful AFDD implementation requires appropriate installation, commissioning, and
              awareness of limitations to avoid nuisance tripping whilst maintaining protection.
            </p>
            <p>
              <strong>Installation requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Install at the origin of each protected circuit</li>
              <li>Ensure test button is accessible for periodic testing</li>
              <li>Label circuits protected by AFDDs</li>
              <li>Consider space requirements in distribution board</li>
              <li>Follow manufacturer's installation instructions</li>
              <li>Verify compatibility with connected loads</li>
            </ul>
            <p>
              <strong>Testing and verification (test / frequency / method):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Commissioning — initial — test button operation, visual check</li>
              <li>User testing — 6 monthly (recommended) — test button operation</li>
              <li>Periodic inspection — per EICR schedule — test button, visual inspection</li>
              <li>Arc injection test — optional/specialist — specialised test equipment</li>
            </ul>
            <p>
              <strong>Potential nuisance trip sources:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Universal motors (vacuum, tools)</li>
              <li>Some LED dimmer switches</li>
              <li>Older electronic equipment</li>
              <li>Brush-type motors</li>
              <li>Some power supplies</li>
            </ul>
            <p>
              <strong>Mitigation strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Select quality AFDD devices</li>
              <li>Check manufacturer compatibility</li>
              <li>Separate sensitive loads</li>
              <li>Use latest generation AFDDs</li>
              <li>Investigate trips — may be genuine</li>
            </ul>
            <p>
              <strong>Not protected by AFDDs:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DC circuits (AFDDs are AC only to BS EN 62606)</li>
              <li>Circuits above 63A</li>
              <li>Three-phase circuits (without neutral — check specific device)</li>
              <li>SELV/PELV circuits below AFDD threshold</li>
              <li>External wiring upstream of the AFDD</li>
            </ul>
            <p>
              <strong>Troubleshooting:</strong> If an AFDD trips repeatedly, investigate the
              circuit for genuine wiring faults before assuming nuisance tripping. The AFDD may be
              detecting a real problem.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — HMO consumer unit specification:</strong> Specify protection for
              a 6-bedroom HMO with sleeping accommodation on all floors. Supply is TN-C-S.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Sleeping accommodation: <strong>high risk</strong>
              </li>
              <li>
                Multiple occupants: <strong>high risk</strong>
              </li>
              <li>BS 7671 Reg 421.1.7 applies</li>
              <li>All final circuits: AFDD protection</li>
              <li>Socket outlets: AFDD/RCBO (30mA)</li>
              <li>Lighting: AFDD/MCB or AFDD/RCBO</li>
              <li>Kitchen/bathroom: AFDD/RCBO (30mA) mandatory</li>
              <li>Comprehensive arc and shock protection</li>
            </ul>
            <p>
              <strong>Example 2 — cost-benefit analysis:</strong> Compare protection options for a
              10-way consumer unit: standard RCBOs vs AFDD/RCBOs.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard RCBO: £25 × 10 = £250</li>
              <li>AFDD/RCBO: £80 × 10 = £800</li>
              <li>
                Additional cost: <strong>£550</strong>
              </li>
              <li>Series arc protection (MCB/RCBO cannot provide)</li>
              <li>Parallel arc detection before fire conditions</li>
              <li>Compliance with Reg 421.1.7 recommendation</li>
              <li>Potential insurance premium reduction</li>
              <li>Demonstrates design due diligence</li>
              <li>For sleeping accommodation: cost justified</li>
              <li>For standard office: discuss with client</li>
            </ul>
            <p>
              <strong>Example 3 — nuisance tripping investigation:</strong> An AFDD trips when a
              vacuum cleaner is used. How should this be investigated?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Verify the fault:</strong> does AFDD trip every time? Does same vacuum
                trip other AFDDs? Do other vacuums trip this AFDD?
              </li>
              <li>
                <strong>2. If vacuum trips all AFDDs:</strong> vacuum may have internal fault;
                check vacuum flex for damage; test with different vacuum
              </li>
              <li>
                <strong>3. If only this AFDD/circuit:</strong> check for loose connections;
                inspect socket for damage; test insulation resistance
              </li>
              <li>
                <strong>4. If confirmed nuisance:</strong> modern AFDDs rarely false-trip;
                consider manufacturer guidance
              </li>
              <li>Do not bypass AFDD without investigation</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>AFDD specification checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm BS EN 62606 compliance</li>
              <li>Select appropriate current rating (≤63A)</li>
              <li>Choose combined device (AFDD/MCB or AFDD/RCBO) where suitable</li>
              <li>Verify board capacity for module width</li>
              <li>Check compatibility with connected loads</li>
              <li>Consider RCD discrimination if multiple devices</li>
            </ul>
            <p>
              <strong>Key points to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                BS EN 62606: up to <strong>240V AC, 63A</strong>
              </li>
              <li>
                Detects: <strong>series and parallel arcs</strong>
              </li>
              <li>
                BS 7671: <strong>recommended</strong>, not mandatory
              </li>
              <li>
                Priority: <strong>sleeping accommodation</strong>
              </li>
              <li>
                Testing: <strong>test button operation</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Omitting AFDDs in high-risk locations</strong> — document the decision
                </li>
                <li>
                  <strong>Ignoring trips as nuisance</strong> — investigate genuinely
                </li>
                <li>
                  <strong>Inadequate board space</strong> — plan for combined devices
                </li>
                <li>
                  <strong>No user guidance</strong> — inform occupants about test button
                </li>
              </ul>
            }
            doInstead="Specify AFDDs (or record the rationale for omission) on every Reg 421.1.7 high-risk circuit, treat repeated AFDD trips as a real fault to investigate, plan distribution board capacity for combined AFDD/RCBO modules, and brief occupants on the 6-monthly test-button check."
          />

          <SectionRule />

          <Scenario
            title="HMO refurbishment — specifying AFDDs against a fire-risk-led design"
            situation={
              <>
                A 12-bed HMO is being rewired. The local authority HMO licence requires &lsquo;all
                reasonable measures&rsquo; against fire. The fire risk assessor has flagged
                bedroom socket-outlets and luminaires as the highest electrical-fire risk areas
                — typical HMO failure modes are damaged plug-tops, daisy-chained extension leads
                and old appliance cords arcing inside furniture.
              </>
            }
            whatToDo={
              <>
                Apply Reg 421.1.7 (A4:2026): AFDDs are RECOMMENDED, not mandatory — but the
                fire-risk-assessment context makes them the defendable specification. Specify
                combined AFDD+RCBO units (BS EN 62606) on every bedroom socket and luminaire
                circuit. Standard MCB+RCBO on common-areas where risk is lower. Document the
                recommendation against Reg 421.1.7 in the design file — the &lsquo;all
                reasonable measures&rsquo; standard in HMO licensing is met by following the
                recommendation. Cost premium ≈ £40–£60 per circuit vs an RCBO — small money for
                the risk reduction.
              </>
            }
            whyItMatters={
              <>
                Reg 421.1.7 wording is advisory (&lsquo;recommending&rsquo;), not mandatory
                (&lsquo;shall&rsquo;) — but in any setting where the fire risk is documented as
                high (HMO, care home, school, listed building), omitting AFDDs is a design
                position you would have to defend in court if a fire occurred. Following the
                recommendation is the defendable engineering choice.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'AFDDs detect the high-frequency RF / current-waveform signature of arcing faults — series (broken conductor / loose terminal) or parallel (insulation breakdown).',
              'MCBs and RCDs do NOT detect arcing — currents are below MCB trip threshold and arcing produces no residual current.',
              'Reg 421.1.7 (introduced A4:2026) RECOMMENDS — does not mandate — AFDD installation in AC final circuits to mitigate fire risk.',
              'Best-fit applications: HMOs, care homes, schools, hotels, listed buildings, wooden-clad construction, escape-route bedrooms.',
              'Combined AFDD+MCB+RCD modules (single 18&nbsp;mm slot) are the practical specification — replaces an RCBO at modest premium.',
              'AFDD product standard: BS EN 62606. Always specify a Listed device, never an unbranded import.',
              'Design file documentation: where AFDDs are NOT specified, record the engineering reasoning — &lsquo;low fire risk&rsquo;, &lsquo;cost-benefit&rsquo;, etc.',
              'Test methodology: AFDDs include built-in self-test functions; verify operation at commissioning and annually thereafter.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Earth fault protection
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Lighting design
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section3_6;
