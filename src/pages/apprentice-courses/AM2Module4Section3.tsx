import { ArrowLeft, ArrowRight, FileText, CheckCircle, AlertTriangle, Target, BookOpen, Timer, Lightbulb, ClipboardList, PenTool, Calculator, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module4Section3 = () => {
  useSEO(
    "Recording Test Results on Certification | AM2 Module 4 Section 3",
    "Master professional certification completion and test result recording for AM2 electrical assessment"
  );

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-2 sm:p-0 text-sm sm:text-base" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Back to Module 4</span>
                <span className="xs:hidden">Back</span>
              </Link>
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-2 sm:p-0 text-sm sm:text-base" asChild>
              <Link to="../section4">
                <span className="hidden xs:inline">Module 4 Section 4</span>
                <span className="xs:hidden">Section 4</span>
                <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Title Section */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-elec-yellow/10 text-elec-yellow text-sm font-medium rounded-full mb-4">
            <FileText className="w-4 h-4" />
            Module 4 – Section 3
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Recording Test Results on Certification
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            Testing in AM2 isn't finished until the results are recorded on the correct certificates. Assessors expect you to fill in documentation (Electrical Installation Certificate and schedule of test results) clearly, accurately, and in full. This proves you can hand over safe, professional paperwork to a client in real life.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700/50 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-700 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2 text-sm sm:text-base">
                  CRITICAL: Poor Documentation = AM2 Failure
                </h3>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 mb-3 leading-relaxed">
                  Poor, incomplete, or fake entries are one of the most common reasons candidates fail the testing stage. Professional paperwork completion is essential for AM2 success.
                </p>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 font-medium leading-relaxed">
                  Many candidates fail this section not from lack of testing skill, but from poor recording habits and rushed paperwork completion.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Learning Outcomes
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              By the end of this section, you should be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Correctly complete test certificates used in AM2
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Record results in the correct units (Ω, MΩ, V, A)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Avoid "book answers" and instead write realistic, measured values
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Understand what assessors are looking for when they inspect your paperwork
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Apply practical strategies to complete paperwork neatly under time pressure
              </li>
            </ul>
          </div>
        </Card>

        {/* Paperwork Requirements */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5" />
              1. Paperwork You'll Complete in AM2
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 sm:mb-3 text-sm sm:text-base">Primary Certificates:</h4>
                  <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                    <li>• Electrical Installation Certificate (EIC)</li>
                    <li>• Schedule of test results (for each circuit)</li>
                    <li>• Schedule of inspections</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 sm:mb-3 text-sm sm:text-base">Test Results Required:</h4>
                  <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Continuity, insulation, polarity</li>
                    <li>• Zs, PSC/PSCC, RCD results</li>
                    <li>• Risk Assessment / Method Statement (RAMS)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* What Assessors Look For */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              2. What Assessors Look For in Certification
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 sm:mb-3 text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Essential Requirements:
                  </h4>
                  <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• All sections filled in — no blanks</li>
                    <li>• Units written correctly (Ω, MΩ, V, ms)</li>
                    <li>• Results realistic and consistent with installation</li>
                    <li>• Neat, legible handwriting</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2 sm:mb-3 text-sm sm:text-base flex items-center gap-2">
                    <PenTool className="w-4 h-4" />
                    Professional Standards:
                  </h4>
                  <ul className="text-xs sm:text-sm text-orange-700 dark:text-elec-yellow space-y-1">
                    <li>• No corrections by scribbling</li>
                    <li>• Use one clear strike-through if needed</li>
                    <li>• Consistent formatting throughout</li>
                    <li>• Professional presentation quality</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Mistakes */}
        <Card className="bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700/50 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              3. Common Mistakes Candidates Make (NET Guidance)
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-2 sm:mb-3 text-sm sm:text-base">Documentation Errors:</h4>
                  <ul className="text-xs sm:text-sm text-red-800 dark:text-red-200 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Leaving results blank
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Writing "N/A" where a test was required
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Using wrong units or missing units entirely
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Rushing paperwork at the end → messy or incomplete
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-2 sm:mb-3 text-sm sm:text-base">Unrealistic Values:</h4>
                  <ul className="text-xs sm:text-sm text-red-800 dark:text-red-200 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Recording unrealistic numbers (e.g. 0.00 Ω for Zs)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Writing "infinite" instead of &gt;200 MΩ
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Mixing up insulation resistance vs continuity values
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Using obvious "book answers" from reference materials
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Advanced Certificate Completion Techniques */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Advanced Certificate Completion Techniques
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Certificate Types and Their Requirements */}
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3 text-sm sm:text-base flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Detailed Certificate Requirements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-blue-700 dark:text-elec-yellow block mb-2">Electrical Installation Certificate (EIC):</strong>
                    <ul className="text-elec-yellow dark:text-elec-yellow space-y-1">
                      <li>• Designer, Constructor, Inspector details</li>
                      <li>• Installation description and location</li>
                      <li>• Earthing and bonding arrangements</li>
                      <li>• Main switch details and characteristics</li>
                      <li>• Supply characteristics (TN-S, TN-C-S, TT)</li>
                      <li>• RCD details and test results</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-blue-700 dark:text-elec-yellow block mb-2">Schedule of Test Results:</strong>
                    <ul className="text-elec-yellow dark:text-elec-yellow space-y-1">
                      <li>• Circuit designation and description</li>
                      <li>• Reference method and cable details</li>
                      <li>• Continuity of protective conductors</li>
                      <li>• Continuity of ring final circuit conductors</li>
                      <li>• Insulation resistance values</li>
                      <li>• Earth fault loop impedance (Zs)</li>
                      <li>• RCD operating times and current</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Professional Documentation Standards */}
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3 text-sm sm:text-base flex items-center gap-2">
                  <PenTool className="w-4 h-4" />
                  Professional Documentation Standards
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-green-700 dark:text-green-300 block mb-2">Handwriting Quality:</strong>
                    <ul className="text-green-600 dark:text-green-400 space-y-1">
                      <li>• Use block capitals for important details</li>
                      <li>• Maintain consistent letter sizing</li>
                      <li>• Ensure adequate spacing between entries</li>
                      <li>• Use appropriate pen (blue or black ink)</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-green-700 dark:text-green-300 block mb-2">Error Correction:</strong>
                    <ul className="text-green-600 dark:text-green-400 space-y-1">
                      <li>• Single line through error, initial change</li>
                      <li>• Never use correction fluid or tape</li>
                      <li>• Write correction clearly adjacent to error</li>
                      <li>• Date and initial significant corrections</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-green-700 dark:text-green-300 block mb-2">Data Integrity:</strong>
                    <ul className="text-green-600 dark:text-green-400 space-y-1">
                      <li>• Record actual measured values only</li>
                      <li>• Never estimate or interpolate results</li>
                      <li>• Include environmental conditions</li>
                      <li>• Note any limitations or deviations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recording Realistic Values */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              4. Recording Realistic Values
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base">Continuity Tests:</h4>
                    <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                      <li>• <strong>Continuity of CPC:</strong> Expect small values (fractions of an ohm)</li>
                      <li>• <strong>Ring circuit continuity:</strong> Typically 0.05-0.5 Ω depending on cable size/length</li>
                      <li>• <strong>Units:</strong> Always in Ω (ohms)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base">Insulation Resistance:</h4>
                    <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• <strong>Typical readings:</strong> Should be very high (often &gt;200 MΩ)</li>
                      <li>• <strong>Record meter limit:</strong> Write "&gt;200 MΩ" not "∞"</li>
                      <li>• <strong>Minimum acceptable:</strong> 1 MΩ for most circuits</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2 text-sm sm:text-base">Earth Fault Loop Impedance (Zs):</h4>
                    <ul className="text-xs sm:text-sm text-purple-700 dark:text-elec-yellow space-y-1">
                      <li>• <strong>Realistic range:</strong> Typically 0.2-2.0 Ω for most circuits</li>
                      <li>• <strong>Must align:</strong> With max permitted for protective device</li>
                      <li>• <strong>Check BS 7671:</strong> Tables for maximum values</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2 text-sm sm:text-base">RCD Testing:</h4>
                    <ul className="text-xs sm:text-sm text-orange-700 dark:text-elec-yellow space-y-1">
                      <li>• <strong>Trip times:</strong> Record at 1× and 5× IΔn in milliseconds (ms)</li>
                    <li>• <strong>Standard RCD:</strong> &lt;300ms at 1×IΔn, &lt;40ms at 5×IΔn</li>
                    <li>• <strong>Polarity:</strong> Tick "satisfactory" at each accessory</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2 text-sm sm:text-base">PSC/PSCC (Short Circuit Current):</h4>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">
                  Record measured value in kA or A. Typical domestic installations: 1-6 kA. Commercial installations may be higher.
                  Always record the actual measured value, not estimated or calculated figures.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Strategies for Success */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              5. Strategies for AM2 Success
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 sm:mb-3 text-sm sm:text-base">During Testing:</h4>
                  <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Record results as you test - don't leave until the end</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Write clearly - if assessor can't read it, you lose marks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Check units - always write Ω, MΩ, V, ms</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 sm:mb-3 text-sm sm:text-base">Quality Control:</h4>
                  <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Double-check results against expected ranges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Compare with GN3 and BS 7671 guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Keep paperwork tidy - no scribbles or rushed writing</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3 text-sm sm:text-base">Professional Tips:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-amber-700 dark:text-amber-300">
                  <div>
                    <strong>Time Management:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• Allocate 10-15 minutes for paperwork completion</li>
                      <li>• Don't rush - accuracy is more important than speed</li>
                      <li>• Review all sections before submitting</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Error Prevention:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• Use a systematic approach - same order every time</li>
                      <li>• Cross-reference readings with test sequence</li>
                      <li>• Have a colleague check your work if possible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Troubleshooting Documentation Issues */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Troubleshooting Documentation Issues
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Common Problems and Solutions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3 text-sm sm:text-base">Common Documentation Problems:</h4>
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="bg-background/50 rounded p-2">
                      <strong className="text-foreground">Problem:</strong> <span className="text-muted-foreground">Values don't match between different test sections</span><br/>
                      <strong className="text-foreground">Solution:</strong> <span className="text-muted-foreground">Cross-reference all entries, ensure consistency</span>
                    </div>
                    <div className="bg-background/50 rounded p-2">
                      <strong className="text-foreground">Problem:</strong> <span className="text-muted-foreground">Uncertain about which sections apply</span><br/>
                      <strong className="text-foreground">Solution:</strong> <span className="text-muted-foreground">Review circuit design, consult GN3 guidance</span>
                    </div>
                    <div className="bg-background/50 rounded p-2">
                      <strong className="text-foreground">Problem:</strong> <span className="text-muted-foreground">Running out of time for paperwork</span><br/>
                      <strong className="text-foreground">Solution:</strong> <span className="text-muted-foreground">Record as you test, allocate specific time slots</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3 text-sm sm:text-base">Quality Assurance Checklist:</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span className="text-purple-700 dark:text-elec-yellow">All mandatory fields completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span className="text-purple-700 dark:text-elec-yellow">Units specified for all numerical values</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span className="text-purple-700 dark:text-elec-yellow">Signatures and dates in correct locations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span className="text-purple-700 dark:text-elec-yellow">Values within expected ranges</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span className="text-purple-700 dark:text-elec-yellow">Cross-references match between documents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span className="text-purple-700 dark:text-elec-yellow">Professional presentation throughout</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Industry Standards and Compliance */}
              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-3 text-sm sm:text-base">Industry Standards and Compliance:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-orange-700 dark:text-elec-yellow block mb-2">BS 7671 Requirements:</strong>
                    <ul className="text-orange-600 dark:text-elec-yellow space-y-1">
                      <li>• Schedule of inspections must be comprehensive</li>
                      <li>• Test results must demonstrate compliance</li>
                      <li>• Departures from BS 7671 must be recorded</li>
                      <li>• Risk assessments must be documented</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-orange-700 dark:text-elec-yellow block mb-2">Professional Body Standards:</strong>
                    <ul className="text-orange-600 dark:text-elec-yellow space-y-1">
                      <li>• NICEIC documentation requirements</li>
                      <li>• NAPIT certification standards</li>
                      <li>• ECS competency card criteria</li>
                      <li>• Insurance company requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Real-World Examples
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-l-red-500 bg-red-100 dark:bg-red-900/30 p-3 sm:p-4">
                <h4 className="font-medium text-red-900 dark:text-red-100 mb-2 text-sm sm:text-base">Example 1: Infinity Symbol Error</h4>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 mb-2">
                  Candidate recorded all insulation resistance results as "∞." Assessor marked incorrect — <strong>failed paperwork section</strong>
                </p>
                <p className="text-xs text-red-700 dark:text-elec-yellow">
                  Lesson: Always record meter limit readings like "&gt;200 MΩ" instead of infinity symbols.
                </p>
              </div>
              
              <div className="border-l-4 border-l-red-500 bg-red-100 dark:bg-red-900/30 p-3 sm:p-4">
                <h4 className="font-medium text-red-900 dark:text-red-100 mb-2 text-sm sm:text-base">Example 2: Incomplete Documentation</h4>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 mb-2">
                  Candidate left several boxes blank, assuming assessor wouldn't check. <strong>Lost easy marks</strong>
                </p>
                <p className="text-xs text-red-700 dark:text-elec-yellow">
                  Lesson: Every applicable section must be completed. Blanks = lost marks.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-3 sm:p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base">Example 3: Professional Excellence</h4>
                <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 mb-2">
                  Candidate completed paperwork neatly, with realistic results matching the installation. <strong>Passed smoothly</strong>
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Lesson: Professional presentation and realistic values demonstrate competence and earn full marks.
                </p>
              </div>
              
              <div className="border-l-4 border-elec-yellow bg-yellow-50 dark:bg-yellow-950/20 p-3 sm:p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2 text-sm sm:text-base">Example 4: Real-Life Consequence</h4>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                  On-site, a contractor handed over an EIC with unreadable handwriting. Work failed audit. Same problem in AM2 = marks lost.
                </p>
                <p className="text-xs text-elec-yellow dark:text-elec-yellow">
                  Lesson: Professional legibility is essential for client handover and regulatory compliance.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* NET AM2 Specific Guidance */}
        <Card className="bg-gradient-to-r from-card/10 to-elec-yellow/10 border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              NET AM2 Specific Assessment Criteria
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Documentation Standards:</h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• All certificates must be fully completed</li>
                    <li>• Professional handwriting standards enforced</li>
                    <li>• Realistic values that match installation type</li>
                    <li>• Correct use of technical terminology</li>
                  </ul>
                </div>
                
                <div className="bg-background/50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Assessment Focus Areas:</h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Accuracy of recorded measurements</li>
                    <li>• Consistency between test results</li>
                    <li>• Professional presentation quality</li>
                    <li>• Compliance with current regulations</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-elec-yellow/10 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-elec-yellow mb-2 text-sm sm:text-base">Key Success Factors:</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  NET assessors specifically look for candidates who can demonstrate professional documentation skills that would be acceptable 
                  for client handover in real-world scenarios. This includes neat presentation, accurate technical data, and complete compliance records.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Section Summary */}
        <Card className="bg-gradient-to-r from-elec-yellow/5 to-card/5 border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Section Summary
            </h2>
            
            <div className="space-y-4">
              <div className="bg-background/50 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-foreground mb-3 text-sm sm:text-base">Key Takeaways:</h4>
                <ul className="text-xs sm:text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Paperwork is part of the test — not an afterthought</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Complete all sections of EIC and test schedules with realistic, measured results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Record results in correct units (Ω, MΩ, V, ms) as you test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Write clearly and neatly — illegible handwriting loses marks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Many candidates fail from poor recording habits, not lack of testing skill</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-elec-yellow/10 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-elec-yellow mb-2 text-sm sm:text-base">Next Steps:</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  You're now ready to move on to Module 4 Section 4, where we'll cover the practical implementation 
                  and integration of all testing procedures in real AM2 scenarios.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Test Your Knowledge
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
              Complete this 10-question quiz to test your understanding of professional certification and test result recording.
            </p>
            <Quiz questions={quizQuestions} title="Recording Test Results on Certification" />
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 pt-6 sm:pt-8">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../section2" className="flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">Previous: Safe Use of Test Instruments</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../section4" className="flex items-center justify-center">
              <span className="text-sm sm:text-base">Next: Module 4 Section 4</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module4Section3;