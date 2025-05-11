
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { courseCategories } from "@/data/courseCategories";
import { useIsMobile } from "@/hooks/use-mobile";

const EALCourses = () => {
  const isMobile = useIsMobile();
  
  // Find the EAL courses category
  const ealCategory = courseCategories.find(category => category.id === "eal");
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">EAL Courses</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Excellence, Achievement & Learning certified electrical qualifications
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

      {/* Course grid - extremely simplified with just placeholder cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ealCategory?.courses.map((course, index) => (
          <Card 
            key={index}
            className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20 h-full"
          >
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <BookOpen className="h-8 w-8 text-elec-yellow mb-4 opacity-80" />
              <p className="text-elec-yellow text-xs mb-1">
                {course.includes("Level 2") ? "Level 2" : 
                 course.includes("Level 3") ? "Level 3" : 
                 course.includes("Level 4") ? "Level 4" : "Course"}
              </p>
              <h3 className={`text-base sm:text-lg font-medium text-center ${isMobile ? "leading-tight" : ""}`}>
                {course}
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Course content coming soon
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center py-8 text-muted-foreground">
        <p>Course content is currently being developed.</p>
      </div>
    </div>
  );
};

export default EALCourses;
