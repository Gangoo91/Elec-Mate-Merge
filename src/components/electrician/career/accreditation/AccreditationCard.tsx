import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award, MapPin, Clock, PoundSterling, 
  TrendingUp, ExternalLink, Users, CheckCircle
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
      case "Entry Level": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Advanced": return "bg-red-500/10 text-red-400 border-red-500/30";
      case "Expert": return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      default: return "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30";
    }
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return 'text-green-400';
    if (popularity >= 75) return 'text-amber-400';
    return 'text-red-400';
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'professional bodies':
        return '🏆';
      case 'trade associations':
        return '🔧';
      case 'safety certifications':
        return '🛡️';
      case 'specialist skills':
        return '⚡';
      case 'management & leadership':
        return '👥';
      case 'health & safety':
        return '🦺';
      default:
        return '📋';
    }
  };

  const getStatusIndicator = () => {
    if (accreditation.onlineAvailable) {
      return {
        color: 'text-green-400',
        text: 'Available Online'
      };
    }
    return {
      color: 'text-blue-400', 
      text: 'In-Person Required'
    };
  };

  const statusInfo = getStatusIndicator();

  return (
    <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full group">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getCategoryIcon(accreditation.category)}</span>
            <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-xs">
              {accreditation.level}
            </Badge>
          </div>
          <Badge variant="outline" className={getDifficultyColor(accreditation.difficulty)}>
            {accreditation.difficulty}
          </Badge>
        </div>
        
        <CardTitle className="text-lg leading-tight group-hover:text-elec-yellow transition-colors">
          {accreditation.title}
        </CardTitle>
        
        <div className="flex items-center gap-2 text-sm text-amber-400">
          <Award className="h-4 w-4" />
          <span className="font-medium">{accreditation.provider}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {accreditation.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-1">
            <TrendingUp className={`h-3 w-3 ${getPopularityColor(accreditation.popularity)}`} />
            <span className="text-white font-medium">{accreditation.popularity}%</span>
            <span className="text-muted-foreground">popular</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-blue-400" />
            <span className="text-white font-medium">{accreditation.accreditationBody}</span>
            <span className="text-muted-foreground">body</span>
          </div>
        </div>

        {/* Duration and Cost */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{accreditation.duration}</span>
          </div>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
            {accreditation.onlineAvailable ? 'Online Available' : 'In-Person'}
          </Badge>
        </div>

        {/* Location */}
        {accreditation.locations.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">
              {accreditation.locations.slice(0, 2).join(', ')}
              {accreditation.locations.length > 2 && ` +${accreditation.locations.length - 2} more`}
            </span>
          </div>
        )}

        {/* Cost */}
        <div className="flex items-center gap-1 text-sm font-medium text-elec-yellow">
          <PoundSterling className="h-4 w-4" />
          <span>{accreditation.cost}</span>
        </div>

        {/* Renewal Period */}
        {accreditation.renewalPeriod && (
          <div className="flex items-center gap-1 text-xs text-green-400">
            <CheckCircle className="h-3 w-3" />
            <span>Renewal: {accreditation.renewalPeriod}</span>
          </div>
        )}

        {/* Key Benefits Preview */}
        {accreditation.benefits.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground">Key Benefits:</span>
            <div className="flex flex-wrap gap-1">
              {accreditation.benefits.slice(0, 3).map((benefit, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="bg-elec-dark/50 text-white border-elec-yellow/20 text-xs"
                >
                  {benefit.length > 20 ? `${benefit.slice(0, 17)}...` : benefit}
                </Badge>
              ))}
              {accreditation.benefits.length > 3 && (
                <Badge variant="outline" className="bg-elec-dark/50 text-muted-foreground border-elec-yellow/20 text-xs">
                  +{accreditation.benefits.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={() => onViewDetails(accreditation)}
            variant="outline"
            className="flex-1 border-elec-yellow/30 hover:bg-elec-yellow/10 text-xs"
          >
            View Details
          </Button>
          {isValidUrl(accreditation.website) && (
            <Button 
              variant="ghost" 
              size="sm"
              className="px-2 hover:bg-elec-yellow/10"
              onClick={(e) => {
                e.stopPropagation();
                window.open(accreditation.website, '_blank');
              }}
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Professional Status Indicator */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-elec-yellow/10">
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${statusInfo.color === 'text-green-400' ? 'bg-green-400' : 'bg-blue-400'}`}></div>
            <span className={statusInfo.color}>{statusInfo.text}</span>
          </div>
          <span>Professional Status</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccreditationCard;