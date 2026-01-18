import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Secondary Power & Battery Sizing - Fire Alarm Module 4 Section 2";
const DESCRIPTION = "Learn battery autonomy periods, sizing calculations, charger capacity, temperature effects and verification for BS 5839-1 fire alarm systems.";

const quickCheckQuestions = [
  {
    id: "autonomy-purpose",
    question: "Autonomy is the ability to:",
    options: [
      "Run with mains present",
      "Operate for the required standby and alarm periods on battery",
      "Charge faster",
      "Increase loop addresses"
    ],
    correctIndex: 1,
    explanation: "Autonomy covers standby plus alarm periods on battery to meet the design/standard."
  },
  {
    id: "battery-sizing",
    question: "Battery sizing must consider:",
    options: [
      "Standby only",
      "Alarm only",
      "Standby + alarm and temperature/ageing factors",
      "Only charger current"
    ],
    correctIndex: 2,
    explanation: "Use total Ah for standby and alarm; apply derating for temperature and ageing per manufacturer guidance."
  },
  {
    id: "charger-capacity",
    question: "Charger capacity should be:",
    options: [
      "Less than standby current",
      "Sufficient to recharge within specified time while supporting load",
      "Ignored",
      "Equal to alarm current"
    ],
    correctIndex: 1,
    explanation: "The charger must recharge batteries in the permitted time while supporting system loads."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Autonomy is the ability to:",
    options: ["Run with mains present", "Operate for the required standby and alarm periods on battery", "Charge faster", "Increase loop addresses"],
    correctAnswer: 1,
    explanation: "Autonomy covers standby plus alarm periods on battery to meet the design/standard."
  },
  {
    id: 2,
    question: "Battery sizing must consider:",
    options: ["Standby only", "Alarm only", "Standby + alarm and temperature/ageing factors", "Only charger current"],
    correctAnswer: 2,
    explanation: "Use total Ah for standby and alarm; apply derating for temperature and ageing per manufacturer guidance."
  },
  {
    id: 3,
    question: "Charger capacity should be:",
    options: ["Less than standby current", "Sufficient to recharge within specified time while supporting load", "Ignored", "Equal to alarm current"],
    correctAnswer: 1,
    explanation: "The charger must recharge batteries in the permitted time while supporting system loads."
  },
  {
    id: 4,
    question: "What is the typical standby autonomy period required for a Category L system?",
    options: ["12 hours", "24 hours", "48 hours", "72 hours"],
    correctAnswer: 1,
    explanation: "BS 5839-1 typically requires 24 hours standby plus 30 minutes alarm for most Category L systems, though the fire strategy may specify different requirements."
  },
  {
    id: 5,
    question: "Temperature affects capacity by:",
    options: ["Increasing at low temperature", "No effect", "Reducing effective Ah in colder environments", "Only affecting charger"],
    correctAnswer: 2,
    explanation: "Battery capacity reduces at lower temperatures; apply manufacturer derating."
  },
  {
    id: 6,
    question: "Ageing allowance is typically:",
    options: ["0%", "Considered per manufacturer (e.g., +10-30%)", "Always 100%", "Ignored"],
    correctAnswer: 1,
    explanation: "Allow for capacity loss over service life as specified by the manufacturer."
  },
  {
    id: 7,
    question: "When calculating battery capacity for a system with 24h standby at 0.5A and 30min alarm at 2A, the minimum Ah before derating is:",
    options: ["1 Ah", "12 Ah", "13 Ah", "24 Ah"],
    correctAnswer: 2,
    explanation: "Calculate: (0.5A x 24h) + (2A x 0.5h) = 12 + 1 = 13 Ah minimum before applying derating factors."
  },
  {
    id: 8,
    question: "VRLA batteries should be installed:",
    options: ["In any orientation", "Upright as specified by manufacturer data", "Always horizontal", "Upside down for better performance"],
    correctAnswer: 1,
    explanation: "Follow manufacturer installation requirements for orientation, ventilation and environmental conditions to ensure proper operation and service life."
  },
  {
    id: 9,
    question: "The typical recharge time specified for fire alarm batteries after discharge is:",
    options: ["6 hours", "12 hours", "24 hours", "48 hours"],
    correctAnswer: 2,
    explanation: "BS 5839-1 typically requires batteries to be recharged to 80% capacity within 24 hours of restoration of mains supply."
  },
  {
    id: 10,
    question: "Battery replacement is typically recommended after:",
    options: ["1 year regardless of condition", "3-5 years or per manufacturer guidance", "10 years minimum", "Never, batteries last forever"],
    correctAnswer: 1,
    explanation: "VRLA batteries typically require replacement every 3-5 years, though this depends on manufacturer recommendations and actual capacity testing results."
  }
];

