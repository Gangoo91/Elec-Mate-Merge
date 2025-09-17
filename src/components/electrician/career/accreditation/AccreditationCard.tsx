import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, MapPin, Clock, PoundSterling, 
  TrendingUp, ExternalLink, Users, Calendar, Check
} from "lucide-react";
import { AccreditationOption } from "../../../apprentice/career/accreditation/enhancedAccreditationData";
import { isValidUrl } from "@/utils/urlUtils";
import { cn } from "@/lib/utils";
import { getBrandInfo, getLogoUrl, getInitials } from "./accreditationBranding";

interface AccreditationCardProps {
  accreditation: AccreditationOption;
  onViewDetails: (accreditation: AccreditationOption) => void;
}

const AccreditationCard = ({ accreditation, onViewDetails }: AccreditationCardProps) => {
  const brandInfo = getBrandInfo(accreditation.accreditationBody);
  const logoUrl = getLogoUrl(accreditation.accreditationBody, accreditation.website);

  const getCategoryColor = (category: string) => {
    const colors = {
      "Competent Person Schemes": "bg-purple-500/20 border-purple-500/30 text-purple-300",
      "Professional Engineering Bodies": "bg-blue-500/20 border-blue-500/30 text-blue-300",
      "Trade Associations": "bg-green-500/20 border-green-500/30 text-green-300",
      "Safety & Health Bodies": "bg-red-500/20 border-red-500/30 text-red-300",
      "Project & Construction Management": "bg-amber-500/20 border-amber-500/30 text-amber-300",
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
      className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.01] h-full cursor-pointer"
      onClick={() => onViewDetails(accreditation)}
    >
      {/* Header section with logo and title */}
      <div className="relative overflow-hidden h-32 sm:h-36 bg-gradient-to-br from-elec-yellow/10 via-elec-yellow/5 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Logo section */}
        <div className="absolute top-3 left-3 flex items-center gap-3">
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 bg-white/10 backdrop-blur-sm"
            style={{ borderColor: brandInfo.brandColor }}
          >
            {logoUrl ? (
              <img 
                src={logoUrl}
                alt={`${accreditation.accreditationBody} logo`}
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to initials if logo fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-xs sm:text-sm font-bold text-white">${getInitials(accreditation.accreditationBody)}</span>`;
                    parent.style.backgroundColor = brandInfo.brandColor + '20';
                  }
                }}
              />
            ) : (
              <span 
                className="text-xs sm:text-sm font-bold text-white"
                style={{ backgroundColor: brandInfo.brandColor + '20' }}
              >
                {getInitials(accreditation.accreditationBody)}
              </span>
            )}
          </div>
          
          {/* Category Badge */}
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

        {/* Popularity indicator */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs">
          <TrendingUp className={`h-3 w-3 ${getPopularityColor(accreditation.popularity)}`} />
          <span className="text-white/90">{accreditation.popularity}%</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex flex-col h-[calc(100%-8rem)] sm:h-[calc(100%-9rem)]">
        {/* Title and Provider */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white line-clamp-2 leading-tight text-sm sm:text-base">
            {accreditation.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-amber-400">
            <Award className="h-3 w-3" />
            <span className="font-medium truncate">{accreditation.provider}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/80 line-clamp-2 leading-relaxed text-xs sm:text-sm flex-grow">
          {accreditation.description}
        </p>

        {/* Meta information grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1 text-white/70">
            <Clock className="h-3 w-3" />
            <span className="truncate">{accreditation.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-elec-yellow font-medium">
            <PoundSterling className="h-3 w-3" />
            <span className="truncate">{accreditation.cost}</span>
          </div>
          {accreditation.locations.length > 0 && (
            <div className="flex items-center gap-1 text-white/70 col-span-2">
              <MapPin className="h-3 w-3" />
              <span className="truncate">
                {accreditation.locations.slice(0, 2).join(', ')}
                {accreditation.locations.length > 2 && ` +${accreditation.locations.length - 2} more`}
              </span>
            </div>
          )}
        </div>

        {/* Key Benefits */}
        {accreditation.benefits.length > 0 && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {accreditation.benefits.slice(0, 2).map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-1 text-xs text-white/80">
                  <Check className="h-3 w-3 text-green-400 flex-shrink-0" />
                  <span className="truncate">{benefit}</span>
                </div>
              ))}
              {accreditation.benefits.length > 2 && (
                <span className="text-xs text-white/60">
                  +{accreditation.benefits.length - 2} more benefits
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-white/70">
            <Calendar className="h-3 w-3" />
            <span className="truncate">{accreditation.renewalPeriod || 'No renewal'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-3 text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(accreditation);
              }}
              aria-label={`View details for ${accreditation.title}`}
            >
              <span className="text-xs">Details</span>
            </Button>
            {isValidUrl(accreditation.website) && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(accreditation.website, '_blank');
                }}
                aria-label={`Visit ${accreditation.accreditationBody} website`}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccreditationCard;