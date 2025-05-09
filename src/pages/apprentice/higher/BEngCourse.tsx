
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
  year: number;
}

const CourseUnit = ({ title, description, credits, level, code, year }: CourseUnitProps) => {
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
        <div className="flex flex-wrap items-center justify-between text-sm gap-2">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4 text-elec-yellow" />
            <span>{credits} credits</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-elec-yellow" />
            <span>Level {level}</span>
          </div>
          <div className="w-full text-xs mt-1 text-muted-foreground">
            Year {year}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BEngCourse = () => {
  const courseUnits: CourseUnitProps[] = [
    // Year 1 (Level 4)
    {
      title: "Electrical Circuit Principles",
      description: "Fundamentals of electrical circuits, Ohm's and Kirchhoff's laws, and circuit analysis techniques.",
      credits: 20,
      level: "4",
      code: "EE1001",
      year: 1
    },
    {
      title: "Engineering Mathematics",
      description: "Mathematical principles and techniques applicable to engineering problems.",
      credits: 20,
      level: "4",
      code: "EE1002",
      year: 1
    },
    {
      title: "Digital and Analogue Electronics",
      description: "Principles and applications of digital and analogue electronic systems.",
      credits: 20,
      level: "4",
      code: "EE1003",
      year: 1
    },
    {
      title: "Engineering Practice",
      description: "Introduction to engineering practice, standards, and professional skills.",
      credits: 20,
      level: "4",
      code: "EE1004",
      year: 1
    },
    
    // Year 2 (Level 5)
    {
      title: "Power Engineering",
      description: "Generation, transmission, and distribution of electrical power.",
      credits: 20,
      level: "5",
      code: "EE2001",
      year: 2
    },
    {
      title: "Control Systems Engineering",
      description: "Design and analysis of control systems for electrical applications.",
      credits: 20,
      level: "5",
      code: "EE2002",
      year: 2
    },
    {
      title: "Electromagnetic Field Theory",
      description: "Study of electric and magnetic fields and their applications in engineering.",
      credits: 20,
      level: "5",
      code: "EE2003",
      year: 2
    },
    {
      title: "Engineering Design and Project Management",
      description: "Design methodologies and project management techniques for engineering projects.",
      credits: 20,
      level: "5",
      code: "EE2004",
      year: 2
    },
    
    // Year 3 (Level 6)
    {
      title: "Advanced Electrical Systems",
      description: "Advanced concepts in electrical systems including power quality and reliability.",
      credits: 20,
      level: "6",
      code: "EE3001",
      year: 3
    },
    {
      title: "Power Engineering",
      description: "Advanced power systems including protection, stability, and smart grid technologies.",
      credits: 20,
      level: "6",
      code: "EE3002",
      year: 3
    },
    {
      title: "Control Systems",
      description: "Advanced control theory and applications for complex electrical systems.",
      credits: 20,
      level: "6",
      code: "EE3003",
      year: 3
    },
    {
      title: "Final Year Project",
      description: "Individual research project applying advanced electrical engineering principles.",
      credits: 40,
      level: "6",
      code: "EE3004",
      year: 3
    }
  ];

  // Group units by year
  const yearOneUnits = courseUnits.filter(unit => unit.year === 1);
  const yearTwoUnits = courseUnits.filter(unit => unit.year === 2);
  const yearThreeUnits = courseUnits.filter(unit => unit.year === 3);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <Link to="/apprentice/study/higher" className="flex items-center text-muted-foreground hover:text-elec-yellow mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Higher Education
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">BEng Electrical Engineering</h1>
          <p className="text-muted-foreground mt-1">
            Bachelor of Engineering in Electrical Engineering (Level 6)
          </p>
        </div>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-6 mb-8">
        <div className="flex gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            <div>
              <p className="text-sm font-medium">Duration</p>
              <p className="text-xs text-muted-foreground">3-4 years</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-elec-yellow" />
            <div>
              <p className="text-sm font-medium">Credits</p>
              <p className="text-xs text-muted-foreground">360 total</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Assessment</p>
            <p className="text-xs text-muted-foreground">Exams, assignments, laboratory work, final project</p>
          </div>
          <div>
            <p className="text-sm font-medium">Study Mode</p>
            <p className="text-xs text-muted-foreground">Full-time, Part-time, or Sandwich</p>
          </div>
        </div>
      </Card>

      <div className="space-y-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Year 1 - Foundation (Level 4)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {yearOneUnits.map((unit, index) => (
              <CourseUnit key={index} {...unit} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Year 2 - Intermediate (Level 5)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {yearTwoUnits.map((unit, index) => (
              <CourseUnit key={index} {...unit} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Year 3 - Advanced (Level 6)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {yearThreeUnits.map((unit, index) => (
              <CourseUnit key={index} {...unit} />
            ))}
          </div>
        </div>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Career Opportunities</h3>
            <p className="text-sm text-muted-foreground">
              BEng graduates can pursue careers in power generation, distribution, manufacturing, transport, renewables, and more.
            </p>
          </div>
          <Button>Find Universities</Button>
        </div>
      </Card>
    </div>
  );
};

export default BEngCourse;
