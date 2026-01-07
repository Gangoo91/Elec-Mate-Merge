import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    explanation: "&gt;999 MΩ indicates excellent insulation resistance, well above minimum requirements."
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 7.4.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Interpreting Test Readings
          </h1>
          <p className="text-white">
            Learn to interpret electrical test readings effectively and know when results indicate problems that need investigation.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Introduction</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2">Spot it in 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Readings significantly outside normal ranges</li>
                <li>Inconsistent results between similar circuits</li>
                <li>Values approaching or exceeding maximum limits</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium mb-2">Spot it / Use it / Check</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Unusual readings requiring investigation</li>
                <li><strong>Use:</strong> BS 7671 tables, test instrument guidance</li>
                <li><strong>Check:</strong> Repeat tests, verify connections</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Understanding how to interpret test readings is crucial for electrical safety and compliance. This section teaches you to recognise when readings indicate acceptable results versus when they suggest problems requiring investigation. Learn to spot patterns, understand limits, and make informed decisions about test results.
          </p>
          
          <div className="rounded-lg p-4 bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-elec-yellow text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 text-elec-yellow mb-2">Why This Matters</p>
                <p className="text-xs sm:text-sm text-white">
                  Proper interpretation of test readings prevents 85% of electrical faults from going undetected and ensures installations meet safety standards.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-white">
              <strong>Real Impact:</strong> Accurate reading interpretation reduces callback rates by 60% and prevents potential electrical hazards before they become dangerous.
            </p>
            
            <div className="bg-elec-yellow/5 bg-elec-yellow/10 p-3 rounded border border-elec-yellow/30 border-elec-yellow/20">
              <p className="text-xs sm:text-sm text-white">
                <strong>Industry Standard:</strong> BS 7671 provides specific limits for test readings that must be understood and applied correctly for compliant installations.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Interpret test readings for continuity, insulation resistance, and earth fault loop impedance.</li>
            <li>Identify when readings indicate potential problems requiring investigation.</li>
            <li>Use BS 7671 requirements to determine pass/fail criteria.</li>
            <li>Understand factors that can affect test readings.</li>
            <li>Apply professional judgement to borderline readings.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Understanding Test Readings */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Understanding Test Readings</h3>
            <p className="text-base text-white mb-4">
              Test readings tell us whether electrical installations are safe and compliant. Each test has specific limits and normal ranges:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-3">Continuity Testing</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Acceptable readings:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Ring final circuits: Initial reading of R1 + R2 within expected range</li>
                          <li>Protective conductors: Low resistance path confirmed</li>
                          <li>Main bonding: Resistance typically &lt;0.05Ω</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Good Practice</p>
                        <p className="text-xs sm:text-sm text-white">
                          Compare readings between similar circuits - significant variations may indicate connection problems.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Insulation Resistance */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Insulation Resistance Interpretation</h3>
            <p className="text-base text-white mb-4">
              Insulation resistance readings indicate the quality of insulation between conductors and earth:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">BS 7671 Requirements</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Reading interpretation:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <ul className="list-disc ml-4 space-y-1 text-xs sm:text-sm text-white">
                            <li><strong>Minimum acceptable:</strong> 1MΩ (BS 7671 requirement)</li>
                            <li><strong>Good reading:</strong> 10MΩ or higher</li>
                            <li><strong>Excellent reading:</strong> &gt;999MΩ or above</li>
                            <li><strong>Investigate if:</strong> Below 2MΩ (potential deterioration)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
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
          <Separator className="my-6" />

          {/* Earth Fault Loop Impedance */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Earth Fault Loop Impedance (Zs)</h3>
            <p className="text-base text-white mb-4">
              Zs readings determine whether protective devices will operate quickly enough to prevent danger:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-3">Maximum Values</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Critical factors:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Must not exceed BS 7671 maximum values for the protection device</li>
                          <li>Consider circuit voltage and disconnection time requirements</li>
                          <li>Account for temperature correction factors</li>
                          <li>Investigate readings approaching maximum limits</li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                        <p className="font-medium text-orange-700 text-elec-yellow mb-2">Safety Margin</p>
                        <p className="text-xs sm:text-sm text-white">
                          Readings above 80% of maximum should be investigated as they may indicate developing earth faults.
                        </p>
                      </div>
                    </div>
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
          <Separator className="my-6" />

          {/* When to Investigate */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. When to Investigate Further</h3>
            <p className="text-base text-white mb-4">
              Professional judgement is required to determine when readings warrant investigation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3">Investigation Triggers</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Investigate when:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Readings approach or exceed maximum limits</li>
                          <li>Significant variations between similar circuits</li>
                          <li>Results differ from previous test records</li>
                          <li>Unexpected readings that don't match installation type</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 text-elec-yellow mb-2">Professional Responsibility</p>
                        <p className="text-xs sm:text-sm text-white">
                          When in doubt, investigate. It's better to find nothing wrong than miss a developing fault.
                        </p>
                      </div>
                    </div>
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
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white mb-3">For Apprentices:</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Always record readings exactly as displayed on the meter</li>
                <li>Compare results with BS 7671 tables and previous records</li>
                <li>Report unexpected or borderline readings to your supervisor</li>
                <li>Never guess - if unsure about a reading, ask for guidance</li>
              </ul>
            </div>
            
            <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-4 rounded border border-blue-200 dark:border-blue-800">
              <h3 className="font-medium text-blue-700 text-elec-yellow mb-3">Common Mistakes to Avoid:</h3>
              <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                <li>Accepting borderline readings without investigation</li>
                <li>Assuming all similar circuits should give identical readings</li>
                <li>Ignoring temperature effects on resistance measurements</li>
                <li>Not considering cable length when interpreting continuity readings</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Frequently Asked Questions */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-white mb-2">Key Points to Remember:</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Know the acceptable ranges for each type of test</li>
                <li>Look for patterns and consistency in readings</li>
                <li>Understand when readings require investigation</li>
                <li>Always reference BS 7671 limits and guidance</li>
                <li>When in doubt, investigate further or seek guidance</li>
              </ul>
            </div>

            <div className="bg-[#121212]/50 p-4 rounded-lg border">
              <p className="font-medium text-white mb-2">Best Practice:</p>
              <p className="text-white">
                Record all readings clearly, note any unusual results, and always err on the side of caution when interpreting borderline readings. Professional competence includes knowing when to seek advice.
              </p>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="../4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Performing Tests
            </Link>
          </Button>
          <Button asChild>
            <Link to="../4-6">
              Next: When to Escalate/Stop Work
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section4_5;