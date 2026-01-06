import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule1Section4QuizQuestions } from "@/data/upskilling/bmsModule1Section4QuizData";
import useSEO from "@/hooks/useSEO";

const TITLE = "Real-World Environments Using BMS - BMS Module 1 Section 4";
const DESCRIPTION = "Learn how Building Management Systems are applied in commercial offices, healthcare facilities, retail environments, and industrial settings. Sector-specific benefits and considerations.";

const quickCheckQuestions = [
  {
    id: "office-energy",
    question: "What is one way BMS helps reduce wasted energy in commercial offices?",
    options: [
      "By running all systems at maximum capacity",
      "By occupancy scheduling, zone-based control, and demand management",
      "By disabling all environmental controls",
      "By ignoring occupancy patterns"
    ],
    correctIndex: 1,
    explanation: "BMS reduces energy waste in offices through occupancy-based control, zone management, and demand response - operating systems only when and where needed."
  },
  {
    id: "healthcare-air",
    question: "Why is air quality control especially important in hospitals?",
    options: [
      "Only for staff comfort",
      "For infection control, patient safety, and regulatory compliance",
      "To reduce noise levels",
      "For aesthetic reasons only"
    ],
    correctIndex: 1,
    explanation: "Air quality control in hospitals is critical for infection prevention, patient safety, and compliance with HTM 03-01 ventilation standards. Proper control can reduce healthcare-associated infections by up to 30%."
  },
  {
    id: "retail-savings",
    question: "How can BMS integration help retail stores save money on energy bills?",
    options: [
      "By ignoring operational schedules",
      "By operational scheduling, demand management, and occupancy-based control",
      "By running systems 24/7 at full capacity",
      "By disabling heating and cooling"
    ],
    correctIndex: 1,
    explanation: "Retail BMS reduces energy costs by 25-40% through intelligent scheduling, peak demand avoidance, and dynamic environment control that adapts to customer patterns."
  },
  {
    id: "mixed-use",
    question: "Give one example of a mixed-use facility where BMS can be applied.",
    options: [
      "A single-family home only",
      "Buildings combining retail, office, residential, or transport facilities",
      "A garden shed",
      "A tent"
    ],
    correctIndex: 1,
    explanation: "Mixed-use developments combining retail, office, residential, and transport functions benefit greatly from BMS through zonal management, shared services optimisation, and energy apportionment."
  }
];

const faqs = [
  {
    question: "What energy savings can commercial offices typically achieve with BMS?",
    answer: "Commercial offices typically achieve 20-35% energy savings through intelligent BMS implementation, with additional benefits including improved workspace satisfaction and reduced operational overhead."
  },
  {
    question: "What healthcare standards must BMS comply with?",
    answer: "Healthcare BMS must comply with HTM 03-01 (ventilation), HTM 06-02 (electrical safety), and CQC regulations, providing automated compliance reporting and performance verification data."
  },
  {
    question: "How does retail BMS handle seasonal variations?",
    answer: "Retail BMS automatically adjusts for weather conditions and customer clothing expectations, with pre-programmed settings for sales periods, holidays, and seasonal events."
  }
];

