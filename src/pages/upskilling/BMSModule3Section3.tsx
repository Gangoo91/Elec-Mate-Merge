import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule3Section3QuizData } from "@/data/upskilling/bmsModule3Section3QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "scheduling-check1",
    question: "Which schedule type has the highest priority in a BMS system?",
    options: [
      "Weekly schedule",
      "Exception schedule",
      "Manual override",
      "Default schedule"
    ],
    correctIndex: 2,
    explanation: "Manual override has the highest priority, allowing operators to temporarily control equipment regardless of programmed schedules. This is essential for maintenance and emergency situations."
  },
  {
    id: "scheduling-check2",
    question: "What is the recommended mounting height for PIR occupancy sensors?",
    options: [
      "1.5-2.0m above floor level",
      "2.4-3.0m above floor level",
      "3.5-4.0m above floor level",
      "4.5-5.0m above floor level"
    ],
    correctIndex: 1,
    explanation: "PIR sensors should be mounted 2.4-3.0m above floor level to achieve optimal coverage patterns and avoid false triggering from small animals or air movement near floor level."
  },
  {
    id: "scheduling-check3",
    question: "What CO₂ concentration indicates poor indoor air quality requiring increased ventilation?",
    options: [
      "Less than 600 ppm",
      "600-800 ppm",
      "800-1000 ppm",
      "Greater than 1000 ppm"
    ],
    correctIndex: 3,
    explanation: "CO₂ concentrations greater than 1000 ppm indicate poor indoor air quality. At this level, occupants may experience drowsiness and reduced concentration, requiring increased ventilation rates."
  },
  {
    id: "scheduling-check4",
    question: "During peak electricity rate periods, what is the most appropriate BMS action?",
    options: [
      "Increase HVAC setpoints to maximum comfort",
      "Shed non-critical loads to reduce demand",
      "Pre-charge thermal storage systems",
      "Run all equipment at maximum efficiency"
    ],
    correctIndex: 1,
    explanation: "During peak rate periods, the BMS should shed non-critical loads to reduce electricity demand and costs. Critical systems maintain operation whilst non-essential loads are temporarily reduced."
  }
];

const faqs = [
  {
    question: "What is the schedule priority hierarchy in BMS?",
    answer: "From highest to lowest: Manual Override → Exception Schedule (holidays/special events) → Weekly Schedule (standard pattern) → Default Schedule (fallback). Higher priority schedules override lower ones."
  },
  {
    question: "How does optimal start work?",
    answer: "Optimal start calculates the latest possible equipment start time to achieve comfort conditions by occupancy time, considering outside temperature, building thermal mass, and system capacity. This saves energy by avoiding early starts."
  },
  {
    question: "What's the benefit of dual-technology occupancy sensors?",
    answer: "Dual-technology sensors combine PIR and ultrasonic detection. Both must detect occupancy to activate, significantly reducing false triggering while maintaining high sensitivity. Ideal for high-reliability applications."
  },
  {
    question: "How much can demand-controlled ventilation save?",
    answer: "DCV can reduce ventilation energy by 30-50% by adjusting airflow based on actual occupancy (via CO₂ levels) rather than design occupancy. Savings are highest in spaces with variable occupancy patterns."
  }
];

