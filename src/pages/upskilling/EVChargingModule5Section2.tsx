import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m5s2-check1",
    question: "What is the primary benefit of HEMS integration with EV charging?",
    options: ["Faster charging speeds", "Maximised renewable energy self-consumption", "Reduced installation costs", "Simplified wiring"],
    correctIndex: 1,
    explanation: "HEMS enables maximum utilisation of renewable solar energy for EV charging, reducing electricity costs by up to 80% whilst minimising grid dependency and carbon footprint."
  },
  {
    id: "evcharging-m5s2-check2",
    question: "What solar PV system size typically provides sufficient energy for daily EV charging?",
    options: ["1-2kW", "4-6kW", "15-20kW", "50kW+"],
    correctIndex: 1,
    explanation: "A typical 4-6kW solar system can provide 15-25kWh daily generation, sufficient for 60-100 miles of daily EV driving. Larger systems enable complete energy independence."
  },
  {
    id: "evcharging-m5s2-check3",
    question: "How does battery storage enhance EV charging integration?",
    options: ["By increasing charging speed", "By extending solar availability beyond daylight hours", "By reducing cable requirements", "By eliminating the need for grid connection"],
    correctIndex: 1,
    explanation: "Battery storage extends the availability of solar energy for EV charging beyond daylight hours, provides backup power during outages, and enables participation in grid services for additional revenue."
  }
];

const faqs = [
  {
    question: "Can HEMS work with existing solar and battery installations?",
    answer: "Yes, modern HEMS platforms can integrate with most existing solar inverters and battery systems through standard communication protocols like Modbus, SunSpec, and manufacturer APIs. Retrofit integration typically requires minimal additional hardware."
  },
  {
    question: "How reliable is solar-dependent EV charging?",
    answer: "HEMS systems include intelligent fallback to grid charging when solar is insufficient, ensuring reliable EV availability. Battery storage and weather forecasting further improve charging reliability and predictability."
  },
  {
    question: "What are the typical cost savings from integrated EV/PV/Battery systems?",
    answer: "Integrated systems typically achieve 60-80% reduction in electricity costs, £800-2000 annual savings for average households, and 5-8 year payback periods including government incentives."
  },
  {
    question: "How does HEMS handle multiple EVs in one household?",
    answer: "Advanced HEMS platforms can coordinate multiple EVs through priority scheduling, available solar allocation, and user-defined charging requirements. Systems balance immediate needs with overnight optimisation and grid constraints."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A homeowner has an 8kW solar system and wants to maximise EV charging from renewable energy. What HEMS feature should be prioritised?",
  options: [
    "Fixed overnight charging schedule",
    "Maximum power charging at all times",
    "Excess solar charging with weather forecasting",
    "Grid-only charging during off-peak hours"
  ],
  correctAnswer: 2,
  explanation: "Excess solar charging with weather forecasting enables the EV to charge when surplus PV generation is available, maximising self-consumption. Weather forecasting allows the system to predict solar availability and plan charging accordingly."
  }
];

