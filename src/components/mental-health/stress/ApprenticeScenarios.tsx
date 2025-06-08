
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Lightbulb } from "lucide-react";

interface Scenario {
  id: number;
  title: string;
  situation: string;
  stressors: string[];
  strategies: string[];
  outcome: string;
  tags: string[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "First Week Overwhelm",
    situation: "You're on your first week at a new site. Everything seems complicated, you don't know anyone, and your supervisor keeps giving you tasks you've never done before.",
    stressors: ["Unknown environment", "New tasks", "Social anxiety", "Performance pressure"],
    strategies: [
      "Ask questions - everyone expects apprentices to need guidance",
      "Take notes of new processes and terminology",
      "Introduce yourself to team members during breaks",
      "Focus on one task at a time rather than worrying about everything",
      "Remember that feeling overwhelmed initially is completely normal"
    ],
    outcome: "By asking questions and taking notes, you build confidence and relationships. Your supervisor appreciates your eagerness to learn properly rather than guessing.",
    tags: ["First Day", "Learning", "Social"]
  },
  {
    id: 2,
    title: "College Assignment Deadline Pressure",
    situation: "You have a major assignment due next week, but this week at work has been particularly demanding with overtime. You're exhausted and haven't started the coursework.",
    stressors: ["Time pressure", "Fatigue", "Competing priorities", "Academic performance anxiety"],
    strategies: [
      "Speak to your college tutor about your situation - they often provide extensions",
      "Break the assignment into smaller, manageable chunks",
      "Use your commute time for reading or planning",
      "Ask fellow apprentices if they want to form a study group",
      "Negotiate with your supervisor about reducing overtime this week if possible"
    ],
    outcome: "Your tutor provides a 3-day extension and offers additional support. You complete the work in smaller sessions and feel more confident about future assignments.",
    tags: ["College", "Time Management", "Communication"]
  },
  {
    id: 3,
    title: "Making a Costly Mistake",
    situation: "You've wired a circuit incorrectly, and it's only discovered when testing begins. This delays the project and requires rewiring. Your supervisor is frustrated, and you feel like you've let everyone down.",
    stressors: ["Guilt and shame", "Financial implications", "Team disappointment", "Confidence loss"],
    strategies: [
      "Acknowledge the mistake honestly and take responsibility",
      "Focus on learning from the error rather than dwelling on it",
      "Ask to observe the correction process to understand what went wrong",
      "Document the lesson learned in your portfolio",
      "Remember that experienced electricians have all made similar mistakes"
    ],
    outcome: "Your honest approach is appreciated. Your supervisor uses it as a teaching moment for the whole team, and you gain valuable knowledge about common wiring errors.",
    tags: ["Mistakes", "Learning", "Responsibility"]
  },
  {
    id: 4,
    title: "Workplace Conflict",
    situation: "An experienced tradesman constantly criticises your work and makes sarcastic comments. Other apprentices have noticed, and you're starting to dread coming to work.",
    stressors: ["Workplace bullying", "Self-doubt", "Social tension", "Dread of work"],
    strategies: [
      "Document specific incidents with dates and witnesses",
      "Speak to your training provider's support team",
      "Address the behaviour directly but professionally if you feel safe doing so",
      "Build relationships with supportive colleagues",
      "Know that this behaviour is not acceptable and not your fault"
    ],
    outcome: "After reporting to your training provider, they intervene with the employer. The behaviour stops, and you learn valuable skills about workplace rights and conflict resolution.",
    tags: ["Conflict", "Support", "Rights"]
  }
];

const ApprenticeScenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Lightbulb className="h-6 w-6" />
          Real Apprentice Scenarios
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Learn from common situations and proven coping strategies
        </p>
      </CardHeader>
      <CardContent>
        {selectedScenario === null ? (
          <div className="space-y-3">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="border border-elec-yellow/20 rounded-lg p-4 hover:bg-elec-yellow/5 transition-colors cursor-pointer"
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white">{scenario.title}</h3>
                    <div className="flex flex-wrap gap-1">
                      {scenario.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-elec-yellow/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-elec-yellow" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {(() => {
              const scenario = scenarios.find(s => s.id === selectedScenario)!;
              return (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">{scenario.title}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedScenario(null)}
                        className="border-elec-yellow/20 hover:bg-elec-yellow/10"
                      >
                        Back to scenarios
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {scenario.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-elec-yellow/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-elec-yellow/20 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">The Situation</h4>
                      <p className="text-sm text-muted-foreground">{scenario.situation}</p>
                    </div>

                    <div className="border border-red-500/20 rounded-lg p-4 bg-red-500/5">
                      <h4 className="font-semibold text-white mb-2">Stress Factors</h4>
                      <ul className="space-y-1">
                        {scenario.stressors.map((stressor, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                            {stressor}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border border-green-500/20 rounded-lg p-4 bg-green-500/5">
                      <h4 className="font-semibold text-white mb-2">Effective Strategies</h4>
                      <ul className="space-y-2">
                        {scenario.strategies.map((strategy, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border border-elec-yellow/20 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Positive Outcome</h4>
                      <p className="text-sm text-muted-foreground">{scenario.outcome}</p>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApprenticeScenarios;
