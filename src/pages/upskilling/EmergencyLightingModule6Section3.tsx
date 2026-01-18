import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m6s3-check1",
    question: "What determines whether a 1-hour or 3-hour duration system is required?",
    options: ["Building aesthetics", "Client budget", "Risk category and occupancy type", "Electrician preference"],
    correctIndex: 2,
    explanation: "The building's risk category and occupancy type determine duration. Low-risk buildings with simple layouts may use 1-hour duration; public or complex premises require 3-hour duration."
  },
  {
    id: "emergencylighting-m6s3-check2",
    question: "What is the minimum illuminance required for high-risk task areas?",
    options: ["0.5 lux", "1 lux", "5 lux", "15 lux"],
    correctIndex: 3,
    explanation: "BS 5266-1 specifies 15 lux for high-risk task areas (such as operating theatres), 1 lux for escape routes, and 0.5 lux for open areas."
  },
  {
    id: "emergencylighting-m6s3-check3",
    question: "When must a fire risk assessment be reviewed?",
    options: ["Only when fire occurs", "Every 5 years", "At least annually or after building changes", "Only when requested"],
    correctIndex: 2,
    explanation: "Risk assessments must be reviewed at least annually, and whenever there are changes to building use, layout, occupancy, or after incidents."
  }
];

const faqs = [
  {
    question: "Who is responsible for carrying out the fire risk assessment?",
    answer: "The building's Responsible Person must ensure it's completed by a competent person — often a certified fire risk assessor. This may be an employee with suitable training or an external consultant."
  },
  {
    question: "What if the lighting design and risk assessment conflict?",
    answer: "Always default to the higher safety requirement and document your decision for audit purposes. Consult with the fire risk assessor and the Responsible Person to resolve conflicts before proceeding."
  },
  {
    question: "Can I use a 1-hour system if the client wants to save money?",
    answer: "No — if the risk assessment specifies 3-hour duration, you must comply. Installing inadequate systems makes both you and the client liable for prosecution. Always quote to the correct standard."
  },
  {
    question: "What happens if there's no risk assessment in place?",
    answer: "This is a legal breach under the Fire Safety Order. You should not proceed with design or installation until a proper risk assessment has been completed and approved."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A school building would typically be classified as which risk category for emergency lighting?",
    options: [
      "Low risk - 1-hour duration sufficient",
      "Medium risk - 3-hour duration with anti-panic lighting",
      "High risk - central battery systems required",
      "No risk - emergency lighting optional"
    ],
    correctAnswer: 1,
    explanation: "Schools are typically medium risk, requiring 3-hour duration and anti-panic lighting in open areas such as halls and assembly spaces, due to the presence of children and public access."
  }
];

const EmergencyLightingModule6Section3 = () => {
  useSEO({
    title: "Emergency Lighting in Risk Assessments | Emergency Lighting Module 6.3",
    description: "Understand how fire risk assessments drive emergency lighting design decisions under BS 5266-1 and the Regulatory Reform (Fire Safety) Order 2005."
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
            <Link to="/study-centre/upskilling/emergency-lighting-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Lighting in Risk Assessments
          </h1>
          <p className="text-white/80">
            How fire risk assessments drive emergency lighting design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Starting point:</strong> Fire risk assessment</li>
              <li><strong>Determines:</strong> Duration, illuminance</li>
              <li><strong>Standard:</strong> BS 5266-1 guidance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Risk Categories</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Low:</strong> 1-hour, basic lighting</li>
              <li><strong>Medium:</strong> 3-hour, anti-panic</li>
              <li><strong>High:</strong> 3-hour+, redundancy</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Interpret fire risk assessments",
              "Apply BS 5266-1 to risk findings",
              "Understand risk categories",
              "Determine duration requirements",
              "Select appropriate illuminance",
              "Review and update assessments"
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
            The Role of Fire Risk Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting design starts with the fire risk assessment. Under the RRO 2005,
              every building must have a written assessment identifying hazards and ensuring
              occupants can safely escape during emergencies.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Assessment Considers</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Occupant type and familiarity</li>
                  <li>Occupant vulnerability</li>
                  <li>Building use and complexity</li>
                  <li>Environmental conditions</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Determines Lighting</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Where lighting is needed</li>
                  <li>Required duration</li>
                  <li>Illuminance levels</li>
                  <li>Circuit design approach</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Risk-based</p>
                <p className="text-white/90 text-xs">Tailored design</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Legal</p>
                <p className="text-white/90 text-xs">RRO requirement</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Foundation</p>
                <p className="text-white/90 text-xs">For all design</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BS 5266-1 Design Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5266-1 translates fire risk findings into specific design requirements.
              The standard provides illuminance levels, duration requirements, and
              circuit design guidance based on risk category.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Illuminance Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Escape routes:</strong> 1 lux minimum along centre line</li>
                <li><strong>Open areas:</strong> 0.5 lux (anti-panic lighting)</li>
                <li><strong>High-risk task areas:</strong> 15 lux (operating theatres, switchrooms)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Duration Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1 hour:</strong> Low-risk buildings with simple layouts</li>
                <li><strong>3 hours:</strong> Public buildings, complex premises, sleeping risk</li>
              </ul>
            </div>

            <p>
              The risk assessment determines which requirements apply. Electricians must
              understand the assessment findings to specify compliant systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Risk Categories and Implications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire risk assessments typically categorise buildings into low, medium, or
              high risk. Each category has specific emergency lighting implications.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-400 mb-2">Low Risk</p>
                <ul className="text-xs text-white space-y-1">
                  <li>Small offices, shops</li>
                  <li>1-hour duration</li>
                  <li>Basic escape lighting</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-sm font-medium text-yellow-400 mb-2">Medium Risk</p>
                <ul className="text-xs text-white space-y-1">
                  <li>Schools, factories</li>
                  <li>3-hour duration</li>
                  <li>Anti-panic lighting</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-2">High Risk</p>
                <ul className="text-xs text-white space-y-1">
                  <li>Hospitals, theatres</li>
                  <li>3-hour minimum</li>
                  <li>Redundancy systems</li>
                </ul>
              </div>
            </div>

            <p>
              High-risk premises may require central battery systems, enhanced
              fire-resistant cabling, and high-risk task area lighting at 15 lux.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Review Triggers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Annual minimum review</li>
                <li>Building use or layout changes</li>
                <li>Extensions or re-partitioning</li>
                <li>After evacuation incidents</li>
                <li>Regulation or standard updates</li>
                <li>Occupancy changes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Assessment Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Generic designs:</strong> — Not tailored to specific risks</li>
                <li><strong>Wrong duration:</strong> — 1-hour where 3-hour required</li>
                <li><strong>Ignored findings:</strong> — Client budget overriding safety</li>
                <li><strong>No documentation:</strong> — Design not linked to assessment</li>
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
              <p className="font-medium text-white mb-1">Illuminance Levels</p>
              <ul className="space-y-0.5">
                <li>Escape routes: 1 lux</li>
                <li>Open areas: 0.5 lux</li>
                <li>High-risk tasks: 15 lux</li>
                <li>Exit signs: visible</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Duration by Risk</p>
              <ul className="space-y-0.5">
                <li>Low risk: 1 hour</li>
                <li>Medium risk: 3 hours</li>
                <li>High risk: 3 hours+</li>
                <li>Review: annually</li>
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
            <Link to="/study-centre/upskilling/emergency-lighting-module-6-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/emergency-lighting-module-6-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule6Section3;
