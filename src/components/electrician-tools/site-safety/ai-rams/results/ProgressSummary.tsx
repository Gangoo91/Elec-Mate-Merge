import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import type { MethodStep } from '@/types/method-statement';

interface ProgressSummaryProps {
  steps: MethodStep[];
  totalEstimatedTime?: string;
}

export const ProgressSummary: React.FC<ProgressSummaryProps> = ({ steps, totalEstimatedTime }) => {
  const totalSteps = steps.length;
  const completedSteps = steps.filter(s => s.isCompleted).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  // Calculate total time if not provided
  const estimatedTime = totalEstimatedTime || `${totalSteps * 30} minutes`;

  return (
    <Card className="bg-gradient-to-br from-elec-gray via-elec-gray/95 to-elec-gray/90 border-elec-yellow/30 mt-6">
      <CardContent className="p-6">
        <h3 className="text-base font-bold text-elec-light mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Installation Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Steps */}
          <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-elec-light/70">Total Steps</span>
              <CheckCircle2 className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-elec-light">{totalSteps}</div>
            <div className="mt-2">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                {completedSteps} completed
              </Badge>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-elec-light/70">Progress</span>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-elec-light">{progressPercent}%</div>
            <div className="mt-2 w-full bg-elec-light/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Estimated Time */}
          <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-elec-light/70">Est. Time</span>
              <Clock className="h-5 w-5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-elec-light">{estimatedTime}</div>
            <div className="mt-2 text-xs text-elec-light/60">
              Total duration
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
