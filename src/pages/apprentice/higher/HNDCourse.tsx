
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

const HNDCourse = () => {
  const courseUnits: CourseUnitProps[] = [
    {
      title: "Power Systems",
      description: "Power generation, transmission network analysis, distribution systems, and protection techniques.",
      credits: 15,
      level: "5",
      code: "EE501"
    },
    {
      title: "Electronic Design",
      description: "Advanced circuit design techniques, PCB design, and electronic system integration.",
      credits: 15,
      level: "5",
      code: "EE502"
    },
    {
      title: "Advanced Mathematics",
      description: "Complex mathematical models and techniques applied to electrical engineering problems.",
      credits: 15,
      level: "5",
      code: "EE503"
    },
    {
      title: "Industrial Applications",
      description: "Electrical systems in industrial environments, automation, and control applications.",
      credits: 15,
      level: "5",
      code: "EE504"
    },
    {
      title: "Control Systems",
      description: "Design and analysis of control systems for electrical and electronic applications.",
      credits: 15,
      level: "5",
      code: "EE505"
    },
    {
      title: "Renewable Energy Systems",
      description: "Solar, wind, hydro and other renewable energy technologies and their grid integration.",
      credits: 15,
      level: "5",
      code: "EE506"
    },
    {
      title: "Engineering Research Project",
      description: "Independent research project applying advanced electrical engineering principles.",
      credits: 30,
      level: "5",
      code: "EE507"
    },
    {
      title: "Industrial Power Electronics",
      description: "Power electronic devices, converters, and their applications in industrial settings.",
      credits: 15,
      level: "5",
      code: "EE508"
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
          <h1 className="text-3xl font-bold tracking-tight">HND Electrical Engineering</h1>
          <p className="text-muted-foreground mt-1">
            Higher National Diploma in Electrical Engineering (Level 5)
          </p>
        </div>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-6 mb-8">
        <div className="flex gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            <div>
              <p className="text-sm font-medium">Duration</p>
              <p className="text-xs text-muted-foreground">2 years</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-elec-yellow" />
            <div>
              <p className="text-sm font-medium">Credits</p>
              <p className="text-xs text-muted-foreground">240 total (120 at Level 5)</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Assessment</p>
            <p className="text-xs text-muted-foreground">Assignments, projects, practical assessments</p>
          </div>
          <div>
            <p className="text-sm font-medium">Study Mode</p>
            <p className="text-xs text-muted-foreground">Full-time or Part-time</p>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Course Units (Level 5)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseUnits.map((unit, index) => (
            <CourseUnit key={index} {...unit} />
          ))}
        </div>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Progression Options</h3>
            <p className="text-sm text-muted-foreground">
              After completing an HND, you can progress to the final year of a BEng degree or enter employment.
            </p>
          </div>
          <Button>Find Providers</Button>
        </div>
      </Card>
    </div>
  );
};

export default HNDCourse;
