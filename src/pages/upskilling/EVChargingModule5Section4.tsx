import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m5s4-check1",
    question: "What typical cost savings can be achieved through off-peak EV charging?",
    options: ["10-20%", "20-30%", "40-60%", "80-90%"],
    correctIndex: 2,
    explanation: "Off-peak charging typically reduces electricity costs by 40-60% compared to peak rates. Some super off-peak tariffs can achieve even greater savings during overnight periods."
  },
  {
    id: "evcharging-m5s4-check2",
    question: "What is the typical Economy 7 off-peak window in the UK?",
    options: ["18:00-23:00", "00:30-07:30", "12:00-16:00", "06:00-09:00"],
    correctIndex: 1,
    explanation: "Economy 7 typically provides off-peak rates from 00:30 to 07:30 (7 hours). Exact times may vary by region and supplier, so always check with your energy provider."
  },
  {
    id: "evcharging-m5s4-check3",
    question: "What is the primary benefit of departure-time charging?",
    options: ["Faster charging speeds", "Guaranteed vehicle ready when needed", "Lower installation costs", "Reduced cable wear"],
    correctIndex: 1,
    explanation: "Departure-time charging works backwards from when you need the vehicle, ensuring it's fully charged by your specified time whilst maximising off-peak charging during the cheapest rate periods."
  }
];

const faqs = [
  {
    question: "What if I need to charge during peak hours due to urgent travel?",
    answer: "Most smart chargers allow manual override for urgent needs. Use this sparingly as peak rates can be 3-4x higher than off-peak. Consider public rapid chargers for emergency top-ups during peak periods."
  },
  {
    question: "How do I know my local off-peak times and rates?",
    answer: "Check your electricity supplier's tariff details. Economy 7 typically runs 00:30-07:30, but times vary by region. Many suppliers offer apps showing real-time and forecast pricing."
  },
  {
    question: "Can smart charging damage my vehicle's battery?",
    answer: "No, smart charging at standard AC rates (3-22kW) is actually better for battery longevity than rapid DC charging. Slower overnight charging reduces thermal stress and can extend battery life."
  },
  {
    question: "Do I need a special electricity meter for off-peak charging?",
    answer: "Economy 7 requires a dual-rate meter, but modern smart meters can handle multiple tariff periods automatically. Time-of-use tariffs work with existing smart meters without additional hardware."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A household with a 40kWh EV charges three times per week. At standard rate (26p/kWh) vs off-peak (12p/kWh), what is the approximate annual saving?",
  options: [
    "Around £200 per year",
    "Around £450 per year",
    "Around £870 per year",
    "Around £1,500 per year"
  ],
  correctAnswer: 2,
  explanation: "Standard: 40kWh × 26p × 156 charges = £1,622. Off-peak: 40kWh × 12p × 156 charges = £749. Saving: £1,622 - £749 = £873 per year (54% reduction)."
  }
];

