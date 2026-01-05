
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, Target, Star, Award, CheckCircle, Eye, Link, Shield, 
  Zap, BookOpen, TrendingUp, FileText, Crown, Globe, Sparkles,
  Filter, ChevronDown
} from 'lucide-react';
import { useAchievements } from '@/hooks/useAchievements';
import { ACHIEVEMENT_CATEGORIES, RARITY_COLORS } from '@/data/achievements';
import { Achievement } from '@/types/achievements';

const ICON_MAP = {
  Trophy, Target, Star, Award, Eye, Link, Shield, Zap, BookOpen, 
  TrendingUp, FileText, Crown, Globe, Sparkles
};

const QuizAchievements = () => {
  const {
    achievements,
    unlockedAchievements,
    recentlyUnlocked,
    getAchievementProgress,
    getAchievementsByCategory,
    getAchievementStats
  } = useAchievements();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  const stats = getAchievementStats();

  const getCategoryColors = (category: Achievement['category']) => {
    switch (category) {
      case 'progress': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'performance': return 'from-elec-yellow/20 to-amber-500/20 border-elec-yellow/30';
      case 'milestone': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'advanced': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30';
    }
  };

  const getRarityGlow = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'shadow-sm';
      case 'uncommon': return 'shadow-md shadow-green-500/10';
      case 'rare': return 'shadow-lg shadow-blue-500/20';
      case 'epic': return 'shadow-lg shadow-purple-500/30';
      case 'legendary': return 'shadow-xl shadow-elec-yellow/40';
      default: return 'shadow-sm';
    }
  };

  const getIconColors = (achievement: Achievement) => {
    if (achievement.unlocked) {
      switch (achievement.category) {
        case 'progress': return 'bg-green-500/20 text-green-400';
        case 'performance': return 'bg-elec-yellow/20 text-elec-yellow';
        case 'milestone': return 'bg-blue-500/20 text-blue-400';
        case 'advanced': return 'bg-purple-500/20 text-purple-400';
        default: return 'bg-elec-yellow/20 text-elec-yellow';
      }
    }
    return 'bg-neutral-600 text-gray-400';
  };

  const filteredAchievements = achievements.filter(achievement => {
    if (showUnlockedOnly && !achievement.unlocked) return false;
    if (selectedCategory !== 'all' && achievement.category !== selectedCategory) return false;
    return true;
  });

  const renderAchievement = (achievement: Achievement) => {
    const IconComponent = ICON_MAP[achievement.icon as keyof typeof ICON_MAP] || Trophy;
    const progress = getAchievementProgress(achievement);
    const rarityColor = RARITY_COLORS[achievement.rarity];

    return (
      <div 
        key={achievement.id} 
        className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
          achievement.unlocked 
            ? `bg-gradient-to-br ${getCategoryColors(achievement.category)} ${getRarityGlow(achievement.rarity)}` 
            : 'bg-muted/50 border-border hover:border-neutral-500 hover:bg-muted'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`p-3 rounded-xl flex-shrink-0 transition-all duration-300 ${
            getIconColors(achievement)
          }`}>
            <IconComponent className="h-6 w-6" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className={`font-medium ${achievement.unlocked ? 'text-foreground' : 'text-gray-300'}`}>
                  {achievement.title}
                </h4>
                <p className="text-sm text-gray-400 mt-1">
                  {achievement.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-xs ${rarityColor} border-current`}>
                  {achievement.rarity}
                </Badge>
                {achievement.unlocked && (
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                )}
              </div>
            </div>
            
            {!achievement.unlocked && progress && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{progress.currentValue}/{progress.targetValue}</span>
                </div>
                <Progress value={progress.percentage} className="h-1" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
              <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
              Achievements
            </CardTitle>
            <CardDescription className="text-gray-300 mt-1 text-sm">
              {stats.unlockedCount}/{stats.totalAchievements} unlocked ({stats.progressPercentage.toFixed(0)}%)
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow hover:text-black text-xs w-full sm:w-auto"
          >
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {showUnlockedOnly ? 'Show All' : 'Unlocked Only'}
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mt-4">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="text-xs"
          >
            All
          </Button>
          {Object.entries(ACHIEVEMENT_CATEGORIES).map(([key, category]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(key)}
              className="text-xs"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6">
        {recentlyUnlocked.length > 0 && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/30 rounded-xl shadow-lg shadow-elec-yellow/20">
            <h4 className="text-elec-yellow font-medium mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
              Recently Unlocked!
            </h4>
            <div className="space-y-2">
              {recentlyUnlocked.map(achievement => (
                <div key={achievement.id} className="text-xs sm:text-sm text-foreground bg-card/50 p-2 rounded-lg border border-elec-yellow/20">
                  🎉 {achievement.title}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-2 sm:space-y-3">
          {filteredAchievements.length > 0 ? (
            filteredAchievements.map(renderAchievement)
          ) : (
            <div className="text-center py-6 sm:py-8 text-gray-400">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No achievements match your current filters</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizAchievements;
