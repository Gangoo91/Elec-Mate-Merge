
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";
import { Link } from "react-router-dom";

const ApprenticeStudy = () => {
  const modules = [
    {
      id: 1,
      title: "Basic Electrical Theory",
      description: "Core concepts of voltage, current, and resistance",
      progress: 85,
    },
    {
      id: 2,
      title: "Safety Regulations",
      description: "Essential safety practices and regulatory requirements",
      progress: 70,
    },
    {
      id: 3,
      title: "Circuit Design",
      description: "Planning and implementing electrical circuits",
      progress: 40,
    },
    {
      id: 4,
      title: "Wiring Standards",
      description: "Industry-standard wiring techniques and requirements",
      progress: 20,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Centre</h1>
          <p className="text-muted-foreground">
            Access structured learning paths and study materials for electrical apprentices
          </p>
        </div>
        <Link to="/apprentice">
          <Button variant="outline">Back to Apprentice Hub</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Card key={module.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Book className="h-6 w-6 text-elec-yellow" />
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                </div>
                <span className="text-sm font-medium">{module.progress}%</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{module.description}</CardDescription>
              <div className="h-2 w-full bg-elec-dark rounded-full overflow-hidden">
                <div 
                  className="h-full bg-elec-yellow rounded-full" 
                  style={{ width: `${module.progress}%` }} 
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="default" size="sm">Continue</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApprenticeStudy;
