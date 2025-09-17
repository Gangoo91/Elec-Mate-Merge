import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Clock, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedCareerCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  category?: string;
  popularity?: number;
  timeToComplete?: string;
  skillLevel?: "Beginner" | "Intermediate" | "Advanced";
  certificationRequired?: boolean;
}

const EnhancedCareerCard = ({ 
  title, 
  description, 
  icon, 
  onClick,
  category = "Professional Development",
  popularity = 0,
  timeToComplete = "3-6 months",
  skillLevel = "Intermediate",
  certificationRequired = false
}: EnhancedCareerCardProps) => {
  
  const getSkillLevelColor = (level: string) => {
    const colors = {
      "Beginner": "bg-green-500/20 border-green-500/30 text-green-300",
      "Intermediate": "bg-blue-500/20 border-blue-500/30 text-blue-300", 
      "Advanced": "bg-purple-500/20 border-purple-500/30 text-purple-300",
    };
    return colors[level as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const isPopular = popularity > 80;
  const isHighDemand = popularity > 90;

  return (
    <div 
      className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] h-full cursor-pointer"
      onClick={onClick}
    >
      {/* Header with gradient overlay */}
      <div className="relative overflow-hidden h-24 sm:h-28 bg-gradient-to-br from-elec-yellow/20 via-elec-yellow/10 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Icon centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="transition-transform group-hover:scale-110 duration-300">
            {icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 space-y-3 flex flex-col h-[calc(100%-6rem)] sm:h-[calc(100%-7rem)]">
        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{popularity}% popular</span>
            </div>
            {isPopular && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>Popular</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{timeToComplete}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-white line-clamp-2 leading-tight flex-grow text-sm sm:text-base" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/90 line-clamp-2 leading-relaxed flex-grow text-xs sm:text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
          {description}
        </p>

        {/* Additional Badges */}
        {(isHighDemand || certificationRequired) && (
          <div className="flex items-center gap-2 flex-wrap">
            {isHighDemand && (
              <Badge className="bg-red-500/20 border-red-500/30 text-red-300 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                High Demand
              </Badge>
            )}
            {certificationRequired && (
              <Badge className="bg-orange-500/20 border-orange-500/30 text-orange-300 text-xs">
                Certification Required
              </Badge>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
          <div className="text-xs text-white/80">
            Career Development
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-3 text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow group/btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <span className="text-xs">Explore</span>
            <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCareerCard;