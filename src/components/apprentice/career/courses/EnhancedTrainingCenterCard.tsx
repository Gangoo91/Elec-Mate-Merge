
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Phone, Globe, Star, Users, TrendingUp, 
  Award, Building, Calendar, CheckCircle, Target 
} from "lucide-react";
import { EnhancedTrainingCenter } from "./enhancedCoursesData";

interface EnhancedTrainingCenterCardProps {
  center: EnhancedTrainingCenter;
  onViewDetails: (center: EnhancedTrainingCenter) => void;
}

const EnhancedTrainingCenterCard = ({ center, onViewDetails }: EnhancedTrainingCenterCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-300">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-xl">{center.name}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <MapPin className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm text-muted-foreground">{center.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-3 py-1 rounded-md">
            <Star className="h-4 w-4 fill-amber-400" />
            <span className="font-medium">{center.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-1">
            <div className="text-lg font-bold text-elec-yellow">{center.establishedYear}</div>
            <div className="text-xs text-muted-foreground">Established</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-lg font-bold text-green-400">{center.successRate}%</div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-lg font-bold text-blue-400">{center.employmentRate}%</div>
            <div className="text-xs text-muted-foreground">Employment</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-lg font-bold text-white">{center.studentCapacity}</div>
            <div className="text-xs text-muted-foreground">Capacity</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Courses & Specializations */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
                <Building className="h-4 w-4" />
                Key Courses Offered
              </h4>
              <div className="space-y-2">
                {center.courses.slice(0, 4).map((course, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                    <span className="text-muted-foreground">{course}</span>
                  </div>
                ))}
                {center.courses.length > 4 && (
                  <div className="text-sm text-muted-foreground">
                    +{center.courses.length - 4} additional courses
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
                <Target className="h-4 w-4" />
                Specializations
              </h4>
              <div className="flex flex-wrap gap-2">
                {center.specializations.map((spec, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Facilities & Accreditations */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
                <Award className="h-4 w-4" />
                Accreditations
              </h4>
              <div className="flex flex-wrap gap-2">
                {center.accreditations.map((acc, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-amber-400/10 text-amber-400 border-amber-400/30">
                    {acc}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
                <Users className="h-4 w-4" />
                Support Services
              </h4>
              <div className="space-y-1">
                {center.supportServices.slice(0, 3).map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <div className="w-1 h-1 rounded-full bg-elec-yellow" />
                    <span className="text-muted-foreground">{service}</span>
                  </div>
                ))}
                {center.supportServices.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{center.supportServices.length - 3} more services
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <Card className="bg-elec-dark/30 border-elec-yellow/10">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                  <span className="text-muted-foreground">{center.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-elec-yellow" />
                  <span className="text-muted-foreground">{center.contact.phone}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-elec-yellow" />
                  <span className="text-muted-foreground">{center.website}</span>
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    onClick={() => onViewDetails(center)}
                  >
                    View Full Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default EnhancedTrainingCenterCard;
