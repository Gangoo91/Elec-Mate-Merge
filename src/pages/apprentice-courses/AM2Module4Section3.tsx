import { FileText, CheckCircle, AlertTriangle, Target, BookOpen, Timer, PenTool, Calculator, TrendingUp, Award, ClipboardList } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import useSEO from "@/hooks/useSEO";

const AM2Module4Section3 = () => {
  useSEO(
    "Recording Test Results on Certification | AM2 Module 4 Section 3",
    "Master professional certification completion and test result recording for AM2 electrical assessment"
  );

  const learningOutcomes = [
    "Correctly complete test certificates used in AM2",
    "Record results in the correct units (Ω, MΩ, V, A)",
    "Avoid \"book answers\" and instead write realistic, measured values",
    "Understand what assessors are looking for when they inspect your paperwork",
    "Apply practical strategies to complete paperwork neatly under time pressure"
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "certificate-type",
      question: "Which certificate is used to hand over completed installation results in AM2?",
      options: [
        "Minor Works Certificate",
        "Electrical Installation Certificate (EIC)",
        "Periodic Inspection Report",
        "Test Schedule Only"
      ],
      correctIndex: 1,
      explanation: "The Electrical Installation Certificate (EIC) is the primary document used to hand over completed installation results and demonstrate compliance with BS 7671."
    },
    {
      id: "realistic-values",
      question: "Why is writing '0.00 Ω' for Zs wrong?",
      options: [
        "Wrong units used",
        "Should be in MΩ",
        "Unrealistic reading - assessor knows it's a 'book answer'",
        "Should be left blank"
      ],
      correctIndex: 2,
      explanation: "0.00 Ω for earth fault loop impedance is unrealistic. All circuits have some impedance, and assessors recognise this as a copied 'book answer' rather than a genuine measurement."
    },
    {
      id: "recording-timing",
      question: "When should you record test results in AM2?",
      options: [
        "At the end of all testing",
        "Immediately as you test, not afterwards",
        "During the break",
        "When the assessor asks for them"
      ],
      correctIndex: 1,
      explanation: "Results should be recorded immediately as you test to ensure accuracy and prevent rushed completion at the end which leads to errors and illegible writing."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What certificate must you complete for AM2 test results?",
      options: [
        "Minor Works Certificate",
        "Electrical Installation Certificate (EIC)",
        "Periodic Inspection Report",
        "EICR only"
      ],
      correctAnswer: 1,
      explanation: "The Electrical Installation Certificate (EIC) is the primary certificate required for AM2 new installation work, accompanied by test schedules."
    },
    {
      id: 2,
      question: "Why must you avoid leaving blanks on paperwork?",
      options: [
        "It looks untidy",
        "You lose marks and paperwork is incomplete",
        "Assessor won't notice",
        "Only critical sections matter"
      ],
      correctAnswer: 1,
      explanation: "Leaving blanks results in lost marks as the paperwork is considered incomplete. All applicable sections must be filled in."
    },
    {
      id: 3,
      question: "What's wrong with writing '∞' for insulation resistance?",
      options: [
        "Wrong symbol",
        "Should record meter limit (e.g. >200 MΩ) not infinity",
        "Should be in Ω",
        "Nothing wrong with it"
      ],
      correctAnswer: 1,
      explanation: "Instead of infinity symbols, record the actual meter limit reading such as '>200 MΩ' to show the measured value."
    },
    {
      id: 4,
      question: "Which unit is used for earth fault loop impedance?",
      options: ["MΩ", "Ω (ohms)", "V", "A"],
      correctAnswer: 1,
      explanation: "Earth fault loop impedance (Zs) is measured and recorded in ohms (Ω), typically as decimal values."
    },
    {
      id: 5,
      question: "What result would you expect for continuity of CPCs?",
      options: [
        "Very high values (MΩ)",
        "Small values (fractions of an ohm)",
        "Always exactly 1.00 Ω",
        "Negative values"
      ],
      correctAnswer: 1,
      explanation: "Continuity of Circuit Protective Conductors should show small values, typically fractions of an ohm, indicating good continuity."
    },
    {
      id: 6,
      question: "What's the correct way to record an insulation resistance result above the meter limit?",
      options: [
        "Write '∞'",
        "Write '>200 MΩ' or meter limit",
        "Write 'High'",
        "Leave blank"
      ],
      correctAnswer: 1,
      explanation: "Record the actual meter limit reading (e.g. '>200 MΩ') rather than infinity symbols or vague descriptions."
    },
    {
      id: 7,
      question: "When should you record test results — during testing or at the end?",
      options: [
        "At the end of all testing",
        "During testing as you go",
        "During breaks only",
        "When assessor asks"
      ],
      correctAnswer: 1,
      explanation: "Record results immediately as you test to ensure accuracy and prevent errors from trying to remember multiple readings."
    },
    {
      id: 8,
      question: "Why is '0.00 Ω' as a Zs result marked wrong?",
      options: [
        "Wrong units",
        "Should be in MΩ",
        "Unrealistic - all circuits have some impedance",
        "Too precise"
      ],
      correctAnswer: 2,
      explanation: "0.00 Ω is unrealistic as all electrical circuits have some impedance. This is recognised as a 'book answer' rather than a genuine measurement."
    },
    {
      id: 9,
      question: "What happens if paperwork is illegible?",
      options: [
        "Assessor will ask you to explain",
        "You lose marks",
        "Nothing happens",
        "You can rewrite it later"
      ],
      correctAnswer: 1,
      explanation: "Illegible handwriting results in lost marks as the assessor cannot verify the recorded values are correct."
    },
    {
      id: 10,
      question: "Give one strategy to ensure paperwork is completed correctly in AM2.",
      options: [
        "Rush at the end to save time",
        "Record results as you test and write clearly",
        "Copy from reference books",
        "Leave difficult sections blank"
      ],
      correctAnswer: 1,
      explanation: "Recording results immediately as you test and maintaining clear handwriting ensures accuracy and completeness under time pressure."
    }
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module4"
      breadcrumbs={["AM2", "Module 4", "Section 3"]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={FileText}
        title="Recording Test Results on Certification"
        description="Testing in AM2 isn't finished until the results are recorded on the correct certificates. Assessors expect you to fill in documentation clearly, accurately, and in full."
        badge="Module 4 • Section 3"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning title="CRITICAL: Poor Documentation = AM2 Failure">
        <p className="text-ios-callout text-white/80 mb-2">
          Poor, incomplete, or fake entries are one of the most common reasons candidates fail the testing stage. Professional paperwork completion is essential for AM2 success.
        </p>
        <p className="text-ios-callout text-white/90 font-medium">
          Many candidates fail this section not from lack of testing skill, but from poor recording habits and rushed paperwork completion.
        </p>
      </AM2CriticalWarning>

      {/* Learning Outcomes */}
      <AM2ContentCard accent>
        <AM2LearningOutcomes outcomes={learningOutcomes} />
      </AM2ContentCard>

      {/* Paperwork Requirements */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          1. Paperwork You'll Complete in AM2
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3">Primary Certificates:</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Electrical Installation Certificate (EIC)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Schedule of test results (for each circuit)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Schedule of inspections</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3">Test Results Required:</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Continuity, insulation, polarity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Zs, PSC/PSCC, RCD results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Risk Assessment / Method Statement (RAMS)</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[0].id}
        question={quickCheckQuestions[0].question}
        options={quickCheckQuestions[0].options}
        correctIndex={quickCheckQuestions[0].correctIndex}
        explanation={quickCheckQuestions[0].explanation}
      />

      {/* What Assessors Look For */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Target className="h-5 w-5" />
          2. What Assessors Look For in Certification
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              Essential Requirements:
            </h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>All sections filled in - no blanks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Units written correctly (Ω, MΩ, V, ms)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Results realistic and consistent with installation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Neat, legible handwriting</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3 flex items-center gap-2">
              <PenTool className="h-4 w-4 text-elec-yellow" />
              Professional Standards:
            </h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>No corrections by scribbling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Use one clear strike-through if needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Consistent formatting throughout</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Professional presentation quality</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Common Mistakes */}
      <AM2CriticalWarning title="3. Common Mistakes Candidates Make (NET Guidance)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div>
            <h4 className="text-ios-headline text-white font-semibold mb-2">Documentation Errors:</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Leaving results blank</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Writing "N/A" where a test was required</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Using wrong units or missing units entirely</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Rushing paperwork at the end</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-ios-headline text-white font-semibold mb-2">Unrealistic Values:</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Recording unrealistic numbers (e.g. 0.00 Ω for Zs)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Writing "infinite" instead of &gt;200 MΩ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Mixing up insulation resistance vs continuity values</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Using obvious "book answers" from reference materials</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2CriticalWarning>

      <InlineCheck
        id={quickCheckQuestions[1].id}
        question={quickCheckQuestions[1].question}
        options={quickCheckQuestions[1].options}
        correctIndex={quickCheckQuestions[1].correctIndex}
        explanation={quickCheckQuestions[1].explanation}
      />

      {/* Advanced Certificate Completion Techniques */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Award className="h-5 w-5" />
          Advanced Certificate Completion Techniques
        </h2>

        <div className="space-y-4">
          {/* Certificate Types */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-elec-yellow" />
              Detailed Certificate Requirements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-ios-callout text-elec-yellow font-semibold mb-2">Electrical Installation Certificate (EIC):</p>
                <ul className="text-ios-callout text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Designer, Constructor, Inspector details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Installation description and location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Earthing and bonding arrangements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Supply characteristics (TN-S, TN-C-S, TT)</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-ios-callout text-elec-yellow font-semibold mb-2">Schedule of Test Results:</p>
                <ul className="text-ios-callout text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Circuit designation and description</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Continuity of protective conductors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Insulation resistance values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Earth fault loop impedance (Zs)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Professional Documentation Standards */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3 flex items-center gap-2">
              <PenTool className="h-4 w-4 text-emerald-400" />
              Professional Documentation Standards
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-ios-callout text-emerald-400 font-semibold mb-2">Handwriting Quality:</p>
                <ul className="text-ios-callout text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Use block capitals for important details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Maintain consistent letter sizing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Use appropriate pen (blue or black ink)</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-ios-callout text-emerald-400 font-semibold mb-2">Error Correction:</p>
                <ul className="text-ios-callout text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Single line through error, initial change</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Never use correction fluid or tape</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Date and initial significant corrections</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-ios-callout text-emerald-400 font-semibold mb-2">Data Integrity:</p>
                <ul className="text-ios-callout text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Record actual measured values only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Never estimate or interpolate results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Note any limitations or deviations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Recording Realistic Values */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          4. Recording Realistic Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Continuity Tests:</h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Continuity of CPC:</strong> Expect small values (fractions of an ohm)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Ring circuit continuity:</strong> Typically 0.05-0.5 Ω</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Units:</strong> Always in Ω (ohms)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Insulation Resistance:</h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Typical readings:</strong> Should be very high (often &gt;200 MΩ)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Record meter limit:</strong> Write "&gt;200 MΩ" not "∞"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Minimum acceptable:</strong> 1 MΩ for most circuits</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Earth Fault Loop Impedance (Zs):</h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Realistic range:</strong> Typically 0.2-2.0 Ω for most circuits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Must align:</strong> With max permitted for protective device</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Check BS 7671:</strong> Tables for maximum values</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">RCD Testing:</h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Trip times:</strong> Record at 1x and 5x IΔn in milliseconds (ms)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Standard RCD:</strong> &lt;300ms at 1xIΔn, &lt;40ms at 5xIΔn</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Polarity:</strong> Tick "satisfactory" at each accessory</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4 mt-4">
          <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">PSC/PSCC (Short Circuit Current):</h4>
          <p className="text-ios-callout text-white/80">
            Record measured value in kA or A. Typical domestic installations: 1-6 kA. Commercial installations may be higher.
            Always record the actual measured value, not estimated or calculated figures.
          </p>
        </div>
      </AM2ContentCard>

      {/* Strategies for Success */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          5. Strategies for AM2 Success
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3">During Testing:</h4>
            <ul className="text-ios-callout text-white/80 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Record results as you test - don't leave until the end</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Write clearly - if assessor can't read it, you lose marks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Check units - always write Ω, MΩ, V, ms</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3">Quality Control:</h4>
            <ul className="text-ios-callout text-white/80 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Double-check results against expected ranges</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Compare with GN3 and BS 7671 guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Keep paperwork tidy - no scribbles or rushed writing</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-elec-yellow font-semibold mb-3">Professional Tips:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-ios-callout text-white font-semibold mb-1">Time Management:</p>
              <ul className="text-ios-callout text-white/80 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Allocate 10-15 minutes for paperwork completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Don't rush - accuracy is more important than speed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Review all sections before submitting</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-ios-callout text-white font-semibold mb-1">Error Prevention:</p>
              <ul className="text-ios-callout text-white/80 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Use a systematic approach - same order every time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Cross-reference readings with test sequence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Have a colleague check your work if possible</span>
                </li>
              </ul>
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

      {/* Real-World Examples */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Real-World Examples
        </h2>

        <div className="space-y-3">
          <div className="border-l-4 border-l-red-500 bg-red-500/10 rounded-r-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2">Example 1: Infinity Symbol Error</h4>
            <p className="text-ios-callout text-white/80 mb-2">
              Candidate recorded all insulation resistance results as "∞." Assessor marked incorrect - <strong className="text-red-400">failed paperwork section</strong>
            </p>
            <p className="text-ios-footnote text-elec-yellow">
              Lesson: Always record meter limit readings like "&gt;200 MΩ" instead of infinity symbols.
            </p>
          </div>

          <div className="border-l-4 border-l-red-500 bg-red-500/10 rounded-r-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2">Example 2: Incomplete Documentation</h4>
            <p className="text-ios-callout text-white/80 mb-2">
              Candidate left several boxes blank, assuming assessor wouldn't check. <strong className="text-red-400">Lost easy marks</strong>
            </p>
            <p className="text-ios-footnote text-elec-yellow">
              Lesson: Every applicable section must be completed. Blanks = lost marks.
            </p>
          </div>

          <div className="border-l-4 border-l-emerald-500 bg-emerald-500/10 rounded-r-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2">Example 3: Professional Excellence</h4>
            <p className="text-ios-callout text-white/80 mb-2">
              Candidate completed paperwork neatly, with realistic results matching the installation. <strong className="text-emerald-400">Passed smoothly</strong>
            </p>
            <p className="text-ios-footnote text-emerald-400">
              Lesson: Professional presentation and realistic values demonstrate competence and earn full marks.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Section Summary */}
      <AM2ContentCard accent>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Section Summary
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <h4 className="text-ios-headline text-white font-semibold mb-3">Key Takeaways:</h4>
          <ul className="text-ios-callout text-white/80 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Paperwork is part of the test - not an afterthought</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Complete all sections of EIC and test schedules with realistic, measured results</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Record results in correct units (Ω, MΩ, V, ms) as you test</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Write clearly and neatly - illegible handwriting loses marks</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Many candidates fail from poor recording habits, not lack of testing skill</span>
            </li>
          </ul>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Next Steps:</h4>
          <p className="text-ios-callout text-white/80">
            You're now ready to move on to Section 4, where we'll cover functional and operational testing procedures.
          </p>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz questions={quizQuestions} title="Recording Test Results on Certification" />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        prevHref="../section2"
        prevLabel="Safe Use of Test Instruments"
        nextHref="../section4"
        nextLabel="Functional Testing"
        currentSection={3}
        totalSections={6}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module4Section3;
