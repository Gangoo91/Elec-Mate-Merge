import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, MapPin, PoundSterling, Users, Star, Award, 
  TrendingUp, Calendar, BookOpen, Info, ExternalLink, CheckCircle
} from "lucide-react";
import { AccreditationOption } from "../../../apprentice/career/accreditation/enhancedAccreditationData";
import { isValidUrl } from "@/utils/urlUtils";

interface AccreditationCardProps {
  accreditation: AccreditationOption;
  onViewDetails: (accreditation: AccreditationOption) => void;
}

const AccreditationCard = ({ accreditation, onViewDetails }: AccreditationCardProps) => {
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Entry Level": return "text-green-400 bg-green-400/10 border-green-400/30";
      case "Intermediate": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "Advanced": return "text-red-400 bg-red-400/10 border-red-400/30";
      case "Expert": return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return "text-green-400";
    if (popularity >= 75) return "text-amber-400";
    return "text-red-400";
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-grey hover:border-elec-yellow/40 transition-all duration-200 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-lg font-semibold text-white leading-tight mb-2">
              {accreditation.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-amber-400 mb-3">
              <Award className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">{accreditation.provider}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant="outline" className={`text-xs font-medium ${getDifficultyColor(accreditation.difficulty)}`}>
              {accreditation.level}
            </Badge>
            {accreditation.onlineAvailable && (
              <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                Online
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Description */}
        <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
          {accreditation.description}
        </p>

        {/* Key Information Grid */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
              <Clock className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="flex-1">
              <span className="text-gray-400 text-xs block">Duration</span>
              <span className="text-white font-medium">{accreditation.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
              <PoundSterling className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="flex-1">
              <span className="text-gray-400 text-xs block">Investment</span>
              <span className="text-white font-medium">{accreditation.cost}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
              <MapPin className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="flex-1">
              <span className="text-gray-400 text-xs block">Locations</span>
              <span className="text-white font-medium">
                {accreditation.locations.slice(0, 2).join(", ")}
                {accreditation.locations.length > 2 && "..."}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
              <TrendingUp className={`h-4 w-4 ${getPopularityColor(accreditation.popularity)}`} />
            </div>
            <div className="flex-1">
              <span className="text-gray-400 text-xs block">Popularity</span>
              <span className="text-white font-medium">{accreditation.popularity}%</span>
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={`text-xs ${getDifficultyColor(accreditation.difficulty)}`}>
            {accreditation.difficulty}
          </Badge>
          {accreditation.onlineAvailable && (
            <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/30">
              Online Available
            </Badge>
          )}
        </div>

        {/* Key Benefits */}
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-elec-yellow">Key Benefits:</h5>
          <div className="space-y-1.5">
            {accreditation.benefits.slice(0, 3).map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-300 leading-relaxed">{benefit}</span>
              </div>
            ))}
            {accreditation.benefits.length > 3 && (
              <div className="text-xs text-gray-400 ml-5">
                +{accreditation.benefits.length - 3} more benefits
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-elec-yellow/10">
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-elec-yellow text-elec-dark hover:bg-amber-400 font-medium"
              onClick={() => onViewDetails(accreditation)}
            >
              <Info className="mr-2 h-4 w-4" />
              View Full Details
            </Button>
            {isValidUrl(accreditation.website) && (
              <Button 
                variant="outline" 
                size="sm"
                className="border-elec-yellow/30 hover:bg-elec-yellow/10 px-3"
                onClick={() => window.open(accreditation.website, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccreditationCard;