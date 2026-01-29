import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Daylight Harvesting - HNC Module 7 Section 4.3";
const DESCRIPTION = "Master daylight harvesting systems for building services: photocell types, open-loop and closed-loop control strategies, sensor placement, setpoint calibration, integration with artificial lighting, and Part L compliance.";

const quickCheckQuestions = [
  {
    id: "closed-loop-definition",
    question: "What is the key characteristic of a closed-loop daylight harvesting system?",
    options: ["It only measures outdoor light levels", "The photosensor measures the combined daylight and artificial light in the space", "It operates on a fixed time schedule", "It requires manual adjustment by occupants"],
    correctIndex: 1,
    explanation: "In a closed-loop system, the photosensor is positioned within the controlled space and measures the total illuminance from both daylight and artificial lighting, automatically adjusting output to maintain a constant target level."
  },
  {
    id: "sensor-placement",
    question: "Why should daylight sensors NOT be placed directly beneath rooflights?",
    options: ["They would receive too little light", "Direct sunlight causes sensor reading spikes leading to unstable control", "Rooflights block sensor signals", "Building regulations prohibit this placement"],
    correctIndex: 1,
    explanation: "Placing sensors directly beneath rooflights exposes them to direct sunlight patches, causing sudden reading spikes that result in unstable, oscillating control. Sensors should be positioned to read typical workspace illuminance levels."
  },
  {
    id: "part-l-requirement",
    question: "What does Building Regulations Approved Document L require regarding daylight-linked lighting control?",
    options: ["Daylight harvesting in all buildings", "Automatic daylight-linked dimming in areas with adequate daylight", "Only manual switching in daylit zones", "Photocells only on external luminaires"],
    correctIndex: 1,
    explanation: "Approved Document L requires that in areas with adequate daylight, lighting should have automatic daylight-linked dimming or switching control to reduce energy consumption when sufficient natural light is available."
  },
  {
    id: "energy-savings",
    question: "What typical energy saving range can daylight harvesting achieve in perimeter zones?",
    options: ["5-10%", "15-25%", "30-60%", "75-90%"],
    correctIndex: 2,
    explanation: "Daylight harvesting typically achieves 30-60% energy savings in perimeter zones with good daylighting, depending on climate, orientation, glazing ratios, and control system quality. Core zones see lower savings (10-30%)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which photocell type uses a silicon photodiode and responds primarily to visible light?",
    options: [
      "Cadmium sulphide (CdS) cell",
      "Photoresistor",
      "Silicon photodiode sensor",
      "Infrared detector"
    ],
    correctAnswer: 2,
    explanation: "Silicon photodiode sensors respond primarily to visible light wavelengths (matching human eye sensitivity) and provide fast, stable response suitable for precision lighting control applications."
  },
  {
    id: 2,
    question: "In an open-loop daylight harvesting system, where is the photosensor typically located?",
    options: ["On the ceiling facing downward into the space", "On the exterior facade or rooftop facing the sky", "Behind luminaire diffusers", "At desk height in the workspace"],
    correctAnswer: 1,
    explanation: "Open-loop systems measure only incoming daylight (not the combined light in the space) using sensors positioned to view the sky or exterior, typically on facades, rooftops, or in skylights facing upward."
  },
  {
    id: 3,
    question: "What is the primary disadvantage of open-loop daylight control compared to closed-loop?",
    options: [
      "Higher initial cost",
      "Cannot account for furniture, blinds, or surface reflectance changes",
      "Slower response time",
      "Requires more sensors"
    ],
    correctAnswer: 1,
    explanation: "Open-loop systems cannot detect how daylight actually reaches the work plane after transmission through glazing, reflection from surfaces, or obstruction by furniture and blinds, potentially causing under- or over-lighting."
  },
  {
    id: 4,
    question: "What is the recommended setpoint for general office areas using daylight harvesting?",
    options: [
      "100 lux maintained",
      "300 lux maintained",
      "500 lux maintained at task level",
      "750 lux maintained"
    ],
    correctAnswer: 2,
    explanation: "BS EN 12464-1 specifies 500 lux maintained illuminance for general office work. Daylight harvesting systems should maintain this level using a combination of daylight and artificial light as required."
  },
  {
    id: 5,
    question: "What dimming range should DALI luminaires support for effective daylight harvesting?",
    options: [
      "100% to 50%",
      "100% to 25%",
      "100% to 10% or lower",
      "100% to 75%"
    ],
    correctAnswer: 2,
    explanation: "Effective daylight harvesting requires luminaires that can dim to 10% or lower (ideally 1%) to maximise energy savings when abundant daylight is available. Limited dimming range restricts potential savings."
  },
  {
    id: 6,
    question: "How should daylight zones be defined for control purposes?",
    options: [
      "One zone for the entire floor plate",
      "Based on distance from windows and daylight availability patterns",
      "One luminaire per zone for maximum control",
      "Based on ceiling grid layout only"
    ],
    correctAnswer: 1,
    explanation: "Daylight zones should be defined based on daylight availability patterns - typically creating separate zones for perimeter (within 4-6m of windows), intermediate, and core areas, each with appropriate control strategy."
  },
  {
    id: 7,
    question: "What causes 'hunting' or oscillation in daylight harvesting systems?",
    options: [
      "Using too many sensors",
      "Incorrect wiring polarity",
      "Sensor detecting its own controlled light changes, creating feedback loops",
      "Low battery in wireless sensors"
    ],
    correctAnswer: 2,
    explanation: "Hunting occurs when the sensor detects changes in its own controlled lighting, creating a feedback loop. This is prevented by correct sensor positioning, appropriate time delays, and proper closed-loop calibration."
  },
  {
    id: 8,
    question: "What is 'deadband' in daylight harvesting control?",
    options: [
      "A zone with no lighting control",
      "A range around the setpoint where no adjustment occurs",
      "The maximum dimming level",
      "A communication protocol timeout"
    ],
    correctAnswer: 1,
    explanation: "Deadband is a range (typically +/- 10-20% of setpoint) where the controller makes no adjustment. This prevents constant small adjustments due to minor illuminance fluctuations and provides stable, comfortable lighting."
  },
  {
    id: 9,
    question: "For DALI-based daylight harvesting, what device typically performs the control algorithm?",
    options: [
      "Each individual luminaire driver",
      "A dedicated DALI controller or application controller",
      "The main building BMS",
      "The photosensor itself"
    ],
    correctAnswer: 1,
    explanation: "DALI application controllers (or multi-sensor controllers) receive sensor inputs, process the control algorithm, and send dimming commands to luminaire groups. Individual drivers respond to commands but don't process daylight logic."
  },
  {
    id: 10,
    question: "What is the recommended fade time for daylight-linked dimming to avoid occupant distraction?",
    options: [
      "Instantaneous (0 seconds)",
      "0.5-1 second",
      "10-30 seconds gradual transition",
      "2-3 minutes"
    ],
    correctAnswer: 2,
    explanation: "Gradual transitions of 10-30 seconds are recommended for daylight-linked dimming. Slow changes are imperceptible to occupants, avoiding distraction while maintaining comfort. Rapid changes are noticeable and distracting."
  },
  {
    id: 11,
    question: "Which orientation typically provides the most stable daylight for harvesting systems?",
    options: [
      "South-facing (in northern hemisphere)",
      "North-facing (in northern hemisphere)",
      "East-facing",
      "West-facing"
    ],
    correctAnswer: 1,
    explanation: "North-facing windows (in the northern hemisphere) receive diffuse skylight without direct sun, providing consistent illumination levels. This reduces control complexity compared to orientations with direct solar gain requiring blind coordination."
  },
  {
    id: 12,
    question: "How should daylight harvesting interact with occupancy sensing?",
    options: [
      "They should operate completely independently",
      "Occupancy detection should override daylight control entirely",
      "Daylight control should only operate when occupancy is detected",
      "Daylight harvesting should prevent occupancy timeout"
    ],
    correctAnswer: 2,
    explanation: "Daylight harvesting should only operate when occupancy is detected. When spaces are unoccupied, lights should switch off regardless of daylight levels. This hierarchy maximises energy savings from both strategies."
  }
];

