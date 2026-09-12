/**
 * MOET · Module 3 · Section 3.1 · Subsection 6 — Protection Coordination (Discrimination and Selectivity)
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
 *   · "Electrical. Principles of single phase and three-phase equipment,
 *     plant, and systems, the operation of motors and generators, and the
 *     use of monitoring and protection equipment."
 *   · "Electrical. Electricity at Work regulations. IET wiring regulations."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
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
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Protection Coordination (Discrimination and Selectivity) - MOET Module 3 Section 1.6';
const DESCRIPTION =
  'Comprehensive guide to protection coordination for electrical maintenance technicians: discrimination, selectivity, time grading, current grading, cascading, back-up protection, fault level considerations and BS 7671 compliance.';

const quickCheckQuestions = [
  {
    id: 'discrimination-purpose',
    question: 'What is the purpose of discrimination between protective devices?',
    options: [
      'To ensure all protective devices operate together so the fault is cleared as fast as possible',
      'To allow a smaller, cheaper device to be used downstream of a larger one',
      'To reduce the prospective fault current at the point of installation',
      'To ensure only the device nearest the fault operates, minimising supply disruption',
    ],
    correctIndex: 3,
    explanation:
      'Discrimination ensures that only the protective device nearest to the fault operates, while upstream devices remain closed. This limits the outage to the smallest possible section of the installation, maintaining supply to unaffected circuits.',
  },
  {
    id: 'time-grading-interval',
    question: 'What is the typical time grading interval between successive protective devices?',
    options: ['0.01 to 0.05 seconds', '0.1 to 0.3 seconds', '1 to 2 seconds', '5 to 10 seconds'],
    correctIndex: 1,
    explanation:
      'The typical time grading interval is 0.1 to 0.3 seconds. This accounts for the breaker operating time, relay operating time and a safety margin to ensure the downstream device clears the fault before the upstream device operates.',
  },
  {
    id: 'cascading-effect',
    question:
      'What happens during cascading when a fault exceeds the breaking capacity of the downstream device?',
    options: [
      'The upstream device assists in breaking the fault current',
      'The downstream device interrupts the fault on its own without help',
      'The fault current is automatically reduced to a safe level',
      'Only the downstream device trips, isolating the smallest section',
    ],
    correctIndex: 0,
    explanation:
      'In cascading, the upstream device assists the downstream device by contributing to fault current interruption. This allows downstream devices with lower breaking capacities to be used, but both devices may trip for high-level faults, causing a wider outage.',
  },
  {
    id: 'device-replacement',
    question:
      'Why should a protective device never be replaced with a different type or make without engineering approval?',
    options: [
      'A different make will always have a lower breaking capacity than the original',
      'Replacement devices from other manufacturers are not permitted under BS 7671',
      'The replacement may invalidate the protection coordination scheme',
      'Mixing manufacturers automatically increases the prospective fault current',
    ],
    correctIndex: 2,
    explanation:
      'Protection coordination is a designed system where devices are selected as a set to work together. Changing one device can invalidate the discrimination and cascading arrangements, potentially causing wider outages or safety hazards during fault conditions.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is discrimination (selectivity) in protection coordination?',
    options: [
      'All devices in the supply chain trip together to clear the fault quickly',
      'Only the device nearest the fault operates while upstream devices remain closed',
      'The upstream device always trips before the downstream device',
      'Each device is rated identically so any one can clear the fault',
    ],
    correctAnswer: 1,
    explanation:
      'Discrimination ensures only the protective device nearest the fault operates, while all upstream devices remain closed, limiting the outage to the smallest possible section.',
  },
  {
    id: 2,
    question: 'What is the difference between full and partial discrimination?',
    options: [
      'Full uses time grading; partial uses current grading only',
      'Full applies to MCBs; partial applies only to MCCBs and ACBs',
      'Full works for all fault levels; partial works up to a discrimination limit',
      'Full requires a 2:1 ratio; partial requires no ratio at all',
    ],
    correctAnswer: 2,
    explanation:
      'Full discrimination works for all fault levels up to the maximum Ipf. Partial discrimination works up to a certain fault level (discrimination limit), above which both devices may trip.',
  },
  {
    id: 3,
    question: 'What is the typical time grading interval between successive protection devices?',
    options: ['1 to 2 s', '0.01 s', '5 s', '0.1 to 0.3 s'],
    correctAnswer: 3,
    explanation:
      'The typical time grading interval is 0.1 to 0.3 seconds, accounting for device operating times and safety margins.',
  },
  {
    id: 4,
    question: 'What does cascading (back-up protection) allow?',
    options: [
      'Use of downstream devices with lower breaking capacity, assisted by upstream device',
      'Only the device nearest the fault to operate for all fault levels',
      'Protective devices to be installed without checking the prospective fault current',
      'A reduction in the number of distribution boards required on a site',
    ],
    correctAnswer: 0,
    explanation:
      'Cascading allows downstream devices to have a breaking capacity lower than the prospective fault current, with the upstream device assisting in fault interruption for high-level faults.',
  },
  {
    id: 5,
    question: 'What happens if time-current curves of two series devices cross?',
    options: [
      'Full discrimination is guaranteed across the whole fault range',
      'Both devices may operate simultaneously in the crossover region',
      'The downstream device will always clear the fault first',
      'The upstream device breaking capacity is automatically increased',
    ],
    correctAnswer: 1,
    explanation:
      'If curves cross, both devices may operate simultaneously for faults in the crossover region, resulting in a wider outage than intended.',
  },
  {
    id: 6,
    question: 'What is the minimum breaking capacity requirement under Regulation 434.5.1?',
    options: [
      'Equal to the rated current of the device multiplied by a factor of ten',
      'Not less than the design current of the circuit being protected',
      'Not less than the prospective fault current at the point of installation',
      'At least twice the breaking capacity of the next upstream device',
    ],
    correctAnswer: 2,
    explanation:
      'Every protective device must have a rated breaking capacity not less than the prospective fault current at its point of installation, unless back-up protection (cascading) is provided.',
  },
  {
    id: 7,
    question: 'What ratio of current ratings is generally needed for reliable current grading?',
    options: ['1.1:1', '1.5:1', '10:1', '2:1 or greater'],
    correctAnswer: 3,
    explanation:
      'A ratio of at least 2:1 between upstream and downstream device ratings is generally needed for reliable current grading, though exact requirements depend on specific device characteristics.',
  },
  {
    id: 8,
    question: 'What can cause fault levels to increase in an existing installation?',
    options: [
      'Transformer upgrade, parallel operation or on-site generation',
      'Increasing the length of the supply cables to the distribution boards',
      'Reducing the number of circuits connected to the main switchboard',
      'Replacing MCBs with devices of a higher breaking capacity',
    ],
    correctAnswer: 0,
    explanation:
      'Transformer upgrades, parallel transformer operation, on-site generation and DNO network changes can all increase prospective fault current levels.',
  },
  {
    id: 9,
    question: 'Which BS 7671 Regulation requires discrimination where it is necessary for safety?',
    options: ['Regulation 411.3', 'Regulation 536.4', 'Regulation 434.5', 'Regulation 643.1'],
    correctAnswer: 1,
    explanation:
      'Regulation 536.4 requires that where discrimination between protective devices is necessary for safety, the characteristics shall be chosen accordingly.',
  },
  {
    id: 10,
    question:
      'What should a maintenance technician do before replacing a protective device with a different type?',
    options: [
      'Fit the nearest available device and test the circuit afterwards',
      'Select any device with the same rated current as the original',
      'Obtain engineering approval to verify coordination is maintained',
      'Increase the breaking capacity to be safe and proceed without checks',
    ],
    correctAnswer: 2,
    explanation:
      'Engineering approval must be obtained because changing one device can invalidate the entire protection coordination scheme, including discrimination and cascading arrangements.',
  },
  {
    id: 11,
    question: 'What tool is primarily used to verify discrimination between protective devices?',
    options: [
      'An insulation resistance tester set to 500 V',
      'A clamp meter measuring load current',
      'A loop impedance tester at each distribution board',
      'Time-current characteristic curves',
    ],
    correctAnswer: 3,
    explanation:
      'Time-current characteristic curves are plotted for each device and compared to verify that they do not cross within the expected fault current range.',
  },
  {
    id: 12,
    question: 'What is a typical breaking capacity range for MCCBs?',
    options: ['25 to 70 kA', '100 to 150 kA', '6 to 10 kA', '10 to 15 kA'],
    correctAnswer: 0,
    explanation:
      'MCCBs typically have breaking capacities ranging from 25 kA to 70 kA, making them suitable for main distribution where fault levels are higher than at final circuit level.',
  },
];

const faqs = [
  {
    question: 'What is the difference between discrimination and cascading?',
    answer:
      'Discrimination ensures only the device nearest the fault operates — upstream devices remain closed, maximising availability. Cascading allows both upstream and downstream devices to operate for high-level faults, using the upstream device as back-up protection. Discrimination maximises availability; cascading reduces cost by allowing smaller downstream devices.',
  },
  {
    question: 'How do I know if discrimination is achieved between two devices?',
    answer:
      "Check the manufacturer's discrimination tables for tested combinations. Alternatively, compare the time-current characteristic curves — if the curves do not cross within the expected fault current range, discrimination is achieved. Software tools are also available for analysing complex systems with multiple protection levels.",
  },
  {
    question:
      "What happens if a device's breaking capacity is lower than the prospective fault current?",
    answer:
      'The device may fail to interrupt the fault, resulting in a sustained arc, fire, explosion or destruction of the device. This is a serious safety hazard. Every device must have a breaking capacity equal to or greater than the Ipf at its point of installation, unless a cascading arrangement provides back-up.',
  },
  {
    question: 'Can fault levels increase over time?',
    answer:
      'Yes. Transformer upgrades, changes to supply arrangements, addition of on-site generation and DNO network changes can all increase fault levels. If fault levels increase, existing protective devices may become inadequate and the protection coordination may be affected. A fault level study should be conducted whenever supply arrangements change.',
  },
  {
    question:
      'Why is protection coordination particularly important in hospitals and data centres?',
    answer:
      'In life safety and critical installations, an unnecessarily wide power outage can have severe consequences — affecting operating theatres, intensive care, server rooms or communication systems. Full discrimination ensures that a fault on one circuit does not disrupt supply to other critical circuits, maintaining safety and operational continuity.',
  },
];

const MOETModule3Section1_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.1 · Subsection 6"
        title="Protection Coordination"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Protection coordination, discrimination, selectivity, cascading and fault level
            considerations.
          </p>

          <TLDR
            points={[
              'Discrimination: Only nearest device trips on fault.',
              'Time grading: 0.1-0.3 s intervals between devices.',
              'Cascading: Upstream device assists downstream for high faults.',
              'Breaking capacity: Must exceed Ipf at point of installation.',
              'Fault diagnosis: Understanding why multiple devices trip.',
              'Device replacement: Never change type without approval.',
              'Fault levels: Can change with supply modifications.',
              'ST1426: Maps to fault diagnosis and system awareness KSBs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define discrimination (selectivity) and explain its importance in electrical systems',
              'Describe time grading and current grading techniques for achieving discrimination',
              'Explain the concepts of cascading and back-up protection',
              'Interpret time-current characteristic curves for protective devices',
              'Understand fault level considerations and their effect on protection coordination',
              'Recognise the maintenance implications of protection coordination',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What is discrimination (selectivity)?</ContentEyebrow>

          <ConceptBlock
            title="Discrimination limits an outage to the smallest possible section"
            onSite="During fault investigation, if multiple devices have tripped, it may indicate a discrimination failure rather than a fault on multiple circuits. Understanding protection coordination helps you diagnose the root cause and identify the actual faulted circuit."
          >
            <p>
              Discrimination (also called selectivity) is the coordination of protective devices so
              that, in the event of a fault, only the device nearest to the fault operates, while
              all upstream devices remain closed. This limits the extent of supply disruption to the
              smallest possible section of the installation.
            </p>
            <p>
              Consider a multi-level distribution system: main switchboard, sub-distribution board,
              then final circuit MCB. If a fault occurs on a final circuit, the final circuit MCB
              should trip, leaving the sub-distribution board and main switchboard energised. If
              discrimination fails, the sub-distribution board incomer or even the main switch might
              trip, causing a much larger outage affecting many circuits and potentially endangering
              life safety systems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="BS 7671 and when discrimination is required">
            <p>
              BS 7671 Regulation 536.4 requires that where discrimination between protective devices
              is necessary for safety, the characteristics of the devices shall be chosen
              accordingly. In practice, discrimination is desirable for all installations but is
              essential for safety-critical systems such as hospitals, data centres and life safety
              circuits.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Full vs partial discrimination">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Full discrimination:</strong> The downstream device operates for ALL fault
                levels up to the maximum prospective fault current (Ipf). The upstream device never
                trips before the downstream device, regardless of fault current magnitude.
              </li>
              <li>
                <strong>Partial discrimination:</strong> The downstream device operates correctly up
                to a certain fault level (the discrimination limit), above which both devices may
                trip simultaneously. Partial discrimination is common and often acceptable, provided
                the discrimination limit exceeds the likely fault current at that point.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Methods of achieving discrimination</ContentEyebrow>

          <ConceptBlock title="Time grading and current grading">
            <p>
              There are two primary methods of achieving discrimination between protective devices:
              time grading and current grading. In practice, most protection schemes use a
              combination of both methods to achieve the best coordination across the full range of
              fault currents.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Time grading">
            <p>
              Time grading achieves discrimination by introducing intentional time delays in
              upstream devices. The device nearest the fault has the shortest operating time, while
              each successive upstream device has a progressively longer time delay. The time
              grading interval is typically 0.1 to 0.3 seconds.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Final circuit MCB trips instantaneously (within 10 ms)</li>
              <li>Sub-distribution MCCB has a 0.2 second short-time delay</li>
              <li>Main ACB has a 0.5 second short-time delay</li>
              <li>Each level has progressively longer delay to ensure downstream clears first</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Current grading">
            <p>
              Current grading uses the difference in current ratings between upstream and downstream
              devices. A fault on a final circuit produces a current within the tripping range of
              the downstream MCB but below the instantaneous trip threshold of the larger upstream
              MCCB.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Requires a significant ratio between successive device ratings (minimum 2:1)</li>
              <li>Works best at lower fault levels where current is within the overload region</li>
              <li>At very high fault currents, both devices may enter instantaneous trip region</li>
              <li>Often combined with time grading for comprehensive coordination</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Using time-current curves"
            onSite="Manufacturers' discrimination tables are the most reliable way to verify coordination between devices from the same manufacturer. When mixing manufacturers, more detailed analysis using time-current curves is required."
          >
            <p>
              Time-current characteristic curves are the primary tool for verifying discrimination.
              Each protective device has a characteristic curve showing the relationship between
              fault current and operating time. For discrimination, the curves of upstream and
              downstream devices must not cross within the expected fault current range.
              Manufacturers publish discrimination tables showing tested combinations that achieve
              full or partial discrimination — these should be used in preference to manual curve
              comparison where available.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Cascading (back-up protection)</ContentEyebrow>

          <ConceptBlock
            title="A lower-rated downstream device, assisted by the device above it"
            onSite="In practice, many installations use a combination of discrimination (for lower fault levels) and cascading (for the highest fault levels). Manufacturers provide cascading tables showing tested combinations and the enhanced breaking capacity achieved."
          >
            <p>
              Cascading (also called back-up protection) is a technique where a downstream device
              with a lower breaking capacity is used in conjunction with a higher-rated upstream
              device. If a fault occurs that exceeds the breaking capacity of the downstream device,
              the upstream device assists by interrupting the fault current. This allows the use of
              smaller, less expensive downstream devices.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Cascading vs discrimination">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-white">Feature</th>
                    <th className="border border-white/10 px-3 py-2 text-white">Discrimination</th>
                    <th className="border border-white/10 px-3 py-2 text-white">Cascading</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Which devices trip</td>
                    <td className="border border-white/10 px-3 py-2">Only downstream</td>
                    <td className="border border-white/10 px-3 py-2">
                      Both may trip for high faults
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">System availability</td>
                    <td className="border border-white/10 px-3 py-2">Maximised</td>
                    <td className="border border-white/10 px-3 py-2">
                      Reduced for high-level faults
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Cost</td>
                    <td className="border border-white/10 px-3 py-2">
                      Higher (larger downstream devices)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Lower (smaller downstream devices)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Best for</td>
                    <td className="border border-white/10 px-3 py-2">Critical installations</td>
                    <td className="border border-white/10 px-3 py-2">
                      Cost-sensitive installations
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Replacing a cascade-protected device without checking compatibility"
            whatHappens={
              <>
                When maintaining an installation with cascading protection, replacing a device with
                one from a different manufacturer or with different characteristics without
                verifying the cascading compatibility can invalidate the entire protection
                coordination scheme and create a serious safety hazard. The tested cascading
                combination may only be valid for specific device models and ratings.
              </>
            }
            doInstead={
              <>
                Never replace a device with one from a different manufacturer or with different
                characteristics without verifying the cascading compatibility first.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Fault level considerations</ContentEyebrow>

          <ConceptBlock title="What sets the prospective fault current">
            <p>
              The prospective fault current (Ipf) at any point in an installation depends on the
              supply impedance (transformer rating and impedance), the cable impedance between the
              source and the fault point, and the fault type (three-phase, phase-to-neutral,
              phase-to-earth). Understanding fault levels is essential for ensuring that protective
              devices are correctly rated.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Breaking capacity requirements">
            <p>
              Every protective device has a rated breaking capacity (Icn for MCBs, Icu or Ics for
              MCCBs). This is the maximum fault current the device can safely interrupt. If the
              prospective fault current exceeds the device&apos;s rated breaking capacity, the
              device may fail to interrupt the fault, resulting in an arc, fire or explosion.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-white">Device type</th>
                    <th className="border border-white/10 px-3 py-2 text-white">
                      Typical breaking capacity
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Domestic MCBs</td>
                    <td className="border border-white/10 px-3 py-2">6 kA or 10 kA</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Commercial MCBs</td>
                    <td className="border border-white/10 px-3 py-2">10 kA or 15 kA</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">MCCBs</td>
                    <td className="border border-white/10 px-3 py-2">25 kA to 70 kA</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">ACBs</td>
                    <td className="border border-white/10 px-3 py-2">50 kA to 100 kA or more</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Assuming fault levels never change"
            whatHappens={
              <>
                Fault levels are not fixed. They can change due to transformer upgrades (a larger
                transformer has lower source impedance, increasing fault levels), changes in supply
                arrangements (parallel transformer operation), addition of on-site generation, and
                network changes by the DNO.
              </>
            }
            doInstead={
              <>
                During maintenance, if you become aware of changes to the supply arrangements, the
                protection coordination should be reviewed by a competent engineer.
              </>
            }
          />

          <ConceptBlock title="Regulation 434.5.1">
            <p>
              BS 7671 requires that every protective device shall have a rated short-circuit
              breaking capacity not less than the prospective fault current at its point of
              installation. The only exception is where a back-up device (cascading arrangement)
              with adequate breaking capacity is installed upstream.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Coordination studies and maintenance</ContentEyebrow>

          <ConceptBlock title="What a coordination study checks">
            <p>
              A protection coordination study is a detailed analysis of the entire protection system
              to verify that discrimination is achieved throughout the installation. It involves
              plotting the time-current characteristics of all protective devices on a common graph
              and checking that the curves do not cross at any expected fault level.
            </p>
          </ConceptBlock>

          <ConceptBlock title="When a coordination study is needed">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>New installations or major extensions</li>
              <li>Changes to supply arrangements (transformer upgrades, paralleling)</li>
              <li>Addition of on-site generation or energy storage</li>
              <li>After a major fault event where unexplained tripping occurred</li>
              <li>When protective devices are replaced with different types or makes</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Maintenance technician responsibilities"
            onSite="Under ST1426, maintenance technicians are expected to understand protection principles and recognise when coordination may have been compromised. If you observe unexplained multiple device tripping or are asked to replace a device with a different type, always consult with a design engineer before proceeding."
          >
            <p>As a maintenance technician, your role in protection coordination includes:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Never replace a protective device with one of a different type, rating or make
                without engineering approval
              </li>
              <li>Report any unexplained tripping that may indicate discrimination failure</li>
              <li>Record the details of any fault events including which devices operated</li>
              <li>
                Ensure trip settings on adjustable devices (MCCBs, ACBs) are not altered without
                authorisation
              </li>
              <li>
                Be aware that the protection coordination scheme is a designed system — changing one
                component affects the entire scheme
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Discrimination — only the device nearest the fault trips; upstream devices remain closed.',
              'Time grading uses a 0.1-0.3 s interval between successive devices; current grading needs a ratio of 2:1 or greater.',
              'Cascading lets a lower-rated downstream device rely on the upstream device for high-level faults, at the cost of a wider outage on those faults.',
              'Breaking capacity must not be less than the prospective fault current at the point of installation (Regulation 434.5.1), unless a cascading arrangement provides back-up.',
              'BS 7671 Regulation 536.4 requires discrimination where it is necessary for safety.',
              'Fault levels change with transformer upgrades, parallel operation, on-site generation and DNO network changes — review coordination when supply arrangements change.',
              'Never replace a protective device with a different type or make without engineering approval — it can invalidate the whole coordination scheme.',
              'Key references: BS 7671 Regulations 434.5.1 and 536.4, IEC 61439 for switchgear assemblies, and the manufacturer discrimination tables for the specific devices installed.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section1-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Isolation and Switching Devices
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section2-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Motor Construction and Operation
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section1_6;
