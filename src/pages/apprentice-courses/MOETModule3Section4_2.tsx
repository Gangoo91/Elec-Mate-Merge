/**
 * MOET · Module 3 · Section 3.4 · Subsection 2 — Emergency Lighting Systems
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
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *      requirements: removing and replacing parts, inspecting, testing,
 *      setting up, adjusting, cleaning, and functional testing."
 *   · "Equipment life cycle considerations."
 *
 * Standard edition: BS 5266-1:2025 came into force 31 October 2025 and
 * supersedes BS 5266-1:2016 (now withdrawn). Every reference to the code of
 * practice on this page is named with that edition — the design values it
 * quotes (1 lux escape-route centre line, monthly functional + annual
 * full-duration testing, 3-hour duration for sleeping accommodation, ATS
 * recognition) are unchanged from the original page and are not themselves
 * 2025-specific claims.
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Emergency Lighting Systems - MOET Module 3.4.2';
const DESCRIPTION =
  'Comprehensive guide to emergency lighting systems for maintenance technicians: BS 5266-1:2025, maintained and non-maintained systems, central battery and self-contained, testing requirements, logbook recording, common faults and battery replacement under ST1426.';

const quickCheckQuestions = [
  {
    id: 'maintained-vs-non',
    question:
      'What is the key difference between a maintained and a non-maintained emergency luminaire?',
    options: [
      'Maintained luminaires use LED lamps; non-maintained luminaires use fluorescent tubes',
      'Maintained luminaires operate continuously; non-maintained only operate when the mains supply fails',
      'Maintained luminaires have their own battery; non-maintained run from a central battery',
      'Maintained luminaires require a 3-hour duration; non-maintained require only 1 hour',
    ],
    correctIndex: 1,
    explanation:
      'A maintained emergency luminaire operates continuously — the lamp is always illuminated whether the mains supply is present or not. A non-maintained luminaire only illuminates when the normal mains supply fails. Maintained luminaires are required in areas such as toilets, cinemas, and places of entertainment where sudden darkness would cause panic.',
  },
  {
    id: 'duration-requirement',
    question:
      'What is the minimum emergency lighting duration required for most premises under BS 5266-1:2025?',
    options: ['30 minutes', '2 hours', '3 hours', '1 hour'],
    correctIndex: 2,
    explanation:
      'BS 5266-1:2025 requires a minimum of 3 hours duration for most premises, particularly sleeping accommodation and premises that cannot be evacuated immediately. A 1-hour duration is only permitted where the premises can be evacuated immediately and are not used for sleeping, and where the premises will not be reoccupied until the system has fully recharged.',
  },
  {
    id: 'monthly-test',
    question: 'What is the purpose of the monthly functional test on emergency lighting?',
    options: [
      'To fully discharge each battery so that its remaining capacity can be accurately measured',
      'To confirm that each luminaire illuminates correctly when the mains supply is simulated to fail',
      'To measure the illuminance on the escape route and confirm it still meets 1 lux',
      'To check that the charging indicator on every luminaire is showing a green LED',
    ],
    correctIndex: 1,
    explanation:
      "The monthly functional test (also called a 'flick test') is a brief test to confirm that each emergency luminaire operates correctly when the mains supply is interrupted. The test should be long enough to confirm operation but not so long as to significantly discharge the batteries — typically a few seconds to a few minutes depending on the system.",
  },
  {
    id: 'annual-test',
    question:
      'During the annual full-duration test, for how long must a 3-hour rated emergency lighting system be tested?',
    options: [
      '1 hour, then the remaining duration is calculated from the battery voltage',
      '3 hours (the full rated duration)',
      '30 minutes, as a sample is sufficient to prove the battery condition',
      'Until the luminaires dim, with the elapsed time recorded as the actual duration',
    ],
    correctIndex: 1,
    explanation:
      'The annual full-duration test requires the emergency lighting system to operate on battery power for the full rated duration — 3 hours for a 3-hour system. At the end of this period, each luminaire must still be providing adequate illumination. After the test, the system must be allowed to fully recharge (typically 24 hours) before the premises are occupied.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under BS 5266-1:2025, what is the minimum illuminance required on the centre line of an escape route?',
    options: ['0.2 lux', '1 lux', '0.5 lux', '5 lux'],
    correctAnswer: 1,
    explanation:
      'BS 5266-1:2025 requires a minimum of 1 lux on the centre line of an escape route (measured at floor level). The central band, which is not less than half the width of the route, must be illuminated to at least 50% of this value. Additionally, the ratio of maximum to minimum illuminance on the centre line must not exceed 40:1 to avoid excessive bright and dark spots.',
  },
  {
    id: 2,
    question: 'In a self-contained emergency luminaire, where is the battery located?',
    options: [
      'In a dedicated plant room serving the whole building',
      'At the distribution board supplying the lighting circuit',
      'Within or immediately adjacent to the luminaire itself',
      'In a sealed enclosure mounted at the final exit door',
    ],
    correctAnswer: 2,
    explanation:
      'Self-contained emergency luminaires have the battery, charger and control electronics built into or immediately adjacent to the luminaire. Each unit is independent. This is the most common arrangement for small to medium-sized installations. The advantage is simplicity; the disadvantage is that each battery must be individually maintained and replaced.',
  },
  {
    id: 3,
    question:
      'A central battery system for emergency lighting typically uses which monitoring arrangement?',
    options: [
      'A test button on each individual luminaire that must be pressed in turn',
      'An automatic monthly self-test built into every separate fitting',
      'Periodic manual inspection of each luminaire with no remote indication',
      'A centralised monitoring panel with fault indication for each circuit',
    ],
    correctAnswer: 3,
    explanation:
      'Central battery systems typically incorporate a centralised monitoring panel that provides indication of mains supply status, battery condition, charger operation, earth faults and individual circuit monitoring. This allows faults to be identified quickly and reduces the manual inspection burden compared to self-contained systems.',
  },
  {
    id: 4,
    question: 'Which of the following areas would typically require maintained emergency lighting?',
    options: [
      'A cinema auditorium',
      'A warehouse storage area',
      'A general office during normal working hours',
      'An external car park',
    ],
    correctAnswer: 0,
    explanation:
      'Maintained emergency lighting is required in areas where sudden darkness would cause particular danger or panic. Cinemas, theatres, and places of entertainment are the classic example — the normal lighting may be dimmed or off during a performance, so the emergency lighting must be maintained (always on) to ensure immediate illumination if evacuation is required. Toilets in public buildings also typically require maintained fittings.',
  },
  {
    id: 5,
    question:
      'What is the typical recharge time required for emergency lighting batteries after a full-duration test?',
    options: ['12 hours', '24 hours', '48 hours', '4 hours'],
    correctAnswer: 1,
    explanation:
      'After a full-duration discharge test, emergency lighting batteries typically require 24 hours to fully recharge. During this recharge period, the emergency lighting system may not be able to provide the full rated duration if a mains failure occurs. This is why full-duration tests should be planned carefully and the responsible person must ensure the premises are not occupied without adequate emergency lighting cover.',
  },
  {
    id: 6,
    question: 'Emergency lighting must be provided at all of the following locations EXCEPT:',
    options: [
      'Changes of direction on escape routes',
      'At each exit door',
      'In every room with windows providing natural light',
      'Near fire alarm call points and fire-fighting equipment',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266-1:2025 requires emergency lighting at specific locations including escape route changes of direction, at each exit door, near fire alarm call points and fire-fighting equipment, at stairways, at changes of floor level, and at final exits. Emergency lighting is NOT required in every room with windows — the requirement is based on the escape route and high-risk areas.',
  },
  {
    id: 7,
    question: "What is an 'open area' or 'anti-panic' emergency luminaire designed to achieve?",
    options: [
      'Illumination of the escape route signage only, leaving the floor area in darkness',
      'Continuous illumination at full normal lighting levels throughout the area',
      'Illumination focused solely on high-risk machinery so it can be shut down safely',
      'Illumination to prevent panic and enable safe movement towards escape routes',
    ],
    correctAnswer: 3,
    explanation:
      'Open area (anti-panic) emergency lighting provides illumination in large open areas to prevent panic and enable occupants to identify and reach escape routes. BS 5266-1:2025 requires a minimum of 0.5 lux at floor level across the open area, excluding a 0.5 m border around the perimeter. This is particularly important in spaces such as open-plan offices, retail floors and reception areas.',
  },
  {
    id: 8,
    question:
      'NiCd (nickel-cadmium) batteries in emergency luminaires are being phased out in favour of:',
    options: [
      'NiMH (nickel-metal hydride) and LiFePO4 (lithium iron phosphate) batteries',
      'Flooded lead-acid (wet cell) batteries with topped-up electrolyte',
      'Alkaline (zinc-manganese) primary cells replaced at each annual test',
      'Sealed nickel-iron (NiFe) batteries with a vented gas outlet',
    ],
    correctAnswer: 0,
    explanation:
      'NiCd batteries contain cadmium, which is toxic and restricted under the EU Battery Directive and WEEE Regulations. NiMH (nickel-metal hydride) and LiFePO4 (lithium iron phosphate) batteries are the preferred replacements. LiFePO4 batteries offer longer life, lighter weight, better high-temperature performance and are cadmium-free. NiMH batteries are also cadmium-free and widely available.',
  },
  {
    id: 9,
    question:
      'Under BS 5266-1:2025, who is responsible for ensuring emergency lighting is properly maintained and tested?',
    options: [
      'The original installing contractor, for the lifetime of the system',
      "The building's responsible person (employer, owner or occupier)",
      'The local fire and rescue service that carries out inspections',
      'The manufacturer of the emergency luminaires under warranty',
    ],
    correctAnswer: 1,
    explanation:
      "The Regulatory Reform (Fire Safety) Order 2005 places the duty on the 'responsible person' — typically the employer, owner or occupier of the premises. They must ensure the emergency lighting system is properly maintained, tested and recorded. They may delegate the testing to a competent person (e.g., a maintenance technician or specialist contractor) but the legal responsibility remains with the responsible person.",
  },
  {
    id: 10,
    question: 'A high-risk task area emergency luminaire must provide a minimum illuminance of:',
    options: [
      '1 lux measured on the centre line of the nearest escape route',
      '0.5 lux across the area, excluding a 0.5 m perimeter border',
      '10% of the normal maintained illuminance or 15 lux, whichever is greater',
      '50% of the normal maintained illuminance or 20 lux, whichever is lower',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266-1:2025 requires that high-risk task areas are illuminated to at least 10% of the normal maintained illuminance or 15 lux (whichever is greater) during an emergency. This ensures that potentially dangerous processes can be safely shut down. The illuminance must be achieved within 0.5 seconds of mains failure. Examples include machinery areas, chemical processing and switchrooms.',
  },
  {
    id: 11,
    question:
      'When recording emergency lighting test results, which of the following must be documented?',
    options: [
      'Only the measured illuminance readings at each luminaire on the day of test',
      'Only the total number of luminaires that failed during the test period',
      'Only the name of the contractor and the next scheduled test date',
      'The date of test, type of test, any defects found and remedial action taken',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5266-1:2025 requires comprehensive records of all emergency lighting tests. The log book must include: the date of each test, the type of test (monthly functional or annual full-duration), the results of the test, details of any defects found, remedial action taken, and the date the remedial work was completed. This log book must be available for inspection by the enforcing authority.',
  },
  {
    id: 12,
    question:
      "What is the purpose of the 'fish-tail' or directional lens on an emergency exit sign luminaire?",
    options: [
      'To ensure the sign is visible from the required viewing distance and angle',
      'To diffuse the light evenly so the sign has no bright or dark patches',
      'To filter the light to the green wavelength specified for safety signs',
      'To concentrate the light downward so the floor below the sign is illuminated',
    ],
    correctAnswer: 0,
    explanation:
      'The directional lens on an emergency exit sign luminaire is designed to ensure the sign is visible from the required viewing distance and angle. BS 5266-1:2025 specifies viewing distances based on sign size — typically the viewing distance should not exceed 200 times the height of the sign for externally illuminated signs, or specific distances based on the luminance for internally illuminated signs.',
  },
];

const faqs = [
  {
    question: 'How do I know if a building needs 1-hour or 3-hour emergency lighting?',
    answer:
      'BS 5266-1:2025 requires 3-hour duration for sleeping accommodation (hotels, hospitals, care homes) and premises that cannot be immediately evacuated and reoccupied. A 1-hour duration is only acceptable where the premises can be evacuated immediately, are not used for sleeping, and will not be reoccupied until the system has fully recharged (typically 24 hours). In practice, most new installations specify 3-hour duration to provide the greatest flexibility and safety margin.',
  },
  {
    question: 'Can I use an automatic test system instead of manual testing?',
    answer:
      'Yes — BS 5266-1:2025 recognises automatic test systems (ATS) as an acceptable alternative to manual testing. ATS can perform both monthly functional tests and annual duration tests automatically, and record the results electronically. However, a visual inspection of the installation must still be carried out periodically to check for physical damage, blocked luminaires, or changes to the building layout that may require additional emergency lighting.',
  },
  {
    question: "What is the difference between 'sustained' and 'maintained' emergency lighting?",
    answer:
      "The terminology can be confusing. Under BS EN 1838: 'Maintained' means the luminaire operates at all times — both on mains and on battery. 'Non-maintained' means the luminaire operates only when the mains fails. 'Sustained' is sometimes used to describe a luminaire with two lamps — one for normal lighting and one for emergency lighting — but this term is not formally defined in BS 5266-1:2025 and its use is discouraged in favour of 'maintained' and 'non-maintained'.",
  },
  {
    question: 'How do I replace the battery in a self-contained emergency luminaire?',
    answer:
      'Isolate the supply to the luminaire and confirm dead. Open the luminaire and locate the battery pack — this is typically a NiCd, NiMH or LiFePO4 pack with a plug-in connector. Disconnect the old battery and connect the new replacement — ensure the voltage, capacity (Ah) and connector type match the original specification. After replacement, the luminaire should be left on charge for at least 24 hours before testing. Dispose of the old battery through a WEEE-compliant recycling route.',
  },
  {
    question: 'What happens if emergency lighting fails during a fire risk assessment inspection?',
    answer:
      'If the enforcing authority (typically the local fire and rescue service) finds that emergency lighting is defective or inadequately maintained during an inspection under the Regulatory Reform (Fire Safety) Order 2005, they can issue an enforcement notice requiring remedial action within a specified period, or in serious cases, a prohibition notice preventing use of the premises until the deficiency is rectified. The responsible person may also face prosecution and fines.',
  },
];

const MOETModule3Section4_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.4 · Subsection 2"
        title="Emergency Lighting Systems"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            BS 5266-1:2025 compliance, system types, testing requirements and maintenance.
          </p>

          <TLDR
            points={[
              'Maintained: always on — non-maintained: battery only on mains failure.',
              'Duration: 1 hour or 3 hours depending on premises use.',
              'Testing: monthly functional + annual full-duration (BS 5266-1:2025).',
              'Escape routes: minimum 1 lux on centre line at floor level.',
            ]}
          />

          <ConceptBlock title="Regulatory context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 5266-1:2025:</strong> Code of practice for emergency lighting. In force
                31 October 2025, superseding BS 5266-1:2016 (now withdrawn).
              </li>
              <li>
                <strong>BS EN 1838:</strong> Lighting applications — emergency lighting.
              </li>
              <li>
                <strong>RRO 2005:</strong> Fire Safety Order — responsible person duties.
              </li>
              <li>
                <strong>ST1426:</strong> Test, maintain and record emergency lighting systems.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the difference between maintained and non-maintained emergency lighting',
              'Compare central battery and self-contained emergency lighting systems',
              'State the duration requirements under BS 5266-1:2025 for different premises types',
              'Describe monthly functional and annual full-duration testing procedures',
              'Identify common faults in emergency lighting systems and their remedies',
              'Explain the logbook recording requirements for emergency lighting',
            ]}
            initialVisibleCount={3}
          />

          <Prerequisites
            items={[
              {
                term: 'Safe isolation',
                gist: 'Identify the supplies, switch off, isolate, and prove dead at the point of work before opening any luminaire or accessing a central battery cabinet.',
                where: '1.1.2',
              },
              {
                term: 'WEEE and hazardous waste disposal',
                gist: 'Discharge batteries and lamps removed during emergency lighting maintenance must go through the correct waste stream, not general waste.',
                where: '3.4.1',
              },
            ]}
          />

          <ContentEyebrow>Emergency lighting fundamentals</ContentEyebrow>

          <ConceptBlock title="Emergency lighting fundamentals">
            <p>
              Emergency lighting is a critical life safety system designed to provide illumination
              when the normal mains lighting fails. Its primary purpose is to enable safe evacuation
              of a building during a mains supply failure, which may coincide with a fire, explosion
              or other emergency. The legal requirement for emergency lighting derives from the
              Regulatory Reform (Fire Safety) Order 2005 (England and Wales), which requires the
              responsible person to ensure that routes to emergency exits and the exits themselves
              are equipped with emergency lighting.
            </p>
            <p>
              BS 5266-1:2025 is the primary code of practice for emergency lighting in the UK,
              setting out the design, installation, wiring, testing and maintenance requirements. It
              came into force on 31 October 2025 and supersedes BS 5266-1:2016, which is now
              withdrawn. BS EN 1838 specifies the photometric requirements — the minimum illuminance
              levels that must be achieved. Together, these standards form the basis for all
              emergency lighting installations and maintenance programmes.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Types of emergency lighting">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Escape route lighting:</strong> Illuminates defined escape routes to enable
                safe and effective evacuation. Minimum 1 lux on centre line at floor level.
                Uniformity ratio max 40:1.
              </li>
              <li>
                <strong>Open area (anti-panic) lighting:</strong> Illuminates large open areas to
                prevent panic and enable safe movement towards escape routes. Minimum 0.5 lux at
                floor level.
              </li>
              <li>
                <strong>High-risk task area lighting:</strong> Illuminates areas where potentially
                dangerous processes must be safely shut down. Minimum 10% of normal illuminance or
                15 lux (whichever is greater).
              </li>
              <li>
                <strong>Standby lighting:</strong> Enables normal activities to continue during a
                mains failure (e.g., hospital operating theatres). Not strictly 'emergency' lighting
                but often part of the same system.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Maintained vs non-maintained"
            onSite="Key point: the choice between maintained and non-maintained depends on the use of the space. As a maintenance technician, you must be able to identify the type of each luminaire and ensure the correct operation mode is maintained."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Non-maintained:</strong> The emergency lamp is OFF during normal conditions
                and only illuminates when the mains supply fails. The battery is continuously
                charged while the mains is available. Most common type in commercial premises.
              </li>
              <li>
                <strong>Maintained:</strong> The emergency lamp is ON at all times — during normal
                mains operation and during mains failure. Required in areas where the normal
                lighting may be dimmed or extinguished (cinemas, theatres) or in toilets and other
                areas with limited natural light.
              </li>
              <li>
                <strong>Combined non-maintained:</strong> The luminaire has two lamps — one for
                normal lighting (mains-powered) and one for emergency lighting (battery-backed). The
                emergency lamp only operates on mains failure.
              </li>
              <li>
                <strong>Combined maintained:</strong> The luminaire has two lamps — one for normal
                lighting and one that operates continuously. Both provide light during normal
                conditions; only the emergency lamp operates during mains failure.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Central battery vs self-contained systems</ContentEyebrow>

          <ConceptBlock title="Central battery vs self-contained systems">
            <p>
              Emergency lighting systems are broadly classified by their power source arrangement:
              self-contained systems where each luminaire has its own battery, and central battery
              systems where a single battery installation supplies multiple luminaires. Each
              approach has distinct advantages and implications for maintenance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Self-contained systems">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Battery, charger and control circuit within each luminaire.</li>
              <li>Simple wiring — connected to normal lighting circuit (permanent live).</li>
              <li>No additional wiring for emergency supply.</li>
              <li>Each unit independent — failure affects only that luminaire.</li>
              <li>Battery replacement required every 3-5 years (typical).</li>
              <li>Individual test buttons or remote test facility.</li>
              <li>Best suited for small to medium installations.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Central battery systems">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Single battery installation in a dedicated plant room.</li>
              <li>Dedicated emergency lighting wiring to each luminaire.</li>
              <li>Centralised monitoring and fault indication.</li>
              <li>Easier battery maintenance (single location).</li>
              <li>Higher initial cost but lower long-term maintenance.</li>
              <li>Battery failure affects all connected luminaires.</li>
              <li>Best suited for large commercial and industrial installations.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Battery types in emergency lighting">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NiCd (Nickel-Cadmium):</strong> Historically the most common. Good
                high-temperature performance. Being phased out due to cadmium toxicity (EU Battery
                Directive).
              </li>
              <li>
                <strong>NiMH (Nickel-Metal Hydride):</strong> Cadmium-free replacement for NiCd.
                Similar performance characteristics. Widely used in current self-contained
                luminaires.
              </li>
              <li>
                <strong>LiFePO4 (Lithium Iron Phosphate):</strong> Longer life (8-10+ years),
                lighter weight, better high-temperature tolerance. Increasingly the preferred choice
                for new installations.
              </li>
              <li>
                <strong>Lead-acid (VRLA):</strong> Used in central battery systems. Lower cost per
                Ah but heavier, shorter life, and temperature-sensitive. Requires ventilation for
                hydrogen gas.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Wiring considerations"
            onSite="Maintenance tip: when maintaining self-contained luminaires, always verify that the permanent live supply is present at each fitting. A common fault is incorrect connection to a switched live, which means the battery is only being charged when the normal lighting is on."
          >
            <p>
              Self-contained emergency luminaires require a permanent live supply (not switched) to
              keep the battery charger energised. This is critical — if the luminaire is connected
              to a switched circuit, turning off the light switch will discharge the battery, and
              the luminaire will not operate when needed. Central battery systems require dedicated
              fire-resistant cabling (typically to BS 8519 or BS 7629) from the central battery to
              each emergency luminaire, as the wiring must survive long enough to maintain the
              emergency lighting during a fire.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Testing and recording requirements</ContentEyebrow>

          <ConceptBlock title="Testing and recording requirements">
            <p>
              Regular testing of emergency lighting is a legal requirement under the Regulatory
              Reform (Fire Safety) Order 2005 and is essential to ensure the system will perform
              when needed. BS 5266-1:2025 sets out a clear testing regime that includes daily visual
              checks, monthly functional tests and annual full-duration tests. All test results must
              be recorded in a log book.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Emergency lighting test schedule (BS 5266-1:2025)">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-white">Test type</th>
                    <th className="border border-white/10 px-3 py-2 text-white">Frequency</th>
                    <th className="border border-white/10 px-3 py-2 text-white">Duration</th>
                    <th className="border border-white/10 px-3 py-2 text-white">What to check</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Daily visual check
                    </td>
                    <td className="border border-white/10 px-3 py-2">Daily</td>
                    <td className="border border-white/10 px-3 py-2">N/A</td>
                    <td className="border border-white/10 px-3 py-2">
                      Indicator lights showing correct operation and charging
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Monthly functional test
                    </td>
                    <td className="border border-white/10 px-3 py-2">Monthly</td>
                    <td className="border border-white/10 px-3 py-2">
                      Brief (sufficient to confirm operation)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Each luminaire illuminates; correct operation of changeover; indicator status
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Annual full-duration test
                    </td>
                    <td className="border border-white/10 px-3 py-2">Annually</td>
                    <td className="border border-white/10 px-3 py-2">
                      Full rated duration (1 hr or 3 hr)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Luminaires still illuminated at end of period; sign visibility; adequate
                      illuminance
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Monthly functional test procedure">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Simulate mains failure by operating the test switch (local test button, key switch,
                or remote test facility).
              </li>
              <li>Confirm each emergency luminaire and exit sign illuminates correctly.</li>
              <li>
                Check the changeover device operates correctly (the luminaire should switch from
                mains to battery).
              </li>
              <li>Restore mains supply and confirm luminaires return to normal mode.</li>
              <li>
                Check charging indicator returns to normal (green LED in most self-contained
                fittings).
              </li>
              <li>Record results in the log book — including any failures and remedial actions.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Annual full-duration test procedure"
            onSite="Key point: automatic test systems (ATS) can automate monthly and annual testing, but a visual inspection is still required periodically to check for physical damage, obscured luminaires, and changes to the building layout."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Plan the test to minimise risk — ensure the building can be safely evacuated during
                the test period.
              </li>
              <li>
                Simulate mains failure and allow the system to run on battery for the full rated
                duration (1 or 3 hours).
              </li>
              <li>
                At the end of the rated period, check that each luminaire is still providing
                adequate illumination.
              </li>
              <li>
                Record any luminaires that have failed or dimmed significantly before the end of the
                test.
              </li>
              <li>
                Restore mains supply and allow the system to fully recharge (typically 24 hours).
              </li>
              <li>
                Ensure the premises are not left without adequate emergency lighting cover during
                the recharge period.
              </li>
              <li>Record all results in the log book, including any remedial actions required.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Log book requirements">
            <p>
              The emergency lighting log book is a legal document and must be kept up to date and
              available for inspection. It must contain: a certificate of completion for the initial
              installation; details of all luminaires (location, type, lamp, battery); a schedule of
              tests; records of all tests carried out (date, type, results, defects, remedial
              action); records of all maintenance and battery replacements; and any alterations or
              additions to the system. The log book must be retained for the life of the
              installation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Common faults and battery replacement</ContentEyebrow>

          <ConceptBlock title="Common faults and battery replacement">
            <p>
              Emergency lighting faults must be treated as urgent — a non-functional emergency
              luminaire represents a direct life safety risk. Maintenance technicians must be able
              to quickly diagnose common faults and carry out repairs, particularly battery
              replacement, which is the most frequent maintenance task on self-contained systems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common faults in self-contained luminaires">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Battery failure:</strong> The most common fault. Batteries have a finite
                life (3-5 years for NiCd/NiMH, 8-10+ years for LiFePO4). Symptoms: luminaire does
                not illuminate on test, or duration is reduced.
              </li>
              <li>
                <strong>Lamp failure:</strong> LED modules can fail. Symptoms: no light output
                despite battery being charged.
              </li>
              <li>
                <strong>Charger failure:</strong> The internal charger stops working. Symptoms:
                battery not charging (indicated by warning LED), luminaire may work briefly but
                fails full-duration test.
              </li>
              <li>
                <strong>Incorrect wiring:</strong> Connected to switched live instead of permanent
                live. Symptoms: battery only charges when normal lighting is on.
              </li>
              <li>
                <strong>Driver/inverter failure:</strong> The electronic driver that powers the LED
                from the battery fails. Symptoms: battery charges but lamp does not illuminate on
                test.
              </li>
              <li>
                <strong>Physical damage:</strong> Impact damage to the luminaire body, diffuser, or
                internal components.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common faults in central battery systems">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Battery degradation:</strong> Lead-acid batteries lose capacity over time.
                Individual cells may fail, reducing overall voltage.
              </li>
              <li>
                <strong>Charger failure:</strong> Rectifier or charger control board failure.
                Symptoms: battery voltage dropping, charging fault alarm.
              </li>
              <li>
                <strong>Earth fault on emergency circuit:</strong> Insulation breakdown on the
                dedicated emergency wiring. Detected by earth fault monitoring.
              </li>
              <li>
                <strong>Changeover relay failure:</strong> The relay that switches luminaires from
                mains to battery supply fails. Symptoms: luminaires do not switch to battery on
                mains failure.
              </li>
              <li>
                <strong>Circuit protection failure:</strong> MCBs or fuses on emergency lighting
                circuits tripping or blowing.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Battery replacement procedure (self-contained)"
            onSite="ST1426 link: the maintenance technician standard requires you to maintain and test emergency lighting systems, identify faults, carry out repairs, and maintain accurate records. Emergency lighting is one of the most commonly assessed areas in the end-point assessment."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Isolate the mains supply to the luminaire and confirm dead.
              </li>
              <li>
                <strong>Step 2:</strong> Open the luminaire housing and locate the battery pack.
              </li>
              <li>
                <strong>Step 3:</strong> Disconnect the old battery (note the connector type and
                polarity).
              </li>
              <li>
                <strong>Step 4:</strong> Verify the replacement battery matches — voltage (V),
                capacity (Ah), connector type, physical size.
              </li>
              <li>
                <strong>Step 5:</strong> Connect the new battery and secure it within the housing.
              </li>
              <li>
                <strong>Step 6:</strong> Close the luminaire and restore the mains supply.
              </li>
              <li>
                <strong>Step 7:</strong> Verify the charging indicator shows normal charging.
              </li>
              <li>
                <strong>Step 8:</strong> Allow 24 hours charging before functional testing.
              </li>
              <li>
                <strong>Step 9:</strong> Dispose of the old battery through WEEE-compliant
                recycling.
              </li>
              <li>
                <strong>Step 10:</strong> Record the replacement in the emergency lighting log book.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 5266-1:2025 is the current code of practice — it came into force 31 October 2025 and supersedes the withdrawn BS 5266-1:2016.',
              'Escape routes: minimum 1 lux on the centre line; open areas: minimum 0.5 lux; high-risk task areas: 10% of normal illuminance or 15 lux, whichever is greater.',
              'Duration is 1 hour or 3 hours — 3 hours applies to sleeping accommodation and premises that cannot be evacuated and reoccupied immediately.',
              'Testing regime: monthly functional test (brief) plus annual full-duration test (the full rated 1 or 3 hours), both logged.',
              'Self-contained luminaires need a permanent (unswitched) live supply — connection to a switched live is a common and serious fault.',
              'NiCd batteries are being phased out (EU Battery Directive, cadmium) in favour of NiMH and LiFePO4.',
              'The responsible person under the Regulatory Reform (Fire Safety) Order 2005 carries the legal duty, even where testing is delegated to a competent person.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section4-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  General Lighting Circuits
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section4-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Socket Outlet and Small Power Circuits
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section4_2;
