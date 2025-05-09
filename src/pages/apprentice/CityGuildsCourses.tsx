
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const CityGuildsCourses = () => {
  const isMobile = useIsMobile();
  
  // City & Guilds electrical courses data
  const courses = [
    {
      id: "level-2-electrical",
      title: "Level 2 Electrical Installation",
      description: "Foundation electrical skills and knowledge for installation work"
    },
    {
      id: "level-3-electrical",
      title: "Level 3 Electrical Installation",
      description: "Advanced electrical installation techniques and principles"
    },
    {
      id: "2391-inspection-testing",
      title: "2391 Inspection & Testing",
      description: "Initial verification and periodic inspection of electrical installations"
    },
    {
      id: "moet",
      title: "Maintenance Operability Electrical Testing (MOET)",
      description: "Advanced competency in maintenance and operability of electrical systems"
    },
    {
      id: "18th-edition",
      title: "18th Edition Wiring Regulations",
      description: "Latest BS7671 electrical regulations and requirements"
    },
    {
      id: "2377-pat-testing",
      title: "2377 PAT Testing",
      description: "Portable appliance testing certification and procedures"
    }
  ];

  // Function to format course title with first word highlighted
  const formatCourseTitle = (title: string) => {
    // Split the title into words
    const words = title.split(' ');
    
    // Extract the first word
    const firstWord = words[0];
    
    // Join the rest of the words
    const restOfTitle = words.slice(1).join(' ');
    
    return (
      <>
        <span className="text-elec-yellow">{firstWord} </span>
        <span>{restOfTitle}</span>
      </>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">City & Guilds Courses</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Industry-standard vocational qualifications for electrical professionals
          </p>
        </div>
        <Link to="/apprentice/study" className="w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Study Centre
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <Link 
            key={index}
            to={`/apprentice/study/cityGuilds/${course.id}`}
            className="block h-full transition-transform hover:scale-102 duration-200"
          >
            <Card 
              className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full"
            >
              <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                <BookOpen className="h-8 w-8 text-elec-yellow mb-4 opacity-80" />
                <h3 className={`text-base sm:text-lg font-medium text-center ${isMobile ? "leading-tight" : ""}`}>
                  {formatCourseTitle(course.title)}
                </h3>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  {course.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CityGuildsCourses;
