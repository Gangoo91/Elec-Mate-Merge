import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InstallationDesign, CircuitDesign } from '@/types/installation-design';
import { 
  Download, FileText, Upload, Share2, 
  CheckCircle2, AlertTriangle, Zap, Shield 
} from 'lucide-react';

interface ResultsActionsPanelProps {
  design: InstallationDesign;
  selectedCircuit: CircuitDesign;
  onDownloadEIC: () => void;
  onSendToPlanner: () => void;
  isExporting: boolean;
}

export const ResultsActionsPanel = ({
  design,
  selectedCircuit,
  onDownloadEIC,
  onSendToPlanner,
  isExporting
}: ResultsActionsPanelProps) => {
  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <Card className="lg:sticky lg:top-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            onClick={onDownloadEIC}
            disabled={isExporting}
            className="w-full justify-start"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Download EIC Schedule
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onSendToPlanner}
            className="w-full justify-start"
            size="sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            Send to Install Planner
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            size="sm"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Design
          </Button>
        </CardContent>
      </Card>

      {/* Circuit Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Circuit Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Cable Size</span>
              <Badge variant="secondary">{selectedCircuit.cableSize}mm²</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">CPC Size</span>
              <Badge variant="secondary">{selectedCircuit.cpcSize}mm²</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Protection</span>
              <Badge variant="secondary">
                {selectedCircuit.protectionDevice?.type} {selectedCircuit.protectionDevice?.rating}A
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Max Zs</span>
              <Badge variant="secondary">
                {selectedCircuit.calculations?.maxZs?.toFixed(2)}Ω
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <Card className={
        selectedCircuit.warnings && selectedCircuit.warnings.length > 0
          ? "bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900/50"
          : "bg-primary/5 border-primary/20"
      }>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            {selectedCircuit.warnings && selectedCircuit.warnings.length > 0 ? (
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-primary" />
            )}
            Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedCircuit.warnings && selectedCircuit.warnings.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                {selectedCircuit.warnings.length} Warning{selectedCircuit.warnings.length !== 1 ? 's' : ''}
              </p>
              <p className="text-xs text-muted-foreground">
                Review warnings in detail panel
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">
                ✓ BS 7671 Compliant
              </p>
              <p className="text-xs text-muted-foreground">
                All calculations verified
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Design Metadata */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Design Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Circuits</span>
            <span className="font-semibold">{design.circuits.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Voltage</span>
            <span className="font-semibold">{design.consumerUnit?.incomingSupply?.voltage || design.circuits[0]?.voltage}V</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Phases</span>
            <span className="font-semibold capitalize">{design.consumerUnit?.incomingSupply?.phases || 'single'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Earthing</span>
            <span className="font-semibold">{design.consumerUnit?.incomingSupply?.earthingSystem || 'TN-S'}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
