
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Zap, HardHat, TestTube } from "lucide-react";

const ToolsGuide = () => {
  const toolCategories = [
    {
      title: "Hand Tools",
      description: "Essential hand tools for electrical work",
      icon: <Wrench className="h-8 w-8 text-elec-yellow" />,
      items: ["Screwdrivers", "Pliers", "Wire Strippers", "Crimping Tools"]
    },
    {
      title: "Power Tools",
      description: "Electrical power tools for efficiency",
      icon: <Zap className="h-8 w-8 text-elec-yellow" />,
      items: ["Cordless Drills", "Angle Grinders", "Reciprocating Saws", "Cable Pullers"]
    },
    {
      title: "Testing Equipment",
      description: "Testing and measurement instruments",
      icon: <TestTube className="h-8 w-8 text-elec-yellow" />,
      items: ["Multimeters", "Insulation Testers", "PAT Testers", "Socket Testers"]
    },
    {
      title: "Safety Equipment",
      description: "Personal protective equipment",
      icon: <HardHat className="h-8 w-8 text-elec-yellow" />,
      items: ["Hard Hats", "Safety Glasses", "Insulated Gloves", "High-Vis Clothing"]
    }
  ];

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Tools Guide - Elec-Mate</title>
        <meta name="description" content="Essential tools and equipment for electrical work" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tools Guide</h1>
          <p className="text-muted-foreground">
            Essential tools and equipment for electrical work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {toolCategories.map((category, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {category.icon}
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center p-8">
          <p className="text-gray-400">Detailed tool guides and recommendations coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default ToolsGuide;
