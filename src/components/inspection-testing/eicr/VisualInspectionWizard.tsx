
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import NumberedVisualInspection from './NumberedVisualInspection';
import { TOTAL_INSPECTION_ITEMS } from '@/data/eicr/numberedVisualInspectionData';

interface VisualInspectionWizardProps {
  reportType: string;
  onComplete: () => void;
}

const VisualInspectionWizard = ({ reportType, onComplete }: VisualInspectionWizardProps) => {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleComplete = () => {
    onComplete();
  };

  if (isStarted) {
    return (
      <NumberedVisualInspection 
        reportType={reportType}
        onComplete={handleComplete}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Official EICR Introduction */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
              <Eye className="h-8 w-8 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-2xl">Official EICR Numbered Visual Inspection</CardTitle>
              <p className="text-muted-foreground">
                BS 7671:2018+A3:2024 compliant Schedule of Inspections
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-500/10 rounded border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-300">10</div>
              <div className="text-sm text-blue-200">Inspection Sections</div>
            </div>
            <div className="text-center p-3 bg-elec-yellow/10 rounded border border-elec-yellow/30">
              <div className="text-2xl font-bold text-elec-yellow">{TOTAL_INSPECTION_ITEMS}</div>
              <div className="text-sm text-elec-yellow/80">Total Inspection Items</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">45-90</div>
              <div className="text-sm text-green-300">Minutes (Typical)</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded border border-purple-500/30">
              <div className="text-2xl font-bold text-purple-400">7</div>
              <div className="text-sm text-purple-300">Outcome Classifications</div>
            </div>
          </div>

          <Alert className="bg-blue-500/10 border-blue-500/30 mb-6">
            <AlertTriangle className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200">
              <strong>Official EICR Form Compliance:</strong> This inspection follows the exact numbered items from the 
              official EICR Schedule of Inspections. All {TOTAL_INSPECTION_ITEMS} items across 10 sections match the BS 7671 requirements, 
              including the complete Section 5 (Distribution Equipment) with items 5.1 through 5.24.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Inspection Sections Overview:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="w-8 h-6 justify-center text-xs">1</Badge>
                <span>External Condition of Intake Equipment (4 items)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="w-8 h-6 justify-center text-xs">2</Badge>
                <span>Parallel/Alternative Supply Sources (1 item)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="w-8 h-6 justify-center text-xs">3</Badge>
                <span>Automatic Disconnection of Supply (6 items)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="w-8 h-6 justify-center text-xs">4</Badge>
                <span>Other Protective Measures (5 items)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="w-8 h-6 justify-center text-xs bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">5</Badge>
                <span className="font-medium">Distribution Equipment (24 items)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="w-8 h-6 justify-center text-xs">6</Badge>
                <span>Final Circuits (10 items)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="w-8 h-6 justify-center text-xs">7</Badge>
                <span>Bath/Shower Locations (3 items)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="w-8 h-6 justify-center text-xs">8</Badge>
                <span>Other Special Installations (1 item)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="w-8 h-6 justify-center text-xs">9</Badge>
                <span>General Requirements (6 items)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="w-8 h-6 justify-center text-xs">10</Badge>
                <span>Condition Report Inspection (3 items)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outcome Classifications */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            EICR Outcome Classifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <div className="p-3 rounded border bg-green-500/20 border-green-500/30">
              <div className="font-bold text-green-400 text-lg">✓</div>
              <div className="font-medium text-green-300">Acceptable</div>
              <div className="text-green-200 text-xs">No defects found - complies</div>
            </div>
            <div className="p-3 rounded border bg-red-500/20 border-red-500/30">
              <div className="font-bold text-red-400 text-lg">C1</div>
              <div className="font-medium text-red-300">Danger Present</div>
              <div className="text-red-200 text-xs">Immediate remedial action</div>
            </div>
            <div className="p-3 rounded border bg-orange-500/20 border-orange-500/30">
              <div className="font-bold text-orange-400 text-lg">C2</div>
              <div className="font-medium text-orange-300">Potentially Dangerous</div>
              <div className="text-orange-200 text-xs">Urgent remedial action</div>
            </div>
            <div className="p-3 rounded border bg-yellow-500/20 border-yellow-500/30">
              <div className="font-bold text-yellow-400 text-lg">C3</div>
              <div className="font-medium text-yellow-300">Improvement Recommended</div>
              <div className="text-yellow-200 text-xs">Enhancement for safety</div>
            </div>
            <div className="p-3 rounded border bg-gray-500/20 border-gray-500/30">
              <div className="font-bold text-gray-400 text-lg">N/V</div>
              <div className="font-medium text-gray-300">Not Verified</div>
              <div className="text-gray-200 text-xs">Unable to inspect</div>
            </div>
            <div className="p-3 rounded border bg-purple-500/20 border-purple-500/30">
              <div className="font-bold text-purple-400 text-lg">LIM</div>
              <div className="font-medium text-purple-300">Limitation</div>
              <div className="text-purple-200 text-xs">Limitation encountered</div>
            </div>
            <div className="p-3 rounded border bg-blue-500/20 border-blue-500/30">
              <div className="font-bold text-blue-400 text-lg">N/A</div>
              <div className="font-medium text-blue-300">Not Applicable</div>
              <div className="text-blue-200 text-xs">Not relevant to installation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Inspection */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-elec-yellow mx-auto" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Ready to Begin Official EICR Visual Inspection</h3>
              <p className="text-muted-foreground mb-4">
                This will guide you through all {TOTAL_INSPECTION_ITEMS} numbered inspection items across 10 sections 
                according to the official EICR Schedule of Inspections.
              </p>
            </div>
            <Button 
              onClick={handleStart}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 px-8 py-3 text-lg"
            >
              Start Visual Inspection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualInspectionWizard;
