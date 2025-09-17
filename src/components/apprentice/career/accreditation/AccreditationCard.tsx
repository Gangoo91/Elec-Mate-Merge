
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Clock, 
  PoundSterling, 
  TrendingUp, 
  MapPin,
  Award,
  Users,
  CheckCircle
} from "lucide-react";
import { AccreditationOption } from "./enhancedAccreditationData";
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
    <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-200 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-1">{accreditation.title}</CardTitle>
            <p className="text-sm text-amber-400">{accreditation.provider}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="outline" className={`text-xs ${getDifficultyColor(accreditation.difficulty)}`}>
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

      <CardContent className="pt-0 flex-grow flex flex-col">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{accreditation.description}</p>
        
        {/* Key Information Grid */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <span className="text-muted-foreground">{accreditation.duration}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <PoundSterling className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <span className="text-muted-foreground">{accreditation.cost}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <span className="text-muted-foreground">
              {accreditation.locations.slice(0, 2).join(", ")}
              {accreditation.locations.length > 2 && "..."}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className={`h-4 w-4 flex-shrink-0 ${getPopularityColor(accreditation.popularity)}`} />
            <span className="text-muted-foreground">{accreditation.popularity}% popularity</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className={`text-xs ${getDifficultyColor(accreditation.difficulty)}`}>
            {accreditation.difficulty}
          </Badge>
          {accreditation.onlineAvailable && (
            <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/30">
              Online Available
            </Badge>
          )}
        </div>

        {/* Key Benefits Preview */}
        <div className="mb-4">
          <h5 className="text-xs font-medium text-elec-yellow mb-2">Key Benefits:</h5>
          <div className="space-y-1">
            {accreditation.benefits.slice(0, 3).map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
            {accreditation.benefits.length > 3 && (
              <span className="text-xs text-muted-foreground ml-5">+{accreditation.benefits.length - 3} more benefits</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-4 border-t border-elec-yellow/10">
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-elec-yellow text-elec-dark hover:bg-amber-400"
              onClick={() => onViewDetails(accreditation)}
            >
              <Award className="mr-2 h-4 w-4" />
              View Details
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
