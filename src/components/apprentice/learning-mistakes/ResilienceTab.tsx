
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Target, CheckCircle } from "lucide-react";

const ResilienceTab = () => {
  const resilienceSkills = [
    {
      skill: "Emotional Regulation",
      icon: Heart,
      description: "Managing emotional responses to mistakes",
      importance: 95,
      techniques: [
        {
          technique: "The Pause Method",
          description: "Take 3 deep breaths before reacting to a mistake",
          practice: "When you realize you've made an error, count to 10 before speaking or acting"
        },
        {
          technique: "Reframing Thoughts",
          description: "Change negative self-talk into learning opportunities",
          practice: "Instead of 'I'm stupid,' think 'This is a learning moment that will make me better'"
        },
        {
          technique: "Emotional Acknowledgment",
          description: "Accept that feeling frustrated or embarrassed is normal",
          practice: "Say 'It's normal to feel disappointed, but this doesn't define my abilities'"
        }
      ]
    },
    {
      skill: "Growth Mindset",
      icon: Brain,
      description: "Viewing mistakes as learning opportunities, not failures",
      importance: 90,
      techniques: [
        {
          technique: "The Learning Question",
          description: "Always ask 'What can I learn from this?'",
          practice: "After every mistake, write down one specific lesson learned"
        },
        {
          technique: "Progress Recognition",
          description: "Focus on how mistakes show you're pushing boundaries",
          practice: "Keep a record of mistakes that led to significant learning breakthroughs"
        },
        {
          technique: "Competence Building",
          description: "View each mistake as adding to your professional competence",
          practice: "Track how recovering from mistakes improves your problem-solving skills"
        }
      ]
    },
    {
      skill: "Professional Confidence",
      icon: Target,
      description: "Maintaining self-assurance while learning from errors",
      importance: 85,
      techniques: [
        {
          technique: "Competence Inventory",
          description: "Regularly list things you've learned and can do well",
          practice: "Weekly review of new skills gained and successful completions"
        },
        {
          technique: "Mentor Perspective",
          description: "Remember that experienced professionals made similar mistakes",
          practice: "Ask supervisors about mistakes they made as apprentices"
        },
        {
          technique: "Future Self Visualization",
          description: "Imagine how today's mistakes contribute to future expertise",
          practice: "Write a letter from your future qualified self thanking your apprentice self for learning"
        }
      ]
    }
  ];

  const resilienceBuilders = [
    {
      area: "Physical Resilience",
      practices: [
        "Get adequate sleep to maintain clear thinking",
        "Take proper breaks to avoid fatigue-related errors",
        "Maintain good nutrition for sustained concentration",
        "Exercise regularly to manage stress and build mental toughness"
      ]
    },
    {
      area: "Mental Resilience",
      practices: [
        "Practice mindfulness to stay present during challenges",
        "Develop problem-solving routines for consistent responses",
        "Use positive self-talk to maintain motivation",
        "Set realistic daily goals to build success momentum"
      ]
    },
    {
      area: "Social Resilience",
      practices: [
        "Build supportive relationships with fellow apprentices",
        "Communicate openly about challenges and mistakes",
        "Seek feedback regularly to normalize the learning process",
        "Offer support to others facing similar challenges"
      ]
    },
    {
      area: "Professional Resilience",
      practices: [
        "Maintain focus on long-term career goals",
        "Document progress to see improvement over time",
        "Celebrate small wins and learning milestones",
        "Stay curious about new techniques and technologies"
      ]
    }
  ];

  const stressManagement = [
    {
      trigger: "Making a Costly Mistake",
      symptoms: ["Anxiety about supervisor reaction", "Fear of repeating the error", "Self-doubt about abilities"],
      strategies: [
        "Focus on the lesson learned rather than the cost",
        "Remember that all apprentices make expensive mistakes",
        "Channel anxiety into more careful work practices",
        "Discuss the mistake openly to reduce shame"
      ]
    },
    {
      trigger: "Repeated Similar Mistakes",
      symptoms: ["Frustration with slow progress", "Questioning career choice", "Feeling overwhelmed"],
      strategies: [
        "Analyze the pattern to identify root causes",
        "Break down complex tasks into smaller steps",
        "Seek additional training on problem areas",
        "Celebrate other areas where you're improving"
      ]
    },
    {
      trigger: "Public Mistakes",
      symptoms: ["Embarrassment in front of colleagues", "Worried about reputation", "Avoiding challenging tasks"],
      strategies: [
        "Remember everyone makes mistakes publicly",
        "Use humour appropriately to defuse tension",
        "Focus on your response, not the mistake itself",
        "Continue taking on challenges to build confidence"
      ]
    }
  ];

  const confidenceBuilders = [
    "Every qualified electrician was once exactly where you are now",
    "Mistakes during apprenticeship are expected and factored into training",
    "Your questions and errors show you're thinking critically about the work",
    "The electrical trade values problem-solving ability over perfection",
    "Each mistake handled professionally builds your reputation",
    "Learning from errors is more valuable than avoiding them through inaction"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Core Resilience Skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {resilienceSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-elec-yellow" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{skill.skill}</h3>
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-elec-yellow font-medium">{skill.importance}% importance</div>
                      <Progress value={skill.importance} className="w-20 mt-1" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {skill.techniques.map((technique, techIndex) => (
                      <div key={techIndex} className="bg-black/20 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">{technique.technique}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{technique.description}</p>
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                          <h5 className="font-medium text-green-300 mb-1">Practice:</h5>
                          <p className="text-sm text-muted-foreground">{technique.practice}</p>
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

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Building Resilience</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resilienceBuilders.map((builder, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{builder.area}</h4>
                <ul className="space-y-2">
                  {builder.practices.map((practice, practiceIndex) => (
                    <li key={practiceIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Stress Management Strategies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {stressManagement.map((scenario, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{scenario.trigger}</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-orange-300 mb-2">Common Symptoms:</h5>
                    <ul className="space-y-1">
                      {scenario.symptoms.map((symptom, sIndex) => (
                        <li key={sIndex} className="text-sm text-muted-foreground">• {symptom}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Management Strategies:</h5>
                    <ul className="space-y-1">
                      {scenario.strategies.map((strategy, stIndex) => (
                        <li key={stIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                          {strategy}
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
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-300" />
            <CardTitle className="text-green-300">Confidence Building Reminders</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {confidenceBuilders.map((reminder, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-500/5 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{reminder}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResilienceTab;
