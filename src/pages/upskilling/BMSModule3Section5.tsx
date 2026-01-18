import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule3Section5QuizData } from "@/data/upskilling/bmsModule3Section5QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "override-time-limits",
    question: "Why is it important for overrides to be time-limited or logged?",
    options: [
      "To reduce the cost of system operation",
      "To prevent energy waste and ensure overrides don't disable safety functions permanently",
      "To make the system easier to install",
      "To reduce the number of sensors needed"
    ],
    correctIndex: 1,
    explanation: "Time-limited and logged overrides prevent energy waste from forgotten manual settings and ensure safety functions aren't permanently disabled. Documentation also provides accountability and helps identify system operation patterns."
  },
  {
    id: "seasonal-settings",
    question: "Why would a building waste energy if seasonal settings were not programmed correctly?",
    options: [
      "The building would use more sensors",
      "Systems might heat and cool simultaneously or operate at inappropriate setpoints year-round",
      "More maintenance would be required",
      "The BMS would stop working completely"
    ],
    correctIndex: 1,
    explanation: "Without proper seasonal settings, systems might heat and cool simultaneously (fighting each other), or operate at inappropriate setpoints year-round. This wastes significant energy and reduces occupant comfort."
  },
  {
    id: "safety-separation",
    question: "Why must electricians separate safety overrides from comfort overrides?",
    options: [
      "To reduce installation costs",
      "To prevent safety systems from being compromised by comfort control failures",
      "To make the system easier to operate",
      "To comply with manufacturer warranties"
    ],
    correctIndex: 1,
    explanation: "Safety overrides (fire, emergency) must be separated from comfort overrides to prevent life safety systems from being compromised by comfort control failures. This ensures emergency systems remain operational even if HVAC controls fail."
  },
  {
    id: "seasonal-commissioning",
    question: "What is a key commissioning requirement when testing seasonal changeover functions?",
    options: [
      "Test only during actual seasonal changes",
      "Simulate seasonal conditions by adjusting outdoor sensor readings to verify automatic operation",
      "Skip testing and rely on manufacturer settings",
      "Only test manual override functions"
    ],
    correctIndex: 1,
    explanation: "Commissioning must simulate seasonal conditions by adjusting outdoor sensor readings to verify that automatic changeover functions work correctly at the programmed thresholds, without waiting for actual seasonal changes."
  }
];

const faqs = [
  {
    question: "What is the typical time limit for a local comfort override?",
    answer: "Local comfort overrides typically expire after 30 minutes to 2 hours. Meeting room overrides are commonly set to 2 hours, while general office area overrides may be limited to 30-60 minutes to prevent energy waste."
  },
  {
    question: "How does the BMS handle heating-to-cooling changeover?",
    answer: "The BMS uses outdoor temperature sensors and deadband programming to prevent simultaneous heating and cooling. Typically, there's a temperature deadband (e.g., heating disabled above 18°C, cooling disabled below 22°C) to prevent system hunting."
  },
  {
    question: "What happens to overrides during a fire alarm?",
    answer: "Fire alarms typically override all comfort-related BMS functions. Safety systems take priority - AHUs shut down, smoke dampers open, and any comfort overrides are immediately cancelled. Fire system integration must be hardwired for reliability."
  },
  {
    question: "How often should override usage be reviewed?",
    answer: "Active overrides should be reviewed weekly at minimum. Many organisations review daily, with automated alerts for overrides exceeding 4-8 hours. Regular review helps identify training needs and system issues causing excessive override use."
  }
];

