import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/ui/result-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PoolCalculationResult } from "@/lib/swimming-pool";
import { 
  Zap, 
  Shield, 
  Cable, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Settings,
  Eye,
  Droplets,
  Clock
} from "lucide-react";

interface PoolResultsProps {
  result: PoolCalculationResult;
}

const PoolResults = ({ result }: PoolResultsProps) => {
  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'non-compliant': return <XCircle className="h-4 w-4 text-red-400" />;
      default: return <Settings className="h-4 w-4 text-gray-400" />;
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500/10 border-green-500/30';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'non-compliant': return 'bg-red-500/10 border-red-500/30';
      default: return 'bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg">Installation Overview</CardTitle>
            </div>
            <Badge variant={result.regulatoryCompliance.bs7671Section702 ? "default" : "destructive"}>
              BS 7671 Section 702
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ResultCard
              title="Total Load"
              value={result.totalLoad}
              unit="W"
              status="info"
            />
            <ResultCard
              title="Total Current"
              value={result.totalCurrent}
              unit="A"
              status="info"
            />
            <ResultCard
              title="Diversity Factor"
              value={result.safetyFactors.diversityFactor}
              unit=""
              status="info"
            />
            <ResultCard
              title="Safety Margin"
              value={result.safetyFactors.safetyMargin}
              unit=""
              status="info"
            />
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h4 className="font-medium text-elec-yellow">Supply Requirements</h4>
            <p className="text-sm text-muted-foreground">{result.supplyRequirements}</p>
            
            <h4 className="font-medium text-elec-yellow mt-3">Main Protection</h4>
            <p className="text-sm text-muted-foreground">{result.mainProtection}</p>
          </div>
        </CardContent>
      </Card>

      {/* Circuit Schedule */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cable className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Circuit Schedule</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.circuits.map((circuit, index) => (
              <Card key={index} className={`${getComplianceColor(circuit.complianceStatus)} border`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium flex items-center gap-2">
                      {getComplianceIcon(circuit.complianceStatus)}
                      {circuit.name}
                    </h4>
                    <Badge variant="outline">{circuit.ipRating}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Load:</span>
                      <div className="font-mono text-elec-yellow">{circuit.load}W</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current:</span>
                      <div className="font-mono text-elec-yellow">{circuit.current.toFixed(1)}A</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cable:</span>
                      <div className="font-mono text-elec-yellow">{circuit.cableSize}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Protection:</span>
                      <div className="font-mono text-elec-yellow">{circuit.protectionRating}A</div>
                    </div>
                  </div>

                  {circuit.specialRequirements.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-muted-foreground">Requirements:</span>
                      <ul className="text-xs text-muted-foreground mt-1">
                        {circuit.specialRequirements.map((req, i) => (
                          <li key={i}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Earthing & Bonding */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Earthing & Bonding</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-elec-yellow mb-2">Earthing Arrangements</h4>
            <p className="text-sm text-muted-foreground">{result.earthingArrangements}</p>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium text-elec-yellow mb-2">Bonding Requirements</h4>
            <ul className="space-y-1">
              {result.bondingRequirements.map((req, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Zone Requirements */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Zone Classification Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {Object.entries(result.zonalCompliance).map(([zone, requirements]) => (
              <Card key={zone} className="border-elec-yellow/10 bg-elec-dark">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-elec-yellow">
                      Zone {zone.slice(-1)} - {requirements.ipRating}
                    </h4>
                    <Badge variant="outline">{requirements.ipRating}</Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-green-400 mb-1">Permitted</h5>
                      <ul className="space-y-1">
                        {requirements.permitted.map((item, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-red-400 mb-1">Prohibited</h5>
                      <ul className="space-y-1">
                        {requirements.prohibited.map((item, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <XCircle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status */}
      {(result.regulatoryCompliance.issues.length > 0 || result.regulatoryCompliance.recommendations.length > 0) && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg">Compliance & Recommendations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.regulatoryCompliance.issues.length > 0 && (
              <Alert className="border-red-500/20 bg-red-500/10">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-200">
                  <strong>Compliance Issues:</strong>
                  <ul className="mt-2 space-y-1">
                    {result.regulatoryCompliance.issues.map((issue, i) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {result.regulatoryCompliance.recommendations.length > 0 && (
              <Alert className="border-blue-500/20 bg-blue-500/10">
                <AlertTriangle className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-200">
                  <strong>Recommendations:</strong>
                  <ul className="mt-2 space-y-1">
                    {result.regulatoryCompliance.recommendations.map((rec, i) => (
                      <li key={i}>• {rec}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PoolResults;