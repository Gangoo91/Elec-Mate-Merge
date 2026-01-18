import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Zap, Activity, Shield, Eye, Target } from 'lucide-react';
import { realWorldFaultCategories, RealWorldFaultCategory } from '../data/faultFindingData';

interface RealWorldGridProps {
  onSelectCategory: (categoryId: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'overcurrent':
      return <Zap className="h-6 w-6" />;
    case 'earthing':
      return <Activity className="h-6 w-6" />;
    case 'insulation':
      return <Shield className="h-6 w-6" />;
    case 'supply_issues':
      return <Eye className="h-6 w-6" />;
    default:
      return <Target className="h-6 w-6" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'overcurrent':
      return {
        text: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30'
      };
    case 'earthing':
      return {
        text: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/30'
      };
    case 'insulation':
      return {
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30'
      };
    case 'supply_issues':
      return {
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30'
      };
    default:
      return {
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30'
      };
  }
};

const RealWorldGrid = ({ onSelectCategory }: RealWorldGridProps) => {
  return (
    <div className="space-y-4">
      {/* Intro Card */}
      <Card className="border-l-4 border-l-blue-500 bg-blue-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-400 text-sm mb-1">
                Real-World Fault Cases
              </h3>
              <p className="text-sm text-muted-foreground">
                Detailed case studies from actual fault-finding scenarios, including
                symptoms, diagnosis methods, solutions, and prevention strategies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {realWorldFaultCategories.map((category: RealWorldFaultCategory) => {
          const colors = getCategoryColor(category.category);

          return (
            <Card
              key={category.id}
              className={`${colors.border} border ${colors.bg} cursor-pointer
                transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                touch-manipulation`}
              onClick={() => onSelectCategory(category.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`${colors.text} shrink-0`}>
                    {getCategoryIcon(category.category)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm sm:text-base ${colors.text} mb-1`}>
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={`text-xs ${colors.border} ${colors.text}`}
                      >
                        {category.examples.length} cases
                      </Badge>
                      <ChevronRight className={`h-4 w-4 ${colors.text}`} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RealWorldGrid;