const BMSModule1Section4 = () => {
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

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Real-World Environments Using BMS
          </h1>
          <p className="text-white/80">
            Commercial, Healthcare, Retail, and Industrial Applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Offices:</strong> 20-35% energy savings, productivity focus</li>
              <li><strong>Healthcare:</strong> Safety-first, HTM compliance required</li>
              <li><strong>Retail:</strong> 25-40% savings, customer experience priority</li>
              <li><strong>Industrial:</strong> 30-50% savings, process integration</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Sector-specific control requirements</li>
              <li><strong>Use:</strong> Client discussions, project specifications</li>
              <li><strong>Apply:</strong> Regulatory compliance, value demonstration</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify how BMS is used in commercial, healthcare, retail environments",
              "Explain specific benefits BMS delivers in each sector",
              "Understand different system priorities by building type",
              "Recognise opportunities for electricians in these environments",
              "Apply sector-specific knowledge to client discussions"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Commercial Offices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Commercial Offices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commercial offices prioritise energy efficiency, occupant comfort, and productivity optimisation.
              Modern office buildings typically achieve <strong>20-35% energy savings</strong> through intelligent
              BMS implementation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Optimisation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Occupancy-Based Control:</strong> Systems respond to actual usage</li>
                  <li><strong>Demand Response:</strong> Load shedding reduces costs 15-25%</li>
                  <li><strong>Zone Management:</strong> Individual floor/department control</li>
                  <li><strong>Daylight Integration:</strong> Automated blinds and dimming</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Workplace Features</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Temperature Zones:</strong> Individual area control</li>
                  <li><strong>Air Quality:</strong> CO₂ monitoring drives ventilation</li>
                  <li><strong>Lighting Scenes:</strong> Task-specific illumination</li>
                  <li><strong>Hot-Desking Support:</strong> Mobile app pre-conditioning</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Healthcare Facilities */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Healthcare Facilities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Healthcare demands the highest levels of reliability, safety, and environmental control.
              BMS must comply with <strong>HTM 03-01 ventilation standards</strong> whilst ensuring
              critical systems maintain operation during any failure.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Critical System Monitoring</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Operating Theatres:</strong> Positive pressure, HEPA filtration, ±1°C</li>
                  <li><strong>Isolation Rooms:</strong> Negative pressure with alarm escalation</li>
                  <li><strong>Emergency Power:</strong> UPS and generator status monitoring</li>
                  <li><strong>Medical Gas:</strong> Pipeline pressure monitoring</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air Quality Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>HEPA Filtration:</strong> 99.97% particle removal</li>
                  <li><strong>Air Changes:</strong> 6-25 ACH depending on area</li>
                  <li><strong>Pressure Differentials:</strong> Continuous monitoring</li>
                  <li><strong>Humidity:</strong> 45-55% RH for infection control</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm text-white">
                <strong className="text-red-400">Infection Control:</strong> Proper environmental control
                can reduce healthcare-associated infections by up to 30% through precise airflow patterns,
                surface temperatures, and humidity management.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Retail Environments */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Retail Environments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Retail focuses on customer experience whilst maximising operational efficiency.
              BMS typically reduces energy costs by <strong>25-40%</strong> through intelligent
              scheduling and dynamic environment control.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Customer Experience</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Dynamic Lighting:</strong> Daylight harvesting, accent lighting</li>
                  <li><strong>Thermal Zones:</strong> Different areas, different control</li>
                  <li><strong>Seasonal Adaptation:</strong> Weather and customer expectations</li>
                  <li><strong>Peak Hour Management:</strong> Enhanced ventilation when busy</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cost Management</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Peak Demand Avoidance:</strong> Up to 30% tariff savings</li>
                  <li><strong>Energy Monitoring:</strong> Real-time benchmarking</li>
                  <li><strong>Trading Hours:</strong> Automatic startup/shutdown</li>
                  <li><strong>Multi-Site:</strong> Centralised chain management</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Industrial & Mixed-Use */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Industrial and Mixed-Use Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial and mixed-use facilities balance production requirements, safety protocols,
              and energy efficiency, often achieving <strong>30-50% energy savings</strong> through
              intelligent load management.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industrial</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Production line integration</li>
                  <li>Load scheduling for peak demand</li>
                  <li>Process environment control</li>
                  <li>Safety system integration</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Educational</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Classroom scheduling</li>
                  <li>Holiday setback modes</li>
                  <li>Laboratory safety systems</li>
                  <li>Sports facility control</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mixed-Use</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Zonal management</li>
                  <li>Shared services optimisation</li>
                  <li>Energy apportionment</li>
                  <li>Tenant flexibility</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commercial Offices Focus</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Tenant satisfaction and energy cost reduction</li>
                <li>Flexible workspace and hot-desking support</li>
                <li>Building Regulations Part L compliance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Healthcare Focus</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>HTM 03-01 ventilation and HTM 06-02 electrical safety</li>
                <li>Redundancy requirements for critical systems</li>
                <li>24/7 operation with maintenance scheduling challenges</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Retail Focus</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Customer experience priority over pure efficiency</li>
                <li>Security system integration</li>
                <li>Multi-site standardisation with local adaptation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50 mb-10">
          <p className="text-sm font-medium text-red-400 mb-2">Case Study: Hospital Emergency Response</p>
          <p className="text-sm text-white mb-3">
            During a severe winter storm, a major hospital experienced complete mains power failure
            affecting 1,215 beds and 2,000+ people on site. The BMS automated response:
          </p>
          <ul className="text-sm text-white space-y-1">
            <li><strong>0-5 seconds:</strong> Generator startup, UPS maintained critical systems</li>
            <li><strong>5-15 seconds:</strong> Priority loading to operating theatres, ICU, emergency</li>
            <li><strong>15-30 seconds:</strong> Non-critical systems automatically shed</li>
            <li><strong>Result:</strong> Zero patient safety incidents during 4-hour outage</li>
          </ul>
        </div>

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
                <p className="font-medium text-white mb-1">Energy Savings by Sector</p>
                <ul className="space-y-0.5">
                  <li>Offices: 20-35% reduction</li>
                  <li>Retail: 25-40% reduction</li>
                  <li>Industrial: 30-50% reduction</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>HTM 03-01 - Healthcare ventilation</li>
                  <li>HTM 06-02 - Healthcare electrical</li>
                  <li>Part L - Energy conservation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-sm text-white/80 mb-6">
            Test your understanding of real-world BMS applications across different sectors.
          </p>
          <SingleQuestionQuiz
            questions={bmsModule1Section4QuizQuestions}
            title="Real-World BMS Applications"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-1-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default BMSModule1Section4;
