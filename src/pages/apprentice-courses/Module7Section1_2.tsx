import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Why Faults Occur in Electrical Installations - Module 7.1.2 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding the common causes of electrical faults including poor workmanship, material failure, environmental influences, and misuse.";

const quickCheckQuestions = [
  {
    id: "workmanship-check",
    question: "How can a loose connection during installation lead to a future electrical fault?",
    options: ["It cannot cause problems", "Loose connections cause overheating, arcing, and eventual failure", "It makes connections stronger", "It improves current flow"],
    correctIndex: 1,
    explanation: "Loose connections cause overheating and arcing due to increased resistance, which can lead to insulation damage and fire risks."
  },
  {
    id: "material-failure-check",
    question: "Why is periodic inspection necessary even if an installation was originally safe?",
    options: ["It's not necessary", "Materials deteriorate over time due to heat, UV, and wear", "To create more work", "To use more equipment"],
    correctIndex: 1,
    explanation: "Even correctly installed materials deteriorate over time due to heat, UV exposure, mechanical wear, and ageing, making periodic inspection essential."
  },
  {
    id: "environmental-check",
    question: "Name two environmental conditions that can contribute to electrical faults.",
    options: ["Good lighting and clean air", "Moisture ingress and excessive heat", "Low humidity and stable temperature", "Fresh air and dry conditions"],
    correctIndex: 1,
    explanation: "Moisture ingress and excessive heat are major environmental factors that can cause insulation breakdown and electrical faults."
  },
  {
    id: "overloading-check",
    question: "What can happen if a socket outlet is consistently overloaded?",
    options: ["Nothing happens", "Overheating leading to insulation breakdown and fire risk", "It becomes more efficient", "It uses less electricity"],
    correctIndex: 1,
    explanation: "Consistent overloading causes overheating, which accelerates insulation breakdown and creates serious fire risks."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is one of the most common causes of electrical faults in new installations?",
    options: ["Good materials", "Poor workmanship and installation practices", "Expensive equipment", "Proper testing"],
    correctAnswer: 1,
    explanation: "Poor workmanship during installation, such as loose connections and damaged insulation, is one of the leading causes of electrical faults."
  },
  {
    id: 2,
    question: "How can a loose connection cause a fault over time?",
    options: ["It improves with age", "Increased resistance causes overheating, arcing, and eventual failure", "It has no effect", "It reduces electricity usage"],
    correctAnswer: 1,
    explanation: "Loose connections create increased resistance, leading to overheating and arcing that can cause insulation damage and fire."
  },
  {
    id: 3,
    question: "Why is periodic inspection important?",
    options: ["To create extra work", "To identify faults caused by ageing or deterioration before they become dangerous", "To increase costs", "To use more equipment"],
    correctAnswer: 1,
    explanation: "Periodic inspection (EICR) identifies faults caused by material ageing or deterioration before they create dangerous conditions."
  },
  {
    id: 4,
    question: "What effect can heat have on cable insulation?",
    options: ["Makes it stronger", "Can cause insulation to dry out, crack, and break down", "No effect", "Improves flexibility"],
    correctAnswer: 1,
    explanation: "Excessive heat causes cable insulation to dry out, crack, and break down, reducing its effectiveness and creating fault conditions."
  },
  {
    id: 5,
    question: "Name two environmental factors that can reduce insulation resistance.",
    options: ["Good ventilation and dry conditions", "Moisture ingress and excessive heat", "Clean air and stable temperature", "Low humidity and cool temperature"],
    correctAnswer: 1,
    explanation: "Moisture ingress and excessive heat are major environmental factors that can significantly reduce insulation resistance and cause faults."
  },
  {
    id: 6,
    question: "True or False: Once installed, electrical systems will not develop faults unless damaged.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. Even properly installed systems develop faults over time due to material ageing, environmental conditions, and normal wear."
  },
  {
    id: 7,
    question: "What is the main risk of overloading sockets?",
    options: ["Nothing happens", "Overheating leading to insulation breakdown and fire", "Better performance", "Lower electricity bills"],
    correctAnswer: 1,
    explanation: "Overloading sockets causes overheating, which accelerates insulation breakdown and creates serious fire risks."
  },
  {
    id: 8,
    question: "How can rodents create electrical faults?",
    options: ["They cannot affect electrical systems", "By chewing through cable insulation and damaging conductors", "They improve cable performance", "They clean the cables"],
    correctAnswer: 1,
    explanation: "Rodents can chew through cable insulation and damage conductors, creating short circuits, earth faults, and fire risks."
  },
  {
    id: 9,
    question: "Why must installers select materials suitable for the environment?",
    options: ["To increase costs", "To prevent premature failure due to environmental conditions", "To look professional", "To use more materials"],
    correctAnswer: 1,
    explanation: "Selecting environment-appropriate materials prevents premature failure and ensures long-term safety and reliability of the installation."
  },
  {
    id: 10,
    question: "In the real-world example, what mistake led to cable deterioration near the cooker point?",
    options: ["Using expensive cable", "Using standard PVC cable too close to a heat source", "Proper installation", "Good workmanship"],
    correctAnswer: 1,
    explanation: "The installer used standard PVC cable too close to a heat source instead of heat-resistant cable, causing premature deterioration."
  }
];

