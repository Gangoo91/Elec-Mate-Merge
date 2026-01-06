import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "dashboard-importance",
    question: "Why are dashboards important for facility managers?",
    options: [
      "They replace the need for trained staff",
      "They convert complex technical data into clear, actionable information",
      "They reduce the number of sensors needed"
    ],
    correctIndex: 1,
    explanation: "Dashboards convert complex technical data into clear, actionable information that allows facility managers to quickly assess building performance, identify problems, and make informed decisions."
  },
  {
    id: "dashboard-kpi",
    question: "Give one example of a KPI that might be displayed on a BMS dashboard.",
    options: [
      "Number of cables installed",
      "Percentage of time within comfort temperature band",
      "Supplier contact details"
    ],
    correctIndex: 1,
    explanation: "Common KPIs include '% time within comfort band' (showing how often spaces meet target conditions), 'energy efficiency ratio', 'equipment availability', or 'alarm response time'."
  },
  {
    id: "miswired-sensors",
    question: "What can happen if sensors are miswired or incorrectly labelled?",
    options: [
      "Dashboards display faster",
      "Operators make incorrect decisions based on false data",
      "Energy costs are reduced"
    ],
    correctIndex: 1,
    explanation: "Miswired sensors can cause dashboards to display false information, leading operators to make incorrect decisions that can result in comfort problems, energy waste, equipment damage, or safety hazards."
  },
  {
    id: "network-reliability",
    question: "Why is network reliability important for dashboard operation?",
    options: [
      "It makes dashboards look better",
      "Dashboards depend on continuous data feeds to remain useful",
      "It reduces cable costs"
    ],
    correctIndex: 1,
    explanation: "Dashboards rely on continuous data feeds from field devices. Network dropouts mean dashboards can't update with current information, making them unreliable for monitoring and decision-making."
  }
];

const faqs = [
  {
    question: "What happens if the dashboard server fails?",
    answer: "The BMS controllers continue operating independently, but operators lose visualisation capabilities. Most systems include backup servers or cloud redundancy to prevent complete dashboard loss."
  },
  {
    question: "Can dashboards be customised for different users?",
    answer: "Yes, modern dashboards support user-specific views and permissions. Facility managers might see energy data while maintenance staff focus on equipment status and alarms."
  },
  {
    question: "How often do dashboard displays update?",
    answer: "Update frequencies vary by data type. Critical alarms update immediately, trend data refreshes every few minutes, and real-time displays typically update every 10-30 seconds."
  },
  {
    question: "How do you troubleshoot dashboard display problems?",
    answer: "Start by verifying field device operation, check communication networks, confirm I/O point mapping, and test data flow from sensor to display. Most issues trace back to wiring or configuration problems."
  }
];

const quizQuestion = {
  question: "In a university, the BMS dashboard displayed classroom CO2 levels as consistently low despite student complaints. The sensor had been wired into the wrong input channel. What does this case demonstrate?",
  options: [
    "CO2 sensors are unreliable",
    "Dashboard software needs more updates",
    "Correct wiring and commissioning verification are essential for dashboard accuracy",
    "Student complaints should be ignored if dashboards show normal values"
  ],
  correctAnswer: 2,
  explanation: "The case demonstrates that dashboard accuracy depends entirely on correct field wiring. The dashboard was displaying values from an unused spare channel, not the actual sensor, masking real air quality problems until electricians discovered the wiring error."
};

