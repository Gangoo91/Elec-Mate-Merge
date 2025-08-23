import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, PoundSterling, ExternalLink, Users, Star } from "lucide-react";
import { EnhancedCareerCourse } from "../../../apprentice/career/courses/enhancedCoursesData";

interface CourseInfoOverlayProps {
  userLocation: string | null;
  selectedCourse: EnhancedCareerCourse | null | undefined;
  selectedMarkerPosition: google.maps.LatLngLiteral | undefined;
}

const CourseInfoOverlay: React.FC<CourseInfoOverlayProps> = ({
  userLocation,
  selectedCourse,
  selectedMarkerPosition
}) => {
  if (!selectedCourse) {
    return (
      <div className="absolute top-4 left-4 right-4 pointer-events-none">
        <Card className="bg-background/95 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <MapPin className="h-8 w-8 text-elec-yellow mx-auto" />
              <p className="text-sm text-muted-foreground">
                Click on a course marker to view details
              </p>
              {userLocation && (
                <p className="text-xs text-muted-foreground">
                  Your location: {userLocation}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleViewDetails = () => {
    if (selectedCourse.external_url) {
      window.open(selectedCourse.external_url, '_blank');
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

  return (
    <div className="absolute top-4 left-4 right-4 max-w-md pointer-events-auto">
      <Card className="bg-background/95 backdrop-blur-sm border-border/50 shadow-lg">
        <CardContent className="p-4 space-y-3">
          {/* Course Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                {selectedCourse.title}
              </h3>
              {selectedCourse.rating > 0 && (
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-muted-foreground">
                    {selectedCourse.rating}
                  </span>
                </div>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground">
              {selectedCourse.provider}
            </p>
            
            <Badge 
              variant="outline" 
              className={`text-xs ${getCategoryColor(selectedCourse.category)}`}
            >
              {selectedCourse.category}
            </Badge>
          </div>

          {/* Course Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-elec-yellow" />
              <span className="text-muted-foreground">{selectedCourse.duration}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <PoundSterling className="h-3 w-3 text-elec-yellow" />
              <span className="text-muted-foreground">{selectedCourse.price}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-elec-yellow" />
              <span className="text-muted-foreground">{selectedCourse.level}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-elec-yellow" />
              <span className="text-muted-foreground">{selectedCourse.format}</span>
            </div>
          </div>

          {/* Location Info */}
          {selectedCourse.locations && selectedCourse.locations.length > 0 && (
            <div className="text-xs">
              <p className="text-muted-foreground">
                <MapPin className="h-3 w-3 inline mr-1" />
                {selectedCourse.locations[0]}
                {selectedCourse.locations.length > 1 && (
                  <span className="ml-1">
                    (+{selectedCourse.locations.length - 1} more)
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Next Dates */}
          {selectedCourse.nextDates && selectedCourse.nextDates.length > 0 && (
            <div className="text-xs">
              <p className="text-muted-foreground">
                Next start: {selectedCourse.nextDates[0]}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <Button 
              onClick={handleViewDetails}
              size="sm" 
              className="w-full text-xs h-8"
              disabled={!selectedCourse.external_url}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View Course Details
            </Button>
          </div>

          {/* User Location Info */}
          {userLocation && (
            <div className="text-xs text-muted-foreground pt-1 border-t border-border/50">
              Your location: {userLocation}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseInfoOverlay;