import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ExternalLink, 
  Star, 
  Clock, 
  Users, 
  PoundSterling, 
  MapPin, 
  Calendar,
  ChevronDown,
  ChevronUp,
  Award,
  Target,
  BookOpen,
  Phone,
  Mail,
  Wifi
} from "lucide-react";
import { EnhancedCareerCourse } from "../../../apprentice/career/courses/enhancedCoursesData";

interface ModernCourseDetailsModalProps {
  course: EnhancedCareerCourse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModernCourseDetailsModal = ({ course, open, onOpenChange }: ModernCourseDetailsModalProps) => {
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const handleViewProvider = () => {
    if (course.external_url) {
      window.open(course.external_url, '_blank');
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Essential Qualifications': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      'Emerging Technologies': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      'Safety & Compliance': 'bg-red-500/10 text-red-400 border-red-500/30',
      'Specialised Skills': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      'Business & Management': 'bg-green-500/10 text-green-400 border-green-500/30',
    };
    return colors[category as keyof typeof colors] || 'bg-blue-500/10 text-blue-400 border-blue-500/30';
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "High": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  // Fallback data for missing information
  const displayCourseOutline = course.courseOutline?.length 
    ? course.courseOutline 
    : [
        "Course fundamentals and overview",
        "Core principles and regulations", 
        "Practical application techniques",
        "Assessment and certification"
      ];

  const displayCareerOutcomes = course.careerOutcomes?.length
    ? course.careerOutcomes
    : [
        "Enhanced professional qualifications",
        "Improved career advancement opportunities", 
        "Access to specialised project work",
        "Increased earning potential"
      ];

  const displayLocations = course.locations?.length 
    ? course.locations 
    : ["Multiple UK locations", "Online delivery available"];

  const displayNextDates = course.nextDates?.length 
    ? course.nextDates 
    : ["Contact provider for available dates"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-0 gap-0 mx-2 sm:mx-4 w-[calc(100vw-1rem)] sm:w-full">
        {/* Hero Section */}
        <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 space-y-3 sm:space-y-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex-1 space-y-2 sm:space-y-3">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getCategoryColor(course.category)}`}
                >
                  {course.category}
                </Badge>
                {course.isLive && (
                  <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30 flex items-center gap-1">
                    <Wifi className="h-3 w-3" />
                    Live Data
                  </Badge>
                )}
                {course.rating > 0 && (
                  <div className="flex items-center gap-1 bg-amber-400/10 text-amber-400 px-2 py-1 rounded border border-amber-400/30">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs font-medium">{course.rating}</span>
                  </div>
                )}
              </div>

              {/* Course Title */}
              <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-semibold leading-tight text-foreground">
                {course.title}
              </DialogTitle>

              {/* Provider */}
              <div className="text-base sm:text-lg font-medium text-elec-yellow">
                {course.provider}
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full">
              <Button 
                onClick={handleViewProvider}
                disabled={!course.external_url}
                className="flex-1 sm:flex-none"
                size="sm"
              >
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                <span className="text-xs sm:text-sm">View Provider</span>
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
          {/* Key Information Cards */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Card className="bg-background/50 border-border/50">
              <CardContent className="p-3 sm:p-4 text-center">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow mx-auto mb-1 sm:mb-2" />
                <div className="font-medium text-xs sm:text-sm">{course.duration}</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 border-border/50">
              <CardContent className="p-3 sm:p-4 text-center">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow mx-auto mb-1 sm:mb-2" />
                <div className="font-medium text-xs sm:text-sm">{course.level}</div>
                <div className="text-xs text-muted-foreground">Level</div>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 border-border/50">
              <CardContent className="p-3 sm:p-4 text-center">
                <PoundSterling className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow mx-auto mb-1 sm:mb-2" />
                <div className="font-medium text-xs sm:text-sm">{course.price}</div>
                <div className="text-xs text-muted-foreground">Price</div>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 border-border/50">
              <CardContent className="p-3 sm:p-4 text-center">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow mx-auto mb-1 sm:mb-2" />
                <div className="font-medium text-xs sm:text-sm">{course.format}</div>
                <div className="text-xs text-muted-foreground">Format</div>
              </CardContent>
            </Card>
          </div>

          {/* Industry Demand & Next Dates */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <Card className="bg-background/50 border-border/50">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium">Industry Demand</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getDemandColor(course.industryDemand)}`}
                  >
                    {course.industryDemand}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-border/50">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-elec-yellow" />
                  <span className="text-xs sm:text-sm font-medium">Next Start</span>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {displayNextDates[0]}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Locations */}
          <Card className="bg-background/50 border-border/50">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-elec-yellow" />
                <span className="font-medium text-xs sm:text-sm">Available Locations</span>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {displayLocations.slice(0, 3).map((location, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {location}
                  </Badge>
                ))}
                {displayLocations.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{displayLocations.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* More Details - Collapsible */}
          <Collapsible open={showMoreDetails} onOpenChange={setShowMoreDetails}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between"
                size="sm"
              >
                <span className="text-xs sm:text-sm">More Course Details</span>
                {showMoreDetails ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
              <Separator />
              
              {/* Course Outline & Career Outcomes */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <Card className="bg-background/50 border-border/50">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-elec-yellow" />
                      <span className="font-medium text-xs sm:text-sm">Course Outline</span>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      {displayCourseOutline.map((item, idx) => (
                        <div key={idx} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-elec-yellow mt-1.5 sm:mt-2 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background/50 border-border/50">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <Target className="h-3 w-3 sm:h-4 sm:w-4 text-elec-yellow" />
                      <span className="font-medium text-xs sm:text-sm">Career Outcomes</span>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      {displayCareerOutcomes.map((outcome, idx) => (
                        <div key={idx} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-elec-yellow mt-1.5 sm:mt-2 shrink-0" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Information */}
              {course.salaryImpact && (
                <Card className="bg-background/50 border-border/50">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs sm:text-sm">Salary Impact</span>
                      <span className="text-green-400 font-medium text-xs sm:text-sm">{course.salaryImpact}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contact Information */}
              <Card className="bg-background/50 border-border/50">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-elec-yellow" />
                    <span className="font-medium text-xs sm:text-sm">Get in Touch</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Contact {course.provider} directly for course availability, pricing details, and enrollment information.
                  </p>
                  {course.external_url && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 sm:mt-3 w-full"
                      onClick={handleViewProvider}
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      <span className="text-xs sm:text-sm">Visit Provider Website</span>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModernCourseDetailsModal;