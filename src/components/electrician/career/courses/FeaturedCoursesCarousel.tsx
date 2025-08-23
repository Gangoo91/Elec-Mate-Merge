import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, ChevronRight, Star, TrendingUp, 
  Users, Clock, Award, Zap 
} from "lucide-react";
import { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeaturedCoursesCarouselProps {
  courses: EnhancedCareerCourse[];
  onViewDetails: (course: EnhancedCareerCourse) => void;
}

const FeaturedCoursesCarousel = ({ courses, onViewDetails }: FeaturedCoursesCarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const isMobile = useIsMobile();

  // Filter featured courses (high demand, high rating, emerging tech)
  const featuredCourses = courses
    .filter(course => 
      course.industryDemand === "High" || 
      course.rating >= 4.8 || 
      course.category === "Emerging Technologies"
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const itemsPerView = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(featuredCourses.length / itemsPerView);
  const maxIndex = Math.max(0, totalSlides - 1);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const getFeatureIcon = (course: EnhancedCareerCourse) => {
    if (course.category === "Emerging Technologies") return Zap;
    if (course.industryDemand === "High") return TrendingUp;
    if (course.rating >= 4.8) return Star;
    return Award;
  };

  const getFeatureLabel = (course: EnhancedCareerCourse) => {
    if (course.category === "Emerging Technologies") return "New Technology";
    if (course.industryDemand === "High") return "High Demand";
    if (course.rating >= 4.8) return "Top Rated";
    return "Featured";
  };

  const getFeatureColor = (course: EnhancedCareerCourse) => {
    if (course.category === "Emerging Technologies") return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (course.industryDemand === "High") return "bg-green-500/20 text-green-400 border-green-500/30";
    if (course.rating >= 4.8) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-purple-500/20 text-purple-400 border-purple-500/30";
  };

  if (featuredCourses.length === 0) return null;

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-elec-yellow" />
            Featured Courses
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="h-8 w-8 p-0 border-elec-yellow/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="h-8 w-8 p-0 border-elec-yellow/30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:px-6">
        <div className="relative overflow-hidden w-full">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${totalSlides * 100}%`
            }}
          >
            {featuredCourses.map((course) => {
              const FeatureIcon = getFeatureIcon(course);
              
              return (
                <div
                  key={course.id}
                  className="flex-shrink-0 px-2"
                  style={{ 
                    width: `${100 / itemsPerView / totalSlides}%`
                  }}
                >
                  <Card className="border-elec-yellow/30 bg-elec-dark/30 h-full hover:border-elec-yellow/50 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <Badge className={getFeatureColor(course)}>
                          <FeatureIcon className="h-3 w-3 mr-1" />
                          {getFeatureLabel(course)}
                        </Badge>
                        <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs">
                          <Star className="h-3 w-3 fill-amber-400" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      
                      <CardTitle className="text-base leading-tight">{course.title}</CardTitle>
                      <p className="text-sm text-elec-yellow">{course.provider}</p>
                    </CardHeader>
                    
                    <CardContent className="pt-0 space-y-3">
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                      
                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-elec-yellow" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-elec-yellow" />
                          <span>{course.level}</span>
                        </div>
                      </div>

                      {/* Salary Impact */}
                      <div className="text-xs">
                        <span className="text-muted-foreground">Salary Impact: </span>
                        <span className="text-green-400 font-medium">{course.salaryImpact}</span>
                      </div>

                      {/* Next Available Date */}
                      <div className="text-xs">
                        <span className="text-muted-foreground">Next Date: </span>
                        <span className="text-elec-yellow">{course.nextDates[0]}</span>
                      </div>

                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                        onClick={() => onViewDetails(course)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentIndex === index ? 'bg-elec-yellow' : 'bg-elec-yellow/30'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedCoursesCarousel;