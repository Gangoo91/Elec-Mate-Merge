
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Brain, Target, Clock, BookOpen, Users, Zap, CheckCircle } from "lucide-react";

const StudyFundamentalsTab = () => {
  const learningPrinciples = [
    {
      principle: "Active Learning",
      icon: Brain,
      description: "Engage with material rather than passively reading",
      techniques: ["Summarise in your own words", "Teach concepts to others", "Create mind maps", "Ask questions while reading"],
      effectiveness: 90,
      timeInvestment: "Same as passive, 3x results"
    },
    {
      principle: "Spaced Repetition",
      icon: Clock,
      description: "Review material at increasing intervals for long-term retention",
      techniques: ["Use flashcard apps", "Schedule regular reviews", "Increase intervals after success", "Focus on difficult concepts"],
      effectiveness: 85,
      timeInvestment: "20% of initial study time"
    },
    {
      principle: "Interleaving",
      icon: Zap,
      description: "Mix different topics in study sessions rather than blocking",
      techniques: ["Alternate between subjects", "Mix theory and practical", "Combine calculations with regulations", "Vary question types"],
      effectiveness: 80,
      timeInvestment: "No extra time needed"
    },
    {
      principle: "Elaborative Interrogation",
      icon: Target,
      description: "Ask 'why' and 'how' questions to deepen understanding",
      techniques: ["Explain why formulas work", "Connect concepts to real applications", "Question assumptions", "Explore relationships"],
      effectiveness: 75,
      timeInvestment: "15% additional time"
    },
    {
      principle: "Dual Coding",
      icon: BookOpen,
      description: "Combine visual and verbal information for better retention",
      techniques: ["Draw diagrams while reading", "Use visual mnemonics", "Create concept maps", "Watch demonstration videos"],
      effectiveness: 85,
      timeInvestment: "25% additional time"
    },
    {
      principle: "Distributed Practice",
      icon: Users,
      description: "Spread learning sessions over time rather than cramming",
      techniques: ["Study little and often", "Plan long-term schedules", "Review previous sessions", "Build consistent habits"],
      effectiveness: 95,
      timeInvestment: "Better time efficiency"
    }
  ];

  const studyEnvironment = [
    {
      factor: "Physical Environment",
      importance: "Critical",
      elements: [
        "Consistent study location with minimal distractions",
        "Good lighting - preferably natural light from the left",
        "Comfortable temperature (18-22°C optimal)",
        "Quiet space or consistent background noise",
        "Organised desk with all materials within reach"
      ]
    },
    {
      factor: "Digital Environment", 
      importance: "High",
      elements: [
        "Fast, reliable internet connection",
        "Multiple monitors if available for references",
        "PDF reader optimised for technical documents",
        "Note-taking app synced across devices",
        "Website blockers during focused study time"
      ]
    },
    {
      factor: "Mental Environment",
      importance: "Critical", 
      elements: [
        "Clear learning objectives for each session",
        "Positive mindset and growth mentality",
        "Stress management techniques ready",
        "Break schedule planned in advance",
        "Progress tracking system in place"
      ]
    },
    {
      factor: "Social Environment",
      importance: "Medium",
      elements: [
        "Family understanding of study commitments",
        "Study group or accountability partner",
        "Mentor or tutor for difficult concepts",
        "Workplace support for learning goals",
        "Online communities for motivation"
      ]
    }
  ];

  const studyTechniques = [
    {
      technique: "The Feynman Technique",
      description: "Explain concepts simply to identify knowledge gaps",
      steps: [
        "Choose a concept you want to understand",
        "Explain it in simple terms as if teaching a child",
        "Identify gaps where explanation breaks down",
        "Return to source material to fill gaps",
        "Repeat until explanation flows naturally"
      ],
      bestFor: "Complex electrical theory and regulations",
      timeRequired: "15-30 minutes per concept"
    },
    {
      technique: "Active Recall Testing",
      description: "Test yourself without looking at notes or answers",
      steps: [
        "Cover your notes after reading a section",
        "Write down everything you remember",
        "Check against original material",
        "Focus extra time on missed information",
        "Repeat at increasing intervals"
      ],
      bestFor: "Memorising regulations and formulas",
      timeRequired: "5-10 minutes per topic"
    },
    {
      technique: "Mind Mapping",
      description: "Visual representation of information and connections",
      steps: [
        "Start with main topic in the centre",
        "Add major branches for key subtopics",
        "Include formulas, examples, and regulations",
        "Use colours and symbols for categorisation",
        "Review and update map regularly"
      ],
      bestFor: "Understanding complex electrical systems",
      timeRequired: "20-45 minutes per map"
    },
    {
      technique: "Problem-Solution Pairing",
      description: "Connect every concept to real-world applications",
      steps: [
        "Learn the theoretical concept thoroughly",
        "Find or create practical examples",
        "Practice applying theory to solve problems",
        "Explain how theory relates to workplace",
        "Create your own example scenarios"
      ],
      bestFor: "Cable calculations and circuit design",
      timeRequired: "30-60 minutes per concept"
    }
  ];

  const motivationStrategies = [
    {
      strategy: "Goal Hierarchy",
      description: "Break long-term goals into manageable steps",
      implementation: "Set daily, weekly, monthly, and yearly learning objectives with clear success criteria"
    },
    {
      strategy: "Progress Visualisation",
      description: "Make learning progress visible and tangible",
      implementation: "Use progress bars, checklists, or charts to show advancement toward qualification"
    },
    {
      strategy: "Reward Systems",
      description: "Celebrate achievements to maintain motivation",
      implementation: "Set up small rewards for study milestones and bigger rewards for major achievements"
    },
    {
      strategy: "Social Accountability",
      description: "Share goals with others for external motivation",
      implementation: "Tell family, friends, or study partners about your commitments and progress"
    },
    {
      strategy: "Purpose Connection",
      description: "Connect daily study to long-term career vision",
      implementation: "Regularly remind yourself why you're pursuing electrical qualifications"
    },
    {
      strategy: "Habit Stacking",
      description: "Attach new study habits to existing routines",
      implementation: "Study immediately after established activities like morning coffee or lunch break"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Study Fundamentals: Building Strong Learning Foundations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Master the core principles of effective learning. These evidence-based fundamentals form the foundation 
            of successful study practices for electrical apprenticeships and beyond.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <Brain className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">6</p>
              <p className="text-xs text-muted-foreground">Key Principles</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">4</p>
              <p className="text-xs text-muted-foreground">Study Techniques</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <Clock className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <p className="text-lg font-bold text-white">30min</p>
              <p className="text-xs text-muted-foreground">Daily Minimum</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <CheckCircle className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">95%</p>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Principles */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400">Evidence-Based Learning Principles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {learningPrinciples.map((principle, index) => {
              const IconComponent = principle.icon;
              return (
                <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-6 w-6 text-blue-400" />
                      <h4 className="font-semibold text-white text-lg">{principle.principle}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-blue-400 font-medium">{principle.effectiveness}% effective</div>
                      <Progress value={principle.effectiveness} className="w-20 mt-1" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{principle.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-blue-300 mb-2">Implementation Techniques:</h5>
                      <ul className="space-y-1">
                        {principle.techniques.map((technique, techIndex) => (
                          <li key={techIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-blue-400 mt-1 flex-shrink-0" />
                            {technique}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                      <h5 className="font-medium text-blue-400 mb-1">Time Investment</h5>
                      <p className="text-sm text-muted-foreground">{principle.timeInvestment}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Study Environment */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Optimal Study Environment Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyEnvironment.map((env, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{env.factor}</h4>
                  <Badge variant="outline" className={`text-xs ${
                    env.importance === 'Critical' ? 'border-red-400 text-red-400' :
                    env.importance === 'High' ? 'border-orange-400 text-orange-400' :
                    'border-blue-400 text-blue-400'
                  }`}>
                    {env.importance}
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {env.elements.map((element, elementIndex) => (
                    <li key={elementIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Techniques */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Core Study Techniques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {studyTechniques.map((technique, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{technique.technique}</h4>
                    <p className="text-sm text-muted-foreground">{technique.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow">
                    {technique.timeRequired}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-elec-yellow mb-2">Step-by-Step Process:</h5>
                    <ol className="space-y-1">
                      {technique.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-elec-yellow font-medium">{stepIndex + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3">
                    <h5 className="font-medium text-elec-yellow mb-1">Best Used For:</h5>
                    <p className="text-sm text-muted-foreground">{technique.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motivation Strategies */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400">Maintaining Study Motivation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {motivationStrategies.map((strategy, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{strategy.strategy}</h4>
                <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                <div className="bg-purple-500/10 rounded-lg p-3">
                  <h5 className="font-medium text-purple-300 mb-1">How to Implement:</h5>
                  <p className="text-xs text-muted-foreground">{strategy.implementation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Schedule Template */}
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <CardHeader>
          <CardTitle className="text-orange-400">Foundational Study Schedule Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
              <div key={index} className="border border-orange-500/20 rounded-lg p-3">
                <h4 className="font-semibold text-white text-sm mb-2">{day}</h4>
                <div className="space-y-2">
                  {index < 5 ? (
                    // Weekdays
                    <>
                      <div className="text-xs text-muted-foreground">
                        <strong className="text-orange-400">6:30-7:00</strong><br/>
                        Quick review
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <strong className="text-orange-400">19:00-20:30</strong><br/>
                        Main study
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <strong className="text-orange-400">21:00-21:15</strong><br/>
                        Tomorrow prep
                      </div>
                    </>
                  ) : index === 5 ? (
                    // Saturday
                    <>
                      <div className="text-xs text-muted-foreground">
                        <strong className="text-orange-400">9:00-11:00</strong><br/>
                        Deep study
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <strong className="text-orange-400">14:00-15:00</strong><br/>
                        Practice tests
                      </div>
                    </>
                  ) : (
                    // Sunday
                    <>
                      <div className="text-xs text-muted-foreground">
                        <strong className="text-orange-400">10:00-11:00</strong><br/>
                        Week review
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <strong className="text-orange-400">15:00-16:00</strong><br/>
                        Next week plan
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyFundamentalsTab;
