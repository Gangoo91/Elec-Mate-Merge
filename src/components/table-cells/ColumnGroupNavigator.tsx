import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle } from 'lucide-react';
import { TestResult } from '@/types/testResult';

interface ColumnGroup {
  id: string;
  label: string;
  emoji: string;
  color: string;
  fields: (keyof TestResult)[];
}

const columnGroups: ColumnGroup[] = [
  {
    id: 'circuit',
    label: 'Circuit',
    emoji: '⚡',
    color: 'bg-blue-50',
    fields: ['circuitNumber', 'circuitDescription'],
  },
  {
    id: 'conductors',
    label: 'Conductors',
    emoji: '🔌',
    color: 'bg-green-50',
    fields: ['liveSize', 'cpcSize'],
  },
  {
    id: 'protection',
    label: 'Protection',
    emoji: '🛡️',
    color: 'bg-orange-50',
    fields: ['bsStandard', 'protectiveDeviceRating', 'maxZs'],
  },
  {
    id: 'rcd',
    label: 'RCD',
    emoji: '🔒',
    color: 'bg-red-50',
    fields: ['rcdRating', 'rcdTestButton'],
  },
  {
    id: 'continuity',
    label: 'Continuity',
    emoji: '🔗',
    color: 'bg-purple-50',
    fields: ['r1r2'],
  },
  {
    id: 'insulation',
    label: 'Insulation',
    emoji: '⚡',
    color: 'bg-indigo-50',
    fields: ['insulationLiveNeutral', 'insulationLiveEarth'],
  },
  {
    id: 'tests',
    label: 'Tests',
    emoji: '📊',
    color: 'bg-yellow-50',
    fields: ['zs', 'polarity'],
  },
];

interface ColumnGroupNavigatorProps {
  testResults: TestResult[];
  onJumpToGroup?: (groupId: string) => void;
}

export const ColumnGroupNavigator: React.FC<ColumnGroupNavigatorProps> = ({
  testResults,
  onJumpToGroup,
}) => {
  const getGroupCompletion = (group: ColumnGroup) => {
    const totalCircuits = testResults.length;
    if (totalCircuits === 0) return { completed: 0, total: 0, percentage: 0 };

    let completedCount = 0;
    testResults.forEach((result) => {
      const allFieldsFilled = group.fields.every((field) => result[field]);
      if (allFieldsFilled) completedCount++;
    });

    return {
      completed: completedCount,
      total: totalCircuits,
      percentage: Math.round((completedCount / totalCircuits) * 100),
    };
  };

  const overallCompletion = columnGroups.reduce(
    (acc, group) => {
      const completion = getGroupCompletion(group);
      return {
        completed: acc.completed + completion.completed,
        total: acc.total + completion.total,
      };
    },
    { completed: 0, total: 0 }
  );

  const overallPercentage =
    overallCompletion.total > 0
      ? Math.round((overallCompletion.completed / overallCompletion.total) * 100)
      : 0;

  return (
    <div className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border p-2 shadow-sm">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="text-xs font-medium text-muted-foreground mr-2">
          Progress: {overallPercentage}%
        </div>
        {columnGroups.map((group) => {
          const completion = getGroupCompletion(group);
          const isComplete = completion.percentage === 100;

          return (
            <Button
              key={group.id}
              variant="outline"
              size="sm"
              onClick={() => onJumpToGroup?.(group.id)}
              className={`h-7 px-2 text-xs ${group.color} border-primary/20 hover:bg-primary/10 transition-all`}
            >
              <span className="mr-1">{group.emoji}</span>
              <span className="font-medium">{group.label}</span>
              {isComplete ? (
                <CheckCircle2 className="h-3 w-3 ml-1 text-success" />
              ) : (
                <Circle className="h-3 w-3 ml-1 text-muted-foreground" />
              )}
              <span className="ml-1 text-xs text-muted-foreground">
                {completion.percentage}%
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
