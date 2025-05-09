
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { courseCategories } from "@/data/courseCategories";
import { useIsMobile } from "@/hooks/use-mobile";

// Define course types
interface CourseInfo {
  title: string;
  slug: string;
  level: string;
}

const EALCourses = () => {
  const isMobile = useIsMobile();
  
  // Find the EAL courses category
  const ealCategory = courseCategories.find(category => category.id === "eal");
  
  // Parse and organize courses by level
  const processCoursesIntoLevels = () => {
    if (!ealCategory) return { level2: [], level3: [], level4: [] };
    
    const level2: CourseInfo[] = [];
    const level3: CourseInfo[] = [];
    const level4: CourseInfo[] = [];
    
    ealCategory.courses.forEach(course => {
      const courseInfo = {
        title: course,
        slug: '',
        level: ''
      };
      
      if (course.includes("Level 2")) {
        courseInfo.level = "Level 2";
        courseInfo.slug = `level-2-${course.toLowerCase().replace(/level 2 /, '').replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`;
        level2.push(courseInfo);
      } 
      else if (course.includes("Level 3")) {
        courseInfo.level = "Level 3";
        courseInfo.slug = `level-3-${course.toLowerCase().replace(/level 3 /, '').replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`;
        level3.push(courseInfo);
      } 
      else if (course.includes("Level 4")) {
        courseInfo.level = "Level 4";
        courseInfo.slug = `level-4-${course.toLowerCase().replace(/level 4 /, '').replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`;
        level4.push(courseInfo);
      }
      else {
        // Default case - assume level 2 if no level specified
        courseInfo.level = "Other";
        courseInfo.slug = course.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        level2.push(courseInfo);
      }
    });
    
    return { level2, level3, level4 };
  };
  
  const { level2, level3, level4 } = processCoursesIntoLevels();

  // Function to colorize the first word and numbers in the course title
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
  
  // Function to render course cards for a specific level
  const renderCoursesForLevel = (courses: CourseInfo[], levelTitle: string) => {
    if (courses.length === 0) return null;
    
    return (
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-bold text-elec-yellow">{levelTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Link 
              key={index}
              to={`/apprentice/study/eal/${course.slug}`}
              className="block h-full transition-transform hover:scale-102 duration-200"
            >
              <Card 
                className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                  <BookOpen className="h-8 w-8 text-elec-yellow mb-4 opacity-80" />
                  <p className="text-elec-yellow text-xs mb-1">{course.level}</p>
                  <h3 className={`text-base sm:text-lg font-medium text-center ${isMobile ? "leading-tight" : ""}`}>
                    {formatCourseTitle(course.title)}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  };

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

      {renderCoursesForLevel(level2, "Level 2 Courses")}
      {renderCoursesForLevel(level3, "Level 3 Courses")}
      {renderCoursesForLevel(level4, "Level 4 Courses")}
    </div>
  );
};

export default EALCourses;