const BMSModule3Section5 = () => {
  useSEO({
    title: "Override Functions and Seasonal Settings | BMS Module 3.5",
    description: "Master BMS override functions and seasonal control strategies. Learn manual override implementation, seasonal programming, safety protocols, and commissioning procedures for optimal building performance."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Override Functions and Seasonal Settings
          </h1>
          <p className="text-white">
            Manual control systems and adaptive seasonal operation strategies
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Overrides:</strong> Temporary manual control with auto-expiry</li>
              <li><strong>Seasonal:</strong> Auto-adapt heating/cooling by season</li>
              <li><strong>Energy Impact:</strong> 15-30% savings with proper settings</li>
              <li><strong>Misuse Risk:</strong> £85,000/year waste from forgotten overrides</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Override switches, outdoor temp sensors, status LEDs</li>
              <li><strong>Use:</strong> Maintenance, special events, seasonal transitions</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Override function types and purposes",
              "Seasonal control strategies",
              "Safety considerations and risks",
              "Proper wiring for override systems",
              "Seasonal programming implementation",
              "Override governance strategies",
              "Commissioning and testing procedures",
              "Electrician's role in flexible operation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Override Functions and Safety Protocols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Override functions provide essential manual control capabilities while maintaining system safety and operational
              integrity. Different types of overrides serve different purposes and have varying levels of authority and safety implications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Override Types and Authority Levels:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Emergency (Highest):</strong> Manual reset only, any user - fire override, emergency stop</li>
                <li><strong>Safety (Very High):</strong> Manual reset, authorised personnel - lockout/tagout</li>
                <li><strong>Operator (High):</strong> 2-8 hour limit, BMS operators - equipment testing</li>
                <li><strong>Local (Medium):</strong> 30min-2hr, local users - room comfort, fan boost</li>
                <li><strong>Scheduled (Low):</strong> Pre-programmed, automatic - extended hours, events</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Physical Override Controls</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Room switches:</strong> Extend HVAC for 2 hours</li>
                  <li><strong>Equipment buttons:</strong> Manual start for testing</li>
                  <li><strong>Zone panels:</strong> ±2°C temperature adjustment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Software-Based Control</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Force commands:</strong> ON/OFF/AUTO states</li>
                  <li><strong>Setpoint override:</strong> Temporary adjustment</li>
                  <li><strong>Schedule override:</strong> Special events</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Safety Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Safety interlocks cannot be overridden by comfort control</li>
                <li>Override failures must default to safe operating states</li>
                <li>All overrides must be logged with reason and duration</li>
                <li>Active overrides reviewed weekly to clear unnecessary holds</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Seasonal Control Strategies and Programming
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Buildings have dramatically different operational requirements throughout the year. Seasonal control strategies
              automatically adapt system operation to changing environmental conditions, occupancy patterns, and energy costs.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Seasonal Operating Parameters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Winter:</strong> Heat 20-21°C, cool disabled, heat recovery active, boilers primary</li>
                <li><strong>Spring:</strong> Heat 19-20°C, cool 24-25°C, free cooling priority, economisers</li>
                <li><strong>Summer:</strong> Heat disabled, cool 23-24°C, max fresh air, chillers primary</li>
                <li><strong>Autumn:</strong> Heat 20-21°C, cool 24-25°C, mixed mode, variable equipment</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Winter Optimisation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Boiler staging:</strong> Lead/lag rotation</li>
                  <li><strong>Heat recovery:</strong> 30-50% load reduction</li>
                  <li><strong>Frost protection:</strong> Automatic glycol circulation</li>
                  <li><strong>Warm-up:</strong> Optimised pre-heating</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Summer Optimisation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Chiller sequencing:</strong> Capacity staging</li>
                  <li><strong>Free cooling:</strong> 100% when conditions suit</li>
                  <li><strong>Pre-cooling:</strong> Thermal mass overnight</li>
                  <li><strong>Humidity control:</strong> Dehumidification</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Transition Period Challenges:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Mixed mode operation with proper deadbands</li>
                <li>Maximum use of natural ventilation</li>
                <li>Systematic equipment changeover</li>
                <li>Energy balance optimisation</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrician's Role in Override and Seasonal Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electricians enable override and seasonal control strategies through proper installation, wiring, and testing
              of control devices, sensors, and safety systems. Their work ensures these critical functions operate safely
              and reliably throughout the building's lifecycle.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Override System Installation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Physical switches:</strong> Appropriate rating, clear labelling, status LEDs</li>
                <li><strong>Outdoor sensors:</strong> Weather-resistant, 3-4m height, representative location</li>
                <li><strong>Safety segregation:</strong> Separate circuits for life safety vs comfort</li>
                <li><strong>Testing capability:</strong> Verify BMS recognition of manual commands</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Switches rated for actual loads</li>
                  <li>Momentary for safety, maintained for comfort</li>
                  <li>Weather-resistant outdoor enclosures</li>
                  <li>Status indication at local and central</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Seasonal Sensors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Outdoor temperature (primary input)</li>
                  <li>Humidity for transition periods</li>
                  <li>Solar radiation for responsive control</li>
                  <li>Wind speed/direction for natural vent</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Safety Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Fire systems must have hardwired overrides</li>
                <li>Fail-safe during power or communication failures</li>
                <li>Access control through physical and software means</li>
                <li>Manual procedures for system failure scenarios</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Implementation and Commissioning Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper commissioning of override and seasonal control systems ensures safe, reliable operation throughout
              all operating conditions. Testing must verify both automatic seasonal operation and manual override capabilities.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Test Procedures:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Test each override switch and software function</li>
                <li><strong>Step 2:</strong> Simulate seasonal conditions via sensor adjustment</li>
                <li><strong>Step 3:</strong> Verify automatic expiry of time-limited overrides</li>
                <li><strong>Step 4:</strong> Test safety override priority - comfort cannot override safety</li>
                <li><strong>Step 5:</strong> Verify proper documentation and logging</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Override Governance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Automatic expiry for non-emergency</li>
                  <li>Role-based access controls</li>
                  <li>Complete audit logging</li>
                  <li>Active override dashboard</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Validation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Energy before/after seasonal changes</li>
                  <li>Temperature stability monitoring</li>
                  <li>Override usage tracking</li>
                  <li>System reliability over time</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[3]} />
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Case Study: Commercial Office Override Misuse</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Problem:</strong> 15-storey office building with high energy bills despite modern BMS. Investigation found
                12 of 15 major plant items had active manual overrides, some lasting weeks. Staff were leaving overrides on after
                maintenance without resetting to automatic.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
              <div>
                <p className="font-medium text-red-400/80 mb-2">Impact</p>
                <ul className="space-y-1">
                  <li>Cooling energy increased 65% above design</li>
                  <li>Pumps running 24/7 instead of occupancy</li>
                  <li>AHUs at full capacity regardless of demand</li>
                  <li>Annual cost: £85,000 additional energy</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow/80 mb-2">Solution</p>
                <ul className="space-y-1">
                  <li>Automatic time limits (2-8 hours)</li>
                  <li>Override dashboard with expiry countdown</li>
                  <li>Email alerts for overrides &gt;4 hours</li>
                  <li>Staff training and weekly reviews</li>
                </ul>
              </div>
            </div>
            <div className="p-3 rounded bg-transparent border border-white/10 text-sm">
              <p className="text-white"><strong>Result:</strong> 15% energy reduction within 3 months, £63,000/year savings,
              95% reduction in inappropriate override usage.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Override Time Limits</p>
              <ul className="space-y-0.5">
                <li>Local comfort: 30 min - 2 hours</li>
                <li>Operator: 2-8 hours</li>
                <li>Safety: Manual reset required</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Seasonal Savings</p>
              <ul className="space-y-0.5">
                <li>Proper programming: 15-30%</li>
                <li>Heat recovery: 30-50% heating load</li>
                <li>Free cooling: 100% when available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={bmsModule3Section5QuizData}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-3-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-3-section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule3Section5;
