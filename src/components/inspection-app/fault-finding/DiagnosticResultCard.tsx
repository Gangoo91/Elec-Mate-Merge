
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, RotateCcw } from 'lucide-react';
import { DiagnosticResult } from './types';

interface DiagnosticResultCardProps {
  result: DiagnosticResult;
  onRestart: () => void;
}

const DiagnosticResultCard = ({ result, onRestart }: DiagnosticResultCardProps) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          {result.confidence > 80 ? (
            <CheckCircle className="h-5 w-5 text-green-400" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          )}
          Diagnostic Result
          <Badge className="ml-auto bg-blue-500">{result.confidence}% Confidence</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-elec-yellow mb-2">Likely Fault Type</h3>
          <p className="text-foreground text-xl">{result.faultType}</p>
        </div>

        {result.safetyWarning && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-semibold">Safety Warning</span>
            </div>
            <p className="text-sm text-white/80">{result.safetyWarning}</p>
          </div>
        )}

        <div>
          <h4 className="font-semibold text-red-400 mb-3">Immediate Actions Required</h4>
          <ul className="space-y-2">
            {result.immediateActions.map((action, idx) => (
              <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                {action}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-blue-400 mb-3">Next Steps</h4>
          <ol className="space-y-2">
            {result.nextSteps.map((step, idx) => (
              <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                <span className="text-blue-400 font-semibold min-w-4">{idx + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex gap-3">
          <Button onClick={onRestart} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <RotateCcw className="h-4 w-4 mr-2" />
            Start New Diagnosis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosticResultCard;
