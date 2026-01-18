import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m2s3-check1",
    question: "What is the minimum illumination level for high-risk task area lighting?",
    options: ["1 lux", "5 lux", "10% of normal lighting", "15 lux or 10% of normal"],
    correctIndex: 3,
    explanation: "High-risk task areas require 10% of normal task illumination or 15 lux minimum, whichever is greater. This ensures operators can safely shut down hazardous processes."
  },
  {
    id: "emergencylighting-m2s3-check2",
    question: "What determines if an area requires high-risk task lighting?",
    options: ["Floor area only", "Fire risk assessment only", "Specific risk assessment", "Building type"],
    correctIndex: 2,
    explanation: "High-risk task areas are identified through specific risk assessment, not general fire risk assessment. The assessment must identify processes where sudden darkness creates danger."
  },
  {
    id: "emergencylighting-m2s3-check3",
    question: "How quickly must high-risk task lighting reach full output?",
    options: ["5 seconds (0.5 second preferred)", "15 seconds", "30 seconds", "60 seconds"],
    correctIndex: 0,
    explanation: "High-risk task lighting must reach full output within 5 seconds, but 0.5 seconds is preferred to enable immediate safe shutdown of hazardous processes."
  }
];

const faqs = [
  {
    question: "What are examples of high-risk task areas?",
    answer: "Operating rotating machinery, chemical handling processes, work at height, operating lifting equipment, control room operations, laboratory work with hazardous substances, and switchgear operation."
  },
  {
    question: "How do I determine the required illumination level?",
    answer: "Calculate 10% of the normal task illumination for the specific work area. If this is less than 15 lux, use 15 lux as minimum. The risk assessment should specify exact requirements."
  },
  {
    question: "Is high-risk task lighting always maintained?",
    answer: "Not necessarily. The key requirement is instant availability - full output within 5 seconds (0.5 seconds preferred). This can be achieved with non-maintained luminaires with fast response batteries."
  },
  {
    question: "Who determines which areas need high-risk task lighting?",
    answer: "The employer or responsible person through risk assessment, often with input from health and safety professionals. It requires process-specific knowledge beyond general fire risk assessment."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A machine shop has normal task lighting of 500 lux. What is the minimum emergency illumination required for high-risk task lighting?",
  options: [
    "15 lux (minimum standard)",
    "25 lux (5% of normal)",
    "50 lux (10% of normal)",
    "100 lux (20% of normal)"
  ],
  correctAnswer: 2,
  explanation: "10% of 500 lux = 50 lux. Since this exceeds the 15 lux minimum, 50 lux is required. High-risk task lighting uses the higher of 10% normal lighting or 15 lux."
  }
];

const EmergencyLightingModule2Section3 = () => {
  useSEO({
    title: "High-Risk Task Area Lighting | Emergency Lighting Module 2.3",
    description: "Learn about high-risk task area emergency lighting requirements, 15 lux minimum standards, risk assessment, and installation for dangerous work environments."
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
            <Link to="/electrician/upskilling/emergency-lighting-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            High-Risk Task Area Lighting
          </h1>
          <p className="text-white/80">
            Emergency lighting for dangerous work environments requiring safe shutdown
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Level:</strong> 10% of normal or 15 lux</li>
              <li><strong>Response:</strong> 5 seconds (0.5s preferred)</li>
              <li><strong>Purpose:</strong> Safe shutdown of hazards</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Risk Assessment</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Required:</strong> Specific task analysis</li>
              <li><strong>Identifies:</strong> Hazardous processes</li>
              <li><strong>Determines:</strong> Illumination needs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify high-risk task areas",
              "Calculate required illumination levels",
              "Understand response time requirements",
              "Apply risk assessment findings",
              "Select appropriate luminaires",
              "Position lighting for task visibility"
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
            Definition and Purpose
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              High-risk task area lighting is required where a sudden loss of lighting would create
              immediate danger. Unlike escape and anti-panic lighting, it's focused on enabling
              safe shutdown of hazardous processes rather than evacuation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical High-Risk Areas</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Rotating machinery operation</li>
                  <li>Chemical handling processes</li>
                  <li>Work at height locations</li>
                  <li>Lifting equipment controls</li>
                  <li>Laboratory operations</li>
                  <li>Switchgear rooms</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Purpose</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Enable safe process shutdown</li>
                  <li>Prevent injury during darkness</li>
                  <li>Allow emergency stop operation</li>
                  <li>Support safe tool-down</li>
                  <li>Provide immediate visibility</li>
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
            Technical Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              High-risk task lighting has the most demanding requirements of any emergency
              lighting category, reflecting the serious consequences of inadequate illumination.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Illumination Level</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Calculation:</strong> 10% of normal task level</li>
                  <li><strong>Minimum:</strong> 15 lux regardless</li>
                  <li><strong>Apply:</strong> Higher of the two values</li>
                  <li><strong>Uniformity:</strong> 10:1 maximum ratio</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Response Time</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Maximum:</strong> 5 seconds to full output</li>
                  <li><strong>Preferred:</strong> 0.5 seconds</li>
                  <li><strong>Duration:</strong> As per risk assessment</li>
                  <li><strong>CRI:</strong> Ra 40 minimum</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">15 lux min</p>
                <p className="text-white/90 text-xs">Or 10% normal</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">0.5 seconds</p>
                <p className="text-white/90 text-xs">Preferred response</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">10:1</p>
                <p className="text-white/90 text-xs">Max uniformity</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Risk Assessment Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Unlike general emergency lighting determined by fire risk assessment, high-risk
              task areas require specific process-based risk assessment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Assessment Steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Identify:</strong> All processes where sudden darkness causes danger</li>
                <li><strong>Evaluate:</strong> Consequence of lighting failure during operation</li>
                <li><strong>Determine:</strong> Required illumination for safe shutdown</li>
                <li><strong>Specify:</strong> Response time requirements</li>
                <li><strong>Document:</strong> Findings and design requirements</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Position luminaires to illuminate task area directly</li>
                <li>Consider glare - operators need to see controls clearly</li>
                <li>Use luminaires with fast response batteries</li>
                <li>10:1 uniformity is tighter than escape route (40:1)</li>
                <li>May need maintained operation in some cases</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Design Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using escape route standards:</strong> — 15 lux not 1 lux required</li>
                <li><strong>Slow response luminaires:</strong> — 0.5 seconds preferred, 5s max</li>
                <li><strong>No risk assessment:</strong> — Process-specific assessment mandatory</li>
                <li><strong>Wrong uniformity:</strong> — 10:1 not 40:1 for task areas</li>
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
              <p className="font-medium text-white mb-1">Illumination Requirements</p>
              <ul className="space-y-0.5">
                <li>Level: 10% of normal or 15 lux</li>
                <li>Uniformity: 10:1 maximum</li>
                <li>CRI: Ra 40 minimum</li>
                <li>Glare: Must not impair task</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Performance Requirements</p>
              <ul className="space-y-0.5">
                <li>Response: 0.5s preferred, 5s max</li>
                <li>Duration: Per risk assessment</li>
                <li>Testing: Regular verification</li>
                <li>Documentation: Risk assessment</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-2-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule2Section3;