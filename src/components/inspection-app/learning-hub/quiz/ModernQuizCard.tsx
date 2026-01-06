import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Star, BookOpen } from 'lucide-react';
import { Assessment } from '@/types/quiz';
import QuizProgressRing from './QuizProgressRing';
import CategoryIcon from './CategoryIcon';

interface ModernQuizCardProps {
  assessment: Assessment;
  onStart: () => void;
}

const ModernQuizCard = ({ assessment, onStart }: ModernQuizCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'from-bs7671-safe to-emerald-400';
      case 'Intermediate': return 'from-bs7671-warning to-orange-400';
      case 'Advanced': return 'from-bs7671-danger to-red-400';
      default: return 'from-muted to-muted-foreground';
    }
  };

  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      'Visual Inspection': 'from-emerald-500/20 to-emerald-600/5',
      'Continuity Testing': 'from-blue-500/20 to-blue-600/5',
      'Insulation Resistance': 'from-purple-500/20 to-purple-600/5',
      'Polarity Testing': 'from-green-500/20 to-green-600/5',
      'Earth Fault Loop': 'from-red-500/20 to-red-600/5',
      'RCD Testing': 'from-orange-500/20 to-orange-600/5',
      'Prospective Fault': 'from-cyan-500/20 to-cyan-600/5',
      'Functional Testing': 'from-teal-500/20 to-teal-600/5',
    };
    return gradients[category] || 'from-card to-muted/50';
  };

  const getBorderColor = (category: string) => {
    const borders: Record<string, string> = {
      'Visual Inspection': 'border-emerald-500/30 hover:border-emerald-500/60',
      'Continuity Testing': 'border-blue-500/30 hover:border-blue-500/60',
      'Insulation Resistance': 'border-purple-500/30 hover:border-purple-500/60',
      'Polarity Testing': 'border-green-500/30 hover:border-green-500/60',
      'Earth Fault Loop': 'border-red-500/30 hover:border-red-500/60',
      'RCD Testing': 'border-orange-500/30 hover:border-orange-500/60',
      'Prospective Fault': 'border-cyan-500/30 hover:border-cyan-500/60',
      'Functional Testing': 'border-teal-500/30 hover:border-teal-500/60',
    };
    return borders[category] || 'border-border hover:border-border/80';
  };

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${getBorderColor(assessment.category)}`}
      style={{ 
        background: `linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)`,
      }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(assessment.category)} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-br from-elec-yellow/10 to-transparent" />

      <CardHeader className="relative space-y-3 p-4 sm:p-6">
        {/* Category Badge & Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 backdrop-blur-sm border border-border/50">
            <CategoryIcon category={assessment.category} className="h-4 w-4 text-elec-yellow" />
            <span className="text-xs font-medium text-foreground">{assessment.category}</span>
          </div>
          {assessment.score !== null && (
            <QuizProgressRing progress={assessment.score} size={40} strokeWidth={3} />
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-elec-yellow transition-colors line-clamp-2">
            {assessment.title}
          </h3>
          <p className="text-sm text-white/80 line-clamp-2">
            {assessment.description}
          </p>
        </div>

        {/* Regulation Reference */}
        {assessment.regulation && (
          <div className="flex items-center gap-2 text-xs">
            <BookOpen className="h-3 w-3 text-elec-yellow" />
            <span className="font-mono text-elec-yellow/90">{assessment.regulation}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="relative p-4 sm:p-6 pt-0 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-border/50 text-center">
            <div className="text-lg sm:text-xl font-bold text-elec-yellow">{assessment.questions}</div>
            <div className="text-xs text-white/80">Questions</div>
          </div>
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-border/50 text-center">
            <div className="flex items-center justify-center gap-1 text-lg sm:text-xl font-bold text-foreground">
              <Clock className="h-4 w-4" />
              {assessment.duration}
            </div>
            <div className="text-xs text-white/80">Minutes</div>
          </div>
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-border/50 text-center">
            {assessment.score !== null ? (
              <>
                <div className="flex items-center justify-center gap-1 text-lg sm:text-xl font-bold text-elec-yellow">
                  <Star className="h-4 w-4 fill-current" />
                  {assessment.score}%
                </div>
                <div className="text-xs text-white/80">Best</div>
              </>
            ) : (
              <>
                <div className="text-lg sm:text-xl font-bold text-white/80">—</div>
                <div className="text-xs text-white/80">Not taken</div>
              </>
            )}
          </div>
        </div>

        {/* Difficulty & Action */}
        <div className="flex items-center justify-between gap-3">
          <div className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${getDifficultyColor(assessment.difficulty)} text-foreground shadow-lg`}>
            {assessment.difficulty}
          </div>
          <Button 
            onClick={onStart}
            size="sm"
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold px-4 sm:px-6 min-h-[44px] sm:min-h-[40px] shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {assessment.score !== null ? 'Retake' : 'Start Quiz'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernQuizCard;
