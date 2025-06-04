
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestTube, CheckCircle, AlertTriangle } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import InspectionTestingWalkthrough from '../../InspectionTestingWalkthrough';

interface EICRStepTestingProps {
  onComplete: () => void;
}

const EICRStepTesting = ({ onComplete }: EICRStepTestingProps) => {
  const { eicrSession } = useEICR();
  
  const circuits = eicrSession?.eicr_report.circuits || [];
  const testedCircuits = circuits.filter(c => 
    c.measured_zs !== undefined || 
    c.insulation_resistance !== undefined ||
    c.rcd_operation !== undefined ||
    c.continuity_cpc !== undefined
  ).length;

  const allTested = circuits.length > 0 && testedCircuits === circuits.length;

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-elec-yellow" />
            Electrical Testing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Perform electrical tests on each circuit. Results will be automatically recorded in the EICR.
            </p>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-500/20 text-blue-300">
                {testedCircuits} / {circuits.length} Circuits Tested
              </Badge>
              {allTested && (
                <Badge className="bg-green-500/20 text-green-300">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  All Testing Complete
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <InspectionTestingWalkthrough 
        mode="electrician"
        onComplete={() => {
          console.log('Testing completed');
          onComplete();
        }}
      />

      {allTested && (
        <Card className="border-green-500/30 bg-green-500/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-200">Testing Complete</p>
                <p className="text-sm text-green-300">
                  All {circuits.length} circuits have been tested successfully
                </p>
              </div>
              <Button 
                onClick={onComplete}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Continue to Faults
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EICRStepTesting;
