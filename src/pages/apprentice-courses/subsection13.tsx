import { ArrowLeft, Target, BookOpen, Lightbulb, AlertCircle, CheckCircle, Shield, AlertTriangle, Settings, HardHat, Wrench, Users, Zap, Eye, Clock, Printer, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Control Measures and Hierarchy of Control - Module 1.3.4 | Level 2 Electrical Course";
const DESCRIPTION = "Master the hierarchy of control for electrical safety, learning to select the most effective control measures to protect workers and comply with BS 7671.";

const Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: 1,
      question: "What is the most effective form of risk control?",
      options: [
        "Personal Protective Equipment (PPE)",
        "Administrative controls",
        "Elimination of the hazard",
        "Engineering controls"
      ],
      correctIndex: 2,
      explanation: "Elimination is the most effective form of risk control because it completely removes the hazard, making an accident impossible."
    },
    {
      id: 2,
      question: "Why is PPE considered the least effective control measure?",
      options: [
        "It's too expensive",
        "It relies on the person wearing it correctly",
        "It's not required by law",
        "It's uncomfortable to wear"
      ],
      correctIndex: 1,
      explanation: "PPE is least effective because it relies on human behaviour and only reduces exposure rather than removing the hazard entirely."
    },
    {
      id: 3,
      question: "What does 'substitution' mean in the hierarchy of control?",
      options: [
        "Replacing workers with machines",
        "Using different tools for the same job",
        "Replacing a hazard with something less dangerous",
        "Changing the work schedule"
      ],
      correctIndex: 2,
      explanation: "Substitution means replacing a hazard with something less dangerous, such as using low-voltage equipment instead of mains voltage."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "In the hierarchy of control, which is the most effective method of risk control?",
      options: [
        "Personal Protective Equipment",
        "Engineering controls",
        "Elimination",
        "Administrative controls"
      ],
      correctAnswer: 2,
      explanation: "Elimination is the most effective because it completely removes the hazard, making accidents impossible. For example, isolating electrical power before work begins."
    },
    {
      id: 2,
      question: "Which of these is an example of substitution in electrical work?",
      options: [
        "Wearing insulated gloves",
        "Using battery-powered tools instead of mains-powered",
        "Installing barriers around equipment",
        "Training workers in safety procedures"
      ],
      correctAnswer: 1,
      explanation: "Using battery-powered tools instead of mains-powered tools is substitution - replacing a higher risk option with a lower risk alternative."
    },
    {
      id: 3,
      question: "What type of control measure is fitting guards around electrical panels?",
      options: [
        "Elimination",
        "Substitution",
        "Engineering control",
        "Administrative control"
      ],
      correctAnswer: 2,
      explanation: "Installing guards or barriers is an engineering control - it physically prevents contact with hazards without relying on human behaviour."
    },
    {
      id: 4,
      question: "Why should you try to avoid relying solely on PPE for protection?",
      options: [
        "It's the most expensive option",
        "It's not legally required",
        "It doesn't remove the hazard and relies on human behaviour",
        "It takes too long to put on"
      ],
      correctAnswer: 2,
      explanation: "PPE is the least reliable form of protection because the hazard remains present and protection depends on correct use by the individual."
    },
    {
      id: 5,
      question: "Which of these is an example of an administrative control?",
      options: [
        "Installing RCD protection",
        "Using rubber matting",
        "Implementing a permit-to-work system",
        "Wearing safety boots"
      ],
      correctAnswer: 2,
      explanation: "A permit-to-work system is an administrative control - it uses procedures and documentation to control how work is carried out."
    },
    {
      id: 6,
      question: "When selecting control measures, you should:",
      options: [
        "Always choose the cheapest option",
        "Start at the top of the hierarchy and work down",
        "Only use PPE",
        "Choose whatever is most convenient"
      ],
      correctAnswer: 1,
      explanation: "You should start at the top of the hierarchy (elimination) and work down, selecting the most effective controls that are reasonably practicable."
    },
    {
      id: 7,
      question: "What is the main weakness of administrative controls?",
      options: [
        "They are too expensive",
        "They rely on people following procedures correctly",
        "They are not legally valid",
        "They take too long to implement"
      ],
      correctAnswer: 1,
      explanation: "Administrative controls rely on people following procedures correctly and consistently, making them less reliable than physical controls."
    },
    {
      id: 8,
      question: "Which combination of controls is often most effective?",
      options: [
        "PPE only",
        "Administrative controls only",
        "Multiple types working together",
        "Engineering controls only"
      ],
      correctAnswer: 2,
      explanation: "Using multiple types of controls together (defence in depth) provides the best protection as if one control fails, others remain in place."
    },
    {
      id: 9,
      question: "What should you do if elimination of a hazard is not possible?",
      options: [
        "Move straight to PPE",
        "Consider substitution as the next best option",
        "Ignore the hazard",
        "Stop the work completely"
      ],
      correctAnswer: 1,
      explanation: "If elimination isn't possible, consider substitution - replacing the hazard with something less dangerous is the next most effective control."
    },
    {
      id: 10,
      question: "In electrical work, what would be an example of elimination?",
      options: [
        "Wearing insulated gloves",
        "Using a voltage detector",
        "Switching off and isolating the power supply",
        "Installing warning signs"
      ],
      correctAnswer: 2,
      explanation: "Switching off and isolating the power supply eliminates the electrical hazard completely, making it the most effective control measure."
    }
  ];

  const faqs = [
    {
      question: "Why is elimination not always possible in electrical work?",
      answer: "Some electrical work requires live testing for fault finding or system commissioning. However, elimination should always be the first consideration, and live work should only be done when absolutely necessary with proper precautions."
    },
    {
      question: "Can I use multiple control measures from different levels?",
      answer: "Yes, using multiple control measures is often the best approach. This is called 'defence in depth' - if one control fails, others are still in place to protect workers."
    },
    {
      question: "How do I decide which control measures are 'reasonably practicable'?",
      answer: "Consider the risk level, cost, technical feasibility, and time required. High-risk situations justify more expensive or complex controls. The courts expect greater efforts for serious risks."
    },
    {
      question: "What if workers don't want to use the control measures I've selected?",
      answer: "This highlights the importance of consulting workers and explaining the reasons for controls. Training, involvement in selection, and clear communication help improve compliance."
    },
    {
      question: "Are there legal requirements about which controls to use?",
      answer: "The Management of Health and Safety at Work Regulations require you to avoid risks where possible, evaluate unavoidable risks, and control them at source using the hierarchy of control principles."
    },
    {
      question: "How do I know if my control measures are working effectively?",
      answer: "Monitor compliance, check for near misses and accidents, get feedback from workers, and review control measures regularly. Look for signs that people are taking shortcuts or bypassing controls."
    },
    {
      question: "What's the difference between engineering and administrative controls?",
      answer: "Engineering controls physically prevent access to hazards (like guards or barriers), while administrative controls rely on procedures and training to control behaviour."
    },
    {
      question: "Should PPE always be provided even with other controls in place?",
      answer: "Yes, PPE often serves as backup protection. Even with other controls, PPE may be needed for residual risks or emergency situations. It's part of a comprehensive safety approach."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 3.4
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Control Measures and the Hierarchy of Control
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Ranking safety controls by effectiveness to choose the best protection for electrical work
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Hierarchy:</strong> Ranks controls from most to least effective protection.</li>
                <li><strong>Elimination:</strong> Most effective - completely removes the hazard.</li>
                <li><strong>PPE:</strong> Least effective - last resort protection method.</li>
                <li><strong>Selection:</strong> Start at the top and work down the hierarchy.</li>
                <li><strong>Combination:</strong> Multiple controls together provide best protection.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> High-risk tasks, over-reliance on PPE, new installations, live work requirements.</li>
                <li><strong>Use:</strong> Risk assessment planning, method statement creation, safety briefings.</li>
                <li><strong>Apply:</strong> Elimination first, substitution next, multiple controls together.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-muted-foreground mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Understand what control measures are and their purpose in electrical safety</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Know the five levels of the hierarchy of control and their effectiveness</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply the hierarchy to electrical safety scenarios and risk management</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Understand why PPE is the last line of defence in protection</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Select appropriate combinations of control measures for different situations</span>
            </li>
          </ul>
        </Card>

        {/* What Are Control Measures */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">What Are Control Measures?</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-elec-yellow/5 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                A control measure is anything you do to remove or reduce a hazard. The right control measures 
                reduce the likelihood of an accident and/or reduce the severity if something does go wrong.
              </p>
            </div>
            
            <p className="text-muted-foreground">
              In electrical work, control measures might include switching off the power, using insulated tools, 
              wearing protective equipment, or following specific procedures. The key is choosing the most 
              effective controls for each situation.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-elec-yellow" />
                  Electrical Safety Examples
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Isolating power before starting work</li>
                  <li>• Using battery tools instead of mains</li>
                  <li>• Installing RCD protection</li>
                  <li>• Proper earthing and bonding</li>
                </ul>
              </div>
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-elec-yellow" />
                  Physical Protection Examples
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Barriers around work areas</li>
                  <li>• Cable guards and covers</li>
                  <li>• Safety screens and enclosures</li>
                  <li>• Proper cable management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          id="control-measures-basic"
          question="What is the most effective form of risk control?"
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* The Hierarchy of Control */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">The Hierarchy of Control</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <p className="text-purple-800 dark:text-purple-200 font-medium">
                This is a system used to prioritise the safest and most effective ways to control risk. 
                Start at the top and work your way down.
              </p>
            </div>

            <div className="space-y-4">
              {/* Level 1 - Elimination */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-l-4 border-green-500 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <span className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">1</span>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-semibold text-green-700 dark:text-green-300 mb-2">Eliminate the Hazard</h4>
                    <p className="text-green-800 dark:text-green-200 mb-3">Completely remove the hazard so that harm is impossible.</p>
                    <div className="bg-green-200 dark:bg-green-800/50 rounded-lg p-3">
                      <p className="text-sm text-green-800 dark:text-green-200">
                        <strong>Electrical Example:</strong> Switch off and isolate the power supply before beginning work. 
                        If there's no electrical energy present, electrical shock is impossible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 2 - Substitution */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-l-4 border-elec-yellow rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <span className="bg-elec-yellow text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">2</span>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-semibold text-blue-700 dark:text-elec-yellow mb-2">Substitute the Hazard</h4>
                    <p className="text-blue-800 dark:text-blue-200 mb-3">Replace the hazard with something less dangerous.</p>
                    <div className="bg-blue-200 dark:bg-blue-800/50 rounded-lg p-3">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Electrical Example:</strong> Use 110V or battery-powered tools instead of 230V mains power, 
                        or use insulated tools instead of standard ones.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 3 - Engineering Controls */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30 border-l-4 border-elec-yellow rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <span className="bg-elec-yellow text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">3</span>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Engineering Controls</h4>
                    <p className="text-yellow-800 dark:text-yellow-200 mb-3">Use physical measures to prevent access to the hazard.</p>
                    <div className="bg-yellow-200 dark:bg-yellow-800/50 rounded-lg p-3">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Electrical Example:</strong> Install barriers, guards, or enclosures around electrical panels 
                        and live equipment to prevent accidental contact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 4 - Administrative Controls */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border-l-4 border-orange-500 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <span className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">4</span>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-semibold text-orange-700 dark:text-elec-yellow mb-2">Administrative Controls</h4>
                    <p className="text-orange-800 dark:text-orange-200 mb-3">Use procedures, training, and policies to control behaviour.</p>
                    <div className="bg-orange-200 dark:bg-orange-800/50 rounded-lg p-3">
                      <p className="text-sm text-orange-800 dark:text-orange-200">
                        <strong>Electrical Example:</strong> Permit-to-work systems, safety briefings, competency requirements, 
                        and limiting access to qualified personnel only.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 5 - PPE */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 border-l-4 border-red-500 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <span className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">5</span>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-semibold text-red-700 dark:text-elec-yellow mb-2">Personal Protective Equipment (PPE)</h4>
                    <p className="text-red-800 dark:text-red-200 mb-3">Protect the individual worker from harm.</p>
                    <div className="bg-red-200 dark:bg-red-800/50 rounded-lg p-3">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        <strong>Electrical Example:</strong> Insulated gloves, safety glasses, arc flash suits, 
                        insulated footwear, and hard hats for electrical work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          id="control-measures-ppe"
          question="Why is PPE considered the least effective control measure?"
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Why the Hierarchy Works */}
        <div className="mb-8 border-l-4 border-orange-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Why the Hierarchy Works</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">Most Effective (Top Levels)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Remove hazards completely</li>
                  <li>• Don't rely on human behaviour</li>
                  <li>• Protect everyone automatically</li>
                  <li>• Can't be easily bypassed</li>
                  <li>• Long-term protection</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-700 dark:text-yellow-300">Moderately Effective (Middle)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Provides physical barriers</li>
                  <li>• Uses systems and procedures</li>
                  <li>• Requires some human compliance</li>
                  <li>• Can be circumvented</li>
                  <li>• Needs maintenance and monitoring</li>
                </ul>
              </div>
              
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-elec-yellow">Least Effective (Bottom Level)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Hazard remains present</li>
                  <li>• Relies entirely on individual</li>
                  <li>• Can be forgotten or misused</li>
                  <li>• May fail when needed most</li>
                  <li>• Only protects the wearer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          id="control-measures-substitution"
          question="What does 'substitution' mean in the hierarchy of control?"
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Practical Application */}
        <div className="mb-8 border-l-4 border-purple-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Practical Application in Electrical Work</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Scenario: Installing a new circuit in an office building</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-300">Elimination:</p>
                    <p className="text-sm">Switch off and isolate all relevant circuits before starting work.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="font-medium text-blue-700 dark:text-elec-yellow">Substitution:</p>
                    <p className="text-sm">Use 110V tools instead of 230V where possible.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="font-medium text-yellow-700 dark:text-yellow-300">Engineering:</p>
                    <p className="text-sm">Install temporary barriers around the work area.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <div>
                    <p className="font-medium text-orange-700 dark:text-elec-yellow">Administrative:</p>
                    <p className="text-sm">Use a permit-to-work system and brief all workers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                  <div>
                    <p className="font-medium text-red-700 dark:text-elec-yellow">PPE:</p>
                    <p className="text-sm">Provide safety glasses, hard hats, and insulated footwear.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Defence in Depth */}
        <div className="mb-8 border-l-4 border-teal-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Defence in Depth</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The most effective approach often involves using multiple control measures together. 
              This is called "defence in depth" - if one control fails, others remain in place.
            </p>
            
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-purple-700 dark:text-elec-yellow">Example: Multiple Controls Working Together</h4>
              <p className="text-sm text-purple-800 dark:text-purple-200 mb-2">
                For electrical panel maintenance:
              </p>
              <ul className="text-sm space-y-1 text-purple-800 dark:text-purple-200">
                <li>• <strong>Isolation</strong> (Elimination) - Switch off and lock out the supply</li>
                <li>• <strong>Testing</strong> (Verification) - Prove the circuit is dead</li>
                <li>• <strong>Barriers</strong> (Engineering) - Install protective screens</li>
                <li>• <strong>Procedures</strong> (Administrative) - Follow lockout/tagout protocol</li>
                <li>• <strong>PPE</strong> (Personal) - Wear appropriate protective equipment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mb-8 border-l-4 border-red-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-elec-yellow" />
              Common Mistakes in Control Selection
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-elec-yellow">What NOT to Do</h4>
                <ul className="text-sm space-y-1">
                  <li>• Jumping straight to PPE without considering other options</li>
                  <li>• Relying on a single control measure</li>
                  <li>• Choosing convenient over effective controls</li>
                  <li>• Ignoring the hierarchy completely</li>
                  <li>• Not consulting with workers</li>
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">Best Practice Approach</h4>
                <ul className="text-sm space-y-1">
                  <li>• Always start at the top of the hierarchy</li>
                  <li>• Use multiple controls working together</li>
                  <li>• Consider the specific work situation</li>
                  <li>• Involve workers in control selection</li>
                  <li>• Review and improve controls regularly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 pb-4 last:border-b-0">
                <h4 className="font-semibold mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            Hierarchy of Control - Quick Reference
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-3">The Hierarchy (Most to Least Effective):</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                  <span>Elimination - Remove the hazard</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-elec-yellow text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                  <span>Substitution - Use safer alternative</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-elec-yellow text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                  <span>Engineering - Physical barriers/guards</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                  <span>Administrative - Procedures/training</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">5</span>
                  <span>PPE - Personal protective equipment</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Selection Guide:</h4>
              <ul className="space-y-1">
                <li>□ Can I eliminate the hazard completely?</li>
                <li>□ Can I use something less dangerous?</li>
                <li>□ Can I install physical protection?</li>
                <li>□ What procedures are needed?</li>
                <li>□ What PPE is required as backup?</li>
                <li>□ Am I using multiple controls together?</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Knowledge Check
          </h2>
          <Quiz questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Link to="../subsection12">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous: Method Statements
            </Button>
          </Link>
          <Link to="../subsection14">
            <Button className="flex items-center gap-2">
              Next: Permits to Work
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Section3_4;