const faqs = [
  {
    question: "What's the difference between open-loop and closed-loop daylight control?",
    answer: "Open-loop systems measure only incoming daylight (sensor facing sky/exterior) and adjust artificial light based on predicted workspace illuminance. Closed-loop systems measure actual illuminance at the work plane (sensor facing downward into space), detecting combined daylight and artificial light. Closed-loop provides more accurate control as it accounts for blinds, furniture, and surface changes, but requires careful sensor positioning to avoid detecting its own controlled luminaires."
  },
  {
    question: "How do I calibrate a daylight harvesting system?",
    answer: "Calibration typically involves: (1) Set target lux level at the work plane using a calibrated lux meter, (2) Under no-daylight conditions (night or blinds closed), adjust artificial lighting to achieve target, (3) Set this as the 'full output' reference, (4) During daylight, verify the system dims appropriately while maintaining target lux, (5) Adjust sensor sensitivity and time constants to eliminate hunting or slow response, (6) Document settings for future maintenance. Most modern systems have auto-calibration features but manual verification is recommended."
  },
  {
    question: "Why do occupants sometimes complain about daylight harvesting systems?",
    answer: "Common complaints include: (1) Noticeable dimming/brightening if fade times are too short, (2) Hunting/oscillation from poor calibration, (3) Insufficient light if setpoints are too low or sensors poorly positioned, (4) Visible differences between adjacent luminaires if zones are too small, (5) System overriding personal preferences. Proper commissioning, appropriate fade times (10-30 seconds), adequate deadband, and allowing some manual override typically resolve issues."
  },
  {
    question: "Can daylight harvesting work with LED luminaires?",
    answer: "Yes, LED luminaires are ideal for daylight harvesting. They offer: (1) Wide dimming range (typically 1-100%), (2) Instant response with no restrike delays, (3) Consistent colour temperature across dimming range (with quality drivers), (4) Long life unaffected by switching cycles. Ensure luminaires have DALI or 1-10V dimming capability and specify drivers rated for the required dimming range. Some economy drivers only dim to 10% which limits savings potential."
  },
  {
    question: "How should daylight sensors be positioned to avoid problems?",
    answer: "Sensor positioning guidelines: (1) Face ceiling-mounted sensors downward at 45-60 degrees toward windows for closed-loop, (2) Avoid direct sunlight patches - sensor should see typical workspace lighting, (3) Position away from highly reflective surfaces, (4) Don't place directly beneath skylights, (5) Consider one sensor controlling multiple luminaires in similar daylight conditions, (6) Ensure sensor field of view matches the controlled zone, (7) For open-loop, position with clear sky view avoiding building reflections."
  },
  {
    question: "What are the Part L compliance requirements for daylight-linked control?",
    answer: "Approved Document L (Conservation of fuel and power) requires that in spaces with adequate daylight availability, lighting should have automatic daylight-linked dimming or switching. The Non-Domestic Building Services Compliance Guide specifies: automatic controls should reduce output when daylight exceeds the design illuminance, control zones should relate to daylight availability patterns, and controls should not prevent beneficial daylight use. Systems must be commissioned to demonstrate energy savings."
  }
];

