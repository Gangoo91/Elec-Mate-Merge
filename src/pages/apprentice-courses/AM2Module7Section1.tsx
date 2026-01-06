import { ArrowLeft, Clock, BookOpen, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        {/* Title Section */}
        <div className="space-y-4">
          <Badge variant="secondary" className="bg-elec-yellow text-black font-medium">
            Module 7 – Section 1
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Knowledge Test Practice
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">~25 min read</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Assessment Level</span>
            </div>
          </div>
        </div>

        {/* Critical Warning */}
        <Card className="border-red-500/50 bg-card">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Critical Assessment Component</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The knowledge test is typically the first component of AM2 assessment and sets the tone for your entire assessment. Poor performance here can affect confidence and momentum. You must demonstrate thorough understanding of BS 7671, testing procedures, and safety requirements. Inadequate preparation or test-taking strategy will impact your overall AM2 success.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
            <p className="text-muted-foreground mb-4">By the end of this section, you should be able to:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-elec-blue mt-2 flex-shrink-0"></span>
                Apply effective test-taking strategies and time management techniques
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-elec-blue mt-2 flex-shrink-0"></span>
                Navigate different question types with confidence and accuracy
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-elec-blue mt-2 flex-shrink-0"></span>
                Identify and address personal knowledge gaps through targeted practice
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-elec-blue mt-2 flex-shrink-0"></span>
                Use feedback effectively to improve performance and understanding
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-elec-blue mt-2 flex-shrink-0"></span>
                Demonstrate comprehensive knowledge of key BS 7671 regulations and testing procedures
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-elec-blue mt-2 flex-shrink-0"></span>
                Build confidence through systematic practice and mock test experience
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Multiple-Choice Question Banks */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">1. Multiple-Choice Question Banks</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">Coverage Areas</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• BS 7671 regulations and requirements</li>
                  <li>• Testing procedures and sequences</li>
                  <li>• Health and safety legislation</li>
                  <li>• Cable selection and installation methods</li>
                  <li>• Protection and control systems</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-2">Practice Strategy</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Start with topic-specific question banks</li>
                  <li>• Progress to mixed topic practice</li>
                  <li>• Focus on areas of weakness identified</li>
                  <li>• Review explanations for all questions</li>
                </ul>
              </div>

              <div className="bg-card border border-amber-500/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Key Point:</strong> Question banks should mirror the AM2 knowledge test format with similar difficulty levels and question styles.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Timed Mock Tests */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">2. Timed Mock Tests</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">Test Conditions</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• 60 minutes for 50-60 questions</li>
                  <li>• No reference materials allowed</li>
                  <li>• Simulated exam environment</li>
                  <li>• Immediate scoring and feedback</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-2">Benefits</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Experience time pressure of real test</li>
                  <li>• Identify pacing issues early</li>
                  <li>• Build confidence through practice</li>
                  <li>• Assess readiness for actual assessment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Feedback and Explanations */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">3. Feedback and Explanations</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">Comprehensive Analysis</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Detailed explanations for correct answers</li>
                  <li>• Common misconceptions highlighted</li>
                  <li>• Reference to specific BS 7671 regulations</li>
                  <li>• Links to additional learning resources</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-2">Performance Tracking</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Topic-by-topic performance analysis</li>
                  <li>• Progress tracking over time</li>
                  <li>• Identification of improvement areas</li>
                  <li>• Personalised study recommendations</li>
                </ul>
              </div>

              <div className="bg-card border border-green-500/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Best Practice:</strong> Review explanations even for questions answered correctly to reinforce understanding and identify any gaps.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Identifying Knowledge Gaps */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">4. Identifying Knowledge Gaps</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">Self-Assessment Techniques</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Topic-specific mini tests</li>
                  <li>• Confidence rating for each answer</li>
                  <li>• Error pattern analysis</li>
                  <li>• Peer discussion and comparison</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-2">Common Weak Areas</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Maximum demand calculations</li>
                  <li>• Protective device coordination</li>
                  <li>• Testing sequence requirements</li>
                  <li>• Special location regulations</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-foreground mb-2">Targeted Study Plan</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Focus 70% effort on identified weak areas</li>
                  <li>• Maintain 30% revision of strong areas</li>
                  <li>• Use spaced repetition for retention</li>
                  <li>• Regular reassessment and adjustment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[3].id}
          question={quickCheckQuestions[3].question}
          options={quickCheckQuestions[3].options}
          correctIndex={quickCheckQuestions[3].correctIndex}
          explanation={quickCheckQuestions[3].explanation}
        />

        {/* Exam Techniques and Strategies */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">5. Exam Techniques and Strategies</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">Time Management</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Allocate roughly 1 minute per question</li>
                  <li>• Flag difficult questions for review</li>
                  <li>• Don't spend too long on any single question</li>
                  <li>• Save 5-10 minutes for final review</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-2">Question Approach</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Read questions carefully and completely</li>
                  <li>• Identify key words and qualifiers</li>
                  <li>• Use elimination for uncertain answers</li>
                  <li>• Trust your first instinct if genuinely unsure</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-foreground mb-2">Common Pitfalls</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Misreading question requirements</li>
                  <li>• Changing correct answers unnecessarily</li>
                  <li>• Running out of time on difficult questions</li>
                  <li>• Not using process of elimination</li>
                </ul>
              </div>

              <div className="bg-card border border-elec-yellow/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Strategy:</strong> Aim for 65-70% to comfortably pass. Perfect scores aren't necessary - focus on consistent accuracy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[4].id}
          question={quickCheckQuestions[4].question}
          options={quickCheckQuestions[4].options}
          correctIndex={quickCheckQuestions[4].correctIndex}
          explanation={quickCheckQuestions[4].explanation}
        />

        {/* Summary */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Effective knowledge test preparation requires a systematic approach combining theoretical study with practical test-taking experience. Success depends on identifying and addressing knowledge gaps while developing confidence through repeated practice under exam conditions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-green-500/20 rounded-lg p-4">
                  <h3 className="font-medium text-green-300 mb-2">Key Success Factors</h3>
                  <ul className="space-y-1 text-green-300/80 text-sm">
                    <li>• Regular practice with mock tests</li>
                    <li>• Detailed review of all explanations</li>
                    <li>• Systematic approach to weak areas</li>
                    <li>• Effective time management strategies</li>
                  </ul>
                </div>
                
                <div className="bg-card border border-red-500/20 rounded-lg p-4">
                  <h3 className="font-medium text-elec-yellow mb-2">Common Failures</h3>
                  <ul className="space-y-1 text-elec-yellow/80 text-sm">
                    <li>• Inadequate practice under time pressure</li>
                    <li>• Focusing only on preferred topics</li>
                    <li>• Poor exam technique and time management</li>
                    <li>• Insufficient review of incorrect answers</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiz */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Knowledge Check Quiz</h2>
            <p className="text-muted-foreground mb-6">
              Test your understanding of knowledge test practice strategies with these questions.
            </p>
            <Quiz questions={quizQuestions} />
          </CardContent>
        </Card>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-12 pt-8 border-t border-border/20">
          <Button variant="outline" className="text-muted-foreground hover:text-foreground w-full sm:w-auto" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../section2">
              Continue to Section 7.2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module7Section1;