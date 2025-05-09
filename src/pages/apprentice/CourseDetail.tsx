
import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ealLevel2Units } from "@/data/courseUnits";
import { ealLevel3Units } from "@/data/courseUnitsLevel3";
import { ealLevel4Units } from "@/data/courseUnitsLevel4";
import UnitDetails from "@/components/apprentice/UnitDetails";

// Create a map to store course-specific units for Level 3 courses
const level3CoursesUnitsMap: Record<string, typeof ealLevel3Units> = {
  // These are placeholder entries - in a real app, you would have different unit sets per course
  "eal-level-3-course-1": ealLevel3Units,
  "eal-level-3-course-2": ealLevel3Units.slice(0, 3), // Example: this course only has first 3 units
  "eal-level-3-course-3": ealLevel3Units.slice(2, 5), // Example: this course has units 3-5
  "eal-level-3-course-4": ealLevel3Units.slice(1, 4), // Example: this course has units 2-4
};

// Create a map to store course-specific units for Level 4 courses
const level4CoursesUnitsMap: Record<string, typeof ealLevel4Units> = {
  // These are placeholder entries - in a real app, you would have different unit sets per course
  "eal-level-4-course-1": ealLevel4Units,
  "eal-level-4-course-2": ealLevel4Units.slice(0, 3), // Example: this course only has first 3 units
  "eal-level-4-course-3": ealLevel4Units.slice(1, 4), // Example: this course has units 2-4
};

const CourseDetail = () => {
  const { courseSlug, unitSlug } = useParams();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const isMobile = useIsMobile();
  
  // Determine which level and course to use based on the courseSlug and courseId
  const getUnitsForCourse = (slug?: string, id?: string | null) => {
    if (!slug) return [];
    
    if (slug.startsWith('level-2-')) {
      return ealLevel2Units;
    } else if (slug.startsWith('level-3-')) {
      // If we have a courseId, use it to get the specific units for this Level 3 course
      if (id && level3CoursesUnitsMap[id]) {
        return level3CoursesUnitsMap[id];
      }
      // Fallback to all Level 3 units if no courseId or not found
      return ealLevel3Units;
    } else if (slug.startsWith('level-4-')) {
      // If we have a courseId, use it to get the specific units for this Level 4 course
      if (id && level4CoursesUnitsMap[id]) {
        return level4CoursesUnitsMap[id];
      }
      // Fallback to all Level 4 units if no courseId or not found
      return ealLevel4Units;
    } else {
      // Default to level 2 units for legacy routes
      return ealLevel2Units;
    }
  };
  
  const courseUnits = getUnitsForCourse(courseSlug, courseId);
  
  // Extract course level from slug
  const getCourseLevel = (slug?: string) => {
    if (!slug) return "Level 2";
    if (slug.startsWith('level-3-')) return "Level 3";
    if (slug.startsWith('level-4-')) return "Level 4";
    return "Level 2"; // Default
  };
  
  // Format the course title from the slug
  const formatCourseTitle = (slug?: string) => {
    if (!slug) return "";
    
    // Remove level prefix and format
    let title = slug
      .replace(/^level-[234]-/, '') // Remove level prefix
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
      
    return title;
  };

  const courseTitle = formatCourseTitle(courseSlug);
  const levelDisplay = getCourseLevel(courseSlug);
  
  // Determine course description based on level
  const getLevelDescription = (level: string) => {
    switch(level) {
      case "Level 3":
        return "Advanced electrical units for qualified professionals";
      case "Level 4":
        return "Expert-level units for specialized electrical professionals";
      default:
        return "Essential electrical units for installation work";
    }
  };
  
  const levelDescription = getLevelDescription(levelDisplay);

  // Function to create a URL slug from a unit code and title
  const createUnitSlug = (code: string, title: string) => {
    return code.toLowerCase().replace('/', '-') + '-' + 
      title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  // If we have a unitSlug parameter, show the unit details instead of the course listing
  if (unitSlug) {
    // Find the unit that matches the unitSlug
    const unit = courseUnits.find(unit => {
      const generatedSlug = createUnitSlug(unit.code, unit.title);
      return generatedSlug === unitSlug;
    });

    if (unit) {
      return (
        <UnitDetails 
          unit={unit} 
          onResourceClick={() => {}} 
          completedResources={{}} 
          onToggleResourceComplete={() => {}} 
        />
      );
    }
  }

  // Show the course listing if no unitSlug or if the unit wasn't found
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">{courseTitle}</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            EAL {levelDisplay} qualification with {levelDescription}
          </p>
        </div>
        <Link to="/apprentice/study/eal" className="w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to EAL Courses
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseUnits.map((unit, index) => {
          const unitSlug = createUnitSlug(unit.code, unit.title);
          const unitUrl = `/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`;
          // Preserve the courseId in the unit links
          const finalUrl = courseId ? `${unitUrl}?courseId=${courseId}` : unitUrl;
          
          return (
            <Link 
              key={index}
              to={finalUrl}
              className="block h-full transition-transform hover:scale-102 duration-200"
            >
              <Card 
                className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                  <GraduationCap className="h-8 w-8 text-elec-yellow mb-4 opacity-80" />
                  <p className="text-elec-yellow text-sm mb-2">{unit.code}</p>
                  <h3 className={`text-base sm:text-lg font-medium text-center ${isMobile ? "leading-tight" : ""}`}>
                    {unit.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CourseDetail;
