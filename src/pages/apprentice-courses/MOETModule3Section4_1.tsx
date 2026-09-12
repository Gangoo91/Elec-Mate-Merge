/**
 * MOET · Module 3 · Section 3.4 · Subsection 1 — General Lighting Circuits
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
 *   · "Electrical. Functions and applications of electrical circuits."
 *   · "Electrical. Different types of cables; their specifications and
 *      application."
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *      requirements: removing and replacing parts, inspecting, testing,
 *      setting up, adjusting, cleaning, and functional testing."
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
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'General Lighting Circuits - MOET Module 3.4.1';
const DESCRIPTION =
  'Comprehensive guide to general lighting circuits for maintenance technicians: radial and loop-in wiring, switching arrangements, dimming, lighting control systems, lux levels, luminaire types and maintenance procedures under BS 7671 and ST1426.';

const quickCheckQuestions = [
  {
    id: 'loop-in-wiring',
    question:
      'In a loop-in lighting circuit, where are the connections between the supply, switch and luminaire made?',
    options: [
      'At a separate junction box in the ceiling void above each light',
      'Inside the consumer unit at the origin of the circuit',
      'At the ceiling rose or luminaire terminal',
      'At the light switch behind the faceplate',
    ],
    correctIndex: 2,
    explanation:
      'In loop-in wiring, the supply, switch wire and luminaire connections are all made at the ceiling rose or luminaire terminal. This eliminates the need for separate junction boxes, reducing material costs and the number of connection points that could develop faults over time.',
  },
  {
    id: 'two-way-switching',
    question:
      'How many conductors (excluding earth) are required between the two switches in a two-way switching arrangement?',
    options: ['Three conductors', 'Two conductors', 'Four conductors', 'Five conductors'],
    correctIndex: 0,
    explanation:
      'A two-way switching arrangement requires three conductors between the two switches: one common terminal wire and two strappers (travellers). The common terminal on one switch receives the supply, and the common terminal on the other connects to the luminaire. The two strappers connect L1 to L1 and L2 to L2 between the switches.',
  },
  {
    id: 'pir-sensor',
    question: 'What does a PIR sensor detect in order to trigger a lighting circuit?',
    options: [
      'The ambient light level measured in lux across the room',
      'Changes in infrared radiation caused by movement of warm bodies',
      'Ultrasonic sound waves reflected from moving objects',
      'The Doppler shift of an emitted microwave signal',
    ],
    correctIndex: 1,
    explanation:
      'A PIR (Passive Infrared) sensor detects changes in infrared radiation within its field of view. When a warm body (person) moves through the detection zone, the change in infrared energy triggers the sensor. PIR sensors are passive because they detect existing infrared radiation rather than emitting any signal of their own.',
  },
  {
    id: 'lux-levels',
    question:
      'According to CIBSE guidelines, what is the recommended maintained illuminance for a general office area?',
    options: ['100 lux', '200 lux', '300 lux', '500 lux'],
    correctIndex: 3,
    explanation:
      'CIBSE (Chartered Institution of Building Services Engineers) recommends a maintained illuminance of 500 lux for general office areas. This is the minimum illuminance on the working plane that should be maintained throughout the life of the installation, accounting for lamp depreciation and luminaire dirt accumulation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'In a radial lighting circuit, which of the following best describes the cable routing?',
    options: [
      'The cable forms a complete loop back to the consumer unit',
      'The cable runs from the consumer unit to each luminaire in sequence, terminating at the last point',
      'Each luminaire has its own dedicated cable from the consumer unit',
      'The cable runs in a star configuration from a central junction box',
    ],
    correctAnswer: 1,
    explanation:
      'A radial lighting circuit runs from the consumer unit to each luminaire in sequence along a single cable route, terminating at the last point on the circuit. This is the most common arrangement for domestic and small commercial lighting circuits. Unlike a ring circuit, there is no return path back to the origin.',
  },
  {
    id: 2,
    question:
      'What is the maximum number of points typically recommended on a single domestic lighting circuit protected by a 6 A MCB?',
    options: ['12 points', '6 points', '10 points', '8 points'],
    correctAnswer: 2,
    explanation:
      'BS 7671 Guidance Note 1 and the IET On-Site Guide recommend a maximum of approximately 10-12 lighting points per circuit, assuming each point draws around 100 W. However, with modern LED luminaires drawing much less power, the limitation is more often the cable volt drop or the number of connections rather than the total load.',
  },
  {
    id: 3,
    question:
      'In a three-plate ceiling rose using loop-in wiring, what is connected to the middle terminal block?',
    options: [
      'The switched live conductor returning from the light switch',
      'The circuit protective conductors from each of the cables',
      'The neutral conductors of the incoming and outgoing cables',
      'The permanent live conductors (loop terminals)',
    ],
    correctAnswer: 3,
    explanation:
      "In a three-plate ceiling rose, the middle terminal block typically carries the permanent live conductors — the incoming live, the outgoing live to the next point, and the live feed to the switch. This is the 'loop' terminal that gives the system its name, as the live supply loops through each ceiling rose.",
  },
  {
    id: 4,
    question: 'An intermediate switch is required when controlling a light from:',
    options: [
      'Three or more locations',
      'Two locations',
      'A single location with a dimmer',
      'An external location only',
    ],
    correctAnswer: 0,
    explanation:
      'An intermediate switch is used when a light needs to be controlled from three or more locations. Two two-way switches are used at the first and last positions, and intermediate switches are placed at each position in between. The intermediate switch has four terminals and effectively cross-connects the two strappers.',
  },
  {
    id: 5,
    question: 'Which type of dimmer is most suitable for use with LED luminaires?',
    options: [
      'Leading-edge (triac) dimmer',
      'Trailing-edge dimmer',
      'Autotransformer dimmer',
      'Rheostat dimmer',
    ],
    correctAnswer: 1,
    explanation:
      'Trailing-edge dimmers are the most suitable type for LED luminaires. They switch off at the trailing edge of the AC waveform, producing a smoother and quieter operation with LEDs. Leading-edge (triac) dimmers were designed for resistive and inductive loads and can cause flickering, buzzing and premature failure when used with many LED drivers.',
  },
  {
    id: 6,
    question: 'What does the DALI protocol stand for in lighting control?',
    options: [
      'Direct Analogue Lighting Interconnect',
      'Distributed Automated Lighting Integration',
      'Digital Addressable Lighting Interface',
      'Dynamic Adaptive Luminaire Intelligence',
    ],
    correctAnswer: 2,
    explanation:
      'DALI stands for Digital Addressable Lighting Interface (IEC 62386). It is an international standard for digital lighting control that allows individual luminaires to be addressed, grouped and controlled independently. DALI uses a two-wire control bus that can run alongside the mains supply cabling.',
  },
  {
    id: 7,
    question:
      'According to CIBSE SLL Code for Lighting, what is the recommended maintained illuminance for a corridor or circulation area?',
    options: ['50 lux', '300 lux', '200 lux', '100 lux'],
    correctAnswer: 3,
    explanation:
      'CIBSE recommends 100 lux as the maintained illuminance for corridors and circulation areas. This provides adequate light for safe movement without the higher levels required for detailed task work. Stairwells and escape routes may require different levels, and emergency lighting must provide a minimum of 1 lux on the centre line of escape routes.',
  },
  {
    id: 8,
    question:
      'When replacing a fluorescent lamp, what should a maintenance technician check FIRST?',
    options: [
      'That the circuit is isolated and confirmed dead',
      'The wattage rating of the replacement',
      'The colour temperature of the replacement lamp',
      'Whether the ballast is electronic or magnetic',
    ],
    correctAnswer: 0,
    explanation:
      'The first action must always be to isolate the circuit and confirm it is dead using an approved voltage indicator, tested before and after use on a known live source (proving unit). This is a fundamental safe isolation procedure required by the EAWR 1989 Regulation 12. Only after confirming the circuit is dead should the technician proceed with lamp replacement.',
  },
  {
    id: 9,
    question: 'A daylight-linked lighting control system uses which type of sensor?',
    options: ['PIR sensor', 'Photocell (lux sensor)', 'Microwave sensor', 'Ultrasonic sensor'],
    correctAnswer: 1,
    explanation:
      'Daylight-linked systems use a photocell (lux sensor) to measure the ambient light level and adjust the artificial lighting output accordingly. As natural daylight increases, the artificial lighting dims or switches off; as daylight decreases, the lighting increases. This can reduce lighting energy consumption by 30-60% in areas with good daylight.',
  },
  {
    id: 10,
    question: 'What is the typical cable size used for a domestic lighting circuit in the UK?',
    options: [
      '1.0 mm² twin and earth',
      '4.0 mm² twin and earth',
      '1.5 mm² twin and earth',
      '2.5 mm² twin and earth',
    ],
    correctAnswer: 2,
    explanation:
      'Domestic lighting circuits in the UK typically use 1.5 mm² twin and earth cable (or 1.0 mm² in some installations). The choice depends on the circuit length, volt drop, and the protective device rating. BS 7671 requires that the cable is adequately rated for the design current and that volt drop limits are not exceeded.',
  },
  {
    id: 11,
    question:
      'Which of the following is NOT a benefit of using occupancy sensors in lighting control?',
    options: [
      'Reduced energy consumption in infrequently used areas',
      'Extended lamp life through reduced operating hours',
      'Compliance with Building Regulations Part L',
      'Increased light output from luminaires',
    ],
    correctAnswer: 3,
    explanation:
      'Occupancy sensors reduce energy consumption by switching off or dimming lights in unoccupied areas. They extend lamp life by reducing operating hours, and help achieve compliance with Building Regulations Part L (conservation of fuel and power). They do not increase light output — this is determined by the luminaire and lamp specifications.',
  },
  {
    id: 12,
    question:
      'When maintaining luminaires, what is the primary reason for regular cleaning of reflectors and diffusers?',
    options: [
      'To maintain the designed lux levels on the working plane',
      'To comply with PAT testing requirements',
      'To prevent overheating of the luminaire',
      'To prevent the growth of bacteria',
    ],
    correctAnswer: 0,
    explanation:
      'Regular cleaning of reflectors and diffusers is essential to maintain the designed lux levels on the working plane. Dirt accumulation on luminaire surfaces reduces light output — this is accounted for in lighting design as the Luminaire Maintenance Factor (LMF). Without regular cleaning, actual lux levels will fall below the maintained illuminance required by CIBSE guidelines.',
  },
];

const faqs = [
  {
    question: 'What is the difference between loop-in and junction box wiring?',
    answer:
      'In loop-in wiring, all connections are made at the ceiling rose or luminaire terminal, with the supply cable looping from one fitting to the next. In junction box wiring, a separate junction box is used to make the connections between the supply, switch drop and luminaire drop. Loop-in is the more modern and common method as it requires fewer junction boxes and is easier to maintain, though junction box wiring can be simpler for complex switching arrangements.',
  },
  {
    question: 'Can I use a standard dimmer switch with LED lamps?',
    answer:
      "Not all dimmers are compatible with LED lamps. Standard leading-edge (triac) dimmers designed for incandescent and halogen loads can cause flickering, buzzing and reduced lamp life when used with LEDs. You should use a trailing-edge dimmer specifically rated for LED loads, and check the LED lamp manufacturer's compatibility list. The minimum load rating of the dimmer must also be considered, as LEDs draw much less power than the incandescent lamps they replace.",
  },
  {
    question: 'How often should lighting maintenance be carried out?',
    answer:
      "Lighting maintenance frequency depends on the environment and luminaire type. As a general guide: lamp replacement should follow the manufacturer's rated life guidance or be replaced on failure; cleaning of luminaires should be carried out at intervals specified in the lighting design (typically every 1-3 years depending on the environment); and a full lighting survey should be carried out periodically to verify that maintained illuminance levels are being achieved. Industrial and dusty environments require more frequent cleaning.",
  },
  {
    question: 'What is the minimum cable size for a lighting switch drop?',
    answer:
      'The switch drop (the cable between the ceiling rose and the light switch) is typically the same size as the main circuit cable — 1.0 mm² or 1.5 mm² in domestic installations. BS 7671 requires that all conductors in a circuit are adequately rated for the design current and that earth continuity is maintained throughout. Three-core and earth cable is used for two-way switching to provide the necessary strappers.',
  },
  {
    question: 'What are the advantages of DALI over 1-10 V dimming?',
    answer:
      'DALI offers several advantages over analogue 1-10 V dimming: individual addressing of each luminaire (up to 64 per DALI bus), bi-directional communication (the controller can receive status information from luminaires), grouping and scene setting without rewiring, logarithmic dimming curve for smooth perceived dimming, and standardised protocol ensuring interoperability between manufacturers. 1-10 V is simpler and cheaper but only provides group dimming with no feedback capability.',
  },
];

const MOETModule3Section4_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.4 · Subsection 1"
        title="General Lighting Circuits"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Lighting circuit types, switching arrangements, control systems and maintenance.
          </p>

          <TLDR
            points={[
              'Radial circuits: supply loops from point to point, terminating at the last.',
              'Loop-in wiring: connections made at each ceiling rose — no junction boxes.',
              'Switching: one-way, two-way, intermediate and dimmer arrangements.',
              'Controls: PIR, photocell, DALI and smart lighting systems.',
            ]}
          />

          <ConceptBlock title="Regulatory context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671:2018+A4:2026:</strong> Part 5 — selection and erection of equipment.
              </li>
              <li>
                <strong>CIBSE SLL:</strong> Code for Lighting — maintained illuminance levels.
              </li>
              <li>
                <strong>Building Regs Part L:</strong> Conservation of fuel and power — lighting
                efficacy.
              </li>
              <li>
                <strong>ST1426:</strong> Install, maintain and fault-find lighting systems.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Describe radial and loop-in lighting circuit wiring arrangements',
              'Explain one-way, two-way and intermediate switching configurations',
              'Identify dimmer types and their compatibility with different lamp technologies',
              'Describe lighting control systems including PIR, photocell and DALI',
              'State recommended lux levels for common workplace areas',
              'Outline luminaire maintenance procedures including lamp replacement and cleaning',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Lighting circuit types and wiring methods</ContentEyebrow>

          <ConceptBlock title="Lighting circuit types and wiring methods">
            <p>
              Lighting circuits in the UK are predominantly radial circuits, meaning the cable runs
              from the consumer unit or distribution board through each lighting point in sequence,
              terminating at the last point on the circuit. Unlike ring final circuits used for
              socket outlets, lighting circuits do not return to the origin. The two principal
              wiring methods are loop-in wiring and junction box wiring, each with distinct
              advantages for installation and maintenance.
            </p>
            <p>
              A typical domestic lighting circuit is protected by a 6 A Type B MCB and wired in 1.0
              mm² or 1.5 mm² twin and earth cable. The IET On-Site Guide recommends a maximum of
              approximately 10-12 lighting points per circuit, assuming each point is rated at 100
              W. With modern LED luminaires drawing significantly less power, the practical
              limitation is often the cable volt drop over long runs rather than the total load.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Loop-in wiring">
            <p>
              Loop-in wiring is the standard method for domestic and small commercial lighting
              circuits. All connections are made at the ceiling rose or luminaire terminal,
              eliminating the need for separate junction boxes. The supply cable loops through each
              ceiling rose in sequence.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Three-plate ceiling rose:</strong> Three terminal blocks — live (loop),
                neutral, and switched live.
              </li>
              <li>
                <strong>Supply in/out:</strong> The supply cable enters and exits through the loop
                terminals.
              </li>
              <li>
                <strong>Switch wire:</strong> A twin and earth cable runs down to the switch — live
                goes to common, switched live returns on the neutral conductor (sleeved brown).
              </li>
              <li>
                <strong>Pendant flex:</strong> Connects from the switched live and neutral terminals
                to the lamp holder.
              </li>
              <li>
                <strong>Advantage:</strong> All joints accessible at the ceiling rose for
                maintenance and fault-finding.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Junction box wiring"
            onSite="Maintenance tip: when fault-finding on lighting circuits, always start by identifying the wiring method (loop-in or junction box) as this determines where connections are located. In loop-in systems, all joints are at the ceiling rose. In junction box systems, you must locate the junction boxes — which may be hidden above ceilings or in voids."
          >
            <p>
              In junction box wiring, a four-terminal junction box is used at each lighting point to
              make the connections between the supply cable, switch drop and luminaire drop. This
              method is often used in existing installations and where ceiling access is limited.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Four terminals:</strong> Permanent live, neutral, switched live, earth.
              </li>
              <li>
                <strong>Separate drops:</strong> Individual cables run from the junction box to the
                switch and to the luminaire.
              </li>
              <li>
                <strong>Location:</strong> Junction boxes must remain accessible (typically above
                the ceiling).
              </li>
              <li>
                <strong>Disadvantage:</strong> Additional connection points that may be difficult to
                locate during fault-finding.
              </li>
              <li>
                <strong>Use case:</strong> Often preferred for complex switching arrangements or
                where ceiling roses are not used.
              </li>
            </ul>
            <p>
              In larger commercial and industrial installations, lighting circuits are often wired
              using single-core cables in trunking or conduit, or using SWA (Steel Wire Armoured) or
              MICC (Mineral Insulated Copper Clad) cable. Circuits may be three-phase with
              luminaires distributed across all three phases for balanced loading. Busbar trunking
              systems are also used in warehouses and factories to provide flexible luminaire
              positioning.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Switching arrangements</ContentEyebrow>

          <ConceptBlock title="Switching arrangements">
            <p>
              Switching arrangements determine how luminaires can be controlled from one or more
              locations. The correct switching configuration is essential for user convenience,
              energy efficiency and compliance with Building Regulations. Maintenance technicians
              must understand each type to diagnose faults and carry out replacements correctly.
            </p>
          </ConceptBlock>

          <ConceptBlock title="One-way switching">
            <p>
              The simplest arrangement — a single switch controls a single luminaire or group of
              luminaires from one location. The switch is a single-pole device that breaks the line
              conductor only.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Terminals:</strong> Common (COM) and L1.
              </li>
              <li>
                <strong>Cable:</strong> Twin and earth from ceiling rose to switch.
              </li>
              <li>
                <strong>Wiring:</strong> Permanent live to COM, switched live returns on L1.
              </li>
              <li>
                <strong>Application:</strong> Rooms with a single entrance, small spaces, utility
                areas.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Two-way switching">
            <p>
              Allows a luminaire to be controlled from two locations — typically at each end of a
              corridor, staircase or room with two entrances. Uses two two-way switches connected by
              strappers.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Terminals:</strong> Common (COM), L1 and L2 on each switch.
              </li>
              <li>
                <strong>Cable:</strong> Three-core and earth between the two switches (for
                strappers).
              </li>
              <li>
                <strong>Wiring:</strong> Supply to COM on switch 1; COM on switch 2 to luminaire;
                L1-L1 and L2-L2 connected (strappers).
              </li>
              <li>
                <strong>Operation:</strong> Either switch can change the state of the luminaire
                regardless of the other switch position.
              </li>
              <li>
                <strong>Application:</strong> Stairways, corridors, rooms with multiple entrances.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Intermediate switching">
            <p>
              When control from three or more locations is required, intermediate switches are added
              between two two-way switches. Each intermediate switch has four terminals and
              cross-connects the strappers.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Terminals:</strong> Four terminals — L1 in, L2 in, L1 out, L2 out.
              </li>
              <li>
                <strong>Operation:</strong> Cross-connects or straight-connects the strappers
                depending on switch position.
              </li>
              <li>
                <strong>Quantity:</strong> Any number of intermediate switches can be added between
                the two two-way end switches.
              </li>
              <li>
                <strong>Application:</strong> Long corridors, open-plan offices, large retail
                spaces.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Switching arrangement summary"
            onSite="Fault-finding tip: when a two-way or intermediate switching circuit fails, the fault is most commonly at the strapper connections. Check continuity of both strappers between all switches. A broken strapper will cause the light to work from one switch position only."
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-white">Arrangement</th>
                    <th className="border border-white/10 px-3 py-2 text-white">Control points</th>
                    <th className="border border-white/10 px-3 py-2 text-white">Switch types</th>
                    <th className="border border-white/10 px-3 py-2 text-white">
                      Strappers required
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">One-way</td>
                    <td className="border border-white/10 px-3 py-2">1</td>
                    <td className="border border-white/10 px-3 py-2">1 x one-way switch</td>
                    <td className="border border-white/10 px-3 py-2">None</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Two-way</td>
                    <td className="border border-white/10 px-3 py-2">2</td>
                    <td className="border border-white/10 px-3 py-2">2 x two-way switches</td>
                    <td className="border border-white/10 px-3 py-2">2 (three-core and earth)</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Intermediate</td>
                    <td className="border border-white/10 px-3 py-2">3+</td>
                    <td className="border border-white/10 px-3 py-2">
                      2 x two-way + N x intermediate
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      2 (continuous through all switches)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Dimming and lighting control systems</ContentEyebrow>

          <ConceptBlock title="Dimming and lighting control systems">
            <p>
              Modern lighting installations increasingly incorporate dimming and automated control
              systems to reduce energy consumption, improve occupant comfort and comply with
              Building Regulations Part L. Understanding these systems is essential for maintenance
              technicians who must install, commission, maintain and fault-find them.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Dimmer types">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Leading-edge (triac):</strong> Cuts the leading edge of each AC half-cycle.
                Suitable for incandescent and halogen loads. Not recommended for most LED lamps due
                to flickering and compatibility issues.
              </li>
              <li>
                <strong>Trailing-edge:</strong> Cuts the trailing edge of each AC half-cycle.
                Smoother, quieter operation. The preferred choice for LED and electronic transformer
                loads. More expensive than leading-edge.
              </li>
              <li>
                <strong>1-10 V analogue:</strong> A separate pair of control wires carries a 1-10 V
                DC signal to the ballast/driver. 1 V = minimum output, 10 V = full output. Simple
                and reliable but no individual addressing.
              </li>
              <li>
                <strong>DALI (Digital Addressable Lighting Interface):</strong> Digital protocol
                (IEC 62386) using a two-wire bus. Up to 64 individual addresses per bus.
                Bi-directional communication, scene setting, grouping.
              </li>
              <li>
                <strong>DSI (Digital Serial Interface):</strong> Predecessor to DALI. Unidirectional
                only. Being phased out in favour of DALI.
              </li>
              <li>
                <strong>DMX512:</strong> Entertainment and architectural lighting protocol. 512
                channels per universe. High-speed control for colour-changing and dynamic lighting
                effects.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Automated lighting controls">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PIR (Passive Infrared) sensors:</strong> Detect movement of warm bodies via
                changes in infrared radiation. Ideal for intermittently occupied areas — toilets,
                corridors, storerooms. Typical range 6-12 m, detection angle 180-360 degrees.
              </li>
              <li>
                <strong>Microwave sensors:</strong> Emit microwave signals and detect the Doppler
                shift caused by movement. More sensitive than PIR, can detect through thin walls and
                partitions. Used in areas where PIR coverage is insufficient.
              </li>
              <li>
                <strong>Ultrasonic sensors:</strong> Emit ultrasonic sound waves and detect changes
                caused by movement. Good for areas with obstructions or partitions. Less common than
                PIR and microwave.
              </li>
              <li>
                <strong>Photocells (daylight sensors):</strong> Measure ambient light level in lux.
                Used for daylight-linked dimming — reducing artificial light output as natural
                daylight increases. Can reduce lighting energy by 30-60%.
              </li>
              <li>
                <strong>Time switches and astronomical clocks:</strong> Control lighting based on
                time of day and calculated sunrise/sunset times. Used for external lighting and car
                park lighting.
              </li>
              <li>
                <strong>BMS integration:</strong> Lighting control integrated into the Building
                Management System for centralised monitoring, scheduling and energy reporting.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="DALI system architecture"
            onSite="Key point: Building Regulations Part L requires that new non-domestic buildings incorporate lighting controls that respond to daylight and occupancy. Maintenance technicians must understand how to commission, adjust and fault-find these systems to maintain energy performance throughout the building's life."
          >
            <p>
              DALI is the most widely adopted digital lighting control protocol in commercial
              buildings. Understanding its architecture is essential for maintenance and
              fault-finding.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DALI bus:</strong> Two-wire, polarity-independent control bus. Can run
                alongside mains cabling. Maximum bus length approximately 300 m (voltage drop
                limited).
              </li>
              <li>
                <strong>Addressing:</strong> Up to 64 individual DALI addresses per bus. Each
                luminaire (or DALI driver) has a unique address.
              </li>
              <li>
                <strong>Grouping:</strong> Addresses can be assigned to up to 16 groups for
                simultaneous control.
              </li>
              <li>
                <strong>Scenes:</strong> Up to 16 pre-set lighting scenes can be stored in each
                driver.
              </li>
              <li>
                <strong>Feedback:</strong> Bi-directional — drivers report lamp status, failure and
                operating hours back to the controller.
              </li>
              <li>
                <strong>DALI-2:</strong> Updated standard with improved interoperability,
                push-button input devices, and sensor integration.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Lux levels, luminaires and maintenance</ContentEyebrow>

          <ConceptBlock title="Lux levels, luminaire types and maintenance">
            <p>
              Maintaining adequate lighting levels is a legal requirement under the Workplace
              (Health, Safety and Welfare) Regulations 1992 and is essential for the safety, comfort
              and productivity of building occupants. The CIBSE Society of Light and Lighting (SLL)
              Code for Lighting provides detailed recommendations for illuminance levels in
              different types of spaces.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Recommended maintained illuminance (CIBSE SLL)">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-white">Area type</th>
                    <th className="border border-white/10 px-3 py-2 text-white">
                      Maintained illuminance (lux)
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-white">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Corridors and circulation</td>
                    <td className="border border-white/10 px-3 py-2">100</td>
                    <td className="border border-white/10 px-3 py-2">Safe movement</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Stairways</td>
                    <td className="border border-white/10 px-3 py-2">150</td>
                    <td className="border border-white/10 px-3 py-2">On treads</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">General office</td>
                    <td className="border border-white/10 px-3 py-2">500</td>
                    <td className="border border-white/10 px-3 py-2">On working plane</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Technical drawing</td>
                    <td className="border border-white/10 px-3 py-2">750</td>
                    <td className="border border-white/10 px-3 py-2">Detail work</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Workshop (general)</td>
                    <td className="border border-white/10 px-3 py-2">300</td>
                    <td className="border border-white/10 px-3 py-2">General work</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Workshop (fine work)</td>
                    <td className="border border-white/10 px-3 py-2">500</td>
                    <td className="border border-white/10 px-3 py-2">Bench level</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Warehouse (general)</td>
                    <td className="border border-white/10 px-3 py-2">150</td>
                    <td className="border border-white/10 px-3 py-2">At floor level</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Car park (covered)</td>
                    <td className="border border-white/10 px-3 py-2">75</td>
                    <td className="border border-white/10 px-3 py-2">At floor level</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Common luminaire types">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Recessed modular (600x600 mm):</strong> Standard suspended ceiling luminaire
                — LED panel or troffer. Clean appearance, good uniformity. Used in offices,
                healthcare, education.
              </li>
              <li>
                <strong>Surface-mounted battens:</strong> Linear luminaires mounted directly to the
                ceiling. Used in workshops, warehouses, plant rooms. LED replacements for
                fluorescent battens.
              </li>
              <li>
                <strong>High-bay luminaires:</strong> High-output luminaires for mounting heights
                above 6 m. Used in warehouses, factories, sports halls. LED high-bays now standard.
              </li>
              <li>
                <strong>Downlights:</strong> Recessed or semi-recessed circular fittings. Used in
                retail, hospitality, residential. Fire-rated versions required where penetrating
                fire compartment boundaries.
              </li>
              <li>
                <strong>Bulkhead fittings:</strong> Robust, often IP65-rated surface-mounted
                fittings. Used in plant rooms, stairwells, external areas. Available in emergency
                lighting variants.
              </li>
              <li>
                <strong>Track lighting:</strong> Luminaires mounted on an electrified track. Used in
                retail and gallery spaces. Allows flexible repositioning without rewiring.
              </li>
              <li>
                <strong>Floodlights:</strong> External area lighting. Used for car parks, sports
                facilities, building facades. LED floodlights offer significant energy savings over
                traditional SON and MH.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Lighting maintenance procedures"
            onSite="ST1426 link: the maintenance technician standard requires competence in maintaining lighting systems, including lamp replacement, cleaning, testing and recording. You must be able to identify when lux levels have fallen below acceptable limits and take corrective action."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lamp replacement:</strong> Always isolate and prove dead first. Match
                wattage, cap type, colour temperature and CRI. Dispose of discharge lamps
                (fluorescent, HID) as hazardous waste — they contain mercury.
              </li>
              <li>
                <strong>Luminaire cleaning:</strong> Clean reflectors, diffusers and louvres at
                intervals specified in the maintenance schedule. Dirt accumulation reduces light
                output — the Luminaire Maintenance Factor (LMF) accounts for this in design.
              </li>
              <li>
                <strong>Emergency lighting testing:</strong> Monthly functional test (brief
                operation on battery), annual full-duration test (1 hr or 3 hr). Record all results
                in the log book (BS 5266-1:2025).
              </li>
              <li>
                <strong>Control system checks:</strong> Verify PIR sensitivity and time-out
                settings, check photocell calibration, confirm DALI addressing and scene settings
                are correct.
              </li>
              <li>
                <strong>Lux level surveys:</strong> Periodic measurement using a calibrated lux
                meter to verify maintained illuminance levels are being achieved. Compare with
                design values.
              </li>
              <li>
                <strong>Thermal imaging:</strong> Infrared survey of luminaire connections, control
                gear and switchgear to identify hot spots indicating loose connections or failing
                components.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Lamp disposal requirements">
            <p>
              Discharge lamps (fluorescent tubes, compact fluorescent, metal halide, sodium) contain
              mercury and must be disposed of as hazardous waste under the Waste Electrical and
              Electronic Equipment (WEEE) Regulations. They must not be placed in general waste.
              Broken lamps should be handled with care due to mercury vapour risk. LED lamps contain
              electronic components and should also be recycled through WEEE-compliant routes,
              although they do not contain mercury.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=4csv_ofVcwA"

            title="The Most Common Lighting Circuit Mistake"

            channel="Toolbox Talk For Electricians"

            duration="23:43"

            topic="Loop-in wiring, switch drops, and the mistake that keeps recurring"

            caption="Long, but it is the fault you will be called out to most often on lighting circuits."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Lighting circuits are radial, not ring — the cable terminates at the last point on the circuit.',
              'Loop-in wiring keeps every joint at the ceiling rose; junction box wiring uses a separate four-terminal box.',
              'One-way needs no strappers, two-way needs two (three-core and earth), intermediate needs the same two strappers continued through every switch in between.',
              'Trailing-edge dimmers are the safe choice for LED loads — leading-edge (triac) dimmers can flicker, buzz and shorten LED driver life.',
              'DALI addresses up to 64 luminaires individually per bus, with grouping, scenes and bi-directional status feedback.',
              'CIBSE SLL maintained illuminance: 100 lux corridors, 300-500 lux workshops, 500 lux general offices, 750 lux technical drawing.',
              'Discharge lamps (fluorescent, HID) are hazardous waste under WEEE — they contain mercury. LED lamps are WEEE waste but mercury-free.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section3-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Labelling and Identification Standards
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section4-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Emergency Lighting Systems
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section4_1;
