import { FileText, Target, Wrench, CheckSquare, Eye, Lightbulb, BookOpen, Settings } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module5Section4 = () => {
  useSEO(
    "Proving and Recording Rectification | AM2 Module 5 Section 4",
    "Master professional rectification recording in AM2 assessments. Learn to describe repairs clearly and prove circuit safety after fault correction."
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "polarity-rectification",
      question: "If polarity is reversed at a socket, what rectification must you record?",
      options: [
        "Fix the polarity problem",
        "Replace the socket",
        "Swap line and neutral connections into correct terminals at the socket outlet",
        "Test the polarity again"
      ],
      correctIndex: 2,
      explanation: "Specific, professional language is required: exactly what needs to be done and where, not vague phrases like 'fix'."
    },
    {
      id: "high-resistance-test",
      question: "After correcting a high resistance joint, which test proves rectification?",
      options: [
        "Continuity test",
        "Re-check Zs to confirm impedance is now within limits",
        "Insulation resistance test",
        "RCD test"
      ],
      correctIndex: 1,
      explanation: "High resistance joints affect earth fault loop impedance (Zs), so re-testing Zs proves the repair is effective."
    },
    {
      id: "rectification-components",
      question: "What are the three essential components of professional rectification recording?",
      options: [
        "Location + Time + Cost",
        "Action + Location + Re-test",
        "Problem + Solution + Signature",
        "Fault + Tools + Materials"
      ],
      correctIndex: 1,
      explanation: "Professional rectification must include: the specific action needed, exact location, and the re-test that proves safety."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Do you physically repair faults in AM2?",
      options: ["Yes, repairs must be completed", "No - just describe rectification and re-testing", "Only simple repairs", "Depends on the fault type"],
      correctAnswer: 1,
      explanation: "In AM2, you only describe what rectification would be needed and how you would prove it safe - no physical repairs are carried out."
    },
    {
      id: 2,
      question: "How should rectification be phrased?",
      options: ["As briefly as possible", "Using technical jargon", "Action + Location + Re-test", "In your own words"],
      correctAnswer: 2,
      explanation: "The simple rule for rectification phrasing is: Action (what to do) + Location (where) + Re-test (how to prove safe)."
    },
    {
      id: 3,
      question: "Give an example of rectification for an open circuit fault.",
      options: ["Fix the break", "Test continuity", "Reconnect line conductor at loose termination, then re-test continuity", "Replace the cable"],
      correctAnswer: 2,
      explanation: "Specific example: 'Reconnect line conductor at loose termination, then re-test continuity' shows exact action, location, and verification."
    },
    {
      id: 4,
      question: "What re-test confirms correction of a short circuit?",
      options: ["Continuity test", "Polarity test", "Insulation resistance test", "RCD test"],
      correctAnswer: 2,
      explanation: "Short circuits are detected by insulation resistance testing, so re-testing insulation resistance confirms the repair."
    },
    {
      id: 5,
      question: "What rectification is required for a reversed polarity at a socket?",
      options: ["Replace the socket", "Test again", "Swap conductors into correct terminals", "Call supervisor"],
      correctAnswer: 2,
      explanation: "Polarity faults require swapping line and neutral conductors into their correct terminals at the affected accessory."
    },
    {
      id: 6,
      question: "After remaking a high resistance joint, what test proves safety?",
      options: ["Visual inspection", "Continuity test", "Zs test to confirm impedance within limits", "Insulation resistance"],
      correctAnswer: 2,
      explanation: "High resistance joints affect earth fault loop impedance, so Zs testing proves the joint is now within acceptable limits."
    },
    {
      id: 7,
      question: "True or false: 'Fix fault' is acceptable wording for rectification.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Vague wording like 'fix fault' scores zero marks. Professional, specific language describing exact actions is required."
    },
    {
      id: 8,
      question: "Why must you always include re-testing in your rectification statement?",
      options: ["It's required by law", "To prove the circuit is safe after repair", "To show your knowledge", "To waste time"],
      correctAnswer: 1,
      explanation: "Re-testing proves the circuit is safe and compliant after rectification - this is essential for professional electrical work."
    },
    {
      id: 9,
      question: "How should you record a faulty accessory fault?",
      options: ["Remove accessory", "Replace defective accessory with new unit, then re-test circuit", "Mark as dangerous", "Leave disconnected"],
      correctAnswer: 1,
      explanation: "Complete rectification includes replacement of faulty equipment and re-testing to ensure circuit integrity."
    },
    {
      id: 10,
      question: "What's the simple rule for rectification phrasing?",
      options: ["Keep it brief", "Use technical terms", "Action + Location + Re-test", "Copy from textbooks"],
      correctAnswer: 2,
      explanation: "The universal rule is: Action (what to do) + Location (where) + Re-test (how to prove safe)."
    }
  ];

  const faqs = [
    {
      question: "Do I physically repair the fault in AM2?",
      answer: "No - just describe rectification and re-testing. The assessment focuses on your ability to diagnose and specify the correct repair method."
    },
    {
      question: "What happens if I don't state the re-test?",
      answer: "You lose marks - proving safety is essential. The re-test demonstrates that you understand the complete electrical safety process."
    },
    {
      question: "Do I need to mention BS 7671 limits in rectification?",
      answer: "Not required, but stating 'within permitted values' shows good understanding and professional awareness."
    },
    {
      question: "Can I just say 'replace damaged accessory'?",
      answer: "You must also say 'and re-test circuit.' The re-testing component is essential for full marks."
    },
    {
      question: "What if I'm unsure how to phrase rectification?",
      answer: "Use the rule: Action + Location + Re-test. This format works for all fault types and ensures professional communication."
    }
  ];

  const learningOutcomes = [
    "Clearly describe rectification steps for common AM2 fault types",
    "Record rectification in professional language suitable for certification",
    "State the correct re-testing procedure after rectification",
    "Demonstrate a complete fault-finding cycle: diagnose → rectify → prove safe",
    "Avoid vague or incomplete reporting that loses marks"
  ];

  return (
    <AM2SectionLayout
      backHref="/apprentice-courses/am2/module5"
      breadcrumbs={[
        { label: "AM2", href: "/apprentice-courses/am2" },
        { label: "Module 5", href: "/apprentice-courses/am2/module5" },
        { label: "Section 4" }
      ]}
    >
      <AM2HeroSection
        icon={FileText}
        title="Proving and Recording Rectification"
        description="In AM2 fault diagnosis, identifying the fault is only half the task. The assessor also expects you to state how you would rectify it and then how you would prove it safe afterwards."
        badge="Module 5 - Section 4"
      />

      <div className="space-y-6">
        {/* Introduction */}
        <AM2ContentCard>
          <p className="text-ios-body text-white/80 leading-relaxed">
            Your answers must be clear, precise, and professional - vague phrases like "fix it" or "replace" won't score marks.
          </p>
        </AM2ContentCard>

        {/* Critical Warning */}
        <AM2CriticalWarning title="CRITICAL: Professional Recording Required">
          <p className="text-ios-callout text-white/80 mb-3 leading-relaxed">
            Vague phrases like "fix it" or "replace" score zero marks. Assessors want professional language that shows you understand both the problem and the complete solution.
          </p>
          <p className="text-ios-callout text-white/80 font-medium leading-relaxed">
            Every rectification statement must include: specific action + exact location + re-test procedure.
          </p>
        </AM2CriticalWarning>

        {/* Learning Outcomes */}
        <AM2LearningOutcomes outcomes={learningOutcomes} />

        {/* What is Rectification */}
        <AM2ContentCard
          title="1. What Does Rectification Mean in AM2?"
          icon={Target}
        >
          <p className="text-ios-body text-white/80 mb-4">
            Rectification is about stating the practical action needed to restore the circuit to a safe, compliant condition:
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <h4 className="text-ios-headline font-semibold text-white mb-3">Common Rectification Actions:</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">Reconnecting</strong> a broken conductor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">Correcting</strong> polarity at a socket or switch</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">Tightening or remaking</strong> a loose/high resistance joint</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">Replacing</strong> a damaged accessory</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">Re-terminating</strong> CPCs correctly</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4">
            <h4 className="text-ios-headline font-semibold text-amber-200 mb-3">Important Note:</h4>
            <p className="text-ios-callout text-white/80">
              <strong className="text-white">You don't physically carry out the repair</strong> - you just state what would be done. The assessment is testing your knowledge of proper procedures, not your practical skills.
            </p>
          </div>
        </AM2ContentCard>

        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Professional Recording */}
        <AM2ContentCard
          title="2. Recording Rectification Professionally"
          icon={FileText}
        >
          <p className="text-ios-body text-white/80 mb-4">
            Your answer must be specific and professional. NET assessors want detail that shows you understand both the problem and the solution.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-red-200 mb-3">
                Incorrect Examples
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span className="text-ios-callout text-white/80">"Fix earth fault"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span className="text-ios-callout text-white/80">"Replace it"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span className="text-ios-callout text-white/80">"Sort out the problem"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span className="text-ios-callout text-white/80">"Repair the connection"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span className="text-ios-callout text-white/80">"Make it work"</span>
                </li>
              </ul>
              <p className="text-ios-footnote text-red-300 mt-3 font-medium">
                These vague phrases score zero marks!
              </p>
            </div>

            <div className="bg-green-950/20 border border-green-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-green-200 mb-3">
                Professional Examples
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span className="text-ios-callout text-white/80">"Reconnect CPC into earth terminal at socket outlet and re-test insulation resistance"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span className="text-ios-callout text-white/80">"Replace damaged luminaire with new unit and re-test circuit"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span className="text-ios-callout text-white/80">"Remake loose connection at socket terminal and re-test Zs"</span>
                </li>
              </ul>
              <p className="text-ios-footnote text-green-300 mt-3 font-medium">
                Specific, actionable, professional!
              </p>
            </div>
          </div>
        </AM2ContentCard>

        {/* Examples by Fault Type */}
        <AM2ContentCard
          title="3. Examples of Rectification by Fault Type"
          icon={Wrench}
          accent
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Open Circuit:</h4>
              <p className="text-ios-callout text-white/80">
                "Reconnect line conductor at loose termination, then re-test continuity."
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Short Circuit:</h4>
              <p className="text-ios-callout text-white/80">
                "Re-terminate damaged cable at luminaire, then re-test insulation resistance."
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">High Resistance Joint:</h4>
              <p className="text-ios-callout text-white/80">
                "Re-make loose connection at socket, then re-test Zs."
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Polarity Fault:</h4>
              <p className="text-ios-callout text-white/80">
                "Swap conductors into correct terminals, then re-test polarity."
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Earth Fault:</h4>
              <p className="text-ios-callout text-white/80">
                "Re-terminate line conductor away from earth bar, then re-test IR and RCD."
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Faulty Accessory:</h4>
              <p className="text-ios-callout text-white/80">
                "Replace defective accessory with new unit, then re-test circuit."
              </p>
            </div>
          </div>
        </AM2ContentCard>

        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Proving Rectification */}
        <AM2ContentCard
          title="4. Proving Rectification (Re-testing)"
          icon={CheckSquare}
        >
          <p className="text-ios-body text-white/80 mb-4">
            After stating rectification, you must also state how you would prove the circuit safe again:
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <h4 className="text-ios-headline font-semibold text-white mb-3">Complete Re-testing Process:</h4>
            <ol className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-semibold">1.</span>
                <span className="text-ios-callout text-white/80">Repeat the appropriate test (continuity, IR, polarity, Zs, RCD)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-semibold">2.</span>
                <span className="text-ios-callout text-white/80">Confirm results are now within BS 7671 limits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-semibold">3.</span>
                <span className="text-ios-callout text-white/80">Record new results on certification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-semibold">4.</span>
                <span className="text-ios-callout text-white/80">Leave installation safe before re-energising</span>
              </li>
            </ol>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline font-semibold text-white mb-3">Test Selection for Different Faults:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-ios-callout font-semibold text-white mb-2">Common Re-tests:</h5>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Open circuit</strong> → Continuity test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Short circuit</strong> → Insulation resistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70"><strong className="text-white/90">High resistance</strong> → Zs test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Polarity error</strong> → Polarity test</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-ios-callout font-semibold text-white mb-2">Additional Tests:</h5>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Earth fault</strong> → IR + RCD test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Faulty RCD</strong> → Full RCD test sequence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Multiple faults</strong> → Complete test schedule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70"><strong className="text-white/90">New accessory</strong> → All relevant tests</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </AM2ContentCard>

        {/* Assessor Expectations */}
        <AM2ContentCard
          title="5. Assessor Expectations"
          icon={Eye}
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Assessors Want to See You:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Identify the exact action needed</strong> (not vague wording)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Link the fault to the correct rectification method</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">State which test proves the repair</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Record clearly, in writing, for every fault</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Leave no doubt</strong> that you understand the whole process</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Professional Standards Expected:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Communication:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Clear, precise language</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Professional terminology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Complete descriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Logical sequence</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Technical Knowledge:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Correct repair methods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Appropriate test selection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Safety considerations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Compliance awareness</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AM2ContentCard>

        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Advanced Rectification Scenarios */}
        <AM2ContentCard
          title="6. Advanced Rectification Scenarios"
          icon={Settings}
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Complex Multi-Fault Situations:</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Multiple Faults on Same Circuit:</h5>
                  <p className="text-ios-footnote text-white/70 mb-2"><strong className="text-white/90">Example:</strong> Ring final with both open CPC and reversed polarity at socket</p>
                  <p className="text-ios-footnote text-white/70 mb-2"><strong className="text-white/90">Rectification:</strong> "1. Reconnect CPC at loose terminal in socket backbox. 2. Correct L-N connections at same socket. 3. Re-test continuity and polarity for entire ring."</p>
                  <ul className="space-y-1 mt-2">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">List each fault separately with clear numbering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">State logical repair sequence (safety-critical first)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Include comprehensive re-testing of all affected parameters</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Cascading Effects:</h5>
                  <p className="text-ios-footnote text-white/70 mb-2"><strong className="text-white/90">Scenario:</strong> Main earthing conductor disconnected affecting multiple circuits</p>
                  <p className="text-ios-footnote text-white/70"><strong className="text-white/90">Rectification:</strong> "Reconnect main earthing conductor to MET and re-test Zs on all affected circuits to confirm earth integrity restored."</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Installation-Specific Rectifications:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">TN-S Systems:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">"Reconnect equipotential bonding to water service and re-test main bonding continuity"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">"Replace corroded earth electrode connection and re-test Ze"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">"Repair PME earth connection at service head"</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Special Locations:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">"Replace non-IP rated accessory in bathroom with IP44 unit and re-test"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">"Install missing 30mA RCD protection for garden circuit and test operation"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">"Correct supplementary bonding in bathroom and re-test resistance"</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Cable and Accessory Replacements:</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">When Complete Replacement Needed:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Damaged cable:</strong> "Replace section of damaged cable between junction boxes A and B with equivalent 2.5mm T&E and re-test complete circuit"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Wrong cable type:</strong> "Replace non-LSF cable in escape route with LSF equivalent and re-test insulation resistance"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Undersized cable:</strong> "Replace 1.5mm cable with 2.5mm to meet load requirements and re-test Zs and voltage drop"</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Accessory Standards:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Always specify compliance standards in rectification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Include IP ratings where relevant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Specify protective device characteristics if replacing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AM2ContentCard>

        {/* Documentation and Legal Requirements */}
        <AM2ContentCard
          title="7. Documentation and Legal Requirements"
          icon={FileText}
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Certification Impact of Rectification:</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">What Must Be Updated Post-Rectification:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Test results:</strong> All affected test values must be re-recorded</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Circuit details:</strong> Any changes to cable routes, sizes, or accessories</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Protection:</strong> Updates to protective device ratings or types</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Compliance codes:</strong> C1, C2, C3 codes may change after rectification</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Professional Responsibility:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Rectification description becomes part of legal documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Must be sufficient for another electrician to understand</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Creates professional liability for accuracy and completeness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Insurance claims may depend on quality of documentation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-red-200 mb-3">Legal and Safety Implications:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Duty of Care:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Must identify all safety-critical faults</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Cannot leave dangerous conditions unreported</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Must recommend appropriate remedial action</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Clear communication of urgency levels</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Professional Standards:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">IET Code of Practice compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">BS 7671 rectification requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Building Control notification where required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Scheme provider reporting obligations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AM2ContentCard>

        {/* Practical Guidance */}
        <AM2ContentCard
          title="8. Practical Guidance for Success"
          icon={Lightbulb}
          accent
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">The Golden Rule:</h4>
              <p className="text-ios-body text-white/80 mb-3">
                <strong className="text-white">Always phrase rectification as: Action + Location + Re-test</strong>
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-ios-callout text-white/80">
                  <strong className="text-white">Example:</strong> "Reconnect neutral at CU terminal and re-test continuity and polarity."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-ios-headline font-semibold text-white mb-3">Writing Guidelines:</h4>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Be concise but specific</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">One or two clear sentences is enough</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Don't use slang or shorthand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Write as if handing over to another electrician</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Always include the re-test stage</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-ios-headline font-semibold text-white mb-3">Common Mistakes to Avoid:</h4>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Vague language ("fix", "sort")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Missing location details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Forgetting re-test requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Using informal terminology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Incomplete fault descriptions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </AM2ContentCard>

        {/* Real-World Examples */}
        <AM2ContentCard
          title="9. Real-World Examples"
          icon={BookOpen}
        >
          <div className="space-y-4">
            <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-red-200 mb-3">Example 1: Vague Recording</h4>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Candidate wrote:</strong> "Fix polarity."
              </p>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Result:</strong> Assessor gave 0 marks - too vague.
              </p>
              <p className="text-ios-callout text-white/80 font-medium">
                <strong className="text-white">Should have written:</strong> "Correct line/neutral connections at socket outlet and re-test polarity."
              </p>
            </div>

            <div className="bg-green-950/20 border border-green-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-green-200 mb-3">Example 2: Professional Recording</h4>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Scenario:</strong> Candidate diagnosed open CPC fault.
              </p>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Correctly stated:</strong> "Reconnect CPC at socket and re-test continuity."
              </p>
              <p className="text-ios-callout text-white/80 font-medium">
                <strong className="text-white">Result:</strong> Full marks for clear, professional recording.
              </p>
            </div>

            <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-amber-200 mb-3">Example 3: Incomplete Recording</h4>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Scenario:</strong> Candidate identified faulty luminaire.
              </p>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Problem:</strong> Mentioned fault but didn't mention replacement or re-testing.
              </p>
              <p className="text-ios-callout text-white/80 font-medium">
                <strong className="text-white">Result:</strong> Lost marks for incomplete rectification description.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Example 4: Real-World Consequence</h4>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Scenario:</strong> On-site, an electrician repaired a joint but didn't re-test Zs.
              </p>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Problem:</strong> High resistance fault remained hidden, later caused equipment failure.
              </p>
              <p className="text-ios-callout text-white/80 font-medium">
                <strong className="text-white">Lesson:</strong> In AM2, skipping the re-test equals lost marks - and in real work, potential danger.
              </p>
            </div>
          </div>
        </AM2ContentCard>

        {/* FAQ Section */}
        <AM2ContentCard
          title="10. Frequently Asked Questions"
          icon={Lightbulb}
        >
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-ios-headline font-semibold text-white mb-2">
                  Q{index + 1}: {faq.question}
                </h4>
                <p className="text-ios-callout text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </AM2ContentCard>

        {/* Summary */}
        <AM2ContentCard
          title="11. Section Summary"
          icon={BookOpen}
          accent
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Rectification in AM2 Means:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">State the repair clearly</strong> (e.g. reconnect, replace, remake)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Specify the location</strong> exactly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">State the re-test</strong> that proves safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Use professional language</strong> suitable for certification</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-amber-200 mb-3">Remember the Complete Cycle:</h4>
              <div className="flex items-center justify-center gap-2 text-ios-body text-white/80 font-medium">
                <span>Diagnose</span>
                <span className="text-elec-yellow">→</span>
                <span>Rectify</span>
                <span className="text-elec-yellow">→</span>
                <span>Prove Safe</span>
              </div>
            </div>
          </div>
        </AM2ContentCard>

        {/* Quiz Section */}
        <div className="border-t border-white/10 pt-8">
          <Quiz
            title="Test Your Knowledge: Proving and Recording Rectification"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <AM2NavigationFooter
          previousHref="../section3"
          previousLabel="Test Equipment"
          nextHref="../section5"
          nextLabel="Common Pitfalls"
          currentSection={4}
          totalSections={6}
        />
      </div>
    </AM2SectionLayout>
  );
};

export default AM2Module5Section4;
