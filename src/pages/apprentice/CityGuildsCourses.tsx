
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CityGuildsCourseProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  level: string;
  duration: string;
  provider: string;
  modules: string[];
}

const CityGuildsCourse = ({ 
  title, 
  description, 
  icon, 
  level,
  duration,
  provider,
  modules
}: CityGuildsCourseProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`border-elec-yellow/20 bg-elec-gray h-full transition-all duration-300 cursor-pointer
        ${isHovered ? 'border-elec-yellow/80 shadow-lg shadow-elec-yellow/10' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 bg-elec-dark rounded-md transition-colors ${isHovered ? 'bg-elec-yellow/20' : ''}`}>
              {icon}
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-1 transition-colors ${isHovered ? 'text-elec-yellow' : ''}`}>{title}</h3>
              <p className="text-sm text-muted-foreground mb-1">{level} | {duration}</p>
              <p className="text-xs text-elec-yellow/80">{provider}</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          
          <div className="mt-auto">
            <h4 className="text-xs font-medium text-elec-yellow/80 mb-2">Key Modules:</h4>
            <div className="flex flex-wrap gap-1.5">
              {modules.slice(0, 3).map((module, index) => (
                <span 
                  key={index}
                  className="text-xs bg-elec-dark/60 px-2 py-0.5 rounded"
                >
                  {module}
                </span>
              ))}
              {modules.length > 3 && (
                <span className="text-xs text-elec-yellow">+{modules.length - 3} more</span>
              )}
            </div>
            
            <div className="mt-4">
              <Button variant="default" className="w-full">
                View Course Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CityGuildsCourses = () => {
  const courses: CityGuildsCourseProps[] = [
    {
      title: "Level 2 Electrical Installation",
      description: "Foundation course covering basic electrical theory and installation techniques.",
      icon: <GraduationCap className="h-6 w-6 text-elec-yellow" />,
      level: "Level 2",
      duration: "1 year",
      provider: "City & Guilds",
      modules: [
        "Electrical Science", 
        "Installation Theory", 
        "Basic Wiring", 
        "Health and Safety",
        "Electrical Principles"
      ]
    },
    {
      title: "Level 3 Electrical Installation",
      description: "Advanced electrical theory and practical skills for professional electricians.",
      icon: <GraduationCap className="h-6 w-6 text-elec-yellow" />,
      level: "Level 3",
      duration: "1-2 years",
      provider: "City & Guilds",
      modules: [
        "Advanced Electrical Principles", 
        "Inspection and Testing", 
        "Fault Diagnosis", 
        "Regulations",
        "Design and Installation",
        "Building Regulations"
      ]
    },
    {
      title: "Level 2 Plumbing",
      description: "Basic plumbing techniques and systems for entry-level plumbers.",
      icon: <Book className="h-6 w-6 text-elec-yellow" />,
      level: "Level 2",
      duration: "1 year",
      provider: "City & Guilds",
      modules: [
        "Cold Water Systems", 
        "Hot Water Systems", 
        "Central Heating", 
        "Drainage Systems",
        "Plumbing Science"
      ]
    },
    {
      title: "Level 3 Plumbing",
      description: "Advanced plumbing techniques and systems including design and installation.",
      icon: <Book className="h-6 w-6 text-elec-yellow" />,
      level: "Level 3",
      duration: "1-2 years",
      provider: "City & Guilds",
      modules: [
        "Complex Cold Water Systems", 
        "Complex Hot Water Systems", 
        "Heating System Design", 
        "Gas Safety",
        "Water Regulations",
        "Building Regulations"
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">City & Guilds Courses</h1>
          <p className="text-muted-foreground mt-1">
            Industry-standard vocational qualifications for electrical professionals
          </p>
        </div>
        <Link to="/apprentice/study">
          <Button variant="outline" size="sm">
            Back to Study Centre
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <CityGuildsCourse
            key={index}
            {...course}
          />
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            <GraduationCap className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">About City & Guilds Qualifications</h3>
            <p className="text-sm mb-4">
              City & Guilds qualifications are widely recognized in the electrical industry and provide a structured pathway for career progression.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-elec-yellow">Industry Recognition</h4>
                <p className="text-xs">City & Guilds qualifications are recognized by employers across the UK and internationally.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-elec-yellow">Progression Options</h4>
                <p className="text-xs">Clear progression from Level 2 to Level 3 and beyond into higher education or specialized certification.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-elec-yellow">Practical Assessment</h4>
                <p className="text-xs">Courses include hands-on practical assessments to ensure job-ready skills.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-elec-yellow">Flexibility</h4>
                <p className="text-xs">Available through colleges, training centers and apprenticeship schemes across the country.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CityGuildsCourses;
