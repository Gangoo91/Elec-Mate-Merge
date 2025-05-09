
import { Card, CardContent } from "@/components/ui/card";
import { Book, Award, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FurtherLearningCourseProps {
  id: string;
  title: string;
  description: string;
  provider: string;
  duration: string;
  format: string;
  startDate: string;
  price: string;
}

const FurtherLearningCourse = ({ 
  id, 
  title,
  description,
  provider,
  duration,
  format, 
  startDate,
  price
}: FurtherLearningCourseProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/95 transition-colors">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <h3 className="text-xl font-semibold mb-1 text-elec-yellow">{title}</h3>
          <p className="text-sm text-amber-400/80 mb-4">Provider: {provider}</p>
          <p className="text-sm mb-6">{description}</p>
          
          <div className="mt-auto space-y-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm">{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm">{startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm">{format}</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm">{price}</span>
              </div>
            </div>
            
            <Button variant="default" className="w-full">
              View Course Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FurtherLearningCourses = () => {
  const courses: FurtherLearningCourseProps[] = [
    {
      id: "18th-edition",
      title: "18th Edition Regulations",
      description: "Essential course covering the latest BS7671 electrical regulations for all practicing electricians.",
      provider: "NICEIC",
      duration: "3 days",
      format: "Classroom or Online",
      startDate: "Monthly intake",
      price: "£395"
    },
    {
      id: "ev-charging",
      title: "Electric Vehicle Charging",
      description: "Learn how to safely install, test, and commission EV charging points for domestic and commercial applications.",
      provider: "EAL",
      duration: "2 days",
      format: "Classroom",
      startDate: "Flexible dates",
      price: "£495"
    },
    {
      id: "smart-home",
      title: "Smart Home Installation",
      description: "Comprehensive training on modern smart home systems including lighting control, security and home automation.",
      provider: "Industry Specialists",
      duration: "3 days",
      format: "Classroom",
      startDate: "Quarterly intake",
      price: "£545"
    },
    {
      id: "fire-alarm",
      title: "Fire Alarm Systems",
      description: "Design, installation and maintenance of fire alarm systems to meet current standards.",
      provider: "FIA",
      duration: "4 days",
      format: "Classroom",
      startDate: "Monthly intake",
      price: "£695"
    },
    {
      id: "inspection-testing",
      title: "Inspection and Testing",
      description: "Comprehensive course on initial verification and periodic inspection of electrical installations.",
      provider: "City & Guilds",
      duration: "5 days",
      format: "Classroom",
      startDate: "Weekly intake",
      price: "£795"
    },
    {
      id: "renewable-energy",
      title: "Renewable Energy Installation",
      description: "Solar PV, wind and battery storage installation for the modern electrical contractor.",
      provider: "MCS Approved",
      duration: "5 days",
      format: "Blended Learning",
      startDate: "Bi-monthly intake",
      price: "£895"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Further Learning Courses</h1>
          <p className="text-muted-foreground mt-1">
            Specialized short courses and certifications for career advancement
          </p>
        </div>
        <Link to="/apprentice/study">
          <Button variant="outline" size="sm">
            Back to Study Centre
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <FurtherLearningCourse
            key={course.id}
            {...course}
          />
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            <Book className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Why Consider Further Learning?</h3>
            <p className="text-sm mb-4">
              Further learning courses provide specialized skills that can significantly enhance your career prospects and earning potential.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-elec-yellow">Increased Earning Potential</h4>
                <p className="text-xs">Specialized certifications can lead to higher-paying roles and contracts.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-elec-yellow">Competitive Advantage</h4>
                <p className="text-xs">Stand out to employers by offering services that require specialized certification.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-elec-yellow">Stay Current</h4>
                <p className="text-xs">Keep up with the latest technologies and regulatory requirements in the industry.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-elec-yellow">Business Expansion</h4>
                <p className="text-xs">Expand your service offerings with certifications in emerging electrical fields.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FurtherLearningCourses;
