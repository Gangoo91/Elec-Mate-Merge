import { ArrowLeft, ArrowRight, Clock, AlertTriangle, CheckCircle, Target, Timer, Settings, FileText, Eye, Zap, Lightbulb, BookOpen, Wrench, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module4Section6 = () => {
  useSEO(
    "Time Management During Testing | AM2 Module 4 Section 6",
    "Master time management strategies for AM2 testing. Learn to work efficiently under pressure while maintaining safety and accuracy in electrical testing procedures."
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "time-blanks",
      question: "Which is better if time runs out — leaving blanks or writing 'perfect' textbook results?",
      options: [
        "Write perfect textbook results",
        "Leave blanks rather than fake answers",
        "Guess realistic values",
        "Copy from previous tests"
      ],
      correctIndex: 1,
      explanation: "Leave blanks. Fake/book answers = fail. Assessors can spot unrealistic perfect results."
    },
    {
      id: "rcd-failure",
      question: "What do assessors do if you fail to record RCD results because you ran out of time?",
      options: [
        "Give partial marks",
        "Allow extra time",
        "Mark as incomplete → lose marks, likely fail paperwork section",
        "Accept verbal explanation"
      ],
      correctIndex: 2,
      explanation: "Incomplete RCD results mean lost marks and likely failure of the paperwork section."
    },
    {
      id: "continuity-first",
      question: "Which test must be carried out before insulation resistance?",
      options: [
        "Polarity test",
        "RCD test",
        "Continuity test",
        "Earth fault loop test"
      ],
      correctIndex: 2,
      explanation: "Continuity tests must be completed before insulation resistance to ensure circuit integrity."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Roughly how long is allocated for AM2 testing and certification?",
      options: ["2.5 hours", "3.5 hours", "4.5 hours", "5 hours"],
      correctAnswer: 1,
      explanation: "AM2 testing and certification is allocated approximately 3.5 hours total."
    },
    {
      id: 2,
      question: "Which is worse: incomplete results or fake/book answers?",
      options: ["Incomplete results", "Fake/book answers", "Both are equally bad", "Neither affects the result"],
      correctAnswer: 1,
      explanation: "Fake or book answers will result in failure. Incomplete but honest results are better than fabricated perfect answers."
    },
    {
      id: 3,
      question: "How much time should be set aside for paperwork?",
      options: ["10-20 minutes", "30-40 minutes", "50-60 minutes", "No specific time needed"],
      correctAnswer: 1,
      explanation: "30-40 minutes should be allocated for completing all certification paperwork properly."
    },
    {
      id: 4,
      question: "What's the risk of leaving results until the end?",
      options: ["Better organization", "More accurate results", "Running out of time and rushed/illegible entries", "No risk at all"],
      correctAnswer: 2,
      explanation: "Leaving all recording until the end risks running out of time and producing rushed, illegible paperwork."
    },
    {
      id: 5,
      question: "Which test must be carried out before insulation resistance?",
      options: ["RCD testing", "Continuity testing", "Polarity testing", "Earth fault loop testing"],
      correctAnswer: 1,
      explanation: "Continuity testing must be completed before insulation resistance testing to ensure circuit integrity."
    },
    {
      id: 6,
      question: "What's a common mistake with RCD testing under time pressure?",
      options: ["Testing too slowly", "Only doing ×1 test, forgetting ×5 test", "Using wrong instruments", "Testing at wrong current"],
      correctAnswer: 1,
      explanation: "Candidates often forget to complete both ×1 and ×5 RCD tests when rushing due to time pressure."
    },
    {
      id: 7,
      question: "Why is it better to record results circuit-by-circuit?",
      options: ["Easier to check later", "Prevents rushed recording at the end", "Required by regulations", "Looks more professional"],
      correctAnswer: 1,
      explanation: "Recording results as you go prevents the risk of running out of time and having to rush all paperwork at the end."
    },
    {
      id: 8,
      question: "True or false: You can pass AM2 if you skip functional testing.",
      options: ["True - electrical tests are sufficient", "False - functional tests are mandatory", "True - if time runs out", "False - unless approved by assessor"],
      correctAnswer: 1,
      explanation: "Functional testing is mandatory and cannot be skipped. All required tests must be completed."
    },
    {
      id: 9,
      question: "What's the golden rule if running out of time?",
      options: ["Work faster", "Skip less important tests", "Keep work safe - incomplete but safe is better than rushed and unsafe", "Ask for extension"],
      correctAnswer: 2,
      explanation: "Safety must never be compromised. Incomplete but safe work is always better than rushed, unsafe shortcuts."
    },
    {
      id: 10,
      question: "Give one strategy to manage time during AM2 testing.",
      options: ["Work as fast as possible", "Record results circuit-by-circuit as you go", "Skip detailed checks", "Focus only on major tests"],
      correctAnswer: 1,
      explanation: "Recording results immediately as you test each circuit prevents time-consuming paperwork sessions at the end."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Button variant="ghost" className="min-h-[44px] p-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Back to Module 4</span>
                <span className="xs:hidden">Back</span>
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
            <Clock className="w-4 h-4" />
            Module 4 – Section 6
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Time Management During Testing
          </h1>
          <p className="text-sm sm:text-base text-white mb-6 sm:mb-8 leading-relaxed">
            Inspection and testing in AM2 is heavily time-pressured. You'll have around 3.5 hours to complete the full sequence of tests and fill in all paperwork. Poor pacing means incomplete results, rushed certificates, or unsafe shortcuts.
          </p>
          <p className="text-sm sm:text-base text-white leading-relaxed">
            The assessor wants to see you work methodically, safely, and efficiently — not rushing, but not stalling either. In real life, electricians are expected to test thoroughly and still hand over jobs on time.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  CRITICAL: Time Pressure vs Safety
                </h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow mb-3 leading-relaxed">
                  Never compromise safety for speed. Unsafe shortcuts or rushed work will result in automatic AM2 failure, regardless of time constraints.
                </p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow font-medium leading-relaxed">
                  Incomplete but safe work is always better than rushed, unsafe practices. Assessors prioritise safety over completion.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Learning Outcomes
            </h2>
            <p className="text-xs sm:text-sm text-white mb-4">
              By the end of this section, you should be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Break down AM2 testing into manageable stages
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Prioritise safety and completeness under exam conditions
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Recognise common time-management mistakes candidates make
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Apply strategies to stay on track without rushing
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Understand what assessors expect in terms of pacing and documentation
              </li>
            </ul>
          </div>
        </Card>

        {/* Why Time Management Matters */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              1. Why Time Management Matters
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 sm:mb-3 text-sm sm:text-base">Consequences of Poor Time Management:</h4>
                  <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                    <li>• Testing is marked on both procedure and paperwork</li>
                    <li>• Running out of time = incomplete tests, missing results, blank certificates</li>
                    <li>• Rushing = unsafe shortcuts, missed steps, "book answers"</li>
                    <li>• Incomplete paperwork can drag strong candidates below pass threshold</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 sm:mb-3 text-sm sm:text-base">Benefits of Good Time Management:</h4>
                  <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Complete all required tests safely</li>
                    <li>• Accurate, legible certification paperwork</li>
                    <li>• Professional, methodical approach demonstrated</li>
                    <li>• Reduced stress and better decision-making</li>
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

        {/* Typical Time Breakdown */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Timer className="w-5 h-5" />
              2. Typical Time Breakdown (approx 3.5 hrs)
            </h2>
            
            <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                <Timer className="w-4 h-4" />
                Recommended Time Allocation
              </h4>
              <p className="text-sm text-blue-700 dark:text-elec-yellow">
                These timings are guidelines based on NET experience. Use them as targets to pace yourself, but prioritise safety and completeness over speed.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-white font-medium text-sm sm:text-base border-l-4 border-elec-yellow pl-3">Visual inspection & preparation:</span>
                    <span className="font-bold text-elec-yellow text-base sm:text-lg pl-7 sm:pl-0">20–30 mins</span>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-white font-medium text-sm sm:text-base border-l-4 border-green-600 pl-3">Continuity tests (CPC, ring):</span>
                    <span className="font-bold text-green-600 text-base sm:text-lg pl-7 sm:pl-0">40–50 mins</span>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-white font-medium text-sm sm:text-base border-l-4 border-purple-600 pl-3">Insulation resistance:</span>
                    <span className="font-bold text-purple-600 text-base sm:text-lg pl-7 sm:pl-0">20 mins</span>
                  </div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-white font-medium text-sm sm:text-base border-l-4 border-orange-600 pl-3">Polarity checks:</span>
                    <span className="font-bold text-orange-600 text-base sm:text-lg pl-7 sm:pl-0">20 mins</span>
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-white font-medium text-sm sm:text-base border-l-4 border-red-600 pl-3">Earth fault loop & PSC/PSCC:</span>
                    <span className="font-bold text-red-600 text-base sm:text-lg pl-7 sm:pl-0">30–40 mins</span>
                  </div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-white font-medium text-sm sm:text-base border-l-4 border-elec-yellow pl-3">RCD testing:</span>
                    <span className="font-bold text-elec-yellow text-base sm:text-lg pl-7 sm:pl-0">30 mins</span>
                  </div>
                </div>
                <div className="bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800/30 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-white font-medium text-sm sm:text-base border-l-4 border-pink-600 pl-3">Functional testing:</span>
                    <span className="font-bold text-pink-600 text-base sm:text-lg pl-7 sm:pl-0">30 mins</span>
                  </div>
                </div>
                <div className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/30 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-white font-medium text-sm sm:text-base border-l-4 border-teal-600 pl-3">Paperwork completion:</span>
                    <span className="font-bold text-teal-600 text-base sm:text-lg pl-7 sm:pl-0">30–40 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Time Mistakes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              3. Common Time Mistakes (NET findings)
            </h2>
            
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">TOP 5 Time Management Failures:</h4>
                <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">1.</span>
                    <span>Spending too long setting up first tests → panicking later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">2.</span>
                    <span>Not recording results as they go → trying to write everything at the end</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">3.</span>
                    <span>Over-checking one circuit while neglecting others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">4.</span>
                    <span>Rushing at the end → missing RCD ×5 test or functional checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">5.</span>
                    <span>Poor handwriting slowing down paperwork</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Assessor Expectations */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              4. Assessor Expectations
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3 text-sm sm:text-base">What Assessors Want to See:</h4>
                <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Work steady and systematic — no shortcuts</li>
                  <li>• Talk through what you are doing (shows confidence and keeps you focused)</li>
                  <li>• Record results circuit-by-circuit, not all at the end</li>
                  <li>• Leave circuits safe if incomplete. Unsafe = fail</li>
                </ul>
              </div>
              
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3 text-sm sm:text-base">Professional Qualities Demonstrated:</h4>
                <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                  <li>• Methodical approach under pressure</li>
                  <li>• Clear communication and commentary</li>
                  <li>• Organised documentation practices</li>
                  <li>• Safety prioritised over speed</li>
                </ul>
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

        {/* Practical Strategies */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              5. Practical Strategies for Success
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Planning Strategies
                    </h4>
                    <ul className="text-sm text-purple-700 dark:text-elec-yellow space-y-1">
                      <li><strong>Have a plan:</strong> Break tasks into stages with time targets</li>
                      <li><strong>Check off sequence:</strong> Use the GN3 order like a checklist</li>
                      <li><strong>Don't over-engineer:</strong> Professional standard is enough</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Recording Strategies
                    </h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li><strong>Record immediately:</strong> Enter values as you test, not afterwards</li>
                      <li><strong>Work cleanly:</strong> Avoid wasted time untangling leads</li>
                      <li><strong>Clear handwriting:</strong> Practice legible recording under pressure</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Mental Strategies
                    </h4>
                    <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                      <li><strong>Stay calm:</strong> Panic leads to skipped steps and unsafe practice</li>
                      <li><strong>Focus on one circuit:</strong> Complete each fully before moving on</li>
                      <li><strong>Commentary:</strong> Talk through actions to maintain focus</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2 flex items-center gap-2">
                      <Wrench className="w-4 h-4" />
                      Equipment Strategies
                    </h4>
                    <ul className="text-sm text-orange-700 dark:text-elec-yellow space-y-1">
                      <li><strong>Organised setup:</strong> Keep tools and leads tidy</li>
                      <li><strong>Pre-check equipment:</strong> Verify operation before starting</li>
                      <li><strong>Backup plans:</strong> Know alternative test methods</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-world Examples */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Real-world Examples
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">❌ Example 1: Ring Continuity Obsession</h4>
                  <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                    Candidate spent 45 mins just on ring continuity, re-checking measurements multiple times. 
                    Ran out of time, left RCD tests incomplete → <strong>fail</strong>.
                  </p>
                  <p className="text-xs text-red-600 dark:text-elec-yellow italic">
                    Lesson: Don't chase perfection on one test at the expense of completing all requirements.
                  </p>
                </div>
                
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">❌ Example 2: Paperwork Left Until End</h4>
                  <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                    Candidate tested correctly but left all paperwork until the end. 
                    Results rushed, illegible, several mistakes → <strong>lost easy marks</strong>.
                  </p>
                  <p className="text-xs text-red-600 dark:text-elec-yellow italic">
                    Lesson: Record results immediately while values are fresh in memory.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">✅ Example 3: Methodical Success</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                    Candidate kept to time blocks, recorded as they went, talked through each stage clearly. 
                    Completed all tests and paperwork on time → <strong>pass</strong>.
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 italic">
                    Success factor: Disciplined time management and immediate recording.
                  </p>
                </div>
                
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">🏭 Example 4: Real-world Parallel</h4>
                  <p className="text-sm text-blue-700 dark:text-elec-yellow mb-2">
                    In real work, a contractor failed a NICEIC audit because test sheets were incomplete. 
                    Same issue in AM2 = <strong>marks lost</strong>.
                  </p>
                  <p className="text-xs text-elec-yellow dark:text-elec-yellow italic">
                    Reality: Incomplete documentation fails in both AM2 and professional practice.
                  </p>
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

        {/* Advanced Time Management Techniques */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Advanced Time Management Techniques
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-3 text-base">Pre-Test Preparation (5-10 mins investment saves 20+ mins later)</h4>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Set up test equipment systematically in logical order</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Check all instruments are calibrated and functioning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Organise test leads and accessories within easy reach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Review circuit schedules and understand the installation layout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Plan your testing sequence based on circuit accessibility</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-3 text-base">Efficient Recording Methods</h4>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>Use consistent abbreviations that you practise beforehand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>Record readings immediately after each individual test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>Double-check critical values as you write them down</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>Keep certificates organised and easily accessible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>Use pencil for initial readings, pen for final confirmed results</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Troubleshooting Time Issues */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Troubleshooting Time Issues
            </h2>
            
            <div className="space-y-6">
              <h3 className="font-semibold text-white mb-3">Common Problems and Solutions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-l-red-500">
                  <p className="font-medium text-white mb-2">Problem: Test equipment malfunction</p>
                  <p className="text-white text-sm">Solution: Always have backup instruments and check equipment functionality before starting formal testing</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-white mb-2">Problem: Unexpected circuit complexities</p>
                  <p className="text-white text-sm">Solution: Spend adequate time on visual inspection to understand the installation layout fully</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-elec-yellow">
                  <p className="font-medium text-white mb-2">Problem: Illegible handwriting under pressure</p>
                  <p className="text-white text-sm">Solution: Practice writing test results clearly and consider using block capitals for critical values</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-green-500">
                  <p className="font-medium text-white mb-2">Problem: Forgetting test sequences</p>
                  <p className="text-white text-sm">Solution: Create a personal checklist and stick rigidly to GN3 testing order</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-elec-yellow pl-4">
                <h3 className="font-semibold text-white mb-2">Q1: Can I ask for extra time if I'm running behind?</h3>
                <p className="text-white text-sm">A: No — the schedule is fixed. AM2 assessments run to strict timelines that cannot be extended.</p>
              </div>
              <div className="border-l-4 border-elec-yellow pl-4">
                <h3 className="font-semibold text-white mb-2">Q2: Should I speed up if I see I'm running out of time?</h3>
                <p className="text-white text-sm">A: No — unsafe shortcuts = fail. Prioritise safety over completion every time.</p>
              </div>
              <div className="border-l-4 border-elec-yellow pl-4">
                <h3 className="font-semibold text-white mb-2">Q3: Can I skip functional tests if I've done electrical tests?</h3>
                <p className="text-white text-sm">A: No — functional tests are mandatory. All prescribed tests must be completed.</p>
              </div>
              <div className="border-l-4 border-elec-yellow pl-4">
                <h3 className="font-semibold text-white mb-2">Q4: Do I lose marks for working slowly but completing everything?</h3>
                <p className="text-white text-sm">A: Not directly, but you risk running out of time for later tests or paperwork.</p>
              </div>
              <div className="border-l-4 border-elec-yellow pl-4">
                <h3 className="font-semibold text-white mb-2">Q5: What's the golden rule if you're behind schedule?</h3>
                <p className="text-white text-sm">A: Keep work safe. Incomplete but safe is always better than rushed and unsafe.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Summary
            </h2>
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
              <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                Time management in AM2 testing is about method, not speed. Assessors want to see:
              </p>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Tests completed in correct sequence
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Results recorded as you go
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Safe, steady pace without rushing
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Certificates fully completed and legible
                </li>
              </ul>
              <p className="text-sm text-green-700 dark:text-green-300 mt-4 font-medium">
                Remember: you're not only being tested on knowledge — you're being tested on how you work under pressure.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz Component */}
        <Quiz questions={quizQuestions} title="Section 6: Time Management Quiz" />

        {/* Mobile Navigation */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
            <Button variant="outline" className="flex-1 sm:flex-none" asChild>
              <Link to="../section5">
                <ChevronLeft className="w-4 h-4 mr-2" />
                <div className="text-left">
                  <div className="text-xs text-white">Previous</div>
                  <div className="text-sm font-medium">Section 5: Non-Compliances</div>
                </div>
              </Link>
            </Button>
            <Button className="flex-1 sm:flex-none bg-elec-yellow hover:bg-elec-yellow/90 text-black" asChild>
              <Link to="..">
                <div className="text-right">
                  <div className="text-xs text-black/70">Next</div>
                  <div className="text-sm font-medium">Module 5: Practical Skills</div>
                </div>
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AM2Module4Section6;