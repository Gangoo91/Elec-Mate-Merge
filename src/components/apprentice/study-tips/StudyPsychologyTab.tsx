
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Target, Zap, Shield, Lightbulb, TrendingUp, Clock } from "lucide-react";

const StudyPsychologyTab = () => {
  const psychologyTopics = [
    {
      title: "Cognitive Load Theory",
      icon: Brain,
      description: "Understanding how your brain processes information",
      content: [
        "Your working memory can only hold 7±2 pieces of information at once",
        "Break complex electrical concepts into smaller, manageable chunks",
        "Use visual aids and diagrams to reduce cognitive load",
        "Practice retrieval to move information from working to long-term memory"
      ],
      tips: [
        "Study one circuit type at a time before combining concepts",
        "Use mind maps to organise related electrical principles",
        "Take breaks every 25-30 minutes to prevent mental fatigue"
      ]
    },
    {
      title: "Growth Mindset",
      icon: TrendingUp,
      description: "Developing resilience and embracing challenges",
      content: [
        "Believe that electrical skills can be developed through effort and practice",
        "View mistakes as learning opportunities, not failures",
        "Embrace challenging problems as chances to grow",
        "Focus on the learning process rather than just outcomes"
      ],
      tips: [
        "Replace 'I can't do this' with 'I can't do this yet'",
        "Celebrate small improvements in understanding",
        "Seek feedback actively and use it constructively"
      ]
    },
    {
      title: "Motivation & Goal Setting",
      icon: Target,
      description: "Maintaining drive and direction in your studies",
      content: [
        "Set SMART goals for your electrical training",
        "Connect learning to your long-term career aspirations",
        "Use both intrinsic (personal satisfaction) and extrinsic (qualification) motivation",
        "Track progress to maintain momentum"
      ],
      tips: [
        "Break large goals (like passing 18th Edition) into weekly targets",
        "Visualise yourself as a qualified electrician",
        "Find study partners for accountability and support"
      ]
    },
    {
      title: "Memory Consolidation",
      icon: Lightbulb,
      description: "How memories form and strengthen over time",
      content: [
        "Sleep is crucial for converting short-term memories to long-term storage",
        "Spaced repetition is more effective than massed practice",
        "Active recall strengthens memory pathways",
        "Connecting new information to existing knowledge improves retention"
      ],
      tips: [
        "Review electrical regulations within 24 hours of first learning",
        "Test yourself regularly without looking at notes first",
        "Get 7-9 hours of sleep, especially before exams"
      ]
    }
  ];

  const techniques = [
    {
      title: "The Testing Effect",
      description: "Active recall is more powerful than passive re-reading",
      application: "Quiz yourself on electrical symbols before checking the answers"
    },
    {
      title: "Interleaving",
      description: "Mixing different types of problems improves learning",
      application: "Alternate between circuit calculations, safety procedures, and regulations"
    },
    {
      title: "Elaborative Interrogation",
      description: "Asking 'why' and 'how' deepens understanding",
      application: "Don't just memorise cable ratings - understand why they vary with installation method"
    },
    {
      title: "Dual Coding",
      description: "Using both visual and verbal information enhances memory",
      application: "Draw circuit diagrams while explaining the theory aloud"
    }
  ];

  const stressManagement = [
    {
      technique: "Box Breathing",
      description: "4-4-4-4 breathing pattern to reduce exam anxiety",
      when: "Before exams or when feeling overwhelmed"
    },
    {
      technique: "Progressive Muscle Relaxation",
      description: "Systematically tense and release muscle groups",
      when: "After long study sessions or before sleep"
    },
    {
      technique: "Positive Self-Talk",
      description: "Replace negative thoughts with constructive ones",
      when: "When facing difficult concepts or feeling discouraged"
    },
    {
      technique: "Mindfulness",
      description: "Stay present and focused during study sessions",
      when: "When your mind wanders or you feel distracted"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Psychology of Learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Understanding how your mind learns can dramatically improve your study effectiveness. 
            These evidence-based psychological principles will help you master electrical concepts more efficiently and retain information longer.
          </p>
        </CardContent>
      </Card>

      {/* Core Psychology Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {psychologyTopics.map((topic, index) => {
          const IconComponent = topic.icon;
          return (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow flex items-center gap-3">
                  <div className="p-2 bg-elec-yellow/10 rounded-lg">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  {topic.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-foreground">Key Principles:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {topic.content.map((point, pointIndex) => (
                        <li key={pointIndex}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-foreground">Practical Applications:</h4>
                    <ul className="text-sm text-green-400 space-y-1">
                      {topic.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>✓ {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Learning Techniques */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Evidence-Based Learning Techniques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techniques.map((technique, index) => (
              <div key={index} className="border border-muted/30 rounded-lg p-4 bg-background/30">
                <h4 className="font-medium text-foreground mb-2">{technique.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{technique.description}</p>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                  <p className="text-sm text-blue-300">
                    <strong>For Electrical Training:</strong> {technique.application}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stress Management */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Stress Management & Wellbeing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stressManagement.map((item, index) => (
              <div key={index} className="border border-muted/30 rounded-lg p-4 bg-background/30">
                <h4 className="font-medium text-foreground mb-2">{item.technique}</h4>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <Clock className="h-3 w-3" />
                  <span>{item.when}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            The Psychology of Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Remember: Your mindset and approach to learning are just as important as the time you spend studying. 
            By understanding how your brain works and applying these psychological principles, you'll not only learn electrical concepts more effectively 
            but also develop the mental resilience needed for a successful career in the electrical industry. 
            Learning is a skill that can be improved with the right techniques and mindset.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyPsychologyTab;
