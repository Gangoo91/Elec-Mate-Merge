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
            <Card key={level.level} className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 bg-${level.color}-500`} />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${level.bgColor}`}>
                    <IconComponent className={`h-6 w-6 text-${level.color}-600`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{level.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {level.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Overall Progress</span>
                    <span className="font-semibold">{stats.progress}%</span>
                  </div>
                  <Progress value={stats.progress} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Categories</p>
                    <p className="font-semibold text-lg">{stats.categories.length}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Completed</p>
                    <p className="font-semibold text-lg">
                      {stats.totalCompleted}/{stats.totalRequired}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Categories in this level:</p>
                  <div className="flex flex-wrap gap-1">
                    {stats.categories.map((category) => (
                      <Badge key={category.id} variant="outline" className="text-xs">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {stats.entries.length > 0 && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
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