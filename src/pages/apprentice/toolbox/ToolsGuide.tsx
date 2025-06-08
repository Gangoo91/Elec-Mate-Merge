
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wrench, HardHat, Zap, Hammer } from "lucide-react";
import { Link } from "react-router-dom";

const ToolsGuide = () => {
  const toolCategories = [
    {
      title: "Basic Hand Tools",
      icon: Hammer,
      description: "Essential hand tools every apprentice needs",
      tools: ["Screwdrivers", "Pliers", "Wire strippers", "Side cutters", "Electrical tester"]
    },
    {
      title: "Testing Equipment",
      icon: Zap,
      description: "Instruments for testing electrical installations",
      tools: ["Multimeter", "Insulation tester", "RCD tester", "Loop impedance tester", "Voltage indicator"]
    },
    {
      title: "Safety Equipment",
      icon: HardHat,
      description: "Personal protective equipment for electrical work",
      tools: ["Safety boots", "Hard hat", "Safety glasses", "Insulated gloves", "High-vis vest"]
    },
    {
      title: "Power Tools",
      icon: Wrench,
      description: "Electric tools for efficient installation work",
      tools: ["Drill", "Angle grinder", "SDS drill", "Reciprocating saw", "Cable puller"]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tools & Materials Guide</h1>
          <p className="text-muted-foreground">Essential tools and equipment for electrical apprentices</p>
        </div>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {toolCategories.map((category, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-md bg-elec-yellow/10">
                  <category.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-elec-light/80">{category.description}</p>
              <ul className="space-y-2">
                {category.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    <span className="text-sm">{tool}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ToolsGuide;
