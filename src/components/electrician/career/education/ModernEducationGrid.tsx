import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star, Clock, ExternalLink, GraduationCap, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LiveEducationData } from "@/hooks/useLiveEducationData";

interface ModernEducationGridProps {
  programmes: LiveEducationData[];
  excludeId?: string;
  onProgrammeClick?: (programme: LiveEducationData) => void;
}

const ModernEducationGrid = ({ programmes, excludeId, onProgrammeClick }: ModernEducationGridProps) => {
  const filteredProgrammes = excludeId 
    ? programmes.filter(programme => programme.id !== excludeId)
    : programmes;

  const getCategoryColor = (category: string) => {
    const colors = {
      "Degree": "bg-blue-500/20 border-blue-500/30 text-blue-300",
      "Certificate": "bg-green-500/20 border-green-500/30 text-green-300",
      "Diploma": "bg-purple-500/20 border-purple-500/30 text-purple-300",
      "Apprenticeship": "bg-orange-500/20 border-orange-500/30 text-orange-300",
      "Foundation": "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
      "Master": "bg-red-500/20 border-red-500/30 text-red-300",
      "HNC": "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
      "HND": "bg-pink-500/20 border-pink-500/30 text-pink-300",
    };
    return colors[category as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const getLevelColor = (level: string) => {
    const colors = {
      "Level 3": "bg-green-500/20 border-green-500/30 text-green-300",
      "Level 4": "bg-blue-500/20 border-blue-500/30 text-blue-300",
      "Level 5": "bg-purple-500/20 border-purple-500/30 text-purple-300",
      "Level 6": "bg-red-500/20 border-red-500/30 text-red-300",
      "Level 7": "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
    };
    return colors[level as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const getCategoryImage = (category: string) => {
    const images = {
      "Degree": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop&auto=format",
      "Certificate": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop&auto=format",
      "Diploma": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop&auto=format",
      "Apprenticeship": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop&auto=format",
      "Foundation": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format",
      "Master": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&auto=format",
      "HNC": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&auto=format",
      "HND": "https://images.unsplash.com/photo-1574188041339-3d9d896ce7f8?w=400&h=250&fit=crop&auto=format",
    };
    return images[category as keyof typeof images] || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop&auto=format";
  };

  const formatDuration = (duration: string) => {
    const match = duration.match(/(\d+)/);
    return match ? `${match[1]} year${parseInt(match[1]) > 1 ? 's' : ''}` : duration;
  };

  const isHighRated = (programme: LiveEducationData) => programme.rating >= 4.0;
  const isHighEmployment = (programme: LiveEducationData) => programme.employmentRate >= 85;

  if (filteredProgrammes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-elec-yellow/10 flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="h-8 w-8 text-elec-yellow" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Programmes Found</h3>
        <p className="text-white/90">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProgrammes.map((programme) => (
          <div 
            key={programme.id}
            className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] h-full cursor-pointer"
            onClick={() => onProgrammeClick?.(programme)}
          >
            {/* Image */}
            <div className="relative overflow-hidden h-40 sm:h-48">
              <img
                src={getCategoryImage(programme.category)}
                alt={programme.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <Badge className={cn("text-xs font-medium", getCategoryColor(programme.category))}>
                  {programme.category}
                </Badge>
              </div>

              {/* Level Badge */}
              <div className="absolute top-3 right-3">
                <Badge className={cn("text-xs font-medium", getLevelColor(programme.level))}>
                  {programme.level}
                </Badge>
              </div>

              {/* Special Indicators */}
              <div className="absolute bottom-3 left-3 flex gap-2">
                {isHighEmployment(programme) && (
                  <Badge className="bg-elec-yellow/20 border-elec-yellow/30 text-elec-yellow text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    High Demand
                  </Badge>
                )}
                {isHighRated(programme) && (
                  <Badge className="bg-green-500/20 border-green-500/30 text-green-300 text-xs">
                    Top Rated
                  </Badge>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 space-y-3 flex flex-col h-[calc(100%-10rem)] sm:h-[calc(100%-12rem)]">
              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{programme.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-3 w-3" />
                    <span>{programme.employmentRate}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDuration(programme.duration)}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-white line-clamp-2 leading-tight flex-grow text-sm sm:text-base" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                {programme.title}
              </h3>

              {/* Institution */}
              <p className="text-elec-yellow text-xs sm:text-sm font-medium line-clamp-1">
                {programme.institution}
              </p>

              {/* Description */}
              <p className="text-white/90 line-clamp-2 leading-relaxed flex-grow text-xs sm:text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                {programme.description}
              </p>

              {/* Study Details */}
              <div className="text-white/80 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Mode:</span>
                  <span>{programme.studyMode}</span>
                </div>
                {programme.locations.length > 0 && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="line-clamp-1">{programme.locations[0]}</span>
                    {programme.locations.length > 1 && (
                      <span className="text-elec-yellow">+{programme.locations.length - 1}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                <div className="text-xs text-white/80">
                  <span className="font-medium">{programme.tuitionFees}</span>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-3 text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow group/btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onProgrammeClick?.(programme);
                  }}
                >
                  <span className="text-xs">View</span>
                  <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernEducationGrid;