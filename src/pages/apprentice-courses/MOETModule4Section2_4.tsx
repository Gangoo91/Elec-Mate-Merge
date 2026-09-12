/**
 * MOET · Module 4 · Section 4.2 · Subsection 4 — Insulation Resistance Testing
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Inspect and test electrical aspects of plant. For example,
 *     visual checks, insulation and continuity checks, thermographic
 *     surveys, and voltage levels."
 *   · "Electrical. Electrical maintenance tools, measurement, and test
 *     equipment application, operation, care and calibration requirements."
 *   · "Record information."
 *
 * ⚠️ Insulation-resistance test voltages and minimum acceptable values in
 * this page come from BS 7671 tables not held in the accuracy RAG at
 * conversion time — copied verbatim from the original page, unverified.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * ✎ ACCURACY FIX (12 Sep): the insulation-resistance table was cited as
 *   "BS 7671 Table 6.1". Verified against the RAG (BS 7671:2018+A4:2026):
 *   the correct reference is **Table 64** — SELV/PELV 250 V DC min 0.5 MΩ;
 *   circuits up to and including 500 V (except SELV/PELV) 500 V DC min 1.0 MΩ;
 *   above 500 V, 1000 V DC min 1.0 MΩ. Values themselves were correct.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import { InsulationResistanceTest } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Insulation Resistance Testing - MOET Module 4.2.4';
const DESCRIPTION =
  'Insulation resistance testing methods, test voltages, equipment selection, interpreting results, BS 7671 minimum values, polarisation index, step voltage testing and condition monitoring for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'ir-test-voltage',
    question:
      'For a 400 V three-phase motor circuit, what DC test voltage should be applied during an insulation resistance test to BS 7671?',
    options: ['5000 V DC', '250 V DC', '500 V DC', '1000 V DC'],
    correctIndex: 2,
    explanation:
      'BS 7671 Table 64 specifies a 500 V DC test voltage for circuits rated up to 500 V AC. A 400 V three-phase circuit falls within this range. Using too high a test voltage risks damaging insulation, while too low a voltage may not detect deterioration.',
  },
  {
    id: 'ir-minimum-value',
    question:
      'What is the minimum acceptable insulation resistance value for a 230 V circuit under BS 7671?',
    options: ['0.5 megohms', '10 megohms', '2.0 megohms', '1.0 megohms'],
    correctIndex: 3,
    explanation:
      'BS 7671 Regulation 643.3 specifies a minimum insulation resistance of 1.0 megohm for circuits rated up to 500 V tested at 500 V DC. While 1.0 megohm is the absolute minimum for compliance, healthy insulation on new installations should read considerably higher — typically 100 megohms or more.',
  },
  {
    id: 'ir-temperature-effect',
    question: 'How does temperature affect insulation resistance readings?',
    options: [
      'Temperature has no measurable effect on insulation resistance',
      'Higher temperature decreases insulation resistance — readings roughly halve for every 10 degrees C rise',
      'Higher temperature increases insulation resistance proportionally',
      'Insulation resistance only changes below freezing point',
    ],
    correctIndex: 1,
    explanation:
      'Insulation resistance is inversely proportional to temperature. As a general rule, the reading halves for approximately every 10 degrees C rise. This means a motor tested at 60 degrees C will show significantly lower readings than the same motor at 20 degrees C. When trending, always correct readings to a standard reference temperature (typically 40 degrees C).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'An insulation resistance tester applies which type of voltage to the circuit under test?',
    options: [
      'AC voltage at mains frequency',
      'DC voltage at a specified level',
      'High-frequency AC voltage',
      'Pulsed voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Insulation resistance testers apply a smooth DC voltage at a specified level. DC is used because it allows measurement of the true resistive component of the insulation without the effects of capacitive charging that would occur with AC.',
  },
  {
    id: 2,
    question:
      'Before performing an insulation resistance test, which safety precaution is essential?',
    options: [
      'Apply the test voltage with the circuit still energised for comparison',
      'Connect all sensitive electronic equipment to share the test load',
      'Ensure the circuit is safely isolated, proved dead, and all sensitive equipment is disconnected',
      'Select the highest available test voltage to obtain the clearest reading',
    ],
    correctAnswer: 2,
    explanation:
      'The circuit must be safely isolated, proved dead and locked off before testing. All connected equipment that could be damaged by the test voltage (electronic devices, surge protectors, capacitors, LEDs) must be disconnected.',
  },
  {
    id: 3,
    question: 'The polarisation index (PI) is calculated by dividing:',
    options: [
      'The test voltage by the leakage current',
      'The 1-minute reading by the 30-second reading',
      'The cable length by the insulation resistance',
      'The 10-minute reading by the 1-minute reading',
    ],
    correctAnswer: 3,
    explanation:
      'The polarisation index is the ratio of the 10-minute insulation resistance reading to the 1-minute reading. Good insulation shows a PI of 2.0 or higher. A PI close to 1.0 indicates contaminated or water-logged insulation.',
  },
  {
    id: 4,
    question:
      'When testing insulation resistance on a three-phase motor, which connections should be tested?',
    options: [
      'L1-E, L2-E, L3-E and phase-to-phase (L1-L2, L2-L3, L1-L3)',
      'Only L1 to earth, as the windings are internally connected',
      'Only phase-to-phase, since the frame is already earthed',
      'Only the neutral to earth at the star point',
    ],
    correctAnswer: 0,
    explanation:
      'A complete test requires testing each phase to earth (L1-E, L2-E, L3-E) and each phase to phase (L1-L2, L2-L3, L1-L3). This identifies insulation breakdown between windings and to the frame.',
  },
  {
    id: 5,
    question:
      'A motor insulation resistance drops from 50 megohms to 2 megohms over six months. This indicates:',
    options: [
      'Normal seasonal variation that needs no action',
      'Significant insulation deterioration requiring investigation',
      'A faulty test instrument, since 2 megohms is impossible',
      'An improvement, because the reading is now closer to the minimum',
    ],
    correctAnswer: 1,
    explanation:
      'A drop from 50 to 2 megohms represents a 96% decrease. While 2 megohms is still above the BS 7671 minimum, the trend shows serious deterioration requiring immediate investigation — possible causes include moisture ingress, contamination or thermal degradation.',
  },
  {
    id: 6,
    question:
      'After completing an insulation resistance test on a long cable run, what must be done?',
    options: [
      'Leave the cable disconnected for 24 hours before re-energising',
      'Apply the test voltage a second time to confirm the reading',
      'Safely discharge the stored capacitive charge before touching conductors',
      'Re-energise the circuit immediately to dissipate the charge',
    ],
    correctAnswer: 2,
    explanation:
      'Long cable runs store significant capacitive charge during testing. This charge must be safely discharged before touching any conductors or reconnecting equipment. Most modern testers have a built-in discharge function.',
  },
  {
    id: 7,
    question: 'The dielectric absorption ratio (DAR) compares readings taken at:',
    options: [
      'Two different test voltages',
      'Before and after the motor has run',
      'Two different temperatures',
      '60 seconds and 30 seconds into the test',
    ],
    correctAnswer: 3,
    explanation:
      'The DAR is the 60-second reading divided by the 30-second reading. A DAR of 1.4 or higher indicates good insulation. Below 1.0 suggests contamination. DAR is a quicker alternative to the full polarisation index test.',
  },
  {
    id: 8,
    question: 'Step voltage testing involves:',
    options: [
      'Applying progressively higher test voltages and comparing readings at each step',
      'Reducing the test voltage in steps until the reading stabilises',
      'Switching between AC and DC test voltages during the test',
      'Stepping the reading down to a reference temperature',
    ],
    correctAnswer: 0,
    explanation:
      'Step voltage testing applies increasing DC voltages in steps and compares the insulation resistance at each level. Good insulation shows similar resistance at each step. A significant drop at higher voltages indicates weakness that standard test voltages may not reveal.',
  },
  {
    id: 9,
    question: 'High ambient temperature and surface moisture cause:',
    options: [
      'Misleadingly high insulation resistance readings',
      'Misleadingly low insulation resistance readings',
      'No change, provided the test voltage is correct',
      'The polarisation index to rise above its true value',
    ],
    correctAnswer: 1,
    explanation:
      'High temperature reduces insulation resistance, and surface moisture provides a low-resistance leakage path. Both cause misleadingly low readings. Test at consistent temperature and ensure equipment is dry. Record temperature and humidity for trending.',
  },
  {
    id: 10,
    question: 'Under BS 7671, the test voltage for SELV circuits (up to 50 V AC) is:',
    options: ['The same as the circuit voltage', '500 V DC', '250 V DC', '1000 V DC'],
    correctAnswer: 2,
    explanation:
      'BS 7671 Table 64 specifies a 250 V DC test voltage for SELV and PELV circuits. The minimum acceptable insulation resistance for these circuits is 0.5 megohm.',
  },
  {
    id: 11,
    question: 'For meaningful trending of motor insulation data, readings should be corrected to:',
    options: [
      'The voltage at which the test was carried out',
      'The minimum acceptable value in BS 7671',
      'The ambient humidity on the day of the test',
      'A standard reference temperature, typically 40 degrees C',
    ],
    correctAnswer: 3,
    explanation:
      'Readings should be corrected to a standard reference temperature — typically 40 degrees C for rotating machines (IEEE 43). Without temperature correction, readings taken at different temperatures cannot be meaningfully compared for trend analysis.',
  },
  {
    id: 12,
    question: 'Under ST1426, insulation resistance testing relates to which competence area?',
    options: [
      'Condition monitoring, electrical testing and diagnostic fault-finding',
      'Manual handling and safe lifting of heavy plant',
      'Producing quotations and managing client invoices',
      'Excavation and underground cable installation',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to understand and apply electrical testing techniques including insulation resistance testing as part of condition monitoring and diagnostic fault-finding skills.',
  },
];

const faqs = [
  {
    question: 'How often should insulation resistance testing be carried out on motors?',
    answer:
      'The frequency depends on criticality, operating environment and age. Critical motors in harsh environments should be tested quarterly; important motors in normal conditions every 6 months; and non-critical motors annually. New installations should be tested at commissioning to establish a baseline.',
  },
  {
    question:
      'Can I test insulation resistance on a VSD-fed motor without disconnecting the drive?',
    answer:
      'No. The insulation test voltage can damage the electronic components in a variable speed drive. Always disconnect the motor cables from the VSD output terminals before applying the insulation test. Similarly, disconnect surge protection devices, capacitors and electronic instruments.',
  },
  {
    question: 'What does a spot reading tell me compared to a timed test?',
    answer:
      'A spot reading (typically at 60 seconds) gives a single resistance value for comparison against minimums and previous readings. Timed tests (DAR at 30/60 seconds, PI at 1/10 minutes) provide additional diagnostic information about moisture contamination and insulation degradation that a spot reading cannot detect.',
  },
  {
    question: 'Why do insulation resistance readings decrease over time?',
    answer:
      'All insulation degrades due to thermal ageing, mechanical stress, environmental factors and electrical stress. Regular testing detects when deterioration is accelerating or approaching minimum levels, allowing planned replacement before failure.',
  },
  {
    question: 'What is the difference between insulation resistance testing and hipot testing?',
    answer:
      'Insulation resistance testing applies a moderate DC voltage (typically 500 V or 1000 V) and measures resistance — it is non-destructive and used routinely. High-potential (hipot) testing applies much higher voltage (2-3 times rated) to stress-test insulation — it is a destructive-threshold test used at commissioning or after rewinding, not for routine maintenance.',
  },
];

const MOETModule4Section2_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.2 · Subsection 4"
        title="Insulation Resistance Testing"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Measuring insulation integrity to detect deterioration before failure occurs.
          </p>

          <TLDR
            points={[
              'What: DC voltage applied to measure insulation resistance in megohms.',
              'Test voltages: 250 V, 500 V, 1000 V or 5000 V DC per circuit rating.',
              'BS 7671: Minimum 1.0 megohm for 230/400 V circuits at 500 V DC.',
              'Trending: Regular measurements reveal deterioration patterns.',
            ]}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motors:</strong> Phase-to-earth and phase-to-phase testing.
              </li>
              <li>
                <strong>Cables:</strong> Conductor-to-earth and conductor-to-conductor.
              </li>
              <li>
                <strong>Advanced:</strong> PI, DAR and step voltage for deeper diagnosis.
              </li>
              <li>
                <strong>ST1426:</strong> Electrical testing and diagnostic skills.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the principles of insulation resistance and why it degrades over time',
              'Select the correct test voltage for different circuit ratings to BS 7671',
              'Perform insulation resistance tests safely on motors, cables and switchgear',
              'Interpret spot readings, DAR and polarisation index results',
              'Apply temperature correction for meaningful trending of insulation data',
              'Link insulation testing to ST1426 condition monitoring requirements',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Principles of insulation resistance</ContentEyebrow>

          <ConceptBlock title="Why insulation resistance testing matters">
            <p>
              Electrical insulation separates live conductors from earth and from each other. Over
              time, insulation degrades due to thermal ageing, moisture ingress, chemical
              contamination, mechanical damage and electrical stress. Insulation resistance testing
              measures the ability of the insulation to resist the flow of leakage current under a
              controlled DC test voltage. A decreasing trend in insulation resistance is an early
              warning of impending insulation failure.
            </p>
            <p className="font-medium text-elec-yellow/80">Why DC voltage is used</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Capacitive charging:</strong> AC voltage causes continuous capacitive
                charging current that masks the true leakage current. DC allows the capacitive
                current to decay, revealing the steady-state insulation resistance.
              </li>
              <li>
                <strong>Three current components:</strong> When DC is applied, the total current
                consists of capacitive charging current (decays in seconds), absorption current
                (decays over minutes) and conduction/leakage current (steady state).
              </li>
              <li>
                <strong>Non-destructive:</strong> At standard test voltages, DC testing does not
                damage healthy insulation.
              </li>
            </ul>
          </ConceptBlock>

          <InsulationResistanceTest
            eyebrow="Insulation resistance test connection"
            caption="An insulation resistance tester applies a DC test voltage between the linked live conductors and the earth/CPC, then measures the leakage current path as a resistance reading. Always isolate, lock off and prove dead before testing, and disconnect electronics that will not survive 500 V."
          />

          <ConceptBlock title="BS 7671 test voltages and minimum values">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Circuit voltage</th>
                    <th className="py-2 pr-4 font-medium text-white">Test voltage (DC)</th>
                    <th className="py-2 font-medium text-white">Minimum IR</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">SELV / PELV (up to 50 V AC)</td>
                    <td className="py-2 pr-4">250 V DC</td>
                    <td className="py-2">0.5 megohm</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Up to 500 V AC (including 230/400 V)</td>
                    <td className="py-2 pr-4">500 V DC</td>
                    <td className="py-2">1.0 megohm</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Above 500 V AC up to 1000 V</td>
                    <td className="py-2 pr-4">1000 V DC</td>
                    <td className="py-2">1.0 megohm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> The BS 7671 minimum values are absolute minimums — not
              targets. Healthy new insulation should read hundreds of megohms. A reading that has
              dropped significantly from previous tests indicates deterioration requiring
              investigation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Test procedure and safety</ContentEyebrow>

          <ConceptBlock
            title="Safety precautions"
            onSite="Insulation resistance testing involves applying a potentially dangerous DC voltage to a circuit. Safe working procedures must be followed to protect both the tester and the equipment."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Isolate:</strong> Safely isolate the circuit, prove dead using a
                GS38-compliant voltage indicator tested before and after.
              </li>
              <li>
                <strong>Disconnect:</strong> Remove all electronic equipment, surge protectors,
                capacitors, LEDs and sensitive instruments.
              </li>
              <li>
                <strong>Warn:</strong> Post warning signs — high DC voltage is present during
                testing.
              </li>
              <li>
                <strong>Discharge:</strong> After testing, discharge stored capacitive energy before
                touching conductors.
              </li>
              <li>
                <strong>Record:</strong> Note test voltage, ambient temperature, humidity and
                reading for each test point.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Step-by-step test procedure">
            <ul className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Isolate the circuit and prove dead. Lock off and post warning signs.</li>
              <li>Disconnect sensitive equipment and note what has been disconnected.</li>
              <li>Select the correct test voltage on the insulation tester.</li>
              <li>Connect test leads — line conductor to one terminal, earth to the other.</li>
              <li>
                Apply test voltage and hold for the required duration (60 s for spot reading, 10 min
                for PI).
              </li>
              <li>Record the reading, then discharge the circuit.</li>
              <li>
                Repeat for all conductor combinations (L-E, N-E, L-N for single-phase; all
                phase-earth and phase-phase for three-phase).
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Forgetting to disconnect electronic equipment"
            whatHappens={
              <>
                Forgetting to disconnect electronic equipment is the most common and expensive
                mistake. A 500 V DC test voltage will destroy LED drivers, power supplies, surge
                protection devices and control electronics instantly.
              </>
            }
            doInstead={
              <>Always trace the circuit and identify everything connected before testing.</>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Advanced diagnostic techniques</ContentEyebrow>

          <ConceptBlock title="Beyond the spot reading">
            <p>
              Beyond the simple spot reading, advanced insulation testing techniques provide deeper
              diagnostic insight. These techniques are particularly valuable for high-value assets
              such as motors, transformers and long cable runs where early detection of
              deterioration prevents costly unplanned outages.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Dielectric absorption ratio (DAR)">
            <p>
              The DAR compares the 60-second reading with the 30-second reading. In good insulation,
              the absorption current is still decaying at 30 seconds, so the 60-second reading
              should be noticeably higher.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DAR above 1.4:</strong> Good insulation.
              </li>
              <li>
                <strong>DAR 1.0 to 1.4:</strong> Marginal — investigate further.
              </li>
              <li>
                <strong>DAR below 1.0:</strong> Contaminated or moisture-logged insulation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Polarisation index (PI)">
            <p>
              The PI compares the 10-minute reading with the 1-minute reading, providing a more
              definitive assessment of insulation condition.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PI above 4.0:</strong> Excellent insulation condition.
              </li>
              <li>
                <strong>PI 2.0 to 4.0:</strong> Good — acceptable for continued service.
              </li>
              <li>
                <strong>PI 1.0 to 2.0:</strong> Marginal — plan cleaning, drying out or
                investigation.
              </li>
              <li>
                <strong>PI below 1.0:</strong> Poor — insulation is contaminated, wet or severely
                degraded.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Step voltage testing"
            onSite="Advanced techniques complement but do not replace basic spot readings and trending. The most valuable diagnostic information comes from consistent, regular readings plotted over time."
          >
            <p>
              Step voltage testing applies progressively higher DC voltages and compares the
              insulation resistance at each level. This reveals weaknesses that only manifest under
              higher electrical stress.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Good insulation:</strong> Resistance stays approximately the same at each
                step.
              </li>
              <li>
                <strong>Weak insulation:</strong> Resistance drops significantly at higher voltages.
              </li>
              <li>
                <strong>Application:</strong> Primarily used for HV motors, transformers and cables.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Trending and condition-based decisions</ContentEyebrow>

          <ConceptBlock
            title="A single reading tells you the state; a trend tells you the rate"
            onSite="Insulation resistance testing is a core electrical testing skill for maintenance technicians. Understanding how to interpret results and make condition-based decisions maps directly to the ST1426 knowledge and skills requirements for diagnostic fault-finding."
          >
            <p>
              The true value of insulation resistance testing lies in trending data over time. A
              single reading tells you the current state; a trend tells you the rate of
              deterioration and helps predict when insulation will reach unacceptable levels.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Temperature correction">
            <p>
              Because insulation resistance varies significantly with temperature, raw readings
              taken at different temperatures cannot be directly compared. Readings must be
              corrected to a standard reference temperature.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reference temperature:</strong> 40 degrees C for rotating machines (IEEE
                43).
              </li>
              <li>
                <strong>Correction factor:</strong> Multiply reading by the correction factor for
                the temperature difference.
              </li>
              <li>
                <strong>Always record:</strong> Winding temperature at time of test for trending
                purposes.
              </li>
            </ul>
          </ConceptBlock>

          <div className="grid gap-4 sm:grid-cols-2">
            <ConceptBlock title="Trending indicators">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                <li>Gradual decrease: normal ageing — continue monitoring.</li>
                <li>Sudden drop: investigate immediately (moisture, damage).</li>
                <li>Seasonal variation: condensation — consider anti-condensation heating.</li>
                <li>Approaching minimum: plan replacement or refurbishment.</li>
              </ul>
            </ConceptBlock>
            <ConceptBlock title="Action levels">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                <li>Above 100 megohms: excellent — routine monitoring.</li>
                <li>10-100 megohms: good — continue monitoring.</li>
                <li>2-10 megohms: investigate — increase frequency.</li>
                <li>Below 2 megohms: urgent — plan intervention.</li>
              </ul>
            </ConceptBlock>
          </div>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Test voltages (BS 7671): SELV/PELV 250 V DC, minimum 0.5 megohm; up to 500 V, 500 V DC, minimum 1.0 megohm; 500-1000 V, 1000 V DC, minimum 1.0 megohm.',
              'Always disconnect sensitive equipment before testing, and discharge the circuit after testing.',
              'DAR: 60 s / 30 s ratio, good above 1.4. PI: 10 min / 1 min ratio, good above 2.0.',
              'Step voltage testing: increasing voltage, compare insulation resistance at each step.',
              'Temperature correction: insulation resistance roughly halves per 10 degrees C rise — always trend and temperature-correct.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section2-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Vibration Analysis
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section2-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Oil and Fluid Analysis
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section2_4;
