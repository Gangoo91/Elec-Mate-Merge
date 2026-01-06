import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Eye, HardHat, Zap, Users, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizResults from '@/components/upskilling/quiz/QuizResults';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

const Module2Section3 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);
  const [showResults, setShowResults] = useState(false);

  const quizQuestions: QuizQuestionType[] = [
    {
      id: 1,
      question: "What does PPE stand for in health and safety contexts?",
      options: [
        "Personal Protection Equipment",
        "Personal Protective Equipment", 
        "Professional Protection Equipment",
        "Public Protective Equipment"
      ],
      correctAnswer: 1,
      explanation: "PPE stands for Personal Protective Equipment - anything worn to reduce injury or exposure to hazards."
    },
    {
      id: 2,
      question: "Where does PPE sit in the hierarchy of controls?",
      options: [
        "First line of defence",
        "Second line of defence",
        "Third line of defence", 
        "Last line of defence"
      ],
      correctAnswer: 3,
      explanation: "PPE is the last line of defence in the hierarchy of controls, used when other control measures are not sufficient or practical."
    },
    {
      id: 3,
      question: "What class of insulated gloves are typically used for standard electrical work up to 1000V?",
      options: [
        "Class 00",
        "Class 0",
        "Class 1",
        "Class 2"
      ],
      correctAnswer: 1,
      explanation: "Class 0 insulated gloves are rated for 1000V and are commonly used for standard electrical work."
    },
    {
      id: 4,
      question: "How often should insulated gloves be tested for electrical integrity?",
      options: [
        "Every 3 months",
        "Every 6 months",
        "Every 12 months",
        "Only when damaged"
      ],
      correctAnswer: 1,
      explanation: "Insulated gloves must be tested every 6 months to ensure they maintain their electrical integrity and protection."
    },
    {
      id: 5,
      question: "What type of hard hat should be used for electrical work?",
      options: [
        "Class G (General)",
        "Class E (Electrical)",
        "Class C (Conductive)",
        "Any hard hat is suitable"
      ],
      correctAnswer: 1,
      explanation: "Class E (Electrical) hard hats are specifically designed for electrical work and provide dielectric protection."
    },
    {
      id: 6,
      question: "True or False: PPE can eliminate electrical hazards completely.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. PPE does not eliminate hazards - it only reduces the severity of injury if an incident occurs."
    },
    {
      id: 7,
      question: "What should always be worn over rubber insulated gloves?",
      options: [
        "Nothing additional required",
        "Leather protector gloves",
        "Cotton gloves",
        "Disposable gloves"
      ],
      correctAnswer: 1,
      explanation: "Leather protector gloves should always be worn over rubber insulated gloves to protect them from cuts, punctures, and wear."
    },
    {
      id: 8,
      question: "Under the PPE Regulations 1992, who is responsible for providing PPE?",
      options: [
        "The employee",
        "The client",
        "The employer or self-employed person",
        "The insurance company"
      ],
      correctAnswer: 2,
      explanation: "Under PPE Regulations 1992, employers (or self-employed persons) must provide, maintain, and ensure proper use of appropriate PPE."
    },
    {
      id: 9,
      question: "What is the main purpose of arc-rated clothing?",
      options: [
        "Protection from cuts and abrasions",
        "Protection from arc flash burns",
        "Protection from chemical splashes",
        "Protection from cold weather"
      ],
      correctAnswer: 1,
      explanation: "Arc-rated (AR) clothing is specifically designed to protect against burns from electrical arc flash incidents."
    },
    {
      id: 10,
      question: "What should you do if you discover damaged PPE?",
      options: [
        "Continue using it carefully",
        "Repair it yourself",
        "Report it and stop using it immediately",
        "Use it only for low-risk work"
      ],
      correctAnswer: 2,
      explanation: "Damaged PPE must be reported and taken out of service immediately as it may not provide adequate protection."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== undefined) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = selectedAnswer;
      setSelectedAnswers(newAnswers);
      
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(newAnswers[currentQuestion + 1]);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(selectedAnswers[currentQuestion - 1]);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setSelectedAnswer(undefined);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-2">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary" className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold">
              Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Personal Protective Equipment (PPE)
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Your last line of defence - understanding PPE selection, use and maintenance for electrical inspection and testing
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white leading-relaxed mb-4">
                Personal Protective Equipment (PPE) serves as your final barrier against electrical hazards when working 
                on inspection and testing activities. While proper isolation and safe working procedures are your primary 
                defences, PPE protects you when unexpected situations arise or when working near energised systems.
              </p>
              <p className="text-white leading-relaxed">
                This section covers the selection, use, maintenance, and legal requirements for PPE in electrical work, 
                ensuring you understand not just what to wear, but when, why, and how to use it effectively.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4">By the end of this section, you'll be able to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Identify the types of PPE relevant to electrical work and their specific applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Understand when each type of PPE is required and its limitations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Know the legal requirements for PPE provision and use under UK regulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Apply proper PPE selection criteria for different electrical testing scenarios</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Implement effective PPE maintenance and inspection procedures</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* What Is PPE */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                What Is PPE?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div>
                <h4 className="font-semibold text-elec-yellow mb-3">Definition and Purpose</h4>
                <p className="mb-3">
                  Personal Protective Equipment (PPE) is any equipment, appliance, or accessory designed to be worn 
                  or held by a person to protect against one or more health and safety hazards.
                </p>
                <div className="bg-red-900/20 border border-red-600/20 p-4 rounded-lg">
                  <p className="text-red-300 font-semibold mb-2">Critical Understanding:</p>
                  <p className="text-red-200 text-sm">
                    PPE does not eliminate the hazard - it protects you if other controls fail. It should always 
                    be used in conjunction with proper safety procedures, not as a replacement for them.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-elec-yellow mb-3">Hierarchy of Control</h4>
                <p className="mb-3">PPE is the last line of defence in the hierarchy of control:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-600/20 rounded-lg">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <p className="text-green-400 font-semibold">Elimination</p>
                      <p className="text-sm">Remove the hazard entirely (e.g., work on dead circuits)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-900/20 border border-blue-600/20 rounded-lg">
                    <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <p className="text-elec-yellow font-semibold">Substitution</p>
                      <p className="text-sm">Replace with something safer (e.g., lower voltage testing)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-900/20 border border-purple-600/20 rounded-lg">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <p className="text-purple-400 font-semibold">Engineering Controls</p>
                      <p className="text-sm">Physical safeguards (e.g., barriers, safety switches)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-900/20 border border-orange-600/20 rounded-lg">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                    <div>
                      <p className="text-orange-400 font-semibold">Administrative Controls</p>
                      <p className="text-sm">Procedures, training, warning signs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-600/20 rounded-lg">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                    <div>
                      <p className="text-red-400 font-semibold">Personal Protective Equipment</p>
                      <p className="text-sm">Last resort protection for the individual worker</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common PPE for Electrical Work */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <HardHat className="h-5 w-5 text-elec-yellow" />
                Essential PPE for Electrical Work
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-transparent/80 p-6 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Insulated Gloves
                  </h4>
                  <p className="text-sm text-white mb-3">Primary protection from electric shock</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-white font-medium text-sm">Classification System:</p>
                      <ul className="text-xs text-white space-y-1 ml-3">
                        <li>• Class 00: 500V AC / 750V DC</li>
                        <li>• Class 0: 1000V AC / 1500V DC</li>
                        <li>• Class 1: 7500V AC / 11250V DC</li>
                        <li>• Class 2: 17000V AC / 25500V DC</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Requirements:</p>
                      <ul className="text-xs text-white space-y-1 ml-3">
                        <li>• Must be tested every 6 months</li>
                        <li>• Always use leather protectors</li>
                        <li>• Check for cuts, punctures, ozone damage</li>
                        <li>• Store properly to prevent damage</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-6 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-3">Safety Footwear</h4>
                  <p className="text-sm text-white mb-3">Non-conductive soles reduce shock-to-earth paths</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-white font-medium text-sm">Features Required:</p>
                      <ul className="text-xs text-white space-y-1 ml-3">
                        <li>• Electrical hazard (EH) rated</li>
                        <li>• Composite or non-metallic construction</li>
                        <li>• Oil and slip-resistant soles</li>
                        <li>• Ankle support for rough terrain</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Maintenance:</p>
                      <ul className="text-xs text-white space-y-1 ml-3">
                        <li>• Keep clean and dry</li>
                        <li>• Inspect soles for wear</li>
                        <li>• Replace when insulation compromised</li>
                        <li>• Avoid conductive nail penetration</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-6 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-3">Arc-Rated Clothing</h4>
                  <p className="text-sm text-white mb-3">Protection against arc flash burns and ignition</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-white font-medium text-sm">Rating System:</p>
                      <ul className="text-xs text-white space-y-1 ml-3">
                        <li>• ATPV: Arc Thermal Performance Value</li>
                        <li>• CAL/cm²: Calories per square centimetre</li>
                        <li>• PPE Category levels 1-4</li>
                        <li>• Fabric weight and treatment type</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Important Notes:</p>
                      <ul className="text-xs text-white space-y-1 ml-3">
                        <li>• No synthetic underlayers</li>
                        <li>• Complete coverage required</li>
                        <li>• Regular inspection for damage</li>
                        <li>• Follow manufacturer washing instructions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-6 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Eye and Face Protection
                  </h4>
                  <p className="text-sm text-white mb-3">Protection from arc flash, debris, and chemical splash</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-white font-medium text-sm">Types Available:</p>
                      <ul className="text-xs text-white space-y-1 ml-3">
                        <li>• Safety glasses with side shields</li>
                        <li>• Face shields with arc rating</li>
                        <li>• Goggles for chemical protection</li>
                        <li>• Prescription safety glasses</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Selection Criteria:</p>
                      <ul className="text-xs text-white space-y-1 ml-3">
                        <li>• Impact resistance rating</li>
                        <li>• Anti-fog coating when needed</li>
                        <li>• UV protection for outdoor work</li>
                        <li>• Comfort and secure fit</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-6 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-3">Head Protection</h4>
                  <p className="text-sm text-white mb-3">Essential on commercial and industrial sites</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-white font-medium text-sm">Classification:</p>
                      <ul className="text-xs text-white space-y-1 ml-3">
                        <li>• Class E (Electrical): Up to 20,000V</li>
                        <li>• Class G (General): Up to 2,200V</li>
                        <li>• Class C (Conductive): No electrical protection</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Maintenance:</p>
                      <ul className="text-xs text-white space-y-1 ml-3">
                        <li>• Replace after impact</li>
                        <li>• Maximum 5-year service life</li>
                        <li>• Check suspension system</li>
                        <li>• Proper chin strap adjustment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-6 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-3">Hearing Protection</h4>
                  <p className="text-sm text-white mb-3">Required in high noise environments</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-white font-medium text-sm">Options:</p>
                      <ul className="text-xs text-white space-y-1 ml-3">
                        <li>• Disposable foam earplugs</li>
                        <li>• Reusable silicone plugs</li>
                        <li>• Over-ear muffs</li>
                        <li>• Electronic communication muffs</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Noise Reduction Rating:</p>
                      <ul className="text-xs text-white space-y-1 ml-3">
                        <li>• NRR values from 15-33 dB</li>
                        <li>• Consider communication needs</li>
                        <li>• Proper insertion technique critical</li>
                        <li>• Replace when dirty or damaged</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Framework */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-elec-yellow" />
                Legal Framework and Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div>
                <h4 className="font-semibold text-elec-yellow mb-3">PPE Regulations 1992</h4>
                <p className="mb-3">
                  Under PPE Regulations 1992 and the Health and Safety at Work Act 1974, specific duties apply:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-900/20 border border-blue-600/20 p-4 rounded-lg">
                    <h5 className="text-elec-yellow font-semibold mb-2">Employer Duties:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Provide suitable PPE free of charge</li>
                      <li>• Ensure PPE is properly maintained</li>
                      <li>• Provide adequate storage facilities</li>
                      <li>• Ensure PPE is used correctly</li>
                      <li>• Provide information, instruction and training</li>
                      <li>• Replace when damaged or worn out</li>
                    </ul>
                  </div>
                  <div className="bg-orange-900/20 border border-orange-600/20 p-4 rounded-lg">
                    <h5 className="text-orange-400 font-semibold mb-2">Employee Duties:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Use PPE as instructed and trained</li>
                      <li>• Take reasonable care of PPE</li>
                      <li>• Report defects or damage immediately</li>
                      <li>• Store PPE properly when not in use</li>
                      <li>• Attend training sessions when required</li>
                      <li>• Follow manufacturer's instructions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-elec-yellow mb-3">Assessment and Selection Requirements</h4>
                <p className="mb-3">PPE must be selected based on proper risk assessment:</p>
                <ul className="text-white space-y-2 text-sm">
                  <li>• Assessment of hazards present</li>
                  <li>• Evaluation of existing control measures</li>
                  <li>• Selection of appropriate PPE standards</li>
                  <li>• Consideration of user compatibility</li>
                  <li>• Assessment of environmental conditions</li>
                  <li>• Regular review and update of assessments</li>
                </ul>
              </div>

              <div className="bg-red-900/20 border border-red-600/20 p-4 rounded-lg">
                <h4 className="text-red-400 font-semibold mb-2">Enforcement and Penalties</h4>
                <div className="space-y-2">
                  <p className="text-red-200 text-sm">HSE enforcement powers include:</p>
                  <ul className="text-red-200 space-y-1 text-sm ml-4">
                    <li>• Improvement notices requiring compliance</li>
                    <li>• Prohibition notices stopping dangerous work</li>
                    <li>• Prosecution for serious breaches</li>
                    <li>• Fines up to £20,000 (Magistrates) or unlimited (Crown Court)</li>
                    <li>• Potential imprisonment for severe cases</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* When Is PPE Required */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                When Is PPE Required in Electrical Testing?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div>
                <h4 className="font-semibold text-elec-yellow mb-3">Risk-Based PPE Selection</h4>
                <p className="mb-3">PPE requirements depend on the specific risks present during testing activities:</p>
                
                <div className="space-y-4">
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">Dead Testing (Circuits Isolated)</h5>
                    <p className="text-white text-sm mb-2">Minimum PPE for routine dead testing:</p>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Safety glasses or protective eyewear</li>
                      <li>• Appropriate footwear with electrical hazard rating</li>
                      <li>• Work gloves for handling rough materials</li>
                      <li>• Hard hat if overhead hazards present</li>
                    </ul>
                  </div>

                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">Live Testing (Energised Systems)</h5>
                    <p className="text-white text-sm mb-2">Enhanced PPE for live testing work:</p>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Class 0 or appropriate voltage-rated insulated gloves with leather protectors</li>
                      <li>• Arc-rated clothing appropriate to fault energy levels</li>
                      <li>• Class E electrical hard hat</li>
                      <li>• Arc-rated face protection or shield</li>
                      <li>• Electrical hazard rated safety boots</li>
                      <li>• Hearing protection if required by noise assessment</li>
                    </ul>
                  </div>

                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">High-Risk Environments</h5>
                    <p className="text-white text-sm mb-2">Additional considerations for challenging environments:</p>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Respiratory protection in dusty or chemical environments</li>
                      <li>• High-visibility clothing in active work areas</li>
                      <li>• Fall protection equipment for elevated work</li>
                      <li>• Chemical-resistant gloves for cleaning agents</li>
                      <li>• Cut-resistant gloves for cable handling</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-elec-yellow mb-3">Specific Testing Scenarios</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-600/20 p-4 rounded-lg">
                    <h5 className="text-green-400 font-semibold mb-2">Continuity Testing</h5>
                    <ul className="text-green-200 space-y-1 text-sm">
                      <li>• Basic eye protection</li>
                      <li>• Work gloves for handling connections</li>
                      <li>• Knee protection for floor-level work</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-900/20 border border-elec-yellow/20 p-4 rounded-lg">
                    <h5 className="text-elec-yellow font-semibold mb-2">Insulation Testing</h5>
                    <ul className="text-yellow-200 space-y-1 text-sm">
                      <li>• Eye protection from high voltage indicators</li>
                      <li>• Insulated gloves when handling test leads</li>
                      <li>• Care with high test voltages</li>
                    </ul>
                  </div>
                  <div className="bg-orange-900/20 border border-orange-600/20 p-4 rounded-lg">
                    <h5 className="text-orange-400 font-semibold mb-2">Earth Fault Loop Testing</h5>
                    <ul className="text-orange-200 space-y-1 text-sm">
                      <li>• Full electrical PPE for live testing</li>
                      <li>• Arc-rated clothing for fault current tests</li>
                      <li>• Face protection for close work</li>
                    </ul>
                  </div>
                  <div className="bg-red-900/20 border border-red-600/20 p-4 rounded-lg">
                    <h5 className="text-red-400 font-semibold mb-2">RCD Testing</h5>
                    <ul className="text-red-200 space-y-1 text-sm">
                      <li>• Standard electrical PPE</li>
                      <li>• Ensure proper earthing of equipment</li>
                      <li>• Eye protection for close observation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PPE Limitations and Best Practices */}
          <Card className="bg-red-900/20 border-red-600/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                PPE Limitations and Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div>
                <h4 className="font-semibold text-red-400 mb-3">What PPE Cannot Do</h4>
                <div className="bg-red-900/30 p-4 rounded-lg">
                  <ul className="text-red-200 space-y-2 text-sm">
                    <li>• PPE doesn't prevent incidents - it reduces injury severity when they occur</li>
                    <li>• Cannot replace proper safe isolation and work procedures</li>
                    <li>• Won't protect against all electrical hazards or fault levels</li>
                    <li>• Effectiveness depends entirely on proper fit, condition, and use</li>
                    <li>• May provide false sense of security if relied upon exclusively</li>
                    <li>• Cannot compensate for inadequate training or poor judgement</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-elec-yellow mb-3">Essential Best Practices</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Selection and Use:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Always used alongside safe isolation and proper procedures</li>
                      <li>• Must fit properly and be suitable for the environment</li>
                      <li>• Check compatibility with other PPE being worn</li>
                      <li>• Follow manufacturer's instructions exactly</li>
                      <li>• Never modify or repair PPE yourself</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-2">Maintenance and Inspection:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Visual inspection before each use</li>
                      <li>• Regular formal inspections and testing</li>
                      <li>• Proper cleaning and storage procedures</li>
                      <li>• Immediate replacement when damaged</li>
                      <li>• Keep records of inspections and replacements</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-red-400 mb-3">Common PPE Failures</h4>
                <div className="bg-red-900/30 p-4 rounded-lg">
                  <ul className="text-red-200 space-y-1 text-sm">
                    <li>• Using damaged, expired, or inappropriate PPE</li>
                    <li>• Improper fit allowing exposure to hazards</li>
                    <li>• Failure to inspect PPE before use</li>
                    <li>• Mixing incompatible PPE types</li>
                    <li>• Inadequate training on proper use</li>
                    <li>• Using PPE as substitute for proper safety procedures</li>
                    <li>• Poor storage leading to contamination or damage</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Knowledge Checks */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Quick Knowledge Checks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What are the 5 levels in the hierarchy of controls?
                    </summary>
                    <div className="mt-3 text-white text-sm space-y-1">
                      <p>1. <strong>Elimination</strong> - Remove the hazard completely</p>
                      <p>2. <strong>Substitution</strong> - Replace with something less dangerous</p>
                      <p>3. <strong>Engineering Controls</strong> - Physical safeguards</p>
                      <p>4. <strong>Administrative Controls</strong> - Procedures and training</p>
                      <p>5. <strong>PPE</strong> - Personal protective equipment (last resort)</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      How often must insulated gloves be tested?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>Insulated gloves must be tested every <strong>6 months</strong> to ensure they maintain their electrical integrity and provide adequate protection.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What class of hard hat is required for electrical work?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p><strong>Class E (Electrical)</strong> hard hats should be used for electrical work as they provide dielectric protection up to 20,000V.</p>
                    </div>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <HardHat className="h-5 w-5 text-elec-yellow" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-blue-900/20 border border-blue-600/20 p-4 rounded-lg">
                <h4 className="text-elec-yellow font-semibold mb-2">Scenario: Industrial Motor Control Panel Testing</h4>
                <p className="text-blue-200 text-sm">
                  You're conducting periodic inspection and testing on a 400V motor control panel in a manufacturing facility. 
                  The panel controls critical production equipment and some tests must be performed live due to operational requirements.
                </p>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-3">PPE Selection Process:</h4>
                <div className="space-y-3">
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">1. Risk Assessment</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• 400V three-phase supply with high fault current potential</li>
                      <li>• Live testing required for earth fault loop impedance</li>
                      <li>• Confined working space inside panel</li>
                      <li>• Noisy industrial environment</li>
                      <li>• Other workers and mobile equipment nearby</li>
                    </ul>
                  </div>

                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">2. PPE Selected</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Class 0 insulated gloves with leather protectors</li>
                      <li>• Arc-rated coveralls (minimum 8 cal/cm²)</li>
                      <li>• Class E electrical hard hat</li>
                      <li>• Arc-rated face shield</li>
                      <li>• Electrical hazard rated safety boots</li>
                      <li>• Hearing protection (electronic communication type)</li>
                      <li>• High-visibility vest over arc-rated clothing</li>
                    </ul>
                  </div>

                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">3. Additional Precautions</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Coordinated with production to minimise personnel in area</li>
                      <li>• Established clear communication protocols</li>
                      <li>• Ensured all PPE was within test dates</li>
                      <li>• Checked PPE compatibility and fit</li>
                      <li>• Emergency procedures briefed to all personnel</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-600/20 p-4 rounded-lg">
                <p className="text-green-300 font-semibold">Outcome:</p>
                <p className="text-green-200 text-sm">
                  Testing completed safely with no incidents. The comprehensive PPE selection provided multiple layers 
                  of protection, and the systematic approach demonstrated professional competence to the client.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Can I use general work gloves instead of insulated gloves for electrical work?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p><strong>No.</strong> General work gloves provide no electrical protection. Insulated gloves must be properly rated, tested, and certified for electrical work.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Do I need arc-rated clothing for all electrical testing?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>Arc-rated clothing is required when there's a risk of arc flash. This includes live testing on systems with significant fault current potential. Dead testing typically doesn't require arc-rated clothing.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Who pays for PPE - the employer or employee?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>Under PPE Regulations 1992, employers must provide PPE free of charge. Self-employed persons are responsible for providing their own appropriate PPE.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      How do I know if my PPE is still safe to use?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>Inspect PPE before each use for damage, wear, or contamination. Follow manufacturer's testing schedules (e.g., 6 months for insulated gloves). Replace immediately if damaged or past expiry date.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Can I modify PPE to make it more comfortable?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p><strong>Never modify PPE.</strong> Any alteration can compromise its protective properties and void its certification. If PPE is uncomfortable, discuss alternatives with your supervisor or safety officer.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Is PPE required for simple domestic electrical testing?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>Yes, appropriate PPE should be used for all electrical work. Even domestic voltage can be lethal. Minimum requirements include safety glasses and appropriate footwear.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What should I do if I find damaged PPE on site?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>Remove it from service immediately, report it to the responsible person, and ensure it cannot be used accidentally. Never continue work without proper PPE protection.</p>
                    </div>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Exercises */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Practical Exercises</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Exercise 1: PPE Selection Matrix</h4>
                  <p className="text-white mb-3">
                    Create a PPE selection guide for different electrical testing scenarios.
                  </p>
                  <div className="bg-transparent/50 p-4 rounded-lg">
                    <p className="text-elec-yellow font-semibold mb-2">Your task:</p>
                    <ol className="text-white text-sm space-y-1 list-decimal list-inside">
                      <li>List different testing activities (continuity, insulation, live testing)</li>
                      <li>Identify hazards for each activity</li>
                      <li>Select appropriate PPE for each scenario</li>
                      <li>Justify your selections based on risk levels</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Exercise 2: PPE Inspection Checklist</h4>
                  <p className="text-white mb-3">
                    Develop a comprehensive inspection checklist for electrical PPE.
                  </p>
                  <div className="bg-transparent/50 p-4 rounded-lg">
                    <p className="text-elec-yellow font-semibold mb-2">Include:</p>
                    <ul className="text-white text-sm space-y-1 list-disc list-inside">
                      <li>Visual inspection criteria for each PPE type</li>
                      <li>Testing requirements and frequencies</li>
                      <li>Documentation and record-keeping</li>
                      <li>Actions to take when defects are found</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Exercise 3: Cost-Benefit Analysis</h4>
                  <p className="text-white mb-3">
                    Compare the costs of PPE against potential accident costs.
                  </p>
                  <div className="bg-transparent/50 p-4 rounded-lg">
                    <p className="text-elec-yellow font-semibold mb-2">Consider:</p>
                    <ul className="text-white text-sm space-y-1 list-disc list-inside">
                      <li>Initial PPE purchase costs</li>
                      <li>Ongoing maintenance and replacement costs</li>
                      <li>Potential accident costs (medical, legal, business disruption)</li>
                      <li>Insurance implications and premium reductions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-green-900/20 border-green-600/20">
            <CardHeader>
              <CardTitle className="text-green-400">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="list-disc list-inside space-y-2">
                <li>PPE is the last line of defence - use alongside proper safety procedures, not instead of them</li>
                <li>Selection must be based on proper risk assessment of specific hazards present</li>
                <li>Employers must provide suitable PPE free of charge; employees must use it correctly</li>
                <li>Regular inspection, testing, and maintenance are essential for effective protection</li>
                <li>Different electrical testing activities require different levels and types of PPE</li>
                <li>Training and competence in PPE use are as important as having the right equipment</li>
                <li>Never modify PPE or use damaged equipment - replacement is always the safer option</li>
                <li>Document inspections, training, and incidents to demonstrate compliance and improve safety</li>
              </ul>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Knowledge Check (10 Questions)</CardTitle>
            </CardHeader>
            <CardContent>
              {showResults ? (
                <QuizResults 
                  questions={quizQuestions} 
                  selectedAnswers={selectedAnswers} 
                  onRestart={restartQuiz}
                />
              ) : (
                <div className="space-y-6">
                  <QuizProgress 
                    currentQuestion={currentQuestion} 
                    totalQuestions={quizQuestions.length} 
                  />
                  
                  <QuizQuestion
                    question={quizQuestions[currentQuestion]}
                    selectedAnswer={selectedAnswer}
                    onAnswerSelect={handleAnswerSelect}
                  />

                  {selectedAnswer !== undefined && quizQuestions[currentQuestion].explanation && (
                    <Card className="bg-green-900/20 border-green-600/20">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-green-400 font-semibold text-sm mb-1">Explanation:</p>
                            <p className="text-green-200 text-sm">{quizQuestions[currentQuestion].explanation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <QuizNavigation
                    currentQuestion={currentQuestion}
                    totalQuestions={quizQuestions.length}
                    selectedAnswer={selectedAnswer}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    isLastQuestion={currentQuestion === quizQuestions.length - 1}
                  />
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Module2Section3;