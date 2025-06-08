
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap, Award, BookOpen, Users, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const ApprenticeProfessionalDevelopment = () => {
  const developmentAreas = [
    {
      id: 1,
      title: "Career Planning",
      icon: <Target className="h-6 w-6 text-elec-yellow" />,
      description: "Set goals and plan your electrical career progression",
      link: "/apprentice/career/planning"
    },
    {
      id: 2,
      title: "Skills Assessment",
      icon: <Award className="h-6 w-6 text-elec-yellow" />,
      description: "Evaluate your current skills and identify areas for growth",
      link: "/apprentice/skills/assessment"
    },
    {
      id: 3,
      title: "Further Education",
      icon: <BookOpen className="h-6 w-6 text-elec-yellow" />,
      description: "Explore additional qualifications and specialisations",
      link: "/apprentice/education/further"
    },
    {
      id: 4,
      title: "Professional Networks",
      icon: <Users className="h-6 w-6 text-elec-yellow" />,
      description: "Build connections within the electrical industry",
      link: "/apprentice/networking"
    },
    {
      id: 5,
      title: "CPD Tracking",
      icon: <TrendingUp className="h-6 w-6 text-elec-yellow" />,
      description: "Track your Continuing Professional Development",
      link: "/apprentice/cpd/tracker"
    },
    {
      id: 6,
      title: "Industry Certifications",
      icon: <GraduationCap className="h-6 w-6 text-elec-yellow" />,
      description: "Explore professional certifications and accreditations",
      link: "/apprentice/certifications"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Professional Development</h1>
        <Link to="/apprentice/hub" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hub
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          Plan and track your professional development as an electrical apprentice. 
          Build the skills and connections you need for a successful career.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developmentAreas.map((area) => (
          <Link to={area.link} key={area.id} className="focus:outline-none">
            <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer">
              <CardHeader className="flex flex-col items-center justify-center text-center">
                {area.icon}
                <CardTitle className="text-xl mt-2">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  {area.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="bg-green-950/20 border border-green-600/30 rounded-md p-4 mt-8">
        <p className="text-sm text-green-200/90">
          <strong>Development Tip:</strong> Regular professional development is key to advancing 
          your electrical career. Set aside time each week to work on building new skills 
          and expanding your knowledge.
        </p>
      </div>
    </div>
  );
};

export default ApprenticeProfessionalDevelopment;
