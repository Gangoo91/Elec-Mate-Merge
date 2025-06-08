
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wrench, Calculator, Ruler, Clipboard, Settings, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const ApprenticeOnJobTools = () => {
  const onJobTools = [
    {
      id: 1,
      title: "Cable Sizing Calculator",
      icon: <Calculator className="h-6 w-6 text-elec-yellow" />,
      description: "Calculate proper cable sizes for your installations",
      link: "/apprentice/tools/cable-sizing"
    },
    {
      id: 2,
      title: "Voltage Drop Calculator",
      icon: <Zap className="h-6 w-6 text-elec-yellow" />,
      description: "Calculate voltage drop across cable runs",
      link: "/apprentice/tools/voltage-drop"
    },
    {
      id: 3,
      title: "Load Calculations",
      icon: <Ruler className="h-6 w-6 text-elec-yellow" />,
      description: "Calculate electrical loads for circuits",
      link: "/apprentice/tools/load-calculations"
    },
    {
      id: 4,
      title: "Testing Procedures",
      icon: <Clipboard className="h-6 w-6 text-elec-yellow" />,
      description: "Step-by-step testing and inspection guides",
      link: "/apprentice/tools/testing-procedures"
    },
    {
      id: 5,
      title: "Installation Planner",
      icon: <Settings className="h-6 w-6 text-elec-yellow" />,
      description: "Plan your electrical installations efficiently",
      link: "/apprentice/tools/installation-planner"
    },
    {
      id: 6,
      title: "Circuit Designer",
      icon: <Wrench className="h-6 w-6 text-elec-yellow" />,
      description: "Design and document electrical circuits",
      link: "/apprentice/tools/circuit-designer"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">On the Job Tools</h1>
        <Link to="/apprentice/hub" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hub
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          Practical tools and calculators to help you with everyday electrical work on site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {onJobTools.map((tool) => (
          <Link to={tool.link} key={tool.id} className="focus:outline-none">
            <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer">
              <CardHeader className="flex flex-col items-center justify-center text-center">
                {tool.icon}
                <CardTitle className="text-xl mt-2">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  {tool.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="bg-amber-950/20 border border-amber-600/30 rounded-md p-4 mt-8">
        <p className="text-sm text-amber-200/90">
          <strong>Note:</strong> These tools are designed to supplement your learning and provide 
          quick calculations on site. Always verify calculations and follow proper procedures as 
          taught in your training programme.
        </p>
      </div>
    </div>
  );
};

export default ApprenticeOnJobTools;
