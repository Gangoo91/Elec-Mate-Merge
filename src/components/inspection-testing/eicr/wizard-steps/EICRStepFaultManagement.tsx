
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import FaultManager from '../FaultManager';

interface EICRStepFaultManagementProps {
  onComplete: () => void;
}

const EICRStepFaultManagement = ({ onComplete }: EICRStepFaultManagementProps) => {
  const { eicrSession } = useEICR();
  
  const faults = eicrSession?.eicr_report.faults || [];
  const c1Faults = faults.filter(f => f.faultCode === 'C1').length;
  const c2Faults = faults.filter(f => f.faultCode === 'C2').length;

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Fault Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Record any faults found during inspection and testing. Faults are automatically classified according to BS 7671.
            </p>
            
            <div className="flex items-center gap-4 flex-wrap">
              <Badge className="bg-gray-500/20 text-gray-300">
                {faults.length} Total Faults
              </Badge>
              {c1Faults > 0 && (
                <Badge className="bg-red-600 text-white">
                  {c1Faults} C1 (Dangerous)
                </Badge>
              )}
              {c2Faults > 0 && (
                <Badge className="bg-orange-600 text-white">
                  {c2Faults} C2 (Potentially Dangerous)
                </Badge>
              )}
            </div>

            {faults.length === 0 && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="font-medium text-green-200">No faults recorded</span>
                </div>
                <p className="text-sm text-green-300 mt-1">
                  This installation appears to be in satisfactory condition
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <FaultManager />

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Fault Review Complete</p>
              <p className="text-sm text-muted-foreground">
                {faults.length === 0 
                  ? 'No faults found - installation is satisfactory'
                  : `${faults.length} fault${faults.length !== 1 ? 's' : ''} recorded and classified`
                }
              </p>
            </div>
            <Button 
              onClick={onComplete}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Continue to Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRStepFaultManagement;
