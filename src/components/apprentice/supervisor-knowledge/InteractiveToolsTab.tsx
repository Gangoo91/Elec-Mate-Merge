
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, MessageSquare, Users, Target, HelpCircle, ArrowLeft } from "lucide-react";
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
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setActiveTool(null)}
            className="flex items-center gap-2 h-11 border-white/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/10 touch-manipulation active:scale-95 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
          <h2 className="text-xl font-bold text-white">Scenario-Based Decision Making</h2>
        </div>
        <ScenarioBasedTool />
      </div>
    );
  }

  if (activeTool === "communication") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setActiveTool(null)}
            className="flex items-center gap-2 h-11 border-white/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/10 touch-manipulation active:scale-95 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
          <h2 className="text-xl font-bold text-white">Communication Style Simulator</h2>
        </div>
        <CommunicationSimulator />
      </div>
    );
  }

  if (activeTool === "relationships") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setActiveTool(null)}
            className="flex items-center gap-2 h-11 border-white/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/10 touch-manipulation active:scale-95 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
          <h2 className="text-xl font-bold text-white">Relationship Building Activities</h2>
        </div>
        <RelationshipActivities />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Lightbulb className="h-6 w-6 text-elec-yellow" />
            </div>
            <CardTitle className="text-2xl text-white">Interactive Learning Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-white/70">
            Practice communication skills and decision-making through interactive scenarios,
            simulations, and guided exercises designed to build confidence in workplace situations.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tools Grid */}
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-orange-500/20 hover:border-orange-500/40 cursor-pointer transition-all overflow-hidden relative group" onClick={() => setActiveTool("scenarios")}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30">
                  <Target className="h-5 w-5 text-orange-400" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-white text-lg">Scenario-Based Decision Making</CardTitle>
                  <p className="text-sm text-white/60">Practice making decisions in realistic workplace scenarios</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <Button
                className="w-full h-11 bg-orange-500 hover:bg-orange-500/90 text-white touch-manipulation active:scale-95 transition-all"
              >
                Start Practice
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 hover:border-blue-500/40 cursor-pointer transition-all overflow-hidden relative group" onClick={() => setActiveTool("communication")}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-white text-lg">Communication Style Simulator</CardTitle>
                  <p className="text-sm text-white/60">Practice different communication approaches for various workplace situations</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <Button
                className="w-full h-11 bg-blue-500 hover:bg-blue-500/90 text-white touch-manipulation active:scale-95 transition-all"
              >
                Start Activity
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 hover:border-purple-500/40 cursor-pointer transition-all overflow-hidden relative group" onClick={() => setActiveTool("relationships")}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-white text-lg">Relationship Building Activities</CardTitle>
                  <p className="text-sm text-white/60">Activities and exercises to improve workplace relationships</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <Button
                className="w-full h-11 bg-purple-500 hover:bg-purple-500/90 text-white touch-manipulation active:scale-95 transition-all"
              >
                Start Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tips Card */}
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 overflow-hidden relative h-fit">
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                <HelpCircle className="h-5 w-5 text-green-400" />
              </div>
              Quick Communication Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="space-y-4">
              {communicationTips.map((tip, index) => (
                <div key={index} className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                  <h4 className="font-semibold text-white text-sm mb-2">{tip.situation}</h4>
                  <p className="text-sm text-white/60 mb-3">{tip.tip}</p>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-sm text-green-200 italic">"{tip.example}"</p>
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
