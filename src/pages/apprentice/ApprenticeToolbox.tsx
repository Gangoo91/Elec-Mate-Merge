
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WrenchIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ApprenticeToolbox = () => {
  const safetyTopics = [
    {
      id: 1,
      title: "Working at Heights",
      description: "Essential safety practices when working on ladders and platforms",
      urgency: "Critical"
    },
    {
      id: 2,
      title: "Electrical Lockout/Tagout",
      description: "Proper procedures for isolating electrical systems",
      urgency: "Critical"
    },
    {
      id: 3,
      title: "Fire Safety on Site",
      description: "Fire prevention and response in electrical installations",
      urgency: "Important"
    },
    {
      id: 4,
      title: "PPE Requirements",
      description: "Personal protective equipment for electrical work",
      urgency: "Standard"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Toolbox Talk</h1>
          <p className="text-muted-foreground">
            Access practical guides and safety information for on-site work
          </p>
        </div>
        <Link to="/apprentice">
          <Button variant="outline">Back to Apprentice Hub</Button>
        </Link>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WrenchIcon className="h-5 w-5 text-elec-yellow" />
            Safety First
          </CardTitle>
          <CardDescription>
            Regular toolbox talks are essential for maintaining safety awareness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Review these key safety topics before starting work. Each topic includes 
            printable resources, checklists, and video demonstrations.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safetyTopics.map((topic) => (
          <Card key={topic.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{topic.title}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  topic.urgency === "Critical" 
                    ? "bg-red-500/20 text-red-400" 
                    : topic.urgency === "Important"
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-green-500/20 text-green-400"
                }`}>
                  {topic.urgency}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{topic.description}</p>
              <div className="flex gap-2">
                <Button className="flex-1">View Guide</Button>
                <Button variant="outline" className="flex-1">Download PDF</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApprenticeToolbox;
