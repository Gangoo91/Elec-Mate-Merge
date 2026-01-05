
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface MobileTestProgressProps {
  progress: number;
  completedTests: number;
  totalTests: number;
  circuits: any[];
}

const MobileTestProgress = ({ progress, completedTests, totalTests, circuits }: MobileTestProgressProps) => {
  const getProgressColor = () => {
    if (progress >= 100) return 'text-green-600';
    if (progress >= 75) return 'text-blue-600';
    if (progress >= 50) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getProgressIcon = () => {
    if (progress >= 100) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (progress >= 50) return <Clock className="h-4 w-4 text-yellow-600" />;
    return <AlertCircle className="h-4 w-4 text-orange-600" />;
  };

  const getStatusText = () => {
    if (progress >= 100) return 'All tests completed';
    if (progress >= 75) return 'Nearly complete';
    if (progress >= 50) return 'Good progress';
    if (progress > 0) return 'Testing in progress';
    return 'Ready to start testing';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getProgressIcon()}
          <span className={`font-semibold ${getProgressColor()}`}>
            {getStatusText()}
          </span>
        </div>
        <Badge variant="outline" className="text-xs">
          {Math.round(progress)}% Complete
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Test Progress</span>
          <span>{completedTests} of {totalTests} tests</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <p className="text-lg font-semibold text-elec-yellow">{circuits.length}</p>
          <p className="text-xs text-muted-foreground">Circuits</p>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold text-green-600">{completedTests}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold text-orange-600">{totalTests - completedTests}</p>
          <p className="text-xs text-muted-foreground">Remaining</p>
        </div>
      </div>
    </div>
  );
};

export default MobileTestProgress;
