import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m1s1-check1",
    question: "Which legislation places primary responsibility on the 'responsible person' for fire safety?",
    options: ["Building Regulations", "Health and Safety at Work Act", "Regulatory Reform (Fire Safety) Order 2005", "BS 5266-1"],
    correctIndex: 2,
    explanation: "The Regulatory Reform (Fire Safety) Order 2005 (RRO) places duties on the 'responsible person' (typically the employer or building owner) to carry out fire risk assessments and implement appropriate fire safety measures, including emergency lighting."
  },
  {
    id: "emergencylighting-m1s1-check2",
    question: "What is the minimum illumination level for escape routes under BS 5266-1?",
    options: ["0.5 lux", "1 lux", "2 lux", "5 lux"],
    correctIndex: 1,
    explanation: "BS 5266-1 specifies a minimum of 1 lux at floor level along the centre line of escape routes. Anti-panic areas require 0.5 lux minimum across the area."
  },
  {
    id: "emergencylighting-m1s1-check3",
    question: "What is the required emergency lighting duration for most occupied premises?",
    options: ["1 hour", "2 hours", "3 hours", "4 hours"],
    correctIndex: 2,
    explanation: "Most premises require 3-hour duration emergency lighting under BS 5266-1. Some premises like sleeping accommodation may require longer durations of up to 3 hours."
  }
];

const faqs = [
  {
    question: "Who is the 'responsible person' under the RRO 2005?",
    answer: "The responsible person is typically the employer, owner, or person with control of the premises. They must carry out fire risk assessments and ensure appropriate fire safety measures are in place, including adequate emergency lighting."
  },
  {
    question: "Is emergency lighting legally required in all buildings?",
    answer: "Emergency lighting is legally required in workplaces, public buildings, and HMOs. Domestic dwellings are generally exempt unless they're HMOs or have communal areas. The fire risk assessment determines the specific requirements."
  },
  {
    question: "What's the difference between Building Regulations and BS 5266?",
    answer: "Building Regulations (Approved Document B) sets minimum legal requirements for new buildings. BS 5266-1 is a British Standard providing detailed technical guidance and is often referenced by Building Regulations and enforcing authorities."
  },
  {
    question: "Can I face prosecution for inadequate emergency lighting?",
    answer: "Yes. Under the RRO 2005, failing to provide adequate emergency lighting can result in enforcement notices, prohibition notices, or prosecution. Penalties include unlimited fines and up to 2 years imprisonment for serious breaches."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A fire risk assessor finds a building has inadequate emergency lighting. Under which legislation would enforcement action most likely be taken?",
  options: [
    "Building Regulations Part B",
    "BS 5266-1:2016",
    "Regulatory Reform (Fire Safety) Order 2005",
    "Health and Safety at Work Act 1974"
  ],
  correctAnswer: 2,
  explanation: "The RRO 2005 is the primary enforcement legislation for fire safety in occupied premises. Fire and Rescue Authorities can take enforcement action including prosecution under this Order for inadequate emergency lighting."
  }
];

const EmergencyLightingModule1Section1 = () => {
  useSEO({
    title: "Purpose and Legal Framework | Emergency Lighting Module 1.1",
    description: "Learn about emergency lighting legal requirements, Regulatory Reform (Fire Safety) Order 2005, Building Regulations, and BS 5266-1 compliance."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-1">
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
            <span>Module 1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Purpose and Legal Framework
          </h1>
          <p className="text-white/80">
            Understanding the legal requirements and regulatory framework for emergency lighting
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>RRO 2005:</strong> Primary fire safety legislation</li>
              <li><strong>BS 5266-1:</strong> Technical standard for design</li>
              <li><strong>Duration:</strong> 3 hours standard requirement</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Values</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Escape routes:</strong> Minimum 1 lux</li>
              <li><strong>Anti-panic:</strong> Minimum 0.5 lux</li>
              <li><strong>Activation:</strong> Within 5 seconds</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify key emergency lighting legislation",
              "Understand RRO 2005 responsibilities",
              "Apply BS 5266-1 requirements",
              "Recognise Building Regulations requirements",
              "Determine duration requirements",
              "Understand enforcement powers"
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
            Regulatory Reform (Fire Safety) Order 2005
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The RRO 2005 is the primary fire safety legislation in England and Wales. It places
              duties on the 'responsible person' to carry out fire risk assessments and implement
              appropriate fire safety measures, including emergency lighting.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Responsible Person Duties</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Carry out fire risk assessment</li>
                  <li>Implement fire safety measures</li>
                  <li>Provide and maintain emergency routes</li>
                  <li>Ensure adequate emergency lighting</li>
                  <li>Maintain and test systems regularly</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Enforcement Powers</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Alterations notices</li>
                  <li>Enforcement notices</li>
                  <li>Prohibition notices</li>
                  <li>Prosecution for serious breaches</li>
                  <li>Unlimited fines possible</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BS 5266-1 Technical Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5266-1:2016 is the British Standard for emergency lighting. It provides detailed
              technical guidance on design, installation, and maintenance requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Illumination Levels</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Escape routes:</strong> 1 lux minimum at floor</li>
                  <li><strong>Anti-panic areas:</strong> 0.5 lux minimum</li>
                  <li><strong>High-risk task:</strong> 10% of normal or 15 lux</li>
                  <li><strong>Uniformity ratio:</strong> Maximum 40:1</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Duration Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Standard:</strong> 3 hours</li>
                  <li><strong>Sleeping risk:</strong> 3 hours</li>
                  <li><strong>High-risk task:</strong> As risk assessment</li>
                  <li><strong>Activation:</strong> Within 5 seconds</li>
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
            Building Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Regulations Approved Document B (Fire Safety) sets minimum requirements for
              emergency lighting in new buildings and major alterations. It references BS 5266 for
              detailed technical compliance.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Part B</p>
                <p className="text-white/90 text-xs">Fire safety</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">AD B</p>
                <p className="text-white/90 text-xs">Approved Document</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">BS 5266</p>
                <p className="text-white/90 text-xs">Referenced standard</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Fire risk assessment identifies emergency lighting needs</li>
                <li>System designed to BS 5266-1 requirements</li>
                <li>Minimum 1 lux on escape routes achieved</li>
                <li>3-hour duration provided where required</li>
                <li>Monthly and annual testing regime in place</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Failures</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No testing records:</strong> — Maintain log book to BS 5266-8</li>
                <li><strong>Inadequate coverage:</strong> — Survey escape routes with lux meter</li>
                <li><strong>Failed luminaires:</strong> — Implement monthly functional tests</li>
                <li><strong>Insufficient duration:</strong> — Verify battery capacity annually</li>
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
              <p className="font-medium text-white mb-1">Key Legislation</p>
              <ul className="space-y-0.5">
                <li>RRO 2005 (Fire Safety Order)</li>
                <li>Building Regulations Part B</li>
                <li>BS 5266-1:2016</li>
                <li>BS EN 1838</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Values</p>
              <ul className="space-y-0.5">
                <li>Escape routes: 1 lux minimum</li>
                <li>Anti-panic: 0.5 lux minimum</li>
                <li>Duration: 3 hours standard</li>
                <li>Activation: 5 seconds max</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-1-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule1Section1;