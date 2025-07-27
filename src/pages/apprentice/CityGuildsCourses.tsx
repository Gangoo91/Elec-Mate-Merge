
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQualifications } from "@/hooks/qualification/useQualifications";

const CityGuildsCourses = () => {
  const isMobile = useIsMobile();
  const { awardingBodies, loading, error } = useQualifications();
  
  // Get City & Guilds courses from the awarding bodies data
  const cityGuildsCourses = awardingBodies?.['City & Guilds'] || [];

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

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
          <span className="ml-2 text-muted-foreground">Loading City & Guilds courses...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">Error loading courses: {error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      ) : cityGuildsCourses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No City & Guilds courses available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cityGuildsCourses.map((course) => (
            <Link 
              key={course.id}
              to={`/apprentice/study/cityGuilds/${course.id}`}
              className="block h-full transition-transform hover:scale-102 duration-200"
            >
              <Card 
                className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full"
              >
                <CardContent className="flex flex-col h-full p-6">
                  <div className="flex flex-col items-center justify-center flex-grow">
                    <BookOpen className="h-10 w-10 text-elec-yellow mb-4 opacity-80" />
                    <h3 className="text-xl font-medium text-center mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      {course.description || 'Professional electrical qualification'}
                    </p>
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

export default CityGuildsCourses;
