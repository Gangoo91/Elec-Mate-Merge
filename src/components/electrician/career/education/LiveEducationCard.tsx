
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, MapPin, Clock, PoundSterling, 
  Star, ExternalLink, Calendar, Users, TrendingUp
} from "lucide-react";
import { LiveEducationData } from "@/hooks/useLiveEducationData";

interface LiveEducationCardProps {
  option: LiveEducationData;
  onViewDetails: (option: LiveEducationData) => void;
}

const LiveEducationCard = ({ option, onViewDetails }: LiveEducationCardProps) => {
  const isNewIntakeSoon = () => {
    if (!option.nextIntake || option.nextIntake.includes('Throughout')) {
      return false;
    }
    try {
      const intakeDate = new Date(option.nextIntake);
      const now = new Date();
      const timeDiff = intakeDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff > 0 && daysDiff <= 90; // Next 3 months
    } catch {
      return false;
    }
  };

  const getEmploymentStatusColor = (rate: number) => {
    if (rate >= 95) return 'text-green-400';
    if (rate >= 90) return 'text-blue-400';
    if (rate >= 85) return 'text-amber-400';
    return 'text-muted-foreground';
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'apprenticeship':
        return '🎓';
      case 'engineering':
      case 'bachelor\'s degree':
        return '⚡';
      case 'professional certification':
        return '🏆';
      case 'master\'s degree':
        return '🎖️';
      default:
        return '📚';
    }
  };

  return (
    <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full group">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getCategoryIcon(option.category)}</span>
            <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-xs">
              {option.level || 'Level Not Specified'}
            </Badge>
          </div>
          {isNewIntakeSoon() && (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
              New Intake Soon
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-lg leading-tight group-hover:text-elec-yellow transition-colors">
          {option.title}
        </CardTitle>
        
        <div className="flex items-center gap-2 text-sm text-amber-400">
          <GraduationCap className="h-4 w-4" />
          <span className="font-medium">{option.institution}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {option.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            <span className="text-white font-medium">{option.rating}</span>
            <span className="text-muted-foreground">rating</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className={`h-3 w-3 ${getEmploymentStatusColor(option.employmentRate)}`} />
            <span className="text-white font-medium">{option.employmentRate}%</span>
            <span className="text-muted-foreground">employed</span>
          </div>
        </div>

        {/* Duration and Study Mode */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{option.duration}</span>
          </div>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
            {option.studyMode}
          </Badge>
        </div>

        {/* Location */}
        {option.locations.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">
              {option.locations.slice(0, 2).join(', ')}
              {option.locations.length > 2 && ` +${option.locations.length - 2} more`}
            </span>
          </div>
        )}

        {/* Fees */}
        <div className="flex items-center gap-1 text-sm font-medium text-elec-yellow">
          <PoundSterling className="h-4 w-4" />
          <span>{option.tuitionFees}</span>
        </div>

        {/* Next Intake */}
        {option.nextIntake && (
          <div className="flex items-center gap-1 text-xs text-green-400">
            <Calendar className="h-3 w-3" />
            <span>Next intake: {option.nextIntake}</span>
          </div>
        )}

        {/* Key Topics Preview */}
        {option.keyTopics.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground">Key Topics:</span>
            <div className="flex flex-wrap gap-1">
              {option.keyTopics.slice(0, 3).map((topic, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="bg-elec-dark/50 text-white border-elec-yellow/20 text-xs"
                >
                  {topic}
                </Badge>
              ))}
              {option.keyTopics.length > 3 && (
                <Badge variant="outline" className="bg-elec-dark/50 text-muted-foreground border-elec-yellow/20 text-xs">
                  +{option.keyTopics.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={() => onViewDetails(option)}
            variant="outline"
            className="flex-1 border-elec-yellow/30 hover:bg-elec-yellow/10 text-xs"
          >
            View Details
          </Button>
          {option.courseUrl && (
            <Button 
              variant="ghost" 
              size="sm"
              className="px-2 hover:bg-elec-yellow/10"
              onClick={(e) => {
                e.stopPropagation();
                window.open(option.courseUrl, '_blank');
              }}
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Live Data Indicator */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-elec-yellow/10">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live data</span>
          </div>
          <span>{new Date(option.lastUpdated).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveEducationCard;
