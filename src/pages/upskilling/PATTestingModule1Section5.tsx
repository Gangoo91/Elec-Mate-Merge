import { ArrowLeft, BookOpen, Target, FileText, AlertTriangle, CheckCircle, TestTube, Eye, Wrench, ClipboardCheck, Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What are the two main components of PAT testing?",
    options: [
      "Visual inspection and user training",
      "Visual inspection and electrical testing",
      "Electrical testing and documentation",
      "Documentation and user training"
    ],
    correctAnswer: 1,
    explanation: "PAT testing consists of visual inspection (checking for obvious damage) and electrical testing (measuring safety parameters like earth continuity and insulation resistance)."
  },
  {
    id: 2,
    question: "What should you check during visual inspection?",
    options: [
      "Only the plug and cable",
      "Just the equipment casing",
      "Cable, plug, equipment casing, and any obvious damage",
      "Only internal components"
    ],
    correctAnswer: 2,
    explanation: "Visual inspection should cover the entire appliance including cable condition, plug integrity, equipment casing, and any signs of damage, overheating, or wear."
  },
  {
    id: 3,
    question: "Who can perform PAT testing?",
    options: [
      "Only qualified electricians",
      "Anyone with basic training and competence",
      "Only the equipment manufacturer",
      "Only certified PAT testing companies"
    ],
    correctAnswer: 1,
    explanation: "PAT testing can be performed by competent persons with adequate training, not necessarily qualified electricians, though they must understand the equipment and testing procedures."
  },
  {
    id: 4,
    question: "What happens if equipment fails PAT testing?",
    options: [
      "It can continue to be used with caution",
      "It must be removed from service immediately",
      "It can be used for one more month",
      "Only the failed test needs to be repeated"
    ],
    correctAnswer: 1,
    explanation: "Equipment that fails PAT testing must be removed from service immediately to prevent potential electrical hazards. It can only be returned to service after repair and successful retesting."
  },
  {
    id: 5,
    question: "How should PAT testing results be recorded?",
    options: [
      "Mental notes are sufficient",
      "Simple pass/fail labels only",
      "Detailed records with dates, results, and equipment identification",
      "Only failed tests need recording"
    ],
    correctAnswer: 2,
    explanation: "Comprehensive records should include equipment identification, test dates, detailed results, tester identity, and any remedial actions taken."
  }
];