const HNCModule7Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Daylight Harvesting
          </h1>
          <p className="text-white/80">
            Photocell types, closed-loop control, sensor placement and integration with artificial lighting
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Purpose:</strong> Reduce artificial lighting when daylight is sufficient</li>
              <li className="pl-1"><strong>Closed-loop:</strong> Sensor measures actual workspace illuminance</li>
              <li className="pl-1"><strong>Open-loop:</strong> Sensor measures incoming daylight only</li>
              <li className="pl-1"><strong>Energy savings:</strong> 30-60% in perimeter zones</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Part L:</strong> Requires daylight-linked control in daylit areas</li>
              <li className="pl-1"><strong>Target:</strong> Maintain 500 lux for general offices</li>
              <li className="pl-1"><strong>Integration:</strong> Works with DALI, occupancy sensing</li>
              <li className="pl-1"><strong>Commissioning:</strong> Critical for occupant acceptance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify photocell types and their operating characteristics",
              "Distinguish between open-loop and closed-loop control strategies",
              "Apply sensor placement principles for stable control",
              "Calibrate daylight harvesting systems for target illuminance",
              "Integrate daylight control with DALI and occupancy sensing",
              "Ensure Part L compliance for daylight-linked lighting control"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Photocell Types and Operating Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Photocell Types and Operating Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Daylight harvesting relies on photosensors (photocells) to measure light levels and adjust
              artificial lighting accordingly. Different sensor technologies suit different applications,
              and understanding their characteristics is essential for effective system design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Photocell Technologies:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Silicon photodiodes:</strong> Fast response, visible light sensitivity matching human eye, stable output, preferred for precision control</li>
                <li className="pl-1"><strong>Cadmium sulphide (CdS) cells:</strong> Slower response, wider spectral range including infrared, lower cost, legacy applications</li>
                <li className="pl-1"><strong>Phototransistors:</strong> Built-in amplification, good sensitivity, used in compact sensor packages</li>
                <li className="pl-1"><strong>Integrated photosensor ICs:</strong> Digital output, temperature compensation, programmable sensitivity, modern DALI sensors</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Photosensor Characteristics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Importance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Spectral response</td>
                      <td className="border border-white/10 px-3 py-2">Wavelength sensitivity range</td>
                      <td className="border border-white/10 px-3 py-2">Should match human eye (photopic) for accurate lux readings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Field of view</td>
                      <td className="border border-white/10 px-3 py-2">Angular coverage of sensor</td>
                      <td className="border border-white/10 px-3 py-2">Determines area measured; affects mounting angle</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sensitivity range</td>
                      <td className="border border-white/10 px-3 py-2">Lux range (e.g., 10-2000 lux)</td>
                      <td className="border border-white/10 px-3 py-2">Must cover expected illuminance variations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Response time</td>
                      <td className="border border-white/10 px-3 py-2">Speed of output change</td>
                      <td className="border border-white/10 px-3 py-2">Fast response needs controller filtering to prevent hunting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cosine correction</td>
                      <td className="border border-white/10 px-3 py-2">Angle-dependent response matching</td>
                      <td className="border border-white/10 px-3 py-2">Required for accurate illuminance measurement at angles</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">DALI Light Sensors</p>
              <p className="text-sm text-white">
                Modern DALI-2 light sensors communicate digitally, providing calibrated lux values directly to
                controllers. They include temperature compensation, configurable sensitivity curves, and can
                report illuminance values for multiple zones. DALI sensors eliminate analogue signal issues and
                simplify commissioning through software calibration.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Sensors with photopic correction (V-lambda curve matching) provide readings that correlate with perceived brightness, essential for maintaining visual comfort.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Open-Loop vs Closed-Loop Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Open-Loop vs Closed-Loop Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Daylight harvesting systems use two fundamental control strategies: open-loop (feedforward)
              and closed-loop (feedback). Each has distinct advantages and limitations that affect system
              design, commissioning, and energy savings potential.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Open-Loop Control</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Sensor measures incoming daylight only</li>
                  <li className="pl-1">Mounted on facade, roof, or in skylight</li>
                  <li className="pl-1">Pre-calculated relationship to workspace</li>
                  <li className="pl-1">Cannot detect obstructions or changes</li>
                  <li className="pl-1">Simpler commissioning, less accurate</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Closed-Loop Control</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Sensor measures actual workspace illuminance</li>
                  <li className="pl-1">Ceiling-mounted facing work plane</li>
                  <li className="pl-1">Maintains constant target lux level</li>
                  <li className="pl-1">Adapts to furniture, blinds, dirt on glazing</li>
                  <li className="pl-1">Requires careful positioning to avoid hunting</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Strategy Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Open-Loop</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Closed-Loop</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Accuracy</td>
                      <td className="border border-white/10 px-3 py-2">Lower - relies on calibration assumptions</td>
                      <td className="border border-white/10 px-3 py-2">Higher - measures actual conditions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Adaptation</td>
                      <td className="border border-white/10 px-3 py-2">Cannot adapt to interior changes</td>
                      <td className="border border-white/10 px-3 py-2">Automatically adapts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stability</td>
                      <td className="border border-white/10 px-3 py-2">Inherently stable (no feedback)</td>
                      <td className="border border-white/10 px-3 py-2">Risk of hunting if poorly commissioned</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Simpler - set transfer function</td>
                      <td className="border border-white/10 px-3 py-2">More complex - requires calibration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Best application</td>
                      <td className="border border-white/10 px-3 py-2">Skylights, atria, consistent spaces</td>
                      <td className="border border-white/10 px-3 py-2">Offices, variable spaces, high accuracy needs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-400 mb-2">Hybrid Approaches</p>
              <p className="text-sm text-white">
                Some advanced systems combine both approaches: using open-loop sensing for rapid response to
                changing outdoor conditions, while closed-loop sensors trim the output for accurate maintained
                illuminance. This provides fast, stable response whilst adapting to interior conditions.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Closed-loop systems are preferred for occupied spaces where visual comfort is critical. Open-loop suits areas where sensor access to the work plane is difficult or where stable conditions prevail.
            </p>
          </div>
        </section>

        {/* Section 3: Sensor Placement and Calibration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Sensor Placement and Calibration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct sensor placement is critical for stable, effective daylight harvesting. Poor positioning
              causes hunting, occupant complaints, and reduced energy savings. The sensor must represent typical
              illuminance conditions within its controlled zone without detecting its own lighting adjustments.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Sensor Positioning Guidelines</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Distance from luminaires:</strong> Minimum 1.5m from controlled luminaires to reduce feedback</li>
                <li className="pl-1"><strong>Angle towards windows:</strong> Tilt 30-60 degrees toward daylight source for closed-loop</li>
                <li className="pl-1"><strong>Avoid direct sun patches:</strong> Position where direct sunlight won't strike sensor</li>
                <li className="pl-1"><strong>Representative location:</strong> Measure typical workspace illuminance, not extremes</li>
                <li className="pl-1"><strong>One sensor per zone:</strong> Each daylight zone should have independent control</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Daylight Zone Definition</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Zone Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Distance from Window</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Primary daylight zone</td>
                      <td className="border border-white/10 px-3 py-2">0-3m</td>
                      <td className="border border-white/10 px-3 py-2">Full daylight harvesting, often OFF during daylight</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Secondary daylight zone</td>
                      <td className="border border-white/10 px-3 py-2">3-6m</td>
                      <td className="border border-white/10 px-3 py-2">Proportional dimming, significant savings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transition zone</td>
                      <td className="border border-white/10 px-3 py-2">6-9m</td>
                      <td className="border border-white/10 px-3 py-2">Limited dimming, may require supplementary control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Core zone</td>
                      <td className="border border-white/10 px-3 py-2">&gt;9m</td>
                      <td className="border border-white/10 px-3 py-2">Minimal daylight benefit, occupancy control preferred</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Calibration Process:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Measure target illuminance at task level with calibrated lux meter (e.g., 500 lux)</li>
                <li className="pl-1"><strong>Step 2:</strong> Under dark conditions, set artificial lighting to achieve target</li>
                <li className="pl-1"><strong>Step 3:</strong> Record sensor reading at this condition as reference point</li>
                <li className="pl-1"><strong>Step 4:</strong> Set proportional gain and time constants for smooth response</li>
                <li className="pl-1"><strong>Step 5:</strong> Configure deadband (typically +/- 50 lux) to prevent hunting</li>
                <li className="pl-1"><strong>Step 6:</strong> Set fade time (10-30 seconds) for imperceptible transitions</li>
                <li className="pl-1"><strong>Step 7:</strong> Test under varying daylight conditions and adjust as required</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Avoiding Hunting</p>
              <p className="text-sm text-white">
                Hunting (oscillation) occurs when the sensor detects changes caused by its own controlled luminaires.
                Prevention: position sensors to primarily detect daylight changes, not artificial light; use appropriate
                time delays (30-60 seconds minimum between adjustments); configure adequate deadband; reduce proportional
                gain if oscillation persists.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Commissioning tip:</strong> Document sensor locations, setpoints, and calibration values for future maintenance. Seasonal recalibration may be needed as daylight patterns change.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Integration with Artificial Lighting and BMS */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Integration with Artificial Lighting and BMS
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective daylight harvesting requires seamless integration with other lighting control functions
              and building management systems. The control hierarchy must prioritise safety, then energy efficiency,
              whilst maintaining occupant comfort and override capabilities.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Hierarchy (Priority Order)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">1. Safety Functions</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Emergency lighting activation</li>
                    <li>Fire alarm response (full on)</li>
                    <li>Evacuation lighting modes</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">2. Occupancy Control</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Lights off when unoccupied</li>
                    <li>Auto-on or manual-on selection</li>
                    <li>Timeout period management</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">3. Daylight Harvesting</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Continuous dimming control</li>
                    <li>Target lux maintenance</li>
                    <li>Zone-by-zone adjustment</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">4. User Override</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Manual scene selection</li>
                    <li>Temporary level adjustment</li>
                    <li>Timed override restoration</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DALI Integration</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Daylight Harvesting Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DALI light sensor</td>
                      <td className="border border-white/10 px-3 py-2">Measures illuminance, reports to controller</td>
                      <td className="border border-white/10 px-3 py-2">Primary input for control algorithm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Application controller</td>
                      <td className="border border-white/10 px-3 py-2">Processes sensor data, issues commands</td>
                      <td className="border border-white/10 px-3 py-2">Executes daylight control algorithm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Luminaire drivers</td>
                      <td className="border border-white/10 px-3 py-2">Receive arc power commands</td>
                      <td className="border border-white/10 px-3 py-2">Dim to commanded level (0-100%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Occupancy sensor</td>
                      <td className="border border-white/10 px-3 py-2">Detects presence/absence</td>
                      <td className="border border-white/10 px-3 py-2">Enables/disables daylight control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS gateway</td>
                      <td className="border border-white/10 px-3 py-2">Protocol translation, monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Energy monitoring, global scheduling</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Energy Savings Potential</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>Perimeter zones (0-6m from windows):</strong> 30-60% reduction in lighting energy</p>
                <p><strong>Intermediate zones (6-9m):</strong> 15-30% reduction</p>
                <p><strong>Core zones (&gt;9m):</strong> 10-20% with skylights, minimal with side windows only</p>
                <p><strong>Combined with occupancy:</strong> Up to 70% total savings in some applications</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Compliance Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Automatic daylight-linked dimming or switching in areas with adequate daylight</li>
                <li className="pl-1">Control zones relating to daylight availability patterns</li>
                <li className="pl-1">Photoelectric control to reduce lighting output when daylight exceeds design illuminance</li>
                <li className="pl-1">Commissioning to demonstrate controls operate correctly</li>
                <li className="pl-1">Documentation of control setpoints and calibration</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>BMS integration:</strong> Provide BACnet or Modbus connection points for energy monitoring, alarm reporting, and schedule coordination. The BMS should not directly control dimming levels but can provide global overrides and energy data collection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Floor Daylight Zone Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Open-plan office, 15m deep from south-facing curtain wall, 500 lux target.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Zone Layout Design:</p>
                <p className="mt-2">Zone A: 0-4m from window (perimeter)</p>
                <p className="ml-4">- Full daylight harvesting</p>
                <p className="ml-4">- Often at minimum output during daylight</p>
                <p className="ml-4">- Estimated savings: 50-60%</p>
                <p className="mt-2">Zone B: 4-8m from window (intermediate)</p>
                <p className="ml-4">- Proportional daylight control</p>
                <p className="ml-4">- Typically 40-70% output</p>
                <p className="ml-4">- Estimated savings: 25-35%</p>
                <p className="mt-2">Zone C: 8-15m from window (core)</p>
                <p className="ml-4">- Limited daylight benefit</p>
                <p className="ml-4">- Occupancy control primary strategy</p>
                <p className="ml-4">- Estimated savings: 10-15%</p>
                <p className="mt-2 text-green-400">Sensor placement: One sensor per zone, ceiling-mounted,</p>
                <p className="text-green-400">angled 45° toward windows, 2m minimum from luminaires</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Closed-Loop Calibration Procedure</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Commission DALI daylight harvesting in Zone B (4-8m from window).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Night-time calibration</p>
                <p className="ml-4">- Blinds fully closed, no daylight</p>
                <p className="ml-4">- Set luminaires to 100% output</p>
                <p className="ml-4">- Measure: 650 lux at desk level</p>
                <p className="ml-4">- Record sensor reading: 85 (arbitrary units)</p>
                <p className="mt-2">Step 2: Calculate reference</p>
                <p className="ml-4">- Target: 500 lux maintained</p>
                <p className="ml-4">- Reference ratio: 500/650 = 76.9%</p>
                <p className="ml-4">- Sensor setpoint: 85 x 0.769 = 65 units</p>
                <p className="mt-2">Step 3: Configure controller</p>
                <p className="ml-4">- Setpoint: 65 units</p>
                <p className="ml-4">- Deadband: +/- 5 units (~50 lux)</p>
                <p className="ml-4">- Fade time: 20 seconds</p>
                <p className="ml-4">- Minimum output: 10%</p>
                <p className="mt-2 text-green-400">Step 4: Daytime verification - 500 lux maintained</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Energy Savings Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate annual savings for daylight harvesting in 500m² office.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Baseline lighting load:</p>
                <p className="ml-4">- 500m² @ 10 W/m² = 5,000W installed</p>
                <p className="ml-4">- Operating hours: 2,500 hrs/year</p>
                <p className="ml-4">- Baseline consumption: 12,500 kWh/year</p>
                <p className="mt-2">Zone analysis (assuming 50% perimeter):</p>
                <p className="ml-4">- Zone A (250m²): 45% average dimming savings</p>
                <p className="ml-4">- Zone B (250m²): 20% average dimming savings</p>
                <p className="mt-2">Energy saved:</p>
                <p className="ml-4">- Zone A: 6,250 kWh x 0.45 = 2,813 kWh</p>
                <p className="ml-4">- Zone B: 6,250 kWh x 0.20 = 1,250 kWh</p>
                <p className="ml-4">- Total saving: 4,063 kWh/year (32.5%)</p>
                <p className="mt-2 text-green-400">At £0.15/kWh: £609/year saving</p>
                <p className="text-green-400">CO₂ reduction: 0.94 tonnes/year (0.233 kg/kWh)</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Define daylight zones based on window proximity and glazing ratio</li>
                <li className="pl-1">Specify luminaires with wide dimming range (1-100% preferred)</li>
                <li className="pl-1">Select photosensors with appropriate spectral response and field of view</li>
                <li className="pl-1">Plan sensor positions avoiding direct sunlight and controlled luminaires</li>
                <li className="pl-1">Document target lux levels per zone per BS EN 12464-1</li>
                <li className="pl-1">Coordinate with blind control for solar gain management</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Target illuminance: <strong>500 lux</strong> for general offices (BS EN 12464-1)</li>
                <li className="pl-1">Fade time: <strong>10-30 seconds</strong> for imperceptible transitions</li>
                <li className="pl-1">Deadband: <strong>+/- 10-20%</strong> of setpoint to prevent hunting</li>
                <li className="pl-1">Perimeter zone depth: <strong>4-6m</strong> from windows typical</li>
                <li className="pl-1">Energy savings: <strong>30-60%</strong> in perimeter zones</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sensor beneath skylights</strong> - Direct sun causes unstable control</li>
                <li className="pl-1"><strong>Fast fade times</strong> - Noticeable changes distract occupants</li>
                <li className="pl-1"><strong>Single zone for deep spaces</strong> - Daylight varies significantly with depth</li>
                <li className="pl-1"><strong>No user override</strong> - Occupants feel lack of control</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Control Strategies</p>
                <ul className="space-y-0.5">
                  <li>Open-loop: sensor measures incoming daylight</li>
                  <li>Closed-loop: sensor measures workspace illuminance</li>
                  <li>Deadband prevents constant adjustment</li>
                  <li>Fade time 10-30s for comfort</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Zone Guidelines</p>
                <ul className="space-y-0.5">
                  <li>Primary: 0-4m from window (50-60% savings)</li>
                  <li>Secondary: 4-8m (25-35% savings)</li>
                  <li>Core: &gt;8m (occupancy control preferred)</li>
                  <li>Part L requires daylight control in daylit areas</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section4-4">
              Next: Section 4.4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section4_3;
