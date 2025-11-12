import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Loader2, Clock, Shield, Wrench, X } from 'lucide-react';

interface MethodStatementProcessingViewProps {
  overallProgress: number;
  currentStep: string;
  elapsedTime: number;
  estimatedTimeRemaining: number;
  onCancel?: () => void;
  isCancelling?: boolean;
  jobDescription: string;
}

export const MethodStatementProcessingView: React.FC<MethodStatementProcessingViewProps> = ({
  overallProgress,
  currentStep,
  elapsedTime,
  estimatedTimeRemaining,
  onCancel,
  isCancelling,
  jobDescription
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-4 sm:p-6 lg:p-8 bg-elec-card border-emerald-500/20">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-emerald-400">Generating Method Statement</h3>
          {onCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              disabled={isCancelling}
              className="border-red-500/30 hover:bg-red-500/10 text-red-400"
            >
              {isCancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
              {isCancelling ? 'Cancelling...' : 'Cancel'}
            </Button>
          )}
        </div>

        {/* Job Description */}
        <div className="p-3 bg-elec-dark/50 rounded-lg border border-emerald-500/10">
          <p className="text-sm text-muted-foreground">{jobDescription}</p>
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="text-emerald-400 font-semibold">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Current Step */}
        <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
          <div className="flex items-start gap-3">
            <Loader2 className="h-5 w-5 text-emerald-400 animate-spin shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-emerald-400">Current Step</p>
              <p className="text-xs text-emerald-400/70 mt-1 break-words">{currentStep || 'Initializing...'}</p>
            </div>
          </div>
        </div>

        {/* Agent Progress Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Health & Safety Agent */}
          <div className={`p-4 rounded-lg border ${
            overallProgress >= 40 
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : 'bg-elec-dark/30 border-border/20'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Shield className={`h-4 w-4 ${overallProgress >= 40 ? 'text-emerald-400' : 'text-muted-foreground'}`} />
              <span className={`text-sm font-medium ${overallProgress >= 40 ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                Risk Analysis
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {overallProgress >= 40 
                ? '✅ Hazards identified' 
                : overallProgress > 0 
                  ? 'Analyzing hazards...' 
                  : 'Waiting...'}
            </p>
          </div>

          {/* Installation Specialist */}
          <div className={`p-4 rounded-lg border ${
            overallProgress === 100 
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : overallProgress >= 40
                ? 'bg-blue-500/10 border-blue-500/30'
                : 'bg-elec-dark/30 border-border/20'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Wrench className={`h-4 w-4 ${
                overallProgress === 100 
                  ? 'text-emerald-400' 
                  : overallProgress >= 40 
                    ? 'text-blue-400' 
                    : 'text-muted-foreground'
              }`} />
              <span className={`text-sm font-medium ${
                overallProgress === 100 
                  ? 'text-emerald-400' 
                  : overallProgress >= 40 
                    ? 'text-blue-400' 
                    : 'text-muted-foreground'
              }`}>
                Method Steps
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {overallProgress === 100 
                ? '✅ Steps complete' 
                : overallProgress >= 40 
                  ? 'Generating steps...' 
                  : 'Waiting for risk analysis...'}
            </p>
          </div>
        </div>

        {/* Time Info */}
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Elapsed: {formatTime(elapsedTime)}</span>
          </div>
          <span>Est. remaining: {formatTime(estimatedTimeRemaining)}</span>
        </div>
      </div>
    </Card>
  );
};