const faqs = [
  {
    question: "Can faults develop in a brand-new installation?",
    answer: "Yes — if workmanship is poor or the wrong materials are used. Even new installations can have faults if not properly designed, installed, or tested."
  },
  {
    question: "Do materials fail even if installed correctly?",
    answer: "Over time, yes. Ageing, heat, UV exposure, and mechanical wear can all cause properly installed materials to deteriorate and eventually fail."
  },
  {
    question: "Why do electricians carry out EICRs?",
    answer: "To identify faults caused by ageing or deterioration before they become dangerous. EICRs help maintain electrical safety throughout the installation's life."
  }
];

const Module7Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
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
            <span>Module 7.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Why Faults Occur
          </h1>
          <p className="text-white/80">
            Understanding the common causes of electrical faults and how to prevent them
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Causes:</strong> Poor workmanship, material failure, environmental factors</li>
              <li><strong>Prevention:</strong> Most faults are preventable with correct practices</li>
              <li><strong>Understanding:</strong> Knowing causes helps prevent future problems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Loose connections, wrong materials, environmental stress</li>
              <li><strong>Use:</strong> Proper installation techniques, suitable materials</li>
              <li><strong>Check:</strong> Environmental conditions, material suitability</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the common causes of electrical faults",
              "Understand how poor installation creates faults",
              "Recognise how materials deteriorate over time",
              "Appreciate the role of environmental factors"
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

        {/* Section 1: Poor Workmanship */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Poor Workmanship and Installation Practices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Poor installation practices are the leading cause of electrical faults in new installations,
              accounting for approximately 45% of all faults discovered during initial testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Installation Faults:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Loose Connections</p>
                  <p className="text-xs text-white/80">Terminal screws not tightened to manufacturer's torque settings</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Poor Terminations</p>
                  <p className="text-xs text-white/80">Inadequate conductor preparation or wrong terminal type</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Polarity Errors</p>
                  <p className="text-xs text-white/80">Line and neutral conductors incorrectly connected</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Installation Damage</p>
                  <p className="text-xs text-white/80">Cable insulation damaged during installation</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Root Causes of Poor Workmanship:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Inadequate training:</strong> Insufficient knowledge of BS 7671 requirements</li>
                <li><strong>Time pressure:</strong> Rushing work to meet unrealistic deadlines</li>
                <li><strong>Poor supervision:</strong> Lack of quality control during installation</li>
                <li><strong>Wrong tools:</strong> Using inappropriate or damaged tools</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Prevention Key</p>
              <p className="text-sm text-white">
                Careful workmanship and adherence to BS 7671 standards prevent many faults before they occur.
                Quality installation is the first line of defence.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Material Failure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Material Failure and Deterioration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Even correctly installed materials can deteriorate over time due to various factors
              including heat exposure, UV radiation, moisture, and mechanical stress.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Heat:</strong> Accelerates polymer degradation</li>
                  <li><strong>UV Radiation:</strong> Breaks down molecular bonds</li>
                  <li><strong>Moisture:</strong> Causes metal corrosion</li>
                  <li><strong>Chemical Attack:</strong> Industrial environments</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mechanical Stress</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Vibration:</strong> Loosens connections</li>
                  <li><strong>Thermal Cycling:</strong> Expansion and contraction</li>
                  <li><strong>Cable Movement:</strong> Conductor fatigue</li>
                  <li><strong>Physical Loading:</strong> Impact damage</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-2">PVC Cable Insulation Lifespan (25-30 years)</p>
              <ul className="text-sm text-white/80 space-y-1">
                <li>Years 1-10: Minimal degradation under normal conditions</li>
                <li>Years 10-20: Gradual hardening and loss of flexibility</li>
                <li>Years 20+: Cracking, especially at terminations and bends</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Environmental Influences */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Environmental and External Influences
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              External factors are another major cause of electrical faults. Electrical systems
              must be designed and installed with environmental risks in mind.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">Moisture Problems</p>
                <p className="text-xs text-white/80">Water ingress, condensation, high humidity</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">Heat Problems</p>
                <p className="text-xs text-white/80">Excessive ambient temperatures, poor ventilation</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">Physical Damage</p>
                <p className="text-xs text-white/80">Rodents, drilling, construction impact</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">Chemical Attack</p>
                <p className="text-xs text-white/80">Corrosive atmospheres, salt spray</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design Consideration:</strong> Electrical systems must be designed and installed
              with environmental risks in mind, using suitable materials and protective measures.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Overloading and Misuse */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Overloading and Misuse
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Circuits are designed with specific limits, and exceeding those limits creates fault conditions.
              User behaviour plays a significant role in fault development.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Misuse Examples:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Overloading socket outlets with too many appliances</li>
                <li>Running equipment beyond its rated capacity</li>
                <li>Modifying circuits without proper knowledge</li>
                <li>Using inappropriate extension leads or adaptors</li>
                <li>Ignoring manufacturer's operating instructions</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Consequences of Overloading</p>
              <ul className="text-sm text-white space-y-1">
                <li>Overheating of conductors and accessories</li>
                <li>Accelerated insulation breakdown</li>
                <li>Increased fire risk</li>
                <li>Premature failure of protective devices</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Carry out neat, accurate, and careful installation work</li>
                <li>Select materials suited to the environment</li>
                <li>Tighten connections to manufacturer's torque settings</li>
                <li>Protect cables from damage during and after installation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Client Education</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Explain risks of overloading sockets and circuits</li>
                <li>Advise on proper use of extension leads</li>
                <li>Recommend regular inspection and maintenance</li>
                <li>Highlight importance of not modifying circuits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Prevention Priorities</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Design for environmental conditions</li>
                <li>Use appropriate materials for each location</li>
                <li>Plan for future load requirements</li>
                <li>Schedule regular maintenance and inspection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real-World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real-World Example</h2>
          <div className="p-4 rounded-lg bg-white/5">
            <h3 className="text-sm font-medium text-white mb-3">Case Study: Community Centre Kitchen Circuit</h3>
            <p className="text-sm text-white mb-4">
              A community centre experienced repeated tripping on its kitchen ring circuit.
              Investigation revealed that the cable insulation had degraded near a cooker point.
              The original installation used standard PVC cable too close to a heat source,
              which accelerated deterioration.
            </p>

            <div className="p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Lesson:</strong> Most faults are not random — they are caused by preventable
                factors such as poor installation practices, unsuitable materials, or environmental stress.
                The cable had to be replaced with heat-resistant cable at extra cost.
              </p>
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
          <h2 className="text-xl font-semibold text-white mb-6">Quick Reference</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="text-sm font-medium text-white mb-3">Prevention Checklist</h3>
              <ul className="text-xs text-white space-y-1">
                <li>Use proper installation techniques</li>
                <li>Select environment-appropriate materials</li>
                <li>Make secure, tight connections</li>
                <li>Protect cables from damage</li>
                <li>Consider heat, moisture, and chemical exposure</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-white mb-3">Warning Signs</h3>
              <ul className="text-xs text-white space-y-1">
                <li>Overheating at connections</li>
                <li>Discoloration or burning smells</li>
                <li>Brittle or cracked insulation</li>
                <li>Corrosion on metalwork</li>
                <li>Moisture ingress indicators</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Recap */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-white leading-relaxed">
            Faults occur because of poor workmanship, material failure, environmental influences, or misuse.
            They are rarely random — most are predictable and preventable. Understanding why faults occur helps
            electricians design better, install carefully, and maintain systems safely. The key is to consider
            all factors during installation and to educate users about proper electrical system use.
          </p>
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
            <Link to="../1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../1-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Module7Section1_2;
