
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, MessageSquare, Users, Target, HelpCircle } from "lucide-react";
import ScenarioBasedTool from "./ScenarioBasedTool";
import CommunicationSimulator from "./CommunicationSimulator";
import RelationshipActivities from "./RelationshipActivities";

type ActiveTool = "scenarios" | "communication" | "relationships" | null;

const InteractiveToolsTab = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);

  const communicationTips = [
    {
      situation: "Asking for help",
      tip: "Be specific about what you need and acknowledge that you're learning",
      example: "Could you help me understand the correct procedure for X? I want to make sure I'm doing it properly."
    },
    {
      situation: "Reporting progress",
      tip: "Give clear, concise updates and mention any challenges early",
      example: "I've completed tasks A and B. Task C is taking longer than expected due to Y - should I continue or reassess?"
    },
    {
      situation: "Expressing concerns",
      tip: "Focus on the issue, not personalities, and suggest solutions where possible",
      example: "I'm concerned about X because of Y. Would it be possible to consider Z as an alternative?"
    }
  ];

  if (activeTool === "scenarios") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-elec-yellow">Scenario-Based Decision Making</h2>
          <Button variant="outline" onClick={() => setActiveTool(null)}>
            Back to Tools
          </Button>
        </div>
        <ScenarioBasedTool />
      </div>
    );
  }

  if (activeTool === "communication") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-elec-yellow">Communication Style Simulator</h2>
          <Button variant="outline" onClick={() => setActiveTool(null)}>
            Back to Tools
          </Button>
        </div>
        <CommunicationSimulator />
      </div>
    );
  }

  if (activeTool === "relationships") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-elec-yellow">Relationship Building Activities</h2>
          <Button variant="outline" onClick={() => setActiveTool(null)}>
            Back to Tools
          </Button>
        </div>
        <RelationshipActivities />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Learning Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Practice communication skills and decision-making through interactive scenarios, 
            simulations, and guided exercises designed to build confidence in workplace situations.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-elec-yellow/10">
                  <Target className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <CardTitle className="text-white text-lg">Scenario-Based Decision Making</CardTitle>
                  <p className="text-sm text-muted-foreground">Practice making decisions in realistic workplace scenarios</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setActiveTool("scenarios")}
                className="w-full"
              >
                Start Practice
              </Button>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-elec-yellow/10">
                  <MessageSquare className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <CardTitle className="text-white text-lg">Communication Style Simulator</CardTitle>
                  <p className="text-sm text-muted-foreground">Practice different communication approaches for various workplace situations</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setActiveTool("communication")}
                className="w-full"
              >
                Start Activity
              </Button>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-elec-yellow/10">
                  <Users className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <CardTitle className="text-white text-lg">Relationship Building Activities</CardTitle>
                  <p className="text-sm text-muted-foreground">Activities and exercises to improve workplace relationships</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setActiveTool("relationships")}
                className="w-full"
              >
                Start Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-green-500/20 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Quick Communication Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communicationTips.map((tip, index) => (
                <div key={index} className="border border-green-500/30 rounded-lg p-3">
                  <h4 className="font-medium text-white text-sm mb-2">{tip.situation}</h4>
                  <p className="text-xs text-green-300 mb-2">{tip.tip}</p>
                  <div className="bg-green-500/20 rounded p-2">
                    <p className="text-xs text-green-200 italic">"{tip.example}"</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveToolsTab;
