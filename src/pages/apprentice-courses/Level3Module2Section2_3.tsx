/**
 * Level 3 Module 2 Section 2.3 - Reducing Standby Power Consumption
 *
 * Understanding standby power, phantom loads, and strategies to reduce energy waste
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
const TITLE = "Reducing Standby Power Consumption - Level 3 Module 2 Section 2.3";
const DESCRIPTION = "Understanding standby power, phantom loads, and electrical installation strategies to reduce wasted energy in buildings.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is 'standby power' consumption?",
    options: [
      "Power consumed only when equipment is actively in use",
      "Power consumed by equipment when it's off or in a low-power waiting state",
      "The maximum power rating of equipment",
      "Power lost in cables"
    ],
    correctIndex: 1,
    explanation: "Standby power is electricity consumed by equipment when it's not performing its primary function - either fully off but still plugged in, or in a low-power waiting mode ready to respond to commands."
  },
  {
    id: "check-2",
    question: "What is another term commonly used for standby power consumption?",
    options: [
      "Active power",
      "Peak demand",
      "Phantom load or vampire power",
      "Base load"
    ],
    correctIndex: 2,
    explanation: "Standby power is often called 'phantom load' or 'vampire power' because it invisibly drains energy even when equipment appears to be off. It can account for 5-10% of household electricity consumption."
  },
  {
    id: "check-3",
    question: "Which installation feature can help reduce standby power in a home office?",
    options: [
      "Higher rated socket outlets",
      "Switched socket outlets or master/slave power strips",
      "More circuits in the consumer unit",
      "Larger cable sizes"
    ],
    correctIndex: 1,
    explanation: "Switched socket outlets allow equipment to be easily disconnected from the supply. Master/slave power strips automatically cut power to peripherals when the main device is switched off."
  },
  {
    id: "check-4",
    question: "EU regulations limit standby power consumption for most products to:",
    options: [
      "No limit exists",
      "0.5W in standby mode",
      "5W in standby mode",
      "10W in standby mode"
    ],
    correctIndex: 1,
    explanation: "EU Ecodesign regulations limit standby power to 0.5W for most products (1W if the product displays information or status). This has significantly reduced phantom loads in newer equipment."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Standby power consumption in a typical UK home can account for approximately:",
    options: [
      "Less than 1% of electricity consumption",
      "5-10% of electricity consumption",
      "25-30% of electricity consumption",
      "Over 50% of electricity consumption"
    ],
    correctAnswer: 1,
    explanation: "Standby power typically accounts for 5-10% of household electricity consumption. While individual devices use small amounts, the cumulative effect of many devices on standby is significant."
  },
  {
    id: 2,
    question: "Which of these typically has the highest standby power consumption?",
    options: [
      "Phone charger (without phone)",
      "Set-top box/satellite receiver",
      "LED lamp",
      "Electric toothbrush charger"
    ],
    correctAnswer: 1,
    explanation: "Set-top boxes and satellite receivers often have significant standby consumption (5-15W) as they may be updating programme guides or maintaining connections. Modern phone chargers typically use &lt;0.5W when not charging."
  },
  {
    id: 3,
    question: "A 'hard off' switch on equipment means:",
    options: [
      "The switch is difficult to operate",
      "It completely disconnects the equipment from the power supply",
      "It reduces power to half",
      "It's only for emergencies"
    ],
    correctAnswer: 1,
    explanation: "A 'hard off' switch physically disconnects equipment from the supply, eliminating all standby consumption. Soft power buttons often leave equipment in standby mode, still consuming power."
  },
  {
    id: 4,
    question: "Smart power strips can reduce standby consumption by:",
    options: [
      "Using less electricity themselves",
      "Automatically cutting power to peripherals when the main device is off",
      "Increasing the voltage to equipment",
      "Reducing the power factor"
    ],
    correctAnswer: 1,
    explanation: "Smart/master-slave power strips detect when a main device (like a TV or computer) is turned off and automatically cut power to connected peripherals, eliminating their standby consumption."
  },
  {
    id: 5,
    question: "Which installation design helps reduce standby consumption in commercial buildings?",
    options: [
      "Using larger cables",
      "Installing more socket outlets",
      "Providing switching for socket outlets serving equipment areas",
      "Using single-phase supplies only"
    ],
    correctAnswer: 2,
    explanation: "Installing switched socket outlets or providing central switching for equipment areas allows all devices to be easily disconnected from supply outside operating hours, eliminating standby loads."
  },
  {
    id: 6,
    question: "The EU Ecodesign Directive has reduced standby power by:",
    options: [
      "Banning all equipment with standby modes",
      "Setting maximum standby power limits for products",
      "Requiring solar panels on all buildings",
      "Mandating battery backup for all equipment"
    ],
    correctAnswer: 1,
    explanation: "The EU Ecodesign Directive sets maximum limits for standby power consumption (typically 0.5W-1W), forcing manufacturers to improve the efficiency of their products' standby modes."
  },
  {
    id: 7,
    question: "Which strategy is most effective for reducing ICT equipment standby consumption in offices?",
    options: [
      "Using faster computers",
      "Implementing power management and automatic shutdown policies",
      "Installing more monitors per desk",
      "Keeping equipment running 24/7"
    ],
    correctAnswer: 1,
    explanation: "Power management policies automatically put equipment into sleep or shutdown modes during inactive periods. Combined with automatic shutdown outside office hours, this significantly reduces consumption."
  },
  {
    id: 8,
    question: "Time switches on socket circuits can help reduce standby power by:",
    options: [
      "Making equipment run faster",
      "Cutting power to equipment outside operating hours",
      "Increasing power during peak times",
      "Monitoring energy consumption"
    ],
    correctAnswer: 1,
    explanation: "Time switches can automatically disconnect non-essential equipment overnight and at weekends, eliminating standby consumption during these periods without relying on user action."
  },
  {
    id: 9,
    question: "Networked standby (when equipment maintains network connectivity while sleeping) typically consumes:",
    options: [
      "Zero power",
      "The same as active mode",
      "More than simple standby but less than active mode",
      "More than active mode"
    ],
    correctAnswer: 2,
    explanation: "Networked standby allows devices to wake on network commands but consumes more power than simple standby. EU regulations allow up to 2W for networked standby with high network availability."
  },
  {
    id: 10,
    question: "When specifying kitchen installations, how can standby power be minimised?",
    options: [
      "Use only gas appliances",
      "Provide switched spur outlets for built-in appliances where appropriate",
      "Install larger consumer units",
      "Use three-phase supplies"
    ],
    correctAnswer: 1,
    explanation: "Providing switched spur outlets for appliances like dishwashers and washing machines allows them to be easily isolated when not in use, eliminating standby consumption without unplugging."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How much does standby power really cost?",
    answer: "A single device on standby at 5W costs around 6-7 per year. But a typical home might have 20-40 devices on standby, totalling 50-100W continuous consumption - that's 100-150 per year just in standby power."
  },
  {
    question: "Should I unplug phone chargers when not in use?",
    answer: "Modern phone chargers meeting EU regulations consume &lt;0.5W when idle - minimal cost. However, older chargers may use more. Unplugging eliminates any consumption and reduces fire risk from faulty equipment left energised."
  },
  {
    question: "How can building design reduce standby consumption?",
    answer: "Install switched socket outlets, provide master switches for equipment groups, consider time-controlled circuits for office equipment areas, and specify equipment meeting latest Ecodesign standards. Making disconnection easy encourages good habits."
  },
  {
    question: "Does equipment still consume power when the switch is off?",
    answer: "It depends. A mechanical switch that physically breaks the circuit (hard off) eliminates consumption. Electronic soft-touch buttons often leave equipment in standby. The only certain way to stop consumption is disconnecting from the supply."
  },
  {
    question: "What's the best way to measure standby power?",
    answer: "Use a plug-in energy monitor that shows both instantaneous power and accumulated consumption. Measure equipment in different modes: active, standby, and 'off'. Many people are surprised by what they find."
  },
  {
    question: "Are smart home devices making standby consumption worse?",
    answer: "Smart speakers, hubs, and always-connected devices do consume standby power continuously (typically 2-5W each). However, they can also enable better control of other equipment. The key is ensuring the control benefits outweigh the monitoring consumption."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section2_3 = () => {
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
            <span>Module 2.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Reducing Standby Power
          </h1>
          <p className="text-white/80">
            Understanding and eliminating phantom loads in electrical installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Standby power:</strong> 5-10% of home electricity use</li>
              <li><strong>EU limit:</strong> 0.5W standby for most products</li>
              <li><strong>Solutions:</strong> Switched outlets, smart strips, time controls</li>
              <li><strong>Cost:</strong> 100-150/year typical home</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> LEDs glowing on 'off' equipment</li>
              <li><strong>Use:</strong> Plug-in energy monitors to measure</li>
              <li><strong>Apply:</strong> Specify switched spurs for appliances</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "What standby power is and why it matters",
              "Common sources of phantom loads",
              "EU Ecodesign regulations on standby power",
              "Installation design strategies to reduce standby",
              "Smart power management solutions",
              "Cost implications of standby consumption"
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
            Understanding Standby Power
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standby power - also called phantom load or vampire power - is electricity consumed by equipment when it's not performing its main function. This includes devices waiting for remote control signals, maintaining clocks or settings, or simply having power supplies energised but not active.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Standby modes explained:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Off mode:</strong> Equipment appears off but still connected and may draw small current</li>
                <li><strong>Standby mode:</strong> Ready to be activated by remote, network, or timer</li>
                <li><strong>Networked standby:</strong> Maintaining network connectivity while sleeping</li>
                <li><strong>Active standby:</strong> Performing background tasks (e.g., recording)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Even small standby loads add up. A 5W standby load running 24/7 consumes 44 kWh per year - more than some efficient appliances use in active operation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Common Sources of Standby Power
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding which equipment consumes the most standby power helps prioritise reduction efforts. Some devices have improved dramatically due to regulations, while others remain significant consumers.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Higher Standby Consumers</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Set-top boxes/satellite receivers (5-15W)</li>
                  <li>Games consoles in standby (5-15W)</li>
                  <li>Desktop computers (2-10W)</li>
                  <li>Older AV equipment (5-15W)</li>
                  <li>Smart speakers/hubs (2-5W)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lower Standby Consumers</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Modern phone chargers (&lt;0.5W)</li>
                  <li>Modern TVs in standby (&lt;0.5W)</li>
                  <li>LED bulbs (0W when off)</li>
                  <li>Recent EU-compliant equipment (&lt;1W)</li>
                  <li>Mechanical timer controls (0W)</li>
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
            Installation Design Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Good installation design makes it easy for occupants to eliminate standby power without inconvenience. The key is providing convenient switching that people will actually use.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> In a home office, install a switched double socket for the monitor and peripherals, controlled by a master-slave strip. When the computer is shut down, the strip automatically cuts power to the monitor, speakers, and printer - eliminating all standby consumption without any user action.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design solutions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Switched socket outlets:</strong> Allow easy disconnection at the wall</li>
                <li><strong>Switched spurs:</strong> For built-in appliances like dishwashers</li>
                <li><strong>Master switches:</strong> Control groups of outlets in one action</li>
                <li><strong>Time-controlled circuits:</strong> Automatic off outside hours</li>
                <li><strong>Smart power strips:</strong> Master/slave automatic switching</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Regulations and Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EU Ecodesign regulations have driven significant improvements in standby power consumption. Understanding these requirements helps when specifying and advising on equipment selection.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Off Mode</p>
                <p className="text-white/90 text-xs">Max 0.5W (most products)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Standby</p>
                <p className="text-white/90 text-xs">Max 0.5W (1W with display)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Networked</p>
                <p className="text-white/90 text-xs">Max 2W (high availability)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Look for Energy Star or equivalent labels when specifying equipment. These often exceed minimum regulatory requirements for standby power.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing Installations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install switched socket outlets throughout, not unswitched types</li>
                <li>Consider switched spurs for built-in kitchen appliances</li>
                <li>Provide accessible switching for entertainment equipment areas</li>
                <li>In commercial buildings, consider time-controlled socket circuits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Advising Customers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Recommend plug-in energy monitors to identify high standby loads</li>
                <li>Suggest master/slave power strips for computer and AV setups</li>
                <li>Advise replacing old equipment with EU-compliant alternatives</li>
                <li>Explain the cumulative cost of standby consumption</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Installing unswitched outlets</strong> - Makes disconnection less convenient</li>
                <li><strong>Hiding socket outlets</strong> - Switches won't be used if inaccessible</li>
                <li><strong>Ignoring built-in appliances</strong> - Dishwashers, washing machines have standby too</li>
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
                <p className="font-medium text-white mb-1">EU Standby Limits</p>
                <ul className="space-y-0.5">
                  <li>Off mode: 0.5W maximum</li>
                  <li>Standby: 0.5W (1W with display)</li>
                  <li>Networked standby: 2W (high avail)</li>
                  <li>Look for Energy Star labels</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Reduction Solutions</p>
                <ul className="space-y-0.5">
                  <li>Switched socket outlets</li>
                  <li>Master/slave power strips</li>
                  <li>Time-controlled circuits</li>
                  <li>Plug-in energy monitors</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section2-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section2_3;