const BMSModule3Section3 = () => {
  useSEO({
    title: "Time Scheduling & Occupancy Programming | BMS Module 3.3",
    description: "Master time-based scheduling and occupancy detection programming in Building Management Systems. Learn scheduling strategies, sensor technologies, and energy optimization."
  });

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

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Time Scheduling and Occupancy Programming
          </h1>
          <p className="text-white">
            Automated Scheduling and Occupancy Control
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Priority:</strong> Manual → Exception → Weekly → Default</li>
              <li><strong>PIR sensors:</strong> Mount 2.4-3.0m high</li>
              <li><strong>Poor air quality:</strong> CO₂ &gt; 1000 ppm</li>
              <li><strong>DCV savings:</strong> 30-50% ventilation energy</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Equipment running during unoccupied hours</li>
              <li><strong>Use:</strong> Optimal start algorithms for energy savings</li>
              <li><strong>Test:</strong> Walk tests for occupancy sensor coverage</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Configure time-based scheduling including weekly and holiday patterns",
              "Compare different occupancy detection technologies",
              "Install and calibrate PIR, ultrasonic, and CO₂ sensors",
              "Implement optimal start/stop algorithms and load shedding"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Time-Based Scheduling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Time-Based Scheduling Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Time-based scheduling is the foundation of automated building control, allowing systems to operate
              according to predetermined patterns that match building occupancy and operational requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Schedule Priority Order (Highest to Lowest):</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Manual Override:</strong> Temporary control for maintenance/emergencies</li>
                <li><strong>2. Exception Schedule:</strong> Holiday and special event overrides</li>
                <li><strong>3. Weekly Schedule:</strong> Standard 7-day pattern</li>
                <li><strong>4. Default Schedule:</strong> Fallback pattern</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Basic Scheduling Components</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Weekly schedules:</strong> 7-day patterns with individual day programming</li>
                  <li><strong>Exception schedules:</strong> Holiday and special event overrides</li>
                  <li><strong>Astronomical clock:</strong> Sunrise/sunset based scheduling</li>
                  <li><strong>Time zones:</strong> Multiple location support with DST</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Astronomical Clock Parameters</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Latitude:</strong> ±90° for sunrise/sunset calculation</li>
                  <li><strong>Longitude:</strong> ±180° for time zone calculation</li>
                  <li><strong>Offset:</strong> ±120 min for local fine-tuning</li>
                </ul>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
        </section>

        {/* Section 2: Occupancy Detection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Occupancy Detection Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Occupancy detection systems provide real-time information about space utilisation, enabling automatic
              control of lighting, HVAC, and other building services.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">PIR Sensors</p>
                <p className="text-white text-xs">Heat-based motion, 6-12m radius</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Ultrasonic</p>
                <p className="text-white text-xs">Sound waves, 360° coverage</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">CO₂ Sensors</p>
                <p className="text-white text-xs">Breathing detection, room-wide</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Installation Points:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Mount PIR sensors 2.4-3.0m above floor level</li>
                <li>Avoid direct sunlight and heat sources</li>
                <li>Ensure clear line of sight to detection area</li>
                <li>Use screened cable for ultrasonic sensors</li>
                <li>CO₂ sensors require 1.2-1.5m mounting height</li>
                <li>Allow 20-minute warm-up period for calibration</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dual-Technology Sensors:</p>
              <p className="text-sm text-white ml-4">
                Combine PIR and ultrasonic detection to reduce false triggering. Both technologies must detect
                occupancy for the sensor to activate, significantly improving reliability in challenging environments.
              </p>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
        </section>

        {/* Section 3: Demand-Controlled Ventilation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Demand-Controlled Ventilation (DCV)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Demand-controlled ventilation adjusts airflow based on actual occupancy levels rather than design
              occupancy, providing significant energy savings whilst maintaining indoor air quality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical CO₂ Setpoints:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Outside air:</strong> 350-400 ppm</li>
                <li><strong>Good air quality:</strong> &lt;600 ppm</li>
                <li><strong>Acceptable:</strong> 600-1000 ppm</li>
                <li><strong>Poor air quality:</strong> &gt;1000 ppm (requires increased ventilation)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Savings Calculation:</p>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm text-white font-mono">
                  Energy Savings (%) = (Design Airflow - Actual Airflow) / Design Airflow × 100
                </p>
                <p className="text-xs text-white/70 mt-2">
                  Example: 100-person conference room with 20% average occupancy = 80% reduction in ventilation energy
                </p>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        {/* Section 4: Advanced Scheduling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Advanced Scheduling Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Advanced scheduling strategies optimise energy consumption by predicting building thermal behaviour
              and adjusting equipment start times accordingly.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Optimal Start Algorithm</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Calculates latest possible start time</li>
                  <li>Considers outside temperature</li>
                  <li>Accounts for building thermal mass</li>
                  <li>Saves 15-25% energy vs fixed scheduling</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Shedding</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Reduces non-critical loads at peak demand</li>
                  <li>Priority 1: Critical (safety, security)</li>
                  <li>Priority 2: Comfort (HVAC)</li>
                  <li>Priority 3: Non-essential (decorative lighting)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Time-of-Use Rate Programming:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Peak (16:00-20:00):</strong> 3.0× base rate — shed non-critical loads</li>
                <li><strong>Shoulder (07:00-16:00, 20:00-22:00):</strong> 1.5× — normal operation</li>
                <li><strong>Off-peak (22:00-07:00, weekends):</strong> 1.0× — pre-heat/cool, charge systems</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Procedures</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Time clock setup:</strong> Verify time zone, DST settings, test weekly patterns</li>
                <li><strong>Sensor calibration:</strong> Allow 20-minute warm-up, perform walk tests</li>
                <li><strong>Integration testing:</strong> Test schedule-occupancy interactions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Troubleshooting Issues</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Schedule conflicts:</strong> Check hierarchy, disable conflicting patterns</li>
                <li><strong>False triggering:</strong> Adjust sensitivity, relocate sensor, add delays</li>
                <li><strong>CO₂ sensor drift:</strong> Perform auto-calibration or manual baseline adjustment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Case Study: Office Building</h2>
          <div className="p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">5,000m² Office Implementation</h3>
            <div className="text-sm text-white space-y-3">
              <p><strong>Installation:</strong> 45 dual-technology occupancy sensors, 12 CO₂ sensors in conference rooms, 8 scheduling zones.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
                <div>
                  <p className="text-xs text-white/70 mb-1">Energy Savings</p>
                  <ul className="text-xs space-y-0.5">
                    <li>Lighting: 35%</li>
                    <li>HVAC: 28%</li>
                    <li>Ventilation: 42%</li>
                    <li><strong>Overall: 32%</strong></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-white/70 mb-1">Project Details</p>
                  <ul className="text-xs space-y-0.5">
                    <li>Installation: 3 days</li>
                    <li>Commissioning: 2 weeks</li>
                    <li>Annual savings: £18,500</li>
                  </ul>
                </div>
              </div>
              <p><strong>Key Success Factors:</strong> Careful sensor placement, comprehensive commissioning with fine-tuning, integration of scheduling with occupancy detection.</p>
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
              <p className="font-medium text-elec-yellow/80 mb-1">Sensor Heights</p>
              <ul className="space-y-0.5">
                <li>PIR occupancy: 2.4-3.0m</li>
                <li>CO₂ sensors: 1.2-1.5m</li>
                <li>Temperature sensors: 1.2-1.5m</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">CO₂ Levels</p>
              <ul className="space-y-0.5">
                <li>Good: &lt;600 ppm</li>
                <li>Acceptable: 600-1000 ppm</li>
                <li>Poor: &gt;1000 ppm</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="my-10">
          <SingleQuestionQuiz
            questions={bmsModule3Section3QuizData}
            title="Test Your Knowledge"
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-3-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule3Section3;
