
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Target, CheckCircle } from "lucide-react";
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
}

interface FlashcardSetCardProps {
  set: FlashcardSet;
  onStart: (setId: string) => void;
}

const FlashcardSetCard = ({ set, onStart }: FlashcardSetCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-elec-yellow/10">
              <set.icon className="h-6 w-6 text-elec-yellow" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                {set.title}
                {set.completed && <CheckCircle className="h-4 w-4 text-green-400" />}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">{set.category}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-elec-light/80">{set.description}</p>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            <span>{set.count} cards</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{set.estimatedTime}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge className={getDifficultyColor(set.difficulty)} variant="outline">
            {set.difficulty}
          </Badge>
          <Button 
            size="sm"
            onClick={() => onStart(set.id)}
            className="bg-elec-yellow/10 hover:bg-elec-yellow hover:text-black"
          >
            <Play className="mr-2 h-4 w-4" />
            Study
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashcardSetCard;
