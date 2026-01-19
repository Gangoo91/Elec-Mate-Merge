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
    <Card className="bg-gradient-to-br from-elec-gray via-elec-gray/95 to-elec-gray/90 border-elec-yellow/20 mt-3">
      <CardContent className="p-3">
        <h3 className="text-sm font-bold text-elec-light mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-elec-yellow" />
          Installation Summary
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {/* Total Steps */}
          <div className="bg-card/50 rounded-lg p-3 border border-white/[0.08]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-elec-light/70">Steps</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-elec-light">{totalSteps}</div>
            <div className="mt-1.5">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-[10px] px-1.5 py-0.5">
                {completedSteps} done
              </Badge>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-card/50 rounded-lg p-3 border border-white/[0.08]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-elec-light/70">Progress</span>
              <TrendingUp className="h-3.5 w-3.5 text-green-400" />
            </div>
            <div className="text-xl font-bold text-elec-light">{progressPercent}%</div>
            <div className="mt-1.5 w-full bg-elec-light/20 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-green-500 to-green-400 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Estimated Time */}
          <div className="bg-card/50 rounded-lg p-3 border border-white/[0.08]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-elec-light/70">Time</span>
              <Clock className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <div className="text-base font-bold text-elec-light">{estimatedTime}</div>
            <div className="mt-1.5 text-[10px] text-elec-light/60">
              Duration
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
