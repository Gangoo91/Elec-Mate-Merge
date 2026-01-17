import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m1s3-check1",
    question: "What is the main advantage of a central battery system over self-contained luminaires?",
    options: ["Lower installation cost", "Centralised monitoring and maintenance", "No wiring required", "Longer battery life"],
    correctIndex: 1,
    explanation: "Central battery systems allow centralised monitoring, testing, and maintenance. All batteries are in one location, making management easier in larger installations. However, they require more complex wiring."
  },
  {
    id: "emergencylighting-m1s3-check2",
    question: "In a 'maintained' emergency lighting system, when does the emergency lamp operate?",
    options: ["Only during mains failure", "Continuously (all the time)", "Only during testing", "Only when manually activated"],
    correctIndex: 1,
    explanation: "Maintained emergency lighting operates continuously - both from mains supply and battery during failure. This provides constant illumination and is required in entertainment venues and places of assembly."
  },
  {
    id: "emergencylighting-m1s3-check3",
    question: "Which system type is most suitable for a small office with 10 emergency luminaires?",
    options: ["Central battery system", "Self-contained luminaires", "Generator backup", "Static inverter"],
    correctIndex: 1,
    explanation: "Self-contained luminaires are most cost-effective and practical for smaller installations. Each luminaire has its own battery, reducing wiring complexity and providing redundancy."
  }
];

const faqs = [
  {
    question: "What's the difference between maintained and non-maintained systems?",
    answer: "Maintained systems operate continuously (lamp always lit from mains or battery). Non-maintained systems only illuminate during mains failure. Maintained is required in cinemas, theatres, and places of assembly."
  },
  {
    question: "Can I mix self-contained and central battery systems?",
    answer: "Yes, hybrid systems are common. Central battery may serve main escape routes while self-contained units cover outlying areas. Both must meet BS 5266-1 requirements and testing must cover both systems."
  },
  {
    question: "What is a static inverter system?",
    answer: "A static inverter provides emergency power from a central battery to existing luminaires via the normal lighting circuit. It's used where normal luminaires must also function as emergency lighting."
  },
  {
    question: "How do central battery systems handle cable faults?",
    answer: "Modern central systems use multiple circuits with automatic monitoring. A fault on one circuit doesn't affect others. Sub-circuit monitoring detects lamp failures and cable faults, reporting them centrally."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A cinema auditorium requires emergency lighting. Which system type is mandatory?",
  options: [
    "Non-maintained (lights off until mains fails)",
    "Maintained (lights always on)",
    "Self-contained only",
    "Central battery only"
  ],
  correctAnswer: 1,
  explanation: "Maintained emergency lighting is required in cinemas, theatres, and other entertainment venues. The emergency lamps must operate continuously so audiences aren't suddenly plunged into darkness."
  }
];

const EmergencyLightingModule1Section3 = () => {
  useSEO({
    title: "Types of Emergency Lighting Systems | Emergency Lighting Module 1.3",
    description: "Understanding different emergency lighting system configurations, self-contained vs central battery, maintained vs non-maintained systems."
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
            <Link to="/study-centre/upskilling/emergency-lighting-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Types of Emergency Lighting Systems
          </h1>
          <p className="text-white/80">
            Understanding different system configurations and their applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Self-contained:</strong> Battery in each luminaire</li>
              <li><strong>Central battery:</strong> Single battery location</li>
              <li><strong>Maintained:</strong> Lamp always on</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Application Guide</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Small premises:</strong> Self-contained</li>
              <li><strong>Large buildings:</strong> Central battery</li>
              <li><strong>Cinemas:</strong> Maintained required</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish self-contained from central systems",
              "Understand maintained vs non-maintained",
              "Select appropriate system types",
              "Recognise hybrid system applications",
              "Identify where maintained is mandatory",
              "Evaluate system advantages/disadvantages"
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
            Self-Contained vs Central Battery
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting systems are classified by their power source arrangement.
              Understanding the differences helps specify the right system for each application.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Self-Contained</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Battery within each luminaire</li>
                  <li>Simple installation wiring</li>
                  <li>Distributed redundancy</li>
                  <li>Individual lamp monitoring</li>
                  <li>Best for: Small-medium premises</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Central Battery</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Single battery location</li>
                  <li>Centralised monitoring</li>
                  <li>Dedicated circuit wiring</li>
                  <li>Single point of maintenance</li>
                  <li>Best for: Large/complex buildings</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Self-Contained</p>
                <p className="text-white/90 text-xs">Individual batteries</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Central</p>
                <p className="text-white/90 text-xs">Single location</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Hybrid</p>
                <p className="text-white/90 text-xs">Combined approach</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Maintained vs Non-Maintained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The operating mode defines when the emergency lamp illuminates. This has
              significant implications for application suitability and running costs.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintained</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Lamp operates continuously</li>
                  <li>Powered by mains normally</li>
                  <li>Battery during failure</li>
                  <li>Higher energy consumption</li>
                  <li>Required: Cinemas, theatres</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Maintained</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Lamp off during normal operation</li>
                  <li>Only illuminates on mains fail</li>
                  <li>Lower energy consumption</li>
                  <li>Longer lamp life</li>
                  <li>Suitable: Most premises</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            System Selection Criteria
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Choosing the right system involves balancing installation cost, maintenance
              requirements, building size, and regulatory requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Selection Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Building size:</strong> &lt;50 luminaires typically self-contained</li>
                <li><strong>Maintenance access:</strong> Central easier for high-ceiling areas</li>
                <li><strong>Monitoring needs:</strong> Central provides better oversight</li>
                <li><strong>Venue type:</strong> Entertainment requires maintained</li>
                <li><strong>Budget constraints:</strong> Self-contained lower initial cost</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Maintained Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Cinemas and theatres during performances</li>
                <li>Concert halls and places of assembly</li>
                <li>Areas where normal lighting may be dimmed</li>
                <li>Areas with sleeping accommodation (partial)</li>
                <li>Any area identified by fire risk assessment</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Specification Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Non-maintained in cinemas:</strong> — Maintained is mandatory</li>
                <li><strong>Central for small premises:</strong> — Often over-engineered</li>
                <li><strong>No monitoring planned:</strong> — Consider addressable systems</li>
                <li><strong>Ignoring access:</strong> — Central needs plant room space</li>
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
              <p className="font-medium text-white mb-1">Power Source Types</p>
              <ul className="space-y-0.5">
                <li>Self-contained (distributed)</li>
                <li>Central battery (centralised)</li>
                <li>Static inverter</li>
                <li>Hybrid systems</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Operating Modes</p>
              <ul className="space-y-0.5">
                <li>Maintained: Always on</li>
                <li>Non-maintained: On failure only</li>
                <li>Sustained: Dual lamp option</li>
                <li>Combined: Switchable modes</li>
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
            <Link to="/study-centre/upskilling/emergency-lighting-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/emergency-lighting-module-1-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule1Section3;