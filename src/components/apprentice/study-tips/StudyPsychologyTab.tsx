
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Target, TrendingUp } from "lucide-react";

const StudyPsychologyTab = () => {
  const mentalStrategies = [
    {
      strategy: "Growth Mindset Development",
      icon: TrendingUp,
      description: "Believe that abilities can be developed through dedication and hard work",
      elecMateSupport: [
        "Progress tracking shows improvement over time",
        "Achievement badges celebrate learning milestones",
        "Community success stories inspire growth",
        "Difficulty adjustment maintains optimal challenge"
      ],
      techniques: [
        "View mistakes as learning opportunities",
        "Focus on effort and strategy, not just results",
        "Use Elec-Mate's progress analytics for motivation",
        "Celebrate small wins and incremental improvement"
      ]
    },
    {
      strategy: "Confidence Building",
      icon: Target,
      description: "Build self-efficacy through structured success experiences",
      elecMateSupport: [
        "Adaptive difficulty ensures achievable challenges",
        "Immediate feedback builds competence",
        "Peer comparison features show relative progress",
        "Mentor connections provide expert validation"
      ],
      techniques: [
        "Start with easier concepts to build momentum",
        "Use Elec-Mate's confidence tracking features",
        "Share achievements with study partners",
        "Reflect on progress made rather than distance remaining"
      ]
    },
    {
      strategy: "Stress Management",
      icon: Heart,
      description: "Maintain emotional well-being during intensive study periods",
      elecMateSupport: [
        "Stress level monitoring in study analytics",
        "Guided relaxation and mindfulness features",
        "Community support for emotional challenges",
        "Flexible scheduling accommodates life balance"
      ],
      techniques: [
        "Use Elec-Mate's built-in break reminders",
        "Practice deep breathing between study sessions",
        "Connect with peers for emotional support",
        "Maintain perspective on long-term goals"
      ]
    },
    {
      strategy: "Motivation Maintenance",
      icon: Brain,
      description: "Sustain drive and enthusiasm throughout the learning journey",
      elecMateSupport: [
        "Gamification elements make learning engaging",
        "Personal goal setting and tracking tools",
        "Community challenges and competitions",
        "Real-world application examples"
      ],
      techniques: [
        "Set specific, measurable goals in Elec-Mate",
        "Connect learning to career aspirations",
        "Use social features for accountability",
        "Reward yourself for achieving milestones"
      ]
    }
  ];

  const examPsychology = [
    {
      phase: "Pre-Exam (Weeks Before)",
      mindset: "Preparation and Planning",
      strategies: [
        "Use Elec-Mate's exam readiness assessments",
        "Visualise successful exam performance",
        "Establish consistent sleep and study routines",
        "Practice with Elec-Mate's timed mock exams"
      ],
      elecMateTools: [
        "Personalised revision schedules",
        "Weakness identification algorithms",
        "Mock exam simulations",
        "Study progress analytics"
      ]
    },
    {
      phase: "Pre-Exam (Days Before)",
      mindset: "Confidence and Calm",
      strategies: [
        "Focus on review rather than new learning",
        "Use Elec-Mate's quick revision tools",
        "Practice relaxation techniques",
        "Trust in your preparation"
      ],
      elecMateTools: [
        "Quick reference summaries",
        "Last-minute revision quizzes",
        "Confidence tracking metrics",
        "Relaxation and mindfulness guides"
      ]
    },
    {
      phase: "Exam Day",
      mindset: "Focus and Performance",
      strategies: [
        "Arrive early and settle in calmly",
        "Use learned breathing techniques",
        "Trust your training and Elec-Mate preparation",
        "Read questions carefully and manage time"
      ],
      elecMateTools: [
        "Pre-downloaded reference materials",
        "Offline practice mode for final review",
        "Time management strategies learned",
        "Confidence from comprehensive preparation"
      ]
    },
    {
      phase: "Post-Exam",
      mindset: "Reflection and Growth",
      strategies: [
        "Reflect on what worked well",
        "Identify areas for future improvement",
        "Share experience with Elec-Mate community",
        "Plan next steps in learning journey"
      ],
      elecMateTools: [
        "Performance analysis tools",
        "Community discussion forums",
        "Next steps recommendations",
        "Continuous learning pathways"
      ]
    }
  ];

  const psychologicalBarriers = [
    {
      barrier: "Imposter Syndrome",
      description: "Feeling like you don't belong or aren't capable",
      symptoms: ["Doubting your abilities", "Fear of being 'found out'", "Attributing success to luck"],
      solutions: [
        "Track objective progress in Elec-Mate",
        "Connect with peers facing similar challenges", 
        "Focus on learning rather than performance",
        "Celebrate small achievements regularly"
      ]
    },
    {
      barrier: "Perfectionism",
      description: "Setting unrealistically high standards that hinder progress",
      symptoms: ["Procrastination due to fear of failure", "Never feeling 'ready'", "Excessive self-criticism"],
      solutions: [
        "Use Elec-Mate's 'good enough' progress markers",
        "Set process goals rather than outcome goals",
        "Practice self-compassion techniques",
        "Embrace iterative learning approaches"
      ]
    },
    {
      barrier: "Analysis Paralysis",
      description: "Overthinking and inability to make decisions or take action",
      symptoms: ["Endless planning without action", "Comparing too many options", "Fear of making wrong choices"],
      solutions: [
        "Follow Elec-Mate's structured learning paths",
        "Set time limits for decision-making",
        "Start with any reasonable option",
        "Trust the platform's algorithmic recommendations"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Mental Strategies for Learning Success</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mentalStrategies.map((strategy, index) => {
              const IconComponent = strategy.icon;
              return (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-elec-yellow" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{strategy.strategy}</h3>
                      <p className="text-sm text-muted-foreground">{strategy.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-white mb-2">Elec-Mate Support</h4>
                      <ul className="space-y-1">
                        {strategy.elecMateSupport.map((support, supportIndex) => (
                          <li key={supportIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                            {support}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-white mb-2">Practical Techniques</h4>
                      <ul className="space-y-1">
                        {strategy.techniques.map((technique, techIndex) => (
                          <li key={techIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            {technique}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Exam Psychology & Mental Preparation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {examPsychology.map((phase, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-white">{phase.phase}</h3>
                  <p className="text-sm text-elec-yellow">{phase.mindset}</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-white mb-2 text-sm">Strategies</h4>
                    <ul className="space-y-1">
                      {phase.strategies.map((strategy, stratIndex) => (
                        <li key={stratIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-2 text-sm">Elec-Mate Tools</h4>
                    <ul className="space-y-1">
                      {phase.elecMateTools.map((tool, toolIndex) => (
                        <li key={toolIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Overcoming Common Psychological Barriers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {psychologicalBarriers.map((barrier, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-white mb-1">{barrier.barrier}</h3>
                  <p className="text-sm text-muted-foreground">{barrier.description}</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-white mb-2 text-sm">Warning Signs</h4>
                    <div className="flex flex-wrap gap-1">
                      {barrier.symptoms.map((symptom, sympIndex) => (
                        <Badge key={sympIndex} variant="outline" className="text-xs border-red-500/30 text-red-400">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-2 text-sm">Solutions with Elec-Mate</h4>
                    <ul className="space-y-1">
                      {barrier.solutions.map((solution, solIndex) => (
                        <li key={solIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300">Building Mental Resilience with Elec-Mate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-white mb-2">Daily Mental Practices</h4>
              <p>Use Elec-Mate's mindfulness features, set daily intentions, practice gratitude for progress made, and maintain a growth mindset journal within the platform.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Community Support</h4>
              <p>Engage with Elec-Mate's supportive community, share challenges and victories, learn from others' experiences, and build lasting study partnerships.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Long-term Perspective</h4>
              <p>Use Elec-Mate's career pathway tools to maintain focus on long-term goals, celebrate the journey not just destinations, and view challenges as character-building opportunities.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Professional Identity</h4>
              <p>Leverage Elec-Mate's industry connections to build your professional identity, engage with mentor networks, and develop confidence as an emerging electrical professional.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyPsychologyTab;
