
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Target, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const CareerPathways = () => {
  const careerPaths = [
    {
      title: "Domestic Electrician",
      description: "Specialise in residential electrical work",
      timeline: "2-3 years post-apprenticeship",
      salary: "£25,000 - £35,000",
      icon: TrendingUp
    },
    {
      title: "Commercial Electrician", 
      description: "Focus on commercial and office buildings",
      timeline: "3-5 years experience",
      salary: "£30,000 - £45,000",
      icon: Target
    },
    {
      title: "Industrial Electrician",
      description: "Work in manufacturing and industrial settings",
      timeline: "5+ years experience",
      salary: "£35,000 - £55,000",
      icon: Users
    },
    {
      title: "Electrical Supervisor/Manager",
      description: "Lead teams and manage electrical projects",
      timeline: "7-10 years experience",
      salary: "£40,000 - £65,000",
      icon: Award
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Progression Paths</h1>
          <p className="text-muted-foreground">Explore your future career opportunities in the electrical industry</p>
        </div>
        <Link to="/apprentice/professional-development" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Professional Development
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careerPaths.map((path, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-md bg-elec-yellow/10">
                  <path.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-xl">{path.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-elec-light/80">{path.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Timeline:</span>
                  <span className="text-sm text-elec-light/80">{path.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Salary Range:</span>
                  <span className="text-sm text-elec-yellow">{path.salary}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CareerPathways;
