import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  ExternalLink,
  Phone,
  Mail,
  BookOpen,
  CheckCircle
} from "lucide-react";
import { LiveCourse } from "@/hooks/useLiveCourses";
import LiveCourseDatesDrawer from "./LiveCourseDatesDrawer";
import CourseEnquiryModal from "./CourseEnquiryModal";

interface LiveCourseCardProps {
  course: LiveCourse;
  onViewDetails: (course: LiveCourse) => void;
}

const LiveCourseCard: React.FC<LiveCourseCardProps> = ({ course, onViewDetails }) => {
  const [showDatesDrawer, setShowDatesDrawer] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  const getAvailabilityColor = (availability: string) => {
    const lower = availability.toLowerCase();
    if (lower.includes('full') || lower.includes('closed')) return 'text-destructive';
    if (lower.includes('few') || lower.includes('limited')) return 'text-orange-600';
    return 'text-green-600';
  };

  const formatPrice = (priceRange: string) => {
    if (!priceRange || priceRange === 'Contact for pricing') return 'POA';
    return priceRange.replace(/£(\d+)/g, '£$1');
  };

  const getNextAvailableDate = () => {
    if (course.nextIntakeDate) return course.nextIntakeDate;
    if (course.upcomingDates && course.upcomingDates.length > 0) {
      return course.upcomingDates[0].startDate;
    }
    return null;
  };

  const getLocationBadge = () => {
    if (course.locations.length === 0) return 'Multiple locations';
    if (course.locations.length === 1) return course.locations[0];
    return `${course.locations[0]} +${course.locations.length - 1} more`;
  };

  const getLearningModeColor = (mode: string) => {
    const lower = mode.toLowerCase();
    if (lower.includes('online')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    if (lower.includes('person') || lower.includes('classroom')) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
  };

  return (
    <>
      <Card className="h-full bg-elec-gray border border-border hover:border-primary/20 transition-all duration-200 hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-semibold text-foreground line-clamp-2 mb-2">
                {course.courseTitle}
              </CardTitle>
              <p className="text-sm text-muted-foreground mb-2">{course.provider}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                <Badge variant="secondary" className={getLearningModeColor(course.learningMode)}>
                  {course.learningMode}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {course.level}
                </Badge>
                {course.hasAvailability && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Available
                  </Badge>
                )}
              </div>
            </div>
            
            {course.rating > 0 && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          {course.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {course.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{course.duration}</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{getLocationBadge()}</span>
            </div>
          </div>

          {getNextAvailableDate() && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-medium">
                Next start: {new Date(getNextAvailableDate()!).toLocaleDateString('en-GB')}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-semibold text-primary">
              {formatPrice(course.priceRange)}
            </span>
            <div className="flex gap-2">
              {course.upcomingDates && course.upcomingDates.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDatesDrawer(true)}
                  className="text-xs"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  {course.upcomingDates.length} dates
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(course)}
                className="text-xs"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                Details
              </Button>
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t">
            <Button
              onClick={() => setShowEnquiryForm(true)}
              className="flex-1 bg-primary hover:bg-primary/90"
              size="sm"
            >
              Enquire Now
            </Button>
            
            {course.detailsUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(course.detailsUrl, '_blank')}
                className="px-3"
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            )}
          </div>

          {(course.contactInfo?.phone || course.contactInfo?.email) && (
            <div className="flex gap-3 text-xs text-muted-foreground pt-1">
              {course.contactInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {course.contactInfo.phone}
                </div>
              )}
              {course.contactInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {course.contactInfo.email}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <LiveCourseDatesDrawer
        course={course}
        open={showDatesDrawer}
        onOpenChange={setShowDatesDrawer}
      />

      <CourseEnquiryModal
        course={{
          id: course.id,
          title: course.courseTitle,
          provider: course.provider
        }}
        open={showEnquiryForm}
        onOpenChange={setShowEnquiryForm}
        onSuccess={() => {
          setShowEnquiryForm(false);
        }}
      />
    </>
  );
};

export default LiveCourseCard;