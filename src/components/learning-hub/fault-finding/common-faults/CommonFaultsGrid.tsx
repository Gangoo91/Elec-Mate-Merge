import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Zap, Activity, Shield, Target, Eye } from 'lucide-react';
import { commonFaultCategories, CommonFaultCategory } from '../data/faultFindingData';

interface CommonFaultsGridProps {
  onSelectFault: (faultId: string) => void;
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
        text: 'text-slate-400',
        bg: 'bg-slate-500/10',
        border: 'border-slate-500/30'
      };
  }
};

const CommonFaultsGrid = ({ onSelectFault }: CommonFaultsGridProps) => {
  return (
    <div className="space-y-4">
      {/* Intro Card */}
      <Card className="border-l-4 border-l-red-500 bg-red-500/5">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Understanding common electrical faults helps diagnose problems quickly
            and safely. Each fault type has characteristic symptoms and test methods.
          </p>
        </CardContent>
      </Card>

      {/* Fault Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {commonFaultCategories.map((fault: CommonFaultCategory) => {
          const colors = getCategoryColor(fault.category);

          return (
            <Card
              key={fault.id}
              className={`${colors.border} border ${colors.bg} cursor-pointer
                transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                touch-manipulation`}
              onClick={() => onSelectFault(fault.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`${colors.text} shrink-0`}>
                    {getCategoryIcon(fault.category)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm sm:text-base ${colors.text} mb-1`}>
                      {fault.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {fault.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={`text-xs ${colors.border} ${colors.text}`}
                      >
                        {fault.commonSymptoms.length} symptoms
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

export default CommonFaultsGrid;
