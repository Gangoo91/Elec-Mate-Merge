import { Clock, BookOpen, AlertTriangle, Target, Timer, Lightbulb, CheckCircle, Brain, FileText } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module7Section1 = () => {
  useSEO(
    "Knowledge Test Practice - AM2 Module 7 Section 1",
    "Master knowledge test strategies, practice questions, mock tests and exam techniques for AM2 assessment success"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "time-allocation",
      question: "How should you allocate your time for the AM2 knowledge test?",
      options: [
        "Spend equal time on each question",
        "Rush through easy questions first",
        "Work systematically through each question in order",
        "Skip difficult questions and return later"
      ],
      correctIndex: 2,
      explanation: "Work systematically through each question in order. Don't get stuck on difficult questions - mark for review and return if time permits. Rushing leads to careless errors."
    },
    {
      id: "question-types",
      question: "Which AM2 knowledge test format requires the most careful attention?",
      options: [
        "True/False questions",
        "Multiple choice with similar answers",
        "Calculation questions",
        "Diagram interpretation"
      ],
      correctIndex: 1,
      explanation: "Multiple choice questions with similar answers require careful reading and understanding of subtle differences. These questions are designed to test precise knowledge."
    },
    {
      id: "feedback-usage",
      question: "How should you use practice test feedback effectively?",
      options: [
        "Only review incorrect answers",
        "Focus on percentage scores achieved",
        "Review all explanations and identify knowledge gaps",
        "Repeat tests until you get 100%"
      ],
      correctIndex: 2,
      explanation: "Review all explanations, even for correct answers, to reinforce learning and identify any knowledge gaps or areas of uncertainty that need attention."
    },
    {
      id: "exam-strategy",
      question: "What's the best strategy when unsure about an answer?",
      options: [
        "Always guess the longest answer",
        "Use elimination to narrow down options",
        "Choose 'C' - it's most often correct",
        "Skip the question entirely"
      ],
      correctIndex: 1,
      explanation: "Use elimination to rule out obviously incorrect answers, then make an educated guess from remaining options. Don't leave questions blank unless penalised for wrong answers."
    },
    {
      id: "knowledge-gaps",
      question: "How do you identify knowledge gaps effectively?",
      options: [
        "Count how many questions you get wrong",
        "Note which topics you consistently struggle with",
        "Focus only on calculation errors",
        "Review only the hardest questions"
      ],
      correctIndex: 1,
      explanation: "Track which specific topics or regulation areas you consistently struggle with, then target these areas for focused study and additional practice."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What percentage do you typically need to pass the AM2 knowledge test?",
      options: ["60%", "65%", "70%", "75%"],
      correctAnswer: 1,
      explanation: "Most AM2 knowledge tests require 65% to pass, though this can vary by provider. Check specific requirements with your assessment centre."
    },
    {
      id: 2,
      question: "How long do you typically have for the AM2 knowledge test?",
      options: ["30 minutes", "45 minutes", "60 minutes", "90 minutes"],
      correctAnswer: 2,
      explanation: "The AM2 knowledge test is typically 60 minutes for around 50-60 questions, averaging about 1 minute per question."
    },
    {
      id: 3,
      question: "Which BS 7671 regulation covers basic protection by insulation?",
      options: ["Regulation 131.2", "Regulation 416.1", "Regulation 411.3.1.1", "Regulation 522.6.1"],
      correctAnswer: 1,
      explanation: "Regulation 416.1 covers basic protection by insulation of live parts - a fundamental safety requirement tested in AM2."
    },
    {
      id: 4,
      question: "What's the maximum Zs for a 32A Type B MCB?",
      options: ["1.44Ω", "1.37Ω", "0.87Ω", "2.3Ω"],
      correctAnswer: 0,
      explanation: "Maximum Zs for a 32A Type B MCB is 1.44Ω. These values are critical for AM2 knowledge tests and must be memorised."
    },
    {
      id: 5,
      question: "Which test should be carried out first on a new installation?",
      options: ["Insulation resistance", "Earth fault loop impedance", "Continuity of protective conductors", "Polarity"],
      correctAnswer: 2,
      explanation: "Continuity of protective conductors should be tested first to ensure safety before proceeding with other tests."
    },
    {
      id: 6,
      question: "What's the minimum insulation resistance for a 230V circuit?",
      options: ["0.5MΩ", "1.0MΩ", "1.5MΩ", "2.0MΩ"],
      correctAnswer: 1,
      explanation: "Minimum insulation resistance for circuits up to 500V is 1.0MΩ, as specified in BS 7671."
    },
    {
      id: 7,
      question: "Which cable type requires an earth wire to be run separately?",
      options: ["Twin and earth", "3-core and earth", "Single core cables in conduit", "SWA cable"],
      correctAnswer: 2,
      explanation: "Single core cables in metallic conduit require a separate earth wire as the individual cables don't include an earth conductor."
    },
    {
      id: 8,
      question: "What does RCD stand for?",
      options: ["Residual Current Device", "Resistant Current Detector", "Reliable Circuit Detector", "Remote Control Device"],
      correctAnswer: 0,
      explanation: "RCD stands for Residual Current Device - essential protection against electric shock commonly tested in AM2."
    },
    {
      id: 9,
      question: "Which Part of BS 7671 covers inspection and testing?",
      options: ["Part 6", "Part 7", "Part 5", "Part 4"],
      correctAnswer: 1,
      explanation: "Part 7 of BS 7671 covers inspection and testing requirements - crucial for AM2 practical assessment understanding."
    },
    {
      id: 10,
      question: "What's the standard test voltage for insulation resistance testing of 230V circuits?",
      options: ["250V DC", "500V DC", "1000V DC", "230V AC"],
      correctAnswer: 1,
      explanation: "Standard test voltage for insulation resistance of 230V circuits is 500V DC as specified in BS 7671."
    }
  ];

  const learningOutcomes = [
    "Apply effective test-taking strategies and time management techniques",
    "Navigate different question types with confidence and accuracy",
    "Identify and address personal knowledge gaps through targeted practice",
    "Use feedback effectively to improve performance and understanding",
    "Demonstrate comprehensive knowledge of key BS 7671 regulations and testing procedures",
    "Build confidence through systematic practice and mock test experience"
  ];

  return (
    <AM2SectionLayout
      backHref="/apprentice-courses/am2/module7"
      breadcrumbs={[
        { label: "AM2", href: "/apprentice-courses/am2" },
        { label: "Module 7", href: "/apprentice-courses/am2/module7" },
        { label: "Section 1" }
      ]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={BookOpen}
        title="Knowledge Test Practice"
        description="The knowledge test is typically the first component of AM2 assessment and sets the tone for your entire assessment. Mastering knowledge test strategies, practice questions, mock tests and exam techniques is essential for AM2 assessment success."
        badge="Module 7 - Section 1"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning
        title="Critical Assessment Component"
        message="The knowledge test is typically the first component of AM2 assessment and sets the tone for your entire assessment. Poor performance here can affect confidence and momentum. You must demonstrate thorough understanding of BS 7671, testing procedures, and safety requirements. Inadequate preparation or test-taking strategy will impact your overall AM2 success."
      />

      {/* Learning Outcomes */}
      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* Multiple-Choice Question Banks */}
      <AM2ContentCard
        title="1. Multiple-Choice Question Banks"
        icon={FileText}
        accent
      >
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Coverage Areas</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>BS 7671 regulations and requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Testing procedures and sequences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Health and safety legislation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Cable selection and installation methods</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Protection and control systems</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Practice Strategy</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Start with topic-specific question banks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Progress to mixed topic practice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Focus on areas of weakness identified</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Review explanations for all questions</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-amber-500/30 rounded-xl p-4">
            <p className="text-ios-callout text-white/80">
              <strong className="text-amber-400">Key Point:</strong> Question banks should mirror the AM2 knowledge test format with similar difficulty levels and question styles.
            </p>
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

      {/* Timed Mock Tests */}
      <AM2ContentCard
        title="2. Timed Mock Tests"
        icon={Timer}
      >
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Test Conditions</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>60 minutes for 50-60 questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>No reference materials allowed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Simulated exam environment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Immediate scoring and feedback</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Benefits</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Experience time pressure of real test</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Identify pacing issues early</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Build confidence through practice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Assess readiness for actual assessment</span>
              </li>
            </ul>
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

      {/* Feedback and Explanations */}
      <AM2ContentCard
        title="3. Feedback and Explanations"
        icon={Lightbulb}
      >
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Comprehensive Analysis</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Detailed explanations for correct answers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Common misconceptions highlighted</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Reference to specific BS 7671 regulations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Links to additional learning resources</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Performance Tracking</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Topic-by-topic performance analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Progress tracking over time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Identification of improvement areas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Personalised study recommendations</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <p className="text-ios-callout text-white/80">
              <strong className="text-green-400">Best Practice:</strong> Review explanations even for questions answered correctly to reinforce understanding and identify any gaps.
            </p>
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

      {/* Identifying Knowledge Gaps */}
      <AM2ContentCard
        title="4. Identifying Knowledge Gaps"
        icon={Target}
      >
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Self-Assessment Techniques</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Topic-specific mini tests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Confidence rating for each answer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Error pattern analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Peer discussion and comparison</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Common Weak Areas</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Maximum demand calculations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Protective device coordination</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Testing sequence requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Special location regulations</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Targeted Study Plan</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Focus 70% effort on identified weak areas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Maintain 30% revision of strong areas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Use spaced repetition for retention</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Regular reassessment and adjustment</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[3].id}
        question={quickCheckQuestions[3].question}
        options={quickCheckQuestions[3].options}
        correctIndex={quickCheckQuestions[3].correctIndex}
        explanation={quickCheckQuestions[3].explanation}
      />

      {/* Exam Techniques and Strategies */}
      <AM2ContentCard
        title="5. Exam Techniques and Strategies"
        icon={Brain}
      >
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Time Management</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Allocate roughly 1 minute per question</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Flag difficult questions for review</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Don't spend too long on any single question</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Save 5-10 minutes for final review</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Question Approach</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Read questions carefully and completely</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Identify key words and qualifiers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Use elimination for uncertain answers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Trust your first instinct if genuinely unsure</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Common Pitfalls</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Misreading question requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Changing correct answers unnecessarily</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Running out of time on difficult questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Not using process of elimination</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-elec-yellow/30 rounded-xl p-4">
            <p className="text-ios-callout text-white/80">
              <strong className="text-elec-yellow">Strategy:</strong> Aim for 65-70% to comfortably pass. Perfect scores aren't necessary - focus on consistent accuracy.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[4].id}
        question={quickCheckQuestions[4].question}
        options={quickCheckQuestions[4].options}
        correctIndex={quickCheckQuestions[4].correctIndex}
        explanation={quickCheckQuestions[4].explanation}
      />

      {/* Summary */}
      <AM2ContentCard
        title="6. Summary"
        icon={CheckCircle}
      >
        <div className="space-y-4">
          <p className="text-ios-callout text-white/80">
            Effective knowledge test preparation requires a systematic approach combining theoretical study with practical test-taking experience. Success depends on identifying and addressing knowledge gaps while developing confidence through repeated practice under exam conditions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-green-400 mb-3">Key Success Factors</h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Regular practice with mock tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Detailed review of all explanations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Systematic approach to weak areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Effective time management strategies</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-elec-yellow mb-3">Common Failures</h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Inadequate practice under time pressure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Focusing only on preferred topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Poor exam technique and time management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Insufficient review of incorrect answers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Quiz */}
      <Quiz
        title="Knowledge Check Quiz"
        questions={quizQuestions}
      />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        previousHref="/apprentice-courses/am2/module6/section4"
        previousLabel="Module 6 Section 4"
        nextHref="../section2"
        nextLabel="Coping with Nerves"
        currentSection={1}
        totalSections={4}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module7Section1;
