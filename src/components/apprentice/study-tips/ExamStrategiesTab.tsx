
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, BookOpen, Calculator, Zap, Building, FileText, Clock, CheckCircle } from "lucide-react";

const ExamStrategiesTab = () => {
  const examTypes = [
    {
      title: "18th Edition BS 7671",
      icon: BookOpen,
      color: "border-blue-500/20 bg-blue-500/10",
      iconColor: "text-blue-400",
      difficulty: "High",
      duration: "2 hours",
      passRate: "70%",
      strategies: [
        {
          strategy: "Master Part 4 - Protection for Safety",
          description: "This section is heavily tested and forms the foundation of electrical safety",
          tips: ["Learn Table 41.3 by heart", "Understand discrimination principles", "Practice shock protection scenarios"],
          priority: "Critical"
        },
        {
          strategy: "Cable Calculations Mastery",
          description: "Cable sizing appears in multiple question formats throughout the exam",
          tips: ["Practice current-carrying capacity daily", "Understand all derating factors", "Memorise correction factors table"],
          priority: "High"
        },
        {
          strategy: "Effective Reference Navigation",
          description: "Learn to navigate BS 7671 and On-Site Guide quickly and efficiently",
          tips: ["Practice finding regulations in under 30 seconds", "Use index efficiently", "Mark key pages with colour-coded tabs"],
          priority: "Essential"
        }
      ]
    },
    {
      title: "Level 3 Diploma Theory",
      icon: Calculator,
      color: "border-yellow-500/20 bg-yellow-500/10",
      iconColor: "text-yellow-400",
      difficulty: "Medium-High",
      duration: "1.5 hours",
      passRate: "75%",
      strategies: [
        {
          strategy: "AC Theory Foundation",
          description: "Build rock-solid understanding of AC fundamentals before complex topics",
          tips: ["Master RLC circuits completely", "Understand impedance thoroughly", "Practice resonance calculations daily"],
          priority: "Critical"
        },
        {
          strategy: "Three-Phase Power Systems",
          description: "Master the relationship between line and phase values in all configurations",
          tips: ["Practice star-delta conversions", "Understand power triangles", "Learn phasor diagram construction"],
          priority: "High"
        },
        {
          strategy: "Formula Application Strategy",
          description: "Focus on understanding concepts rather than memorising formulas",
          tips: ["Draw circuit diagrams for every problem", "Work through formula derivations", "Connect theory to practical work experience"],
          priority: "Essential"
        }
      ]
    },
    {
      title: "AM2 Practical Assessment",
      icon: Zap,
      color: "border-green-500/20 bg-green-500/10",
      iconColor: "text-green-400",
      difficulty: "High",
      duration: "5.5 hours",
      passRate: "85%",
      strategies: [
        {
          strategy: "Time Management Excellence",
          description: "Develop a systematic approach to complete all tasks within time limits",
          tips: ["Practice complete mock assessments", "Time each individual task", "Build in buffer time for complex circuits"],
          priority: "Critical"
        },
        {
          strategy: "Methodical Testing Approach",
          description: "Follow BS 7671 testing sequence religiously for consistent results",
          tips: ["Memorise testing sequence", "Practice with different MFT models", "Document results clearly and legibly"],
          priority: "High"
        },
        {
          strategy: "Installation Quality Focus",
          description: "Ensure all installation work meets current standards and regulations",
          tips: ["Check cable routes and supports", "Verify termination quality", "Ensure compliance with current regs"],
          priority: "Essential"
        }
      ]
    },
    {
      title: "Level 2 Fundamentals",
      icon: Building,
      color: "border-purple-500/20 bg-purple-500/10",
      iconColor: "text-purple-400",
      difficulty: "Medium",
      duration: "1.5 hours",
      passRate: "80%",
      strategies: [
        {
          strategy: "Basic Electrical Principles",
          description: "Ensure solid foundation in Ohm's Law and basic circuit analysis",
          tips: ["Practice V=IR calculations daily", "Understand series vs parallel circuits", "Master power calculations"],
          priority: "Critical"
        },
        {
          strategy: "Safe Working Practices",
          description: "Demonstrate comprehensive understanding of electrical safety",
          tips: ["Know PPE requirements", "Understand isolation procedures", "Learn risk assessment basics"],
          priority: "High"
        }
      ]
    },
    {
      title: "Inspection & Testing (2391)",
      icon: FileText,
      color: "border-cyan-500/20 bg-cyan-500/10",
      iconColor: "text-cyan-400",
      difficulty: "High",
      duration: "3 hours",
      passRate: "65%",
      strategies: [
        {
          strategy: "Test Equipment Mastery",
          description: "Know all test equipment functions and limitations thoroughly",
          tips: ["Understand MFT capabilities", "Know test voltage requirements", "Practice equipment setup procedures"],
          priority: "Critical"
        },
        {
          strategy: "Fault Finding Methodology",
          description: "Develop systematic approach to identifying and documenting faults",
          tips: ["Follow logical test sequence", "Document findings clearly", "Understand code classifications"],
          priority: "High"
        }
      ]
    }
  ];

  const examTechniques = [
    {
      technique: "Pre-Exam Preparation",
      description: "Optimise your readiness before entering the exam room",
      steps: [
        "Arrive 15 minutes early to settle nerves",
        "Bring spare calculators and writing materials",
        "Review key formulas one final time",
        "Practice breathing exercises to stay calm"
      ],
      timeframe: "Day of exam"
    },
    {
      technique: "Question Analysis Strategy",
      description: "Read questions carefully and identify exactly what's being asked",
      steps: [
        "Read each question twice before starting",
        "Highlight key information and requirements", 
        "Identify the specific formula or method needed",
        "Check units required in the final answer"
      ],
      timeframe: "During exam"
    },
    {
      technique: "Time Allocation Method",
      description: "Manage your time effectively to complete all questions",
      steps: [
        "Allocate 1-2 minutes per mark as a guide",
        "Complete easier questions first to build confidence",
        "Return to difficult questions with remaining time",
        "Reserve final 10 minutes for checking answers"
      ],
      timeframe: "Throughout exam"
    },
    {
      technique: "Working Methodology",
      description: "Show clear working to maximise partial marks",
      steps: [
        "Write down the relevant formula first",
        "Show all substitution steps clearly",
        "Include units at each calculation stage",
        "Circle or highlight your final answer"
      ],
      timeframe: "For calculations"
    }
  ];

  const advancedStrategies = [
    {
      title: "Memory Palace Technique",
      description: "Use spatial memory to remember complex regulations and tables",
      application: "Ideal for BS 7671 regulation numbers and Table 41.3 values"
    },
    {
      title: "Pattern Recognition",
      description: "Identify common question patterns and develop template solutions",
      application: "Effective for cable calculation and circuit design questions"
    },
    {
      title: "Stress Inoculation",
      description: "Practice under exam-like pressure to build resilience",
      application: "Take mock exams with strict time limits and distractions"
    },
    {
      title: "Interleaving Practice",
      description: "Mix different topic areas in study sessions rather than blocking",
      application: "Combine theory, calculations, and regulations in single sessions"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Reference Guide */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Quick Exam Success Formula</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-elec-yellow/20 rounded-lg">
              <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white mb-1">Preparation</h4>
              <p className="text-xs text-muted-foreground">3-6 months consistent study</p>
            </div>
            <div className="text-center p-4 border border-elec-yellow/20 rounded-lg">
              <BookOpen className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white mb-1">Practice</h4>
              <p className="text-xs text-muted-foreground">Daily mock questions</p>
            </div>
            <div className="text-center p-4 border border-elec-yellow/20 rounded-lg">
              <Target className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <h4 className="font-semibold text-white mb-1">Strategy</h4>
              <p className="text-xs text-muted-foreground">Exam-specific techniques</p>
            </div>
            <div className="text-center p-4 border border-elec-yellow/20 rounded-lg">
              <CheckCircle className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white mb-1">Success</h4>
              <p className="text-xs text-muted-foreground">Confident performance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exam-Specific Strategies */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Comprehensive Exam Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {examTypes.map((exam, index) => {
              const IconComponent = exam.icon;
              return (
                <div key={index} className={`border rounded-lg p-6 ${exam.color}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`h-6 w-6 ${exam.iconColor}`} />
                      <h3 className="text-xl font-semibold text-white">{exam.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs border-white/20">
                        {exam.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-white/20">
                        {exam.duration}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-white/20">
                        Pass: {exam.passRate}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {exam.strategies.map((strategy, strategyIndex) => (
                      <div key={strategyIndex} className="bg-black/20 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">{strategy.strategy}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              strategy.priority === 'Critical' ? 'border-red-400 text-red-400' :
                              strategy.priority === 'High' ? 'border-orange-400 text-orange-400' :
                              'border-blue-400 text-blue-400'
                            }`}
                          >
                            {strategy.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {strategy.tips.map((tip, tipIndex) => (
                            <Badge key={tipIndex} variant="outline" className="text-xs border-white/20">
                              {tip}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* General Exam Techniques */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Universal Exam Techniques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examTechniques.map((technique, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{technique.technique}</h4>
                  <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow">
                    {technique.timeframe}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{technique.description}</p>
                <ol className="space-y-1">
                  {technique.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow font-medium">{stepIndex + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Strategies */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400">Advanced Learning Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advancedStrategies.map((strategy, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{strategy.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <p className="text-xs text-purple-300">
                    <strong>Best for:</strong> {strategy.application}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold text-green-400 mb-2">Ready to Start Your Exam Success Journey?</h3>
          <p className="text-muted-foreground mb-4">
            Choose your target exam and begin with our tailored study plan and practice resources.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button variant="outline" className="border-green-500/30">
              18th Edition Practice
            </Button>
            <Button variant="outline" className="border-green-500/30">
              Level 3 Mock Exams
            </Button>
            <Button variant="outline" className="border-green-500/30">
              AM2 Preparation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamStrategiesTab;
