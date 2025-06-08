
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Play, CheckCircle, MessageSquare } from "lucide-react";
import { useState } from "react";

const InteractivePracticeTab = () => {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  const practiceScenarios = [
    {
      id: 1,
      title: "Client Meeting: Explaining Electrical Issues",
      difficulty: "Beginner",
      situation: "A homeowner is concerned about their electrical installation after a power cut. They're asking technical questions but seem worried about costs.",
      objectives: [
        "Explain the issue in simple terms",
        "Reassure the client about safety",
        "Provide clear next steps",
        "Be transparent about potential costs"
      ],
      tips: [
        "Use analogies to explain technical concepts",
        "Show empathy for their concerns",
        "Break down the process into steps",
        "Offer different solution options"
      ]
    },
    {
      id: 2,
      title: "Site Communication: Coordinating with Team",
      difficulty: "Intermediate",
      situation: "You're working on a commercial site with multiple trades. The plumber needs to know when you'll finish your first fix so they can start their work.",
      objectives: [
        "Give accurate time estimates",
        "Coordinate work schedules",
        "Share safety information",
        "Maintain professional relationships"
      ],
      tips: [
        "Be realistic with timelines",
        "Communicate any delays immediately",
        "Share relevant safety considerations",
        "Use clear, jargon-free language"
      ]
    },
    {
      id: 3,
      title: "Difficult Client: Managing Complaints",
      difficulty: "Advanced",
      situation: "A client is unhappy with the time a job is taking and is questioning your competence. They're demanding immediate solutions and threatening to leave negative reviews.",
      objectives: [
        "De-escalate the situation",
        "Address their concerns professionally",
        "Find a mutually acceptable solution",
        "Maintain your professional reputation"
      ],
      tips: [
        "Listen actively without defending immediately",
        "Acknowledge their frustration",
        "Explain the reasons for delays",
        "Offer concrete solutions with timelines"
      ]
    }
  ];

  const communicationExercises = [
    {
      exercise: "Technical Explanation Practice",
      description: "Practice explaining RCD operation to someone with no electrical knowledge",
      timeRequired: "10 minutes",
      materials: ["Mirror or recording device", "Notebook for feedback"]
    },
    {
      exercise: "Active Listening Drill",
      description: "Practice summarising and clarifying what someone has told you",
      timeRequired: "15 minutes", 
      materials: ["Study partner or family member", "Sample scenarios"]
    },
    {
      exercise: "Difficult Conversation Role-Play",
      description: "Practice handling challenging client interactions",
      timeRequired: "20 minutes",
      materials: ["Role-play partner", "Scenario cards"]
    }
  ];

  const handleScenarioComplete = (scenarioId: number) => {
    if (!completedScenarios.includes(scenarioId)) {
      setCompletedScenarios([...completedScenarios, scenarioId]);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Communication Scenarios</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {practiceScenarios.map((scenario) => (
              <div key={scenario.id} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white mb-1">{scenario.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={scenario.difficulty === "Beginner" ? "success" : scenario.difficulty === "Intermediate" ? "yellow" : "outline"}
                        className="text-xs"
                      >
                        {scenario.difficulty}
                      </Badge>
                      {completedScenarios.includes(scenario.id) && (
                        <Badge variant="success" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant={selectedScenario === scenario.id ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedScenario(selectedScenario === scenario.id ? null : scenario.id)}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    {selectedScenario === scenario.id ? "Hide" : "Start"}
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{scenario.situation}</p>

                {selectedScenario === scenario.id && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-elec-yellow/20">
                    <div>
                      <h4 className="font-medium text-white mb-2">Your Objectives:</h4>
                      <ul className="space-y-1">
                        {scenario.objectives.map((objective, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-white mb-2">Communication Tips:</h4>
                      <ul className="space-y-1">
                        {scenario.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleScenarioComplete(scenario.id)}
                        className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Communication Skills Exercises</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {communicationExercises.map((exercise, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">{exercise.exercise}</h3>
                <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-elec-yellow font-medium">Time:</span>
                    <span className="text-xs text-muted-foreground">{exercise.timeRequired}</span>
                  </div>
                  
                  <div>
                    <span className="text-xs text-elec-yellow font-medium">Materials needed:</span>
                    <ul className="mt-1 space-y-1">
                      {exercise.materials.map((material, materialIndex) => (
                        <li key={materialIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  <Play className="h-4 w-4 mr-1" />
                  Start Exercise
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300">Practice Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-white mb-2">Regular Practice</h4>
              <p>Set aside 15-20 minutes daily to practice communication scenarios. Consistency builds confidence and natural responses.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Record Yourself</h4>
              <p>Use your phone to record practice sessions. Listen back to identify areas for improvement in tone and clarity.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Get Feedback</h4>
              <p>Practice with colleagues, friends, or family. Ask for honest feedback on your communication style and effectiveness.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Real-World Application</h4>
              <p>Apply what you've practiced in real situations. Start with low-stakes conversations and build up to more complex interactions.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractivePracticeTab;