const PATTestingModule1Section5 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-400';
    if (score >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const renderQuiz = () => {
    if (!quizStarted) {
      return (
        <Card className="bg-gradient-to-r from-yellow-400/10 to-elec-gray border-yellow-400/30">
          <CardHeader>
            <CardTitle className="text-yellow-400">🧠 Knowledge Check Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Test your understanding of PAT testing implementation and best practices with this 5-question quiz.
            </p>
            <Button 
              onClick={() => setQuizStarted(true)}
              className="bg-yellow-400 text-black hover:bg-yellow-600"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (showResults) {
      const score = calculateScore();
      return (
        <Card className="bg-gradient-to-r from-yellow-400/10 to-elec-gray border-yellow-400/30">
          <CardHeader>
            <CardTitle className="text-yellow-400">Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                {score}/{quizData.length}
              </div>
              <p className="text-gray-300 mt-2">
                {score >= 4 ? 'Excellent understanding of PAT implementation!' : score >= 3 ? 'Good knowledge!' : 'Review the material and try again!'}
              </p>
            </div>
            
            <div className="space-y-3">
              {quizData.map((question, index) => (
                <div key={question.id} className="bg-card p-3 rounded-md border border-gray-600">
                  <div className="flex items-start gap-2">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">
                        {question.id}. {question.question}
                      </p>
                      <p className="text-xs text-gray-400">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={handleRestart}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-600"
            >
              Retake Quiz
            </Button>
          </CardContent>
        </Card>
      );
    }

    const question = quizData[currentQuestion];
    const progress = ((currentQuestion + 1) / quizData.length) * 100;

    return (
      <Card className="bg-gradient-to-r from-yellow-400/10 to-elec-gray border-yellow-400/30">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-yellow-400">Knowledge Check Quiz</CardTitle>
            <Badge variant="secondary" className="bg-yellow-400 text-black">
              Question {currentQuestion + 1} of {quizData.length}
            </Badge>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-card p-4 rounded-md border border-gray-600">
            <p className="text-white font-semibold mb-4">
              {question.id}. {question.question}
            </p>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-yellow-400 bg-yellow-400/10 text-white'
                      : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-semibold min-w-[24px]">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-card disabled:opacity-50"
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-yellow-400 text-black hover:bg-yellow-600 disabled:opacity-50"
            >
              {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../pat-testing-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <TestTube className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  PAT Testing Implementation and Best Practices
                </h1>
                <p className="text-xl text-gray-400">
                  Module 1, Section 5
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1.5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                35 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="text-lg leading-relaxed">
                Understanding PAT testing theory is one thing — implementing it effectively is another. This section covers 
                practical implementation strategies, best practices for different organisations, and how to build a 
                sustainable PAT testing programme that provides real safety benefits while managing costs and resources efficiently.
              </p>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p className="mb-4">By the end of this section, you will be able to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Plan and implement a PAT testing programme</li>
                <li>Understand the testing process from start to finish</li>
                <li>Develop effective record-keeping systems</li>
                <li>Train staff and manage ongoing compliance</li>
                <li>Handle failed equipment and remedial actions</li>
                <li>Optimise costs while maintaining safety standards</li>
              </ul>
            </CardContent>
          </Card>

          {/* Testing Process Overview */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5" />
                Complete Testing Process
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-900/20 border border-yellow-400/30 p-5 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-yellow-400 font-semibold">Visual Inspection</h5>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>• Check cable for cuts, nicks, or damage</li>
                    <li>• Inspect plug for cracks or loose connections</li>
                    <li>• Examine equipment casing for damage</li>
                    <li>• Look for signs of overheating or burning</li>
                    <li>• Verify appropriate fuse rating</li>
                    <li>• Check strain relief and cable entry</li>
                    <li>• Assess general cleanliness and condition</li>
                  </ul>
                </div>

                <div className="bg-green-900/20 border border-green-500/30 p-5 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <TestTube className="h-5 w-5 text-green-400" />
                    <h5 className="text-green-400 font-semibold">Electrical Testing</h5>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>• Earth continuity test (Class I equipment)</li>
                    <li>• Insulation resistance test (all equipment)</li>
                    <li>• Earth leakage test (if applicable)</li>
                    <li>• Functional checks and operation tests</li>
                    <li>• Load testing for extension leads</li>
                    <li>• Polarity checks where relevant</li>
                    <li>• RCD operation tests (portable RCDs)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Planning */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Implementation Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                  <h5 className="text-purple-400 font-semibold mb-3">Phase 1: Assessment</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Conduct equipment audit</li>
                    <li>• Risk assess each area</li>
                    <li>• Define testing frequencies</li>
                    <li>• Identify resource requirements</li>
                    <li>• Create equipment register</li>
                  </ul>
                </div>

                <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg">
                  <h5 className="text-orange-400 font-semibold mb-3">Phase 2: Setup</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Acquire testing equipment</li>
                    <li>• Train competent persons</li>
                    <li>• Develop procedures and forms</li>
                    <li>• Create labelling system</li>
                    <li>• Set up record keeping</li>
                  </ul>
                </div>

                <div className="bg-teal-900/20 border border-teal-500/30 p-4 rounded-lg">
                  <h5 className="text-teal-400 font-semibold mb-3">Phase 3: Operation</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Begin systematic testing</li>
                    <li>• Monitor and review results</li>
                    <li>• Handle failed equipment</li>
                    <li>• Update records continuously</li>
                    <li>• Annual programme review</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Implementation Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Organisational Success Factors:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Senior management commitment and support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Clear policies and procedures documented</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Adequate resources allocated for the programme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Regular training and competency updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Integration with other safety management systems</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Common Implementation Pitfalls:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Treating PAT as a 'one-size-fits-all' solution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Inadequate competency training for testers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Poor record keeping and tracking systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Focusing on compliance rather than safety outcomes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Insufficient budget planning for ongoing costs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Training and Competency */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Staff Training and Competency
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-blue-900/20 border border-yellow-400/30 p-5 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Essential Training Components</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Technical Knowledge</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Electrical safety principles</li>
                      <li>• Equipment classification systems</li>
                      <li>• Testing equipment operation</li>
                      <li>• Interpreting test results</li>
                      <li>• Common faults and failures</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-2">Practical Skills</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Visual inspection techniques</li>
                      <li>• Safe testing procedures</li>
                      <li>• Record keeping and documentation</li>
                      <li>• Equipment labelling systems</li>
                      <li>• Handling failed equipment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                  <h5 className="text-green-400 font-semibold mb-2">Initial Training</h5>
                  <p className="text-sm mb-2">2-3 days formal course covering:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Legal requirements</li>
                    <li>• Testing theory and practice</li>
                    <li>• Hands-on equipment use</li>
                    <li>• Assessment and certification</li>
                  </ul>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-400/30 p-4 rounded-lg">
                  <h5 className="text-yellow-400 font-semibold mb-2">Ongoing Development</h5>
                  <p className="text-sm mb-2">Regular updates including:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Regulatory changes</li>
                    <li>• New equipment types</li>
                    <li>• Improved techniques</li>
                    <li>• Incident learning</li>
                  </ul>
                </div>

                <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                  <h5 className="text-purple-400 font-semibold mb-2">Competency Assessment</h5>
                  <p className="text-sm mb-2">Regular evaluation of:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Technical knowledge</li>
                    <li>• Practical skills</li>
                    <li>• Record accuracy</li>
                    <li>• Safety compliance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-yellow-400/10 border border-yellow-400/30 p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold">Key Takeaway:</p>
                <p className="mt-2">
                  Successful PAT testing implementation requires careful planning, adequate training, and ongoing commitment. 
                  Focus on creating a sustainable programme that delivers real safety benefits, not just compliance checkboxes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          {renderQuiz()}
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule1Section5;