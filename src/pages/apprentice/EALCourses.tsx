import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Award, FileText, Lightbulb, Loader2 } from "lucide-react";
import { useQualifications } from "@/hooks/qualification/useQualifications";

const EALCourses = () => {
  const { awardingBodies, loading, error } = useQualifications();
  
  // Get EAL courses from the awarding bodies data
  const ealCourses = awardingBodies?.['EAL'] || [];
  
  // Icon mapping for different course types
  const getIconForCourse = (title: string) => {
    if (title.toLowerCase().includes('diploma')) {
      return <BookOpen className="h-8 w-8 text-elec-yellow" />;
    } else if (title.toLowerCase().includes('advanced')) {
      return <Award className="h-8 w-8 text-elec-yellow" />;
    } else if (title.toLowerCase().includes('verification') || title.toLowerCase().includes('certification')) {
      return <FileText className="h-8 w-8 text-elec-yellow" />;
    } else if (title.toLowerCase().includes('bs 7671') || title.toLowerCase().includes('18th edition')) {
      return <Lightbulb className="h-8 w-8 text-elec-yellow" />;
    }
    return <BookOpen className="h-8 w-8 text-elec-yellow" />;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12 space-y-4 sm:space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-2 sm:mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
              <span className="gradient-text">EAL Courses</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              Excellence, Achievement & Learning certified electrical qualifications
            </p>
          </div>
          <Link to="/apprentice/study" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-200 w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Study Centre
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8 sm:py-12">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground text-sm sm:text-base">Loading EAL courses...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-destructive mb-4 text-sm sm:text-base">Error loading courses: {error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : ealCourses.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-muted-foreground text-sm sm:text-base">No EAL courses available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
            {ealCourses.map((course) => (
              <Link key={course.id} to={`/apprentice/study/eal/${course.id}`} className="block h-full">
                <Card className="bg-card border-border/30 hover:border-primary/40 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col active:scale-[0.98]">
                  <CardContent className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 flex-grow flex flex-col justify-center">
                    <div className="flex justify-center">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        {React.cloneElement(getIconForCourse(course.title), {
                          className: "h-6 w-6 sm:h-8 sm:w-8 text-primary",
                          strokeWidth: 1.5
                        })}
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
                      {course.description || 'Professional electrical qualification'}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EALCourses;
