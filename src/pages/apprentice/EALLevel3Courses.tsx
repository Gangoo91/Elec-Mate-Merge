
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const EALLevel3Courses = () => {
  const isMobile = useIsMobile();
  
  // EAL Level 3 units data with full descriptions as provided by the user
  const courses = [
    {
      id: "qeltk3-002",
      title: "QELTK3/002",
      description: "Understanding environmental legislation, working practices and the principles of environmental technology systems"
    },
    {
      id: "elec3-04a",
      title: "ELEC3/04A",
      description: "Electrical Installation planning, preparing and design"
    },
    {
      id: "elec3-05",
      title: "ELEC3/05",
      description: "Electrical Installation Craft Skills"
    },
    {
      id: "qeltk3-006",
      title: "QELTK3/006",
      description: "Understanding principles and legislation for inspection, testing and certification of electrotechnical systems"
    },
    {
      id: "qeltk3-007",
      title: "QELTK3/007",
      description: "Understanding the principles and legislation for diagnosing and correcting Electrical faults"
    },
    {
      id: "elec3-08b",
      title: "ELEC3/08B",
      description: "Electrical Science and principles"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">EAL Level 3 Units</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Advanced electrical qualification units for the Level 3 diploma
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
            to={`/apprentice/study/eal-level3/${course.id}`}
            className="block h-full transition-transform hover:scale-102 duration-200"
          >
            <Card 
              className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full"
            >
              <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                <BookOpen className="h-8 w-8 text-elec-yellow mb-4 opacity-80" />
                <h3 className={`text-base sm:text-lg font-medium text-center ${isMobile ? "leading-tight" : ""}`}>
                  <span className="text-elec-yellow">{course.title}</span>
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

export default EALLevel3Courses;
