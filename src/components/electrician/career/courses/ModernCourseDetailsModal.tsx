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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Hero Section */}
        <DialogHeader className="p-6 pb-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 space-y-3">
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
              <DialogTitle className="text-xl sm:text-2xl font-semibold leading-tight text-foreground">
                {course.title}
              </DialogTitle>

              {/* Provider */}
              <div className="text-lg font-medium text-elec-yellow">
                {course.provider}
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:ml-4 shrink-0">
              <Button 
                onClick={handleViewProvider}
                disabled={!course.external_url}
                className="w-full sm:w-auto"
                size="sm"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Provider Site
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          {/* Key Information Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="bg-background/50 border-border/50">
              <CardContent className="p-4 text-center">
                <Clock className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
                <div className="font-medium text-sm">{course.duration}</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 border-border/50">
              <CardContent className="p-4 text-center">
                <Users className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
                <div className="font-medium text-sm">{course.level}</div>
                <div className="text-xs text-muted-foreground">Level</div>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 border-border/50">
              <CardContent className="p-4 text-center">
                <PoundSterling className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
                <div className="font-medium text-sm">{course.price}</div>
                <div className="text-xs text-muted-foreground">Price</div>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 border-border/50">
              <CardContent className="p-4 text-center">
                <MapPin className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
                <div className="font-medium text-sm">{course.format}</div>
                <div className="text-xs text-muted-foreground">Format</div>
              </CardContent>
            </Card>
          </div>

          {/* Industry Demand & Next Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-background/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Industry Demand</span>
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
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm font-medium">Next Start</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {displayNextDates[0]}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Locations */}
          <Card className="bg-background/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-elec-yellow" />
                <span className="font-medium">Available Locations</span>
              </div>
              <div className="flex flex-wrap gap-2">
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
                <span>More Course Details</span>
                {showMoreDetails ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-4 mt-4">
              <Separator />
              
              {/* Course Outline & Career Outcomes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-background/50 border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="h-4 w-4 text-elec-yellow" />
                      <span className="font-medium">Course Outline</span>
                    </div>
                    <div className="space-y-2">
                      {displayCourseOutline.map((item, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-elec-yellow mt-2 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background/50 border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-4 w-4 text-elec-yellow" />
                      <span className="font-medium">Career Outcomes</span>
                    </div>
                    <div className="space-y-2">
                      {displayCareerOutcomes.map((outcome, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-elec-yellow mt-2 shrink-0" />
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
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Salary Impact</span>
                      <span className="text-green-400 font-medium">{course.salaryImpact}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contact Information */}
              <Card className="bg-background/50 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="h-4 w-4 text-elec-yellow" />
                    <span className="font-medium">Get in Touch</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Contact {course.provider} directly for course availability, pricing details, and enrollment information.
                  </p>
                  {course.external_url && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3 w-full sm:w-auto"
                      onClick={handleViewProvider}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Provider Website
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