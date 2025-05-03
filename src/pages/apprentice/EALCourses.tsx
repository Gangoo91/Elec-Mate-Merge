
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { courseCategories } from "@/data/courseCategories";
import { useIsMobile } from "@/hooks/use-mobile";

const EALCourses = () => {
  const isMobile = useIsMobile();
  // Find the EAL courses category
  const ealCategory = courseCategories.find(category => category.id === "eal");
  const courses = ealCategory?.courses || [];

  // Function to colorize the first word and numbers in the course title
  // But exclude "18" from being highlighted
  const formatCourseTitle = (title: string) => {
    // Split the title into words
    const words = title.split(' ');
    
    // Extract the first word
    const firstWord = words[0];
    
    // Join the rest of the words and colorize any numbers except "18"
    const restOfTitle = words.slice(1).join(' ').replace(/\b(\d+)\b/g, (match) => {
      // Don't highlight "18" when it appears in "18th Edition"
      if (match === "18" && title.includes("18th Edition")) {
        return match;
      }
      return `<span class="text-elec-yellow">${match}</span>`;
    });
    
    return (
      <>
        <span className="text-elec-yellow">{firstWord} </span>
        <span dangerouslySetInnerHTML={{ __html: restOfTitle }} />
      </>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in px-4 md:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="gradient-text">EAL Courses</span>
          </h1>
          <p className="text-muted-foreground">
            Excellence, Achievement & Learning certified electrical qualifications
          </p>
        </div>
        <Link to="/apprentice/study" className="flex-shrink-0 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Study Centre
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {courses.map((course, index) => (
          <Card 
            key={index}
            className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-md shadow-elec-yellow/5 h-full"
          >
            <CardContent className="flex items-center justify-center p-4 sm:p-6 h-full">
              <h3 className={`text-base sm:text-lg font-medium text-center ${isMobile ? "leading-tight" : ""}`}>
                {formatCourseTitle(course)}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EALCourses;
