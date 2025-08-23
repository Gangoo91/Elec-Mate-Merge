import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, X, Scale, Star, Clock, Users, MapPin, 
  PoundSterling, TrendingUp, Award, CheckCircle, 
  Calendar, AlertCircle 
} from "lucide-react";
import { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";
import { useToast } from "@/hooks/use-toast";

interface CourseCompareModeProps {
  courses: EnhancedCareerCourse[];
  onViewDetails: (course: EnhancedCareerCourse) => void;
}

const CourseCompareMode = ({ courses, onViewDetails }: CourseCompareModeProps) => {
  const [selectedCourses, setSelectedCourses] = useState<EnhancedCareerCourse[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const { toast } = useToast();

  const addToComparison = (course: EnhancedCareerCourse) => {
    if (selectedCourses.length >= 3) {
      toast({
        title: "Comparison limit reached",
        description: "You can compare up to 3 courses at a time.",
        variant: "destructive"
      });
      return;
    }

    if (selectedCourses.some(c => c.id === course.id)) {
      toast({
        title: "Course already selected",
        description: "This course is already in your comparison.",
        variant: "default"
      });
      return;
    }

    setSelectedCourses(prev => [...prev, course]);
    toast({
      title: "Course added to comparison",
      description: `${course.title} has been added to your comparison.`,
      variant: "success"
    });
  };

  const removeFromComparison = (courseId: string | number) => {
    setSelectedCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const clearComparison = () => {
    setSelectedCourses([]);
    setShowComparison(false);
  };

  const isSelected = (courseId: string | number) => {
    return selectedCourses.some(c => c.id === courseId);
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "High": return "text-green-400";
      case "Medium": return "text-yellow-400";
      default: return "text-gray-400";
    }
  };

  const getPriceValue = (priceString: string): number => {
    const match = priceString.match(/£(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const ComparisonTable = () => (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-elec-yellow" />
            Course Comparison
          </CardTitle>
          <Button variant="outline" size="sm" onClick={clearComparison}>
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-elec-yellow/20">
                <th className="text-left py-3 px-2 font-medium text-elec-yellow">Feature</th>
                {selectedCourses.map(course => (
                  <th key={course.id} className="text-left py-3 px-2 font-medium text-elec-yellow min-w-48">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{course.title}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromComparison(course.id)}
                        className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-elec-yellow/10">
              <tr>
                <td className="py-3 px-2 font-medium">Provider</td>
                {selectedCourses.map(course => (
                  <td key={course.id} className="py-3 px-2 text-elec-yellow">{course.provider}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Rating</td>
                {selectedCourses.map(course => (
                  <td key={course.id} className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Duration</td>
                {selectedCourses.map(course => (
                  <td key={course.id} className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-elec-yellow" />
                      <span>{course.duration}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Level</td>
                {selectedCourses.map(course => (
                  <td key={course.id} className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-elec-yellow" />
                      <span>{course.level}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Price Range</td>
                {selectedCourses.map(course => (
                  <td key={course.id} className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <PoundSterling className="h-3 w-3 text-amber-400" />
                      <span>{course.price}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Industry Demand</td>
                {selectedCourses.map(course => (
                  <td key={course.id} className="py-3 px-2">
                    <span className={getDemandColor(course.industryDemand)}>
                      {course.industryDemand}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Future Proofing</td>
                {selectedCourses.map(course => (
                  <td key={course.id} className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-elec-yellow" />
                      <span>{course.futureProofing}/5</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Salary Impact</td>
                {selectedCourses.map(course => (
                  <td key={course.id} className="py-3 px-2 text-green-400 font-medium">
                    {course.salaryImpact}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Locations</td>
                {selectedCourses.map(course => (
                  <td key={course.id} className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-elec-yellow" />
                      <span className="truncate">{course.locations.slice(0, 2).join(", ")}</span>
                      {course.locations.length > 2 && (
                        <span className="text-muted-foreground">+{course.locations.length - 2}</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Employer Support</td>
                {selectedCourses.map(course => (
                  <td key={course.id} className="py-3 px-2">
                    {course.employerSupport ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <X className="h-4 w-4 text-red-400" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Next Available</td>
                {selectedCourses.map(course => (
                  <td key={course.id} className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-elec-yellow" />
                      <span>{course.nextDates[0]}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Actions</td>
                {selectedCourses.map(course => (
                  <td key={course.id} className="py-3 px-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(course)}
                      className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    >
                      View Details
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Comparison Manager */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-elec-yellow" />
            Course Comparison Tool
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Select up to 3 courses to compare side by side
              </p>
              <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                {selectedCourses.length}/3 selected
              </Badge>
            </div>

            {selectedCourses.length > 0 && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {selectedCourses.map(course => (
                    <Badge
                      key={course.id}
                      variant="outline"
                      className="bg-blue-500/10 text-blue-400 border-blue-500/30 pr-1"
                    >
                      {course.title}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromComparison(course.id)}
                        className="ml-1 h-4 w-4 p-0 text-red-400 hover:text-red-300"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowComparison(!showComparison)}
                    className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80"
                    disabled={selectedCourses.length < 2}
                  >
                    {showComparison ? "Hide" : "Show"} Comparison
                  </Button>
                  <Button variant="outline" onClick={clearComparison}>
                    Clear All
                  </Button>
                </div>
              </div>
            )}

            {selectedCourses.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Scale className="h-12 w-12 mx-auto mb-3 text-elec-yellow/50" />
                <p>Click the compare button on course cards to add them here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {showComparison && selectedCourses.length >= 2 && <ComparisonTable />}
    </div>
  );
};

// Export hook for use in course cards
export const useCourseComparison = () => {
  const [selectedCourses, setSelectedCourses] = useState<(string | number)[]>([]);
  const { toast } = useToast();

  const addToComparison = (courseId: string | number) => {
    if (selectedCourses.length >= 3) {
      toast({
        title: "Comparison limit reached",
        description: "You can compare up to 3 courses at a time.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedCourses.includes(courseId)) {
      setSelectedCourses(prev => [...prev, courseId]);
    }
  };

  const removeFromComparison = (courseId: string | number) => {
    setSelectedCourses(prev => prev.filter(id => id !== courseId));
  };

  const isInComparison = (courseId: string | number) => selectedCourses.includes(courseId);

  return { addToComparison, removeFromComparison, isInComparison, selectedCount: selectedCourses.length };
};

export default CourseCompareMode;