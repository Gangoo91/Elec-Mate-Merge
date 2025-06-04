
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Zap, CheckCircle } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import CircuitManager from '../CircuitManager';

interface EICRStepCircuitSetupProps {
  onComplete: () => void;
}

const EICRStepCircuitSetup = ({ onComplete }: EICRStepCircuitSetupProps) => {
  const { eicrSession } = useEICR();
  
  const circuits = eicrSession?.eicr_report.circuits || [];
  const hasCircuits = circuits.length > 0;

  const handleComplete = () => {
    if (hasCircuits) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Circuit Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Add all circuits that will be included in this EICR. You can add circuits individually or use quick templates for common installations.
            </p>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-500/20 text-blue-300">
                {circuits.length} Circuits Added
              </Badge>
              {hasCircuits && (
                <Badge className="bg-green-500/20 text-green-300">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Ready for Testing
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <CircuitManager />

      {hasCircuits && (
        <Card className="border-green-500/30 bg-green-500/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-200">Circuits Ready</p>
                <p className="text-sm text-green-300">
                  {circuits.length} circuit{circuits.length !== 1 ? 's' : ''} configured and ready for testing
                </p>
              </div>
              <Button 
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Continue to Testing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EICRStepCircuitSetup;