const EVChargingModule5Section2 = () => {
  useSEO({
    title: "EV/PV/Battery Integration via HEMS | EV Charging Module 5.2",
    description: "Learn to integrate EV charging with renewable energy sources and battery storage through Home Energy Management Systems (HEMS)."
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
            <Link to="/electrician/upskilling/ev-charging-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            EV/PV/Battery Integration via HEMS
          </h1>
          <p className="text-white/80">
            Integrating charging with renewable energy and storage systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>HEMS:</strong> Coordinates EV, solar, and battery systems</li>
              <li><strong>Self-consumption:</strong> Up to 90% renewable utilisation</li>
              <li><strong>Savings:</strong> 60-80% reduction in electricity costs</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Smart energy controller, CT clamps, cloud app</li>
              <li><strong>Use:</strong> Prioritise solar charging, coordinate with storage</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Design integrated EV/PV/Battery systems",
              "Calculate energy flows and optimisation strategies",
              "Configure maximum solar self-consumption",
              "Coordinate battery storage with EV charging",
              "Analyse economic benefits of integration",
              "Troubleshoot multi-device communication"
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
            HEMS Architecture and Components
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Home Energy Management Systems represent the future of intelligent energy consumption,
              enabling seamless integration between EV charging, solar PV generation, and battery storage.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Management Controller</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>CPU:</strong> Real-time coordination of all devices</li>
                  <li><strong>Monitoring:</strong> Continuous generation/consumption data</li>
                  <li><strong>Optimisation:</strong> Algorithms for efficiency</li>
                  <li><strong>Interface:</strong> Mobile/web applications</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Solar PV Integration</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Monitoring:</strong> Real-time PV output measurement</li>
                  <li><strong>MPPT:</strong> Maximum power point tracking</li>
                  <li><strong>Export control:</strong> Self-consumption maximisation</li>
                  <li><strong>Forecasting:</strong> Weather-based prediction</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Battery Storage Coordination:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>State of Charge:</strong> Optimal charging/discharging strategies</li>
                <li><strong>Cycle Life:</strong> Battery health preservation through intelligent control</li>
                <li><strong>Grid Services:</strong> Peak shaving, load shifting, frequency response</li>
                <li><strong>Backup:</strong> Critical load support during grid outages</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            EV Charging Integration Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Solar-driven charging modes enable EVs to charge primarily from renewable energy,
              maximising self-consumption and minimising grid dependency.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Excess Solar Charging</p>
                <ul className="text-sm text-white space-y-1">
                  <li>EV power matches surplus PV generation</li>
                  <li>Prevents grid export - uses free solar</li>
                  <li>Dynamic adjustment for cloud coverage</li>
                  <li>Minimum rate from grid if required</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scheduled Solar Charging</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Pre-planned for peak solar periods</li>
                  <li>Weather prediction integration</li>
                  <li>User departure time consideration</li>
                  <li>Battery coordination for extended availability</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Battery Priority Management:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Hierarchical:</strong> Home battery priority during peak tariff periods</li>
                <li><strong>Load balancing:</strong> Simultaneous charging when surplus available</li>
                <li><strong>Discharge control:</strong> Battery to EV during grid peak periods</li>
                <li><strong>Reserve management:</strong> Minimum charge for emergency backup</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Control Algorithms and Communication
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Intelligent control strategies use predictive algorithms and real-time optimisation
              to maximise system efficiency and user benefit.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Predictive Control</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Solar forecasting:</strong> 24-48 hour prediction</li>
                  <li><strong>Load prediction:</strong> Historical analysis</li>
                  <li><strong>Price forecasting:</strong> Tariff optimisation</li>
                  <li><strong>User behaviour:</strong> Learning patterns</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protocol Integration</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>OCPP:</strong> EV charge point communication</li>
                  <li><strong>SunSpec Modbus:</strong> Solar inverter standards</li>
                  <li><strong>CAN Bus:</strong> Battery management protocols</li>
                  <li><strong>MQTT/HTTP:</strong> Cloud connectivity</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Solar</p>
                <p className="text-white text-xs">SunSpec Modbus</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">EV Charger</p>
                <p className="text-white text-xs">OCPP 1.6/2.0</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Battery</p>
                <p className="text-white text-xs">CAN Bus/Modbus</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">System Sizing Guidelines</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>4-6kW solar provides 60-100 miles daily EV range</li>
                <li>8-12kW enables complete energy independence</li>
                <li>Battery storage extends solar availability 6-10 hours</li>
                <li>Consider household base load in calculations</li>
                <li>Plan for future EV and energy demand growth</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Undersized solar:</strong> — insufficient generation for EV needs</li>
                <li><strong>No weather integration:</strong> — missed optimisation opportunities</li>
                <li><strong>Protocol mismatch:</strong> — devices unable to communicate</li>
                <li><strong>Ignoring grid backup:</strong> — unreliable charging availability</li>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Integration Benefits</p>
              <ul className="space-y-0.5">
                <li>Up to 90% solar self-consumption</li>
                <li>60-80% electricity cost reduction</li>
                <li>5-8 year payback period</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Protocols</p>
              <ul className="space-y-0.5">
                <li>OCPP for EV chargers</li>
                <li>SunSpec/Modbus for inverters</li>
                <li>MQTT for cloud services</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-5-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule5Section2;