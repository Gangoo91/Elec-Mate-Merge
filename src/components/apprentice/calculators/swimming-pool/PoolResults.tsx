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
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg sm:text-xl font-semibold text-white">Installation Overview</h3>
          </div>
          <Badge 
            variant={result.regulatoryCompliance.bs7671Section702 ? "default" : "destructive"}
            className="self-start sm:self-center bg-red-600 text-white px-3 py-1 text-sm font-medium"
          >
            BS 7671 Section 702
          </Badge>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center space-y-2 p-4 rounded-lg border border-elec-yellow/20 bg-elec-gray/50">
            <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wide">Total Load</div>
            <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">
              {result.totalLoad.toLocaleString()}
              <span className="text-lg text-white/70 ml-1">W</span>
            </div>
          </div>
          
          <div className="text-center space-y-2 p-4 rounded-lg border border-elec-yellow/20 bg-elec-gray/50">
            <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wide">Total Current</div>
            <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">
              {result.totalCurrent}
              <span className="text-lg text-white/70 ml-1">A</span>
            </div>
          </div>
          
          <div className="text-center space-y-2 p-4 rounded-lg border border-elec-yellow/20 bg-elec-gray/50">
            <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wide">Diversity Factor</div>
            <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">
              {result.safetyFactors.diversityFactor}
            </div>
          </div>
          
          <div className="text-center space-y-2 p-4 rounded-lg border border-elec-yellow/20 bg-elec-gray/50">
            <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wide">Safety Margin</div>
            <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">
              {result.safetyFactors.safetyMargin}
            </div>
          </div>
        </div>

        <Separator className="bg-elec-yellow/20" />

        {/* Supply & Protection Requirements */}
        <div className="grid gap-4 sm:gap-6">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3 text-lg">Supply Requirements</h4>
            <p className="text-white text-sm sm:text-base">{result.supplyRequirements}</p>
          </div>

          <div>
            <h4 className="font-semibold text-blue-300 mb-3 text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Main Protection
            </h4>
            <p className="text-white text-sm sm:text-base">{result.mainProtection}</p>
          </div>
        </div>
      </div>

      {/* Circuit Schedule */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Cable className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg sm:text-xl font-semibold text-white">Circuit Schedule</h3>
        </div>
        
        <div className="space-y-4">
          {result.circuits.map((circuit, index) => (
            <div key={index} className={`${getComplianceColor(circuit.complianceStatus)} border transition-all hover:border-opacity-60 p-4 sm:p-6 rounded-lg`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h4 className="font-semibold flex items-center gap-2 text-base sm:text-lg text-white">
                  {getComplianceIcon(circuit.complianceStatus)}
                  {circuit.name}
                </h4>
                <Badge variant="outline" className="self-start sm:self-center border-gray-500 text-white/70">
                  {circuit.ipRating}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
                <div>
                  <div className="text-white/60 text-xs mb-1">Load</div>
                  <div className="font-mono text-elec-yellow font-semibold">{circuit.load}W</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs mb-1">Current</div>
                  <div className="font-mono text-elec-yellow font-semibold">{circuit.current.toFixed(1)}A</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs mb-1">Cable</div>
                  <div className="font-mono text-elec-yellow font-semibold">{circuit.cableSize}</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs mb-1">Protection</div>
                  <div className="font-mono text-elec-yellow font-semibold">{circuit.protectionRating}A</div>
                </div>
              </div>

              {circuit.specialRequirements.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs text-white/60 mb-2 font-medium">Special Requirements:</div>
                  <ul className="text-xs text-white space-y-1">
                    {circuit.specialRequirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Earthing & Bonding */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg sm:text-xl font-semibold text-white">Earthing & Bonding</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-green-300 mb-3 text-base">Earthing Arrangements</h4>
            <p className="text-white text-sm leading-relaxed">{result.earthingArrangements}</p>
          </div>

          <Separator className="bg-elec-yellow/20" />

          <div>
            <h4 className="font-semibold text-elec-yellow mb-4 text-base">Bonding Requirements</h4>
            <div className="space-y-2">
              {result.bondingRequirements.map((req, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1 text-sm">•</span>
                  <span className="text-white text-sm leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zone Requirements */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg sm:text-xl font-semibold text-white">Zone Classification Requirements</h3>
        </div>
        
        <div className="space-y-4">
          {Object.entries(result.zonalCompliance).map(([zone, requirements]) => (
            <div key={zone} className="border border-elec-yellow/20 bg-elec-gray/30 p-4 sm:p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h4 className="font-semibold text-elec-yellow text-base sm:text-lg">
                  Zone {zone.slice(-1)} Classification
                </h4>
                <Badge variant="outline" className="self-start sm:self-center border-elec-yellow/50 text-elec-yellow">
                  {requirements.ipRating}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h5 className="text-sm font-semibold text-green-300 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Permitted Equipment
                  </h5>
                  <ul className="space-y-2">
                    {requirements.permitted.map((item, i) => (
                      <li key={i} className="text-xs text-white flex items-start gap-2 leading-relaxed">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-sm font-semibold text-red-300 mb-3 flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    Prohibited Equipment
                  </h5>
                  <ul className="space-y-2">
                    {requirements.prohibited.map((item, i) => (
                      <li key={i} className="text-xs text-white flex items-start gap-2 leading-relaxed">
                        <XCircle className="h-3 w-3 text-red-400 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Status */}
      {(result.regulatoryCompliance.issues.length > 0 || result.regulatoryCompliance.recommendations.length > 0) && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
            <h3 className="text-lg sm:text-xl font-semibold text-white">Compliance & Recommendations</h3>
          </div>
          
          <div className="space-y-4">
            {result.regulatoryCompliance.issues.length > 0 && (
              <Alert className="border-red-500/30 bg-red-500/10">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-200">
                  <strong className="text-base">Compliance Issues Found:</strong>
                  <ul className="mt-3 space-y-2">
                    {result.regulatoryCompliance.issues.map((issue, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-red-400 mt-1">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {result.regulatoryCompliance.recommendations.length > 0 && (
              <Alert className="border-blue-500/30 bg-blue-500/10">
                <AlertTriangle className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-200">
                  <strong className="text-base">Professional Recommendations:</strong>
                  <ul className="mt-3 space-y-2">
                    {result.regulatoryCompliance.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-400 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PoolResults;