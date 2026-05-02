/**
 * Module 4 · Section 5 · Subsection 5 — Power Quality
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   BS EN 50160 voltage parameters, surge protection devices (Type 1 / 2 / 3), UK
 *   earthing systems (TN-S / TN-C-S PME / TT / IT), harmonics and EMC measures for
 *   modern non-linear loads (VFDs, LEDs, IT equipment).
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

const TITLE = 'Power Quality - HNC Module 4 Section 5.5';
const DESCRIPTION =
  'Master power quality for building services: voltage regulation, transient protection with SPDs, earthing arrangements and EMC considerations in commercial installations.';

const quickCheckQuestions = [
  {
    id: 'voltage-range',
    question: 'What is the permissible voltage range for a 230V UK supply under BS EN 50160?',
    options: ['220V-240V (±4.3%)', '207V-253V (±10%)', '218V-242V (±5%)', '225V-235V (±2%)'],
    correctIndex: 1,
    explanation:
      'BS EN 50160 specifies 230V +10%/-10% for LV supplies, giving a range of 207V to 253V. This harmonised European standard replaced the previous UK 240V ±6% tolerance.',
  },
  {
    id: 'spd-type',
    question: 'Where should a Type 1 SPD be installed?',
    options: [
      'At socket outlets',
      'At the main distribution board near the origin',
      'On IT equipment only',
      'External to the building',
    ],
    correctIndex: 1,
    explanation:
      'Type 1 (T1) SPDs are installed at or near the origin of the installation to protect against direct lightning strikes and major transients. They handle high energy surges.',
  },
  {
    id: 'earthing-tncs',
    question: 'What is the key characteristic of a TN-C-S (PME) earthing system?',
    options: [
      'Separate earth electrode required',
      'Combined neutral and earth (PEN) from DNO',
      'No earth connection',
      'Earth via water pipes',
    ],
    correctIndex: 1,
    explanation:
      'TN-C-S (Protective Multiple Earthing) has combined neutral and earth (PEN conductor) in the supply, which is split at the origin to provide separate N and PE for the installation.',
  },
  {
    id: 'harmonic',
    question: 'What is the main cause of harmonic distortion in modern buildings?',
    options: [
      'Incandescent lighting',
      'Resistive heating',
      'Electronic loads (computers, LED drivers, VFDs)',
      'Induction motors',
    ],
    correctIndex: 2,
    explanation:
      'Non-linear loads like switch-mode power supplies, LED drivers and variable frequency drives draw non-sinusoidal current, creating harmonics. These are increasingly common in modern buildings.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is 'voltage dip' (sag)?",
    options: [
      'Complete loss of voltage',
      'Temporary reduction in RMS voltage below 90%',
      'Voltage increase above normal',
      'Harmonic distortion',
    ],
    correctAnswer: 1,
    explanation:
      'A voltage dip (or sag) is a temporary reduction in RMS voltage typically to 10-90% of nominal for 0.5 cycles to 1 minute. Common causes include motor starting, fault clearance and large load switching.',
  },
  {
    id: 2,
    question: 'What does THD (Total Harmonic Distortion) measure?',
    options: [
      'Voltage level only',
      'The ratio of harmonic content to fundamental frequency',
      'Power factor',
      'Frequency variation',
    ],
    correctAnswer: 1,
    explanation:
      'THD quantifies harmonic distortion as a percentage - the ratio of all harmonic components to the fundamental frequency. THD below 5% is typically acceptable for most equipment.',
  },
  {
    id: 3,
    question: 'What is the function of an SPD (Surge Protective Device)?',
    options: [
      'To generate backup power',
      'To divert transient overvoltages to earth',
      'To regulate voltage level',
      'To correct power factor',
    ],
    correctAnswer: 1,
    explanation:
      'SPDs protect equipment by providing a low-impedance path to earth for transient overvoltages (surges). They clamp voltage to safe levels and divert surge energy away from sensitive equipment.',
  },
  {
    id: 4,
    question: 'What causes flicker in electrical systems?',
    options: [
      'Steady-state operation',
      'Rapid voltage fluctuations causing visible light variation',
      'High power factor',
      'Good quality earthing',
    ],
    correctAnswer: 1,
    explanation:
      'Flicker is caused by rapid voltage fluctuations (typically 0.5-25Hz) that produce visible variation in light output. Common causes include arc furnaces, welding equipment and large motor starting.',
  },
  {
    id: 5,
    question: 'In a TN-S earthing system, how is the earth provided?',
    options: [
      'Combined with neutral (PEN)',
      'Separate earth conductor from DNO transformer',
      'Local earth electrode only',
      'Through the building structure',
    ],
    correctAnswer: 1,
    explanation:
      'TN-S has a separate earth conductor from the supply transformer (usually the cable sheath) providing a dedicated PE throughout. This is common in older installations with lead-sheathed cables.',
  },
  {
    id: 6,
    question: 'What is the purpose of EMC (Electromagnetic Compatibility) measures?',
    options: [
      'To increase power consumption',
      'To ensure equipment neither emits nor is affected by electromagnetic interference',
      'To improve aesthetics',
      'To reduce installation costs',
    ],
    correctAnswer: 1,
    explanation:
      "EMC ensures electrical equipment operates without causing interference to other equipment (emission) and can function in its electromagnetic environment (immunity). It's a legal requirement under EMC Directive.",
  },
  {
    id: 7,
    question: 'What is the third harmonic (3rd) particularly problematic for?',
    options: [
      'Single-phase loads only',
      'Neutral conductors in three-phase systems - they add rather than cancel',
      'Earth conductors',
      'Circuit breakers',
    ],
    correctAnswer: 1,
    explanation:
      'Third harmonics (and their multiples) from balanced three-phase loads add in the neutral rather than cancelling. This can cause neutral current to exceed phase current, requiring oversized neutrals.',
  },
  {
    id: 8,
    question: 'What voltage regulation problem can occur with long cable runs?',
    options: [
      'Voltage increase',
      'Excessive voltage drop causing equipment malfunction',
      'Harmonic generation',
      'Improved power quality',
    ],
    correctAnswer: 1,
    explanation:
      'Long cables have higher resistance, causing voltage drop (I×R losses). If the voltage at the load drops below the equipment tolerance (typically -10%), malfunction or damage can occur.',
  },
  {
    id: 9,
    question: 'What is a Type 2 SPD designed to protect against?',
    options: [
      'Direct lightning strikes only',
      'Switching transients and indirect lightning effects',
      'Harmonic distortion',
      'Voltage sags',
    ],
    correctAnswer: 1,
    explanation:
      "Type 2 SPDs protect against switching transients and the residual effects of lightning after Type 1 protection. They're installed at distribution boards to protect final circuits and equipment.",
  },
  {
    id: 10,
    question: 'What is power factor correction used for?',
    options: [
      'Increasing voltage',
      'Reducing reactive power demand and improving efficiency',
      'Generating harmonics',
      'Providing backup power',
    ],
    correctAnswer: 1,
    explanation:
      'Power factor correction capacitors supply reactive power locally, reducing the reactive current drawn from the supply. This improves efficiency, reduces losses and can lower electricity bills.',
  },
];

const faqs = [
  {
    question: 'What causes voltage dips and how can they be mitigated?',
    answer:
      'Voltage dips are caused by large motor starting, transformer energisation, faults on the supply network, or large load switching. Mitigation includes soft starters/VFDs for motors, electronic voltage regulators, UPS for sensitive equipment, or increased supply capacity with lower source impedance.',
  },
  {
    question: 'When are Type 1 SPDs required?',
    answer:
      "Type 1 SPDs are required where lightning protection systems (LPS) are installed, as per BS EN 62305. They're also recommended for buildings at high risk of direct lightning strikes, or where the supply enters via overhead lines. They must be coordinated with Type 2 devices downstream.",
  },
  {
    question: 'How do I select the right earthing arrangement for a building?',
    answer:
      'The earthing system is usually determined by the DNO supply type. TN-C-S (PME) is most common for new supplies. TN-S is used where available (older areas). TT with local electrode is used in rural areas or where PME is unsuitable (swimming pools, caravans). The designer must work with the DNO and consider special locations.',
  },
  {
    question: 'What causes neutral conductor overheating?',
    answer:
      'In three-phase systems with non-linear loads, third-harmonic currents add in the neutral instead of cancelling. If the neutral is sized the same as phases (as per traditional practice), it can overheat. Modern designs may specify 200% neutral sizing or separate neutrals for non-linear loads.',
  },
  {
    question: 'What is the difference between EMC filtering and shielding?',
    answer:
      'Filtering attenuates conducted interference on power and signal cables using inductors and capacitors. Shielding prevents radiated interference using conductive enclosures or screens around cables/equipment. Both may be needed depending on the frequency and type of interference.',
  },
];

const HNCModule4Section5_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 5"
            title="Power Quality"
            description="Ensuring clean, stable power for sensitive building services equipment."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Understand voltage quality parameters and tolerances',
              'Specify and coordinate surge protection devices',
              'Select appropriate earthing arrangements',
              'Recognise and mitigate harmonic distortion',
              'Apply EMC principles to building services design',
              'Diagnose common power quality problems',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'BS EN 50160 sets the voltage quality envelope at the point of supply: ±10 % RMS, &lt; 8 % THD, ≤ 2 % unbalance, &lt; 5 % flicker.',
              'Harmonics: third (150 Hz) is the killer for three-phase neutrals — non-linear loads can drive neutral current ABOVE phase current. Specify 200 % neutral or oversize.',
              'SPDs: Type 1 at the origin where lightning protection is fitted, Type 2 at sub-distribution, Type 3 at sensitive equipment. Coordinate the chain (Reg 534).',
              'RCDs: Type AC is obsolete for any electronic load. Use Type A as the floor; Type B (or B+) where DC components are present (EV chargers, solar inverters, VFDs).',
              'Reg 331.1 obliges the designer to assess equipment for transient overvoltage, harmonics, leakage current, DC feedback and PF — power quality is a Part 3 design exercise, not a fix-after-commissioning one.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 331.1"
            clause="An assessment shall be made of any characteristics of equipment likely to have harmful effects upon other electrical equipment or other services or likely to impair the supply, for example, for coordination with concerned parties e.g. petrol stations, kiosks and shops within shops. Those characteristics include, for example: (a) transient overvoltages; (b) undervoltage; (c) unbalanced loads; (d) rapidly fluctuating loads; (e) starting currents; (f) harmonic currents; (g) earth leakage current; (h) excessive PE conductor current not due to a fault; (i) DC feedback; (j) high-frequency oscillations; (k) necessity for additional connections to Earth; (l) power factor."
            meaning={
              <>
                Reg 331.1 puts power-quality assessment squarely on the HNC designer at the
                Assessment-of-General-Characteristics stage (Part 3). It’s a 12-item checklist
                you walk down for every project — harmonic-rich loads (LED drivers, VFDs, IT
                equipment), DC feedback (PV, EV chargers), power factor, fluctuating loads (lifts,
                presses). The output drives RCD type, neutral sizing, SPD selection, transformer
                K-factor and cable derating.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 331.1."
          />

          <SectionRule />

          <ConceptBlock title="Voltage Regulation">
            <p>
              Voltage quality directly affects equipment performance and lifespan. UK supplies must
              comply with BS EN 50160, which defines acceptable voltage characteristics at the
              point of supply.
            </p>
            <p>
              <strong>BS EN 50160 voltage quality parameters (parameter / requirement / notes):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Supply voltage — 230V ±10% — 207V-253V for 95% of week</li>
              <li>Frequency — 50Hz ±1% — 49.5-50.5Hz for 95% of year</li>
              <li>Voltage dips — variable — typically 10-1000 per year</li>
              <li>THD voltage — ≤8% — total harmonic distortion</li>
              <li>Unbalance — ≤2% — three-phase voltage unbalance</li>
            </ul>
            <p>
              <strong>Voltage problems and effects:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Under-voltage:</strong> Motor overheating, equipment malfunction
              </li>
              <li>
                <strong>Over-voltage:</strong> Shortened lamp life, equipment damage
              </li>
              <li>
                <strong>Voltage dips:</strong> IT resets, process interruption
              </li>
              <li>
                <strong>Flicker:</strong> Visible light variation, annoyance
              </li>
            </ul>
            <p>
              <strong>Design consideration:</strong> Total voltage drop (supply + installation) must
              keep equipment voltage within tolerance. BS 7671 limits installation voltage drop to
              3-5%.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Transient Protection (SPDs)">
            <p>
              Surge Protective Devices (SPDs) protect against transient overvoltages from lightning,
              switching operations and network disturbances. Properly coordinated SPDs are essential
              for protecting sensitive electronic equipment.
            </p>
            <p>
              <strong>SPD types and applications (type / test current / location / application):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Type 1 (T1) — 10/350µs (Iimp) — main DB/origin — direct lightning, LPS buildings</li>
              <li>
                Type 2 (T2) — 8/20µs (In/Imax) — sub-distribution — switching, indirect lightning
              </li>
              <li>Type 3 (T3) — 1.2/50µs + 8/20µs — point of use — fine protection for equipment</li>
              <li>Type 1+2 — combined — main DB — simplified two-stage protection</li>
            </ul>
            <p>
              <strong>SPD selection parameters:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Uc:</strong> Maximum continuous operating voltage (&gt;253V for UK)
              </li>
              <li>
                <strong>Up:</strong> Voltage protection level (lower is better, &lt;1.5kV typical)
              </li>
              <li>
                <strong>In:</strong> Nominal discharge current (typically 5-20kA for T2)
              </li>
              <li>
                <strong>Imax:</strong> Maximum discharge current
              </li>
              <li>
                <strong>Mode:</strong> L-N, L-PE, N-PE (common mode/differential mode)
              </li>
            </ul>
            <p>
              <strong>Coordination:</strong> T1 and T2 SPDs must be coordinated — typically 10m
              cable minimum between them, or use manufacturer-specified coordination components.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Earthing Arrangements">
            <p>
              The earthing system is fundamental to electrical safety and affects fault loop
              impedance, protective device operation and electromagnetic compatibility.
              Understanding different systems enables correct design for each situation.
            </p>
            <p>
              <strong>UK earthing systems (system / earth source / characteristics):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>TN-S — separate DNO earth conductor — low Zs, reliable earth</li>
              <li>TN-C-S (PME) — combined PEN split at origin — most common, some restrictions</li>
              <li>TT — local earth electrode — RCD protection essential</li>
              <li>IT — isolated or high-impedance earth — medical, continuous process</li>
            </ul>
            <p>
              <strong>PME restrictions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Not for swimming pools/saunas</li>
              <li>Restrictions for caravan parks</li>
              <li>Careful consideration for petrol stations</li>
              <li>Additional bonding may be required</li>
            </ul>
            <p>
              <strong>Main bonding requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Water, gas and oil service pipes</li>
              <li>Structural steelwork</li>
              <li>Lightning protection system</li>
              <li>Minimum 10mm² copper (TN), 16mm² (TT)</li>
            </ul>
            <p>
              <strong>Design note:</strong> Always verify earthing type with the DNO before design.
              PME availability and restrictions affect the entire installation design.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="EMC Considerations">
            <p>
              Electromagnetic Compatibility (EMC) ensures electrical equipment operates reliably
              without causing or being affected by electromagnetic interference. Modern buildings
              with extensive electronic systems require careful EMC design.
            </p>
            <p>
              <strong>Sources of EMI in buildings (source / interference type / affected equipment):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>VFDs/Inverters — conducted and radiated HF — IT, audio systems, sensors</li>
              <li>LED drivers — conducted harmonics — audio, radio receivers</li>
              <li>Switching contacts — transient spikes — control systems, PLCs</li>
              <li>IT equipment — harmonics, HF noise — audio, measurement</li>
              <li>Welding equipment — high current transients — most electronic equipment</li>
            </ul>
            <p>
              <strong>EMC design measures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable segregation:</strong> Separate power, control and data cables
              </li>
              <li>
                <strong>Shielded cables:</strong> For sensitive signals, earthed at one/both ends
              </li>
              <li>
                <strong>EMC filters:</strong> On VFD inputs, switched-mode power supplies
              </li>
              <li>
                <strong>Ferrite cores:</strong> On data cables near interference sources
              </li>
              <li>
                <strong>Star earthing:</strong> Single point earth for sensitive systems
              </li>
              <li>
                <strong>Twisted pairs:</strong> Reduce magnetic field pickup
              </li>
            </ul>
            <p>
              <strong>Harmonics:</strong> Third harmonics (150Hz) from electronic loads add in
              three-phase neutrals. Consider oversized neutrals or separate neutrals for non-linear
              load circuits.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — SPD specification:</strong> Specify SPDs for an office building
              with lightning protection system.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building has external LPS → Type 1 SPD required</li>
              <li>
                <strong>Main switchboard (Type 1+2 combined):</strong>
              </li>
              <li>Uc ≥ 253V (for 230V +10%)</li>
              <li>Up ≤ 1.5kV</li>
              <li>Iimp ≥ 12.5kA (10/350µs)</li>
              <li>Mode: L-N, L-PE, N-PE</li>
              <li>
                <strong>Sub-distribution (Type 2):</strong> In ≥ 5kA (8/20µs), Up ≤ 1.2kV
              </li>
              <li>
                <strong>IT room final DB (Type 2+3):</strong> Up ≤ 1.0kV for sensitive equipment
              </li>
            </ul>
            <p>
              <strong>Example 2 — harmonic neutral sizing:</strong> Calculate neutral current for
              3-phase IT load with 60% third harmonic current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Phase current per phase: 50A (balanced)</li>
              <li>Third harmonic per phase: 50 × 0.6 = 30A</li>
              <li>Third harmonics add in neutral: Neutral 3rd harmonic = 3 × 30 = 90A</li>
              <li>In = √(fundamental² + 3rd²); fundamental cancels → approximately 0A</li>
              <li>
                In ≈ <strong>90A</strong> (from 3rd harmonic alone)
              </li>
              <li>
                <strong>Neutral exceeds phase current!</strong> Specify 200% rated neutral or
                separate neutrals
              </li>
            </ul>
            <p>
              <strong>Example 3 — voltage drop check:</strong> Verify voltage at end of 80m sub-main
              when supply is at lower tolerance.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Supply voltage: 207V (lower limit -10%)</li>
              <li>Sub-main: 80m, 35mm² copper, 100A load</li>
              <li>Voltage drop: 80m × 100A × 1.25mV/A/m = 10V</li>
              <li>Voltage at sub-DB: 207 - 10 = 197V</li>
              <li>Add final circuit drop (3%): 197 × 0.97 = 191V</li>
              <li>
                <strong>191V is below -15% limit (195.5V)</strong> — solution: increase cable size
                or reduce length
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Cable segregation rules:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Power and data cables: 300mm minimum separation</li>
              <li>VFD outputs: Shielded cable, separate containment</li>
              <li>Fire alarm cables: Segregated or fire-rated</li>
              <li>Cross cables at 90° where separation impossible</li>
            </ul>
            <p>
              <strong>Power quality monitoring:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Install power quality meters at main intake</li>
              <li>Monitor voltage, current, harmonics, power factor</li>
              <li>Log events (dips, swells, transients)</li>
              <li>Trend data for predictive maintenance</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                UK supply: <strong>230V ±10%</strong>
              </li>
              <li>
                Frequency: <strong>50Hz ±1%</strong>
              </li>
              <li>
                THD voltage: <strong>≤8%</strong>
              </li>
              <li>
                Installation voltage drop: <strong>3-5%</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common power quality problems"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Nuisance RCD trips</strong> — often harmonic or EMI related
                </li>
                <li>
                  <strong>IT resets during storms</strong> — inadequate surge protection
                </li>
                <li>
                  <strong>Overheating neutrals</strong> — third harmonic currents
                </li>
                <li>
                  <strong>Motor hunting</strong> — voltage unbalance
                </li>
              </ul>
            }
            doInstead="Use Type A or Type B RCDs that tolerate harmonic currents from electronic loads, fit a coordinated T1+T2 (or T2 alone) SPD chain, oversize the neutral (or specify 200% neutral) for non-linear three-phase loads, and balance phase loads to keep voltage unbalance under 2%."
          />

          <SectionRule />

          <Scenario
            title="LED + IT-heavy office sub-main running hot — diagnosis and fix"
            situation={
              <>
                FM team report a sub-main feeder to a Cat-A office floor is running 15 °C hotter
                than the design assumption, particularly the neutral conductor. Floor is 100 %
                LED lighting (DALI drivers), 80 IT desks, 6 large laser printers. Trip device hasn’t
                operated. Asked to advise.
              </>
            }
            whatToDo={
              <>
                Send out a 7-day power-quality logger (Class A meter per BS EN 50160). You expect
                to see THD V around 4–5 % and THD I 25–40 % with a strong third-harmonic signature
                from the LED drivers and IT switched-mode supplies. Neutral current likely 1.0×
                phase current or higher because the third harmonic is zero-sequence and sums in
                the neutral. Recommendation: re-rate the existing neutral via the Reg 524 / OSG
                derating tables for THD &gt; 33 %, OR pull a parallel neutral conductor, OR
                replace the sub-main with 200 % neutral. Confirm RCD is Type A minimum (Type B if
                EV charging is on the same board). Add a Type 2 SPD at the floor DB (Reg
                534.4.1.5). Document the Reg 331.1 assessment in the design narrative — this is
                exactly the case Reg 331.1 was written to catch at design stage.
              </>
            }
            whyItMatters={
              <>
                Harmonic neutral overheating is invisible to MCBs (which see RMS). It melts
                terminations, loosens joints and starts fires. The first time you see it on a real
                site is the moment you start specifying 200 % neutrals by default for any
                IT-heavy floor.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 331.1 is the design-stage power-quality assessment — work the 12-item list for every project.',
              'BS EN 50160: ±10 % V, &lt; 8 % THD, ≤ 2 % unbalance, flicker Pst &lt; 1 — the supply quality envelope.',
              'Third harmonic (150 Hz) is zero-sequence — it sums in the neutral on three-phase systems. Spec 200 % neutral or derate per OSG/IEC 60364-5-52 tables.',
              'SPD chain (Reg 534): Type 1 at origin if external LPS, Type 2 at sub-DB, Type 3 at sensitive equipment.',
              'RCD type by load: Type A minimum for any electronic load, Type B for DC-component loads (EV, PV, VFDs). Reg 531/722.',
              'Power factor correction at the source where loads are heavy on motors / drives — saves DNO charges and reduces conductor losses.',
              'Voltage unbalance &lt; 2 % is the design target — phase balancing on the DB schedule is preventive, not corrective.',
              'Class A power-quality logger (BS EN 50160) is the diagnostic tool when you suspect harmonics — get baseline data before you redesign.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                UPS and standby power
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Metering and monitoring
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section5_5;
