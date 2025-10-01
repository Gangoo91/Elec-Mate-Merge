
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
          <span className="ml-2 text-muted-foreground">Loading EAL courses...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">Error loading courses: {error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      ) : ealCourses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No EAL courses available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ealCourses.map((course) => (
            <Link key={course.id} to={`/apprentice/study/eal/${course.id}`} className="block h-full group">
              <Card className="h-full border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-2 rounded-md bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors">
                    {getIconForCourse(course.title)}
                  </div>
                  <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{course.description || 'Professional electrical qualification'}</p>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      className="border-elec-yellow/30 hover:bg-elec-yellow/10 text-sm"
                    >
                      View Course Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EALCourses;
