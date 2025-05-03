
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ApprenticeMentalHealth = () => {
  const resources = [
    {
      id: 1,
      title: "Managing Workplace Stress",
      description: "Techniques for handling stress on job sites and during training",
      type: "Guide"
    },
    {
      id: 2,
      title: "Apprentice Support Network",
      description: "Connect with fellow apprentices in a supportive environment",
      type: "Community"
    },
    {
      id: 3,
      title: "Work-Life Balance",
      description: "Strategies for maintaining balance during your apprenticeship",
      type: "Workshop"
    },
    {
      id: 4,
      title: "Crisis Resources",
      description: "Immediate support options for urgent mental health concerns",
      type: "Helpline"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mental Health Hub</h1>
          <p className="text-muted-foreground">
            Resources and support for maintaining wellbeing during your apprenticeship journey
          </p>
        </div>
        <Link to="/apprentice">
          <Button variant="outline">Back to Apprentice Hub</Button>
        </Link>
      </div>
      
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-elec-yellow" />
            Your Wellbeing Matters
          </CardTitle>
          <CardDescription>
            The electrical trade can be demanding. Remember to prioritize your mental health.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            If you're experiencing distress or need immediate support, contact the 24/7 Electrical Trades Support Line at <span className="font-medium">0800 123 4567</span>
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{resource.title}</CardTitle>
                <span className="text-xs px-2 py-1 bg-elec-yellow/10 rounded-md text-elec-yellow">
                  {resource.type}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{resource.description}</p>
              <Button className="w-full">Access Resource</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApprenticeMentalHealth;
