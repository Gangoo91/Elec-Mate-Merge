
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, MapPin, PoundSterling, Users, Star, Award, 
  TrendingUp, Calendar, BookOpen, Info
} from "lucide-react";
import { EnhancedEducationOption } from "./enhancedEducationData";

interface EnhancedEducationCardProps {
  option: EnhancedEducationOption;
  onViewDetails: (option: EnhancedEducationOption) => void;
  onSaveToFavorites?: (id: number) => void;
  isFavorite?: boolean;
}

const EnhancedEducationCard = ({ 
  option, 
  onViewDetails, 
  onSaveToFavorites,
  isFavorite = false 
}: EnhancedEducationCardProps) => {
  
  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "High": return "text-green-400 bg-green-400/10 border-green-400/30";
      case "Medium": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "Low": return "text-red-400 bg-red-400/10 border-red-400/30";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case "Full-time": return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Part-time": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Distance Learning": return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "Flexible": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-200 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-1">{option.title}</CardTitle>
            <p className="text-sm text-amber-400">{option.institution}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="outline" className="text-xs bg-elec-dark/50 border-elec-yellow/30">
              {option.level}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-amber-400">{option.rating}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-grow flex flex-col">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{option.description}</p>
        
        {/* Key Information Grid */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <span className="text-muted-foreground">{option.duration}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <PoundSterling className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <span className="text-muted-foreground">{option.cost}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <span className="text-muted-foreground">{option.employmentRate}% employment rate</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <span className="text-muted-foreground">Next intake: {option.nextIntakes[0]}</span>
          </div>
        </div>

        {/* Study Mode and Demand */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className={`text-xs ${getModeColor(option.studyMode)}`}>
            {option.studyMode}
          </Badge>
          <Badge variant="outline" className={`text-xs ${getDemandColor(option.industryDemand)}`}>
            {option.industryDemand} Demand
          </Badge>
        </div>

        {/* Key Topics Preview */}
        <div className="mb-4">
          <h5 className="text-xs font-medium text-elec-yellow mb-2">Key Topics:</h5>
          <div className="flex flex-wrap gap-1">
            {option.keyTopics.slice(0, 3).map((topic, idx) => (
              <span 
                key={idx}
                className="text-xs bg-elec-dark/60 px-2 py-0.5 rounded border border-elec-yellow/10"
              >
                {topic}
              </span>
            ))}
            {option.keyTopics.length > 3 && (
              <span className="text-xs text-muted-foreground">+{option.keyTopics.length - 3} more</span>
            )}
          </div>
        </div>

        {/* Career Outcomes Preview */}
        <div className="mb-4">
          <h5 className="text-xs font-medium text-elec-yellow mb-2">Career Outcomes:</h5>
          <div className="space-y-1">
            {option.careerOutcomes.slice(0, 2).map((outcome, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <TrendingUp className="h-3 w-3 text-green-400 flex-shrink-0" />
                <span className="text-muted-foreground">{outcome}</span>
              </div>
            ))}
            {option.careerOutcomes.length > 2 && (
              <span className="text-xs text-muted-foreground ml-5">+{option.careerOutcomes.length - 2} more roles</span>
            )}
          </div>
        </div>

        {/* Salary Information */}
        <div className="mt-auto pt-4 border-t border-elec-yellow/10">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-muted-foreground">Starting salary:</span>
            <span className="font-medium text-green-400">{option.averageStartingSalary}</span>
          </div>
          
          <Button 
            className="w-full bg-elec-yellow text-elec-dark hover:bg-amber-400"
            onClick={() => onViewDetails(option)}
          >
            <Info className="mr-2 h-4 w-4" />
            View Full Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedEducationCard;
