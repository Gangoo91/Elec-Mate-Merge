
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Users, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";

const ApprenticeshipExpectations = () => {
  const expectations = [
    {
      title: "Year 1: Foundation",
      icon: BookOpen,
      description: "Learning the basics and getting comfortable on site",
      milestones: ["Basic electrical theory", "Health & safety awareness", "Tool familiarisation", "Following instructions"]
    },
    {
      title: "Year 2: Development",
      icon: Users,
      description: "Building skills and taking on more responsibility",
      milestones: ["Cable installation", "Basic wiring", "Understanding circuits", "Working with supervision"]
    },
    {
      title: "Year 3: Competence",
      icon: Calendar,
      description: "Developing independence and specialist skills",
      milestones: ["Testing procedures", "Fault finding", "Customer interaction", "Working independently"]
    },
    {
      title: "Year 4: Mastery",
      icon: Award,
      description: "Preparing for qualification and career progression",
      milestones: ["Advanced installations", "Leading junior apprentices", "Project responsibility", "Final assessments"]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Apprenticeship Expectations</h1>
          <p className="text-muted-foreground">What to expect during your electrical apprenticeship journey</p>
        </div>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {expectations.map((year, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-md bg-elec-yellow/10">
                  <year.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-xl">{year.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-elec-light/80">{year.description}</p>
              <div>
                <h4 className="font-semibold mb-2">Key Milestones:</h4>
                <ul className="space-y-1">
                  {year.milestones.map((milestone, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                      <span className="text-sm">{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApprenticeshipExpectations;
