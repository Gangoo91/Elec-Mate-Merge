import { Card, CardContent } from '@/components/ui/card';
import { CircuitInput } from '@/types/installation-design';
import { Zap, Clock, Home, Building2, Factory } from 'lucide-react';

interface DesignInputSummaryProps {
  promptDescription: string;
  installationType: 'domestic' | 'commercial' | 'industrial';
  circuits: CircuitInput[];
  detectionConfidence?: number;
}

export const DesignInputSummary = ({
  promptDescription,
  installationType,
  circuits,
  detectionConfidence = 0
}: DesignInputSummaryProps) => {
  // Don't show if no content
  if (!promptDescription.trim() && circuits.length === 0) {
    return null;
  }

  // Estimate design time (rough approximation)
  const estimatedMinutes = Math.max(2, Math.ceil(circuits.length * 0.4));
  const complexCircuits = circuits.filter(c => 
    (c.loadPower || 0) > 7200 || 
    (c.cableLength || 0) > 100 ||
    c.specialLocation !== 'none'
  ).length;

  const getIcon = () => {
    switch (installationType) {
      case 'domestic': return <Home className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'commercial': return <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'industrial': return <Factory className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  const getTypeLabel = () => {
    switch (installationType) {
      case 'domestic': return 'Domestic Installation';
      case 'commercial': return 'Commercial Installation';
      case 'industrial': return 'Industrial Installation';
    }
  };

  return (
    <Card className="bg-primary/5 border-primary/20 animate-fade-in">
      <CardContent className="pt-4 sm:pt-5">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
            {getIcon()}
          </div>
          
          <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
            {/* Header */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2 flex-wrap">
                {getTypeLabel()}
                {detectionConfidence > 70 && (
                  <span className="text-xs text-muted-foreground font-normal">
                    (Auto-detected)
                  </span>
                )}
              </h3>
              {promptDescription.trim() && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                  {promptDescription}
                </p>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Circuit Count */}
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground truncate">
                  {circuits.length === 0 ? (
                    <span className="text-amber-600">No circuits yet</span>
                  ) : (
                    <>
                      <span className="font-semibold text-foreground">{circuits.length}</span> circuit{circuits.length !== 1 ? 's' : ''}
                      {complexCircuits > 0 && (
                        <span className="text-amber-600 ml-1">
                          ({complexCircuits} complex)
                        </span>
                      )}
                    </>
                  )}
                </span>
              </div>

              {/* Estimated Time */}
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground truncate">
                  {circuits.length === 0 ? (
                    <span>~2-3 min</span>
                  ) : (
                    <>
                      <span className="font-semibold text-foreground">~{estimatedMinutes}</span> minute{estimatedMinutes !== 1 ? 's' : ''}
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Info Message */}
            {circuits.length === 0 && promptDescription.trim() && (
              <p className="text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1.5 border border-border/50">
                💡 AI will extract circuits from your description
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
