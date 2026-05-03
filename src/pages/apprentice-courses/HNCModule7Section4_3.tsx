/**
 * Module 7 · Section 4 · Subsection 3 — Daylight Harvesting
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Photocell types, closed-loop control, sensor placement and integration with artificial lighting
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

const TITLE = 'Daylight Harvesting - HNC Module 7 Section 4.3';
const DESCRIPTION =
  'Master daylight harvesting systems for building services: photocell types, open-loop and closed-loop control strategies, sensor placement, setpoint calibration, integration with artificial lighting, and Part L compliance.';

const quickCheckQuestions = [
  {
    id: 'closed-loop-definition',
    question: 'What is the key characteristic of a closed-loop daylight harvesting system?',
    options: [
      'It only measures outdoor light levels',
      'The photosensor measures the combined daylight and artificial light in the space',
      'It operates on a fixed time schedule',
      'It requires manual adjustment by occupants',
    ],
    correctIndex: 1,
    explanation:
      'In a closed-loop system, the photosensor is positioned within the controlled space and measures the total illuminance from both daylight and artificial lighting, automatically adjusting output to maintain a constant target level.',
  },
  {
    id: 'sensor-placement',
    question: 'Why should daylight sensors NOT be placed directly beneath rooflights?',
    options: [
      'They would receive too little light',
      'Direct sunlight causes sensor reading spikes leading to unstable control',
      'Rooflights block sensor signals',
      'Building regulations prohibit this placement',
    ],
    correctIndex: 1,
    explanation:
      'Placing sensors directly beneath rooflights exposes them to direct sunlight patches, causing sudden reading spikes that result in unstable, oscillating control. Sensors should be positioned to read typical workspace illuminance levels.',
  },
  {
    id: 'part-l-requirement',
    question:
      'What does Building Regulations Approved Document L require regarding daylight-linked lighting control?',
    options: [
      'Daylight harvesting in all buildings',
      'Automatic daylight-linked dimming in areas with adequate daylight',
      'Only manual switching in daylit zones',
      'Photocells only on external luminaires',
    ],
    correctIndex: 1,
    explanation:
      'Approved Document L requires that in areas with adequate daylight, lighting should have automatic daylight-linked dimming or switching control to reduce energy consumption when sufficient natural light is available.',
  },
  {
    id: 'energy-savings',
    question:
      'What typical energy saving range can daylight harvesting achieve in perimeter zones?',
    options: ['5-10%', '15-25%', '30-60%', '75-90%'],
    correctIndex: 2,
    explanation:
      'Daylight harvesting typically achieves 30-60% energy savings in perimeter zones with good daylighting, depending on climate, orientation, glazing ratios, and control system quality. Core zones see lower savings (10-30%).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which photocell type uses a silicon photodiode and responds primarily to visible light?',
    options: [
      'Cadmium sulphide (CdS) cell',
      'Photoresistor',
      'Silicon photodiode sensor',
      'Infrared detector',
    ],
    correctAnswer: 2,
    explanation:
      'Silicon photodiode sensors respond primarily to visible light wavelengths (matching human eye sensitivity) and provide fast, stable response suitable for precision lighting control applications.',
  },
  {
    id: 2,
    question:
      'In an open-loop daylight harvesting system, where is the photosensor typically located?',
    options: [
      'On the ceiling facing downward into the space',
      'On the exterior facade or rooftop facing the sky',
      'Behind luminaire diffusers',
      'At desk height in the workspace',
    ],
    correctAnswer: 1,
    explanation:
      'Open-loop systems measure only incoming daylight (not the combined light in the space) using sensors positioned to view the sky or exterior, typically on facades, rooftops, or in skylights facing upward.',
  },
  {
    id: 3,
    question:
      'What is the primary disadvantage of open-loop daylight control compared to closed-loop?',
    options: [
      'Higher initial cost',
      'Cannot account for furniture, blinds, or surface reflectance changes',
      'Slower response time',
      'Requires more sensors',
    ],
    correctAnswer: 1,
    explanation:
      'Open-loop systems cannot detect how daylight actually reaches the work plane after transmission through glazing, reflection from surfaces, or obstruction by furniture and blinds, potentially causing under- or over-lighting.',
  },
  {
    id: 4,
    question:
      'What is the recommended setpoint for general office areas using daylight harvesting?',
    options: [
      '100 lux maintained',
      '300 lux maintained',
      '500 lux maintained at task level',
      '750 lux maintained',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 12464-1 specifies 500 lux maintained illuminance for general office work. Daylight harvesting systems should maintain this level using a combination of daylight and artificial light as required.',
  },
  {
    id: 5,
    question:
      'What dimming range should DALI luminaires support for effective daylight harvesting?',
    options: ['100% to 50%', '100% to 25%', '100% to 10% or lower', '100% to 75%'],
    correctAnswer: 2,
    explanation:
      'Effective daylight harvesting requires luminaires that can dim to 10% or lower (ideally 1%) to maximise energy savings when abundant daylight is available. Limited dimming range restricts potential savings.',
  },
  {
    id: 6,
    question: 'How should daylight zones be defined for control purposes?',
    options: [
      'One zone for the entire floor plate',
      'Based on distance from windows and daylight availability patterns',
      'One luminaire per zone for maximum control',
      'Based on ceiling grid layout only',
    ],
    correctAnswer: 1,
    explanation:
      'Daylight zones should be defined based on daylight availability patterns - typically creating separate zones for perimeter (within 4-6m of windows), intermediate, and core areas, each with appropriate control strategy.',
  },
  {
    id: 7,
    question: "What causes 'hunting' or oscillation in daylight harvesting systems?",
    options: [
      'Using too many sensors',
      'Incorrect wiring polarity',
      'Sensor detecting its own controlled light changes, creating feedback loops',
      'Low battery in wireless sensors',
    ],
    correctAnswer: 2,
    explanation:
      'Hunting occurs when the sensor detects changes in its own controlled lighting, creating a feedback loop. This is prevented by correct sensor positioning, appropriate time delays, and proper closed-loop calibration.',
  },
  {
    id: 8,
    question: "What is 'deadband' in daylight harvesting control?",
    options: [
      'A zone with no lighting control',
      'A range around the setpoint where no adjustment occurs',
      'The maximum dimming level',
      'A communication protocol timeout',
    ],
    correctAnswer: 1,
    explanation:
      'Deadband is a range (typically +/- 10-20% of setpoint) where the controller makes no adjustment. This prevents constant small adjustments due to minor illuminance fluctuations and provides stable, comfortable lighting.',
  },
  {
    id: 9,
    question:
      'For DALI-based daylight harvesting, what device typically performs the control algorithm?',
    options: [
      'Each individual luminaire driver',
      'A dedicated DALI controller or application controller',
      'The main building BMS',
      'The photosensor itself',
    ],
    correctAnswer: 1,
    explanation:
      "DALI application controllers (or multi-sensor controllers) receive sensor inputs, process the control algorithm, and send dimming commands to luminaire groups. Individual drivers respond to commands but don't process daylight logic.",
  },
  {
    id: 10,
    question:
      'What is the recommended fade time for daylight-linked dimming to avoid occupant distraction?',
    options: [
      'Instantaneous (0 seconds)',
      '0.5-1 second',
      '10-30 seconds gradual transition',
      '2-3 minutes',
    ],
    correctAnswer: 2,
    explanation:
      'Gradual transitions of 10-30 seconds are recommended for daylight-linked dimming. Slow changes are imperceptible to occupants, avoiding distraction while maintaining comfort. Rapid changes are noticeable and distracting.',
  },
  {
    id: 11,
    question:
      'Which orientation typically provides the most stable daylight for harvesting systems?',
    options: [
      'South-facing (in northern hemisphere)',
      'North-facing (in northern hemisphere)',
      'East-facing',
      'West-facing',
    ],
    correctAnswer: 1,
    explanation:
      'North-facing windows (in the northern hemisphere) receive diffuse skylight without direct sun, providing consistent illumination levels. This reduces control complexity compared to orientations with direct solar gain requiring blind coordination.',
  },
  {
    id: 12,
    question: 'How should daylight harvesting interact with occupancy sensing?',
    options: [
      'They should operate completely independently',
      'Occupancy detection should override daylight control entirely',
      'Daylight control should only operate when occupancy is detected',
      'Daylight harvesting should prevent occupancy timeout',
    ],
    correctAnswer: 2,
    explanation:
      'Daylight harvesting should only operate when occupancy is detected. When spaces are unoccupied, lights should switch off regardless of daylight levels. This hierarchy maximises energy savings from both strategies.',
  },
];

const faqs = [
  {
    question: "What's the difference between open-loop and closed-loop daylight control?",
    answer:
      'Open-loop systems measure only incoming daylight (sensor facing sky/exterior) and adjust artificial light based on predicted workspace illuminance. Closed-loop systems measure actual illuminance at the work plane (sensor facing downward into space), detecting combined daylight and artificial light. Closed-loop provides more accurate control as it accounts for blinds, furniture, and surface changes, but requires careful sensor positioning to avoid detecting its own controlled luminaires.',
  },
  {
    question: 'How do I calibrate a daylight harvesting system?',
    answer:
      "Calibration typically involves: (1) Set target lux level at the work plane using a calibrated lux meter, (2) Under no-daylight conditions (night or blinds closed), adjust artificial lighting to achieve target, (3) Set this as the 'full output' reference, (4) During daylight, verify the system dims appropriately while maintaining target lux, (5) Adjust sensor sensitivity and time constants to eliminate hunting or slow response, (6) Document settings for future maintenance. Most modern systems have auto-calibration features but manual verification is recommended.",
  },
  {
    question: 'Why do occupants sometimes complain about daylight harvesting systems?',
    answer:
      'Common complaints include: (1) Noticeable dimming/brightening if fade times are too short, (2) Hunting/oscillation from poor calibration, (3) Insufficient light if setpoints are too low or sensors poorly positioned, (4) Visible differences between adjacent luminaires if zones are too small, (5) System overriding personal preferences. Proper commissioning, appropriate fade times (10-30 seconds), adequate deadband, and allowing some manual override typically resolve issues.',
  },
  {
    question: 'Can daylight harvesting work with LED luminaires?',
    answer:
      'Yes, LED luminaires are ideal for daylight harvesting. They offer: (1) Wide dimming range (typically 1-100%), (2) Instant response with no restrike delays, (3) Consistent colour temperature across dimming range (with quality drivers), (4) Long life unaffected by switching cycles. Ensure luminaires have DALI or 1-10V dimming capability and specify drivers rated for the required dimming range. Some economy drivers only dim to 10% which limits savings potential.',
  },
  {
    question: 'How should daylight sensors be positioned to avoid problems?',
    answer:
      "Sensor positioning guidelines: (1) Face ceiling-mounted sensors downward at 45-60 degrees toward windows for closed-loop, (2) Avoid direct sunlight patches - sensor should see typical workspace lighting, (3) Position away from highly reflective surfaces, (4) Don't place directly beneath skylights, (5) Consider one sensor controlling multiple luminaires in similar daylight conditions, (6) Ensure sensor field of view matches the controlled zone, (7) For open-loop, position with clear sky view avoiding building reflections.",
  },
  {
    question: 'What are the Part L compliance requirements for daylight-linked control?',
    answer:
      'Approved Document L (Conservation of fuel and power) requires that in spaces with adequate daylight availability, lighting should have automatic daylight-linked dimming or switching. The Non-Domestic Building Services Compliance Guide specifies: automatic controls should reduce output when daylight exceeds the design illuminance, control zones should relate to daylight availability patterns, and controls should not prevent beneficial daylight use. Systems must be commissioned to demonstrate energy savings.',
  },
];

const HNCModule7Section4_3 = () => {
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
            eyebrow="Module 7 · Section 4 · Subsection 3"
            title="Daylight Harvesting"
            description="Photocell types, closed-loop control, sensor placement and integration with artificial lighting"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Identify photocell types and their operating characteristics",
              "Distinguish between open-loop and closed-loop control strategies",
              "Apply sensor placement principles for stable control",
              "Calibrate daylight harvesting systems for target illuminance",
              "Integrate daylight control with DALI and occupancy sensing",
              "Ensure Part L compliance for daylight-linked lighting control",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Photocell Types and Operating Principles">
            <p>Daylight harvesting relies on photosensors (photocells) to measure light levels and adjust artificial lighting accordingly. Different sensor technologies suit different applications, and understanding their characteristics is essential for effective system design.</p>
            <p><strong>Common Photocell Technologies:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Silicon photodiodes:</strong> Fast response, visible light sensitivity matching human eye, stable output, preferred for precision control</li>
              <li><strong>Cadmium sulphide (CdS) cells:</strong> Slower response, wider spectral range including infrared, lower cost, legacy applications</li>
              <li><strong>Phototransistors:</strong> Built-in amplification, good sensitivity, used in compact sensor packages</li>
              <li><strong>Integrated photosensor ICs:</strong> Digital output, temperature compensation, programmable sensitivity, modern DALI sensors</li>
            </ul>
            <p><strong>Photosensor Characteristics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Spectral response:</strong> Wavelength sensitivity range — Should match human eye (photopic) for accurate lux readings</li>
              <li><strong>Field of view:</strong> Angular coverage of sensor — Determines area measured; affects mounting angle</li>
              <li><strong>Sensitivity range:</strong> Lux range (e.g., 10-2000 lux) — Must cover expected illuminance variations</li>
              <li><strong>Response time:</strong> Speed of output change — Fast response needs controller filtering to prevent hunting</li>
              <li><strong>Cosine correction:</strong> Angle-dependent response matching — Required for accurate illuminance measurement at angles</li>
            </ul>
            <p><strong>DALI Light Sensors</strong></p>
            <p>Modern DALI-2 light sensors communicate digitally, providing calibrated lux values directly to controllers. They include temperature compensation, configurable sensitivity curves, and can report illuminance values for multiple zones. DALI sensors eliminate analogue signal issues and simplify commissioning through software calibration.</p>
            <p><strong>Design consideration:</strong> Sensors with photopic correction (V-lambda curve matching) provide readings that correlate with perceived brightness, essential for maintaining visual comfort.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Open-Loop vs Closed-Loop Control">
            <p>Daylight harvesting systems use two fundamental control strategies: open-loop (feedforward) and closed-loop (feedback). Each has distinct advantages and limitations that affect system design, commissioning, and energy savings potential.</p>
            <p><strong>Open-Loop Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sensor measures incoming daylight only</li>
              <li>Mounted on facade, roof, or in skylight</li>
              <li>Pre-calculated relationship to workspace</li>
              <li>Cannot detect obstructions or changes</li>
              <li>Simpler commissioning, less accurate</li>
            </ul>
            <p><strong>Closed-Loop Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sensor measures actual workspace illuminance</li>
              <li>Ceiling-mounted facing work plane</li>
              <li>Maintains constant target lux level</li>
              <li>Adapts to furniture, blinds, dirt on glazing</li>
              <li>Requires careful positioning to avoid hunting</li>
            </ul>
            <p><strong>Control Strategy Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Accuracy:</strong> Lower - relies on calibration assumptions — Higher - measures actual conditions</li>
              <li><strong>Adaptation:</strong> Cannot adapt to interior changes — Automatically adapts</li>
              <li><strong>Stability:</strong> Inherently stable (no feedback) — Risk of hunting if poorly commissioned</li>
              <li><strong>Commissioning:</strong> Simpler - set transfer function — More complex - requires calibration</li>
              <li><strong>Best application:</strong> Skylights, atria, consistent spaces — Offices, variable spaces, high accuracy needs</li>
            </ul>
            <p><strong>Hybrid Approaches</strong></p>
            <p>Some advanced systems combine both approaches: using open-loop sensing for rapid response to changing outdoor conditions, while closed-loop sensors trim the output for accurate maintained illuminance. This provides fast, stable response whilst adapting to interior conditions.</p>
            <p><strong>Best practice:</strong> Closed-loop systems are preferred for occupied spaces where visual comfort is critical. Open-loop suits areas where sensor access to the work plane is difficult or where stable conditions prevail.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Sensor Placement and Calibration">
            <p>Correct sensor placement is critical for stable, effective daylight harvesting. Poor positioning causes hunting, occupant complaints, and reduced energy savings. The sensor must represent typical illuminance conditions within its controlled zone without detecting its own lighting adjustments.</p>
            <p><strong>Sensor Positioning Guidelines</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Distance from luminaires:</strong> Minimum 1.5m from controlled luminaires to reduce feedback</li>
              <li><strong>Angle towards windows:</strong> Tilt 30-60 degrees toward daylight source for closed-loop</li>
              <li><strong>Avoid direct sun patches:</strong> Position where direct sunlight won't strike sensor</li>
              <li><strong>Representative location:</strong> Measure typical workspace illuminance, not extremes</li>
              <li><strong>One sensor per zone:</strong> Each daylight zone should have independent control</li>
            </ul>
            <p><strong>Daylight Zone Definition</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Primary daylight zone:</strong> 0-3m — Full daylight harvesting, often OFF during daylight</li>
              <li><strong>Secondary daylight zone:</strong> 3-6m — Proportional dimming, significant savings</li>
              <li><strong>Transition zone:</strong> 6-9m — Limited dimming, may require supplementary control</li>
              <li><strong>Core zone:</strong> &gt;9m — Minimal daylight benefit, occupancy control preferred</li>
            </ul>
            <p><strong>Calibration Process:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Step 1:</strong> Measure target illuminance at task level with calibrated lux meter (e.g., 500 lux)</li>
              <li><strong>Step 2:</strong> Under dark conditions, set artificial lighting to achieve target</li>
              <li><strong>Step 3:</strong> Record sensor reading at this condition as reference point</li>
              <li><strong>Step 4:</strong> Set proportional gain and time constants for smooth response</li>
              <li><strong>Step 5:</strong> Configure deadband (typically +/- 50 lux) to prevent hunting</li>
              <li><strong>Step 6:</strong> Set fade time (10-30 seconds) for imperceptible transitions</li>
              <li><strong>Step 7:</strong> Test under varying daylight conditions and adjust as required</li>
            </ul>
            <p><strong>Avoiding Hunting</strong></p>
            <p>Hunting (oscillation) occurs when the sensor detects changes caused by its own controlled luminaires. Prevention: position sensors to primarily detect daylight changes, not artificial light; use appropriate time delays (30-60 seconds minimum between adjustments); configure adequate deadband; reduce proportional gain if oscillation persists.</p>
            <p><strong>Commissioning tip:</strong> Document sensor locations, setpoints, and calibration values for future maintenance. Seasonal recalibration may be needed as daylight patterns change.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Integration with Artificial Lighting and BMS">
            <p>Effective daylight harvesting requires seamless integration with other lighting control functions and building management systems. The control hierarchy must prioritise safety, then energy efficiency, whilst maintaining occupant comfort and override capabilities.</p>
            <p><strong>Control Hierarchy (Priority Order)</strong></p>
            <p><strong>1. Safety Functions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Emergency lighting activation</li>
              <li>Fire alarm response (full on)</li>
              <li>Evacuation lighting modes</li>
            </ul>
            <p><strong>2. Occupancy Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lights off when unoccupied</li>
              <li>Auto-on or manual-on selection</li>
              <li>Timeout period management</li>
            </ul>
            <p><strong>3. Daylight Harvesting</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Continuous dimming control</li>
              <li>Target lux maintenance</li>
              <li>Zone-by-zone adjustment</li>
            </ul>
            <p><strong>4. User Override</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Manual scene selection</li>
              <li>Temporary level adjustment</li>
              <li>Timed override restoration</li>
            </ul>
            <p><strong>DALI Integration</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DALI light sensor:</strong> Measures illuminance, reports to controller — Primary input for control algorithm</li>
              <li><strong>Application controller:</strong> Processes sensor data, issues commands — Executes daylight control algorithm</li>
              <li><strong>Luminaire drivers:</strong> Receive arc power commands — Dim to commanded level (0-100%)</li>
              <li><strong>Occupancy sensor:</strong> Detects presence/absence — Enables/disables daylight control</li>
              <li><strong>BMS gateway:</strong> Protocol translation, monitoring — Energy monitoring, global scheduling</li>
            </ul>
            <p><strong>Energy Savings Potential</strong></p>
            <p><strong>Perimeter zones (0-6m from windows):</strong> 30-60% reduction in lighting energy</p>
            <p><strong>Intermediate zones (6-9m):</strong> 15-30% reduction</p>
            <p><strong>Core zones (&gt;9m):</strong> 10-20% with skylights, minimal with side windows only</p>
            <p><strong>Combined with occupancy:</strong> Up to 70% total savings in some applications</p>
            <p><strong>Part L Compliance Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Automatic daylight-linked dimming or switching in areas with adequate daylight</li>
              <li>Control zones relating to daylight availability patterns</li>
              <li>Photoelectric control to reduce lighting output when daylight exceeds design illuminance</li>
              <li>Commissioning to demonstrate controls operate correctly</li>
              <li>Documentation of control setpoints and calibration</li>
            </ul>
            <p><strong>BMS integration:</strong> Provide BACnet or Modbus connection points for energy monitoring, alarm reporting, and schedule coordination. The BMS should not directly control dimming levels but can provide global overrides and energy data collection.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Office Floor Daylight Zone Design</strong>
            </p>
            <p><strong>Scenario:</strong> Open-plan office, 15m deep from south-facing curtain wall, 500 lux target.</p>
            <p>Zone Layout Design:</p>
            <p>Zone A: 0-4m from window (perimeter)</p>
            <p>- Full daylight harvesting</p>
            <p>- Often at minimum output during daylight</p>
            <p>- Estimated savings: 50-60%</p>
            <p>Zone B: 4-8m from window (intermediate)</p>
            <p>- Proportional daylight control</p>
            <p>- Typically 40-70% output</p>
            <p>- Estimated savings: 25-35%</p>
            <p>Zone C: 8-15m from window (core)</p>
            <p>- Limited daylight benefit</p>
            <p>- Occupancy control primary strategy</p>
            <p>- Estimated savings: 10-15%</p>
            <p>Sensor placement: One sensor per zone, ceiling-mounted,</p>
            <p>angled 45° toward windows, 2m minimum from luminaires</p>
            <p>
              <strong>Example 2: Closed-Loop Calibration Procedure</strong>
            </p>
            <p><strong>Scenario:</strong> Commission DALI daylight harvesting in Zone B (4-8m from window).</p>
            <p>Step 1: Night-time calibration</p>
            <p>- Blinds fully closed, no daylight</p>
            <p>- Set luminaires to 100% output</p>
            <p>- Measure: 650 lux at desk level</p>
            <p>- Record sensor reading: 85 (arbitrary units)</p>
            <p>Step 2: Calculate reference</p>
            <p>- Target: 500 lux maintained</p>
            <p>- Reference ratio: 500/650 = 76.9%</p>
            <p>- Sensor setpoint: 85 x 0.769 = 65 units</p>
            <p>Step 3: Configure controller</p>
            <p>- Setpoint: 65 units</p>
            <p>- Deadband: +/- 5 units (~50 lux)</p>
            <p>- Fade time: 20 seconds</p>
            <p>- Minimum output: 10%</p>
            <p>Step 4: Daytime verification - 500 lux maintained</p>
            <p>
              <strong>Example 3: Energy Savings Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate annual savings for daylight harvesting in 500m² office.</p>
            <p>Baseline lighting load:</p>
            <p>- 500m² @ 10 W/m² = 5,000W installed</p>
            <p>- Operating hours: 2,500 hrs/year</p>
            <p>- Baseline consumption: 12,500 kWh/year</p>
            <p>Zone analysis (assuming 50% perimeter):</p>
            <p>- Zone A (250m²): 45% average dimming savings</p>
            <p>- Zone B (250m²): 20% average dimming savings</p>
            <p>Energy saved:</p>
            <p>- Zone A: 6,250 kWh x 0.45 = 2,813 kWh</p>
            <p>- Zone B: 6,250 kWh x 0.20 = 1,250 kWh</p>
            <p>- Total saving: 4,063 kWh/year (32.5%)</p>
            <p>At £0.15/kWh: £609/year saving</p>
            <p>CO₂ reduction: 0.94 tonnes/year (0.233 kg/kWh)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Design Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Define daylight zones based on window proximity and glazing ratio</li>
              <li>Specify luminaires with wide dimming range (1-100% preferred)</li>
              <li>Select photosensors with appropriate spectral response and field of view</li>
              <li>Plan sensor positions avoiding direct sunlight and controlled luminaires</li>
              <li>Document target lux levels per zone per BS EN 12464-1</li>
              <li>Coordinate with blind control for solar gain management</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Target illuminance: <strong>500 lux</strong> for general offices (BS EN 12464-1)</li>
              <li>Fade time: <strong>10-30 seconds</strong> for imperceptible transitions</li>
              <li>Deadband: <strong>+/- 10-20%</strong> of setpoint to prevent hunting</li>
              <li>Perimeter zone depth: <strong>4-6m</strong> from windows typical</li>
              <li>Energy savings: <strong>30-60%</strong> in perimeter zones</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Sensor beneath skylights</strong> - Direct sun causes unstable control</li>
                <li><strong>Fast fade times</strong> - Noticeable changes distract occupants</li>
                <li><strong>Single zone for deep spaces</strong> - Daylight varies significantly with depth</li>
                <li><strong>No user override</strong> - Occupants feel lack of control</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Occupancy sensing
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Scene setting
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section4_3;
