
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, Target, CheckCircle, Trophy, Zap, Star, BookOpen } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface FlashcardSet {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  count: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  category: string;
  completed?: boolean;
  progressPercentage?: number;
  lastStudied?: string;
  masteredCards?: number;
}

interface FlashcardSetCardProps {
  set: FlashcardSet;
  onStart: (setId: string) => void;
}

const FlashcardSetCard = ({ set, onStart }: FlashcardSetCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return Star;
      case 'intermediate': return Zap;
      case 'advanced': return Trophy;
      default: return Star;
    }
  };

  const progress = set.progressPercentage || 0;
  const mastered = set.masteredCards || 0;
  const DifficultyIcon = getDifficultyIcon(set.difficulty);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-all duration-300 hover:scale-[1.02] h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-elec-yellow/15 border border-elec-yellow/30 flex-shrink-0">
            <set.icon className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg text-elec-light flex items-center gap-2 mb-1">
              <span className="truncate">{set.title}</span>
              {set.completed && <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />}
            </CardTitle>
            <p className="text-xs text-elec-light/60 mb-2">{set.category}</p>
            <p className="text-sm text-elec-light/80 line-clamp-2">{set.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-0">
        {/* Progress Section */}
        {progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-elec-light/60">Progress</span>
              <span className="text-xs text-elec-yellow font-medium">{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-elec-dark/50"
            />
            <div className="text-xs text-elec-light/60">
              {mastered} of {set.count} cards mastered
            </div>
          </div>
        )}
        
        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-elec-light/60">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              <span>{set.count} cards</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{set.estimatedTime}</span>
            </div>
          </div>
          {set.lastStudied && (
            <div className="text-xs text-elec-yellow/70">
              {set.lastStudied}
            </div>
          )}
        </div>
        
        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-2">
          <Badge className={`${getDifficultyColor(set.difficulty)} flex items-center gap-1 text-xs`} variant="outline">
            <DifficultyIcon className="h-3 w-3" />
            {set.difficulty}
          </Badge>
          
          <Button 
            size="sm"
            onClick={() => onStart(set.id)}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium transition-colors"
          >
            <Play className="mr-2 h-4 w-4" />
            {progress > 0 ? 'Continue' : 'Start'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashcardSetCard;
