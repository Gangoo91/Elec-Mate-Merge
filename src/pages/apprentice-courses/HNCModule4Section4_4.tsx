/**
 * Module 4 · Section 4 · Subsection 4 — Lighting Controls
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   DALI / DALI-2 protocol (IEC 62386, 16V DC bus, 64 devices, 16 groups / scenes,
 *   300m cable), presence vs absence detection, PIR / ultrasonic / dual-tech sensors,
 *   daylight-linked dimming, time scheduling, BMS integration, Part L compliance.
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

const TITLE = 'Lighting Controls - HNC Module 4 Section 4.4';
const DESCRIPTION =
  'Master lighting control systems for building services: DALI protocol, presence and absence detection, daylight linking, time scheduling, and scene setting for energy efficiency and user comfort.';

const quickCheckQuestions = [
  {
    id: 'dali-voltage',
    question: 'What voltage does the DALI protocol use for communication?',
    options: ['5V DC', '12V DC', '16V DC nominal', '24V DC'],
    correctIndex: 2,
    explanation:
      'DALI (Digital Addressable Lighting Interface) uses a nominal 16V DC signal on the control bus. This is a two-wire system that can be wired alongside the mains supply without special segregation requirements.',
  },
  {
    id: 'presence-vs-absence',
    question: 'What is the key difference between presence detection and absence detection?',
    options: [
      'Presence detection is more sensitive',
      'Absence detection requires user to manually switch ON',
      'Presence detection only works with DALI',
      'Absence detection uses different sensor types',
    ],
    correctIndex: 1,
    explanation:
      'Absence detection requires occupants to manually switch on the lights (encouraging awareness), but automatically switches off when the space is vacant. Presence detection switches on and off automatically, which can lead to unnecessary operation.',
  },
  {
    id: 'daylight-linking',
    question: 'What is the purpose of daylight-linked dimming?',
    options: [
      'To increase artificial light near windows',
      'To maintain constant illuminance by dimming when daylight is available',
      'To change colour temperature throughout the day',
      'To prevent glare from windows',
    ],
    correctIndex: 1,
    explanation:
      'Daylight-linked dimming maintains constant illuminance on the working plane by reducing artificial lighting when natural daylight is available. Photocells measure light levels and adjust luminaire output accordingly, saving energy.',
  },
  {
    id: 'dali-devices',
    question: 'How many individually addressable devices can a single DALI bus support?',
    options: ['16', '32', '64', '128'],
    correctIndex: 2,
    explanation:
      'A DALI bus can support up to 64 individually addressable devices (luminaires or control gear). These can be assigned to up to 16 groups and 16 scenes for flexible control without re-wiring.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does DALI stand for?',
    options: [
      'Digital Addressable Lighting Interface',
      'Direct Address Lighting Integration',
      'Digital Automatic Lighting Interface',
      'Dynamic Addressable Luminaire Interface',
    ],
    correctAnswer: 0,
    explanation:
      'DALI stands for Digital Addressable Lighting Interface. It is an international standard (IEC 62386) for digital control of lighting equipment, enabling individual addressing and grouping of luminaires.',
  },
  {
    id: 2,
    question: 'What is the maximum cable length for a DALI bus?',
    options: ['100m', '200m', '300m', '500m'],
    correctAnswer: 2,
    explanation:
      'The maximum DALI bus cable length is 300m. This is determined by the voltage drop on the control line. For longer distances, DALI routers or repeaters can extend the system.',
  },
  {
    id: 3,
    question: 'What type of sensor is most commonly used for occupancy detection in offices?',
    options: [
      'Ultrasonic only',
      'Passive infrared (PIR) only',
      'Dual technology (PIR + ultrasonic)',
      'Microwave only',
    ],
    correctAnswer: 2,
    explanation:
      'Dual technology sensors combine PIR (detects heat movement) with ultrasonic (detects any movement). This reduces false triggers while maintaining reliable detection of occupancy, even for stationary tasks like desk work.',
  },
  {
    id: 4,
    question: "What is a 'scene' in lighting control terminology?",
    options: [
      'A single luminaire setting',
      'A pre-programmed combination of light levels for multiple luminaires',
      'The area covered by one sensor',
      'A time-based schedule',
    ],
    correctAnswer: 1,
    explanation:
      "A scene is a pre-programmed combination of dimming levels and on/off states for multiple luminaires, recalled by a single command. Examples include 'presentation mode', 'cleaning', or 'video conference'.",
  },
  {
    id: 5,
    question: 'Where should a daylight sensor be positioned?',
    options: [
      'Near the window',
      'On the ceiling looking at the task area',
      'On the exterior of the building',
      'At working plane height',
    ],
    correctAnswer: 1,
    explanation:
      "Daylight sensors for dimming control are typically mounted on the ceiling, angled to 'see' the task area. This measures the actual illuminance reaching the working plane, combining daylight and artificial light.",
  },
  {
    id: 6,
    question: "What is 'corridor hold' in occupancy sensor programming?",
    options: [
      'Keeping corridor lights on during emergencies',
      'Preventing lights switching off while someone walks through',
      'A sensor mounting position',
      'Maximum dimming level in corridors',
    ],
    correctAnswer: 1,
    explanation:
      'Corridor hold (or walk-through function) keeps lights on long enough for someone to pass through the detection zone, typically 15-30 seconds. This prevents lights switching off as occupants transit an area.',
  },
  {
    id: 7,
    question: 'What is the typical time delay for absence detection before lights switch off?',
    options: ['1-5 minutes', '10-20 minutes', '30-60 minutes', '2 hours'],
    correctAnswer: 1,
    explanation:
      'Absence detection typically uses a 10-20 minute delay before switching off. This accounts for brief periods of stillness (reading, thinking). Longer delays waste energy; shorter delays cause nuisance switching.',
  },
  {
    id: 8,
    question: 'What advantage does DALI have over traditional 1-10V dimming?',
    options: [
      'Lower cost',
      'Simpler wiring',
      'Two-way communication and individual addressing',
      'Higher dimming range',
    ],
    correctAnswer: 2,
    explanation:
      'DALI provides two-way communication (luminaires report status back) and individual addressing of up to 64 devices. 1-10V is analogue, one-way, and controls all connected luminaires together without individual addressing.',
  },
  {
    id: 9,
    question: 'In an open plan office, what control strategy is recommended for energy efficiency?',
    options: [
      'Manual switching only',
      'Time scheduling only',
      'Combined daylight linking, presence detection and local override',
      'Central BMS control only',
    ],
    correctAnswer: 2,
    explanation:
      'Best practice combines daylight-linked dimming (responds to natural light), presence detection (responds to occupancy), and local override (user control for comfort). This balances energy efficiency with occupant satisfaction.',
  },
  {
    id: 10,
    question: "What is 'constant light output' (CLO) control?",
    options: [
      'Maintaining light level as lamps depreciate',
      'Keeping colour temperature constant',
      'Preventing flickering',
      'Emergency lighting standby mode',
    ],
    correctAnswer: 0,
    explanation:
      'Constant Light Output (CLO) compensates for LED lumen depreciation over time. New luminaires run at reduced power; output increases as the LEDs age to maintain consistent illuminance throughout the service life, saving energy.',
  },
];

const faqs = [
  {
    question: 'What is the difference between DALI and DALI-2?',
    answer:
      'DALI-2 is the updated standard (IEC 62386 parts 102-104) that ensures interoperability between manufacturers. It adds new control device types (sensors, switches), standardised colour control, and improved testing requirements. DALI-2 is backward compatible with original DALI devices.',
  },
  {
    question: 'When should I use absence detection instead of presence detection?',
    answer:
      'Absence detection is preferred for energy efficiency in most applications. It requires users to consciously switch on lights (raising awareness of energy use), but automatically switches off when vacant. Use presence detection where hands-free operation is essential (toilets, corridors) or where switches are inaccessible.',
  },
  {
    question: 'How do I prevent false triggering of occupancy sensors?',
    answer:
      'Choose appropriate sensor technology (PIR for heat sources, ultrasonic for fine motion, dual-technology for both). Position sensors away from heating/cooling vents, moving objects (curtains, plants), and reflective surfaces. Adjust sensitivity settings and time delays. Consider masking areas where false triggers occur.',
  },
  {
    question: 'Can DALI control be integrated with building management systems (BMS)?',
    answer:
      'Yes, DALI gateways convert between DALI and BMS protocols (BACnet, Modbus, KNX). This enables central monitoring of lighting status, energy consumption, and lamp failures. The BMS can also send commands for time scheduling, load shedding, or emergency override.',
  },
  {
    question: 'What is tuneable white lighting and when is it used?',
    answer:
      "Tuneable white luminaires can adjust colour temperature (typically 2700K-6500K) as well as intensity. This supports circadian lighting design, matching warm tones in morning/evening and cool tones midday. It's used in healthcare, education, and wellness applications where light colour affects wellbeing and alertness.",
  },
  {
    question: 'How much energy can lighting controls save?',
    answer:
      'Typical savings: daylight linking 20-40% (perimeter zones), occupancy/absence detection 30-50% (intermittently occupied spaces), combined strategies 50-70% compared to uncontrolled lighting. Actual savings depend on space use patterns, daylight availability, and existing efficiency. Controls also help demonstrate Part L compliance.',
  },
];

const HNCModule4Section4_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 4"
            title="Lighting Controls"
            description="Digital control systems for energy efficiency, comfort and flexibility in modern building services."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Understand DALI protocol architecture and capabilities',
              'Design presence and absence detection strategies',
              'Apply daylight-linked dimming for energy efficiency',
              'Implement time scheduling for building management',
              'Create scene settings for different activities',
              'Integrate lighting controls with BMS systems',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'DALI (IEC 62386) gives every luminaire a digital address on a 2-wire bus — up to 64 short addresses, 16 groups, 16 scenes per loop.',
              'Absence detection saves more energy than presence (occupants must turn on, lights turn off automatically). Default in offices.',
              'Daylight-linked dimming: closed-loop on the row nearest the window, gradual setpoint transition, 30 s minimum to avoid flicker irritation.',
              'Scene control: 4–8 scenes per space is the practical limit — beyond that users get lost. Always include a manual override.',
              'BMS integration via DALI gateway → BACnet/IP. Time schedules, holiday calendars, fault status all flow back to the head-end.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 559.5.1"
            clause="At each fixed lighting point one of the following shall be used for the termination of the wiring system: (a) a ceiling rose complying with BS 67; (b) a luminaire supporting coupler (LSC) complying with BS 6972 or BS 7001; (c) a batten lampholder or a pendant set complying with BS EN 60598; (d) a luminaire complying with BS EN 60598; (e) a suitable socket-outlet complying with BS 1363-2, BS 546 or BS EN IEC 60309-2; (f) a plug-in lighting distribution unit complying with BS 5733; (g) a connection unit complying with BS 1363-4; (h) appropriate terminals enclosed in a box complying with the relevant part of BS EN 60670 series or BS 4662; (i) a device for connecting a luminaire (DCL) outlet complying with BS EN 61995-1."
            meaning={
              <>
                Even with DALI, the lighting point still terminates under Reg 559.5.1. A controllable
                luminaire is typically option (d) — a BS EN 60598 luminaire with an embedded DALI
                driver. Plug-in lighting distribution systems (option (f), BS 5733) are popular for
                modular ceilings and play nicely with DALI head-ends. The control protocol is laid
                on top of a compliant termination — it doesn’t replace it.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 559.5.1."
          />

          <SectionRule />

          <ConceptBlock title="DALI Protocol — Digital Addressable Lighting Interface">
            <p>
              DALI is the international standard (IEC 62386) for digital lighting control. It
              enables individual addressing of luminaires, flexible grouping, scene setting and
              two-way communication for status monitoring — all on a simple two-wire bus.
            </p>
            <p>
              <strong>DALI system characteristics:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bus voltage:</strong> 16V DC nominal (11.5V-22.5V)
              </li>
              <li>
                <strong>Maximum devices:</strong> 64 per bus (can be expanded)
              </li>
              <li>
                <strong>Groups:</strong> up to 16 simultaneous groups
              </li>
              <li>
                <strong>Scenes:</strong> up to 16 pre-programmed scenes
              </li>
              <li>
                <strong>Cable length:</strong> maximum 300m
              </li>
            </ul>
            <p>
              <strong>DALI system components (component / function):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DALI driver — LED driver with DALI dimming control input</li>
              <li>DALI controller — master device that sends commands to bus</li>
              <li>DALI power supply — provides 16V DC to the control bus</li>
              <li>DALI sensor — occupancy or light level sensor on bus</li>
              <li>DALI switch/button — user input device for manual control</li>
              <li>DALI gateway — interface to BMS (BACnet, KNX, Modbus)</li>
            </ul>
            <p>
              <strong>DALI advantages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Individual addressing</li>
              <li>Two-way communication</li>
              <li>Soft dimming curves</li>
              <li>Remote commissioning</li>
              <li>Fault reporting</li>
            </ul>
            <p>
              <strong>1-10V limitations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>No addressing (all together)</li>
              <li>One-way only</li>
              <li>Separate control cable per zone</li>
              <li>No status feedback</li>
              <li>Manual commissioning</li>
            </ul>
            <p>
              <strong>DALI-2:</strong> The updated standard adds standardised control devices,
              colour control (Tc, RGBW) and improved interoperability. Specify DALI-2 for new
              installations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Presence and Absence Detection">
            <p>
              Occupancy-based control automatically adjusts lighting based on whether spaces are
              in use. The choice between presence detection (auto on/off) and absence detection
              (manual on, auto off) significantly affects both energy savings and user
              satisfaction.
            </p>
            <p>
              <strong>Presence detection:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lights switch ON automatically when occupied</li>
              <li>Lights switch OFF automatically when vacant</li>
              <li>Hands-free operation</li>
              <li>Can waste energy (switching on unnecessarily)</li>
              <li>Suitable for: toilets, corridors, stores</li>
            </ul>
            <p>
              <strong>Absence detection (preferred):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>User must switch ON manually</li>
              <li>Lights switch OFF automatically when vacant</li>
              <li>Encourages energy awareness</li>
              <li>Greater energy savings</li>
              <li>Suitable for: offices, meeting rooms</li>
            </ul>
            <p>
              <strong>Sensor technologies (type / detection method / best for):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>PIR (passive infrared) — body heat movement — general use, cost-effective</li>
              <li>
                Ultrasonic — sound wave reflection — fine movement, partitioned spaces
              </li>
              <li>Microwave — radio wave reflection — through materials, outdoor</li>
              <li>Dual technology — PIR + ultrasonic combined — reduced false triggers, offices</li>
            </ul>
            <p>
              <strong>Sensor placement guidelines:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>PIR: position facing direction of movement (not parallel)</li>
              <li>Avoid HVAC outlets, direct sunlight, heat sources</li>
              <li>Consider furniture obstructions and partitions</li>
              <li>Check coverage patterns in manufacturer data</li>
              <li>Typical coverage: 6-8m diameter for ceiling mount</li>
            </ul>
            <p>
              <strong>Time delay:</strong> Set hold-on time (10-20 minutes for offices) to avoid
              nuisance switching during brief periods of stillness.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Daylight Linking and Photocell Control">
            <p>
              Daylight-linked dimming maintains constant illuminance on the task area by reducing
              artificial lighting when natural daylight is available. Photocells measure light
              levels and adjust luminaire output, providing significant energy savings in
              perimeter zones.
            </p>
            <p>
              <strong>Daylight linking approaches:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Closed-loop:</strong> sensor measures actual task illuminance, adjusts to
                maintain setpoint
              </li>
              <li>
                <strong>Open-loop:</strong> sensor measures daylight only, assumes proportional
                contribution
              </li>
              <li>
                <strong>Switching:</strong> rows of luminaires switch off near windows
              </li>
              <li>
                <strong>Dimming:</strong> smooth adjustment of light level (preferred)
              </li>
            </ul>
            <p>
              <strong>Photocell positioning:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ceiling-mounted, angled toward task area</li>
              <li>Away from direct sunlight patches</li>
              <li>Not obscured by shelving or partitions</li>
              <li>Consider blinds position effect</li>
              <li>One sensor per control zone</li>
            </ul>
            <p>
              <strong>Control zone considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Separate zones by window proximity</li>
              <li>Zone depth typically 4-6m from window</li>
              <li>Consider blinds/shading interaction</li>
              <li>Multiple zones for deep plan spaces</li>
              <li>Core areas may not need daylight linking</li>
            </ul>
            <p>
              <strong>Commissioning requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Set target illuminance level (e.g., 500 lux for office)</li>
              <li>Commission during overcast daytime conditions</li>
              <li>Verify smooth dimming without visible steps</li>
              <li>Set minimum dimming level (typically 10-20%)</li>
              <li>Adjust dead-band to prevent hunting</li>
            </ul>
            <p>
              <strong>Energy savings:</strong> Daylight linking typically saves 20-40% in
              perimeter zones. Savings depend on window area, orientation, shading and occupancy
              patterns.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Time Scheduling and Scene Setting">
            <p>
              Time scheduling automatically adjusts lighting based on building occupation
              patterns, while scene setting provides pre-programmed lighting configurations for
              different activities. Together they enhance both energy efficiency and user
              experience.
            </p>
            <p>
              <strong>Time scheduling strategies (time period / typical action):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Before core hours (e.g., 06:00) — reduced level or off, sensor-only</li>
              <li>Core hours (e.g., 08:00-18:00) — normal operation with daylight/occupancy</li>
              <li>After hours (e.g., 20:00) — sweep-off, sensor-only operation</li>
              <li>Night (e.g., 23:00-06:00) — off except emergency/security</li>
              <li>Weekends/holidays — minimal operation, sensor-controlled only</li>
            </ul>
            <p>
              <strong>Common scene settings (scene / typical light level / application):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Full — 100% — general work, cleaning</li>
              <li>
                Presentation — 30-50% (front), off (screen area) — meeting rooms, lecture theatres
              </li>
              <li>
                Video conference — 70% (face lighting important) — meeting rooms with cameras
              </li>
              <li>Dimmed — 20-30% — evening events, relaxation</li>
              <li>All off — 0% (except emergency) — end of day, secure areas</li>
            </ul>
            <p>
              <strong>Integration with BMS:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Central monitoring of all lighting status</li>
              <li>Energy consumption logging per zone</li>
              <li>Lamp failure alerts for maintenance</li>
              <li>Demand response for load shedding</li>
              <li>Fire alarm integration (full on, escape routes)</li>
            </ul>
            <p>
              <strong>User override:</strong> Always provide local override capability for
              occupant comfort. Log overrides to identify spaces where automatic settings need
              adjustment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — DALI system sizing:</strong> An open plan office has 48
              luminaires to be controlled with DALI. How many buses are required?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DALI maximum: 64 devices per bus</li>
              <li>Luminaires: 48</li>
              <li>4 occupancy sensors</li>
              <li>4 daylight sensors</li>
              <li>2 switch modules</li>
              <li>
                Total devices: 48 + 4 + 4 + 2 = <strong>58 devices</strong>
              </li>
              <li>58 &lt; 64 limit — single DALI bus sufficient</li>
              <li>Allow headroom for future expansion</li>
            </ul>
            <p>
              <strong>Example 2 — control zone layout:</strong> An office is 15m deep with windows
              on one side. How many daylight control zones are appropriate?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Daylight penetration typically 4-6m effective depth</li>
              <li>Room depth: 15m from window</li>
              <li>Zone 1: 0-5m (perimeter) — daylight-linked dimming</li>
              <li>Zone 2: 5-10m (intermediate) — daylight-linked dimming</li>
              <li>Zone 3: 10-15m (core) — occupancy control only</li>
              <li>
                <strong>3 control zones recommended</strong>
              </li>
              <li>Each zone: separate photocell + DALI group</li>
            </ul>
            <p>
              <strong>Example 3 — energy savings estimate:</strong> Estimate annual energy savings
              for lighting controls in a 500m² office operating 2500 hours/year.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Base case (no controls): 10 W/m² × 500m² × 2500h = 12,500 kWh/year</li>
              <li>Daylight linking (40% area): 30% saving = 1500 kWh</li>
              <li>Absence detection (100% area): 35% saving = 4375 kWh</li>
              <li>Combined (with overlap factor 0.7):</li>
              <li>
                Total saving: (1500 + 4375) × 0.7 = <strong>4113 kWh/year</strong>
              </li>
              <li>
                Percentage saving: 4113/12,500 = <strong>33%</strong>
              </li>
              <li>At £0.30/kWh = £1234/year cost saving</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>DALI design checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Count total devices (luminaires + sensors + switches)</li>
              <li>Check cable length does not exceed 300m</li>
              <li>Include DALI power supply (2W typical per bus)</li>
              <li>Plan groups and scenes during design</li>
              <li>Specify DALI-2 for new installations</li>
            </ul>
            <p>
              <strong>Part L compliance:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Presence/absence detection in spaces &gt;30m²</li>
              <li>Daylight dimming within 3m of windows</li>
              <li>Local switching for rooms &lt;4 luminaires</li>
              <li>Addressable control for larger installations</li>
              <li>Controls contribute to LENI calculation</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Sensor blind spots</strong> — check coverage patterns carefully
                </li>
                <li>
                  <strong>Too few zones</strong> — large zones reduce savings potential
                </li>
                <li>
                  <strong>No local override</strong> — occupants will bypass controls
                </li>
                <li>
                  <strong>Poor commissioning</strong> — controls only effective when properly set
                  up
                </li>
              </ul>
            }
            doInstead="Map sensor coverage against the floor plan, split daylight + occupancy into the smallest practical zones, give every space a manual override, and plan a commissioning visit (with daylight measurements) before handover."
          />

          <SectionRule />

          <Scenario
            title="DALI scheme on a 1,200 m² open-plan office — control strategy"
            situation={
              <>
                You’re drafting the controls narrative for an open-plan office: 96 luminaires
                across 12 desk pods, glazed south façade, three meeting rooms off the floor, a
                breakout zone and a print bay. Client wants Part L compliance, BREEAM Hea 06 credit
                and zero complaints in the first month.
              </>
            }
            whatToDo={
              <>
                Architect the DALI loop: two universes of 64 addresses give you headroom (96 fits
                in one but split for resilience). Group by row of three luminaires for daylight
                response — closest-to-glass row dimmed first, mid-row second, deepest row
                manually-set baseline. Set the strategy to absence detection across the open plan
                (occupants press to turn on, sensor turns off after 15 min absence) and presence
                in the meeting rooms and print bay. Daylight setpoint 500 lx maintained, dimming
                rate 30 s minimum to avoid distraction. Three scenes per meeting room (Present,
                Video Call, Cleaning). Wire DALI gateway → BACnet/IP into the BMS for monitoring
                and time schedules (07:30 ramp-up, 19:00 ramp-down, weekend lock-out with manual
                override). Document everything on the controls schedule so the commissioning
                engineer knows the intent, not just the addresses.
              </>
            }
            whyItMatters={
              <>
                Without an explicit controls narrative, the commissioning engineer guesses, the FM
                team gets blamed for poor performance, and the BREEAM credit is lost. DALI is only
                as smart as the brief that goes with it.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'DALI (IEC 62386) — 64 addresses, 16 groups, 16 scenes per loop, 2-wire polarity-insensitive bus.',
              'Absence detection beats presence in offices — Part L and BREEAM both reward it.',
              'Daylight-linked dimming: closed-loop, slow transitions (≥ 30 s), zoned by window distance.',
              'Scene count ≤ 8 per space; always provide a manual override for occupant agency.',
              'Sensor coverage planning is a floor-plan exercise — never trust “rule of thumb” spacings.',
              'BMS integration via DALI → BACnet/IP gateway: time schedules, fault reporting, calendar events.',
              'Commission with daylight measurements present — the as-built scene only works in the actual lighting environment.',
              'Every controllable luminaire still terminates per BS 7671 Reg 559.5.1 — the protocol sits on top of the wiring rules.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Emergency lighting design
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                External lighting
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section4_4;
