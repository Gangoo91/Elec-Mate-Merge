/**
 * Module 7 · Section 4 · Subsection 4 — Scene Setting
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Scene controllers, preset configurations, tunable white, colour changing, and circadian lighting for human-centric design
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

const TITLE = 'Scene Setting - HNC Module 7 Section 4.4';
const DESCRIPTION =
  'Master scene setting for lighting installations: scene controllers, preset configurations, tunable white CCT adjustment, colour changing RGB/RGBW systems, circadian lighting, and WELL Building Standard requirements.';

const quickCheckQuestions = [
  {
    id: 'scene-controller-definition',
    question: 'What is the primary function of a scene controller in a lighting system?',
    options: [
      'To provide emergency lighting',
      'To store and recall preset lighting configurations',
      'To measure energy consumption',
      'To replace individual light switches',
    ],
    correctIndex: 1,
    explanation:
      'A scene controller stores multiple preset lighting configurations (scenes) and allows users to recall them with a single button press, coordinating multiple luminaires, dimming levels, and colour settings simultaneously.',
  },
  {
    id: 'tunable-white-purpose',
    question: 'What does tunable white lighting allow users to adjust?',
    options: [
      'Only the brightness level',
      'The correlated colour temperature (CCT) from warm to cool white',
      'The RGB colour output',
      'The emergency lighting duration',
    ],
    correctIndex: 1,
    explanation:
      'Tunable white (also called tuneable white or CCT adjustable) allows adjustment of correlated colour temperature, typically ranging from warm white (2700K) to cool white (6500K), whilst maintaining white light output.',
  },
  {
    id: 'circadian-lighting-aim',
    question: 'What is the primary aim of circadian lighting design?',
    options: [
      'To reduce energy consumption',
      'To align artificial lighting with natural daylight patterns to support human biological rhythms',
      'To provide maximum illumination at all times',
      'To eliminate the need for daylight',
    ],
    correctIndex: 1,
    explanation:
      "Circadian (human-centric) lighting aims to support the body's natural circadian rhythm by varying colour temperature and intensity throughout the day, mimicking natural daylight patterns to improve wellbeing, alertness, and sleep quality.",
  },
  {
    id: 'well-standard-lighting',
    question: 'What aspect of lighting does the WELL Building Standard primarily address?',
    options: [
      'Energy efficiency ratings',
      'Human health and wellbeing through lighting design',
      'Emergency lighting requirements',
      'Cable sizing calculations',
    ],
    correctIndex: 1,
    explanation:
      'The WELL Building Standard focuses on human health and wellbeing, with lighting requirements addressing circadian lighting design, visual comfort, glare control, and melanopic equivalent daylight illuminance (EML) to support occupant health.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A scene controller configured for a boardroom typically includes which preset scenes?',
    options: [
      'Emergency only, standby, and maintenance',
      'Presentation, meeting, video conference, and all off',
      'Maximum brightness at all times',
      'Single dimming level for all occasions',
    ],
    correctAnswer: 1,
    explanation:
      'Boardroom scene controllers typically include presets for presentations (low ambient, screen focus), general meetings (balanced lighting), video conferencing (face illumination, reduced glare), and all off for AV presentations.',
  },
  {
    id: 2,
    question: 'What CCT range is typically provided by tunable white luminaires?',
    options: ['1000K to 2000K', '2700K to 6500K', '8000K to 10000K', 'Fixed at 4000K'],
    correctAnswer: 1,
    explanation:
      'Tunable white luminaires typically offer CCT adjustment from 2700K (warm white) to 6500K (cool daylight), covering the range most useful for architectural and human-centric lighting applications.',
  },
  {
    id: 3,
    question: 'RGB colour changing systems use which primary colours to create mixed colours?',
    options: [
      'Cyan, Magenta, Yellow',
      'Red, Green, Blue',
      'Red, Yellow, Blue',
      'White, Black, Grey',
    ],
    correctAnswer: 1,
    explanation:
      'RGB systems use additive colour mixing with Red, Green, and Blue LEDs. By varying the intensity of each colour channel, a wide gamut of colours can be produced through additive colour mixing.',
  },
  {
    id: 4,
    question: 'What advantage does RGBW have over standard RGB?',
    options: [
      'Lower cost',
      'Better quality white light and improved colour rendering',
      'Fewer control channels required',
      'Higher energy consumption',
    ],
    correctAnswer: 1,
    explanation:
      'RGBW adds a dedicated White LED channel, producing cleaner, more efficient white light with better colour rendering compared to mixing RGB to create white. This is particularly important for spaces requiring both saturated colours and high-quality white light.',
  },
  {
    id: 5,
    question: 'What is melanopic equivalent daylight illuminance (EML)?',
    options: [
      'A measure of energy consumption',
      'A metric quantifying the biological effectiveness of light on circadian rhythms',
      'The colour rendering index of a light source',
      'The total lumen output of a luminaire',
    ],
    correctAnswer: 1,
    explanation:
      'Melanopic Equivalent Daylight Illuminance (EML, now called Melanopic EDI) measures how effectively light stimulates the melanopsin-containing cells in the eye that regulate circadian rhythms, expressed as an equivalent amount of daylight.',
  },
  {
    id: 6,
    question:
      'For circadian lighting, what CCT should generally be used in the morning and midday?',
    options: [
      'Warm white (2700K) to promote relaxation',
      'Cool white (5000K-6500K) to promote alertness',
      'Amber (1800K) to simulate sunset',
      'The same CCT throughout the day',
    ],
    correctAnswer: 1,
    explanation:
      'Morning and midday periods benefit from cool white (5000K-6500K) rich in blue wavelengths to suppress melatonin, increase alertness, and synchronise the circadian rhythm with daytime activity patterns.',
  },
  {
    id: 7,
    question:
      "What is the WELL Building Standard's minimum melanopic EML requirement for workspaces during daytime?",
    options: [
      '50 equivalent lux',
      '150 equivalent lux at the eye',
      '200 equivalent lux',
      '500 equivalent lux',
    ],
    correctAnswer: 1,
    explanation:
      'The WELL Building Standard requires a minimum of 150 melanopic equivalent lux (now melanopic EDI) measured vertically at eye level for at least 4 hours per day in regularly occupied spaces to support circadian health.',
  },
  {
    id: 8,
    question: 'In a DALI-2 system, how are scene presets typically stored?',
    options: [
      'In the scene controller only',
      'In each individual DALI driver/ballast',
      'On a central server',
      'In the building management system',
    ],
    correctAnswer: 1,
    explanation:
      'DALI-2 systems store scene presets in each individual driver/ballast. Scene commands broadcast to a group cause each device to recall its stored value for that scene, enabling fast response without individual commands to each device.',
  },
  {
    id: 9,
    question:
      'What protocol is commonly used for professional architectural colour changing installations?',
    options: ['Simple on/off switching', 'DMX512', 'Standard dimming only', 'Bluetooth only'],
    correctAnswer: 1,
    explanation:
      'DMX512 is the industry standard for professional colour changing and architectural lighting, providing 512 channels of control per universe. It enables precise control of RGB/RGBW luminaires, moving lights, and complex lighting effects.',
  },
  {
    id: 10,
    question: 'Which wavelength of light has the greatest impact on circadian rhythm regulation?',
    options: [
      'Red light (630-700nm)',
      'Blue light (460-490nm)',
      'Green light (520-560nm)',
      'Infrared light (&gt;700nm)',
    ],
    correctAnswer: 1,
    explanation:
      'Blue light wavelengths (particularly around 480nm) have the strongest effect on melanopsin-containing intrinsically photosensitive retinal ganglion cells (ipRGCs), which regulate circadian rhythms and melatonin suppression.',
  },
  {
    id: 11,
    question: 'A restaurant scene controller might include which specific scenes?',
    options: [
      'Manufacturing, warehouse, and loading',
      'Lunch service, dinner service, cleaning, and closed',
      'Emergency only',
      'Maximum brightness only',
    ],
    correctAnswer: 1,
    explanation:
      'Restaurant scene controllers typically include: lunch service (brighter, cooler), dinner service (dimmer, warmer for ambience), cleaning (full brightness for hygiene inspection), and closed (security lighting only).',
  },
  {
    id: 12,
    question: "What is the purpose of the 'fade time' parameter in scene recall?",
    options: [
      'To specify how long the scene remains active',
      'To control the transition speed between current and new lighting states',
      'To set the emergency lighting duration',
      'To define the daylight harvesting response',
    ],
    correctAnswer: 1,
    explanation:
      'Fade time controls how gradually the lighting transitions from the current state to the recalled scene. Slow fades (several seconds) create smooth, unobtrusive transitions; instant changes (0s fade) are used for presentations or alerts.',
  },
];

const faqs = [
  {
    question: 'What is the difference between tunable white and colour changing?',
    answer:
      'Tunable white adjusts colour temperature along the white light spectrum only (warm to cool white, typically 2700K-6500K), maintaining white light output. Colour changing (RGB/RGBW) can produce saturated colours across the visible spectrum including reds, greens, blues, and mixed hues. Tunable white is used for human-centric and architectural applications; colour changing is for decorative, entertainment, or branding applications.',
  },
  {
    question: 'How many control channels does RGB vs RGBW require?',
    answer:
      'RGB requires 3 control channels (one each for Red, Green, Blue intensity). RGBW requires 4 channels (adding White). Some advanced systems use RGBA (Amber) or RGBWW (Warm White + Cool White) requiring 5 channels. Tunable white typically needs 2 channels (intensity + CCT, or warm + cool white levels). Each channel requires addressing in the control protocol (DALI DT8, DMX, etc.).',
  },
  {
    question: 'Can existing DALI systems support tunable white and colour changing?',
    answer:
      'Standard DALI (IEC 62386-102) only supports single-channel dimming. DALI-2 Device Type 8 (DT8) extends support for colour control including tunable white (Tc), RGB, RGBW, and XY colour coordinates. Existing DALI-1 systems may require gateway upgrades or replacement of control gear with DT8-compliant devices to support colour control.',
  },
  {
    question: 'What evidence supports circadian lighting benefits?',
    answer:
      'Research shows circadian-aligned lighting can improve sleep quality (faster onset, longer duration), increase daytime alertness and cognitive performance, reduce symptoms of seasonal affective disorder, and improve patient outcomes in healthcare settings. The WELL Building Standard and EN 12464-1:2021 now include circadian considerations based on this evidence base.',
  },
  {
    question: 'How do I commission scene presets?',
    answer:
      "Scene commissioning involves: (1) programming each luminaire's output for each scene (level, CCT, colour), (2) storing these values in drivers/controllers, (3) assigning scenes to control interfaces, (4) setting fade times and priorities, and (5) documenting all settings. Modern systems use commissioning software to program multiple scenes efficiently. Always provide scene schedules in O&M documentation.",
  },
  {
    question: 'What is the WELL Building Standard and how does it affect lighting design?',
    answer:
      'WELL is a building certification focusing on occupant health and wellbeing. For lighting, it requires: minimum melanopic EDI levels (150+ equivalent lux at the eye), circadian lighting design with appropriate CCT variation, glare control (UGR limits), surface brightness ratios, and options for occupant control. WELL certification is increasingly specified for premium commercial developments.',
  },
];

const HNCModule7Section4_4 = () => {
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
            eyebrow="Module 7 · Section 4 · Subsection 4"
            title="Scene Setting"
            description="Scene controllers, preset configurations, tunable white, colour changing, and circadian lighting for human-centric design"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Design and configure scene controllers for various applications",
              "Specify tunable white systems for CCT adjustment",
              "Understand RGB and RGBW colour changing principles",
              "Apply circadian lighting design for human-centric installations",
              "Meet WELL Building Standard lighting requirements",
              "Commission and document scene-based lighting systems",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Scene Controllers and Preset Configurations">
            <p>Scene controllers are the user interface for recalling pre-programmed lighting configurations. Each scene stores multiple parameters—dimming levels, colour temperatures, and colour values—for groups of luminaires, allowing complex lighting changes with a single button press.</p>
            <p><strong>Key scene controller components:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Scene buttons:</strong> Dedicated buttons for each preset (typically 4-8 scenes per plate)</li>
              <li><strong>Raise/lower controls:</strong> Manual override for brightness adjustment</li>
              <li><strong>Scene memory:</strong> Stored values in drivers (DALI) or central controller</li>
              <li><strong>Fade time settings:</strong> Transition speed from current to recalled state</li>
            </ul>
            <p><strong>Typical Scene Configurations by Space Type</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Boardroom:</strong> Meeting (80%) — Presentation (30%) — Video call (60%) — All off</li>
              <li><strong>Restaurant:</strong> Lunch (70%, 4000K) — Dinner (40%, 2700K) — Cleaning (100%) — Closed (5%)</li>
              <li><strong>Retail:</strong> Trading (100%) — Evening (80%) — Closed (security) — Restock (100%)</li>
              <li><strong>Healthcare ward:</strong> Day (5000K) — Evening (3000K) — Night (dim amber) — Examination</li>
            </ul>
            <p><strong>DALI Scene Commands</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Recall scene 1:</strong> GOTO SCENE 0 (broadcast to group)</li>
              <li><strong>Store current as scene 2:</strong> STORE DTR AS SCENE 1</li>
              <li><strong>Scene storage:</strong> 16 scenes per DALI group (0-15)</li>
              <li><strong>Fade time:</strong> Configurable 0-90 seconds</li>
            </ul>
            <p><strong>Design principle:</strong> Scene names should be intuitive for end users—avoid technical labels like "Scene 3" in favour of descriptive names like "Presentation Mode."</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Tunable White (CCT Adjustment)">
            <p>Tunable white luminaires contain LEDs of different colour temperatures—typically warm white and cool white—allowing the correlated colour temperature (CCT) to be adjusted whilst maintaining consistent light output and colour quality.</p>
            <p><strong>Warm White</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2700K - 3000K range</li>
              <li>Relaxing, comfortable ambience</li>
              <li>Hospitality, residential</li>
              <li>Evening/wind-down periods</li>
            </ul>
            <p><strong>Neutral White</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>4000K typical</li>
              <li>Balanced, natural appearance</li>
              <li>Offices, retail, education</li>
              <li>General working conditions</li>
            </ul>
            <p><strong>Cool White</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>5000K - 6500K range</li>
              <li>Alertness, concentration</li>
              <li>Healthcare, laboratories</li>
              <li>Morning/daytime periods</li>
            </ul>
            <p><strong>Tunable White Control Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DALI DT8 (Tc):</strong> Single address, CCT + level commands — Commercial, healthcare installations</li>
              <li><strong>Dual channel (0-10V):</strong> Separate warm/cool white channels — Retrofit, simple installations</li>
              <li><strong>DMX:</strong> Multiple channels per luminaire — Entertainment, architectural</li>
              <li><strong>Wireless (Bluetooth/Zigbee):</strong> App or gateway control — Residential, small commercial</li>
            </ul>
            <p><strong>Tunable White Specification Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>CCT range:</strong> Ensure range covers application needs (wider range = more flexibility)</li>
              <li><strong>Colour consistency:</strong> Specify MacAdam ellipse (3-step or better) across CCT range</li>
              <li><strong>Dimming performance:</strong> Check minimum dim level maintains CCT accuracy</li>
              <li><strong>CRI consistency:</strong> Verify CRI &gt;80 (preferably &gt;90) across full CCT range</li>
              <li><strong>Efficacy variation:</strong> Note that efficacy typically drops at extreme CCT values</li>
            </ul>
            <p><strong>Best practice:</strong> When specifying tunable white, ensure the control system supports smooth CCT transitions to avoid visible colour stepping during adjustments.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Colour Changing Systems (RGB/RGBW)">
            <p>Colour changing systems use multiple LED colours—typically Red, Green, and Blue (RGB)—to create a wide gamut of colours through additive mixing. RGBW systems add a dedicated White channel for improved white light quality and efficiency.</p>
            <p><strong>Additive Colour Mixing Principles</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Red + Green =</strong> Yellow</li>
              <li><strong>Red + Blue =</strong> Magenta</li>
              <li><strong>Green + Blue =</strong> Cyan</li>
              <li><strong>Red + Green + Blue =</strong> White (approximate)</li>
            </ul>
            <p><strong>RGB vs RGBW Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Control channels:</strong> 3 (R, G, B) — 4 (R, G, B, W)</li>
              <li><strong>White light quality:</strong> Poor CRI, pinkish tint — Good CRI, clean white</li>
              <li><strong>Efficiency at white:</strong> Lower (all LEDs running) — Higher (dedicated white LED)</li>
              <li><strong>Pastel colours:</strong> Limited quality — Better with white mixing</li>
              <li><strong>Cost:</strong> Lower — Higher</li>
              <li><strong>Application:</strong> Saturated colour effects — Architectural, hospitality</li>
            </ul>
            <p><strong>DMX512 for Colour Changing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Universe:</strong> 512 channels per DMX universe</li>
              <li><strong>Addressing:</strong> Each luminaire occupies 3 (RGB) or 4+ (RGBW) consecutive channels</li>
              <li><strong>Data rate:</strong> Up to 44 refreshes per second</li>
              <li><strong>Topology:</strong> Daisy-chain with termination resistor at end</li>
              <li><strong>Cable:</strong> Screened twisted pair, maximum 300m per run</li>
            </ul>
            <p><strong>Colour Changing Applications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Facade and architectural lighting</li>
              <li>- Retail brand colour implementation</li>
              <li>- Entertainment and event venues</li>
              <li>- Feature walls and cove lighting</li>
              <li>- Wayfinding and zoning</li>
            </ul>
            <p><strong>Control Options</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- DMX controllers with show playback</li>
              <li>- DALI DT8 colour control</li>
              <li>- Standalone pixel controllers</li>
              <li>- BMS integration via gateways</li>
              <li>- Astronomical time clock triggers</li>
            </ul>
            <p><strong>Installation note:</strong> RGB/RGBW installations require careful attention to colour consistency between luminaires. Specify binning requirements and consider calibration during commissioning.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Circadian and Human-Centric Lighting">
            <p>Circadian lighting (also called human-centric lighting or HCL) designs artificial lighting to support the body's natural 24-hour biological rhythm. By varying colour temperature and intensity throughout the day, circadian lighting aims to improve alertness, mood, and sleep quality.</p>
            <p><strong>Circadian Rhythm and Light</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Morning (6am-9am):</strong> 5000K-6500K (cool) — High — Suppress melatonin, increase alertness</li>
              <li><strong>Midday (9am-3pm):</strong> 4000K-5000K — Moderate-high — Maintain alertness, support concentration</li>
              <li><strong>Afternoon (3pm-6pm):</strong> 3500K-4000K — Moderate — Gradual transition, reduce stimulation</li>
              <li><strong>Evening (6pm onwards):</strong> 2700K-3000K (warm) — Low — Allow melatonin production, prepare for sleep</li>
            </ul>
            <p><strong>Melanopic Metrics Explained</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Melanopic lux (EML/EDI):</strong> Measures biological effectiveness of light for circadian regulation</li>
              <li><strong>ipRGCs:</strong> Intrinsically photosensitive retinal ganglion cells containing melanopsin</li>
              <li><strong>Peak sensitivity:</strong> ~480nm (blue light wavelengths)</li>
              <li><strong>Measurement:</strong> Vertical illuminance at eye level, not horizontal task illuminance</li>
              <li><strong>WELL requirement:</strong> Minimum 150 melanopic EDI for at least 4 hours daily</li>
            </ul>
            <p><strong>WELL Building Standard - Lighting Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>L01 Light Exposure:</strong> &gt;150 melanopic EDI at eye — Circadian entrainment</li>
              <li><strong>L02 Visual Lighting Design:</strong> Appropriate task illuminance — Visual comfort and performance</li>
              <li><strong>L03 Circadian Lighting Design:</strong> &gt;200 melanopic EDI option — Enhanced circadian support</li>
              <li><strong>L04 Glare Control:</strong> UGR limits per task — Visual comfort</li>
              <li><strong>L06 Visual Balance:</strong> Surface luminance ratios — Reduce eye strain</li>
              <li><strong>L07 Electric Light Quality:</strong> CRI &gt;80, R9 &gt;0 — Colour rendering quality</li>
            </ul>
            <p><strong>Healthcare Applications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Patient recovery rooms (sleep support)</li>
              <li>- Dementia care units (orientation)</li>
              <li>- Neonatal intensive care</li>
              <li>- Staff areas (shift worker alertness)</li>
              <li>- Mental health facilities</li>
            </ul>
            <p><strong>Workplace Applications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Deep-plan offices (limited daylight)</li>
              <li>- Control rooms (24-hour operation)</li>
              <li>- Schools (student concentration)</li>
              <li>- Care homes (elderly wellbeing)</li>
              <li>- Prisons (inmate behaviour)</li>
            </ul>
            <p><strong>Implementation tip:</strong> Circadian lighting requires automatic scheduling via BMS or astronomical time clocks. Manual control alone is insufficient as occupants often do not adjust settings appropriately.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Boardroom Scene Schedule</strong>
            </p>
            <p><strong>Scenario:</strong> Configure 4 scenes for a 20-person boardroom with tunable white luminaires.</p>
            <p>Scene configuration:</p>
            <p>Scene 1 - "Meeting" (default)</p>
            <p>General: 80%, 4000K | Downlights: 70% | Perimeter: 60%</p>
            <p>Fade time: 3 seconds</p>
            <p>Scene 2 - "Presentation"</p>
            <p>General: 20%, 3500K | Downlights: 30% | Perimeter: 10%</p>
            <p>AV screen area: OFF | Fade time: 5 seconds</p>
            <p>Scene 3 - "Video Conference"</p>
            <p>General: 60%, 4000K | Face lighting: 80% | Background: 50%</p>
            <p>No direct glare on screens | Fade time: 3 seconds</p>
            <p>Scene 4 - "All Off"</p>
            <p>All luminaires: OFF | Fade time: 5 seconds</p>
            <p>Controller: 4-button plate at each entrance + AV touch panel integration</p>
            <p>
              <strong>Example 2: Circadian Schedule for Office</strong>
            </p>
            <p><strong>Scenario:</strong> Design a circadian lighting schedule for an open-plan office.</p>
            <p>Automatic time-based schedule (BMS controlled):</p>
            <p>07:00 - Morning boost</p>
            <p>CCT: 6000K | Level: 100% | Melanopic EDI: ~180 lux</p>
            <p>09:00 - Working day</p>
            <p>CCT: 5000K | Level: 85% | Melanopic EDI: ~160 lux</p>
            <p>14:00 - Afternoon</p>
            <p>CCT: 4000K | Level: 80% | Melanopic EDI: ~120 lux</p>
            <p>17:00 - Late afternoon</p>
            <p>CCT: 3500K | Level: 70% | Daylight dimming active</p>
            <p>19:00 - Evening (if occupied)</p>
            <p>CCT: 2700K | Level: 50% | Melanopic EDI: ~40 lux</p>
            <p>WELL compliance: Maintains &gt;150 melanopic EDI 07:00-14:00 (7 hours)</p>
            <p>
              <strong>Example 3: RGBW Facade Specification</strong>
            </p>
            <p><strong>Scenario:</strong> Specify colour changing linear luminaires for building facade.</p>
            <p>Specification requirements:</p>
            <p>Luminaire: RGBW linear, IP66 rated</p>
            <p>Length: 1000mm modules</p>
            <p>Output: 1500lm/m (white), full colour gamut</p>
            <p>Colour consistency: 3-step MacAdam</p>
            <p>Control: DMX512 via weatherproof junction boxes</p>
            <p>Channels per luminaire: 4 (RGBW)</p>
            <p>DMX universe: 1 (covers 128 luminaires)</p>
            <p>Controller: Show playback with astronomical clock</p>
            <p>Scenes programmed:</p>
            <p>Corporate blue (brand colour): R0, G100, B180, W50</p>
            <p>Warm white (evening): R0, G0, B0, W255 @ 2700K</p>
            <p>Dynamic colour wash: 30-minute cycle</p>
            <p>Special events: Manual override from reception</p>
            <p>Cable: Screened Cat5e for DMX, 5-core for RGBW power</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Scene Setting Commissioning Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify all luminaires are correctly addressed and grouped</li>
              <li>Program each scene with client present for approval</li>
              <li>Set appropriate fade times (typically 2-5 seconds)</li>
              <li>Test scene recall from all control points</li>
              <li>Configure scene priorities and override behaviour</li>
              <li>Document all scene parameters in O&M manual</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Tunable white range: <strong>2700K to 6500K</strong> typical</li>
              <li>WELL melanopic EDI: <strong>&gt;150 equivalent lux</strong> at eye level</li>
              <li>DMX universe: <strong>512 channels</strong> maximum</li>
              <li>DALI scenes: <strong>16 scenes</strong> per group (0-15)</li>
              <li>Circadian peak alertness CCT: <strong>5000K-6500K</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Insufficient scene variety</strong> - Provide enough presets for all anticipated uses</li>
                <li><strong>Manual-only circadian control</strong> - Requires automatic scheduling for effectiveness</li>
                <li><strong>Ignoring colour consistency</strong> - Specify LED binning requirements</li>
                <li><strong>Poor labelling</strong> - Use descriptive scene names, not technical codes</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Daylight harvesting
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Smart lighting
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section4_4;