const faqs = [
  {
    question: "Can I oversize batteries?",
    answer: "Yes, if the charger can recharge them within the specified time and the enclosure has space. Larger batteries provide extra resilience."
  },
  {
    question: "What Ah size should I choose?",
    answer: "Select the next standard size above your derated calculation. Common sizes are 7Ah, 12Ah, 17Ah, 24Ah, 38Ah."
  },
  {
    question: "Do batteries need ventilation?",
    answer: "Follow manufacturer and BS 7671 guidance. VRLA batteries produce minimal gas but adequate ventilation is still required."
  },
  {
    question: "How often should batteries be replaced?",
    answer: "Typically every 3-5 years, or when capacity testing shows significant degradation. Record replacement dates."
  },
  {
    question: "What if the panel is in a cold location?",
    answer: "Apply additional temperature derating or consider relocating the panel/batteries to a warmer environment."
  },
  {
    question: "Can I use lithium batteries instead?",
    answer: "Only if specifically approved by the panel manufacturer and meeting BS EN 54-4 requirements. Most panels are designed for VRLA."
  }
];

const FireAlarmModule4Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <span>Module 4 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Secondary Power & Battery Sizing
          </h1>
          <p className="text-white/80">
            Battery capacity calculations, autonomy requirements and charger verification
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Autonomy:</strong> 24h standby + 30min alarm typical</li>
              <li><strong>Calculation:</strong> Ah = Current x Time</li>
              <li><strong>Derating:</strong> Apply 25-50% for temperature/ageing</li>
              <li><strong>Recharge:</strong> 80% within 24 hours</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Battery date codes for replacement</li>
              <li><strong>Use:</strong> Standby + alarm Ah calculation</li>
              <li><strong>Apply:</strong> Select next standard size up</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate Ah requirements from current and time for standby and alarm periods",
              "Apply derating factors for temperature and ageing per manufacturer guidance",
              "Verify charger can recharge batteries within the specified timeframe",
              "Select appropriate battery types and understand installation requirements",
              "Understand autonomy requirements for different system categories",
              "Commission and test battery backup systems to BS 5839-1"
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

        {/* Section 01: Autonomy Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Autonomy Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Autonomy is the duration the fire alarm system can operate on battery power alone. BS 5839-1 specifies minimum requirements based on system category and building use.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Typical Requirements:</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Category L systems:</strong> 24 hours standby + 30 minutes alarm</li>
                <li><strong>Category M systems:</strong> 24 hours standby + 30 minutes alarm</li>
                <li><strong>Category P systems:</strong> 24-72 hours depending on response capability</li>
              </ul>
            </div>

            <p>
              The fire strategy document may specify different requirements. Always confirm autonomy periods during design.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Battery Sizing Method */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Battery Sizing Method
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Calculate battery capacity systematically using current draws and time periods. The basic formula is: Ah = Current (A) x Time (h).
            </p>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-white mb-1">Step 1: Standby Capacity</p>
                <p className="text-sm text-white">Standby Ah = Standby Current (A) x Standby Period (h)</p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-white mb-1">Step 2: Alarm Capacity</p>
                <p className="text-sm text-white">Alarm Ah = Alarm Current (A) x Alarm Period (h)</p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-white mb-1">Step 3: Total + Derating</p>
                <p className="text-sm text-white">Total Ah = (Standby Ah + Alarm Ah) x Derating Factor</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Worked Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Worked Example
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-3">Category L System Calculation:</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>Given:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>Standby current: 0.45A</li>
                  <li>Standby period: 24 hours</li>
                  <li>Alarm current: 1.95A</li>
                  <li>Alarm period: 0.5 hours (30 minutes)</li>
                </ul>
                <p className="mt-3"><strong>Calculation:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>Standby Ah = 0.45A x 24h = 10.8 Ah</li>
                  <li>Alarm Ah = 1.95A x 0.5h = 0.98 Ah</li>
                  <li>Total = 10.8 + 0.98 = 11.78 Ah</li>
                  <li>With 30% derating: 11.78 x 1.3 = 15.3 Ah</li>
                </ul>
                <p className="mt-3 text-elec-yellow">
                  <strong>Selection:</strong> Choose 17 Ah batteries (next standard size). For 24V systems, use 2 x 12V 17Ah in series.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Derating Factors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Derating Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Real-world battery capacity is affected by temperature, age and discharge rate. Apply derating factors to ensure adequate capacity throughout battery life.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Derating</p>
                <ul className="text-sm text-white space-y-1">
                  <li>VRLA capacity reduces significantly below 20C</li>
                  <li>At 0C, capacity may be only 80% of rated value</li>
                  <li>Use manufacturer temperature curves for accurate derating</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ageing Derating</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Capacity reduces over service life</li>
                  <li>Typically allow 10-30% extra capacity for ageing</li>
                  <li>Plan for 3-5 year battery replacement cycle</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Practical Guidance:</strong> A combined derating factor of 1.25-1.5 (25-50% extra capacity) is commonly used to cover both temperature and ageing effects.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Charger Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Charger Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The charger must be capable of recharging depleted batteries within the specified time while also supporting the system standby load.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Recharge to 80% capacity within 24 hours of mains restoration</li>
                <li>Maintain system operation during charging</li>
                <li>Charger voltage and current must match battery specifications</li>
                <li>Temperature compensation may be required for extreme environments</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Battery Types and Installation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Battery Types and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              VRLA (Valve Regulated Lead Acid) batteries are standard for fire alarm panels. Follow manufacturer requirements for installation and maintenance.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Install upright as specified by manufacturer</li>
                  <li>Ensure adequate ventilation per BS 7671</li>
                  <li>Protect against temperature extremes</li>
                  <li>Use correct fusing and cabling</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Checks</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Measure quiescent and alarm current</li>
                  <li>Simulate mains fail and verify changeover</li>
                  <li>Check charger voltage and current settings</li>
                  <li>Record battery date code and capacity</li>
                </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always select the next standard battery size above your calculated requirement</li>
                <li>Consider future expansion when sizing - allow additional margin if possible</li>
                <li>Document all calculations and assumptions in design records</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record battery date codes during installation for accurate replacement scheduling</li>
                <li>Measure actual standby and alarm currents during commissioning to verify calculations</li>
                <li>Check batteries are correctly connected and charger is operating</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forgetting derating factors</strong> - for temperature and ageing in calculations</li>
                <li><strong>Using insufficient battery capacity</strong> - for the charger to recharge within 24 hours</li>
                <li><strong>Installing in extreme temperatures</strong> - without additional derating</li>
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
                <p className="font-medium text-white mb-1">Autonomy Periods</p>
                <ul className="space-y-0.5">
                  <li>Category L: 24h + 30min</li>
                  <li>Category P: 24-72h typically</li>
                  <li>Check fire strategy</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Battery Sizing</p>
                <ul className="space-y-0.5">
                  <li>Ah = Current x Time</li>
                  <li>Apply 25-50% derating</li>
                  <li>Select next standard size</li>
                  <li>Recharge within 24h</li>
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
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default FireAlarmModule4Section2;
