
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Book, Clock, FileText, Users } from "lucide-react";

interface CourseUnitProps {
  title: string;
  description: string;
  credits: number;
  level: string;
  code: string;
}

const CourseUnit = ({ title, description, credits, level, code }: CourseUnitProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className="text-xs bg-elec-dark/80 px-2 py-1 rounded">{code}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4 text-elec-yellow" />
            <span>{credits} credits</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-elec-yellow" />
            <span>Level {level}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const HNCCourse = () => {
  const courseUnits: CourseUnitProps[] = [
    {
      title: "Electrical Principles",
      description: "Core electrical theories, AC/DC principles, circuit analysis, and applications in electrical engineering.",
      credits: 15,
      level: "4",
      code: "EE401"
    },
    {
      title: "Engineering Mathematics",
      description: "Mathematical principles and techniques applicable to electrical engineering problems and analysis.",
      credits: 15,
      level: "4",
      code: "EE402"
    },
    {
      title: "Digital Electronics",
      description: "Principles of digital systems, logic circuits, microprocessors, and digital communication systems.",
      credits: 15,
      level: "4",
      code: "EE403"
    },
    {
      title: "Project Management",
      description: "Planning, executing, and evaluating engineering projects, including risk assessment and resource allocation.",
      credits: 15,
      level: "4",
      code: "EE404"
    },
    {
      title: "Analytical Methods",
      description: "Methods of analysis for electrical and electronic engineering problems and system modeling.",
      credits: 15,
      level: "4",
      code: "EE405"
    },
    {
      title: "Engineering Science",
      description: "Physical principles applied to engineering systems with focus on electrical applications.",
      credits: 15,
      level: "4",
      code: "EE406"
    },
    {
      title: "Electrical Power",
      description: "Generation, transmission, and distribution of electrical power systems and related technologies.",
      credits: 15,
      level: "4",
      code: "EE407"
    },
    {
      title: "Professional Engineering Practice",
      description: "Professional standards, regulations, and ethics in electrical engineering practice.",
      credits: 15,
      level: "4",
      code: "EE408"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <Link to="/apprentice/study/higher" className="flex items-center text-muted-foreground hover:text-elec-yellow mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Higher Education
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">HNC Electrical Engineering</h1>
          <p className="text-muted-foreground mt-1">
            Higher National Certificate in Electrical Engineering (Level 4)
          </p>
        </div>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-6 mb-8">
        <div className="flex gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            <div>
              <p className="text-sm font-medium">Duration</p>
              <p className="text-xs text-muted-foreground">1-2 years</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-elec-yellow" />
            <div>
              <p className="text-sm font-medium">Credits</p>
              <p className="text-xs text-muted-foreground">120 total</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Assessment</p>
            <p className="text-xs text-muted-foreground">Assignments, projects, practical work</p>
          </div>
          <div>
            <p className="text-sm font-medium">Study Mode</p>
            <p className="text-xs text-muted-foreground">Full-time or Part-time</p>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Course Units</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseUnits.map((unit, index) => (
            <CourseUnit key={index} {...unit} />
          ))}
        </div>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Ready to take the next step?</h3>
            <p className="text-sm text-muted-foreground">
              Speak to your employer or education provider about enrolling in this qualification.
            </p>
          </div>
          <Button>Find Providers</Button>
        </div>
      </Card>
    </div>
  );
};

export default HNCCourse;
