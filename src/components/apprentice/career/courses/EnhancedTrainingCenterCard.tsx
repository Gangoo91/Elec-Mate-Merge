
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
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 hover:border-elec-yellow/40 transition-all duration-300 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <CardHeader className="relative">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-xl text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                <Building className="h-5 w-5 text-elec-yellow" />
              </div>
              {center.name}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2 text-white/70">
              <MapPin className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm">{center.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-lg border border-amber-500/30">
            <Star className="h-4 w-4 fill-amber-400" />
            <span className="font-medium">{center.rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative">
        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-lg font-bold text-elec-yellow">{center.establishedYear}</div>
            <div className="text-xs text-white/70">Established</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="text-lg font-bold text-green-400">{center.successRate}%</div>
            <div className="text-xs text-white/70">Success Rate</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <div className="text-lg font-bold text-blue-400">{center.employmentRate}%</div>
            <div className="text-xs text-white/70">Employment</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-lg font-bold text-white">{center.studentCapacity}</div>
            <div className="text-xs text-white/70">Capacity</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Courses & Specialisations */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-2">
                <div className="p-1.5 rounded bg-elec-yellow/20">
                  <Building className="h-3.5 w-3.5" />
                </div>
                Key Courses Offered
              </h4>
              <div className="space-y-2">
                {center.courses.slice(0, 4).map((course, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">{course}</span>
                  </div>
                ))}
                {center.courses.length > 4 && (
                  <div className="text-sm text-white/60">
                    +{center.courses.length - 4} additional courses
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <h4 className="text-sm font-medium mb-3 text-blue-400 flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-500/20">
                  <Target className="h-3.5 w-3.5" />
                </div>
                Specialisations
              </h4>
              <div className="flex flex-wrap gap-2">
                {center.specialisations.map((spec, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Facilities & Accreditations */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <h4 className="text-sm font-medium mb-3 text-amber-400 flex items-center gap-2">
                <div className="p-1.5 rounded bg-amber-500/20">
                  <Award className="h-3.5 w-3.5" />
                </div>
                Accreditations
              </h4>
              <div className="flex flex-wrap gap-2">
                {center.accreditations.map((acc, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-amber-500/10 text-amber-400 border-amber-500/30">
                    {acc}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <h4 className="text-sm font-medium mb-3 text-green-400 flex items-center gap-2">
                <div className="p-1.5 rounded bg-green-500/20">
                  <Users className="h-3.5 w-3.5" />
                </div>
                Support Services
              </h4>
              <div className="space-y-1.5">
                {center.supportServices.slice(0, 3).map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    <span className="text-white/80">{service}</span>
                  </div>
                ))}
                {center.supportServices.length > 3 && (
                  <div className="text-xs text-white/60">
                    +{center.supportServices.length - 3} more services
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <Card className="bg-gradient-to-br from-white/5 to-white/10 border-elec-yellow/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-2 rounded-lg bg-white/5">
                  <MapPin className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{center.address}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  <Phone className="h-4 w-4 text-elec-yellow" />
                  <span className="text-white/80">{center.contact}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  <Globe className="h-4 w-4 text-elec-yellow" />
                  <span className="text-white/80">{center.website}</span>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation active:scale-95 transition-all"
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