const EVChargingModule5Section4 = () => {
  useSEO({
    title: "Off-Peak Charging Strategies | EV Charging Module 5.4",
    description: "Master off-peak charging strategies to optimise costs and grid impact through intelligent scheduling and tariff management."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ev-charging-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Off-Peak Charging Strategies
          </h1>
          <p className="text-white/80">
            Optimising charging times for cost and grid impact
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Savings:</strong> 40-60% cost reduction vs peak rates</li>
              <li><strong>Timing:</strong> Typically 00:30-07:30 off-peak</li>
              <li><strong>Method:</strong> Smart charger scheduling</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> ToU tariff, smart charger app, timer settings</li>
              <li><strong>Use:</strong> Schedule overnight, set departure times</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand UK electricity tariff structures",
              "Design automated off-peak charging systems",
              "Implement smart charging algorithms",
              "Configure demand response systems",
              "Integrate renewable energy with schedules",
              "Calculate economic benefits of off-peak charging"
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
            UK Electricity Tariff Structures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding tariff structures is essential for maximising the economic benefits
              of EV charging whilst supporting grid stability.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Tariffs</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Single rate:</strong> 24-28p/kWh average</li>
                  <li><strong>Standing charge:</strong> 40-50p/day</li>
                  <li>No time differentiation</li>
                  <li>Simple but not cost-optimised</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Economy 7 Tariffs</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Off-peak:</strong> 9-15p/kWh (00:30-07:30)</li>
                  <li><strong>Peak:</strong> 30-35p/kWh (07:30-00:30)</li>
                  <li>7-hour off-peak window</li>
                  <li>Ideal for overnight charging</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Modern Time-of-Use Tariffs:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Super off-peak (02:00-05:00):</strong> 5-10p/kWh - renewable surplus periods</li>
                <li><strong>Off-peak (23:00-07:00):</strong> 12-18p/kWh - standard overnight rate</li>
                <li><strong>Peak (16:00-19:00):</strong> 35-50p/kWh - high demand periods</li>
                <li><strong>Agile tariffs:</strong> Half-hourly variable pricing based on wholesale markets</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Smart Charging Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart charging enables automated optimisation of charging times based on tariffs,
              grid conditions, and user requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Timer-Based Charging</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Set charging start time (e.g., 00:30)</li>
                  <li>Programme charging duration</li>
                  <li>Multiple timer profiles</li>
                  <li>Seasonal schedule adjustment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dynamic Load Management</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Grid signal response</li>
                  <li>Real-time price optimisation</li>
                  <li>Automatic load balancing</li>
                  <li>Renewable energy prioritisation</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Scheduled</p>
                <p className="text-white/90 text-xs">Fixed off-peak times</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Departure</p>
                <p className="text-white/90 text-xs">Ready-by time target</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Dynamic</p>
                <p className="text-white/90 text-xs">Price-responsive</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Implementation Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Successful off-peak charging requires appropriate infrastructure, tariff selection,
              and user education for optimal results.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Domestic Implementation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Install smart EV charger with scheduling</li>
                  <li>Configure for Economy 7 or ToU tariff</li>
                  <li>Set departure time-based charging</li>
                  <li>Monitor consumption via app</li>
                  <li>Regular schedule optimisation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commercial Fleet Charging</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Centralised management system</li>
                  <li>Vehicle arrival/departure scheduling</li>
                  <li>Load sequencing across fleet</li>
                  <li>Half-hourly meter for reduced rates</li>
                  <li>Demand forecasting algorithms</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Grid Services Integration:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>V2G preparation:</strong> Bidirectional capability for export revenue</li>
                <li><strong>Frequency response:</strong> Dynamic Containment service participation</li>
                <li><strong>Demand response:</strong> Pause charging during grid stress events</li>
                <li><strong>Aggregation:</strong> Combined fleet services for smaller installations</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cost Calculation Example</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Standard tariff: 40kWh × 26p = £10.40 per charge</li>
                <li>Off-peak tariff: 40kWh × 12p = £4.80 per charge</li>
                <li>Saving per charge: £5.60 (54% reduction)</li>
                <li>Annual saving (3 charges/week): ~£870</li>
                <li>Payback on smart charger upgrade: 8-12 months</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Important Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>DNO notification:</strong> — required for loads &gt;3.68kW</li>
                <li><strong>G99 compliance:</strong> — grid connection requirements for installations &gt;16A</li>
                <li><strong>Fire safety:</strong> — protocols for underground car parks</li>
                <li><strong>Voltage limits:</strong> — must stay within ±6% of nominal</li>
              </ul>
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
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Typical UK Tariff Rates</p>
              <ul className="space-y-0.5">
                <li>Super off-peak: 5-10p/kWh</li>
                <li>Off-peak: 12-18p/kWh</li>
                <li>Peak: 35-50p/kWh</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Benefits</p>
              <ul className="space-y-0.5">
                <li>40-60% cost reduction</li>
                <li>Reduced grid stress</li>
                <li>Better battery longevity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ev-charging-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ev-charging-module-5-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule5Section4;