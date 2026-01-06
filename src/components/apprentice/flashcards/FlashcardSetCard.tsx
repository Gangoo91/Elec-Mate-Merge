
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Target, CheckCircle, Trophy, Zap, Star, Flame, ArrowRight } from "lucide-react";
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
  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return {
          bg: 'bg-green-500/10',
          text: 'text-green-400',
          border: 'border-green-500/30',
          icon: Star,
          label: 'Beginner'
        };
      case 'intermediate':
        return {
          bg: 'bg-elec-yellow/10',
          text: 'text-elec-yellow',
          border: 'border-elec-yellow/30',
          icon: Zap,
          label: 'Intermediate'
        };
      case 'advanced':
        return {
          bg: 'bg-red-500/10',
          text: 'text-red-400',
          border: 'border-red-500/30',
          icon: Trophy,
          label: 'Advanced'
        };
      default:
        return {
          bg: 'bg-white/20',
          text: 'text-white',
          border: 'border-white/20',
          icon: Star,
          label: 'Unknown'
        };
    }
  };

  const progress = set.progressPercentage || 0;
  const mastered = set.masteredCards || 0;
  const difficultyConfig = getDifficultyConfig(set.difficulty);
  const DifficultyIcon = difficultyConfig.icon;
  const SetIcon = set.icon;

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-500 to-green-400';
    if (progress >= 50) return 'from-elec-yellow to-yellow-400';
    if (progress > 0) return 'from-blue-500 to-blue-400';
    return 'from-white/20 to-white/10';
  };

  return (
    <Card
      className={`
        bg-gradient-to-br from-elec-gray to-elec-card
        border-white/10 hover:border-elec-yellow/40
        transition-all duration-300 hover:scale-[1.02]
        h-full cursor-pointer group
        touch-manipulation active:scale-[0.98]
      `}
      onClick={() => onStart(set.id)}
    >
      <CardContent className="p-5 sm:p-6 h-full flex flex-col">
        {/* Header Section */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`
            p-3 rounded-xl flex-shrink-0 transition-all duration-300
            bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5
            border border-elec-yellow/30
            group-hover:border-elec-yellow/50 group-hover:shadow-lg group-hover:shadow-elec-yellow/10
          `}>
            <SetIcon className="h-6 w-6 text-elec-yellow" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-white truncate text-lg group-hover:text-elec-yellow transition-colors">
                {set.title}
              </h3>
              {set.completed && (
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
              )}
            </div>
            <Badge
              variant="outline"
              className="text-xs bg-white/5 border-white/20 text-white/70 mb-2"
            >
              {set.category}
            </Badge>
            <p className="text-sm text-white/70 line-clamp-2">{set.description}</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="flex-1">
          {progress > 0 && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Progress</span>
                <span className="text-xs font-semibold text-elec-yellow">{progress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getProgressColor(progress)} transition-all duration-500 rounded-full`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center gap-1 text-xs text-white/60">
                <Flame className="h-3 w-3 text-orange-400" />
                <span>{mastered} of {set.count} cards mastered</span>
              </div>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-white/60 mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-blue-400" />
              <span>{set.count} cards</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-purple-400" />
              <span>{set.estimatedTime}</span>
            </div>
          </div>
          {set.lastStudied && (
            <div className="text-xs text-elec-yellow/70 flex items-center gap-1">
              <span>{set.lastStudied}</span>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between gap-3">
          <Badge
            className={`
              ${difficultyConfig.bg} ${difficultyConfig.text} ${difficultyConfig.border}
              flex items-center gap-1.5 text-xs px-3 py-1
            `}
            variant="outline"
          >
            <DifficultyIcon className="h-3 w-3" />
            {difficultyConfig.label}
          </Badge>

          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onStart(set.id);
            }}
            className="
              bg-elec-yellow text-black hover:bg-elec-yellow/90
              font-semibold transition-all duration-200
              h-10 px-4 touch-manipulation active:scale-95
              group-hover:shadow-lg group-hover:shadow-elec-yellow/20
            "
          >
            <Play className="mr-2 h-4 w-4" />
            {progress > 0 ? 'Continue' : 'Start'}
            <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashcardSetCard;
