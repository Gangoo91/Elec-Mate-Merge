import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Interpreting Test Readings - Module 7.4.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to interpret electrical test readings effectively and know when results indicate problems that need investigation.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What does a resistance reading of >999 MΩ on insulation testing typically indicate?",
    options: ["Poor insulation", "Good insulation", "Test fault", "Earth fault"],
    correctIndex: 1,
    explanation: ">999 MΩ indicates excellent insulation resistance, well above minimum requirements."
  },
  {
    id: 2,
    question: "When should you investigate a continuity reading further?",
    options: ["When it's exactly 0.05Ω", "When readings vary significantly between similar circuits", "When it's below 2Ω", "Always"],
    correctIndex: 1,
    explanation: "Significant variations between similar circuits may indicate loose connections or circuit faults."
  },
  {
    id: 3,
    question: "What Zs reading would require immediate investigation on a 32A Type B MCB?",
    options: ["0.8Ω", "1.2Ω", "1.6Ω", "2.0Ω"],
    correctIndex: 3,
    explanation: "Maximum Zs for 32A Type B MCB is 1.44Ω. A reading of 2.0Ω exceeds this limit and requires investigation."
  }
];

const Module7Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the minimum acceptable insulation resistance for most circuits?",
      options: ["0.5MΩ", "1MΩ", "2MΩ", "10MΩ"],
      correctAnswer: 1,
      explanation: "The minimum acceptable insulation resistance is 1MΩ for most circuits according to BS 7671."
    },
    {
      id: 2,
      question: "A continuity test reading of 2Ω on a lighting circuit indicates:",
      options: ["Excellent connection", "Acceptable reading", "High resistance - investigate", "Open circuit"],
      correctAnswer: 2,
      explanation: "2Ω is higher than typical but may be acceptable depending on circuit length. Investigation is warranted."
    },
    {
      id: 3,
      question: "What should you do if a Zs reading is 95% of the maximum allowable value?",
      options: ["Pass the test", "Investigate further", "Fail immediately", "Ignore the reading"],
      correctAnswer: 1,
      explanation: "Readings close to maximum limits should be investigated as they indicate potential developing problems."
    },
    {
      id: 4,
      question: "Why might two identical circuits give different test readings?",
      options: ["They can't - identical circuits always give same readings", "Due to cable length, connections, or temperature differences", "Only if one is faulty", "Test equipment error only"],
      correctAnswer: 1,
      explanation: "Many factors including cable length, connection quality, and ambient temperature can affect readings."
    },
    {
      id: 5,
      question: "True or False: Readings within limits but higher than expected should be investigated.",
      options: ["False", "True"],
      correctAnswer: 1,
      explanation: "True. Unexpected readings often indicate developing problems that should be investigated."
    },
    {
      id: 6,
      question: "What insulation resistance reading would require immediate investigation?",
      options: ["50MΩ", "10MΩ", "2MΩ", "0.8MΩ"],
      correctAnswer: 3,
      explanation: "0.8MΩ is below the minimum 1MΩ requirement and indicates insulation breakdown requiring investigation."
    },
    {
      id: 7,
      question: "When interpreting earth fault loop impedance readings, what should you consider?",
      options: ["Only the exact value", "The value compared to BS 7671 maximum limits", "Only whether it's zero", "The test equipment used"],
      correctAnswer: 1,
      explanation: "Zs readings must be compared to the maximum values specified in BS 7671 tables for the protection device."
    },
    {
      id: 8,
      question: "What action should you take for borderline test readings?",
      options: ["Always pass them", "Always fail them", "Investigate and document findings", "Ignore them"],
      correctAnswer: 2,
      explanation: "Borderline readings should be investigated, documented, and appropriate action taken based on findings."
    },
    {
      id: 9,
      question: "Which test reading typically shows the greatest variation between circuits?",
      options: ["Insulation resistance", "Continuity", "Earth fault loop impedance", "RCD trip times"],
      correctAnswer: 2,
      explanation: "Earth fault loop impedance varies most due to differences in cable lengths, connections, and earth paths."
    },
    {
      id: 10,
      question: "How should test readings be recorded?",
      options: ["Approximately", "Exactly as displayed on the meter", "Rounded to nearest whole number", "Only if they fail"],
      correctAnswer: 1,
      explanation: "Test readings should be recorded exactly as displayed on the test instrument for accuracy and compliance."
    }
  ];

  const faqs = [
    {
      question: "Why might two identical circuits give different test readings?",
      answer: "Factors like cable length, ambient temperature, connection quality, and cable route can all affect readings even in identical installations. Small variations are normal, but significant differences warrant investigation."
    },
    {
      question: "Should I always investigate readings that are within limits but higher than expected?",
      answer: "Yes, unexpected readings often indicate developing problems. It's better to investigate and find nothing than miss an emerging fault that could become dangerous."
    },
    {
      question: "What's the difference between a reading that 'passes' and one that's 'good'?",
      answer: "A 'pass' means the reading meets minimum BS 7671 requirements. A 'good' reading has margin above minimums, indicating healthy installation with room for some deterioration before becoming problematic."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 4</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <Eye className="w-4 h-4" />
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 4.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Interpreting Test Readings
            </h1>
            <p className="text-white/70 text-lg">
              Understanding what electrical test results mean
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li>• Readings significantly outside normal ranges need investigation</li>
              <li>• Inconsistent results between similar circuits indicate problems</li>
              <li>• Values approaching or exceeding maximum limits are concerning</li>
              <li>• Always compare readings to BS 7671 requirements</li>
            </ul>
          </div>

          {/* Why This Matters */}
          <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-500/50 mb-10">
            <p className="font-medium text-blue-400 mb-2">Why This Matters</p>
            <p className="text-white/80 text-sm">
              Proper interpretation of test readings prevents 85% of electrical faults from going undetected and ensures installations meet safety standards. Accurate reading interpretation reduces callback rates by 60% and prevents potential electrical hazards before they become dangerous.
            </p>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2">
              <li>• Interpret test readings for continuity, insulation resistance, and earth fault loop impedance</li>
              <li>• Identify when readings indicate potential problems requiring investigation</li>
              <li>• Use BS 7671 requirements to determine pass/fail criteria</li>
              <li>• Understand factors that can affect test readings</li>
              <li>• Apply professional judgement to borderline readings</li>
            </ul>
          </section>

          {/* Block 1: Understanding Test Readings */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Understanding Test Readings
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Test readings tell us whether electrical installations are safe and compliant. Each test has specific limits and normal ranges that must be understood to make accurate assessments.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Continuity Testing</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Acceptable readings:</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Ring final circuits: Initial reading of R1 + R2 within expected range</li>
                      <li>• Protective conductors: Low resistance path confirmed</li>
                      <li>• Main bonding: Resistance typically &lt;0.05Ω</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                    <p className="text-sm text-white/80">
                      <strong className="text-green-400">Good Practice:</strong> Compare readings between similar circuits - significant variations may indicate connection problems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Block 2: Insulation Resistance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Insulation Resistance Interpretation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Insulation resistance readings indicate the quality of insulation between conductors and earth. These readings are crucial for identifying potential breakdown or deterioration.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">BS 7671 Requirements</p>
                <div className="p-3 rounded bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-white/90 mb-2">Reading interpretation:</p>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• <strong className="text-white/90">Minimum acceptable:</strong> 1MΩ (BS 7671 requirement)</li>
                    <li>• <strong className="text-white/90">Good reading:</strong> 10MΩ or higher</li>
                    <li>• <strong className="text-white/90">Excellent reading:</strong> &gt;999MΩ or above</li>
                    <li>• <strong className="text-white/90">Investigate if:</strong> Below 2MΩ (potential deterioration)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="readings-check-1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Block 3: Earth Fault Loop Impedance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Earth Fault Loop Impedance (Zs)
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Zs readings determine whether protective devices will operate quickly enough to prevent danger. These must be compared to maximum values specified in BS 7671.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Maximum Values</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Critical factors:</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Must not exceed BS 7671 maximum values for the protection device</li>
                      <li>• Consider circuit voltage and disconnection time requirements</li>
                      <li>• Account for temperature correction factors</li>
                      <li>• Investigate readings approaching maximum limits</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded bg-orange-500/10 border border-orange-500/20">
                    <p className="text-sm text-white/80">
                      <strong className="text-orange-400">Safety Margin:</strong> Readings above 80% of maximum should be investigated as they may indicate developing earth faults.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="readings-check-2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Block 4: When to Investigate */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              When to Investigate Further
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Professional judgement is required to determine when readings warrant investigation. Not all readings that pass minimum requirements are acceptable in context.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Investigation Triggers</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Investigate when:</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Readings approach or exceed maximum limits</li>
                      <li>• Significant variations between similar circuits</li>
                      <li>• Results differ from previous test records</li>
                      <li>• Unexpected readings that don't match installation type</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-white/80">
                      <strong className="text-red-400">Professional Responsibility:</strong> When in doubt, investigate. It's better to find nothing wrong than miss a developing fault.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="readings-check-3"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Practical Guidance
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">For Apprentices:</p>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• Always record readings exactly as displayed on the meter</li>
                  <li>• Compare results with BS 7671 tables and previous records</li>
                  <li>• Report unexpected or borderline readings to your supervisor</li>
                  <li>• Never guess - if unsure about a reading, ask for guidance</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="font-medium text-blue-400 mb-3">Common Mistakes to Avoid:</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Accepting borderline readings without investigation</li>
                  <li>• Assuming all similar circuits should give identical readings</li>
                  <li>• Ignoring temperature effects on resistance measurements</li>
                  <li>• Not considering cable length when interpreting continuity readings</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-sm text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-medium text-white mb-3">Key Points to Remember:</p>
              <ul className="text-white/80 space-y-2 text-sm">
                <li>• Know the acceptable ranges for each type of test</li>
                <li>• Look for patterns and consistency in readings</li>
                <li>• Understand when readings require investigation</li>
                <li>• Always reference BS 7671 limits and guidance</li>
                <li>• When in doubt, investigate further or seek guidance</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-white/70">
                  <strong className="text-white">Best Practice:</strong> Record all readings clearly, note any unusual results, and always err on the side of caution when interpreting borderline readings. Professional competence includes knowing when to seek advice.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test Your Knowledge: Interpreting Test Readings" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Previous: Zone Division</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-6">
                <span className="hidden sm:inline">Next: When to Escalate</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section4_5;
