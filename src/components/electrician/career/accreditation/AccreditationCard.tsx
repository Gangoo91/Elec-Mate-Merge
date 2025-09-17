import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, MapPin, Clock, PoundSterling, 
  TrendingUp, ExternalLink, Users, Calendar, Eye, Star
} from "lucide-react";
import { AccreditationOption } from "../../../apprentice/career/accreditation/enhancedAccreditationData";
import { isValidUrl } from "@/utils/urlUtils";
import { cn } from "@/lib/utils";

interface AccreditationCardProps {
  accreditation: AccreditationOption;
  onViewDetails: (accreditation: AccreditationOption) => void;
}

const AccreditationCard = ({ accreditation, onViewDetails }: AccreditationCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      "Professional Bodies": "bg-purple-500/20 border-purple-500/30 text-purple-300",
      "Trade Associations": "bg-blue-500/20 border-blue-500/30 text-blue-300",
      "Safety Certifications": "bg-red-500/20 border-red-500/30 text-red-300",
      "Specialist Skills": "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
      "Management & Leadership": "bg-green-500/20 border-green-500/30 text-green-300",
      "Health & Safety": "bg-orange-500/20 border-orange-500/30 text-orange-300",
    };
    return colors[category as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return 'text-green-400';
    if (popularity >= 75) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div 
      className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] h-full cursor-pointer"
      onClick={() => onViewDetails(accreditation)}
    >
      {/* Header section with badge overlay (replaces image) */}
      <div className="relative overflow-hidden h-40 sm:h-48 bg-gradient-to-br from-elec-yellow/10 via-elec-yellow/5 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={cn("text-xs font-medium", getCategoryColor(accreditation.category))}>
            {accreditation.category}
          </Badge>
        </div>

        {/* Online Available Badge */}
        {accreditation.onlineAvailable && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
              Online Available
            </Badge>
          </div>
        )}

        {/* Level Badge - positioned at bottom of header */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-xs">
            {accreditation.level}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 space-y-3 flex flex-col h-[calc(100%-10rem)] sm:h-[calc(100%-12rem)]">
        {/* Meta Info Row */}
        <div className="flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <TrendingUp className={`h-3 w-3 ${getPopularityColor(accreditation.popularity)}`} />
              <span>{accreditation.popularity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-blue-400" />
              <span>{accreditation.accreditationBody.length > 15 ? accreditation.accreditationBody.substring(0, 15) + '...' : accreditation.accreditationBody}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{accreditation.duration}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-white line-clamp-2 leading-tight flex-grow text-sm sm:text-base" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
          {accreditation.title}
        </h3>

        {/* Provider */}
        <div className="flex items-center gap-2 text-xs text-amber-400">
          <Award className="h-3 w-3" />
          <span className="font-medium">{accreditation.provider}</span>
        </div>

        {/* Description */}
        <p className="text-white/90 line-clamp-2 leading-relaxed flex-grow text-xs sm:text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
          {accreditation.description}
        </p>

        {/* Cost - prominently displayed */}
        <div className="flex items-center gap-1 text-sm font-medium text-elec-yellow">
          <PoundSterling className="h-4 w-4" />
          <span>{accreditation.cost}</span>
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

        {/* Key Benefits Preview */}
        {accreditation.benefits.length > 0 && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {accreditation.benefits.slice(0, 3).map((benefit, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="bg-elec-dark/50 text-white border-elec-yellow/20 text-xs"
                >
                  {benefit}
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

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-white/80">
            <Calendar className="h-3 w-3" />
            <span>{accreditation.renewalPeriod || 'No renewal'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-3 text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow group/btn"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(accreditation);
              }}
            >
              <span className="text-xs">View Details</span>
            </Button>
            {isValidUrl(accreditation.website) && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow group/btn"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(accreditation.website, '_blank');
                }}
              >
                <ExternalLink className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccreditationCard;