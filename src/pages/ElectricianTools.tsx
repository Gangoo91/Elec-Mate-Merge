
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Wrench, Brain, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const ElectricianTools = () => {
  // Main tool categories
  const toolCategories = [
    {
      id: "project-management",
      title: "Project Management",
      description: "Organise and track your electrical projects efficiently",
      icon: <Wrench className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/project-management"
    },
    {
      id: "ai-tooling",
      title: "AI Tooling",
      description: "Leverage AI to enhance your electrical work productivity",
      icon: <Brain className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/ai-tooling"
    },
    {
      id: "calculations",
      title: "Calculations",
      description: "Essential calculators for electrical work and planning",
      icon: <Calculator className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/calculations"
    },
    {
      id: "admin",
      title: "Admin",
      description: "Manage your electrical business and documentation",
      icon: <Settings className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/admin"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Electrician Tools</h1>
        <p className="text-muted-foreground">
          Professional resources to enhance your efficiency in the field.
        </p>
      </div>

      {/* Main Tool Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {toolCategories.map((category) => (
          <Link to={category.link} key={category.id}>
            <Card className="h-full border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription className="mt-1">{category.description}</CardDescription>
                </div>
                <div className="flex items-center justify-center p-2">
                  {category.icon}
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-2 w-full rounded-full bg-elec-dark overflow-hidden">
                  <div className="h-full bg-elec-yellow rounded-full" style={{ width: "75%" }} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ElectricianTools;
