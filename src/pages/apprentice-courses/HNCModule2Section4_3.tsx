import { ArrowLeft, Lightbulb, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Lamp Types and Efficacy - HNC Module 2 Section 4.3";
const DESCRIPTION = "Understanding LED, fluorescent, and discharge lamp technologies, efficacy ratings (lm/W), lamp life, and building services applications.";

const quickCheckQuestions = [
  {
    id: "efficacy-definition",
    question: "What does lamp efficacy measure?",
    options: [
      "Total light output in lumens",
      "Lumens produced per watt of electrical power (lm/W)",
      "Lamp life in hours",
      "Colour temperature in Kelvin"
    ],
    correctIndex: 1,
    explanation: "Efficacy (lm/W) measures how efficiently a lamp converts electrical power into light. Higher efficacy means more light for less energy - a key factor in building services energy efficiency."
  },
  {
    id: "led-efficacy",
    question: "What is the typical efficacy range for modern LED luminaires?",
    options: ["40-60 lm/W", "80-100 lm/W", "100-150 lm/W", "200-250 lm/W"],
    correctIndex: 2,
    explanation: "Modern LED luminaires typically achieve 100-150 lm/W efficacy, with premium products exceeding 160 lm/W. This is significantly higher than fluorescent (80-100 lm/W) or discharge lamps."
  },
  {
    id: "l70-life",
    question: "What does L70 rated life mean for an LED product?",
    options: [
      "70% of lamps will have failed",
      "Light output has fallen to 70% of initial",
      "The lamp operates at 70% power",
      "70,000 hours of operation"
    ],
    correctIndex: 1,
    explanation: "L70 life is when lumen output has depreciated to 70% of initial output. This is the standard measure for LED useful life, typically 50,000-100,000 hours for quality products."
  },
  {
    id: "fluorescent-operation",
    question: "How does a fluorescent lamp produce light?",
    options: [
      "A heated filament glows white hot",
      "UV radiation from mercury discharge excites phosphor coating",
      "Direct LED semiconductor emission",
      "Heating of a metal halide mixture"
    ],
    correctIndex: 1,
    explanation: "Fluorescent lamps use electrical discharge through mercury vapour to produce UV radiation, which excites phosphor coatings on the tube wall to emit visible light."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which lamp type currently offers the highest efficacy for general lighting?",
    options: [
      "T5 fluorescent",
      "Metal halide",
      "LED",
      "Compact fluorescent"
    ],
    correctAnswer: 2,
    explanation: "LED technology now offers the highest efficacy for general lighting applications, typically 100-150+ lm/W compared to fluorescent (80-100 lm/W) and metal halide (80-100 lm/W)."
  },
  {
    id: 2,
    question: "A 45W LED luminaire produces 5400 lumens. What is its efficacy?",
    options: ["90 lm/W", "120 lm/W", "135 lm/W", "180 lm/W"],
    correctAnswer: 1,
    explanation: "Efficacy = Lumens / Watts = 5400 / 45 = 120 lm/W. This is typical of good quality modern LED luminaires."
  },
  {
    id: 3,
    question: "What is the main advantage of T5 over T8 fluorescent tubes?",
    options: [
      "Lower initial cost",
      "Higher efficacy and smaller diameter",
      "Longer lamp life",
      "Better colour rendering"
    ],
    correctAnswer: 1,
    explanation: "T5 tubes (16mm diameter) offer higher efficacy (~100 lm/W vs ~90 lm/W) than T8 (26mm) and allow more compact luminaire designs. However, both are being superseded by LED."
  },
  {
    id: 4,
    question: "Why do discharge lamps like metal halide require control gear?",
    options: [
      "To change the colour temperature",
      "To limit current and provide starting voltage",
      "To improve colour rendering",
      "To reduce lamp life"
    ],
    correctAnswer: 1,
    explanation: "Discharge lamps have negative resistance characteristics - without current limiting ballast, they would draw increasing current until destruction. Control gear also provides high starting voltage."
  },
  {
    id: 5,
    question: "What is the typical rated life of quality LED luminaires (L70)?",
    options: ["10,000-20,000 hours", "25,000-35,000 hours", "50,000-100,000 hours", "150,000+ hours"],
    correctAnswer: 2,
    explanation: "Quality LED luminaires typically have L70 rated life of 50,000-100,000 hours. Premium products may exceed this. This far exceeds fluorescent (15,000-25,000h) and HID (10,000-20,000h)."
  },
  {
    id: 6,
    question: "Which lamp type would traditionally be used for high-bay industrial lighting at 10m+ mounting height?",
    options: [
      "T8 fluorescent",
      "High-pressure sodium or metal halide",
      "Compact fluorescent",
      "Incandescent"
    ],
    correctAnswer: 1,
    explanation: "High-bay applications traditionally used HID lamps (HPS or MH) for their high lumen output and ability to project light over long distances. LED high-bay is now the preferred choice for new installations."
  },
  {
    id: 7,
    question: "What causes the delay in metal halide lamps reaching full light output?",
    options: [
      "Ballast warm-up time",
      "Time for metal halides to vaporise and reach operating temperature",
      "Phosphor activation",
      "LED driver stabilisation"
    ],
    correctAnswer: 1,
    explanation: "Metal halide lamps require several minutes (3-5 min typically) for the metal halide compounds to vaporise and the arc tube to reach operating temperature and pressure."
  },
  {
    id: 8,
    question: "What is the efficacy of a typical 100W incandescent lamp?",
    options: ["10-15 lm/W", "40-50 lm/W", "80-90 lm/W", "100+ lm/W"],
    correctAnswer: 0,
    explanation: "Incandescent lamps have very low efficacy (10-15 lm/W) as most energy is converted to heat rather than light. This is why they have been phased out for general lighting under energy regulations."
  },
  {
    id: 9,
    question: "Which lamp type is most suitable for dimming in a commercial building?",
    options: [
      "High-pressure sodium",
      "Metal halide",
      "LED (with compatible driver)",
      "Compact fluorescent"
    ],
    correctAnswer: 2,
    explanation: "LED (with DALI or 1-10V dimmable drivers) offers the best dimming performance - smooth dimming to low levels, instant response, and maintained efficacy. HID lamps cannot be dimmed effectively."
  },
  {
    id: 10,
    question: "What is the primary environmental concern with fluorescent lamp disposal?",
    options: [
      "High energy consumption",
      "Mercury content requiring specialist disposal",
      "UV radiation hazard",
      "Heat generation"
    ],
    correctAnswer: 1,
    explanation: "Fluorescent lamps contain mercury (2-5mg typically) which is hazardous waste. WEEE regulations require proper disposal through licensed waste handlers. This is a consideration in whole-life assessments."
  },
  {
    id: 11,
    question: "What LED specification indicates how much light output falls within a certain time period?",
    options: ["CRI", "CCT", "Lumen maintenance (Lx)", "Power factor"],
    correctAnswer: 2,
    explanation: "Lumen maintenance ratings (L70, L80, L90) indicate the percentage of initial lumens remaining at rated life hours. L70 at 50,000h means 70% output remains at 50,000 hours."
  },
  {
    id: 12,
    question: "Which control protocol is most commonly specified for commercial LED dimming?",
    options: ["PWM", "0-10V only", "DALI (Digital Addressable Lighting Interface)", "DMX"],
    correctAnswer: 2,
    explanation: "DALI is the standard protocol for commercial building lighting control, offering individual luminaire addressing, status feedback, and integration with BMS systems. It's specified in most commercial projects."
  }
];

const faqs = [
  {
    question: "Should I always specify the highest efficacy LED available?",
    answer: "Not necessarily. While efficacy matters for energy costs, other factors include: initial cost, CRI/colour quality, glare control, dimming performance, warranty, and manufacturer reliability. A 110 lm/W LED from a reputable manufacturer with good optics may be better than a 140 lm/W product with poor glare control or short warranty. Consider whole-life cost and performance, not just efficacy."
  },
  {
    question: "Why are fluorescent tubes still used when LEDs are more efficient?",
    answer: "While new installations should generally use LED, fluorescent tubes remain in many existing buildings where: luminaires are still functional, replacing would require significant investment, or maintenance contracts include lamp replacement. LED retrofit tubes (LED tubes that fit fluorescent fittings) offer a middle ground but require careful selection and may void luminaire warranties."
  },
  {
    question: "What is the restrike time for HID lamps and why does it matter?",
    answer: "Hot restrike time is how long an HID lamp takes to restart after being turned off while hot - typically 5-15 minutes for metal halide. During this time the lamp cannot restart as internal pressure is too high. This affects emergency lighting provisions and means HID installations often need instant-on backup lighting (LED or fluorescent)."
  },
  {
    question: "How do I verify LED product quality and lifetime claims?",
    answer: "Look for: LM-79 test data (luminaire photometrics), LM-80 data (LED chip lumen maintenance), TM-21 projections (lifetime calculation), ENEC/CE marks, reputable manufacturers, and realistic warranties (5 years minimum, ideally 7+). Be wary of unusually high efficacy claims without supporting test data. CIBSE TM65 provides guidance on evaluating LED products."
  },
  {
    question: "What is the difference between LED chips, modules, and luminaires?",
    answer: "LED chips (dies) are the semiconductor components. LED modules combine chips with drivers and thermal management. LED luminaires are complete fittings including optics, housing, and controls. Efficacy is quoted at different levels - chip efficacy (200+ lm/W possible) is always higher than luminaire efficacy (100-150 lm/W) due to optical, thermal, and driver losses. Always compare luminaire efficacy for design purposes."
  },
  {
    question: "When might I still specify discharge lamps instead of LED?",
    answer: "Specific applications where discharge may still be considered include: some sports floodlighting (though LED now dominates), very high output requirements, extremely harsh environments, or where replacement must match existing aesthetics. However, LED now covers most applications with better performance. Check current product availability as HID manufacturing is declining rapidly."
  }
];

const HNCModule2Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Lightbulb className="h-4 w-4" />
            <span>Module 2.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Lamp Types and Efficacy
          </h1>
          <p className="text-white/80">
            LED, fluorescent, and discharge lamp technologies for building services applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Efficacy:</strong> Lumens per watt (lm/W)</li>
              <li className="pl-1"><strong>LED:</strong> 100-150+ lm/W, 50,000-100,000h life</li>
              <li className="pl-1"><strong>Fluorescent:</strong> 80-100 lm/W, 15,000-25,000h</li>
              <li className="pl-1"><strong>Discharge:</strong> 80-150 lm/W, 10,000-20,000h</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>New projects:</strong> LED is standard choice</li>
              <li className="pl-1"><strong>Refurb:</strong> LED retrofit or replacement</li>
              <li className="pl-1"><strong>Controls:</strong> DALI dimming specification</li>
              <li className="pl-1"><strong>Life:</strong> L70/L80 ratings for LED</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define efficacy and calculate lm/W for different lamp types",
              "Compare LED, fluorescent, and discharge lamp characteristics",
              "Understand lamp life ratings including L70/L80 for LEDs",
              "Select appropriate lamp types for building services applications",
              "Explain control gear requirements for different lamp types",
              "Consider environmental and disposal requirements"
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

        {/* Section 1: Lamp Efficacy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Lamp Efficacy and Energy Efficiency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Efficacy measures how efficiently a light source converts electrical power into visible light, expressed
              in lumens per watt (lm/W). Higher efficacy directly translates to lower energy costs and reduced carbon
              emissions - a critical factor in modern building services design.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Efficacy Formula</p>
              <p className="font-mono text-center text-lg mb-2">Efficacy (lm/W) = Luminous Flux (lm) / Power (W)</p>
              <div className="text-xs text-white/70 text-center mt-2">
                Higher efficacy = more light for less power = lower running costs
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Efficacy Comparison by Lamp Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Lamp Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficacy (lm/W)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Incandescent</td>
                      <td className="border border-white/10 px-3 py-2">10-15</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Phased out</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Halogen</td>
                      <td className="border border-white/10 px-3 py-2">15-25</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Phased out</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Compact fluorescent (CFL)</td>
                      <td className="border border-white/10 px-3 py-2">50-70</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Legacy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">T8 fluorescent</td>
                      <td className="border border-white/10 px-3 py-2">80-95</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Legacy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">T5 fluorescent</td>
                      <td className="border border-white/10 px-3 py-2">90-105</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Legacy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Metal halide</td>
                      <td className="border border-white/10 px-3 py-2">80-100</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Legacy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High-pressure sodium</td>
                      <td className="border border-white/10 px-3 py-2">100-150</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Legacy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">LED luminaire</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">100-150+</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Standard</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> System efficacy (luminaire) is lower than lamp efficacy due to optical, thermal, and driver losses. Always use luminaire data for design.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: LED Technology */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            LED Technology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Light Emitting Diodes (LEDs) are now the standard technology for building services lighting. They offer
              superior efficacy, long life, instant switching, excellent dimming capability, and continuously improving
              performance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">LED Advantages</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">High efficacy: 100-150+ lm/W</li>
                  <li className="pl-1">Long life: 50,000-100,000h (L70)</li>
                  <li className="pl-1">Instant on/off - no warm-up</li>
                  <li className="pl-1">Excellent dimming (DALI, 1-10V)</li>
                  <li className="pl-1">No mercury content</li>
                  <li className="pl-1">Wide CCT and CRI options</li>
                  <li className="pl-1">Compact form factors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">LED Considerations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Higher initial cost (reducing)</li>
                  <li className="pl-1">Thermal management critical</li>
                  <li className="pl-1">Driver quality affects life</li>
                  <li className="pl-1">Glare control important</li>
                  <li className="pl-1">Some flicker concerns (poor drivers)</li>
                  <li className="pl-1">Product quality varies widely</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LED Life Ratings Explained</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-black/30">
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">L70</td>
                      <td className="border border-white/10 px-3 py-2">70% lumen maintenance</td>
                      <td className="border border-white/10 px-3 py-2">General interior</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">L80</td>
                      <td className="border border-white/10 px-3 py-2">80% lumen maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Quality commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">L90</td>
                      <td className="border border-white/10 px-3 py-2">90% lumen maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Premium applications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">B10</td>
                      <td className="border border-white/10 px-3 py-2">10% failure rate</td>
                      <td className="border border-white/10 px-3 py-2">Combined: L70B10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Example: L70B10 at 60,000h means at 60,000 hours, 90% of units maintain at least 70% output</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification tip:</strong> Always request LM-80 test data and TM-21 lifetime projections for LED products. Verify claims with independent test data.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Fluorescent Lamps */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fluorescent Lamps
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While LED is now the standard for new installations, fluorescent lamps remain in many existing buildings.
              Understanding their characteristics is important for maintenance, refurbishment, and retrofit decisions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">How Fluorescent Lamps Work</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Electrical discharge passes through mercury vapour</li>
                <li className="pl-1">Mercury atoms emit ultraviolet (UV) radiation</li>
                <li className="pl-1">UV excites phosphor coating on tube wall</li>
                <li className="pl-1">Phosphor fluoresces, emitting visible light</li>
                <li className="pl-1">Phosphor composition determines colour/CCT</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fluorescent Tube Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Diameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficacy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">T12</td>
                      <td className="border border-white/10 px-3 py-2">38mm</td>
                      <td className="border border-white/10 px-3 py-2">60-70 lm/W</td>
                      <td className="border border-white/10 px-3 py-2">Obsolete</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">T8</td>
                      <td className="border border-white/10 px-3 py-2">26mm</td>
                      <td className="border border-white/10 px-3 py-2">80-95 lm/W</td>
                      <td className="border border-white/10 px-3 py-2">Most common legacy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">T5</td>
                      <td className="border border-white/10 px-3 py-2">16mm</td>
                      <td className="border border-white/10 px-3 py-2">90-105 lm/W</td>
                      <td className="border border-white/10 px-3 py-2">High efficiency type</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CFL</td>
                      <td className="border border-white/10 px-3 py-2">Various</td>
                      <td className="border border-white/10 px-3 py-2">50-70 lm/W</td>
                      <td className="border border-white/10 px-3 py-2">Compact form</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Gear Types</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Switch-start:</strong> Magnetic, starter, older</li>
                  <li className="pl-1"><strong>HF electronic:</strong> Higher efficacy, no flicker</li>
                  <li className="pl-1"><strong>Dimmable HF:</strong> 1-10V or DALI control</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Considerations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Contains mercury (2-5mg typically)</li>
                  <li className="pl-1">WEEE disposal requirements</li>
                  <li className="pl-1">Specialist recycling needed</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>EU regulations:</strong> T8 and T5 fluorescent tubes are being phased out under EU RoHS and Ecodesign regulations. Plan for LED replacement.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 4: Discharge Lamps */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Discharge Lamps (HID)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              High Intensity Discharge (HID) lamps were traditionally used for high-output applications - industrial
              high-bays, sports lighting, street lighting. While largely superseded by LED, understanding HID
              characteristics remains relevant for maintenance of existing installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HID Lamp Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficacy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">CRI</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Traditional Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High-pressure sodium (HPS)</td>
                      <td className="border border-white/10 px-3 py-2">100-150</td>
                      <td className="border border-white/10 px-3 py-2">20-25</td>
                      <td className="border border-white/10 px-3 py-2">Street lighting, industrial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Metal halide (MH)</td>
                      <td className="border border-white/10 px-3 py-2">80-100</td>
                      <td className="border border-white/10 px-3 py-2">70-90</td>
                      <td className="border border-white/10 px-3 py-2">Retail, sports, industrial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ceramic metal halide (CMH)</td>
                      <td className="border border-white/10 px-3 py-2">90-110</td>
                      <td className="border border-white/10 px-3 py-2">80-95</td>
                      <td className="border border-white/10 px-3 py-2">Retail, display</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low-pressure sodium (LPS)</td>
                      <td className="border border-white/10 px-3 py-2">150-200</td>
                      <td className="border border-white/10 px-3 py-2">0</td>
                      <td className="border border-white/10 px-3 py-2">Obsolete (monochromatic)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">HID Characteristics</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">High lumen output per lamp</li>
                  <li className="pl-1">Warm-up time: 3-10 minutes</li>
                  <li className="pl-1">Hot restrike: 5-15 minutes</li>
                  <li className="pl-1">Cannot be dimmed (generally)</li>
                  <li className="pl-1">Requires ballast and ignitor</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why LED Has Replaced HID</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Instant on - no warm-up</li>
                  <li className="pl-1">No restrike delay</li>
                  <li className="pl-1">Full dimming capability</li>
                  <li className="pl-1">Better colour rendering</li>
                  <li className="pl-1">Longer life, less maintenance</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Gear for Discharge Lamps</p>
              <p className="text-sm text-white">
                HID lamps require: <strong>Ballast</strong> (current limiting), <strong>Ignitor</strong> (high voltage
                starting pulse), and often a <strong>capacitor</strong> (power factor correction). Electronic ballasts
                offer better performance than magnetic types. The control gear typically adds 10-15% to lamp wattage
                (system watts &gt; lamp watts).
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Replacement planning:</strong> HID lamp and ballast availability is declining as manufacturers focus on LED. Plan proactive LED replacement rather than waiting for failure.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Efficacy Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A LED panel consumes 32W and produces 3840 lumens. What is its efficacy?
                Compare to a 36W T8 fluorescent producing 3350 lumens.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>LED efficacy = 3840 lm / 32 W = <strong>120 lm/W</strong></p>
                <p>T8 efficacy = 3350 lm / 36 W = <strong>93 lm/W</strong></p>
                <p className="mt-2">Efficiency improvement = (120 - 93) / 93 × 100 = <strong>29% more efficient</strong></p>
                <p className="mt-2 text-white/60">The LED also has longer life and better dimming capability</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Energy Savings</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An office has 100 × 2-lamp T8 fittings (72W each including ballast), operating
                3000 hours/year. Calculate annual savings if replaced with 40W LED panels.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Current consumption = 100 × 72W × 3000h = 21,600 kWh/year</p>
                <p>LED consumption = 100 × 40W × 3000h = 12,000 kWh/year</p>
                <p>Saving = 21,600 - 12,000 = <strong>9,600 kWh/year</strong></p>
                <p className="mt-2">At £0.15/kWh = <strong>£1,440/year energy saving</strong></p>
                <p className="mt-2 text-white/60">Plus reduced lamp replacement and maintenance costs</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Life Cycle Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Compare lamp replacement requirements over 50,000 operating hours for
                T5 fluorescent (20,000h life) versus LED (L70 at 50,000h).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>T5 replacements = 50,000 / 20,000 = <strong>2.5 lamp changes</strong> (minimum 2)</p>
                <p>LED replacements = <strong>0 lamp changes</strong> (still at 70% output)</p>
                <p className="mt-2">For 100 luminaires:</p>
                <p>T5: 200+ lamps, multiple maintenance visits</p>
                <p>LED: Zero lamp changes, potential driver replacement only</p>
                <p className="mt-2 text-white/60">Significant labour and disruption savings with LED</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Lamp Selection Criteria</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Efficacy:</strong> Higher = lower running costs</li>
                <li className="pl-1"><strong>Life (hours):</strong> Affects maintenance costs</li>
                <li className="pl-1"><strong>CRI:</strong> Colour quality requirement</li>
                <li className="pl-1"><strong>CCT:</strong> Colour appearance specification</li>
                <li className="pl-1"><strong>Dimming:</strong> Control requirements</li>
                <li className="pl-1"><strong>Warranty:</strong> Manufacturer backing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">LED Specification Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Luminaire efficacy (not chip efficacy)</li>
                <li className="pl-1">L70 or L80 life rating with hours</li>
                <li className="pl-1">LM-79 photometric test report</li>
                <li className="pl-1">LM-80/TM-21 life data</li>
                <li className="pl-1">DALI compatibility if required</li>
                <li className="pl-1">5+ year warranty minimum</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Chip vs luminaire efficacy:</strong> Always use luminaire data</li>
                <li className="pl-1"><strong>Ignoring thermal management:</strong> LED life depends on temperature</li>
                <li className="pl-1"><strong>Poor driver quality:</strong> Causes flicker and early failure</li>
                <li className="pl-1"><strong>No dimming spec:</strong> Must match driver to control system</li>
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
                <p className="font-medium text-white mb-1">Lamp Efficacy (lm/W)</p>
                <ul className="space-y-0.5">
                  <li>Incandescent: 10-15</li>
                  <li>Fluorescent: 80-105</li>
                  <li>Metal halide: 80-100</li>
                  <li>LED: 100-150+</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical Life (hours)</p>
                <ul className="space-y-0.5">
                  <li>T8 fluorescent: 15,000-20,000</li>
                  <li>T5 fluorescent: 20,000-25,000</li>
                  <li>Metal halide: 10,000-15,000</li>
                  <li>LED (L70): 50,000-100,000</li>
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
            <Link to="../h-n-c-module2-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Illumination Calculations
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section4-4">
              Next: Sound Fundamentals
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section4_3;
