
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { Link } from "react-router-dom";

const ApprenticeAITools = () => {
  const aiTools = [
    {
      id: 1,
      title: "Circuit Assistant",
      description: "AI-powered circuit design validator and troubleshooter",
      status: "Available"
    },
    {
      id: 2,
      title: "Code Companion",
      description: "Get explanations of electrical code requirements and updates",
      status: "Available"
    },
    {
      id: 3,
      title: "Installation Guide",
      description: "Step-by-step AI guidance for complex electrical installations",
      status: "Beta Access"
    },
    {
      id: 4,
      title: "Exam Prep Bot",
      description: "Practice for your qualification exams with AI-generated questions",
      status: "Available"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Tooling</h1>
          <p className="text-muted-foreground">
            Leverage AI tools to enhance your learning and practical electrical skills
          </p>
        </div>
        <Link to="/apprentice">
          <Button variant="outline">Back to Apprentice Hub</Button>
        </Link>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-elec-yellow" />
            AI-Powered Learning
          </CardTitle>
          <CardDescription>
            These AI tools are designed specifically for electrical apprentices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Our AI tools provide instant feedback, personalized learning, and practical guidance
            to supplement your formal training and on-site experience.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiTools.map((tool) => (
          <Card key={tool.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  tool.status === "Available" 
                    ? "bg-green-500/20 text-green-400" 
                    : tool.status === "Beta Access"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}>
                  {tool.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              <Button className="w-full">Launch Tool</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApprenticeAITools;
