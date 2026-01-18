/**
 * Level 3 Module 2 Section 2.1 - Energy-Efficient Lighting (LED, Controls, Sensors)
 *
 * LED technology, lighting controls and automatic sensor systems for energy savings
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Energy-Efficient Lighting - Level 3 Module 2 Section 2.1";
const DESCRIPTION = "Understanding LED lighting technology, efficacy ratings, controls, and sensors for energy-efficient electrical installations.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the typical efficacy of modern LED lighting measured in?",
    options: [
      "Watts per square metre",
      "Lumens per watt (lm/W)",
      "Lux per metre",
      "Candela per fitting"
    ],
    correctIndex: 1,
    explanation: "Lighting efficacy is measured in lumens per watt (lm/W), indicating how much visible light output is produced for each watt of electrical power consumed. Modern LEDs achieve 100-200 lm/W."
  },
  {
    id: "check-2",
    question: "What is the primary advantage of LED lighting over traditional incandescent lamps?",
    options: [
      "Lower initial cost",
      "Higher power consumption",
      "Significantly greater energy efficiency (up to 90% less energy)",
      "Better colour rendering in all cases"
    ],
    correctIndex: 2,
    explanation: "LEDs are up to 90% more efficient than incandescent lamps, converting much more electrical energy into light rather than heat. They also have much longer lifespans."
  },
  {
    id: "check-3",
    question: "Which type of lighting control uses infrared or microwave technology to detect room occupancy?",
    options: [
      "Time clock controls",
      "Daylight sensors",
      "Presence/occupancy detectors",
      "Dimmer switches"
    ],
    correctIndex: 2,
    explanation: "Presence detectors (PIR - Passive Infrared, or microwave) detect occupancy and automatically switch lights on when people enter and off when the space is unoccupied."
  },
  {
    id: "check-4",
    question: "What is 'circuit efficacy' and why does it differ from 'lamp efficacy'?",
    options: [
      "They are the same thing",
      "Circuit efficacy includes losses from drivers and control gear",
      "Circuit efficacy only measures the driver efficiency",
      "Lamp efficacy is always higher than circuit efficacy"
    ],
    correctIndex: 1,
    explanation: "Circuit efficacy includes all losses in the lighting circuit including the LED driver/control gear losses. It's always lower than the raw LED chip efficacy and is what Part L requirements refer to."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What minimum circuit efficacy does Part L typically require for fixed lighting in new dwellings?",
    options: [
      "45 lumens per watt",
      "60 lumens per watt",
      "75 lumens per watt",
      "100 lumens per watt"
    ],
    correctAnswer: 2,
    explanation: "Part L requires fixed lighting in new dwellings to achieve a minimum circuit efficacy of 75 lumens per watt, which effectively mandates LED or other high-efficiency lighting."
  },
  {
    id: 2,
    question: "LED stands for:",
    options: [
      "Low Energy Discharge",
      "Light Emitting Diode",
      "Luminous Electrical Device",
      "Linear Emission Display"
    ],
    correctAnswer: 1,
    explanation: "LED stands for Light Emitting Diode - a semiconductor device that emits light when current flows through it. Modern power LEDs are highly efficient light sources."
  },
  {
    id: 3,
    question: "The Colour Rendering Index (CRI) measures:",
    options: [
      "The colour temperature of the light source",
      "How accurately colours appear under the light compared to natural light",
      "The power consumption of coloured LEDs",
      "The lifespan of the LED chip"
    ],
    correctAnswer: 1,
    explanation: "CRI measures how accurately a light source renders colours compared to a reference source. A CRI of 80+ is acceptable for most applications, with 90+ preferred for retail and art galleries."
  },
  {
    id: 4,
    question: "Colour temperature is measured in:",
    options: [
      "Lumens",
      "Watts",
      "Kelvin (K)",
      "Candela"
    ],
    correctAnswer: 2,
    explanation: "Colour temperature is measured in Kelvin (K). Lower values (2700-3000K) produce warm white light, while higher values (4000-6500K) produce cool white or daylight appearance."
  },
  {
    id: 5,
    question: "A PIR sensor operates by detecting:",
    options: [
      "Sound waves from movement",
      "Changes in infrared radiation from warm objects",
      "Air pressure changes",
      "Electromagnetic interference"
    ],
    correctAnswer: 1,
    explanation: "PIR (Passive Infrared) sensors detect changes in infrared radiation emitted by warm objects like people. They're passive because they don't emit energy - they only receive it."
  },
  {
    id: 6,
    question: "What is 'daylight harvesting' in lighting control?",
    options: [
      "Using solar panels to power lights",
      "Dimming artificial lights in response to available natural daylight",
      "Installing skylights",
      "Using daylight-coloured LEDs"
    ],
    correctAnswer: 1,
    explanation: "Daylight harvesting uses photocell sensors to measure available natural light and automatically dim or switch off artificial lighting to maintain required light levels while minimising energy use."
  },
  {
    id: 7,
    question: "DALI stands for:",
    options: [
      "Digital Addressable Lighting Interface",
      "Direct Analogue Light Integration",
      "Distributed Automatic Lamp Indication",
      "Dynamic Ambient Light Intensity"
    ],
    correctAnswer: 0,
    explanation: "DALI (Digital Addressable Lighting Interface) is a standardised protocol for digital control of lighting. It allows individual addressing of luminaires for sophisticated control schemes."
  },
  {
    id: 8,
    question: "The L70 rating of an LED refers to:",
    options: [
      "The number of LEDs in the fitting",
      "The time until light output falls to 70% of initial",
      "The power factor",
      "The dimming range"
    ],
    correctAnswer: 1,
    explanation: "L70 is a measure of LED lifespan - the number of hours until the light output degrades to 70% of initial. Quality LEDs typically have L70 ratings of 50,000+ hours."
  },
  {
    id: 9,
    question: "Which LED driver type is required for dimming compatibility?",
    options: [
      "Any standard LED driver",
      "A dimmable driver compatible with the dimmer type (leading/trailing edge or DALI)",
      "Only DALI drivers can be dimmed",
      "LED drivers cannot be dimmed"
    ],
    correctAnswer: 1,
    explanation: "For dimming, LED fittings must have dimmable drivers compatible with the control method. Leading edge (TRIAC), trailing edge (electronic), and DALI dimmers each require matching driver compatibility."
  },
  {
    id: 10,
    question: "Emergency lighting using LEDs must:",
    options: [
      "Use special emergency-rated LED chips",
      "Meet BS 5266 requirements regardless of lamp type",
      "Always be maintained emergency type",
      "Be connected to three-phase supplies"
    ],
    correctAnswer: 1,
    explanation: "LED emergency lighting must meet the same BS 5266 requirements as any other emergency lighting - including duration, illumination levels, and testing requirements."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I retrofit LEDs into existing fittings?",
    answer: "Often yes, using retrofit LED lamps designed for the existing fitting. However, check compatibility with existing dimmers and control gear. Integrated LED fittings are generally more efficient than retrofit lamps and are required in some applications for Part L compliance."
  },
  {
    question: "Why do some LEDs flicker when dimmed?",
    answer: "Flickering usually occurs when the LED driver isn't compatible with the dimmer type, or the load is below the dimmer's minimum. Solutions include using compatible dimmable LEDs, matching dimmer type (leading/trailing edge), and ensuring minimum load requirements are met."
  },
  {
    question: "What's the difference between warm white and cool white LEDs?",
    answer: "Warm white (2700-3000K) produces a yellowish light similar to incandescent, suitable for homes and hospitality. Cool white (4000-6500K) produces a bluer, more clinical light suitable for offices and industrial spaces. Choice affects ambiance and human circadian rhythms."
  },
  {
    question: "How do I specify LEDs for Part L compliance?",
    answer: "Specify LED fittings with circuit efficacy of at least 75 lm/W. Check manufacturer datasheets for circuit efficacy (not just LED chip efficacy). Integrated LED fittings count as 'controlled fittings' which helps demonstrate compliance."
  },
  {
    question: "Do presence detectors save energy in all situations?",
    answer: "Not always. In areas of constant occupancy, they may not save energy and can cause nuisance switching. They work best in intermittently occupied spaces like corridors, toilets, and storage areas. Consider time delay settings to prevent excessive switching."
  },
  {
    question: "Can LED lighting cause electromagnetic interference?",
    answer: "Poor quality LED drivers can generate electromagnetic interference affecting radio, TV, and other equipment. Always use LEDs with appropriate EMC certifications (CE marking with EMC compliance). Quality products from reputable manufacturers generally don't cause problems."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Energy-Efficient Lighting
          </h1>
          <p className="text-white/80">
            LED technology, controls, and sensors for energy savings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>LED efficacy:</strong> 100-200 lm/W (vs 15 lm/W incandescent)</li>
              <li><strong>Part L minimum:</strong> 75 lm/W circuit efficacy</li>
              <li><strong>Lifespan:</strong> 50,000+ hours typical</li>
              <li><strong>Controls:</strong> PIR, daylight, DALI, timers</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Datasheet showing lm/W, CRI, CCT values</li>
              <li><strong>Use:</strong> Match dimmer type to driver type</li>
              <li><strong>Apply:</strong> PIR sensors for intermittent areas</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "LED technology and efficiency ratings",
              "Colour temperature and colour rendering index",
              "Part L lighting efficacy requirements",
              "Presence detection and daylight harvesting",
              "DALI and other lighting control protocols",
              "Dimmer compatibility and selection"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            LED Technology Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              LEDs (Light Emitting Diodes) have revolutionised lighting efficiency. Unlike incandescent lamps that produce light through heating a filament, LEDs generate light through electroluminescence, converting electrical energy directly into light with minimal heat loss.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key LED specifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Efficacy (lm/W):</strong> Light output per watt - higher is better (100-200 typical)</li>
                <li><strong>Colour Temperature (K):</strong> Warm (2700K) to Cool (6500K)</li>
                <li><strong>CRI (Ra):</strong> Colour Rendering Index - 80+ good, 90+ excellent</li>
                <li><strong>L70 Life:</strong> Hours until 70% of initial output (50,000+ typical)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Always check circuit efficacy on datasheets, not just LED chip efficacy. The driver losses reduce overall efficiency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Lighting Efficiency Compared
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the dramatic efficiency differences between lighting technologies helps explain why regulations now mandate high-efficiency lighting and why upgrading old installations provides excellent energy savings.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Traditional Technologies</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Incandescent: 10-15 lm/W (phased out)</li>
                  <li>Halogen: 15-25 lm/W (limited availability)</li>
                  <li>CFL: 50-70 lm/W (declining use)</li>
                  <li>T8 Fluorescent: 80-100 lm/W</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">LED Technology</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Standard LED: 100-130 lm/W</li>
                  <li>High-efficiency LED: 150-200 lm/W</li>
                  <li>Instant start, no warm-up</li>
                  <li>No mercury content</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Lighting Controls
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective lighting controls can reduce energy consumption by 30-70% beyond the efficiency gains from LED technology alone. The right control strategy depends on the space usage and occupancy patterns.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A commercial toilet block with constant fluorescent lighting running 24/7 consumes 876 kWh per year. Adding PIR sensors that operate lights only when occupied might achieve 80% reduction - saving approximately 700 kWh and over 100 per year.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common control methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Presence detection (PIR/microwave):</strong> Automatic on/off based on occupancy</li>
                <li><strong>Daylight harvesting:</strong> Dimming based on natural light levels</li>
                <li><strong>Time scheduling:</strong> Programmed on/off times</li>
                <li><strong>Scene setting:</strong> Preset lighting configurations</li>
                <li><strong>DALI:</strong> Digital addressing for sophisticated control</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Dimming and Driver Compatibility
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dimming LEDs requires careful matching of dimmer type to LED driver. Incompatible combinations cause flickering, limited dimming range, buzzing, or premature failure. Understanding the options prevents callbacks and customer complaints.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Leading Edge</p>
                <p className="text-white/90 text-xs">TRIAC dimmer - common but needs compatible driver</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Trailing Edge</p>
                <p className="text-white/90 text-xs">Electronic dimmer - smoother, better LED compatibility</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">DALI</p>
                <p className="text-white/90 text-xs">Digital protocol - precise control, addressable</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Always verify dimmer compatibility on the LED fitting datasheet. Check minimum and maximum load ratings - LED loads are often below traditional dimmer minimums.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying LEDs</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check circuit efficacy (not just LED chip efficacy) - min 75 lm/W for Part L</li>
                <li>Match colour temperature to application (warm for homes, cooler for offices)</li>
                <li>Specify CRI 80+ minimum, 90+ for retail/display</li>
                <li>Verify L70 life rating meets expected usage hours</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing Controls</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Position PIR sensors to detect occupants without false triggering</li>
                <li>Consider walk-through time delays in corridors</li>
                <li>Install photocells where they measure task area light, not outside</li>
                <li>Provide manual override where appropriate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mismatched dimmer/driver</strong> - Causes flickering and reduced lifespan</li>
                <li><strong>LED load below dimmer minimum</strong> - Use dimmer with low minimum load</li>
                <li><strong>PIR in always-occupied spaces</strong> - No energy saving, just nuisance</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">LED Specifications</p>
                <ul className="space-y-0.5">
                  <li>Efficacy: 100-200 lm/W</li>
                  <li>Part L minimum: 75 lm/W circuit</li>
                  <li>CRI: 80+ standard, 90+ quality</li>
                  <li>L70 life: 50,000+ hours</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Colour Temperature Guide</p>
                <ul className="space-y-0.5">
                  <li>2700K: Warm white (homes)</li>
                  <li>3000K: Warm white (hospitality)</li>
                  <li>4000K: Cool white (offices)</li>
                  <li>5000-6500K: Daylight (industrial)</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section2-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section2_1;
