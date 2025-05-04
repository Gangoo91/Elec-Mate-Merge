
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Wrench, ShieldAlert, HardHat, ZapOff } from "lucide-react";

const ElectricalToolboxTalk = () => {
  const safetyTopics = [
    {
      id: 1,
      title: "Electrical Isolation Procedures",
      description: "Safe procedures for isolating electrical systems before work",
      urgency: "Critical"
    },
    {
      id: 2,
      title: "Electrical PPE Requirements",
      description: "Essential protective equipment for electrical work",
      urgency: "Critical"
    },
    {
      id: 3,
      title: "Arc Flash Safety",
      description: "Understanding and preventing arc flash incidents",
      urgency: "Important"
    },
    {
      id: 4,
      title: "Tool Inspection",
      description: "Proper inspection of electrical tools before use",
      urgency: "Standard"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Electrical Toolbox Talk</h1>
          <p className="text-muted-foreground">
            Essential safety information for professional electricians
          </p>
        </div>
        <Link to="/electrical-hub">
          <Button variant="outline">Back to Electrical Hub</Button>
        </Link>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-elec-yellow" />
            Safety First
          </CardTitle>
          <CardDescription>
            Review these electrical safety topics before starting any work
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            These toolbox talks are designed for professional electricians and contain
            critical safety information. Each topic includes printable resources and 
            reference materials.
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

export default ElectricalToolboxTalk;
