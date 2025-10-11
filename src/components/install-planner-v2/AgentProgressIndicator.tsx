import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface AgentProgressIndicatorProps {
  elapsedTime: number;
  estimatedTime?: number;
  currentAgent?: string;
}

export const AgentProgressIndicator = ({ 
  elapsedTime, 
  estimatedTime,
  currentAgent 
}: AgentProgressIndicatorProps) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const getProgressMessage = () => {
    if (elapsedTime < 30) {
      return `Thinking${dots}`;
    } else if (elapsedTime < 90) {
      return `Still working on your request${dots}`;
    } else if (elapsedTime < 180) {
      return `Complex designs can take 3-5 minutes${dots}`;
    } else {
      return `Almost there... large designs require detailed analysis${dots}`;
    }
  };

  const getProgressColor = () => {
    if (elapsedTime < 30) return 'text-primary';
    if (elapsedTime < 90) return 'text-yellow-500';
    if (elapsedTime < 180) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="flex items-start gap-3 max-w-full w-full mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Loader2 className="w-4 h-4 text-primary animate-spin" />
      </div>
      <div className="flex-1 bg-card border border-border rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className={`font-medium ${getProgressColor()}`}>
            {getProgressMessage()}
          </p>
          <span className="text-sm text-muted-foreground">
            {formatTime(elapsedTime)}
          </span>
        </div>
        
        {currentAgent && (
          <p className="text-sm text-muted-foreground">
            Consulting {currentAgent}...
          </p>
        )}
        
        {estimatedTime && estimatedTime > elapsedTime && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>~{formatTime(estimatedTime - elapsedTime)} remaining</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className="bg-primary h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((elapsedTime / estimatedTime) * 100, 95)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