const BMSModule6Section3 = () => {
  useSEO({
    title: "BMS Dashboards and Visualisation | Module 6.3",
    description: "Learn about BMS dashboards and visualisation platforms for converting raw data into actionable information through intuitive displays."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BMS Dashboards and Visualisation
          </h1>
          <p className="text-white/80">
            Converting raw data into actionable information through intuitive displays
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Transform data into visual information</li>
              <li><strong>Features:</strong> Floor plans, trends, alarms, KPIs</li>
              <li><strong>Access:</strong> Web-based, mobile responsive</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Colour-coded zones (green/yellow/red)</li>
              <li><strong>Use:</strong> Verify dashboard updates during commissioning</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose of dashboards in a BMS",
              "Describe common dashboard features and visualisation tools",
              "Understand how dashboards support operators and clients",
              "Recognise the electrician's role in ensuring accurate data feeds"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Purpose of Dashboards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of BMS Dashboards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dashboards are the <strong>bridge between complex technical systems and human understanding</strong>. They transform thousands of data points into clear, actionable information that facility managers can use quickly.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Dashboards Provide</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Simplification:</strong> Visual summaries instead of raw data</li>
                  <li><strong>Real-time monitoring:</strong> Current conditions at a glance</li>
                  <li><strong>Decision support:</strong> Highlight areas needing attention</li>
                  <li><strong>Remote access:</strong> Monitor from anywhere</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Example</p>
                <p className="text-sm text-white/90">Instead of reviewing hundreds of sensor logs, a dashboard displays a building floor plan with colour-coded zones: green = normal, yellow = warning, red = alarm. Operators instantly see which areas need attention.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Common Features */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Common Dashboard Features
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm font-medium text-blue-300 mb-2">Graphical Floor Plans</p>
                <p className="text-sm text-white/90">Building layouts with live data overlays, equipment locations, and real-time status indicators. Click on rooms or equipment to drill down into details.</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-300 mb-2">Energy Visualisation</p>
                <p className="text-sm text-white/90">Consumption data as kWh trends, CO2 footprint, efficiency benchmarks, and cost analysis. Charts make energy patterns immediately apparent.</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-300 mb-2">Alarm Views</p>
                <p className="text-sm text-white/90">Prioritised alarm lists with acknowledgement functions. Critical alarms highlighted, history tracked, resolution progress monitored.</p>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-sm font-medium text-purple-300 mb-2">Trend Charts and KPIs</p>
                <p className="text-sm text-white/90">Interactive historical graphs and key metrics like "% time within comfort band," "energy efficiency ratio," or "equipment availability."</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-300 mb-2">Dashboard Integration</p>
              <p className="text-sm text-white/90">Modern dashboards combine BMS data with weather forecasts, energy pricing, occupancy schedules, and maintenance systems for complete operational context.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Electrician's Role */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrician's Role in Dashboard Accuracy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dashboards are only as accurate as the data feeding into them. Your installation work directly impacts whether dashboards provide reliable information operators can trust.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Responsibilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Correct wiring:</strong> Sensors to correct inputs</li>
                  <li><strong>Matching labels:</strong> I/O points to dashboard config</li>
                  <li><strong>Network cabling:</strong> Proper shielding and termination</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Tasks</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Field testing:</strong> Change conditions, verify display</li>
                  <li><strong>Dashboard verification:</strong> Updates appear correctly</li>
                  <li><strong>Documentation:</strong> Record all test results</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-300 mb-2">Critical Point</p>
              <p className="text-sm text-white/90">Dashboards are only as good as the underlying data. Ensuring inputs are installed correctly means dashboards reflect reliable, meaningful information that operators can trust.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Best Practices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Best Practices for Dashboard Reliability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Supporting reliable dashboard operation:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Accurate labelling:</strong> Every cable, I/O point, and sensor must match dashboard naming</li>
                <li><strong>Calibrated sensors:</strong> Verify accuracy using reference instruments before connection</li>
                <li><strong>Commissioning checks:</strong> Make physical changes and confirm dashboard response</li>
                <li><strong>Network reliability:</strong> Install communications cabling with proper shielding and termination</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">Pro Tip</p>
              <p className="text-sm text-white/90">Create a commissioning checklist that includes dashboard verification for every sensor and device. This systematic approach prevents issues and builds confidence in dashboard reliability.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 5: Modern Technologies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Modern Dashboard Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-blue-300 mb-2">Cloud-Based Access</p>
                <p className="text-sm text-white/90">Monitor multiple buildings from anywhere. Respond to alarms remotely and coordinate maintenance across property portfolios.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-green-300 mb-2">Mobile Responsive</p>
                <p className="text-sm text-white/90">Touch-friendly interfaces work on tablets and smartphones. Check building status and respond to issues on the move.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-purple-300 mb-2">System Integration</p>
                <p className="text-sm text-white/90">Combine BMS data with weather, energy pricing, occupancy, and maintenance systems for complete operational context.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-yellow-300 mb-2">User Customisation</p>
                <p className="text-sm text-white/90">Different users see relevant information. Facility managers see energy data while maintenance staff focus on equipment status.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Case Study: The Misleading Dashboard</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-300 mb-2">Problem</p>
              <p className="text-sm text-white/90">A university dashboard displayed classroom CO2 levels as consistently low across all lecture halls, even though students reported stuffy conditions and poor air quality.</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-300 mb-2">Discovery</p>
              <p className="text-sm text-white/90">Electricians discovered the CO2 sensor had been wired into the wrong input channel. The dashboard was displaying values from an unused spare channel that always read low.</p>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-300 mb-2">Resolution</p>
              <p className="text-sm text-white/90">Once rewired correctly, the dashboard reflected true air quality levels with red and yellow zones during occupied periods. Ventilation settings were adjusted based on accurate data.</p>
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Dashboard Features</p>
              <ul className="space-y-0.5">
                <li>Floor plans with live data overlays</li>
                <li>Energy visualisation and KPIs</li>
                <li>Alarm views and trend charts</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Electrician Tasks</p>
              <ul className="space-y-0.5">
                <li>Correct wiring and labelling</li>
                <li>Commissioning verification</li>
                <li>Network reliability</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-6-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Data Logging
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-7">
              Next: Module 7
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule6Section3;
