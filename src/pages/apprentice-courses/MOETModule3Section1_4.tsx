/**
 * MOET · Module 3 · Section 3.1 · Subsection 4 — Busbars and Cabling Systems
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
 *   · "Electrical. Different types of cables; their specifications and
 *     application."
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *     requirements: removing and replacing parts, inspecting, testing,
 *     setting up, adjusting, cleaning, and functional testing."
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

const TITLE = 'Busbars and Cabling Systems - MOET Module 3 Section 1.4';
const DESCRIPTION =
  'Busbar types, busbar trunking, rising mains, cable containment systems, fire barriers and thermal imaging for maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'busbar-material',
    question: 'What is the approximate electrical conductivity of aluminium compared to copper?',
    options: ['61% of copper', '85% of copper', '40% of copper', '25% of copper'],
    correctIndex: 0,
    explanation:
      'Aluminium has approximately 61% of the electrical conductivity of copper (measured against the IACS standard). This means aluminium busbars must have a larger cross-sectional area to carry the same current as copper equivalents.',
  },
  {
    id: 'trunking-type',
    question:
      'Which type of busbar trunking provides tap-off points at regular intervals for connecting loads?',
    options: [
      'Feeder busbar trunking',
      'Rising main trunking',
      'Plug-in busbar trunking',
      'Lighting trunking',
    ],
    correctIndex: 2,
    explanation:
      'Plug-in busbar trunking has tap-off openings at regular intervals along its length, allowing distribution boards, motor starters or other loads to be connected at any position. This provides excellent flexibility for future modifications.',
  },
  {
    id: 'cable-fill',
    question: 'What is the commonly used maximum fill percentage guideline for cable tray?',
    options: ['45%', '60%', '35%', '25%'],
    correctIndex: 0,
    explanation:
      'A maximum fill of approximately 45% of the tray cross-sectional area is the common guideline. This ensures adequate ventilation around cables (preserving current ratings), leaves space for future additions, and keeps maintenance access practical.',
  },
  {
    id: 'thermal-load',
    question:
      'At what minimum load percentage should thermal imaging surveys be conducted for reliable results?',
    options: ['10%', '20%', '80%', '40%'],
    correctIndex: 3,
    explanation:
      'Thermal surveys should be conducted with equipment under at least 40% of normal load. Higher loads generate larger temperature differentials between sound and faulty connections, producing more reliable and meaningful results.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary advantage of copper busbars over aluminium?',
    options: [
      'Lower weight for the same current-carrying capacity',
      'Higher electrical conductivity and easier jointing',
      'Lower material cost per metre of busbar',
      'A higher coefficient of thermal expansion at joints',
    ],
    correctAnswer: 1,
    explanation:
      "Copper has approximately 100% IACS conductivity compared to aluminium's 61%. Copper joints are also simpler because copper does not form the resistive oxide layer that makes aluminium jointing more complex.",
  },
  {
    id: 2,
    question: 'Why do aluminium busbar joints require contact compound such as Penetrox?',
    options: [
      'To increase the conductivity of the aluminium above that of copper',
      'To lubricate the bolts so a higher tightening torque can be achieved',
      'To prevent oxide reformation and reduce contact resistance',
      'To electrically insulate the joint from the surrounding enclosure',
    ],
    correctAnswer: 2,
    explanation:
      'Aluminium rapidly forms a hard, resistive oxide layer on its surface. Contact compound prevents this oxide reforming after the surface has been prepared, maintaining low contact resistance at the joint.',
  },
  {
    id: 3,
    question: 'What current range is typical for feeder busbar trunking?',
    options: ['100 A to 400 A', '25 A to 63 A', '10 A to 32 A', '800 A to 5000 A'],
    correctAnswer: 3,
    explanation:
      'Feeder busbar trunking typically carries 800 A to 5000 A. It transfers power from the main switchboard to sub-distribution points and has no tap-off points along its length.',
  },
  {
    id: 4,
    question: 'What is a rising main?',
    options: [
      'A vertical busbar trunking system distributing power through a multi-storey building',
      'The incoming service cable that rises from the supply network into a building',
      'A horizontal feeder cable running between two adjacent switchboards',
      'The main earthing conductor connecting the installation to the earth electrode',
    ],
    correctAnswer: 0,
    explanation:
      'A rising main is a vertical busbar trunking system that rises through a dedicated riser shaft from the main switchroom, with tap-off points at each floor level feeding the floor distribution boards.',
  },
  {
    id: 5,
    question: 'What is the key difference between cable tray and cable ladder?',
    options: [
      'Cable ladder is only permitted for data cabling, not power cables',
      'Cable ladder is a heavy-duty version designed for large, heavy cables',
      'Cable ladder must be fully enclosed whereas tray is always perforated',
      'Cable ladder is non-metallic whereas cable tray is always steel',
    ],
    correctAnswer: 1,
    explanation:
      'Cable ladder has parallel side rails with cross rungs and is designed for heavy cables such as HV cables and large sub-main cables. Cable tray is lighter-duty and suitable for general cable support.',
  },
  {
    id: 6,
    question: 'Where are fire barriers required in cable installations?',
    options: [
      'Only at the origin of the installation next to the main switch',
      'At every cable joint and termination throughout the installation',
      'Where cables pass through fire-rated walls, floors and partitions',
      'Only on cables installed outdoors or in exposed locations',
    ],
    correctAnswer: 2,
    explanation:
      'Fire barriers (penetration seals) are required wherever cables and containment pass through fire-rated structures. They restore the fire integrity of the building element to prevent fire and smoke spread.',
  },
  {
    id: 7,
    question: 'Which legislation governs fire barrier maintenance in buildings?',
    options: [
      'The Electricity at Work Regulations 1989',
      'The Construction (Design and Management) Regulations 2015',
      'The Provision and Use of Work Equipment Regulations 1998',
      'The Regulatory Reform (Fire Safety) Order 2005',
    ],
    correctAnswer: 3,
    explanation:
      "The Regulatory Reform (Fire Safety) Order 2005 requires fire barriers and penetration seals to be maintained as part of the building's fire safety management. Breached fire barriers must be re-sealed to the original fire rating.",
  },
  {
    id: 8,
    question: 'What does a Delta T of 25-40 degrees C on a thermal image indicate?',
    options: [
      'Serious fault -- arrange maintenance as soon as possible',
      'A healthy connection within normal operating temperature',
      'Minor anomaly -- monitor at the next scheduled survey',
      'Critical fault -- isolate the equipment immediately',
    ],
    correctAnswer: 0,
    explanation:
      'A Delta T of 25-40 degrees C indicates a serious developing fault. Maintenance should be arranged as soon as possible and load reduction should be considered to prevent failure.',
  },
  {
    id: 9,
    question: 'What is the main advantage of wire mesh cable basket over traditional cable tray?',
    options: [
      'A higher load-carrying capacity for very heavy HV cables',
      'Lighter weight, easier installation and better ventilation',
      'A built-in fire rating that removes the need for penetration seals',
      'A fully enclosed design giving better protection against impact',
    ],
    correctAnswer: 1,
    explanation:
      'Wire mesh cable basket is lighter, quicker to install, provides excellent ventilation around cables, and is more economical. It is well suited to data cables and small power cables.',
  },
  {
    id: 10,
    question: 'Why are copper busbars sometimes tin-plated or silver-plated?',
    options: [
      'To increase the conductivity of the copper above 100% IACS',
      'To reduce the weight of the busbar for easier installation',
      'To improve contact resistance at joints and protect against oxidation',
      'To allow the busbar to be directly bolted to aluminium without corrosion',
    ],
    correctAnswer: 2,
    explanation:
      'Tin or silver plating improves contact resistance at bolted joints and provides a protective barrier against copper oxidation, extending the service life of busbar connections.',
  },
  {
    id: 11,
    question: 'What must happen if cables are added through an existing fire barrier?',
    options: [
      'The new cables must be derated by 45% to allow for the barrier',
      'The fire rating of the entire building must be downgraded by 30 minutes',
      'No action is needed provided the original seal is still in place',
      'The barrier must be re-sealed to its original fire rating',
    ],
    correctAnswer: 3,
    explanation:
      'If cables are added through a fire barrier, the barrier must be re-sealed using approved materials to restore its original fire rating. A fire stop certificate should be issued for the work.',
  },
  {
    id: 12,
    question:
      'How often should thermal imaging surveys typically be carried out on main switchboards?',
    options: ['Annually', 'Only after a fault occurs', 'Every 5 years', 'Monthly'],
    correctAnswer: 0,
    explanation:
      'Annual thermal surveys are recommended for main switchboards and distribution equipment. Critical installations such as hospitals and data centres may require more frequent surveys (six-monthly or quarterly).',
  },
];

const faqs = [
  {
    question: 'Why do aluminium busbar joints require special preparation?',
    answer:
      'Aluminium forms a hard, resistive oxide layer on its surface within seconds of exposure to air. This oxide increases contact resistance at joints and can lead to overheating. Joints must have the oxide removed immediately before assembly, be treated with contact compound (e.g., Penetrox), be assembled with the correct torque using suitable hardware (often bimetallic connectors when joining to copper), and be re-torqued after the initial thermal cycling.',
  },
  {
    question: 'What is the difference between cable tray and cable ladder?',
    answer:
      'Cable tray is a perforated or ventilated channel for general cable support, suitable for most power and data cable installations. Cable ladder is a heavy-duty variant with parallel side rails and cross rungs, designed for large, heavy cables such as HV cables and large sub-main cables where the weight would exceed the capacity of standard tray.',
  },
  {
    question: 'Who can re-seal a fire barrier after adding cables?',
    answer:
      'Fire barrier installation and re-sealing should be carried out by trained personnel using approved materials and methods specified by the fire stop manufacturer. The work must be documented with a fire stop certificate. It is a legal requirement under the Regulatory Reform (Fire Safety) Order 2005 and is routinely checked during periodic electrical inspections.',
  },
  {
    question: 'How often should thermal imaging surveys be carried out?',
    answer:
      'Annual thermal surveys are recommended for main switchboards and distribution equipment in most commercial and industrial installations. Critical facilities such as hospitals, data centres and manufacturing plants may require six-monthly or quarterly surveys. Newly commissioned installations should have an initial survey after the first year of operation.',
  },
  {
    question: 'Can I mix copper and aluminium busbars in the same installation?',
    answer:
      'Yes, but bimetallic joints require special treatment to prevent galvanic corrosion. Where copper and aluminium conductors are connected, bimetallic connectors or transition pads must be used. Direct bolting of copper to aluminium without bimetallic isolation will cause accelerated corrosion and eventual joint failure.',
  },
];

const MOETModule3Section1_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.1 · Subsection 4"
        title="Busbars and Cabling Systems"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Busbar types, trunking, rising mains, cable containment and thermal imaging for
            maintenance.
          </p>

          <TLDR
            points={[
              'Copper: 100% IACS conductivity, excellent jointing properties.',
              'Aluminium: 61% IACS, lighter but requires oxide preparation.',
              'Trunking: feeder, plug-in and lighting variants.',
              'Thermal imaging: minimum 40% load for reliable surveys.',
              'Joints: torque, compound and re-torque after thermal cycling.',
              'Fire barriers: must be maintained at cable penetrations.',
              'Cable fill: 45% maximum for adequate ventilation.',
              'ST1426: maps to electrical plant knowledge KSBs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Compare the properties and applications of copper and aluminium busbars',
              'Describe busbar trunking systems including rising mains',
              'Identify cable containment types and their selection criteria',
              'Explain fire barrier requirements for cable penetrations',
              'Outline thermal imaging principles for busbar joint inspection',
              'Describe maintenance procedures for busbar systems and containment',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Busbar types and materials</ContentEyebrow>

          <ConceptBlock title="The power distribution backbone">
            <p>
              Busbars are rigid conductors that carry large currents within switchgear assemblies,
              panel boards and between distribution equipment. They form the power distribution
              backbone of commercial and industrial installations, carrying currents from hundreds
              to several thousands of amperes. Unlike cables, busbars are designed for fixed
              installation and offer low impedance, compact form and high current density.
            </p>
            <p>
              The two principal busbar materials are copper and aluminium, each with distinct
              properties that make them suitable for different applications. The selection between
              them depends on current capacity, space constraints, weight limitations, environmental
              conditions and cost.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Copper busbars">
            <p>
              Copper is the traditional and most widely used busbar material. It has excellent
              electrical conductivity (approximately 100% IACS — International Annealed Copper
              Standard), good thermal conductivity, excellent corrosion resistance and high
              mechanical strength.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cross-sections:</strong> typically rectangular, ranging from 15 mm x 3 mm
                for small boards to 120 mm x 10 mm or multiple bars per phase for large switchboards
              </li>
              <li>
                <strong>Plating:</strong> often tin-plated or silver-plated to improve contact
                resistance at joints and protect against oxidation
              </li>
              <li>
                <strong>Current capacity:</strong> depends on cross-section, number of bars per
                phase, ambient temperature and ventilation
              </li>
              <li>
                <strong>Typical applications:</strong> main switchboards, motor control centres,
                power distribution in critical facilities
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Aluminium busbars">
            <p>
              Aluminium busbars are lighter (approximately 30% of the weight of copper for
              equivalent current capacity) and less expensive, making them attractive for large
              installations. However, aluminium has only approximately 61% of the conductivity of
              copper, requiring larger cross-sections.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Oxide layer:</strong> aluminium rapidly forms a hard, resistive oxide
                (Al2O3) that increases contact resistance at joints
              </li>
              <li>
                <strong>Joint preparation:</strong> requires oxide removal immediately before
                assembly, contact compound (e.g., Penetrox), bimetallic connectors for
                copper-to-aluminium connections, and specific torque values
              </li>
              <li>
                <strong>Thermal expansion:</strong> higher coefficient of thermal expansion than
                copper; joints must accommodate movement
              </li>
              <li>
                <strong>Typical applications:</strong> large panel boards, busbar trunking, overhead
                line conductors
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Copper vs aluminium"
            onSite="When copper and aluminium are joined directly, galvanic corrosion will occur due to their different positions in the electrochemical series. Bimetallic connectors or transition pads must always be used at copper-to-aluminium connections."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Property</th>
                    <th className="py-2 pr-4 font-medium text-white">Copper</th>
                    <th className="py-2 font-medium text-white">Aluminium</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Conductivity (% IACS)</td>
                    <td className="py-2 pr-4">100%</td>
                    <td className="py-2">61%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Density (kg/m3)</td>
                    <td className="py-2 pr-4">8,900</td>
                    <td className="py-2">2,700</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Oxide behaviour</td>
                    <td className="py-2 pr-4">Conductive, self-limiting</td>
                    <td className="py-2">Resistive, requires preparation</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Relative cost</td>
                    <td className="py-2 pr-4">Higher</td>
                    <td className="py-2">Lower</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Busbar trunking and rising mains</ContentEyebrow>

          <ConceptBlock title="A prefabricated alternative to parallel cable runs">
            <p>
              Busbar trunking (also called busway) is a prefabricated power distribution system
              consisting of busbars enclosed in a protective housing. It provides a flexible and
              efficient alternative to large parallel cable runs for distributing power through
              buildings. Busbar trunking is manufactured in standard lengths with factory-tested
              joints, ensuring consistent quality and rapid installation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Feeder busbar trunking">
            <p>
              High-current trunking typically rated from 800 A to 5000 A. Used to transfer power
              from the main switchboard to sub-distribution points. There are no tap-off points
              along its length — power is taken off only at the ends. Feeder trunking provides the
              lowest impedance path for high-current distribution and is commonly used in industrial
              plants and large commercial buildings.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Plug-in busbar trunking">
            <p>
              Medium-current trunking typically rated from 100 A to 1600 A with tap-off points at
              regular intervals (usually every 0.5 m or 1.0 m). Allows distribution boards, motor
              starters or other loads to be connected at any tap-off position, providing excellent
              flexibility for layout changes and future expansion. Plug-in units can be hot-swapped
              on some systems without shutting down the trunking.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Lighting trunking">
            <p>
              Low-current trunking typically rated from 25 A to 63 A, designed specifically for
              lighting distribution in industrial and commercial buildings. Tap-off units allow
              individual luminaires or lighting circuits to be connected along the trunking run.
              Lighting trunking often doubles as the mechanical support for the luminaires,
              eliminating the need for separate suspension systems.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Rising mains"
            onSite="Rising main maintenance includes checking the tightness of all joint bolts (using calibrated torque equipment), inspecting tap-off units for signs of overheating, verifying that fire barriers at each floor penetration are intact, and performing thermal imaging of joints under load."
          >
            <p>
              A rising main is a vertical busbar trunking system that distributes power through
              multi-storey buildings. It rises through a dedicated riser shaft from the main
              switchroom to each floor, with tap-off points at each floor level feeding the floor
              distribution boards. Rising mains offer significant advantages over cable-based
              risers:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Compact:</strong> requires less riser shaft space than equivalent cable
                installations
              </li>
              <li>
                <strong>Modular:</strong> easier to install in stages as floors are completed
              </li>
              <li>
                <strong>Flexible:</strong> tap-off units can be added or changed without re-cabling
              </li>
              <li>
                <strong>Low impedance:</strong> better voltage regulation and power quality than
                long cable runs
              </li>
              <li>
                <strong>Maintenance:</strong> joints accessible at each floor; thermal imaging
                identifies developing faults
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Cable containment systems</ContentEyebrow>

          <ConceptBlock title="Support, protection and organisation for cable routes">
            <p>
              Cable containment systems support, protect and organise cables as they route between
              distribution equipment and final circuits. The choice of containment directly affects
              cable current ratings (through grouping and thermal derating factors applied in
              accordance with BS 7671 Appendix 4), ease of maintenance, fire performance and the
              ability to accommodate future additions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Cable tray">
            <p>
              A ladder-like or perforated metal channel that supports cables. Available in
              galvanised steel, stainless steel and aluminium. Cable tray provides good ventilation
              around cables (improving current ratings compared to enclosed containment), is easy to
              install and modify, and allows cables to be visually inspected without removal. Tray
              width is selected based on the number and size of cables, with consideration of space
              factors and future expansion.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Cable ladder">
            <p>
              A heavy-duty version of cable tray consisting of parallel side rails connected by
              cross rungs. Cable ladder is designed for large, heavy cables where the weight would
              exceed the capacity of standard tray. Typically used for HV cables, large LV sub-main
              cables and heavy industrial cable routes. The open rung design provides excellent
              ventilation and allows cables to be secured individually with cable cleats at each
              rung.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Wire mesh cable basket">
            <p>
              An increasingly popular alternative to traditional tray. Wire mesh basket is lighter,
              faster to install, provides excellent ventilation and is more economical. It is well
              suited to data cables, small power cables and mixed services. However, it may not be
              suitable for very heavy cables due to its lower load-carrying capacity compared to
              steel tray or ladder.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Containment sizing"
            onSite="Cable grouping factors (Table 4C1) and thermal insulation factors must be applied when calculating the current-carrying capacity of cables in containment. The installation method directly determines the applicable rating from Appendix 4."
          >
            <p>
              When sizing cable containment, the space factor must be considered. For cable tray,
              cables should not be stacked more than one layer deep for optimum current ratings. A
              maximum fill of 45% of the tray cross-sectional area is a common guideline.
              Overcrowded containment restricts ventilation, reduces cable current ratings
              (requiring larger cables), and makes maintenance difficult. Always allow a minimum of
              25% spare capacity for future additions.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Fire barriers and penetration seals</ContentEyebrow>

          <ConceptBlock title="Restoring the fire integrity a cable penetration breaks">
            <p>
              Where cables and containment pass through fire-rated walls, floors and partitions, the
              fire integrity of the building structure must be maintained. This requires fire
              barriers (also called fire stops or penetration seals) that restore the fire rating of
              the structural element. Without effective fire barriers, cable penetrations create
              pathways for fire and smoke to spread between compartments, undermining the
              building&rsquo;s passive fire protection.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Fire barrier requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fire rating:</strong> must match the rating of the structure penetrated
                (typically 30, 60, 90 or 120 minutes)
              </li>
              <li>
                <strong>Materials:</strong> intumescent pillows (expand when heated), fire-resistant
                sealant, fire-rated boards (mineral fibre or calcium silicate), intumescent wraps
                for individual cables
              </li>
              <li>
                <strong>Documentation:</strong> fire stop certificates must be issued for each
                installation
              </li>
              <li>
                <strong>Inspection:</strong> regular checks to ensure barriers have not been
                breached by subsequent works
              </li>
              <li>
                <strong>Legislation:</strong> Regulatory Reform (Fire Safety) Order 2005 and
                Building Regulations Approved Document B
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="A fire barrier gets breached and never re-sealed"
            whatHappens={
              <>
                During maintenance work, additional cables are routed through a fire barrier and it
                is not re-sealed. Breached fire barriers have been identified as a contributing
                factor in the spread of fire in multiple building fire investigations.
              </>
            }
            doInstead={
              <>
                Always check that fire barriers have not been compromised. If additional cables are
                routed through a fire barrier, it must be re-sealed to its original fire rating
                using approved materials and methods. This is a legal requirement and a key item on
                periodic inspection reports (BS 7671 Regulation 421.7).
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Thermal imaging for busbar joints</ContentEyebrow>

          <ConceptBlock title="Seeing the heat before it becomes a failure">
            <p>
              Thermal imaging (infrared thermography) is one of the most valuable predictive
              maintenance techniques for electrical systems, particularly for busbar joints and
              connections. A thermal imaging camera detects infrared radiation emitted by objects
              and converts it into a visible image showing temperature variations. In electrical
              systems, a high-resistance connection generates excess heat visible as a &quot;hot
              spot&quot;.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Hot spot classification">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Delta T</th>
                    <th className="py-2 pr-4 font-medium text-white">Severity</th>
                    <th className="py-2 font-medium text-white">Action required</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">1-10 degrees C</td>
                    <td className="py-2 pr-4">Monitor</td>
                    <td className="py-2">Schedule maintenance during next planned shutdown</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">10-25 degrees C</td>
                    <td className="py-2 pr-4">Significant</td>
                    <td className="py-2">Plan maintenance within weeks; increase monitoring</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">25-40 degrees C</td>
                    <td className="py-2 pr-4">Serious</td>
                    <td className="py-2">Arrange maintenance ASAP; consider load reduction</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Above 40 degrees C</td>
                    <td className="py-2 pr-4">Critical</td>
                    <td className="py-2">Immediate action; risk of failure, fire or damage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Best practice for thermal surveys"
            onSite="Regular thermal imaging identifies deteriorating connections before they fail catastrophically. A single busbar joint failure can cause a complete installation outage, arc flash injuries and significant fire damage. Prevention through thermal imaging is far more cost-effective than reactive repair."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Load:</strong> equipment under at least 40% of normal load (higher is
                better)
              </li>
              <li>
                <strong>Access:</strong> panel doors open or removed for direct line of sight
              </li>
              <li>
                <strong>Conditions:</strong> consistent ambient temperatures; avoid direct sunlight
                or draughts
              </li>
              <li>
                <strong>Competence:</strong> trained and competent thermographers (Category 1 or 2
                certified)
              </li>
              <li>
                <strong>Documentation:</strong> thermal images, temperature data, load conditions
                and recommended actions
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Copper: 100% IACS, 8,900 kg/m3. Aluminium: 61% IACS, 2,700 kg/m3.',
              'Bimetallic joints are required for copper-to-aluminium connections; contact compound is required for aluminium joints.',
              'Feeder trunking 800-5000 A; plug-in trunking 100-1600 A with tap-offs; lighting trunking 25-63 A.',
              'Cable tray fill: 45% maximum guideline, minimum 25% spare capacity for future additions.',
              'Fire barriers must be re-sealed to their original rating whenever cables are added — a Regulatory Reform (Fire Safety) Order 2005 requirement.',
              'Thermal surveys need a minimum of 40% load. Delta T 1-10 degrees C = monitor; Delta T 25-40 degrees C = serious; Delta T above 40 degrees C = critical.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section1-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Circuit Breaker Operations
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section1-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Isolation and Switching Devices
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section1_4;
