
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
      case "Entry Level": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Advanced": return "bg-red-500/10 text-red-400 border-red-500/30";
      case "Expert": return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      default: return "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30";
    }
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return "text-green-400";
    if (popularity >= 75) return "text-amber-400";
    return "text-red-400";
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-grey hover:bg-elec-grey/80 transition-all duration-300 h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-white leading-tight mb-2">
              {accreditation.title}
            </CardTitle>
            <p className="text-sm text-elec-yellow">{accreditation.provider}</p>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <Badge variant="outline" className={getDifficultyColor(accreditation.difficulty)}>
              {accreditation.level}
            </Badge>
            {accreditation.onlineAvailable && (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                Online
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4 min-h-0">
        <p className="text-sm text-white leading-relaxed">
          {accreditation.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <span className="text-white truncate">{accreditation.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <PoundSterling className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <span className="text-white truncate">{accreditation.cost}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <span className="text-white truncate">
              {accreditation.locations.slice(0, 2).join(", ")}
              {accreditation.locations.length > 2 && "..."}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className={`h-4 w-4 flex-shrink-0 ${getPopularityColor(accreditation.popularity)}`} />
            <span className="text-white">{accreditation.popularity}% popularity</span>
          </div>
        </div>
        
        <div className="space-y-3 flex-1 min-h-0 flex flex-col">
          <h4 className="text-sm font-medium text-elec-yellow">Key Benefits:</h4>
          <div className="space-y-2 flex-1">
            {accreditation.benefits.slice(0, 3).map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-white leading-relaxed">{benefit}</span>
              </div>
            ))}
            {accreditation.benefits.length > 3 && (
              <p className="text-xs text-elec-yellow font-medium">
                +{accreditation.benefits.length - 3} more benefits
              </p>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 pt-4 mt-auto">
          <Button 
            onClick={() => onViewDetails(accreditation)}
            className="flex-1 bg-elec-yellow text-elec-dark hover:bg-amber-400 text-sm h-9 font-medium"
          >
            <Award className="mr-2 h-4 w-4" />
            View Details
          </Button>
          {isValidUrl(accreditation.website) && (
            <Button 
              variant="outline" 
              size="sm"
              className="border-elec-yellow/30 hover:bg-elec-yellow/10 h-9 px-3"
              onClick={() => window.open(accreditation.website, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccreditationCard;
