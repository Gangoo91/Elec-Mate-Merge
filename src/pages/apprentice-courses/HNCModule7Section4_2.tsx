/**
 * Module 7 · Section 4 · Subsection 2 — Occupancy Sensing
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   PIR, microwave and ultrasonic sensors, placement guidelines, sensitivity adjustment, and hold-off times
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Occupancy Sensing - HNC Module 7 Section 4.2';
const DESCRIPTION =
  'Master occupancy sensing technologies for building services: PIR, microwave and ultrasonic sensors, detection patterns, placement guidelines, sensitivity adjustment, hold-off times, and absence vs presence detection strategies.';

const quickCheckQuestions = [
  {
    id: 'pir-detection',
    question: 'What does a PIR (Passive Infrared) sensor detect?',
    options: [
      'Movement through air pressure changes',
      'Sound waves from occupant movement',
      'Changes in infrared radiation from moving warm bodies',
      'Electromagnetic field disturbances',
    ],
    correctIndex: 2,
    explanation:
      'PIR sensors detect changes in infrared radiation caused by warm bodies moving across their field of view. They are passive because they do not emit any signal - they only receive infrared energy from their surroundings.',
  },
  {
    id: 'microwave-vs-pir',
    question: 'What is the main advantage of microwave sensors over PIR sensors?',
    options: [
      'Detection through lightweight partitions and glass',
      'Longer detection range outdoors',
      'Lower cost and simpler installation',
      'Better performance in high-temperature environments',
    ],
    correctIndex: 0,
    explanation:
      'Microwave sensors emit high-frequency radio waves that can penetrate lightweight materials such as glass, thin partitions, and some building materials, enabling detection through obstacles where PIR would fail.',
  },
  {
    id: 'hold-off-time',
    question: 'What is the purpose of hold-off (delay) time in occupancy sensors?',
    options: [
      'To allow the sensor to warm up before operation',
      'To prevent false triggering during sensor calibration',
      'To keep lights on for a set period after last detected movement',
      'To synchronise multiple sensors on a circuit',
    ],
    correctIndex: 2,
    explanation:
      'Hold-off or delay time keeps the lighting on for a predetermined period after the last detected movement. This prevents lights cycling off when occupants are stationary and ensures comfortable operation without frequent switching.',
  },
  {
    id: 'absence-detection',
    question: 'What distinguishes absence detection from presence detection?',
    options: [
      'Absence detection uses ultrasonic technology only',
      'Absence detection has longer hold-off times',
      'Absence detection requires manual switch-on but automatic switch-off',
      'Absence detection works only in corridors',
    ],
    correctIndex: 2,
    explanation:
      'Absence detection (also called vacancy sensing) requires the occupant to manually switch lights on, but automatically switches them off when the space becomes unoccupied. This is more energy-efficient than full presence detection which switches on automatically.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'PIR sensors are most effective when occupants move:',
    options: [
      'Directly towards or away from the sensor',
      "Across the sensor's field of view (perpendicular movement)",
      'In circular patterns around the sensor',
      'Very slowly within the detection zone',
    ],
    correctAnswer: 1,
    explanation:
      'PIR sensors detect changes in infrared radiation across their segmented detection zones. Movement perpendicular to the sensor (across the field of view) creates the strongest signal as the body moves between detection segments.',
  },
  {
    id: 2,
    question: 'The typical detection range for a ceiling-mounted PIR sensor at 2.8m height is:',
    options: [
      '8-12 metres diameter',
      '2-3 metres diameter',
      '4-6 metres diameter',
      '15-20 metres diameter',
    ],
    correctAnswer: 2,
    explanation:
      'Ceiling-mounted PIR sensors typically provide 4-6 metre diameter coverage at standard ceiling heights (2.4-3m). The detection pattern is generally conical, widening with distance from the sensor.',
  },
  {
    id: 3,
    question:
      'Which sensor technology is most suitable for a toilet cubicle where the occupant may be stationary for extended periods?',
    options: [
      'Microwave',
      'Standard PIR',
      'Photocell',
      'Ultrasonic',
    ],
    correctAnswer: 3,
    explanation:
      'Ultrasonic sensors detect very minor movements including breathing by measuring Doppler shift in reflected sound waves. This makes them ideal for spaces where occupants are stationary, such as toilet cubicles.',
  },
  {
    id: 4,
    question: 'What is the recommended hold-off time for corridor lighting with occupancy sensing?',
    options: [
      '30-60 seconds',
      '5-10 seconds',
      '5-10 minutes',
      '15-20 minutes',
    ],
    correctAnswer: 0,
    explanation:
      'Corridors typically use 30-60 second hold-off times. This allows time for people to pass through while minimising energy waste. Shorter times risk lights switching off while people are still present; longer times waste energy.',
  },
  {
    id: 5,
    question: 'Which installation location would cause false triggering of a PIR sensor?',
    options: [
      'Centre of an open-plan office ceiling',
      'Facing a window with direct sunlight',
      'At the end of a corridor',
      'Above the entry door to a meeting room',
    ],
    correctAnswer: 1,
    explanation:
      'PIR sensors can false trigger from rapid temperature changes caused by direct sunlight, HVAC airflow, or heat sources. Sensors should be positioned away from windows with direct sunlight, radiators, and air conditioning vents.',
  },
  {
    id: 6,
    question:
      'A dual-technology sensor combines PIR with microwave detection. What is the primary benefit?',
    options: [
      'Multiple sensors with overlapping detection zones',
      'It provides higher energy savings by requiring manual switch-on',
      'Reduced false triggering - both technologies must detect movement',
      'The sensor responds to movement throughout the intended coverage area',
    ],
    correctAnswer: 2,
    explanation:
      'Dual-technology sensors require both PIR AND microwave to detect movement before triggering, significantly reducing false activations. This is valuable in challenging environments where single-technology sensors may false trigger.',
  },
  {
    id: 7,
    question:
      'For open-plan offices greater than 100m², which sensor arrangement is most appropriate?',
    options: [
      'Facing a window with direct sunlight',
      'Decrease sensitivity and consider relocating the sensor',
      'It provides higher energy savings by requiring manual switch-on',
      'Multiple sensors with overlapping detection zones',
    ],
    correctAnswer: 3,
    explanation:
      'Large open-plan areas require multiple sensors with overlapping detection zones to ensure complete coverage. Single sensors cannot adequately cover large areas, and gaps in detection lead to lights switching off while spaces are occupied.',
  },
  {
    id: 8,
    question: 'What is the typical operating frequency range for ultrasonic occupancy sensors?',
    options: [
      '25 kHz - 40 kHz',
      '100 kHz - 200 kHz',
      '500 Hz - 2 kHz',
      '2.4 GHz - 5.8 GHz',
    ],
    correctAnswer: 0,
    explanation:
      'Ultrasonic sensors typically operate at 25-40 kHz, above the human hearing range (typically up to 20 kHz). This frequency provides good detection sensitivity without causing audible noise for occupants.',
  },
  {
    id: 9,
    question:
      'According to Building Regulations Part L, absence detection is preferred over presence detection because:',
    options: [
      'The sensor responds to movement throughout the intended coverage area',
      'It provides higher energy savings by requiring manual switch-on',
      'Multiple sensors with overlapping detection zones',
      'Near thin partition walls where detection could extend beyond the room',
    ],
    correctAnswer: 1,
    explanation:
      "Absence detection (manual on, automatic off) typically achieves 30-40% higher energy savings compared to presence detection because occupants often don't need lights when entering a space with adequate daylight, but would trigger automatic-on systems.",
  },
  {
    id: 10,
    question: 'When commissioning occupancy sensors, the walk test should verify:',
    options: [
      'Near thin partition walls where detection could extend beyond the room',
      'Reduced false triggering - both technologies must detect movement',
      'The sensor responds to movement throughout the intended coverage area',
      'It provides higher energy savings by requiring manual switch-on',
    ],
    correctAnswer: 2,
    explanation:
      'Walk testing verifies that the sensor detects movement throughout the entire intended coverage area and does not have blind spots. The tester walks the space boundaries while observing sensor response to ensure complete coverage.',
  },
  {
    id: 11,
    question: 'Microwave sensors operating at 5.8 GHz should not be installed:',
    options: [
      'Reduced false triggering - both technologies must detect movement',
      'Decrease sensitivity and consider relocating the sensor',
      'The sensor responds to movement throughout the intended coverage area',
      'Near thin partition walls where detection could extend beyond the room',
    ],
    correctAnswer: 3,
    explanation:
      'Microwave signals penetrate lightweight materials including plasterboard partitions, meaning sensors can detect movement in adjacent spaces causing unwanted triggering. Position microwave sensors away from thin partitions or use PIR in such locations.',
  },
  {
    id: 12,
    question:
      'What sensitivity adjustment should be made if a PIR sensor false triggers from HVAC airflow?',
    options: [
      'Decrease sensitivity and consider relocating the sensor',
      'The sensor responds to movement throughout the intended coverage area',
      'Reduced false triggering - both technologies must detect movement',
      'Multiple sensors with overlapping detection zones',
    ],
    correctAnswer: 0,
    explanation:
      'Reducing sensitivity can help filter out minor temperature fluctuations from HVAC airflow. However, relocation away from air vents is often the better solution. Increasing hold-off time masks the problem but does not solve the false triggering issue.',
  },
];

const faqs = [
  {
    question: 'What is the difference between presence and absence detection?',
    answer:
      'Presence detection (automatic on/off) switches lights on when movement is detected and off after the hold-off period. Absence detection (manual on, automatic off) requires the occupant to manually switch lights on but automatically switches them off when the space is vacated. Absence detection achieves higher energy savings (typically 30-40% more than presence detection) because it avoids switching lights on unnecessarily when daylight is adequate. Building Regulations Part L and BREEAM assessments favour absence detection for this reason.',
  },
  {
    question: 'How do I choose between PIR, microwave, and ultrasonic sensors?',
    answer:
      'PIR sensors are cost-effective and suitable for most applications with normal movement patterns (corridors, entrances, general offices). Microwave sensors detect through obstacles and are better for spaces with partitions or where PIR has blind spots. Ultrasonic sensors detect minor movements including breathing and are ideal for toilet cubicles and spaces where occupants are stationary. Dual-technology sensors (PIR + microwave) reduce false triggering in challenging environments. Consider the space geometry, expected occupant behaviour, and potential interference sources when selecting technology.',
  },
  {
    question: 'What hold-off times should I specify for different space types?',
    answer:
      'Hold-off times vary by application: corridors and circulation spaces typically use 30-60 seconds; toilets and washrooms use 5-10 minutes; offices and meeting rooms use 10-20 minutes; storage and plant rooms use 5-10 minutes. Longer times improve occupant comfort but increase energy consumption. Some controls allow adaptive hold-off that adjusts based on usage patterns, starting short and extending if false-offs occur.',
  },
  {
    question: 'Why do my occupancy sensors keep false triggering?',
    answer:
      'Common causes include: PIR sensors facing windows with direct sunlight or positioned near HVAC vents (temperature fluctuations); microwave sensors detecting through partitions into adjacent spaces; sensors set to excessive sensitivity; electrical interference from nearby equipment. Solutions include relocating sensors, reducing sensitivity, using dual-technology sensors, or installing sensor guards/masks to limit the detection field.',
  },
  {
    question: 'How many sensors do I need for a large open-plan office?',
    answer:
      "Calculate coverage by dividing the floor area by the sensor's coverage area (typically 30-40m² for ceiling-mounted PIR at 2.8m height). Ensure overlap between adjacent sensors (typically 10-20% overlap) to eliminate blind spots. For a 200m² office with 40m² sensors, you would need minimum 5-6 sensors with overlapping coverage. Consider furniture and partition layouts that may create shadows in the detection pattern.",
  },
  {
    question: 'Can occupancy sensors work with DALI lighting control systems?',
    answer:
      'Yes, occupancy sensors integrate well with DALI systems. Sensors can be DALI-addressable devices that communicate presence information to the DALI controller, which then manages appropriate luminaires. This enables sophisticated control strategies including gradual dimming before switch-off, different scenes for different occupancy levels, and coordination with daylight harvesting. DALI integration also enables remote monitoring and adjustment of sensor parameters.',
  },
];

const HNCModule7Section4_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 4 · Subsection 2"
            title="Occupancy Sensing"
            description="PIR, microwave and ultrasonic sensors, placement guidelines, sensitivity adjustment, and hold-off times"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain PIR, microwave and ultrasonic sensor operating principles",
              "Select appropriate sensor technology for different space types",
              "Apply correct sensor placement for complete coverage",
              "Configure sensitivity settings to minimise false triggering",
              "Specify hold-off times for different applications",
              "Distinguish between absence and presence detection strategies",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Sensor Technologies">
            <p>Occupancy sensors detect human presence to control lighting and HVAC systems automatically, reducing energy consumption by ensuring services operate only when spaces are occupied. Three primary technologies are used, each with distinct operating principles and applications.</p>
            <p><strong>PIR (Passive Infrared) Sensors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Principle:</strong> Detects changes in infrared radiation from warm bodies moving across segmented detection zones</li>
              <li><strong>Passive operation:</strong> Does not emit any signal - only receives infrared energy</li>
              <li><strong>Best detection:</strong> Movement perpendicular to the sensor (across the field of view)</li>
              <li><strong>Limitations:</strong> Cannot detect stationary occupants; affected by heat sources and sunlight</li>
              <li><strong>Typical coverage:</strong> 4-6m diameter at 2.8m ceiling height</li>
            </ul>
            <p><strong>Microwave (Radar) Sensors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Principle:</strong> Emits high-frequency radio waves (typically 5.8 GHz or 10.525 GHz) and detects Doppler shift from moving objects</li>
              <li><strong>Active operation:</strong> Transmits and receives signals continuously</li>
              <li><strong>Penetration:</strong> Can detect through glass, thin partitions, and some building materials</li>
              <li><strong>Best detection:</strong> Movement towards or away from the sensor</li>
              <li><strong>Limitations:</strong> May detect through walls causing unwanted triggering; higher power consumption</li>
            </ul>
            <p><strong>Ultrasonic Sensors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Principle:</strong> Emits high-frequency sound waves (25-40 kHz) and detects Doppler shift from movement</li>
              <li><strong>High sensitivity:</strong> Can detect very minor movements including breathing</li>
              <li><strong>Contained coverage:</strong> Sound waves do not penetrate solid walls</li>
              <li><strong>Ideal applications:</strong> Toilet cubicles, spaces with stationary occupants</li>
              <li><strong>Limitations:</strong> Air turbulence and certain materials can cause false triggers</li>
            </ul>
            <p><strong>Technology Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Detection method:</strong> Heat differential — Radio wave reflection — Sound wave reflection</li>
              <li><strong>Stationary detection:</strong> Poor — Moderate — Excellent</li>
              <li><strong>Through-wall detection:</strong> No — Yes (thin walls) — No</li>
              <li><strong>Cost:</strong> Low — Medium — Medium-High</li>
              <li><strong>Power consumption:</strong> Very low — Higher — Moderate</li>
            </ul>
            <p><strong>Design note:</strong> Dual-technology sensors combine PIR and microwave, requiring both to detect movement before triggering - significantly reducing false activations in challenging environments.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Detection Patterns and Placement">
            <p>Effective occupancy sensing requires understanding detection patterns and strategic sensor placement to achieve complete coverage without blind spots or unwanted detection in adjacent areas.</p>
            <p><strong>PIR Detection Pattern</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Conical pattern from sensor</li>
              <li>Segmented zones (fingers)</li>
              <li>Best across field of view</li>
              <li>Weaker towards/away motion</li>
            </ul>
            <p><strong>Microwave Pattern</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Elliptical/spherical coverage</li>
              <li>Penetrates lightweight walls</li>
              <li>Best towards/away motion</li>
              <li>Adjustable range/sensitivity</li>
            </ul>
            <p><strong>Ultrasonic Pattern</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hemispherical coverage</li>
              <li>Fills entire room volume</li>
              <li>Reflects off hard surfaces</li>
              <li>Absorbed by soft materials</li>
            </ul>
            <p><strong>Placement Guidelines</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Corridor:</strong> PIR (ceiling mount) — Central, 6-8m spacing, covering entry points</li>
              <li><strong>Open-plan office:</strong> PIR or dual-tech — Grid pattern, 5-6m centres, overlapping zones</li>
              <li><strong>Private office:</strong> PIR or ultrasonic — Central ceiling, or wall-mount facing desk</li>
              <li><strong>Toilet cubicle:</strong> Ultrasonic — Ceiling mount, one per cubicle</li>
              <li><strong>Meeting room:</strong> Ultrasonic or dual-tech — Central ceiling, covering all seating positions</li>
              <li><strong>Warehouse:</strong> High-bay PIR or microwave — At aisles, entry points, high-traffic routes</li>
            </ul>
            <p><strong>Placement Pitfalls to Avoid</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>PIR sensors facing windows with direct sunlight (false triggers)</li>
              <li>PIR sensors near HVAC vents or radiators (temperature interference)</li>
              <li>Microwave sensors near thin partitions (detection through walls)</li>
              <li>Sensors behind obstacles blocking line of sight</li>
              <li>Single sensors in L-shaped rooms (blind spots in corners)</li>
            </ul>
            <p><strong>Coverage rule:</strong> For large spaces, ensure 10-20% overlap between adjacent sensor detection zones to eliminate blind spots and provide redundancy.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Sensitivity and Hold-Off Times">
            <p>Correct configuration of sensitivity and hold-off (delay) times is critical for reliable operation. Settings must balance responsive detection against false triggering while optimising energy savings.</p>
            <p><strong>Sensitivity Adjustment</strong></p>
            <p><strong>High sensitivity:</strong> Detects minor movements, greater range, but increased false trigger risk</p>
            <p><strong>Low sensitivity:</strong> Requires significant movement, reduced range, fewer false triggers</p>
            <p><strong>Adjustment method:</strong> Start at medium, walk test the space, adjust based on coverage gaps or false triggers</p>
            <p><strong>Sensitivity Setting Guidance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Increase sensitivity:</strong> When detection gaps exist, when occupants report lights turning off while present</li>
              <li><strong>Decrease sensitivity:</strong> When false triggers occur, near HVAC vents, in high-ceiling applications</li>
              <li><strong>Microwave range:</strong> Reduce range setting if detecting through partitions into adjacent spaces</li>
              <li><strong>Walk test:</strong> Essential after any adjustment - verify coverage at all boundaries</li>
            </ul>
            <p><strong>Hold-Off Time Recommendations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Corridors:</strong> 30-60 seconds — Transit spaces with brief occupancy</li>
              <li><strong>Toilets/washrooms:</strong> 5-10 minutes — Stationary occupants, privacy concerns</li>
              <li><strong>Private offices:</strong> 15-20 minutes — Extended stationary work at desks</li>
              <li><strong>Meeting rooms:</strong> 15-20 minutes — Seated meetings with limited movement</li>
              <li><strong>Open-plan offices:</strong> 10-15 minutes — Multiple occupants provide movement</li>
              <li><strong>Storage/plant rooms:</strong> 5-10 minutes — Brief access, high energy saving potential</li>
            </ul>
            <p><strong>Advanced Hold-Off Features</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Adaptive hold-off:</strong> Automatically adjusts based on occupancy patterns - shorter during day, longer initially</li>
              <li><strong>Grace period:</strong> Brief re-detection window that resets timer without full restart</li>
              <li><strong>Dimming before off:</strong> Reduces to minimum level for 30s before switching off as warning</li>
              <li><strong>Daylight linking:</strong> Reduces hold-off when daylight is adequate (lights not needed anyway)</li>
            </ul>
            <p><strong>Energy vs comfort:</strong> Shorter hold-off times save more energy but risk lights turning off while spaces are occupied. Balance based on space type and user expectations.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Absence vs Presence Detection">
            <p>The choice between presence detection (automatic on/off) and absence detection (manual on, automatic off) significantly impacts energy savings and user experience. Building Regulations and sustainability assessments increasingly favour absence detection.</p>
            <p><strong>Presence Detection</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Operation:</strong> Auto-on when movement detected, auto-off after hold-off</li>
              <li><strong>User experience:</strong> Convenient - no manual switching required</li>
              <li><strong>Energy impact:</strong> May switch lights on unnecessarily (adequate daylight)</li>
              <li><strong>Best for:</strong> Circulation areas, stairwells, toilets, storage</li>
            </ul>
            <p><strong>Absence Detection</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Operation:</strong> Manual switch-on required, auto-off after hold-off</li>
              <li><strong>User experience:</strong> Requires user action but avoids unwanted light</li>
              <li><strong>Energy impact:</strong> 30-40% more savings than presence detection</li>
              <li><strong>Best for:</strong> Offices, meeting rooms, areas with good daylight</li>
            </ul>
            <p><strong>Building Regulations Part L Guidance</strong></p>
            <p>Part L2A (new non-domestic buildings) requires lighting controls that prevent energy waste. Absence detection is recognised as achieving higher compliance scores and is preferred in BREEAM assessments. Where presence detection is used, hold-off times should not exceed manufacturer recommendations for the space type.</p>
            <p><strong>Control Strategy Selection</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Office (good daylight):</strong> Absence detection — User decides if light needed</li>
              <li><strong>Office (no daylight):</strong> Presence detection — Light always needed when occupied</li>
              <li><strong>Corridors:</strong> Presence detection — Safety - instant light for transit</li>
              <li><strong>Stairwells:</strong> Presence detection — Safety - prevent trips/falls</li>
              <li><strong>Meeting rooms:</strong> Absence detection — Often adequate daylight available</li>
              <li><strong>Toilets/washrooms:</strong> Presence detection — Convenience and hygiene (no touch)</li>
            </ul>
            <p><strong>Integration with Lighting Control Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DALI integration:</strong> Sensors communicate occupancy to controller for coordinated response</li>
              <li><strong>Daylight harvesting:</strong> Combine with photocells to dim when daylight adequate</li>
              <li><strong>Scene control:</strong> Occupancy can trigger pre-set lighting scenes</li>
              <li><strong>BMS interface:</strong> Report occupancy data for HVAC control and space utilisation analytics</li>
            </ul>
            <p><strong>Specification tip:</strong> For Part L compliance documentation, specify both the detection type (absence/presence) and hold-off times for each space type to demonstrate appropriate control strategy.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Open-Plan Office Sensor Layout</strong>
            </p>
            <p><strong>Scenario:</strong> Design occupancy sensing for a 150m² open-plan office, 2.7m ceiling height, good daylight from south-facing windows.</p>
            <p>Step 1: Calculate sensor quantity</p>
            <p>Ceiling PIR coverage at 2.7m = approx. 36m² per sensor</p>
            <p>150m² ÷ 36m² = 4.2 sensors minimum</p>
            <p>Add 20% overlap = 5 sensors required</p>
            <p>Step 2: Select detection strategy</p>
            <p>Good daylight available → Absence detection (manual on, auto off)</p>
            <p>Part L compliant, BREEAM credits available</p>
            <p>Step 3: Configure settings</p>
            <p>Hold-off time: 15 minutes (seated desk work)</p>
            <p>Sensitivity: Medium (adjust after walk test)</p>
            <p>Integration: DALI sensors linked to daylight dimming</p>
            <p>Result: 5× DALI PIR sensors, absence mode, 15-min hold-off</p>
            <p>
              <strong>Example 2: Toilet and Washroom Installation</strong>
            </p>
            <p><strong>Scenario:</strong> Specify sensors for a 6-cubicle male toilet with common washbasin area.</p>
            <p>Cubicles:</p>
            <p>Technology: Ultrasonic (detects stationary occupants)</p>
            <p>Quantity: 1 sensor per cubicle = 6 sensors</p>
            <p>Hold-off: 10 minutes (extended stationary occupancy)</p>
            <p>Mode: Presence detection (auto on/off)</p>
            <p>Washbasin area:</p>
            <p>Technology: PIR (adequate for hand-washing activity)</p>
            <p>Quantity: 1 ceiling-mounted sensor</p>
            <p>Hold-off: 5 minutes</p>
            <p>Mode: Presence detection</p>
            <p>Control integration:</p>
            <p>Link washbasin sensor to extract fan start</p>
            <p>30-minute overrun on extract after last detection</p>
            <p>Total: 6× ultrasonic (cubicles) + 1× PIR (washbasins)</p>
            <p>
              <strong>Example 3: False Trigger Troubleshooting</strong>
            </p>
            <p><strong>Scenario:</strong> PIR sensor in meeting room triggers lights when room is empty, especially in afternoon.</p>
            <p>Investigation:</p>
            <p>Afternoon timing → suspect sunlight involvement</p>
            <p>Check: Sensor faces west window (direct afternoon sun)</p>
            <p>Cause: Rapid temperature change from sun movement</p>
            <p>Solutions (in order of preference):</p>
            <p>1. Relocate sensor away from window view</p>
            <p>2. Install sensor hood/mask to block window direction</p>
            <p>3. Reduce sensitivity (may reduce detection range)</p>
            <p>4. Replace with dual-tech sensor (PIR + microwave)</p>
            <p>Implementation:</p>
            <p>Relocated sensor to ceiling centre, facing door entry</p>
            <p>Walk test confirmed full coverage maintained</p>
            <p>Result: False triggering eliminated</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Sensor Selection Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify expected occupant movement patterns (walking, seated, stationary)</li>
              <li>Consider presence of partitions or obstacles that block line of sight</li>
              <li>Check for potential interference sources (HVAC, sunlight, heat sources)</li>
              <li>Determine if detection through walls is problematic (microwave consideration)</li>
              <li>Match technology to space: PIR for general, ultrasonic for stationary, dual-tech for difficult environments</li>
            </ul>
            <p>
              <strong>Key Parameters to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>PIR coverage: <strong>4-6m diameter</strong> at 2.8m ceiling height</li>
              <li>Ultrasonic frequency: <strong>25-40 kHz</strong> (above human hearing)</li>
              <li>Microwave frequency: <strong>5.8 GHz or 10.525 GHz</strong> typical</li>
              <li>Sensor overlap: <strong>10-20%</strong> for complete coverage</li>
              <li>Absence vs presence savings: <strong>30-40% additional</strong> with absence detection</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>No walk test:</strong> Detection gaps only discovered after handover complaints</li>
                <li><strong>Default settings:</strong> Factory hold-off times rarely suit actual space requirements</li>
                <li><strong>Maximum sensitivity:</strong> Causes false triggers - start medium and adjust</li>
                <li><strong>Ignoring furniture:</strong> Desks and partitions create shadows not on drawings</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                DALI systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Daylight harvesting
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section4_2;
