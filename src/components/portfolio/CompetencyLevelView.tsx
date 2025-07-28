import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Target, Trophy } from 'lucide-react';
import { PortfolioEntry, PortfolioCategory } from '@/types/portfolio';

interface CompetencyLevelViewProps {
  categories: PortfolioCategory[];
  getEntriesByCompetencyLevel: (level: 'foundation' | 'intermediate' | 'advanced') => PortfolioEntry[];
}

const CompetencyLevelView: React.FC<CompetencyLevelViewProps> = ({
  categories,
  getEntriesByCompetencyLevel
}) => {
  const competencyLevels = [
    {
      level: 'foundation' as const,
      name: 'Foundation',
      description: 'Essential skills and basic competencies',
      icon: Target,
      color: 'green',
      bgColor: 'bg-green-50'
    },
    {
      level: 'intermediate' as const,
      name: 'Intermediate',
      description: 'Advanced skills and specialized knowledge',
      icon: GraduationCap,
      color: 'blue',
      bgColor: 'bg-blue-50'
    },
    {
      level: 'advanced' as const,
      name: 'Advanced',
      description: 'Expert-level competencies and leadership skills',
      icon: Trophy,
      color: 'purple',
      bgColor: 'bg-purple-50'
    }
  ];

  const getLevelStats = (level: 'foundation' | 'intermediate' | 'advanced') => {
    const levelCategories = categories.filter(cat => cat.competencyLevel === level);
    const entries = getEntriesByCompetencyLevel(level);
    const completedEntries = entries.filter(e => e.status === 'completed');
    const totalRequired = levelCategories.reduce((sum, cat) => sum + cat.requiredEntries, 0);
    const totalCompleted = completedEntries.length;
    const progress = totalRequired > 0 ? Math.round((totalCompleted / totalRequired) * 100) : 0;

    return {
      categories: levelCategories,
      entries,
      completedEntries,
      totalRequired,
      totalCompleted,
      progress
    };
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Competency Progression</h2>
        <p className="text-muted-foreground">Track your development across different skill levels</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {competencyLevels.map((level) => {
          const stats = getLevelStats(level.level);
          const IconComponent = level.icon;

          return (
            <Card key={level.level} className="relative overflow-hidden border-elec-yellow/20 bg-elec-dark">
              <div className={`absolute top-0 left-0 w-full h-1 bg-${level.color}-500`} />
              <CardHeader className="pb-4">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`p-3 rounded-xl ${level.bgColor} shadow-md`}>
                    <IconComponent className={`h-8 w-8 text-${level.color}-600`} />
                  </div>
                  <div className="space-y-1">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-3 py-1 bg-${level.color}-100 text-${level.color}-700 border-${level.color}-200`}
                    >
                      {level.level}
                    </Badge>
                    <CardTitle className="text-xl font-bold text-elec-light">{level.name}</CardTitle>
                    <CardDescription className="text-sm text-elec-light/70 max-w-xs mx-auto leading-relaxed">
                      {level.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-elec-light">Overall Progress</span>
                    <span className="font-bold text-elec-yellow">{stats.progress}%</span>
                  </div>
                  <Progress value={stats.progress} className="h-3" />
                </div>

                <div className="text-center">
                  <p className="text-sm text-elec-light/70 mb-2">Categories Completed</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-elec-light">{stats.totalCompleted}</p>
                      <p className="text-xs text-elec-light/60">Completed</p>
                    </div>
                    <div className="text-elec-light/40">/</div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-elec-light">{stats.totalRequired}</p>
                      <p className="text-xs text-elec-light/60">Required</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-elec-light/70 text-center">Categories in this level:</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {stats.categories.slice(0, 2).map((category) => (
                      <Badge key={category.id} variant="outline" className="text-xs border-elec-yellow/30 text-elec-light/80">
                        {category.name}
                      </Badge>
                    ))}
                    {stats.categories.length > 2 && (
                      <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-light/80">
                        +{stats.categories.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {stats.entries.length > 0 && (
                  <div className="pt-2 border-t border-elec-yellow/20 text-center">
                    <p className="text-xs text-elec-light/60">
                      Latest activity: {stats.entries.slice(-1)[0]?.title}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CompetencyLevelView;