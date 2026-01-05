import { ArrowLeft, BookOpen, Target, FileText, AlertTriangle, CheckCircle, Building2, HardHat, School, Shield, Factory, Wrench, Eye, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizResults from '@/components/upskilling/quiz/QuizResults';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';

interface QuizQuestionType {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: QuizQuestionType[] = [
  {
    id: 1,
    question: "What does PAT stand for in electrical safety?",
    options: [
      "Portable Appliance Testing",
      "Power Application Testing",
      "Protective Appliance Testing",
      "Precision Apparatus Testing"
    ],
    correctAnswer: 0,
    explanation: "PAT stands for Portable Appliance Testing - the routine inspection and testing of electrical appliances to ensure they are safe to use."
  },
  {
    id: 2,
    question: "Why is PAT testing considered essential for workplace safety?",
    options: [
      "It's required by insurance companies only",
      "To prevent electrical accidents and ensure equipment safety",
      "To reduce electricity bills",
      "It's only needed for new equipment"
    ],
    correctAnswer: 1,
    explanation: "PAT testing is essential to prevent electrical accidents, fires, and electrocution by identifying faulty appliances before they can cause harm to users."
  },
  {
    id: 3,
    question: "Which sectors typically require comprehensive PAT testing programmes?",
    options: [
      "Private homes only",
      "Construction sites only",
      "Offices, construction sites, schools, and healthcare facilities",
      "Only government buildings"
    ],
    correctAnswer: 2,
    explanation: "PAT testing is required across multiple sectors including offices, construction sites, schools, healthcare, and any workplace using portable electrical equipment."
  },
  {
    id: 4,
    question: "What does a comprehensive PAT testing programme include?",
    options: [
      "Only visual inspection",
      "Both visual inspection and electrical testing",
      "Only electrical testing with instruments",
      "Just checking the equipment works"
    ],
    correctAnswer: 1,
    explanation: "PAT testing involves both thorough visual inspection and electrical testing. Visual checks identify obvious damage, while electrical tests verify safety parameters."
  },
  {
    id: 5,
    question: "What are the main types of electrical tests used in PAT testing?",
    options: [
      "Voltage and current testing only",
      "Earth continuity and insulation resistance testing",
      "Power consumption testing only",
      "Frequency response testing"
    ],
    correctAnswer: 1,
    explanation: "The main electrical tests in PAT are earth continuity testing (for Class I appliances) and insulation resistance testing (for all appliance classes)."
  },
  {
    id: 6,
    question: "How often should PAT testing typically be carried out?",
    options: [
      "Once per year for all equipment",
      "Depends on equipment type, usage, and environment",
      "Only when equipment appears damaged",
      "Every five years regardless of usage"
    ],
    correctAnswer: 1,
    explanation: "PAT testing frequency depends on factors including equipment class, usage intensity, environmental conditions, and user competence - ranging from daily checks to several years."
  },
  {
    id: 7,
    question: "What is a key benefit of maintaining detailed PAT testing records?",
    options: [
      "It reduces the need for future testing",
      "Demonstrates due diligence and legal compliance",
      "It's only needed for insurance purposes",
      "Records aren't necessary if equipment passes tests"
    ],
    correctAnswer: 1,
    explanation: "Detailed PAT testing records demonstrate due diligence, prove legal compliance, and provide essential documentation for insurance and regulatory purposes."
  },
  {
    id: 8,
    question: "Which type of equipment failure poses the greatest risk without PAT testing?",
    options: [
      "Cosmetic damage only",
      "Insulation breakdown leading to electric shock",
      "Equipment running slightly slower",
      "Minor cable wear that doesn't affect operation"
    ],
    correctAnswer: 1,
    explanation: "Insulation breakdown poses the greatest risk as it can lead to electric shock, electrocution, and electrical fires - all preventable through proper PAT testing."
  },
  {
    id: 9,
    question: "What environmental factors can accelerate electrical equipment degradation?",
    options: [
      "Only extreme temperatures",
      "Moisture, dust, heat, chemicals, and physical abuse",
      "Just humidity levels",
      "Environmental factors don't affect electrical equipment"
    ],
    correctAnswer: 1,
    explanation: "Multiple environmental factors including moisture, dust, heat, chemical exposure, and physical abuse can accelerate equipment degradation and create safety hazards."
  },
  {
    id: 10,
    question: "What is the primary goal of implementing a PAT testing programme?",
    options: [
      "To meet minimum legal requirements only",
      "To prevent accidents, ensure safety, and demonstrate compliance",
      "To avoid insurance claims",
      "To extend equipment warranty periods"
    ],
    correctAnswer: 1,
    explanation: "The primary goal is comprehensive safety management: preventing accidents, protecting people, ensuring legal compliance, and reducing liability exposure."
  }
];

const PATTestingModule1Section1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(true); // Start quiz immediately

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
    setQuizStarted(true); // Reset to show first question immediately
  };

  const renderQuiz = () => {
    if (!quizStarted) {
      return (
        <Card className="bg-card/80 border-transparent">
          <CardHeader>
            <CardTitle className="text-white">🧠 Knowledge Check Quiz - 10 Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white">
              Test your understanding of PAT testing fundamentals with this comprehensive 10-question quiz covering all key concepts.
            </p>
            <Button 
              onClick={() => setQuizStarted(true)}
              className="bg-yellow-400 text-black hover:bg-yellow-400"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (showResults) {
      return <QuizResults questions={quizData} selectedAnswers={selectedAnswers} onRestart={handleRestart} />;
    }

    const question = quizData[currentQuestion];

    return (
      <div className="space-y-6">
        <QuizProgress currentQuestion={currentQuestion} totalQuestions={quizData.length} />
        <QuizQuestion
          question={question}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />
        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={quizData.length}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === quizData.length - 1}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              <BookOpen className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  What is PAT Testing and Why It's Required
                </h1>
                <p className="text-xl text-white">
                  Module 1, Section 1
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1.1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                30 minutes
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
            <CardContent className="text-white">
              <p className="text-lg leading-relaxed">
                PAT testing is a systematic safety methodology for electrical appliances that could be moved or connected to different locations. 
                But why is it needed, and who needs it? In this comprehensive section, we'll explore the fundamental purpose of PAT testing, 
                its critical role in electrical safety management, and why it has become an essential practice across virtually all sectors that use electrical equipment.
                PAT testing combines systematic visual inspection with precise electrical measurements to identify potential hazards before they cause harm, 
                making it one of the most effective preventive safety measures available to businesses today. This proactive approach to electrical safety 
                not only protects lives and property but also demonstrates compliance with legal duties and helps maintain insurance coverage.
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
            <CardContent className="text-white space-y-3">
              <p className="mb-4">By the end of this section, you will be able to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Understand what PAT testing involves and its comprehensive scope across different equipment types</li>
                <li>Recognise why PAT is crucial for safety, compliance, and business protection in the modern workplace</li>
                <li>Identify typical use cases and industries affected by PAT requirements and regulations</li>
                <li>Learn the goals of PAT: prevention, compliance, liability reduction, and cost-effective risk management</li>
                <li>Explain the difference between visual inspection and electrical testing methods and their complementary roles</li>
                <li>Understand the business case and ROI of implementing comprehensive PAT testing programmes</li>
                <li>Analyse real-world accident scenarios and how proper PAT testing prevents serious incidents</li>
                <li>Evaluate the consequences of non-compliance and inadequate testing on business operations</li>
                <li>Appreciate the evolution of PAT testing standards and current best practices</li>
                <li>Recognise the relationship between PAT testing and broader electrical safety management systems</li>
              </ul>
            </CardContent>
          </Card>

          {/* What PAT Stands For */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                What is PAT Testing? - Comprehensive Definition
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-400/10 border border-yellow-400/30 p-4 rounded-lg">
                <h4 className="text-yellow-400 font-bold text-xl mb-2">PAT = Portable Appliance Testing</h4>
                <p>
                  PAT testing is the routine inspection and testing of electrical appliances to check they are safe to use. 
                  It combines visual inspection with electrical testing to identify potential safety hazards before they can cause harm.
                  This systematic approach ensures that portable electrical equipment remains safe throughout its operational life,
                  from initial installation through regular use to end-of-life disposal.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Key Characteristics of Modern PAT Testing:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Systematic approach:</strong> Regular, scheduled testing of all portable electrical equipment using standardised procedures, 
                      detailed documentation, and risk-based testing frequencies tailored to specific equipment and usage patterns.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Preventive measure:</strong> Identifies faults, wear, damage, and degradation before they cause accidents, electric shock, 
                      fires, or equipment failure. This proactive approach is far more cost-effective than reactive maintenance.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Documentation:</strong> Creates a comprehensive audit trail of equipment condition, test results, maintenance history, 
                      and compliance evidence for legal, insurance, and regulatory purposes.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Risk management:</strong> Forms part of a comprehensive electrical safety strategy that reduces liability exposure, 
                      protects people and property, and supports business continuity planning.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Legal compliance:</strong> Demonstrates due diligence and helps meet obligations under EAWR, PUWER, 
                      Health & Safety legislation, and supports defence against potential liability claims.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Quality assurance:</strong> Ensures equipment performance, reliability, and energy efficiency while extending 
                      operational life through early identification of deterioration.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Equipment Requiring PAT Testing - Comprehensive Coverage:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-medium mb-2">Office & IT Equipment:</p>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• Desktop computers and laptops</li>
                      <li>• Printers, copiers, and scanners</li>
                      <li>• Monitors and displays</li>
                      <li>• Network equipment and servers</li>
                      <li>• Projection equipment</li>
                      <li>• Desk lamps and lighting</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Catering & Kitchen:</p>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• Kettles and coffee machines</li>
                      <li>• Microwaves and toasters</li>
                      <li>• Refrigerators and freezers</li>
                      <li>• Dishwashers and food processors</li>
                      <li>• Hot plates and grills</li>
                      <li>• Vending machines</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Tools & Equipment:</p>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• Power tools and drills</li>
                      <li>• Extension leads and RCDs</li>
                      <li>• Vacuum cleaners</li>
                      <li>• Fans and heaters</li>
                      <li>• Audio/visual equipment</li>
                      <li>• Laboratory and medical devices</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                <h4 className="text-purple-400 font-semibold mb-2">The Two-Stage PAT Testing Approach:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-medium mb-2">Stage 1: Visual Inspection</p>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• Cable and plug condition assessment</li>
                      <li>• Housing integrity and damage check</li>
                      <li>• Cleanliness and contamination review</li>
                      <li>• User modifications or repairs identification</li>
                      <li>• Environmental suitability evaluation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Stage 2: Electrical Testing</p>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• Earth continuity verification</li>
                      <li>• Insulation resistance measurement</li>
                      <li>• Touch current/protective conductor testing</li>
                      <li>• Functional safety checks</li>
                      <li>• Load testing where appropriate</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why PAT Testing is Essential */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Why PAT Testing is Essential - Comprehensive Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                  <h5 className="text-red-400 font-semibold mb-2">Safety Risks Without PAT Testing:</h5>
                  <ul className="space-y-1 text-sm text-white">
                    <li>• Electric shock from deteriorated insulation</li>
                    <li>• Electrical fires from overheating or arcing</li>
                    <li>• Equipment failure causing operational injury</li>
                    <li>• Electrocution from earth faults</li>
                    <li>• Burns from overheating equipment or cables</li>
                    <li>• Secondary injuries from equipment malfunction</li>
                    <li>• Arc flash incidents in fault conditions</li>
                    <li>• Toxic fume release from burning insulation</li>
                  </ul>
                </div>
                
                <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                  <h5 className="text-green-400 font-semibold mb-2">Benefits of Comprehensive PAT Testing:</h5>
                  <ul className="space-y-1 text-sm text-white">
                    <li>• Prevents 95%+ of electrical accidents</li>
                    <li>• Reduces fire risk by early fault detection</li>
                    <li>• Demonstrates legal due diligence</li>
                    <li>• Protects and reduces insurance premiums</li>
                    <li>• Reduces liability exposure significantly</li>
                    <li>• Improves equipment reliability and uptime</li>
                    <li>• Extends equipment operational life</li>
                    <li>• Provides workforce confidence and morale</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">How Electrical Faults Develop - Progressive Failure Analysis:</h4>
                <div className="space-y-3">
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <span className="text-red-400 font-medium">Normal Wear and Tear (Progressive)</span>
                    </div>
                    <p className="text-white text-sm">
                      Regular use causes gradual deterioration of cables, plugs, and internal components. Flexing of cables weakens insulation, 
                      connections loosen due to thermal cycling, and protective devices may degrade over time. This natural aging process is often 
                      invisible until electrical testing reveals deterioration in safety parameters. Vibration, thermal stress, and mechanical 
                      fatigue combine to reduce equipment integrity over months and years of operation.
                    </p>
                  </div>
                  
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-orange-400" />
                      <span className="text-orange-400 font-medium">Environmental Damage (Accelerated)</span>
                    </div>
                    <p className="text-white text-sm">
                      Moisture, dust, heat, chemical exposure, and UV radiation can accelerate equipment degradation significantly. Even seemingly benign 
                      office environments present hazards: spilled drinks, humidity variations, dust accumulation, and cleaning chemicals can create 
                      dangerous conditions that visual inspection alone may miss. Construction and industrial environments present additional challenges 
                      including cement dust, metal particles, and aggressive cleaning regimes that attack insulation materials.
                    </p>
                  </div>
                  
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">User Damage (Immediate or Progressive)</span>
                    </div>
                    <p className="text-white text-sm">
                      Incorrect handling, dropping equipment, pulling cables, and overloading circuits cause immediate or progressive damage. 
                      Users may not report minor incidents that compromise electrical safety, making regular testing essential. Poor cable management, 
                      inappropriate extension lead use, and attempts at user maintenance can introduce serious safety hazards. Training and awareness 
                      can reduce but never eliminate user-induced damage patterns.
                    </p>
                  </div>

                  <div className="bg-card p-4 rounded border border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-purple-400" />
                      <span className="text-purple-400 font-medium">Manufacturing Defects (Latent)</span>
                    </div>
                    <p className="text-white text-sm">
                      Even new equipment may contain latent defects that don't manifest immediately. Poor quality control, component substitution, 
                      and design flaws can result in premature failure. Economic pressures on manufacturers sometimes lead to reduced quality margins, 
                      making initial and regular testing even more important. Counterfeit and non-compliant equipment poses particular risks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-500/30 p-4 rounded-lg">
                <h4 className="text-amber-400 font-semibold mb-2">Real-World Impact Statistics and Case Studies:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">~1,000</p>
                    <p className="text-sm text-white">Electrical fires annually in UK workplaces</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">£1.2M+</p>
                    <p className="text-sm text-white">Average cost of serious electrical incident</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">95%</p>
                    <p className="text-sm text-white">Of electrical incidents are preventable through PAT</p>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded">
                  <p className="text-white text-sm">
                    <strong className="text-amber-400">Case Example:</strong> A construction company avoided a potential £500,000 claim when PAT testing 
                    identified a defective angle grinder with compromised earth continuity. The equipment appeared functional but would have created a 
                    serious shock risk during use on a wet construction site.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industry Applications */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Industries Where PAT Testing is Essential - Sector-Specific Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-yellow-400 font-medium">Office Environments</h5>
                  </div>
                  <p className="text-white text-sm mb-2">
                    Computers, printers, desk lamps, kitchen appliances, and presentation equipment require regular testing.
                  </p>
                  <p className="text-gray-300 text-xs">
                    Typical frequency: Annual testing for most equipment, 6-monthly for kitchen appliances in heavy use.
                  </p>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <HardHat className="h-5 w-5 text-orange-400" />
                    <h5 className="text-orange-400 font-medium">Construction Sites</h5>
                  </div>
                  <p className="text-white text-sm mb-2">
                    Power tools, extension leads, lighting, and temporary equipment face harsh conditions requiring frequent testing.
                  </p>
                  <p className="text-gray-300 text-xs">
                    Typical frequency: 3-monthly testing, daily visual checks, immediate testing after incidents.
                  </p>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <School className="h-5 w-5 text-green-400" />
                    <h5 className="text-green-400 font-medium">Educational Facilities</h5>
                  </div>
                  <p className="text-white text-sm mb-2">
                    Laboratories, workshops, IT equipment, and portable classroom devices need systematic testing programmes.
                  </p>
                  <p className="text-gray-300 text-xs">
                    Typical frequency: Annual for IT, 6-monthly for workshop tools, termly for high-use equipment.
                  </p>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-red-400" />
                    <h5 className="text-red-400 font-medium">Healthcare Facilities</h5>
                  </div>
                  <p className="text-white text-sm mb-2">
                    Medical devices, patient care equipment, and general appliances require enhanced testing protocols.
                  </p>
                  <p className="text-gray-300 text-xs">
                    Typical frequency: 6-monthly or more frequent, with specialised medical equipment testing requirements.
                  </p>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Factory className="h-5 w-5 text-purple-400" />
                    <h5 className="text-purple-400 font-medium">Manufacturing</h5>
                  </div>
                  <p className="text-white text-sm mb-2">
                    Production equipment, maintenance tools, and portable machinery require robust testing schedules.
                  </p>
                  <p className="text-gray-300 text-xs">
                    Typical frequency: 6-monthly for production tools, 3-monthly for maintenance equipment, risk-based intervals.
                  </p>
                </div>

                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-yellow-400 font-medium">Facilities Management</h5>
                  </div>
                  <p className="text-white text-sm mb-2">
                    Cleaning equipment, maintenance tools, and portable facilities require comprehensive testing programmes.
                  </p>
                  <p className="text-gray-300 text-xs">
                    Typical frequency: 6-monthly for cleaning equipment, 3-monthly for power tools, annual for office equipment.
                  </p>
                </div>
              </div>

              <div className="bg-teal-900/20 border border-teal-500/30 p-4 rounded-lg">
                <h4 className="text-teal-400 font-semibold mb-2">Specialised Industry Considerations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-medium mb-2">High-Risk Environments:</p>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• Chemical plants - increased corrosion risk</li>
                      <li>• Marine environments - salt spray and humidity</li>
                      <li>• Mining operations - dust and mechanical stress</li>
                      <li>• Food processing - wash-down and chemicals</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Special Requirements:</p>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• ATEX zones - explosion-proof equipment</li>
                      <li>• Clean rooms - ESD and contamination control</li>
                      <li>• Outdoor events - weather protection and earthing</li>
                      <li>• Hire equipment - enhanced testing regimes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Case */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                The Business Case for PAT Testing - ROI and Cost-Benefit Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-3">Return on Investment - Quantifiable Benefits:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-medium mb-2">Direct Cost Savings:</p>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• Reduced insurance premiums (up to 15% discount)</li>
                      <li>• Prevention of business interruption costs</li>
                      <li>• Extended equipment life through early maintenance</li>
                      <li>• Reduced emergency repair costs</li>
                      <li>• Avoided regulatory fines and penalties</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Risk Mitigation Value:</p>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• Personal injury claim prevention</li>
                      <li>• Property damage limitation</li>
                      <li>• Reputation protection and brand value</li>
                      <li>• Director and officer liability protection</li>
                      <li>• Regulatory compliance assurance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Cost-Benefit Example - 200 Employee Office:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-medium">Annual PAT Testing Cost:</p>
                    <p className="text-yellow-400 font-bold">£2,500</p>
                    <p className="text-sm text-white">500 items @ £5 each average</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Potential Incident Cost:</p>
                    <p className="text-red-400 font-bold">£150,000+</p>
                    <p className="text-sm text-white">HSE fine, claims, business disruption</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">ROI Ratio:</p>
                    <p className="text-green-400 font-bold">60:1</p>
                    <p className="text-sm text-white">£150k saved per £2.5k invested</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-yellow-400">
                Test Your Knowledge - 10 Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-6">
                Complete this comprehensive quiz to test your understanding of PAT testing fundamentals. The quiz covers all key concepts including definitions, risk management, industry applications, and business benefits.
              </p>
              {renderQuiz()}
            </CardContent>
          </Card>

          {/* Next Section Button */}
          <div className="flex justify-end">
            <Link to="../pat-testing-module-1-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next: Legal Duties (EAWR, PUWER, H&S at Work Act)
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule1Section1;