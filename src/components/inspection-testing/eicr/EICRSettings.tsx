
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, AlertTriangle } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

const EICRSettings = () => {
  const { eicrSession, setAutoPopulate } = useEICR();

  if (!eicrSession) return null;

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            EICR Integration Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-medium">Auto-populate from test results</label>
              <p className="text-xs text-muted-foreground">
                Automatically add fault codes when test results fail compliance limits
              </p>
            </div>
            <Switch
              checked={eicrSession.auto_populate}
              onCheckedChange={setAutoPopulate}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Current Circuit Reference</label>
            <Input
              value={eicrSession.current_circuit || ''}
              onChange={(e) => {
                // This would be handled by a context method
                console.log('Setting current circuit:', e.target.value);
              }}
              placeholder="e.g., L1, C1, S1"
              className="max-w-xs"
            />
            <p className="text-xs text-muted-foreground">
              Test results will be associated with this circuit
            </p>
          </div>

          <Alert className="bg-blue-500/10 border-blue-500/30">
            <AlertTriangle className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200">
              <strong>Professional Reminder:</strong> EICR reports must be completed by qualified personnel. 
              All fault codes should be reviewed and verified before finalizing the report.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-sm">Export Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm">
              Export as PDF
            </Button>
            <Button variant="outline" size="sm">
              Export as JSON
            </Button>
            <Button variant="outline" size="sm">
              Export as Excel
            </Button>
            <Button variant="outline" size="sm">
              Email Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRSettings;
